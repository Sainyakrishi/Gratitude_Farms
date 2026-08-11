// Checks the source tree without a browser: that every module parses, every
// internal link points at a declared route, every route has a page, every page
// sets a title, and every referenced asset is on disk.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');
const PUBLIC = path.join(ROOT, 'public');

let errors = 0;
const err = (m) => { console.log('  ✗ ' + m); errors++; };

/** Every file under a directory, recursively. */
function walk(dir, filter = () => true) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full, filter));
    else if (filter(full)) out.push(full);
  }
  return out;
}

const sources = walk(SRC, (f) => f.endsWith('.js') || f.endsWith('.jsx'));
const read = (f) => fs.readFileSync(f, 'utf8');
const rel = (f) => path.relative(ROOT, f).replace(/\\/g, '/');

// ---- 1. Module syntax -------------------------------------------------------
console.log('\n[1] Module syntax');
{
  const before = errors;
  for (const f of sources.filter((x) => x.endsWith('.js'))) {
    // `node --check` only treats a file as a module when it ends in .mjs.
    const tmp = f.replace(/\.js$/, '.check.mjs');
    fs.copyFileSync(f, tmp);
    try {
      execFileSync(process.execPath, ['--check', tmp], { stdio: 'pipe' });
    } catch (e) {
      err(`${rel(f)}: ${String(e.stderr || e.message).split('\n').slice(0, 3).join(' ')}`);
    } finally {
      fs.rmSync(tmp, { force: true });
    }
  }
  // JSX cannot be checked by node; the build covers it.
  if (errors === before) console.log('  ✓ all plain modules parse');
}

// ---- 2. Routes --------------------------------------------------------------
console.log('\n[2] Routes');
const appSrc = read(path.join(SRC, 'App.jsx'));
const routesSrc = read(path.join(SRC, 'lib', 'routes.js'));

const declared = [...appSrc.matchAll(/path="([^"]+)"/g)].map((m) => m[1]);
const legacyTargets = [...routesSrc.matchAll(/'([\w.-]+\.dc\.html)':\s*'([^']+)'/g)];

// The legacy filenames become redirect routes at runtime, so a link to one is
// still a link to something the app serves.
const legacyPaths = legacyTargets.map(([, file]) => `/${file}`);
const allRoutes = [...declared, ...legacyPaths];

const matchers = allRoutes
  .filter((p) => p !== '*')
  .map((p) => new RegExp('^' + p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/:[\w]+/g, '[^/]+') + '$'));

const resolves = (href) => matchers.some((re) => re.test(href));
{
  const before = errors;
  for (const [, file, target] of legacyTargets) {
    if (!resolves(target)) err(`lib/routes.js: ${file} redirects to ${target}, which is not a route`);
  }
  if (errors === before) console.log(`  ✓ ${declared.length} routes declared, every legacy redirect lands on one`);
}

// ---- 3. Internal links ------------------------------------------------------
console.log('\n[3] Internal links');
{
  const before = errors;
  const seen = new Map();
  for (const f of sources) {
    const src = read(f);
    // Literal hrefs in markup, and route paths held in the data files.
    for (const m of src.matchAll(/href="(\/[^"#?]*)/g)) {
      const href = m[1] === '/' ? '/' : m[1].replace(/\/$/, '');
      if (href.startsWith('/assets/')) continue;
      seen.set(href, (seen.get(href) || 0) + 1);
      if (!resolves(href)) err(`${rel(f)} → ${href} matches no route`);
    }
    for (const m of src.matchAll(/'(\/(?:services|blog)\/[a-z0-9-]+)'/g)) {
      seen.set(m[1], (seen.get(m[1]) || 0) + 1);
      if (!resolves(m[1])) err(`${rel(f)} → ${m[1]} matches no route`);
    }
    // routes.js holds the legacy map, App.jsx mounts the redirects from it, and
    // ui.jsx documents it. Anywhere else a filename is a leftover.
    const mentionsLegacyByDesign = ['routes.js', 'App.jsx', 'ui.jsx'].some((n) => f.endsWith(n));
    if (/\.dc\.html/.test(src) && !mentionsLegacyByDesign) {
      err(`${rel(f)}: still references a .dc.html page`);
    }
  }
  if (errors === before) console.log(`  ✓ every internal link resolves (${seen.size} distinct targets)`);
}

// ---- 4. Reachability --------------------------------------------------------
console.log('\n[4] Reachability');
{
  const before = errors;
  const pages = fs.readdirSync(path.join(SRC, 'pages')).map((f) => f.replace(/\.jsx$/, ''));
  for (const page of pages) {
    if (!new RegExp(`\\b${page}\\b`).test(appSrc)) err(`src/pages/${page}.jsx is not routed in App.jsx`);
  }
  const components = fs.readdirSync(path.join(SRC, 'components')).map((f) => f.replace(/\.jsx$/, ''));
  for (const c of components) {
    const used = sources.some((f) => !f.endsWith(`${c}.jsx`) && read(f).includes(`/${c}.jsx`));
    if (!used) err(`src/components/${c}.jsx is imported by nothing`);
  }
  if (errors === before) console.log(`  ✓ ${pages.length} pages routed, ${components.length} components in use`);
}

// ---- 5. Assets --------------------------------------------------------------
console.log('\n[5] Assets');
{
  const before = errors;
  const refs = new Set();
  for (const f of sources) {
    for (const m of read(f).matchAll(/(?:src="|url\('|href="|['"`])(\/assets\/[^"')`]+)/g)) {
      // A path built at runtime (`/assets/trees/${t.img}`) has no single file
      // to check; the render pass catches those by loading the images.
      if (!m[1].includes('${')) refs.add(m[1]);
    }
  }
  for (const a of refs) {
    if (!fs.existsSync(path.join(PUBLIC, a.replace(/^\//, '')))) err(`missing asset ${a}`);
  }
  if (errors === before) console.log(`  ✓ all ${refs.size} referenced assets exist in public/`);
}

// ---- 6. Page head -----------------------------------------------------------
console.log('\n[6] Page metadata');
{
  const before = errors;
  for (const f of walk(path.join(SRC, 'pages'))) {
    const src = read(f);
    // BlogPost sets its head from the article it loads.
    if (path.basename(f) === 'BlogPost.jsx') continue;
    if (!/<Seo\b/.test(src)) err(`${rel(f)}: no <Seo> title`);
  }
  const shell = read(path.join(ROOT, 'index.html'));
  if (!/name="viewport"/.test(shell)) err('index.html: no viewport meta');
  if (!/<title>/.test(shell)) err('index.html: no default title');
  if (errors === before) console.log('  ✓ every page sets a title; the shell has viewport and defaults');
}

console.log(errors ? `\n${errors} problem(s) found\n` : '\nAll checks passed\n');
process.exit(errors ? 1 : 0);

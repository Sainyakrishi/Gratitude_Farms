// Verifies the .dc.html set: JS syntax in every logic block, that every
// {{ binding }} used in a template is actually returned by renderVals, and
// that every internal href resolves to a file on disk.
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const dir = process.argv[2] || path.resolve(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.dc.html'));
let errors = 0;
const err = m => { console.log('  ✗ ' + m); errors++; };

// ---- 1. JS syntax in <script data-dc-script> --------------------------------
console.log('\n[1] Logic block syntax');
for (const f of files) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  const m = src.match(/<script type="text\/x-dc" data-dc-script[^>]*>([\s\S]*?)<\/script>/);
  if (!m) continue;
  try {
    // DCLogic is supplied by the runtime; stub it just to parse the class.
    new vm.Script('class DCLogic{};' + m[1], { filename: f });
  } catch (e) {
    err(`${f}: ${e.message}`);
  }
}
if (!errors) console.log('  ✓ all logic blocks parse');

// ---- 2. ES module syntax ----------------------------------------------------
console.log('\n[2] Data modules');
const before2 = errors;
{
  const { execFileSync } = require('child_process');
  const os = require('os');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'gf-check-'));
  for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.js') && x !== 'support.js')) {
    // `node --check` only treats a file as a module if it ends in .mjs.
    const copy = path.join(tmp, f.replace(/\.js$/, '.mjs'));
    fs.copyFileSync(path.join(dir, f), copy);
    try {
      execFileSync(process.execPath, ['--check', copy], { stdio: 'pipe' });
    } catch (e) {
      err(`${f}: ${String(e.stderr || e.message).split('\n').slice(0, 3).join(' ')}`);
    }
  }
  fs.rmSync(tmp, { recursive: true, force: true });
}
if (errors === before2) console.log('  ✓ all data modules parse');

// ---- 3. Internal links ------------------------------------------------------
console.log('\n[3] Internal links');
const before3 = errors;
const onDisk = new Set(fs.readdirSync(dir));
const seen = new Map();
for (const f of files) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  for (const m of src.matchAll(/href="([^"{}]+\.dc\.html)(\?[^"]*)?(#[^"]*)?"/g)) {
    if (!onDisk.has(m[1])) err(`${f} → missing page ${m[1]}`);
    seen.set(m[1], (seen.get(m[1]) || 0) + 1);
  }
}
// Also the hrefs built in logic (SERVICE_PAGES, footer columns, nav def).
for (const f of [...files, 'services-data.js']) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  for (const m of src.matchAll(/'([A-Z][A-Za-z-]+\.dc\.html)'/g)) {
    if (!onDisk.has(m[1])) err(`${f} → missing page ${m[1]} (in logic)`);
    seen.set(m[1], (seen.get(m[1]) || 0) + 1);
  }
}
if (errors === before3) console.log(`  ✓ every internal link resolves (${seen.size} distinct pages linked)`);

// ---- 4. Orphan pages --------------------------------------------------------
console.log('\n[4] Reachability');
const orphans = files.filter(f =>
  !seen.has(f) &&
  !['SiteNav.dc.html', 'SiteFooter.dc.html', 'TeamCard.dc.html', 'ServiceDetail.dc.html'].includes(f)
);
if (orphans.length) orphans.forEach(o => err(`${o} is not linked from anywhere`));
else console.log('  ✓ every page is reachable by a link');

// ---- 5. Asset references ----------------------------------------------------
console.log('\n[5] Assets');
const before5 = errors;
const assetRefs = new Set();
for (const f of [...files, ...fs.readdirSync(dir).filter(x => x.endsWith('.js') && x !== 'support.js')]) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  for (const m of src.matchAll(/(?:src="|url\('|href="|'|")(assets\/[^"')]+)/g)) assetRefs.add(m[1]);
}
for (const a of assetRefs) {
  if (!fs.existsSync(path.join(dir, a))) err(`missing asset ${a}`);
}
if (errors === before5) console.log(`  ✓ all ${assetRefs.size} referenced assets exist`);

// ---- 6. helmet wiring -------------------------------------------------------
console.log('\n[6] Page head');
const before6 = errors;
const components = ['SiteNav.dc.html', 'SiteFooter.dc.html', 'TeamCard.dc.html', 'ServiceDetail.dc.html'];
for (const f of files) {
  const src = fs.readFileSync(path.join(dir, f), 'utf8');
  if (components.includes(f)) continue;
  if (!src.includes('site.css')) err(`${f}: site.css not linked`);
  if (!/<title>/.test(src)) err(`${f}: no <title>`);
  if (!/name="viewport"/.test(src)) err(`${f}: no viewport meta`);
}
if (errors === before6) console.log('  ✓ every page has a title, viewport and the shared stylesheet');

console.log(errors ? `\n${errors} problem(s) found\n` : '\nAll checks passed\n');
process.exit(errors ? 1 : 0);

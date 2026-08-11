/**
 * One-shot codemod: `legacy/*.dc.html` → `src/pages` + `src/components`.
 *
 * The old pages were written in a small template dialect interpreted at runtime
 * by `legacy/support.js`:
 *
 *   <x-dc>                        the template root
 *   {{ expr }}                    interpolation, in text and in attributes
 *   <sc-for list="{{ xs }}" as="x">   repetition
 *   <sc-if value="{{ c }}">           conditional
 *   <dc-import name="X" a="b">        another component
 *   style-hover="…"                   declarations applied while hovered
 *   <script type="text/x-dc">class Component extends DCLogic { … }</script>
 *
 * The dialect is close enough to React that the translation is mechanical, and
 * the logic block is closer still: `DCLogic` was React's own class component
 * with `renderVals()` standing in for the top of `render()`. So the script
 * block carries over almost verbatim — state, lifecycle and all — and only the
 * markup is rewritten.
 *
 * Run once:  node tools/dc-to-jsx.mjs
 * It is kept in the repository as the record of how the port was made.
 */

import { parseFragment } from 'parse5';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const LEGACY = join(ROOT, 'legacy');

// ---------------------------------------------------------------------------
// What each source file becomes
// ---------------------------------------------------------------------------

const COMPONENTS = {
  'SiteNav.dc.html': 'SiteNav',
  'SiteFooter.dc.html': 'SiteFooter',
  'TeamCard.dc.html': 'TeamCard',
  'ServiceDetail.dc.html': 'ServiceDetail'
};

const PAGES = {
  'Home.dc.html': 'Home',
  'About-Us.dc.html': 'AboutUs',
  'Our-Team.dc.html': 'OurTeam',
  'Our-Services.dc.html': 'OurServices',
  'Managed-Farmland.dc.html': 'ManagedFarmland',
  'Soil-Fertility-BhuPrana.dc.html': 'SoilFertility',
  'Farmland-Design-Vasudha.dc.html': 'FarmlandDesign',
  'Farmland-Operate-Sanjeevani.dc.html': 'FarmlandOperate',
  'Farmland-Development.dc.html': 'FarmlandDevelopment',
  'Nakshatra-Vanam.dc.html': 'NakshatraVanam',
  'Corporate-ESG.dc.html': 'CorporateEsg',
  'Sainya-Krishi.dc.html': 'SainyaKrishi',
  'Medicinal-Plants-Trees.dc.html': 'MedicinalPlantsTrees',
  'Vriksh-Ayurveda.dc.html': 'VrikshAyurveda',
  'Blog.dc.html': 'Blog',
  'Blog-Post.dc.html': 'BlogPost',
  'Contact.dc.html': 'Contact',
  'Privacy-Policy.dc.html': 'PrivacyPolicy',
  'Terms.dc.html': 'Terms',
  'Admin-Dashboard.dc.html': 'AdminDashboard'
};

// Legacy filename → router path. Mirrors src/lib/routes.js; kept here so the
// codemod can resolve hrefs at build time instead of leaving them to runtime.
const ROUTES = {
  'Home.dc.html': '/',
  'About-Us.dc.html': '/about-us',
  'Our-Team.dc.html': '/our-team',
  'Our-Services.dc.html': '/services',
  'Managed-Farmland.dc.html': '/services/managed-farmland',
  'Soil-Fertility-BhuPrana.dc.html': '/services/soil-fertility',
  'Farmland-Design-Vasudha.dc.html': '/services/farmland-design',
  'Farmland-Operate-Sanjeevani.dc.html': '/services/farmland-operate',
  'Farmland-Development.dc.html': '/farmland-development',
  'Nakshatra-Vanam.dc.html': '/nakshatra-vanam',
  'Corporate-ESG.dc.html': '/corporate-esg',
  'Sainya-Krishi.dc.html': '/sainya-krishi',
  'Medicinal-Plants-Trees.dc.html': '/medicinal-plants-trees',
  'Vriksh-Ayurveda.dc.html': '/vriksh-ayurveda',
  'Blog.dc.html': '/blog',
  'Contact.dc.html': '/contact',
  'Privacy-Policy.dc.html': '/privacy-policy',
  'Terms.dc.html': '/terms',
  'Admin-Dashboard.dc.html': '/admin'
};

// Two pages animate with a keyframe name that another page defines differently
// (fadeUp travels 18px here and 24px there). The stylesheet now carries both
// under distinct names; these pages point at the variant they were written for.
const ANIMATION_RENAMES = {
  'Blog.dc.html': { fadeUp: 'fadeUpSm' },
  'Our-Services.dc.html': { fadeUp: 'fadeUpSm', slideKen: 'slideKenSm' }
};

// ---------------------------------------------------------------------------
// HTML attribute → JSX prop
// ---------------------------------------------------------------------------

const ATTR_MAP = {
  class: 'className',
  for: 'htmlFor',
  novalidate: 'noValidate',
  autocomplete: 'autoComplete',
  maxlength: 'maxLength',
  minlength: 'minLength',
  readonly: 'readOnly',
  tabindex: 'tabIndex',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  contenteditable: 'contentEditable',
  spellcheck: 'spellCheck',
  crossorigin: 'crossOrigin',
  allowfullscreen: 'allowFullScreen',
  playsinline: 'playsInline',
  srcset: 'srcSet',
  usemap: 'useMap',
  enctype: 'encType',
  formaction: 'formAction',
  accesskey: 'accessKey',
  autofocus: 'autoFocus',
  inputmode: 'inputMode'
};

/**
 * HTML attribute names are case-insensitive, so the parser hands back
 * `onclick` for what the template wrote as `onClick`. React only recognises a
 * handler in its own casing, and silently ignores anything else — which is why
 * this map lists every event the templates use, plus its near neighbours.
 */
const EVENT_MAP = Object.fromEntries(
  [
    'onClick', 'onDoubleClick', 'onChange', 'onInput', 'onSubmit', 'onReset',
    'onFocus', 'onBlur', 'onKeyDown', 'onKeyUp', 'onKeyPress',
    'onMouseEnter', 'onMouseLeave', 'onMouseOver', 'onMouseOut', 'onMouseDown',
    'onMouseUp', 'onMouseMove', 'onContextMenu', 'onWheel', 'onScroll',
    'onTouchStart', 'onTouchEnd', 'onTouchMove', 'onTouchCancel',
    'onPointerDown', 'onPointerUp', 'onPointerMove', 'onPointerEnter',
    'onPointerLeave', 'onDragStart', 'onDragEnd', 'onDragOver', 'onDrop',
    'onLoad', 'onError', 'onSelect', 'onInvalid', 'onAnimationEnd',
    'onTransitionEnd'
  ].map((name) => [name.toLowerCase(), name])
);

// Boolean attributes that React wants as `true`, not as the string "true".
const BOOLEAN_ATTRS = new Set([
  'noValidate', 'disabled', 'checked', 'readOnly', 'required', 'multiple',
  'autoFocus', 'allowFullScreen', 'playsInline', 'hidden', 'open', 'loop',
  'muted', 'controls', 'autoPlay', 'defer', 'async', 'selected', 'reversed'
]);

/** SVG presentation attributes React spells in camelCase. */
function svgAttr(name) {
  // xlink:href and friends keep their own shape; none are used here.
  if (name.includes(':')) return null;
  return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

const SVG_DASHED = /^(stroke|fill|font|text|clip|color|marker|stop|flood|paint|shape|vector|dominant|alignment|baseline|letter|word|writing|image|pointer|glyph|horiz|vert|arabic|cap|overline|underline|strikethrough|panose|rendering|units|x|v)-/;

function jsxAttrName(name, inSvg) {
  if (name.startsWith('data-') || name.startsWith('aria-')) return name;
  if (EVENT_MAP[name]) return EVENT_MAP[name];
  if (ATTR_MAP[name]) return ATTR_MAP[name];
  if (/^on[A-Z]/.test(name)) return name;
  if (inSvg && name.includes('-') && SVG_DASHED.test(name)) return svgAttr(name) ?? name;
  if (name.includes('-')) return name;
  return name;
}

// ---------------------------------------------------------------------------
// {{ }} interpolation
// ---------------------------------------------------------------------------

const BINDING = /\{\{([\s\S]*?)\}\}/g;

/** True when the value is exactly one binding and nothing else. */
function soleBinding(value) {
  const m = /^\s*\{\{([\s\S]*?)\}\}\s*$/.exec(value);
  return m ? m[1].trim() : null;
}

function hasBinding(value) {
  return value.includes('{{');
}

/**
 * Names a binding may use that are not values from the component.
 * Anything else at the head of a reference is one of `renderVals()`'s keys (or
 * a prop, in a component with no logic block) and has to be read off it.
 */
const GLOBALS = new Set([
  'true', 'false', 'null', 'undefined', 'this', 'new', 'typeof', 'void',
  'in', 'of', 'instanceof', 'delete', 'return', 'function', 'window',
  'document', 'String', 'Number', 'Boolean', 'Math', 'Object', 'Array',
  'JSON', 'Date', 'RegExp', 'Map', 'Set', 'Promise', 'console', 'e'
]);

// The head of a reference: an identifier not preceded by `.` and not itself a
// property key or a string's contents.
const IDENT_HEAD = /(^|[^\w$.])([A-Za-z_$][\w$]*)/g;

/**
 * Rewrites a binding expression so its free identifiers resolve.
 *
 * `{{ services }}` → `$v.services`, but `{{ b.opacity }}` inside
 * `<sc-for as="b">` keeps `b` — the loop introduced it. Only the head of each
 * reference is touched; property names after a dot are left alone.
 */
function bindingExpr(expr, scope, prefix) {
  return expr.replace(IDENT_HEAD, (match, pre, id) => {
    if (GLOBALS.has(id)) return match;
    if (scope.has(id)) return match;
    return `${pre}${prefix}.${id}`;
  });
}

/**
 * Turns mixed text into a JS expression.
 * "opacity:{{ b.o }};" → `` `opacity:${b.o};` ``
 */
function toTemplateLiteral(value, scope, prefix) {
  const escaped = value
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${');
  return (
    '`' +
    escaped.replace(BINDING, (_, expr) => '${' + bindingExpr(expr.trim(), scope, prefix) + '}') +
    '`'
  );
}

/** An attribute value as a JSX prop value: string literal, or `{expr}`. */
function attrValue(value, scope, prefix) {
  if (!hasBinding(value)) return JSON.stringify(value);
  const sole = soleBinding(value);
  if (sole !== null) return `{${bindingExpr(sole, scope, prefix)}}`;
  return `{${toTemplateLiteral(value, scope, prefix)}}`;
}

// ---------------------------------------------------------------------------
// hrefs
// ---------------------------------------------------------------------------

function rewriteHref(value) {
  if (hasBinding(value)) return value;          // resolved at runtime by <A>
  if (value === './' || value === '.') return '/';
  if (/^(https?:|mailto:|tel:|sms:|#|\/\/)/i.test(value)) return value;

  const m = /^([^?#]*)(\?[^#]*)?(#.*)?$/.exec(value);
  if (!m) return value;
  const [, file, query = '', hash = ''] = m;

  // One page's identity moved out of the query and into the path.
  if (file === 'Blog-Post.dc.html') {
    const slug = new URLSearchParams(query.slice(1)).get('slug');
    return slug ? `/blog/${slug}${hash}` : `/blog${hash}`;
  }

  const target = ROUTES[file];
  if (!target) return value;
  return `${target}${query}${hash}`;
}

/** Relative asset references break under nested routes; anchor them at the root. */
function rewriteAssets(value) {
  return value.replace(/(^|['"(\s])assets\//g, '$1/assets/');
}

/**
 * The logic block moves across unchanged apart from the three things that were
 * true of a file-per-page site and are not true of a routed one: sibling data
 * modules, page-relative asset paths, and links written as filenames.
 */
function rewriteLogic(logic) {
  let out = logic;

  // The data modules moved from the site root to src/data; both src/pages and
  // src/components reach them the same way.
  out = out.replace(/(\bimport\(\s*['"])\.\/([\w.-]+\.js['"]\s*\))/g, '$1../data/$2');

  out = rewriteAssets(out);

  // `Blog-Post.dc.html?slug=…` — the post's identity moved into the path.
  // Handled before the general case, since its query does not survive.
  out = out.replace(/(['"`])Blog-Post\.dc\.html\?slug=([^'"`]*)\1/g, '$1/blog/$2$1');

  // Links held in the logic — the home carousel, the nav's page graph, the
  // footer sitemap — become router paths, same as the ones in the markup.
  // The filename is replaced in place, so a surrounding template literal keeps
  // whatever `${…}` follows it.
  out = out.replace(/([\w-]+\.dc\.html)/g, (match) => ROUTES[match] ?? match);

  return out;
}

// ---------------------------------------------------------------------------
// Emitting JSX
// ---------------------------------------------------------------------------

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link',
  'meta', 'param', 'source', 'track', 'wbr'
]);

class Emitter {
  /**
   * @param {string} file  source filename, for the keyframe renames
   * @param {string} prefix  where a binding's free names live at runtime —
   *   `$v` for a component with a `renderVals()`, `props` for one without
   */
  constructor(file, prefix) {
    this.file = file;
    this.prefix = prefix;
    this.imports = new Set();       // component names used via <dc-import>
    this.usesA = false;
    this.usesHov = false;
    this.warnings = [];
    this.animations = ANIMATION_RENAMES[file] || {};
  }

  warn(msg) {
    this.warnings.push(msg);
  }

  /** Applies the per-page keyframe renames to a style string. */
  styleText(text) {
    let out = rewriteAssets(text);
    for (const [from, to] of Object.entries(this.animations)) {
      out = out.replace(new RegExp(`animation:${from}\\b`, 'g'), `animation:${to}`);
    }
    return out;
  }

  /** `style="…"` → `style={css("…")}`, keeping any interpolation intact. */
  styleProp(name, value, scope) {
    const text = this.styleText(value);
    if (!hasBinding(text)) return `${name}={css(${JSON.stringify(text)})}`;
    return `${name}={css(${toTemplateLiteral(text, scope, this.prefix)})}`;
  }

  attrs(node, inSvg, scope) {
    const parts = [];
    let sawHover = false;

    for (const attr of node.attrs || []) {
      const name = attr.name;
      let value = attr.value;

      if (name.startsWith('hint-')) continue;        // editor-only sizing hints
      if (name === 'data-dc-script' || name === 'data-props') continue;

      if (name === 'style') {
        parts.push(this.styleProp('style', value, scope));
        continue;
      }
      if (name === 'style-hover') {
        sawHover = true;
        parts.push(this.styleProp('hoverStyle', value, scope));
        continue;
      }
      if (name === 'href' || name === 'src' || name === 'action') {
        value = name === 'href' ? rewriteHref(value) : value;
        value = rewriteAssets(value);
      }

      const jsxName = jsxAttrName(name, inSvg);

      // React ignores a handler it does not recognise, and does it quietly.
      // Anything that still looks like an event but is not in EVENT_MAP would
      // become a dead listener, so it is surfaced instead.
      if (/^on[a-z]/.test(jsxName)) {
        this.warn(`unmapped event handler "${name}" on <${node.nodeName}>`);
      }

      // `disabled="{{ busy }}"` is a real boolean; `disabled="true"` in the
      // source meant the attribute was present.
      if (BOOLEAN_ATTRS.has(jsxName) && !hasBinding(value)) {
        parts.push(value === 'false' ? `${jsxName}={false}` : `${jsxName}`);
        continue;
      }

      parts.push(`${jsxName}=${attrValue(value, scope, this.prefix)}`);
    }

    return { parts, sawHover };
  }

  /**
   * Text content as JSX children. Literal runs are emitted as string
   * expressions rather than raw JSX text, so braces, angle brackets and
   * entity-decoded characters need no further escaping.
   */
  text(value, scope) {
    if (!hasBinding(value)) {
      if (!value.trim()) return '';
      return `{${JSON.stringify(value)}}`;
    }

    let out = '';
    let last = 0;
    BINDING.lastIndex = 0;
    let m;
    while ((m = BINDING.exec(value)) !== null) {
      const before = value.slice(last, m.index);
      if (before) out += `{${JSON.stringify(before)}}`;
      out += `{${bindingExpr(m[1].trim(), scope, this.prefix)}}`;
      last = m.index + m[0].length;
    }
    const tail = value.slice(last);
    if (tail) out += `{${JSON.stringify(tail)}}`;
    return out;
  }

  children(nodes, indent, inSvg, scope) {
    return nodes
      .map((n) => this.node(n, indent, inSvg, scope))
      .filter((s) => s !== '')
      .join('\n');
  }

  node(node, indent, inSvg, scope) {
    const pad = '  '.repeat(indent);

    if (node.nodeName === '#text') {
      const t = this.text(node.value, scope);
      return t.trim() ? pad + t : '';
    }
    if (node.nodeName === '#comment') {
      const body = node.data.trim().replace(/\*\//g, '*\\/');
      return `${pad}{/* ${body} */}`;
    }

    let tag = node.nodeName;
    const kids = node.childNodes || [];

    // --- control flow -----------------------------------------------------

    if (tag === 'sc-for') {
      const listAttr = node.attrs.find((a) => a.name === 'list');
      const asAttr = node.attrs.find((a) => a.name === 'as');
      const raw = soleBinding(listAttr?.value ?? '');
      const list = raw === null ? 'null' : bindingExpr(raw, scope, this.prefix);
      const item = asAttr?.value || 'item';
      const idx = `${item}Index`;

      // The loop variable shadows anything of the same name outside it.
      const inner = this.children(kids, indent + 2, inSvg, new Set([...scope, item, idx]));

      return (
        `${pad}{(${list} || []).map((${item}, ${idx}) => (\n` +
        `${pad}  <Fragment key={${idx}}>\n` +
        `${inner}\n` +
        `${pad}  </Fragment>\n` +
        `${pad}))}`
      );
    }

    if (tag === 'sc-if') {
      const valAttr = node.attrs.find((a) => a.name === 'value');
      const raw = soleBinding(valAttr?.value ?? '');
      const cond = raw === null ? 'false' : bindingExpr(raw, scope, this.prefix);
      const inner = this.children(kids, indent + 1, inSvg, scope);
      return (
        `${pad}{(${cond}) ? (\n` +
        `${pad}  <>\n` +
        `${inner}\n` +
        `${pad}  </>\n` +
        `${pad}) : null}`
      );
    }

    if (tag === 'dc-import') {
      const nameAttr = node.attrs.find((a) => a.name === 'name');
      const name = nameAttr?.value;
      if (!name) {
        this.warn('<dc-import> without a name');
        return '';
      }
      this.imports.add(name);
      const props = (node.attrs || [])
        .filter((a) => a.name !== 'name' && !a.name.startsWith('hint-'))
        .map((a) => {
          // service-key="x" is a prop named serviceKey.
          const prop = a.name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          return `${prop}=${attrValue(a.value, scope, this.prefix)}`;
        });
      return `${pad}<${name}${props.length ? ' ' + props.join(' ') : ''} />`;
    }

    // helmet content moved into the stylesheet and index.html at port time.
    if (tag === 'helmet') return '';

    if (tag === 'x-dc') return this.children(kids, indent, inSvg, scope);

    // --- ordinary elements ------------------------------------------------

    const nowSvg = inSvg || tag === 'svg';
    const { parts, sawHover } = this.attrs(node, nowSvg, scope);

    if (tag === 'sc-select') tag = 'select';

    let name = tag;
    if (tag === 'a') {
      name = 'A';
      this.usesA = true;
    } else if (sawHover) {
      name = 'Hov';
      this.usesHov = true;
      parts.unshift(`as="${tag}"`);
    }

    const attrText = parts.length ? ' ' + parts.join(' ') : '';

    if (VOID_TAGS.has(tag)) return `${pad}<${name}${attrText} />`;

    const inner = this.children(kids, indent + 1, nowSvg, scope);
    if (!inner) return `${pad}<${name}${attrText} />`;

    return `${pad}<${name}${attrText}>\n${inner}\n${pad}</${name}>`;
  }
}

// ---------------------------------------------------------------------------
// The logic block
// ---------------------------------------------------------------------------

/**
 * `class Component extends DCLogic { … renderVals() { … } }` becomes a React
 * class component. `renderVals` is left exactly as it was and called from
 * `render()`, so every binding in the markup still reads from the same names.
 */
function buildComponent(name, logic, jsx, meta) {
  const hasLogic = Boolean(logic && logic.trim());

  const seo = meta.title
    ? `      <Seo title={${JSON.stringify(meta.title)}}${
        meta.description ? ` description={${JSON.stringify(meta.description)}}` : ''
      } />\n`
    : '';

  if (!hasLogic) {
    return (
      `export default function ${name}(props) {\n` +
      `  return (\n` +
      `    <>\n` +
      seo +
      `${jsx}\n` +
      `    </>\n` +
      `  );\n` +
      `}\n`
    );
  }

  const body = logic
    .replace(/^\s*class\s+Component\s+extends\s+DCLogic\s*\{/, '')
    .replace(/\}\s*$/, '')
    .trimEnd();

  const hasRenderVals = /\brenderVals\s*\(/.test(body);
  const vals = hasRenderVals
    ? '    const $v = this.renderVals();\n'
    : '    const $v = {};\n';

  return (
    `class ${name} extends Component {\n` +
    `${body}\n\n` +
    `  render() {\n` +
    vals +
    `    return (\n` +
    `      <>\n` +
    seo +
    `${jsx}\n` +
    `      </>\n` +
    `    );\n` +
    `  }\n` +
    `}\n\n` +
    `export default ${name};\n`
  );
}

// ---------------------------------------------------------------------------
// Driver
// ---------------------------------------------------------------------------

/**
 * `<select>` has a restrictive content model: the HTML parser's "in select"
 * insertion mode keeps only `<option>`, `<optgroup>` and friends, and silently
 * drops anything else — including an `<sc-for>` wrapping the options, whose
 * children it then re-parents. Renaming the element puts its subtree back under
 * the ordinary "in body" rules; the emitter turns it back into a `<select>`.
 */
function neutraliseSelects(markup) {
  return markup.replace(/<select\b/g, '<sc-select').replace(/<\/select>/g, '</sc-select>');
}

function extract(html) {
  const scriptMatch = /<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/.exec(html);
  const logic = scriptMatch ? rewriteLogic(scriptMatch[1]) : '';

  const bodyMatch = /<x-dc>([\s\S]*?)<\/x-dc>/.exec(html);
  const markup = bodyMatch ? neutraliseSelects(bodyMatch[1]) : '';

  const title = /<title>([\s\S]*?)<\/title>/.exec(html)?.[1]?.trim();
  const description = /<meta name="description" content="([^"]*)"/.exec(html)?.[1];

  return { logic, markup, title, description };
}

/**
 * Two components need something the dialect had no way to express, because the
 * old site got it from the URL bar and a per-page stylesheet. The edits are
 * kept here rather than applied by hand so that re-running the codemod
 * reproduces the source tree exactly; each one asserts its anchor, so a change
 * upstream fails loudly instead of silently dropping the patch.
 */
const PATCHES = {
  // The post's slug used to come from `?slug=`; it is now a route parameter,
  // passed in as a prop. Moving between posts keeps the component mounted, so
  // the article also has to reload when that prop changes.
  BlogPost: [
    [
      `  componentDidMount() {\n    const slug = new URLSearchParams(window.location.search).get('slug') || '';\n    import('../data/blog-data.js').then(mod => {`,
      `  componentDidMount() {\n` +
      `    this.load();\n` +
      `  }\n\n` +
      `  componentDidUpdate(prev) {\n` +
      `    if (prev.slug !== this.props.slug) {\n` +
      `      this.setState({ post: null, blocks: [], keywords: [], related: [], notFound: false });\n` +
      `      this.load();\n` +
      `    }\n` +
      `  }\n\n` +
      `  load() {\n` +
      `    const slug = this.props.slug || '';\n` +
      `    import('../data/blog-data.js').then(mod => {`
    ]
  ],

  // The console is the one page that sat on a darker ground. With a single
  // document the background is a body class it owns for as long as it is shown.
  AdminDashboard: [
    [
      `  componentDidMount() {\n    import('../data/blog-data.js').then(mod => {`,
      `  componentDidMount() {\n` +
      `    document.body.classList.add('gf-admin');\n\n` +
      `    import('../data/blog-data.js').then(mod => {`
    ],
    [
      `      this.setState({ blogs });\n    });\n  }\n`,
      `      this.setState({ blogs });\n` +
      `    });\n` +
      `  }\n\n` +
      `  componentWillUnmount() {\n` +
      `    document.body.classList.remove('gf-admin');\n` +
      `    clearTimeout(this._t);\n` +
      `  }\n`
    ]
  ]
};

function applyPatches(name, source) {
  const patches = PATCHES[name];
  if (!patches) return source;

  let out = source;
  for (const [from, to] of patches) {
    if (!out.includes(from)) {
      throw new Error(`${name}: patch anchor no longer present:\n${from.slice(0, 90)}…`);
    }
    out = out.replace(from, to);
  }
  return out;
}

function convert(file, outName, kind) {
  const html = readFileSync(join(LEGACY, file), 'utf8');
  const { logic, markup, title, description } = extract(html);

  const hasLogic = Boolean(logic.trim());
  const emitter = new Emitter(file, hasLogic ? '$v' : 'props');
  const frag = parseFragment(markup);
  const indent = hasLogic ? 4 : 3;
  const jsx = emitter.children(frag.childNodes, indent, false, new Set());

  const importLines = [];
  const reactBits = [];
  if (hasLogic) reactBits.push('Component');
  if (/<Fragment key=/.test(jsx)) reactBits.push('Fragment');
  if (reactBits.length) importLines.push(`import { ${reactBits.join(', ')} } from 'react';`);

  const libBits = [];
  if (emitter.usesA) libBits.push('A');
  if (emitter.usesHov) libBits.push('Hov');
  if (title) libBits.push('Seo');
  const depth = kind === 'page' ? '../' : '../';
  if (libBits.length) importLines.push(`import { ${libBits.join(', ')} } from '${depth}lib/ui.jsx';`);
  importLines.push(`import { css } from '${depth}lib/css.js';`);

  for (const name of emitter.imports) {
    const from = kind === 'component' ? `./${name}.jsx` : `../components/${name}.jsx`;
    importLines.push(`import ${name} from '${from}';`);
  }

  // The parser applies HTML's content models, and some of them drop elements
  // it does not expect rather than reporting them — which is how an `<sc-for>`
  // inside a `<select>` disappeared, taking a loop with it. Counting the
  // control-flow tags in against the constructs out turns that class of silent
  // loss into a failure.
  const expected = {
    for: (markup.match(/<sc-for\b/g) || []).length,
    if: (markup.match(/<sc-if\b/g) || []).length,
    import: (markup.match(/<dc-import\b/g) || []).length
  };
  const actual = {
    for: (jsx.match(/\|\| \[\]\)\.map\(\(/g) || []).length,
    if: (jsx.match(/\) \? \(\n/g) || []).length,
    import: [...emitter.imports].reduce(
      (n, name) => n + (jsx.match(new RegExp(`<${name}[\\s/]`, 'g')) || []).length, 0
    )
  };
  for (const key of ['for', 'if', 'import']) {
    if (expected[key] !== actual[key]) {
      emitter.warn(`${expected[key]} <sc-${key}>/<dc-${key}> in source but ${actual[key]} emitted`);
    }
  }

  const source = applyPatches(
    outName,
    importLines.join('\n') + '\n\n' + buildComponent(outName, logic, jsx, { title, description })
  );

  const dir = kind === 'component' ? join(ROOT, 'src', 'components') : join(ROOT, 'src', 'pages');
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, `${outName}.jsx`), source, 'utf8');

  return { file, outName, warnings: emitter.warnings, bytes: source.length };
}

const results = [];
for (const [file, name] of Object.entries(COMPONENTS)) {
  results.push(convert(file, name, 'component'));
}
for (const [file, name] of Object.entries(PAGES)) {
  results.push(convert(file, name, 'page'));
}

for (const r of results) {
  const w = r.warnings.length ? `  ⚠ ${r.warnings.join('; ')}` : '';
  console.log(`${r.file.padEnd(36)} → ${r.outName.padEnd(22)} ${String(r.bytes).padStart(7)}b${w}`);
}
console.log(`\n${results.length} files converted.`);

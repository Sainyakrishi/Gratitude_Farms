/**
 * CSS declaration text → React style object.
 *
 * The design lives in inline styles: every page carries its desktop look as a
 * `style="…"` string, and `site.css` layers the media queries on top. Keeping
 * those declarations as CSS text — rather than hand-translating ~6000 of them
 * into object literals — is what lets the templates stay readable and lets the
 * stylesheet's `!important` overrides keep working against them unchanged.
 *
 * Values stay strings, so React never guesses a unit: `padding: '16px 32px'`
 * and `flex: '0 0 auto'` survive exactly as written.
 */

const cache = new Map();

// Dynamic styles (`opacity:${o};`) produce a fresh string per render. The set of
// distinct values is small in practice, but the cap keeps a runaway interpolation
// from growing the map without bound.
const MAX_CACHE = 4000;

/**
 * Splits on top-level `;` only — separators inside `url(…)`, `clamp(…)`,
 * `linear-gradient(…)` or a quoted font name are part of the value.
 */
function splitTop(text, sep) {
  const parts = [];
  let depth = 0;
  let quote = null;
  let start = 0;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quote) {
      if (ch === quote && text[i - 1] !== '\\') quote = null;
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === '(') {
      depth++;
    } else if (ch === ')') {
      if (depth > 0) depth--;
    } else if (ch === sep && depth === 0) {
      parts.push(text.slice(start, i));
      start = i + 1;
    }
  }
  parts.push(text.slice(start));
  return parts;
}

function toReactKey(prop) {
  // Custom properties are passed through verbatim — React writes them with
  // setProperty, which is the only way `--gf-card-w` reaches the element.
  if (prop.startsWith('--')) return prop;

  const camel = prop.replace(/-([a-z])/g, (_, c) => c.toUpperCase());

  // `-webkit-backdrop-filter` → `WebkitBackdropFilter`. `-ms-` is the one
  // vendor prefix React spells with a lowercase first letter.
  if (prop.startsWith('-ms-')) return camel.slice(2, 3).toLowerCase() + camel.slice(3);
  if (prop.startsWith('-')) return camel.charAt(1).toUpperCase() + camel.slice(2);

  return camel;
}

/**
 * @param {string} text CSS declarations, e.g. "display:flex;gap:12px"
 * @returns {Object} a React style object — frozen, since callers share it
 */
export function css(text) {
  if (!text) return EMPTY;

  const hit = cache.get(text);
  if (hit) return hit;

  const style = {};
  for (const decl of splitTop(text, ';')) {
    const colon = decl.indexOf(':');
    if (colon === -1) continue;
    const prop = decl.slice(0, colon).trim();
    const value = decl.slice(colon + 1).trim();
    if (!prop || !value) continue;
    style[toReactKey(prop)] = value;
  }

  Object.freeze(style);
  if (cache.size >= MAX_CACHE) cache.clear();
  cache.set(text, style);
  return style;
}

const EMPTY = Object.freeze({});

/** Merges style objects, skipping the nullish ones. */
export function mergeStyle(...styles) {
  const out = {};
  for (const s of styles) if (s) Object.assign(out, s);
  return out;
}

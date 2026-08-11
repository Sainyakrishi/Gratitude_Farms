import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { isExternal, toPath } from './routes.js';
import { mergeStyle } from './css.js';

/**
 * `style-hover` in the old templates put a second set of declarations on an
 * element for as long as the pointer was over it. There is no inline `:hover`,
 * so the hover state is held in the component and the two style objects are
 * merged — the same thing the old runtime did.
 */
function useHover(hoverStyle) {
  const [hovered, setHovered] = useState(false);
  const on = useCallback(() => setHovered(true), []);
  const off = useCallback(() => setHovered(false), []);

  return {
    active: hoverStyle ? hovered : false,
    // Focus is deliberately included: a keyboard user tabbing to a link should
    // see the same affordance a mouse user gets.
    handlers: hoverStyle
      ? { onMouseEnter: on, onMouseLeave: off, onFocus: on, onBlur: off }
      : null
  };
}

/**
 * Every link in the site.
 *
 * Internal destinations go through the router so navigation stays client-side;
 * mail, telephone, off-site and same-page-anchor hrefs are handed to the
 * browser as an ordinary `<a>`. `toPath` means a link written as
 * `About-Us.dc.html` — in a template or in a data file — still resolves.
 */
export function A({ href, style, hoverStyle, onMouseEnter, onMouseLeave, onFocus, onBlur, children, ...rest }) {
  const { active, handlers } = useHover(hoverStyle);
  const merged = active ? mergeStyle(style, hoverStyle) : style;

  // A template may already bind its own pointer handlers (the nav dropdowns do).
  // Both have to run, so they are chained rather than overwritten.
  const chain = (mine, theirs) =>
    mine && theirs ? (e) => { mine(e); theirs(e); } : mine || theirs;

  const events = {
    onMouseEnter: chain(handlers?.onMouseEnter, onMouseEnter),
    onMouseLeave: chain(handlers?.onMouseLeave, onMouseLeave),
    onFocus: chain(handlers?.onFocus, onFocus),
    onBlur: chain(handlers?.onBlur, onBlur)
  };

  if (isExternal(href)) {
    return <a href={href} style={merged} {...events} {...rest}>{children}</a>;
  }

  return <Link to={toPath(href)} style={merged} {...events} {...rest}>{children}</Link>;
}

/**
 * The same hover behaviour for the handful of non-link elements that carried a
 * `style-hover` — buttons, and one or two panels.
 */
export function Hov({ as: Tag = 'div', style, hoverStyle, onMouseEnter, onMouseLeave, children, ...rest }) {
  const { active, handlers } = useHover(hoverStyle);
  const merged = active ? mergeStyle(style, hoverStyle) : style;

  const chain = (mine, theirs) =>
    mine && theirs ? (e) => { mine(e); theirs(e); } : mine || theirs;

  return (
    <Tag
      style={merged}
      onMouseEnter={chain(handlers?.onMouseEnter, onMouseEnter)}
      onMouseLeave={chain(handlers?.onMouseLeave, onMouseLeave)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * Per-page `<title>` and description.
 *
 * The app renders on the client, so this is what a visitor sees in the tab and
 * what a crawler that executes JavaScript reads. Link previews and crawlers
 * that do not run JavaScript still get the defaults from `index.html` — the
 * same limitation the site had before the port.
 */
export function Seo({ title, description }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('name', 'description');
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', description);
    }
  }, [title, description]);

  return null;
}

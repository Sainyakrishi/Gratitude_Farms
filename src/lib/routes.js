/**
 * The site's page graph, and the bridge from the URLs it used to have.
 *
 * Before the React port every page was a file — `About-Us.dc.html` — and those
 * URLs are live, linked and indexed. `LEGACY_ROUTES` maps each one to its new
 * path; `App.jsx` turns the map into redirects so old links keep landing, and
 * `toPath()` applies it to any href that still reaches the browser as a
 * filename (a hardcoded link, or a value coming out of a data file).
 */

export const LEGACY_ROUTES = {
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
  'Blog-Post.dc.html': '/blog',
  'Contact.dc.html': '/contact',
  'Privacy-Policy.dc.html': '/privacy-policy',
  'Terms.dc.html': '/terms',
  'Admin-Dashboard.dc.html': '/admin'
};

/** Links the app must hand to the browser rather than to the router. */
export function isExternal(href) {
  return (
    !href ||
    /^(https?:|mailto:|tel:|sms:|#|\/\/)/i.test(href)
  );
}

/**
 * Normalises an href to a router path.
 *
 * Anything already absolute is returned untouched, so the clean paths written
 * throughout the ported templates cost nothing here. The rest is the legacy
 * shape: a bare filename, optionally with a query string. `Blog-Post.dc.html`
 * is the one page whose identity moved out of the query and into the path.
 */
export function toPath(href) {
  if (!href) return '/';
  if (href.startsWith('/')) return href;
  if (href === './' || href === '.' || href === '') return '/';

  const [file, query = ''] = href.split('?');
  const target = LEGACY_ROUTES[file];
  if (!target) return href.startsWith('/') ? href : `/${href}`;

  const params = new URLSearchParams(query);
  if (file === 'Blog-Post.dc.html') {
    const slug = params.get('slug');
    return slug ? `/blog/${slug}` : '/blog';
  }

  return query ? `${target}?${query}` : target;
}

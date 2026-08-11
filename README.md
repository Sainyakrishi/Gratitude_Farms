# Gratitude Farms — Website

Marketing site for Gratitude Farms Private Limited, Pondicherry: natural precision
farming, managed farmland services, and the Sainya Krishi ex-servicemen programme.

A React single-page app built with Vite.

## Running it

```bash
npm install
npm run dev        # http://localhost:8899
```

```bash
npm run build      # → dist/
npm run preview    # serves dist/ on 8899, the way a host will
```

## How the site is put together

```
index.html              ← the shell: fonts, favicon, default <title>
src/
  main.jsx              ← mounts <App> inside <BrowserRouter>
  App.jsx               ← every route, plus the redirects from the old URLs
  site.css              ← media queries, keyframes, focus states, shared classes
  lib/
    css.js              ← CSS declaration text → React style object
    ui.jsx              ← <A> (links), <Hov> (hover styles), <Seo> (page head)
    routes.js           ← the page graph and the legacy-URL map
  components/
    SiteNav.jsx         ← fixed nav; also owns the site's page graph (navDef)
    SiteFooter.jsx      ← sitemap, newsletter, contact dock
    ServiceDetail.jsx   ← one template behind four service pages
    TeamCard.jsx
  pages/                ← one component per route
  data/                 ← the content (see below)
public/
  assets/               ← images, brochures; served from /assets/…
  favicon.png, CNAME
```

### Styling

The desktop design lives in inline styles, as it did before the port, written as
ordinary CSS text and passed through `css()`:

```jsx
<div style={css("display:flex;gap:12px;color:#1A3C34;")}>
```

`css()` parses the string into a React style object once and caches it. Keeping
the declarations as CSS text is what lets `site.css` layer media queries on top
with `!important` — an important author rule is the only thing that beats an
inline style, and that is how the responsive behaviour is built.

`<A>` replaces `<a>` everywhere: internal destinations go through the router,
while `mailto:`, `tel:`, off-site and `#anchor` hrefs stay ordinary links.
It also carries `hoverStyle`, which is how the old `style-hover` attribute
survives.

### Content lives in data files, not in markup

| File | Holds |
|---|---|
| [`src/data/services-data.js`](src/data/services-data.js) | 4 services × 5 audience segments — deliverables, KPIs, SLA, pricing, add-ons |
| [`src/data/blog-data.js`](src/data/blog-data.js) | 7 articles as structured blocks, with per-post SEO metadata |
| [`src/data/trees-data.js`](src/data/trees-data.js) | 31 species in the cultivation catalogue |
| [`src/data/site-config.js`](src/data/site-config.js) | Contact details and form delivery |

Adding a service, article or species means editing one data file. Adding a
**page** means adding a component to `src/pages`, a `<Route>` in
[`src/App.jsx`](src/App.jsx), an entry in `navDef` in
[`SiteNav.jsx`](src/components/SiteNav.jsx), and one in the `columns` list in
[`SiteFooter.jsx`](src/components/SiteFooter.jsx).

## URLs

Pages are at clean paths — `/about-us`, `/services/managed-farmland`,
`/blog/<slug>`. The old `About-Us.dc.html` URLs all redirect to their new
homes, so published and indexed links keep working;
[`src/lib/routes.js`](src/lib/routes.js) holds that map and `App.jsx` mounts a
redirect for every entry.

## Making the contact form send email

Out of the box the contact form and the newsletter signup **validate, then hand
the completed enquiry to the visitor's mail client**, pre-addressed and
pre-filled. Nothing is silently dropped, but nothing reaches a server either.

To receive submissions properly, set one constant in
[`src/data/site-config.js`](src/data/site-config.js):

```js
export const FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
```

Any endpoint that accepts a JSON `POST` works — Formspree, Web3Forms, a Netlify
function, or your own API. Both forms switch over automatically.

## Checks

```bash
npm run check              # modules, links, routes, assets, page metadata (no browser)
npm run check:render       # loads all 21 routes at 1440px and 390px in Chrome
npm run check:interactions # drives the menus, forms, filters, tabs and redirects
```

`check:render` and `check:interactions` need the site running — `npm run dev`,
or `npm run build && npm run preview` to check what actually ships. They catch
console errors, broken images, horizontal overflow and nav/spacer drift.

## Deploying

`npm run build` produces `dist/`. Point any static host at it.

Because this is a single-page app, the host must serve the app shell for paths
that are not files — otherwise a visitor landing directly on `/about-us` gets a
404. The build writes a copy of the shell to `dist/404.html`, which is how
GitHub Pages does it. Netlify, Vercel and nginx use their own rewrite rules:

```
# netlify.toml / _redirects
/*  /index.html  200
```

## Known constraints

- **The site renders on the client.** Search engines and link previews get the
  `<title>`, description and favicon from `index.html`; per-page titles are set
  by JavaScript once the route mounts. If organic search matters, the fix is
  pre-rendering — `vite-plugin-ssg` or a move to Next/Astro. The data files and
  page components port over almost unchanged.
- **`overflow-x` must be `clip`, never `hidden`.** Adding `overflow-x:hidden`
  on `body` turns it into a one-viewport scroll container, which freezes
  `window.scrollY` and silently disables every `position:sticky` inside. `clip`
  suppresses the same overflow without creating a scroll container.
- **Nav height is a shared constant.** `--gf-nav-h` in `site.css` must match the
  rendered nav (logo height + 2×14px padding + 1px border). The fixed nav and
  its spacer both read it; change one without the other and content hides behind
  the nav. `check:render` asserts the two agree.
- **Keyframe names are global.** Each page used to carry its own `<style>`, and
  two of them defined `fadeUp` and `slideKen` with different distances. The
  shorter variants are now `fadeUpSm` and `slideKenSm`.
- **Figures need sign-off.** Acreage, tree counts, ESM numbers, soil-carbon
  percentages and all pricing are indicative and carried over from the source
  specification. Confirm them with the company before launch.
- **Botanical names in `trees-data.js`** were derived from the common names in
  the supplied image filenames. Worth checking against the nursery's own records.
- **`AdminDashboard.jsx` is a prototype.** It is a convincing UI over hardcoded
  in-memory state — no backend, no authentication, and nothing it "saves"
  persists.

## The port

The site was previously a set of `.dc.html` files interpreted in the browser by
a generated runtime (`legacy/support.js`), which loaded React and Babel from a
CDN at page load. [`tools/dc-to-jsx.mjs`](tools/dc-to-jsx.mjs) is the codemod
that translated those templates into the components in `src/`, and
[`legacy/`](legacy/) keeps the originals it read. Neither is used at runtime;
they are the record of how the current source was produced.

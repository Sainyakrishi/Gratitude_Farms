# Gratitude Farms — Website

Marketing site for Gratitude Farms Private Limited, Pondicherry: natural precision
farming, managed farmland services, and the Sainya Krishi ex-servicemen programme.

## Running it

The site is static. It needs to be **served over HTTP** — opening the `.html` files
directly with `file://` will not work, because the pages load their data with
dynamic `import()`, which browsers block on the file protocol.

```bash
npm install
npm start          # http://127.0.0.1:8899/Home.dc.html
```

Any static server works — `python -m http.server`, nginx, GitHub Pages, Netlify.
There is no build step.

## How the pages are built

Each page is a `.dc.html` file: markup with `{{ }}` bindings, `<sc-for>`, `<sc-if>`
and `<dc-import>`, plus a `class Component extends DCLogic` script block that
returns the values the template binds to. [`support.js`](support.js) is the
runtime that interprets this — a **generated** bundle (its own header says not to
edit it; the `dc-runtime` source it came from is not in this repo). It loads
React 18 and Babel from unpkg at page load and renders on the client.

```
Home.dc.html            ← page: markup + logic
  ├─ SiteNav.dc.html    ← shared component (also owns the site's page graph)
  ├─ SiteFooter.dc.html ← shared component (sitemap, newsletter, contact dock)
  └─ TeamCard.dc.html

Managed-Farmland.dc.html ─┐
Soil-Fertility-BhuPrana   ├─→ ServiceDetail.dc.html ──→ services-data.js
Farmland-Design-Vasudha   │      (one template, four pages)
Farmland-Operate-…       ─┘

Blog.dc.html ──→ Blog-Post.dc.html?slug=… ──→ blog-data.js
Medicinal-Plants-Trees.dc.html ─────────────→ trees-data.js
```

### Content lives in data files, not in markup

| File | Holds |
|---|---|
| [`services-data.js`](services-data.js) | 4 services × 5 audience segments — deliverables, KPIs, SLA, pricing, add-ons |
| [`blog-data.js`](blog-data.js) | 7 articles as structured blocks, with per-post SEO metadata |
| [`trees-data.js`](trees-data.js) | 31 species in the cultivation catalogue |
| [`site-config.js`](site-config.js) | Contact details and form delivery |
| [`site.css`](site.css) | Everything inline styles can't express: media queries, focus states, shared components |

Adding a service, article or species means editing one data file. Adding a **page**
means adding it to `navDef` in [`SiteNav.dc.html`](SiteNav.dc.html) and to the
`columns` list in [`SiteFooter.dc.html`](SiteFooter.dc.html).

## Making the contact form send email

Out of the box the contact form and the newsletter signup **validate, then hand the
completed enquiry to the visitor's mail client**, pre-addressed and pre-filled.
Nothing is silently dropped, but nothing reaches a server either.

To receive submissions properly, set one constant in
[`site-config.js`](site-config.js):

```js
export const FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';
```

Any endpoint that accepts a JSON `POST` works — Formspree, Web3Forms, a Netlify
function, or your own API. Both forms switch over automatically; no other change
is needed.

## Checks

```bash
npm run check              # links, assets, page metadata, JS syntax  (fast, no browser)
npm run check:render       # loads all 19 pages at 1440px and 390px in Chrome
npm run check:interactions # drives the menus, forms, filters and tabs
```

`check:render` and `check:interactions` need the dev server running (`npm start`).
They catch console errors, broken images, horizontal overflow, and nav/spacer drift.

## Known constraints

- **The site renders on the client.** Search engines and link previews get the
  `<title>`, description and favicon from the served HTML, but the body content is
  built by JavaScript. If organic search matters, the fix is to port these templates
  to a static site generator (Astro or Next.js static export) — the data files
  port over almost unchanged. See the note on `support.js` above.
- **`overflow-x` must be `clip`, never `hidden`.** The runtime sets
  `html,body{height:100%}`; adding `overflow-x:hidden` on top turns the body into a
  one-viewport scroll container, which freezes `window.scrollY` and silently
  disables every `position:sticky` inside. `clip` suppresses the same overflow
  without creating a scroll container.
- **Nav height is a shared constant.** `--gf-nav-h` in `site.css` must match the
  rendered nav (logo height + 2×14px padding + 1px border). The fixed nav and its
  spacer both read it; change one without the other and content hides behind the nav.
- **Figures need sign-off.** Acreage, tree counts, ESM numbers, soil-carbon
  percentages and all pricing are indicative and carried over from the source
  specification. Confirm them with the company before launch.
- **Botanical names in `trees-data.js`** were derived from the common names in the
  supplied image filenames. Worth checking against the nursery's own records.
- **`Admin-Dashboard.dc.html` is a prototype.** It is a convincing UI over hardcoded
  in-memory state — no backend, no authentication, and nothing it "saves" persists.
- **`Home-standalone.html`** is an older self-contained copy of the home page kept
  from an earlier round. It is not part of the site and is not linked from anywhere.

## Deploying

Push the repository and point any static host at the root. For GitHub Pages, serve
from the branch root; `Home.dc.html` is the entry point (add a redirecting
`index.html` if you want a bare domain to land there).

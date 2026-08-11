// Drives the interactive parts of the site the way a visitor would.
//
// Needs the site running on 8899 — `npm run dev`, or `npm run build && npm run
// preview` to check what actually ships.
import puppeteer from 'puppeteer';

const BASE = 'http://localhost:8899';
let fails = 0;

const ok = (n, c, extra = '') => {
  console.log(`  ${c ? '✓' : '✗'} ${n}${extra ? '  — ' + extra : ''}`);
  if (!c) fails++;
};

const settle = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

const open = async (url, vp = { width: 1440, height: 900 }) => {
  const p = await browser.newPage();
  await p.setViewport(vp);
  p.on('pageerror', (e) => { console.log('   PAGEERROR', String(e).slice(0, 120)); fails++; });
  await p.goto(BASE + url, { waitUntil: 'networkidle2', timeout: 45000 });
  await settle(900);
  return p;
};

// ---------------------------------------------------------------- nav ----
console.log('\nNavigation');
{
  const p = await open('/');
  const before = await p.$$eval('nav a', (a) => a.length);
  await p.hover('nav a[href="/services"]');
  await settle(350);
  const after = await p.$$eval('nav a', (a) => a.length);
  ok('services dropdown opens on hover', after > before, `${before} → ${after} links`);

  const groups = await p.$$eval('nav span', (s) =>
    s.map((x) => x.textContent.trim()).filter((t) => t === 'Services' || t === 'Programs'));
  ok('dropdown shows Services + Programs groups', groups.includes('Services') && groups.includes('Programs'));

  await p.hover('nav a[href="/services/managed-farmland"]');
  await settle(350);
  const aud = await p.$$eval('nav a[href*="?audience="]', (a) => a.length);
  ok('audience submenu opens', aud === 5, `${aud} audience links`);
  await p.close();
}
{
  const p = await open('/', { width: 390, height: 844, isMobile: true });
  await p.click('nav button[aria-label="Open menu"]');
  await settle(350);
  const openNow = await p.$eval('nav button', (b) => b.getAttribute('aria-expanded'));
  const bodyLocked = await p.evaluate(() => document.body.style.overflow);
  ok('mobile drawer opens', openNow === 'true');
  ok('page behind drawer is scroll-locked', bodyLocked === 'hidden');

  const toggles = await p.$$('nav button[aria-label^="Show"]');
  ok('mobile submenu toggles exist', toggles.length === 3, `${toggles.length} expandable items`);
  if (toggles.length) {
    const b4 = await p.$$eval('nav a', (a) => a.length);
    await toggles[1].click();
    await settle(300);
    const a4 = await p.$$eval('nav a', (a) => a.length);
    ok('mobile submenu expands', a4 > b4, `${b4} → ${a4} links`);
  }
  await p.click('nav button[aria-label="Close menu"]');
  await settle(300);
  ok('drawer closes and unlocks scroll', (await p.evaluate(() => document.body.style.overflow)) === '');
  await p.close();
}
{
  // Client-side routing has to actually change the page, and land at the top.
  const p = await open('/');
  await p.evaluate(() => window.scrollTo(0, 1200));
  await settle(200);
  await p.click('nav a[href="/sainya-krishi"]');
  await settle(700);
  ok('router navigates without a reload', p.url().endsWith('/sainya-krishi'), p.url().replace(BASE, ''));
  ok('new page starts at the top', (await p.evaluate(() => window.scrollY)) === 0);
  await p.close();
}

// ------------------------------------------------------------ contact ----
console.log('\nContact form');
{
  const p = await open('/contact');
  await p.click('button[type="submit"]');
  await settle(400);
  const errs = await p.$$eval('.gf-error', (e) => e.map((x) => x.textContent));
  ok('empty submit is blocked with field errors', errs.length >= 3, `${errs.length} errors shown`);
  const alerted = await p.$('[role="alert"]');
  ok('a summary error is announced', !!alerted);

  await p.type('#gf-first', 'Asha');
  await p.type('#gf-email', 'not-an-email');
  await p.type('#gf-message', 'I have 14 acres near Salem that has been fallow for six years.');
  await p.click('button[type="submit"]');
  await settle(400);
  const emailErr = await p.$eval('#gf-email', (e) => e.getAttribute('aria-invalid'));
  ok('bad email is rejected', emailErr === 'true');

  await p.$eval('#gf-email', (e) => {
    const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    set.call(e, ''); e.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await p.type('#gf-email', 'asha@example.com');
  await settle(200);

  // With no endpoint configured the form falls back to mailto: — intercept it.
  let mailto = null;
  p.on('request', (r) => { if (r.url().startsWith('mailto:')) mailto = r.url(); });
  await p.click('button[type="submit"]');
  await settle(900);
  const sent = await p.$eval('body', (b) =>
    b.innerText.includes('Almost there') || b.innerText.includes('enquiry received'));
  ok('valid submit reaches the success state', sent);
  ok('enquiry is handed to the mail client', !!mailto,
    mailto ? decodeURIComponent(mailto).slice(0, 58) + '…' : 'no mailto fired');
  await p.close();
}
{
  const p = await open('/contact?service=Managed%20Farmland%20Services&audience=Corporates%20%26%20PSUs');
  const iv = await p.$eval('#gf-interest', (e) => e.value);
  const msg = await p.$eval('#gf-message', (e) => e.value);
  ok('deep link prefills the interest dropdown', iv === 'Managed Farmland Services', iv);
  ok('deep link prefills the message', msg.includes('Corporates'), msg.slice(0, 50));
  await p.close();
}

// ------------------------------------------------------ service detail ----
console.log('\nService pages');
{
  const p = await open('/services/managed-farmland');
  const first = await p.$eval('#deliverables', (e) => e.innerText.slice(0, 80));
  const tabs = await p.$$('[aria-pressed]');
  await tabs[1].click();
  await settle(400);
  const second = await p.$eval('#deliverables', (e) => e.innerText.slice(0, 80));
  ok('audience tabs swap the content', first !== second);
  ok('tab selection is written to the URL', p.url().includes('audience=corporates'), p.url().split('?')[1]);

  const href = await p.$eval('a[download]', (a) => a.getAttribute('href'));
  const res = await p.evaluate((u) => fetch(u).then((r) => r.status), href);
  ok('brochure link downloads a real PDF', res === 200, `${href} → ${res}`);

  const others = await p.$$eval('#other-services a', (a) => a.length);
  ok('cross-links to the other services exist', others >= 4, `${others} links`);
  await p.close();
}
{
  const p = await open('/services/managed-farmland?audience=fpos');
  const seg = await p.$eval('#target', (e) => e.innerText);
  ok('?audience= deep link selects the segment', seg.includes('FPO'), seg.split('\n')[1]);
  await p.close();
}

// --------------------------------------------------------------- blog ----
console.log('\nBlog');
{
  const p = await open('/blog');
  const all = await p.$$eval('a[href^="/blog/"]', (a) => a.length);
  const chips = await p.$$('.gf-chip');
  ok('category chips are rendered from the posts', chips.length >= 4, `${chips.length} chips`);
  await chips[1].click();
  await settle(400);
  const filtered = await p.$$eval('a[href^="/blog/"]', (a) => a.length);
  ok('filtering reduces the post list', filtered < all, `${all} → ${filtered}`);
  ok('filter is written to the URL', p.url().includes('category='), p.url().split('?')[1]);
  await p.close();
}
{
  // The article is reached by path now, and moving between posts keeps the
  // component mounted — the one place the port could have gone stale.
  const p = await open('/blog');
  await p.click('a[href^="/blog/"]');
  await settle(900);
  const firstTitle = await p.$eval('h1', (h) => h.textContent);
  await p.click('a[href^="/blog/"]');
  await settle(900);
  const secondTitle = await p.$eval('h1', (h) => h.textContent);
  ok('post → post navigation reloads the article', firstTitle !== secondTitle,
    `${firstTitle.slice(0, 28)}… → ${secondTitle.slice(0, 28)}…`);
  await p.close();
}
{
  // The URLs the site had before the port still have to land.
  const p = await open('/Blog-Post.dc.html?slug=what-makes-natural-farming-truly-natural');
  ok('legacy article URL redirects', p.url().endsWith('/blog/what-makes-natural-farming-truly-natural'),
    p.url().replace(BASE, ''));
  await p.close();
}
{
  const p = await open('/About-Us.dc.html');
  ok('legacy page URL redirects', p.url().endsWith('/about-us'), p.url().replace(BASE, ''));
  await p.close();
}

// ---------------------------------------------------------- catalogue ----
console.log('\nTree catalogue');
{
  const p = await open('/medicinal-plants-trees');
  const total = await p.$$eval('#catalogue article', (a) => a.length);
  ok('all 31 species render', total === 31, `${total} cards`);

  const imgOk = await p.evaluate(() =>
    [...document.querySelectorAll('#catalogue img')].every((i) => !i.complete || i.naturalWidth > 0));
  ok('catalogue photos all load', imgOk);

  await p.type('#gf-tree-search', 'ficus');
  await settle(400);
  const found = await p.$$eval('#catalogue article', (a) => a.length);
  ok('search narrows by botanical name', found > 0 && found < total, `"ficus" → ${found}`);

  await p.$eval('#gf-tree-search', (e) => {
    const set = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
    set.call(e, ''); e.dispatchEvent(new Event('change', { bubbles: true }));
  });
  await settle(300);
  const chips = await p.$$('#catalogue .gf-chip');
  await chips[2].click();
  await settle(400);
  const grouped = await p.$$eval('#catalogue article', (a) => a.length);
  ok('group filter works', grouped > 0 && grouped < total, `${grouped} cards`);
  await p.close();
}

// -------------------------------------------------------------- misc ----
console.log('\nSitewide');
{
  const p = await open('/');
  const dock = await p.$$eval('.gf-dock a', (a) => a.map((x) => x.getAttribute('href')));
  ok('WhatsApp + call dock present on every page',
    dock.length === 2 && dock[0].includes('wa.me') && dock[1].startsWith('tel:'));

  // All slides are in the DOM at once, opacity-switched — read the visible one.
  const visible = () => p.evaluate(() => {
    const h = [...document.querySelectorAll('section h1')]
      .find((x) => x.closest('div[style*="opacity"]')?.style.opacity === '1');
    return h ? h.textContent : null;
  });
  const slide1 = await visible();
  await p.click('button[aria-label="Next"]');
  await settle(600);
  const slide2 = await visible();
  ok('hero carousel advances', slide1 && slide2 && slide1 !== slide2, `${slide1} → ${slide2}`);

  const sitemap = await p.$$eval('footer nav a', (a) => a.length);
  ok('footer sitemap is populated', sitemap >= 14, `${sitemap} links`);

  await p.type('#gf-news-email', 'reader@example.com');
  let m = null;
  p.on('request', (r) => { if (r.url().startsWith('mailto:')) m = r.url(); });
  await p.click('footer button[type="submit"]');
  await settle(700);
  const thanks = await p.$eval('footer', (f) => f.innerText.includes('Thanks'));
  ok('newsletter signup works', thanks && !!m);
  await p.close();
}

await browser.close();
console.log(fails ? `\n${fails} interaction failure(s)\n` : '\nAll interactions pass\n');
process.exit(fails ? 1 : 0);

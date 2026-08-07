// Loads every page in a real browser at desktop and phone widths, and reports
// console errors, failed requests, horizontal overflow and content hidden
// behind the fixed nav.
const puppeteer = require('puppeteer');

const PAGES = [
  'Home', 'About-Us', 'Our-Team', 'Our-Services', 'Managed-Farmland',
  'Soil-Fertility-BhuPrana', 'Farmland-Design-Vasudha', 'Farmland-Operate-Sanjeevani',
  'Farmland-Development', 'Nakshatra-Vanam', 'Corporate-ESG', 'Sainya-Krishi',
  'Medicinal-Plants-Trees', 'Vriksh-Ayurveda', 'Blog', 'Contact',
  'Privacy-Policy', 'Terms', 'Admin-Dashboard'
];

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'phone', width: 390, height: 844, isMobile: true }
];

const BASE = 'http://127.0.0.1:8899/';
let problems = 0;

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });

  for (const vp of VIEWPORTS) {
    console.log(`\n===== ${vp.name} (${vp.width}px) =====`);

    for (const name of PAGES) {
      const url = BASE + name + '.dc.html' + (name === 'Blog-Post' ? '?slug=what-makes-natural-farming-truly-natural' : '');
      const page = await browser.newPage();
      await page.setViewport(vp);

      const errs = [];
      const failed = [];
      page.on('console', m => { if (m.type() === 'error') errs.push(m.text().slice(0, 160)); });
      page.on('pageerror', e => errs.push('PAGEERROR ' + String(e).slice(0, 160)));
      page.on('requestfailed', r => {
        const u = r.url();
        // Google Fonts / YouTube / Maps are expected to be reachable; only flag
        // our own files.
        if (u.startsWith(BASE)) failed.push(u.replace(BASE, ''));
      });

      try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 45000 });
        await new Promise(r => setTimeout(r, 900));   // let dynamic imports settle

        const info = await page.evaluate(() => {
          const de = document.documentElement;
          const main = document.querySelector('main') || document.querySelector('#dc-root');
          return {
            title: document.title,
            textLen: (document.body.innerText || '').trim().length,
            overflow: de.scrollWidth - de.clientWidth,
            navH: (() => { const n = document.querySelector('nav'); return n ? Math.round(n.getBoundingClientRect().height) : 0; })(),
            spacerH: (() => { const s = document.querySelector('.gf-nav-spacer'); return s ? Math.round(s.getBoundingClientRect().height) : 0; })(),
            mainTop: main ? Math.round(main.getBoundingClientRect().top + window.scrollY) : 0,
            links: document.querySelectorAll('a[href]').length,
            buttons: document.querySelectorAll('button').length,
            imgsBroken: [...document.images].filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src')).slice(0, 5),
            hasError: !!document.querySelector('.sc-logic-error, .sc-has-error, .sc-placeholder-error')
          };
        });

        const flags = [];
        if (info.textLen < 400) flags.push(`only ${info.textLen} chars rendered`);
        if (info.hasError) flags.push('runtime rendered an error box');
        if (info.overflow > 2) flags.push(`page scrolls horizontally by ${info.overflow}px`);
        if (info.navH && info.spacerH && Math.abs(info.navH - info.spacerH) > 2) {
          flags.push(`nav ${info.navH}px vs spacer ${info.spacerH}px`);
        }
        if (info.imgsBroken.length) flags.push('broken images: ' + info.imgsBroken.join(', '));
        if (errs.length) flags.push('console: ' + errs.slice(0, 2).join(' | '));
        if (failed.length) flags.push('failed requests: ' + [...new Set(failed)].join(', '));

        const tag = flags.length ? '✗' : '✓';
        if (flags.length) problems += flags.length;
        console.log(`${tag} ${name.padEnd(30)} ${String(info.textLen).padStart(6)} chars  ${String(info.links).padStart(3)} links ${String(info.buttons).padStart(3)} btns  nav ${info.navH}/${info.spacerH}`);
        flags.forEach(f => console.log(`    → ${f}`));
      } catch (e) {
        problems++;
        console.log(`✗ ${name.padEnd(30)} LOAD FAILED: ${e.message.slice(0, 100)}`);
      }
      await page.close();
    }
  }

  await browser.close();
  console.log(problems ? `\n${problems} problem(s)\n` : '\nClean\n');
  process.exit(problems ? 1 : 0);
})();

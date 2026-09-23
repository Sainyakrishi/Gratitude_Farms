import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * The site is a single-page app served from a static host. A visitor landing
 * directly on /about-us asks the host for a file that does not exist, so the
 * host has to answer with the app shell instead of a 404 page. GitHub Pages
 * does that by serving `404.html`, so the build leaves a copy of the shell
 * under that name. Netlify/Vercel/nginx use their own rewrite rules and ignore
 * the extra file.
 */
function spaFallback() {
  return {
    name: 'gf-spa-fallback',
    apply: 'build',
    closeBundle() {
      const out = resolve(__dirname, 'dist');
      copyFileSync(resolve(out, 'index.html'), resolve(out, '404.html'));
    }
  };
}

/**
 * GitHub Pages cannot send response headers, so the Content-Security-Policy
 * travels as a <meta> tag in the built page. It limits scripts to this site's
 * own files — an injected <script> or a script from another origin will not
 * run — and names the only third parties the site uses: Google Fonts, the
 * YouTube embed on Home, the Google Maps embed on Contact, and the Apps
 * Script endpoint the forms post to.
 *
 * It is added at build time only: the dev server injects inline scripts for
 * hot reloading, which this policy would block.
 *
 * If you add a third party — a form endpoint, analytics, another embed — add
 * its origin here, or the browser will silently refuse it.
 */
const CSP = [
  "default-src 'self'",
  "script-src 'self'",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: blob:",
  "frame-src https://www.youtube-nocookie.com https://www.youtube.com https://maps.google.com https://www.google.com",
  "connect-src 'self' https://script.google.com https://script.googleusercontent.com",
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  'upgrade-insecure-requests'
].join('; ');

function contentSecurityPolicy() {
  return {
    name: 'gf-csp',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        '<meta charset="utf-8">',
        `<meta charset="utf-8">
<meta http-equiv="Content-Security-Policy" content="${CSP}">`
      );
    }
  };
}

export default defineConfig({
  plugins: [react(), spaFallback(), contentSecurityPolicy()],
  server: { port: 8899 },
  preview: { port: 8899 },
  build: { outDir: 'dist', assetsDir: 'build' }
});

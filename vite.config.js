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

export default defineConfig({
  plugins: [react(), spaFallback()],
  server: { port: 8899 },
  preview: { port: 8899 },
  build: { outDir: 'dist', assetsDir: 'build' }
});

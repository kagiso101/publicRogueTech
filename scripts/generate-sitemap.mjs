// Generates sitemap.xml in the publish directory from the prerender manifest,
// so every prerendered route is always listed and new pages are never forgotten.
// Runs as part of `npm run build` (see package.json).
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_URL = 'https://rogue-tech.co.za';
const DIST_ROOT = resolve('dist/publicRogueTech');
const PUBLISH_DIR = resolve(DIST_ROOT, 'browser');

const manifest = JSON.parse(
  readFileSync(resolve(DIST_ROOT, 'prerendered-routes.json'), 'utf8'),
);
const routes = Object.keys(manifest.routes ?? {});

if (routes.length === 0) {
  console.error('generate-sitemap: no prerendered routes found — did the prerender step run?');
  process.exit(1);
}

const lastmod = new Date().toISOString().slice(0, 10);

const urls = routes
  .sort()
  .map((route) => {
    const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

writeFileSync(resolve(PUBLISH_DIR, 'sitemap.xml'), xml);
console.log(`generate-sitemap: wrote ${routes.length} routes to browser/sitemap.xml`);

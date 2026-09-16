// Generates sitemap.xml in the publish directory from the prerender manifest,
// so every prerendered route is always listed and new pages are never forgotten.
// Runs as part of `npm run build` (see package.json).
//
// <lastmod> is the date of the last git commit that touched the source behind
// each route (component, template, content file), not the build date, so
// search engines only re-crawl pages whose content actually changed.
import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const SITE_URL = 'https://rogue-tech.co.za';
const DIST_ROOT = resolve('dist/publicRogueTech');
const PUBLISH_DIR = resolve(DIST_ROOT, 'browser');

// Route -> source paths whose history determines lastmod. First matching rule wins.
const SOURCES = [
  [/^\/$/, ['src/app/features/home', 'src/index.html']],
  [/^\/services$/, ['src/app/pages/services-page']],
  [/^\/pricing$/, ['src/app/pages/pricing-page']],
  [/^\/process$/, ['src/app/pages/process-page']],
  [/^\/faq$/, ['src/app/pages/faq-page']],
  [/^\/contact$/, ['src/app/pages/contact-page']],
  [/^\/get-started$/, ['src/app/pages/get-started-page']],
  [/^\/web-design-/, ['src/app/pages/suburb-page']],
  [/^\/website-design-prices-cape-town$/, ['src/app/pages/pricing-article-page']],
  [/^\/(websites-for-|booking-websites)/, ['src/app/pages/industry-page']],
  [/^\/legal\//, ['src/app/pages/legal-page']],
];

const buildDate = new Date().toISOString().slice(0, 10);

function lastCommitDate(paths) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...paths], {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim();
    return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : buildDate;
  } catch {
    return buildDate; // no git available (or shallow clone without history): fall back to today
  }
}

const manifest = JSON.parse(
  readFileSync(resolve(DIST_ROOT, 'prerendered-routes.json'), 'utf8'),
);
const routes = Object.keys(manifest.routes ?? {}).filter((r) => r !== '/404');

if (routes.length === 0) {
  console.error('generate-sitemap: no prerendered routes found — did the prerender step run?');
  process.exit(1);
}

const lastmodCache = new Map();
function lastmodFor(route) {
  const rule = SOURCES.find(([pattern]) => pattern.test(route));
  if (!rule) return buildDate;
  const key = rule[1].join('|');
  if (!lastmodCache.has(key)) lastmodCache.set(key, lastCommitDate(rule[1]));
  return lastmodCache.get(key);
}

const urls = routes
  .sort()
  .map((route) => {
    const loc = route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmodFor(route)}</lastmod>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

writeFileSync(resolve(PUBLISH_DIR, 'sitemap.xml'), xml);
console.log(`generate-sitemap: wrote ${routes.length} routes to browser/sitemap.xml`);

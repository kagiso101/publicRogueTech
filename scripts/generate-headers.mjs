// Writes Netlify's _headers file into the publish directory after the build.
//
// The Content-Security-Policy is generated rather than hand-written because Angular's
// prerender emits inline scripts (the hydration event-replay contract and bootstrap)
// whose exact content depends on the Angular version and on each page. Every inline
// script found across the prerendered HTML is hashed and allow-listed, so script-src
// never needs 'unsafe-inline'. Critical-CSS inlining is turned off in angular.json
// (it would add an onload="" attribute that CSP blocks and leave the site unstyled).
//
// Allowances, each earned by a real integration:
//   script-src : gtag.js (GA4), the Cal.com embed loader
//   style-src  : 'unsafe-inline' — Angular injects component styles as <style> tags; Google Fonts CSS
//   font-src   : Google Fonts files
//   img-src    : data: + https: (OG/logo assets are same-origin; https: keeps future embeds working)
//   connect-src: the leads API, GA4 collection endpoints, Cal.com
//   frame-src  : the Cal.com calendar iframe
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const PUBLISH_DIR = resolve('dist/publicRogueTech/browser');
const API_ORIGIN = 'https://api.rogue-tech.co.za';

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return htmlFiles(full);
    return name.endsWith('.html') ? [full] : [];
  });
}

const hashes = new Set();
const SCRIPT = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
for (const file of htmlFiles(PUBLISH_DIR)) {
  const html = readFileSync(file, 'utf8');
  for (const [, attrs, body] of html.matchAll(SCRIPT)) {
    if (/\bsrc\s*=/i.test(attrs)) continue;
    if (/type\s*=\s*"(application\/(ld\+)?json)"/i.test(attrs)) continue; // data blocks never execute
    if (!body.trim()) continue;
    hashes.add(`'sha256-${createHash('sha256').update(body, 'utf8').digest('base64')}'`);
  }
  if (/\son[a-z]+\s*=/i.test(html)) {
    console.error(`generate-headers: inline event handler found in ${file} — CSP would block it (is inlineCritical off?)`);
    process.exit(1);
  }
}

const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].join(' ')} https://www.googletagmanager.com https://app.cal.com`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "font-src 'self' https://fonts.gstatic.com",
  "img-src 'self' data: https:",
  `connect-src 'self' ${API_ORIGIN} https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://app.cal.com https://cal.com`,
  'frame-src https://app.cal.com https://cal.com',
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join('; ');

const headers = `/*
  Content-Security-Policy: ${csp}
  Referrer-Policy: strict-origin-when-cross-origin
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  Permissions-Policy: camera=(), microphone=(), geolocation=()
`;

writeFileSync(join(PUBLISH_DIR, '_headers'), headers);
console.log(`generate-headers: wrote _headers with ${hashes.size} inline-script hash(es)`);

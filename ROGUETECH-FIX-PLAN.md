# ROGUETECHNOLOGIES Site — Fix Plan

Source: full audit of the Angular 21 marketing site (`rogue-tech.co.za`, Netlify) and the Spring Boot `leads-api`.

Work top to bottom. P0 is "the site cannot do its one job". Everything below that is polish by comparison.

---

## P0 — Lead capture is completely broken

Nothing submitted on the live site reaches anyone. Fix these four together or none of them help.

- [ ] **Deploy the backend.** `api.rogue-tech.co.za` does not resolve. The service has no Dockerfile and no CI.
  - Write a `Dockerfile` for the Spring Boot app
  - Pick a host (Fly.io, Railway, or a small VPS) and a managed Postgres
  - Point the `api.rogue-tech.co.za` DNS record at it
  - Add a deploy workflow so this isn't manual next time
- [ ] **Fix the CORS allow-list.** Backend allows `roguetech.co.za`. The site is `rogue-tech.co.za` — with the hyphen. Add the hyphenated domain (and the `www.` variant).
- [ ] **Set up Cal.com.** The handle `roguetech/strategy-call` is a 404, and so is the account itself.
  - Create the Cal.com account and a `strategy-call` event type
  - Replace the TODO at `calendar-booking.ts:27` with the real handle
  - Until then, HIGH-tier leads see an empty embed and the modal button leads nowhere
- [ ] **Send email.** The `lead_emails` table, enums and repository exist but nothing sends.
  - Wire a sender (Resend or Postmark are the least painful)
  - Two emails: confirmation to the lead, notification to you
  - Add the scheduler that drains the queue
  - The confirmation page currently promises a personal reply within 24 business hours. Right now that promise is broken 100% of the time.
- [ ] **Fix the hero button.** "Get Started" and the Bronze and Silver package buttons point at `/contact`, which has no route. Clicking logs a router error and does nothing.

---

## P1 — Dead links and missing routes

- [ ] **Route `/contact`.** A contact component already exists at `features/contact/` but was never registered. It is linked from 8 places: hero, two package cards, footer, FAQ page CTA, and four service CTAs in `services-page.ts`. The Netlify redirect only rescues hard page loads, not in-app clicks.
- [ ] **Add a wildcard route.** The not-found component exists but is unused, so any unmatched in-app navigation fails silently.
- [ ] **Write and route the legal pages.** `/legal/terms`, `/legal/privacy`, `/legal/cookies` are all linked from the footer and all 404.
- [ ] **Fix `/privacy` in the wizard consent text** (`step5-contact.html:89`). POPIA consent is being collected against a privacy notice that does not exist. This is the one legal exposure on the list — do it with the legal pages above.
- [ ] **Footer social icons** — three of them point at `#`. Link them or remove them.
- [ ] **"Client Login"** points at `app.rogue-tech.co.za`, which does not resolve. Service card 04 and the marquee promise the same portal. Either build it, or stop promising it.
- [ ] **Footer "Services" list** — all five entries go to a home page anchor instead of the real service pages.
- [ ] **`og-image.png` returns 404** and is referenced from every page's Open Graph tags. Social and WhatsApp previews show nothing. See the rebrand section — build this from the new logo.
- [ ] **WhatsApp CTA** on industry and suburb pages is still a TODO with an email fallback.
- [ ] **Bookvas cross-sell blocks** on the booking pages have no link, and the services page has no Bookvas card at all.

---

## P2 — Rebrand: RogueTech → ROGUETECHNOLOGIES

Legal entity: **ROGUETECHNOLOGIES (Pty) Ltd**, reg. 2026/428113/07, Cape Town.

The domain stays `rogue-tech.co.za`. Only the displayed brand name changes.

### Name

- [ ] Do a full-text search for `RogueTech`, `Rogue Tech` and `roguetech` across the repo and decide each hit: brand name (change) vs domain, package name or code identifier (leave alone)
- [ ] Page titles and meta descriptions
- [ ] Open Graph and Twitter card tags
- [ ] Organization JSON-LD — `name`, `legalName`, `url`
- [ ] Header and footer brand text
- [ ] Hero and body copy
- [ ] Email templates (once the sender exists)
- [ ] Cal.com event title and description
- [ ] Footer legal line: full registered name and reg number
- [ ] Backend: any hardcoded brand strings in email or config

### Logo

New asset: `roguetechnologies-logo.png` — red and black "R" monogram, 1535 × 1024, RGBA.

- [ ] **Get an SVG version.** The current file is raster with what looks like a solid white background. For a header logo you want a transparent SVG. Either re-export from the original, or trace it.
- [ ] Generate the asset set:
  - `logo.svg` — header, transparent
  - `logo-mark.svg` — monogram only, for tight spaces
  - `favicon.ico` plus `favicon-32.png`, `favicon-192.png`, `apple-touch-icon.png`
  - `og-image.png` — 1200 × 630, logo on brand background (this also closes the P1 404)
- [ ] Update `<img>` alt text to "ROGUETECHNOLOGIES"
- [ ] Update `manifest.json` icons and `name`
- [ ] **Fix `theme-color`.** It is currently green against a red brand. Pull the exact red from the logo file and use that.
- [ ] Sanity check the logo against the site's dark sections — a red-on-black mark can disappear on a dark hero.

---

## P3 — Content and SEO still open against the spec

- [ ] **All six headline numbers prerender as 0** — the hero's 4, 100% and 24h, plus the three problem statistics. They are the first thing a visitor sees.
- [ ] **Remove the "Avg. Response Time" stat** — the spec says to drop it and it is still there.
- [ ] **Johannesburg references** appear in the home FAQ, the FAQ page and the testimonial location. The business is Cape Town.
- [ ] **Remove the Thembi Molaba quote** and the CloudPark "Verified Partnership" badge.
- [ ] **Titles** ignore the service-plus-location pattern:
  - Home is brand-first, should be service-first
  - Pricing has no location
  - Suburb titles lack "Cape Town" and a price
  - Industry titles say "South Africa" instead of the city
- [ ] **FAQ page has no FAQPage JSON-LD** — the industry pages and pricing article already have it.
- [ ] **GA4 is unconfigured**, so analytics and the cookie notice are both inactive. Configure it, then fire a `generate_lead` event on wizard success and mark it as a key event. Right now there is no way to know if anything works.
- [ ] **No CSP or security headers** in `netlify.toml`.
- [ ] **Sitemap `lastmod`** is the build date, not the content date.

---

## P4 — Backend bugs and security

- [ ] **Password committed in `application.yaml`.** Move to an environment variable and rotate it. Do this first — it is in git history.
- [ ] **Swagger UI is open to the public.** Lock it behind auth or disable it in the production profile.
- [ ] **Tier classifier bug:** `"webapp-60-100k"` does not contain `"60k"`, so R60k–R100k web app leads classify as MID instead of HIGH. These are your best leads and they are being downgraded.
- [ ] **Budgets are stored as codes, not labels** — makes the data awkward to read later.
- [ ] **Unvalidated `X-Forwarded-For` cast to `inet`** will throw a 500 on the insert. Validate or null it.
- [ ] **Catch-all exception handler turns 404 and 405 into 500s.** Let those through.
- [ ] **No spam or rate protection on a public POST.** The frontend sends a honeypot field that the backend silently ignores — start there, then add rate limiting per IP.
- [ ] **Contract drift:** the generated client in `src/app/api/` knows admin CRUD endpoints, the honeypot field and enum-typed detail fields that this backend does not implement. Either build them or regenerate the client.
- [ ] **No admin API or login.** Leads are only visible through `psql`.
- [ ] **Commit the entity-mapping fix** that is still sitting uncommitted.
- [ ] **The only test needs a live Postgres.** Move to Testcontainers or an embedded DB so it runs in CI.
- [ ] **Dead code:** several repository queries and the whole `LeadEmailRepository` are unused. The repository becomes live once P0 email is done — leave it, delete the rest.

---

## P5 — Housekeeping

- [ ] **Failing unit test:** the scaffold test in `app.spec.ts` still expects "Hello". One of six frontend tests.
- [ ] **Orphaned code:** blog component, contact component (route it instead — see P1), not-found component (route it — see P1), `wizard.types.ts`
- [ ] **Bundle budget exceeded by roughly half**, with four SCSS files over their limits.
- [ ] **Generated API folder ships `git_push.sh` and a README** — exclude them from generation.
- [ ] **Store enables devtools in production** — gate on environment.

---

## Suggested order

1. Rotate the committed DB password (P4) — do this before anything else touches the repo
2. Backend deploy + CORS + email + Cal.com (P0) — the site starts working
3. `/contact` route + wildcard route (P1) — the hero button works
4. Legal pages + privacy link (P1) — POPIA exposure closed
5. Rebrand name + logo assets, including `og-image.png` (P2)
6. Headline numbers, Johannesburg, fake testimonial (P3) — credibility
7. Tier classifier + XFF + exception handler (P4)
8. GA4 + `generate_lead` (P3) — now you can measure the rest
9. Everything else

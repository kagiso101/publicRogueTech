# ROGUETECH SITE — FIX, SHIP, RANK

**Written:** 2026-09-15
**Repos:** `publicRogueTech` (Angular, prerendered, Netlify → rogue-tech.co.za) and the client-portal backend repo (name to be confirmed in section 1)
**Test domain:** `rogue-tech.co.za` for now. `roguetechnologies.co.za` is the intended long-term domain — see section 8.
**Search Console:** `rogue-tech.co.za` verified 2026-09-15, sitemap submitted (15 URLs), home page confirmed indexed.

---

## 0. Read this first

**Plain language. One section at a time. Report before committing each section.**

### What we know

- The home page **is** indexed by Google. It doesn't rank because of content and authority, not discovery. So this is a content-and-quality job, not a plumbing job.
- The name is contested: **Rogue Technologies SA** (East London, `roguetech.co.za`, IT repair, since 2016, 13 reviews) owns Google for "RogueTech" and "Rogue Technologies South Africa". We will not beat them on the bare brand term soon. We rank on **what we do + where we are** instead.
- The site is Angular with prerendering. Prerendered HTML is what Google indexes.
- The client portal at `app.rogue-tech.co.za` is promised on the site three times and does not resolve. Kagiso wants to ship it, not remove it.

### Hard rules

1. **Honesty rule, same as Bookvas:** no unsourced statistics, no testimonials that aren't real and consented, no "verified partnership" that can't be shown, no counters that render as zero.
2. **No new dependencies for SEO.** Angular's prerender plus correct HTML is enough.
3. **One location.** Cape Town. Every Johannesburg reference goes.
4. **Every page must be complete without JavaScript** — that is what Google reads. Check the prerendered output, not the browser.
5. **If anything doesn't match expectations, stop and report.**

---

## 1. Inventory — report before changing anything

### 1.1 Frontend
1. Angular version, prerender config, list of the 15 routes.
2. How the stat counters work — which component, what the initial value is in the prerendered HTML.
3. Where the three "0%" statistics come from. Is there a source cited anywhere in the code or a comment?
4. Every occurrence of: `Johannesburg`, `Sandton`, `Fourways`, `app.rogue-tech.co.za`, `CloudPark`, `Thembi Molaba`, `Avg. Response Time`, `Verified Partnership`.
5. The three footer social links — what they point at.
6. Is GA4 wired? `gaMeasurementId` or equivalent — set or empty?
7. CSP in `netlify.toml` — current directives.
8. Structured data — any JSON-LD present?

### 1.2 Client portal
1. Does a backend repo exist for `app.rogue-tech.co.za`? Name, stack, last commit.
2. What does it do today — auth, projects, milestones, files?
3. Is there a frontend for it — separate repo, or a route in `publicRogueTech`?
4. What would it take to deploy it: Cloud Run like Bookvas? Database?
5. Is there anything in it a real client could use this month, or is it a skeleton?

**Stop. Report. Section 6 depends entirely on 1.2.**

---

## 2. Content fixes

### 2.1 Counters
Prerendered HTML must contain the real final value, not `0`. Either render the final value server-side and animate *from* it on hydration, or drop the count-up animation entirely. Google reads "0% Client Ownership" today.

Values to render: **4** packages, **100%** client ownership. **Remove** "Avg. Response Time" — it's a promise with no system behind it.

### 2.2 The three statistics
"0% of SA micro-enterprises…", "0% of SA small businesses fail…", "0% of SA online purchases happen on mobile…"

If Kagiso can supply a citable source for each (Stats SA, a named report, a URL), render the real number **with the source in small text underneath**. If not, **replace the section** with three concrete problems stated without numbers — the surrounding copy already does this well.

### 2.3 Location
Replace every Johannesburg/Sandton/Fourways reference with Cape Town. FAQ "Do you work outside of Johannesburg?" → "Do you work outside of Cape Town?" Testimonial location → confirm with the client or drop the location line.

### 2.4 Testimonial
"Thembi Molaba, Small Business Owner" — this is Bruja Thembi. Keep it **only if** she has agreed to be quoted and the words are hers. Otherwise replace with a case-study card: "Bruja Thembi — booking-led site, Cal.com, custom domain, branded email → brujathembi.com". A real deliverable beats a quote.

### 2.5 CloudPark Media partnership
Keep only if Kagiso can supply something showable — a link, a logo with permission, a named contact. Otherwise remove until it can be shown.

### 2.6 Portal promises
Until section 6 ships, change the three `app.rogue-tech.co.za` references to describe the client dashboard as **coming** ("Your project space — launching soon") and remove the login link. Restore when the portal is live.

### 2.7 Footer
Social icons → real URLs or removed. Footer "Services" links → the same real pages the nav uses, not `#anchors`.

### 2.8 Bookvas mention
Services page says "Currently building Bookvas". Make it a real card linking to the Bookvas site with one line on what it does. It's the best proof the agency can build software.

---

## 3. SEO — rank on what we do, not the brand

### 3.1 Title and meta strategy
Every page targets **service + location**, never brand alone:

| Page | Title pattern |
|---|---|
| Home | Web Design & Custom Software, Cape Town — RogueTech |
| Services | Website Design, Web Apps & SaaS Development, Cape Town |
| Pricing | Website Design Prices Cape Town — Packages from R8,500 |
| Suburb pages | Web Design [Suburb], Cape Town — Websites from R8,500 |
| Industry pages | Websites for Salons in Cape Town — Booking-Ready Sites |

Meta descriptions: 140–160 chars, include the price where relevant, one clear action.

### 3.2 Structured data (JSON-LD)
- `LocalBusiness` on the home page: name, URL, area served (Cape Town + the five suburbs), email, price range, `sameAs` for real social profiles only.
- `Service` on each service block.
- `FAQPage` on the FAQ.
- `Product`/`Offer` for the four packages with real prices.

### 3.3 On-page
- One `<h1>` per page, containing the target phrase.
- Suburb and industry pages need **real, different content** — at least 300 words each about that suburb or industry, not the same template with the name swapped. Thin duplicate pages hurt more than they help. If real content isn't available yet, `noindex` those pages until it is.
- Internal links: every page links to Pricing and Get Started in body copy, not just nav.
- Image `alt` text everywhere, descriptive.
- `lastmod` in the sitemap: per-route from git history, not build date. Nice to have.

### 3.4 Google Business Profile — KAGISO ONLY
Create one for ROGUETECHNOLOGIES (Pty) Ltd, Cape Town, service-area business. This is the single biggest lever for "web design cape town" local results, and it's free. Request reviews from Bruja Thembi and the pilot tenant once they exist.

### 3.5 Inbound links — KAGISO ONLY
Three links this month: the portfolio site, the Bookvas landing page footer, Bruja Thembi's footer ("Site by RogueTech"). Authority starts there.

---

## 4. Analytics

### 4.1 RogueTech GA4 property — KAGISO ONLY
Create under account `ROGUETECHNOLOGIES`, stream URL `rogue-tech.co.za`, stream name `RogueTech web`. Google Signals off, retention 14 months. Report the Measurement ID.

### 4.2 Wire it
Same pattern as `bookr-client`: ID in the production environment only, router-driven page views, CSP allows `googletagmanager.com` and `google-analytics.com`. Mark `generate_lead` (Get Started completion) and `file_download` as key events.

---

## 5. UI

Kagiso says the UI "needs love". I can't see it from here, so:

1. Kagiso sends **phone screenshots** of the home, pricing and get-started pages.
2. Claude Code produces a short critique against the Bookvas CI principles — hierarchy, spacing, one accent colour, mono for money — and proposes changes.
3. Nothing is changed until the proposal is approved.

Known from the HTML alone: the hero is generic ("high-performance… scale faster… stand out online") — replace with one concrete sentence about what a Cape Town salon or plumber actually gets. The all-caps "YOUR COMPETITORS ARE ALREADY ONLINE" reads as pressure; consider softening.

---

## 6. Client portal — ship it

Depends on the 1.2 inventory. Two possible paths; Claude Code recommends one after inventory, Kagiso decides.

### Path A — it's real enough to deploy
1. Cloud Run in `africa-south1`, own service account, Secret Manager, same pattern as `bookr-api`. New database on `bookr-pg` (`roguetech_portal`).
2. Flyway from V1 with a real schema — no `ddl-auto`.
3. `app.rogue-tech.co.za` → Netlify (if separate frontend) or Cloud Run domain mapping. DNS in Plesk.
4. Minimum viable portal for one real client: login, one project, milestone list with status, file links. Nothing else until Bruja Thembi has used it.
5. Restore the portal links on the marketing site (undo 2.6).

### Path B — it's a skeleton
Leave 2.6 in place. Write `PORTAL-SPEC.md` scoping the minimum viable portal above, and schedule it **after** Bookvas Phase 7. The agency's second product shouldn't compete with the first one's launch.

---

## 7. Verify

1. `curl -s https://rogue-tech.co.za/ | grep -c "0%"` returns 0 after deploy.
2. Google Rich Results Test passes for the home page JSON-LD.
3. Lighthouse SEO score ≥ 95 on home, services, pricing.
4. No CSP errors in the console on the live site.
5. GA4 realtime shows a session.
6. Search Console → URL inspection → Request indexing on home, services, pricing after deploy.
7. Zero occurrences of "Johannesburg" in the prerendered output.

---

## 8. Domain — for later, not now

`roguetechnologies.co.za` is the intended domain. Not in this spec. When it happens: Netlify custom domain, 301 from `rogue-tech.co.za`, canonical tags updated, Search Console change-of-address, GA4 stream URL, Plesk DNS. One afternoon, one spec, after the site is worth moving.

Noted risk: the East London company's name is *Rogue Technologies SA*. Moving closer to their name makes the search collision worse. Kagiso is aware.

---

## 9. Done means

- [ ] Inventory reported, portal path decided
- [ ] Counters render real values in prerendered HTML
- [ ] Statistics sourced or replaced
- [ ] Zero Johannesburg references
- [ ] Testimonial consented or replaced with a case-study card
- [ ] CloudPark shown or removed
- [ ] Portal links honest about status
- [ ] Footer links real
- [ ] Titles, metas, JSON-LD, H1s per section 3
- [ ] Thin suburb/industry pages either real or noindexed
- [ ] GA4 live, key events marked
- [ ] UI proposal delivered and approved before changes
- [ ] All seven verification checks pass
- [ ] Google Business Profile created (Kagiso)

---

## 10. KAGISO ONLY list

1. Sources for the three statistics, or say "drop them"
2. Thembi's consent for the quote, or say "case-study card"
3. CloudPark: something showable, or say "remove"
4. Real social profile URLs, or say "remove icons"
5. Create the RogueTech GA4 property, report the ID
6. Google Business Profile
7. Phone screenshots of home, pricing, get-started for the UI review
8. Decide portal path A or B after the inventory

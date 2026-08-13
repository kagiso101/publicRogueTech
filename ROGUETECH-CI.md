# RogueTech — Corporate Identity Guidelines

Brand and visual identity reference for RogueTech. All values are sourced from the
live design system (`src/app/styles/_tokens.scss`) — that file is the single source
of truth; this document explains how to use it.

---

## 1. Brand Essence

RogueTech's identity is **dark, sharp, and high-energy**: a near-black canvas, a
single aggressive signal-red accent, condensed industrial typography, and angular
geometry (echoing the slashed "R" logomark). The aesthetic borrows from motorsport
and tech-performance branding — glow effects, scanlines, glitch accents — while
staying restrained: red is used as a highlight, never as a flood.

**Keywords:** bold · precise · technical · rebellious · premium-dark

---

## 2. Logo

Logo assets live in [public/images/logos/](public/images/logos/).

| File | Description | Use |
|------|-------------|-----|
| `roguetech-final-logo.png` | Logomark + wordmark, white "ROGUE" / glowing red "TECH", on dark | **Primary.** Used in the navbar. For dark backgrounds. |
| `RogueTech-logo.png` | Same lockup with dark-grey "ROGUE" | Alternate for mid-tone/light-grey backgrounds. |
| `rogueTechLogo.png` | Transparent-background lockup, black "ROGUE" / red "TECH", **flat (no glow)** | Light backgrounds, print, documents. |

### Anatomy
- **Logomark:** an angular, blade-like "R" built from gunmetal-grey and red facets.
- **Wordmark:** "ROGUE" in neutral (white or black depending on variant) +
  "TECH" always in brand red — this two-tone split is a core brand signature.

### Usage rules
- Always keep "TECH" in red; never render the wordmark in a single flat color.
- Preferred placement is on `--rt-black` (#080808) or `--rt-dark` (#0F0F0F) surfaces.
- Maintain clear space around the lockup of at least the height of the "R" logomark.
- Do not stretch, recolor, rotate, outline, or add drop shadows. The glow is baked
  into the dark-background variants only; the light-background variant is flat by
  design — do not recreate the glow on light surfaces.
- Minimum digital size: keep the wordmark legible (~120 px wide); below that, use the logomark alone.

### Small sizes, favicon & social
- **Below ~120 px wide:** logomark ("R") only, never the full lockup.
- **Favicon / app icons** (16–48 px): the "R" logomark on solid `--rt-black`.
  At 16 px the red facets must stay distinguishable — if they blur, use a
  simplified single-red "R" cut of the mark.
- **Social avatars** (Twitter/X, LinkedIn, GitHub): "R" logomark centred on
  `--rt-black`, with clear space of at least 15% of the canvas on each side.
- **Open Graph / link-preview image** (1200×630): dark canvas, full lockup left
  or centre, one red accent element maximum. No body copy — it will not be
  legible at preview size.

---

## 3. Color Palette

All colors are exposed as CSS custom properties (prefix `--rt-`) and SCSS variables.

### Brand red (primary accent)

| Token | Hex / Value | Role |
|-------|-------------|------|
| `--rt-red` | `#CC0000` | Core brand red — CTAs, links, eyebrows, highlights |
| `--rt-red-bright` | `#FF1A1A` | Hover/active states, glow highlights |
| `--rt-red-dim` | `#880000` | Pressed states, subtle red on dark |
| `--rt-red-glow` | `rgba(204, 0, 0, 0.25)` | Glows, focus rings, ambient light effects |

### Backgrounds (dark-first)

| Token | Hex | Role |
|-------|-----|------|
| `--rt-black` | `#080808` | Page background |
| `--rt-dark` | `#0F0F0F` | Section alternation |
| `--rt-card` | `#141414` | Cards, panels, modals |
| `--rt-card-hover` | `#1A1A1A` | Card hover state |

### Text

| Token | Hex | Role |
|-------|-----|------|
| `--rt-white` | `#FFFFFF` | Headings, primary emphasis |
| `--rt-text` | `#F0F0F0` | Body copy |
| `--rt-text-muted` | `#888888` | Secondary/supporting text, captions |

### Borders

| Token | Value | Role |
|-------|-------|------|
| `--rt-border` | `rgba(204, 0, 0, 0.18)` | Red-tinted borders (branded emphasis) |
| `--rt-border-subtle` | `rgba(255, 255, 255, 0.06)` | Hairline dividers, quiet card edges |

### Functional accent

| Token | Hex / Value | Role |
|-------|-------------|------|
| `--rt-green` | `#00CC66` | "Available / online" pulse dots and success indicators only. Never decorative. |
| `--rt-green-glow` | `rgba(0, 204, 102, 0.4)` | Pulse/glow effects on status indicators |

### Color principles
1. **Dark canvas, red signal.** Red is reserved for interaction and emphasis —
   roughly 90% neutral / 10% red on any given screen.
2. **Never hardcode values** in components; always reference the tokens.
3. Red on black passes contrast for large/bold text and UI accents; for small body
   text on dark, use `--rt-text` or `--rt-text-muted`, not red.

---

## 4. Typography

Three-typeface system (Google Fonts):

| Token | Typeface | Role |
|-------|----------|------|
| `--rt-font-display` | **Bebas Neue** | Display headlines, hero titles, section headings. Tight line-height (0.92–1), +1–2px letter-spacing, all-caps by design. |
| `--rt-font-body` | **Barlow** (Light 300) | Body copy at 14–18px, generous 1.7–1.8 line-height. |
| `--rt-font-ui` | **Barlow Condensed** (600–700) | Nav, buttons, labels, eyebrows. Always uppercase with wide tracking (2–4px). |

### Type scale (utility classes in `_typography.scss`)

| Class | Font | Size | Notes |
|-------|------|------|-------|
| `.rt-display-xl` | Bebas Neue | clamp(60px → 120px) | Hero |
| `.rt-display-lg` | Bebas Neue | clamp(42px → 72px) | Page titles |
| `.rt-display-md` | Bebas Neue | clamp(32px → 52px) | Section titles |
| `.rt-display-sm` | Bebas Neue | 28px | Card titles |
| `.rt-body-lg` / `.rt-body` / `.rt-body-sm` | Barlow 300 | 18 / 16 / 14px | Copy |
| `.rt-label-lg` / `.rt-label` / `.rt-label-sm` | Barlow Condensed | 15 / 13 / 11px | Uppercase UI labels |

### The "eyebrow" signature
Section intros use the `eyebrow` mixin: an 11px uppercase Barlow Condensed label in
brand red, preceded by a 24px red rule — a recurring brand device across the site.

---

## 5. Imagery & Photography

When photos or illustrations are used (site, case studies, social):

- **Dark, high-contrast, desaturated** — imagery should sit naturally on the
  near-black canvas. Bright, colorful stock photography breaks the brand instantly.
- Red may appear in imagery as an accent (a light source, a detail), never as a
  dominant wash. The 90/10 rule applies to photos too.
- Prefer technical subject matter: hardware, screens, workspaces, geometry —
  consistent with the motorsport/tech-performance feel.
- Avoid: generic smiling-people stock, white-background product shots, warm/pastel
  grading. If an image can't be adapted, put it inside a `--rt-card` frame with a
  subtle border rather than full-bleed.

---

## 6. Layout & Spacing

| Token | Value |
|-------|-------|
| `--rt-space-xs` → `--rt-space-3xl` | 4 / 8 / 16 / 24 / 48 / 80 / 120 px |
| `--rt-section-pad` | 120px vertical · 48px horizontal |
| `--rt-max-width` | 1280px content container |
| `--rt-nav-height` | 72px |

**Breakpoints (max-width):** sm 640px · md 768px · lg 1024px · xl 1280px.

**Corner radius is deliberately sharp:** `--rt-radius-sm` 2px (buttons),
`--rt-radius-md` 4px, `--rt-radius-lg` 8px (cards/modals). No pill shapes or large
rounds — angularity is part of the identity.

---

## 7. Motion

Defined in `_animations.scss`; all motion respects `prefers-reduced-motion`.

- **Standard transition:** `all 0.2s ease` (`--rt-transition`)
- **Expressive transition:** `all 0.4s cubic-bezier(0.16, 1, 0.3, 1)` — a smooth
  ease-out used for reveals, cards, and modals (`--rt-transition-slow`)
- **Scroll reveal:** `.rt-reveal` fades/slides elements up 32px with staggered
  delays (`.rt-delay-1` … `.rt-delay-4`)
- **Brand flourishes:** `rt-scan` (scanline sweep), `rt-glitch-1/2` (glitch
  offsets), `rt-float` (gentle hover float), `rt-pulse-dot` (green status pulse),
  `rt-marquee` (infinite ticker)

Motion should feel **quick and mechanical**, not bouncy — no spring/elastic easings.

---

## 8. Components & Signature Elements

- **Buttons:** Barlow Condensed 700, uppercase, 2px letter-spacing, 2px radius
  (`btn-base` mixin). Primary = red fill; hover shifts toward `--rt-red-bright`.
- **Cards:** `#141414` surface, subtle border, hover lightens to `#1A1A1A`
  with the slow ease-out (`card-base` mixin).
- **Modals:** dark card surface over an 80%-black backdrop, slide-down + scale
  entrance, max-width 640px (`_modal.scss`).
- **Status dots:** 6px green (`--rt-green`) circles with a pulsing glow for
  availability indicators.

---

## 9. Documents, Print & Email

The design system is web-native, but the brand also appears off-screen:

- **Proposals, invoices, letterheads (light paper/white):** use `rogueTechLogo.png`
  (flat, transparent). Headings in black, "TECH" and one accent rule in
  `#CC0000`. Body text in near-black, never grey below 60% — print greys wash out.
- **Print-safe red:** `#CC0000` converts acceptably; if a printer requires CMYK,
  use approximately `C0 M100 Y100 K20`. Never let print software "optimise" the
  red toward orange.
- **Email signatures:** logomark or flat lockup at ≤160 px wide, dark text on
  white. Do not attempt the dark theme in email clients — rendering is unreliable.
- **Dark-first stays the rule on screens.** Light backgrounds are for paper and
  contexts we don't control (email, third-party docs), not a light theme.

---

## 10. Voice & Application Summary

- Dark mode is not a theme — it **is** the brand. There is no light theme.
- Headlines are short, uppercase, and confident (Bebas Neue does the shouting;
  copy stays lean).
- One red accent per visual moment: a highlighted word, a CTA, an eyebrow — not all three competing.
- Grey (`#888888`) carries supporting copy so white and red retain their weight.

---

*Maintained alongside the design tokens. When `_tokens.scss` changes, update this document.*

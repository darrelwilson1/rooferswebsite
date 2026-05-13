# Meridian Roofworks — Bay Area architectural roofing

Editorial single-page site for a thirty-one-year-old roofing house in San
Francisco. Standing seam, slate, copper, cedar, and historic restoration —
GAF Master Elite, CertainTeed SELECT ShingleMaster, California C-39 licensed.

## Stack

- **Next.js 15** (App Router) + **TypeScript** (strict)
- **Tailwind CSS v4** (CSS-first theme tokens in `app/globals.css`)
- **Framer Motion** for component animation
- **GSAP + ScrollTrigger** for scroll-driven sequences (horizontal pin, parallax,
  mask reveals)
- **Lenis** smooth scroll, wired to GSAP's `ticker` so ScrollTrigger stays in sync
- **next/font** — `Fraunces` (display, italic) + `Inter` (body), preloaded
- **next/image** with remote patterns for Pexels/Unsplash placeholders
- **Sanity** schema stubs (no backend wired — see `lib/sanity/schemas/`)

## Project structure

```
app/
  layout.tsx          # fonts, metadata, OG, RoofingContractor JSON-LD
  page.tsx            # composes all sections
  globals.css         # Tailwind v4 @theme tokens + base/utility layers
components/
  providers/
    LenisProvider.tsx # smooth scroll + GSAP ticker integration
  ui/
    Nav.tsx           # fixed nav, animated champagne hover underline, mobile sheet
    Cursor.tsx        # custom cursor — morphs over [data-cursor] targets
    SplitText.tsx     # mask reveal by word/char, scroll-triggered
    ImageMask.tsx     # clip-path wipe + parallax wrapper around next/image
    Footer.tsx        # mega-italic wordmark + license / credential info
  sections/
    Hero.tsx              # full-bleed video, split headline, animated scroll line
    FeaturedListings.tsx  # GSAP horizontal pin — six selected roofs
    Philosophy.tsx        # editorial 2-col, italic accent word, stat strip
    Neighborhoods.tsx     # six-material grid w/ desaturate → color hover
    Journal.tsx           # magazine layout — AIA award lead + 2 features
    Contact.tsx           # underline-only inputs, project-type pills, success state
lib/
  site.ts             # single source of truth for brand/company
  utils.ts            # cn(), price/sqft formatters
  animations/
    easings.ts        # editorial easings (no bouncy springs)
    gsap.ts           # client-only registration of ScrollTrigger
  data/               # local content stand-ins
    properties.ts     # six selected projects (also exported as `projects`)
    neighborhoods.ts  # six roofing materials (also exported as `materials`)
    journal.ts        # press + awards (also exported as `press`)
  sanity/schemas/     # CMS schema stubs — drop into Sanity Studio v3
```

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run typecheck
```

## Design system

| Token              | Value                              |
| ------------------ | ---------------------------------- |
| `--color-ink`      | `#0E0E0C` deep charcoal black      |
| `--color-bone`     | `#F5F1EA` warm bone (primary text) |
| `--color-champagne`| `#C9A96E` editorial accent         |
| `--color-graphite` | `#3A3A36` warm graphite muted      |

No pure black, no pure white. Champagne is used sparingly — on hover
underlines, in the cursor accent, in section eyebrows, and on the italic
accent word in the Craft section.

**Type:**

- Display: `Fraunces` (variable, opsz + SOFT). Italics on accent words.
- Body: `Inter`. Tight tracking. UPPERCASE labels at `0.22em` tracking.

**Motion vocabulary** (in `lib/animations/easings.ts`):

- `editorial`: `cubic-bezier(0.65, 0, 0.35, 1)`
- `outExpo`: `cubic-bezier(0.16, 1, 0.3, 1)` (used as GSAP `expo.out`)

## Swapping placeholders for real assets

All photography currently points at Unsplash; the hero video points at Pexels.

1. **Hero video** — replace `VIDEO_SRC` and `POSTER` in
   `components/sections/Hero.tsx` with your own `.mp4` (H.264, ≤ 8MB) and a
   poster JPG. Keep both under the `/public` directory or behind a CDN; if you
   change CDN, add the hostname to `images.remotePatterns` in `next.config.mjs`.
2. **Project images** — edit `lib/data/properties.ts`. When you wire Sanity,
   replace this file with a GROQ query (`*[_type == "project" && featured]
   | order(order asc)`) and pipe the result through `next-sanity`'s
   `urlForImage` builder.
3. **Material and press art** — same pattern, files in `lib/data/`.
4. **Shop portrait** — `SHOP_IMAGE` constant at the top of
   `components/sections/Philosophy.tsx`.
5. **OG image** — drop a 1200×630 JPG at `public/og.jpg`.

## SEO

`app/layout.tsx` ships a `RoofingContractor` JSON-LD schema with:

- C-39 license number and bonded/insured status
- GAF Master Elite + CertainTeed SELECT ShingleMaster credentials
- Service area (SF, Marin, Sonoma, Napa, Berkeley, Oakland, Sausalito)
- Six service categories (standing seam, slate, copper/zinc, cedar, historic
  restoration, storm response)
- Opening hours and founding date

## Accessibility

- Skip-to-content link in the layout.
- All decorative SVGs marked `aria-hidden`.
- Custom cursor disabled on coarse pointers and when `prefers-reduced-motion:
  reduce` is set.
- Lenis + GSAP animations are short-circuited under reduced motion.
- Color contrast: bone on ink ≈ 14.8:1 (AAA).
- Form inputs are labeled and required.

## Performance notes

- Fonts preloaded via `next/font` (no FOIT).
- `next/image` everywhere with explicit `sizes` for responsive selection.
- Horizontal scroll uses GSAP `pin` (no layout thrash) and falls back to native
  snap-scroll on `(max-width: 1023px)`.
- Parallax targets only `transform` properties for GPU compositing.
- The hero video uses `preload="metadata"` and a `poster` so first paint is
  immediate.

## Mobile motion

- No horizontal pin under 1024px — the work section becomes a native
  snap-scroll lane.
- Custom cursor only on `(hover: hover) and (pointer: fine)`.
- Reduce-motion users get static reveals and no Lenis.

## License

Private. © 2026 Meridian Roofworks Co.

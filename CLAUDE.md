# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Premium, enquiry-led Morocco travel site (Next.js 16 App Router, React 19, strict TypeScript, Tailwind CSS 4, Zod). `README.md` has the full env-var table, deployment steps and SEO notes; this file covers what you need to work in the code.

## Commands

```bash
npm run dev                 # http://localhost:3000
npm run build && npm start
npm run lint                # eslint .
npm run typecheck           # tsc --noEmit
npm test                    # vitest run (tests/**/*.test.ts)
npx vitest run tests/geo.test.ts          # single test file
npx vitest run -t "name fragment"         # single test by name
npm run build && npx playwright test      # e2e against `next start` on :3100 (needs a prior build; first run: npx playwright install chromium)
```

Content pipelines (see below): `npm run itineraries`, `npm run photos` (~4 min), `npm run photos:catalog -- <folder>`.

## Architecture

**Content is generated, not hand-edited.** Two build scripts produce committed JSON that the typed content layer in `src/content/` consumes:
- Tours: `source/itineraries/**/*.docx` → `npm run itineraries` → `src/content/itineraries.generated.json` → `src/content/tours.ts`. Only docs with sequential "Day N:" headings become tours. Edit the .docx and re-run; never hand-edit the JSON.
- Photos: `scripts/photo-manifest.mjs` is the single source of truth (`[*]id|place|alt text`, `*` = hero). `npm run photos` reads `source/photos` (not in git), validates alt text, writes optimised files to `public/images/gallery`, OG images to `public/og/`, strips EXIF/GPS, and emits `src/content/photos.generated.json`. `tests/photos.test.ts` enforces the rules.

Destinations, experiences, articles (`src/content/*.ts`) are typed TS; `status: "draft"` hides an item from pages and the sitemap. Site-wide contact details and nav live in `src/lib/site.ts`. `src/content/index.ts` is the aggregation point.

**Programmatic collection pages** (`/tours/from/<city>`, `/tours/style/<style>`, `/tours/length/<bucket>`, `/tours/from/<city>/<style>`) are derived in `src/content/collections.ts`; a page exists only if ≥3 tours match (≥4 for city+style) and all figures are computed from the catalogue. `tests/geo.test.ts` enforces this plus unique titles/descriptions.

**SEO layer:** JSON-LD builders in `src/lib/seo.ts` rendered via `components/seo/JsonLd.tsx`; `sitemap.ts`, `robots.ts`, and `llms.txt/route.ts` all generate from the same content as the pages. `SITE_URL` other than the production domain makes the site `noindex` (preview deployments too). `www` redirects to apex in `next.config.ts`.

**Enquiry flow:** `components/forms/EnquiryForm.tsx` validates with Zod (`src/lib/enquiry.ts`), applies honeypot + min-fill-time checks, then the **browser** posts directly to FormSubmit (`src/lib/formsubmit.ts`). This must stay client-side: FormSubmit returns 403 to cloud servers, so it cannot move into an API route. Success UI is shown only on confirmed delivery.

## Conventions and constraints

- **Never invent prices, inclusions, accommodation names, distances, ratings or contact details.** The owner's documents don't contain them; none are shown and no offer/review schema is emitted. Articles carry a non-rendered `verify: []` list of claims to check.
- Design taste (from owner feedback): square corners everywhere (logo badge and slider dots/buttons stay round); no collage/overlapping images or blur glows; cards in a row identical in height and text length; tour cards = photo with style + days tags, serif title, one sentence, "Visits" line, "X days / Y nights · from City", buttons "View tour" / "Get in touch". Palette is cream, gold and forest green (tokens in `src/app/globals.css`). Verify UI changes at desktop and phone widths.
- Path alias `@` → `src/`.
- `public/` is ~97 MB; `.env.local` holds real values (copy `.env.example` for new setups). `/privacy`, `/terms` and the `/about` story are drafts with `[to be completed]` placeholders pending owner/legal review.

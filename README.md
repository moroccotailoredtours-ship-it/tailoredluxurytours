# Tailored Luxury Tours

Premium, enquiry-led Morocco travel website. Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind CSS 4 · Zod.

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in values (see below)
npm run dev                  # http://localhost:3000
npm run build && npm start   # production build
npm run lint && npm run typecheck && npm test
npx playwright install chromium && npm run build && npx playwright test   # e2e (serves on :3100)
```

## Environment variables

| Variable | Required for | Notes |
|---|---|---|
| `SITE_URL` | canonical URLs, sitemap | Defaults to `https://tailoredluxurytours.com`. Any other value makes the site `noindex`. |
| `CONTACT_EMAIL` | enquiry delivery + visible contact email | Inbox that receives enquiries. |
| `EMAIL_FROM` | enquiry delivery | Sender on a domain verified in Resend. |
| `EMAIL_API_KEY` | enquiry delivery | Resend API key. Server-side only. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | WhatsApp CTAs | Digits with country code, no `+`. Empty = CTAs are hidden (never a broken link). |
| `GOOGLE_SITE_VERIFICATION` | optional | Search Console meta tag token. |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | optional | Cookieless analytics. Empty = no script. |

Until `CONTACT_EMAIL`, `EMAIL_FROM` and `EMAIL_API_KEY` are all set, `/api/enquiry` returns 503 and the form shows an error instead of success.

## Enquiry flow

Form (`src/components/forms/EnquiryForm.tsx`) → client validation (Zod) → `POST /api/enquiry` → server validation, same-origin check, honeypot + minimum-fill-time trap, in-memory rate limit (5 / 10 min / IP) → Resend. Success is shown only when Resend returns 2xx. The rate limiter is per-instance memory; use a shared store (Upstash/KV) for stronger protection on serverless.

## Content

- **Tours** come from the owner's itinerary documents. `source/itineraries/**/*.docx` → `npm run itineraries` (`scripts/build-itineraries.mjs`) → `src/content/itineraries.generated.json` → `src/content/tours.ts`. Only documents with sequential "Day N:" headings become tours (28 today). To change a tour, edit the .docx and re-run the script; don't hand-edit the JSON. Durations and day plans are the owner's; **prices, inclusions and accommodation names are not in the documents, so none are shown.**
- Destinations, experiences and articles are typed TypeScript in `src/content/`. `status: "draft"` hides an item from pages and the sitemap. Contact details and nav live in `src/lib/site.ts`.
- Articles carry a `verify: []` list of claims to check before relying on them (not rendered publicly).
- `/about` has a marked placeholder for story/team. `/privacy` and `/terms` are drafts with highlighted `[to be completed]` fields that need owner and legal review.

## Images and image SEO

`source/photos` holds the full archive (654 files; kept out of the deployed site and git). **472 are published**; the rest are near-duplicates, selfies/crowded phone snaps, film-set images and dark/blank frames.

- **One source of truth:** `scripts/photo-manifest.mjs`. Each line is `[*]id|place|alt text` (`*` = hero-grade). Edit it to add, remove, re-word or re-assign a photo, then run `npm run photos` (about 4 minutes).
- **What `npm run photos` does:** validates (unique alt text, 20–125 characters, no near-duplicates), names every file from its alt text (e.g. `jemaa-el-fnaa-food-stalls-glowing-dusk-marrakech-morocco.webp`), exports hero images as 2560px JPEG and the rest as ≤1600px WebP, makes 1200×630 social-sharing images in `public/og/`, writes EXIF description/artist/copyright, and **strips all original metadata including GPS location**. Output: `src/content/photos.generated.json`.
- **On the site:** `/gallery` and one page per place (`/gallery/<place>`) with an accessible lightbox and `ImageGallery`/`ImageObject` structured data; destination pages show a photo strip; every page has a unique Open Graph/Twitter image with alt text; `sitemap.xml` lists the images shown on each page; decorative duplicates use `alt=""`.
- **Tests:** `tests/photos.test.ts` enforces the rules above (and that no GPS data survives).
- Picture numbers come from `source/photo-index.json`. To rebuild it: `npm run photos:catalog -- <folder>` (also writes contact sheets) and `node scripts/dedupe-photos.mjs source/photo-index.json source/photo-clusters.json`.
- `public/` is about 97 MB. Check your host's static-asset limits; if needed, move `public/images/gallery` to an image CDN or object storage and point `src` at it.

## Brand

- Wordmark: serif "Tailored" + spaced "LUXURY TOURS" with an arch mark (`src/components/ui/Logo.tsx`, `public/logo/`, `src/app/icon.svg`).
- Palette: ivory `#f7f2e9`, paper `#fbf8f2`, sand `#e9dfcb`, stone `#b8ad9a`, ink `#1f1b16`, terracotta `#a8492d` (CTA), olive `#3f4530`. Tokens in `src/app/globals.css`.
- Type: Instrument Serif (headlines) + Manrope (body), via `next/font`.

## Deployment (Vercel suggested)

1. Push to a Git host, import the project in Vercel.
2. Set the environment variables above for Production.
3. Add `tailoredluxurytours.com` (and `www`, which redirects to the apex via `next.config.ts`) under Domains and set DNS as Vercel instructs.
4. Verify the Resend sending domain, then submit a real test enquiry.
5. Add the property in Google Search Console, verify, submit `/sitemap.xml`.

Preview deployments are automatically `noindex`.

## Search, answer engines and AI search (SEO / AEO / GEO)

- **Structured data** (JSON-LD, emitted per page type): Organization/TravelAgency, WebSite, WebPage/AboutPage/ContactPage/CollectionPage, ItemList, BreadcrumbList, FAQPage (only where the answers are visible), BlogPosting, ImageGallery, TouristTrip (each itinerary, one entry per day), TouristDestination, Service (each experience). No prices, offers, ratings or reviews are emitted because none are published. Builders live in `src/lib/seo.ts`.
- **`/llms.txt`**: plain-text map of the site, generated from the same content as the pages (`src/app/llms.txt/route.ts`). It is optional and is not a ranking factor for Google.
- **`robots.txt`** names answer-engine crawlers (OAI-SearchBot, ChatGPT-User, PerplexityBot, Claude-SearchBot and others) as allowed. Whether to allow model-training crawlers (for example GPTBot, Google-Extended) is the owner's decision and is left at the default.
- **Programmatic pages** (`src/content/collections.ts`): `/tours/from/<city>`, `/tours/style/<style>`, `/tours/length/<range>` and `/tours/from/<city>/<style>`. A page exists only when at least 3 itineraries match (4 for city+style), and every figure is computed from the catalogue. Tests in `tests/geo.test.ts` enforce this, plus unique titles and descriptions.
- **Blog**: `src/content/articles.ts`. New route and planning guides are written only from the owner's itineraries and carry `verify` notes to check before relying on them.
- Not done: Search Console submission, Core Web Vitals measurement and rich-result validation in Google's tool (needs the live site).

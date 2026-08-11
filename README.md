# Borderless Kitchen

The editorial site for the **Borderless Kitchen** cookbook series — one volume per pair of culinary
traditions. Live at **[borderlesskitchenseries.com](https://borderlesskitchenseries.com)**.

This repo is the single source of truth for the site. See [Deployment](#deployment) — and read
[Gotchas](#gotchas) before you go looking for the code anywhere else on disk.

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind 3.4 · [Contentlayer2](https://github.com/timlrx/contentlayer2)
for MDX · Framer Motion · Vercel Analytics.

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
```

| Script | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build (regenerates Contentlayer types) |
| `npm run start` | Serve a production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

Contentlayer generates types from `content/` at build time. If an import from `contentlayer/generated`
looks broken, run a build once to regenerate.

## Content model

All content is MDX under `content/`, typed in [`contentlayer.config.ts`](contentlayer.config.ts).
Front matter is validated at build time — a missing required field fails the build.

| Type | Directory | Route | Count |
|---|---|---|---|
| `Book` | `content/books/` | `/books`, `/books/[slug]` | 5 |
| `Story` | `content/stories/` | `/journal`, `/journal/[slug]` | 155 |
| `FreeRecipe` | `content/free-recipes/` | `/free` | 100 |
| `PantryEntry` | `content/pantry/` | `/culture`, `/culture/[slug]` | 38 |
| `FieldNote` | `content/notes/` | `/notes`, `/notes/[slug]` | 3 |
| `RecipeTeaser` | `content/recipes/` | (embedded in book pages) | 3 |
| `Testimonial` | `content/testimonials/` | (embedded) | 0 |

Note the naming mismatch: **`/journal` is powered by `Story`**, and **`/culture` by `PantryEntry`**.
The directory names don't match the URLs.

### Invariants — these are enforced, not conventions

- **`RecipeTeaser` carries no ingredients and no method.** Teasers point at the book; the full recipe
  is what people are paying for. Don't add those fields.
- **`Testimonial.verified` must be literally `true`.** The computed `slug` throws at build time
  otherwise. No aspirational or placeholder testimonials — remove the file or supply real attribution.
- **`FreeRecipe` SEO fields are deliberately optional** (`targetKeyword`, `metaTitle`,
  `metaDescription`, `cookTime`, `prepTime`). They were required once, which silently excluded 83 of
  100 recipes from the build — Contentlayer drops documents that fail validation rather than erroring
  loudly. Pages fall back to `title`/`dek`. Think hard before making a content field required.

## Environment variables

Set in the Vercel project (Settings → Environment Variables). Amazon URLs have hard-coded fallbacks in
the code, so the site builds without them; the MailerLite ones are needed for signup to work.

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for metadata |
| `NEXT_PUBLIC_AMAZON_URL_TMT` | Buy link — Tokyo Meets Tuscany |
| `NEXT_PUBLIC_AMAZON_URL_SMMC` | Buy link — Seoul Meets Mexico City |
| `NEXT_PUBLIC_GUMROAD_MATRIX_URL` | Flavor Pairing Matrix lead magnet |
| `MAILERLITE_API_KEY` | Email signup (server-side) |
| `MAILERLITE_GROUP_ID` | Default list |
| `MAILERLITE_TMT_GROUP_ID` | TMT-specific list |
| `MAILERLITE_SMMC_GROUP_ID` | SMMC-specific list |

Books reference their buy link indirectly, via `amazonUrlEnvKey` in front matter — resolved in
[`lib/amazon.ts`](lib/amazon.ts).

## Layout

```
app/          routes (App Router)
components/   UI — cards/, layout/, etc.
content/      MDX, typed by contentlayer.config.ts
lib/          amazon.ts, gumroad.ts, tokens.ts, aspect.ts
public/       static assets — images/ holds book covers
docs/plan.md  canonical design spec and approved decisions
```

## Deployment

Vercel project **`borderless-kitchen-series`** (team `facelesschannel0515-1196s-projects`), serving
borderlesskitchenseries.com.

- Push to **`main`** → production deploy, ~60s.
- Push any other branch → preview URL. Worth using for anything visual.

## Gotchas

**There are two stale copies of this project on Google Drive. Neither is wired to anything.**

- `G:\My Drive\SEBASTIAN_DRI_MASTER\02_WEBSITES\BORDERLESSKITCHENSERIES\SOURCE_CODE_LIVE` — despite the
  name, a frozen 2026-06-03 snapshot with 34 MDX files against this repo's 304. Editing it changes
  nothing. It has its own README saying so.
- `...\BORDERLESSKITCHENSERIES\SOURCE_CODE` — an older abandoned scaffold (`src/` layout, no content).

This has cost real time at least once: a book-cover fix was applied to the Drive copy, appeared to be
done, and had no effect on the live site until it was committed here. **If a change needs to reach
visitors, it happens in this repo.**

**Cover assets are easy to get wrong.** `public/images/` holds two Tokyo Meets Tuscany covers.
`tmt-cover.jpg` (torii gate, "30 Bold Recipes") is the design Amazon actually sells and the one the
book page uses. `tmt-cover-new.png` (tuna tataki, Tuscan villa) is a different design that is *not* on
Amazon — it was live on the site until 2026-08-11, showing buyers one cover and sending them to
another. Don't reinstate it without checking the Amazon listing first.

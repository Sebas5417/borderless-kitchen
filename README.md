# Borderless Kitchen

> Italian soul. Japanese precision.

The editorial website for Sebastian Dri — cookbooks, journal essays, and a knowledge library.

## What's built

- **23 page routes**, all internal links resolve
  - Home with full magazine flow (hero, philosophy, featured book, series preview, journal highlights, newsletter)
  - About, Connect, Privacy, Terms, custom Errata · 404
  - `/journal` index + `[slug]` story template (drop cap, mixed-block body, asymmetric masthead, reading progress bar)
  - `/book` series landing + `[bookSlug]` book template (italic Roman folio chapter list, recipe teaser grid)
  - `/culture` with three pillar landings: Pantry (index + `[slug]`), Technique, Pairing
- **Typed content layer** in `src/lib/content/` — 1 book, 5 stories, 7 pantry entries (seed); types ready for MDX migration
- **Brand-styled OG cards** for every shareable surface (homepage, every story, every book, every pantry entry) generated via `next/og` ImageResponse
- **Cmd/Ctrl+K search palette** (cmdk) — every page reachable in two keystrokes
- **Day/cream theme toggle** with FOUC-prevention bootstrap script
- **Magazine reading affordances** — italic display section headings, ember pull quotes, captioned method blocks, story reading-progress bar (CSS scroll-timeline), scroll-triggered card reveals (CSS view-timeline)
- **SEO + social** — sitemap.xml, robots.txt, RSS feed at `/rss.xml`, title template, openGraph + Twitter cards everywhere, branded favicon + apple-touch icon

## Design language

- **Fraunces** (display, italic) — mastheads, section headings, pull quotes, chapter numerals, drop caps
- **Newsreader** (body serif) — story body, paragraphs
- **JetBrains Mono** — kickers, navigation, metadata, footer marks
- **Palette**: warm dark paper `#0c0a07` + warm cream ink `#f1e8d8` + single ember accent `#d96a3a` (sansho/persimmon territory). Day mode flips to warm cream paper + espresso ink.
- **Texture**: SVG paper-grain overlay + multi-radial gradient atmosphere + faint italic Fraunces `BK` watermark in the homepage hero

See `docs/decisions.md` for the full rationale.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19
- TypeScript strict
- Single CSS file (no Tailwind), CSS custom properties for tokens
- `cmdk` for the search palette (only runtime dependency beyond the framework)

Fully static — no API routes, no serverless functions, no database. The OG image generators run at build time.

## Develop

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build & verify

```bash
npm run build        # all routes prerender static
npm run lint
```

## Deploy

The site deploys cleanly to Vercel with zero configuration:

1. Connect this repo at https://vercel.com/new
2. No environment variables required
3. After first deploy, replace the placeholder `https://borderless-kitchen.vercel.app` URL in:
   - `src/app/layout.tsx` (`metadataBase`)
   - `src/app/sitemap.ts` (`BASE_URL`)
   - `src/app/robots.ts` (`BASE_URL`)
   - `src/app/rss.xml/route.ts` (`BASE_URL`)

## Writing content

Today, content lives in typed TypeScript arrays in `src/lib/content/data.ts`:

- `BOOKS: Book[]`
- `STORIES: Story[]` — bodies are `StoryBlock[]` (string paragraphs intermixed with `{ type: 'heading' | 'pullquote' | 'caption' }` blocks)
- `PANTRY_ENTRIES: PantryEntry[]`

Adding a new story or pantry entry takes a single array push — all routes, OG cards, sitemap entries, RSS items, and search-index entries pick it up automatically.

When the content volume justifies it (probably ~15+ stories), migrate to MDX per the path described in `docs/decisions.md` — templates already consume the typed interfaces directly, so the swap is loader-only.

## Repository layout

```
src/
  app/
    layout.tsx                          # next/font setup + theme bootstrap script
    globals.css                         # design system
    page.tsx                            # homepage
    opengraph-image.tsx                 # site-wide OG fallback
    icon.svg                            # favicon (ember diamond)
    apple-icon.tsx                      # 180×180 BK monogram
    sitemap.ts                          # /sitemap.xml
    robots.ts                           # /robots.txt
    rss.xml/route.ts                    # /rss.xml
    not-found.tsx                       # custom 404
    _fonts/                             # bundled TTFs for OG image rendering
    {route}/page.tsx                    # 22 page routes
    {route}/opengraph-image.tsx         # per-route OG (journal, book, pantry)
  components/
    layout/                             # SiteHeader, SiteFooter, EditorialContainer, PrimaryNav
    PlaceholderArt.tsx                  # typographic card art
    SearchPalette.tsx                   # cmdk palette
    ThemeToggle.tsx                     # day/night toggle
  lib/content/
    types.ts                            # Book, Story, PantryEntry, RecipeTeaser, HeatLevel, StoryBlock
    data.ts                             # seed content
    search-index.ts                     # flat index for the palette
docs/
  foundation-plan.md                    # Phases 1–4 (sitemap, wireframes, components, data models)
  decisions.md                          # tech + design rationale
.claude/skills/frontend-design/         # installed skill (drives the design quality bar)
```

## Troubleshooting npm 403 errors

If `npm install` fails with `E403` (for example on `@types/node`), it is usually a proxy or registry configuration issue rather than a broken dependency graph:

```bash
npm config delete proxy
npm config delete https-proxy
npm config set registry https://registry.npmjs.org/
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

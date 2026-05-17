# Decisions

A running log of why this site is built the way it is.

## Framework

**Next.js 16 App Router + Turbopack, React 19, TypeScript strict.**

The App Router gives us server components by default, file-based metadata (sitemap, robots, openGraph images), and automatic static prerendering — which we lean into heavily. Every route is static; there are no API routes and no serverless functions in production. The only runtime work is the OG image generators, which run at build time via `generateStaticParams`.

Turbopack is the Next 16 default. One known constraint surfaced during the build: edge runtime + `fetch(new URL(..., import.meta.url))` for bundled assets hits a "not implemented yet" error inside Turbopack. The OG image generators therefore run in Node runtime and load fonts via `fs.readFile(process.cwd() + ...)`. See `src/app/opengraph-image.tsx` and the per-route OG files.

## CSS strategy

**Vanilla CSS in a single `src/app/globals.css` file, ~1300 lines, organised by section with comment-banner separators. Design tokens via CSS custom properties on `:root` with a `[data-theme="day"]` override block.**

Tailwind, CSS-in-JS, and component-scoped CSS modules were all considered and skipped. The site is small enough (22 routes, ~10 layout patterns) that the cognitive cost of a styling framework outweighs its benefit. A single CSS file is also the simplest place to land a design system for an editorial brand where the design *is* the product.

Day mode (`[data-theme="day"]`) flips the palette tokens but uses the same selectors elsewhere — no parallel stylesheet. An inline `<head>` script reads `localStorage.bk-theme` before paint and sets `documentElement.dataset.theme = 'day'` so users who opted into day mode never see a flash of dark.

## Typography

**Fraunces (display, italic) + Newsreader (body serif) + JetBrains Mono (metadata).** Loaded via `next/font/google` so they're self-hosted, subset, and preloaded. The same Fraunces italic + JetBrains Mono are bundled as TTFs in `src/app/_fonts/` and reused by the OG image generators.

Inter was deliberately dropped. The installed `frontend-design` skill (`.claude/skills/frontend-design/SKILL.md`) flags Inter as carrying an "AI-generic" feel that doesn't suit a print-magazine editorial.

The pairing is intentional:
- Fraunces carries the brand voice — italic, characterful, optical sizing, slight wonk
- Newsreader is the patient sibling — designed for screen reading at body sizes
- JetBrains Mono provides the indexical "back-matter" texture (folio numbers, section labels, filter pills, nav)

## Palette

**Single hot accent on warm dark paper.**

- `--paper` `#0c0a07` (warm near-black)
- `--ink` `#f1e8d8` (warm cream)
- `--ember` `#d96a3a` (sansho / persimmon territory) — the only accent

The accent is reserved for the moments that earn it: kicker diamonds, active nav, chapter Roman numerals, drop caps, hover states, drop-quote rule, the BK monogram in the hero watermark, the diamond in the favicon. Ember on body text or section headings would dilute the editorial feel.

Day mode (`[data-theme="day"]`) swaps to warm cream paper + espresso ink, and deepens the ember slightly (`#c75a2a`) for contrast on light. The grain overlay swaps blend mode from `overlay` to `multiply` so the texture continues to read.

## Motion

**Three CSS-only animation moments, all wrapped in `@media (prefers-reduced-motion: no-preference)`. No JS animation libraries.**

1. **Page-load entry stagger** — direct children of `.editorial-page > article` and `.home-section .home-section-inner > *` rise + fade with `animation-delay` (CSS keyframes).
2. **Scroll-triggered card reveals** — `.editorial-page` card / pillar / teaser grid items animate on viewport entry via `animation-timeline: view()`. Gracefully degrades — `@supports` wrapped.
3. **Story reading progress** — the 2px ember bar at the top of story pages fills via `animation-timeline: scroll(root)`. Same `@supports` guard.

The brand discipline is "one orchestrated moment per surface, not scattered micro-interactions" — that's the `frontend-design` skill's guidance, and it's what keeps the motion feeling editorial rather than gimmicky.

## Hero atmosphere

**Pure CSS, no asset dependency.**

The original `/hero-texture.svg` (a generic init-time placeholder) was deleted. Atmosphere now comes from:
- Three radial gradient meshes on `.hero-shell::before` (one ember top-right, one ember-soft bottom-left, one warm cream centre)
- A giant italic Fraunces `BK` watermark in `.hero-shell::after` at ~2.8% opacity (cream on dark / 4.5% dark-on-cream in day mode)
- The body-wide SVG grain overlay

## Content layer

**Typed TypeScript arrays today, MDX-ready architecture.**

`src/lib/content/types.ts` defines `Book`, `Story`, `PantryEntry`, `RecipeTeaser`, `HeatLevel`, and the discriminated-union `StoryBlock = string | { type: 'heading' | 'pullquote' | 'caption' }`. Seed content lives in `src/lib/content/data.ts`.

Templates consume the typed interfaces directly via `getBookBySlug`, `getStoryBySlug`, `getPantryBySlug` and the list helpers. When content volume justifies the migration, replacing those loaders with MDX file readers (per `@next/mdx` + `gray-matter`) is a single-file change. The templates, OG generators, sitemap, RSS feed, and search index will all keep working unchanged.

### Why not MDX yet?

The foundation plan (`docs/foundation-plan.md` Step 4) calls for `@next/mdx` + typed frontmatter collections. We've deferred until ~15 stories live in the journal — until then, hardcoded typed arrays are faster to iterate against and give us cleaner refactors if we change the schema. The data file is the canonical source until that point.

### Recipe teaser exclusions

`RecipeTeaser` deliberately excludes `ingredients`, `method`, `instructions`, `prepTime`, `cookTime`, `steps`. Full recipes live in the printed book. The site publishes headnotes and pairings only, with a "Full recipe in the book — Buy on Amazon" CTA. This is documented in the type definition and enforced by the schema.

## OG images

**`next/og` ImageResponse, Node runtime, bundled fonts.**

Five generators:
- `src/app/opengraph-image.tsx` — homepage fallback / default
- `src/app/journal/[slug]/opengraph-image.tsx` — per story
- `src/app/book/[bookSlug]/opengraph-image.tsx` — per book
- `src/app/culture/pantry/[slug]/opengraph-image.tsx` — per pantry entry
- (The homepage OG also covers static pages via metadata fallback)

Each composition uses Fraunces italic for the title (length-scaled font size) and JetBrains Mono for the kicker + footer. Two-row layout: kicker + folio at top, italic title + subtitle in the middle, hairline-rule footer with attribution. Ember accent on the ◇ diamond and the author mark.

Fonts loaded via `fs.readFile(process.cwd() + 'src/app/_fonts/...')` — the `new URL(..., import.meta.url)` pattern from the Next.js docs hits a Turbopack edge-runtime bug.

## Search

**`cmdk` Cmd/Ctrl+K palette, flat search index built at build time.**

`src/lib/content/search-index.ts` enumerates static pages + all books + all stories + all pantry entries as `SearchItem[]`, including keywords (book logline, story standfirst, pantry flavor profile) so the fuzzy match catches relevant terms even if they don't appear in the title.

Only client-component boundaries on the site:
- `SearchPalette.tsx` — palette state, keyboard listener, router navigation
- `PrimaryNav.tsx` — `usePathname` for the active-page indicator
- `ThemeToggle.tsx` — state-less, directly manipulates `documentElement.dataset.theme`

Everything else is server-rendered.

## SEO surface

- `metadataBase` set in `layout.tsx`; per-page metadata uses the `'%s — Borderless Kitchen'` title template
- Per-route `openGraph` overrides for type (article / book), publishedTime, authors, tags
- `sitemap.ts` enumerates static + dynamic routes with per-type priority + changeFrequency
- `robots.ts` allows all, points at the sitemap
- `rss.xml/route.ts` publishes the journal as RSS 2.0 with Atom self-link

After the first deploy, the `BASE_URL` placeholder in `sitemap.ts`, `robots.ts`, `rss.xml/route.ts`, and the `metadataBase` in `layout.tsx` should be swapped to the real domain.

## Skills installed

`.claude/skills/frontend-design/` — Apache-2.0 licensed, sourced from the same skill referenced in the Sebastian Command Center project. Used as the design-quality north star for typography, palette, motion, and "avoid AI-generic aesthetics" decisions throughout.

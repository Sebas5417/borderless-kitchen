# Borderless Kitchen — Information Architecture & Editorial Foundation (Steps 1–4)

## Step 1 — Sitemap

### Primary route map

- `/` — Home (editorial front door)
- `/about` — About Sebastian Dri + platform philosophy
- `/journal` — Editorial archive index
- `/journal/[slug]` — Story/article template
- `/book` — Books landing (series view)
- `/book/[bookSlug]` — Individual book page (editorial masthead + teasers)
- `/culture` — Knowledge library landing
- `/culture/pantry` — Pantry index (reference taxonomy)
- `/culture/pantry/[slug]` — Pantry entry template
- `/connect` — Newsletter + contact/intake
- `/privacy` — Privacy policy
- `/terms` — Terms of use

### Subpages & section hierarchy

#### Home (`/`)
1. Full-bleed hero (statement + image)
2. Philosophy strip (Italian soul / Japanese precision)
3. Featured book module (Tokyo Meets Tuscany)
4. Series preview (upcoming titles)
5. Journal highlights (3 latest stories)
6. Newsletter module (minimal single-input form)

#### About (`/about`)
1. Editorial portrait + manifesto
2. Origin timeline (memory, migration, ritual)
3. Method statement (soul + precision)
4. Signature quote block

#### Journal (`/journal`)
1. Archive masthead
2. Filter bar (theme + tag + format)
3. Story cards (image-led, minimal metadata)
4. Pagination/load-more

#### Journal Story (`/journal/[slug]`)
1. Hero media + title deck
2. Intro standfirst
3. Longform body
4. Pull quote(s)
5. Linked pantry references
6. Next/previous story

#### Books Landing (`/book`)
1. Series masthead
2. Flagship feature card
3. Forthcoming books grid (coming soon states)
4. CTA strip (Amazon + newsletter)

#### Individual Book (`/book/[bookSlug]`)
1. Editorial masthead
2. Concept section
3. Chapter preview
4. Recipe teaser gallery (no ingredients/method)
5. CTA block: “Full recipe in the book — Buy on Amazon”

#### Culture (`/culture`)
1. Knowledge library masthead
2. Pantry pillar intro
3. Category index
4. Curated learning paths (e.g., “Foundations”, “Heat & Balance”)

#### Pantry Index (`/culture/pantry`)
1. Taxonomy header
2. Alphabetical + category browse
3. Quick facts cards

#### Pantry Entry (`/culture/pantry/[slug]`)
1. Definition + origin
2. Flavor profile + usage norms
3. Substitutions and pairings
4. Related stories + related pantry links

#### Connect (`/connect`)
1. Newsletter invitation
2. Intent statement (what subscribers receive)
3. Contact pathways (press, partnerships)

### Route templates

- `StoryTemplate` for `/journal/[slug]`
- `BookTemplate` for `/book/[bookSlug]`
- `PantryEntryTemplate` for `/culture/pantry/[slug]`

### User flow (primary)

1. User lands on Home via social/search/direct.
2. Hero and philosophy establish brand intent quickly.
3. User chooses one of 3 paths:
   - Explore flagship book (`/book/tokyo-meets-tuscany`)
   - Read an editorial story (`/journal/[slug]`)
   - Learn ingredient culture (`/culture/pantry/[slug]`)
4. Story pages context-link to pantry entries and occasionally to book pages.
5. Book page surfaces recipe teasers and converts with Amazon CTA.
6. Newsletter capture occurs at Home, Book, and Connect.

---

## Step 2 — Wireframes (structured outlines)

### Home wireframe

1. **Full-Bleed Hero**
   - Left: headline (“Italian soul. Japanese precision.”)
   - Right/background: dark editorial image
   - Minimal top nav + discreet accent line
2. **Philosophy Strip**
   - Two-column contrast panel: Soul / Precision
   - Short explanatory copy
3. **Featured Book**
   - Large cover visual
   - Title, concept, one-line thesis
   - Primary CTA: “Explore the Book”
4. **Series Preview**
   - 3-card row, “Coming Soon” tags
5. **Journal Highlights**
   - 3 image-led story cards
   - CTA: “Enter the Archive”
6. **Newsletter Block**
   - Quiet close with single field + submit

### About wireframe

1. Intro masthead + portrait
2. Manifesto paragraph block (68ch)
3. Timeline ribbon (origin → migration → synthesis)
4. Closing quote on full-bleed image

### Journal wireframe

1. Masthead + one-line editorial framing
2. Filter rail (tags/themes)
3. Story card grid (2–3 columns desktop)
4. Pagination / load more

### Book wireframe (individual book)

1. Full-bleed masthead (title + subtitle + cover)
2. Concept section (longform introduction)
3. Chapter preview (numbered list)
4. Recipe teaser gallery (image, headnote, pairings, heat)
5. CTA footer (“Full recipe in the book — Buy on Amazon”)

### Culture wireframe

1. Masthead (knowledge library)
2. Pillar blocks: pantry, technique context, pairing logic
3. Featured pantry entries row
4. Link to full pantry taxonomy

### Connect wireframe

1. Quiet hero + invitation
2. Newsletter form (email + consent copy)
3. Contact tiles (press / partnerships)

### Template wireframes

- **StoryTemplate**: hero → standfirst → body → pull quote → references → adjacent stories
- **BookTemplate**: masthead → concept → chapters → teasers → CTA
- **PantryEntryTemplate**: definition → profile → usage → pairings → related links

---

## Step 3 — Component Inventory

### Layout & structure
- `SiteHeader`
- `SiteFooter`
- `EditorialContainer` (68ch constrained body)
- `FullBleedSection`
- `SectionHeading`
- `SplitPanel`

### Navigation
- `PrimaryNav`
- `MobileNavDrawer`
- `Breadcrumbs` (for deep templates)

### Editorial content components
- `HeroMasthead`
- `PhilosophyStrip`
- `PullQuote`
- `StoryCard`
- `StoryGrid`
- `ChapterList`
- `SeriesPreviewCard`

### Book-specific
- `BookFeature`
- `BookMetaRow`
- `RecipeTeaserCard` (strict teaser-only fields)
- `RecipeTeaserGrid`
- `BuyCtaPanel`

### Culture/Pantry-specific
- `PantryCard`
- `PantryFactTable`
- `TagPill`
- `RelatedLinks`

### Forms & conversion
- `NewsletterForm` (server action-backed)
- `ConsentNote`
- `InlineFormStatus`

### Motion (Framer Motion, restrained)
- `FadeRiseInView`

### Utility/UI primitives
- `EditorialImage`
- `AccentRule`
- `MetaLabel`
- `HeatBadge`
- `CategoryBadge`

---

## Step 4 — Content Data Structures

> Proposed to use `@next/mdx` + typed frontmatter collections for simplicity with Next.js App Router (no extra content build layer) and document rationale in `docs/decisions.md` during implementation.

### 1) Recipe teaser model (NO full recipe fields)

```ts
interface RecipeTeaser {
  slug: string
  title: string
  bookSlug: string
  chapter: string
  heat: 'mild' | 'warm' | 'bold' | 'fire'
  category: 'pasta' | 'rice' | 'broth' | 'grill' | 'small-plates' | 'dessert'
  headnote: string
  pairings: string[]
  heroImage: string
  ctaLabel: 'Full recipe in the book — Buy on Amazon'
}
```

**Explicit exclusions:** `ingredients`, `method`, `instructions`, `prepTime`, `cookTime`, `steps`.

### 2) Story/article model

```ts
interface Story {
  slug: string
  title: string
  subtitle?: string
  standfirst: string
  author: string
  publishedAt: string // ISO date
  readTime: number
  themes: string[]
  tags: string[]
  heroImage: string
  bodyMdxPath: string
  relatedPantrySlugs?: string[]
}
```

### 3) Book model

```ts
interface Book {
  slug: string
  title: string
  subtitle?: string
  status: 'available' | 'coming-soon'
  logline: string
  concept: string
  coverImage: string
  heroImage: string
  releaseDate?: string
  chapters: { title: string; summary: string }[]
  buyUrl?: string
  featured: boolean
}
```

### 4) Pantry entry model

```ts
interface PantryEntry {
  slug: string
  name: string
  category: 'acid' | 'ferment' | 'aromatic' | 'chili' | 'oil' | 'grain' | 'sea'
  origin: string
  definition: string
  flavorProfile: string[]
  commonUses: string[]
  substitutions?: string[]
  pairings?: string[]
  relatedStorySlugs?: string[]
  relatedPantrySlugs?: string[]
  heroImage?: string
}
```

### 5) Categories/tags model

```ts
interface TaxonomyTerm {
  slug: string
  label: string
  type: 'story-theme' | 'story-tag' | 'pantry-category' | 'book-topic'
  description?: string
}
```

### 6) Heat scale model

```ts
interface HeatLevel {
  key: 'mild' | 'warm' | 'bold' | 'fire'
  label: string
  description: string
  visualToken: 'heat-1' | 'heat-2' | 'heat-3' | 'heat-4'
}
```


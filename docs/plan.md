# Borderless Kitchen — Editorial Platform Plan

Canonical design spec. Steps 1–4 of the Claude Code build brief.
Approved decisions appended at the end of this document.

---

## Step 1 — Sitemap

### Routes

- `/` — Home
- `/about` — Sebastian + philosophy
- `/journal` — Editorial archive (index)
- `/journal/[slug]` — Story / essay
- `/books` — Series overview
- `/books/[slug]` — Book page (flagship: `tokyo-meets-tuscany`)
- `/books/[slug]/recipes/[recipe]` — Recipe teaser (lives under the book; no top-level `/recipes`)
- `/culture` — Knowledge library (index)
- `/culture/[slug]` — Pantry / culture entry
- `/connect` — Contact + newsletter
- `/legal/privacy`, `/legal/terms`

### Templates

`HomeTemplate`, `LongformTemplate`, `BookTemplate`, `RecipeTeaserTemplate`, `IndexTemplate`, `PantryTemplate`, `LegalTemplate`.

### User flow

- Discovery → Home hero → Featured Book → recipe teaser → Amazon CTA
- Discovery → Stories → essay → linked Pantry term → back to Stories
- Newsletter capture appears once on Home, once on Connect, never repeated mid-flow
- No global recipe browse — recipes are always reached through a book

---

## Step 2 — Wireframes

### Home
1. Full-bleed dark editorial hero. Headline: *Italian soul. Japanese precision.* No button above the fold.
2. Philosophy strip — three short statements, wide negative space, no icons.
3. Featured book — Tokyo Meets Tuscany. Cover left, concept paragraph right, one CTA.
4. Series preview — three forthcoming books as quiet cards (region pair, status). No publish dates.
5. Stories — three latest, image-led.
6. Newsletter — one field, one line of copy. No incentive language.

### About
Portrait. Origin (Italy + Japan). Philosophy + author note only. **No press/credentials block.**

### Journal (index)
Title + one-line intent. Chronological essay list — each card: image, title, dek, date. Subtle theme filter.

### Journal entry
Full-bleed hero. Title / dek / date / reading time. Body at 68ch. Optional drop cap. Inline pull quote. Footer: linked pantry references + next/previous.

### Books (series index)
Series statement. Tokyo Meets Tuscany highlighted. Three coming-soon entries underneath, treated quietly.

### Book page
1. Editorial masthead — title, year, region pair, status.
2. Concept — long-form paragraph (no bullets).
3. Chapter preview — chapter list with one-sentence notes.
4. Recipe teasers — cards: hero image, title, heat, single-line headnote.
5. Optional context block (only with real, verified attribution).
6. Single CTA — *Buy on Amazon*.

### Recipe teaser page
Hero image full-bleed. Title + chapter + heat. Headnote (editorial). Pairings list. Closing line: *Full recipe in the book — Buy on Amazon.* No ingredients. No method.

### Culture (index)
Intro. Classification rows (ingredients · techniques · traditions · terms). A–Z list.
**Discipline:** no more than one knowledge block visible per screen height at 1440×900 desktop viewport, default zoom.

### Culture entry
Every culture sub-route opens with:
- full-bleed editorial moment
- Playfair headline
- red 48px rule
- one sentence before any data

Then: term + classification + origin → definition → history → culinary use. Cross-links to stories.

### Connect
Single intent paragraph. Newsletter. Email link. Social (only if real).

---

## Step 3 — Component inventory

### Layout
`SiteHeader`, `SiteFooter`, `Container`, `Section`, `ProseLayout` (68ch)

### Editorial
`Hero`, `Masthead`, `PhilosophyStrip`, `PullQuote`, `DropCap`, `Caption`, `Byline`, `RedRule` (48px accent rule for culture sub-routes)

### Cards
`BookCard`, `StoryCard`, `RecipeTeaserCard`, `PantryCard`, `ChapterListItem`

### Media
`EditorialImage` (next/image + aspect/crop tokens), `FullBleed`, `ImagePair`, `PlaceholderImage` (charcoal-to-black radial gradient + muted red dot, named by slot)

### Interaction
`NewsletterForm` (provider-agnostic server action), `AmazonCTA`, `LinkUnderline`, `FadeRise` (Framer scroll wrapper — only motion primitive)

### Navigation
`PrimaryNav`, `BreadcrumbsMinimal`, `NextPrevious`

### SEO / meta
`SeoMeta`, `StructuredData` (Book, Article — no Recipe schema, since we ship teasers only)

---

## Step 4 — Content data structures

```ts
type Heat = 1 | 2 | 3 | 4 | 5;

type AspectToken = "hero-wide" | "hero-portrait" | "editorial" | "square";
// hero-wide   = 21:9
// hero-portrait = 3:4
// editorial   = 4:5
// square      = 1:1

type Image = {
  src: string;            // path or null → placeholder
  alt: string;
  credit?: string;
  aspect: AspectToken;
  crop?: "center" | "top" | "bottom";
} | null;                 // null → render PlaceholderImage by slot

type Book = {
  slug: string;
  title: string;
  subtitle?: string;
  status: "available" | "coming" | "in-progress";
  year?: number;          // omitted on coming-soon
  regionPair: [string, string];
  concept: MDX;
  chapters: Chapter[];    // empty on coming-soon
  heroImage: Image;
  coverImage: Image;
  amazonUrl?: string;     // env-driven for TMT
  releaseNote?: string;
};

type Chapter = {
  slug: string;
  title: string;
  intro: string;
  recipeTeaserSlugs: string[];
};

// TEASER ONLY — no ingredients, no method, no instructions
type RecipeTeaser = {
  slug: string;
  title: string;
  bookSlug: string;
  chapter: string;
  heat: Heat;
  category: string;
  headnote: MDX;          // editorial — story, memory, why
  pairings: string[];     // names only
  heroImage: Image;
};

type Story = {
  slug: string;
  title: string;
  dek: string;
  date: string;           // ISO
  readingTime: number;
  themes: string[];
  heroImage: Image;
  body: MDX;
  pantryRefs: string[];
};

type PantryEntry = {
  slug: string;
  term: string;
  classification: "ingredient" | "technique" | "tradition" | "term";
  origin: string[];
  definition: MDX;
  history?: MDX;
  culinaryUse?: MDX;
  heroImage?: Image;
  storyRefs: string[];
};

type Testimonial = {
  source: string;
  attribution: string;
  date: string;
  verified: true;         // literal — placeholder data fails typecheck
};
```

### Controlled vocabularies
- `category` — `antipasto · primo · secondo · contorno · dolce · izakaya · donburi · zensai · …`
- `themes` — `memory · migration · ritual · technique · ingredient · place`
- `classification` — fixed set above

### Strict invariants
- `RecipeTeaser` schema has no `ingredients` or `method` fields. The type prevents accidental publication of full recipes.
- `Testimonial.verified` is a literal `true`. Placeholder seed data won't typecheck and cannot ship.
- Recipe routes are nested under `/books/[slug]/recipes/...`. There is no top-level recipe collection.

---

## Approved decisions (locked)

1. **MDX engine** — `contentlayer2` (schema validation required).
2. **Newsletter** — Stub only. Intended provider Buttondown. Env: `NEWSLETTER_PROVIDER=buttondown|none` (default `none`). Dev: log to local JSON. Prod: visible success state, no-op. No Buttondown account or keys yet.
3. **Repo + path** — `C:\Users\sdri\AI Projects Claude Code\borderless-kitchen-series\`. `git init` immediately. Local commits through stop-points. After Home + Book pass review → create private GitHub repo `borderless-kitchen-series` and push full history.
4. **Coming-soon books** — Seoul Meets Sicily · Lima Meets Lisbon · Bangkok Meets Barcelona. Status `coming`. Restrained editorial descriptors. No publish dates. No chapters. No ISBN. `heroImage: null`.
5. **Photography** — Dark editorial placeholders, charcoal-to-black radial gradient with centered muted red dot. Aspect tokens: `hero-wide` (21:9), `hero-portrait` (3:4), `editorial` (4:5), `square` (1:1). Named by slot.
6. **Amazon URL** — `NEXT_PUBLIC_AMAZON_URL_TMT` (placeholder `#`).
7. **About** — Philosophy + author note only. No press/credentials.
8. **Recipe teasers on Home** — Not displayed. Home links to Book → Book contains teasers.
9. **Analytics** — None at launch.
10. **Canonical domain** — `https://borderlesskitchenseries.com` via `NEXT_PUBLIC_SITE_URL`.

### Reinforced rules
- Testimonials require `verified: true` literal type.
- Component palette stays small.
- Photography is a first-class content type, not styling.

### Build order
1. Bootstrap → tokens → content layer → placeholder system → newsletter stub → layout shell.
2. Home → STOP, summarize, commit `step-5-home-complete`.
3. Book page → STOP, summarize, commit `step-5-book-complete`.
4. Remaining templates after approval.

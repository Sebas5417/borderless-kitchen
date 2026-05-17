export type HeatKey = 'mild' | 'warm' | 'bold' | 'fire'

export interface HeatLevel {
  key: HeatKey
  label: string
  description: string
}

export type RecipeCategory =
  | 'pasta'
  | 'rice'
  | 'broth'
  | 'grill'
  | 'small-plates'
  | 'dessert'

/**
 * Teaser-only. Explicitly excludes ingredients, method, instructions, prepTime,
 * cookTime, steps — those live in the printed book per docs/foundation-plan.md.
 */
export interface RecipeTeaser {
  slug: string
  title: string
  bookSlug: string
  chapter: string
  heat: HeatKey
  category: RecipeCategory
  headnote: string
  pairings: string[]
}

export interface BookChapter {
  marker?: string
  title: string
  summary: string
}

export interface Book {
  slug: string
  title: string
  subtitle?: string
  status: 'available' | 'coming-soon'
  featured: boolean
  logline: string
  concept: string
  releaseDate?: string
  chapters: BookChapter[]
  teasers?: RecipeTeaser[]
  buyUrl?: string
}

export type StoryBlock =
  | string
  | { type: 'heading'; text: string }
  | { type: 'pullquote'; text: string; attribution?: string }
  | { type: 'caption'; label: string; text: string }

export interface Story {
  slug: string
  title: string
  subtitle?: string
  standfirst: string
  author: string
  publishedAt: string
  readTime: number
  themes: string[]
  body: StoryBlock[]
  relatedPantrySlugs?: string[]
}

export type PantryCategory =
  | 'acid'
  | 'ferment'
  | 'aromatic'
  | 'chili'
  | 'oil'
  | 'grain'
  | 'sea'

export interface PantryEntry {
  slug: string
  name: string
  category: PantryCategory
  origin: string
  definition: string
  flavorProfile: string[]
  commonUses: string[]
  substitutions?: string[]
  pairings?: string[]
  relatedStorySlugs?: string[]
  relatedPantrySlugs?: string[]
}

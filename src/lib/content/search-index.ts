import { BOOKS, PANTRY_ENTRIES, STORIES } from './data'

export type SearchItemType = 'page' | 'book' | 'story' | 'pantry'

export interface SearchItem {
  id: string
  type: SearchItemType
  title: string
  subtitle?: string
  href: string
  keywords?: string
}

const STATIC_PAGES: SearchItem[] = [
  { id: 'home', type: 'page', title: 'Home', href: '/' },
  { id: 'about', type: 'page', title: 'About', subtitle: 'Sebastian Dri', href: '/about' },
  { id: 'journal', type: 'page', title: 'Journal', subtitle: 'The archive', href: '/journal' },
  { id: 'book', type: 'page', title: 'Books', subtitle: 'The series', href: '/book' },
  { id: 'culture', type: 'page', title: 'Culture', subtitle: 'The knowledge library', href: '/culture' },
  { id: 'culture-pantry', type: 'page', title: 'Pantry', subtitle: 'Culture · taxonomy', href: '/culture/pantry' },
  { id: 'culture-technique', type: 'page', title: 'Technique', subtitle: 'Culture · method', href: '/culture/technique' },
  { id: 'culture-pairing', type: 'page', title: 'Pairing', subtitle: 'Culture · pairing logic', href: '/culture/pairing' },
  { id: 'connect', type: 'page', title: 'Connect', subtitle: 'Newsletter and contact', href: '/connect' },
]

export const SEARCH_INDEX: SearchItem[] = [
  ...STATIC_PAGES,
  ...BOOKS.map((b) => ({
    id: `book-${b.slug}`,
    type: 'book' as const,
    title: b.title,
    subtitle: b.subtitle ?? b.logline,
    href: `/book/${b.slug}`,
    keywords: b.logline,
  })),
  ...STORIES.map((s) => ({
    id: `story-${s.slug}`,
    type: 'story' as const,
    title: s.title,
    subtitle: s.themes.join(' · '),
    href: `/journal/${s.slug}`,
    keywords: s.standfirst,
  })),
  ...PANTRY_ENTRIES.map((p) => ({
    id: `pantry-${p.slug}`,
    type: 'pantry' as const,
    title: p.name,
    subtitle: `Pantry · ${p.category} · ${p.origin}`,
    href: `/culture/pantry/${p.slug}`,
    keywords: p.flavorProfile.join(' '),
  })),
]

export const SEARCH_GROUPS: { type: SearchItemType; heading: string }[] = [
  { type: 'page', heading: 'Pages' },
  { type: 'book', heading: 'Books' },
  { type: 'story', heading: 'Stories' },
  { type: 'pantry', heading: 'Pantry' },
]

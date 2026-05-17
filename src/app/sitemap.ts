import type { MetadataRoute } from 'next'
import { BOOKS, PANTRY_ENTRIES, STORIES } from '@/lib/content/data'

const BASE_URL = 'https://borderless-kitchen.vercel.app'

const staticRoutes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '', priority: 1.0, changeFrequency: 'monthly' },
  { path: '/about', priority: 0.7, changeFrequency: 'yearly' },
  { path: '/journal', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/book', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/culture', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/culture/pantry', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/culture/technique', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/culture/pairing', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/connect', priority: 0.5, changeFrequency: 'yearly' },
  { path: '/privacy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  return [
    ...staticRoutes.map(({ path, priority, changeFrequency }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })),
    ...BOOKS.map((b) => ({
      url: `${BASE_URL}/book/${b.slug}`,
      lastModified: b.releaseDate ? new Date(b.releaseDate) : now,
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    })),
    ...STORIES.map((s) => ({
      url: `${BASE_URL}/journal/${s.slug}`,
      lastModified: new Date(s.publishedAt),
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
    ...PANTRY_ENTRIES.map((p) => ({
      url: `${BASE_URL}/culture/pantry/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
  ]
}

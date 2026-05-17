import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EditorialContainer } from '@/components/layout/EditorialContainer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import {
  STORIES,
  getPantryBySlug,
  getStoryBySlug,
  listStorySlugs,
} from '@/lib/content/data'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return listStorySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  if (!story) return { title: 'Not found — Borderless Kitchen' }
  return {
    title: `${story.title} — Borderless Kitchen`,
    description: story.standfirst,
  }
}

export default async function StoryPage({ params }: RouteParams) {
  const { slug } = await params
  const story = getStoryBySlug(slug)
  if (!story) notFound()

  const index = STORIES.findIndex((s) => s.slug === slug)
  const prev = index > 0 ? STORIES[index - 1] : undefined
  const next = index >= 0 && index < STORIES.length - 1 ? STORIES[index + 1] : undefined

  const relatedPantry = (story.relatedPantrySlugs ?? [])
    .map((s) => getPantryBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead story-masthead">
          <div className="story-masthead-main">
            <p className="page-kicker">
              {story.themes.join(' · ')} · {story.readTime} min read
            </p>
            <h1>{story.title}</h1>
            {story.subtitle && <p className="page-deck">{story.subtitle}</p>}
          </div>
          <aside className="story-masthead-aside">
            <p className="meta-label">By</p>
            <p>{story.author}</p>
            <p className="meta-label">Published</p>
            <time dateTime={story.publishedAt}>{formatDate(story.publishedAt)}</time>
          </aside>
        </header>

        <EditorialContainer>
          <section className="page-section">
            <p className="standfirst">{story.standfirst}</p>
          </section>

          <section className="page-section story-body">
            {story.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </section>

          {relatedPantry.length > 0 && (
            <section className="page-section">
              <h2 className="section-heading">Pantry references</h2>
              <ul className="related-list">
                {relatedPantry.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/culture/pantry/${p.slug}`}>
                      <span className="card-meta">{p.category}</span>
                      <span className="related-title">{p.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <nav className="story-adjacent" aria-label="Adjacent stories">
            {prev ? (
              <Link href={`/journal/${prev.slug}`} className="adjacent-link">
                <span className="card-meta">← Previous</span>
                <span>{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={`/journal/${next.slug}`} className="adjacent-link is-right">
                <span className="card-meta">Next →</span>
                <span>{next.title}</span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </EditorialContainer>
      </article>
      <SiteFooter />
    </main>
  )
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { EditorialContainer } from '@/components/layout/EditorialContainer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import {
  getPantryBySlug,
  getStoryBySlug,
  listPantrySlugs,
} from '@/lib/content/data'

interface RouteParams {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return listPantrySlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params
  const entry = getPantryBySlug(slug)
  if (!entry) return { title: 'Not found — Borderless Kitchen' }
  return {
    title: `${entry.name} — Pantry — Borderless Kitchen`,
    description: entry.definition,
  }
}

export default async function PantryEntryPage({ params }: RouteParams) {
  const { slug } = await params
  const entry = getPantryBySlug(slug)
  if (!entry) notFound()

  const relatedStories = (entry.relatedStorySlugs ?? [])
    .map((s) => getStoryBySlug(s))
    .filter((s): s is NonNullable<typeof s> => Boolean(s))

  const relatedPantry = (entry.relatedPantrySlugs ?? [])
    .map((s) => getPantryBySlug(s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))

  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead">
          <p className="page-kicker">
            Pantry · {titleCase(entry.category)} · {entry.origin}
          </p>
          <h1>{entry.name}</h1>
          <p className="page-deck">{entry.definition}</p>
        </header>

        <EditorialContainer>
          <section className="page-section">
            <dl className="pantry-facts">
              <div>
                <dt>Flavor profile</dt>
                <dd>{entry.flavorProfile.join(' · ')}</dd>
              </div>
              <div>
                <dt>Common uses</dt>
                <dd>
                  <ul>
                    {entry.commonUses.map((u) => (
                      <li key={u}>{u}</li>
                    ))}
                  </ul>
                </dd>
              </div>
              {entry.substitutions && entry.substitutions.length > 0 && (
                <div>
                  <dt>Substitutions</dt>
                  <dd>{entry.substitutions.join(' · ')}</dd>
                </div>
              )}
              {entry.pairings && entry.pairings.length > 0 && (
                <div>
                  <dt>Pairings</dt>
                  <dd>{entry.pairings.join(' · ')}</dd>
                </div>
              )}
            </dl>
          </section>

          {(relatedStories.length > 0 || relatedPantry.length > 0) && (
            <section className="page-section">
              <h2 className="section-heading">Related</h2>
              <ul className="related-list">
                {relatedStories.map((s) => (
                  <li key={`story-${s.slug}`}>
                    <Link href={`/journal/${s.slug}`}>
                      <span className="card-meta">Story</span>
                      <span className="related-title">{s.title}</span>
                    </Link>
                  </li>
                ))}
                {relatedPantry.map((p) => (
                  <li key={`pantry-${p.slug}`}>
                    <Link href={`/culture/pantry/${p.slug}`}>
                      <span className="card-meta">Pantry · {p.category}</span>
                      <span className="related-title">{p.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </EditorialContainer>
      </article>
      <SiteFooter />
    </main>
  )
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

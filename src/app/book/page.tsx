import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { BOOKS } from '@/lib/content/data'

export const metadata: Metadata = {
  title: 'Books — Borderless Kitchen',
  description:
    'The Borderless Kitchen series. Tokyo Meets Tuscany and the books still to come.',
}

const forthcoming = [
  { slug: 'series-ii', title: 'Untitled · Series II', status: 'In development' },
  { slug: 'series-iii', title: 'Untitled · Series III', status: 'In development' },
  { slug: 'series-iv', title: 'Untitled · Series IV', status: 'In development' },
]

export default function BookLandingPage() {
  const flagship = BOOKS.find((b) => b.featured) ?? BOOKS[0]

  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead">
          <p className="page-kicker">Books</p>
          <h1>A series, not a shelf.</h1>
          <p className="page-deck">
            Volumes built around a single idea: that craft travels, and respects where
            it lands.
          </p>
        </header>

        {flagship && (
          <section className="page-section">
            <article className="feature-book">
              <div className="feature-book-cover" aria-hidden="true" />
              <div className="feature-book-copy">
                <p className="card-meta">Flagship</p>
                <h2>{flagship.title}</h2>
                <p>{flagship.logline}</p>
                <Link href={`/book/${flagship.slug}`} className="text-cta">
                  Explore the Book →
                </Link>
              </div>
            </article>
          </section>
        )}

        <section className="page-section">
          <h2 className="section-heading">Forthcoming</h2>
          <ul className="card-grid">
            {forthcoming.map((b) => (
              <li key={b.slug} className="placeholder-card is-coming-soon">
                <div className="placeholder-card-image" aria-hidden="true" />
                <p className="card-meta">{b.status}</p>
                <h3 className="card-title">{b.title}</h3>
              </li>
            ))}
          </ul>
        </section>

        <section className="page-section cta-strip">
          <p>Subscribe for new chapters and pre-release dates.</p>
          <Link href="/connect" className="text-cta">
            Join the list →
          </Link>
        </section>
      </article>
      <SiteFooter />
    </main>
  )
}

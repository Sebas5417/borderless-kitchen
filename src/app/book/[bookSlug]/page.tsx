import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { getBookBySlug, listBookSlugs } from '@/lib/content/data'

interface RouteParams {
  params: Promise<{ bookSlug: string }>
}

export function generateStaticParams() {
  return listBookSlugs().map((bookSlug) => ({ bookSlug }))
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { bookSlug } = await params
  const book = getBookBySlug(bookSlug)
  if (!book) return { title: 'Not found — Borderless Kitchen' }
  return {
    title: `${book.title} — Borderless Kitchen`,
    description: book.logline,
  }
}

export default async function BookPage({ params }: RouteParams) {
  const { bookSlug } = await params
  const book = getBookBySlug(bookSlug)
  if (!book) notFound()

  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead book-masthead">
          <p className="page-kicker">Book</p>
          <h1>{book.title}</h1>
          {book.subtitle && <p className="page-deck">{book.subtitle}</p>}
          <p className="book-logline">{book.logline}</p>
          <p className="book-meta">
            <span>{book.status === 'available' ? 'Available' : 'Coming soon'}</span>
            {book.releaseDate && <span> · {formatReleaseDate(book.releaseDate)}</span>}
          </p>
        </header>

        <section className="page-section">
          <h2 className="section-heading">Concept</h2>
          <p className="standfirst">{book.concept}</p>
        </section>

        <section className="page-section">
          <h2 className="section-heading">Chapters</h2>
          <ol className="chapter-list">
            {book.chapters.map((c) => (
              <li key={c.title}>
                <h3>{c.title}</h3>
                <p>{c.summary}</p>
              </li>
            ))}
          </ol>
        </section>

        {book.teasers && book.teasers.length > 0 && (
          <section className="page-section">
            <h2 className="section-heading">Recipe teasers</h2>
            <p className="section-deck">
              Headnotes and pairings only. Full recipes live in the book.
            </p>
            <ul className="teaser-grid">
              {book.teasers.map((t) => (
                <li key={t.slug} className="teaser-card">
                  <p className="card-meta">
                    <span>Ch. {t.chapter}</span>
                    <span className={`heat-badge heat-${t.heat}`}>{t.heat}</span>
                  </p>
                  <h3>{t.title}</h3>
                  <p className="teaser-headnote">{t.headnote}</p>
                  <p className="teaser-pairings">
                    <span className="meta-label">Pairings</span>
                    <span>{t.pairings.join(' · ')}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="page-section cta-strip">
          <p>Full recipe in the book — every chapter, every pairing.</p>
          {book.buyUrl ? (
            <a
              href={book.buyUrl}
              className="text-cta"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy on Amazon →
            </a>
          ) : (
            <Link href="/connect" className="text-cta">
              Get notified →
            </Link>
          )}
        </section>
      </article>
      <SiteFooter />
    </main>
  )
}

function formatReleaseDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

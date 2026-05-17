import Link from 'next/link'
import { EditorialContainer } from '@/components/layout/EditorialContainer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { PlaceholderArt } from '@/components/PlaceholderArt'
import { BOOKS, STORIES } from '@/lib/content/data'

const forthcoming = [
  { slug: 'series-ii', title: 'Untitled · Series II', marker: 'II' },
  { slug: 'series-iii', title: 'Untitled · Series III', marker: 'III' },
  { slug: 'series-iv', title: 'Untitled · Series IV', marker: 'IV' },
]

export default function Home() {
  const flagship = BOOKS.find((b) => b.featured) ?? BOOKS[0]
  const latestStories = STORIES.slice(0, 3)

  return (
    <main>
      <div className="hero-shell">
        <SiteHeader />
        <section className="hero-content" aria-label="Home hero">
          <p className="hero-kicker">Issue One · Spring 2026</p>
          <h1>Italian soul. Japanese precision.</h1>
          <p>
            Cookbooks, a journal, and a knowledge library — published from the
            kitchen of Sebastian Dri.
          </p>
        </section>
      </div>

      <div className="home-flow">
        <section
          className="home-section home-philosophy"
          aria-labelledby="home-philosophy-heading"
        >
          <div className="home-section-inner">
            <p className="page-kicker">01 · Philosophy</p>
            <h2 id="home-philosophy-heading" className="visually-hidden">
              Philosophy
            </h2>
            <div className="philosophy-pair">
              <article>
                <p className="philosophy-kicker">Italian</p>
                <p className="philosophy-word">Soul.</p>
                <p className="philosophy-body">
                  The slow Sunday hand. Trust in a single ingredient. A table
                  that has held more than one generation.
                </p>
              </article>
              <article>
                <p className="philosophy-kicker">Japanese</p>
                <p className="philosophy-word">Precision.</p>
                <p className="philosophy-body">
                  The knife angle. The patience of a stock at a whisper.
                  Restraint as a creative principle.
                </p>
              </article>
            </div>
          </div>
        </section>

        {flagship && (
          <section
            className="home-section home-featured"
            aria-labelledby="home-featured-heading"
          >
            <div className="home-section-inner">
              <p className="page-kicker">02 · The Book</p>
              <h2 id="home-featured-heading" className="visually-hidden">
                Featured Book
              </h2>
              <article className="feature-book">
                <div className="feature-book-cover" aria-hidden="true" />
                <div className="feature-book-copy">
                  <p className="card-meta">Flagship · Vol. I</p>
                  <h3 className="feature-book-title">{flagship.title}</h3>
                  <p>{flagship.logline}</p>
                  <Link href={`/book/${flagship.slug}`} className="text-cta">
                    Explore the Book →
                  </Link>
                </div>
              </article>
            </div>
          </section>
        )}

        <section
          className="home-section home-series"
          aria-labelledby="home-series-heading"
        >
          <div className="home-section-inner">
            <div className="section-heading-row">
              <p className="page-kicker">03 · The Series</p>
              <Link href="/book" className="text-cta">
                All volumes →
              </Link>
            </div>
            <h2 id="home-series-heading" className="visually-hidden">
              Forthcoming
            </h2>
            <ul className="card-grid">
              {forthcoming.map((b) => (
                <li
                  key={b.slug}
                  className="placeholder-card is-coming-soon"
                >
                  <PlaceholderArt initial={b.marker} folio={`Vol. ${b.marker}`} />
                  <p className="card-meta">In development</p>
                  <h3 className="card-title">{b.title}</h3>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="home-section home-journal"
          aria-labelledby="home-journal-heading"
        >
          <div className="home-section-inner">
            <div className="section-heading-row">
              <p className="page-kicker">04 · The Journal</p>
              <Link href="/journal" className="text-cta">
                Enter the archive →
              </Link>
            </div>
            <h2 id="home-journal-heading" className="visually-hidden">
              Latest stories
            </h2>
            <ul className="card-grid">
              {latestStories.map((s, i) => (
                <li key={s.slug} className="placeholder-card">
                  <Link href={`/journal/${s.slug}`}>
                    <PlaceholderArt
                      initial={s.title.charAt(0)}
                      folio={`Folio ${String(i + 1).padStart(2, '0')}`}
                    />
                    <p className="card-meta">{s.themes.join(' · ')}</p>
                    <h3 className="card-title">{s.title}</h3>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className="home-section home-newsletter"
          aria-labelledby="home-newsletter-heading"
        >
          <EditorialContainer>
            <p className="page-kicker">05 · The Letter</p>
            <h2 id="home-newsletter-heading" className="newsletter-headline">
              A quiet letter, once a month.
            </h2>
            <p className="newsletter-deck">
              Subscribe for new stories, pantry entries, and notes from the
              kitchen.
            </p>
            <form className="newsletter-form" aria-label="Newsletter signup">
              <label htmlFor="home-email" className="visually-hidden">
                Email address
              </label>
              <input
                id="home-email"
                name="email"
                type="email"
                placeholder="you@kitchen.com"
                required
              />
              <button type="submit">Subscribe</button>
              <p className="consent-note">
                No spam. Unsubscribe with one click.
              </p>
            </form>
          </EditorialContainer>
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}

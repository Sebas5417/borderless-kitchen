import type { Metadata } from 'next'
import Link from 'next/link'
import { EditorialContainer } from '@/components/layout/EditorialContainer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { PlaceholderArt } from '@/components/PlaceholderArt'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Sebastian Dri on Italian soul, Japanese precision, and the craft between them.',
  openGraph: {
    title: 'About — Borderless Kitchen',
    description:
      'Sebastian Dri on Italian soul, Japanese precision, and the craft between them.',
    type: 'profile',
  },
}

const currently = [
  {
    marker: 'I',
    title: 'Tokyo Meets Tuscany',
    summary:
      'The first volume in the series. Concept, chapters, and recipe teasers live here on the site; full recipes in the book.',
  },
  {
    marker: 'II',
    title: 'The Borderless Pantry',
    summary:
      'A growing reference library of ingredients, techniques, and pairings — the working notes that sit beneath the cooking.',
  },
  {
    marker: 'III',
    title: 'A monthly letter',
    summary:
      'One quiet email a month — new stories, pantry entries, and small notes from the kitchen.',
  },
]

export default function AboutPage() {
  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead about-masthead">
          <div className="about-masthead-main">
            <p className="page-kicker">About</p>
            <h1>Two kitchens, one table.</h1>
            <p className="page-deck">
              A note on origin, migration, and the discipline of cooking with
              intention.
            </p>
          </div>
          <aside className="about-masthead-aside" aria-hidden="true">
            <PlaceholderArt initial="S" folio="Sebastian Dri" aspect="3 / 4" />
          </aside>
        </header>

        <EditorialContainer>
          <section className="page-section">
            <p className="standfirst">
              Borderless Kitchen is the editorial home of Sebastian Dri — a
              study in the tension between the Italian table and Japanese
              technique, written for readers who care about how food carries
              memory.
            </p>
          </section>

          <section className="page-section">
            <h2 className="section-heading">Origin · Migration · Synthesis</h2>
            <ol className="timeline">
              <li>
                <span className="timeline-step">Origin</span>
                <p>
                  Family kitchens, slow Sundays, the grammar of an Italian
                  pantry — the place where food first stopped being food and
                  started being weather, ritual, language.
                </p>
              </li>
              <li>
                <span className="timeline-step">Migration</span>
                <p>
                  Years near a Japanese chef’s bench. Knife work, ferment,
                  restraint as a creative principle. The shock of learning a
                  kitchen that argues with almost nothing.
                </p>
              </li>
              <li>
                <span className="timeline-step">Synthesis</span>
                <p>
                  A practice that holds soul and precision in the same hand.
                  Not a fusion. A frank report from a kitchen that has cooked
                  in both rooms long enough to stop choosing.
                </p>
              </li>
            </ol>
          </section>

          <section className="page-section">
            <blockquote className="pullquote">
              <p>
                I do not think of this as fusion. I think of it as honesty
                about every kitchen I have ever cooked in.
              </p>
            </blockquote>
          </section>

          <section className="page-section">
            <h2 className="section-heading">Currently</h2>
            <ol className="chapter-list">
              {currently.map((c) => (
                <li key={c.title}>
                  <span className="chapter-marker" aria-hidden="true">
                    {c.marker}
                  </span>
                  <div>
                    <h3>{c.title}</h3>
                    <p>{c.summary}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="page-section about-signature">
            <p className="signature-name">Sebastian Dri</p>
            <Link href="/connect" className="text-cta">
              Subscribe to the letter →
            </Link>
          </section>
        </EditorialContainer>
      </article>
      <SiteFooter />
    </main>
  )
}

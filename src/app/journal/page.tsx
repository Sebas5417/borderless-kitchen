import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { PlaceholderArt } from '@/components/PlaceholderArt'
import { STORIES } from '@/lib/content/data'

export const metadata: Metadata = {
  title: 'Journal — Borderless Kitchen',
  description: 'Essays on cooking, culture, and the borders between kitchens.',
}

const filters = ['All', 'Technique', 'Pantry', 'Essay']

export default function JournalPage() {
  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead">
          <p className="page-kicker">Journal</p>
          <h1>The archive.</h1>
          <p className="page-deck">
            Essays, field notes, and small studies in how a kitchen earns its voice.
          </p>
        </header>

        <section className="page-section" aria-label="Filters">
          <div className="filter-rail" role="group" aria-label="Story filters">
            {filters.map((label, i) => (
              <span
                key={label}
                className={i === 0 ? 'filter-pill is-active' : 'filter-pill'}
              >
                {label}
              </span>
            ))}
          </div>
        </section>

        <section className="page-section">
          <ul className="card-grid">
            {STORIES.map((s, i) => (
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
        </section>
      </article>
      <SiteFooter />
    </main>
  )
}

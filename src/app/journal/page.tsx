import type { Metadata } from 'next'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export const metadata: Metadata = {
  title: 'Journal — Borderless Kitchen',
  description: 'Essays on cooking, culture, and the borders between kitchens.',
}

const placeholderStories = [
  {
    slug: 'placeholder-broth',
    title: 'Salt, time, and the patience of broth',
    theme: 'Technique',
  },
  {
    slug: 'placeholder-pantry',
    title: 'A pantry is a map of decisions',
    theme: 'Pantry',
  },
  {
    slug: 'placeholder-quiet',
    title: 'On cooking quietly',
    theme: 'Essay',
  },
]

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
            {placeholderStories.map((s) => (
              <li key={s.slug} className="placeholder-card">
                <div className="placeholder-card-image" aria-hidden="true" />
                <p className="card-meta">{s.theme}</p>
                <h3 className="card-title">{s.title}</h3>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <SiteFooter />
    </main>
  )
}

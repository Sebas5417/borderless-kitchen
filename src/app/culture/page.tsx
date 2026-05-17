import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { PlaceholderArt } from '@/components/PlaceholderArt'
import { PANTRY_ENTRIES } from '@/lib/content/data'

export const metadata: Metadata = {
  title: 'Culture',
  description: 'The knowledge library: pantry, technique, and pairing logic.',
  openGraph: {
    title: 'Culture — Borderless Kitchen',
    description: 'The knowledge library: pantry, technique, and pairing logic.',
    type: 'website',
  },
}

const pillars = [
  {
    title: 'Pantry',
    body: 'Reference taxonomy for the ingredients that anchor the series.',
  },
  {
    title: 'Technique',
    body: 'Method, heat, and the small decisions that change a dish.',
  },
  {
    title: 'Pairing',
    body: 'Why certain things sit well together across both kitchens.',
  },
]

export default function CulturePage() {
  const featuredPantry = PANTRY_ENTRIES.slice(0, 3)

  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead">
          <p className="page-kicker">Culture</p>
          <h1>The knowledge library.</h1>
          <p className="page-deck">
            A growing reference of ingredients, techniques, and pairings — the working
            notes behind the books.
          </p>
        </header>

        <section className="page-section">
          <ul className="pillar-grid">
            {pillars.map((p) => (
              <li key={p.title} className="pillar-card">
                <h2>{p.title}</h2>
                <p>{p.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="page-section">
          <div className="section-heading-row">
            <h2 className="section-heading">Featured Pantry</h2>
            <Link href="/culture/pantry" className="text-cta">
              Full taxonomy →
            </Link>
          </div>
          <ul className="card-grid">
            {featuredPantry.map((e) => (
              <li key={e.slug} className="placeholder-card">
                <Link href={`/culture/pantry/${e.slug}`}>
                  <PlaceholderArt
                    initial={e.category.charAt(0).toUpperCase()}
                    folio={titleCase(e.category)}
                  />
                  <p className="card-meta">{titleCase(e.category)}</p>
                  <h3 className="card-title">{e.name}</h3>
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

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

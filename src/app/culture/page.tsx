import type { Metadata } from 'next'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export const metadata: Metadata = {
  title: 'Culture — Borderless Kitchen',
  description: 'The knowledge library: pantry, technique, and pairing logic.',
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

const featuredPantry = [
  { slug: 'shoyu', name: 'Shoyu', category: 'Ferment' },
  { slug: 'colatura', name: 'Colatura di Alici', category: 'Sea' },
  { slug: 'sansho', name: 'Sanshō', category: 'Aromatic' },
]

export default function CulturePage() {
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
            <span className="text-cta is-pending">Full taxonomy · coming soon</span>
          </div>
          <ul className="card-grid">
            {featuredPantry.map((e) => (
              <li key={e.slug} className="placeholder-card">
                <div className="placeholder-card-image" aria-hidden="true" />
                <p className="card-meta">{e.category}</p>
                <h3 className="card-title">{e.name}</h3>
              </li>
            ))}
          </ul>
        </section>
      </article>
      <SiteFooter />
    </main>
  )
}

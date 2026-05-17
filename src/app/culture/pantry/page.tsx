import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { PlaceholderArt } from '@/components/PlaceholderArt'
import { PANTRY_ENTRIES } from '@/lib/content/data'
import type { PantryCategory } from '@/lib/content/types'

export const metadata: Metadata = {
  title: 'Pantry — Borderless Kitchen',
  description: 'A reference taxonomy of the ingredients that anchor the series.',
}

const categoryOrder: PantryCategory[] = [
  'ferment',
  'sea',
  'aromatic',
  'acid',
  'oil',
  'grain',
  'chili',
]

export default function PantryIndexPage() {
  const grouped = new Map<PantryCategory, typeof PANTRY_ENTRIES>()
  for (const entry of PANTRY_ENTRIES) {
    const bucket = grouped.get(entry.category) ?? []
    bucket.push(entry)
    grouped.set(entry.category, bucket)
  }

  const orderedCategories = categoryOrder.filter((c) => grouped.has(c))

  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead">
          <p className="page-kicker">Culture · Pantry</p>
          <h1>The pantry, by category.</h1>
          <p className="page-deck">
            A working reference of the ingredients we keep returning to — both
            kitchens, one shelf.
          </p>
        </header>

        {orderedCategories.map((category) => {
          const entries = grouped.get(category)!
          return (
            <section key={category} className="page-section">
              <h2 className="section-heading">{titleCase(category)}</h2>
              <ul className="card-grid">
                {entries.map((e) => (
                  <li key={e.slug} className="placeholder-card">
                    <Link href={`/culture/pantry/${e.slug}`}>
                      <PlaceholderArt
                        initial={e.name.charAt(0)}
                        folio={titleCase(category)}
                      />
                      <p className="card-meta">{e.origin}</p>
                      <h3 className="card-title">{e.name}</h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )
        })}
      </article>
      <SiteFooter />
    </main>
  )
}

function titleCase(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

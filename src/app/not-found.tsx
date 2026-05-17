import type { Metadata } from 'next'
import Link from 'next/link'
import { EditorialContainer } from '@/components/layout/EditorialContainer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export const metadata: Metadata = {
  title: 'Errata · 404',
  description: 'The page you were looking for has not been written yet.',
}

const entrances = [
  { href: '/journal', label: 'Enter the Journal' },
  { href: '/book', label: 'Browse the Books' },
  { href: '/culture/pantry', label: 'Open the Pantry' },
  { href: '/about', label: 'Read the About page' },
  { href: '/', label: 'Return Home' },
]

export default function NotFound() {
  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead">
          <p className="page-kicker">Errata · 404</p>
          <h1>This page hasn’t been written.</h1>
          <p className="page-deck">
            The borders are still being drawn. Try one of the entrances below.
          </p>
        </header>

        <EditorialContainer>
          <ul className="errata-list">
            {entrances.map((e, i) => (
              <li key={e.href}>
                <Link href={e.href}>
                  <span className="errata-marker" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="errata-label">{e.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </EditorialContainer>
      </article>
      <SiteFooter />
    </main>
  )
}

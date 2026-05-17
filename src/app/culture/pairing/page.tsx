import type { Metadata } from 'next'
import Link from 'next/link'
import { EditorialContainer } from '@/components/layout/EditorialContainer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export const metadata: Metadata = {
  title: 'Pairing',
  description:
    'Why certain things sit well together across both kitchens. The pairing logic of the Borderless Kitchen library.',
  openGraph: {
    title: 'Pairing — Borderless Kitchen',
    description:
      'Why certain things sit well together across both kitchens.',
    type: 'website',
  },
}

const seeds = [
  {
    marker: 'I',
    title: 'Salt with salt',
    summary:
      'Why colatura and shoyu sit beside one another without arguing — the case for layered savories.',
  },
  {
    marker: 'II',
    title: 'Fat against acid',
    summary:
      'Olive oil and rice vinegar; pecorino and yuzu. The architecture of brightness.',
  },
  {
    marker: 'III',
    title: 'Heat with cool',
    summary:
      'Sanshō on bistecca, chilies in dashi — how warmth and cool wake each other up.',
  },
  {
    marker: 'IV',
    title: 'Smoke and sea',
    summary:
      'Grilled flesh and kombu in the same broth. The shared ancestor of both shorelines.',
  },
]

export default function PairingPage() {
  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead">
          <p className="page-kicker">Culture · Pairing</p>
          <h1>Pairing.</h1>
          <p className="page-deck">
            Why certain things sit well together across both kitchens — and
            why others, against all sense, refuse to.
          </p>
        </header>

        <EditorialContainer>
          <section className="page-section">
            <p className="standfirst">
              The Pairing library is in development. It will collect the
              flavor logic that lets the Italian table and the Japanese pantry
              read as one larder rather than two.
            </p>
          </section>

          <section className="page-section">
            <h2 className="section-heading">What will live here</h2>
            <ol className="chapter-list">
              {seeds.map((s) => (
                <li key={s.title}>
                  <span className="chapter-marker" aria-hidden="true">
                    {s.marker}
                  </span>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.summary}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="page-section cta-strip">
            <p>Notes from the kitchen, once a month.</p>
            <Link href="/connect" className="text-cta">
              Subscribe →
            </Link>
          </section>
        </EditorialContainer>
      </article>
      <SiteFooter />
    </main>
  )
}

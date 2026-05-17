import type { Metadata } from 'next'
import Link from 'next/link'
import { EditorialContainer } from '@/components/layout/EditorialContainer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export const metadata: Metadata = {
  title: 'Technique',
  description:
    'Method, heat, and the small decisions that change a dish. The technique pillar of the Borderless Kitchen library.',
  openGraph: {
    title: 'Technique — Borderless Kitchen',
    description:
      'Method, heat, and the small decisions that change a dish.',
    type: 'website',
  },
}

const seeds = [
  {
    marker: 'I',
    title: 'Heat as instrument',
    summary:
      'From the pizza oven to the donabe — what a flame asks of the cook standing in front of it.',
  },
  {
    marker: 'II',
    title: 'Salt across stages',
    summary:
      'When to season, why, and what each stage of salt actually does to a dish.',
  },
  {
    marker: 'III',
    title: 'Knife as decision',
    summary:
      'The cuts that travel between Italian and Japanese hands — and what they ask for.',
  },
  {
    marker: 'IV',
    title: 'Time as ingredient',
    summary:
      'Stocks, ferments, rests. The slowest part of the kitchen is often the most important.',
  },
]

export default function TechniquePage() {
  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead">
          <p className="page-kicker">Culture · Technique</p>
          <h1>Technique.</h1>
          <p className="page-deck">
            Method, heat, and the small decisions that change a dish. The
            working notes that sit beneath every recipe.
          </p>
        </header>

        <EditorialContainer>
          <section className="page-section">
            <p className="standfirst">
              The Technique library is in development. It will collect the
              method essays that quietly run beneath every chapter of the
              series — heat, salt, time, knife, fire, and the things you learn
              only by doing them wrong first.
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

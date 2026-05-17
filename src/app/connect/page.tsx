import type { Metadata } from 'next'
import { EditorialContainer } from '@/components/layout/EditorialContainer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export const metadata: Metadata = {
  title: 'Connect',
  description: 'Newsletter, press, and partnership pathways.',
  openGraph: {
    title: 'Connect — Borderless Kitchen',
    description: 'Newsletter, press, and partnership pathways.',
    type: 'website',
  },
}

const promises = [
  'One letter a month — never more, sometimes less.',
  'New stories, pantry entries, and book chapters as they ship.',
  'Notes from the kitchen that don’t live anywhere else on the site.',
]

const pathways = [
  {
    kind: 'Press',
    title: 'Interviews & editorial',
    body: 'For magazine commissions, profile pieces, and press inquiries.',
    email: 'press@borderlesskitchen.com',
  },
  {
    kind: 'Partnerships',
    title: 'Collaborations & brand',
    body: 'For hosting, restaurant residencies, brand work, and editorial collaborations.',
    email: 'hello@borderlesskitchen.com',
  },
]

export default function ConnectPage() {
  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead">
          <p className="page-kicker">Connect</p>
          <h1>A quiet letter, once a month.</h1>
          <p className="page-deck">
            Subscribe for new stories, pantry entries, and notes from the
            kitchen.
          </p>
        </header>

        <EditorialContainer>
          <section className="page-section">
            <ul className="newsletter-promise">
              {promises.map((p) => (
                <li key={p}>
                  <span className="newsletter-promise-marker" aria-hidden="true">
                    ◇
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            <form className="newsletter-form" aria-label="Newsletter signup">
              <label htmlFor="email" className="visually-hidden">
                Email address
              </label>
              <input
                id="email"
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
          </section>

          <section className="page-section">
            <h2 className="section-heading">Other pathways</h2>
            <ul className="contact-tiles">
              {pathways.map((p) => (
                <li key={p.email} className="contact-tile">
                  <p className="card-meta">{p.kind}</p>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                  <a href={`mailto:${p.email}`} className="text-cta">
                    {p.email}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </EditorialContainer>
      </article>
      <SiteFooter />
    </main>
  )
}

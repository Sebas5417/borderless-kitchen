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

export default function ConnectPage() {
  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead">
          <p className="page-kicker">Connect</p>
          <h1>A quiet letter, once a month.</h1>
          <p className="page-deck">
            Subscribe for new stories, pantry entries, and notes from the kitchen.
          </p>
        </header>

        <EditorialContainer>
          <section className="page-section">
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
                No spam. Unsubscribe with one click. Form not yet wired — handler lands
                with the content layer.
              </p>
            </form>
          </section>

          <section className="page-section">
            <h2 className="section-heading">Other pathways</h2>
            <ul className="contact-tiles">
              <li className="contact-tile">
                <h3>Press</h3>
                <p>For interviews and editorial requests.</p>
                <a href="mailto:press@borderlesskitchen.com" className="text-cta">
                  press@borderlesskitchen.com
                </a>
              </li>
              <li className="contact-tile">
                <h3>Partnerships</h3>
                <p>For collaborations, hosting, and brand work.</p>
                <a href="mailto:hello@borderlesskitchen.com" className="text-cta">
                  hello@borderlesskitchen.com
                </a>
              </li>
            </ul>
          </section>
        </EditorialContainer>
      </article>
      <SiteFooter />
    </main>
  )
}

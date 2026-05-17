import type { Metadata } from 'next'
import { EditorialContainer } from '@/components/layout/EditorialContainer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export const metadata: Metadata = {
  title: 'Privacy — Borderless Kitchen',
  description: 'How Borderless Kitchen handles your information.',
}

export default function PrivacyPage() {
  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead">
          <p className="page-kicker">Legal</p>
          <h1>Privacy</h1>
          <p className="page-deck">A short, plain-language summary. Last reviewed —.</p>
        </header>

        <EditorialContainer>
          <section className="page-section legal-body">
            <p>
              Borderless Kitchen collects the minimum information needed to send the
              newsletter and respond to messages you send us directly. We do not sell or
              share that information.
            </p>
            <p>
              If you subscribe with your email, we store your address with our email
              provider. You can unsubscribe at any time from any email we send.
            </p>
            <p>
              This page is a placeholder until the full policy is reviewed. If you need
              specifics before then, write to{' '}
              <a href="mailto:hello@borderlesskitchen.com">hello@borderlesskitchen.com</a>.
            </p>
          </section>
        </EditorialContainer>
      </article>
      <SiteFooter />
    </main>
  )
}

import type { Metadata } from 'next'
import { EditorialContainer } from '@/components/layout/EditorialContainer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export const metadata: Metadata = {
  title: 'Terms',
  description: 'Terms for using the Borderless Kitchen website.',
}

export default function TermsPage() {
  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead">
          <p className="page-kicker">Legal</p>
          <h1>Terms</h1>
          <p className="page-deck">A short, plain-language summary. Last reviewed —.</p>
        </header>

        <EditorialContainer>
          <section className="page-section legal-body">
            <p>
              The writing, photography, and recipes on Borderless Kitchen are the work
              of Sebastian Dri. You are welcome to read, reference, and share them with
              attribution. Republishing the content in full requires permission.
            </p>
            <p>
              Recipes published in the books are the property of the publisher and the
              author. The website intentionally publishes teasers only — headnotes and
              pairings — without ingredients or method.
            </p>
            <p>
              This page is a placeholder until the full terms are reviewed. For any
              licensing or partnership question, write to{' '}
              <a href="mailto:hello@borderlesskitchen.com">hello@borderlesskitchen.com</a>.
            </p>
          </section>
        </EditorialContainer>
      </article>
      <SiteFooter />
    </main>
  )
}

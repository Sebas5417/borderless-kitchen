import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export default function Home() {
  return (
    <main className="hero-shell">
      <SiteHeader />

      <section className="hero-content" aria-label="Home hero">
        <p className="hero-kicker">Issue One · Spring 2026</p>
        <h1>Italian soul. Japanese precision.</h1>
        <p>
          Cookbooks, a journal, and a knowledge library — published from the
          kitchen of Sebastian Dri.
        </p>
      </section>

      <SiteFooter />
    </main>
  )
}

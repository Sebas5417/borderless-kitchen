import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export default function Home() {
  return (
    <main className="hero-shell">
      <SiteHeader />

      <section className="hero-content" aria-label="Home hero">
        <p className="hero-kicker">Editorial Front Door</p>
        <h1>Italian soul. Japanese precision.</h1>
        <p>
          A quiet, image-led home shell designed to route readers into stories,
          books, and cultural references.
        </p>
      </section>

      <SiteFooter />
    </main>
  )
}

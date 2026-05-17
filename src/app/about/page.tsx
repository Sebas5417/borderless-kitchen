import type { Metadata } from 'next'
import { EditorialContainer } from '@/components/layout/EditorialContainer'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'

export const metadata: Metadata = {
  title: 'About — Borderless Kitchen',
  description:
    'Sebastian Dri on Italian soul, Japanese precision, and the craft between them.',
}

export default function AboutPage() {
  return (
    <main className="editorial-page">
      <SiteHeader />
      <article>
        <header className="page-masthead">
          <p className="page-kicker">About</p>
          <h1>Two kitchens, one table.</h1>
          <p className="page-deck">
            A note on origin, migration, and the discipline of cooking with intention.
          </p>
        </header>

        <EditorialContainer>
          <section className="page-section">
            <p className="standfirst">
              Borderless Kitchen is the editorial home of Sebastian Dri — a study in the
              tension between the Italian table and Japanese technique, written for
              readers who care about how food carries memory.
            </p>
          </section>

          <section className="page-section">
            <h2 className="section-heading">Origin · Migration · Synthesis</h2>
            <ol className="timeline">
              <li>
                <span className="timeline-step">Origin</span>
                <p>Family kitchens, slow Sundays, the grammar of an Italian pantry.</p>
              </li>
              <li>
                <span className="timeline-step">Migration</span>
                <p>
                  Years near a Japanese chef’s bench. Knife work, ferment, restraint as
                  a creative principle.
                </p>
              </li>
              <li>
                <span className="timeline-step">Synthesis</span>
                <p>A practice that holds soul and precision in the same hand.</p>
              </li>
            </ol>
          </section>

          <section className="page-section">
            <blockquote className="pullquote">
              <p>
                I do not think of this as fusion. I think of it as honesty about every
                kitchen I have ever cooked in.
              </p>
            </blockquote>
          </section>
        </EditorialContainer>
      </article>
      <SiteFooter />
    </main>
  )
}

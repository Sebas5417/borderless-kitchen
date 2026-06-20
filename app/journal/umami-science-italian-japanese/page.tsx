import { Container } from '@/app/_components/Container'
import { FadeRise } from '@/app/_components/FadeRise'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'The Science of Umami: Why Italian–Japanese Fusion Actually Works',
  description: 'Italian and Japanese cuisine share the same secret ingredient: glutamate. Here\'s the food science behind why these two traditions taste so good together — and how to use it in your cooking.',
  openGraph: {
    title: 'The Science of Umami: Why Italian–Japanese Fusion Actually Works',
    description: 'Both traditions are built on the same flavor compound. Here\'s what that means for your cooking.',
  },
}

const GLUTAMATE_SOURCES = [
  { italian: 'Parmigiano Reggiano (1,200mg/100g)', japanese: 'Kombu seaweed (2,240mg/100g)', note: 'Both aged / dried to concentrate glutamate' },
  { italian: 'Sun-dried tomatoes (650mg/100g)', japanese: 'Katsuobushi / bonito (700mg/100g)', note: 'Umami + slight smokiness in both' },
  { italian: 'Anchovy paste (630mg/100g)', japanese: 'Niboshi (dried sardines) (470mg/100g)', note: 'Fermented fish — identical concept' },
  { italian: 'Aged balsamic vinegar (400mg/100g)', japanese: 'Soy sauce (1,090mg/100g)', note: 'Fermented, acidic, deepens sauces' },
  { italian: 'Prosciutto crudo (340mg/100g)', japanese: 'Miso paste (200mg/100g)', note: 'Slow-fermented protein — salt + time' },
]

export default function UmamiSciencePage() {
  return (
    <main className="bg-paper min-h-screen">
      <Container>
        <FadeRise>
          {/* Breadcrumb */}
          <nav className="pt-10 pb-2 text-sm text-ink/50 flex gap-2 items-center font-ui">
            <Link href="/journal" className="hover:text-ink transition-colors">Journal</Link>
            <span>→</span>
            <span>The Science of Umami</span>
          </nav>

          {/* Header */}
          <header className="pt-8 pb-10 border-b border-hairline max-w-2xl">
            <div className="text-xs font-ui font-semibold uppercase tracking-widest text-ink/40 mb-4">
              Food Science · 8 min read
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight mb-5">
              The Science of Umami:<br />Why Italian–Japanese<br />Fusion Actually Works
            </h1>
            <p className="text-xl text-ink/70 font-body leading-relaxed">
              These two cuisines are separated by 9,000 kilometres and five centuries of culinary tradition.
              They share almost no ingredients, no techniques, no cultural overlap.
              And yet they taste like they were designed to go together.
            </p>
            <p className="text-ink/50 font-ui text-sm mt-5">
              There is a reason for this. It starts with a Japanese chemist in 1908.
            </p>
          </header>

          {/* Body */}
          <article className="py-10 max-w-2xl space-y-8 font-body text-ink/85 leading-relaxed text-lg">

            <section>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">The Discovery of Umami</h2>
              <p>
                In 1908, Kikunae Ikeda was eating a bowl of dashi — the Japanese broth made from kombu seaweed
                and dried bonito flakes — when he noticed something the existing language of taste couldn&apos;t describe.
                It wasn&apos;t sweet. It wasn&apos;t salty. It wasn&apos;t sour or bitter. It was a deep, mouth-coating savoriness
                that he couldn&apos;t account for.
              </p>
              <p className="mt-4">
                He spent months isolating the compound responsible. It was glutamate — an amino acid found
                naturally in proteins — specifically glutamic acid in its free form, unbound from other amino
                acids by the process of fermentation, drying, aging, or long cooking.
              </p>
              <p className="mt-4">
                He named the taste <em>umami</em>: <em>umai</em> (delicious) + <em>mi</em> (taste).
              </p>
              <p className="mt-4">
                It took another 90 years for the West to formally recognize umami as the fifth basic taste.
                But Italian cooks had been exploiting it for centuries without knowing its name.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">The Mirror Image Pantries</h2>
              <p>
                Here is the remarkable thing: Italian and Japanese cuisine share the same flavor-building
                logic, applied independently, using completely different ingredients.
              </p>
              <p className="mt-4">
                Both traditions discovered that fermentation and time transform raw ingredients into something
                deeply savory. Both built entire cuisines around that discovery. And the compounds they extracted
                — glutamate and its synergistic partners inosinate and guanylate — are biologically the same.
              </p>
              <p className="mt-4">
                Your taste receptors cannot tell the difference between the glutamate in Parmigiano-Reggiano
                and the glutamate in kombu. They bind to the same receptor (T1R1/T1R3) and send the same signal.
              </p>
              <p className="mt-4 font-semibold text-ink">
                When you combine Italian and Japanese ingredients, you are not mixing cuisines.
                You are amplifying the same flavor compound from two directions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">The Flavor Compounds at Work</h2>
              <p>
                Umami works through three main compounds that reinforce each other through a process called
                synergism — when combined, their effect multiplies rather than adds.
              </p>

              <div className="mt-6 space-y-4">
                <div className="border border-hairline rounded-lg p-5">
                  <div className="font-semibold text-ink mb-1">Glutamate (L-glutamic acid)</div>
                  <p className="text-base text-ink/70">
                    The base umami compound. Concentrated by fermentation, aging, drying, and long cooking.
                    Found in: tomatoes, Parmesan, anchovies, miso, soy sauce, kombu, mushrooms.
                  </p>
                </div>
                <div className="border border-hairline rounded-lg p-5">
                  <div className="font-semibold text-ink mb-1">Inosinate (IMP)</div>
                  <p className="text-base text-ink/70">
                    A nucleotide that amplifies glutamate 7–8× when combined with it. Derived from animal
                    proteins — especially fish and meat. Found in: bonito flakes, sardines, chicken, pork, beef.
                  </p>
                </div>
                <div className="border border-hairline rounded-lg p-5">
                  <div className="font-semibold text-ink mb-1">Guanylate (GMP)</div>
                  <p className="text-base text-ink/70">
                    Another amplifying nucleotide, strongest in dried mushrooms. Found in: dried shiitake,
                    porcini, morels. A small amount dramatically intensifies the glutamate in a dish.
                  </p>
                </div>
              </div>

              <p className="mt-6">
                The most powerful umami combinations pair glutamate with inosinate or guanylate.
                This is why a simple Italian tomato sauce tastes better with a Parmesan rind (glutamate + glutamate)
                but <em>remarkable</em> when you add anchovy paste (glutamate + inosinate).
                And why dashi made from both kombu (glutamate) and bonito (inosinate) is more than the sum of its parts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">Side-by-Side: The Two Pantries</h2>
              <p className="mb-5">
                The ingredients are different. The logic is identical. This table is the entire premise of
                Borderless Kitchen:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b-2 border-ink/20">
                      <th className="text-left py-3 pr-4 font-ui font-semibold text-ink/60 uppercase tracking-wider text-xs">Italian Source</th>
                      <th className="text-left py-3 pr-4 font-ui font-semibold text-ink/60 uppercase tracking-wider text-xs">Japanese Equivalent</th>
                      <th className="text-left py-3 font-ui font-semibold text-ink/60 uppercase tracking-wider text-xs hidden md:table-cell">Why They Match</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-hairline">
                    {GLUTAMATE_SOURCES.map((row, i) => (
                      <tr key={i} className="hover:bg-ink/[0.02] transition-colors">
                        <td className="py-4 pr-4 font-body text-ink/85">{row.italian}</td>
                        <td className="py-4 pr-4 font-body text-ink/85">{row.japanese}</td>
                        <td className="py-4 font-body text-ink/55 text-sm hidden md:table-cell">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">The Carbonara Principle</h2>
              <p>
                Carbonara is a perfect umami bomb: guanciale (inosinate from cured pork), Pecorino Romano
                and Parmigiano (glutamate), egg yolk (fat to carry flavor), and black pepper (enhances
                perception of umami).
              </p>
              <p className="mt-4">
                Now imagine replacing the guanciale with katsuobushi — bonito flakes. Same inosinate source,
                different animal, different culture. The result is not Japanese carbonara. It is something
                new: the same flavor logic, expressed through a different lens.
              </p>
              <p className="mt-4">
                This is Ramen alla Carbonara — one of the recipes in our{' '}
                <Link href="/mini-course/day-3" className="text-vermillion hover:underline">
                  5-Day Umami Mini-Course
                </Link>
                . The pasta is Italian. The broth technique is Japanese. The science is the same.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">How to Apply This in Your Kitchen</h2>
              <p>
                You don&apos;t need to understand glutamate to cook with this knowledge. You just need to understand
                the principle: <strong>pair ingredients from different cultures that share the same flavor-building mechanism.</strong>
              </p>

              <div className="mt-6 space-y-4">
                <div className="border-l-4 border-vermillion pl-5">
                  <div className="font-semibold text-ink mb-1">Add miso to Italian braises</div>
                  <p className="text-base text-ink/70">
                    White miso dissolved into a short rib braise adds glutamate that deepens the tomato and
                    wine base. It disappears — you don&apos;t taste &ldquo;miso.&rdquo; You taste depth.
                  </p>
                </div>
                <div className="border-l-4 border-vermillion pl-5">
                  <div className="font-semibold text-ink mb-1">Add Parmesan rind to dashi</div>
                  <p className="text-base text-ink/70">
                    Simmer a Parmesan rind in your dashi for 15 minutes. It adds a creamy, nutty umami
                    layer that makes the broth more complex without tasting Italian.
                  </p>
                </div>
                <div className="border-l-4 border-vermillion pl-5">
                  <div className="font-semibold text-ink mb-1">Use kombu instead of bay leaf</div>
                  <p className="text-base text-ink/70">
                    In Italian ragù or soffritto, add a 4-inch piece of kombu to the pot. Remove before serving.
                    The glutamate leaches into the sauce and makes everything taste more like itself — more tomato,
                    more meat, more wine.
                  </p>
                </div>
                <div className="border-l-4 border-vermillion pl-5">
                  <div className="font-semibold text-ink mb-1">Finish pasta with soy sauce instead of salt</div>
                  <p className="text-base text-ink/70">
                    A teaspoon of light soy sauce in the pasta cooking water or finishing pan (in place of salt)
                    adds inosinate + glutamate. The result: a rounder, deeper saltiness that transforms simple
                    aglio e olio into something you can&apos;t quite identify.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-ink mb-4">The Deeper Point</h2>
              <p>
                Fusion cuisine gets a bad reputation because most of it is lazy — slapping two national flags
                on a dish and calling it innovation. The Borderless Kitchen approach is different.
              </p>
              <p className="mt-4">
                We start with flavor science. We understand <em>why</em> certain combinations work —
                the compounds involved, the chemical reactions, the sensory mechanisms. Then we translate
                that understanding into technique.
              </p>
              <p className="mt-4">
                Italian and Japanese cuisine don&apos;t work together because they&apos;re exotic together.
                They work together because they evolved independently to solve the same flavor problem:
                how do you make simple ingredients taste profound?
              </p>
              <p className="mt-4 font-semibold text-ink">
                The answer, in both cases, is time, fermentation, and glutamate.
              </p>
            </section>

            {/* CTA */}
            <section className="border-t border-hairline pt-8">
              <div className="bg-ink/[0.03] rounded-xl p-7">
                <h3 className="text-xl font-display font-bold text-ink mb-2">
                  Learn the full system in 5 days
                </h3>
                <p className="text-ink/70 mb-5 leading-relaxed">
                  The Borderless Kitchen Mini-Course covers dashi, miso, the umami pairing matrix, mirin & sake,
                  and how to build your own fusion dishes from scratch. Five lessons, five recipes, free.
                </p>
                <Link
                  href="/mini-course"
                  className="inline-block bg-ink text-paper font-ui font-semibold px-6 py-3 rounded-lg hover:bg-ink/80 transition-colors"
                >
                  Start the Free Mini-Course →
                </Link>
              </div>
            </section>

          </article>

          {/* Footer nav */}
          <div className="border-t border-hairline py-8 flex flex-wrap gap-6 text-sm font-ui text-ink/50">
            <Link href="/journal" className="hover:text-ink transition-colors">← All Articles</Link>
            <Link href="/mini-course" className="hover:text-ink transition-colors">Free Mini-Course</Link>
            <Link href="/recipes" className="hover:text-ink transition-colors">Recipes</Link>
          </div>

        </FadeRise>
      </Container>
    </main>
  )
}

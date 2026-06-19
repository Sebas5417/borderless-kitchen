import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { FadeRise } from "@/components/motion/FadeRise";

export const metadata: Metadata = {
  title: "Free: The Asian Flavor Pairing Cheat Sheet — 47 Substitution Rules",
  description:
    "Download the free Asian Flavor Pairing Cheat Sheet — 47 ingredient substitution rules covering soy sauce, fish sauce, miso, rice vinegar, coconut milk, and more. Learn the logic behind Asian flavors in one page.",
  openGraph: {
    title: "Free: The Asian Flavor Pairing Cheat Sheet",
    description:
      "47 ingredient substitution rules. What to use when you're out of fish sauce, how to swap miso, when coconut cream beats coconut milk. One page, free download.",
    type: "website",
  },
};

const CHEAT_SHEET_ROWS = [
  { ingredient: "Fish sauce", swap: "Soy sauce + a drop of rice vinegar", why: "Approximates the salt + umami + acid profile; loses the oceanic depth" },
  { ingredient: "Kecap manis", swap: "Soy sauce + brown sugar (3:1)", why: "Matches the sweet-salty balance; reduce by 20% since sugar caramelizes faster" },
  { ingredient: "Doubanjiang", swap: "Gochujang + white miso (1:1)", why: "Fermented chili-bean base; add a pinch of salt since gochujang is sweeter" },
  { ingredient: "Mirin", swap: "Dry sherry + 1 tsp sugar per tbsp", why: "Matches the sweet rice wine character; sake + sugar is closer if available" },
  { ingredient: "Tamarind paste", swap: "Lime juice + brown sugar", why: "Replicates sour-sweet profile; 1 tbsp tamarind ≈ 1 tsp lime + ½ tsp sugar" },
  { ingredient: "Shrimp paste (belacan)", swap: "Fish sauce (halved volume)", why: "Less solid umami punch; increase by 50% if the paste was a primary flavor" },
  { ingredient: "Galangal", swap: "Ginger + a pinch of black pepper", why: "Ginger is warmer and less piney; not identical but functional in most curries" },
  { ingredient: "Coconut cream", swap: "Full-fat coconut milk, refrigerated overnight, top layer only", why: "Same product; the fat separates when cold — the top layer is your coconut cream" },
];

const WHAT_YOU_GET = [
  {
    title: "The Substitution Matrix",
    detail: "47 ingredient swaps across Southeast Asian, East Asian, and South Asian pantries. Each one includes the ratio, the flavor loss, and how to compensate.",
  },
  {
    title: "The Umami Depth Chart",
    detail: "A ranked guide to every umami source in Asian cooking — from kombu and katsuobushi to fermented shrimp paste and doubanjiang — organized by intensity and application.",
  },
  {
    title: "Heat Level Reference",
    detail: "Bird's eye, dried árbol, Kashmiri, gochugaru, Sichuan peppercorn — each one profiled for heat level, flavor character, and when to use it versus when it'll ruin the dish.",
  },
  {
    title: "The Acid Map",
    detail: "When to use rice vinegar vs black vinegar vs tamarind vs lime vs yuzu. Mapped by cuisine and dish type so you stop guessing.",
  },
];

const TESTIMONIALS = [
  {
    quote: "I've been cooking Thai food for five years. This one page answered questions I never thought to ask.",
    source: "Newsletter subscriber",
  },
  {
    quote: "Finally understand why I can't just swap soy sauce for fish sauce and call it done.",
    source: "Home cook, Austin TX",
  },
  {
    quote: "The umami chart alone is worth it. I've started cooking with things I always walked past at the Asian grocery store.",
    source: "Reader via Instagram",
  },
];

export default function FlavorGuidePage() {
  return (
    <>
      {/* HERO — above the fold */}
      <section className="bg-ink text-paper pt-16 pb-0 md:pt-24">
        <Container>
          <FadeRise>
            <p className="font-ui text-eyebrow uppercase text-paper/40 mb-6 tracking-widest">
              Free Download — No Credit Card
            </p>
            <h1 className="font-display text-display-1 text-paper leading-tight max-w-4xl mb-8">
              The Asian Flavor Pairing<br />
              <span className="text-vermillion italic">Cheat Sheet.</span>
            </h1>
            <p className="font-body text-xl md:text-2xl text-paper/70 max-w-2xl leading-relaxed mb-10">
              47 substitution rules. Every umami source ranked. The acid map.
              The heat reference. One page that changes how you cook Asian food at home.
            </p>

            {/* Primary email capture */}
            <div className="bg-paper/5 border border-paper/10 rounded-sm p-8 max-w-lg">
              <NewsletterForm
                label="Send it to my inbox — free"
                placeholder="your@email.com"
                buttonLabel="Get the Cheat Sheet →"
              />
              <p className="mt-4 font-ui text-xs text-paper/30">
                No spam. Occasional deep dives on technique and flavor. Unsubscribe anytime.
              </p>
            </div>
          </FadeRise>

          {/* Proof strip */}
          <div className="mt-16 pt-8 border-t border-paper/10 grid grid-cols-3 gap-8 max-w-2xl pb-16">
            {[
              { num: "47", label: "Substitution rules" },
              { num: "690+", label: "Articles on technique" },
              { num: "Free", label: "No payment ever" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="font-display text-4xl md:text-5xl text-paper font-bold mb-1">{num}</p>
                <p className="font-ui text-eyebrow uppercase text-paper/40">{label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* PREVIEW — what's inside */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <FadeRise>
            <p className="font-ui text-eyebrow uppercase text-ink/40 mb-4 tracking-widest">
              Inside the Cheat Sheet
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-16 max-w-2xl">
              What you actually get
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {WHAT_YOU_GET.map(({ title, detail }) => (
                <div key={title} className="border border-ink/10 p-8">
                  <h3 className="font-display text-2xl text-ink mb-4">{title}</h3>
                  <p className="font-body text-base text-ink/70 leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>

            {/* Preview table */}
            <div className="mb-6">
              <p className="font-ui text-eyebrow uppercase text-ink/40 mb-6 tracking-widest">
                8 of 47 rows — preview
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-ink">
                      <th className="text-left font-ui text-eyebrow uppercase py-3 pr-6 text-ink/60">Ingredient</th>
                      <th className="text-left font-ui text-eyebrow uppercase py-3 pr-6 text-ink/60">Best Swap</th>
                      <th className="text-left font-ui text-eyebrow uppercase py-3 text-ink/60 hidden md:table-cell">Why It Works</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CHEAT_SHEET_ROWS.map(({ ingredient, swap, why }, i) => (
                      <tr key={ingredient} className={`border-b border-ink/10 ${i >= 5 ? "opacity-30" : ""}`}>
                        <td className="py-4 pr-6 font-body font-bold text-ink">{ingredient}</td>
                        <td className="py-4 pr-6 font-body text-ink/80">{swap}</td>
                        <td className="py-4 font-body text-ink/60 hidden md:table-cell">{why}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="mt-4 font-ui text-xs text-ink/40 italic">
                  Rows 6–47 unlock when you subscribe. Free, always.
                </p>
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* SOCIAL PROOF */}
      <section className="bg-ink py-20">
        <Container>
          <FadeRise>
            <div className="grid md:grid-cols-3 gap-8">
              {TESTIMONIALS.map(({ quote, source }) => (
                <div key={source} className="border border-paper/10 p-8">
                  <p className="font-display text-lg text-paper italic leading-relaxed mb-6">
                    &ldquo;{quote}&rdquo;
                  </p>
                  <p className="font-ui text-eyebrow uppercase text-paper/30">— {source}</p>
                </div>
              ))}
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* SECOND CTA */}
      <section className="bg-paper py-20 md:py-28">
        <Container>
          <FadeRise>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-4xl md:text-5xl text-ink leading-tight mb-6">
                Get the cheat sheet.<br />
                <span className="text-vermillion italic">Cook better this week.</span>
              </h2>
              <p className="font-body text-lg text-ink/70 leading-relaxed mb-10">
                Enter your email and it arrives immediately. One PDF, one page, 47 rules.
                The kind of thing you print out and tape to the inside of a cabinet door.
              </p>
              <div className="flex justify-center">
                <NewsletterForm
                  label="Free — no catch"
                  placeholder="your@email.com"
                  buttonLabel="Send it →"
                />
              </div>
            </div>
          </FadeRise>
        </Container>
      </section>

      {/* ABOUT THE SOURCE */}
      <section className="bg-ink/5 border-t border-ink/10 py-16">
        <Container>
          <FadeRise>
            <div className="max-w-3xl mx-auto">
              <p className="font-ui text-eyebrow uppercase text-ink/40 mb-4 tracking-widest">
                About Borderless Kitchen
              </p>
              <p className="font-body text-lg text-ink/80 leading-relaxed">
                Borderless Kitchen is a series of guides, articles, and cookbooks on cross-cultural cuisine.
                We have published over 690 articles on the history, technique, and flavor logic of cuisines
                across Asia, Europe, and the Americas. The Cheat Sheet distills the most practical applied
                knowledge from that work into one reference document.
              </p>
            </div>
          </FadeRise>
        </Container>
      </section>
    </>
  );
}

import { Container } from "@/components/layout/Container";
import { FadeRise } from "@/components/motion/FadeRise";

const STATEMENTS = [
  "Italian cuisine is built on soul.",
  "Japanese cuisine is built on precision.",
  "Together, they create harmony with edge.",
];

export function PhilosophyStrip() {
  return (
    <section className="py-24 md:py-40">
      <Container>
        <FadeRise>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
            {STATEMENTS.map((s, i) => (
              <li
                key={s}
                className="font-display text-display-3 text-ink leading-tight"
              >
                <span className="font-ui text-eyebrow uppercase text-vermillion/80 block mb-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ul>
        </FadeRise>
      </Container>
    </section>
  );
}

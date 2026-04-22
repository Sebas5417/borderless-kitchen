import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";

type Props = {
  eyebrow?: string;
  headline: string;
  /** Optional quiet editorial link rendered below the headline. */
  link?: { label: string; href: string };
};

/**
 * The full-bleed editorial moment that opens the home page.
 * Dark background, paper-colored type. The placeholder is positioned
 * absolutely behind the content; when real photography ships, swap
 * <PlaceholderImage /> for <EditorialImage src=... priority />.
 */
export function Hero({ eyebrow, headline, link }: Props) {
  return (
    <section className="relative bg-charcoal-deep text-paper overflow-hidden">
      <div className="absolute inset-0 z-0">
        <PlaceholderImage
          aspect="hero-wide"
          slot="home-hero"
          className="w-full h-full"
        />
      </div>
      <Container className="relative z-10 min-h-[78vh] md:min-h-[88vh] flex flex-col justify-end pt-32 pb-16 md:pt-40 md:pb-24">
        {eyebrow ? (
          <p className="font-ui text-eyebrow uppercase text-paper/60 mb-6 md:mb-8">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-display-1 text-paper max-w-4xl">
          {headline}
        </h1>
        {link ? (
          <p className="mt-10 md:mt-12 text-paper">
            <Link
              href={link.href}
              className="link-quiet text-paper text-lg md:text-xl"
            >
              {link.label}
            </Link>
          </p>
        ) : null}
      </Container>
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";

type Props = {
  eyebrow?: string;
  headline: string;
  link?: { label: string; href: string };
  src?: string;
  alt?: string;
  priority?: boolean;
  /** Tailwind object-position class — defaults to object-center */
  objectPosition?: string;
};

export function Hero({ eyebrow, headline, link, src, alt = "", priority = true, objectPosition = "object-center" }: Props) {
  return (
    <section className="relative bg-charcoal-deep text-paper overflow-hidden">
      <div className="absolute inset-0 z-0">
        {src ? (
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="100vw"
            className={`object-cover ${objectPosition}`}
          />
        ) : (
          <PlaceholderImage
            aspect="hero-wide"
            slot="home-hero"
            className="w-full h-full"
          />
        )}
      </div>
      {/* Dark overlay for editorial mood and text legibility */}
      <div className="absolute inset-0 z-0 bg-black/55" />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <Container className="relative z-10 min-h-[90vh] flex flex-col justify-end pt-32 pb-16 md:pt-40 md:pb-24">
        {eyebrow ? (
          <p className="font-ui text-eyebrow uppercase text-paper/60 mb-6 md:mb-8">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-display-1 text-paper max-w-3xl">
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

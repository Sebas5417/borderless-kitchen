import Image from "next/image";
import { Container } from "@/components/layout/Container";

type Props = {
  eyebrow?: string;
  headline: string;
  dek?: string;
  src: string;
  alt: string;
  /** Tailwind object-position class — defaults to object-center */
  objectPosition?: string;
};

export function PageHero({
  eyebrow,
  headline,
  dek,
  src,
  alt,
  objectPosition = "object-center",
}: Props) {
  return (
    <section className="relative bg-charcoal-deep overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className={`object-cover ${objectPosition} opacity-60`}
        />
        <div className="absolute inset-0 bg-charcoal-deep/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-deep/90 via-charcoal-deep/30 to-charcoal-deep/40" />
      </div>
      <Container className="relative z-10 min-h-[55vh] md:min-h-[60vh] flex flex-col justify-end pt-32 pb-14 md:pb-20">
        {eyebrow ? (
          <p className="font-ui text-eyebrow uppercase text-vermillion mb-6">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="font-display text-display-1 text-paper leading-tight max-w-3xl">
          {headline}
        </h1>
        {dek ? (
          <p className="font-body text-lg text-paper/75 mt-6 max-w-prose leading-relaxed">
            {dek}
          </p>
        ) : null}
      </Container>
    </section>
  );
}

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

type Props = {
  images: { src: string; alt: string }[];
  eyebrow?: string;
  headline: string;
  link?: { label: string; href: string };
  /** Milliseconds between slides — default 5000 */
  interval?: number;
};

export function HeroCarousel({ images, eyebrow, headline, link, interval = 5000 }: Props) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Highest slide index shown so far. Slides beyond `seen + 1` are not mounted,
  // so the browser only fetches the current slide and the next one instead of
  // all five hero images at once (2026-09-06: Lighthouse mobile LCP was 10.7 s
  // because the lazily-loaded second slide became the LCP element).
  const [seen, setSeen] = useState(0);

  const next = useCallback(() => {
    setActive((i) => (i + 1) % images.length);
  }, [images.length]);

  useEffect(() => {
    setSeen((s) => (active > s ? active : s));
  }, [active]);

  // Auto-rotation starts only after the visitor's first scroll / pointer /
  // touch / key input. Largest Contentful Paint keeps accepting new candidates
  // until the first input, so a crossfade before that point re-timestamps LCP
  // to the moment the second slide appears (measured 10.7 s on mobile). After
  // the first input the metric is frozen and the rotation is free.
  const [engaged, setEngaged] = useState(false);
  useEffect(() => {
    if (engaged) return;
    const on = () => setEngaged(true);
    const opts: AddEventListenerOptions = { once: true, passive: true };
    window.addEventListener("scroll", on, opts);
    window.addEventListener("pointermove", on, opts);
    window.addEventListener("pointerdown", on, opts);
    window.addEventListener("touchstart", on, opts);
    window.addEventListener("keydown", on, opts);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("pointermove", on);
      window.removeEventListener("pointerdown", on);
      window.removeEventListener("touchstart", on);
      window.removeEventListener("keydown", on);
    };
  }, [engaged]);

  useEffect(() => {
    if (paused || !engaged) return;
    const id = setInterval(next, interval);
    return () => clearInterval(id);
  }, [paused, engaged, next, interval]);

  return (
    <section
      className="relative bg-charcoal-deep text-paper overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Image stack — crossfade via opacity */}
      <div className="absolute inset-0 z-0">
        {images.map((img, i) => (
          <div
            key={img.src}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            {i <= seen + 1 ? (
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={i === 0}
                loading={i === 0 ? undefined : "lazy"}
                sizes="100vw"
                className="object-cover object-center"
              />
            ) : null}
          </div>
        ))}
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
      </div>

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
            <Link href={link.href} className="link-quiet text-paper text-lg md:text-xl">
              {link.label}
            </Link>
          </p>
        ) : null}

        {/* Navigation dots */}
        <div className="flex gap-2 mt-10 md:mt-14">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active
                  ? "w-8 bg-paper"
                  : "w-3 bg-paper/40 hover:bg-paper/60"
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

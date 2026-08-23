import Link from "next/link";
import { Container } from "./Container";
import { AmazonCTA } from "@/components/cta/AmazonCTA";

import { TMT_AMAZON } from "@/lib/amazon";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline py-16 md:py-20">
      <Container className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <p className="font-display text-xl text-ink">Borderless Kitchen</p>
          <p className="font-body text-sm text-ink/60 mt-3 max-w-xs leading-relaxed">
            A cookbook series by Sebastian Dri. Italian soul. Japanese
            precision.
          </p>
          <div className="mt-5">
            <AmazonCTA href={TMT_AMAZON} label="Get Vol. I" />
          </div>
        </div>

        {/* Series */}
        <nav aria-label="Footer series">
          <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
            The series
          </p>
          <ul className="space-y-2 font-body text-sm text-ink">
            {[
              { href: "/books", label: "All volumes" },
              { href: "/books/tokyo-meets-tuscany", label: "Tokyo Meets Tuscany" },
              { href: "/preorder", label: "Seoul Meets Mexico City ↗" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-vermillion transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Site */}
        <nav aria-label="Footer site">
          <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
            Explore
          </p>
          <ul className="space-y-2 font-body text-sm text-ink">
            {[
              { href: "/free", label: "Free Recipes" },
              { href: "/30-day-challenge", label: "30-Day Challenge" },
              { href: "/mini-course", label: "5-Day Mini-Course" },
              { href: "/preorder", label: "Vol. II — Out Now" },
              { href: "/journal", label: "Journal" },
              { href: "/culture", label: "Culture" },
              { href: "/about", label: "About" },
              { href: "/connect", label: "Connect" },
            ].map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-vermillion transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Fine print */}
        <div>
          <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
            Free recipes
          </p>
          <Link
            href="/free"
            className="font-body text-sm text-ink hover:text-vermillion transition-colors duration-300 block mb-2"
          >
            19 free fusion recipes →
          </Link>
          <a
            href="https://free.borderlesskitchenseries.com"
            className="font-body text-xs text-ink/50 hover:text-vermillion transition-colors duration-300"
          >
            Email list + Flavor Pairing Matrix →
          </a>
          <div className="mt-8 pt-6 border-t border-hairline">
            <p className="font-body text-xs text-ink/40">
              © {year} Sebastian Dri. All rights reserved.
            </p>
            <div className="flex gap-4 mt-3">
              <Link
                href="/legal/privacy"
                className="font-ui text-[10px] uppercase tracking-widest text-ink/30 hover:text-ink/60 transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="/legal/terms"
                className="font-ui text-[10px] uppercase tracking-widest text-ink/30 hover:text-ink/60 transition-colors"
              >
                Terms
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

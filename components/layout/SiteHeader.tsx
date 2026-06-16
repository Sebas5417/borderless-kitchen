import Link from "next/link";
import { Container } from "./Container";
import { MobileMenu } from "./MobileMenu";

const NAV = [
  { href: "/books", label: "Books" },
  { href: "/journal", label: "Journal" },
  { href: "/culture", label: "Culture" },
  { href: "/about", label: "About" },
  { href: "/connect", label: "Connect" },
  { href: "/free", label: "Free", highlight: true },
] as const;

export function SiteHeader() {
  return (
    <header className="border-b border-hairline relative z-50 bg-paper">
      <Container className="flex items-center justify-between py-5 md:py-6">
        <Link
          href="/"
          aria-label="Borderless Kitchen — home"
          className="font-display text-xl md:text-2xl tracking-tight text-ink"
        >
          Borderless Kitchen
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8 font-ui text-eyebrow uppercase text-ink/70">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`hover:text-ink transition-colors duration-300 ${"highlight" in item && item.highlight ? "text-vermillion hover:text-vermillion/70" : ""}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile hamburger — client component handles state */}
        <MobileMenu />
      </Container>
    </header>
  );
}

import Link from "next/link";
import { Container } from "./Container";

const NAV = [
  { href: "/books", label: "Books" },
  { href: "/journal", label: "Journal" },
  { href: "/culture", label: "Culture" },
  { href: "/about", label: "About" },
  { href: "/connect", label: "Connect" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-hairline">
      <Container className="flex items-center justify-between py-5 md:py-6">
        <Link
          href="/"
          aria-label="Borderless Kitchen — home"
          className="font-display text-xl md:text-2xl tracking-tight text-ink"
        >
          Borderless Kitchen
        </Link>
        <nav aria-label="Primary">
          <ul className="hidden md:flex items-center gap-8 font-ui text-eyebrow uppercase text-ink/70">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-ink transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="flex md:hidden items-center gap-5 font-ui text-eyebrow uppercase text-ink/70">
            <li>
              <Link href="/books">Books</Link>
            </li>
            <li>
              <Link href="/journal">Journal</Link>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}

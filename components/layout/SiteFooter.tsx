import Link from "next/link";
import { Container } from "./Container";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-hairline mt-32 md:mt-48 py-16">
      <Container className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        <div>
          <p className="font-display text-xl text-ink">Borderless Kitchen</p>
          <p className="font-body text-sm text-ink/60 mt-3 max-w-xs">
            A premium cookbook series by Sebastian Dri.
          </p>
        </div>

        <nav aria-label="Footer">
          <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
            The series
          </p>
          <ul className="space-y-2 font-body text-sm text-ink">
            <li>
              <Link href="/books" className="hover:text-vermillion transition-colors duration-300">
                Books
              </Link>
            </li>
            <li>
              <Link href="/journal" className="hover:text-vermillion transition-colors duration-300">
                Journal
              </Link>
            </li>
            <li>
              <Link href="/culture" className="hover:text-vermillion transition-colors duration-300">
                Culture
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-vermillion transition-colors duration-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/connect" className="hover:text-vermillion transition-colors duration-300">
                Connect
              </Link>
            </li>
          </ul>
        </nav>

        <div>
          <p className="font-ui text-eyebrow uppercase text-ink/50 mb-4">
            Fine print
          </p>
          <p className="font-body text-sm text-ink/60">
            © {year} Sebastian Dri. All rights reserved.
          </p>
          <p className="font-body text-xs text-ink/40 mt-3">
            Recipes appear in the printed volumes. The website holds the stories
            behind them.
          </p>
        </div>
      </Container>
    </footer>
  );
}

import Link from 'next/link'

const editorialLinks = [
  { href: '/journal', label: 'Journal' },
  { href: '/book', label: 'Books' },
  { href: '/culture', label: 'Culture' },
]

const connectLinks = [
  { href: '/connect', label: 'Subscribe' },
  { href: '/about', label: 'About' },
]

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div className="site-footer-brand">
          <Link href="/" className="brand-mark">
            Borderless Kitchen
          </Link>
          <p className="site-footer-tag">Italian soul. Japanese precision.</p>
        </div>

        <nav className="site-footer-col" aria-label="Editorial">
          <p className="site-footer-col-label">Editorial</p>
          <ul>
            {editorialLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer-col" aria-label="Connect">
          <p className="site-footer-col-label">Connect</p>
          <ul>
            {connectLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
            <li>
              <a href="mailto:hello@borderlesskitchen.com">Contact</a>
            </li>
          </ul>
        </nav>

        <nav className="site-footer-col" aria-label="Legal">
          <p className="site-footer-col-label">Legal</p>
          <ul>
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="site-footer-bottom">
        <span className="site-footer-mark">◇ Sebastian Dri</span>
        <span className="site-footer-year">Issue One · {year}</span>
      </div>
    </footer>
  )
}

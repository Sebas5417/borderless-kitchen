import Link from 'next/link'

const primaryNav = [
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Books', href: '/book' },
  { label: 'Culture', href: '/culture' },
  { label: 'Connect', href: '/connect' },
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-mark">
        Borderless Kitchen
      </Link>
      <nav aria-label="Primary navigation">
        <ul className="primary-nav">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

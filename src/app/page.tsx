const primaryNav = [
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Books', href: '/book' },
  { label: 'Culture', href: '/culture' },
  { label: 'Connect', href: '/connect' },
]

export default function Home() {
  return (
    <main className="hero-shell">
      <header className="site-header">
        <a href="/" className="brand-mark">
          Borderless Kitchen
        </a>
        <nav aria-label="Primary navigation">
          <ul className="primary-nav">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <section className="hero-content" aria-label="Home hero">
        <p className="hero-kicker">Editorial Front Door</p>
        <h1>Italian soul. Japanese precision.</h1>
        <p>
          A quiet, image-led home shell designed to route readers into stories,
          books, and cultural references.
        </p>
      </section>

      <footer className="site-footer">
        <a href="/privacy">Privacy</a>
        <a href="/terms">Terms</a>
      </footer>
    </main>
  )
}

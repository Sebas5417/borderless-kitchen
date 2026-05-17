import Link from 'next/link'
import { PrimaryNav } from './PrimaryNav'

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-mark">
        Borderless Kitchen
      </Link>
      <PrimaryNav />
    </header>
  )
}

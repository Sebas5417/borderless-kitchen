import Link from 'next/link'
import { SearchPalette } from '@/components/SearchPalette'
import { PrimaryNav } from './PrimaryNav'

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link href="/" className="brand-mark">
        Borderless Kitchen
      </Link>
      <div className="site-header-end">
        <SearchPalette />
        <PrimaryNav />
      </div>
    </header>
  )
}

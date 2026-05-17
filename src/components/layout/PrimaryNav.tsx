'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const items = [
  { label: 'About', href: '/about' },
  { label: 'Journal', href: '/journal' },
  { label: 'Books', href: '/book' },
  { label: 'Culture', href: '/culture' },
  { label: 'Connect', href: '/connect' },
]

export function PrimaryNav() {
  const pathname = usePathname() ?? '/'

  return (
    <nav aria-label="Primary navigation">
      <ul className="primary-nav">
        {items.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`)
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={isActive ? 'is-active' : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

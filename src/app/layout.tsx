import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Borderless Kitchen',
  description: 'Italian soul. Japanese precision.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

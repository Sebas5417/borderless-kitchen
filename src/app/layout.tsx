import type { Metadata } from 'next'
import { Fraunces, JetBrains_Mono, Newsreader } from 'next/font/google'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://borderless-kitchen.vercel.app'),
  title: {
    default: 'Borderless Kitchen',
    template: '%s — Borderless Kitchen',
  },
  description:
    'Italian soul. Japanese precision. Cookbooks, a journal, and a knowledge library by Sebastian Dri.',
  openGraph: {
    title: 'Borderless Kitchen',
    description: 'Italian soul. Japanese precision.',
    type: 'website',
    siteName: 'Borderless Kitchen',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Borderless Kitchen',
    description: 'Italian soul. Japanese precision.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}

import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'
import { getPantryBySlug, listPantrySlugs } from '@/lib/content/data'

export const alt = 'Borderless Kitchen — Pantry'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export function generateStaticParams() {
  return listPantrySlugs().map((slug) => ({ slug }))
}

interface RouteParams {
  params: Promise<{ slug: string }>
}

export default async function Image({ params }: RouteParams) {
  const { slug } = await params
  const entry = getPantryBySlug(slug)
  if (!entry) return new Response('Not found', { status: 404 })

  const base = join(process.cwd(), 'src/app/_fonts')
  const [fraunces, mono] = await Promise.all([
    readFile(join(base, 'Fraunces-Italic.ttf')),
    readFile(join(base, 'JetBrainsMono-Medium.ttf')),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0c0a07',
          backgroundImage:
            'radial-gradient(900px 600px at 8% -6%, rgba(217,106,58,0.14), transparent 60%), radial-gradient(700px 500px at 96% 108%, rgba(241,232,216,0.05), transparent 60%)',
          padding: 88,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#f1e8d8',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span
              style={{
                color: '#d96a3a',
                fontFamily: 'Fraunces',
                fontStyle: 'italic',
                fontSize: 30,
                lineHeight: 1,
              }}
            >
              ◇
            </span>
            <span
              style={{
                fontFamily: 'Mono',
                fontSize: 20,
                color: '#b8ad9b',
                letterSpacing: 4.5,
                textTransform: 'uppercase',
              }}
            >
              Pantry · {entry.category}
            </span>
          </div>
          <span
            style={{
              fontFamily: 'Mono',
              fontSize: 18,
              color: '#756c5e',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            {entry.origin}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
          <span
            style={{
              fontFamily: 'Fraunces',
              fontStyle: 'italic',
              fontSize: entry.name.length > 18 ? 88 : 124,
              lineHeight: 1,
              letterSpacing: -3.5,
              color: '#f1e8d8',
            }}
          >
            {entry.name}
          </span>
          <span
            style={{
              fontFamily: 'Fraunces',
              fontStyle: 'italic',
              fontSize: 26,
              lineHeight: 1.4,
              color: '#b8ad9b',
              maxWidth: 880,
            }}
          >
            {entry.flavorProfile.join(' · ')}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            borderTop: '1px solid rgba(241,232,216,0.18)',
            paddingTop: 22,
          }}
        >
          <span
            style={{
              fontFamily: 'Mono',
              fontSize: 18,
              color: '#756c5e',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            Borderless Kitchen · Pantry
          </span>
          <span
            style={{
              fontFamily: 'Mono',
              fontSize: 18,
              color: '#d96a3a',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            ◇ Sebastian Dri
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: fraunces, style: 'italic', weight: 400 },
        { name: 'Mono', data: mono, style: 'normal', weight: 500 },
      ],
    },
  )
}

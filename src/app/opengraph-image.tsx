import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const alt = 'Borderless Kitchen — Italian soul. Japanese precision.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

async function loadFonts() {
  const base = join(process.cwd(), 'src/app/_fonts')
  const [fraunces, mono] = await Promise.all([
    readFile(join(base, 'Fraunces-Italic.ttf')),
    readFile(join(base, 'JetBrainsMono-Medium.ttf')),
  ])
  return { fraunces, mono }
}

export default async function Image() {
  const { fraunces, mono } = await loadFonts()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0c0a07',
          backgroundImage:
            'radial-gradient(900px 600px at 12% -8%, rgba(217,106,58,0.16), transparent 60%), radial-gradient(700px 500px at 95% 110%, rgba(241,232,216,0.05), transparent 60%)',
          padding: 88,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          color: '#f1e8d8',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <span
            style={{
              color: '#d96a3a',
              fontFamily: 'Fraunces',
              fontStyle: 'italic',
              fontSize: 34,
              lineHeight: 1,
            }}
          >
            ◇
          </span>
          <span
            style={{
              fontFamily: 'Mono',
              fontSize: 22,
              color: '#b8ad9b',
              letterSpacing: 5,
              textTransform: 'uppercase',
            }}
          >
            Borderless Kitchen
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span
            style={{
              fontFamily: 'Fraunces',
              fontStyle: 'italic',
              fontSize: 124,
              lineHeight: 1,
              letterSpacing: -4,
              color: '#f1e8d8',
            }}
          >
            Italian soul.
          </span>
          <span
            style={{
              fontFamily: 'Fraunces',
              fontStyle: 'italic',
              fontSize: 124,
              lineHeight: 1,
              letterSpacing: -4,
              color: '#f1e8d8',
              marginTop: 8,
            }}
          >
            Japanese precision.
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
            Issue One · Spring 2026
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

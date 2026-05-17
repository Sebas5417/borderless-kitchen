import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { ImageResponse } from 'next/og'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default async function AppleIcon() {
  const fraunces = await readFile(
    join(process.cwd(), 'src/app/_fonts/Fraunces-Italic.ttf'),
  )

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0c0a07',
          backgroundImage:
            'radial-gradient(180px 180px at 18% 0%, rgba(217,106,58,0.32), transparent 60%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#f1e8d8',
          fontFamily: 'Fraunces',
          fontStyle: 'italic',
          fontSize: 112,
          lineHeight: 1,
          letterSpacing: -3,
        }}
      >
        BK
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Fraunces', data: fraunces, style: 'italic', weight: 400 },
      ],
    },
  )
}

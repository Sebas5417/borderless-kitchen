import { ImageResponse } from 'next/og'

export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#0c0a07',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d96a3a',
          fontSize: 22,
          lineHeight: 1,
          fontFamily: 'serif',
          fontStyle: 'italic',
        }}
      >
        ◇
      </div>
    ),
    { ...size },
  )
}

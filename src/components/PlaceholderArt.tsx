interface PlaceholderArtProps {
  initial: string
  folio?: string
  aspect?: string
}

export function PlaceholderArt({
  initial,
  folio,
  aspect = '4 / 5',
}: PlaceholderArtProps) {
  return (
    <div className="placeholder-art" style={{ aspectRatio: aspect }} aria-hidden="true">
      <span className="placeholder-art-letter">{initial}</span>
      {folio && <span className="placeholder-art-folio">{folio}</span>}
    </div>
  )
}

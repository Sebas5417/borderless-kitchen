import type { ReactNode } from 'react'

export function EditorialContainer({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={className ? `editorial-container ${className}` : 'editorial-container'}>
      {children}
    </div>
  )
}

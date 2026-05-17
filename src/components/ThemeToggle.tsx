'use client'

export function ThemeToggle() {
  const toggle = () => {
    const isDay = document.documentElement.dataset.theme === 'day'
    const next = isDay ? 'night' : 'day'
    if (next === 'day') {
      document.documentElement.dataset.theme = 'day'
    } else {
      delete document.documentElement.dataset.theme
    }
    try {
      localStorage.setItem('bk-theme', next)
    } catch {
      /* localStorage may be unavailable */
    }
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label="Toggle day or night theme"
      title="Toggle theme"
    >
      <span className="theme-toggle-icon" aria-hidden="true" />
    </button>
  )
}

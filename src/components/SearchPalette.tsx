'use client'

import { Command } from 'cmdk'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  SEARCH_GROUPS,
  SEARCH_INDEX,
  type SearchItem,
} from '@/lib/content/search-index'

export function SearchPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  const select = (href: string) => {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      <button
        type="button"
        className="search-trigger"
        onClick={() => setOpen(true)}
        aria-label="Open search"
      >
        <span aria-hidden="true" className="search-trigger-mark">
          ◇
        </span>
        <span className="search-trigger-label">Search</span>
        <kbd className="search-trigger-kbd">⌘K</kbd>
      </button>

      <Command.Dialog
        open={open}
        onOpenChange={setOpen}
        label="Site search"
        className="search-palette"
      >
        <div className="search-palette-inner">
          <Command.Input
            placeholder="Search the kitchen…"
            className="search-input"
          />
          <Command.List className="search-list">
            <Command.Empty className="search-empty">
              Nothing here yet. Try “shoyu”, “broth”, “Tuscany”.
            </Command.Empty>

            {SEARCH_GROUPS.map((group) => {
              const items = SEARCH_INDEX.filter((i) => i.type === group.type)
              if (items.length === 0) return null
              return (
                <Command.Group
                  key={group.type}
                  heading={group.heading}
                  className="search-group"
                >
                  {items.map((item) => (
                    <SearchRow key={item.id} item={item} onSelect={select} />
                  ))}
                </Command.Group>
              )
            })}
          </Command.List>
          <div className="search-footer">
            <span>
              <kbd>↵</kbd> open
            </span>
            <span>
              <kbd>↑</kbd>
              <kbd>↓</kbd> navigate
            </span>
            <span>
              <kbd>esc</kbd> close
            </span>
          </div>
        </div>
      </Command.Dialog>
    </>
  )
}

function SearchRow({
  item,
  onSelect,
}: {
  item: SearchItem
  onSelect: (href: string) => void
}) {
  const searchValue = `${item.title} ${item.subtitle ?? ''} ${item.keywords ?? ''}`
  return (
    <Command.Item
      value={searchValue}
      onSelect={() => onSelect(item.href)}
      className="search-item"
    >
      <span className="search-item-title">{item.title}</span>
      {item.subtitle && (
        <span className="search-item-subtitle">{item.subtitle}</span>
      )}
    </Command.Item>
  )
}

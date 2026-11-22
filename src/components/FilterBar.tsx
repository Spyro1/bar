import { forwardRef } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { ArrowDown, ArrowUp, Search, X } from 'lucide-react'
import { BASE_SPIRITS } from '../data/types'
import type { SortDir, SortKey } from '../lib/recipe'
import { TogglePills } from './ui/toggle-pills'

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'name', label: 'Név' },
  { key: 'abv', label: 'Alkohol' },
  { key: 'ingredients', label: 'Hozzávalók' },
]

export const ALL = 'Mind'
export type SpiritFilter = (typeof BASE_SPIRITS)[number] | typeof ALL

const SPIRIT_OPTIONS = [ALL, ...BASE_SPIRITS] as const

interface FilterBarProps {
  query: string
  onQueryChange: (q: string) => void
  sortKey: SortKey
  sortDir: SortDir
  onSortChange: (key: SortKey, dir: SortDir) => void
  spirit: SpiritFilter
  onSpiritChange: (s: SpiritFilter) => void
  resultCount: number
  totalCount: number
  onReset: () => void
  /** Enter in the search field: open the top match. */
  onSubmit: () => void
}

export const FilterBar = forwardRef<HTMLInputElement, FilterBarProps>(function FilterBar(
  {
    query,
    onQueryChange,
    sortKey,
    sortDir,
    onSortChange,
    spirit,
    onSpiritChange,
    resultCount,
    totalCount,
    onReset,
    onSubmit,
  },
  searchRef,
) {
  const isFiltered = query !== '' || spirit !== ALL

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted" />
        <input
          ref={searchRef}
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onSubmit()
            }
          }}
          enterKeyHint="search"
          placeholder="Ital vagy hozzávaló keresése"
          aria-label="Ital vagy hozzávaló keresése"
          autoComplete="off"
          className="h-11 w-full rounded-full bg-panel pr-16 pl-10 text-base text-fg placeholder:text-faint focus:bg-panel-2 focus:outline-none focus-visible:outline-2 focus-visible:outline-accent [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label="Keresés törlése"
            className="absolute top-1/2 right-1.5 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted pointer-coarse:size-10 pointer-coarse:right-0.5 hover:bg-panel-2 hover:text-fg"
          >
            <X className="size-4" />
          </button>
        ) : (
          <kbd className="pointer-events-none absolute top-1/2 right-3.5 hidden -translate-y-1/2 rounded-md bg-panel-2 px-1.5 py-0.5 font-sans text-[11px] text-faint md:block pointer-coarse:hidden">
            /
          </kbd>
        )}
      </div>

      <TogglePills label="Alapszesz" options={SPIRIT_OPTIONS} value={spirit} onChange={onSpiritChange} />

      <div className="flex items-center gap-2">
        <span className="shrink-0 text-[13px] text-muted">Rendezés</span>
        <ToggleGroup.Root
          type="single"
          aria-label="Rendezés"
          value={sortKey}
          // Pressing the active option again (Radix reports '') flips the direction.
          onValueChange={(v) =>
            v ? onSortChange(v as SortKey, 'asc') : onSortChange(sortKey, sortDir === 'asc' ? 'desc' : 'asc')
          }
          className="flex gap-1.5"
        >
          {SORT_OPTIONS.map(({ key, label }) => {
            const active = key === sortKey
            const Arrow = sortDir === 'asc' ? ArrowUp : ArrowDown
            return (
              <ToggleGroup.Item
                key={key}
                value={key}
                aria-label={active ? `${label}, ${sortDir === 'asc' ? 'növekvő' : 'csökkenő'}` : label}
                className="inline-flex h-8 items-center gap-1 rounded-full bg-panel px-3 text-[13px] text-muted transition-[background-color,color] duration-150 ease-out hover:text-fg data-[state=on]:bg-panel-2 data-[state=on]:text-fg pointer-coarse:h-10"
              >
                {label}
                {active && <Arrow className="size-3.5" aria-hidden="true" />}
              </ToggleGroup.Item>
            )
          })}
        </ToggleGroup.Root>
      </div>

      <div className="flex min-h-8 items-center justify-between px-1 text-[13px] text-muted">
        <p aria-live="polite" className="tabular-nums">
          {isFiltered ? `${resultCount} / ${totalCount} ital` : `${totalCount} ital`}
        </p>
        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="-mr-2 h-8 rounded-full px-3 text-fg/80 hover:bg-panel hover:text-fg pointer-coarse:h-10"
          >
            Szűrők törlése
          </button>
        )}
      </div>
    </div>
  )
})

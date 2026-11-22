import { forwardRef } from 'react'
import { Search, X } from 'lucide-react'
import { BASE_SPIRITS, CATEGORIES } from '../data/types'
import { TogglePills } from './ui/toggle-pills'

export const ALL = 'All'
export type CategoryFilter = (typeof CATEGORIES)[number] | typeof ALL
export type SpiritFilter = (typeof BASE_SPIRITS)[number] | typeof ALL

const CATEGORY_OPTIONS = [ALL, ...CATEGORIES] as const
const SPIRIT_OPTIONS = [ALL, ...BASE_SPIRITS] as const

interface FilterBarProps {
  query: string
  onQueryChange: (q: string) => void
  category: CategoryFilter
  onCategoryChange: (c: CategoryFilter) => void
  spirit: SpiritFilter
  onSpiritChange: (s: SpiritFilter) => void
  resultCount: number
  totalCount: number
  onReset: () => void
  /** Enter in the search field: open the top match. */
  onSubmit: () => void
}

export const FilterBar = forwardRef<HTMLInputElement, FilterBarProps>(function FilterBar(
  { query, onQueryChange, category, onCategoryChange, spirit, onSpiritChange, resultCount, totalCount, onReset, onSubmit },
  searchRef,
) {
  const isFiltered = query !== '' || category !== ALL || spirit !== ALL

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
          placeholder="Search drinks or ingredients"
          aria-label="Search drinks or ingredients"
          autoComplete="off"
          className="h-11 w-full rounded-full bg-panel pr-16 pl-10 text-base text-fg placeholder:text-faint focus:bg-panel-2 focus:outline-none focus-visible:outline-2 focus-visible:outline-accent [&::-webkit-search-cancel-button]:hidden"
        />
        {query ? (
          <button
            type="button"
            onClick={() => onQueryChange('')}
            aria-label="Clear search"
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

      <TogglePills label="Base spirit" options={SPIRIT_OPTIONS} value={spirit} onChange={onSpiritChange} />
      <TogglePills label="Style" options={CATEGORY_OPTIONS} value={category} onChange={onCategoryChange} />

      <div className="flex min-h-8 items-center justify-between px-1 text-[13px] text-muted">
        <p aria-live="polite" className="tabular-nums">
          {isFiltered ? `${resultCount} of ${totalCount} drinks` : `${totalCount} drinks`}
        </p>
        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="-mr-2 h-8 rounded-full px-3 text-fg/80 hover:bg-panel hover:text-fg pointer-coarse:h-10"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  )
})

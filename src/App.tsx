import { useDeferredValue, useEffect, useMemo, useRef, useState } from 'react'
import { cocktails } from './data/cocktails'
import type { BaseSpirit } from './data/types'
import { matchesQuery, sortCocktails, type SortDir, type SortKey } from './lib/recipe'
import { cn } from './lib/cn'
import { useHashRoute } from './hooks/useHashRoute'
import { Header } from './components/Header'
import { ALL, FilterBar, type SpiritFilter } from './components/FilterBar'
import { CocktailCard } from './components/CocktailCard'
import { RecipeDetail } from './components/RecipeDetail'
import { BarGuide } from './components/BarGuide'
import { Footer } from './components/Footer'
import { Button } from './components/ui/button'
import { TooltipProvider } from './components/ui/tooltip'

/** Matches the `md` breakpoint where list and recipe sit side by side. */
const SPLIT_VIEW = '(min-width: 768px)'

export default function App() {
  const { path, recipeId, navigate } = useHashRoute()
  const [query, setQuery] = useState('')
  const [spirit, setSpirit] = useState<SpiritFilter>(ALL)
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [guideOpen, setGuideOpen] = useState(false)
  const deferredQuery = useDeferredValue(query)
  const searchRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const results = useMemo(
    () =>
      sortCocktails(
        cocktails.filter((c) => (spirit === ALL || c.baseSpirit === spirit) && matchesQuery(c, deferredQuery)),
        sortKey,
        sortDir,
      ),
    [spirit, deferredQuery, sortKey, sortDir],
  )

  // In split view the recipe pane always shows something: the routed drink, or
  // the first match. On phones, no route means the list is showing.
  const routed = cocktails.find((c) => c.id === recipeId) ?? null
  const active = routed ?? results[0] ?? null
  const index = active ? results.findIndex((c) => c.id === active.id) : -1
  const prevId = index > 0 ? results[index - 1].id : null
  const nextId = index >= 0 && index < results.length - 1 ? results[index + 1].id : null

  /** Opening from the list adds a history entry, so the phone's back gesture returns to it. */
  const openFromList = (id: string) => navigate(`/recipe/${id}`)
  /** Stepping between drinks replaces the entry: back goes to the list, not through every drink. */
  const step = (id: string) => navigate(`/recipe/${id}`, { replace: true })

  // Remember whether the current recipe was opened from the list in this session,
  // so "back" can pop history instead of stacking a new list entry on top.
  const openedFromList = useRef(false)
  const previousPath = useRef(path)
  useEffect(() => {
    if (!recipeId) openedFromList.current = false
    else if (previousPath.current === '/') openedFromList.current = true
    previousPath.current = path
  }, [path, recipeId])

  const goBack = () => {
    if (openedFromList.current) window.history.back()
    else navigate('/', { replace: true })
  }

  const resetFilters = () => {
    setQuery('')
    setSpirit(ALL)
  }

  const openTopMatch = () => {
    if (!results[0]) return
    searchRef.current?.blur() // closes the on-screen keyboard
    openFromList(results[0].id)
  }

  // Keyboard: "/" focuses search, ↑/↓ (or j/k outside inputs) step through the list,
  // Escape returns to the list on small screens.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey || guideOpen) return
      const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement
      if (e.key === '/' && !typing) {
        e.preventDefault()
        searchRef.current?.focus()
        return
      }
      if (e.key === 'Escape' && routed && !typing && !window.matchMedia(SPLIT_VIEW).matches) {
        goBack()
        return
      }
      const down = e.key === 'ArrowDown' || (!typing && e.key === 'j')
      const up = e.key === 'ArrowUp' || (!typing && e.key === 'k')
      if (!down && !up) return
      if (typing && e.target !== searchRef.current) return
      if ((e.target as HTMLElement).closest?.('[role="group"]')) return // let Radix groups handle arrows
      const target = down ? (index < 0 ? results[0]?.id : nextId) : prevId
      if (target) {
        e.preventDefault()
        step(target)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  // Keep the list position meaningful: follow the open drink, and when coming back
  // to the list on a phone, land on the drink that was just viewed.
  const lastViewed = useRef<string | null>(null)
  useEffect(() => {
    const row = (id: string) => listRef.current?.querySelector(`[data-id="${id}"]`)
    if (routed) {
      lastViewed.current = routed.id
      row(routed.id)?.scrollIntoView({ block: 'nearest' })
    } else if (lastViewed.current) {
      row(lastViewed.current)?.scrollIntoView({ block: 'center' })
    }
  }, [routed?.id])

  const pickSpirit = (s: BaseSpirit) => {
    resetFilters()
    setSpirit(s)
    setGuideOpen(false)
    // Show the filtered list; in split view the first match fills the recipe pane.
    navigate('/', { replace: true })
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex h-dvh flex-col">
        <Header showBack={routed !== null} onBack={goBack} onOpenGuide={() => setGuideOpen(true)} />

        <div className="pt-safe px-safe pb-safe flex min-h-0 w-full flex-1 gap-6 md:px-6 md:pt-5 md:pb-5 xl:gap-10 xl:px-10">
          <aside
            aria-label="Italok"
            className={cn(
              'flex min-h-0 w-full min-w-0 flex-col md:flex md:w-[300px] md:shrink-0 lg:w-[340px] 2xl:w-[380px]',
              routed && 'hidden',
            )}
          >
            <div className="pt-1 pb-2">
              <FilterBar
                ref={searchRef}
                query={query}
                onQueryChange={setQuery}
                sortKey={sortKey}
                sortDir={sortDir}
                onSortChange={(key, dir) => {
                  setSortKey(key)
                  setSortDir(dir)
                }}
                spirit={spirit}
                onSpiritChange={setSpirit}
                resultCount={results.length}
                totalCount={cocktails.length}
                onReset={resetFilters}
                onSubmit={openTopMatch}
              />
            </div>

            {results.length > 0 ? (
              <ul ref={listRef} className="-mx-1 min-h-0 flex-1 space-y-0.5 overflow-y-auto px-1">
                {results.map((c) => (
                  <li key={c.id}>
                    <CocktailCard
                      cocktail={c}
                      active={c.id === active?.id}
                      implicit={!routed}
                      metric={sortKey === 'ingredients' ? 'ingredients' : 'abv'}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-1 flex-col items-start gap-4 px-1 pt-6">
                <p className="text-[15px] text-muted">
                  {query
                    ? `Nincs találat erre: „${query}”. Próbálj egy hozzávalót, például limét vagy mentát.`
                    : 'Nincs a szűrőknek megfelelő ital.'}
                </p>
                <Button onClick={resetFilters}>Összes szűrő törlése</Button>
              </div>
            )}
            <Footer />
          </aside>

          <main className={cn('min-h-0 min-w-0 flex-1', !routed && 'hidden md:block')}>
            {active ? (
              <RecipeDetail cocktail={active} prevId={prevId} nextId={nextId} onNavigate={step} />
            ) : (
              <div className="grid h-full place-items-center p-8 text-center text-[15px] text-muted">
                Nincs megjeleníthető ital. Töröld a szűrőket, hogy mindet lásd.
              </div>
            )}
          </main>
        </div>

        <BarGuide open={guideOpen} onOpenChange={setGuideOpen} onPickSpirit={pickSpirit} />
      </div>
    </TooltipProvider>
  )
}

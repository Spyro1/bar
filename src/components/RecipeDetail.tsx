import { Check, ChevronLeft, ChevronRight, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Cocktail } from '../data/types'
import { formatQuantity, recipeToText, totalVolume } from '../lib/recipe'
import { ChipGroup } from './ui/chip-group'
import { ActionButton } from './ui/icon-button'
import { GlassIcon } from './GlassIcon'

const SERVINGS = ['1', '2', '4', '8'] as const
type Serving = (typeof SERVINGS)[number]

interface RecipeDetailProps {
  cocktail: Cocktail
  prevId: string | null
  nextId: string | null
  onNavigate: (id: string) => void
}

export function RecipeDetail({ cocktail, prevId, nextId, onNavigate }: RecipeDetailProps) {
  // Serving size persists while browsing; most people pour for the same group.
  const [serving, setServing] = useState<Serving>('1')
  const [copied, setCopied] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const n = Number(serving)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
    setCopied(false)
  }, [cocktail.id])

  useEffect(() => {
    if (!copied) return
    const t = setTimeout(() => setCopied(false), 1800)
    return () => clearTimeout(t)
  }, [copied])

  async function copyRecipe() {
    try {
      await navigator.clipboard.writeText(recipeToText(cocktail, n))
      setCopied(true)
    } catch {
      // Clipboard can be unavailable (insecure context); the button simply doesn't confirm.
    }
  }

  return (
    <div className="flex h-full flex-col">
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto [mask-image:linear-gradient(to_bottom,#000_calc(100%-40px),transparent)]"
      >
        <article key={cocktail.id} className="mx-auto max-w-xl animate-enter px-1 pt-2 pb-10 sm:px-8 md:pt-6">
          <header className="flex flex-col items-center text-center">
            <GlassIcon
              glass={cocktail.glassware}
              color={cocktail.color}
              className="size-20 text-fg/80 md:size-32"
            />
            <h2 className="mt-5 text-4xl md:mt-8 leading-[1.05] font-light tracking-tight sm:text-5xl">
              {cocktail.name}
            </h2>
            <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-muted">{cocktail.tagline}</p>
            <p className="mt-4 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] text-faint">
              <span>{cocktail.baseSpirit}</span>
              <span>{cocktail.category}</span>
              <span>{cocktail.strength}</span>
              <span>About {cocktail.abv}% ABV</span>
            </p>
          </header>

          <section aria-label="Servings" className="mt-7 flex md:mt-10 flex-col items-center gap-3">
            <ChipGroup
              label="Number of drinks"
              options={SERVINGS}
              value={serving}
              onChange={setServing}
              describe={(s) => (s === '1' ? '1 drink' : `${s} drinks`)}
            />
            <span className="text-[13px] text-muted">
              {n === 1 ? '1 drink' : `${n} drinks`}, {totalVolume(cocktail, n)} in total
            </span>
          </section>

          <section aria-labelledby="ingredients-heading" className="mt-8 md:mt-10">
            <h3 id="ingredients-heading" className="mb-3 text-lg font-medium">
              Ingredients
            </h3>
            <ul className="divide-y divide-white/[0.06] rounded-2xl bg-panel">
              {cocktail.ingredients.map((ing) => (
                <li key={ing.name} className="flex items-baseline gap-4 px-4 py-3.5">
                  <span className="w-[4.5rem] shrink-0 text-[15px] font-medium tabular-nums">
                    {formatQuantity(ing, n)}
                  </span>
                  <span className="text-[15px]">
                    {ing.name}
                    {ing.note && <span className="text-muted">, {ing.note}</span>}
                    {ing.optional && <span className="ml-2 text-[13px] text-faint">optional</span>}
                  </span>
                </li>
              ))}
            </ul>
            {n > 2 && (
              <p className="mt-2.5 px-1 text-[13px] text-muted">
                Shake two drinks at a time at most, so each one gets the right dilution.
              </p>
            )}
          </section>

          <section aria-labelledby="method-heading" className="mt-10">
            <h3 id="method-heading" className="mb-4 text-lg font-medium">
              Method
            </h3>
            <ol className="space-y-4">
              {cocktail.instructions.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="mt-px grid size-6 shrink-0 place-items-center rounded-full bg-panel text-xs text-muted tabular-nums">
                    {i + 1}
                  </span>
                  <p className="text-[15px] leading-relaxed text-fg/90">{step}</p>
                </li>
              ))}
            </ol>
          </section>

          <dl className="mt-10 grid grid-cols-3 gap-2">
            <Detail label="Glass" value={cocktail.glassware} />
            <Detail label="Ice" value={cocktail.ice} />
            <Detail label="Garnish" value={cocktail.garnish} />
          </dl>

          <section className="mt-10 space-y-6">
            <div>
              <h3 className="mb-1.5 text-[13px] text-muted">How it tastes</h3>
              <p className="text-[15px] leading-relaxed">{cocktail.tastingNotes}</p>
            </div>
            <div>
              <h3 className="mb-1.5 text-[13px] text-muted">Bartender’s tip</h3>
              <p className="text-[15px] leading-relaxed">{cocktail.bartenderTip}</p>
            </div>
          </section>
        </article>
      </div>

      <nav aria-label="Recipe actions" className="flex justify-center gap-5 pt-3">
        <ActionButton
          icon={<ChevronLeft className="size-5" />}
          label="Previous"
          disabled={!prevId}
          onClick={() => prevId && onNavigate(prevId)}
        />
        <ActionButton
          icon={copied ? <Check className="size-5" /> : <Copy className="size-[18px]" />}
          label={copied ? 'Copied' : 'Copy'}
          aria-live="polite"
          onClick={copyRecipe}
        />
        <ActionButton
          icon={<ChevronRight className="size-5" />}
          label="Next"
          disabled={!nextId}
          onClick={() => nextId && onNavigate(nextId)}
        />
      </nav>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-panel px-3.5 py-3">
      <dt className="text-[12px] text-muted">{label}</dt>
      <dd className="mt-1 text-[14px] leading-snug">{value}</dd>
    </div>
  )
}

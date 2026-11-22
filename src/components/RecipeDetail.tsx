import { Check, ChevronLeft, ChevronRight, Copy } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Cocktail } from '../data/types'
import { STEP_LABELS } from '../data/steps'
import { formatQuantity, recipeToText, totalVolume } from '../lib/recipe'
import { ChipGroup } from './ui/chip-group'
import { ActionButton } from './ui/icon-button'
import { GlassIcon } from './GlassIcon'
import { PICTOGRAMS, StepIcon } from './StepIcon'

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
        <article
          key={cocktail.id}
          className="grid animate-enter gap-x-10 gap-y-8 pt-2 pb-10 md:pt-4 xl:grid-cols-[minmax(300px,2fr)_3fr]"
        >
          {/* Left column: what goes in */}
          <div className="space-y-7">
            <header className="flex items-center gap-4">
              <GlassIcon
                glass={cocktail.glassware}
                color={cocktail.color}
                className="size-16 shrink-0 text-fg/80 md:size-20"
              />
              <div className="min-w-0">
                <h2 className="text-3xl leading-tight font-light tracking-tight md:text-4xl">{cocktail.name}</h2>
                <p className="mt-1 text-[13px] text-muted">
                  {cocktail.baseSpirit}, kb. {cocktail.abv}% alkohol
                </p>
              </div>
            </header>

            <section aria-label="Adagok" className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <ChipGroup
                label="Adagok száma"
                options={SERVINGS}
                value={serving}
                onChange={setServing}
                describe={(s) => `${s} adag`}
              />
              <span className="text-[13px] text-muted tabular-nums">
                {n} adag, összesen {totalVolume(cocktail, n)}
              </span>
            </section>

            <section aria-labelledby="ingredients-heading">
              <h3 id="ingredients-heading" className="mb-3 text-lg font-medium">
                Hozzávalók
              </h3>
              <ul className="divide-y divide-white/[0.06] rounded-2xl bg-panel">
                {cocktail.ingredients.map((ing) => (
                  <li key={ing.name} className="flex items-baseline gap-4 px-4 py-3">
                    <span className="w-[4.5rem] shrink-0 text-[15px] font-medium tabular-nums">
                      {formatQuantity(ing, n)}
                    </span>
                    <span className="text-[15px]">
                      {ing.name}
                      {ing.note && <span className="text-muted">, {ing.note}</span>}
                      {ing.optional && <span className="ml-2 text-[13px] text-faint">elhagyható</span>}
                    </span>
                  </li>
                ))}
              </ul>
              {n > 2 && (
                <p className="mt-2.5 px-1 text-[13px] text-muted">
                  Egyszerre legfeljebb két adagot rázz, hogy mindegyik megfelelően hígul.
                </p>
              )}
            </section>
          </div>

          {/* Right column (wide screens): how to make it */}
          <div className="space-y-6 xl:pt-1">
            <section aria-labelledby="method-heading">
              <h3 id="method-heading" className="mb-3 text-lg font-medium">
                Elkészítés
              </h3>
              <ol className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 2xl:grid-cols-4">
                {cocktail.instructions.map((step, i) => {
                  const { color } = PICTOGRAMS[step.action]
                  return (
                    <li
                      key={i}
                      className="group relative flex flex-col items-center rounded-3xl px-3 pt-5 pb-4 text-center"
                      style={{ backgroundColor: `${color}1a` }}
                    >
                      <span
                        className="absolute top-3 left-3 grid size-6 place-items-center rounded-full text-[12px] font-semibold text-ink tabular-nums"
                        style={{ backgroundColor: color }}
                      >
                        {i + 1}
                      </span>
                      <StepIcon
                        action={step.action}
                        className="size-14 transition-transform duration-200 ease-out group-hover:-rotate-6 group-hover:scale-110"
                      />
                      <span className="mt-3 text-[14px] leading-tight font-medium">{STEP_LABELS[step.action]}</span>
                      {step.detail && (
                        <span className="mt-1 text-[12.5px] leading-snug text-fg/65">{step.detail}</span>
                      )}
                    </li>
                  )
                })}
              </ol>
            </section>

            <dl className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
              <Detail label="Pohár" value={cocktail.glassware} />
              <Detail label="Jég" value={cocktail.ice} />
              <Detail label="Díszítés" value={cocktail.garnish} />
            </dl>
          </div>
        </article>
      </div>

      <nav aria-label="Recept műveletek" className="flex justify-center gap-5 pt-3">
        <ActionButton
          icon={<ChevronLeft className="size-5" />}
          label="Előző"
          disabled={!prevId}
          onClick={() => prevId && onNavigate(prevId)}
        />
        <ActionButton
          icon={copied ? <Check className="size-5" /> : <Copy className="size-[18px]" />}
          label={copied ? 'Másolva' : 'Másolás'}
          aria-live="polite"
          onClick={copyRecipe}
        />
        <ActionButton
          icon={<ChevronRight className="size-5" />}
          label="Következő"
          disabled={!nextId}
          onClick={() => nextId && onNavigate(nextId)}
        />
      </nav>
    </div>
  )
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-2">
      <dt className="text-muted">{label}:</dt>
      <dd>{value}</dd>
    </div>
  )
}

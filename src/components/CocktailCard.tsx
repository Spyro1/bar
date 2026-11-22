import type { Cocktail } from '../data/types'
import { cn } from '../lib/cn'
import { GlassIcon } from './GlassIcon'

interface CocktailCardProps {
  cocktail: Cocktail
  active: boolean
  /** The active row is only an implicit default (no route), which phones don't display. */
  implicit?: boolean
}

/** One row in the drink list. It's a link, so the URL hash drives selection. */
export function CocktailCard({ cocktail, active, implicit = false }: CocktailCardProps) {
  return (
    <a
      href={`#/recipe/${cocktail.id}`}
      aria-current={active && !implicit ? 'page' : undefined}
      data-id={cocktail.id}
      className={cn(
        'flex items-center gap-3.5 rounded-2xl px-2.5 py-2 outline-offset-[-2px]',
        'transition-[background-color] duration-150 ease-out',
        active && !implicit && 'bg-panel [&>span:first-child]:bg-panel-2',
        active && implicit && 'md:bg-panel md:[&>span:first-child]:bg-panel-2',
        (!active || implicit) && 'hover:bg-panel/60',
      )}
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-panel text-fg/75">
        <GlassIcon glass={cocktail.glassware} color={cocktail.color} className="size-8" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-medium">{cocktail.name}</span>
        <span className="block truncate text-[13px] text-muted">
          {cocktail.baseSpirit}, {cocktail.category.toLowerCase()}
        </span>
      </span>
      <span className="mr-1.5 text-[13px] text-faint tabular-nums" title="Approximate ABV">
        {cocktail.abv}%
      </span>
    </a>
  )
}

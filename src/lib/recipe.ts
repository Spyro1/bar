import type { Cocktail, Ingredient, Unit } from '../data/types'

/** From this many centilitres up, volumes read better in decilitres. */
const DL_THRESHOLD_CL = 10

/** Up to two decimals, trailing zeros dropped: 1.50 → "1.5", 2.00 → "2". */
function trimNumber(value: number): string {
  return String(Math.round(value * 100) / 100)
}

/** Formats a centilitre volume, switching to dl for larger amounts: 4.5 → "4.5 cl", 12 → "1.2 dl". */
export function formatVolume(cl: number): string {
  return cl >= DL_THRESHOLD_CL ? `${trimNumber(cl / 10)} dl` : `${trimNumber(cl)} cl`
}

const FRACTIONS: Record<number, string> = {
  0.125: '⅛',
  0.25: '¼',
  0.375: '⅜',
  0.5: '½',
  0.625: '⅝',
  0.75: '¾',
  0.875: '⅞',
}

/** Formats a number using kitchen fractions (eighths), e.g. 1.75 → "1¾". */
export function toFraction(value: number): string {
  const rounded = Math.round(value * 8) / 8
  const whole = Math.floor(rounded)
  const frac = FRACTIONS[+(rounded - whole).toFixed(3)]
  if (!frac) return String(whole)
  return whole === 0 ? frac : `${whole}${frac}`
}

const UNIT_LABELS: Record<Exclude<Unit, 'cl'>, [singular: string, plural: string]> = {
  dash: ['dash', 'dashes'],
  barspoon: ['barspoon', 'barspoons'],
  tsp: ['tsp', 'tsp'],
  leaf: ['leaf', 'leaves'],
  cube: ['cube', 'cubes'],
  pinch: ['pinch', 'pinches'],
  whole: ['', ''],
}

/** Returns the human-readable quantity for an ingredient, scaled. */
export function formatQuantity(ing: Ingredient, scale: number): string {
  const amount = ing.amount * scale

  if (ing.unit === 'cl') return formatVolume(amount)

  const [singular, plural] = UNIT_LABELS[ing.unit]
  const label = amount === 1 ? singular : plural
  return label ? `${toFraction(amount)} ${label}` : toFraction(amount)
}

/** Total liquid volume of the recipe, ignoring count-based units. */
export function totalVolume(c: Cocktail, scale: number): string {
  const cl = c.ingredients.reduce((sum, i) => (i.unit === 'cl' && !i.optional ? sum + i.amount : sum), 0)
  return formatVolume(cl * scale)
}

/** Plain-text recipe card used by the “Copy recipe” action. */
export function recipeToText(c: Cocktail, scale: number): string {
  const servings = scale === 1 ? '1 drink' : `${scale} drinks`
  const lines = [
    `${c.name} (${servings})`,
    `${c.category} · ${c.baseSpirit} · ${c.glassware}`,
    '',
    'Ingredients',
    ...c.ingredients.map(
      (i) =>
        `• ${formatQuantity(i, scale)} ${i.name}${i.note ? ` (${i.note})` : ''}${i.optional ? ' (optional)' : ''}`,
    ),
    '',
    'Method',
    ...c.instructions.map((step, n) => `${n + 1}. ${step}`),
    '',
    `Glass: ${c.glassware} · Ice: ${c.ice} · Garnish: ${c.garnish}`,
    `Tip: ${c.bartenderTip}`,
  ]
  return lines.join('\n')
}

/** Case-insensitive match against name, spirit, category, flavours, and ingredients. */
export function matchesQuery(c: Cocktail, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  const haystack = [
    c.name,
    c.baseSpirit,
    c.category,
    c.glassware,
    ...c.flavorTags,
    ...c.ingredients.map((i) => i.name),
  ]
    .join(' ')
    .toLowerCase()
  // Every word must appear somewhere, so "gin lime" narrows rather than widens.
  return q.split(/\s+/).every((word) => haystack.includes(word))
}

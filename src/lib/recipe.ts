import type { Cocktail, Ingredient, Step, Unit } from '../data/types'
import { STEP_LABELS } from '../data/steps'

/** From this many centilitres up, volumes read better in decilitres. */
const DL_THRESHOLD_CL = 10

/** Up to two decimals, trailing zeros dropped, Hungarian decimal comma: 1.5 → "1,5". */
function trimNumber(value: number): string {
  return String(Math.round(value * 100) / 100).replace('.', ',')
}

/** Formats a centilitre volume, switching to dl for larger amounts: 4.5 → "4,5 cl", 12 → "1,2 dl". */
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

/** Hungarian keeps nouns singular after numbers ("2 löket"), so one label per unit. */
const UNIT_LABELS: Record<Exclude<Unit, 'cl'>, string> = {
  dash: 'löket',
  barspoon: 'bárkanál',
  tsp: 'teáskanál',
  leaf: 'levél',
  cube: 'kocka',
  pinch: 'csipet',
  whole: '',
}

/** Returns the human-readable quantity for an ingredient, scaled. */
export function formatQuantity(ing: Ingredient, scale: number): string {
  const amount = ing.amount * scale
  if (ing.unit === 'cl') return formatVolume(amount)
  const label = UNIT_LABELS[ing.unit]
  return label ? `${toFraction(amount)} ${label}` : toFraction(amount)
}

/** Total liquid volume of the recipe, ignoring count-based units. */
export function totalVolume(c: Cocktail, scale: number): string {
  const cl = c.ingredients.reduce((sum, i) => (i.unit === 'cl' && !i.optional ? sum + i.amount : sum), 0)
  return formatVolume(cl * scale)
}

/** "Rázás – jéggel, 10 mp" */
export function stepToText(step: Step): string {
  return step.detail ? `${STEP_LABELS[step.action]} – ${step.detail}` : STEP_LABELS[step.action]
}

/** Plain-text recipe card used by the copy action. */
export function recipeToText(c: Cocktail, scale: number): string {
  const lines = [
    `${c.name} (${scale} adag)`,
    `${c.category} · ${c.baseSpirit} · ${c.glassware}`,
    '',
    'Hozzávalók',
    ...c.ingredients.map(
      (i) =>
        `• ${formatQuantity(i, scale)} ${i.name}${i.note ? ` (${i.note})` : ''}${i.optional ? ' (elhagyható)' : ''}`,
    ),
    '',
    'Elkészítés',
    ...c.instructions.map((step, n) => `${n + 1}. ${stepToText(step)}`),
    '',
    `Pohár: ${c.glassware} · Jég: ${c.ice} · Díszítés: ${c.garnish}`,
    `Tipp: ${c.bartenderTip}`,
  ]
  return lines.join('\n')
}

/** Lowercase and strip accents, so "fozott" finds "főzött" and "limele" finds "lime-lé". */
export function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/-/g, '')
}

/** Accent-insensitive match against name, spirit, category, flavours, and ingredients. */
export function matchesQuery(c: Cocktail, query: string): boolean {
  const q = normalize(query.trim())
  if (!q) return true
  const haystack = normalize(
    [c.name, c.baseSpirit, c.category, c.glassware, ...c.flavorTags, ...c.ingredients.map((i) => i.name)].join(
      ' ',
    ),
  )
  // Every word must appear somewhere, so "gin lime" narrows rather than widens.
  return q.split(/\s+/).every((word) => haystack.includes(word))
}

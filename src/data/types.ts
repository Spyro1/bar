export const CATEGORIES = [
  'Classic',
  'Sour',
  'Spritz & Highball',
  'Stirred & Spirit-Forward',
  'Tropical & Tiki',
  'Modern Classic',
  'After Dinner',
] as const
export type Category = (typeof CATEGORIES)[number]

export const BASE_SPIRITS = [
  'Gin',
  'Whiskey',
  'Rum',
  'Tequila & Mezcal',
  'Vodka',
  'Brandy',
  'Aperitivo',
  'Liqueur',
  'Wine & Bubbly',
] as const
export type BaseSpirit = (typeof BASE_SPIRITS)[number]

export type Strength = 'Light' | 'Medium' | 'Strong'

export type Glassware =
  | 'Rocks'
  | 'Double Rocks'
  | 'Coupe'
  | 'Nick & Nora'
  | 'Highball'
  | 'Wine Glass'
  | 'Copper Mug'
  | 'Flute'
  | 'Hurricane'
  | 'Julep Cup'
  | 'Irish Coffee Glass'

/**
 * Liquid volumes are stored in centilitres (`cl`); the UI scales them and
 * switches to decilitres from 10 cl up. Count-based units (dashes, leaves…)
 * scale linearly but are never converted.
 */
export type Unit = 'cl' | 'dash' | 'barspoon' | 'tsp' | 'leaf' | 'cube' | 'pinch' | 'whole'

export interface Ingredient {
  amount: number
  unit: Unit
  name: string
  /** Short clarifier shown after the name, e.g. "freshly squeezed". */
  note?: string
  optional?: boolean
}

export interface Cocktail {
  id: string
  name: string
  /** One friendly line of microcopy for the card. */
  tagline: string
  category: Category
  baseSpirit: BaseSpirit
  glassware: Glassware
  ice: string
  garnish: string
  strength: Strength
  /** Approximate finished ABV, for guidance only. */
  abv: number
  /** A sentence or two describing how it drinks. */
  tastingNotes: string
  flavorTags: string[]
  ingredients: Ingredient[]
  /** Ordered preparation steps. */
  instructions: string[]
  bartenderTip: string
  /** Liquid colour used to tint the glass illustration. */
  color: string
}

export interface SpiritProfile {
  spirit: BaseSpirit
  blurb: string
  tryFirst: string
}

export interface BarTip {
  title: string
  body: string
}

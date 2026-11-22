export const CATEGORIES = [
  'Klasszikus',
  'Sour',
  'Spritz és longdrink',
  'Trópusi és tiki',
  'Modern klasszikus',
  'Vacsora után',
] as const
export type Category = (typeof CATEGORIES)[number]

export const BASE_SPIRITS = [
  'Gin',
  'Whisky',
  'Rum',
  'Tequila',
  'Vodka',
  'Aperitivo',
  'Likőr',
] as const
export type BaseSpirit = (typeof BASE_SPIRITS)[number]

export type Strength = 'Könnyű' | 'Közepes' | 'Erős'

export type Glassware =
  | 'Tumbler'
  | 'Dupla tumbler'
  | 'Coupe'
  | 'Nick & Nora'
  | 'Longdrinkes pohár'
  | 'Borospohár'
  | 'Rézbögre'
  | 'Pezsgőspohár'
  | 'Hurricane'
  | 'Julep kehely'
  | 'Ír kávés pohár'

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
  /** Short clarifier shown after the name, e.g. "frissen facsart". */
  note?: string
  optional?: boolean
}

/** Bar actions, each drawn as a pictogram (see components/StepIcon.tsx). */
export type StepAction =
  | 'chill'
  | 'warm'
  | 'ice'
  | 'add'
  | 'muddle'
  | 'dry-shake'
  | 'shake'
  | 'stir'
  | 'strain'
  | 'double-strain'
  | 'pour'
  | 'top'
  | 'float'
  | 'sink'
  | 'blend'
  | 'roll'
  | 'rim'
  | 'express'
  | 'flame'
  | 'garnish'
  | 'drops'
  | 'brew'

export interface Step {
  action: StepAction
  /** A few words of specifics, e.g. "jéggel, 30 mp". */
  detail?: string
}

export interface Cocktail {
  id: string
  name: string
  /** One friendly line of microcopy. */
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
  /** Ordered preparation steps, shown as pictograms. */
  instructions: Step[]
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

import type { StepAction } from './types'

/** Short Hungarian caption for each pictogram. */
export const STEP_LABELS: Record<StepAction, string> = {
  chill: 'Pohárhűtés',
  warm: 'Pohármelegítés',
  ice: 'Jég',
  add: 'Kimérés',
  muddle: 'Törés',
  'dry-shake': 'Száraz rázás',
  shake: 'Rázás',
  stir: 'Keverés',
  strain: 'Szűrés',
  'double-strain': 'Dupla szűrés',
  pour: 'Öntés',
  top: 'Feltöltés',
  float: 'Rétegezés',
  sink: 'Lesüllyesztés',
  blend: 'Turmixolás',
  roll: 'Átforgatás',
  rim: 'Perem',
  express: 'Héjolaj',
  flame: 'Lángolt héj',
  garnish: 'Díszítés',
  drops: 'Cseppek',
  brew: 'Kávéfőzés',
}

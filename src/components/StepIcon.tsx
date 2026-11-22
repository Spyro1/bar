import type { StepAction } from '../data/types'

/**
 * Line pictograms for bar techniques, drawn on a 24×24 grid with the same
 * stroke style as the glass icons. Dots are zero-length round-capped segments.
 */
const PATHS: Record<StepAction, string> = {
  // Glass with a snowflake
  chill: 'M5 10h10l-1.2 10H6.2zM19 3v7M16 4.75l6 3.5M16 8.25l6-3.5',
  // Glass with steam
  warm: 'M5 11h12l-1.4 9H6.4zM9 3c-1 1.5 1 2.5 0 4.5M13 3c-1 1.5 1 2.5 0 4.5',
  // Ice cubes dropping into a glass
  ice: 'M4.5 12h15l-1.8 8.5H6.3zM8 3.5h4v4H8zM13.5 5.5H17v3.5h-3.5z',
  // Jigger (double measuring cup)
  add: 'M7 3h10l-3.2 8h-3.6zM10.2 11h3.6L17 21H7zM9.5 7h5',
  // Muddler pressing into a glass
  muddle: 'M5.5 10h13l-1.6 10.5H7.1zM12 2v12M10 14h4M9 17.5h.01M15 17.5h.01M12 18.5h.01',
  // Shaker with a crossed-out ice cube: shaken without ice
  'dry-shake':
    'M7 9h8l-1 12H8zM8 9V7.5a3 3 0 0 1 6 0V9M10 3.5h2M17.5 3.5h4v4h-4zM17 8l5-5',
  // Shaker with motion lines
  shake: 'M8 9h8l-1 12H9zM9 9V7.5a3 3 0 0 1 6 0V9M11 3.5h2M4.5 10l-2 1.5M4.5 14H2M19.5 10l2 1.5M19.5 14H22',
  // Mixing glass with a barspoon and a swirl
  stir: 'M5 8h12v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zM17 2l-5 15M7.5 14c1.5 1.2 5.5 1.2 7 0',
  // Hawthorne strainer with drips
  strain: 'M9 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM14 9h7M5.5 12.5q1 1 2 0t2 0 2 0M7 17v1M9 18v1.5M11 17v1',
  // Strainer above a fine-mesh cone
  'double-strain': 'M7 2.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM10.5 6H15M8 12h10l-5 7zM10.5 15h5M13 21v.5',
  // Arrow pouring into a glass
  pour: 'M6 11h12l-1.5 10h-9zM12 2v6.5M9.5 6 12 8.5 14.5 6',
  // Bottle above a glass, arrow down: top up
  top: 'M10.5 2h3v2.5l1.5 2V11h-6V6.5l1.5-2zM7 15h10l-1.2 6.5H8.2zM12 11.5v2.5',
  // Layered glass with a spoon: float on top
  float: 'M6 7h12l-1.5 14h-9zM6.6 12h10.8M14.5 2 11 10',
  // A drop sinking to the bottom layer
  sink: 'M6 5h12l-1.5 16h-9zM7.4 17.5h9.2M12 7.5c1.4 1.8 2 2.8 2 3.8a2 2 0 0 1-4 0c0-1 .6-2 2-3.8z',
  // Blender
  blend: 'M7 3h10l-1.5 10h-7zM6.5 13h11v8h-11zM12 17h.01M9 7.5h6',
  // Two tins with an arrow between: roll back and forth
  roll: 'M3 9h6l-.8 11H3.8zM15 9h6l-.8 11h-4.4zM7 5.5c3-2.5 7-2.5 10 0M15.5 3.5 17 5.5l-2 1',
  // Glass rim dotted with salt or sugar
  rim: 'M5 9h14l-2 12H7zM5 6.5h.01M8 5.5h.01M11 6.5h.01M14 5.5h.01M17 6.5h.01M19.5 5.5h.01',
  // Citrus peel spraying its oils
  express: 'M3.5 16c3.5-4.5 10-6.5 16-5M4.5 18.5c3.5-4 9.5-5.5 15-4.5M9 7h.01M12 5h.01M15 6.5h.01M18 4h.01M12 8.5h.01',
  // Flame over a peel
  flame: 'M12 2.5c2.5 3.5 4.5 5.5 4.5 9a4.5 4.5 0 0 1-9 0c0-1.8.8-3.2 1.8-4.2 0 1.8.9 2.8 1.8 2.8 0-2.7-1-4.5.9-7.6zM5 20c4-2 10-2 14 0',
  // Citrus wheel
  garnish: 'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM12 6.5v11M6.5 12h11M8.1 8.1l7.8 7.8M15.9 8.1l-7.8 7.8',
  // Three drops of bitters
  drops:
    'M12 3c1.6 2.1 2.4 3.4 2.4 4.6a2.4 2.4 0 0 1-4.8 0c0-1.2.8-2.5 2.4-4.6zM6.5 12c1.6 2.1 2.4 3.4 2.4 4.6a2.4 2.4 0 0 1-4.8 0c0-1.2.8-2.5 2.4-4.6zM17.5 12c1.6 2.1 2.4 3.4 2.4 4.6a2.4 2.4 0 0 1-4.8 0c0-1.2.8-2.5 2.4-4.6z',
  // Espresso cup with steam
  brew: 'M4.5 10h11v5a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4zM15.5 11.5h1.5a2 2 0 0 1 0 4h-1.5M3 21h15M8 3c-1 1.5 1 2.5 0 4.5M12 3c-1 1.5 1 2.5 0 4.5',
}

export function StepIcon({ action, className }: { action: StepAction; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={PATHS[action]} />
    </svg>
  )
}

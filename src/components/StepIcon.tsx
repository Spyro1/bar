import type { StepAction } from '../data/types'

interface Pictogram {
  /** Bright colour for the strokes; the tile uses a translucent tint of it. */
  color: string
  /** Line drawing on a 24×24 grid. Dots are zero-length round-capped segments. */
  stroke: string
  /** Shapes filled with a soft wash of the colour, for a two-tone look. */
  fill?: string
}

/** Playful two-tone pictograms for each bar technique. */
export const PICTOGRAMS: Record<StepAction, Pictogram> = {
  chill: {
    color: '#64d2ff',
    stroke: 'M5 10h10l-1.2 10H6.2zM19 3v7M16 4.75l6 3.5M16 8.25l6-3.5',
    fill: 'M5 10h10l-1.2 10H6.2z',
  },
  warm: {
    color: '#ff9f0a',
    stroke: 'M5 11h12l-1.4 9H6.4zM9 3c-1 1.5 1 2.5 0 4.5M13 3c-1 1.5 1 2.5 0 4.5',
    fill: 'M5.5 14.5h11l-.9 5.5H6.4z',
  },
  ice: {
    color: '#5ac8fa',
    stroke: 'M4.5 12h15l-1.8 8.5H6.3zM8 3.5h4v4H8zM13.5 5.5H17v3.5h-3.5z',
    fill: 'M8 3.5h4v4H8zM13.5 5.5H17v3.5h-3.5z',
  },
  add: {
    color: '#bf5af2',
    stroke: 'M7 3h10l-3.2 8h-3.6zM10.2 11h3.6L17 21H7zM9.5 7h5',
    fill: 'M8.6 7h6.8l-1.6 4h-3.6z',
  },
  muddle: {
    color: '#30d158',
    stroke: 'M5.5 10h13l-1.6 10.5H7.1zM12 2v12M10 14h4',
    fill: 'M6.2 15h11.6l-.9 5.5H7.1z',
  },
  'dry-shake': {
    color: '#ff6482',
    stroke: 'M7 9h8l-1 12H8zM8 9V7.5a3 3 0 0 1 6 0V9M10 3.5h2M17.5 3.5h4v4h-4zM17 8l5-5',
    fill: 'M7 9h8l-1 12H8z',
  },
  shake: {
    color: '#ff375f',
    stroke: 'M8 9h8l-1 12H9zM9 9V7.5a3 3 0 0 1 6 0V9M11 3.5h2M4.5 10l-2 1.5M4.5 14H2M19.5 10l2 1.5M19.5 14H22',
    fill: 'M8 9h8l-1 12H9z',
  },
  stir: {
    color: '#64d2ff',
    stroke: 'M5 8h12v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2zM17 2l-5 15M7.5 14c1.5 1.2 5.5 1.2 7 0',
    fill: 'M5 12h12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2z',
  },
  strain: {
    color: '#ffd60a',
    stroke: 'M9 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM14 9h7M7 17v1M9 18v1.5M11 17v1',
    fill: 'M9 4a5 5 0 1 0 0 10 5 5 0 0 0 0-10z',
  },
  'double-strain': {
    color: '#ffd60a',
    stroke: 'M7 2.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zM10.5 6H15M8 12h10l-5 7zM13 21v.5',
    fill: 'M8 12h10l-5 7z',
  },
  pour: {
    color: '#0a84ff',
    stroke: 'M6 11h12l-1.5 10h-9zM12 2v6.5M9.5 6 12 8.5 14.5 6',
    fill: 'M6.6 15h10.8l-.9 6h-9z',
  },
  top: {
    color: '#5e5ce6',
    stroke: 'M10.5 2h3v2.5l1.5 2V11h-6V6.5l1.5-2zM7 15h10l-1.2 6.5H8.2zM12 11.5v2.5',
    fill: 'M9 6.5h6V11H9z',
  },
  float: {
    color: '#bf5af2',
    stroke: 'M6 7h12l-1.5 14h-9zM6.6 12h10.8M14.5 2 11 10',
    fill: 'M6.6 12h10.8l-1 9h-8.8z',
  },
  sink: {
    color: '#ff453a',
    stroke: 'M6 5h12l-1.5 16h-9zM7.4 17.5h9.2M12 7.5c1.4 1.8 2 2.8 2 3.8a2 2 0 0 1-4 0c0-1 .6-2 2-3.8z',
    fill: 'M7.4 17.5h9.2l-.3 3.5H7.7zM12 7.5c1.4 1.8 2 2.8 2 3.8a2 2 0 0 1-4 0c0-1 .6-2 2-3.8z',
  },
  blend: {
    color: '#ff9f0a',
    stroke: 'M7 3h10l-1.5 10h-7zM6.5 13h11v8h-11zM12 17h.01',
    fill: 'M7.6 7h8.8l-.9 6h-7z',
  },
  roll: {
    color: '#ff375f',
    stroke: 'M3 9h6l-.8 11H3.8zM15 9h6l-.8 11h-4.4zM7 5.5c3-2.5 7-2.5 10 0M15.5 3.5 17 5.5l-2 1',
    fill: 'M3 9h6l-.8 11H3.8zM15 9h6l-.8 11h-4.4z',
  },
  rim: {
    color: '#e5e5ea',
    stroke: 'M5 9h14l-2 12H7zM5 6.5h.01M8 5.5h.01M11 6.5h.01M14 5.5h.01M17 6.5h.01M19.5 5.5h.01',
    fill: 'M5 9h14l-.4 2.5H5.4z',
  },
  express: {
    color: '#ffd60a',
    stroke: 'M3.5 16c3.5-4.5 10-6.5 16-5M4.5 18.5c3.5-4 9.5-5.5 15-4.5M9 7h.01M12 5h.01M15 6.5h.01M18 4h.01M12 8.5h.01',
    fill: 'M3.5 16c3.5-4.5 10-6.5 16-5v3c-5.5-1-11.5.5-15 4.5z',
  },
  flame: {
    color: '#ff6b1a',
    stroke: 'M12 2.5c2.5 3.5 4.5 5.5 4.5 9a4.5 4.5 0 0 1-9 0c0-1.8.8-3.2 1.8-4.2 0 1.8.9 2.8 1.8 2.8 0-2.7-1-4.5.9-7.6zM5 20c4-2 10-2 14 0',
    fill: 'M12 2.5c2.5 3.5 4.5 5.5 4.5 9a4.5 4.5 0 0 1-9 0c0-1.8.8-3.2 1.8-4.2 0 1.8.9 2.8 1.8 2.8 0-2.7-1-4.5.9-7.6z',
  },
  garnish: {
    color: '#32d74b',
    stroke:
      'M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11zM12 6.5v11M6.5 12h11M8.1 8.1l7.8 7.8M15.9 8.1l-7.8 7.8',
    fill: 'M12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11z',
  },
  drops: {
    color: '#ff453a',
    stroke:
      'M12 3c1.6 2.1 2.4 3.4 2.4 4.6a2.4 2.4 0 0 1-4.8 0c0-1.2.8-2.5 2.4-4.6zM6.5 12c1.6 2.1 2.4 3.4 2.4 4.6a2.4 2.4 0 0 1-4.8 0c0-1.2.8-2.5 2.4-4.6zM17.5 12c1.6 2.1 2.4 3.4 2.4 4.6a2.4 2.4 0 0 1-4.8 0c0-1.2.8-2.5 2.4-4.6z',
    fill: 'M12 3c1.6 2.1 2.4 3.4 2.4 4.6a2.4 2.4 0 0 1-4.8 0c0-1.2.8-2.5 2.4-4.6zM6.5 12c1.6 2.1 2.4 3.4 2.4 4.6a2.4 2.4 0 0 1-4.8 0c0-1.2.8-2.5 2.4-4.6zM17.5 12c1.6 2.1 2.4 3.4 2.4 4.6a2.4 2.4 0 0 1-4.8 0c0-1.2.8-2.5 2.4-4.6z',
  },
  brew: {
    color: '#d4a373',
    stroke:
      'M4.5 10h11v5a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4zM15.5 11.5h1.5a2 2 0 0 1 0 4h-1.5M3 21h15M8 3c-1 1.5 1 2.5 0 4.5M12 3c-1 1.5 1 2.5 0 4.5',
    fill: 'M4.5 10h11v5a4 4 0 0 1-4 4h-3a4 4 0 0 1-4-4z',
  },
}

export function StepIcon({ action, className }: { action: StepAction; className?: string }) {
  const { color, stroke, fill } = PICTOGRAMS[action]
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      {fill && <path d={fill} fill={color} fillOpacity={0.35} />}
      <path
        d={stroke}
        fill="none"
        stroke={color}
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

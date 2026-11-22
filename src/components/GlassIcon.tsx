import type { Glassware } from '../data/types'

/**
 * Line-art glass silhouettes, tinted with each drink's liquid colour.
 * Each shape is [outline path, liquid path] on a 64×64 grid.
 */
const SHAPES: Record<Glassware, [outline: string, liquid: string]> = {
  Rocks: ['M14 18h36l-3 34a4 4 0 0 1-4 4H21a4 4 0 0 1-4-4z', 'M16 30h32l-2 21a3 3 0 0 1-3 3H21a3 3 0 0 1-3-3z'],
  'Double Rocks': ['M12 14h40l-3 38a4 4 0 0 1-4 4H19a4 4 0 0 1-4-4z', 'M14 26h36l-2 25a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3z'],
  Coupe: ['M10 14h44c0 12-9 20-22 20S10 26 10 14zM32 34v18M22 56h20', 'M13 18h38c-1.5 8-9 13-19 13s-17.5-5-19-13z'],
  'Nick & Nora': ['M16 10h32c0 14-7 24-16 24S16 24 16 10zM32 34v18M22 56h20', 'M18 15h28c-1 9-6.5 16-14 16s-13-7-14-16z'],
  Highball: ['M19 8h26l-2 46a4 4 0 0 1-4 4H25a4 4 0 0 1-4-4z', 'M20.5 20h23l-1.5 33a3 3 0 0 1-3 3H25a3 3 0 0 1-3-3z'],
  'Wine Glass': ['M18 8h28c2 16-4 26-14 26S16 24 18 8zM32 34v18M22 56h20', 'M18.5 16h27c.5 10-5 15.5-13.5 15.5S18 26 18.5 16z'],
  'Copper Mug': ['M14 14h30v36a6 6 0 0 1-6 6H20a6 6 0 0 1-6-6zM44 22h4a6 6 0 0 1 0 12h-4', 'M16 24h26v26a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4z'],
  Flute: ['M24 6h16c1 18-2 28-8 28s-9-10-8-28zM32 34v18M24 56h16', 'M24.5 12h15c.4 12-2 19.5-7.5 19.5s-7.9-7.5-7.5-19.5z'],
  'Julep Cup': ['M16 12h32v40a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4zM16 18h32', 'M18 22h28v29a3 3 0 0 1-3 3H21a3 3 0 0 1-3-3z'],
  'Irish Coffee Glass': ['M18 10h26l-2 30a6 6 0 0 1-6 6h-8a6 6 0 0 1-6-6zM43 16h3a5 5 0 0 1 0 10h-4M31 46v6M22 56h18', 'M19.5 22h23l-1.3 17a5 5 0 0 1-5 5h-10.4a5 5 0 0 1-5-5z'],
  Hurricane: ['M20 6h24c-4 10 6 16 2 30-2 6-8 8-14 8s-12-2-14-8c-4-14 6-20 2-30zM32 44v8M22 56h20', 'M21.5 16h21c1 6 4 11 1.5 20-1.5 4.5-6.5 6-12 6s-10.5-1.5-12-6c-2.5-9 .5-14 1.5-20z'],
}

export function GlassIcon({
  glass,
  color,
  className,
}: {
  glass: Glassware
  color: string
  className?: string
}) {
  const [outline, liquid] = SHAPES[glass]
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path d={liquid} fill={color} opacity={0.9} />
      <path
        d={outline}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

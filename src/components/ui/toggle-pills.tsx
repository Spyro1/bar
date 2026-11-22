import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'

interface TogglePillsProps<T extends string> {
  label: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
  className?: string
}

/**
 * Single-select, horizontally scrolling pill row on Radix ToggleGroup
 * (roving focus, arrow keys, aria-pressed).
 */
export function TogglePills<T extends string>({
  label,
  options,
  value,
  onChange,
  className,
}: TogglePillsProps<T>) {
  const rootRef = useRef<HTMLDivElement>(null)

  // A selection made elsewhere (e.g. the bar guide) may sit off-screen in the row.
  useEffect(() => {
    rootRef.current
      ?.querySelector('[data-state="on"]')
      ?.scrollIntoView({ inline: 'nearest', block: 'nearest' })
  }, [value])

  return (
    <ToggleGroup.Root
      ref={rootRef}
      type="single"
      aria-label={label}
      value={value}
      // Radix emits '' when the active item is pressed again; keep a selection.
      onValueChange={(v) => v && onChange(v as T)}
      className={cn(
        'no-scrollbar -mx-1 flex gap-1.5 overflow-x-auto px-1 py-0.5 pr-6',
        // Fade the trailing edge so it's clear the row scrolls.
        '[mask-image:linear-gradient(to_right,#000_calc(100%-28px),transparent)]',
        className,
      )}
    >
      {options.map((option) => (
        <ToggleGroup.Item
          key={option}
          value={option}
          className={cn(
            'h-8 shrink-0 rounded-full px-3.5 text-[13px] whitespace-nowrap pointer-coarse:h-10 pointer-coarse:px-4 pointer-coarse:text-sm',
            'transition-[background-color,color] duration-150 ease-out',
            'bg-panel text-muted hover:text-fg',
            'data-[state=on]:bg-fg data-[state=on]:font-medium data-[state=on]:text-ink',
          )}
        >
          {option}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}

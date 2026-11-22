import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { cn } from '../../lib/cn'

/**
 * Round number picker. Unselected values are quiet grey discs; the selected
 * one becomes the indigo chip, the only accent colour in the interface.
 */
export function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  describe,
}: {
  label: string
  options: readonly T[]
  value: T
  onChange: (value: T) => void
  /** Accessible name for each option, e.g. "4 drinks". */
  describe: (option: T) => string
}) {
  return (
    <ToggleGroup.Root
      type="single"
      aria-label={label}
      value={value}
      onValueChange={(v) => v && onChange(v as T)}
      className="flex items-center gap-2.5"
    >
      {options.map((option) => (
        <ToggleGroup.Item
          key={option}
          value={option}
          aria-label={describe(option)}
          className={cn(
            'grid size-11 place-items-center rounded-full text-sm tabular-nums',
            'transition-[background-color,color,transform] duration-150 ease-out active:scale-[0.96]',
            'bg-panel text-muted hover:text-fg',
            'data-[state=on]:bg-accent data-[state=on]:font-medium data-[state=on]:text-white',
          )}
        >
          {option}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  )
}

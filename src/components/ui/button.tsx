import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

/** Dark pill button, like "Check" / "Bet 2" in the reference UI. */
export function Button({ className, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex h-10 items-center justify-center gap-2 rounded-full bg-panel px-5 text-sm text-fg',
        'transition-[background-color,transform] duration-150 ease-out hover:bg-panel-2 active:scale-[0.96]',
        className,
      )}
      {...props}
    />
  )
}

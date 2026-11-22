import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Small round dark button for corner controls. 40px hit area. */
export const IconButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { label: string }
>(function IconButton({ label, className, ...props }, ref) {
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cn(
        'grid size-10 shrink-0 place-items-center rounded-full bg-panel text-fg/85',
        'transition-[background-color,transform] duration-150 ease-out',
        'hover:bg-panel-2 active:scale-[0.96] disabled:pointer-events-none disabled:opacity-35',
        className,
      )}
      {...props}
    />
  )
})

/** Large round action with an icon over a short label, like Stand / Hit / Double. */
export function ActionButton({
  icon,
  label,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: ReactNode; label: string }) {
  return (
    <button
      type="button"
      className={cn(
        'flex size-[68px] flex-col items-center justify-center gap-1 rounded-full bg-panel text-fg',
        'transition-[background-color,transform] duration-150 ease-out',
        'hover:bg-panel-2 active:scale-[0.96] disabled:pointer-events-none disabled:opacity-35',
        className,
      )}
      {...props}
    >
      {icon}
      <span className="text-[11px] leading-none text-fg/80">{label}</span>
    </button>
  )
}

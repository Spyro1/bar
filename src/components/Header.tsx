import { BookOpen, ChevronLeft } from 'lucide-react'
import { cn } from '../lib/cn'
import { Logo } from './Logo'
import { IconButton } from './ui/icon-button'
import { Tooltip } from './ui/tooltip'

interface HeaderProps {
  /** True while a recipe is routed; on phones the left button becomes "back". */
  showBack: boolean
  onBack: () => void
  onOpenGuide: () => void
}

export function Header({ showBack, onBack, onOpenGuide }: HeaderProps) {
  return (
    <header className="pt-safe px-safe grid w-full grid-cols-[1fr_auto_1fr] items-center pb-3 md:px-6 xl:px-10">
      <div className="justify-self-start">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-10 items-center gap-0.5 rounded-full bg-panel pr-4 pl-2 text-sm transition-[background-color,transform] duration-150 ease-out hover:bg-panel-2 active:scale-[0.96] md:hidden"
          >
            <ChevronLeft className="size-5" />
            Italok
          </button>
        )}
        <Logo className={cn('size-10', showBack ? 'hidden md:block' : 'block')} />
      </div>

      <h1 className="text-center text-[15px] font-medium tracking-tight">Bárkönyv</h1>

      <Tooltip content="Bárkalauz">
        <IconButton label="Bárkalauz megnyitása" onClick={onOpenGuide} className="justify-self-end">
          <BookOpen className="size-[18px]" />
        </IconButton>
      </Tooltip>
    </header>
  )
}

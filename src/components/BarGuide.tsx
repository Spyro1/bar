import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { barTips, spiritProfiles } from '../data/cocktails'
import type { BaseSpirit } from '../data/types'
import { IconButton } from './ui/icon-button'

interface BarGuideProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onPickSpirit: (spirit: BaseSpirit) => void
}

/** Side sheet (Radix Dialog) with technique tips and a short guide to each spirit. */
export function BarGuide({ open, onOpenChange, onPickSpirit }: BarGuideProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 data-[state=open]:animate-fade" />
        <Dialog.Content className="fixed inset-y-2 right-2 z-50 flex w-[min(440px,calc(100vw-1rem))] flex-col overflow-hidden rounded-[28px] bg-panel shadow-[0_24px_64px_-16px_rgb(0_0_0/0.9)] focus:outline-none data-[state=open]:animate-sheet-in">
          <div className="flex items-center justify-between px-6 pt-5 pb-2">
            <Dialog.Title className="text-xl font-medium">Bárkalauz</Dialog.Title>
            <Dialog.Close asChild>
              <IconButton label="Bárkalauz bezárása" className="bg-panel-2 hover:bg-[#3a3a3c]">
                <X className="size-[18px]" />
              </IconButton>
            </Dialog.Close>
          </div>
          <Dialog.Description className="px-6 text-[15px] text-muted">
            Apró szokások, amelyek otthon a legtöbbet számítanak.
          </Dialog.Description>

          <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-6 pb-8">
            <ul className="space-y-5">
              {barTips.map((tip) => (
                <li key={tip.title}>
                  <h3 className="text-[15px] font-medium">{tip.title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{tip.body}</p>
                </li>
              ))}
            </ul>

            <h3 className="mt-10 mb-3 text-lg font-medium">Szeszek</h3>
            <ul className="divide-y divide-white/[0.06] rounded-2xl bg-panel-2">
              {spiritProfiles.map((p) => (
                <li key={p.spirit}>
                  <button
                    type="button"
                    onClick={() => onPickSpirit(p.spirit)}
                    className="w-full px-4 py-3.5 text-left outline-offset-[-2px] transition-[background-color] duration-150 hover:bg-white/[0.04]"
                  >
                    <span className="flex items-baseline justify-between gap-3">
                      <span className="text-[15px] font-medium">{p.spirit}</span>
                      <span className="text-[13px] text-fg/70">Italok mutatása</span>
                    </span>
                    <span className="mt-1 block text-[14px] leading-relaxed text-muted">
                      {p.blurb} Kezdőknek: {p.tryFirst}.
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

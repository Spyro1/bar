/** Brand mark: a martini glass with an indigo olive, on a round dark tile. */
export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <circle cx="20" cy="20" r="20" fill="#1c1c1e" />
      <path
        d="M12 12.5h16l-8 9zM20 21.5v7M16.5 28.5h7"
        fill="none"
        stroke="#f5f5f7"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="21.6" cy="15" r="1.8" fill="#5e5ce6" />
    </svg>
  )
}

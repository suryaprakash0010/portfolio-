import { getIcon } from '../../data/icons'

/**
 * Brand-coloured logo + label chip. `bare` renders just the logo (for dense
 * project stacks); otherwise a glass pill with the name.
 */
export default function TechBadge({ name, bare = false, className = '' }) {
  const { Icon, color } = getIcon(name)

  if (bare) {
    return (
      <span
        title={name}
        className={`inline-flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-white/[0.04] transition-transform duration-200 hover:scale-110 ${className}`}
      >
        <Icon style={{ color }} className="h-4 w-4" />
      </span>
    )
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300 ${className}`}
    >
      <Icon style={{ color }} className="h-3.5 w-3.5" />
      {name}
    </span>
  )
}

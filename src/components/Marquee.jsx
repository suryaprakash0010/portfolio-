import { stack } from '../data/content'
import { getIcon } from '../data/icons'

/**
 * Infinite horizontal ticker of the tech stack with real brand logos.
 * The track is duplicated and translated -50% on loop so the seam is invisible.
 * Pure CSS animation no JS per frame. Pauses on hover.
 */
export default function Marquee() {
  const items = stack.map((s) => s.name)

  return (
    <div
      className="group relative flex overflow-hidden border-y border-white/10 py-6"
      aria-hidden
    >
      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent" />

      <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
        {[...items, ...items].map((name, i) => {
          const { Icon, color } = getIcon(name)
          return (
            <span
              key={i}
              className="flex items-center gap-3 whitespace-nowrap font-mono text-xl font-bold uppercase tracking-tight text-zinc-500 transition-colors hover:text-white"
            >
              <Icon style={{ color }} className="h-6 w-6" />
              {name}
            </span>
          )
        })}
      </div>
    </div>
  )
}

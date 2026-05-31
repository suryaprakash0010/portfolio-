/**
 * Decorative HUD corner brackets four L-shaped accents that frame a card.
 * Static (no hover colour change). Purely cosmetic (aria-hidden).
 */
export default function CornerBrackets({ color = 'rgba(34,211,238,0.45)' }) {
  const base = 'pointer-events-none absolute h-3 w-3'
  return (
    <span aria-hidden>
      <span className={`${base} left-2 top-2 border-l border-t`} style={{ borderColor: color, opacity: 0.4 }} />
      <span className={`${base} right-2 top-2 border-r border-t`} style={{ borderColor: color, opacity: 0.4 }} />
      <span className={`${base} bottom-2 left-2 border-b border-l`} style={{ borderColor: color, opacity: 0.4 }} />
      <span className={`${base} bottom-2 right-2 border-b border-r`} style={{ borderColor: color, opacity: 0.4 }} />
    </span>
  )
}

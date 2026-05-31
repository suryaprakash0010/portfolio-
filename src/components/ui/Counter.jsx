import { useEffect, useRef, useState } from 'react'
import { animate, useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

/**
 * Count-up number. Accepts decorated strings like "850k+", "1704", "99.9%" —
 * it splits off the leading number, animates that from 0, and re-attaches the
 * suffix (k+, +, %).
 *
 * `eager` starts the count on mount (use for above-the-fold stats that are
 * already visible). Otherwise it waits until the element scrolls into view.
 * Reduced-motion shows the final value immediately.
 */
export default function Counter({ value, eager = false }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  // `amount` (fraction of the element visible) is more reliable than a negative
  // root-margin for elements that sit low within an above-the-fold section.
  const inView = useInView(ref, { once: true, amount: 0.3 })

  const match = String(value).match(/^([\d.]+)(.*)$/)
  const target = match ? parseFloat(match[1]) : 0
  const suffix = match ? match[2] : String(value)
  const decimals = match && match[1].includes('.') ? 1 : 0

  const [display, setDisplay] = useState(reduced ? target : 0)

  useEffect(() => {
    if (reduced) {
      setDisplay(target)
      return
    }
    if (!eager && !inView) return
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, eager, reduced, target])

  return (
    <span ref={ref}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  )
}

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * Custom magnetic glow cursor (desktop / fine-pointer only).
 * - A small solid dot tracks the pointer 1:1.
 * - A larger soft ring lags behind via a spring for that "weighted" feel.
 * - It grows when hovering interactive elements (a, button, [data-cursor]).
 * Also publishes --cursor-x/y so the page-wide spotlight can follow.
 */
export default function Cursor() {
  const reduced = usePrefersReducedMotion()

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.5 })
  const scale = useSpring(1, { stiffness: 300, damping: 20 })

  useEffect(() => {
    // Only enable on devices that actually have a precise pointer.
    if (reduced || !window.matchMedia('(pointer: fine)').matches) return

    document.body.classList.add('has-custom-cursor')

    const move = (e) => {
      x.set(e.clientX)
      y.set(e.clientY)
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`)
      const interactive = e.target.closest('a, button, [data-cursor]')
      scale.set(interactive ? 2.4 : 1)
    }

    window.addEventListener('pointermove', move)
    return () => {
      window.removeEventListener('pointermove', move)
      document.body.classList.remove('has-custom-cursor')
    }
  }, [reduced, x, y, scale])

  if (reduced) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
      {/* lagging ring */}
      <motion.div
        style={{ x: ringX, y: ringY, scale }}
        className="absolute -ml-4 -mt-4 h-8 w-8 rounded-full border border-neon-cyan/60 mix-blend-screen"
      />
      {/* exact dot */}
      <motion.div
        style={{ x, y }}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-neon-cyan"
      />
    </div>
  )
}

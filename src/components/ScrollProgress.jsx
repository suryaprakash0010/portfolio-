import { motion, useScroll, useSpring } from 'framer-motion'

/**
 * Thin neon progress bar pinned to the top of the viewport that fills as the
 * page scrolls. A spring smooths the raw scroll value so it never feels jumpy.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-neon-gradient shadow-neon-glow"
      aria-hidden
    />
  )
}

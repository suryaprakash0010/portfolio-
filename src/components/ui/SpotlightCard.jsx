import { motion } from 'framer-motion'
import CornerBrackets from './CornerBrackets'

/**
 * Premium card surface:
 *  - Layered glass
 *  - Optional HUD corner brackets
 *  - Scroll-reveal entrance
 *  - Neutral hover feedback (a subtle white border brighten) NO colour change.
 *
 * `accent` only tints the (static) corner brackets; `border` is kept for API
 * compatibility but no longer renders a coloured hover border.
 */
export default function SpotlightCard({
  children,
  className = '',
  accent = '#22d3ee',
  border = true, // eslint-disable-line no-unused-vars
  brackets = false,
  index = 0,
  glass = true,
  ...motionProps
}) {
  return (
    <motion.div
      data-cursor
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-2xl ${className}`}
      {...motionProps}
    >
      <div
        className={`relative h-full overflow-hidden rounded-2xl transition-colors duration-300 ${
          glass ? 'glass group-hover:border-white/20' : ''
        }`}
      >
        {brackets && <CornerBrackets color={accent} />}
        <div className="relative">{children}</div>
      </div>
    </motion.div>
  )
}

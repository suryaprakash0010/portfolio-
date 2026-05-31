import { motion } from 'framer-motion'
import ScrambleText from './ScrambleText'

/**
 * Brutalist section header: a numbered mono eyebrow with an animated rule,
 * over a heavy display title with a shimmering accent. Reveals on scroll.
 */
export default function SectionHeading({ eyebrow, title, accent, index = '01', align = 'left' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-12 md:mb-16 ${align === 'center' ? 'text-center' : ''}`}
    >
      <div className={`mb-5 flex items-center gap-4 ${align === 'center' ? 'justify-center' : ''}`}>
        <span className="font-mono text-xs font-semibold text-neon-purple">/ {index}</span>
        <span className="eyebrow">
          <ScrambleText text={eyebrow} />
        </span>
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-px w-16 origin-left bg-gradient-to-r from-neon-cyan/60 to-transparent md:w-28"
        />
      </div>
      <h2 className="font-display text-display-sm font-bold leading-[0.95] tracking-tight text-white">
        {title}{' '}
        {accent && <span className="text-shimmer">{accent}</span>}
      </h2>
    </motion.div>
  )
}

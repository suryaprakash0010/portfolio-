import { motion } from 'framer-motion'

/**
 * Word-by-word mask reveal. Each word sits in an overflow-hidden span and
 * slides up from below, staggered. Used for headlines so copy "types in"
 * as it scrolls into view.
 */
export default function TextReveal({ text, className = '', once = true, delay = 0 }) {
  const words = text.split(' ')

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            whileInView={{ y: 0 }}
            viewport={{ once, margin: '-10%' }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
            {i < words.length - 1 && ' '}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

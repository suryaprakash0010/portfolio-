import { motion } from 'framer-motion'

/**
 * The single glassmorphism surface reused across the site.
 * Wraps Framer Motion so any card can be given enter/hover animation
 * from the call site without duplicating the glass styles.
 */
export default function GlassCard({ children, className = '', ...motionProps }) {
  return (
    <motion.div
      className={`glass rounded-2xl ${className}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

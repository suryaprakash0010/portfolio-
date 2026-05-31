import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { nav, profile } from '../data/content'

/**
 * Minimal fixed nav. Becomes a glass bar once the user scrolls off the hero.
 * Anchor links rely on `scroll-smooth` set on <html>.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Only flip state when crossing the threshold avoids a React re-render on
    // every single scroll frame.
    let last = null
    const onScroll = () => {
      const next = window.scrollY > 40
      if (next !== last) {
        last = next
        setScrolled(next)
      }
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-strong rounded-none border-x-0 border-t-0' : 'border-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#hero" className="text-sm font-bold tracking-tight text-white">
          {profile.name}<span className="text-neon-cyan">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="text-sm text-zinc-400 transition-colors hover:text-white"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={profile.links.resume}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-white transition-colors hover:border-neon-cyan hover:text-neon-cyan"
        >
          Resume
        </a>
      </nav>
    </motion.header>
  )
}

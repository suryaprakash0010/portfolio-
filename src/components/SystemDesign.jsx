import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import GlassCard from './ui/GlassCard'
import ArchitectureDiagram from './ArchitectureDiagram'
import CornerBrackets from './ui/CornerBrackets'
import { focusAreas } from '../data/content'
import { getIcon } from '../data/icons'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * "Systems Thinking" frames the backend / distributed-systems interest that
 * the projects then prove. A live reference-architecture diagram sits beside a
 * short manifesto, with a bento grid of focus areas below.
 */
export default function SystemDesign() {
  return (
    <section id="systems" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading index="02" eyebrow="Systems Thinking" title="Backend &" accent="system design." />

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Manifesto */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <p className="text-lg leading-relaxed text-zinc-300">
            I'm drawn to the hard part of software: keeping systems{' '}
            <span className="text-gradient font-semibold">correct, available, and fast</span>{' '}
            while they fail, scale, and race.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-500">
            From a Raft cluster that never loses a committed write to an ACID ledger that
            survives a thousand concurrent transfers I design backends as systems, not
            endpoints. Here's the kind of architecture I reach for.
          </p>
        </motion.div>

        {/* Live architecture */}
        <GlassCard
          className="overflow-hidden p-5 lg:col-span-3"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="mb-3 flex items-center justify-between">
            <span className="eyebrow">Reference Architecture</span>
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
              live data flow
            </span>
          </div>
          <div className="aspect-[880/430] w-full">
            <ArchitectureDiagram />
          </div>
        </GlassCard>
      </div>

      {/* Focus areas */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {focusAreas.map((area, i) => (
          <FocusCard key={area.title} area={area} index={i} />
        ))}
      </div>
    </section>
  )
}

// Bento focus card: brand/accent icon, animated gradient border + glow on hover.
function FocusCard({ area, index }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const { Icon } = getIcon(area.icon)
  const accent = area.accent

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 220, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 220, damping: 20 })

  const onMove = (e) => {
    if (!ref.current) return
    const r = ref.current.getBoundingClientRect()
    // pointer spotlight (px)
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`)
    ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
    if (reduced) return
    // tilt (0..1)
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      data-cursor
      className="group relative rounded-2xl"
    >
      <div className="glass relative h-full overflow-hidden rounded-2xl p-6 transition-colors duration-300 group-hover:border-white/20">
        <CornerBrackets color={accent} />
        <span
          style={reduced ? undefined : { transform: 'translateZ(28px)' }}
          className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03]"
        >
          <Icon style={{ color: accent }} className="h-6 w-6" />
        </span>

        <h3
          style={reduced ? undefined : { transform: 'translateZ(20px)' }}
          className="relative mt-5 text-lg font-bold text-white"
        >
          {area.title}
        </h3>
        <p className="relative mt-2 text-sm leading-relaxed text-zinc-400">{area.blurb}</p>
      </div>
    </motion.div>
  )
}

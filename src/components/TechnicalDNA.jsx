import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import Marquee from './Marquee'
import { stack, stackGroups as groups } from '../data/content'
import { getIcon } from '../data/icons'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function TechnicalDNA() {
  return (
    <section id="dna" className="relative py-28 md:py-40">
      <div className="mx-auto mb-16 max-w-6xl px-6">
        <SectionHeading index="01" eyebrow="Technical DNA" title="The" accent="stack." />
      </div>

      {/* Full-bleed infinite marquee ticker */}
      <Marquee />

      <div className="mx-auto mt-16 grid max-w-6xl gap-8 px-6 sm:grid-cols-2 lg:grid-cols-4">
        {groups.map((g, gi) => (
          <motion.div
            key={g.tier}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: gi * 0.1 }}
            className="perspective"
          >
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-zinc-500">
              {g.label}
            </p>
            <div className="flex flex-col gap-3">
              {stack
                .filter((s) => s.tier === g.tier)
                .map((s) => (
                  <SkillCard key={s.name} skill={s} />
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// Premium 3D-tilt logo card: real brand SVG, animated gradient border on hover,
// and a brand-coloured glow. Tilts toward the pointer.
function SkillCard({ skill }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const { Icon, color } = getIcon(skill.name)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 250, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 250, damping: 20 })

  const onMove = (e) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
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
      style={reduced ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
      data-cursor
      className="group relative rounded-xl"
    >
      <div className="glass relative flex items-center gap-4 rounded-xl p-4 transition-colors duration-300 group-hover:border-white/20">
        <span
          style={reduced ? undefined : { transform: 'translateZ(30px)' }}
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]"
        >
          <Icon style={{ color }} className="h-6 w-6 transition-transform duration-300 group-hover:scale-110" />
        </span>
        <div className="min-w-0" style={reduced ? undefined : { transform: 'translateZ(18px)' }}>
          <p className="text-sm font-semibold text-white">{skill.name}</p>
          <p className="truncate text-xs text-zinc-500 transition-colors group-hover:text-zinc-300">
            {skill.blurb}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

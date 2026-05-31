import { Suspense, lazy } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { profile, stats } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import TextReveal from './ui/TextReveal'
import MagneticButton from './ui/MagneticButton'
import Counter from './ui/Counter'
import ScrambleText from './ui/ScrambleText'

// The entire WebGL stack (three + fiber + drei) is code-split here.
const NodeGraph = lazy(() => import('./hero/NodeGraph'))

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  const reducedMotion = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll()

  // Layered parallax each depth plane moves at a different rate on scroll.
  const k = reducedMotion ? 0 : 1
  const yText = useTransform(scrollYProgress, [0, 0.25], [0, -120 * k])
  const yGlow = useTransform(scrollYProgress, [0, 0.3], [0, 160 * k])
  const yGrid = useTransform(scrollYProgress, [0, 0.3], [0, 80 * k])
  const scale3d = useTransform(scrollYProgress, [0, 0.3], [1, 1.15])
  const opacity = useTransform(scrollYProgress, [0, 0.22], [1, reducedMotion ? 1 : 0])

  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Layer 0 ambient grid (parallax) */}
      <motion.div
        style={{ y: yGrid }}
        className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:64px_64px] opacity-60"
      />
      {/* Layer 0b drifting gradient glow */}
      <motion.div
        style={{ y: yGlow }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 animate-pulse-glow rounded-full bg-neon-blue/20 blur-[120px]"
      />

      {/* Layer 1 the 3D cluster, lazy + suspended, scales on scroll */}
      <motion.div style={{ scale: scale3d }} className="absolute inset-0 -z-0">
        <Suspense fallback={<HeroFallback />}>
          <NodeGraph reducedMotion={reducedMotion} />
        </Suspense>
      </motion.div>

      {/* Layer 2 brutalist headline content (parallax + fade out) */}
      <motion.div
        style={{ y: yText, opacity }}
        className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 lg:grid-cols-[1.35fr_0.8fr]"
      >
        <div className="order-2 lg:order-1">
        <motion.p
          variants={fade}
          custom={0}
          initial="hidden"
          animate="show"
          className="eyebrow mb-6 flex items-center gap-3"
        >
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-neon-cyan" />
          <ScrambleText text={profile.tagline} />
        </motion.p>

        <h1 className="font-display text-display font-bold uppercase leading-[0.85] tracking-tighter text-white">
          <TextReveal text="Surya" delay={0.15} />
          <br />
          <span className="text-gradient">
            <TextReveal text="Prakash" delay={0.28} />
          </span>{' '}
          <TextReveal text="Kahar" delay={0.4} />
        </h1>

        <motion.p
          variants={fade}
          custom={3}
          initial="hidden"
          animate="show"
          className="mt-8 max-w-xl text-lg leading-relaxed text-zinc-400"
        >
          {profile.blurb}
        </motion.p>

        {/* CTAs magnetic */}
        <motion.div
          variants={fade}
          custom={4}
          initial="hidden"
          animate="show"
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="inline-block rounded-full bg-neon-gradient px-7 py-3.5 text-sm font-semibold text-void shadow-neon-glow"
          >
            View GitHub →
          </MagneticButton>
          <MagneticButton
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            strength={0.3}
            className="inline-block rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-neon-cyan hover:text-neon-cyan"
          >
            LinkedIn
          </MagneticButton>
        </motion.div>

        {/* Stats animated counters (3-second rule) */}
        <motion.dl
          variants={fade}
          custom={5}
          initial="hidden"
          animate="show"
          className="mt-14 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="glass relative overflow-hidden rounded-xl px-4 py-3"
            >
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/60 to-transparent" />
              <dt className="font-mono text-2xl font-bold text-white sm:text-3xl">
                <Counter value={s.value} eager />
              </dt>
              <dd className="mt-1 text-[10px] uppercase tracking-widest text-zinc-500">
                {s.label}
              </dd>
            </div>
          ))}
        </motion.dl>
        </div>

        <ProfilePortrait reducedMotion={reducedMotion} />
      </motion.div>

      {/* Scroll hint */}
      {!reducedMotion && (
        <motion.div
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="h-10 w-6 rounded-full border border-white/20 p-1">
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              className="h-2 w-1 rounded-full bg-neon-cyan"
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}

function HeroFallback() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="h-40 w-40 animate-float-slow rounded-full border border-neon-blue/30 bg-neon-blue/5 blur-sm" />
    </div>
  )
}

// Framed portrait with a rotating gradient ring, glow, glass frame, and an
// availability badge. Floats gently and lifts toward the pointer.
function ProfilePortrait({ reducedMotion }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reducedMotion ? undefined : { y: -8 }}
      className="order-1 mx-auto w-full max-w-[300px] lg:order-2 lg:mx-0 lg:max-w-none"
    >
      <div className={`relative ${reducedMotion ? '' : 'animate-float-slow'}`}>
        {/* rotating gradient ring */}
        <div className="absolute -inset-[3px] rounded-[2rem] p-[3px]">
          <div className="aurora h-full w-full rounded-[2rem] opacity-70 blur-[2px]" />
        </div>
        {/* ambient glow */}
        <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] bg-neon-purple/20 blur-3xl" />

        {/* glass frame + photo */}
        <div className="glass relative overflow-hidden rounded-[2rem] p-2">
          <img
            src={profile.avatar}
            alt={`Portrait of ${profile.name}`}
            width="635"
            height="659"
            loading="eager"
            decoding="async"
            className="aspect-square w-full rounded-[1.6rem] object-cover object-top"
          />
          {/* subtle scanline / gradient overlay for the sci-fi feel */}
          <div className="pointer-events-none absolute inset-2 rounded-[1.6rem] bg-gradient-to-t from-void/60 via-transparent to-transparent" />
        </div>

        {/* availability badge */}
        <div className="glass absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2">
          <span className="relative flex h-2 w-2">
            {!reducedMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
            )}
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs font-medium text-zinc-200">{profile.availability}</span>
        </div>
      </div>
    </motion.div>
  )
}

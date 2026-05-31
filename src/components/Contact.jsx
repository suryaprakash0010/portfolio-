import { motion } from 'framer-motion'
import { profile } from '../data/content'
import { getIcon } from '../data/icons'
import MagneticButton from './ui/MagneticButton'
import ScrambleText from './ui/ScrambleText'

const socials = [
  { label: 'GitHub', href: profile.links.github, icon: 'GitHub' },
  { label: 'LinkedIn', href: profile.links.linkedin, icon: 'LinkedIn' },
  { label: 'Resume', href: profile.links.resume, icon: 'Resume' },
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'Email' },
]

/**
 * Footer-based contact section. One big call to action, then identity + links.
 */
export default function Contact() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden border-t border-white/10 px-6 py-28 md:py-40"
    >
      {/* ambient glow + dot texture */}
      <div className="pointer-events-none absolute -bottom-32 left-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 rounded-full bg-neon-purple/15 blur-[120px]" />
      <div className="bg-dots pointer-events-none absolute inset-0 opacity-40" />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
        >
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="font-mono text-xs font-semibold text-neon-purple">/ 06</span>
            <ScrambleText text="Contact" />
          </p>
          <h2 className="max-w-3xl font-display text-display-sm font-bold leading-[0.95] tracking-tight text-white">
            Let's build something that <span className="text-shimmer">scales.</span>
          </h2>

          <MagneticButton
            href={`mailto:${profile.email}`}
            strength={0.25}
            className="group mt-10 inline-flex items-center gap-3 font-mono text-lg text-neon-cyan md:text-2xl"
          >
            <span className="link-underline">{profile.email}</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
          </MagneticButton>
        </motion.div>

        {/* identity + socials */}
        <div className="mt-16 flex flex-col gap-8 border-t border-white/10 pt-8 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="relative">
              <span className="absolute -inset-1 rounded-full bg-neon-gradient opacity-40 blur-md" />
              <img
                src={profile.avatar}
                alt={profile.name}
                width="635"
                height="659"
                loading="lazy"
                decoding="async"
                className="relative h-14 w-14 shrink-0 rounded-full border border-white/15 object-cover object-top"
              />
            </span>
            <div>
              <p className="font-semibold text-zinc-200">{profile.name}</p>
              <p className="mt-1">{profile.location}</p>
              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="mt-1 block font-mono text-xs transition-colors hover:text-white"
              >
                {profile.phone}
              </a>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {socials.map((s) => {
              const { Icon, color } = getIcon(s.icon)
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noreferrer"
                  className="glass group flex items-center gap-2 rounded-full px-4 py-2 text-zinc-300 transition-colors hover:text-white"
                >
                  <Icon style={{ color }} className="h-4 w-4" />
                  {s.label}
                </a>
              )
            })}
          </div>
        </div>

        <p className="mt-12 font-mono text-xs text-zinc-700">
          © {profile.name} · Designed & built with React, Framer Motion
        </p>
      </div>
    </footer>
  )
}

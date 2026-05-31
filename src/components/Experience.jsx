import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'
import TechBadge from './ui/TechBadge'
import { experience } from '../data/content'

/**
 * Vertical timeline of roles. A neon spine runs down the left with a glowing
 * node per role; each role is a glass spotlight card.
 */
export default function Experience() {
  return (
    <section id="experience" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading index="03" eyebrow="Experience" title="Where I've" accent="worked." />

      <div className="relative mt-4">
        {/* spine */}
        <div className="absolute bottom-2 left-[7px] top-2 w-px bg-gradient-to-b from-neon-cyan/60 via-neon-purple/40 to-transparent md:left-[9px]" />

        <div className="flex flex-col gap-8">
          {experience.map((job, i) => (
            <div key={job.id} className="relative pl-10 md:pl-16">
              {/* node */}
              <span className="absolute left-0 top-6 flex h-[18px] w-[18px] items-center justify-center md:h-[22px] md:w-[22px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-cyan/40" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-neon-cyan shadow-neon-glow md:h-3 md:w-3" />
              </span>

              <SpotlightCard accent="#22d3ee" index={i}>
                <div className="p-6 md:p-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-display text-xl font-bold text-white md:text-2xl">
                      {job.role} <span className="text-gradient">· {job.org}</span>
                    </h3>
                    <span className="font-mono text-xs text-zinc-500">
                      {job.period} · {job.location}
                    </span>
                  </div>

                  <ul className="mt-4 flex flex-col gap-2.5">
                    {job.points.map((p, j) => (
                      <li key={j} className="flex gap-3 text-sm leading-relaxed text-zinc-400">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-neon-purple" />
                        {p}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {job.tags.map((t) => (
                      <TechBadge key={t} name={t} />
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

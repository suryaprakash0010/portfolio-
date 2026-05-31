import SectionHeading from './ui/SectionHeading'
import SpotlightCard from './ui/SpotlightCard'
import Counter from './ui/Counter'
import { profile, education, achievements, certifications } from '../data/content'
import { getIcon } from '../data/icons'

/**
 * Credibility signals: education, competitive-programming achievements, and
 * certifications the proof layer recruiters scan after the projects.
 */
export default function Credentials() {
  return (
    <section id="credentials" className="relative mx-auto max-w-6xl px-6 py-28 md:py-40">
      <SectionHeading index="05" eyebrow="Proof" title="Education &" accent="signals." />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Education */}
        <SpotlightCard accent="#22d3ee" brackets index={0} className="lg:col-span-1">
          <div className="p-6">
            <p className="eyebrow mb-4">Education</p>
            <h3 className="font-display text-lg font-bold leading-snug text-white">
              {education.school}
            </h3>
            <p className="mt-2 text-sm text-zinc-400">{education.degree}</p>
            <p className="mt-3 inline-block rounded-full bg-neon-gradient px-3 py-1 text-xs font-semibold text-void">
              {education.detail}
            </p>
            <p className="mt-4 font-mono text-xs text-zinc-500">
              {education.period} · {education.location}
            </p>

            {education.coursework?.length > 0 && (
              <div className="mt-5 border-t border-white/10 pt-4">
                <p className="mb-3 font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                  Relevant Coursework
                </p>
                <ul className="flex flex-wrap gap-2">
                  {education.coursework.map((c) => (
                    <li
                      key={c}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-zinc-400"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </SpotlightCard>

        {/* Achievements */}
        <div className="grid grid-cols-2 gap-6 lg:col-span-2">
          {achievements.map((a, i) => (
            <SpotlightCard key={a.label} accent="#a855f7" index={i + 1}>
              <div className="flex h-full flex-col justify-center p-6">
                <span className="font-display text-4xl font-bold text-shimmer md:text-5xl">
                  <Counter value={a.value} />
                </span>
                <p className="mt-3 text-sm font-semibold text-white">{a.label}</p>
                <p className="mt-1 text-xs text-zinc-500">{a.note}</p>
              </div>
            </SpotlightCard>
          ))}

          {/* Certifications */}
          <SpotlightCard accent="#3b82f6" index={3} className="col-span-2">
            <div className="p-6">
              <p className="eyebrow mb-4">Certifications</p>
              <ul className="grid gap-4 sm:grid-cols-3">
                {certifications.map((c) => {
                  const { Icon, color } = getIcon(c.issuer)
                  return (
                    <li
                      key={c.name}
                      className="flex flex-col gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-4"
                    >
                      <div className="flex items-center gap-2">
                        <Icon style={{ color }} className="h-4 w-4" />
                        <span className="font-mono text-xs text-zinc-500">{c.issuer}</span>
                      </div>
                      <span className="text-sm font-medium text-zinc-200">{c.name}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </SpotlightCard>
        </div>
      </div>

      {/* GitHub activity proof */}
      <div className="mt-6">
        <SpotlightCard accent="#a855f7" brackets index={4}>
          <div className="p-6">
            <div className="mb-5 flex items-center justify-between gap-3">
              <p className="eyebrow">GitHub Activity</p>
              <a
                href={profile.links.github}
                target="_blank"
                rel="noreferrer"
                className="link-underline font-mono text-xs text-zinc-400 transition-colors hover:text-white"
              >
                @suryaprakash0010 ↗
              </a>
            </div>
            <div className="grid items-center gap-6 md:grid-cols-2">
              <img
                src="https://github-readme-stats.vercel.app/api?username=suryaprakash0010&show_icons=true&hide_border=true&hide_title=true&bg_color=00000000&icon_color=a855f7&text_color=a1a1aa&ring_color=22d3ee"
                alt="GitHub statistics for suryaprakash0010 — stars, commits, PRs and contributions"
                loading="lazy"
                decoding="async"
                className="w-full"
              />
              <img
                src="https://github-readme-stats.vercel.app/api/top-langs/?username=suryaprakash0010&layout=compact&hide_border=true&bg_color=00000000&title_color=22d3ee&text_color=a1a1aa"
                alt="Most-used programming languages on GitHub for suryaprakash0010"
                loading="lazy"
                decoding="async"
                className="w-full"
              />
            </div>
          </div>
        </SpotlightCard>
      </div>
    </section>
  )
}

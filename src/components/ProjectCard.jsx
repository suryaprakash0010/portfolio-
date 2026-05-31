import SpotlightCard from './ui/SpotlightCard'
import FlowDiagram from './FlowDiagram'
import TechBadge from './ui/TechBadge'

/**
 * A single project case study.
 * Left: summary + the engineering challenge + impact + stack.
 * Right: an always-on live "system map" of the architecture.
 */
export default function ProjectCard({ project, index }) {
  const {
    title,
    kind,
    year,
    summary,
    challenge,
    impact,
    stack,
    flow,
    links,
    accentHex,
  } = project

  return (
    <SpotlightCard accent={accentHex} brackets index={index} tabIndex={0}>
      <div className="relative p-6 md:p-9">
        {/* giant ghost index */}
        <span className="pointer-events-none absolute right-5 top-2 select-none font-display text-7xl font-bold leading-none text-white/[0.04] md:text-8xl">
          0{index + 1}
        </span>

        <div className="relative grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
          {/* ── Text column ── */}
          <div className="min-w-0">
            <div className="mb-4 flex items-center gap-3">
              <span className="eyebrow" style={{ color: accentHex }}>
                {kind}
              </span>
              <span className="text-xs text-zinc-600">·</span>
              <span className="font-mono text-xs text-zinc-500">{year}</span>
            </div>

            <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-[2rem]">
              {title}
            </h3>

            <p className="mt-3 max-w-prose text-sm leading-relaxed text-zinc-400">{summary}</p>

            {/* Challenge the engineering story */}
            <p className="mt-4 max-w-prose border-l-2 pl-4 text-sm leading-relaxed text-zinc-500"
               style={{ borderColor: `${accentHex}66` }}>
              <span className="font-semibold text-zinc-200">Hard part </span>
              {challenge}
            </p>

            {/* Impact chips */}
            <ul className="mt-5 flex flex-wrap gap-2">
              {impact.map((it) => (
                <li
                  key={it}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-zinc-300 transition-colors group-hover:border-white/20"
                >
                  {it}
                </li>
              ))}
            </ul>

            {/* Stack + links */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                {stack.map((t) => (
                  <TechBadge key={t} name={t} bare />
                ))}
              </div>
              <div className="flex gap-4 text-sm font-semibold">
                {links.live && (
                  <a
                    href={links.live}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-white hover:text-neon-cyan"
                  >
                    View Live ↗
                  </a>
                )}
                {links.repo && (
                  <a
                    href={links.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="link-underline text-zinc-300 hover:text-neon-purple"
                  >
                    Repo ↗
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* ── Live system map (always on) ── */}
          <div className="w-full md:w-[340px]">
            <div className="overflow-hidden rounded-xl border border-white/10 bg-void/50">
              {/* panel header */}
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
                <span className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span
                      className="absolute inline-flex h-full w-full animate-ping rounded-full"
                      style={{ background: accentHex }}
                    />
                    <span
                      className="relative inline-flex h-1.5 w-1.5 rounded-full"
                      style={{ background: accentHex }}
                    />
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-400">
                    Architecture
                  </span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-600">
                  live flow
                </span>
              </div>
              {/* diagram */}
              <div className="h-[128px] bg-grid-faint bg-[size:20px_20px] p-1">
                <FlowDiagram flow={flow} accent={accentHex} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SpotlightCard>
  )
}

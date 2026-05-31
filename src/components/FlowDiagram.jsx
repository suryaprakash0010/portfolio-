import { motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

// ─────────────────────────────────────────────────────────────────────────────
// Compact, always-on system map for a project card. Nodes sit on a horizontal
// rail; edges carry a continuously flowing "current" (animated dashes) in the
// project's accent colour. Rails + nodes draw themselves in on scroll. No hover
// gate the architecture is visible by default.
// ─────────────────────────────────────────────────────────────────────────────

const W = 320
const H = 116
const PAD = 30

export default function FlowDiagram({ flow, accent = '#22d3ee' }) {
  const reduced = usePrefersReducedMotion()
  const { nodes, edges, caption } = flow
  const step = (W - PAD * 2) / Math.max(nodes.length - 1, 1)
  const y = 42
  const pos = Object.fromEntries(nodes.map((n, i) => [n, { x: PAD + step * i, y }]))
  const gid = `flow-${caption.replace(/\W/g, '').slice(0, 8)}`

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-full w-full"
      role="img"
      aria-label={`Architecture: ${caption}`}
    >
      {/* Edges */}
      {edges.map(([a, b], i) => {
        const p = pos[a]
        const q = pos[b]
        if (!p || !q) return null
        const d = `M ${p.x} ${p.y} L ${q.x} ${q.y}`
        return (
          <g key={`${a}-${b}`}>
            {/* faint base rail draws in */}
            <motion.path
              d={d}
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            />
            {/* flowing current */}
            <motion.path
              d={d}
              stroke={`url(#${gid})`}
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeDasharray="2 11"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.08 }}
              animate={reduced ? undefined : { strokeDashoffset: [0, -26] }}
              {...(reduced
                ? {}
                : {
                    transition: {
                      strokeDashoffset: { repeat: Infinity, duration: 0.9, ease: 'linear' },
                    },
                  })}
            />
          </g>
        )
      })}

      {/* Nodes */}
      {nodes.map((n, i) => {
        const p = pos[n]
        return (
          <motion.g
            key={n}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            style={{ transformOrigin: `${p.x}px ${p.y}px` }}
          >
            {/* pulsing halo */}
            {!reduced && (
              <motion.circle
                cx={p.x}
                cy={p.y}
                r="6"
                fill="none"
                stroke={accent}
                strokeOpacity="0.5"
                animate={{ r: [6, 11, 6], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.25 }}
              />
            )}
            <circle cx={p.x} cy={p.y} r="5" fill={accent} />
            <circle cx={p.x} cy={p.y} r="2" fill="#050505" />
            <text
              x={p.x}
              y={p.y + 20}
              textAnchor="middle"
              className="fill-zinc-400 font-mono"
              style={{ fontSize: 7.5 }}
            >
              {n}
            </text>
          </motion.g>
        )
      })}

      {/* Caption */}
      <text
        x={W / 2}
        y={H - 6}
        textAnchor="middle"
        className="fill-zinc-500 font-mono"
        style={{ fontSize: 7.5 }}
      >
        {caption}
      </text>

      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  )
}

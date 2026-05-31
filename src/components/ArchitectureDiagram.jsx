import { motion } from 'framer-motion'
import { referenceArchitecture as arch } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

// A live reference architecture: layered nodes with animated "data flow" on the
// edges (moving dashes). Self-contained SVG so it scales responsively and adds
// almost no DOM. Illustrates the kind of backend I like to design.

const TONE = {
  cyan: '#22d3ee',
  blue: '#3b82f6',
  purple: '#a855f7',
  red: '#FF4438',
}

const byId = Object.fromEntries(arch.nodes.map((n) => [n.id, n]))

function edgePath(a, b) {
  const sx = a.x + a.w / 2
  const sy = a.y + a.h
  const tx = b.x + b.w / 2
  const ty = b.y
  const midY = (sy + ty) / 2
  return `M ${sx} ${sy} C ${sx} ${midY} ${tx} ${midY} ${tx} ${ty}`
}

export default function ArchitectureDiagram() {
  const reduced = usePrefersReducedMotion()

  return (
    <svg
      viewBox="0 0 880 430"
      className="h-full w-full"
      role="img"
      aria-label="Reference backend architecture: client through load balancer, API gateway, services, cache, database and Raft store"
    >
      {/* Edges */}
      {arch.edges.map(([from, to], i) => {
        const d = edgePath(byId[from], byId[to])
        return (
          <g key={`${from}-${to}`}>
            {/* faint base rail, draws in on scroll */}
            <motion.path
              d={d}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.06 }}
            />
            {/* flowing current */}
            <motion.path
              d={d}
              fill="none"
              stroke="url(#archFlow)"
              strokeWidth="2"
              strokeDasharray="3 12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.06 }}
              animate={reduced ? undefined : { strokeDashoffset: [0, -30] }}
              {...(reduced
                ? {}
                : { transition: { strokeDashoffset: { repeat: Infinity, duration: 1, ease: 'linear' } } })}
            />
          </g>
        )
      })}

      {/* Nodes */}
      {arch.nodes.map((n, i) => {
        const color = TONE[n.tone]
        return (
          <motion.g
            key={n.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <rect
              x={n.x}
              y={n.y}
              width={n.w}
              height={n.h}
              rx="10"
              fill="rgba(10,10,15,0.85)"
              stroke={color}
              strokeOpacity="0.55"
              strokeWidth="1.2"
            />
            {/* accent dot */}
            <circle cx={n.x + 16} cy={n.y + n.h / 2} r="3.5" fill={color} />
            <text
              x={n.x + n.w / 2 + 8}
              y={n.y + n.h / 2 + 4}
              textAnchor="middle"
              className="fill-zinc-200 font-sans"
              style={{ fontSize: 13, fontWeight: 600 }}
            >
              {n.label}
            </text>
          </motion.g>
        )
      })}

      <defs>
        <linearGradient id="archFlow" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
    </svg>
  )
}

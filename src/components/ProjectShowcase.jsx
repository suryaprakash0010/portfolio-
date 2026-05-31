import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SectionHeading from './ui/SectionHeading'
import ProjectCard from './ProjectCard'
import { projects } from '../data/content'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

/**
 * "The Work" three case studies presented as a sticky stacking deck.
 * Each card pins to the top (at a stepped offset) and scales/dims as you keep
 * scrolling, so the next card slides up and stacks over it. On mobile the
 * stacking is dropped for a clean vertical column.
 */
export default function ProjectShowcase() {
  return (
    <section id="work" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="04" eyebrow="The Work" title="Systems I've" accent="shipped." />
      </div>

      <div className="mx-auto max-w-6xl">
        {projects.map((project, i) => (
          <StickyCard key={project.id} project={project} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  )
}

function StickyCard({ project, index, total }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  // Previous cards shrink + dim slightly as the next one rises over them.
  // (Only transform + opacity both GPU-composited, so the sticky stack stays
  // smooth. No scroll-driven blur filter, which would repaint every frame.)
  const isLast = index === total - 1
  const scale = useTransform(scrollYProgress, [0, 1], [1, reduced || isLast ? 1 : 0.93])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, reduced || isLast ? 1 : 0.6])

  return (
    <div ref={ref} className="md:h-[82vh]">
      <div
        className="md:sticky"
        style={{ top: `${96 + index * 26}px` }}
      >
        <motion.div
          style={reduced ? undefined : { scale, opacity }}
          className="origin-top pb-6 md:pb-0 will-change-transform"
        >
          <ProjectCard project={project} index={index} />
        </motion.div>
      </div>
    </div>
  )
}

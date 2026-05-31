import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

const CHARS = '!<>-_\\/[]{}—=+*^?#________01'

/**
 * "Decrypt" text effect: characters scramble through random glyphs and then
 * resolve to the final string, left-to-right. Fires once when scrolled into
 * view. Reduced-motion shows the final text immediately.
 */
export default function ScrambleText({ text, className = '', speed = 1 }) {
  const reduced = usePrefersReducedMotion()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-15%' })
  const [display, setDisplay] = useState(reduced ? text : '')
  const raf = useRef(0)

  useEffect(() => {
    if (reduced || !inView) {
      if (reduced) setDisplay(text)
      return
    }
    let frame = 0
    const total = text.length * 3
    const tick = () => {
      const progress = frame / total
      const revealed = Math.floor(progress * text.length)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        if (text[i] === ' ') out += ' '
        else if (i < revealed) out += text[i]
        else out += CHARS[(Math.random() * CHARS.length) | 0]
      }
      setDisplay(out)
      frame += speed
      if (frame <= total) raf.current = requestAnimationFrame(tick)
      else setDisplay(text)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [inView, text, reduced, speed])

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display || ' '}
    </span>
  )
}

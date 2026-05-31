import { useEffect } from 'react'
import Lenis from 'lenis'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Momentum smooth-scrolling via Lenis. Lenis drives the *real* native scroll
 * position on a rAF loop, so position:sticky, fixed layers and framer-motion's
 * useScroll all keep working it just eases the wheel/touch delta so scrolling
 * glides instead of stepping (a big win for Windows mouse wheels).
 *
 * Disabled entirely under prefers-reduced-motion. Anchor links (`#id`) are
 * intercepted and animated through Lenis.
 */
export function useSmoothScroll() {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      duration: 1.05,
      // gentle exponential ease-out buttery without feeling floaty
      easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    })

    let rafId
    const loop = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    // Smooth anchor navigation.
    const onClick = (e) => {
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const hash = link.getAttribute('href')
      if (!hash || hash.length < 2) return
      const target = document.querySelector(hash)
      if (!target) return
      e.preventDefault()
      lenis.scrollTo(target, { offset: -72 })
    }
    document.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('click', onClick)
      lenis.destroy()
    }
  }, [reduced])
}

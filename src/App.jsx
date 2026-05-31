import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechnicalDNA from './components/TechnicalDNA'
import SystemDesign from './components/SystemDesign'
import Experience from './components/Experience'
import ProjectShowcase from './components/ProjectShowcase'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import ScrollProgress from './components/ScrollProgress'
import Cursor from './components/Cursor'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { useSmoothScroll } from './hooks/useSmoothScroll'

// Persistent travel scene is code-split it streams in after first paint.
const ImmersiveBackground = lazy(() => import('./components/ImmersiveBackground'))

export default function App() {
  const reducedMotion = usePrefersReducedMotion()
  useSmoothScroll()

  return (
    <div className="grain relative min-h-screen bg-void text-zinc-200">
      {/* Layer -1: persistent 3D travel corridor behind the entire page */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
        <Suspense fallback={null}>
          <ImmersiveBackground reducedMotion={reducedMotion} />
        </Suspense>
      </div>

      {/* Layer 1: pointer-following spotlight wash */}
      <div className="spotlight pointer-events-none fixed inset-0 z-[1]" aria-hidden />

      <ScrollProgress />
      <Cursor />
      <Navbar />

      <main className="relative z-[2]">
        <Hero />
        <TechnicalDNA />
        <SystemDesign />
        <Experience />
        <ProjectShowcase />
        <Credentials />
        <Contact />
      </main>
    </div>
  )
}

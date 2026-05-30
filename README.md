# Surya Prakash Kahar Portfolio

A "digital universe" portfolio: sci-fi dark mode, glassmorphism, an interactive
3D distributed-system cluster, and motion that stays out of the way of the content.

**Stack:** React 18 · Vite 5 · Tailwind CSS 3 · Framer Motion 11 · React-Three-Fiber (Three.js)

```bash
npm install --include=dev   # this env defaults NODE_ENV=production; force dev deps
npm run dev                 # local dev server
npm run build               # production build -> dist/
npm run preview             # serve the built bundle
```

> **First thing to edit:** `src/data/content.js` all copy, links (GitHub/LinkedIn/),
> and project details live there. Replace the placeholder `github.com/your-handle`
> URLs and drop a `.pdf` into `public/`.

---

## 1. Component hierarchy / wireframe

```
App
├── Navbar                 fixed; turns to glass bar after scroll
└── main
    ├── Hero  ◀ #hero       100svh, brutalist type + lazy 3D
    │   ├── ambient grid + radial glow      (layer 0, CSS only)
    │   ├── <Suspense> → NodeGraph          (layer 1, code-split WebGL)
    │   │     └── Canvas (R3F)
    │   │           └── Cluster             InstancedMesh nodes + LineSegments edges
    │   ├── headline / tagline / CTAs        (layer 2, Framer stagger)
    │   ├── stat strip                       850k+ · 5-node · 100% ACID  (3-second rule)
    │   └── scroll hint
    ├── TechnicalDNA  ◀ #dna
    │   └── 3 groups (Core / Data / Infra)
    │         └── SkillCard × n              hover reveals one-line blurb
    ├── ProjectShowcase  ◀ #work
    │   └── ProjectCard × 3
    │         ├── text: summary · hard-part · impact chips · stack · links
    │         └── FlowDiagram                inline-SVG system design, reveals on hover/focus
    └── Contact  ◀ #contact                  footer: email CTA, location, socials

Shared:
  ui/GlassCard          single glassmorphism surface (motion-wrapped)
  ui/SectionHeading     mono eyebrow + heavy display title
  hooks/usePrefersReducedMotion   kills 3D loop + parallax when requested
  data/content.js       single source of truth for all copy
```

---

## 2. Performance model

| Decision | Why |
|---|---|
| `React.lazy` + `manualChunks` for the WebGL stack | 350 KB of Three.js never blocks first paint; it streams behind a CSS fallback |
| One `InstancedMesh` + one `LineSegments` for the whole cluster | ~3 draw calls instead of one per node/edge |
| `dpr={[1, 1.75]}` cap | high-DPI screens don't render at 4× cost |
| `frameloop="demand"` under reduced-motion | render loop fully pauses zero idle GPU/battery |
| FlowDiagrams are inline SVG | no image requests; minimal extra DOM |
| All copy in one data module | re-skin / reorder without touching animation code |

---

## 3. "Brutal decisions" what was cut to stay premium & fast

- **One 3D object, not many.** A single hero cluster. No spinning models per
  section WebGL is paid for once and code-split.
- **No skill bars / percentage meters.** They read as junior. The stack is
  grouped as a *system* (Core / Data / Infra) with one-line context each.
- **Architecture over adjectives.** Each project shows a real flow diagram on
  hover instead of a paragraph of buzzwords.
- **No carousel, no testimonials, no blog.** Recruiters want signal: who, what,
  scale. Everything else is friction.
- **No web fonts loaded over the network for body text.** System/variable fonts
  keep the critical path empty. (Add Inter/JetBrains Mono via `@fontsource`
  only if you want the exact look see note below.)
- **`once: true` on every scroll animation.** Things animate in, then stay put —
  no re-triggering jank on scroll-up.
- **Reduced-motion is a first-class path,** not an afterthought accessibility
  and a battery win.

### Optional polish
- Drop in `@fontsource/inter` + `@fontsource/jetbrains-mono` and import in
  `main.jsx` for the exact brutalist type (currently using system fallbacks).
- Add a real `.pdf` and OG share image in `public/`.
- Wire the project `repo` / `live` links in `src/data/content.js`.

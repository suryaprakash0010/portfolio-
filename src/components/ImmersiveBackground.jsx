import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────────────────
// A persistent, full-page depth scene that makes scrolling feel like travelling
// *through* something a corridor of glowing pillars (the "forest / structure")
// plus a drifting particle field. Speed scales with scroll velocity, so flicking
// down the page accelerates the descent. Fog fades distance into pure black.
//
// Cheap: one Points cloud + one InstancedMesh of pillars (~2 draw calls).
// ─────────────────────────────────────────────────────────────────────────────

const PARTICLES = 700
const PILLARS = 16
const DEPTH = 90 // how far back the corridor extends
const NEAR = 8 // recycle point once it passes the camera

function Travel({ reducedMotion }) {
  const pointsRef = useRef()
  const pillarsRef = useRef()
  const lastScroll = useRef(0)
  const vel = useRef(0)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Particle cloud positions + per-point colour (cyan → purple by radius).
  const { positions, colors, particleZ } = useMemo(() => {
    const pos = new Float32Array(PARTICLES * 3)
    const col = new Float32Array(PARTICLES * 3)
    const z = new Float32Array(PARTICLES)
    const cyan = new THREE.Color('#22d3ee')
    const purple = new THREE.Color('#a855f7')
    for (let i = 0; i < PARTICLES; i++) {
      const radius = 3 + Math.random() * 16
      const angle = Math.random() * Math.PI * 2
      pos[i * 3] = Math.cos(angle) * radius
      pos[i * 3 + 1] = Math.sin(angle) * radius
      pos[i * 3 + 2] = -Math.random() * DEPTH
      z[i] = pos[i * 3 + 2]
      const c = cyan.clone().lerp(purple, Math.random())
      col[i * 3] = c.r
      col[i * 3 + 1] = c.g
      col[i * 3 + 2] = c.b
    }
    return { positions: pos, colors: col, particleZ: z }
  }, [])

  // Pillar transforms tall thin glowing columns arranged around the corridor.
  const pillars = useMemo(() => {
    const arr = []
    for (let i = 0; i < PILLARS; i++) {
      const radius = 9 + Math.random() * 9
      const angle = Math.random() * Math.PI * 2
      arr.push({
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius * 0.6,
        z: -Math.random() * DEPTH,
        h: 14 + Math.random() * 26,
      })
    }
    return arr
  }, [])

  // Place pillars once after mount (ref is attached by now). This also covers
  // the reduced-motion path, where no animation frame ever runs.
  useEffect(() => {
    if (!pillarsRef.current) return
    pillars.forEach((p, i) => {
      dummy.position.set(p.x, p.y, p.z)
      dummy.scale.set(0.12, p.h, 0.12)
      dummy.updateMatrix()
      pillarsRef.current.setMatrixAt(i, dummy.matrix)
    })
    pillarsRef.current.instanceMatrix.needsUpdate = true
  }, [pillars, dummy])

  useFrame((_, delta) => {
    if (reducedMotion) return
    const d = Math.min(delta, 0.05)

    // Smooth scroll velocity → boosts travel speed.
    const y = window.scrollY
    const raw = Math.abs(y - lastScroll.current)
    lastScroll.current = y
    vel.current += (Math.min(raw * 0.05, 30) - vel.current) * 0.08
    const speed = (6 + vel.current) * d

    // Move particles toward the camera; recycle past NEAR back to -DEPTH.
    const pos = pointsRef.current.geometry.attributes.position
    for (let i = 0; i < PARTICLES; i++) {
      let z = pos.array[i * 3 + 2] + speed
      if (z > NEAR) z -= DEPTH
      pos.array[i * 3 + 2] = z
    }
    pos.needsUpdate = true

    // Move pillars likewise.
    pillars.forEach((p, i) => {
      p.z += speed
      if (p.z > NEAR) p.z -= DEPTH
      dummy.position.set(p.x, p.y, p.z)
      dummy.scale.set(0.12, p.h, 0.12)
      dummy.updateMatrix()
      pillarsRef.current.setMatrixAt(i, dummy.matrix)
    })
    pillarsRef.current.instanceMatrix.needsUpdate = true

    // Subtle drift of the whole field for parallax life.
    pointsRef.current.rotation.z += d * 0.02
  })

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLES}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={PARTICLES}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.12}
          sizeAttenuation
          vertexColors
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <instancedMesh ref={pillarsRef} args={[null, null, PILLARS]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial
          color="#3b82f6"
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </instancedMesh>
    </group>
  )
}

export default function ImmersiveBackground({ reducedMotion = false }) {
  return (
    <Canvas
      dpr={[1, 1.25]}
      camera={{ position: [0, 0, 8], fov: 70 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      {/* Fog dissolves the far end of the corridor into the void. */}
      <fog attach="fog" args={['#050505', 12, 70]} />
      <Travel reducedMotion={reducedMotion} />
    </Canvas>
  )
}

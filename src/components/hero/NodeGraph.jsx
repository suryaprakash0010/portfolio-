import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ─────────────────────────────────────────────────────────────────────────────
// A glowing "distributed system cluster": nodes laid out on a Fibonacci sphere,
// each linked to its nearest neighbours. One InstancedMesh for all nodes and one
// LineSegments for all edges → the entire object is ~3 draw calls, not 100s.
// ─────────────────────────────────────────────────────────────────────────────

const NODE_COUNT = 46
const NEIGHBOURS = 3
const RADIUS = 2.6

// Deterministic, evenly-distributed points on a sphere (golden-angle spiral).
function fibonacciSphere(count, radius) {
  const points = []
  const golden = Math.PI * (3 - Math.sqrt(5))
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    points.push(
      new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius)
    )
  }
  return points
}

function Cluster({ reducedMotion }) {
  const group = useRef()
  const nodesRef = useRef()
  const pointer = useRef({ x: 0, y: 0 })

  // Build geometry once. Nodes + edges are derived from the same point set.
  const { points, edgePositions, dummy } = useMemo(() => {
    const pts = fibonacciSphere(NODE_COUNT, RADIUS)
    const edges = []
    pts.forEach((p, i) => {
      // find nearest neighbours for this node
      const nearest = pts
        .map((q, j) => ({ j, d: p.distanceToSquared(q) }))
        .filter((o) => o.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, NEIGHBOURS)
      nearest.forEach(({ j }) => {
        if (j > i) edges.push(p.x, p.y, p.z, pts[j].x, pts[j].y, pts[j].z)
      })
    })
    return {
      points: pts,
      edgePositions: new Float32Array(edges),
      dummy: new THREE.Object3D(),
    }
  }, [])

  // Place each instanced node once.
  useMemo(() => {
    if (!nodesRef.current) return
    points.forEach((p, i) => {
      dummy.position.copy(p)
      dummy.updateMatrix()
      nodesRef.current.setMatrixAt(i, dummy.matrix)
    })
    nodesRef.current.instanceMatrix.needsUpdate = true
  }, [points, dummy])

  useFrame((state, delta) => {
    if (!group.current) return
    if (reducedMotion) return
    // Slow auto-rotation + subtle parallax toward the pointer.
    group.current.rotation.y += delta * 0.12
    pointer.current.x += (state.pointer.x * 0.35 - pointer.current.x) * 0.05
    pointer.current.y += (state.pointer.y * 0.25 - pointer.current.y) * 0.05
    group.current.rotation.x = pointer.current.y
    group.current.rotation.z = pointer.current.x * 0.15
  })

  return (
    <group ref={group}>
      {/* Edges: one draw call for the whole mesh of connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={edgePositions.length / 3}
            array={edgePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#3b82f6" transparent opacity={0.22} />
      </lineSegments>

      {/* Nodes: one InstancedMesh for all spheres */}
      <instancedMesh ref={nodesRef} args={[null, null, NODE_COUNT]}>
        <icosahedronGeometry args={[0.07, 1]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#3b82f6"
          emissiveIntensity={1.8}
          roughness={0.3}
          metalness={0.1}
        />
      </instancedMesh>

      {/* Faint inner core for depth */}
      <mesh>
        <icosahedronGeometry args={[RADIUS * 0.4, 1]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  )
}

export default function NodeGraph({ reducedMotion = false }) {
  return (
    <Canvas
      // dpr capped so high-density displays don't tank the frame budget.
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      // Pause the render loop entirely when reduced motion is requested.
      frameloop={reducedMotion ? 'demand' : 'always'}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#a855f7" />
      <pointLight position={[-5, -3, 2]} intensity={0.8} color="#22d3ee" />
      <Cluster reducedMotion={reducedMotion} />
    </Canvas>
  )
}

// @ts-nocheck
'use client'

import { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, Html } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import {
  GLOBE_VERTEX_SHADER,
  GLOBE_FRAGMENT_SHADER,
  ATMOSPHERE_VERTEX_SHADER,
  ATMOSPHERE_FRAGMENT_SHADER,
  CLOUD_FRAGMENT_SHADER,
} from './shaders'
import { INDIA_HOTSPOTS, latLonToVector3, type Hotspot } from '@/lib/globe-data'

const SUN_DIR = new THREE.Vector3(4.5, 1.0, -1.8).normalize()

// ── Real Earth texture URLs (jsdelivr CDN — CORS safe) ────────
const TEX = {
  day:    'https://cdn.jsdelivr.net/npm/three-globe@2/example/img/earth-day.jpg',
  night:  'https://cdn.jsdelivr.net/npm/three-globe@2/example/img/earth-night.jpg',
  spec:   'https://cdn.jsdelivr.net/npm/three-globe@2/example/img/earth-water.png',
  clouds: 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r128/examples/textures/planets/earth_clouds_1024.png',
}

// ── India border polygon [lat, lon] ───────────────────────────
const INDIA_BORDER: [number, number][] = [
  [37.1, 73.9], [36.9, 76.5], [35.5, 78.7], [34.7, 78.9],
  [33.0, 79.5], [31.5, 80.2], [30.4, 80.1], [29.6, 82.0],
  [28.8, 83.5], [28.2, 85.1], [27.9, 87.1], [27.5, 89.1],
  [27.1, 91.6], [27.5, 92.8], [27.3, 95.1], [28.1, 97.3],
  [27.6, 96.2], [26.8, 95.1], [26.5, 93.2], [25.9, 92.0],
  [25.2, 90.5], [25.6, 89.8], [25.3, 89.4], [23.6, 91.2],
  [22.9, 91.6], [22.5, 91.0], [21.8, 88.5], [20.5, 87.0],
  [19.9, 86.4], [18.8, 84.5], [17.8, 83.2], [17.0, 82.3],
  [16.4, 81.1], [15.5, 80.2], [14.5, 80.0], [13.4, 80.1],
  [12.6, 80.2], [11.5, 79.8], [10.3, 79.6], [ 9.1, 78.1],
  [ 8.1, 77.6], [ 7.7, 77.7], [ 8.0, 77.1], [ 8.4, 77.1],
  [ 8.7, 76.7], [ 9.5, 76.3], [10.5, 76.0], [11.6, 75.2],
  [12.4, 74.7], [13.5, 74.5], [14.8, 74.1], [15.6, 73.8],
  [16.4, 73.5], [17.4, 73.2], [18.3, 73.0], [19.3, 72.8],
  [20.4, 72.8], [21.3, 72.6], [21.6, 71.0], [22.0, 72.1],
  [22.5, 69.2], [23.0, 68.2], [24.3, 68.8], [24.6, 67.9],
  [23.9, 68.3], [22.8, 68.9], [21.9, 69.6], [23.5, 70.1],
  [24.3, 70.0], [25.5, 70.4], [26.6, 70.3], [27.4, 70.6],
  [28.3, 70.6], [29.0, 70.5], [30.0, 71.2], [31.0, 73.4],
  [32.1, 74.6], [33.5, 75.2], [34.5, 76.5], [35.5, 77.5],
]

function latLonToCanvas(lat: number, lon: number, W: number, H: number): [number, number] {
  return [((lon + 180) / 360) * W, ((90 - lat) / 180) * H]
}

// Canvas-drawn India mask — used as uIndiaMask for the shader
function createIndiaMask(): THREE.CanvasTexture {
  const W = 2048, H = 1024
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, W, H)

  const drawPoly = () => {
    ctx.beginPath()
    INDIA_BORDER.forEach(([lat, lon], i) => {
      const [x, y] = latLonToCanvas(lat, lon, W, H)
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    })
    ctx.closePath()
  }

  ctx.shadowColor = '#fff'; ctx.shadowBlur = 30
  ctx.fillStyle = 'rgba(255,255,255,0.14)'; drawPoly(); ctx.fill()
  ctx.shadowBlur = 13
  ctx.fillStyle = 'rgba(255,255,255,0.38)'; drawPoly(); ctx.fill()
  ctx.shadowBlur = 0
  ctx.fillStyle = '#fff';                   drawPoly(); ctx.fill()

  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
  return tex
}

// Dark canvas fallback shown while real CDN textures load
function createEarthFallback(): THREE.CanvasTexture {
  const W = 512, H = 256
  const canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')!
  const g = ctx.createLinearGradient(0, 0, 0, H)
  g.addColorStop(0,   '#04081c')
  g.addColorStop(0.5, '#020612')
  g.addColorStop(1,   '#04081c')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, W, H)
  const fn = (x: number, y: number) =>
    Math.abs(Math.sin(x * 127.1 + y * 311.7) * Math.sin(x * 269.5 + y * 183.3))
  for (let py = 0; py < H; py += 2) {
    for (let px = 0; px < W; px += 2) {
      const n = fn(px / 36, py / 36)
      if (n > 0.62) {
        const v = ((n - 0.62) / 0.38) * 20
        ctx.fillStyle = `rgba(${v + 3},${v + 8},${v + 5},0.48)`
        ctx.fillRect(px, py, 2, 2)
      }
    }
  }
  const tex = new THREE.CanvasTexture(canvas)
  tex.wrapS = tex.wrapT = THREE.ClampToEdgeWrapping
  return tex
}

// Tiny 1×1 black texture — neutral default for night/spec while loading
function black1x1(): THREE.DataTexture {
  const t = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1)
  t.needsUpdate = true
  return t
}
function grey1x1(): THREE.DataTexture {
  const t = new THREE.DataTexture(new Uint8Array([100, 100, 100, 255]), 1, 1)
  t.needsUpdate = true
  return t
}

// Load CDN textures asynchronously, updating the uniform value when done
function loadTexture(url: string, uniform: { value: THREE.Texture }) {
  const loader = new THREE.TextureLoader()
  loader.crossOrigin = 'anonymous'
  loader.load(url, (tex) => { uniform.value = tex })
}

// ── Per-hotspot label offsets ─────────────────────────────────
const LABEL_CFG: Record<string, { dx: number; dy: number; side: 'L' | 'R' | 'T' }> = {
  'ranthambore':        { dx: -68, dy:  6, side: 'L' },
  'jim-corbett':        { dx:  68, dy: -8, side: 'R' },
  'kaziranga':          { dx:  68, dy:  0, side: 'R' },
  'sundarbans':         { dx:  68, dy: 10, side: 'R' },
  'gir-forest':         { dx: -68, dy:  6, side: 'L' },
  'kerala-backwaters':  { dx: -68, dy:  8, side: 'L' },
  'ladakh':             { dx:   0, dy:-22, side: 'T' },
}

// ── Globe mesh ────────────────────────────────────────────────
function GlobeMesh({ meshRef }: { meshRef: React.RefObject<THREE.Mesh> }) {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => {
    // Start with canvas fallbacks; swap to CDN textures when they load
    const dayUnif   = { value: createEarthFallback() }
    const nightUnif = { value: black1x1() }
    const specUnif  = { value: grey1x1() }

    loadTexture(TEX.day,   dayUnif)
    loadTexture(TEX.night, nightUnif)
    loadTexture(TEX.spec,  specUnif)

    return {
      uTime:         { value: 0 },
      uSunDirection: { value: SUN_DIR },
      uIndiaMask:    { value: createIndiaMask() },
      uDayMap:       dayUnif,
      uNightMap:     nightUnif,
      uSpecMap:      specUnif,
    }
  }, [])

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 128, 128]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={GLOBE_VERTEX_SHADER}
        fragmentShader={GLOBE_FRAGMENT_SHADER}
        uniforms={uniforms}
      />
    </mesh>
  )
}

// ── Cloud shell — independent slow rotation ───────────────────
// Sits at 1.006× scale so it floats just above the surface.
// Rotates at a slightly different rate to simulate atmospheric drift.
function CloudMesh() {
  const ref  = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => {
    const cloudUnif = { value: black1x1() }
    loadTexture(TEX.clouds, cloudUnif)
    return {
      uTime:         { value: 0 },
      uSunDirection: { value: SUN_DIR },
      uCloudMap:     cloudUnif,
    }
  }, [])

  useFrame((_, delta) => {
    // Slightly faster than globe (0.05) → clouds drift over time
    if (ref.current)   ref.current.rotation.y   += delta * 0.053
    if (matRef.current) matRef.current.uniforms.uTime.value += delta
  })

  return (
    <mesh ref={ref} scale={[1.006, 1.006, 1.006]}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={GLOBE_VERTEX_SHADER}
        fragmentShader={CLOUD_FRAGMENT_SHADER}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.NormalBlending}
      />
    </mesh>
  )
}

// ── Atmosphere shell ──────────────────────────────────────────
function Atmosphere() {
  const uniforms = useMemo(() => ({ uSunDirection: { value: SUN_DIR } }), [])
  return (
    <mesh scale={[1.20, 1.20, 1.20]}>
      <sphereGeometry args={[1, 64, 64]} />
      <shaderMaterial
        vertexShader={ATMOSPHERE_VERTEX_SHADER}
        fragmentShader={ATMOSPHERE_FRAGMENT_SHADER}
        uniforms={uniforms}
        blending={THREE.AdditiveBlending}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  )
}

// ── Hotspot marker ────────────────────────────────────────────
function HotspotMarker({
  hotspot,
  onHover,
  globeMesh,
}: {
  hotspot: Hotspot
  onHover: (h: Hotspot | null) => void
  globeMesh: React.RefObject<THREE.Mesh>
}) {
  const pos      = latLonToVector3(hotspot.lat, hotspot.lon, 1.015)
  const groupRef = useRef<THREE.Group>(null)
  const ringRef  = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const localPos = useMemo(() => new THREE.Vector3(pos.x, pos.y, pos.z), [])
  const cfg      = LABEL_CFG[hotspot.id] ?? { dx: 60, dy: 0, side: 'R' }

  const colorHex = hotspot.color === '#A8D4FF' ? 0xa8d4ff
                 : hotspot.color === '#6BAE4A' ? 0x6bae4a : 0xc9a84c
  const colorRGB = hotspot.color === '#6BAE4A' ? '107,174,74' : '201,168,76'

  useFrame((state) => {
    if (ringRef.current) {
      const p = Math.sin(state.clock.elapsedTime * 2.2 + hotspot.lat) * .5 + .5
      ringRef.current.scale.setScalar(1 + p * 1.1)
      ;(ringRef.current.material as THREE.MeshBasicMaterial).opacity = (1 - p) * 0.65
    }
    if (groupRef.current) {
      groupRef.current.lookAt(0, 0, 0)
      groupRef.current.rotateX(Math.PI)
    }
  })

  const labelStyle: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    left:      cfg.side === 'R' ? '8px'  : 'auto',
    right:     cfg.side === 'L' ? '8px'  : 'auto',
    top:       cfg.side === 'T' ? 'auto' : '50%',
    bottom:    cfg.side === 'T' ? '8px'  : 'auto',
    transform: cfg.side === 'T' ? 'translateX(-50%)' : 'translateY(-50%)',
    pointerEvents: 'none',
    flexDirection: cfg.side === 'L' ? 'row-reverse' : 'row',
    whiteSpace: 'nowrap',
  }

  return (
    <group ref={groupRef} position={localPos}>
      {/* Outer ambient ring */}
      <mesh scale={[2.2, 2.2, 1]}>
        <ringGeometry args={[0.016, 0.024, 24]} />
        <meshBasicMaterial color={colorHex} transparent opacity={0.10} side={THREE.DoubleSide} />
      </mesh>

      {/* Pulsing ring */}
      <mesh ref={ringRef}>
        <ringGeometry args={[0.018, 0.030, 24]} />
        <meshBasicMaterial color={colorHex} transparent opacity={0.60} side={THREE.DoubleSide} />
      </mesh>

      {/* Core dot — smaller, more refined */}
      <mesh>
        <circleGeometry args={[hovered ? 0.018 : 0.011, 24]} />
        <meshBasicMaterial color={colorHex} />
      </mesh>

      {/* HUD label — occluded behind globe */}
      <Html
        center={false}
        distanceFactor={3.5}
        position={[0, 0, 0.001]}
        occlude={globeMesh.current ? [globeMesh.current] : true}
        style={{ pointerEvents: 'all', width: '0px', height: '0px', overflow: 'visible' }}
        zIndexRange={[10, 20]}
        onPointerEnter={() => { setHovered(true);  onHover(hotspot); document.body.style.cursor = 'pointer' }}
        onPointerLeave={() => { setHovered(false); onHover(null);    document.body.style.cursor = 'auto' }}
      >
        <div style={{ position: 'relative', width: 0, height: 0 }}>
          <div style={labelStyle}>
            <div style={{
              width: '8px', height: '0.5px', flexShrink: 0,
              background: `rgba(${colorRGB},0.40)`,
            }} />
            <div style={{
              fontSize: '6px',
              fontFamily: '"Space Mono", monospace',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: hovered ? '#F0EDE8' : `rgba(240,237,232,0.58)`,
              background: hovered ? 'rgba(3,3,3,0.90)' : 'rgba(3,3,3,0.50)',
              border: `0.5px solid rgba(${colorRGB},${hovered ? '0.50' : '0.18'})`,
              padding: '2px 5px',
              borderRadius: '1px',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s ease',
              userSelect: 'none',
              boxShadow: hovered ? `0 0 10px rgba(${colorRGB},0.18)` : 'none',
            }}>
              {hotspot.name}
            </div>
          </div>
        </div>
      </Html>
    </group>
  )
}

// ── Particle field ─────────────────────────────────────────────
function ParticleField() {
  const ref = useRef<THREE.Points>(null)
  const geo = useMemo(() => {
    const count = 380
    const pos   = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r   = 1.3 + Math.random() * .75
      const th  = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      pos[i*3]   = r * Math.sin(phi) * Math.cos(th)
      pos[i*3+1] = r * Math.cos(phi)
      pos[i*3+2] = r * Math.sin(phi) * Math.sin(th)
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    return g
  }, [])

  useFrame((s) => {
    if (ref.current) {
      ref.current.rotation.y += .00032
      ref.current.rotation.x  = Math.sin(s.clock.elapsedTime * .07) * .032
    }
  })

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#C9A84C" size={0.0055} transparent opacity={0.20}
        sizeAttenuation blending={THREE.AdditiveBlending} depthWrite={false}
      />
    </points>
  )
}

// ── Globe group — mesh + hotspot markers rotate together ──────
function GlobeGroup({ onHover }: { onHover: (h: Hotspot | null) => void }) {
  const groupRef  = useRef<THREE.Group>(null)
  const globeMesh = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.05
  })

  return (
    <group ref={groupRef}>
      <GlobeMesh meshRef={globeMesh} />
      {INDIA_HOTSPOTS.map(h => (
        <HotspotMarker key={h.id} hotspot={h} onHover={onHover} globeMesh={globeMesh} />
      ))}
    </group>
  )
}

// ── Scene ──────────────────────────────────────────────────────
function Scene({ onHover }: { onHover: (h: Hotspot | null) => void }) {
  return (
    <>
      {/* Very faint ambient — space is dark */}
      <ambientLight intensity={0.04} />
      {/* Key light matches SUN_DIR exactly */}
      <directionalLight position={[4.5, 1, -1.8]} intensity={1.65} color="#fff6e0" />
      {/* Ultra-faint blue fill from camera side */}
      <pointLight position={[0, 0, 3.2]} intensity={0.05} color="#0d1a38" />

      <Stars radius={100} depth={80} count={2800} factor={2.2} saturation={0} fade speed={0.18} />

      <GlobeGroup onHover={onHover} />
      <CloudMesh />
      <Atmosphere />
      <ParticleField />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        rotateSpeed={0.36}
        dampingFactor={0.08}
        enableDamping
        minPolarAngle={Math.PI * 0.18}
        maxPolarAngle={Math.PI * 0.82}
      />

      <EffectComposer multisampling={0}>
        {/* Bloom — only HDR India border (>0.95) and atmosphere crescent trigger */}
        <Bloom
          blendFunction={BlendFunction.ADD}
          luminanceThreshold={0.22}
          luminanceSmoothing={0.85}
          intensity={1.45}
          mipmapBlur
          radius={0.60}
          levels={7}
        />
        {/* Subtle vignette — focuses attention on globe center */}
        <Vignette
          offset={0.38}
          darkness={0.68}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  )
}

// ── Hotspot info panel ────────────────────────────────────────
function HotspotInfo({ hotspot }: { hotspot: Hotspot | null }) {
  if (!hotspot) return null
  return (
    <div
      className="absolute bottom-8 left-8 glass-gold p-5 max-w-xs"
      style={{ animation: 'fadeInUp 0.22s ease-out', borderRadius: '2px' }}
    >
      <p className="text-overline mb-1" style={{ fontSize: '0.52rem' }}>
        {hotspot.id.replace(/-/g, ' ')}
      </p>
      <h3 className="font-display mb-2"
          style={{ fontSize: '1.25rem', fontWeight: 400, color: '#F0EDE8' }}>
        {hotspot.name}
      </h3>
      <p className="font-body mb-3"
         style={{ color: 'rgba(240,237,232,0.50)', lineHeight: 1.65, fontSize: '0.72rem' }}>
        {hotspot.description}
      </p>
      <div className="flex flex-wrap gap-2">
        {hotspot.species.map(s => (
          <span key={s} className="font-mono" style={{
            fontSize: '0.52rem', letterSpacing: '0.1em', padding: '2px 7px',
            border: '1px solid rgba(201,168,76,0.18)',
            color: 'rgba(201,168,76,0.60)', borderRadius: '1px',
          }}>{s}</span>
        ))}
      </div>
    </div>
  )
}

// ── Main export ───────────────────────────────────────────────
export default function InteractiveGlobe() {
  const [active, setActive] = useState<Hotspot | null>(null)

  return (
    <div className="relative w-full h-full">
      {/* Film grain overlay — cinematic texture on the canvas */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          opacity: 0.032,
          mixBlendMode: 'overlay',
        }}
      />

      {/* Drag hint */}
      <div className="absolute top-8 right-8 z-20 flex items-center gap-2" style={{ opacity: 0.28 }}>
        <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
          <circle cx="7" cy="7" r="6" stroke="#C9A84C" strokeWidth="0.8" />
          <path d="M7 4L7 10M4 7L10 7" stroke="#C9A84C" strokeWidth="0.8" />
        </svg>
        <span className="font-mono" style={{ fontSize: '0.52rem', color: '#C9A84C', letterSpacing: '0.18em' }}>
          DRAG TO ROTATE
        </span>
      </div>

      <Canvas
        camera={{ position: [0, 0, 2.52], fov: 44 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.10,
        }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
      >
        <Scene onHover={setActive} />
      </Canvas>

      <HotspotInfo hotspot={active} />

      {/* Page fade at bottom */}
      <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
           style={{ background: 'linear-gradient(to top, #030303, transparent)' }} />
    </div>
  )
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any; group: any; sphereGeometry: any; shaderMaterial: any
      ringGeometry: any; circleGeometry: any; meshBasicMaterial: any
      points: any; bufferGeometry: any; bufferAttribute: any
      pointsMaterial: any; ambientLight: any; directionalLight: any; pointLight: any
    }
  }
}

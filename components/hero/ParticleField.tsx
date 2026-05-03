'use client'

import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/* ─── GLSL shaders ─────────────────────────────────────────────────── */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;

  attribute float aSize;
  attribute vec3  aColor;

  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;

    vec3 pos = position;

    // Organic breathing — each axis offset slightly for natural feel
    float t   = uTime * 0.35;
    float wave = sin(pos.x * 1.6 + t)
               * cos(pos.y * 1.4 + t * 0.8)
               * sin(pos.z * 1.5 + t * 0.9);
    pos += normalize(pos) * wave * 0.09;

    // Project to clip-space to get NDC for mouse repulsion
    vec4  clip    = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    vec2  ndc     = clip.xy / clip.w;
    vec2  diff    = ndc - uMouse;
    float dist    = length(diff);
    float radius  = 0.55;
    float force   = max(0.0, 1.0 - dist / radius) * 0.45;
    pos += normalize(vec3(diff, 0.3)) * force;

    vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);

    // Depth-based alpha — closer = more opaque
    vAlpha = clamp((-mvPos.z - 0.5) / 7.0, 0.05, 1.0);

    gl_PointSize = clamp(aSize * (220.0 / -mvPos.z), 0.5, 9.0);
    gl_Position  = projectionMatrix * mvPos;
  }
`

const fragmentShader = /* glsl */ `
  varying vec3  vColor;
  varying float vAlpha;

  void main() {
    vec2  uv = gl_PointCoord - 0.5;
    float d  = length(uv);
    if (d > 0.5) discard;

    float shell  = 1.0 - smoothstep(0.0, 0.5, d);
    float core   = 1.0 - smoothstep(0.0, 0.15, d);
    float glow   = pow(shell, 2.0);

    vec3  col   = vColor * (glow + core * 0.6) * 1.4;
    float alpha = (glow * 0.75 + core * 0.25) * vAlpha;

    gl_FragColor = vec4(col, alpha);
  }
`

/* ─── Particle mesh ───────────────────────────────────────────────── */

function Particles() {
  const meshRef   = useRef<THREE.Points>(null)
  const mouseRef  = useRef(new THREE.Vector2(0, 0))
  const targetRef = useRef(new THREE.Vector2(0, 0))

  const { geometry, material } = useMemo(() => {
    const COUNT = 5800

    const positions = new Float32Array(COUNT * 3)
    const colors    = new Float32Array(COUNT * 3)
    const sizes     = new Float32Array(COUNT)

    // Fibonacci sphere — maximally uniform distribution
    const goldenAngle = Math.PI * (1 + Math.sqrt(5))

    for (let i = 0; i < COUNT; i++) {
      const phi   = Math.acos(1 - (2 * (i + 0.5)) / COUNT)
      const theta = goldenAngle * i
      const r     = 2.6 + Math.random() * 0.6

      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      // Gradient: cyan (#00f5ff) → purple (#7b2ff7) based on vertical band
      const t = (Math.sin(theta * 0.5) + 1) * 0.5
      colors[i * 3]     = THREE.MathUtils.lerp(0.0,  0.48, t)
      colors[i * 3 + 1] = THREE.MathUtils.lerp(0.96, 0.18, t)
      colors[i * 3 + 2] = 1.0

      sizes[i] = Math.random() * 2.0 + 0.6
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('aColor',   new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('aSize',    new THREE.BufferAttribute(sizes, 1))

    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uTime:  { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      blending:    THREE.AdditiveBlending,
      depthWrite:  false,
    })

    return { geometry: geo, material: mat }
  }, [])

  // Track raw mouse, lerp in useFrame for smooth lag
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current.x =  (e.clientX / window.innerWidth)  * 2 - 1
      targetRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((_, delta) => {
    if (!meshRef.current) return
    const mat = meshRef.current.material as THREE.ShaderMaterial

    mouseRef.current.lerp(targetRef.current, 0.06)
    mat.uniforms.uTime.value += delta
    mat.uniforms.uMouse.value.copy(mouseRef.current)

    meshRef.current.rotation.y += delta * 0.04
    meshRef.current.rotation.x += delta * 0.015
  })

  return (
    <points
      ref={meshRef}
      geometry={geometry}
      material={material}
      position={[1.8, 0, 0]}
    />
  )
}

/* ─── Canvas wrapper ──────────────────────────────────────────────── */

export default function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Particles />
    </Canvas>
  )
}

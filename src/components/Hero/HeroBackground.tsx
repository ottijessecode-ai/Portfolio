'use client'

import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function WaveMesh() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock, mouse }) => {
    if (!meshRef.current) return
    const time = clock.getElapsedTime()
    const geo = meshRef.current.geometry as THREE.BufferGeometry
    const pos = geo.attributes.position as THREE.BufferAttribute

    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const y = pos.getY(i)
      const z =
        Math.sin(x * 1.2 + time * 0.7) * 0.35 +
        Math.cos(y * 1.2 + time * 0.5) * 0.25 +
        Math.sin((x + y) * 0.8 + time * 0.4) * 0.2 +
        mouse.x * 0.3 * Math.sin(x + time) +
        mouse.y * 0.2 * Math.cos(y + time)
      pos.setZ(i, z)
    }

    pos.needsUpdate = true
    geo.computeVertexNormals()
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI * 0.3, 0.1, 0]}>
      <planeGeometry args={[18, 12, 60, 40]} />
      <meshStandardMaterial
        color="#4ABFB5"
        wireframe
        transparent
        opacity={0.12}
      />
    </mesh>
  )
}

function ParticleField() {
  const count = 180
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5
  }
  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const meshRef = useRef<THREE.Points>(null)
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.04
    }
  })

  return (
    <points ref={meshRef} geometry={geo}>
      <pointsMaterial color="#4ABFB5" size={0.025} transparent opacity={0.5} />
    </points>
  )
}

export default function HeroBackground() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 65 }}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
      gl={{ alpha: true, antialias: true }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={1} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#4ABFB5" />
      <WaveMesh />
      <ParticleField />
    </Canvas>
  )
}

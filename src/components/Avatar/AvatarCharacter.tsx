'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, SoftShadows } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

// ==========================================
// 1. CHARACTER COMPONENT
// Loads the .glb and manages animations via GSAP
// ==========================================
function CharacterModel() {
  const group = useRef<THREE.Group>(null)

  // NOTE: You must provide a "model.glb" in the public/ directory!
  // If useGLTF fails because the file isn't there, we use a fallback or it will error gracefully.
  const { scene, animations } = useGLTF('/model.glb', true)
  const { actions, mixer } = useAnimations(animations, group)

  // System State Management
  const currentAction = useRef<string>('idle')

  useEffect(() => {
    // 1. Ensure shadows cast
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        obj.castShadow = true
        obj.receiveShadow = true
        // Optional: Draco compression handled automatically by v9 fiber/drei if provided by GLTF
      }
    })

    // Setup animations based on JSON params
    // "idle", "walk", "wave", "typing", "calling"
    Object.values(actions).forEach(action => {
      if (action) action.setEffectiveWeight(0)
    })

    const playAnim = (name: string, loop: boolean = true) => {
      if (!actions[name]) return // Silently fail if anim doesn't exist
      const action = actions[name]!

      if (actions[currentAction.current]) {
        actions[currentAction.current]?.fadeOut(0.2)
      }

      action.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(0.2)
      action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, 1)
      action.clampWhenFinished = !loop
      action.play()

      currentAction.current = name
    }

    // Default to idle on load
    playAnim('idle', true)

    // Setup Section Transition Triggers mapping to JSON configuration
    const sections = [
      { id: 'hero', anim: 'wave', loop: false },
      { id: 'about', anim: 'walk', loop: true },
      { id: 'services', anim: 'typing', loop: true },
      { id: 'portfolio', anim: 'pointing', loop: false }, // Pointing at itself
      { id: 'contact', anim: 'calling', loop: false }
    ]

    sections.forEach(sec => {
      const el = document.getElementById(sec.id)
      if (!el) return

      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => playAnim(sec.anim, sec.loop),
        onEnterBack: () => playAnim(sec.anim, sec.loop),
      })
    })

    // Sub-behavior: Walking on scroll interpolation
    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      // If we are scrolling, optionally blend walk
      if (['idle'].includes(currentAction.current) && actions['walk']) {
        playAnim('walk', true)
      }
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        // on_scroll_stop
        const activeSection = sections.find(s => {
          const e = document.getElementById(s.id)
          if (!e) return false
          const rect = e.getBoundingClientRect()
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2
        })
        if (activeSection) {
          playAnim(activeSection.anim, activeSection.loop)
        } else {
          playAnim('idle', true)
        }
      }, 300)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      ScrollTrigger.getAll().forEach(t => t.kill())
      clearTimeout(scrollTimeout)
    }
  }, [actions, scene])

  // Head tracking the cursor (Interaction Layer)
  useFrame((state) => {
    if (!group.current) return
    const { mouse } = state

    // Smoothly rotate the entire group slightly towards mouse
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.x * 0.6, // "intensity": 0.6
      0.08           // "smoothness": 0.08
    )
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -mouse.y * 0.4,
      0.08
    )
  })

  return <primitive ref={group} object={scene} position={[0, -1, 0]} scale={1} />
}

// Fallback image based on JSON fallback params
// WARNING: Using multiply blend mode safely cuts out the perfect-white background from the JPEG and merges it into our custom 3-color scheme.
function Fallback2D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Advanced cursor-tracking GSAP mimicking 3D tilt behavior for the 2D image
    const handleMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const xNorm = (e.clientX / window.innerWidth - 0.5) * 2
      const yNorm = (e.clientY / window.innerHeight - 0.5) * 2

      gsap.to(containerRef.current, {
        x: xNorm * 20, // Sway relative tracking
        y: yNorm * 10,
        rotationY: xNorm * 10, // Simulated 3D head pivot
        rotationX: -yNorm * 5,
        duration: 0.8,
        ease: 'power3.out'
      })
    }

    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '0%',
        right: '5%',
        zIndex: 999999,
        pointerEvents: 'none',
        perspective: '800px' // Provides depth to the 2.5D tilt
      }}
    >
      <div ref={containerRef} style={{ transformOrigin: 'center center' }}>
        <img
          src="/new-avatar.jpeg"
          alt="Jesse Otti Character Fallback"
          style={{
            width: 'clamp(280px, 35vw, 400px)',
            height: 'auto',
            // MULTIPLY isolates the subject by clipping the blinding white background into the Warm Ivory canvas:
            mixBlendMode: 'multiply',
            // Boost definition for pop:
            filter: 'contrast(1.05) saturate(1.1) drop-shadow(0 20px 30px rgba(0,0,0,0.15))',
            display: 'block'
          }}
        />
      </div>
    </div>
  )
}

// ------------------------------------------
// ERROR BOUNDARY to prevent crashing on missing GLB
// ------------------------------------------
class ModelErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }
  render() {
    if (this.state.hasError) {
      return <Fallback2D /> // Automatically fall back to the PNG if model.glb isn't found yet!
    }
    return this.props.children
  }
}

// ==========================================
// 2. MAIN 3D CANVAS COMPONENT
// ==========================================
export default function AvatarCharacter() {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute' as const,
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 5,
        pointerEvents: 'none' as const,
      }}
    >
      {/* 
        This is a full Three.js system replacing the old 2D avatar.
        NOTE: User must place model.glb in public folder with the specified animation names
        ("idle", "walk", "wave", "typing", "calling").
      */}
      <ModelErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [0, 1.5, 5], fov: 45 }} // "offset": { "x": 0, "y": 1.5, "z": 5 }
          dpr={[1, 2]}
          gl={{ alpha: true, antialias: true }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 10, 5]}
            intensity={0.8}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
          />

          <SoftShadows size={15} samples={10} focus={0.5} />

          <React.Suspense fallback={null}>
            <CharacterModel />
          </React.Suspense>
        </Canvas>
      </ModelErrorBoundary>
    </div>
  )
}


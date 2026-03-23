'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    // Hide default cursor on desktop only
    if (window.innerWidth > 768) {
      document.body.style.cursor = 'none'
    }

    let mouseX = 0, mouseY = 0

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.05 })
      gsap.to(follower, { x: mouseX, y: mouseY, duration: 0.35, ease: 'power2.out' })
    }

    const onMouseEnterInteractive = () => {
      gsap.to(follower, { scale: 2.2, opacity: 0.5, duration: 0.4, ease: 'power2.out' })
      gsap.to(cursor, { scale: 0.4, duration: 0.3 })
    }

    const onMouseLeaveInteractive = () => {
      gsap.to(follower, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' })
      gsap.to(cursor, { scale: 1, duration: 0.3 })
    }

    const addListeners = () => {
      const interactives = document.querySelectorAll('a, button, [data-cursor]')
      interactives.forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterInteractive)
        el.addEventListener('mouseleave', onMouseLeaveInteractive)
      })
    }

    window.addEventListener('mousemove', onMouseMove)
    addListeners()

    // Re-attach on DOM changes
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.body.style.cursor = ''
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}

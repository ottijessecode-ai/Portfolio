'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const metrics = [
  { value: 15, suffix: '+', label: 'Premium Projects' },
  { value: 4, suffix: 'Yrs', label: 'Industry Expertise' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
]

export default function ProofSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const countersRef = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // COUNT-UP animation
      metrics.forEach((m, i) => {
        const countObj = { val: 0 }
        gsap.to(countObj, {
          val: m.value,
          duration: 2.5,
          ease: 'power3.out',
          scrollTrigger: { trigger: `#metric-counter-${i}`, start: 'top 85%', once: true },
          onUpdate: () => {
            const el = document.getElementById(`metric-counter-${i}`)
            if (el) el.textContent = Math.round(countObj.val).toString() + m.suffix
          },
        })
      })

      gsap.from('.met-item', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="proof"
      ref={sectionRef}
      className="section-pad"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid rgba(26,24,21,0.05)',
      }}
    >
      <div className="container">
        {/* Minimal metrics grid */}
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 1fr)', 
            gap: '80px',
            textAlign: 'center' 
          }}
        >
          {metrics.map((m, i) => (
            <div key={m.label} className="met-item" style={{ position: 'relative' }}>
              <span
                id={`metric-counter-${i}`}
                style={{
                  display: 'block',
                  fontSize: 'clamp(60px, 8vw, 120px)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: '24px',
                }}
              >
                0{m.suffix}
              </span>
              <p className="label" style={{ color: 'var(--accent)', fontSize: '13px' }}>
                {m.label}
              </p>
            </div>
          ))}
        </div>
        
        {/* Quote Block */}
        <div className="met-item" style={{ marginTop: '120px', textAlign: 'center', maxWidth: '800px', margin: '120px auto 0' }}>
          <span className="serif-italic" style={{ fontSize: '80px', color: 'var(--accent)', lineHeight: 0.5, display: 'block', marginBottom: '20px' }}>&ldquo;</span>
          <p className="serif-italic" style={{ fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--text-primary)', lineHeight: 1.4, marginBottom: '40px' }}>
             Jesse delivers a clean, modern aesthetic that elevates brands instantly. The attention to detail in his development process is unlike anything we have seen before.
          </p>
          <p className="label" style={{ color: 'rgba(26,24,21,0.6)' }}>— Christabel Chinaza</p>
        </div>
      </div>
    </section>
  )
}

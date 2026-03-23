'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Digital Design',
    description: 'Elevated UI/UX mapped explicitly to brand identity and user psychology, ensuring your digital presence is visually arresting and functional.',
  },
  {
    title: 'Development',
    description: 'Robust, lightning-fast architecture using modern frameworks (Next.js, Webflow). Code that not only performs but scales.',
  },
  {
    title: 'Interactions',
    description: 'Award-winning GSAP motion design and precise micro-interactions that breathe life into your brand narrative.',
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.svc-header', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.svc-wrap', start: 'top 75%' },
      })

      gsap.from('.svc-block', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
        scrollTrigger: { trigger: '.svc-wrap', start: 'top 65%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-pad"
      style={{ background: 'var(--bg-primary)' }}
    >
      <div className="container svc-wrap">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '80px',
          }}
        >
          {/* Left Sticky Header */}
          <div className="svc-header" style={{ position: 'sticky', top: '140px', alignSelf: 'start' }}>
            <p className="label" style={{ marginBottom: '24px' }}>Expertise</p>
            <h2 className="display-lg" style={{ color: 'var(--text-primary)', lineHeight: 0.95, textTransform: 'uppercase' }}>
              Precision <br />
              <span className="serif-italic" style={{ color: 'var(--accent)', textTransform: 'none' }}>Solutions</span>
            </h2>
            <div style={{ marginTop: '48px' }}>
              <a href="#contact" className="btn-primary">Get in Touch</a>
            </div>
          </div>

          {/* Right Services List */}
          <div style={{ borderTop: '1px solid rgba(26,24,21,0.1)' }}>
            {services.map((s, i) => (
              <div
                key={i}
                className="svc-block"
                style={{
                  padding: '56px 0',
                  borderBottom: '1px solid rgba(26,24,21,0.1)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '40px',
                  alignItems: 'start'
                }}
              >
                <h3
                  style={{
                    fontSize: '32px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: 'var(--text-primary)'
                  }}
                >
                  {s.title}
                </h3>
                <p 
                  style={{ 
                    fontFamily: 'var(--font-primary)', 
                    fontSize: '16px', 
                    lineHeight: 1.6, 
                    color: 'rgba(26,24,21,0.7)' 
                  }}
                >
                  {s.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

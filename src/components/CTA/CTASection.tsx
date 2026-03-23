'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.cta-el', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        background: 'var(--bg-primary)',
        padding: '160px 48px',
        textAlign: 'center',
        borderTop: '1px solid rgba(26,24,21,0.05)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <p className="cta-el label" style={{ marginBottom: '32px' }}>
          Let&apos;s Connect
        </p>

        <h2
          className="cta-el display-xl"
          style={{
            fontSize: 'clamp(60px, 8vw, 130px)',
            lineHeight: 0.85,
            marginBottom: '64px',
            textTransform: 'uppercase',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            color: 'var(--text-primary)'
          }}
        >
          Have a project <br />
          <span className="serif-italic" style={{ color: 'var(--accent)', textTransform: 'none' }}>in mind?</span>
        </h2>

        <div className="cta-el" style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="mailto:ottijessecode@gmail.com" className="btn-primary" style={{ fontSize: '14px', padding: '20px 48px' }}>
            Email Me
          </a>
          <a href="https://wa.me/2348162225686" target="_blank" rel="noopener noreferrer" className="btn-outline" style={{ fontSize: '14px', padding: '20px 48px' }}>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

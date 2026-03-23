'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.abt-header', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      })
      gsap.from('.abt-p', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
        stagger: 0.2,
        scrollTrigger: { trigger: '.abt-wrap', start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-pad"
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid rgba(26,24,21,0.05)',
      }}
    >
      <div className="container abt-wrap">
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '80px', alignItems: 'start' }}>
          
          <div className="abt-header">
            <p className="label" style={{ marginBottom: '24px' }}>Profile</p>
            <h2 className="display-lg" style={{ lineHeight: 0.9 }}>
              The Mind <br />
              <span className="serif-italic" style={{ color: 'var(--accent)' }}>Behind It.</span>
            </h2>
          </div>

          <div>
            <p className="body-lg abt-p" style={{ fontSize: '28px', lineHeight: 1.5, color: 'var(--text-primary)', marginBottom: '40px', fontWeight: 500 }}>
              I approach problems creatively and deliver solutions that actually work. Every design challenge is an opportunity to elevate a brand above its noise.
            </p>
            <p className="body-lg abt-p" style={{ marginBottom: '40px' }}>
              Specializing in premium tools like Next.js, Webflow, and GSAP, my goal is not just to build websites, but to construct digital experiences that perform flawlessly and captivate immediately. Fast-loading, accessible, and optimized platforms that score high across all metrics and deliver real business value.
            </p>
            
            <div className="abt-p" style={{ display: 'flex', gap: '40px', borderTop: '1px solid rgba(26,24,21,0.1)', paddingTop: '40px' }}>
              <div>
                <p className="label" style={{ color: 'rgba(26,24,21,0.4)', marginBottom: '12px' }}>Role</p>
                <p style={{ fontWeight: 600, fontSize: '15px' }}>Designer & Developer</p>
              </div>
              <div>
                <p className="label" style={{ color: 'rgba(26,24,21,0.4)', marginBottom: '12px' }}>Location</p>
                <p style={{ fontWeight: 600, fontSize: '15px' }}>Global / Remote</p>
              </div>
              <div>
                <p className="label" style={{ color: 'rgba(26,24,21,0.4)', marginBottom: '12px' }}>Vibe</p>
                <p style={{ fontWeight: 600, fontSize: '15px', color: 'var(--accent)' }}>Precision Oriented</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

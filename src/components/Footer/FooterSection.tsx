'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function FooterSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.footer-el', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <footer
      id="footer"
      ref={sectionRef}
      style={{
        background: 'var(--text-primary)', /* Only part of the site that is dark is the footer box */
        color: 'var(--bg-primary)',
        paddingTop: '60px',
        paddingBottom: '40px',
      }}
    >
      <div className="container">
        <div className="footer-el" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px', paddingBottom: '40px', borderBottom: '1px solid rgba(247,245,240,0.1)' }}>
          <h2 style={{ fontSize: '32px', color: 'var(--bg-primary)', margin: 0 }}>
            JESSE<span style={{ color: 'var(--accent)' }}>OTTI</span>
          </h2>
          <nav style={{ display: 'flex', gap: '40px' }}>
            {['Twitter', 'LinkedIn', 'Instagram'].map(link => (
              <a key={link} href="#" style={{ color: 'rgba(247,245,240,0.6)', textDecoration: 'none', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,245,240,0.6)'}>
                {link}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-el" style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '32px', fontSize: '12px', color: 'rgba(247,245,240,0.4)', letterSpacing: '0.1em' }}>
          <span>© 2026 JESSE OTTI. ALL RIGHTS RESERVED.</span>
          <span>DESIGNED & DEVELOPED IN AFRICA.</span>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroTicker from './HeroTicker'
import AvatarCanvas from '../Avatar/AvatarCanvas'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

      // Elegant and safe fade-up for main headline words without relying on overflow-box clipping
      tl.fromTo('.hero-word', {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 1.4,
        ease: 'power3.out',
        stagger: 0.15,
      })
      .from('.hero-sub-text', {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out',
      }, '-=0.8')
      .from('.hero-cta-group', {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.7')
      .from('.hero-badge', {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'back.out(1.2)',
      }, '-=0.6')

      // Removing the volatile 'yPercent' parallax scroll effect.
      // It was aggressively shifting position coordinates against the Avatar on mobile, severely ruining the presentation scaling as flagged by the user.
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{
        position: 'relative',
        minHeight: '120svh', // Increased to accommodate the massive typography visibility
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        paddingTop: '100px',
      }}
    >
      {/* Noise overlay already on page level */}

      {/* AVATAR HUGE FOREGROUND ELEMENT */}
      <div style={{
        position: 'absolute',
        bottom: '0%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'clamp(300px, 50vw, 850px)', /* Scaled down for mobile safety */
        height: '80%',
        zIndex: 5, /* Placed deliberately in front of the text */
        pointerEvents: 'none',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-end',
      }}>
        <AvatarCanvas />
      </div>

      <div
        className="hero-content-wrap"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end', /* Pushes the write-up and CTAs exclusively to the bottom */
          alignItems: 'flex-start',
          position: 'relative',
          zIndex: 2, 
          padding: '20px 5vw 60px', /* Generous bottom padding padding */
          textAlign: 'center',
        }}
      >
        <div style={{ position: 'absolute', top: '70px', left: 0, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
          {/* Sup headline */}
          <div
            className="hero-sub-text"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--accent)',
                animation: 'blink 2s ease-in-out infinite',
              }}
            />
            <span className="label">Crafting Digital Excellence</span>
          </div>

          <h1
            className="hero-word"
            style={{ 
              fontSize: 'clamp(50px, 8vw, 120px)',
              lineHeight: 1,
              fontWeight: 800,
              color: 'var(--text-primary)', 
              display: 'block',
              letterSpacing: '-0.02em',
              margin: 0
            }}
          >
            HI, I'M
          </h1>

          <h2
            className="hero-word"
            style={{ 
              fontSize: 'clamp(80px, 16vw, 250px)',
              lineHeight: 0.85,
              fontWeight: 800,
              color: 'var(--text-primary)', 
              display: 'block',
              letterSpacing: '-0.04em',
              margin: 0
            }}
          >
            JESSE
          </h2>
        </div>

        {/* Subtitle & CTAs - Stacked tightly on the bottom left! */}
        <div 
          className="hero-info-row"
          style={{ 
            display: 'flex',
            flexDirection: 'column', /* Stacks vertically */
            alignItems: 'flex-start', /* Pinned entirely left */
            gap: '30px', /* Gap between paragraph and buttons */
            zIndex: 10,
          }}
        >
          {/* Subtitle / Description */}
          <div
            className="hero-sub-text"
            style={{ 
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ width: '40px', height: '1px', background: 'var(--text-primary)' }} />
            <p className="body-lg" style={{ color: 'var(--text-primary)', margin: 0, maxWidth: '280px', fontSize: '15px' }}>
              A forward-thinking digital designer passionate about crafting <span className="serif-italic" style={{ color: 'var(--accent)' }}>bold and memorable</span> projects.
            </p>
          </div>

          {/* CTAs moved precisely below the write-up */}
          <div
            className="hero-cta-group"
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            <a href="#contact" className="btn-primary" style={{ padding: '20px 40px', fontSize: '13px', borderRadius: '100px', whiteSpace: 'nowrap' }}>
              Contact Me →
            </a>
            <a href="#work" className="btn-outline" style={{ padding: '20px 40px', fontSize: '13px', borderRadius: '100px', border: 'none', whiteSpace: 'nowrap' }}>
              Explore Work ↓
            </a>
          </div>
        </div>
      </div>

      {/* Rotating badge */}
      <div
        className="hero-badge"
        style={{
          position: 'absolute',
          bottom: '80px',
          right: '80px',
          zIndex: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="rotating-badge"
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <svg viewBox="0 0 100 100" width="120" height="120">
            <defs>
              <path
                id="circlePathHero"
                d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
              />
            </defs>
            <text
              style={{
                fontFamily: 'var(--font-primary)',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '3px',
                fill: 'var(--text-primary)',
                textTransform: 'uppercase',
              }}
            >
              <textPath href="#circlePathHero">
                AVAILABLE FOR HIRE • 2026 • JESSE OTTI •
              </textPath>
            </text>
          </svg>
          <div
            style={{
              position: 'absolute',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: 'var(--accent)',
            }}
          />
        </div>
      </div>

      {/* Clean border line at the bottom instead of ticker (for now, clean minimal look) */}
      <div style={{ position: 'absolute', bottom: 1, left: '5%', right: '5%', height: '1px', background: 'rgba(26,24,21,0.1)' }} />
    </section>
  )
}

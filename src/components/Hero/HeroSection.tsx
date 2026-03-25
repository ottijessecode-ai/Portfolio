'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroTicker from './HeroTicker'
import AvatarCharacter from '../Avatar/AvatarCharacter'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })

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
        .from('.hero-sub-text-top', {
          opacity: 0,
          y: 30,
          duration: 1,
          ease: 'power3.out',
        }, '-=0.8')
        .from('.hero-info-row', {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="hero" ref={sectionRef} className="hero-section">
      <div className="hero-heading-container">
        {/* Sup headline */}
        <div
          className="hero-sub-text-top"
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

      <div className="hero-avatar-container">
        <AvatarCharacter />
      </div>

      <div
        className="hero-content-wrap"
        style={{
          width: '100%',
          padding: '20px 5vw 60px',
          zIndex: 10,
        }}
      >
        <div
          className="hero-info-row"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '30px',
          }}
        >
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

          <div
            className="hero-cta-group"
            style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}
          >
            <a href="#contact" className="btn-primary">
              Contact Me →
            </a>
            <a href="#work" className="btn-outline" style={{ border: 'none' }}>
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
    </section>
  )
}

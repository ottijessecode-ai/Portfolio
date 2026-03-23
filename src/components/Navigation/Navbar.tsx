'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface NavbarProps {
  onMenuToggle: () => void
  menuOpen: boolean
}

export default function Navbar({ onMenuToggle, menuOpen }: NavbarProps) {
  const navRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Elegant entrance
      gsap.from(navRef.current, {
        y: -100,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
        delay: 0.5,
      })

      // Slight tightening / visual change on scroll
      ScrollTrigger.create({
        start: 'top -50',
        onUpdate: (self) => {
          if (!pillRef.current) return
          if (self.direction === 1) { // SCROLLING DOWN
            gsap.to(pillRef.current, {
              padding: '8px 12px',
              background: 'rgba(247, 245, 240, 0.95)',
              boxShadow: '0 10px 30px rgba(26,24,21,0.08)',
              duration: 0.4,
            })
          } else { // SCROLLING UP
            gsap.to(pillRef.current, {
              padding: '12px 16px',
              background: 'rgba(247, 245, 240, 0.8)',
              boxShadow: '0 4px 10px rgba(26,24,21,0.02)',
              duration: 0.4,
            })
          }
        }
      })
    }, navRef)

    return () => ctx.revert()
  }, [])

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: '24px 48px',
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        opacity: menuOpen ? 0 : 1, /* Completely vanishes exactly as requested */
        pointerEvents: menuOpen ? 'none' : 'none', /* The pill itself re-enables this */
        transition: 'opacity 0.4s ease-in-out',
      }}
    >
      <div
        ref={pillRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'rgba(247, 245, 240, 0.5)', /* Kept consistent */
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(26,24,21,0.08)',
          borderRadius: '100px',
          padding: '12px 16px',
          pointerEvents: 'auto',
          transition: 'all 0.4s var(--ease-out-expo)',
          gap: '32px',
        }}
      >
        {/* LOGO area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: 'var(--text-primary)',
              color: 'var(--bg-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: '12px',
            }}
          >
            JO
          </div>
          <span style={{ fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em' }}>
            JESSE OTTI
          </span>
        </div>

        {/* Desktop Links */}
        <div
          style={{
            display: 'none',
            '@media (minWidth: 768px)': { display: 'flex' }
          } as any}
          className="nav-links"
        >
          <style>{`
            .nav-link {
              text-decoration: none;
              color: var(--text-primary);
              font-size: 11px;
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 0.15em;
              padding: 8px 16px;
              border-radius: 100px;
              transition: all 0.3s ease;
              opacity: 0.7;
            }
            .nav-link:hover {
              opacity: 1;
              background: rgba(26,24,21,0.05);
            }
            @media (min-width: 768px) {
              .nav-links { display: flex; gap: 8px; }
            }
          `}</style>
          <a href="#work" className="nav-link">Work</a>
          <a href="#services" className="nav-link">Services</a>
          <a href="#about" className="nav-link">About</a>
        </div>

        {/* Right side Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <a
            href="mailto:ottijessecode@gmail.com"
            style={{
              display: 'none',
              '@media (minWidth: 768px)': { display: 'inline-block' }
            } as any}
            className="hire-me-btn"
          >
            <style>{`
              .hire-me-btn {
                background: var(--text-primary);
                color: var(--bg-primary);
                text-decoration: none;
                font-size: 11px;
                font-weight: 600;
                text-transform: uppercase;
                letter-spacing: 0.1em;
                padding: 10px 24px;
                border-radius: 100px;
                transition: all 0.3s ease;
              }
              .hire-me-btn:hover {
                background: var(--accent);
                color: #fff;
              }
              @media (min-width: 768px) {
                .hire-me-btn { display: inline-block !important; }
              }
            `}</style>
            Hire Me
          </a>

          {/* Hamburger */}
          <button
            onClick={onMenuToggle}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'transparent',
              border: '1px solid rgba(26,24,21,0.1)',
              borderRadius: '100px',
              padding: '10px 16px 10px 20px',
              color: 'var(--text-primary)',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(26,24,21,0.05)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            {menuOpen ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
                Close
              </>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                Menu
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

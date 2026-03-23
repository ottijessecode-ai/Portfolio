'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Link from 'next/link'
import { EmailIcon, WhatsAppIcon, LinkedInIcon } from '../shared/SocialIcons'

interface ToggleMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function ToggleMenu({ isOpen, onClose }: ToggleMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  
  const links = [
    { label: 'Home', href: '/' },
    { label: 'Selected Work', href: '/#portfolio' },
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/contact' }
  ]

  useEffect(() => {
    if (isOpen) {
      // Menu Entrance
      gsap.to(menuRef.current, {
        y: 0,
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.8,
        ease: 'power4.inOut',
      })
      gsap.to(overlayRef.current, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.5,
        ease: 'power2.out',
      })
      gsap.fromTo('.menu-link-item', {
        y: 40,
        opacity: 0,
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        delay: 0.2
      })
    } else {
      // Menu Exit
      gsap.to(menuRef.current, {
        y: '-100%',
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.7,
        ease: 'power4.inOut',
      })
      gsap.to(overlayRef.current, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.5,
        ease: 'power2.out',
      })
    }
  }, [isOpen])

  return (
    <>
      {/* Dark Blur Overlay */}
      <div
        ref={overlayRef}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(26,24,21,0.5)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 99, // Below the floating pill navbar (z-100)
          opacity: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        ref={menuRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100svh',
          background: 'var(--bg-primary)',
          boxShadow: '0 20px 40px rgba(26,24,21,0.1)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflowY: 'auto', // Safely allows scrolling if laptop heights are still ultra-tiny
          transform: 'translateY(-100%)',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        {/* Explicit Close Button since Navbar hides itself entirely! */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '32px',
            right: '48px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            cursor: 'pointer',
            padding: '12px',
            zIndex: 101,
            pointerEvents: 'auto',
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
          CLOSE
        </button>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px' }}>
          {links.map((item, i) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={onClose} // Instantly close menu when navigating
              className="menu-link-item"
              style={{
                fontSize: 'clamp(32px, 6vw, 64px)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                transition: 'color 0.3s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div 
          className="menu-link-item"
          style={{ 
            marginTop: '60px', 
            display: 'flex', 
            gap: '24px', 
            borderTop: '1px solid rgba(26,24,21,0.1)', 
            paddingTop: '32px' 
          }}
        >
          <a href="mailto:ottijessecode@gmail.com" className="label" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <EmailIcon size={14} /> Email
          </a>
          <a href="https://wa.me/2348162225686" target="_blank" rel="noopener noreferrer" className="label" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <WhatsAppIcon size={14} /> WhatsApp
          </a>
        </div>
      </div>
    </>
  )
}

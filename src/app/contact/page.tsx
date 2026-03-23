'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { EmailIcon, WhatsAppIcon } from '@/components/shared/SocialIcons'

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Entrance animation
    const ctx = gsap.context(() => {
      gsap.from('.anim-up', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.1,
        delay: 0.3
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  return (
    <main ref={containerRef} style={{ minHeight: '100vh', paddingTop: '160px', background: 'var(--bg-primary)' }}>
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        
        {/* Header */}
        <p className="anim-up label" style={{ marginBottom: '24px' }}>Let's Start Work</p>
        <h1 className="anim-up display-lg" style={{ marginBottom: '24px' }}>
          Get In <span className="serif-italic" style={{ color: 'var(--accent)' }}>Touch</span>
        </h1>
        <p className="anim-up body-lg" style={{ maxWidth: '600px', marginBottom: '80px' }}>
          Whether you need a full premium website overhaul, a new web application, or custom branding, I'm currently open for new projects. Reach out below.
        </p>

        {/* Minimalist Contact Form */}
        <form 
          className="anim-up" 
          style={{ 
            width: '100%', 
            maxWidth: '600px', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '32px',
            textAlign: 'left'
          }}
          onSubmit={(e) => {
            e.preventDefault()
            alert('Your message has been sent to Jesse Otti!')
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Your Name</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Christabel Chinaza"
              style={{
                width: '100%',
                padding: '20px 0',
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid rgba(26,24,21,0.2)',
                fontSize: '18px',
                fontFamily: 'var(--font-primary)',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(26,24,21,0.2)'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Email Address</label>
            <input 
              required
              type="email" 
              placeholder="hello@yourbrand.com"
              style={{
                width: '100%',
                padding: '20px 0',
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid rgba(26,24,21,0.2)',
                fontSize: '18px',
                fontFamily: 'var(--font-primary)',
                color: 'var(--text-primary)',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(26,24,21,0.2)'}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Project Details</label>
            <textarea 
              required
              placeholder="Tell me about your project goals and timeframe..."
              rows={4}
              style={{
                width: '100%',
                padding: '20px 0',
                background: 'transparent',
                border: 'none',
                borderBottom: '2px solid rgba(26,24,21,0.2)',
                fontSize: '18px',
                fontFamily: 'var(--font-primary)',
                color: 'var(--text-primary)',
                outline: 'none',
                resize: 'none',
                transition: 'border-color 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'rgba(26,24,21,0.2)'}
            />
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            style={{ 
              marginTop: '40px', 
              alignSelf: 'flex-start',
              width: '100%' 
            }}
          >
            Send Inquiry
          </button>
        </form>

        {/* Direct Contacts */}
        <div className="anim-up" style={{ marginTop: '100px', paddingBottom: '100px', display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          <p className="label">Prefer direct contact?</p>
          <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a href="mailto:ottijessecode@gmail.com" className="body-lg" style={{ textDecoration: 'none', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <EmailIcon size={20} /> ottijessecode@gmail.com
            </a>
            <a href="https://wa.me/2348162225686" target="_blank" rel="noopener noreferrer" className="body-lg" style={{ textDecoration: 'none', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <WhatsAppIcon size={20} /> WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

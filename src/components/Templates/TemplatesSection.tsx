'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TornPaper from '../shared/TornPaper'

gsap.registerPlugin(ScrollTrigger)

const templateFeatures = ['Modern UI/UX', 'Smooth Animations', 'Fully Responsive', 'Easy to Customize', 'SEO Optimized', 'Webflow Ready']

export default function TemplatesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.tmpl-header-el', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: '.tmpl-header', start: 'top 80%' },
      })

      gsap.from('.tmpl-card-el', {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: { trigger: '.tmpl-grid', start: 'top 75%' },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const templates = [
    {
      title: 'Luxury Real Estate',
      description: 'A high-end, conversion-focused template designed for real estate and premium brands.',
      price: '$79',
      badge: '🏆 Best Seller',
      color: '#C9A84C',
      bg: 'linear-gradient(135deg, #1a1505, #2d2310, #3d3015)',
      tags: ['Real Estate', 'Webflow', 'Premium'],
    },
    {
      title: 'SaaS Landing Page',
      description: 'Clean, high-converting template crafted for software products and digital services.',
      price: '$59',
      badge: '⚡ New',
      color: '#4ABFB5',
      bg: 'linear-gradient(135deg, #051a1a, #0a2d2d, #0f3d3d)',
      tags: ['SaaS', 'Dark Mode', 'Next.js'],
    },
    {
      title: 'Portfolio Pro',
      description: 'Minimal, stunning portfolio template for designers, developers and creatives.',
      price: '$49',
      badge: '🎨 Popular',
      color: '#E8453C',
      bg: 'linear-gradient(135deg, #1a0a0a, #2d1515, #3d1a1a)',
      tags: ['Portfolio', 'Minimal', 'GSAP'],
    },
  ]

  return (
    <>
      <section
        id="templates"
        ref={sectionRef}
        className="section-cream section-pad"
      >
        <div className="container">
          {/* Header */}
          <div className="tmpl-header" style={{ marginBottom: '72px' }}>
            <p className="tmpl-header-el label" style={{ marginBottom: '16px' }}>
              07 — Templates
            </p>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '24px',
              }}
            >
              <h2 className="tmpl-header-el display-lg" style={{ color: 'var(--charcoal)' }}>
                Premium
                <br />
                <span style={{ color: 'var(--coral)' }}>Templates</span>
              </h2>
              <p className="tmpl-header-el body-md" style={{ color: '#666', maxWidth: '300px' }}>
                Premium website templates designed for performance and scalability. Buy once, use forever.
              </p>
            </div>
          </div>

          {/* Templates grid */}
          <div
            className="tmpl-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              marginBottom: '60px',
            }}
          >
            {templates.map((tmpl, i) => (
              <div
                key={tmpl.title}
                className="tmpl-card-el work-card"
                style={{
                  background: tmpl.bg,
                  borderRadius: '20px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.06)',
                  cursor: 'pointer',
                }}
              >
                {/* Preview area */}
                <div
                  style={{
                    height: '220px',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                  }}
                >
                  {/* Grid BG */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      opacity: 0.15,
                      backgroundImage:
                        'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)',
                      backgroundSize: '30px 30px',
                    }}
                  />

                  {/* Badge */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      left: '20px',
                      padding: '6px 14px',
                      background: `${tmpl.color}22`,
                      border: `1px solid ${tmpl.color}40`,
                      borderRadius: '100px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '11px',
                      fontWeight: 600,
                      color: tmpl.color,
                      letterSpacing: '0.05em',
                    }}
                  >
                    {tmpl.badge}
                  </div>

                  {/* Price */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '16px',
                      right: '20px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '20px',
                      color: 'var(--off-white)',
                    }}
                  >
                    {tmpl.price}
                  </div>

                  {/* Mock layout */}
                  <div
                    style={{
                      width: '70%',
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: '10px',
                      border: '1px solid rgba(255,255,255,0.08)',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {[80, 60, 45, 70].map((w, j) => (
                      <div
                        key={j}
                        style={{
                          height: j === 0 ? '12px' : '6px',
                          width: `${w}%`,
                          background: `linear-gradient(90deg, ${tmpl.color}50, ${tmpl.color}20)`,
                          borderRadius: '3px',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Card info */}
                <div
                  style={{
                    padding: '24px 24px 28px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: '18px',
                      color: 'var(--off-white)',
                      letterSpacing: '-0.02em',
                      marginBottom: '8px',
                    }}
                  >
                    {tmpl.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '13px',
                      color: 'var(--mid-grey)',
                      lineHeight: 1.6,
                      marginBottom: '20px',
                    }}
                  >
                    {tmpl.description}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {tmpl.tags.map((t) => (
                      <span key={t} className="tag" style={{ borderColor: `${tmpl.color}30`, color: tmpl.color, fontSize: '10px' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn-outline"
                      style={{ flex: 1, justifyContent: 'center', padding: '10px', fontSize: '11px' }}
                    >
                      Preview
                    </button>
                    <button
                      className="btn-primary"
                      style={{ flex: 1, justifyContent: 'center', padding: '10px', fontSize: '11px', background: tmpl.color }}
                    >
                      Buy {tmpl.price}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Features row */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              justifyContent: 'center',
              padding: '32px',
              background: 'var(--charcoal)',
              borderRadius: '16px',
            }}
          >
            {templateFeatures.map((f) => (
              <span key={f} className="tag" style={{ borderColor: 'rgba(74,191,181,0.25)', color: 'var(--teal)', background: 'rgba(74,191,181,0.07)' }}>
                ✓ {f}
              </span>
            ))}
          </div>
        </div>
      </section>
      <TornPaper fromColor="#F2EFE6" toColor="#111111" />
    </>
  )
}

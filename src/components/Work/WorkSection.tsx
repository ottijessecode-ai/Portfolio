'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    num: '01',
    title: 'Atrum Real Estate',
    category: 'Website Design & Dev',
    description: 'A luxury real estate platform built with cinematic scroll animations and premium dark aesthetics, designed to convert high-intent buyers.',
    url: 'https://atrum-real-estate.vercel.app/',
  },
  {
    num: '02',
    title: 'Resurgence Landscapes',
    category: 'Webflow Development',
    description: 'A high-impact landscaping brand website featuring scrollytelling image sequences, parallax scenes, and lush editorial design.',
    url: 'https://resurgencelandscapes.netlify.app/',
  },
]

export default function WorkSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header
      gsap.from('.work-header-el', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '.work-header', start: 'top 80%' },
      })

      // Cards Stagger
      gsap.from('.work-card-wrapper', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        stagger: 0.2,
        scrollTrigger: { trigger: '.work-list', start: 'top 70%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="section-pad"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="container">
        {/* Header */}
        <div
          className="work-header"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            marginBottom: '80px',
            borderBottom: '1px solid rgba(26,24,21,0.1)',
            paddingBottom: '40px'
          }}
        >
          <h2 className="work-header-el display-lg" style={{ color: 'var(--text-primary)' }}>
            Selected <span className="serif-italic" style={{ color: 'var(--accent)' }}>Work</span>
          </h2>
          <p className="work-header-el label" style={{ alignSelf: 'flex-start', marginTop: '20px' }}>
            [ LIVE PREVIEWS ]
          </p>
        </div>

        {/* Massive Graphic Preview View */}
        <div className="work-list" style={{ display: 'flex', flexDirection: 'column', gap: '120px' }}>
          {projects.map((p, i) => (
            <div key={p.num} className="work-card-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>

              {/* Info Row */}
              <div
                className="work-info-row"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-end',
                  borderBottom: '1px solid rgba(26,24,21,0.05)',
                  paddingBottom: '20px'
                }}
              >
                <div>
                  <span className="serif-italic" style={{ fontSize: '24px', color: 'rgba(26,24,21,0.4)', display: 'block', marginBottom: '8px' }}>
                    {p.num}
                  </span>
                  <h3 style={{ fontSize: '48px', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: '12px' }}>
                    {p.title}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
                    <span className="label">{p.category}</span>
                    <span style={{ color: 'rgba(26,24,21,0.3)' }} className="mobile-hide">|</span>
                    <p className="work-description" style={{ fontFamily: 'var(--font-primary)', fontSize: '15px', color: 'rgba(26,24,21,0.6)', maxWidth: '500px' }}>
                      {p.description}
                    </p>
                  </div>
                </div>

                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  Visit Live Site →
                </a>
              </div>

              {/* Live Iframe Display Mockup - Clickable */}
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: '100%',
                  aspectRatio: '16/9',
                  background: '#e0e0e0',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 40px 80px rgba(26,24,21,0.08)',
                  position: 'relative',
                  display: 'block',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                {/* Mock Browser Header */}
                <div style={{ background: '#f5f5f5', height: '40px', width: '100%', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f' }} />

                  {/* Mock URL bar */}
                  <div style={{
                    flex: 1,
                    margin: '0 24px',
                    background: '#fff',
                    height: '24px',
                    borderRadius: '4px',
                    border: '1px solid #ddd',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 12px',
                    fontSize: '11px',
                    color: '#888',
                    fontFamily: 'sans-serif'
                  }}>
                    {p.url}
                  </div>
                </div>

                {/* Secure iframe embedding the site */}
                <iframe
                  src={p.url}
                  style={{
                    width: '100%',
                    height: 'calc(100% - 40px)',
                    border: 'none',
                    pointerEvents: 'none' /* Ensures the click passes to the <a> tag */
                  }}
                  title={p.title}
                  sandbox="allow-scripts allow-same-origin"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

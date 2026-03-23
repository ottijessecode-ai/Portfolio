'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    num: '01',
    title: 'Discovery',
    description: 'Understanding your goals, audience, and project requirements to build a rock-solid foundation. We align on vision before writing a single line of code.',
  },
  {
    num: '02',
    title: 'Strategy',
    description: 'Planning structure, user flow, and conversion-focused layout. Strategy maps the territory so design can conquer it.',
  },
  {
    num: '03',
    title: 'Design',
    description: 'Crafting a visually engaging and user-friendly interface that captures your brand\'s identity exactly as envisioned.',
  },
  {
    num: '04',
    title: 'Development',
    description: 'Building a fast, responsive website with smooth interactions and production-grade code. Performance is paramount.',
  },
]

export default function ProcessSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.from('.proc-header', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.proc-header', start: 'top 80%' },
      })

      // Active state scroll triggers
      steps.forEach((_, i) => {
        ScrollTrigger.create({
          trigger: `.proc-trigger-${i}`,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveStep(i),
          onEnterBack: () => setActiveStep(i),
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="section-pad"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid rgba(26,24,21,0.05)',
      }}
    >
      <div className="container">
        <div className="proc-header" style={{ textAlign: 'center', marginBottom: '120px' }}>
          <p className="label" style={{ marginBottom: '24px' }}>Workflow</p>
          <h2 className="display-lg">
            Methodology <span className="serif-italic" style={{ color: 'var(--accent)' }}>refined.</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          
          {/* Left Sticky Big Numbers */}
          <div style={{ position: 'sticky', top: '25vh' }}>
            <div style={{ position: 'relative', height: '30vh' }}>
              {steps.map((step, i) => (
                <div
                  key={step.num}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    opacity: activeStep === i ? 1 : 0,
                    transform: activeStep === i ? 'translateY(0)' : 'translateY(40px)',
                    transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <span
                    className="serif-italic"
                    style={{
                      fontSize: 'clamp(150px, 20vw, 300px)',
                      lineHeight: 0.8,
                      color: 'transparent',
                      WebkitTextStroke: '2px var(--accent)',
                    }}
                  >
                    {step.num}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Scrolling Content */}
          <div style={{ paddingBottom: '20vh' }}>
            {steps.map((step, i) => (
              <div
                key={step.num}
                className={`proc-trigger-${i}`}
                style={{
                  minHeight: '40vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  opacity: activeStep === i ? 1 : 0.2,
                  transition: 'opacity 0.6s ease',
                }}
              >
                <h3 style={{ fontSize: '48px', marginBottom: '24px', letterSpacing: '-0.02em' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '18px', lineHeight: 1.7, color: 'rgba(26,24,21,0.7)', maxWidth: '420px' }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import dynamic from 'next/dynamic'
import SmoothScrollProvider from '@/components/SmoothScrollProvider'
import HeroSection from '@/components/Hero/HeroSection'
import WorkSection from '@/components/Work/WorkSection'
import ServicesSection from '@/components/Services/ServicesSection'
import ProcessSection from '@/components/Process/ProcessSection'
import AboutSection from '@/components/About/AboutSection'
import ProofSection from '@/components/Proof/ProofSection'
import CTASection from '@/components/CTA/CTASection'
import FooterSection from '@/components/Footer/FooterSection'

// Client-only (no SSR)
const Navbar = dynamic(() => import('@/components/Navigation/Navbar'), { ssr: false })
const ToggleMenu = dynamic(() => import('@/components/Navigation/ToggleMenu'), { ssr: false })
const AvatarCharacter = dynamic(() => import('@/components/Avatar/AvatarCharacter'), { ssr: false })
const CustomCursor = dynamic(() => import('@/components/CustomCursor'), { ssr: false })

export default function Home() {
  return (
    <SmoothScrollProvider>
      {/* Globally injected client components */}
      <CustomCursor />

      {/* Noise overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Main page */}
      <main>
        <HeroSection />
        <WorkSection />
        <ServicesSection />
        <ProcessSection />
        <AboutSection />
        <ProofSection />
        <CTASection />
        <FooterSection />
      </main>
    </SmoothScrollProvider>
  )
}

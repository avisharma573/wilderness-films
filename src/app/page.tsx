'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from '@/components/ui/LoadingScreen'
import Navigation from '@/components/layout/Navigation'
import AudioToggle from '@/components/ui/AudioToggle'
import HeroSection from '@/components/sections/HeroSection'
import WildlifeSection from '@/components/sections/WildlifeSection'
import JourneySection from '@/components/sections/JourneySection'
import FilmsSection from '@/components/sections/FilmsSection'
import ClientsSection from '@/components/sections/ClientsSection'
import ContactSection from '@/components/sections/ContactSection'
import Footer from '@/components/layout/Footer'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate premium asset loading experience
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3200)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Loading screen with cinematic entrance */}
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading" />}
      </AnimatePresence>

      {/* Main site — fades in after loading */}
      {!isLoading && (
        <>
          <Navigation />
          <AudioToggle />
          <main>
            {/* Section 1: Hero with 3D Globe */}
            <HeroSection />

            {/* Section 2: Wildlife Species Cards */}
            <WildlifeSection />

            {/* Section 3: Featured Films */}
            <FilmsSection />

            {/* Section 4: Journey Across India Timeline */}
            <JourneySection />

            {/* Section 5: Clients & Collaborations */}
            <ClientsSection />

            {/* Section 6: Contact */}
            <ContactSection />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

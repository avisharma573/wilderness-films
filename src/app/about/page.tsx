import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import AboutContent from './AboutContent'

export const metadata = {
  title: 'About Us — Wilderness Films India',
  description: 'South Asia\'s largest factual visual archive. 37 years of fieldwork, 150,000+ hours of footage, and an unshakeable obsession with India.',
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <AboutContent />
      <Footer />
    </>
  )
}

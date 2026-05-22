import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import AboutContent from './AboutContent'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Meet the team behind South Asia\'s largest factual visual archive. Rupin Dang — filmmaker, mountaineer, naturalist — founded Wilderness Films India in 1987. 37+ years of unparalleled access, 150,000+ hours of footage, and a deep love for the wild.',
  keywords: [
    'rupin dang', 'wilderness films india founder', 'wildlife filmmaker india',
    'indian naturalist', 'limca book of records filmmaker', 'dartmouth college india',
    'wilderness films india team', 'jabbarkhet estate', 'mountain quail estate',
  ],
  openGraph: {
    title: 'About Us — Wilderness Films India',
    description:
      'The story behind India\'s foremost wildlife archive. Founded in 1987 by Rupin Dang — filmmaker, mountaineer, naturalist, and Limca Book of Records holder.',
    url: 'https://www.wildfilmsindia.com/about',
    images: [{ url: '/rupinD.jpg', width: 1200, height: 800, alt: 'Rupin Dang — Founder, Wilderness Films India' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us — Wilderness Films India',
    description: 'The story behind India\'s foremost wildlife archive. Founded in 1987 by Rupin Dang.',
    images: ['/rupinD.jpg'],
  },
  alternates: { canonical: 'https://www.wildfilmsindia.com/about' },
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

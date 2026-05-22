import type { Metadata } from 'next'
import OfferingsContent from './OfferingsContent'

export const metadata: Metadata = {
  title: 'Offerings',
  description:
    'Stock footage licensing, production & location services, equipment hire, crewing, and used equipment sales across India. 37 years of unmatched access — from Himalayan borders to critical wildlife habitats.',
  keywords: [
    'stock footage india', 'india stock footage licensing', 'production services india',
    'location services india', 'equipment hire india', 'betacam india', 'HDCAM india',
    'RED camera india', 'Arri india', '4K footage india', 'wildlife crew india',
    'cameraman india', 'india fixer', 'broadcast equipment india', 'used equipment india',
  ],
  openGraph: {
    title: 'Offerings — Wilderness Films India',
    description:
      'Stock footage licensing, production & location services, equipment hire and sales. Serving broadcasters from BBC to Netflix across India since 1987.',
    url: 'https://www.wildfilmsindia.com/offerings',
  },
  alternates: { canonical: 'https://www.wildfilmsindia.com/offerings' },
}

export default function OfferingsPage() {
  return <OfferingsContent />
}
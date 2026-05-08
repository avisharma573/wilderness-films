import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Wilderness Films India — Cinematic Wildlife Stories',
  description: 'India. Untamed. Premium cinematic wildlife storytelling from the heart of the wild. Award-winning documentary films from Ranthambore to Kaziranga.',
  keywords: ['wildlife films', 'India documentary', 'nature films', 'tiger', 'wildlife photography', 'Jim Corbett', 'Ranthambore'],
  openGraph: {
    title: 'Wilderness Films India',
    description: 'Cinematic wildlife storytelling from the heart of the wild.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/* Cinematic film grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  )
}

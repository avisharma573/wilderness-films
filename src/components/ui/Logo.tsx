'use client'

import Image from 'next/image'

// Full stacked logo — used on loading screen
export function LogoStacked({ scale = 1 }: { scale?: number }) {
  const size = Math.round(160 * scale)
  return (
    <Image
      src="/logo.png"
      alt="Wild Films India"
      width={size}
      height={size}
      priority
      style={{ objectFit: 'contain' }}
    />
  )
}

// Compact nav / footer logo
export function LogoCompact({ size = 22 }: { size?: number }) {
  const px = Math.round(size * 4.2)
  return (
    <Image
      src="/logo.png"
      alt="Wild Films India"
      width={px}
      height={px}
      priority
      style={{ objectFit: 'contain' }}
    />
  )
}

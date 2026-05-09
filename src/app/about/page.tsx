import Navigation from '@/components/layout/Navigation'

export const metadata = {
  title: 'About Us — Wilderness Films India',
}

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main
        style={{
          minHeight: '100svh',
          background: '#080c09',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          padding: '0 24px',
        }}
      >
        {/* Ambient glow */}
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: '0.5rem',
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          color: 'rgba(201,168,76,0.45)',
          position: 'relative',
        }}>
          Wilderness Films India
        </p>

        <h1 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(2rem, 5vw, 4rem)',
          fontWeight: 300,
          color: '#F0EDE8',
          letterSpacing: '0.04em',
          lineHeight: 1.05,
          textAlign: 'center',
          position: 'relative',
        }}>
          About Us —{' '}
          <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Coming Soon</span>
        </h1>

        <div style={{
          height: '1px',
          width: '48px',
          background: 'rgba(201,168,76,0.35)',
          position: 'relative',
        }} />
      </main>
    </>
  )
}

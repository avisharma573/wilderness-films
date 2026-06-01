'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

// ── Data ──────────────────────────────────────────────────────

const SERVICES = [
  {
    title: 'Stock Footage Licensing',
    body: 'Close to a century of archiving the landmark moments of India right up to the present time, using top-notch cameras and drone technology to archive visual time capsules of a progressive South Asia.',
  },
  {
    title: 'Production & Location Services',
    body: 'For 37 years, Wilderness Films India has filmed remote, inaccessible locations and nurtured relationships with organisations and bodies that provide us with unique access and permissions along our borders, in sensitive areas and critical wildlife habitats, all while following rules and regulations, and keeping in mind the sensitivities of local people and conservation imperatives.',
  },
  {
    title: 'Equipment Hire',
    body: 'We brought in the first analog Betacam SP equipment to India in the early 1990s, followed shortly after by Digital Betacam in the mid-1990s. A few years later, we introduced MiniDV with the digital video revolution, followed by HDCAM in the year 2000, when George Lucas shot Star Wars: The Phantom Menace, followed in rapid succession by a range of formats including DVCPro HD, XDCAM, HDCAM SR, and the modern 4K and 6K cameras from Sony, Canon, Panasonic, RED, and Arri.',
  },
  {
    title: 'Equipment & Crewing',
    body: 'For close to four decades, Wilderness Films India has been the mothership for the crewing and equipment industry for Indian broadcasting and field production work. Many camerapersons in India today have passed through our portals over the years.',
  },
  {
    title: 'Used & New Equipment Sales',
    body: 'As we kept moving in and out of formats, we decided that production houses and small producers could greatly benefit from our previous generation equipment and decided to offer a range of new and used equipment services for purchase.',
  },
]

// ── Helpers ───────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontFamily: '"Space Mono", monospace',
      fontSize: '0.50rem',
      letterSpacing: '0.30em',
      textTransform: 'uppercase',
      color: 'rgba(201,168,76,0.50)',
      marginBottom: '20px',
    }}>
      {children}
    </p>
  )
}

function GoldRule() {
  return (
    <div style={{
      height: '1px',
      background: 'linear-gradient(90deg, rgba(201,168,76,0.35), transparent)',
      marginTop: '20px',
    }} />
  )
}

// ── Page ──────────────────────────────────────────────────────

export default function OfferingsPage() {
  return (
    <>
      <Navigation />

      <main style={{ background: '#030303', minHeight: '100svh' }}>

        {/* ── 1. HERO ─────────────────────────────────────────── */}
        <section style={{
          position: 'relative',
          padding: 'clamp(80px, 14vw, 120px) clamp(20px, 6vw, 48px) clamp(20px, 3vw, 36px)',
          textAlign: 'center',
          overflow: 'hidden',
        }}>
          {/* Ambient glow */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.05) 0%, transparent 65%)',
          }} />
          {/* Top gradient */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.20), transparent)',
          }} />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.50rem',
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.45)',
              marginBottom: '24px',
              position: 'relative',
            }}
          >
            Wilderness Films India
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 300,
              color: '#F0EDE8',
              letterSpacing: '0.16em',
              lineHeight: 1,
              margin: 0,
              position: 'relative',
            }}
          >
            Offerings
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{
              height: '1px',
              width: '60px',
              background: 'rgba(201,168,76,0.45)',
              margin: '28px auto',
              transformOrigin: 'center',
              position: 'relative',
            }}
          />

        </section>

        {/* ── 2. SERVICES GRID ────────────────────────────────── */}
        <ServicesSection />

      </main>
      <Footer />
    </>
  )
}

// ── Services ──────────────────────────────────────────────────

function ServicesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{ padding: 'clamp(20px, 4vw, 48px) clamp(20px, 6vw, 48px)', maxWidth: '1200px', margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        style={{ marginBottom: '56px' }}
      >
        <SectionLabel>What We Offer</SectionLabel>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
          fontWeight: 300,
          color: '#F0EDE8',
          lineHeight: 1.05,
          margin: 0,
        }}>
          Our{' '}
          <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Services</span>
        </h2>
        <GoldRule />
      </motion.div>

      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'center',
      }}>
        {SERVICES.map((svc, i) => (
          <ServiceCard key={svc.title} svc={svc} index={i} inView={inView} />
        ))}
      </div>
    </section>
  )
}

function ServiceCard({ svc, index, inView }: { svc: typeof SERVICES[0]; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false)
  const isEquipmentSales = svc.title === 'Used & New Equipment Sales'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 'clamp(280px, 30%, 380px)',
        padding: '28px 24px',
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.07)'}`,
        borderTop: `2px solid ${hovered ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.18)'}`,
        borderRadius: '2px',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? '0 0 32px rgba(201,168,76,0.06)' : 'none',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <p style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: hovered ? '#C9A84C' : 'rgba(201,168,76,0.85)',
        marginBottom: '14px',
        transition: 'color 0.3s',
      }}>
        {svc.title}
      </p>
      <p style={{
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        fontSize: '1.05rem',
        fontWeight: 300,
        color: 'rgba(240,237,232,0.72)',
        lineHeight: 1.85,
        flex: 1,
      }}>
        {svc.body}
      </p>
      {isEquipmentSales && (
        <Link
          href="/equipment"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginTop: '20px',
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.55rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#C9A84C',
            textDecoration: 'none',
            border: '1px solid rgba(201,168,76,0.35)',
            borderRadius: '2px',
            padding: '0.55rem 1rem',
            transition: 'background 0.2s, color 0.2s, border-color 0.2s',
            alignSelf: 'flex-start',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'rgba(201,168,76,0.12)'
            el.style.borderColor = 'rgba(201,168,76,0.6)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'transparent'
            el.style.borderColor = 'rgba(201,168,76,0.35)'
          }}
        >
          View Equipment
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </motion.div>
  )
}

'use client'

import { useRef, useState } from 'react'

import { motion, useInView } from 'framer-motion'
import Navigation from '@/components/layout/Navigation'

// ── Data ──────────────────────────────────────────────────────

const SERVICES = [
  {
    title: 'Stock Footage Licensing',
    body: 'Three decades of cinematic footage across India\'s most remote ecosystems — available for licensing to broadcasters, streamers, and independent filmmakers worldwide.',
  },
  {
    title: 'Production & Location Services',
    body: 'End-to-end production support across India: location scouting, permissions, local fixer networks, and on-ground logistics for international crews.',
  },
  {
    title: 'Equipment & Crewing',
    body: 'Experienced wildlife cinematographers, sound recordists, and production coordinators who understand both the terrain and the story.',
  },
  {
    title: 'Equipment Hire',
    body: 'Professional-grade cinema cameras, lenses, stabilisers, and audio equipment available for short- and long-term hire across India.',
  },
  {
    title: 'Used & New Equipment Sales',
    body: 'A curated inventory of pre-owned and new production equipment — rigorously tested, fairly priced, backed by our decades of field experience.',
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
          padding: 'clamp(100px, 22vw, 160px) clamp(20px, 6vw, 48px) clamp(60px, 10vw, 100px)',
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'rgba(240,237,232,0.35)',
              letterSpacing: '0.04em',
              position: 'relative',
            }}
          >
            Crafted for storytellers. Built for the wild.
          </motion.p>
        </section>

        {/* ── 2. SERVICES GRID ────────────────────────────────── */}
        <ServicesSection />

      </main>
    </>
  )
}

// ── Services ──────────────────────────────────────────────────

function ServicesSection() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} style={{ padding: 'clamp(40px, 8vw, 80px) clamp(20px, 6vw, 48px)', maxWidth: '1200px', margin: '0 auto' }}>
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
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
        gap: '16px',
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px 24px',
        background: 'rgba(255,255,255,0.02)',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.35)' : 'rgba(255,255,255,0.07)'}`,
        borderTop: `2px solid ${hovered ? 'rgba(201,168,76,0.55)' : 'rgba(201,168,76,0.18)'}`,
        borderRadius: '2px',
        transition: 'border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? '0 0 32px rgba(201,168,76,0.06)' : 'none',
        backdropFilter: 'blur(8px)',
      }}
    >
      <p style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.56rem',
        letterSpacing: '0.20em',
        textTransform: 'uppercase',
        color: hovered ? '#C9A84C' : 'rgba(201,168,76,0.65)',
        marginBottom: '14px',
        transition: 'color 0.3s',
      }}>
        {svc.title}
      </p>
      <p style={{
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        fontSize: '0.92rem',
        fontWeight: 300,
        color: 'rgba(240,237,232,0.45)',
        lineHeight: 1.75,
      }}>
        {svc.body}
      </p>
    </motion.div>
  )
}

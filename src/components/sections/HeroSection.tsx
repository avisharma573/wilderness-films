'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

function FloatingParticle({ delay, duration }: { delay: number; duration: number }) {
  const left = `${Math.random() * 100}%`
  const size = Math.random() * 2.5 + 0.8

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left,
        bottom: '-10px',
        width: size,
        height: size,
        background: Math.random() > 0.5 ? '#C9A84C' : '#6BAE4A',
        opacity: 0,
      }}
      animate={{
        y: [0, -(Math.random() * 380 + 180)],
        opacity: [0, 0.5, 0],
        x: [0, (Math.random() - 0.5) * 80],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'easeOut' }}
    />
  )
}

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [particles] = useState(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: i * 0.8,
      duration: 6 + Math.random() * 6,
    }))
  )

  // Scroll-driven parallax for background only — content is never transformed
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '680px' }}
    >
      {/* ── Background: Ken Burns + scroll parallax ── */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: '-12%',
            height: '124%',
            backgroundImage: 'url(/himalayan.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center 50%',
            filter: 'brightness(0.52) saturate(0.75)',
            willChange: 'transform',
            y: imageY,
          }}
          animate={{ scale: [1, 1.03] }}
          transition={{ duration: 26, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>

      {/* ── Gradient overlays ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(3,3,3,0.82) 0%, rgba(3,3,3,0.55) 35%, rgba(3,3,3,0.18) 65%, transparent 100%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(3,3,3,0.75) 0%, rgba(3,3,3,0.2) 30%, transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(3,3,3,0.55) 0%, transparent 22%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 70% 60%, rgba(201,168,76,0.06) 0%, transparent 60%)',
        }}
      />

      {/* ── Fog layer ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to bottom, transparent 45%, rgba(200,210,220,0.04) 70%, rgba(180,195,210,0.07) 100%)',
        }}
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* ── Subtle grid ── */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
        }}
      />

      {/* ── Floating particles ── */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {particles.map((p) => (
          <FloatingParticle key={p.id} delay={p.delay} duration={p.duration} />
        ))}
      </div>

      {/* ── Hero content ──
          No x/y transforms on this wrapper — content is absolutely stable.
          Mouse parallax removed: it caused visible text drift/shake.        */}
      <div
        className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24"
        style={{ maxWidth: '680px' }}
      >
        {/* Overline */}
        <motion.p
          className="text-overline mb-4"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Wilderness Films India — Est. 1988
        </motion.p>

        {/* Title block — both lines grouped as one visual unit */}
        <div style={{ marginBottom: '35px' }}>

          {/* Line 1: "India:" */}
          <div style={{ overflow: 'hidden', paddingBottom: '0.08em' }}>
            <motion.h1
              className="font-display text-glow-gold"
              initial={{ y: '115%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(4rem, 9vw, 8rem)',
                fontWeight: 300,
                letterSpacing: '0.02em',
                lineHeight: 1,
                color: '#F0EDE8',
                display: 'block',
                margin: 0,
              }}
            >
              India:
            </motion.h1>
          </div>

          {/* Line 2: "A Visual Mapping" — extra paddingBottom catches italic descenders (g, p) */}
          <div style={{ overflow: 'hidden', paddingBottom: '0.32em' }}>
            <motion.h1
              className="font-display"
              initial={{ y: '115%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.7, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: 'clamp(2.4rem, 5.5vw, 5rem)',
                fontWeight: 300,
                letterSpacing: '0.04em',
                lineHeight: 1,
                color: 'var(--color-gold)',
                fontStyle: 'italic',
                display: 'block',
                margin: 0,
              }}
            >
              A Visual Mapping
            </motion.h1>
          </div>

        </div>

        {/* Divider + tagline */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: 'left' }}
        >
          <div className="h-px w-12" style={{ background: 'var(--color-gold)' }} />
          <p
            className="font-body"
            style={{
              fontSize: 'clamp(0.8rem, 1.1vw, 0.95rem)',
              color: 'rgba(240,237,232,0.55)',
              maxWidth: '360px',
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Cinematic wildlife storytelling from the heart of the wild.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <a href="#films" className="btn-primary">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 2 L11 7 L3 12 Z" fill="currentColor" />
            </svg>
            Explore Films
          </a>
          <a href="#wildlife" className="btn-secondary">
            Enter The Wild
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7 H12 M8 3 L12 7 L8 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
          </a>
        </motion.div>

        {/* Hotspot dots */}
        <motion.div
          className="flex items-center gap-3 mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="flex gap-1.5">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--color-gold)' }}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
              />
            ))}
          </div>
          <span
            className="font-mono"
            style={{ fontSize: '0.65rem', color: 'rgba(201,168,76,0.5)', letterSpacing: '0.15em' }}
          >
            7 WILDLIFE SANCTUARIES
          </span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <span
          className="font-mono text-xs tracking-widest"
          style={{ color: 'rgba(201,168,76,0.4)' }}
        >
          SCROLL
        </span>
        <motion.div
          className="w-px h-12"
          style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.5), transparent)' }}
          animate={{ scaleY: [0, 1, 0], originY: 'top' }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      {/* Corner coordinates */}
      <div
        className="absolute top-20 right-8 md:right-16 font-mono text-right z-20"
        style={{ color: 'rgba(201,168,76,0.2)', fontSize: '0.6rem', letterSpacing: '0.2em' }}
      >
        <p>20.5937° N</p>
        <p>78.9629° E</p>
        <p className="mt-1" style={{ color: 'rgba(107,174,74,0.4)' }}>INDIA</p>
      </div>
    </section>
  )
}

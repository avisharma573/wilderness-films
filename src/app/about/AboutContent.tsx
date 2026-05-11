'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, animate } from 'framer-motion'
import Link from 'next/link'

// ── Reusable fade-up reveal ─────────────────────────────────────
function Reveal({
  children,
  delay = 0,
  className = '',
  y = 52,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

// ── Gold rule ──────────────────────────────────────────────────
function GoldRule({ delay = 0 }: { delay?: number }) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 1.1, delay, ease: [0.4, 0, 0.2, 1] }}
      style={{
        height: '1px',
        background: 'linear-gradient(90deg, var(--color-gold), transparent)',
        transformOrigin: 'left',
      }}
    />
  )
}

// ── Overline label ─────────────────────────────────────────────
function Overline({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <p style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.52rem',
        letterSpacing: '0.30em',
        textTransform: 'uppercase',
        color: 'rgba(201,168,76,0.6)',
        marginBottom: '1.25rem',
      }}>
        {children}
      </p>
    </Reveal>
  )
}

// ────────────────────────────────────────────────────────────────
// SECTION 1 — HERO
// ────────────────────────────────────────────────────────────────
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section
      ref={ref}
      className="relative flex flex-col items-center justify-center overflow-hidden"
      style={{ height: '100svh', minHeight: '640px', background: '#030303' }}
    >
      {/* Parallax background glow */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 60%, rgba(201,168,76,0.07) 0%, transparent 65%)',
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }} />
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.52rem',
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.55)',
            marginBottom: '2rem',
          }}
        >
          Wilderness Films India — Est. 1987
        </motion.p>

        <div style={{ overflow: 'hidden', marginBottom: '0.2rem' }}>
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.35, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 300,
              color: '#F0EDE8',
              lineHeight: 1,
              letterSpacing: '0.02em',
            }}
          >
            South Asia's
          </motion.h1>
        </div>
        <div style={{ overflow: 'hidden', marginBottom: '2.5rem' }}>
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              color: 'var(--color-gold)',
              lineHeight: 1,
              letterSpacing: '0.02em',
            }}
          >
            Largest Visual Archive
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: 'center', marginBottom: '2rem' }}
          className="flex items-center gap-4 justify-center"
        >
          <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.4)' }} />
          <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(201,168,76,0.5)' }} />
          <div style={{ height: '1px', width: '40px', background: 'rgba(201,168,76,0.4)' }} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: '"Outfit", sans-serif',
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            color: 'rgba(240,237,232,0.4)',
            lineHeight: 1.8,
            maxWidth: '520px',
            fontWeight: 300,
          }}
        >
          37 years of fieldwork. 150,000 hours of footage. Every corner of India, witnessed and preserved.
        </motion.p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
        >
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.4))' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────
// SECTION 2 — ORIGIN STORY
// ────────────────────────────────────────────────────────────────
function OriginSection() {
  return (
    <section
      className="relative px-6 md:px-12 lg:px-24 py-16 md:py-24"
      style={{ background: '#030303' }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left — large year */}
        <div>
          <Overline delay={0}>Our Story</Overline>
          <Reveal delay={0.1}>
            <p style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(7rem, 18vw, 14rem)',
              fontWeight: 300,
              color: 'transparent',
              lineHeight: 0.85,
              letterSpacing: '-0.02em',
              WebkitTextStroke: '1px rgba(201,168,76,0.55)',
              userSelect: 'none',
            }}>
              1987
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <GoldRule delay={0.3} />
          </Reveal>
        </div>

        {/* Right — story text */}
        <div className="pt-0 lg:pt-12">
          <Reveal delay={0.15}>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
              fontWeight: 300,
              color: '#F0EDE8',
              lineHeight: 1.15,
              marginBottom: '2rem',
              letterSpacing: '0.01em',
            }}>
              A single camera.<br />
              <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>An unshakeable conviction.</span>
            </h2>
          </Reveal>

          {[
            'In 1987, Wilderness Films India was born from a single belief — that India\'s natural and cultural stories were among the most extraordinary on earth, and that they deserved to be told with patience, depth, and reverence.',
            'What began as a personal obsession has grown into South Asia\'s most extensive factual visual archive. Over three and a half decades of fieldwork, across every state, every season, and every story — from the snowfields of Ladakh to the mangroves of the Sundarbans.',
            'Today, our footage has reached over 140 million viewers globally. Our archive holds more than 150,000 hours of India, unfiltered and alive.',
          ].map((para, i) => (
            <Reveal key={i} delay={0.2 + i * 0.12}>
              <p style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '1rem',
                color: 'rgba(240,237,232,0.45)',
                lineHeight: 1.9,
                fontWeight: 300,
                marginBottom: '1.5rem',
              }}>
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────
// SECTION 3 — NUMBERS
// ────────────────────────────────────────────────────────────────
const STATS = [
  { target: 37,  suffix: '+',     label: 'Years in the Field' },
  { target: 150, suffix: ',000+', label: 'Hours of Footage' },
  { target: 140, suffix: ',000+', label: 'Videos Published' },
  { target: 5,   suffix: 'M+',   label: 'YouTube Subscribers' },
]

function useCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    const controls = animate(0, target, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setCount(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, target])
  return count
}

function StatItem({ stat, index }: { stat: typeof STATS[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCounter(stat.target, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col items-center text-center"
    >
      <p style={{
        fontFamily: '"Cormorant Garamond", Georgia, serif',
        fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
        fontWeight: 300,
        color: 'var(--color-gold)',
        lineHeight: 1,
        marginBottom: '0.75rem',
        letterSpacing: '-0.01em',
      }}>
        {count}{stat.suffix}
      </p>
      <div style={{
        width: '20px', height: '1px',
        background: 'rgba(201,168,76,0.3)',
        margin: '0 auto 0.75rem',
      }} />
      <p style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.5rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(240,237,232,0.28)',
      }}>
        {stat.label}
      </p>
    </motion.div>
  )
}

function NumbersSection() {
  return (
    <section
      className="relative px-6 md:px-12 lg:px-24 py-14 md:py-20"
      style={{
        background: '#030303',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 65%)',
      }} />
      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────
// SECTION 4 — MANIFESTO (Apple sticky-style)
// ────────────────────────────────────────────────────────────────
const PILLARS = [
  {
    number: '01',
    title: 'We Don\'t Rush.',
    body: 'The perfect shot is worth returning for a hundred times. We measure our work in seasons, not schedules. India reveals itself only to those who wait.',
  },
  {
    number: '02',
    title: 'We Go Deeper.',
    body: 'Beyond the postcard. Beyond the predictable. We seek the stories that live in the margins — the overlooked rituals, the forgotten migrations, the quiet moments of extraordinary wildness.',
  },
  {
    number: '03',
    title: 'We Stay Longer.',
    body: '37 years of relationships have opened doors no outsider can reach. When you work with us, you inherit four decades of trust built across every corner of the subcontinent.',
  },
]

function ManifestoSection() {
  return (
    <section
      className="relative px-6 md:px-12 lg:px-24 py-16 md:py-24"
      style={{ background: '#030303' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Overline>Our Philosophy</Overline>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              color: '#F0EDE8',
              lineHeight: 1.05,
              maxWidth: '640px',
              letterSpacing: '0.01em',
            }}>
              How we see{' '}
              <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>the world</span>
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-0">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.1, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                padding: '2rem 0',
                gap: '1.5rem',
              }}
              className="grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] items-start"
            >
              {/* Number */}
              <span style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: 'rgba(201,168,76,0.35)',
                paddingTop: '0.3rem',
              }}>
                {pillar.number}
              </span>

              {/* Title */}
              <h3 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(1.6rem, 2.8vw, 2.4rem)',
                fontWeight: 300,
                color: '#F0EDE8',
                lineHeight: 1.1,
                letterSpacing: '0.01em',
              }}>
                {pillar.title}
              </h3>

              {/* Body */}
              <p style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '0.95rem',
                color: 'rgba(240,237,232,0.4)',
                lineHeight: 1.85,
                fontWeight: 300,
              }}>
                {pillar.body}
              </p>
            </motion.div>
          ))}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }} />
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────
// SECTION 5 — SERVICES
// ────────────────────────────────────────────────────────────────
const SERVICES = [
  {
    title: 'Stock Footage',
    description: 'The largest India-specific stock library in existence. 150,000+ hours spanning wildlife, culture, landscape, and urban life.',
    icon: '▶',
  },
  {
    title: 'Field Production',
    description: 'End-to-end production across India. Crews that know the terrain, the seasons, the people, and the permissions.',
    icon: '◎',
  },
  {
    title: 'Location Scouting',
    description: 'Access to locations no location agency can find. 37 years of fieldwork across every state and territory.',
    icon: '◈',
  },
  {
    title: 'Equipment & Crew',
    description: 'Cinema-grade gear, experienced operators, and local fixers who speak the language of every landscape.',
    icon: '⬡',
  },
  {
    title: 'Post Production',
    description: 'Colour grading, sound design, and editorial support built around the visual grammar of India.',
    icon: '◇',
  },
  {
    title: 'Consulting',
    description: 'Strategic production consulting for international broadcasters entering the Indian market for the first time.',
    icon: '○',
  },
]

function ServicesSection() {
  return (
    <section
      className="relative px-6 md:px-12 lg:px-24 py-16 md:py-24"
      style={{
        background: '#030303',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <Overline>What We Do</Overline>
          <Reveal delay={0.1}>
            <h2 style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              color: '#F0EDE8',
              lineHeight: 1.05,
              letterSpacing: '0.01em',
            }}>
              We can open doors<br />
              <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>no one else can.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px" style={{
          border: '1px solid rgba(255,255,255,0.05)',
          background: 'rgba(255,255,255,0.05)',
        }}>
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              style={{
                background: '#030303',
                padding: '2.5rem',
                position: 'relative',
                overflow: 'hidden',
              }}
              whileHover={{ background: 'rgba(201,168,76,0.025)' }}
            >
              {/* Icon */}
              <p style={{
                fontFamily: '"Space Mono", monospace',
                fontSize: '1rem',
                color: 'rgba(201,168,76,0.3)',
                marginBottom: '1.25rem',
              }}>
                {service.icon}
              </p>

              <h3 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 300,
                color: '#F0EDE8',
                marginBottom: '0.9rem',
                letterSpacing: '0.01em',
                lineHeight: 1.1,
              }}>
                {service.title}
              </h3>

              <p style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '0.875rem',
                color: 'rgba(240,237,232,0.35)',
                lineHeight: 1.8,
                fontWeight: 300,
              }}>
                {service.description}
              </p>

              {/* Hover accent line */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0,
                  height: '1px', width: '0%',
                  background: 'var(--color-gold)',
                }}
                whileHover={{ width: '100%' }}
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────
// SECTION 6 — FULL-WIDTH QUOTE
// ────────────────────────────────────────────────────────────────
function QuoteSection() {
  return (
    <section
      className="relative px-6 md:px-12 lg:px-24 py-16 md:py-20 overflow-hidden"
      style={{ background: '#030303' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.055) 0%, transparent 60%)',
      }} />

      <div className="relative max-w-5xl mx-auto text-center">
        <Reveal delay={0} y={32}>
          <p style={{
            fontFamily: '"Space Mono", monospace',
            fontSize: '0.52rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'rgba(201,168,76,0.4)',
            marginBottom: '2.5rem',
          }}>
            — In our own words
          </p>
        </Reveal>

        <Reveal delay={0.1} y={48}>
          <blockquote style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontSize: 'clamp(1.8rem, 4vw, 3.4rem)',
            fontWeight: 300,
            color: '#F0EDE8',
            lineHeight: 1.3,
            letterSpacing: '0.01em',
            fontStyle: 'italic',
          }}>
            "We don't just film India. We{' '}
            <span style={{ color: 'var(--color-gold)' }}>witness</span> it."
          </blockquote>
        </Reveal>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────
// SECTION 7 — CONSERVATION
// ────────────────────────────────────────────────────────────────
const SITES = [
  {
    name: 'The Haunted House',
    location: 'Jabbarkhet Estate, Uttarakhand',
    desc: 'A heritage woodland estate in the foothills of the Himalayas — home to leopards, Himalayan black bears, and over 200 species of birds.',
  },
  {
    name: 'Mountain Quail Estate',
    location: 'Motidhar Valley, Uttarakhand',
    desc: 'Named for the tragically extinct Mountain Quail last recorded here in 1876 — a sanctuary dedicated to oak forest restoration.',
  },
  {
    name: 'Wilderness Orchard',
    location: 'New Delhi',
    desc: 'An urban biodiversity island in the heart of the capital — demonstrating that wilderness can exist anywhere if you choose to let it.',
  },
]

function ConservationSection() {
  return (
    <section
      className="relative px-6 md:px-12 lg:px-24 pt-16 md:pt-24 pb-12 md:pb-16"
      style={{
        background: '#030303',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-start">
          {/* Left */}
          <div>
            <Overline>Beyond The Lens</Overline>
            <Reveal delay={0.1}>
              <h2 style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: 'clamp(2.2rem, 4vw, 3.8rem)',
                fontWeight: 300,
                color: '#F0EDE8',
                lineHeight: 1.1,
                marginBottom: '1.75rem',
                letterSpacing: '0.01em',
              }}>
                Conservation Sites &{' '}
                <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Botanical Arboreta</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p style={{
                fontFamily: '"Outfit", sans-serif',
                fontSize: '1rem',
                color: 'rgba(240,237,232,0.4)',
                lineHeight: 1.85,
                fontWeight: 300,
                maxWidth: '440px',
              }}>
                Filming was never enough. We conserve the very places that inspire us — three private estates across India dedicated to habitat restoration, indigenous flora, and the quiet return of wildlife.
              </p>
            </Reveal>
          </div>

          {/* Right — site cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1px', background: 'rgba(255,255,255,0.05)' }}>
            {SITES.map((site, i) => (
              <motion.div
                key={site.name}
                initial={{ opacity: 0, x: 32 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  background: '#030303',
                  padding: '2rem',
                }}
              >
                <p style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.48rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,168,76,0.5)',
                  marginBottom: '0.5rem',
                }}>
                  {site.location}
                </p>
                <h3 style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '1.45rem',
                  fontWeight: 300,
                  color: '#F0EDE8',
                  marginBottom: '0.75rem',
                  lineHeight: 1.1,
                }}>
                  {site.name}
                </h3>
                <p style={{
                  fontFamily: '"Outfit", sans-serif',
                  fontSize: '0.85rem',
                  color: 'rgba(240,237,232,0.32)',
                  lineHeight: 1.75,
                  fontWeight: 300,
                }}>
                  {site.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────

// ────────────────────────────────────────────────────────────────
// ROOT EXPORT
// ────────────────────────────────────────────────────────────────
export default function AboutContent() {
  return (
    <main>
      <HeroSection />
      <OriginSection />
      <NumbersSection />
      <ManifestoSection />
      <ServicesSection />
      <QuoteSection />
      <ConservationSection />
    </main>
  )
}

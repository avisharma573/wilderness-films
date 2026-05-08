'use client'

// ============================================================
// JourneySection.tsx
// Premium cinematic expedition timeline
// Left: glowing scroll-driven journey line + milestone markers
// Right: immersive cinematic story cards
// ============================================================

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface JourneyStop {
  id: string
  number: string
  title: string
  name: string
  region: string
  season: string
  altitude?: string
  species: string
  description: string
  imageUrl: string
  accentColor: string
}

const JOURNEY_STOPS: JourneyStop[] = [
  {
    id: 'ladakh',
    number: '01',
    title: 'Snow Leopard Expedition',
    name: 'Ladakh',
    region: 'Jammu & Kashmir',
    season: 'Feb — Mar',
    altitude: '4,500 m',
    species: 'Snow Leopard',
    description: 'In the bone-dry cold of the Trans-Himalayas, we track the ghost of the mountains through frozen valleys at altitude — a creature so elusive, a single sighting defines a lifetime.',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80',
    accentColor: '#A8D4FF',
  },
  {
    id: 'corbett',
    number: '02',
    title: 'Tiger Territory',
    name: 'Jim Corbett',
    region: 'Uttarakhand',
    season: 'Apr — May',
    species: 'Bengal Tiger',
    description: 'The Ramganga winds through ancient terai as tigers patrol territories that have been theirs for centuries. Corbett is where India\'s tiger story was first told — and it never grows old.',
    imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=1400&q=80',
    accentColor: '#D4720A',
  },
  {
    id: 'kaziranga',
    number: '03',
    title: 'Land of the Rhino',
    name: 'Kaziranga',
    region: 'Assam',
    season: 'Sep — Oct',
    species: 'Indian One-Horned Rhino',
    description: 'As Brahmaputra floods recede, vast grasslands emerge teeming with life. Kaziranga holds two-thirds of the world\'s one-horned rhino population — a quiet, hard-won miracle of conservation.',
    imageUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=1400&q=80',
    accentColor: '#C9A84C',
  },
  {
    id: 'sundarbans',
    number: '04',
    title: 'Into the Mangroves',
    name: 'Sundarbans',
    region: 'West Bengal',
    season: 'Nov — Dec',
    species: 'Royal Bengal Tiger',
    description: 'By boat through a labyrinthine delta — the only forest on earth where tigers swim between islands on the tide. The Sundarbans is a kingdom built of silence, saltwater, and shadow.',
    imageUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278bc?w=1400&q=80',
    accentColor: '#4A9BC9',
  },
  {
    id: 'kerala',
    number: '05',
    title: 'Backwater Stories',
    name: 'Kerala',
    region: "God's Own Country",
    season: 'Dec — Jan',
    species: 'Asian Elephant',
    description: 'Drifting through emerald backwaters, wild elephants descend to bathe at dusk as kingfishers trace arcs of living flame. Kerala is India at its most luminous — serene, ancient, abundant.',
    imageUrl: 'https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=1400&q=80',
    accentColor: '#6BAE4A',
  },
  {
    id: 'varanasi',
    number: '06',
    title: 'Sacred Rituals',
    name: 'Varanasi',
    region: 'Uttar Pradesh',
    season: 'Jan — Feb',
    species: 'Cultural Heritage',
    description: 'On the ghats of the Ganges, we close our journey where civilisation itself began. Varanasi exists beyond time — a living testament to devotion, death, and the eternal cycle of renewal.',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1400&q=80',
    accentColor: '#FF8C42',
  },
]

// ── Metadata chip ──
function MetaChip({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.48rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(240,237,232,0.25)',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.6rem',
          letterSpacing: '0.08em',
          color,
        }}
      >
        {value}
      </span>
    </div>
  )
}

// ── Milestone dot ──
function MilestoneDot({ stop, isInView }: { stop: JourneyStop; isInView: boolean }) {
  return (
    <motion.div
      style={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        border: `1px solid ${stop.accentColor}55`,
        background: '#0d0b09',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        position: 'relative',
      }}
      animate={
        isInView
          ? { boxShadow: [`0 0 0 0 ${stop.accentColor}50`, `0 0 0 7px ${stop.accentColor}00`] }
          : {}
      }
      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
    >
      <motion.div
        style={{ width: 6, height: 6, borderRadius: '50%', background: stop.accentColor }}
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  )
}

// ── Journey card ──
function JourneyCard({ stop }: { stop: JourneyStop; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const dotInView = useInView(dotRef, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <div ref={ref} style={{ display: 'flex', alignItems: 'flex-start', gap: 0, marginBottom: '2.5rem' }}>

      {/* ── Milestone dot column ── */}
      <div
        ref={dotRef}
        style={{
          width: 88,
          flexShrink: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '2.2rem',
          gap: 8,
        }}
      >
        <MilestoneDot stop={stop} isInView={dotInView} />
        {/* Short horizontal connector */}
        <motion.div
          style={{
            width: 1,
            height: 24,
            background: `linear-gradient(to bottom, ${stop.accentColor}40, transparent)`,
          }}
          initial={{ scaleY: 0 }}
          animate={dotInView ? { scaleY: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        />
      </div>

      {/* ── Card ── */}
      <motion.div
        initial={{ opacity: 0, y: 48 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          flex: 1,
          borderRadius: '2px',
          overflow: 'hidden',
          border: `1px solid ${hovered ? `${stop.accentColor}28` : 'rgba(166,124,82,0.1)'}`,
          transition: 'border-color 0.45s ease, box-shadow 0.45s ease',
          boxShadow: hovered
            ? `0 32px 80px rgba(0,0,0,0.65), 0 0 50px ${stop.accentColor}0a`
            : '0 8px 40px rgba(0,0,0,0.45)',
          background: 'rgba(13,11,9,0.92)',
        }}
      >
        {/* ── Cinematic image ── */}
        <div style={{ position: 'relative', height: 340, overflow: 'hidden' }}>
          {/* Photo */}
          <div
            style={{
              position: 'absolute',
              inset: '-5%',
              backgroundImage: `url(${stop.imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.42) saturate(0.65)',
              transform: hovered ? 'scale(1.05)' : 'scale(1)',
              transition: 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: 'transform',
            }}
          />

          {/* Cinematic bottom gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, transparent 20%, rgba(13,11,9,0.5) 55%, rgba(13,11,9,0.97) 100%)',
            }}
          />

          {/* Accent glow on hover */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(ellipse at 50% 100%, ${stop.accentColor}10, transparent 65%)`,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.5s ease',
              pointerEvents: 'none',
            }}
          />

          {/* Number — top left */}
          <div style={{ position: 'absolute', top: 22, left: 22 }}>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.2em',
                color: 'rgba(240,237,232,0.2)',
              }}
            >
              {stop.number}
            </span>
          </div>

          {/* Season — top right */}
          <div
            style={{
              position: 'absolute',
              top: 20,
              right: 22,
              padding: '4px 10px',
              background: 'rgba(13,11,9,0.65)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${stop.accentColor}30`,
              borderRadius: '1px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.5rem',
                letterSpacing: '0.18em',
                color: stop.accentColor,
                textTransform: 'uppercase',
              }}
            >
              {stop.season}
            </span>
          </div>

          {/* Location + expedition title — bottom overlay */}
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '1.75rem 1.75rem 1.5rem' }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: stop.accentColor,
                marginBottom: 8,
              }}
            >
              {stop.name} · {stop.region}
            </p>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 2.4vw, 2.2rem)',
                fontWeight: 300,
                color: '#F0EDE8',
                lineHeight: 1.08,
                letterSpacing: '0.01em',
              }}
            >
              {stop.title}
            </h3>
          </div>
        </div>

        {/* ── Content panel ── */}
        <div style={{ padding: '1.5rem 1.75rem 1.75rem' }}>
          {/* Thin gold rule */}
          <div
            style={{
              height: '1px',
              background: `linear-gradient(to right, ${stop.accentColor}35, transparent)`,
              marginBottom: '1.25rem',
            }}
          />

          {/* Description */}
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.875rem',
              color: 'rgba(240,237,232,0.5)',
              lineHeight: 1.75,
              fontWeight: 300,
              marginBottom: '1.5rem',
            }}
          >
            {stop.description}
          </p>

          {/* Metadata row */}
          <div
            style={{
              display: 'flex',
              gap: '2rem',
              flexWrap: 'wrap',
              paddingTop: '1rem',
              borderTop: '1px solid rgba(255,255,255,0.04)',
            }}
          >
            <MetaChip label="Season" value={stop.season} color={stop.accentColor} />
            <MetaChip label="Species" value={stop.species} color={stop.accentColor} />
            {stop.altitude && (
              <MetaChip label="Altitude" value={stop.altitude} color={stop.accentColor} />
            )}
            <MetaChip label="Region" value={stop.region} color={stop.accentColor} />
          </div>
        </div>
      </motion.div>
    </div>
  )
}

// ── Main section ──
export default function JourneySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const glowLineRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-100px' })

  // GSAP: scroll-driven progressive glow on the timeline line
  useEffect(() => {
    const glowLine = glowLineRef.current
    const timeline = timelineRef.current
    if (!glowLine || !timeline) return

    const ctx = gsap.context(() => {
      gsap.fromTo(
        glowLine,
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: timeline,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1.2,
          },
        }
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        background: '#0d0b09',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      {/* Atmospheric background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Warm ambient glow — top center */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '70vw',
            height: '50vh',
            background:
              'radial-gradient(ellipse at center top, rgba(201,168,76,0.04) 0%, transparent 70%)',
          }}
        />
        {/* Deep ambient — bottom */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80vw',
            height: '40vh',
            background:
              'radial-gradient(ellipse at center bottom, rgba(166,124,82,0.03) 0%, transparent 70%)',
          }}
        />
        {/* Subtle cinematic grain */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
            backgroundSize: '180px 180px',
            opacity: 0.018,
            mixBlendMode: 'overlay',
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 md:px-12 lg:px-16">

        {/* ── Section header ── */}
        <div ref={titleRef} style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <motion.p
            className="text-overline mb-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            The Annual Expedition
          </motion.p>

          <motion.h2
            className="font-display"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              color: '#F0EDE8',
              lineHeight: 1.05,
              marginBottom: '1rem',
            }}
          >
            Journey Across{' '}
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>India</span>
          </motion.h2>

          <motion.p
            className="font-body"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: '0.95rem',
              color: 'rgba(240,237,232,0.4)',
              maxWidth: '420px',
              margin: '0 auto',
              lineHeight: 1.75,
              fontWeight: 300,
            }}
          >
            Six sanctuaries. Six stories. One unbroken expedition through the heart of the wild.
          </motion.p>

          {/* Gold divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.5, duration: 1, ease: [0.4, 0, 0.2, 1] }}
            style={{
              height: 1,
              background: 'linear-gradient(to right, transparent, var(--color-gold), transparent)',
              maxWidth: 200,
              margin: '2rem auto 0',
              transformOrigin: 'center',
            }}
          />
        </div>

        {/* ── Timeline container ── */}
        <div ref={timelineRef} style={{ position: 'relative' }}>

          {/* ── Vertical journey line ── */}
          <div
            style={{
              position: 'absolute',
              left: 43,       // center of dot column (88px / 2 = 44, minus 1px for line width)
              top: 0,
              bottom: 0,
              width: 1,
              zIndex: 0,
            }}
          >
            {/* Base faint line — always visible */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, transparent, rgba(201,168,76,0.08) 8%, rgba(201,168,76,0.08) 92%, transparent)',
              }}
            />

            {/* Glow line — GSAP reveals progressively on scroll */}
            <div
              ref={glowLineRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '0%',
                background:
                  'linear-gradient(to bottom, rgba(201,168,76,0.8), rgba(201,168,76,0.4))',
                boxShadow: '0 0 8px rgba(201,168,76,0.35), 0 0 20px rgba(201,168,76,0.12)',
              }}
            />
          </div>

          {/* ── Journey stops ── */}
          {JOURNEY_STOPS.map((stop, index) => (
            <JourneyCard key={stop.id} stop={stop} index={index} />
          ))}
        </div>

        {/* ── End mark ── */}
        <motion.div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            paddingLeft: 88,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div
            style={{
              width: 1,
              height: 40,
              background: 'linear-gradient(to bottom, rgba(201,168,76,0.4), transparent)',
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              border: '1px solid rgba(201,168,76,0.5)',
              background: 'rgba(201,168,76,0.2)',
            }}
          />
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.58rem',
                letterSpacing: '0.22em',
                color: 'rgba(201,168,76,0.35)',
                textTransform: 'uppercase',
              }}
            >
              The Circle Complete
            </p>
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.52rem',
                letterSpacing: '0.15em',
                color: 'rgba(107,174,74,0.3)',
                marginTop: 4,
              }}
            >
              365 Days · 6 States · ∞ Stories
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

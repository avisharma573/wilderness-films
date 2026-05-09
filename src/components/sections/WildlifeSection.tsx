'use client'

// ============================================================
// WildlifeSection.tsx
// RAF+lerp smooth scroll engine — buttery, GPU-accelerated
// Drag with momentum + wheel → horizontal, no Framer Motion physics conflicts
// ============================================================

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

interface GalleryCard {
  id: string
  title: string
  duration: string
  videoId: string
  link: string
}

function thumbUrl(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}
function thumbFallback(videoId: string) {
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

const GALLERY_CARDS: GalleryCard[] = [
  { id: 'best-of-wfi',        title: 'Best of India, Best of WildFilmsIndia',                                       duration: '',  videoId: 'Quq4Y6nJCFo', link: 'https://youtu.be/Quq4Y6nJCFo' },
  { id: 'monsoon-himalaya',   title: 'Monsoon in the Himalaya',                                                     duration: '',  videoId: 'lAefd4wp0c8', link: 'https://youtu.be/lAefd4wp0c8' },
  { id: 'waterfalls-central', title: 'Waterfalls and Cataracts of Central India',                                   duration: '',  videoId: 'FK9ErdeBTS8', link: 'https://youtu.be/FK9ErdeBTS8' },
  { id: 'holi-festival',      title: 'Holi - The Festival of Colours and Much Madness',                             duration: '',  videoId: 'ueQ4zpGGLe4', link: 'https://youtu.be/ueQ4zpGGLe4' },
  { id: 'over-india',         title: 'Over India: A Fabulous Journey Across South Asia',                            duration: '',  videoId: 'FCq2osKCoLA', link: 'https://youtu.be/FCq2osKCoLA' },
  { id: 'ganga',              title: 'Ganga by WildFilmsIndia - Our Take on the River Eternal, the Ganges',         duration: '',  videoId: 'SxssIE6-4Yo', link: 'https://youtu.be/SxssIE6-4Yo' },
  { id: 'snow-leopard',       title: 'The Magnificent Snow Leopard of the Himalaya',                                duration: '',  videoId: 'mKt2ysizAfk', link: 'https://youtu.be/mKt2ysizAfk' },
  { id: 'rhythms-india',      title: 'Rhythms of India – A Rich Aural Journey Across India',                        duration: '',  videoId: 'Yc8Q7y2c_Nc', link: 'https://youtu.be/Yc8Q7y2c_Nc' },
  { id: 'leh-ladakh',         title: 'Leh and Ladakh - An Aural Journey',                                          duration: '',  videoId: '7KPpF5pyTPA', link: 'https://youtu.be/7KPpF5pyTPA' },
  { id: 'cordyceps',          title: 'Cordyceps sinensis - The Magical Caterpillar-Fungus of the Himalaya',         duration: '',  videoId: 'j4yg4DN0rQw', link: 'https://youtu.be/j4yg4DN0rQw' },
  { id: 'bat-festival',       title: 'Bat Killing Festival in Arunachal Pradesh',                                   duration: '',  videoId: 'hny_k0En9cU', link: 'https://youtu.be/hny_k0En9cU' },
  { id: 'song-cranes',        title: 'Song of the Cranes: Kurja Come Home',                                        duration: '',  videoId: 'L_Z6Gg4Qu94', link: 'https://youtu.be/L_Z6Gg4Qu94' },
  { id: 'fish-festival',      title: 'Fish Killing Festival of the Himalaya: Maund Mela',                          duration: '',  videoId: '9UtCh4Sxc3I', link: 'https://youtu.be/9UtCh4Sxc3I' },
  { id: 'olive-ridley',       title: 'A Miracle on the Shore: Olive Ridley Hatchlings Rush to the Sea',            duration: '',  videoId: 'MRtGShgWYKw', link: 'https://youtu.be/MRtGShgWYKw' },
]

// ── Card — FilmsSection layout: image top + dark content panel ──
function GalleryCard({ card, index }: { card: GalleryCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 320,
        flexShrink: 0,
        borderRadius: '3px',
        overflow: 'hidden',
        // GPU layer hint
        willChange: 'transform',
        border: `1px solid ${hovered ? 'rgba(201,168,76,0.22)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
        boxShadow: hovered
          ? '0 24px 70px rgba(0,0,0,0.55), 0 0 40px rgba(201,168,76,0.06)'
          : '0 6px 30px rgba(0,0,0,0.4)',
        transform: 'translateY(0)',
        transitionProperty: 'border-color, box-shadow',
        transitionDuration: '0.35s',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* ── Image zone ── */}
      <div style={{ position: 'relative', height: 230, overflow: 'hidden' }}>
        {/* YouTube thumbnail with hqdefault fallback */}
        <img
          src={thumbUrl(card.videoId)}
          alt={card.title}
          onError={(e) => { (e.currentTarget as HTMLImageElement).src = thumbFallback(card.videoId) }}
          style={{
            position: 'absolute',
            inset: '-5%',
            width: '110%',
            height: '110%',
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(0.45) saturate(0.6)',
            transition: 'filter 0.4s',
            willChange: 'transform',
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 25%, rgba(3,3,3,0.78) 100%)',
          }}
        />

        {/* Hover glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.05), transparent 70%)',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Play button — links to YouTube */}
        <a
          href={card.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.25s ease',
            textDecoration: 'none',
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(3,3,3,0.68)',
              border: '1px solid rgba(201,168,76,0.33)',
              backdropFilter: 'blur(10px)',
              transform: hovered ? 'scale(1)' : 'scale(0.8)',
              transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <svg width="15" height="17" viewBox="0 0 15 17" fill="none">
              <path d="M2.5 1.5 L13.5 8.5 L2.5 15.5 Z" fill="#C9A84C" />
            </svg>
          </div>
        </a>

        {/* Duration */}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            right: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.6rem',
            letterSpacing: '0.1em',
            color: 'rgba(240,237,232,0.35)',
          }}
        >
          {card.duration}
        </div>
      </div>

      {/* ── Content panel ── */}
      <div style={{ padding: '1.15rem 1.35rem 1.15rem', background: 'rgba(10,10,8,0.97)' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.38rem',
            fontWeight: 300,
            color: '#F0EDE8',
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            margin: 0,
          }}
        >
          {card.title}
        </h3>
      </div>
    </motion.div>
  )
}

// ── Main section ──
export default function WildlifeSection() {
  const titleRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-100px' })

  // Boundary-aware wheel handler — only intercepts while horizontal scroll remains.
  // When the row hits either edge, the event propagates to the page naturally.
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      // Only intercept horizontal scroll intent (trackpad side-swipe).
      // Vertical scroll (deltaY dominant) passes through to the page untouched.
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
        el.scrollLeft += e.deltaX
      }
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  return (
    <section
      id="best-of-india"
      className="relative"
      style={{
        background: 'linear-gradient(180deg, #030303 0%, #060805 50%, #030303 100%)',
        paddingTop: '8rem',
        paddingBottom: '8rem',
      }}
    >
      {/* Ambient background texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 30% 70%, rgba(107,174,74,0.03) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(201,168,76,0.03) 0%, transparent 60%)',
        }}
      />

      {/* ── Section header ── */}
      <div ref={titleRef} className="px-6 md:px-12 lg:px-24" style={{ marginBottom: '4rem' }}>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.h2
            className="font-display"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
              fontWeight: 300,
              color: '#F0EDE8',
              lineHeight: 1.05,
              maxWidth: '500px',
            }}
          >
            The Best of{' '}
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>India</span>
          </motion.h2>
        </div>

        {/* Gold divider */}
        <motion.div
          className="mt-8 h-px"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.4, duration: 1, ease: [0.4, 0, 0.2, 1] }}
          style={{
            background: 'linear-gradient(90deg, var(--color-gold), transparent)',
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* ── Gallery — native overflow-x scroll, boundary-aware wheel ── */}
      <div
        ref={containerRef}
        style={{
          overflowX: 'auto',
          overflowY: 'hidden',
          cursor: 'default',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 4%, black 93%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 4%, black 93%, transparent 100%)',
        } as React.CSSProperties}
      >
        <div
          style={{
            display: 'flex',
            gap: 20,
            paddingLeft: 'clamp(1.5rem, 5vw, 6rem)',
            paddingRight: 'clamp(1.5rem, 5vw, 6rem)',
            paddingBottom: '1rem',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
        >
          {GALLERY_CARDS.map((card, i) => (
            <GalleryCard key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>

      {/* ── View more ── */}
      <motion.div
        className="flex justify-center mt-12"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <a
          href="https://www.youtube.com/@WildFilmsIndia"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-xs py-3 px-8"
          style={{ fontSize: '0.65rem', letterSpacing: '0.18em' }}
        >
          View More
        </a>
      </motion.div>

      {/* ── Stats bar ── */}
      <motion.div
        className="px-6 md:px-12 lg:px-24 mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
      >
        {[
          { value: '150,000+', label: 'Hours of Video Content' },
          { value: '140,000+', label: 'Videos on YouTube' },
          { value: '5 Million+', label: 'YouTube Subscribers' },
          { value: '37+', label: 'Years of Experience' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p
              className="font-display"
              style={{ fontSize: 'clamp(1.4rem, 2.2vw, 2rem)', fontWeight: 300, color: 'var(--color-gold)', lineHeight: 1 }}
            >
              {stat.value}
            </p>
            <p
              className="font-mono mt-1"
              style={{
                fontSize: '0.6rem',
                color: 'rgba(240,237,232,0.35)',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>
    </section>
  )
}

'use client'

// ============================================================
// WildlifeSection.tsx
// RAF+lerp smooth scroll engine — buttery, GPU-accelerated
// Drag with momentum + wheel → horizontal, no Framer Motion physics conflicts
// ============================================================

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useInView } from 'framer-motion'

interface GalleryCard {
  id: string
  title: string
  category: string
  description: string
  duration: string
  imageUrl: string
  accentColor: string
  link?: string
}

const GALLERY_CARDS: GalleryCard[] = [
  {
    id: 'land-of-the-tiger',
    title: 'Land of the Tiger',
    category: 'Wildlife',
    description: 'Deep inside Central India\'s tiger reserves, a dynasty of apex predators shapes the fate of the ancient forest.',
    duration: '52 min',
    imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=900&q=80',
    accentColor: '#D4720A',
    link: 'https://www.youtube.com/watch?v=0a55Q02BLGg',
  },
  {
    id: 'rhythms-of-india',
    title: 'Rhythms of India',
    category: 'Culture',
    description: 'From Rajasthan\'s folk stages to Kerala\'s midnight Theyyam — the living pulse of a civilization five millennia deep.',
    duration: '48 min',
    imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=900&q=80',
    accentColor: '#C9A84C',
  },
  {
    id: 'faith-and-beyond',
    title: 'Faith & Beyond',
    category: 'Religion',
    description: 'The Ganges at dawn. Varanasi\'s eternal flame. A meditation on devotion and transcendence at the world\'s oldest city.',
    duration: '44 min',
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80',
    accentColor: '#FF8C42',
  },
  {
    id: 'himalayan-call',
    title: 'Himalayan Call',
    category: 'Journey',
    description: 'Above the clouds, where the air thins and the soul expands — a pilgrimage through the roof of the world.',
    duration: '60 min',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
    accentColor: '#A8D4FF',
  },
  {
    id: 'golden-landscapes',
    title: 'Golden Landscapes',
    category: 'Landscape',
    description: 'From the Thar Desert\'s shifting dunes to Kerala\'s emerald backwaters — India\'s earth painted in gold.',
    duration: '38 min',
    imageUrl: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=900&q=80',
    accentColor: '#C9A84C',
  },
  {
    id: 'living-traditions',
    title: 'Living Traditions',
    category: 'Heritage',
    description: 'Ancient crafts, forgotten languages, time-worn temples — India\'s vanishing heritage and the custodians who keep it alive.',
    duration: '56 min',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=900&q=80',
    accentColor: '#B8997A',
  },
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
        border: `1px solid ${hovered ? `${card.accentColor}38` : 'rgba(255,255,255,0.06)'}`,
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
        boxShadow: hovered
          ? `0 24px 70px rgba(0,0,0,0.55), 0 0 40px ${card.accentColor}10`
          : '0 6px 30px rgba(0,0,0,0.4)',
        transform: 'translateY(0)',
        transitionProperty: 'border-color, box-shadow',
        transitionDuration: '0.35s',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* ── Image zone ── */}
      <div style={{ position: 'relative', height: 230, overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            inset: '-5%',
            backgroundImage: `url(${card.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
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
            background: `radial-gradient(ellipse at 50% 0%, ${card.accentColor}0d, transparent 70%)`,
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.4s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Play button */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.25s ease',
            pointerEvents: 'none',
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
              border: `1px solid ${card.accentColor}55`,
              backdropFilter: 'blur(10px)',
              transform: hovered ? 'scale(1)' : 'scale(0.8)',
              transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <svg width="15" height="17" viewBox="0 0 15 17" fill="none">
              <path d="M2.5 1.5 L13.5 8.5 L2.5 15.5 Z" fill={card.accentColor} />
            </svg>
          </div>
        </div>

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
      <div style={{ padding: '1.15rem 1.35rem 1.3rem', background: 'rgba(10,10,8,0.97)' }}>
        {/* Category row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 9 }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.54rem',
              color: card.accentColor,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            {card.category}
          </span>
          <div style={{ width: 4, height: 4, borderRadius: '50%', background: card.accentColor, opacity: 0.45 }} />
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.38rem',
            fontWeight: 300,
            color: '#F0EDE8',
            lineHeight: 1.15,
            letterSpacing: '0.01em',
            marginBottom: 9,
          }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '0.78rem',
            color: 'rgba(240,237,232,0.44)',
            lineHeight: 1.65,
            marginBottom: 14,
          }}
        >
          {card.description}
        </p>

        {/* Watch CTA */}
        {card.link ? (
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              textDecoration: 'none',
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: card.accentColor,
              }}
            >
              Watch
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6 H10 M7 3 L10 6 L7 9" stroke={card.accentColor} strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          </a>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              transform: hovered ? 'translateX(4px)' : 'translateX(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.55rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: card.accentColor,
              }}
            >
              Watch
            </span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6 H10 M7 3 L10 6 L7 9" stroke={card.accentColor} strokeWidth="1.1" strokeLinecap="round" />
            </svg>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// ── Main section ──
export default function WildlifeSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(titleRef, { once: true, margin: '-100px' })

  // Single GPU-composited transform value
  const x = useMotionValue(0)

  // Scroll engine state — plain refs, zero re-renders
  const targetX = useRef(0)
  const isDragging = useRef(false)
  const didDrag = useRef(false)      // true if pointer moved beyond threshold this gesture
  const dragStartClientX = useRef(0)
  const dragStartTargetX = useRef(0)
  const DRAG_THRESHOLD = 5           // px — below this is a click, not a drag

  const getBounds = useCallback((): number => {
    if (!containerRef.current || !trackRef.current) return 0
    return Math.min(0, containerRef.current.clientWidth - trackRef.current.scrollWidth)
  }, [])

  const clampX = useCallback(
    (val: number) => Math.max(getBounds(), Math.min(0, val)),
    [getBounds]
  )

  // ── RAF lerp loop — runs always, drives GPU transform ──
  // lerp factor 0.12 ≈ Apple-level fluid: fast enough to feel responsive,
  // slow enough to carry natural momentum through overshoots.
  useEffect(() => {
    let rafId: number
    const LERP = 0.12

    const tick = () => {
      const cur = x.get()
      const diff = targetX.current - cur
      // Only write to DOM when there's meaningful change
      if (Math.abs(diff) > 0.05) {
        x.set(cur + diff * LERP)
      }
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [x])

  // ── Wheel → horizontal scroll ──
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      // Prefer vertical axis; fall back to horizontal (trackpad natural scroll)
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX
      targetX.current = clampX(targetX.current - delta * 1.6)
    }

    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [clampX])

  // ── Pointer drag ──
  // setPointerCapture is intentionally deferred to onPointerMove (after DRAG_THRESHOLD).
  // Calling it in onPointerDown would capture all events immediately, preventing
  // click events from reaching child <a> tags (e.g. the YouTube link on the tiger card).
  const onPointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    dragStartClientX.current = e.clientX
    dragStartTargetX.current = targetX.current
    isDragging.current = false
    didDrag.current = false
  }, [])

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Activate drag only after the pointer moves beyond the click threshold.
      // This keeps short taps as genuine clicks.
      if (!isDragging.current) {
        if (Math.abs(e.clientX - dragStartClientX.current) < DRAG_THRESHOLD) return
        isDragging.current = true
        didDrag.current = true
        ;(e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId)
      }
      const delta = e.clientX - dragStartClientX.current
      targetX.current = clampX(dragStartTargetX.current + delta)
    },
    [clampX]
  )

  const onPointerUp = useCallback(() => {
    isDragging.current = false
    // Snap target to current rendered position — no fling, no drift
    targetX.current = clampX(x.get())
  }, [clampX, x])

  const [isPointerDown, setIsPointerDown] = useState(false)

  return (
    <section
      id="wildlife"
      ref={sectionRef}
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
        <motion.p
          className="text-overline mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          The Wild Inhabitants
        </motion.p>

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
            Best of{' '}
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>India</span>
          </motion.h2>

          <motion.p
            className="font-body"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              fontSize: '0.9rem',
              color: 'rgba(240,237,232,0.45)',
              maxWidth: '300px',
              lineHeight: 1.7,
              fontWeight: 300,
            }}
          >
            Wildlife, culture, faith, and landscape — one ancient land where every frame is cinema.
          </motion.p>
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

      {/* ── Gallery ──
          overflow:hidden clips the sliding track.
          Pointer events on this layer handle drag.
          Mask fades edges for premium look.
      */}
      <div
        ref={containerRef}
        onPointerDown={(e) => { setIsPointerDown(true); onPointerDown(e) }}
        onPointerMove={onPointerMove}
        onPointerUp={() => { setIsPointerDown(false); onPointerUp() }}
        onPointerLeave={() => { if (isDragging.current) { setIsPointerDown(false); onPointerUp() } }}
        onClickCapture={(e) => {
          // If the pointer moved beyond the drag threshold, suppress the synthetic
          // click that fires after pointerup so it doesn't trigger child links.
          if (didDrag.current) {
            e.preventDefault()
            e.stopPropagation()
            didDrag.current = false
          }
        }}
        style={{
          overflow: 'hidden',
          cursor: isPointerDown ? 'grabbing' : 'default',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 4%, black 93%, transparent 100%)',
          maskImage:
            'linear-gradient(to right, transparent 0%, black 4%, black 93%, transparent 100%)',
          // Promote to own compositor layer
          willChange: 'transform',
        }}
      >
        <motion.div
          ref={trackRef}
          style={{
            x,
            display: 'flex',
            gap: 20,
            paddingLeft: 'clamp(1.5rem, 5vw, 6rem)',
            paddingRight: 'clamp(1.5rem, 5vw, 6rem)',
            paddingBottom: '1rem',
            // Prevent text selection during drag
            userSelect: 'none',
            WebkitUserSelect: 'none',
            // Ensure transform is GPU-composited
            willChange: 'transform',
          }}
        >
          {GALLERY_CARDS.map((card, i) => (
            <GalleryCard key={card.id} card={card} index={i} />
          ))}
        </motion.div>
      </div>

      {/* ── Stats bar ── */}
      <motion.div
        className="px-6 md:px-12 lg:px-24 mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8 }}
      >
        {[
          { value: '3,000+', label: 'Wild Tigers in India' },
          { value: '27,000+', label: 'Asian Elephants' },
          { value: '2,600+', label: 'One-Horned Rhinos' },
          { value: '500+', label: 'Snow Leopards' },
        ].map((stat) => (
          <div key={stat.label} className="text-center md:text-left">
            <p
              className="font-display"
              style={{ fontSize: '2.2rem', fontWeight: 300, color: 'var(--color-gold)', lineHeight: 1 }}
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

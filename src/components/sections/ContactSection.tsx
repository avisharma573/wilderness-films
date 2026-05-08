'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'

// ── Floating-label text input ─────────────────────────────────
function FloatingInput({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required,
  maxLength,
  autoComplete,
}: {
  label: string
  type?: string
  name: string
  value: string
  onChange: (v: string) => void
  required?: boolean
  maxLength?: number
  autoComplete?: string
}) {
  const [focused, setFocused] = useState(false)
  const raised = focused || value.length > 0

  return (
    <div style={{ position: 'relative' }}>
      {/* Floating label */}
      <motion.label
        htmlFor={name}
        animate={{
          top:      raised ? '-9px' : '16px',
          fontSize: raised ? '0.5rem' : '0.8rem',
          color:    focused
            ? 'rgba(201,168,76,0.85)'
            : raised
              ? 'rgba(201,168,76,0.55)'
              : 'rgba(240,237,232,0.28)',
          letterSpacing: raised ? '0.20em' : '0.04em',
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'absolute',
          left: '14px',
          pointerEvents: 'none',
          fontFamily: '"Space Mono", monospace',
          textTransform: 'uppercase',
          background: raised ? '#040404' : 'transparent',
          padding: raised ? '0 5px' : '0',
          zIndex: 1,
          lineHeight: 1,
        }}
      >
        {label}
      </motion.label>

      <input
        id={name}
        name={name}
        type={type}
        value={value}
        required={required}
        maxLength={maxLength}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          background: focused ? 'rgba(201,168,76,0.03)' : 'rgba(255,255,255,0.025)',
          border: `1px solid ${focused ? 'rgba(201,168,76,0.45)' : 'rgba(255,255,255,0.08)'}`,
          color: '#F0EDE8',
          padding: '18px 14px 10px',
          fontSize: '0.875rem',
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          outline: 'none',
          borderRadius: '2px',
          transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
          boxShadow: focused ? '0 0 20px rgba(201,168,76,0.07), inset 0 1px 0 rgba(201,168,76,0.05)' : 'none',
          caretColor: '#C9A84C',
        }}
      />
    </div>
  )
}

// ── Floating-label textarea ───────────────────────────────────
function FloatingTextarea({
  label,
  name,
  value,
  onChange,
  required,
}: {
  label: string
  name: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  const raised = focused || value.length > 0

  return (
    <div style={{ position: 'relative' }}>
      <motion.label
        htmlFor={name}
        animate={{
          top:      raised ? '-9px' : '16px',
          fontSize: raised ? '0.5rem' : '0.8rem',
          color:    focused
            ? 'rgba(201,168,76,0.85)'
            : raised
              ? 'rgba(201,168,76,0.55)'
              : 'rgba(240,237,232,0.28)',
          letterSpacing: raised ? '0.20em' : '0.04em',
        }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
        style={{
          position: 'absolute',
          left: '14px',
          pointerEvents: 'none',
          fontFamily: '"Space Mono", monospace',
          textTransform: 'uppercase',
          background: raised ? '#040404' : 'transparent',
          padding: raised ? '0 5px' : '0',
          zIndex: 1,
          lineHeight: 1,
        }}
      >
        {label}
      </motion.label>

      <textarea
        id={name}
        name={name}
        value={value}
        required={required}
        rows={6}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          background: focused ? 'rgba(201,168,76,0.03)' : 'rgba(255,255,255,0.025)',
          border: `1px solid ${focused ? 'rgba(201,168,76,0.45)' : 'rgba(255,255,255,0.08)'}`,
          color: '#F0EDE8',
          padding: '22px 14px 14px',
          fontSize: '0.875rem',
          fontFamily: '"Cormorant Garamond", Georgia, serif',
          outline: 'none',
          borderRadius: '2px',
          resize: 'vertical',
          minHeight: '140px',
          maxHeight: '300px',
          transition: 'border-color 0.25s, box-shadow 0.25s, background 0.25s',
          boxShadow: focused ? '0 0 20px rgba(201,168,76,0.07), inset 0 1px 0 rgba(201,168,76,0.05)' : 'none',
          caretColor: '#C9A84C',
          lineHeight: 1.65,
        }}
      />
    </div>
  )
}

// ── Contact info row ─────────────────────────────────────────
const INFO_ROWS = [
  {
    label: 'Address',
    value: '1 Factory Road, Ring Road South,\nNew Delhi 110029, India',
  },
  { label: 'Phone',   value: '+91 9810019704', href: 'tel:+919810019704' },
  { label: 'Email',   value: 'rupindang@gmail.com', href: 'mailto:rupindang@gmail.com' },
  { label: 'Web',     value: 'wildfilmsindia.com', href: 'https://www.wildfilmsindia.com' },
  { label: 'Hours',   value: 'Available 24 × 7' },
]

function InfoBlock({ inView }: { inView: boolean }) {
  return (
    <div style={{ marginTop: '3rem' }}>
      {/* Gold rule */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, rgba(201,168,76,0.25), transparent)',
        marginBottom: '1.75rem',
      }} />

      <p style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.52rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        color: 'rgba(201,168,76,0.40)',
        marginBottom: '1.25rem',
      }}>
        Wilderness Films India Ltd.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
        {INFO_ROWS.map((row, i) => (
          <motion.div
            key={row.label}
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: 0.55 + i * 0.07 }}
            style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}
          >
            <span style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.48rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.35)',
              width: '42px',
              flexShrink: 0,
              paddingTop: '2px',
            }}>
              {row.label}
            </span>
            <div style={{ width: '1px', background: 'rgba(201,168,76,0.15)', flexShrink: 0, alignSelf: 'stretch' }} />
            {row.href ? (
              <a
                href={row.href}
                target={row.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                style={{
                  fontFamily: '"Cormorant Garamond", Georgia, serif',
                  fontSize: '0.8rem',
                  color: 'rgba(240,237,232,0.50)',
                  textDecoration: 'none',
                  lineHeight: 1.55,
                  whiteSpace: 'pre-line',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#C9A84C')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(240,237,232,0.50)')}
              >
                {row.value}
              </a>
            ) : (
              <p style={{
                fontFamily: '"Cormorant Garamond", Georgia, serif',
                fontSize: '0.8rem',
                color: 'rgba(240,237,232,0.50)',
                lineHeight: 1.55,
                whiteSpace: 'pre-line',
              }}>
                {row.value}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

// ── Submit button states ──────────────────────────────────────
type BtnState = 'idle' | 'loading' | 'success' | 'error'

function SubmitButton({ state }: { state: BtnState }) {
  return (
    <motion.button
      type="submit"
      disabled={state !== 'idle'}
      whileHover={state === 'idle' ? { y: -2, boxShadow: '0 8px 32px rgba(201,168,76,0.22)' } : {}}
      whileTap={state === 'idle' ? { y: 0 } : {}}
      style={{
        width: '100%',
        padding: '16px 28px',
        background: state === 'success'
          ? 'linear-gradient(135deg, rgba(107,174,74,0.18), rgba(107,174,74,0.10))'
          : state === 'error'
            ? 'linear-gradient(135deg, rgba(220,60,60,0.16), rgba(220,60,60,0.08))'
            : 'linear-gradient(135deg, rgba(201,168,76,0.16), rgba(201,168,76,0.08))',
        border: `1px solid ${state === 'success' ? 'rgba(107,174,74,0.50)' : state === 'error' ? 'rgba(220,60,60,0.45)' : 'rgba(201,168,76,0.40)'}`,
        color: state === 'success' ? '#6BAE4A' : state === 'error' ? '#e05555' : '#C9A84C',
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.25em',
        textTransform: 'uppercase',
        borderRadius: '2px',
        cursor: state === 'idle' ? 'pointer' : 'default',
        transition: 'background 0.3s, border-color 0.3s, color 0.3s',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
      }}
    >
      <AnimatePresence mode="wait">
        {state === 'idle' && (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 6h10M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Start A Project
          </motion.span>
        )}
        {state === 'loading' && (
          <motion.span
            key="loading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'inline-block' }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" strokeDasharray="14 10" />
              </svg>
            </motion.span>
            Sending...
          </motion.span>
        )}
        {state === 'success' && (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Message Sent
          </motion.span>
        )}
        {state === 'error' && (
          <motion.span
            key="error"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 2l8 8M10 2l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            Try Again
          </motion.span>
        )}
      </AnimatePresence>
    </motion.button>
  )
}

// ── Glassmorphism form card ───────────────────────────────────
function ContactForm({ inView }: { inView: boolean }) {
  const EMPTY = { name: '', email: '', subject: '', message: '', website: '' }
  const [fields, setFields] = useState(EMPTY)
  const [btnState, setBtnState] = useState<BtnState>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = useCallback((key: keyof typeof fields) => (v: string) => {
    setFields(prev => ({ ...prev, [key]: v }))
  }, [])

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault()
    if (btnState === 'loading' || btnState === 'success') return

    setBtnState('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    fields.name,
          email:   fields.email,
          subject: fields.subject,
          message: fields.message,
          website: fields.website, // honeypot — bots fill this, humans never see it
        }),
      })

      const data: { success?: boolean; error?: string } = await res.json()

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
        setBtnState('error')
        return
      }

      setBtnState('success')
      setTimeout(() => {
        setBtnState('idle')
        setFields(EMPTY)
        setErrorMsg('')
      }, 3500)
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.')
      setBtnState('error')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.040) 0%, rgba(201,168,76,0.016) 100%)',
        border: '1px solid rgba(201,168,76,0.16)',
        borderRadius: '3px',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        padding: '2.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Corner accents */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: '56px', height: '56px',
        borderBottom: '1px solid rgba(201,168,76,0.14)',
        borderRight:  '1px solid rgba(201,168,76,0.14)',
        background: 'linear-gradient(135deg, rgba(201,168,76,0.10), transparent)',
      }} />
      <div style={{
        position: 'absolute', bottom: 0, right: 0,
        width: '40px', height: '40px',
        borderTop:  '1px solid rgba(107,174,74,0.12)',
        borderLeft: '1px solid rgba(107,174,74,0.12)',
      }} />

      {/* Ambient glow at top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.35), transparent)',
      }} />

      {/* Card label */}
      <p style={{
        fontFamily: '"Space Mono", monospace',
        fontSize: '0.50rem',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'rgba(201,168,76,0.40)',
        marginBottom: '1.75rem',
      }}>
        Send A Message
      </p>

      <form onSubmit={handleSubmit}>
          {/* Honeypot — visually hidden, never filled by humans.
              Bots auto-complete it; the API rejects any submission where it has a value. */}
          <input
            type="text"
            name="website"
            value={fields.website}
            onChange={e => set('website')(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: 'absolute', left: '-9999px', width: 0, height: 0, opacity: 0 }}
          />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.35rem' }}>
          {/* Row: name + email */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}
               className="flex-col sm:grid">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.3 }}
            >
              <FloatingInput label="Full Name" name="name" value={fields.name} onChange={set('name')} required maxLength={100} autoComplete="name" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.38 }}
            >
              <FloatingInput label="Email Address" type="email" name="email" value={fields.email} onChange={set('email')} required maxLength={254} autoComplete="email" />
            </motion.div>
          </div>

          {/* Subject */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.46 }}
          >
            <FloatingInput label="Subject" name="subject" value={fields.subject} onChange={set('subject')} required />
          </motion.div>

          {/* Message */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.54 }}
          >
            <FloatingTextarea label="Your Message" name="message" value={fields.message} onChange={set('message')} required />
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.62 }}
          >
            <SubmitButton state={btnState} />
          </motion.div>

          {/* Inline error message */}
          <AnimatePresence>
            {btnState === 'error' && errorMsg && (
              <motion.p
                key="error-msg"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  fontFamily: '"Space Mono", monospace',
                  fontSize: '0.50rem',
                  letterSpacing: '0.10em',
                  color: 'rgba(220,80,80,0.75)',
                  textAlign: 'center',
                  lineHeight: 1.7,
                  marginTop: '-0.4rem',
                }}
              >
                {errorMsg}
              </motion.p>
            )}
          </AnimatePresence>

          {/* Privacy note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.72 }}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.46rem',
              letterSpacing: '0.12em',
              color: 'rgba(240,237,232,0.18)',
              textAlign: 'center',
              lineHeight: 1.7,
            }}
          >
            Your information is kept strictly confidential and never shared with third parties.
          </motion.p>
        </div>
      </form>
    </motion.div>
  )
}

// ── Background grain ─────────────────────────────────────────
function GrainOverlay() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
      opacity: 0.025,
      mixBlendMode: 'overlay',
    }} />
  )
}

// ── Floating ambient particles ────────────────────────────────
function AmbientParticles() {
  const DOTS = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    left: `${6 + (i * 4.2) % 90}%`,
    delay: i * 0.45,
    dur: 8 + (i % 6) * 1.8,
    size: 1.2 + (i % 4) * 0.6,
    color: i % 3 === 0 ? '#6BAE4A' : '#C9A84C',
  }))
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {DOTS.map(d => (
        <motion.div key={d.id} className="absolute rounded-full"
          style={{ left: d.left, bottom: '-6px', width: d.size, height: d.size, background: d.color }}
          animate={{ y: [0, -(280 + (d.id % 5) * 60)], opacity: [0, 0.40, 0] }}
          transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

// ── Faint wildlife silhouette ─────────────────────────────────
function WildlifeSilhouette() {
  return (
    <div className="absolute bottom-0 right-0 pointer-events-none select-none"
         style={{ opacity: 0.032, width: '360px' }}>
      <svg viewBox="0 0 400 220" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 180 C20 180 40 160 60 155 C80 150 85 145 90 130 C95 115 88 105 95 95 C102 85 115 82 125 75 C135 68 140 60 155 58 C170 56 180 62 195 65 C210 68 220 72 235 68 C250 64 258 55 270 55 C282 55 290 62 300 70 C310 78 318 88 325 95 C332 102 338 108 342 120 C346 132 342 145 348 155 C354 165 368 168 375 175 C382 182 385 190 385 190 L380 195 C380 195 370 188 360 182 C350 176 340 172 330 165 C320 158 316 148 310 140 C304 132 298 125 290 120 C282 115 272 112 262 115 C252 118 245 125 235 128 C225 131 212 130 200 130 C188 130 176 128 165 132 C154 136 145 145 135 150 C125 155 112 158 100 162 C88 166 75 170 65 178 C55 186 45 193 35 196 L20 190 Z"
              fill="#C9A84C"/>
        <path d="M150 70 C153 80 155 90 152 100" stroke="#030303" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        <path d="M170 65 C172 75 173 85 170 95" stroke="#030303" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        <path d="M190 67 C191 77 190 87 187 97" stroke="#030303" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
        <path d="M210 70 C210 80 208 90 205 100" stroke="#030303" strokeWidth="3" strokeLinecap="round" opacity="0.6"/>
      </svg>
    </div>
  )
}

// ── Faint grid texture ────────────────────────────────────────
function GridTexture() {
  return (
    <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
         style={{
           backgroundImage: `
             linear-gradient(rgba(201,168,76,0.4) 1px, transparent 1px),
             linear-gradient(90deg, rgba(201,168,76,0.4) 1px, transparent 1px)
           `,
           backgroundSize: '80px 80px',
           maskImage: 'radial-gradient(ellipse at 50% 80%, black 20%, transparent 70%)',
         }} />
  )
}

// ── Main section ──────────────────────────────────────────────
export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView     = useInView(sectionRef, { once: true, margin: '-80px' })

  // Mouse parallax for ambient glow
  const mouseY  = useMotionValue(0)
  const springY = useSpring(mouseY, { stiffness: 28, damping: 22 })
  const glowY   = useTransform(springY, [-1, 1], [-20, 20])

  useEffect(() => {
    const h = (e: MouseEvent) => mouseY.set((e.clientY / window.innerHeight - 0.5) * 2)
    window.addEventListener('mousemove', h)
    return () => window.removeEventListener('mousemove', h)
  }, [mouseY])

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden py-28 md:py-36 px-6 md:px-12 lg:px-24"
      style={{ background: 'linear-gradient(180deg, #030303 0%, #050502 55%, #030303 100%)' }}
    >
      <GrainOverlay />
      <GridTexture />
      <AmbientParticles />
      <WildlifeSilhouette />

      {/* Ambient glow — parallax */}
      <motion.div className="absolute pointer-events-none" style={{
        top: '35%', left: '45%', transform: 'translate(-50%, -50%)',
        width: '640px', height: '360px',
        background: 'radial-gradient(ellipse, rgba(107,174,74,0.050) 0%, rgba(201,168,76,0.025) 45%, transparent 70%)',
        filter: 'blur(64px)',
        y: glowY,
      }} />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section overline */}
        <motion.p
          className="text-overline mb-8"
          initial={{ opacity: 0, y: 14 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65 }}
          style={{ fontSize: '0.58rem' }}
        >
          Contact — Wilderness Films India
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── LEFT ─────────────────────────────────────────── */}
          <div>
            {/* Heading */}
            <div style={{ overflow: 'hidden', marginBottom: '0.4rem' }}>
              <motion.h2
                className="font-display"
                initial={{ y: '105%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
                style={{
                  fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
                  fontWeight: 300,
                  lineHeight: 1.04,
                  color: '#F0EDE8',
                  letterSpacing: '0.01em',
                }}
              >
                Let's Tell Wild
              </motion.h2>
            </div>
            <div style={{ overflow: 'hidden', marginBottom: '1.6rem' }}>
              <motion.h2
                className="font-display"
                initial={{ y: '105%' }}
                animate={inView ? { y: 0 } : {}}
                transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                style={{
                  fontSize: 'clamp(2.4rem, 4.8vw, 4rem)',
                  fontWeight: 300,
                  lineHeight: 1.04,
                  color: 'var(--color-gold)',
                  fontStyle: 'italic',
                  letterSpacing: '0.01em',
                }}
              >
                Stories Together
              </motion.h2>
            </div>

            {/* Decorative rule */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={inView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.85, delay: 0.32, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: 'left' }}
            >
              <div style={{ height: '1px', width: '36px', background: 'rgba(201,168,76,0.55)' }} />
              <div style={{ height: '1px', width: '8px',  background: 'rgba(201,168,76,0.20)' }} />
            </motion.div>

            {/* Subheading */}
            <motion.p
              className="font-body"
              initial={{ opacity: 0, y: 18 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.38 }}
              style={{
                fontSize: '0.95rem',
                color: 'rgba(240,237,232,0.40)',
                lineHeight: 1.9,
                maxWidth: '420px',
                fontWeight: 300,
              }}
            >
              From remote forests to untold journeys across South Asia, Wilderness Films India captures stories that matter. Whether you're a broadcaster, a streaming platform, or a conservation partner — let's create something extraordinary together.
            </motion.p>

            {/* Archive stats */}
            <motion.div
              className="flex gap-10 mt-8"
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.46 }}
            >
              {[
                { num: '50K+',  label: 'Hours of Footage' },
                { num: '750K+', label: 'Still Images'     },
                { num: '25+',   label: 'Years of Stories' },
              ].map(s => (
                <div key={s.label}>
                  <p style={{
                    fontFamily: '"Cormorant Garamond", Georgia, serif',
                    fontSize: '1.85rem',
                    fontWeight: 400,
                    color: '#C9A84C',
                    lineHeight: 1,
                    marginBottom: '0.25rem',
                  }}>
                    {s.num}
                  </p>
                  <p style={{
                    fontFamily: '"Space Mono", monospace',
                    fontSize: '0.48rem',
                    letterSpacing: '0.16em',
                    textTransform: 'uppercase',
                    color: 'rgba(240,237,232,0.25)',
                  }}>
                    {s.label}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Contact info block */}
            <InfoBlock inView={inView} />
          </div>

          {/* ── RIGHT: Form ───────────────────────────────────── */}
          <ContactForm inView={inView} />
        </div>

        {/* Bottom separator */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.75, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformOrigin: 'left' }}
        >
          <div style={{
            height: '1px',
            background: 'linear-gradient(90deg, rgba(201,168,76,0.20), rgba(107,174,74,0.10), transparent)',
          }} />
        </motion.div>
      </div>
    </section>
  )
}

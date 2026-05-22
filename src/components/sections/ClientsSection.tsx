'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const CDN = (slug: string) =>
  `https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`

interface Client {
  name: string
  abbr?: string       // short label used when no logo exists
  logo?: string       // jsDelivr URL — undefined = render text
}

// ── Verified 200 on jsDelivr; absent brands render as styled text ──
const CLIENTS: Client[] = [
  { name: 'National Geographic',     abbr: 'NAT GEO'   },
  { name: 'NHK Japan',               abbr: 'NHK'       },
  { name: 'BBC',                     logo: CDN('bbc')              },
  { name: 'CNN',                     logo: CDN('cnn')              },
  { name: 'Discovery',               abbr: 'DISCOVERY' },
  { name: 'CuriosityStream',         abbr: 'CURIOSITY STREAM' },
  { name: 'Harvard Business School', abbr: 'HBS'       },
  { name: 'Aamir Khan Productions',  abbr: 'AKP'       },
  { name: 'Netflix',                 logo: CDN('netflix')          },
  { name: 'Amazon Prime Video',      logo: CDN('primevideo')       },
  { name: 'Paramount Pictures',      logo: CDN('paramountplus')    },
  { name: 'Warner Brothers',         logo: CDN('warnerbros')       },
  { name: 'Channel 4',               logo: CDN('channel4')         },
  { name: 'Dharma Productions',      abbr: 'DHARMA'    },
]

// ── Single card ──
function LogoCard({ client, hovered }: { client: Client; hovered: boolean }) {
  const imgFilter = hovered
    ? 'brightness(0) invert(1) sepia(1) saturate(2) hue-rotate(5deg) opacity(1)'
    : 'brightness(0) invert(1) opacity(0.75)'

  return (
    <div style={{
      flexShrink: 0,
      width: 'clamp(120px, 36vw, 164px)',
      height: 'clamp(60px, 15vw, 76px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 16px',
      overflow: 'hidden',
    }}>
      {client.logo ? (
        <img
          src={client.logo}
          alt={client.name}
          style={{
            height: '36px',
            width: 'auto',
            maxWidth: '120px',
            objectFit: 'contain',
            filter: imgFilter,
            transition: 'filter 0.3s ease',
            display: 'block',
          }}
        />
      ) : (
        <span style={{
          fontFamily: '"Space Mono", monospace',
          fontSize: client.abbr && client.abbr.length > 6 ? '0.5rem' : '0.68rem',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: hovered
            ? 'rgba(201,168,76,0.9)'
            : 'rgba(240,237,232,0.55)',
          whiteSpace: 'nowrap',
          transition: 'color 0.3s ease',
          textAlign: 'center',
        }}>
          {client.abbr ?? client.name}
        </span>
      )}
    </div>
  )
}

// ── Marquee row — wraps each card in a hoverable motion.div ──
function MarqueeRow({
  direction,
  duration,
}: {
  direction: 'left' | 'right'
  duration: number
}) {
  const track = [...CLIENTS, ...CLIENTS]
  const from  = direction === 'left' ? '0%'   : '-50%'
  const to    = direction === 'left' ? '-50%' : '0%'

  return (
    <div style={{ overflow: 'hidden' }}>
      <motion.div
        style={{ display: 'flex', gap: '8px', width: 'max-content', willChange: 'transform' }}
        animate={{ x: [from, to] }}
        transition={{ duration, ease: 'linear', repeat: Infinity }}
      >
        {track.map((client, i) => (
          <motion.div
            key={`${client.name}-${i}`}
            initial={false}
            whileHover={{
              borderColor: 'rgba(201,168,76,0.4)',
              boxShadow: '0 0 28px rgba(201,168,76,0.08)',
              background: 'rgba(255,255,255,0.05)',
            }}
            transition={{ duration: 0.3 }}
            style={{
              flexShrink: 0,
              borderRadius: '2px',
              border: '1px solid rgba(255,255,255,0.10)',
              background: 'rgba(255,255,255,0.06)',
              cursor: 'default',
            }}
          >
            {/* Pass hovered state via CSS variable trick — use whileHover on child instead */}
            <LogoCard client={client} hovered={false} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

// ── Section ──
export default function ClientsSection() {
  const ref      = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      style={{
        background: '#030303',
        padding: 'clamp(36px, 8vw, 60px) 0 clamp(40px, 8vw, 68px)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'radial-gradient(ellipse at 50% 50%, rgba(201,168,76,0.025) 0%, transparent 65%)',
      }} />

      <div style={{ position: 'relative', zIndex: 3 }}>

        <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 24px' }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: '"Space Mono", monospace',
              fontSize: '0.48rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'rgba(201,168,76,0.45)',
              marginBottom: '14px',
            }}
          >
            Clients &amp; Collaborations
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontSize: 'clamp(1.8rem, 3.2vw, 3rem)',
              fontWeight: 300,
              color: '#F0EDE8',
              lineHeight: 1.05,
              letterSpacing: '0.01em',
            }}
          >
            Trusted By{' '}
            <span style={{ color: 'var(--color-gold)', fontStyle: 'italic' }}>Global Storytellers</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
            style={{
              height: '1px',
              width: '36px',
              background: 'rgba(201,168,76,0.35)',
              margin: '18px auto 0',
              transformOrigin: 'center',
            }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
            maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
          }}
        >
          <MarqueeRow direction="left"  duration={44} />
          <MarqueeRow direction="right" duration={52} />
        </motion.div>

      </div>
    </section>
  )
}

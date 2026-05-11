'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Poster {
  id: string
  title: string
  imageUrl: string
  link?: string
}

// 32 posters distributed across 4 columns (8 per column)
const ALL_POSTERS: Poster[] = [
  { id: '1', title: 'Andhra Pradesh', imageUrl: 'https://images.unsplash.com/photo-1551244072-5d12893278bc?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Andhra%20Pradesh' },
{ id: '2', title: 'Arunachal Pradesh', imageUrl: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Arunachal%20Pradesh' },
{ id: '3', title: 'Assam', imageUrl: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Assam' },
{ id: '4', title: 'Bihar', imageUrl: 'https://images.unsplash.com/photo-1505232530843-7e94d7faac73?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Bihar' },
{ id: '5', title: 'Bhutan', imageUrl: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Bhutan' },
{ id: '6', title: 'Chhattisgarh', imageUrl: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Chhattisgarh' },
{ id: '7', title: 'Goa', imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Goa' },
{ id: '8', title: 'Gujarat', imageUrl: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Gujarat' },

{ id: '9', title: 'Haryana', imageUrl: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Haryana' },
{ id: '10', title: 'Himachal Pradesh', imageUrl: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Himachal%20Pradesh' },
{ id: '11', title: 'Jharkhand', imageUrl: 'https://images.unsplash.com/photo-1476611338391-6f395a0dd82e?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Jharkhand' },
{ id: '12', title: 'Karnataka', imageUrl: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Karnataka' },
{ id: '13', title: 'Kerala', imageUrl: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Kerala' },
{ id: '14', title: 'Ladakh', imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Ladakh' },
{ id: '15', title: 'Madhya Pradesh', imageUrl: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Madhya%20Pradesh' },
{ id: '16', title: 'Maharashtra', imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Maharashtra' },

{ id: '17', title: 'Manipur', imageUrl: 'https://images.unsplash.com/photo-1567507832930-c580aa702b47?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Manipur' },
{ id: '18', title: 'Meghalaya', imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Meghalaya' },
{ id: '19', title: 'Mizoram', imageUrl: 'https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Mizoram' },
{ id: '20', title: 'Nagaland', imageUrl: 'https://images.unsplash.com/photo-1494548162494-384bba4ab999?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Nagaland' },
{ id: '21', title: 'NCT of Delhi', imageUrl: 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Delhi' },
{ id: '22', title: 'Nepal', imageUrl: 'https://images.unsplash.com/photo-1517148815978-5672a31c6a95?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Nepal' },
{ id: '23', title: 'Odisha', imageUrl: 'https://images.unsplash.com/photo-1453728013993-6d66e9c9123a?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Odisha' },
{ id: '24', title: 'Punjab', imageUrl: 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Punjab' },

{ id: '25', title: 'Rajasthan', imageUrl: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Rajasthan' },
{ id: '26', title: 'Sikkim', imageUrl: 'https://images.unsplash.com/photo-1504173010664-32509107de4d?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Sikkim' },
{ id: '27', title: 'Tamil Nadu', imageUrl: 'https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Tamil%20Nadu' },
{ id: '28', title: 'Telangana', imageUrl: 'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Telangana' },
{ id: '29', title: 'Tripura', imageUrl: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Tripura' },
{ id: '30', title: 'Uttar Pradesh', imageUrl: 'https://images.unsplash.com/photo-1530508777238-14544088b92a?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Uttar%20Pradesh' },
{ id: '31', title: 'Uttarakhand', imageUrl: 'https://images.unsplash.com/photo-1598824858254-68de87b37b2e?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=Uttarakhand' },
{ id: '32', title: 'West Bengal', imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', link: 'https://www.youtube.com/@WildFilmsIndia/search?query=West%20Bengal' },
]

// Column config: posters slice, direction, speed, stagger offset
const COLUMNS = [
  { posters: ALL_POSTERS.slice(0,  8),  dir: 'up',   dur: 40, delay: '0s'    },
  { posters: ALL_POSTERS.slice(8,  16), dir: 'down', dur: 54, delay: '-27s'  },
  { posters: ALL_POSTERS.slice(16, 24), dir: 'up',   dur: 47, delay: '-18s'  },
  { posters: ALL_POSTERS.slice(24, 32), dir: 'down', dur: 60, delay: '-12s'  },
] as const

function PosterCard({ poster }: { poster: Poster }) {
  const inner = (
    <div className="wfp-card">
      <div className="wfp-img" style={{ backgroundImage: `url(${poster.imageUrl})` }} />
      <div className="wfp-overlay" />
      <div className="wfp-info">
        <p className="wfp-title">{poster.title}</p>
      </div>
    </div>
  )
  if (poster.link) {
    return (
      <a href={poster.link} target="_blank" rel="noopener noreferrer"
        style={{ textDecoration: 'none', outline: 'none', display: 'block' }}>
        {inner}
      </a>
    )
  }
  return inner
}

export default function FilmsSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section id="journey-across-india" className="wf-films">
      <style>{`
        /* ─────────────────────────────────────────────────────
           THE FILMS — Full-width immersive 4-column poster wall
           Header floats as overlay above the moving gallery.
        ───────────────────────────────────────────────────── */

        .wf-films {
          position: relative;
          background: #030303;
          height: min(940px, 92vh);
          min-height: 580px;
          overflow: hidden;
        }

        /* Gradient bridge from adjacent section (#030303) */
        .wf-films::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 60px;
          background: linear-gradient(to bottom, #030303, transparent);
          z-index: 2;
          pointer-events: none;
        }

        /* ── 4 poster columns, full width ── */
        .wf-wall {
          position: absolute;
          inset: 0;
          display: flex;
          gap: 7px;
          /* paddingTop pushes columns below the header text — no overlap */
          padding: 230px 7px 0;
        }

        .wf-col {
          flex: 1;
          overflow: hidden;
          position: relative;
        }

        /* paddingBottom = gap so -50% lands exactly at duplicate boundary */
        .wf-track {
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding-bottom: 7px;
          will-change: transform;
        }

        .wf-track-up   { animation: wfUp   linear infinite; }
        .wf-track-down { animation: wfDown linear infinite; }

        @keyframes wfUp {
          from { transform: translateY(0);    }
          to   { transform: translateY(-50%); }
        }
        @keyframes wfDown {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0);    }
        }


        /* ── Individual poster card ── */
        .wfp-card {
          width: 100%;
          aspect-ratio: 2 / 3;
          border-radius: 5px;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
          border: 1px solid rgba(166,124,82,0.06);
          cursor: pointer;
          transition:
            transform   0.45s cubic-bezier(0.16,1,0.3,1),
            box-shadow  0.45s,
            border-color 0.45s;
        }

        .wfp-card:hover {
          transform: scale(1.04);
          box-shadow:
            0 10px 44px rgba(166,124,82,0.28),
            0 0 0 1px rgba(166,124,82,0.45);
          border-color: rgba(166,124,82,0.5);
          z-index: 10;
        }

        .wfp-img {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          filter: brightness(0.46) saturate(0.58);
          transition: filter 0.45s, transform 0.6s;
        }

        .wfp-card:hover .wfp-img {
          filter: brightness(0.65) saturate(0.85);
          transform: scale(1.07);
        }

        /* Bottom content gradient */
        .wfp-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(10,4,2,0.96) 0%,
            rgba(10,4,2,0.4) 38%,
            transparent 65%
          );
        }

        .wfp-info {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 9px 11px 11px;
        }

        .wfp-cat {
          display: block;
          font-family: var(--font-mono, 'Space Mono', monospace);
          font-size: 0.43rem;
          letter-spacing: 0.2em;
          color: #A67C52;
          margin-bottom: 3px;
          opacity: 0.8;
        }

        .wfp-title {
          font-family: var(--font-display, 'Cormorant Garamond', serif);
          font-size: 1.45rem;
          font-weight: 400;
          color: #ffffff;
          opacity: 1;
          line-height: 1.2;
          margin: 0 0 3px;
          letter-spacing: 0.01em;
          text-shadow: 0 2px 8px rgba(0,0,0,0.6);
        }

        .wfp-loc {
          font-family: var(--font-mono, 'Space Mono', monospace);
          font-size: 0.41rem;
          color: rgba(240,237,232,0.26);
          letter-spacing: 0.1em;
          margin: 0;
        }

        /* ── Fade masks (above columns, below header) ── */
        .wf-fade-top {
          position: absolute;
          top: 0; left: 0; right: 0;
          /* covers header zone (230px) + soft blend into posters */
          height: 320px;
          background: linear-gradient(
            to bottom,
            rgba(3,3,3,0.98) 0%,
            rgba(3,3,3,0.98) 55%,
            rgba(3,3,3,0.45) 80%,
            transparent 100%
          );
          z-index: 5;
          pointer-events: none;
        }

        .wf-fade-bottom {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 32%;
          background: linear-gradient(
            to top,
            rgba(3,3,3,1) 0%,
            rgba(3,3,3,0.55) 50%,
            transparent 100%
          );
          z-index: 5;
          pointer-events: none;
        }

        /* Subtle radial depth glow over the poster mosaic */
        .wf-depth-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse at 50% 45%,
            rgba(166,124,82,0.05) 0%,
            transparent 62%
          );
          z-index: 6;
          pointer-events: none;
        }

        /* ── Header overlay (z above fades) ── */
        .wf-header {
          position: absolute;
          top: 0; left: 0; right: 0;
          z-index: 20;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 60px;
        }

        .wf-header-overline {
          font-family: var(--font-mono, 'Space Mono', monospace);
          font-size: 0.56rem;
          letter-spacing: 0.32em;
          color: rgba(166,124,82,0.55);
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .wf-header-title {
          font-family: var(--font-display, 'Cormorant Garamond', serif);
          font-size: clamp(2.5rem, 5vw, 4.5rem);
          font-weight: 300;
          color: #F0EDE8;
          letter-spacing: 0.16em;
          line-height: 1;
          margin: 0;
        }

        .wf-header-title-gold {
          color: #A67C52;
          font-style: italic;
        }

        .wf-header-line-row {
          display: flex;
          justify-content: center;
          margin: 15px 0 16px;
        }

        .wf-header-line {
          height: 1px;
          width: 0;
          opacity: 0;
          background: linear-gradient(to right, transparent, #A67C52, transparent);
        }
        .wf-header-line.wf-active {
          animation: wfLineGrow 1s cubic-bezier(0.16,1,0.3,1) 0.45s forwards;
        }
        @keyframes wfLineGrow {
          from { width: 0;     opacity: 0; }
          to   { width: 200px; opacity: 1; }
        }

        .wf-header-sub {
          font-family: var(--font-body, 'Outfit', sans-serif);
          font-size: 0.82rem;
          color: rgba(240,237,232,0.32);
          letter-spacing: 0.05em;
          font-weight: 300;
          max-width: 360px;
          margin: 0;
          line-height: 1.75;
          text-align: center;
        }

        /* ── Mobile responsive ── */
        @media (max-width: 640px) {
          .wf-films {
            height: min(700px, 90vh);
            min-height: 480px;
          }
          .wf-wall {
            padding: 160px 4px 0;
            gap: 4px;
          }
          .wf-fade-top { height: 240px; }
          .wfp-title { font-size: 1rem; }
          .wf-header { padding-top: 40px; }
          .wf-header-title { letter-spacing: 0.06em; }
          .wf-header-sub { font-size: 0.72rem; padding: 0 16px; }
        }

        /* ── Bottom CTA overlay ── */
        .wf-cta {
          position: absolute;
          bottom: 36px;
          left: 0; right: 0;
          z-index: 20;
          display: flex;
          justify-content: center;
        }

        .wf-cta-link {
          font-family: var(--font-mono, 'Space Mono', monospace);
          font-size: 0.57rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(166,124,82,0.7);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(166,124,82,0.18);
          padding: 13px 26px;
          border-radius: 1px;
          backdrop-filter: blur(10px);
          background: rgba(3,3,3,0.35);
          transition: color 0.3s, border-color 0.3s, background 0.3s;
        }

        .wf-cta-link:hover {
          color: #A67C52;
          border-color: rgba(166,124,82,0.5);
          background: rgba(3,3,3,0.65);
        }
      `}</style>

      {/* ── 4-column poster wall ── */}
      <div className="wf-wall">
        {COLUMNS.map((col, ci) => {
          const track = [...col.posters, ...col.posters]
          return (
            <div key={ci} className="wf-col">
              <div
                className={`wf-track wf-track-${col.dir}`}
                style={{ animationDuration: `${col.dur}s`, animationDelay: col.delay }}
              >
                {track.map((poster, i) => (
                  <PosterCard key={`${ci}-${poster.id}-${i}`} poster={poster} />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* Fade masks + depth glow */}
      <div className="wf-fade-top" />
      <div className="wf-fade-bottom" />
      <div className="wf-depth-glow" />

      {/* ── Section header overlay ── */}
      <div className="wf-header" ref={headerRef}>
        <motion.h2
          className="wf-header-title"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Journey Across{' '}
          <span className="wf-header-title-gold">India</span>
        </motion.h2>

        <div className="wf-header-line-row">
          <div className={`wf-header-line${isInView ? ' wf-active' : ''}`} />
        </div>

      </div>

    </section>
  )
}

'use client'

import { useEffect, useRef, useState, useMemo } from 'react'
import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'

// ── Types ─────────────────────────────────────────────────────

interface EquipmentItem {
  name: string
  cat: string
  cond: 'New' | 'Used'
  desc?: string   // price
  url?: string    // KitPlus listing URL
  sold?: boolean
}

type Cond = 'all' | 'New' | 'Used'
type SortKey = 'name-asc' | 'name-desc'

// ── Dropdown ──────────────────────────────────────────────────

function Dropdown({
  label, hasValue, children,
}: {
  label: string; hasValue?: boolean; children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: '#1a1a1a', border: `1px solid ${hasValue ? '#8a6f2e' : '#2c2c2c'}`,
          borderRadius: '6px', padding: '0.55rem 0.85rem',
          fontFamily: "'Montserrat', sans-serif", fontSize: '0.72rem',
          color: hasValue ? '#c8a84b' : '#888', cursor: 'pointer',
          whiteSpace: 'nowrap', transition: 'border-color 0.18s, color 0.18s',
        }}
      >
        <span>{label}</span>
        <svg
          width="12" height="12" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 6px)', left: 0,
          background: '#1a1a1a', border: '1px solid #2c2c2c',
          borderRadius: '8px', minWidth: '220px', maxHeight: '340px', overflowY: 'auto',
          boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
          zIndex: 400,
        }}>
          {children}
        </div>
      )}
    </div>
  )
}

function DDOption({
  selected, onClick, children,
}: {
  selected?: boolean; onClick: () => void; children: React.ReactNode
}) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0.55rem 0.9rem', fontSize: '0.72rem',
        color: selected ? '#c8a84b' : hov ? '#f0ece3' : '#888',
        background: selected ? 'rgba(200,168,75,0.09)' : hov ? '#222' : 'transparent',
        cursor: 'pointer', transition: 'background 0.12s, color 0.12s',
      }}
    >
      {children}
    </div>
  )
}

const DDDivider = () => <div style={{ height: '1px', background: '#222', margin: '0.2rem 0' }} />

// ── Main Page ─────────────────────────────────────────────────

export default function EquipmentPage() {
  const [items, setItems] = useState<EquipmentItem[]>([])
  const [loadError, setLoadError] = useState(false)
  const [activeCat, setActiveCat] = useState('all')
  const [activeCond, setActiveCond] = useState<Cond>('all')
  const [activeSort, setActiveSort] = useState<SortKey>('name-asc')
  const [query, setQuery] = useState('')
  const [perPage, setPerPage] = useState(50)
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetch('/equipment.json')
      .then(r => { if (!r.ok) throw new Error(); return r.json() })
      .then(setItems)
      .catch(() => setLoadError(true))
  }, [])

  // Build category list from actual data
  const categories = useMemo(() =>
    Array.from(new Set(items.map(i => i.cat))).sort()
  , [items])

  const available = items.filter(i => !i.sold)

  const catCount = (cat: string) =>
    cat === 'all' ? available.length : available.filter(i => i.cat === cat).length

  const filtered = useMemo(() => items
    .filter(i => {
      const catOk  = activeCat  === 'all' || i.cat  === activeCat
      const condOk = activeCond === 'all' || i.cond === activeCond
      const q      = query.toLowerCase().trim()
      const qOk    = !q || i.name.toLowerCase().includes(q) || (i.desc || '').toLowerCase().includes(q) || i.cat.toLowerCase().includes(q)
      return catOk && condOk && qOk
    })
    .sort((a, b) => activeSort === 'name-desc' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name))
  , [items, activeCat, activeCond, activeSort, query])

  // Reset to page 1 when filters or perPage change
  useEffect(() => { setPage(1) }, [activeCat, activeCond, activeSort, query, perPage])

  const totalPages = perPage === 0 ? 1 : Math.ceil(filtered.length / perPage)
  const pageItems  = perPage === 0 ? filtered : filtered.slice((page - 1) * perPage, page * perPage)

  return (
    <>
      <Navigation />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .eq-row:hover { background: #131313 !important; }
        .eq-row:hover .eq-name { color: #deba60 !important; }
        .enquire-btn:hover { background: #c8a84b !important; color: #000 !important; border-color: #c8a84b !important; }
        .dd-scroll::-webkit-scrollbar { width: 4px; }
        .dd-scroll::-webkit-scrollbar-track { background: transparent; }
        .dd-scroll::-webkit-scrollbar-thumb { background: #333; border-radius: 4px; }
        @media (max-width: 860px) {
          .eq-table th:nth-child(2), .eq-table td:nth-child(2),
          .eq-table th:nth-child(4), .eq-table td:nth-child(4) { display: none; }
        }
        @media (max-width: 560px) {
          .eq-hero { flex-direction: column !important; }
          .eq-hero-desc { border-left: none !important; padding-left: 0 !important; border-top: 1px solid #2c2c2c; padding-top: 0.8rem !important; }
        }
      `}</style>

      <main style={{ background: '#0a0a0a', minHeight: '100svh', fontFamily: "'Montserrat', sans-serif", paddingTop: '80px' }}>

        {/* ── Hero ── */}
        <section className="eq-hero" style={{
          borderBottom: '1px solid #222',
          padding: '2rem 2rem 1.8rem',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: '2rem',
          background: 'linear-gradient(105deg, #0a0a0a 60%, rgba(200,168,75,0.04) 100%)',
        }}>
          <div>
            <div style={{
              fontSize: '0.54rem', letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#c8a84b', marginBottom: '0.4rem',
              display: 'flex', alignItems: 'center', gap: '0.6rem',
            }}>
              <span style={{ width: 20, height: 1, background: '#c8a84b', display: 'inline-block' }} />
              Wilderness Films India — Est. 1987
            </div>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontWeight: 300, fontSize: 'clamp(2rem, 4vw, 2.6rem)', lineHeight: 1,
              color: '#f0ece3', margin: 0,
            }}>
              Equipment{' '}
              <em style={{ fontStyle: 'italic', color: '#c8a84b', display: 'block' }}>For Sale &amp; Rental</em>
            </h1>
          </div>
          <div className="eq-hero-desc" style={{
            maxWidth: '340px', flexShrink: 0,
            borderLeft: '1px solid #2c2c2c', paddingLeft: '1.5rem',
            display: 'flex', flexDirection: 'column', gap: '1rem',
          }}>
            <p style={{ fontSize: '0.7rem', fontWeight: 300, color: '#888', lineHeight: 1.75, margin: 0 }}>
              For specific equipment requirements not listed here, write to us directly. Our inventory runs deeper than what&apos;s on this page.
            </p>
            <a
              href="/#contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                fontFamily: "'Montserrat', sans-serif",
                fontSize: '0.55rem', fontWeight: 600,
                letterSpacing: '0.2em', textTransform: 'uppercase',
                color: '#C9A84C', textDecoration: 'none',
                border: '1px solid rgba(201,168,76,0.35)',
                borderRadius: '2px', padding: '0.55rem 1rem',
                transition: 'background 0.2s, border-color 0.2s',
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
              Contact Us
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>

        {/* ── Toolbar ── */}
        <div style={{
          background: '#131313', borderBottom: '1px solid #222',
          padding: '0.75rem 2rem',
          display: 'flex', alignItems: 'center', gap: '0.6rem',
          flexWrap: 'wrap', position: 'sticky', top: 80, zIndex: 200,
        }}>
          {/* Search */}
          <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
            <svg
              width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke="#666" strokeWidth="2"
              style={{ position: 'absolute', left: '0.7rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
            >
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search equipment…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                width: '100%', background: '#1a1a1a', border: '1px solid #2c2c2c',
                borderRadius: '6px', padding: '0.55rem 0.8rem 0.55rem 2.2rem',
                fontFamily: "'Montserrat', sans-serif", fontSize: '0.75rem',
                color: '#f0ece3', outline: 'none',
              }}
            />
          </div>

          {/* Category */}
          <Dropdown
            label={activeCat === 'all' ? 'Category' : activeCat}
            hasValue={activeCat !== 'all'}
          >
            <DDOption selected={activeCat === 'all'} onClick={() => setActiveCat('all')}>
              <span>All Categories</span>
              <span style={{ fontSize: '0.62rem', color: '#666' }}>{catCount('all')}</span>
            </DDOption>
            <DDDivider />
            {categories.map(c => (
              <DDOption key={c} selected={activeCat === c} onClick={() => setActiveCat(c)}>
                <span>{c}</span>
                <span style={{ fontSize: '0.62rem', color: '#666' }}>{catCount(c)}</span>
              </DDOption>
            ))}
          </Dropdown>

          {/* Condition */}
          <Dropdown label={activeCond === 'all' ? 'Condition' : activeCond} hasValue={activeCond !== 'all'}>
            <DDOption selected={activeCond === 'all'} onClick={() => setActiveCond('all')}>All Conditions</DDOption>
            <DDDivider />
            <DDOption selected={activeCond === 'New'} onClick={() => setActiveCond('New')}>New</DDOption>
            <DDOption selected={activeCond === 'Used'} onClick={() => setActiveCond('Used')}>Used</DDOption>
          </Dropdown>

          {/* Sort */}
          <Dropdown label={activeSort === 'name-asc' ? 'Sort: A→Z' : 'Sort: Z→A'}>
            <DDOption selected={activeSort === 'name-asc'} onClick={() => setActiveSort('name-asc')}>Name A→Z</DDOption>
            <DDOption selected={activeSort === 'name-desc'} onClick={() => setActiveSort('name-desc')}>Name Z→A</DDOption>
          </Dropdown>

          {/* Per page */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginLeft: 'auto' }}>
            <span style={{ fontSize: '0.62rem', color: '#666', whiteSpace: 'nowrap' }}>Per page:</span>
            {[10, 25, 50, 100, 0].map(n => (
              <button
                key={n}
                onClick={() => setPerPage(n)}
                style={{
                  background: perPage === n ? 'rgba(200,168,75,0.12)' : 'transparent',
                  border: `1px solid ${perPage === n ? '#8a6f2e' : '#2c2c2c'}`,
                  borderRadius: '4px', padding: '0.25rem 0.5rem',
                  fontFamily: "'Montserrat', sans-serif", fontSize: '0.62rem',
                  color: perPage === n ? '#c8a84b' : '#666',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {n === 0 ? 'All' : n}
              </button>
            ))}
            <span style={{ fontSize: '0.62rem', color: '#555', marginLeft: '0.4rem', whiteSpace: 'nowrap' }}>
              <strong style={{ color: '#c8a84b', fontWeight: 500 }}>{filtered.length}</strong> of {items.length}
            </span>
          </div>
        </div>

        {/* ── Table ── */}
        <div style={{ padding: '0 2rem 3rem' }}>
          {loadError ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#666' }}>
              <p style={{ fontSize: '0.75rem' }}>Could not load equipment data</p>
            </div>
          ) : filtered.length === 0 && items.length > 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#666' }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" style={{ opacity: 0.15, marginBottom: '1rem', display: 'block', margin: '0 auto 1rem' }}>
                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
              </svg>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.06em' }}>No items match your filters</p>
            </div>
          ) : items.length === 0 && !loadError ? (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: '#666' }}>
              <p style={{ fontSize: '0.75rem', letterSpacing: '0.06em' }}>Equipment list coming soon</p>
            </div>
          ) : (
            <table className="eq-table" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1.2rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #8a6f2e' }}>
                  {['Item', 'Category', 'Condition', 'Enquire'].map((h, i) => (
                    <th key={h} style={{
                      textAlign: i === 3 ? 'right' : 'left',
                      padding: '0.6rem 1rem',
                      fontSize: '0.54rem', fontWeight: 600,
                      letterSpacing: '0.2em', textTransform: 'uppercase',
                      color: '#666', whiteSpace: 'nowrap',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {pageItems.map((item, idx) => {
                  const sold = !!item.sold
                  return (
                    <tr
                      key={idx}
                      className="eq-row"
                      style={{
                        borderBottom: '1px solid #222',
                        opacity: sold ? 0.45 : 1,
                        cursor: 'default',
                        transition: 'background 0.12s',
                      }}
                    >
                      <td style={{ padding: '0.9rem 1rem', verticalAlign: 'middle' }}>
                        <div
                          className="eq-name"
                          style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: '1rem', fontWeight: 400,
                            color: '#f0ece3', lineHeight: 1.25,
                            textDecoration: sold ? 'line-through' : 'none',
                            transition: 'color 0.15s',
                          }}
                        >
                          {item.name}
                        </div>
                      </td>
                      <td style={{ padding: '0.9rem 1rem', verticalAlign: 'middle' }}>
                        <span style={{
                          display: 'inline-block', fontSize: '0.58rem', fontWeight: 500,
                          letterSpacing: '0.1em', textTransform: 'uppercase',
                          padding: '0.22rem 0.6rem', border: '1px solid #2c2c2c',
                          borderRadius: '4px', color: '#888', whiteSpace: 'nowrap',
                        }}>
                          {item.cat}
                        </span>
                      </td>
                      <td style={{ padding: '0.9rem 1rem', verticalAlign: 'middle' }}>
                        {sold ? (
                          <span style={{
                            display: 'inline-block', fontSize: '0.58rem', fontWeight: 600,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            padding: '0.22rem 0.65rem', borderRadius: '20px',
                            background: 'rgba(255,255,255,0.06)', color: '#555', border: '1px solid #333',
                          }}>Sold</span>
                        ) : item.cond === 'New' ? (
                          <span style={{
                            display: 'inline-block', fontSize: '0.58rem', fontWeight: 600,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            padding: '0.22rem 0.65rem', borderRadius: '20px',
                            background: 'rgba(78,158,58,0.13)', color: '#4e9e3a',
                          }}>New</span>
                        ) : (
                          <span style={{
                            display: 'inline-block', fontSize: '0.58rem', fontWeight: 600,
                            letterSpacing: '0.1em', textTransform: 'uppercase',
                            padding: '0.22rem 0.65rem', borderRadius: '20px',
                            background: 'rgba(200,168,75,0.09)', color: '#c8a84b',
                          }}>Used</span>
                        )}
                      </td>
                      <td style={{ padding: '0.9rem 1rem', verticalAlign: 'middle', textAlign: 'right' }}>
                        {sold ? (
                          <span style={{
                            display: 'inline-block', fontSize: '0.6rem', fontWeight: 600,
                            letterSpacing: '0.14em', textTransform: 'uppercase',
                            color: '#c8a84b', border: '1px solid #8a6f2e',
                            borderRadius: '5px', padding: '0.38rem 0.9rem',
                            opacity: 0.3, cursor: 'not-allowed',
                          }}>Sold</span>
                        ) : (
                          <button
                            className="enquire-btn"
                            onClick={() => {
                              const url = `https://mail.google.com/mail/?view=cm&fs=1&to=rupindang@gmail.com&cc=dharanshidang@gmail.com&su=${encodeURIComponent('Enquiry: ' + item.name)}&body=${encodeURIComponent('Hi,\n\nI am interested in the following item:\n' + item.name + '\n\nPlease share more details.\n\nRegards')}`
                              window.open(url, '_blank', 'noopener,noreferrer')
                            }}
                            style={{
                              display: 'inline-block', fontSize: '0.6rem', fontWeight: 600,
                              letterSpacing: '0.14em', textTransform: 'uppercase',
                              color: '#c8a84b', textDecoration: 'none',
                              border: '1px solid #8a6f2e', borderRadius: '5px',
                              padding: '0.38rem 0.9rem',
                              transition: 'background 0.18s, color 0.18s, border-color 0.18s',
                              whiteSpace: 'nowrap', cursor: 'pointer', background: 'transparent',
                            }}
                          >
                            Enquire
                          </button>
                        )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}

          {/* ── Pagination ── */}
          {totalPages > 1 && (
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: '0.4rem', padding: '2rem 0 0.5rem',
            }}>
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  background: 'transparent', border: '1px solid #2c2c2c',
                  borderRadius: '4px', padding: '0.38rem 0.75rem',
                  fontFamily: "'Montserrat', sans-serif", fontSize: '0.62rem',
                  color: page === 1 ? '#333' : '#888', cursor: page === 1 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(n => n === 1 || n === totalPages || Math.abs(n - page) <= 2)
                .reduce<(number | '…')[]>((acc, n, i, arr) => {
                  if (i > 0 && n - (arr[i - 1] as number) > 1) acc.push('…')
                  acc.push(n)
                  return acc
                }, [])
                .map((n, i) =>
                  n === '…' ? (
                    <span key={`ellipsis-${i}`} style={{ fontSize: '0.62rem', color: '#444', padding: '0 0.2rem' }}>…</span>
                  ) : (
                    <button
                      key={n}
                      onClick={() => setPage(n as number)}
                      style={{
                        background: page === n ? 'rgba(200,168,75,0.12)' : 'transparent',
                        border: `1px solid ${page === n ? '#8a6f2e' : '#2c2c2c'}`,
                        borderRadius: '4px', padding: '0.38rem 0.65rem',
                        fontFamily: "'Montserrat', sans-serif", fontSize: '0.62rem',
                        color: page === n ? '#c8a84b' : '#666',
                        cursor: 'pointer', minWidth: '32px',
                        transition: 'all 0.15s',
                      }}
                    >
                      {n}
                    </button>
                  )
                )
              }

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  background: 'transparent', border: '1px solid #2c2c2c',
                  borderRadius: '4px', padding: '0.38rem 0.75rem',
                  fontFamily: "'Montserrat', sans-serif", fontSize: '0.62rem',
                  color: page === totalPages ? '#333' : '#888', cursor: page === totalPages ? 'not-allowed' : 'pointer',
                }}
              >
                Next →
              </button>
            </div>
          )}
        </div>

      </main>
      <Footer />
    </>
  )
}

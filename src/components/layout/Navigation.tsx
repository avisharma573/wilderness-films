'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useCallback } from 'react'
import { LogoCompact } from '@/components/ui/Logo'

const NAV_LINKS = [
  { label: 'Films',    href: '#films'    },
  { label: 'Wildlife', href: '#wildlife' },
  { label: 'Journey',  href: '#journey'  },
  { label: 'Contact',  href: '#contact'  },
]

const NAV_HEIGHT = 88 // px — fixed navbar height to offset scroll target

function smoothScrollTo(href: string) {
  const id = href.replace('#', '')
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const navOpacity  = useTransform(scrollY, [0, 100], [0, 1])

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      smoothScrollTo(href)
      setMenuOpen(false)
    }
  }, [])

  return (
    <motion.nav
      className="fixed top-0 inset-x-0 z-50 px-6 md:px-12"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
    >
      {/* Blur backdrop — appears on scroll */}
      <motion.div
        className="absolute inset-0 nav-blur"
        style={{ opacity: navOpacity }}
      />

      <div className="relative max-w-7xl mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <a href="/" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
          <LogoCompact size={20} />
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} link={link} onClick={handleNavClick} />
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#films"
            className="btn-primary text-xs py-3 px-6"
            style={{ fontSize: '0.7rem' }}
            onClick={(e) => handleNavClick(e, '#films')}
          >
            Watch Films
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-6 h-px"
              style={{ background: '#C9A84C' }}
              animate={
                menuOpen
                  ? i === 0 ? { rotate: 45, y: 6 }
                  : i === 1 ? { opacity: 0 }
                  : { rotate: -45, y: -6 }
                  : { rotate: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.3 }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        className="md:hidden overflow-hidden"
        initial={false}
        animate={{ height: menuOpen ? 'auto' : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <div
          className="px-4 py-6 space-y-6"
          style={{
            background: 'rgba(3,3,3,0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="block font-body text-sm tracking-widest uppercase"
              style={{ color: 'rgba(240,237,232,0.7)', letterSpacing: '0.2em' }}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  )
}

// ── Individual nav link with underline glow ───────────────────
function NavLink({
  link,
  onClick,
}: {
  link: { label: string; href: string }
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void
}) {
  const [hovered, setHovered] = useState(false)
  const isContact = link.label === 'Contact'

  return (
    <a
      href={link.href}
      className="relative font-body text-xs uppercase"
      style={{
        letterSpacing: '0.15em',
        color: isContact
          ? hovered ? '#C9A84C' : 'rgba(201,168,76,0.65)'
          : hovered ? '#C9A84C' : 'rgba(240,237,232,0.5)',
        transition: 'color 0.25s ease',
        paddingBottom: '2px',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={(e) => onClick(e, link.href)}
    >
      {link.label}

      {/* Animated underline */}
      <motion.span
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '1px',
          background: 'linear-gradient(90deg, #C9A84C, rgba(201,168,76,0.3))',
          boxShadow: hovered ? '0 0 6px rgba(201,168,76,0.5)' : 'none',
        }}
        initial={false}
        animate={{ width: hovered ? '100%' : '0%' }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      />

      {/* Contact badge — subtle gold dot */}
      {isContact && (
        <span style={{
          position: 'absolute',
          top: '-3px',
          right: '-6px',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          background: '#C9A84C',
          opacity: 0.7,
        }} />
      )}
    </a>
  )
}

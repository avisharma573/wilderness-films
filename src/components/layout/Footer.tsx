'use client'

import { LogoCompact } from '@/components/ui/Logo'

const SOCIAL_LINKS = [
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/wildfilmsindia',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.7 15.5V8.5l6.3 3.5-6.3 3.5z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/wildfilmsindia',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8 0 3.2 0 3.6-.1 4.8-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1-3.2 0-3.6 0-4.8-.1-3.3-.1-4.8-1.7-4.9-4.9C2.2 15.6 2.2 15.2 2.2 12c0-3.2 0-3.6.1-4.8C2.4 3.9 4 2.3 7.2 2.3c1.2-.1 1.6-.1 4.8-.1zM12 0C8.7 0 8.3 0 7.1.1 2.7.3.3 2.7.1 7.1.0 8.3 0 8.7 0 12c0 3.3 0 3.7.1 4.9.2 4.4 2.6 6.8 7 7C8.3 24 8.7 24 12 24c3.3 0 3.7 0 4.9-.1 4.4-.2 6.8-2.6 7-7 .1-1.2.1-1.6.1-4.9 0-3.3 0-3.7-.1-4.9C23.7 2.7 21.3.3 16.9.1 15.7 0 15.3 0 12 0zm0 5.8a6.2 6.2 0 1 0 0 12.4A6.2 6.2 0 0 0 12 5.8zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.8a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z"/>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/WildernessFilmsIndiaLimited',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/>
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer
      className="relative py-20 px-6 md:px-12 lg:px-24"
      style={{
        background: '#030303',
        borderTop: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      {/* Top row */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 mb-16">
          {/* Brand */}
          <div className="flex-1">
            <div className="mb-6">
              <LogoCompact size={18} />
            </div>

            <p className="font-body" style={{ fontSize: '0.875rem', color: 'rgba(240,237,232,0.35)', lineHeight: 1.7, maxWidth: '280px' }}>
              Cinematic wildlife storytelling from the heart of India's most extraordinary wild places.
            </p>

            {/* Coordinates */}
            <div className="mt-6 font-mono" style={{ fontSize: '0.6rem', color: 'rgba(201,168,76,0.3)', letterSpacing: '0.1em' }}>
              <p>20.5937° N, 78.9629° E</p>
              <p style={{ color: 'rgba(107,174,74,0.3)' }}>Republic of India</p>
            </div>

            {/* Social icons */}
            <div className="flex gap-3 mt-6">
              {SOCIAL_LINKS.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    border: '1px solid rgba(201,168,76,0.18)',
                    borderRadius: '2px',
                    color: 'rgba(240,237,232,0.30)',
                    transition: 'color 0.25s, border-color 0.25s, box-shadow 0.25s',
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = '#C9A84C'
                    el.style.borderColor = 'rgba(201,168,76,0.50)'
                    el.style.boxShadow = '0 0 10px rgba(201,168,76,0.12)'
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'rgba(240,237,232,0.30)'
                    el.style.borderColor = 'rgba(201,168,76,0.18)'
                    el.style.boxShadow = 'none'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: 'Films',
              links: ['All Documentaries', 'Short Films', 'Cinematic Reels', 'Behind The Lens'],
            },
            {
              title: 'Sanctuaries',
              links: ['Ranthambore', 'Jim Corbett', 'Kaziranga', 'Sundarbans', 'Gir Forest'],
            },
            {
              title: 'Studio',
              links: ['About Us', 'Our Filmmakers', 'Collaborations', 'Press Kit', 'Contact'],
            },
          ].map((col) => (
            <div key={col.title}>
              <p
                className="font-mono mb-6"
                style={{ fontSize: '0.6rem', letterSpacing: '0.25em', color: 'rgba(201,168,76,0.5)', textTransform: 'uppercase' }}
              >
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body transition-colors duration-300"
                      style={{ fontSize: '0.85rem', color: 'rgba(240,237,232,0.3)' }}
                      onMouseEnter={(e) => { (e.target as HTMLElement).style.color = '#C9A84C' }}
                      onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(240,237,232,0.3)' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Gold divider */}
        <div className="h-px mb-8" style={{ background: 'linear-gradient(90deg, rgba(201,168,76,0.2), transparent)' }} />

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono" style={{ fontSize: '0.6rem', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.1em' }}>
            © 2024 Wilderness Films India. All rights reserved.
          </p>

          <div className="flex gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a
                key={item}
                href="#"
                className="font-mono transition-colors duration-300"
                style={{ fontSize: '0.6rem', color: 'rgba(240,237,232,0.2)', letterSpacing: '0.1em' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'rgba(201,168,76,0.5)' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'rgba(240,237,232,0.2)' }}
              >
                {item}
              </a>
            ))}
          </div>

          <p className="font-mono" style={{ fontSize: '0.6rem', color: 'rgba(201,168,76,0.2)', letterSpacing: '0.1em' }}>
            CRAFTED WITH ♥ FOR THE WILD
          </p>
        </div>
      </div>
    </footer>
  )
}

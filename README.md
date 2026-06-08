# Wilderness Films India

Official website for Wilderness Films India Ltd. — South Asia's largest factual visual archive, established 1987.

<!-- Test connection to new remote -->


Built with Next.js 15, Framer Motion, and Tailwind CSS.

---

## Stack

| Package | Purpose |
|---------|---------|
| Next.js 15 | React framework (App Router) |
| React 19 | UI library |
| Framer Motion | Animations |
| Tailwind CSS | Utility styling |
| TypeScript | Type safety |

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

```bash
npm run build   # production build
npm start       # run production server
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout — SEO, fonts, JSON-LD
│   ├── page.tsx                # Homepage
│   ├── about/                  # About Us page
│   ├── offerings/              # Offerings page
│   ├── equipment/              # Equipment page
│   ├── api/contact/            # Contact form API route
│   ├── sitemap.ts              # Auto-generated sitemap
│   └── robots.ts               # Auto-generated robots.txt
├── components/
│   ├── layout/
│   │   ├── Navigation.tsx      # Sticky nav
│   │   └── Footer.tsx          # Site footer
│   ├── sections/
│   │   ├── HeroSection.tsx     # Full-screen video hero
│   │   ├── WildlifeSection.tsx # Wildlife gallery cards
│   │   ├── FilmsSection.tsx    # Journey Across India — state posters
│   │   ├── JourneySection.tsx  # Journey section
│   │   ├── ClientsSection.tsx  # Broadcaster logos
│   │   └── ContactSection.tsx  # Contact form
│   └── ui/
│       ├── Logo.tsx            # Logo component
│       └── LoadingScreen.tsx   # Intro loading animation
└── styles/
    └── globals.css             # Global styles + design tokens
```

---

## Design Tokens

| Token | Value | Use |
|-------|-------|-----|
| Gold | `#C9A84C` | Primary accent |
| Cream | `#F0EDE8` | Primary text |
| Black | `#030303` | Background |
| Serif | Cormorant Garamond | Headings |
| Body | Outfit | Body copy |
| Mono | Space Mono | Labels |

---

## Environment Variables

Create `.env.local` (never commit this file):

```
# Web3Forms key for contact form
WEB3FORMS_ACCESS_KEY=your_key_here
```
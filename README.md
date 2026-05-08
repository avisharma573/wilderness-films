# 🌿 Wilderness Films India — Premium Cinematic Website

A luxury wildlife documentary experience built with Next.js 15, Three.js, Framer Motion, and GSAP.
Inspired by Apple + National Geographic + Vercel design philosophy.

---

## ✨ Features

- **Interactive 3D Globe** — India highlighted with WebGL shaders, wildlife hotspots with pulse animations
- **Cinematic Loading Screen** — Animated logo with progress indicator
- **Parallax Mouse Movement** — Subtle depth on hero section
- **Wildlife Species Cards** — Glassmorphism with hover reveals
- **Journey Timeline** — Scroll-animated path connecting India's sanctuaries
- **Featured Films** — Cinematic card grid with hover effects
- **Ambient Audio Toggle** — Web Audio API ambient sound
- **Film Grain Overlay** — Subtle cinematic grain texture
- **GSAP Scroll Triggers** — Smooth scroll-triggered animations
- **Fully Responsive** — Mobile to 4K

---

## 🚀 Quick Start

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 3. Build for production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
wilderness-films/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   └── page.tsx            # Main page orchestrator
│   ├── components/
│   │   ├── globe/
│   │   │   ├── InteractiveGlobe.tsx  # Three.js R3F globe
│   │   │   └── shaders.ts            # GLSL vertex/fragment shaders
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx       # Full-screen hero + globe
│   │   │   ├── WildlifeSection.tsx   # Species cards grid
│   │   │   ├── JourneySection.tsx    # Timeline with GSAP
│   │   │   └── FilmsSection.tsx      # Featured films grid
│   │   ├── layout/
│   │   │   ├── Navigation.tsx        # Sticky nav with blur
│   │   │   └── Footer.tsx            # Site footer
│   │   └── ui/
│   │       ├── LoadingScreen.tsx     # Cinematic loading animation
│   │       └── AudioToggle.tsx       # Ambient sound control
│   ├── lib/
│   │   └── globe-data.ts             # Hotspot coordinates + helpers
│   └── styles/
│       └── globals.css               # Global styles + design tokens
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## 🎨 Design System

### Colors
| Token | Value | Use |
|-------|-------|-----|
| Gold | `#C9A84C` | Primary accent, hotspots |
| Gold Light | `#E8C87A` | Hover states |
| Green | `#6BAE4A` | Forest/nature accents |
| Cream | `#F0EDE8` | Primary text |
| Black | `#030303` | Background |

### Typography
| Role | Font | Usage |
|------|------|-------|
| Display | Cormorant Garamond | Headings, titles |
| Body | Outfit | Body copy, UI |
| Mono | Space Mono | Labels, data |

---

## 🔧 Tech Stack

| Package | Version | Purpose |
|---------|---------|---------|
| Next.js | 15.1.0 | React framework |
| React | 19.0.0 | UI library |
| Framer Motion | 11.x | Animations |
| @react-three/fiber | 8.x | Three.js renderer |
| @react-three/drei | 9.x | Three.js helpers |
| Three.js | 0.170.x | 3D globe |
| GSAP | 3.12.x | Scroll animations |
| Tailwind CSS | 3.4.x | Styling |

---

## 🌐 Globe Customization

To add more wildlife hotspots, edit `src/lib/globe-data.ts`:

```typescript
export const INDIA_HOTSPOTS: Hotspot[] = [
  {
    id: 'your-park',
    name: 'Your Park Name',
    lat: 22.5,    // Latitude
    lon: 80.0,    // Longitude
    description: 'Description of this sanctuary',
    species: ['Species 1', 'Species 2'],
    color: '#C9A84C',  // Hotspot color
  },
  // ...
]
```

---

## 🎬 Adding Real Film Content

1. Replace Unsplash URLs in `WildlifeSection.tsx` and `FilmsSection.tsx` with your own images
2. Host ambient audio file and update `AudioToggle.tsx` to use `<audio>` instead of Web Audio API
3. Update metadata in `app/layout.tsx` with your SEO content

---

## 📱 Responsive Breakpoints

- Mobile: `< 768px`
- Tablet: `768px — 1024px`
- Desktop: `> 1024px`
- Wide: `> 1440px`

---

## ⚡ Performance Notes

- Globe is dynamically imported (no SSR)
- Images lazy-loaded with Next.js Image optimization
- GSAP ScrollTrigger cleaned up on unmount
- Three.js canvas uses `dpr={[1, 2]}` for Retina optimization
- Grain overlay uses CSS animation (no JS)

---

## 🏆 Credits

Designed and built as a premium cinematic web experience.
Wildlife photography: Unsplash contributors.
Inspired by: Apple.com, National Geographic, Vercel.com

---

*"The jungle is dark but full of diamonds." — Arthur Miller*

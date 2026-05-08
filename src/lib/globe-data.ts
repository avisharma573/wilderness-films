// ============================================================
// Globe constants: India wildlife hotspot coordinates
// Lat/Lon → Three.js spherical coords for globe positioning
// ============================================================

export interface Hotspot {
  id: string
  name: string
  lat: number
  lon: number
  description: string
  species: string[]
  color: string
}

// Wildlife hotspots across India
export const INDIA_HOTSPOTS: Hotspot[] = [
  {
    id: 'ranthambore',
    name: 'Ranthambore',
    lat: 26.0,
    lon: 76.5,
    description: "India's premier tiger reserve in Rajasthan's rugged terrain",
    species: ['Bengal Tiger', 'Leopard', 'Sloth Bear'],
    color: '#C9A84C',
  },
  {
    id: 'jim-corbett',
    name: 'Jim Corbett',
    lat: 29.5,
    lon: 78.8,
    description: "India's oldest national park nestled in the Himalayan foothills",
    species: ['Bengal Tiger', 'Asian Elephant', 'Gharial'],
    color: '#C9A84C',
  },
  {
    id: 'kaziranga',
    name: 'Kaziranga',
    lat: 26.6,
    lon: 93.2,
    description: 'UNESCO World Heritage site — home to two-thirds of the world\'s one-horned rhinos',
    species: ['One-Horned Rhino', 'Asian Elephant', 'Wild Buffalo'],
    color: '#C9A84C',
  },
  {
    id: 'sundarbans',
    name: 'Sundarbans',
    lat: 21.9,
    lon: 89.1,
    description: 'The largest mangrove delta — realm of the Royal Bengal Tiger',
    species: ['Bengal Tiger', 'Irrawaddy Dolphin', 'Estuarine Crocodile'],
    color: '#6BAE4A',
  },
  {
    id: 'gir',
    name: 'Gir National Park',
    lat: 21.1,
    lon: 70.8,
    description: "Last refuge of the Asiatic Lion — Gujarat's crown jewel",
    species: ['Asiatic Lion', 'Leopard', 'Indian Gazelle'],
    color: '#C9A84C',
  },
  {
    id: 'kerala',
    name: 'Kerala Backwaters',
    lat: 9.5,
    lon: 76.5,
    description: "God's Own Country — emerald waterways teeming with life",
    species: ['Asian Elephant', 'Kingfisher', 'Otter'],
    color: '#6BAE4A',
  },
  {
    id: 'ladakh',
    name: 'Ladakh',
    lat: 34.2,
    lon: 77.6,
    description: 'The Roof of the World — sanctuary of the elusive Snow Leopard',
    species: ['Snow Leopard', 'Tibetan Wolf', 'Black-Necked Crane'],
    color: '#A8D4FF',
  },
]

// Convert lat/lon to 3D sphere position (radius = 1)
export function latLonToVector3(lat: number, lon: number, radius: number = 1) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lon + 180) * (Math.PI / 180)

  return {
    x: -(radius * Math.sin(phi) * Math.cos(theta)),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  }
}

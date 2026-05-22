import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://www.wildfilmsindia.com/sitemap.xml',
    host: 'https://www.wildfilmsindia.com',
  }
}
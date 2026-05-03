import { MetadataRoute } from 'next'

const BASE_URL = 'https://athulkrishnav.online' // TODO: replace with your actual domain

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}

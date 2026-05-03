import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'
import CustomCursor from '@/components/cursor/CustomCursor'
import Nav from '@/components/nav/Nav'
import LenisProvider from '@/providers/LenisProvider'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

// TODO: replace with your actual deployed domain
const BASE_URL = 'https://athulkrishnav.online'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Athul Krishna V — FullStack Developer',
    template: '%s | Athul Krishna V',
  },
  description:
    'Athul Krishna V is a FullStack Software Developer based in Kerala, India — specializing in React, Python, AWS, Brand Identity, and Product Design.',
  keywords: [
    'Athul Krishna V',
    'Athul Krishna',
    'athul',
    'Athul',
    'athulkrishna',
    'Athul Krishna developer',
    'Athul Krishna designer',
    'Athul Krishna V portfolio',
    'Athul Krishna Kerala',
    'FullStack Developer Kerala',
    'React Developer India',
    'Python Developer Kerala',
    'Brand Designer Kerala',
    'Creative Developer India',
    'AWS Developer Kerala',
    'Software Developer Kerala',
    'UI UX Designer Kerala',
    'athul@cybersquare.org',
    'CyberSquare developer',
  ],
  authors: [{ name: 'Athul Krishna V', url: BASE_URL }],
  creator: 'Athul Krishna V',
  publisher: 'Athul Krishna V',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: BASE_URL,
    siteName: 'Athul Krishna V',
    title: 'Athul Krishna V — FullStack Developer',
    description:
      'Portfolio of Athul Krishna V — FullStack Software Developer from Kerala, India. React, Python, AWS, Brand Identity, Automotive Photography.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Athul Krishna V — FullStack Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Athul Krishna V — FullStack Developer',
    description:
      'Portfolio of Athul Krishna V — FullStack Software Developer from Kerala, India.',
    images: ['/og-image.png'],
    creator: '@athul_.x',
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: 'technology',
}

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Athul Krishna V',
  alternateName: ['Athul Krishna', 'athul'],
  url: BASE_URL,
  email: 'athul@cybersquare.org',
  image: `${BASE_URL}/og-image.png`,
  jobTitle: 'FullStack Software Developer',
  description:
    'FullStack Software Developer based in Kerala, India. Specializing in React, Python, AWS, Brand Identity, and Product Design.',
  address: {
    '@type': 'PostalAddress',
    addressRegion: 'Kerala',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://www.linkedin.com/in/athul-krishna-499359285/',
    'https://www.instagram.com/athul_.x/',
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'Python',
    'Flask',
    'Angular',
    'MongoDB',
    'PostgreSQL',
    'AWS',
    'Brand Identity Design',
    'Product Design',
    'Automotive Photography',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Athul Krishna V',
  url: BASE_URL,
  description: 'Portfolio of Athul Krishna V — FullStack Developer',
  author: {
    '@type': 'Person',
    name: 'Athul Krishna V',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} bg-obsidian text-white antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <LenisProvider>
          <CustomCursor />
          <Nav />
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}

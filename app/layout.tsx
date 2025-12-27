import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import BottomBannerAd from '@/components/ads/BottomBannerAd'
import StickySidebarAd from '@/components/ads/StickySidebarAd'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://modernlifemaven.com'

export const metadata: Metadata = {
  title: {
    default: 'Modern Life Maven | Lifestyle Tips & Inspiration',
    template: '%s | Modern Life Maven',
  },
  description: 'Discover practical money-saving tips, home decor inspiration, and lifestyle advice to help you live better. Expert tips on budgeting, interior design, and creating a beautiful, affordable lifestyle.',
  keywords: ['lifestyle', 'money saving tips', 'home decor', 'interior design', 'budgeting', 'home styling', 'furniture', 'decorating tips', 'affordable living', 'lifestyle blog'],
  authors: [{ name: 'Modern Life Maven' }],
  creator: 'Modern Life Maven',
  publisher: 'Modern Life Maven',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: 'Modern Life Maven',
    title: 'Modern Life Maven | Lifestyle Tips & Inspiration',
    description: 'Discover practical money-saving tips, home decor inspiration, and lifestyle advice to help you live better.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Modern Life Maven',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Life Maven | Lifestyle Tips & Inspiration',
    description: 'Discover practical money-saving tips, home decor inspiration, and lifestyle advice to help you live better.',
    images: ['/og-image.jpg'],
  },
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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <BottomBannerAd />
        <StickySidebarAd />
      </body>
    </html>
  )
}


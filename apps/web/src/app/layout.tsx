import type { Metadata, Viewport } from 'next'
import { Inter, Syne, Fira_Code } from 'next/font/google'
import { Providers } from '@/components/shared/Providers'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Aura AI — Social Media Automation Platform',
    template: '%s | Aura AI',
  },
  description:
    'The next-generation AI marketing operating system. Generate, schedule, and publish viral content across all platforms automatically.',
  keywords: [
    'AI content generation', 'social media automation', 'AI video generation',
    'content scheduling', 'Instagram automation', 'YouTube automation',
    'TikTok automation', 'AI marketing', 'social media management',
  ],
  authors: [{ name: 'Aura AI' }],
  creator: 'Aura AI',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: 'Aura AI — Social Media Automation Platform',
    description: 'The next-generation AI marketing operating system.',
    siteName: 'Aura AI',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aura AI — Social Media Automation Platform',
    description: 'The next-generation AI marketing operating system.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0f' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${syne.variable} ${firaCode.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

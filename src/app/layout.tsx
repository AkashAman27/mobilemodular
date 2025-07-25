import type { Metadata, Viewport } from 'next'
import { Inter, Roboto_Slab } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-roboto-slab',
})

export const metadata: Metadata = {
  title: 'Modular Building Solutions - Mobile Modular Buildings | Rent, Buy, Lease',
  description: 'Professional modular buildings delivered nationwide. From portable classrooms to office complexes, we provide flexible space solutions for every industry. Rent, buy, or lease options available.',
  keywords: [
    'mobile modular buildings',
    'portable classrooms',
    'modular office buildings',
    'construction site offices',
    'storage containers',
    'healthcare facilities',
    'security buildings',
    'restaurant facilities'
  ],
  authors: [{ name: 'Modular Building Solutions' }],
  creator: 'Modular Building Solutions',
  publisher: 'Modular Building Solutions',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://modularbuilding.com',
    title: 'Modular Building Solutions - Mobile Modular Buildings | Rent, Buy, Lease',
    description: 'Professional modular buildings delivered nationwide. From portable classrooms to office complexes, we provide flexible space solutions for every industry.',
    siteName: 'Modular Building Solutions',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modular Building Solutions - Mobile Modular Buildings',
    description: 'Professional modular buildings delivered nationwide. Rent, buy, or lease options available.',
    creator: '@modularbuilding',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoSlab.variable}`}>
      <body className="font-sans antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
'use client'

import { motion } from 'framer-motion'
import { Phone, Clock } from 'lucide-react'

interface LocationsClientWrapperProps {
  heroTitle: string
  heroAccent: string
  heroDescription: string
  heroPhone: string
  heroSupport: string
  children: React.ReactNode
}

export default function LocationsClientWrapper({ 
  heroTitle, 
  heroAccent, 
  heroDescription, 
  heroPhone, 
  heroSupport,
  children 
}: LocationsClientWrapperProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              {heroTitle}
              <span className="text-yellow-400"> {heroAccent}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed"
            >
              {heroDescription}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <div className="flex items-center justify-center space-x-2 text-lg">
                <Phone className="h-6 w-6 text-yellow-400" />
                <span className="font-semibold">{heroPhone}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-lg">
                <Clock className="h-6 w-6 text-yellow-400" />
                <span>{heroSupport}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {children}
    </div>
  )
}
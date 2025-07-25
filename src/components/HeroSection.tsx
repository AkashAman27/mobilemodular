'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from './ui/button'
import Link from 'next/link'

interface HeroSectionProps {
  heroData?: {
    hero_title?: string
    hero_subtitle?: string  
    hero_description?: string
    hero_primary_cta_text?: string
    hero_primary_cta_url?: string
    hero_secondary_cta_text?: string
    hero_secondary_cta_url?: string
    hero_features?: (string | { text: string })[]
    hero_trust_indicators?: Array<{
      label: string
      description: string
    }>
  }
}

// Default fallback data
const defaultHeroData = {
  hero_title: 'Building Solutions Available for Rent, Sale & Lease',
  hero_subtitle: 'Building Solutions',
  hero_description: 'Professional modular buildings delivered nationwide. From portable classrooms to office complexes, we provide flexible space solutions for every industry.',
  hero_primary_cta_text: 'Get Custom Quote',
  hero_primary_cta_url: '/quote',
  hero_secondary_cta_text: 'View Solutions',
  hero_secondary_cta_url: '/solutions',
  hero_features: [
    'Quick Installation',
    'Custom Designs',
    'Code Compliant',
    '24/7 Support'
  ],
  hero_trust_indicators: [
    { label: '275+', description: 'Locations Nationwide' },
    { label: '50K+', description: 'Buildings Delivered' },
    { label: 'Since 1944', description: 'Industry Experience' }
  ]
}

const HeroSection = ({ heroData: cmsData }: HeroSectionProps) => {
  // Use CMS data if available, otherwise use defaults
  const heroData = cmsData || defaultHeroData

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {heroData.hero_subtitle && (
              <span className="block">{heroData.hero_subtitle}</span>
            )}
            <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
              {heroData.hero_title?.replace(heroData.hero_subtitle || '', '').trim()}
            </span>
          </h1>

          {/* Subheadline */}
          {heroData.hero_description && (
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {heroData.hero_description}
            </p>
          )}

          {/* Features Grid */}
          {heroData.hero_features && heroData.hero_features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto"
            >
              {heroData.hero_features.map((feature, index) => {
                // Handle both string format and object format
                const featureText = typeof feature === 'string' ? feature : (feature as any)?.text || 'Feature'
                return (
                  <div key={index} className="flex items-center justify-center space-x-2 text-white">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                    <span className="text-sm md:text-base font-medium">{featureText}</span>
                  </div>
                )
              })}
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href={heroData.hero_primary_cta_url || '/quote'}>
              <Button 
                variant="gradient" 
                size="xl"
                className="group w-full sm:w-auto"
              >
                {heroData.hero_primary_cta_text || 'Get Custom Quote'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={heroData.hero_secondary_cta_url || '/solutions'}>
              <Button 
                variant="outline" 
                size="xl"
                className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                {heroData.hero_secondary_cta_text || 'View Solutions'}
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          {heroData.hero_trust_indicators && heroData.hero_trust_indicators.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto text-gray-300"
            >
              {heroData.hero_trust_indicators.map((indicator, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-white">{indicator.label}</div>
                  <div className="text-sm">{indicator.description}</div>
                </div>
              ))}
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { Button } from './ui/button'
import { useHeroSection } from '@/hooks/useHeroSection'
import Link from 'next/link'
import Image from 'next/image'

const HeroSection = () => {
  const { heroData, loading, error } = useHeroSection()

  if (loading) {
    return (
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="text-white">Loading...</div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      {heroData.background_image_url ? (
        <div className="absolute inset-0">
          <Image
            src={heroData.background_image_url}
            alt={heroData.background_image_alt || 'Hero background'}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-navy-600/70"></div>
        </div>
      ) : (
        <div className="absolute inset-0 hero-gradient"></div>
      )}
      
      {/* Background Pattern - only show if no background image */}
      {!heroData.background_image_url && (
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            {heroData.subtitle && (
              <span className="block">{heroData.subtitle}</span>
            )}
            <span className="block text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
              {heroData.title.replace(heroData.subtitle || '', '').trim()}
            </span>
          </h1>

          {/* Subheadline */}
          {heroData.description && (
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
              {heroData.description}
            </p>
          )}

          {/* Features Grid */}
          {heroData.features && heroData.features.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 max-w-2xl mx-auto"
            >
              {heroData.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                  <span className="text-sm md:text-base font-medium">{feature}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href={heroData.cta_primary_url}>
              <Button 
                variant="gradient" 
                size="xl"
                className="group w-full sm:w-auto"
              >
                {heroData.cta_primary_text}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href={heroData.cta_secondary_url}>
              <Button 
                variant="outline" 
                size="xl"
                className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm"
              >
                {heroData.cta_secondary_text}
              </Button>
            </Link>
          </motion.div>

          {/* Trust Indicators */}
          {heroData.trust_indicators && heroData.trust_indicators.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
              className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto text-blue-100"
            >
              {heroData.trust_indicators.map((indicator, index) => (
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
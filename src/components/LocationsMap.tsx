'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Phone, ArrowRight } from 'lucide-react'
import { locations } from '@/data/demo-data'
import { Button } from './ui/button'

interface LocationsMapProps {
  locationsData?: {
    locations_section_title?: string
    locations_section_description?: string
    locations_stats_title?: string
    locations_coverage_title?: string
    locations_support_title?: string
    locations_support_description?: string
    locations_emergency_title?: string
    locations_emergency_description?: string
  }
}

const LocationsMap = ({ locationsData }: LocationsMapProps) => {
  const sectionTitle = locationsData?.locations_section_title || '275+ locations across North America'
  const sectionDescription = locationsData?.locations_section_description || 'Delivering space solutions since 1944. Our extensive network ensures fast delivery and local support wherever you are.'
  const statsTitle = locationsData?.locations_stats_title || '275+ Locations'
  const coverageTitle = locationsData?.locations_coverage_title || 'Nationwide Coverage'
  const supportTitle = locationsData?.locations_support_title || '24/7 Support'
  const supportDescription = locationsData?.locations_support_description || 'Round-the-clock customer service'
  const emergencyTitle = locationsData?.locations_emergency_title || 'Emergency Service'
  const emergencyDescription = locationsData?.locations_emergency_description || 'Rapid response for urgent needs'

  return (
    <section className="py-20 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              {sectionTitle}
            </h2>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              {sectionDescription}
            </p>

            {/* Featured Locations */}
            <div className="space-y-4 mb-8">
              {locations.slice(0, 3).map((location) => (
                <div key={location.id} className="flex items-center space-x-3 text-blue-100">
                  <MapPin className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">
                      {location.city}, {location.state}
                    </span>
                    <span className="ml-2 text-sm">
                      {location.serviceRadius}+ mile service radius
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/quote">
                <Button variant="gradient" size="lg" className="group">
                  Get a Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/locations">
                <button className="h-10 px-8 border border-white/30 text-white hover:bg-white/10 bg-transparent rounded-md font-medium transition-colors">
                  Find a Branch
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Map Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative h-96 bg-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
              {/* Placeholder map with pins */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Simulated map background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20" />
                  
                  {/* Location pins */}
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-yellow-400 rounded-full shadow-lg animate-pulse" />
                  <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-yellow-400 rounded-full shadow-lg animate-pulse" />
                  <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-yellow-400 rounded-full shadow-lg animate-pulse" />
                  <div className="absolute bottom-1/4 right-1/4 w-4 h-4 bg-yellow-400 rounded-full shadow-lg animate-pulse" />
                  <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-yellow-400 rounded-full shadow-lg animate-pulse" />
                  
                  {/* Additional styling for map feel */}
                  <div className="absolute inset-0 opacity-30">
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>
                </div>
              </div>

              {/* Map overlay info */}
              <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-white text-sm font-semibold">{statsTitle}</div>
                <div className="text-blue-100 text-xs">{coverageTitle}</div>
              </div>

              <div className="absolute bottom-4 right-4 bg-white/20 backdrop-blur-sm rounded-lg p-3">
                <div className="text-white text-sm font-semibold">{supportTitle}</div>
                <div className="text-blue-100 text-xs">{emergencyTitle}</div>
              </div>
            </div>

            {/* Interactive button overlay */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <Link href="/locations">
                <button className="bg-white text-gray-800 px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 border border-gray-200 hover:bg-gray-50">
                  See all locations
                </button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default LocationsMap
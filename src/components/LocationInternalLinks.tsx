'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface InternalLink {
  id: string
  title: string
  url: string
  description?: string
  category?: string
  sort_order: number
  is_active: boolean
}

interface LocationInternalLinksProps {
  title?: string
  maxLinks?: number
  excludeUrls?: string[]
  className?: string
  locationName?: string  // e.g., "Alabama" or "Los Angeles"
  locationType?: 'state' | 'city'  // Determines how to format the links
  state?: string  // For city pages, we need the state info
}

const LocationInternalLinks: React.FC<LocationInternalLinksProps> = ({ 
  title = "Our Services",
  maxLinks = 8,
  excludeUrls = [],
  className = "",
  locationName,
  locationType = 'state',
  state
}) => {
  const [links, setLinks] = useState<InternalLink[]>([])
  const [loading, setLoading] = useState(true)

  // Static location-aware data
  const getLocationAwareLinks = (): InternalLink[] => {
    const baseLinks = [
      {
        id: '1',
        title: 'Portable Offices',
        url: '/solutions/office-buildings',
        description: 'Professional workspace solutions',
        category: 'solutions',
        sort_order: 1,
        is_active: true
      },
      {
        id: '2',
        title: 'Mobile Offices',
        url: '/solutions/office-buildings',
        description: 'Flexible office solutions',
        category: 'solutions',
        sort_order: 2,
        is_active: true
      },
      {
        id: '3',
        title: 'Portable Classrooms',
        url: '/solutions/portable-classrooms',
        description: 'Educational modular buildings',
        category: 'solutions',
        sort_order: 3,
        is_active: true
      },
      {
        id: '4',
        title: 'Healthcare Facilities',
        url: '/solutions/healthcare-facilities',
        description: 'Medical-grade modular buildings',
        category: 'solutions',
        sort_order: 4,
        is_active: true
      },
      {
        id: '5',
        title: 'Restroom Facilities',
        url: '/solutions/restroom-facilities',
        description: 'Portable restroom solutions',
        category: 'solutions',
        sort_order: 5,
        is_active: true
      },
      {
        id: '6',
        title: 'Security Buildings',
        url: '/solutions/security-buildings',
        description: 'Security and checkpoint facilities',
        category: 'solutions',
        sort_order: 6,
        is_active: true
      },
      {
        id: '7',
        title: 'Get a Quote',
        url: '/quote',
        description: 'Request a custom quote',
        category: 'general',
        sort_order: 7,
        is_active: true
      },
      {
        id: '8',
        title: 'Contact Us',
        url: '/contact',
        description: 'Get in touch with our team',
        category: 'general',
        sort_order: 8,
        is_active: true
      }
    ]

    // Transform URLs to be location-specific for solution pages
    if (locationName) {
      return baseLinks.map(link => {
        // Only modify solution URLs
        if (link.category === 'solutions') {
          const locationSuffix = formatLocationForUrl(locationName, locationType, state)
          return {
            ...link,
            title: `${link.title} ${locationSuffix}`,
            url: `${link.url}/${formatLocationSlug(locationName, locationType, state)}`
          }
        }
        return link
      })
    }

    return baseLinks
  }

  // Format location name for display
  const formatLocationForUrl = (name: string, type: 'state' | 'city', stateInfo?: string): string => {
    if (type === 'city' && stateInfo) {
      return `${name}, ${stateInfo}`
    }
    return name
  }

  // Format location for URL slug
  const formatLocationSlug = (name: string, type: 'state' | 'city', stateInfo?: string): string => {
    const slug = name.toLowerCase().replace(/\s+/g, '-')
    if (type === 'city' && stateInfo) {
      const stateSlug = stateInfo.toLowerCase().replace(/\s+/g, '-')
      return `${stateSlug}/${slug}`
    }
    return slug
  }

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        // Try to fetch from Supabase first
        const { data, error } = await supabase
          .from('internal_links')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (error) {
          throw error
        }

        // Transform Supabase data to location-aware if location is provided
        let processedLinks = data || []
        if (locationName && data) {
          processedLinks = data.map((link: any) => {
            if (link.category === 'solutions') {
              const locationSuffix = formatLocationForUrl(locationName, locationType, state)
              return {
                ...link,
                title: `${link.title} ${locationSuffix}`,
                url: `${link.url}/${formatLocationSlug(locationName, locationType, state)}`
              }
            }
            return link
          })
        }

        setLinks(processedLinks)
      } catch (error) {
        // Fall back to static location-aware data
        console.log('Using static location-aware links data')
        setLinks(getLocationAwareLinks())
      } finally {
        setLoading(false)
      }
    }

    fetchLinks()
  }, [locationName, locationType, state])

  const filteredLinks = links
    .filter(link => !excludeUrls.includes(link.url))
    .slice(0, maxLinks)

  if (loading) {
    return (
      <div className={`py-8 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (filteredLinks.length === 0) {
    return null
  }

  return (
    <div className={`py-12 bg-gradient-to-br from-gray-50 to-blue-50 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-center text-navy-600 mb-2">
            {title}
          </h2>
          {locationName && (
            <p className="text-center text-gray-600 mb-8">
              Professional modular building solutions in {formatLocationForUrl(locationName, locationType, state)}
            </p>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            {filteredLinks.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={link.url} className="block">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full border border-gray-100 group-hover:border-orange-200">
                    <h3 className="font-semibold text-lg text-navy-600 mb-2 group-hover:text-orange-600 transition-colors duration-300">
                      {link.title}
                    </h3>
                    {link.description && (
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                        {link.description}
                      </p>
                    )}
                    <div className="flex items-center text-orange-600 text-sm font-medium group-hover:text-orange-700 transition-colors duration-300">
                      <span>Learn More</span>
                      <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default LocationInternalLinks
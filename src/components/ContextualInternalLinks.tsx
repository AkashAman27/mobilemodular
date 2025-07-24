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

interface PageContext {
  type: 'homepage' | 'location' | 'solution' | 'industry'
  locationName?: string
  locationType?: 'state' | 'city'
  stateName?: string
  solutionType?: string
  currentUrl?: string
}

interface ContextualInternalLinksProps {
  pageContext?: PageContext
  title?: string
  maxLinks?: number
  excludeUrls?: string[]
  className?: string
}

const ContextualInternalLinks: React.FC<ContextualInternalLinksProps> = ({ 
  pageContext,
  title,
  maxLinks = 8,
  excludeUrls = [],
  className = ""
}) => {
  const [links, setLinks] = useState<InternalLink[]>([])
  const [loading, setLoading] = useState(true)

  // Generate smart contextual links
  const generateSmartLinks = (): InternalLink[] => {
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

    // Transform links based on page context
    if (pageContext?.type === 'location' && pageContext.locationName) {
      const formatLocationForUrl = () => {
        if (pageContext.locationType === 'city' && pageContext.stateName) {
          return `${pageContext.stateName?.toLowerCase().replace(/\s+/g, '-')}/${pageContext.locationName?.toLowerCase().replace(/\s+/g, '-')}`
        }
        return pageContext.locationName?.toLowerCase().replace(/\s+/g, '-')
      }

      const formatLocationForDisplay = () => {
        if (pageContext.locationType === 'city' && pageContext.stateName) {
          return `${pageContext.locationName}, ${pageContext.stateName}`
        }
        return pageContext.locationName
      }

      const locationSlug = formatLocationForUrl()
      const locationDisplay = formatLocationForDisplay()

      // For location pages, make solution links location-specific
      return baseLinks.map(link => {
        if (link.category === 'solutions') {
          return {
            ...link,
            title: `${link.title} ${locationDisplay}`,
            url: `${link.url}/${locationSlug}`,
            description: `${link.description} in ${locationDisplay}`
          }
        }
        return link
      })
    }

    // For homepage and other pages, return standard links
    return baseLinks
  }

  // Determine smart title based on context
  const getSmartTitle = (): string => {
    if (title) return title

    if (pageContext?.type === 'location' && pageContext.locationName) {
      const locationDisplay = pageContext.locationType === 'city' && pageContext.stateName
        ? `${pageContext.locationName}, ${pageContext.stateName}`
        : pageContext.locationName
      return `Our Services in ${locationDisplay}`
    }

    return "Explore More"
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

        // Transform Supabase data if we have location context
        if (data && pageContext?.type === 'location' && pageContext.locationName) {
          const formatLocationForUrl = () => {
            if (pageContext.locationType === 'city' && pageContext.stateName) {
              return `${pageContext.stateName?.toLowerCase().replace(/\s+/g, '-')}/${pageContext.locationName?.toLowerCase().replace(/\s+/g, '-')}`
            }
            return pageContext.locationName?.toLowerCase().replace(/\s+/g, '-')
          }

          const formatLocationForDisplay = () => {
            if (pageContext.locationType === 'city' && pageContext.stateName) {
              return `${pageContext.locationName}, ${pageContext.stateName}`
            }
            return pageContext.locationName
          }

          const locationSlug = formatLocationForUrl()
          const locationDisplay = formatLocationForDisplay()

          const contextualLinks = data.map((link: any) => {
            if (link.category === 'solutions') {
              return {
                ...link,
                title: `${link.title} ${locationDisplay}`,
                url: `${link.url}/${locationSlug}`,
                description: `${link.description} in ${locationDisplay}`
              }
            }
            return link
          })
          setLinks(contextualLinks)
        } else {
          setLinks(data || [])
        }
      } catch (error) {
        // Fall back to smart static links
        setLinks(generateSmartLinks())
      } finally {
        setLoading(false)
      }
    }

    fetchLinks()
  }, [pageContext])

  // Filter and limit links
  const filteredLinks = links
    .filter(link => !excludeUrls.includes(link.url))
    .slice(0, maxLinks)

  if (loading) {
    return (
      <div className={`py-8 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4 mx-auto"></div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-20 bg-gray-200 rounded"></div>
              ))}
            </div>
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
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-navy-600 mb-2">
              {getSmartTitle()}
            </h2>
            <div className="w-12 h-1 bg-orange-500 mx-auto rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredLinks.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link href={link.url} className="block">
                  <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-6 h-full group-hover:shadow-2xl">
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

export default ContextualInternalLinks
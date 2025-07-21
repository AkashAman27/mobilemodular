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

interface InternalLinksProps {
  title?: string
  maxLinks?: number
  excludeUrls?: string[]
  className?: string
}

const InternalLinks: React.FC<InternalLinksProps> = ({ 
  title = "Explore More",
  maxLinks = 10,
  excludeUrls = [],
  className = ""
}) => {
  const [links, setLinks] = useState<InternalLink[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const { data, error } = await supabase
          .from('internal_links')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true })

        if (error) {
          // Silently fall back to static data for any Supabase error
          // // Silent logging - removed console.log
          const { internalLinksData } = await import('@/data/internal-links-data')
          const staticLinks = internalLinksData
            .filter(link => link.is_active)
            .map(link => ({
              ...link,
              sort_order: link.order
            }))
            .sort((a, b) => a.sort_order - b.sort_order)
          
          let filteredLinks = staticLinks
          
          // Filter out excluded URLs
          if (excludeUrls.length > 0) {
            filteredLinks = filteredLinks.filter(link => !excludeUrls.includes(link.url))
          }
          
          // Limit the number of links
          filteredLinks = filteredLinks.slice(0, maxLinks)
          
          setLinks(filteredLinks)
          setLoading(false)
          return
        }

        let filteredLinks = data || []
        
        // Filter out excluded URLs
        if (excludeUrls.length > 0) {
          filteredLinks = filteredLinks.filter(link => !excludeUrls.includes(link.url))
        }
        
        // Limit the number of links
        filteredLinks = filteredLinks.slice(0, maxLinks)
        
        setLinks(filteredLinks)
      } catch (error) {
        // Silently fall back to static data on any error
        // // Silent error handling - removed console.error
        try {
          const { internalLinksData } = await import('@/data/internal-links-data')
          const staticLinks = internalLinksData
            .filter(link => link.is_active)
            .map(link => ({
              ...link,
              sort_order: link.order
            }))
            .sort((a, b) => a.sort_order - b.sort_order)
          
          let filteredLinks = staticLinks
          
          // Filter out excluded URLs
          if (excludeUrls.length > 0) {
            filteredLinks = filteredLinks.filter(link => !excludeUrls.includes(link.url))
          }
          
          // Limit the number of links
          filteredLinks = filteredLinks.slice(0, maxLinks)
          
          setLinks(filteredLinks)
        } catch (staticError) {
          // If even static data fails, silently set empty array
          setLinks([])
        }
      } finally {
        setLoading(false)
      }
    }

    fetchLinks()
  }, [maxLinks, excludeUrls])

  if (loading) {
    return (
      <section className={`py-16 bg-gradient-to-br from-gray-50 to-blue-50 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-white rounded-lg p-4 shadow-sm h-24 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (links.length === 0) {
    return null
  }

  return (
    <section className={`py-16 bg-gradient-to-br from-gray-50 to-blue-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {links.map((link, index) => (
              <motion.div
                key={link.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  href={link.url}
                  className="group block bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-blue-300 h-24 min-h-24"
                >
                  <div className="flex items-start justify-between h-full">
                    <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                      <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 truncate">
                        {link.title}
                      </h3>
                      {link.description && (
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2 flex-1">
                          {link.description}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 ml-2 flex-shrink-0 mt-1" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default InternalLinks
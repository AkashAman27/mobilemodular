'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { getSEOContent } from '@/data/seo-content-data'

interface SEOContentData {
  id: string
  page_type: 'solution' | 'industry'
  page_slug: string
  title: string
  paragraphs: string[]
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export const useSEOContent = (pageType: 'solution' | 'industry', pageSlug: string) => {
  const [content, setContent] = useState<SEOContentData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true)
        
        const { data, error } = await supabase
          .from('seo_content')
          .select('*')
          .eq('page_type', pageType)
          .eq('page_slug', pageSlug)
          .eq('is_active', true)
          .single()

        if (error) {
          // Silently fall back to static data when Supabase table doesn't exist or no data found
          // // Silent logging - removed console.log
          const staticContent = getSEOContent(pageType, pageSlug)
          if (staticContent) {
            setContent(staticContent)
            setError(null)
          } else {
            setError(`No SEO content found for ${pageType}/${pageSlug}`)
          }
          return
        }

        if (data) {
          setContent(data)
          setError(null)
        } else {
          // No data found in database, fall back to static
          const staticContent = getSEOContent(pageType, pageSlug)
          if (staticContent) {
            setContent(staticContent)
          }
        }
      } catch (err) {
        // Silently fall back to static data on any error
        setError('Failed to fetch SEO content')
        
        // Fall back to static data on error
        const staticContent = getSEOContent(pageType, pageSlug)
        if (staticContent) {
          setContent(staticContent)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchContent()
  }, [pageType, pageSlug])

  return { content, loading, error }
}
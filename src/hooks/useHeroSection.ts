'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

interface HeroSectionData {
  id: string
  title: string
  subtitle?: string
  description?: string
  background_image_url?: string
  background_image_alt?: string
  cta_primary_text: string
  cta_primary_url: string
  cta_secondary_text: string
  cta_secondary_url: string
  features: string[]
  trust_indicators: Array<{
    label: string
    description: string
  }>
  is_active: boolean
  created_at?: string
  updated_at?: string
}

// Default fallback data
const defaultHeroData: HeroSectionData = {
  id: 'default',
  title: 'Building Solutions Available for Rent, Sale & Lease',
  subtitle: 'Building Solutions',
  description: 'Professional modular buildings delivered nationwide. From portable classrooms to office complexes, we provide flexible space solutions for every industry.',
  cta_primary_text: 'Get Custom Quote',
  cta_primary_url: '/quote',
  cta_secondary_text: 'View Solutions',
  cta_secondary_url: '/solutions',
  features: [
    'Rent, Buy, or Lease Options',
    'Quick Delivery & Setup',
    'Professional Installation',
    'Nationwide Service'
  ],
  trust_indicators: [
    { label: '275+', description: 'Locations Nationwide' },
    { label: '50K+', description: 'Buildings Delivered' },
    { label: 'Since 1944', description: 'Industry Experience' }
  ],
  is_active: true
}

export const useHeroSection = () => {
  const [heroData, setHeroData] = useState<HeroSectionData>(defaultHeroData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true)
        
        const { data, error } = await supabase
          .from('homepage_sections')
          .select('*')
          .eq('section_type', 'hero_section')
          .eq('is_active', true)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (error) {
          // Silent error handling - removed console.error
          
          // If table doesn't exist, use default data
          if (error.code === '42P01') {
            // Silent logging - removed console.log
            setHeroData(defaultHeroData)
            setError('Demo Mode: Using default data. Create tables in Supabase to enable database functionality.')
            setLoading(false)
            return
          }
          
          // For other errors, also fall back to default
          setHeroData(defaultHeroData)
          setError('Failed to fetch hero data, using defaults')
          return
        }

        if (data) {
          // Transform the homepage_sections data to match HeroSectionData interface
          const transformedData: HeroSectionData = {
            id: data.id,
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            background_image_url: data.content_data?.background_image_url,
            background_image_alt: data.content_data?.background_image_alt,
            cta_primary_text: data.content_data?.cta_primary_text || defaultHeroData.cta_primary_text,
            cta_primary_url: data.content_data?.cta_primary_url || defaultHeroData.cta_primary_url,
            cta_secondary_text: data.content_data?.cta_secondary_text || defaultHeroData.cta_secondary_text,
            cta_secondary_url: data.content_data?.cta_secondary_url || defaultHeroData.cta_secondary_url,
            features: Array.isArray(data.content_data?.features) ? data.content_data.features : defaultHeroData.features,
            trust_indicators: Array.isArray(data.content_data?.trust_indicators) ? data.content_data.trust_indicators : defaultHeroData.trust_indicators,
            is_active: data.is_active
          }
          
          setHeroData(transformedData)
          setError(null)
        } else {
          setHeroData(defaultHeroData)
        }
      } catch (err) {
        // Silent error handling - removed console.error
        setError('Failed to fetch hero data')
        setHeroData(defaultHeroData)
      } finally {
        setLoading(false)
      }
    }

    fetchHeroData()
  }, [])

  return { heroData, loading, error }
}
'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { solutions as staticSolutions } from '@/data/demo-data'

interface Solution {
  id: string
  name: string
  description: string
  features: string[]
  imageUrl: string
  category: 'office' | 'education' | 'storage' | 'healthcare' | 'security' | 'restaurant'
  startingPrice: string
  specifications: {
    dimensions: string
    capacity: string
    power: string
    climate: boolean
  }
}

export const useSolutions = () => {
  const [solutions, setSolutions] = useState<Solution[]>(staticSolutions)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSolutions = async () => {
      try {
        setLoading(true)
        
        const { data, error } = await supabase
          .from('solutions')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true })

        if (error) {
          // Silently fall back to static data for any Supabase error
          // If table doesn't exist, use static data
          if (error.code === '42P01') {
            setSolutions(staticSolutions)
            setError('Demo Mode: Using static data. Create tables in Supabase to enable database functionality.')
            setLoading(false)
            return
          }
          
          // For other errors, also fall back to static
          setSolutions(staticSolutions)
          setError('Failed to fetch solutions data, using defaults')
          return
        }

        if (data && data.length > 0) {
          // Transform the Supabase data to match the Solution interface
          const transformedSolutions: Solution[] = data.map(item => ({
            id: item.slug || item.id,
            name: item.name,
            description: item.description,
            features: Array.isArray(item.features) ? item.features : [],
            imageUrl: item.image_url || '',
            category: item.category as Solution['category'],
            startingPrice: item.starting_price,
            specifications: {
              dimensions: item.dimensions || '',
              capacity: item.capacity || '',
              power: item.power || '',
              climate: item.climate_control || false
            }
          }))
          
          setSolutions(transformedSolutions)
          setError(null)
        } else {
          // If no data, fall back to static
          setSolutions(staticSolutions)
        }
      } catch (err) {
        // Silently fall back to static data on any error
        setError('Failed to fetch solutions data')
        setSolutions(staticSolutions)
      } finally {
        setLoading(false)
      }
    }

    fetchSolutions()
  }, [])

  return { solutions, loading, error }
}
'use client'

import { useState, useEffect } from 'react'
import { getIndustryData } from '@/data/industry-data'

interface ClientIndustryPageProps {
  slug: string
  fallbackData: any
  children: (data: any) => React.ReactNode
}

export default function ClientIndustryPage({ slug, fallbackData, children }: ClientIndustryPageProps) {
  const [data, setData] = useState(fallbackData)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Immediately check for updated data in localStorage when component mounts
    const updatedData = getIndustryData(slug)
    if (updatedData) {
      console.log('ClientIndustryPage: Loading updated data from localStorage for', slug)
      setData(updatedData)
    } else {
      console.log('ClientIndustryPage: No localStorage data found, using fallback for', slug)
    }

    // Listen for storage changes (when CMS updates data)
    const handleStorageChange = () => {
      console.log('ClientIndustryPage: Storage change detected for', slug)
      const newData = getIndustryData(slug)
      if (newData) {
        console.log('ClientIndustryPage: Updating data from storage change')
        setData(newData)
      }
    }

    // Also listen for API updates by polling the API endpoint
    const handleApiUpdate = async () => {
      try {
        const response = await fetch(`/api/industry-data/${slug}`)
        if (response.ok) {
          const result = await response.json()
          if (result.success && result.data) {
            console.log('ClientIndustryPage: Updating data from API poll')
            setData(result.data)
          }
        }
      } catch (error) {
        console.log('ClientIndustryPage: API poll failed:', error)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('industryDataUpdated', handleStorageChange)
    
    // Poll API every 2 seconds to check for updates
    const apiPollInterval = setInterval(handleApiUpdate, 2000)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('industryDataUpdated', handleStorageChange)
      clearInterval(apiPollInterval)
    }
  }, [slug])

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return children(fallbackData)
  }

  return children(data)
}
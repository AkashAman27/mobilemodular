import { useState, useEffect } from 'react'

interface SEOData {
  page_path?: string
  page_title?: string
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
  canonical_url?: string
  robots_index?: boolean
  robots_follow?: boolean
  robots_nosnippet?: boolean
  og_title?: string
  og_description?: string
  og_image?: string
  og_image_alt?: string
  twitter_title?: string
  twitter_description?: string
  twitter_image?: string
  twitter_image_alt?: string
  structured_data_type?: string
  custom_json_ld?: string
  focus_keyword?: string
  is_active?: boolean
}

export const useSEO = (pagePath: string, pageTitle: string) => {
  const [seoData, setSeoData] = useState<SEOData>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Fetch SEO data
  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/seo?path=${encodeURIComponent(pagePath)}`)
        if (response.ok) {
          const data = await response.json()
          setSeoData(data)
        } else {
          setSeoData({})
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error)
        setSeoData({})
      } finally {
        setLoading(false)
      }
    }

    fetchSEOData()
  }, [pagePath])

  // Save SEO data
  const saveSEOData = async (newSeoData: Partial<SEOData>) => {
    setSaving(true)
    setSeoData(prev => ({ ...prev, ...newSeoData }))
    
    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_path: pagePath,
          page_title: pageTitle,
          ...newSeoData
        }),
      })

      if (!response.ok) {
        console.error('Failed to save SEO data')
        throw new Error('Failed to save SEO data')
      }
      
      return true
    } catch (error) {
      console.error('Error saving SEO data:', error)
      return false
    } finally {
      setSaving(false)
    }
  }

  return {
    seoData,
    loading,
    saving,
    updateSEOData: saveSEOData
  }
}
'use client'

import { useEffect, useState } from 'react'
import Head from 'next/head'

interface SEOMetaTagsProps {
  pagePath: string
  fallbackTitle?: string
  fallbackDescription?: string
  fallbackImage?: string
}

interface SEOData {
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
  custom_json_ld?: string
  is_active?: boolean
}

export default function SEOMetaTags({ 
  pagePath, 
  fallbackTitle = '',
  fallbackDescription = '',
  fallbackImage = ''
}: SEOMetaTagsProps) {
  const [seoData, setSeoData] = useState<SEOData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const response = await fetch(`/api/seo?path=${encodeURIComponent(pagePath)}`)
        if (response.ok) {
          const data = await response.json()
          setSeoData(data)
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSEOData()
  }, [pagePath])

  if (loading) return null

  // Use SEO data or fallbacks
  const title = seoData.seo_title || fallbackTitle
  const description = seoData.seo_description || fallbackDescription
  const keywords = seoData.seo_keywords || ''
  const canonicalUrl = seoData.canonical_url || `${process.env.NEXT_PUBLIC_SITE_URL || 'https://amanmodular.com'}${pagePath}`
  const ogTitle = seoData.og_title || title
  const ogDescription = seoData.og_description || description
  const ogImage = seoData.og_image || fallbackImage
  const ogImageAlt = seoData.og_image_alt || ''
  const twitterTitle = seoData.twitter_title || ogTitle
  const twitterDescription = seoData.twitter_description || ogDescription
  const twitterImage = seoData.twitter_image || ogImage
  const twitterImageAlt = seoData.twitter_image_alt || ogImageAlt

  // Robots meta tag
  const robotsContent = []
  if (seoData.robots_index !== false) robotsContent.push('index')
  else robotsContent.push('noindex')
  if (seoData.robots_follow !== false) robotsContent.push('follow')
  else robotsContent.push('nofollow')
  if (seoData.robots_nosnippet) robotsContent.push('nosnippet')

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robotsContent.join(', ')} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Tags */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Aman Modular" />
      {ogTitle && <meta property="og:title" content={ogTitle} />}
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      {ogImageAlt && <meta property="og:image:alt" content={ogImageAlt} />}
      <meta property="og:url" content={canonicalUrl} />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
      {twitterDescription && <meta name="twitter:description" content={twitterDescription} />}
      {twitterImage && <meta name="twitter:image" content={twitterImage} />}
      {twitterImageAlt && <meta name="twitter:image:alt" content={twitterImageAlt} />}
      
      {/* Additional SEO Tags */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="theme-color" content="#1f2937" />
      
      {/* Structured Data */}
      {seoData.custom_json_ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: seoData.custom_json_ld
          }}
        />
      )}
      
      {/* Default Organization Schema if no custom schema */}
      {!seoData.custom_json_ld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Aman Modular",
              "url": "https://amanmodular.com",
              "logo": "https://amanmodular.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "(866) 819-9017",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.facebook.com/amanmodular",
                "https://www.linkedin.com/company/amanmodular"
              ]
            })
          }}
        />
      )}
    </Head>
  )
}

// Hook for easier integration
export const useSEOData = (pagePath: string) => {
  const [seoData, setSeoData] = useState<SEOData>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSEOData = async () => {
      try {
        const response = await fetch(`/api/seo?path=${encodeURIComponent(pagePath)}`)
        if (response.ok) {
          const data = await response.json()
          setSeoData(data)
        }
      } catch (error) {
        console.error('Error fetching SEO data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSEOData()
  }, [pagePath])

  return { seoData, loading }
}
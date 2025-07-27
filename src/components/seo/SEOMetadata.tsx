/**
 * SEO Metadata Component
 * Renders SEO meta tags with support for both individual and central management
 */

import { Metadata } from 'next'
import { getSEOData } from '@/lib/seo'
import { getSEOSettings } from '@/lib/seo'
import type { PageType, SEOData, SEOSettings } from '@/types/seo'

interface SEOMetadataProps {
  pageType: PageType
  pagePath?: string
  contentId?: string
  fallbackTitle?: string
  fallbackDescription?: string
  fallbackImage?: string
  noIndex?: boolean
}

/**
 * Generate comprehensive metadata for Next.js
 */
export async function generateSEOMetadata({
  pageType,
  pagePath,
  contentId,
  fallbackTitle = '',
  fallbackDescription = '',
  fallbackImage = '',
  noIndex = false
}: SEOMetadataProps): Promise<Metadata> {
  
  try {
    // Get SEO data and settings in parallel
    const [seoData, settings] = await Promise.all([
      getSEOData(pageType, pagePath, contentId),
      getSEOSettings()
    ])

    // Determine effective values with fallback chain
    const effectiveTitle = seoData.seo_title || fallbackTitle || settings.site_name
    const effectiveDescription = seoData.seo_description || fallbackDescription || settings.default_description
    const effectiveImage = seoData.og_image || fallbackImage || settings.social_image_default
    const canonicalUrl = seoData.canonical_url || (pagePath ? `https://mobilemodular.com${pagePath}` : undefined)

    // Build OpenGraph data
    const openGraph: any = {
      title: seoData.og_title || effectiveTitle,
      description: seoData.og_description || effectiveDescription,
      url: canonicalUrl,
      siteName: settings.site_name,
      type: 'website',
      locale: 'en_US'
    }

    if (effectiveImage) {
      openGraph.images = [{
        url: effectiveImage,
        width: 1200,
        height: 630,
        alt: seoData.og_image_alt || seoData.seo_title || effectiveTitle,
        type: 'image/jpeg'
      }]
    }

    // Build Twitter Card data
    const twitter: any = {
      card: 'summary_large_image',
      title: seoData.twitter_title || seoData.og_title || effectiveTitle,
      description: seoData.twitter_description || seoData.og_description || effectiveDescription,
      site: '@mobilemodular'
    }

    if (seoData.twitter_image || effectiveImage) {
      twitter.images = [{
        url: seoData.twitter_image || effectiveImage,
        alt: seoData.twitter_image_alt || seoData.og_image_alt || effectiveTitle
      }]
    }

    // Build robots configuration
    const robots: any = {
      index: !noIndex && seoData.robots_index !== false,
      follow: seoData.robots_follow !== false,
      nosnippet: seoData.robots_nosnippet === true,
      googleBot: {
        index: !noIndex && seoData.robots_index !== false,
        follow: seoData.robots_follow !== false,
        noimageindex: false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    }

    // Build structured data
    const structuredData = generateStructuredData({
      seoData,
      settings,
      pageType,
      effectiveTitle,
      effectiveDescription,
      canonicalUrl,
      effectiveImage
    })

    // Compile metadata
    const metadata: Metadata = {
      metadataBase: settings.site_url ? new URL(settings.site_url) : undefined,
      title: effectiveTitle,
      description: effectiveDescription,
      keywords: seoData.seo_keywords,
      robots,
      openGraph,
      twitter,
      alternates: {
        canonical: canonicalUrl
      },
      other: {
        'last-modified': seoData.last_modified || new Date().toISOString()
      }
    }

    // Add verification meta tags
    if (settings.search_console_verification) {
      metadata.verification = {
        google: settings.search_console_verification
      }
    }

    // Add structured data
    if (structuredData) {
      if (!metadata.other) {
        metadata.other = {}
      }
      metadata.other['application/ld+json'] = JSON.stringify(structuredData)
    }

    return metadata

  } catch (error) {
    console.warn('Error generating SEO metadata:', error)
    
    // Return basic fallback metadata
    return {
      title: fallbackTitle || 'Modular Building Solutions',
      description: fallbackDescription || 'Professional modular buildings for rent and sale.',
      robots: {
        index: !noIndex,
        follow: true
      }
    }
  }
}

/**
 * Generate structured data based on page type and content
 */
function generateStructuredData({
  seoData,
  settings,
  pageType,
  effectiveTitle,
  effectiveDescription,
  canonicalUrl,
  effectiveImage
}: {
  seoData: any
  settings: SEOSettings
  pageType: PageType
  effectiveTitle: string
  effectiveDescription?: string
  canonicalUrl?: string
  effectiveImage?: string
}) {
  
  // Use custom JSON-LD if provided
  if (seoData.custom_json_ld) {
    try {
      return JSON.parse(seoData.custom_json_ld)
    } catch (error) {
      console.warn('Invalid custom JSON-LD:', error)
    }
  }

  const baseStructuredData: any = {
    '@context': 'https://schema.org',
    '@type': seoData.structured_data_type || getDefaultSchemaType(pageType),
    name: effectiveTitle,
    description: effectiveDescription,
    url: canonicalUrl
  }

  if (effectiveImage) {
    baseStructuredData.image = {
      '@type': 'ImageObject',
      url: effectiveImage,
      width: 1200,
      height: 630
    }
  }

  // Add organization data for business-related pages
  if (pageType === 'homepage' || pageType === 'company' || pageType === 'contact') {
    const organization: any = {
      '@type': 'Organization',
      name: settings.site_name,
      url: 'https://mobilemodular.com',
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service'
      }
    }

    // Parse organization data from json_ld_organization if available
    if (settings.json_ld_organization) {
      try {
        const parsedOrg = JSON.parse(settings.json_ld_organization)
        Object.assign(organization, parsedOrg)
      } catch (error) {
        console.warn('Failed to parse organization data:', error)
      }
    }

    baseStructuredData.publisher = organization
    
    if (pageType === 'homepage') {
      baseStructuredData.mainEntity = organization
    }
  }

  // Add specific structured data for different page types
  switch (pageType) {
    case 'solution':
      return {
        ...baseStructuredData,
        '@type': 'Product',
        category: 'Modular Buildings',
        brand: {
          '@type': 'Brand',
          name: settings.site_name
        }
      }

    case 'industry':
      return {
        ...baseStructuredData,
        '@type': 'Service',
        serviceType: 'Modular Building Solutions',
        provider: {
          '@type': 'Organization',
          name: settings.site_name
        }
      }

    case 'location':
      return {
        ...baseStructuredData,
        '@type': 'Place',
        geo: {
          '@type': 'GeoCoordinates'
          // Add lat/lng if available in location data
        }
      }

    default:
      return baseStructuredData
  }
}

/**
 * Get default schema type for page type
 */
function getDefaultSchemaType(pageType: PageType): string {
  switch (pageType) {
    case 'solution':
      return 'Product'
    case 'industry':
      return 'Service'
    case 'location':
      return 'Place'
    case 'company':
      return 'AboutPage'
    case 'contact':
      return 'ContactPage'
    case 'homepage':
      return 'WebSite'
    case 'news':
      return 'Article'
    case 'resource':
      return 'Article'
    case 'quote':
      return 'WebPage'
    default:
      return 'WebPage'
  }
}

/**
 * Client-side SEO component for dynamic metadata injection
 */
export function SEOHead({
  pageType,
  pagePath,
  contentId,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
  children
}: SEOMetadataProps & { children?: React.ReactNode }) {
  return (
    <>
      {children}
      {/* Additional client-side meta tags can be added here */}
    </>
  )
}

export default SEOHead
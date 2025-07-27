import { supabase } from '@/lib/supabase'
import type { SEOData, SEOSettings, PageType } from '@/types/seo'

// Get SEO data based on page type and path
export async function getSEOData(pageType: PageType, pagePath?: string, contentId?: string): Promise<Partial<SEOData>> {
  try {
    // Try to get individual page SEO data
    const pageData = await getSEOPageData(pagePath || '')
    if (pageData) {
      return pageData
    }

    // Fallback to content-specific SEO data
    if (contentId) {
      let contentData: Partial<SEOData> | null = null
      switch (pageType) {
        case 'solution':
          contentData = await getSolutionSEOData(contentId)
          break
        case 'industry':
          contentData = await getIndustrySEOData(contentId)
          break
        case 'location':
          contentData = await getLocationSEOData(contentId)
          break
        default:
          break
      }
      if (contentData) {
        return contentData
      }
    }

    // Return empty object if no data found
    return {}
  } catch (error) {
    console.warn('Error fetching SEO data:', error)
    return {}
  }
}

// Fetch SEO data for a specific page path
export async function getSEOPageData(pagePath: string): Promise<Partial<SEOData> | null> {
  try {
    const { data, error } = await supabase
      .from('seo_pages')
      .select('*')
      .eq('page_path', pagePath)
      .eq('is_active', true)
      .single()

    if (error) {
      // Only log errors that aren't about missing tables
      if (error.code !== 'PGRST116' && !error.message.includes('relation "seo_pages" does not exist')) {
        // Silent error handling - removed console.error
      }
      return null
    }

    return data
  } catch (error) {
    // Silently handle missing database tables
    return null
  }
}

// Fetch SEO data for a solution
export async function getSolutionSEOData(slug: string): Promise<Partial<SEOData> | null> {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .select(`
        seo_title,
        seo_description,
        seo_keywords,
        canonical_url,
        robots_index,
        robots_follow,
        robots_nosnippet,
        og_title,
        og_description,
        og_image,
        og_image_alt,
        twitter_title,
        twitter_description,
        twitter_image,
        twitter_image_alt,
        structured_data_type,
        custom_json_ld,
        focus_keyword,
        last_modified
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      // Only log errors that aren't about missing tables
      if (error.code !== 'PGRST116' && !error.message.includes('relation "solutions" does not exist')) {
        // Silent error handling - removed console.error
      }
      return null
    }

    return data
  } catch (error) {
    // Silently handle missing database tables
    return null
  }
}

// Fetch SEO data for an industry
export async function getIndustrySEOData(slug: string): Promise<Partial<SEOData> | null> {
  try {
    const { data, error } = await supabase
      .from('industries')
      .select(`
        seo_title,
        seo_description,
        seo_keywords,
        canonical_url,
        robots_index,
        robots_follow,
        robots_nosnippet,
        og_title,
        og_description,
        og_image,
        og_image_alt,
        twitter_title,
        twitter_description,
        twitter_image,
        twitter_image_alt,
        structured_data_type,
        custom_json_ld,
        focus_keyword,
        last_modified
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      return null
    }

    return data
  } catch (error) {
    return null
  }
}

// Fetch SEO data for a location
export async function getLocationSEOData(slug: string): Promise<Partial<SEOData> | null> {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select(`
        seo_title,
        seo_description,
        seo_keywords,
        canonical_url,
        robots_index,
        robots_follow,
        robots_nosnippet,
        og_title,
        og_description,
        og_image,
        og_image_alt,
        twitter_title,
        twitter_description,
        twitter_image,
        twitter_image_alt,
        structured_data_type,
        custom_json_ld,
        focus_keyword,
        last_modified
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      return null
    }

    return data
  } catch (error) {
    return null
  }
}

// Fetch global SEO settings
export async function getSEOSettings(): Promise<SEOSettings> {
  try {
    const { data, error } = await supabase
      .from('seo_settings')
      .select('*')
      .single()

    if (error) {
      // Only log errors that aren't about missing tables
      if (error.code !== 'PGRST116' && !error.message.includes('relation "seo_settings" does not exist')) {
        // Silent error handling - removed console.error
      }
      return getDefaultSEOSettings()
    }

    return data
  } catch (error) {
    // Silently handle missing database tables
    return getDefaultSEOSettings()
  }
}

// Get default SEO settings
export function getDefaultSEOSettings(): SEOSettings {
  return {
    id: 'default',
    site_name: 'Modular Building Solutions',
    site_description: 'Professional modular buildings for rent, sale, and lease. From portable classrooms to office complexes, we provide flexible space solutions for every industry.',
    site_url: 'https://modularbuilding.com',
    default_title_suffix: ' | Modular Building Solutions',
    default_description: 'Professional modular buildings for rent, sale, and lease.',
    default_keywords: ['modular buildings', 'portable buildings', 'construction'],
    social_image_default: '/images/default-og.jpg',
    default_og_image: '/images/default-og.jpg',
    default_twitter_image: '/images/default-twitter.jpg',
    robots_default: 'index, follow',
    json_ld_organization: JSON.stringify({
      '@type': 'Organization',
      name: 'Modular Building Solutions',
      url: 'https://modularbuilding.com'
    }),
    organization_name: 'Modular Building Solutions',
    organization_phone: '(555) 123-4567',
    organization_email: 'info@modularbuilding.com',
    organization_address: '1234 Industrial Boulevard',
    organization_city: 'Los Angeles',
    organization_state: 'CA',
    organization_country: 'USA',
    organization_postal_code: '90028',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
}

// Generate metadata for Next.js
export function generateMetadata(seoData: Partial<SEOData>, fallbackTitle: string, fallbackDescription: string, currentUrl: string) {
  const seoTitle = seoData?.seo_title || fallbackTitle
  const seoDescription = seoData?.seo_description || fallbackDescription

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoData?.seo_keywords || undefined,
    robots: {
      index: seoData?.robots_index !== false,
      follow: seoData?.robots_follow !== false,
      nosnippet: seoData?.robots_nosnippet || false
    },
    openGraph: {
      title: seoData?.og_title || seoTitle,
      description: seoData?.og_description || seoDescription,
      images: seoData?.og_image ? [{
        url: seoData.og_image,
        alt: seoData.og_image_alt || seoTitle
      }] : undefined,
      type: 'website' as const,
      url: currentUrl,
      siteName: 'Modular Building Solutions'
    },
    twitter: {
      card: 'summary_large_image' as const,
      title: seoData?.twitter_title || seoData?.og_title || seoTitle,
      description: seoData?.twitter_description || seoData?.og_description || seoDescription,
      images: seoData?.twitter_image || seoData?.og_image ? [{
        url: seoData.twitter_image || seoData.og_image || '',
        alt: seoData.twitter_image_alt || seoData.og_image_alt || seoTitle
      }] : undefined
    },
    alternates: {
      canonical: seoData?.canonical_url || currentUrl
    },
    other: {
      'last-modified': seoData?.last_modified || new Date().toISOString()
    }
  }
}

// Check if a redirect exists for a path
export async function checkRedirect(sourcePath: string): Promise<{ destination: string; permanent: boolean } | null> {
  try {
    const { data, error } = await supabase
      .from('seo_redirects')
      .select('destination_path, redirect_type')
      .eq('source_path', sourcePath)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      return null
    }

    return {
      destination: data.destination_path,
      permanent: data.redirect_type === 301
    }
  } catch (error) {
    // Silently handle missing database tables
    return null
  }
}

// Get breadcrumbs for a page
export function getBreadcrumbs(path: string): Array<{ label: string; url: string }> {
  const breadcrumbs = [{ label: 'Home', url: '/' }]
  
  const pathSegments = path.split('/').filter(Boolean)
  let currentPath = ''
  
  pathSegments.forEach((segment, index) => {
    currentPath += `/${segment}`
    
    // Convert segment to readable name
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    breadcrumbs.push({
      label: name,
      url: currentPath
    })
  })
  
  return breadcrumbs
}
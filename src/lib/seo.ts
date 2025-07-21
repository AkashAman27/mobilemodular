import { supabase } from '@/lib/supabase'

export interface SEOData {
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
  last_modified?: string
}

export interface SEOSettings {
  site_name: string
  site_description?: string
  site_url?: string
  default_og_image?: string
  default_twitter_image?: string
  organization_name?: string
  organization_logo?: string
  organization_phone?: string
  organization_email?: string
  organization_address?: string
  organization_city?: string
  organization_state?: string
  organization_country?: string
  organization_postal_code?: string
  robots_txt?: string
}

// Fetch SEO data for a specific page path
export async function getSEOPageData(pagePath: string): Promise<SEOData | null> {
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
export async function getSolutionSEOData(slug: string): Promise<SEOData | null> {
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
    site_name: 'Aman Modular Buildings',
    site_description: 'Professional modular buildings for rent, sale, and lease. From portable classrooms to office complexes, we provide flexible space solutions for every industry.',
    site_url: 'https://amanmodular.com',
    organization_name: 'Aman Modular Buildings',
    organization_phone: '(555) 123-4567',
    organization_email: 'info@amanmodular.com',
    organization_address: '1234 Industrial Boulevard',
    organization_city: 'Los Angeles',
    organization_state: 'CA',
    organization_country: 'USA',
    organization_postal_code: '90028'
  }
}

// Generate metadata for Next.js
export function generateMetadata(seoData: SEOData, fallbackTitle: string, fallbackDescription: string, currentUrl: string) {
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
      siteName: 'Aman Modular Buildings'
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
import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import SolutionsGrid from '@/components/SolutionsGrid'
import ValueProposition from '@/components/ValueProposition'
import NewsInsights from '@/components/NewsInsights'
import LocationsMap from '@/components/LocationsMap'
import PageFAQs from '@/components/PageFAQs'
import InternalLinks from '@/components/InternalLinks'
import SimpleFooter from '@/components/SimpleFooter'
import { GlobalStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata } from '@/lib/seo'
import { supabaseAdmin } from '@/lib/supabase'
import type { Metadata } from 'next'

// Enable ISR with revalidation every 6 hours (21600 seconds)
export const revalidate = 21600

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = `${seoSettings.site_name} - Professional Modular Buildings`
  const fallbackDescription = seoSettings.site_description || 'Professional modular buildings for rent, sale, and lease. From portable classrooms to office complexes, we provide flexible space solutions for every industry.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    seoSettings.site_url || 'https://modularbuilding.com'
  )
}

// Get homepage content from CMS
async function getHomepageContent() {
  try {
    const { data, error } = await supabaseAdmin
      .from('complete_homepage_content')
      .select('*')
      .eq('id', 'homepage')
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching homepage content:', error)
      return null
    }

    return data || null
  } catch (error) {
    console.error('Error fetching homepage content:', error)
    return null
  }
}

// Get site settings from CMS using server-side authentication
async function getCMSSiteSettings() {
  try {
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching site settings:', error)
      return null
    }

    return data || null
  } catch (error) {
    console.error('Error fetching site settings:', error)
    return null
  }
}

// Get footer content from CMS
async function getFooterContent() {
  try {
    const { data, error } = await supabaseAdmin
      .from('footer_content')
      .select('*')
      .eq('id', 'main-footer')
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching footer content:', error)
      return null
    }

    return data || null
  } catch (error) {
    console.error('Error fetching footer content:', error)
    return null
  }
}

export default async function Home() {
  const seoSettings = await getSEOSettings()
  const homepageContent = await getHomepageContent()
  const siteSettings = await getCMSSiteSettings()
  const footerContent = await getFooterContent()

  return (
    <>
      {/* Global Structured Data */}
      <GlobalStructuredData siteData={seoSettings} />
      
      <main className="min-h-screen">
        <Header 
          companyName={siteSettings?.company_name}
          primaryPhone={siteSettings?.primary_phone}
          supportHours={siteSettings?.support_hours}
          logoUrl={siteSettings?.logo_url}
        />
        <HeroSection heroData={homepageContent} />
        <SolutionsGrid 
          headerTitle={homepageContent?.solutions_header_title}
          mainTitle={homepageContent?.solutions_main_title}
          description={homepageContent?.solutions_description}
          ctaText={homepageContent?.solutions_cta_text}
          ctaUrl={homepageContent?.solutions_cta_url}
        />
        <ValueProposition valuesData={homepageContent} />
        <NewsInsights 
          title={homepageContent?.news_section_title}
          description={homepageContent?.news_section_description}
          ctaText={homepageContent?.news_cta_text}
          ctaUrl={homepageContent?.news_cta_url}
        />
        <LocationsMap locationsData={homepageContent} />
        
        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <PageFAQs 
              pageSlug="home"
              title="Frequently Asked Questions"
              subtitle="Common questions about our modular building solutions"
              showSearch={false}
              showFilters={false}
              showFeatured={false}
              showCategories={false}
              maxItems={10}
            />
          </div>
        </section>
        
        {/* Explore More Section */}
        <InternalLinks />
        
        <SimpleFooter footerData={footerContent} siteSettings={siteSettings} />
      </main>
    </>
  )
}
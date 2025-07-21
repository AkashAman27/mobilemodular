import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import SolutionsGrid from '@/components/SolutionsGrid'
import ValueProposition from '@/components/ValueProposition'
import NewsInsights from '@/components/NewsInsights'
import LocationsMap from '@/components/LocationsMap'
import SimpleFooter from '@/components/SimpleFooter'
import { GlobalStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata } from '@/lib/seo'
import type { Metadata } from 'next'

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
    seoSettings.site_url || 'https://amanmodular.com'
  )
}

export default async function Home() {
  const seoSettings = await getSEOSettings()

  return (
    <>
      {/* Global Structured Data */}
      <GlobalStructuredData siteData={seoSettings} />
      
      <main className="min-h-screen">
        <Header />
        <HeroSection />
        <SolutionsGrid />
        <ValueProposition />
        <NewsInsights />
        <LocationsMap />
        <SimpleFooter />
      </main>
    </>
  )
}
import React from 'react'
import PageLayout from '@/components/layout/PageLayout'
import PageFAQs from '@/components/PageFAQs'
import { supabaseAdmin } from '@/lib/supabase'
import LocationsClientWrapper from '@/components/LocationsClientWrapper'
import { AnimatedMapSection, AnimatedServiceFeatures, AnimatedCoverageStats } from '@/components/LocationsAnimatedSections'
import LocationsAnimatedCTA from '@/components/LocationsAnimatedCTA'

// Get locations content from CMS with SSR
async function getLocationsContent() {
  try {
    const { data, error } = await supabaseAdmin
      .from('locations_page_content')
      .select('*')
      .single()

    if (!error) {
      return data
    }
  } catch (error) {
    console.log('Using fallback data for locations page content')
  }
  return null
}

async function LocationsPage() {
  const locationsContent = await getLocationsContent()

  // Default fallback content (server-side)
  const heroTitle = locationsContent?.hero_title || 'Find Your Local'
  const heroAccent = locationsContent?.hero_accent_text || 'Modular Solutions'
  const heroDescription = locationsContent?.hero_description || 'With 275+ locations across all 50 states, we\'re always nearby to serve your modular building needs with local expertise and nationwide resources.'
  const heroPhone = locationsContent?.hero_phone || '(866) 819-9017'
  const heroSupport = locationsContent?.hero_support_text || '24/7 Emergency Support'

  return (
    <PageLayout>
      <LocationsClientWrapper
        heroTitle={heroTitle}
        heroAccent={heroAccent}
        heroDescription={heroDescription}
        heroPhone={heroPhone}
        heroSupport={heroSupport}
      >
        {/* Interactive Map Section */}
        <AnimatedMapSection />

        {/* Service Features */}
        <AnimatedServiceFeatures />

        {/* Coverage Statistics */}
        <AnimatedCoverageStats />

        {/* FAQ Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <PageFAQs 
              pageSlug="locations"
              title="Location & Service Area FAQs"
              subtitle="Common questions about our service areas and delivery options"
              showSearch={false}
              showFilters={false}
              showFeatured={false}
              showCategories={false}
            />
          </div>
        </section>

        {/* CTA Section */}
        <LocationsAnimatedCTA />
      </LocationsClientWrapper>
    </PageLayout>
  )
}

export default LocationsPage
import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import PageLayout from '@/components/layout/PageLayout'
import USMapSelector from '@/components/USMapSelector'
import PageFAQs from '@/components/PageFAQs'
import { MapPin, Phone, Clock, Users, Building, Shield } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase'
import LocationsClientWrapper from '@/components/LocationsClientWrapper'

// Get locations page content from CMS with graceful fallback
async function getLocationsPageContent() {
  try {
    const { data, error } = await supabaseAdmin
      .from('locations_page_content')
      .select('*')
      .single()

    if (error) {
      // If table doesn't exist, return null to use fallback data
      console.log('Locations page content table not found, using fallback data')
      return null
    }

    return data || null
  } catch (error) {
    console.log('Using fallback data for locations page content')
    return null
  }
}

const LocationsPage = async () => {
  const locationsContent = await getLocationsPageContent()

  // Default fallback content
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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Choose Your State
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select your state to view our local offices, contact information, and service areas. 
              Each location is staffed with experienced professionals ready to help with your project.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <USMapSelector />
          </motion.div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Local Service?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our nationwide network combines local expertise with national resources to deliver the best possible service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center"
            >
              <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Local Expertise</h3>
              <p className="text-gray-600">
                Our local teams understand regional requirements, permits, and building codes specific to your area.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 text-center"
            >
              <div className="bg-green-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600">
                With locations nationwide, we can deliver your modular buildings quickly and efficiently to any site.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 text-center"
            >
              <div className="bg-purple-500 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Reliable Support</h3>
              <p className="text-gray-600">
                24/7 emergency support and maintenance services ensure your buildings are always operational.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coverage Statistics */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Nationwide Coverage</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Our extensive network ensures we can serve customers anywhere in the continental United States.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-yellow-400 mb-2">50</div>
              <div className="text-lg text-blue-100">States Served</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-yellow-400 mb-2">275+</div>
              <div className="text-lg text-blue-100">Total Locations</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-yellow-400 mb-2">150+</div>
              <div className="text-lg text-blue-100">Mile Service Radius</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-lg text-blue-100">Support Available</div>
            </motion.div>
          </div>
        </div>
      </section>

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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Contact your local office or get a quote online. Our team is ready to help you find the perfect modular building solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
                >
                  Get Free Quote
                </motion.button>
              </Link>
              <motion.a
                href="tel:(866) 819-9017"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-block text-center"
              >
                Call (866) 819-9017
              </motion.a>
            </div>
          </div>
        </div>
      </section>
      </LocationsClientWrapper>
    </PageLayout>
  )
}

export default LocationsPage
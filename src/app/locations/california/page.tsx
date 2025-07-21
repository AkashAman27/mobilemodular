import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { MapPin, Phone, Clock, Truck, ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FAQ from '@/components/FAQ'
import { locationsFAQs } from '@/data/faq-data'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import SEOContent from '@/components/SEOContent'
import type { Metadata } from 'next'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/locations/california')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'California Modular Buildings - Statewide Service | Aman Modular'
  const fallbackDescription = 'Professional modular building solutions throughout California. Local service in Los Angeles, San Francisco, San Diego, Sacramento, and all major cities.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/locations/california`
  )
}

export default async function CaliforniaLocationPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/locations/california')
  const locations = [
    {
      city: 'Los Angeles',
      address: '1234 Industrial Blvd, Los Angeles, CA 90028',
      phone: '(323) 555-0123',
      serviceRadius: '100 miles',
      specialties: ['Construction Sites', 'Entertainment Industry', 'Healthcare']
    },
    {
      city: 'San Francisco',
      address: '5678 Bay Area Rd, San Francisco, CA 94102',
      phone: '(415) 555-0456',
      serviceRadius: '125 miles',
      specialties: ['Tech Companies', 'Educational Facilities', 'Government']
    },
    {
      city: 'San Diego',
      address: '9012 Coastal Dr, San Diego, CA 92101',
      phone: '(619) 555-0789',
      serviceRadius: '150 miles',
      specialties: ['Military Contractors', 'Healthcare', 'Education']
    },
    {
      city: 'Sacramento',
      address: '3456 Capitol Ave, Sacramento, CA 95814',
      phone: '(916) 555-0012',
      serviceRadius: '175 miles',
      specialties: ['Government', 'Agriculture', 'Education']
    }
  ]

  const services = [
    {
      icon: Truck,
      title: 'Fast Delivery',
      description: 'Same-day or next-day delivery available throughout California with our extensive fleet.'
    },
    {
      icon: Clock,
      title: '24/7 Support',
      description: 'Round-the-clock customer service and emergency response for all California locations.'
    },
    {
      icon: CheckCircle,
      title: 'Local Expertise',
      description: 'Knowledge of California building codes, permits, and regulations in all counties.'
    }
  ]

  const projects = [
    {
      title: 'Hollywood Film Studio Offices',
      location: 'Los Angeles County',
      description: 'Provided 12 luxury office trailers for major motion picture production.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop'
    },
    {
      title: 'Stanford University Labs',
      location: 'Palo Alto',
      description: 'Temporary research facilities during science building renovation.',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop'
    },
    {
      title: 'San Diego Hospital Expansion',
      location: 'San Diego County',
      description: 'Emergency medical facilities during hospital capacity expansion.',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=250&fit=crop'
    }
  ]

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="LocalBusiness"
        data={{
          name: 'Aman Modular California',
          description: 'Professional modular building solutions throughout California with local offices in Los Angeles, San Francisco, San Diego, and Sacramento',
          url: `${seoSettings.site_url}/locations/california`,
          areaServed: 'California',
          telephone: '(323) 555-0123',
          address: {
            streetAddress: '1234 Industrial Blvd',
            addressLocality: 'Los Angeles',
            addressRegion: 'CA',
            postalCode: '90028',
            addressCountry: 'USA'
          },
          geo: {
            latitude: 34.0522,
            longitude: -118.2437
          },
          openingHours: 'Mo-Su 00:00-23:59',
          serviceType: 'Modular Building Solutions'
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      <PageHeader
        subtitle="California Locations"
        title="Statewide Modular Building Solutions"
        description="Professional modular building services throughout California. From Los Angeles to San Francisco, we provide local expertise with statewide coverage."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'California', href: '/locations/california' }
        ]}
      />

      {/* Service Areas Map */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy-600 mb-6">Comprehensive California Coverage</h2>
              <p className="text-xl text-gray-600 mb-8">
                With strategically located facilities throughout California, we provide fast, reliable service 
                to every corner of the Golden State.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-navy-600 rounded-full mb-4">
                      <service.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-navy-600 mb-2">{service.title}</h3>
                    <p className="text-sm text-gray-600">{service.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 bg-gray-100 rounded-2xl overflow-hidden">
              {/* California Map Placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full bg-gradient-to-br from-blue-500/20 to-green-500/20">
                  {/* Location pins for major cities */}
                  <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-pulse" title="San Francisco" />
                  <div className="absolute top-2/3 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse" title="Los Angeles" />
                  <div className="absolute bottom-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-pulse" title="San Diego" />
                  <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-red-500 rounded-full animate-pulse" title="Sacramento" />
                </div>
              </div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <div className="text-navy-600 font-bold">4 Major Locations</div>
                <div className="text-gray-600 text-sm">Statewide Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Details */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Our California Locations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Local expertise and personalized service in every major California market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {locations.map((location, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-navy-600 mb-2">{location.city}</h3>
                    <div className="flex items-center text-gray-600 mb-1">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{location.address}</span>
                    </div>
                    <div className="flex items-center text-gray-600 mb-1">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm font-semibold text-steel-500">{location.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Truck className="h-4 w-4 mr-2" />
                      <span className="text-sm">Service radius: {location.serviceRadius}</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-semibold text-navy-600 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {location.specialties.map((specialty, idx) => (
                      <span key={idx} className="bg-steel-100 text-steel-700 px-3 py-1 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    Contact {location.city}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Recent California Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Successful modular building installations across California's diverse industries.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-steel-500 font-semibold mb-2">{project.location}</div>
                  <h3 className="text-xl font-bold text-navy-600 mb-3">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* California-Specific Benefits */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why Choose Aman Modular in California</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-4">20+</div>
              <div className="text-xl text-blue-100 mb-2">Years in California</div>
              <div className="text-blue-200 text-sm">Deep understanding of local markets and regulations</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-4">5K+</div>
              <div className="text-xl text-blue-100 mb-2">CA Projects Completed</div>
              <div className="text-blue-200 text-sm">From tech startups to major film productions</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-4">24hr</div>
              <div className="text-xl text-blue-100 mb-2">Response Time</div>
              <div className="text-blue-200 text-sm">Emergency service throughout California</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContent 
        title="California Modular Building Excellence"
        paragraphs={[
          "California's diverse industries and rapid growth create unique demands for flexible building solutions. Our modular buildings serve the entertainment industry in Los Angeles, tech companies in Silicon Valley, educational institutions throughout the state, and healthcare facilities from San Diego to San Francisco.",
          "With local offices in major California cities, we understand the state's building codes, permit requirements, and environmental regulations. Our team has extensive experience navigating California's regulatory landscape to ensure fast, compliant installations.",
          "From earthquake-resistant construction to energy-efficient designs that meet California's strict environmental standards, our modular buildings are engineered specifically for the Golden State's requirements. We've successfully completed thousands of projects across all California counties."
        ]}
      />

      {/* FAQ Section */}
      <FAQ faqs={locationsFAQs} />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-navy-600 mb-6">
            Ready to Start Your California Project?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contact your local California team for fast, professional modular building solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get California Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white">
              Find Nearest Location
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
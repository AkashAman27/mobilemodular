import Header from '@/components/Header'
import SimpleFooter from '@/components/SimpleFooter'
import QuoteForm from '@/components/QuoteForm'
import { CheckCircle } from 'lucide-react'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import type { Metadata } from 'next'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/quote')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Get Custom Quote - Aman Modular Buildings'
  const fallbackDescription = 'Request a custom quote for your modular building project. Fast, professional service with flexible rental, purchase, and lease options.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/quote`
  )
}

export default async function QuotePage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/quote')
  const benefits = [
    'Free custom quotes within 24 hours',
    'Expert consultation and planning',
    'Flexible rental, purchase, and lease options',
    'Professional delivery and installation',
    'Nationwide service and support',
    'Quality buildings built to last'
  ]

  return (
    <main className="min-h-screen">
      {/* Structured Data */}
      <StructuredData
        type="Service"
        data={{
          name: 'Custom Quote Request',
          description: 'Get a personalized quote for modular building solutions with 24-hour response time',
          url: `${seoSettings.site_url}/quote`,
          provider: seoSettings.organization_name || 'Aman Modular Buildings',
          serviceType: 'Modular Building Quote',
          areaServed: 'United States',
          availableChannel: 'Online Form, Phone, Email'
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />

      <Header />
      
      {/* Hero Section */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get a custom quote, fast
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Give us some details and we&apos;ll get you a complete quote in practically no time.
            </p>
          </div>
        </div>
      </section>

      {/* Quote Form Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-navy-600 mb-6">
                Request Your Quote
              </h2>
              <QuoteForm />
            </div>

            {/* Benefits & Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-navy-600 mb-6">
                  Why Choose Aman Modular?
                </h3>
                <div className="space-y-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-navy-600 rounded-2xl p-8 text-white">
                <h4 className="text-xl font-bold mb-4">
                  Need immediate assistance?
                </h4>
                <p className="text-blue-100 mb-6">
                  Our experts are standing by to help you find the perfect solution for your project.
                </p>
                <div className="space-y-4">
                  <div>
                    <div className="font-semibold">Call us 24/7</div>
                    <div className="text-yellow-400 text-lg">(866) 819-9017</div>
                  </div>
                  <div>
                    <div className="font-semibold">Email us</div>
                    <div className="text-blue-100">info@amanmodular.com</div>
                  </div>
                  <div>
                    <div className="font-semibold">Emergency service</div>
                    <div className="text-blue-100">Available nationwide</div>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-3xl font-bold text-navy-600 mb-2">275+</div>
                  <div className="text-gray-600 text-sm">Locations</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-3xl font-bold text-navy-600 mb-2">50K+</div>
                  <div className="text-gray-600 text-sm">Projects Completed</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-3xl font-bold text-navy-600 mb-2">Since 1944</div>
                  <div className="text-gray-600 text-sm">Years of Experience</div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-md">
                  <div className="text-3xl font-bold text-navy-600 mb-2">24/7</div>
                  <div className="text-gray-600 text-sm">Customer Support</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SimpleFooter />
    </main>
  )
}
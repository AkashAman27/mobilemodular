import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FAQ from '@/components/FAQ'
import { generalFAQs } from '@/data/faq-data'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import SEOContent from '@/components/SEOContent'
import type { Metadata } from 'next'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/contact')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Contact Us - Get Modular Building Solutions | Aman Modular'
  const fallbackDescription = 'Contact Aman Modular for modular building solutions. Get quotes, ask questions, or find your local office. 24/7 customer support available.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/contact`
  )
}

export default async function ContactPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/contact')
  const contactMethods = [
    {
      icon: Phone,
      title: '24/7 Phone Support',
      primary: '(866) 819-9017',
      secondary: 'Emergency: (866) 819-9018',
      description: 'Speak with our experts anytime, day or night.'
    },
    {
      icon: Mail,
      title: 'Email Support',
      primary: 'info@amanmodular.com',
      secondary: 'quotes@amanmodular.com',
      description: 'Get detailed responses within 2 hours.'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      primary: 'Available 24/7',
      secondary: 'Average response: 30 seconds',
      description: 'Instant support for quick questions.'
    },
    {
      icon: MapPin,
      title: 'Find Local Office',
      primary: '275+ Locations',
      secondary: 'All 50 States',
      description: 'Local expertise, nationwide coverage.'
    }
  ]

  const offices = [
    {
      region: 'West Coast',
      locations: [
        { city: 'Los Angeles, CA', phone: '(323) 555-0123', address: '1234 Industrial Blvd' },
        { city: 'San Francisco, CA', phone: '(415) 555-0456', address: '5678 Bay Area Rd' },
        { city: 'Seattle, WA', phone: '(206) 555-0789', address: '9012 Pacific Ave' }
      ]
    },
    {
      region: 'Central',
      locations: [
        { city: 'Chicago, IL', phone: '(312) 555-0012', address: '3456 Lake Shore Dr' },
        { city: 'Dallas, TX', phone: '(214) 555-0345', address: '7890 Commerce St' },
        { city: 'Denver, CO', phone: '(303) 555-0678', address: '1234 Mountain View' }
      ]
    },
    {
      region: 'East Coast',
      locations: [
        { city: 'New York, NY', phone: '(212) 555-0901', address: '5678 Broadway Ave' },
        { city: 'Atlanta, GA', phone: '(404) 555-0234', address: '9012 Peachtree Rd' },
        { city: 'Miami, FL', phone: '(305) 555-0567', address: '3456 Ocean Drive' }
      ]
    }
  ]

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="ContactPage"
        data={{
          title: 'Contact Us - Professional Modular Building Solutions',
          description: 'Get in touch with Aman Modular for 24/7 customer support, quotes, and expert consultation',
          url: `${seoSettings.site_url}/contact`,
          phone: '(866) 819-9017',
          email: 'info@amanmodular.com',
          address: {
            street: seoSettings.organization_address || '1234 Industrial Boulevard',
            city: seoSettings.organization_city || 'Los Angeles',
            state: seoSettings.organization_state || 'CA',
            postalCode: seoSettings.organization_postal_code || '90028',
            country: seoSettings.organization_country || 'USA'
          },
          hours: '24/7 Emergency Support Available'
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      <PageHeader
        subtitle="Get In Touch"
        title="Contact Us"
        description="Ready to start your modular building project? Our expert team is standing by to help you find the perfect solution. Contact us 24/7 for immediate assistance."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Contact', href: '/contact' }
        ]}
        ctaText="Get Instant Quote"
        ctaLink="/quote"
      />

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center group hover:scale-105 transition-transform">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6 group-hover:bg-steel-500 transition-colors">
                  <method.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-600 mb-3">{method.title}</h3>
                <div className="space-y-1 mb-4">
                  <div className="text-lg font-semibold text-steel-500">{method.primary}</div>
                  <div className="text-sm text-gray-600">{method.secondary}</div>
                </div>
                <p className="text-gray-600 text-sm">{method.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-navy-600 mb-6">Send Us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent"
                      placeholder="john@company.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent"
                    placeholder="Company Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">How can we help? *</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent">
                    <option value="">Select a topic</option>
                    <option value="quote">Request a Quote</option>
                    <option value="rental">Rental Information</option>
                    <option value="purchase">Purchase Options</option>
                    <option value="lease">Lease Information</option>
                    <option value="support">Customer Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent resize-vertical"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                <Button variant="gradient" size="lg" className="w-full group">
                  Send Message
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-navy-600 mb-6">Get in Touch</h2>
                <p className="text-lg text-gray-600 mb-8">
                  Our team is ready to help you find the perfect modular building solution. 
                  Whether you need immediate assistance or want to discuss a future project, 
                  we're here for you 24/7.
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-navy-600 mb-2">2hr</div>
                  <div className="text-gray-600 text-sm">Average Response Time</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-navy-600 mb-2">24/7</div>
                  <div className="text-gray-600 text-sm">Customer Support</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-navy-600 mb-2">275+</div>
                  <div className="text-gray-600 text-sm">Service Locations</div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-3xl font-bold text-navy-600 mb-2">99%</div>
                  <div className="text-gray-600 text-sm">Customer Satisfaction</div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-navy-600 mb-4">Business Hours</h3>
                <div className="space-y-2 text-gray-600">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-semibold">6:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-semibold">7:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold">8:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between border-t pt-2 mt-3">
                    <span>Emergency Support:</span>
                    <span className="font-semibold text-green-600">24/7 Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Find Your Local Office</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              With locations across all 50 states, there's always an Aman Modular team nearby to serve you.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {offices.map((region, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-2xl font-bold text-navy-600 mb-6 text-center">{region.region}</h3>
                <div className="space-y-4">
                  {region.locations.map((location, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-lg">
                      <h4 className="font-bold text-navy-600 mb-2">{location.city}</h4>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-2" />
                          {location.address}
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2" />
                          <span className="font-semibold text-steel-500">{location.phone}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              View All Locations
            </Button>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContent 
        title="Professional Modular Building Support"
        paragraphs={[
          "Our dedicated team of modular building experts is here to help you find the perfect solution for your project. With decades of experience in the industry, we understand the unique challenges and requirements of different industries and applications.",
          "From initial consultation to final installation, we provide comprehensive support throughout your entire project. Our nationwide network ensures reliable service and professional installation across the continental United States.",
          "Contact us today to discuss your modular building needs and discover how we can help you achieve your project goals with our flexible rental, purchase, and lease options."
        ]}
      />

      {/* FAQ Section */}
      <FAQ faqs={generalFAQs} />

      {/* Emergency Support */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Clock className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Emergency Support Available 24/7
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              When you need immediate assistance, our emergency response team is standing by. 
              Critical situations require immediate solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="xl" className="group">
                Emergency Contact: (866) 819-9018
                <Phone className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                Live Chat Support
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
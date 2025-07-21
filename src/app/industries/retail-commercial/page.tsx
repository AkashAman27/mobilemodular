import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { Store, Users, Zap, Clock, ArrowRight, CheckCircle, ShoppingBag, Phone, Building2 } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FAQ from '@/components/FAQ'
import { industriesFAQs } from '@/data/faq-data'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import SEOContent from '@/components/SEOContent'
import type { Metadata } from 'next'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/industries/retail-commercial')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Retail & Commercial Industry Solutions - Pop-up Stores | Aman Modular'
  const fallbackDescription = 'Commercial modular building solutions for retail businesses. Pop-up stores, sales offices, customer service centers, and flexible commercial spaces.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/industries/retail-commercial`
  )
}

export default async function RetailCommercialIndustryPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/industries/retail-commercial')
  
  const solutions = [
    {
      icon: Store,
      title: 'Pop-up Stores',
      description: 'Attractive retail spaces with professional finishes and customer-friendly layouts.',
      features: ['Modern retail finishes', 'Display-ready interiors', 'Customer access ramps', 'Point-of-sale ready'],
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop'
    },
    {
      icon: Phone,
      title: 'Sales Offices',
      description: 'Professional sales environments designed to close deals and impress customers.',
      features: ['Professional meeting spaces', 'Presentation capabilities', 'Climate controlled comfort', 'Flexible configurations'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    },
    {
      icon: Users,
      title: 'Customer Service Centers',
      description: 'Dedicated customer service facilities with professional appearance and functionality.',
      features: ['Customer-focused design', 'Private consultation areas', 'Technology integration', 'Brand customization'],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
    }
  ]

  const benefits = [
    {
      icon: Zap,
      title: 'Quick Market Entry',
      description: 'Launch retail operations in new markets within days, not months of planning and construction.'
    },
    {
      icon: Store,
      title: 'Professional Appearance',
      description: 'Modern, attractive exteriors and interiors that enhance your brand image and customer experience.'
    },
    {
      icon: Clock,
      title: 'Flexible Terms',
      description: 'Rent, lease, or purchase options that match your business timeline and seasonal needs.'
    },
    {
      icon: Building2,
      title: 'Cost Efficient',
      description: 'Significantly lower costs than traditional retail construction with faster return on investment.'
    }
  ]

  const caseStudies = [
    {
      title: 'Seasonal Holiday Retail',
      description: 'Pop-up Christmas store for major retailer during peak holiday shopping season.',
      results: ['6-week seasonal deployment', '40% increase in sales coverage', 'Zero construction delays'],
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop'
    },
    {
      title: 'Car Dealership Sales Office',
      description: 'Temporary sales facility during main showroom renovation for luxury car dealership.',
      results: ['Maintained full sales operations', 'Professional customer experience', 'Zero revenue disruption'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop'
    },
    {
      title: 'Real Estate Sales Center',
      description: 'On-site sales office for new residential development with model home displays.',
      results: ['Premium location presence', 'Increased buyer engagement', '6-month sales campaign'],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop'
    }
  ]

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="Service"
        data={{
          name: 'Retail & Commercial Industry Solutions',
          description: 'Commercial modular building solutions for retail businesses and commercial operations',
          url: `${seoSettings.site_url}/industries/retail-commercial`,
          serviceType: 'Commercial Facility Solutions',
          provider: seoSettings.organization_name || 'Aman Modular Buildings',
          areaServed: 'United States',
          category: 'Retail & Commercial',
          offers: [
            'Pop-up Stores',
            'Sales Offices',
            'Customer Service Centers',
            'Exhibition Spaces',
            'Temporary Showrooms'
          ]
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <PageHeader
        subtitle="Industry Solutions"
        title="Retail & Commercial"
        description="Commercial modular building solutions for retail businesses and commercial operations. From pop-up stores to sales offices, we help you expand your business presence quickly and professionally."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
          { label: 'Retail & Commercial', href: '/industries/retail-commercial' }
        ]}
      />

      {/* Solutions Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Commercial Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional modular buildings designed to enhance your brand image and customer experience.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={solution.image}
                    alt={solution.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <solution.icon className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-xl font-bold text-primary">{solution.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                  <ul className="space-y-2">
                    {solution.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Why Retail Chooses Modular</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic advantages for retail businesses that need flexible, professional spaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Retail Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from retail and commercial businesses across the country.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary mb-3">{study.title}</h3>
                  <p className="text-gray-600 mb-4">{study.description}</p>
                  <div className="space-y-2">
                    {study.results.map((result, idx) => (
                      <div key={idx} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Retail Impact</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">300+</div>
              <div className="text-xl text-blue-100">Retail Locations</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">1000+</div>
              <div className="text-xl text-blue-100">Sales Events Supported</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-xl text-blue-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">72hr</div>
              <div className="text-xl text-blue-100">Deployment Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContent 
        title="Professional Modular Solutions for Retail Excellence"
        paragraphs={[
          "Our commercial modular buildings provide retail and commercial businesses with flexible, professional space solutions that can be deployed rapidly without compromising brand image. From pop-up stores to sales offices, we understand the importance of customer experience and professional appearance.",
          "With extensive experience serving retail and commercial clients, we've developed specialized solutions that enhance brand presence while providing the flexibility to adapt to seasonal demands and market opportunities. Our buildings are designed with customer engagement and business success as top priorities.",
          "Every commercial modular building we provide includes professional finishes, brand customization options, and customer-friendly features required for retail environments. We work closely with business owners to ensure spaces that drive sales and enhance customer satisfaction."
        ]}
      />

      {/* FAQ Section */}
      <FAQ faqs={industriesFAQs} />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Ready to Expand Your Business Presence?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us help you create the commercial spaces your business needs. Get a custom quote for your retail project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get Retail Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-primary text-primary hover:bg-primary hover:text-white">
              Schedule Consultation
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
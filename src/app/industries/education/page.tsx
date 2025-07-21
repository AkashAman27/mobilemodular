import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { GraduationCap, Building2, Users, Clock, ArrowRight, CheckCircle, BookOpen, Calculator, Beaker } from 'lucide-react'
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
  const seoData = await getSEOPageData('/industries/education')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Education Industry Solutions - Schools & Universities | Aman Modular'
  const fallbackDescription = 'Modular building solutions for schools and universities. Portable classrooms, administrative offices, and specialized educational facilities.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/industries/education`
  )
}

export default async function EducationIndustryPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/industries/education')
  const solutions = [
    {
      icon: BookOpen,
      title: 'Portable Classrooms',
      description: 'Modern learning environments with technology integration and optimal acoustics.',
      features: ['Smart board ready', 'Energy efficient HVAC', 'ADA compliant', 'Sound insulation'],
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop'
    },
    {
      icon: Calculator,
      title: 'Administrative Offices',
      description: 'Professional office spaces for school administration, counseling, and meetings.',
      features: ['Climate controlled', 'Professional finishes', 'Flexible layouts', 'Security features'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    },
    {
      icon: Beaker,
      title: 'Specialized Labs',
      description: 'Science labs, computer labs, and specialized learning environments.',
      features: ['Lab-grade utilities', 'Ventilation systems', 'Technology infrastructure', 'Safety compliant'],
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop'
    }
  ]

  const benefits = [
    {
      icon: Clock,
      title: 'Quick Deployment',
      description: 'Minimal disruption to the school year with fast installation and setup.'
    },
    {
      icon: Users,
      title: 'Capacity Solutions',
      description: 'Handle enrollment growth or provide space during renovations.'
    },
    {
      icon: Building2,
      title: 'Cost Effective',
      description: 'More affordable than permanent construction with flexible terms.'
    },
    {
      icon: GraduationCap,
      title: 'Education Focused',
      description: 'Designed specifically for educational environments and requirements.'
    }
  ]

  const caseStudies = [
    {
      title: 'Riverside Elementary Expansion',
      description: 'Provided 8 portable classrooms to accommodate 200 additional students during permanent building construction.',
      results: ['Zero disruption to classes', '18-month rental term', 'ADA compliant installation'],
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop'
    },
    {
      title: 'State University Research Labs',
      description: 'Temporary science labs during renovation of the chemistry building.',
      results: ['Full lab capabilities maintained', 'Specialized ventilation systems', 'Research continuity preserved'],
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop'
    },
    {
      title: 'Metro High School Offices',
      description: 'Administrative offices during main building renovation project.',
      results: ['Professional work environment', 'Secure document storage', 'Meeting room facilities'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop'
    }
  ]

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="Service"
        data={{
          name: 'Education Industry Solutions',
          description: 'Specialized modular building solutions for schools, universities, and educational institutions',
          url: `${seoSettings.site_url}/industries/education`,
          serviceType: 'Educational Facility Solutions',
          provider: seoSettings.organization_name || 'Aman Modular Buildings',
          areaServed: 'United States',
          category: 'Education',
          offers: [
            'Portable Classrooms',
            'Administrative Offices',
            'Science Labs',
            'Library Extensions',
            'Cafeteria Facilities'
          ]
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      <PageHeader
        subtitle="Industry Solutions"
        title="Education"
        description="Flexible modular building solutions for schools, universities, and educational institutions. From portable classrooms to administrative offices, we support learning environments of all sizes."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
          { label: 'Education', href: '/industries/education' }
        ]}
      />

      {/* Solutions Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Educational Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Purpose-built modular buildings designed for the unique needs of educational environments.
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
            <h2 className="text-4xl font-bold text-primary mb-6">Why Schools Choose Modular</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Flexible, cost-effective solutions that support educational excellence.
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
            <h2 className="text-4xl font-bold text-primary mb-6">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from educational institutions across the country.
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
            <h2 className="text-4xl font-bold text-white mb-6">Our Education Impact</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-xl text-blue-100">Schools Served</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">15K+</div>
              <div className="text-xl text-blue-100">Classrooms Delivered</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">98%</div>
              <div className="text-xl text-blue-100">Customer Satisfaction</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">24hr</div>
              <div className="text-xl text-blue-100">Emergency Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContent 
        title="Comprehensive Modular Solutions for Educational Excellence"
        paragraphs={[
          "Our modular buildings provide educational institutions with flexible, cost-effective space solutions that can be deployed quickly without disrupting the learning environment. From portable classrooms to administrative offices, we understand the unique needs of educational facilities.",
          "With over 20 years of experience serving schools and universities, we've developed specialized solutions that meet educational standards while providing the flexibility to adapt to changing enrollment and space requirements. Our buildings are designed with students and educators in mind.",
          "Every educational modular building we provide includes proper acoustics, climate control, and safety features required for learning environments. We work closely with school administrators to ensure compliance with local building codes and ADA requirements."
        ]}
      />

      {/* FAQ Section */}
      <FAQ faqs={industriesFAQs} />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Ready to Expand Your Educational Capacity?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us help you create the learning environments your students need. Get a custom quote for your educational project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get Educational Quote
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
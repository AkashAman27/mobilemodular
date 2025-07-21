import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { Shield, Building2, Radio, Clock, ArrowRight, CheckCircle, Lock, FileText, AlertTriangle } from 'lucide-react'
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
  const seoData = await getSEOPageData('/industries/government')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Government Industry Solutions - Federal & Municipal | Aman Modular'
  const fallbackDescription = 'Government-grade modular building solutions for federal, state, and municipal agencies. Security buildings, administrative offices, and emergency command centers.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/industries/government`
  )
}

export default async function GovernmentIndustryPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/industries/government')
  
  const solutions = [
    {
      icon: FileText,
      title: 'Administrative Offices',
      description: 'Secure government offices with advanced security features and compliance standards.',
      features: ['Security access control', 'SCIF-ready options', 'Compliance certified', 'Professional finishes'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop'
    },
    {
      icon: Lock,
      title: 'Security Buildings',
      description: 'High-security facilities for checkpoints, guard stations, and secure operations.',
      features: ['Ballistic protection available', 'Advanced surveillance ready', 'Access control systems', 'Emergency communications'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'
    },
    {
      icon: Radio,
      title: 'Emergency Command Centers',
      description: 'Mission-critical command and control facilities for emergency response operations.',
      features: ['Redundant power systems', 'Communications infrastructure', 'Climate controlled', 'Rapid deployment ready'],
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop'
    }
  ]

  const benefits = [
    {
      icon: Shield,
      title: 'Security Compliant',
      description: 'All facilities meet federal security standards and can be customized for classified operations.'
    },
    {
      icon: Clock,
      title: 'Rapid Deployment',
      description: 'Emergency government facilities can be operational within 48-72 hours when needed.'
    },
    {
      icon: Building2,
      title: 'Cost Effective',
      description: 'Reduce government spending with modular solutions that cost 30-50% less than permanent construction.'
    },
    {
      icon: AlertTriangle,
      title: 'Mission Critical',
      description: 'Designed for critical government operations with redundant systems and failsafe features.'
    }
  ]

  const caseStudies = [
    {
      title: 'Federal Border Security Station',
      description: 'High-security checkpoint facility with ballistic protection and advanced surveillance systems.',
      results: ['ATFP Level A certification', '24/7 operational capability', 'Integrated security systems'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop'
    },
    {
      title: 'Emergency Operations Center',
      description: 'Rapid deployment command center for disaster response coordination during hurricane season.',
      results: ['48-hour deployment time', 'Full communications suite', 'Multi-agency coordination'],
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop'
    },
    {
      title: 'Municipal Administration Annex',
      description: 'Temporary government offices during main building renovation for city administration.',
      results: ['Zero service disruption', 'Public access maintained', 'Secure document storage'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop'
    }
  ]

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="Service"
        data={{
          name: 'Government Industry Solutions',
          description: 'Government-grade modular building solutions for federal, state, and municipal agencies',
          url: `${seoSettings.site_url}/industries/government`,
          serviceType: 'Government Facility Solutions',
          provider: seoSettings.organization_name || 'Aman Modular Buildings',
          areaServed: 'United States',
          category: 'Government',
          offers: [
            'Administrative Offices',
            'Security Buildings',
            'Emergency Command Centers',
            'Guard Stations',
            'Processing Centers'
          ]
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <PageHeader
        subtitle="Industry Solutions"
        title="Government"
        description="Government-grade modular building solutions for federal, state, and municipal agencies. From security buildings to emergency command centers, we support critical government operations."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
          { label: 'Government', href: '/industries/government' }
        ]}
      />

      {/* Solutions Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Government Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Security-focused modular buildings designed to meet the highest government standards and compliance requirements.
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
            <h2 className="text-4xl font-bold text-primary mb-6">Why Government Chooses Modular</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Critical advantages for government agencies that need secure, compliant facilities.
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
            <h2 className="text-4xl font-bold text-primary mb-6">Government Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from government agencies across the country.
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
            <h2 className="text-4xl font-bold text-white mb-6">Our Government Impact</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">200+</div>
              <div className="text-xl text-blue-100">Government Contracts</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">50+</div>
              <div className="text-xl text-blue-100">Security Installations</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">99.8%</div>
              <div className="text-xl text-blue-100">Compliance Rate</div>
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
        title="Secure Modular Solutions for Government Excellence"
        paragraphs={[
          "Our government-grade modular buildings provide federal, state, and municipal agencies with secure, compliant space solutions that can be deployed rapidly without compromising security protocols. From administrative offices to high-security facilities, we understand the critical nature of government operations.",
          "With extensive experience serving government agencies, we've developed specialized solutions that meet stringent security standards while providing the flexibility to adapt to changing mission requirements. Our buildings are designed with security, compliance, and operational efficiency as top priorities.",
          "Every government modular building we provide includes advanced security features, access control systems, and compliance certifications required for government operations. We work closely with government administrators to ensure compliance with all federal, state, and local regulations."
        ]}
      />

      {/* FAQ Section */}
      <FAQ faqs={industriesFAQs} />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Ready to Enhance Your Government Operations?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us help you create the secure facilities your mission requires. Get a custom quote for your government project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get Government Quote
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
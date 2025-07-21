import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { Heart, Shield, Zap, Clock, ArrowRight, CheckCircle, Stethoscope, Activity, Building2 } from 'lucide-react'
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
  const seoData = await getSEOPageData('/industries/healthcare')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Healthcare Industry Solutions - Medical Facilities | Aman Modular'
  const fallbackDescription = 'Medical-grade modular building solutions for hospitals, clinics, and healthcare facilities. Emergency response units, patient care facilities, and administrative offices.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/industries/healthcare`
  )
}

export default async function HealthcareIndustryPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/industries/healthcare')
  
  const solutions = [
    {
      icon: Heart,
      title: 'Medical Facilities',
      description: 'State-of-the-art modular medical facilities with advanced filtration and medical-grade infrastructure.',
      features: ['HEPA filtration systems', 'Medical gas connections', 'Emergency power backup', 'Infection control design'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop'
    },
    {
      icon: Activity,
      title: 'Emergency Response Units',
      description: 'Rapid deployment medical units for emergency situations and disaster response.',
      features: ['Quick deployment capability', 'Self-contained utilities', 'Telemedicine ready', 'Triage capabilities'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
    },
    {
      icon: Stethoscope,
      title: 'Administrative Offices',
      description: 'Professional healthcare administration spaces with HIPAA-compliant design features.',
      features: ['HIPAA compliant design', 'Secure document storage', 'Climate controlled', 'Professional finishes'],
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop'
    }
  ]

  const benefits = [
    {
      icon: Clock,
      title: 'Rapid Deployment',
      description: 'Emergency medical facilities can be deployed within 24-48 hours for critical situations.'
    },
    {
      icon: Shield,
      title: 'Medical Grade Standards',
      description: 'All facilities meet stringent healthcare regulations and infection control requirements.'
    },
    {
      icon: Zap,
      title: 'Emergency Power',
      description: 'Backup power systems ensure continuous operation during emergencies and outages.'
    },
    {
      icon: Building2,
      title: 'Scalable Solutions',
      description: 'Modular design allows for easy expansion as healthcare needs grow or change.'
    }
  ]

  const caseStudies = [
    {
      title: 'Regional Hospital Expansion',
      description: 'Provided temporary patient care units during main hospital renovation, maintaining full capacity.',
      results: ['Zero patient displacement', '50-bed capacity maintained', 'Full medical infrastructure'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop'
    },
    {
      title: 'Emergency COVID Testing Site',
      description: 'Rapid deployment of testing facilities during pandemic response for community health center.',
      results: ['48-hour deployment', '500+ tests daily capacity', 'Safe patient flow design'],
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop'
    },
    {
      title: 'Rural Clinic Expansion',
      description: 'Extended healthcare services to underserved rural community with specialized medical facility.',
      results: ['Brought specialists to rural area', 'Telemedicine capabilities', 'Year-round healthcare access'],
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=250&fit=crop'
    }
  ]

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="Service"
        data={{
          name: 'Healthcare Industry Solutions',
          description: 'Medical-grade modular building solutions for hospitals, clinics, and healthcare facilities',
          url: `${seoSettings.site_url}/industries/healthcare`,
          serviceType: 'Healthcare Facility Solutions',
          provider: seoSettings.organization_name || 'Aman Modular Buildings',
          areaServed: 'United States',
          category: 'Healthcare',
          offers: [
            'Medical Facilities',
            'Emergency Response Units',
            'Patient Care Units',
            'Administrative Offices',
            'Testing Facilities'
          ]
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <PageHeader
        subtitle="Industry Solutions"
        title="Healthcare"
        description="Medical-grade modular building solutions for hospitals, clinics, and healthcare facilities. From emergency response units to patient care facilities, we support critical healthcare operations."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
          { label: 'Healthcare', href: '/industries/healthcare' }
        ]}
      />

      {/* Solutions Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Healthcare Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Medical-grade modular buildings designed to meet the highest healthcare standards and regulations.
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
            <h2 className="text-4xl font-bold text-primary mb-6">Why Healthcare Chooses Modular</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Critical advantages for healthcare providers who need reliable, compliant facilities.
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
            <h2 className="text-4xl font-bold text-primary mb-6">Healthcare Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from healthcare facilities across the country.
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
            <h2 className="text-4xl font-bold text-white mb-6">Our Healthcare Impact</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">150+</div>
              <div className="text-xl text-blue-100">Medical Facilities Served</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-xl text-blue-100">Emergency Deployments</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">10K+</div>
              <div className="text-xl text-blue-100">Patient Capacity Added</div>
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
        title="Advanced Modular Solutions for Healthcare Excellence"
        paragraphs={[
          "Our medical-grade modular buildings provide healthcare facilities with flexible, compliant space solutions that can be deployed rapidly without compromising patient care. From emergency response units to specialized medical facilities, we understand the critical nature of healthcare operations.",
          "With extensive experience serving hospitals, clinics, and healthcare organizations, we've developed specialized solutions that meet stringent medical standards while providing the flexibility to adapt to changing healthcare needs. Our buildings are designed with patient safety and medical functionality as top priorities.",
          "Every healthcare modular building we provide includes advanced filtration systems, emergency power backup, and medical-grade infrastructure required for patient care environments. We work closely with healthcare administrators to ensure compliance with all health codes and medical regulations."
        ]}
      />

      {/* FAQ Section */}
      <FAQ faqs={industriesFAQs} />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Ready to Enhance Your Healthcare Capacity?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us help you create the medical facilities your patients need. Get a custom quote for your healthcare project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get Healthcare Quote
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
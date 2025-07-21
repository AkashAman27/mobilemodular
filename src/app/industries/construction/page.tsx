import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { HardHat, Building2, Users, Clock, ArrowRight, CheckCircle, Shield, FileText, Wrench } from 'lucide-react'
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
  const seoData = await getSEOPageData('/industries/construction')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Construction Industry Solutions - On-Site Offices & Storage | Aman Modular'
  const fallbackDescription = 'Modular building solutions for construction sites. On-site offices, storage containers, and security buildings for construction projects.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/industries/construction`
  )
}

export default async function ConstructionIndustryPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/industries/construction')
  
  const solutions = [
    {
      icon: Building2,
      title: 'On-Site Offices',
      description: 'Professional office spaces for project management, meetings, and administrative work.',
      features: ['Climate controlled', 'Professional interiors', 'Network ready', 'Security features'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    },
    {
      icon: FileText,
      title: 'Plan Review Rooms',
      description: 'Dedicated spaces for blueprint review, planning meetings, and project coordination.',
      features: ['Large work surfaces', 'Proper lighting', 'Storage solutions', 'Meeting capabilities'],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
    },
    {
      icon: Shield,
      title: 'Security Buildings',
      description: 'Guard stations and security checkpoints for site access control and monitoring.',
      features: ['Visibility windows', 'Communication systems', 'Climate control', 'Secure storage'],
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop'
    }
  ]

  const benefits = [
    {
      icon: Clock,
      title: 'Rapid Setup',
      description: 'Quick installation to get your project office operational fast.'
    },
    {
      icon: Users,
      title: 'On-Site Convenience',
      description: 'Keep your team close to the action for better project oversight.'
    },
    {
      icon: Wrench,
      title: 'Flexible Terms',
      description: 'Rental options that match your project timeline and budget.'
    },
    {
      icon: HardHat,
      title: 'Industry Expertise',
      description: 'Built for construction sites with durability and safety in mind.'
    }
  ]

  const caseStudies = [
    {
      title: 'Downtown High-Rise Project',
      description: 'Complete site office solution for 18-month commercial construction project.',
      results: ['12-person office complex', 'Plan review room', 'Security checkpoint'],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop'
    },
    {
      title: 'Highway Infrastructure Build',
      description: 'Mobile offices and storage for multi-phase road construction project.',
      results: ['Relocatable office units', 'Secure tool storage', '24-month rental term'],
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=250&fit=crop'
    },
    {
      title: 'Residential Development',
      description: 'Sales office and model home support for new subdivision development.',
      results: ['Professional sales center', 'Customer parking area', 'Model home coordination'],
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop'
    }
  ]

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="Service"
        data={{
          name: 'Construction Industry Solutions',
          description: 'Specialized modular building solutions for construction sites and projects',
          url: `${seoSettings.site_url}/industries/construction`,
          serviceType: 'Construction Site Solutions',
          provider: seoSettings.organization_name || 'Aman Modular Buildings',
          areaServed: 'United States',
          category: 'Construction',
          offers: [
            'On-Site Offices',
            'Storage Containers',
            'Security Buildings',
            'Plan Review Rooms',
            'Break Rooms'
          ]
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <PageHeader
        subtitle="Industry Solutions"
        title="Construction"
        description="On-site offices and storage for construction projects. Professional modular buildings designed to support construction teams and project management."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
          { label: 'Construction', href: '/industries/construction' }
        ]}
      />

      {/* Solutions Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Construction Site Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional modular buildings designed specifically for construction sites and project management.
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
            <h2 className="text-4xl font-bold text-primary mb-6">Why Construction Teams Choose Us</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Reliable, professional solutions built for the demanding construction environment.
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
            <h2 className="text-4xl font-bold text-primary mb-6">Construction Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real projects where our modular solutions made a difference.
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
            <h2 className="text-4xl font-bold text-white mb-6">Our Construction Impact</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">1,200+</div>
              <div className="text-xl text-blue-100">Construction Sites</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">28</div>
              <div className="text-xl text-blue-100">Case Studies</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">99%</div>
              <div className="text-xl text-blue-100">On-Time Delivery</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">24/7</div>
              <div className="text-xl text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContent 
        title="Professional Construction Site Solutions"
        paragraphs={[
          "Our modular buildings provide construction teams with professional, climate-controlled spaces right on the job site. From project management offices to secure storage and break rooms, we understand the unique needs of construction projects.",
          "With over 1,200 construction sites served, we've developed specialized solutions that can withstand the demanding construction environment while providing the professional atmosphere needed for effective project management.",
          "Every construction modular building we provide includes durable construction, climate control, and security features designed for job site use. We work with general contractors to ensure quick setup and minimal disruption to your project timeline."
        ]}
      />

      {/* FAQ Section */}
      <FAQ faqs={industriesFAQs} />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Ready to Set Up Your Construction Site Office?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get your construction project off to a professional start with our on-site modular solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get Construction Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-primary text-primary hover:bg-primary hover:text-white">
              Call (866) 819-9017
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
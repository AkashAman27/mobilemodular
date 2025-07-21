import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { Radio, Heart, Home, Clock, ArrowRight, CheckCircle, AlertTriangle, Shield, Zap } from 'lucide-react'
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
  const seoData = await getSEOPageData('/industries/emergency-response')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Emergency Response Industry Solutions - Disaster Relief | Aman Modular'
  const fallbackDescription = 'Emergency response modular building solutions for disaster relief and crisis management. Command centers, medical triage, temporary shelters, and rapid deployment facilities.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/industries/emergency-response`
  )
}

export default async function EmergencyResponseIndustryPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/industries/emergency-response')
  
  const solutions = [
    {
      icon: Radio,
      title: 'Command Centers',
      description: 'Mobile command and control facilities for coordinating emergency response operations.',
      features: ['Communications equipment ready', 'Multi-agency coordination', 'Power redundancy systems', 'Climate controlled'],
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=300&fit=crop'
    },
    {
      icon: Heart,
      title: 'Medical Triage',
      description: 'Emergency medical facilities for disaster response and mass casualty events.',
      features: ['Medical equipment ready', 'Triage workflow design', 'Emergency power backup', 'Rapid deployment'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop'
    },
    {
      icon: Home,
      title: 'Temporary Shelters',
      description: 'Emergency housing and shelter facilities for disaster victims and displaced populations.',
      features: ['Quick assembly design', 'Weather resistant', 'Basic living amenities', 'Scalable configurations'],
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop'
    }
  ]

  const benefits = [
    {
      icon: Clock,
      title: 'Rapid Deployment',
      description: 'Emergency facilities can be operational within hours of disaster declaration or crisis onset.'
    },
    {
      icon: Shield,
      title: 'Disaster Resistant',
      description: 'Built to withstand severe weather conditions and provide reliable shelter during emergencies.'
    },
    {
      icon: Zap,
      title: 'Self-Sufficient',
      description: 'Independent power, water, and communication systems for operation in disaster-affected areas.'
    },
    {
      icon: AlertTriangle,
      title: 'Mission Critical',
      description: 'Designed for life-safety operations with redundant systems and emergency protocols.'
    }
  ]

  const caseStudies = [
    {
      title: 'Hurricane Response Command Center',
      description: 'Rapid deployment emergency command center during Category 4 hurricane for FEMA coordination.',
      results: ['12-hour deployment time', 'Multi-agency coordination hub', '72-hour continuous operation'],
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop'
    },
    {
      title: 'Wildfire Medical Triage Station',
      description: 'Emergency medical facility for wildfire evacuation center treating smoke inhalation victims.',
      results: ['200+ patients treated', 'Mobile medical unit', 'Coordinated with local hospitals'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop'
    },
    {
      title: 'Flood Emergency Shelter',
      description: 'Temporary housing facility for 100+ families displaced by major flood event.',
      results: ['Housing for 100+ families', '30-day emergency shelter', 'Essential services provided'],
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=250&fit=crop'
    }
  ]

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="Service"
        data={{
          name: 'Emergency Response Industry Solutions',
          description: 'Emergency response modular building solutions for disaster relief and crisis management',
          url: `${seoSettings.site_url}/industries/emergency-response`,
          serviceType: 'Emergency Response Facility Solutions',
          provider: seoSettings.organization_name || 'Aman Modular Buildings',
          areaServed: 'United States',
          category: 'Emergency Response',
          offers: [
            'Command Centers',
            'Medical Triage',
            'Temporary Shelters',
            'Emergency Housing',
            'Disaster Relief Facilities'
          ]
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <PageHeader
        subtitle="Industry Solutions"
        title="Emergency Response"
        description="Emergency response modular building solutions for disaster relief and crisis management. From command centers to temporary shelters, we support critical emergency operations when every minute counts."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
          { label: 'Emergency Response', href: '/industries/emergency-response' }
        ]}
      />

      {/* Solutions Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Emergency Response Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Life-saving modular buildings designed for rapid deployment during disasters and emergency situations.
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
            <h2 className="text-4xl font-bold text-primary mb-6">Why Emergency Services Choose Modular</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Critical advantages for emergency responders who need reliable, deployable facilities.
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
            <h2 className="text-4xl font-bold text-primary mb-6">Emergency Response Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real lifesaving results from emergency response operations across the country.
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
            <h2 className="text-4xl font-bold text-white mb-6">Our Emergency Response Impact</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">100+</div>
              <div className="text-xl text-blue-100">Emergency Deployments</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">50K+</div>
              <div className="text-xl text-blue-100">People Served</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">6hr</div>
              <div className="text-xl text-blue-100">Average Response Time</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">25+</div>
              <div className="text-xl text-blue-100">Disaster Relief Projects</div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContent 
        title="Rapid Modular Solutions for Emergency Response Excellence"
        paragraphs={[
          "Our emergency response modular buildings provide first responders and emergency management agencies with life-saving space solutions that can be deployed within hours of a disaster declaration. From command centers to medical triage facilities, we understand that every minute counts in emergency situations.",
          "With extensive experience supporting emergency response operations, we've developed specialized solutions that can operate independently in disaster-affected areas while providing the functionality needed for critical operations. Our buildings are designed with durability, rapid deployment, and life-safety as top priorities.",
          "Every emergency response modular building we provide includes redundant power systems, emergency communications capabilities, and disaster-resistant construction required for emergency operations. We work closely with emergency management professionals to ensure facilities that save lives and coordinate effective disaster response."
        ]}
      />

      {/* FAQ Section */}
      <FAQ faqs={industriesFAQs} />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Ready to Enhance Your Emergency Response Capability?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us help you prepare for the unexpected with emergency response facilities that save lives. Get a custom quote for your emergency preparedness project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get Emergency Response Quote
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
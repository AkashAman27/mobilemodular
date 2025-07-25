import { notFound } from 'next/navigation'
import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { 
  GraduationCap, Building2, Users, Clock, ArrowRight, CheckCircle, 
  BookOpen, Calculator, Beaker, HardHat, Shield, Stethoscope,
  Building, ShoppingBag, AlertTriangle
} from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FAQ from '@/components/FAQ'
import { industriesFAQs } from '@/data/faq-data'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import SEOContent from '@/components/SEOContent'
import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase'

interface IndustryPageProps {
  params: { slug: string }
}

// Industry-specific configurations
const industryConfigs = {
  education: {
    icon: GraduationCap,
    solutions: [
      {
        icon: BookOpen,
        title: 'Portable Classrooms',
        description: 'Modern learning environments with technology integration and optimal acoustics.',
        features: ['Smart board ready', 'Energy efficient HVAC', 'ADA compliant', 'Sound insulation'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp'
      },
      {
        icon: Calculator,
        title: 'Administrative Offices',
        description: 'Professional office spaces for school administration, counseling, and meetings.',
        features: ['Climate controlled', 'Professional finishes', 'Flexible layouts', 'Security features'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
      },
      {
        icon: Beaker,
        title: 'Specialized Labs',
        description: 'Science labs, computer labs, and specialized learning environments.',
        features: ['Lab-grade utilities', 'Ventilation systems', 'Technology infrastructure', 'Safety compliant'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
      }
    ],
    benefits: [
      { icon: Clock, title: 'Quick Deployment', description: 'Minimal disruption to the school year with fast installation and setup.' },
      { icon: Users, title: 'Capacity Solutions', description: 'Handle enrollment growth or provide space during renovations.' },
      { icon: Building2, title: 'Cost Effective', description: 'More affordable than permanent construction with flexible terms.' },
      { icon: GraduationCap, title: 'Education Focused', description: 'Designed specifically for educational environments and requirements.' }
    ]
  },
  construction: {
    icon: HardHat,
    solutions: [
      {
        icon: Building2,
        title: 'Job Site Offices',
        description: 'Professional work environments for project management and coordination.',
        features: ['Durable construction', 'Climate controlled', 'Communication ready', 'Secure storage'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp'
      },
      {
        icon: Shield,
        title: 'Equipment Storage',
        description: 'Secure storage solutions for tools, equipment, and materials.',
        features: ['Weather resistant', 'Multiple lock options', 'Easy access', 'Ventilation systems'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
      },
      {
        icon: Users,
        title: 'Worker Facilities',
        description: 'Break rooms, changing areas, and worker comfort facilities.',
        features: ['OSHA compliant', 'Heating and cooling', 'Restroom facilities', 'Break area setup'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
      }
    ],
    benefits: [
      { icon: Clock, title: 'Rapid Deployment', description: 'Quick setup to keep projects on schedule and within budget.' },
      { icon: Shield, title: 'Weather Resistant', description: 'Built to withstand harsh job site conditions and weather.' },
      { icon: Building2, title: 'Professional Environment', description: 'Maintain professional standards for meetings and operations.' },
      { icon: Users, title: 'Cost Savings', description: 'More affordable than permanent structures with flexible rental terms.' }
    ]
  },
  healthcare: {
    icon: Stethoscope,
    solutions: [
      {
        icon: Stethoscope,
        title: 'Medical Offices',
        description: 'Professional medical environments for patient care and consultations.',
        features: ['Medical grade flooring', 'HVAC filtration', 'ADA compliant', 'Privacy features'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp'
      },
      {
        icon: AlertTriangle,
        title: 'Emergency Clinics',
        description: 'Rapid deployment medical facilities for emergency and disaster response.',
        features: ['Emergency power', 'Medical equipment ready', 'Isolation capabilities', 'Quick setup'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_healthcare_modular_medical_building_at_ho.webp'
      },
      {
        icon: Shield,
        title: 'Testing Facilities',
        description: 'Specialized spaces for medical testing and diagnostic procedures.',
        features: ['Controlled environment', 'Privacy compliant', 'Equipment integration', 'Safety protocols'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp'
      }
    ],
    benefits: [
      { icon: Clock, title: 'Medical Grade Standards', description: 'All facilities meet medical industry standards and regulations.' },
      { icon: Users, title: 'Rapid Deployment', description: 'Quick setup for emergency medical needs and capacity expansion.' },
      { icon: Shield, title: 'Infection Control', description: 'Designed with proper ventilation and sanitation capabilities.' },
      { icon: Building2, title: 'Equipment Ready', description: 'Infrastructure ready for medical equipment installation.' }
    ]
  },
  government: {
    icon: Building,
    solutions: [
      {
        icon: Building,
        title: 'Administrative Offices',
        description: 'Professional government office spaces for public service delivery.',
        features: ['Security compliant', 'ADA accessible', 'Professional finishes', 'Climate controlled'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp'
      },
      {
        icon: Shield,
        title: 'Security Checkpoints',
        description: 'Secure screening and checkpoint facilities for government facilities.',
        features: ['Bullet resistant options', 'Communication systems', 'Surveillance ready', 'Access control'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
      },
      {
        icon: Users,
        title: 'Public Service Centers',
        description: 'Citizen service centers for permits, licensing, and public interactions.',
        features: ['Public friendly design', 'Waiting areas', 'Service windows', 'Document processing'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp'
      }
    ],
    benefits: [
      { icon: Shield, title: 'Security Compliant', description: 'Meets government security requirements and protocols.' },
      { icon: Users, title: 'Public Access Ready', description: 'ADA compliant with proper public access features.' },
      { icon: Building2, title: 'Professional Environment', description: 'Maintains government standards for public service.' },
      { icon: Clock, title: 'Scalable Solutions', description: 'Flexible capacity to meet changing government needs.' }
    ]
  },
  'retail-commercial': {
    icon: ShoppingBag,
    solutions: [
      {
        icon: ShoppingBag,
        title: 'Pop-up Stores',
        description: 'Temporary retail spaces for seasonal businesses and market testing.',
        features: ['Professional appearance', 'Customer ready', 'Flexible layouts', 'Branding ready'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp'
      },
      {
        icon: Building2,
        title: 'Sales Offices',
        description: 'Professional sales environments for customer consultations and presentations.',
        features: ['Professional finishes', 'Meeting spaces', 'Display areas', 'Client comfort'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
      },
      {
        icon: Users,
        title: 'Customer Service Centers',
        description: 'Dedicated spaces for customer support and service operations.',
        features: ['Sound insulation', 'Technology ready', 'Comfortable environment', 'Professional appearance'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp'
      }
    ],
    benefits: [
      { icon: Clock, title: 'Quick Market Entry', description: 'Rapid deployment to capitalize on market opportunities.' },
      { icon: Building2, title: 'Professional Appearance', description: 'High-quality finishes that reflect your brand standards.' },
      { icon: Users, title: 'Cost Effective', description: 'Lower costs than permanent retail space with flexible terms.' },
      { icon: ShoppingBag, title: 'Flexible Terms', description: 'Seasonal and short-term rental options available.' }
    ]
  },
  'emergency-response': {
    icon: AlertTriangle,
    solutions: [
      {
        icon: AlertTriangle,
        title: 'Command Centers',
        description: 'Emergency management and coordination facilities for disaster response.',
        features: ['Communication systems', 'Power backup', 'Climate controlled', 'Quick deployment'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp'
      },
      {
        icon: Stethoscope,
        title: 'Medical Triage',
        description: 'Emergency medical facilities for disaster and emergency response.',
        features: ['Medical equipment ready', 'Isolation capabilities', 'Emergency power', 'Rapid setup'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp'
      },
      {
        icon: Shield,
        title: 'Emergency Shelters',
        description: 'Temporary housing and shelter facilities for displaced populations.',
        features: ['Weather resistant', 'Privacy options', 'Basic utilities', 'Mass deployment'],
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp'
      }
    ],
    benefits: [
      { icon: Clock, title: 'Instant Deployment', description: 'Rapid response capabilities for emergency situations.' },
      { icon: Shield, title: 'Self-Contained Systems', description: 'Independent power, water, and communication systems.' },
      { icon: Building2, title: 'Disaster Resistant', description: 'Built to withstand extreme weather and conditions.' },
      { icon: Users, title: 'Multi-Purpose Use', description: 'Flexible spaces that can serve multiple emergency functions.' }
    ]
  }
}

// Get industry data from CMS
async function getIndustryData(slug: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('industries')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      console.error('Error fetching industry:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching industry:', error)
    return null
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: IndustryPageProps): Promise<Metadata> {
  const industryData = await getIndustryData(params.slug)
  const seoData = await getSEOPageData(`/industries/${params.slug}`)
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = industryData 
    ? `${industryData.name} Industry Solutions - Modular Buildings`
    : 'Industry Solutions - Modular Building Solutions'
  const fallbackDescription = industryData?.description || 'Specialized modular building solutions for your industry needs.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/industries/${params.slug}`
  )
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const industryData = await getIndustryData(params.slug)
  const config = industryConfigs[params.slug as keyof typeof industryConfigs]
  
  // If no industry data and no config, return 404
  if (!industryData && !config) {
    notFound()
  }
  
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs(`/industries/${params.slug}`)
  
  // Use industry data or fallback to config
  const industry = industryData || {
    name: params.slug.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    description: 'Specialized modular building solutions for your industry needs.',
    case_studies_count: 0
  }
  
  const solutions = config?.solutions || []
  const benefits = config?.benefits || []
  const MainIcon = config?.icon || Building2

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="Service"
        data={{
          name: `${industry.name} Industry Solutions`,
          description: industry.description,
          url: `${seoSettings.site_url}/industries/${params.slug}`,
          serviceType: `${industry.name} Facility Solutions`,
          provider: seoSettings.organization_name || 'Modular Building Solutions',
          areaServed: 'United States',
          category: industry.name,
          offers: solutions.map(s => s.title)
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <PageHeader
        subtitle="Industry Solutions"
        title={industry.name}
        description={industry.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries', href: '/industries' },
          { label: industry.name, href: `/industries/${params.slug}` }
        ]}
      />

      {solutions.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-6">{industry.name} Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Purpose-built modular buildings designed for the unique needs of the {industry.name.toLowerCase()} industry.
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
      )}

      {benefits.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-6">Why Choose Our {industry.name} Solutions</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Specialized solutions designed specifically for {industry.name.toLowerCase()} industry requirements.
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
      )}

      {/* Statistics Section */}
      {industryData?.statistics && (
        <section className="py-20 hero-gradient">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">Our {industry.name} Impact</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
              {Object.entries(industryData.statistics).map(([key, value], index) => (
                <div key={index}>
                  <div className="text-5xl font-bold text-yellow-400 mb-2">{String(value)}</div>
                  <div className="text-xl text-blue-100">
                    {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO Content Section */}
      <SEOContent 
        title={`Comprehensive Modular Solutions for ${industry.name} Excellence`}
        paragraphs={[
          `Our modular buildings provide ${industry.name.toLowerCase()} organizations with flexible, cost-effective space solutions that can be deployed quickly without disrupting operations. We understand the unique needs of ${industry.name.toLowerCase()} facilities and design our solutions accordingly.`,
          `With years of experience serving the ${industry.name.toLowerCase()} industry, we've developed specialized solutions that meet industry standards while providing the flexibility to adapt to changing requirements. Our buildings are designed with your specific operational needs in mind.`,
          `Every ${industry.name.toLowerCase()} modular building we provide includes the proper features, safety requirements, and compliance standards required for your industry. We work closely with your team to ensure all regulations and requirements are met.`
        ]}
      />

      {/* FAQ Section */}
      <FAQ faqs={industriesFAQs} />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-6">
            Ready to Enhance Your {industry.name} Operations?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us help you create the specialized facilities your {industry.name.toLowerCase()} organization needs. Get a custom quote for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get {industry.name} Quote
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
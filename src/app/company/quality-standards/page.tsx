import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { Shield, Award, Settings, Users, CheckCircle, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FAQ from '@/components/FAQ'
import { companyFAQs } from '@/data/faq-data'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import SEOContent from '@/components/SEOContent'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/company/quality-standards')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Quality Standards & Excellence | Aman Modular Buildings'
  const fallbackDescription = 'Learn about our ISO 9001:2015 certified quality management system, building code compliance, and commitment to excellence in modular construction.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/company/quality-standards`
  )
}

interface QualityStandard {
  id: string
  title: string
  subtitle: string
  icon_name: string
  description: string
  features: Array<{title: string, description: string}>
  certifications: string[]
  processes: string[]
  order_index: number
}

interface QualityContent {
  id: string
  section_type: string
  title: string
  subtitle: string
  content: string
  image_url: string
  data: any
  order_index: number
}

// Icon mapping
const iconMap = {
  Award,
  Shield,
  Settings,
  Users,
  CheckCircle,
  Clock
}

async function getQualityData() {
  const supabase = createClient()
  
  const [standardsResult, contentResult] = await Promise.all([
    supabase
      .from('quality_standards')
      .select('*')
      .eq('is_active', true)
      .order('order_index'),
    supabase
      .from('quality_content')
      .select('*')
      .eq('is_active', true)
      .order('order_index')
  ])

  return {
    standards: standardsResult.data || [],
    content: contentResult.data || []
  }
}

export default async function QualityStandardsPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/company/quality-standards')
  const { standards, content } = await getQualityData()

  // Organize content by section type
  const contentByType = content.reduce((acc: Record<string, QualityContent>, item: QualityContent) => {
    acc[item.section_type] = item
    return acc
  }, {})

  const heroContent = contentByType.hero
  const overviewContent = contentByType.overview
  const commitmentContent = contentByType.commitment
  const statsContent = contentByType.stats
  const certificationsContent = contentByType.certifications

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="Organization"
        data={{
          name: seoSettings.organization_name || 'Aman Modular Buildings',
          description: 'ISO 9001:2015 certified modular building provider with stringent quality standards and excellence in construction',
          url: `${seoSettings.site_url}/company/quality-standards`,
          certifications: ['ISO 9001:2015', 'OSHA Compliance', 'Green Building Certification'],
          qualityPolicy: 'Committed to excellence in every aspect of modular building construction and delivery'
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <PageHeader
        subtitle="Our Company"
        title={heroContent?.title || "Quality Standards & Excellence"}
        description={heroContent?.content || "At Aman Modular Buildings, quality isn't just a goal—it's our foundation. Every building we manufacture meets the highest industry standards and undergoes rigorous quality control processes."}
        backgroundImage={heroContent?.image_url}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company', href: '/company' },
          { label: 'Quality Standards', href: '/company/quality-standards' }
        ]}
      />

      {/* Overview Section */}
      {overviewContent && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-navy-600 mb-6">{overviewContent.title}</h2>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  {overviewContent.content}
                </p>
                
                {overviewContent.data?.highlights && (
                  <div className="grid grid-cols-2 gap-4">
                    {overviewContent.data.highlights.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {overviewContent.image_url && (
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <Image
                    src={overviewContent.image_url}
                    alt="Quality standards overview"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Quality Standards Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Our Quality Standards</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive quality management across every aspect of our operations.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {standards.map((standard: QualityStandard) => {
              const IconComponent = iconMap[standard.icon_name as keyof typeof iconMap] || Shield
              
              return (
                <div key={standard.id} className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-navy-600 rounded-lg mr-4">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-navy-600">{standard.title}</h3>
                      <p className="text-steel-500 font-medium">{standard.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{standard.description}</p>
                  
                  {standard.features && standard.features.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-navy-600">Key Features:</h4>
                      {standard.features.map((feature, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <div>
                            <div className="font-medium text-gray-900">{feature.title}</div>
                            <div className="text-sm text-gray-600">{feature.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {standard.certifications && standard.certifications.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <h5 className="text-sm font-semibold text-gray-700 mb-2">Related Certifications:</h5>
                      <div className="flex flex-wrap gap-2">
                        {standard.certifications.map((cert, index) => (
                          <span key={index} className="inline-block bg-navy-100 text-navy-700 text-xs px-2 py-1 rounded">
                            {cert}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quality Commitment Section */}
      {commitmentContent && commitmentContent.data?.commitments && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-navy-600 mb-6">{commitmentContent.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{commitmentContent.content}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {commitmentContent.data.commitments.map((commitment: any, index: number) => {
                const IconComponent = iconMap[commitment.icon as keyof typeof iconMap] || CheckCircle
                
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-navy-600 mb-4">{commitment.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{commitment.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Quality Stats */}
      {statsContent && statsContent.data?.stats && (
        <section className="py-20 bg-navy-600">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-6">{statsContent.title}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {statsContent.data.stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-steel-200 mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                  <div className="text-steel-300 text-sm">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Certifications Section */}
      {certificationsContent && certificationsContent.data?.certifications && (
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-navy-600 mb-6">{certificationsContent.title}</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">{certificationsContent.content}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {certificationsContent.data.certifications.map((cert: any, index: number) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-navy-100 rounded-lg mb-4">
                    <Award className="h-6 w-6 text-navy-600" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-600 mb-2">{cert.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{cert.description}</p>
                  <div className="text-xs text-gray-500">
                    <div>{cert.issuer}</div>
                    <div>{cert.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SEO Content Section */}
      <SEOContent 
        title="Why Our Quality Standards Matter"
        paragraphs={[
          "Quality is the cornerstone of every Aman Modular building project. Our ISO 9001:2015 certification and comprehensive quality management system ensure that every building we manufacture meets or exceeds industry standards for safety, durability, and performance.",
          "Our factory-controlled environment protects your building materials from weather damage while maintaining consistent quality throughout the manufacturing process. Each building undergoes multiple quality checkpoints and inspections before delivery to your site.",
          "With over 80 years of experience and 50,000+ successful installations, our commitment to quality has made us the trusted choice for organizations nationwide. Every project comes with our comprehensive warranty and ongoing support commitment."
        ]}
      />

      {/* FAQ Section */}
      <FAQ faqs={companyFAQs} />

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Experience Quality Excellence
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Partner with the industry leader in quality modular building solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Request Quality Information
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              View Certifications
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
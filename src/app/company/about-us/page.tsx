import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { Building2, Users, Award, Shield, ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FAQ from '@/components/FAQ'
import { companyFAQs } from '@/data/faq-data'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import SEOContent from '@/components/SEOContent'
import { supabaseAdmin } from '@/lib/supabase'
import type { Metadata } from 'next'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/company/about-us')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'About Us - Leading Modular Building Provider | Modular Building Solutions'
  const fallbackDescription = 'Learn about Modular Building Solutions\'s history, mission, and commitment to providing quality modular building solutions since 1944. Industry leadership and innovation.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/company/about-us`
  )
}

// For now, return null to use fallback data until table is created
async function getCompanyContent() {
  // Try to get data from CMS, but gracefully fall back if table doesn't exist
  try {
    const { data, error } = await supabaseAdmin
      .from('company_about_content')
      .select('*')
      .single()

    if (error) {
      // If table doesn't exist, return null to use fallback data
      console.log('Company about content table not found, using fallback data')
      return null
    }

    return data || null
  } catch (error) {
    console.log('Using fallback data for company about content')
    return null
  }
}

export default async function AboutUsPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/company/about-us')
  const companyContent = await getCompanyContent()

  // Default values as fallbacks
  const defaultValues = [
    {
      icon: Building2,
      title: 'Quality Construction',
      description: 'Every building meets the highest standards of construction quality and durability.'
    },
    {
      icon: Users,
      title: 'Customer Focus',
      description: 'Your success is our priority. We work closely with you to find the perfect solution.'
    },
    {
      icon: Award,
      title: 'Industry Leadership',
      description: 'Recognized leader in modular construction with decades of innovation and excellence.'
    },
    {
      icon: Shield,
      title: 'Safety First',
      description: 'Uncompromising commitment to safety in every aspect of our operations.'
    }
  ]

  const defaultTimeline = [
    {
      year: '1944',
      title: 'Company Founded',
      description: 'Started as a small family business providing temporary buildings for post-war construction.'
    },
    {
      year: '1960s',
      title: 'National Expansion',
      description: 'Expanded operations across the United States, becoming a recognized industry leader.'
    },
    {
      year: '1980s',
      title: 'Technology Innovation',
      description: 'Pioneered advanced modular construction techniques and energy-efficient designs.'
    },
    {
      year: '2000s',
      title: 'Digital Transformation',
      description: 'Implemented digital design tools and project management systems for enhanced service.'
    },
    {
      year: '2020s',
      title: 'Sustainable Future',
      description: 'Leading the industry in sustainable modular construction and green building practices.'
    }
  ]

  const defaultLeadership = [
    {
      name: 'Sarah Johnson',
      title: 'Chief Executive Officer',
      bio: '25+ years in modular construction, leading company growth and strategic initiatives.',
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
    },
    {
      name: 'Michael Chen',
      title: 'Chief Operations Officer',
      bio: 'Operations expert ensuring quality delivery and customer satisfaction nationwide.',
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
    },
    {
      name: 'Emily Rodriguez',
      title: 'VP of Engineering',
      bio: 'Leading engineering innovation and sustainable building design initiatives.',
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
    }
  ]

  const defaultCertifications = [
    'ISO 9001:2015 Quality Management',
    'OSHA Safety Compliance',
    'Green Building Certification',
    'National Association of Home Builders',
    'Better Business Bureau A+ Rating',
    'Department of Defense Contractor'
  ]

  // Use CMS data with fallbacks
  const values = companyContent?.values && companyContent.values.length > 0 ? companyContent.values : defaultValues
  const timeline = companyContent?.timeline && companyContent.timeline.length > 0 ? companyContent.timeline : defaultTimeline
  const leadership = companyContent?.leadership && companyContent.leadership.length > 0 ? companyContent.leadership : defaultLeadership
  const certifications = companyContent?.certifications && companyContent.certifications.length > 0 ? companyContent.certifications : defaultCertifications

  // Content with CMS fallbacks
  const missionTitle = companyContent?.mission_title || 'Our Mission'
  const missionContent = companyContent?.mission_content || 'To provide innovative, high-quality modular building solutions that enable our clients to achieve their goals quickly, efficiently, and sustainably. We believe that great buildings shouldn\'t take years to construct.'
  const visionTitle = companyContent?.vision_title || 'Our Vision'
  const visionContent = companyContent?.vision_content || 'To be the world\'s most trusted modular building company, known for innovation, quality, and exceptional customer service. We envision a future where modular construction is the preferred choice for organizations worldwide.'
  const valuesTitle = companyContent?.values_title || 'Our Core Values'
  const valuesDescription = companyContent?.values_description || 'The principles that guide everything we do and every decision we make.'
  const timelineTitle = companyContent?.timeline_title || 'Our Journey'
  const timelineDescription = companyContent?.timeline_description || '80 years of innovation, growth, and industry leadership.'
  const leadershipTitle = companyContent?.leadership_title || 'Leadership Team'
  const leadershipDescription = companyContent?.leadership_description || 'Experienced leaders driving innovation and excellence in modular construction.'
  const certificationsTitle = companyContent?.certifications_title || 'Certifications & Recognition'
  const certificationsDescription = companyContent?.certifications_description || 'Our commitment to excellence is recognized by industry leaders and certification bodies.'
  const ctaTitle = companyContent?.cta_title || 'Partner with Industry Leaders'
  const ctaDescription = companyContent?.cta_description || 'Join thousands of satisfied clients who trust Modular Building Solutions for their building solutions.'
  const ctaPrimaryText = companyContent?.cta_primary_text || 'Start Your Project'
  const ctaSecondaryText = companyContent?.cta_secondary_text || 'Contact Our Team'

  // Stats with CMS fallbacks
  const statsLocations = companyContent?.stats_locations || '275+'
  const statsBuildings = companyContent?.stats_buildings || '50K+'
  const statsSatisfaction = companyContent?.stats_satisfaction || '99%'
  const statsSupport = companyContent?.stats_support || '24/7'

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="Organization"
        data={{
          name: seoSettings.organization_name || 'Modular Building Solutions',
          description: 'Leading modular building provider with 80+ years of experience in professional construction solutions',
          url: `${seoSettings.site_url}/company/about-us`,
          founded: '1944',
          employees: '500+',
          services: ['Modular Buildings', 'Portable Classrooms', 'Office Buildings', 'Healthcare Facilities']
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      <PageHeader
        subtitle="Our Company"
        title="About Modular Building Solutions"
        description="For over 80 years, we've been America's trusted partner for modular building solutions. From humble beginnings to industry leadership, our commitment to quality and innovation remains unwavering."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company', href: '/company' },
          { label: 'About Us', href: '/company/about-us' }
        ]}
      />

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy-600 mb-6">{missionTitle}</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {missionContent}
              </p>
              
              <h3 className="text-2xl font-bold text-navy-600 mb-4">{visionTitle}</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {visionContent}
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp"
                alt="Modern modular building construction"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">{valuesTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {valuesDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value: any, index: number) => {
              // Handle both default values (with icon component) and CMS values (with icon string)
              let IconComponent = Building2 // default fallback
              if (typeof value.icon === 'string') {
                const iconMap: Record<string, any> = { Building2, Users, Award, Shield }
                IconComponent = iconMap[value.icon] || Building2
              } else {
                IconComponent = value.icon
              }
              
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-600 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">{timelineTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {timelineDescription}
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-steel-200"></div>
            
            <div className="space-y-12">
              {timeline.map((item: any, index: number) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                      <div className="text-3xl font-bold text-steel-500 mb-2">{item.year}</div>
                      <h3 className="text-xl font-bold text-navy-600 mb-3">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-steel-500 rounded-full"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">{leadershipTitle}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {leadershipDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden text-center">
                <div className="relative h-64">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-600 mb-2">{leader.name}</h3>
                  <div className="text-steel-500 font-semibold mb-4">{leader.title}</div>
                  <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy-600 mb-6">{certificationsTitle}</h2>
              <p className="text-xl text-gray-600 mb-8">
                {certificationsDescription}
              </p>
              <div className="space-y-3">
                {certifications.map((cert: any, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-navy-600 mb-2">{statsLocations}</div>
                <div className="text-gray-600">Service Locations</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-navy-600 mb-2">{statsBuildings}</div>
                <div className="text-gray-600">Buildings Delivered</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-navy-600 mb-2">{statsSatisfaction}</div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-navy-600 mb-2">{statsSupport}</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContent 
        title="Why Choose Modular Building Solutions?"
        paragraphs={[
          "With over 75 years of experience in the modular building industry, Modular Building Solutions has established itself as a trusted leader in providing high-quality, innovative building solutions. Our commitment to excellence, customer satisfaction, and industry-leading technology sets us apart from the competition.",
          "We understand that every project is unique, which is why we offer flexible rental, purchase, and lease options to meet your specific needs and budget. Our nationwide network ensures reliable delivery and professional installation across the continental United States.",
          "From portable classrooms and office buildings to specialized healthcare facilities and security buildings, our diverse portfolio of modular solutions is designed to exceed industry standards while providing the flexibility and efficiency your project demands."
        ]}
      />

      {/* FAQ Section */}
      <FAQ faqs={companyFAQs} />

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {ctaTitle}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {ctaDescription}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              {ctaPrimaryText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              {ctaSecondaryText}
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
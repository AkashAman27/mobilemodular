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
import type { Metadata } from 'next'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/company/about-us')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'About Us - Leading Modular Building Provider | Aman Modular'
  const fallbackDescription = 'Learn about Aman Modular\'s history, mission, and commitment to providing quality modular building solutions since 1944. Industry leadership and innovation.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/company/about-us`
  )
}

export default async function AboutUsPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/company/about-us')
  const values = [
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

  const timeline = [
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

  const leadership = [
    {
      name: 'Sarah Johnson',
      title: 'Chief Executive Officer',
      bio: '25+ years in modular construction, leading company growth and strategic initiatives.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      title: 'Chief Operations Officer',
      bio: 'Operations expert ensuring quality delivery and customer satisfaction nationwide.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      title: 'VP of Engineering',
      bio: 'Leading engineering innovation and sustainable building design initiatives.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
    }
  ]

  const certifications = [
    'ISO 9001:2015 Quality Management',
    'OSHA Safety Compliance',
    'Green Building Certification',
    'National Association of Home Builders',
    'Better Business Bureau A+ Rating',
    'Department of Defense Contractor'
  ]

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="Organization"
        data={{
          name: seoSettings.organization_name || 'Aman Modular Buildings',
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
        title="About Aman Modular"
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
              <h2 className="text-4xl font-bold text-navy-600 mb-6">Our Mission</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                To provide innovative, high-quality modular building solutions that enable our clients 
                to achieve their goals quickly, efficiently, and sustainably. We believe that great 
                buildings shouldn't take years to construct.
              </p>
              
              <h3 className="text-2xl font-bold text-navy-600 mb-4">Our Vision</h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                To be the world's most trusted modular building company, known for innovation, 
                quality, and exceptional customer service. We envision a future where modular 
                construction is the preferred choice for organizations worldwide.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"
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
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                  <value.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-600 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Our Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              80 years of innovation, growth, and industry leadership.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-steel-200"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
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
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced leaders driving innovation and excellence in modular construction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
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
              <h2 className="text-4xl font-bold text-navy-600 mb-6">Certifications & Recognition</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our commitment to excellence is recognized by industry leaders and certification bodies.
              </p>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700 font-medium">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-navy-600 mb-2">275+</div>
                <div className="text-gray-600">Service Locations</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-navy-600 mb-2">50K+</div>
                <div className="text-gray-600">Buildings Delivered</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-navy-600 mb-2">99%</div>
                <div className="text-gray-600">Customer Satisfaction</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-3xl font-bold text-navy-600 mb-2">24/7</div>
                <div className="text-gray-600">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContent 
        title="Why Choose Aman Modular Buildings?"
        paragraphs={[
          "With over 75 years of experience in the modular building industry, Aman Modular has established itself as a trusted leader in providing high-quality, innovative building solutions. Our commitment to excellence, customer satisfaction, and industry-leading technology sets us apart from the competition.",
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
            Partner with Industry Leaders
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust Aman Modular for their building solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
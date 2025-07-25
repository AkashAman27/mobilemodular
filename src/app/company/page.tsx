import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { Building2, Users, Award, Shield, ArrowRight, Clock, CheckCircle, Target } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import type { Metadata } from 'next'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/company')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Our Company - About Modular Building Solutions'
  const fallbackDescription = 'Discover Modular Building Solutions - industry leader in modular construction with 80+ years of experience, quality standards, and proven processes.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/company`
  )
}

export default async function CompanyPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/company')

  const companyHighlights = [
    {
      icon: Building2,
      title: '80+ Years of Experience',
      description: 'Since 1944, we\'ve been America\'s trusted partner for modular building solutions.',
      link: '/company/about-us'
    },
    {
      icon: Award,
      title: 'ISO 9001:2015 Certified',
      description: 'Our quality management system meets international standards for excellence.',
      link: '/company/quality-standards'
    },
    {
      icon: Users,
      title: 'Proven Process',
      description: '7-step construction process ensuring quality delivery from start to finish.',
      link: '/company/our-process'
    },
    {
      icon: Shield,
      title: 'Industry Leadership',
      description: 'Recognized leader in modular construction with thousands of successful projects.',
      link: '/company/about-us'
    }
  ]

  const companyStats = [
    { number: '50,000+', label: 'Buildings Delivered', description: 'Successful projects nationwide' },
    { number: '275+', label: 'Service Locations', description: 'Coverage across the United States' },
    { number: '99%', label: 'Customer Satisfaction', description: 'Client retention and referral rate' },
    { number: '24/7', label: 'Support Available', description: 'Customer service and maintenance' }
  ]

  const companyValues = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We strive for perfection in every project, from design to delivery.'
    },
    {
      icon: CheckCircle,
      title: 'Reliability',
      description: 'Our clients count on us for consistent quality and on-time performance.'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We work closely with clients to understand and exceed their expectations.'
    },
    {
      icon: Clock,
      title: 'Innovation',
      description: 'Continuously improving our processes and technology for better solutions.'
    }
  ]

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="Organization"
        data={{
          name: seoSettings.organization_name || 'Modular Building Solutions',
          description: 'Leading modular building provider with 80+ years of experience in professional construction solutions',
          url: `${seoSettings.site_url}/company`,
          founded: '1944',
          employees: '500+',
          services: ['Modular Buildings', 'Portable Classrooms', 'Office Buildings', 'Healthcare Facilities']
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <PageHeader
        subtitle="Learn About Us"
        title="Modular Building Solutions"
        description="For over 80 years, we've been America's trusted partner for modular building solutions. From humble beginnings to industry leadership, our commitment to quality and innovation remains unwavering."
        backgroundImage="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/hero_background_modern_modular_building_complex_ae.webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Company', href: '/company' }
        ]}
      />

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy-600 mb-6">Building America's Future</h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Since 1944, Modular Building Solutions has been at the forefront of modular construction, 
                delivering innovative building solutions that meet the evolving needs of businesses, 
                educational institutions, and government organizations across the United States.
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Our commitment to quality, safety, and customer satisfaction has made us the preferred 
                choice for organizations seeking reliable, cost-effective, and sustainable building solutions.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="group">
                  <Link href="/company/about-us">
                    Learn Our Story
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/quote">
                    Get Started Today
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/facility_manufacturing_factory_workers_building_mo.webp"
                alt="Modular Building Solutions facility"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Highlights */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">What Sets Us Apart</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the key factors that have made us a leader in the modular building industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyHighlights.map((highlight, index) => (
              <Link
                key={index}
                href={highlight.link}
                className="group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6 group-hover:bg-steel-600 transition-colors">
                  <highlight.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-600 mb-4 group-hover:text-steel-600 transition-colors">
                  {highlight.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{highlight.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Company Stats */}
      <section className="py-20 bg-navy-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Impact by the Numbers</h2>
            <p className="text-xl text-steel-200 max-w-3xl mx-auto">
              Eight decades of excellence reflected in our achievements and client satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-steel-200 mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                <div className="text-steel-300 text-sm">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-steel-100 rounded-full mb-6">
                  <value.icon className="h-8 w-8 text-steel-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-600 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Sections Navigation */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Explore Our Company</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn more about our history, processes, and commitment to excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* About Us */}
            <Link
              href="/company/about-us"
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <Image
                  src="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp"
                  alt="About Modular Building Solutions"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-navy-600 mb-4 group-hover:text-steel-600 transition-colors">
                  About Us
                </h3>
                <p className="text-gray-600 mb-6">
                  Discover our 80-year journey, company mission, leadership team, and the values that drive our success.
                </p>
                <div className="flex items-center text-steel-600 font-medium group-hover:text-navy-600 transition-colors">
                  Learn More
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Our Process */}
            <Link
              href="/company/our-process"
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <Image
                  src="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/process_consultation_business_meeting_with_clients.webp"
                  alt="Our Process"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-navy-600 mb-4 group-hover:text-steel-600 transition-colors">
                  Our Process
                </h3>
                <p className="text-gray-600 mb-6">
                  Explore our proven 7-step construction process that ensures quality, efficiency, and customer satisfaction.
                </p>
                <div className="flex items-center text-steel-600 font-medium group-hover:text-navy-600 transition-colors">
                  View Process
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>

            {/* Quality Standards */}
            <Link
              href="/company/quality-standards"
              className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <Image
                  src="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp"
                  alt="Quality Standards"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-navy-600 mb-4 group-hover:text-steel-600 transition-colors">
                  Quality Standards
                </h3>
                <p className="text-gray-600 mb-6">
                  Learn about our ISO 9001:2015 certification, quality control processes, and commitment to excellence.
                </p>
                <div className="flex items-center text-steel-600 font-medium group-hover:text-navy-600 transition-colors">
                  View Standards
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Partner with Industry Leaders?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust Modular Building Solutions for their building solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" asChild className="group">
              <Link href="/quote">
                Get Your Quote Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/contact">
                Contact Our Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
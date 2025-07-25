import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { Calculator, BookOpen, FileText, Download, ArrowRight, Users, Clock, Award, CheckCircle, Building } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/resources')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Resources & Planning Tools | Modular Building Solutions'
  const fallbackDescription = 'Access comprehensive planning tools, guides, calculators, and resources for your modular building project. Everything you need for successful project implementation.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/resources`
  )
}

interface ResourceContent {
  id: string
  section_type: string
  title: string
  subtitle: string
  description: string
  icon_name: string
  image_url: string
  data: any
  order_index: number
}

interface ResourceCategory {
  id: string
  name: string
  description: string
  icon_name: string
  color_scheme: string
  order_index: number
}

// Icon mapping
const iconMap = {
  BookOpen,
  Calculator,
  FileText,
  Download,
  Award,
  Users,
  Clock,
  CheckCircle
}

async function getResourcesData() {
  const supabase = createClient()
  
  const [contentResult, categoriesResult] = await Promise.all([
    supabase
      .from('resources_content')
      .select('*')
      .eq('is_active', true)
      .order('order_index'),
    supabase
      .from('resource_categories')
      .select('*')
      .eq('is_active', true)
      .order('order_index')
  ])

  return {
    content: contentResult.data || [],
    categories: categoriesResult.data || []
  }
}

export default async function ResourcesPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/resources')
  const { content, categories } = await getResourcesData()

  // Find overview content
  const overviewContent = content.find((item: ResourceContent) => item.section_type === 'overview')
  const sectionContent = content.filter((item: ResourceContent) => item.section_type !== 'overview')

  // Define resource sections with their details
  const resourceSections = [
    {
      title: 'Live Inventory',
      description: 'Browse our current inventory of available modular buildings. Filter by type, size, and location to find the perfect solution.',
      href: '/resources/live-inventory',
      icon: Building,
      color: 'from-navy-600 to-steel-700',
      bgColor: 'bg-navy-50',
      features: ['Available Buildings', 'Real-time Inventory', 'Detailed Specifications', 'Instant Quotes']
    },
    {
      title: 'Planning Tools',
      description: 'Interactive calculators and planning resources to help determine your exact needs and requirements.',
      href: '/resources/planning-tools',
      icon: Calculator,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      features: ['Size Calculators', 'Cost Estimators', 'Site Requirements', 'Project Timelines']
    },
    {
      title: 'FAQ Center',
      description: 'Comprehensive answers to frequently asked questions about modular buildings, services, and processes.',
      href: '/resources/faq',
      icon: BookOpen,
      color: 'from-green-600 to-green-700', 
      bgColor: 'bg-green-50',
      features: ['General Questions', 'Technical Support', 'Pricing Information', 'Process Details']
    },
    {
      title: 'Case Studies',
      description: 'Real-world examples of successful modular building projects across various industries and applications.',
      href: '/resources/case-studies',
      icon: Award,
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50',
      features: ['Industry Examples', 'Project Outcomes', 'Client Testimonials', 'Technical Details']
    },
    {
      title: 'Product Gallery',
      description: 'Browse our extensive collection of modular buildings, configurations, and customization options.',
      href: '/resources/product-gallery',
      icon: Users,
      color: 'from-orange-600 to-orange-700',
      bgColor: 'bg-orange-50',
      features: ['Building Types', 'Interior Options', 'Custom Features', 'Specifications']
    }
  ]

  const quickAccess = [
    { title: 'Get a Quote', href: '/quote', icon: Calculator },
    { title: 'Find Locations', href: '/locations', icon: Users },
    { title: 'Contact Support', href: '/contact', icon: Clock },
    { title: 'View Solutions', href: '/solutions', icon: Award }
  ]

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="WebPage"
        data={{
          name: 'Resources & Planning Tools',
          description: 'Comprehensive resource center with planning tools, guides, and support materials for modular building projects',
          url: `${seoSettings.site_url}/resources`,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: resourceSections.map((section, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: section.title,
              description: section.description,
              url: `${seoSettings.site_url}${section.href}`
            }))
          }
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <PageHeader
        subtitle="Resource Center"
        title={overviewContent?.title || "Resources & Planning Tools"}
        description={overviewContent?.description || "Access comprehensive tools, guides, and resources to plan, implement, and manage your modular building projects with confidence."}
        backgroundImage={overviewContent?.image_url || "https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/hero_background_modern_modular_building_complex_ae.webp"}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' }
        ]}
      />

      {/* Stats Section */}
      {overviewContent?.data?.stats && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {overviewContent.data.stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold text-navy-600 mb-2">{stat.number}</div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                  <div className="text-gray-600 text-sm">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Resource Sections */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Resource Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our comprehensive collection of resources designed to support every phase of your modular building project.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {resourceSections.map((section, index) => {
              const IconComponent = section.icon
              
              return (
                <Card key={index} className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 ${section.bgColor} border-0 overflow-hidden`}>
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-4 bg-gradient-to-r ${section.color} rounded-xl shadow-lg`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <ArrowRight className="h-6 w-6 text-gray-400 group-hover:text-navy-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-navy-600 mb-4 group-hover:text-steel-600 transition-colors">
                      {section.title}
                    </h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{section.description}</p>
                    
                    <div className="space-y-2 mb-8">
                      {section.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                    
                    <Button asChild className={`w-full bg-gradient-to-r ${section.color} hover:opacity-90 transition-opacity`}>
                      <Link href={section.href}>
                        Explore {section.title}
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Quick Access Tools */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Quick Access</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Jump directly to our most popular tools and resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccess.map((item, index) => {
              const IconComponent = item.icon
              
              return (
                <Link
                  key={index}
                  href={item.href}
                  className="group bg-gray-50 rounded-2xl p-6 text-center hover:bg-navy-600 hover:text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 group-hover:bg-white rounded-full mb-4 transition-colors">
                    <IconComponent className="h-8 w-8 text-white group-hover:text-navy-600 transition-colors" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-navy-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Why Use Our Resources?</h2>
            <p className="text-xl text-steel-200 max-w-3xl mx-auto">
              Our comprehensive resource center is designed to make your project planning and implementation as smooth as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-steel-500 rounded-full mb-6">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Accurate Planning</h3>
              <p className="text-steel-300">Precise calculations and estimates for successful project planning.</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-steel-500 rounded-full mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Save Time</h3>
              <p className="text-steel-300">Streamlined tools and resources to accelerate your decision making.</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-steel-500 rounded-full mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Expert Guidance</h3>
              <p className="text-steel-300">Resources developed by our experienced team of modular building experts.</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-steel-500 rounded-full mb-6">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Proven Results</h3>
              <p className="text-steel-300">Resources based on 80+ years of experience and thousands of projects.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Use our resources to plan your project, then connect with our experts for personalized assistance.
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
                Speak with Expert
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { Search, ChevronDown, ChevronUp, HelpCircle, Phone, MessageSquare, Mail, Clock, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import type { Metadata } from 'next'
import { 
  generalFAQs, 
  solutionsFAQs, 
  industriesFAQs, 
  locationsFAQs, 
  resourcesFAQs, 
  companyFAQs,
  type FAQItem 
} from '@/data/faq-data'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/resources/faq')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Frequently Asked Questions | Aman Modular Buildings'
  const fallbackDescription = 'Find answers to common questions about modular buildings, services, processes, and more. Comprehensive FAQ covering all aspects of modular construction.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/resources/faq`
  )
}

// FAQ Categories
const faqCategories = [
  {
    id: 'general',
    title: 'General Questions',
    description: 'Basic questions about our services, delivery, and processes',
    icon: HelpCircle,
    color: 'from-blue-600 to-blue-700',
    bgColor: 'bg-blue-50',
    faqs: generalFAQs
  },
  {
    id: 'solutions',
    title: 'Solutions & Products',
    description: 'Questions about building types, features, and configurations',
    icon: CheckCircle,
    color: 'from-green-600 to-green-700',
    bgColor: 'bg-green-50',
    faqs: solutionsFAQs
  },
  {
    id: 'industries',
    title: 'Industries & Applications',
    description: 'Industry-specific questions and specialized requirements',
    icon: MessageSquare,
    color: 'from-purple-600 to-purple-700',
    bgColor: 'bg-purple-50',
    faqs: industriesFAQs
  },
  {
    id: 'locations',
    title: 'Locations & Service Areas',
    description: 'Questions about coverage areas, delivery, and local services',
    icon: Mail,
    color: 'from-orange-600 to-orange-700',
    bgColor: 'bg-orange-50',
    faqs: locationsFAQs
  },
  {
    id: 'resources',
    title: 'Resources & Support',
    description: 'Questions about planning tools, documentation, and assistance',
    icon: Phone,
    color: 'from-indigo-600 to-indigo-700',
    bgColor: 'bg-indigo-50',
    faqs: resourcesFAQs
  },
  {
    id: 'company',
    title: 'Company & Experience',
    description: 'Questions about our company, history, and qualifications',
    icon: Clock,
    color: 'from-slate-600 to-slate-700',
    bgColor: 'bg-slate-50',
    faqs: companyFAQs
  }
]

// Popular questions (selected from all categories)
const popularFAQs: FAQItem[] = [
  generalFAQs[0], // Delivery time
  solutionsFAQs[0], // Types of buildings
  generalFAQs[1], // Rental vs purchase
  industriesFAQs[0], // Industry experience
  locationsFAQs[0], // Location availability
  generalFAQs[2], // Utilities hookup
  solutionsFAQs[4], // Energy efficiency
  companyFAQs[0], // Years in business
]

export default async function FAQPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/resources/faq')

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="FAQPage"
        data={{
          name: 'Frequently Asked Questions',
          description: 'Comprehensive FAQ covering all aspects of modular building solutions',
          url: `${seoSettings.site_url}/resources/faq`,
          mainEntity: popularFAQs.map(faq => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <PageHeader
        subtitle="Resources"
        title="Frequently Asked Questions"
        description="Find answers to common questions about modular buildings, our services, and processes. Can't find what you're looking for? Our experts are here to help."
        backgroundImage="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=1200&h=600&fit=crop"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'FAQ', href: '/resources/faq' }
        ]}
      />

      {/* Search Bar */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search frequently asked questions..."
                className="pl-12 pr-4 py-4 text-lg border-2 border-gray-200 focus:border-navy-600 rounded-lg"
              />
            </div>
            <p className="text-center text-gray-600 mt-4">
              Search through {faqCategories.reduce((total, cat) => total + cat.faqs.length, 0)} frequently asked questions
            </p>
          </div>
        </div>
      </section>

      {/* Popular Questions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navy-600 mb-4">Popular Questions</h2>
            <p className="text-xl text-gray-600">The most frequently asked questions from our customers</p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {popularFAQs.map((faq, index) => (
              <Card key={index} className="border-l-4 border-l-navy-600">
                <CardContent className="p-6">
                  <details className="group">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <h3 className="text-lg font-semibold text-navy-600 pr-4">{faq.question}</h3>
                      <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0" />
                    </summary>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Browse by Category</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore questions organized by topic to find exactly what you're looking for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {faqCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon
              
              return (
                <Card key={categoryIndex} className={`${category.bgColor} border-0 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}>
                  <CardContent className="p-8">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl mb-6`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    
                    <h3 className="text-2xl font-bold text-navy-600 mb-4">{category.title}</h3>
                    <p className="text-gray-600 mb-6">{category.description}</p>
                    
                    <div className="space-y-3">
                      <div className="text-sm text-gray-500 mb-4">
                        {category.faqs.length} questions in this category
                      </div>
                      
                      {/* Preview of first 3 questions */}
                      <div className="space-y-2">
                        {category.faqs.slice(0, 3).map((faq, faqIndex) => (
                          <details key={faqIndex} className="group">
                            <summary className="text-sm text-navy-600 cursor-pointer hover:text-steel-600 transition-colors list-none flex items-center justify-between">
                              <span className="pr-2">{faq.question}</span>
                              <ChevronDown className="h-4 w-4 group-open:rotate-180 transition-transform flex-shrink-0" />
                            </summary>
                            <div className="mt-2 pl-4 border-l-2 border-gray-200">
                              <p className="text-xs text-gray-600">{faq.answer.substring(0, 150)}...</p>
                            </div>
                          </details>
                        ))}
                      </div>
                      
                      {category.faqs.length > 3 && (
                        <div className="pt-4">
                          <Button variant="outline" size="sm" className="w-full">
                            View All {category.faqs.length} Questions
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-navy-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Still Have Questions?</h2>
            <p className="text-xl text-steel-200 max-w-3xl mx-auto">
              Our experts are available 24/7 to provide personalized answers and support for your specific needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-steel-500 rounded-full mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Call Our Experts</h3>
              <p className="text-steel-300 mb-4">Speak directly with our knowledgeable team</p>
              <p className="text-yellow-400 font-semibold">(866) 819-9017</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-steel-500 rounded-full mb-6">
                <MessageSquare className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Live Chat</h3>
              <p className="text-steel-300 mb-4">Get instant answers through our chat system</p>
              <p className="text-yellow-400 font-semibold">Available 24/7</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-steel-500 rounded-full mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Email Support</h3>
              <p className="text-steel-300 mb-4">Send us your detailed questions</p>
              <p className="text-yellow-400 font-semibold">24-hour response</p>
            </div>
          </div>

          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="gradient" size="lg" asChild>
                <Link href="/contact">
                  Contact Our Team
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10" asChild>
                <Link href="/quote">
                  Get a Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-600 mb-8 text-center">Quick Links</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Link href="/resources/planning-tools" className="group bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4 group-hover:bg-blue-200 transition-colors">
                  <CheckCircle className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-navy-600 mb-2">Planning Tools</h3>
                <p className="text-sm text-gray-600">Use our calculators and guides</p>
              </Link>

              <Link href="/resources/case-studies" className="group bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4 group-hover:bg-green-200 transition-colors">
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="font-semibold text-navy-600 mb-2">Case Studies</h3>
                <p className="text-sm text-gray-600">See successful projects</p>
              </Link>

              <Link href="/locations" className="group bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4 group-hover:bg-purple-200 transition-colors">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-navy-600 mb-2">Find Locations</h3>
                <p className="text-sm text-gray-600">Locate your nearest office</p>
              </Link>

              <Link href="/solutions" className="group bg-white rounded-lg p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4 group-hover:bg-orange-200 transition-colors">
                  <HelpCircle className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="font-semibold text-navy-600 mb-2">View Solutions</h3>
                <p className="text-sm text-gray-600">Explore building types</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            If you couldn't find the answer you were looking for, our team is ready to provide personalized assistance for your project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" asChild className="group">
              <Link href="/quote">
                Get Your Custom Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10" asChild>
              <Link href="/contact">
                Speak with an Expert
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
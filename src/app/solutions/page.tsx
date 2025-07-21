import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { Building2, GraduationCap, Package, Heart, Shield, Utensils, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FAQ from '@/components/FAQ'
import { solutionsFAQs } from '@/data/faq-data'
import { supabase } from '@/lib/supabase'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import SEOContent from '@/components/SEOContent'
import type { Metadata } from 'next'

const iconMap = {
  office: Building2,
  education: GraduationCap,
  storage: Package,
  healthcare: Heart,
  security: Shield,
  restaurant: Utensils,
}

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/solutions')
  
  const fallbackTitle = 'Modular Building Solutions - All Types Available | Aman Modular'
  const fallbackDescription = 'Complete range of modular building solutions including office buildings, portable classrooms, storage containers, healthcare facilities, and more.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    'https://amanmodular.com/solutions'
  )
}

async function getSolutions() {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('is_active', true)
      .order('display_order', { ascending: true })

    if (error) {
      // Silent error handling - removed console.error
      return []
    }

    return data || []
  } catch (error) {
    // Silent error handling - removed console.error
    return []
  }
}

export default async function SolutionsPage() {
  const dbSolutions = await getSolutions()
  const breadcrumbs = getBreadcrumbs('/solutions')
  
  // Transform database solutions to match the expected format
  const solutions = dbSolutions.map(solution => ({
    icon: iconMap[solution.category as keyof typeof iconMap] || Building2,
    title: solution.name,
    description: solution.description,
    features: solution.features || [],
    price: `Starting at ${solution.starting_price}`,
    href: `/solutions/${solution.slug}`,
    image: solution.image_url
  }))

  const benefits = [
    {
      title: 'Fast Deployment',
      description: 'Most buildings can be delivered and set up within 24-48 hours',
      stat: '24-48hrs'
    },
    {
      title: 'Cost Effective',
      description: 'Save 40-60% compared to traditional construction',
      stat: '40-60%'
    },
    {
      title: 'Flexible Terms',
      description: 'Rent, buy, or lease with terms that work for you',
      stat: '3 Options'
    },
    {
      title: 'Quality Assured',
      description: 'All buildings meet or exceed industry standards',
      stat: '100%'
    }
  ]

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="CollectionPage"
        data={{
          title: 'Complete Building Solutions',
          description: 'From portable classrooms to office complexes, we provide professional modular building solutions for every industry and application.',
          url: 'https://amanmodular.com/solutions',
          path: '/solutions',
          items: solutions.map(solution => ({
            name: solution.title,
            url: `https://amanmodular.com${solution.href}`,
            path: solution.href
          }))
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />

      <PageHeader
        subtitle="Our Solutions"
        title="Complete Building Solutions"
        description="From portable classrooms to office complexes, we provide professional modular building solutions for every industry and application. Rent, buy, or lease with flexible terms."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' }
        ]}
      />

      {/* Solutions Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Our Building Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional modular buildings designed for your specific needs. Each solution is engineered 
              for quality, durability, and immediate deployment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  <div className="relative h-64 md:h-auto">
                    <Image
                      src={solution.image}
                      alt={solution.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center">
                        <solution.icon className="h-6 w-6 text-navy-600" />
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-steel-500 text-white px-3 py-1 rounded-lg font-semibold">
                        {solution.price}
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-navy-600 mb-3 group-hover:text-steel-500 transition-colors">
                        {solution.title}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {solution.description}
                      </p>
                      <ul className="space-y-2 mb-6">
                        {solution.features?.map((feature: string, idx: number) => (
                          <li key={idx} className="flex items-center text-sm text-gray-700">
                            <div className="w-1.5 h-1.5 bg-steel-500 rounded-full mr-3 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link
                      href={solution.href}
                      className="group/link flex items-center justify-between text-steel-500 hover:text-navy-600 font-semibold transition-colors"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                    </Link>
                  </div>
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
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Why Choose Modular?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modular buildings offer significant advantages over traditional construction methods.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-steel-500 mb-4">{benefit.stat}</div>
                <h3 className="text-xl font-bold text-navy-600 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Simple 4-Step Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From initial consultation to installation, we make the process simple and efficient.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-navy-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold text-navy-600 mb-3">Consultation</h3>
              <p className="text-gray-600">Discuss your needs and get expert recommendations</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-navy-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-xl font-bold text-navy-600 mb-3">Design</h3>
              <p className="text-gray-600">Customize your building to meet your requirements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-navy-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold text-navy-600 mb-3">Delivery</h3>
              <p className="text-gray-600">Fast delivery and professional installation</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-navy-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-xl font-bold text-navy-600 mb-3">Support</h3>
              <p className="text-gray-600">Ongoing maintenance and customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContent 
        title="Professional Modular Building Solutions"
        paragraphs={[
          "Our comprehensive range of modular building solutions provides businesses, schools, and organizations with flexible space options that can be deployed quickly and cost-effectively. From portable classrooms to office complexes, we have the expertise to meet your specific needs.",
          "Each modular building is constructed to the highest standards using quality materials and modern construction techniques. We offer flexible rental, purchase, and lease options to accommodate any budget and timeline requirements.",
          "With decades of experience in the modular building industry, we understand that every project is unique. Our team works closely with clients to customize solutions that meet their exact specifications while ensuring compliance with all local building codes and regulations."
        ]}
      />

      {/* FAQ Section */}
      <FAQ faqs={solutionsFAQs} />

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Find Your Perfect Solution?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Our experts will help you choose the right modular building for your specific needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get Custom Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              Speak with Expert
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
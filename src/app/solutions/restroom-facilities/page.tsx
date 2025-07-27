import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import SEOContentWrapper from '@/components/SEOContentWrapper'
import { Droplets, Users, Shield, Zap, ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FAQ from '@/components/FAQ'
import { solutionsFAQs } from '@/data/faq-data'
import { supabaseAdmin } from '@/lib/supabase'

export const metadata = {
  title: 'Portable Restroom Facilities - Clean & Professional | Modular Building Solutions',
  description: 'Professional portable restroom facilities for construction sites, events, and temporary installations. ADA compliant options available.',
}

async function getSolutionData() {
  const { data, error } = await supabaseAdmin
    .from('solutions')
    .select('*')
    .eq('slug', 'restroom-facilities')
    .single()
  return error ? null : data
}

export default async function RestroomFacilitiesPage() {
  const solutionData = await getSolutionData()
  const iconMap = { Droplets, Users, Shield, Zap }
  
  const features = solutionData?.feature_cards || [
    {
      icon: 'Droplets',
      title: 'Professional Grade',
      description: 'High-quality fixtures and finishes suitable for professional environments and public use.'
    },
    {
      icon: 'Users',
      title: 'Multiple Configurations',
      description: 'Single units to multi-stall facilities with separate men\'s and women\'s options.'
    },
    {
      icon: 'Shield',
      title: 'ADA Compliant',
      description: 'Accessible units available that meet all ADA requirements and accessibility standards.'
    },
    {
      icon: 'Zap',
      title: 'Self-Contained',
      description: 'Complete with fresh water tanks, waste holding tanks, and electrical systems.'
    }
  ]

  const specifications = solutionData?.specifications || [
    {
      title: 'Single Unit',
      size: '4\' x 8\'',
      capacity: '1 person',
      price: 'Starting at $175/month',
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/restroom_single_single_restroom_unit_interior_4x8.webp'
    },
    {
      title: 'Double Unit',
      size: '8\' x 8\'',
      capacity: '2 stalls',
      price: 'Starting at $275/month',
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/restroom_double_double_restroom_unit_interior_8x8.webp'
    },
    {
      title: 'ADA Accessible',
      size: '8\' x 10\'',
      capacity: '1 person + wheelchair',
      price: 'Starting at $225/month',
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/restroom_ada_ada_accessible_restroom_interior_8x10.webp'
    },
    {
      title: 'Multi-Stall Complex',
      size: '12\' x 24\'',
      capacity: '6+ stalls',
      price: 'Starting at $650/month',
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/restroom_complex_multi_stall_restroom_complex_inte.webp'
    }
  ]

  const included = solutionData?.included_items || [
    'Fresh water supply system',
    'Waste holding tank',
    'Hand washing stations',
    'LED lighting',
    'Ventilation system',
    'Non-slip flooring',
    'Professional fixtures',
    'Hand sanitizer dispensers',
    'Tissue and towel dispensers',
    'Regular maintenance service'
  ]

  return (
    <PageLayout>
      <PageHeader
        subtitle="Sanitation Solutions"
        title="Restroom Facilities"
        description="Professional portable restroom facilities designed for comfort, cleanliness, and convenience. Perfect for construction sites, events, and temporary installations."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: 'Restroom Facilities', href: '/solutions/restroom-facilities' }
        ]}
      />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature: any, index: number) => {
              const IconComponent = typeof feature.icon === 'string' ? iconMap[feature.icon as keyof typeof iconMap] : feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-600 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Specifications Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Available Configurations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From single units for small projects to multi-stall complexes for large sites and events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specifications.map((spec: any, index: number) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={spec.image}
                    alt={spec.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-600 mb-2">{spec.title}</h3>
                  <div className="space-y-2 mb-4 text-gray-600">
                    <div>Size: {spec.size}</div>
                    <div>Capacity: {spec.capacity}</div>
                  </div>
                  <div className="text-2xl font-bold text-steel-500 mb-4">{spec.price}</div>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy-600 mb-6">Complete Facilities</h2>
              <p className="text-xl text-gray-600 mb-8">
                Every restroom facility comes fully equipped with professional-grade fixtures and regular maintenance service.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {included.map((item: string, index: number) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/feature_restroom_professional_restroom_facility_cl.webp"
                alt="Professional restroom facility"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContentWrapper 
        pageType="solution" 
        pageSlug="restroom-facilities"
        defaultTitle="Why Choose Our Restroom Facilities?"
      />

      {/* FAQ Section */}
      <FAQ faqs={solutionsFAQs} />

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Need Restroom Facilities?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Professional, clean, and convenient restroom solutions for any project or event.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get Quote Today
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              Call (866) 819-9017
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
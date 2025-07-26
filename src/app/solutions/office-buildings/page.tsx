import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import SEOContentWrapper from '@/components/SEOContentWrapper'
import { Building2, Users, Zap, Shield, ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import PageFAQs from '@/components/PageFAQs'
import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase'

export const metadata = {
  title: 'Modular Office Buildings - Rent, Buy, Lease | Modular Building Solutions',
  description: 'Professional modular office buildings for construction sites, temporary offices, and permanent installations. Flexible rental, purchase, and lease options available.',
}

// Fetch CMS data from Supabase
async function getSolutionData() {
  try {
    const { data, error } = await supabaseAdmin
      .from('solutions')
      .select('*')
      .eq('slug', 'office-buildings')
      .single()

    if (error) {
      console.error('Error fetching solution data:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Error fetching solution data:', error)
    return null
  }
}

export default async function OfficeBuildingsPage() {
  // Fetch CMS data
  const solutionData = await getSolutionData()
  
  const locationName = undefined
  const locationType = undefined  
  const stateName = undefined
  // Icon mapping for features
  const iconMap = {
    Building2,
    Users,
    Zap,
    Shield
  }

  // Use CMS feature cards or fallback to hardcoded data
  const features = solutionData?.feature_cards || [
    {
      icon: 'Building2',
      title: 'Professional Design',
      description: 'Modern interior finishes and professional appearance suitable for any business environment.'
    },
    {
      icon: 'Users',
      title: 'Flexible Capacity',
      description: 'Available in sizes from 2-person offices to large conference rooms and multi-room complexes.'
    },
    {
      icon: 'Zap',
      title: 'Quick Setup',
      description: 'Fast delivery and professional installation, typically ready for occupancy within days.'
    },
    {
      icon: 'Shield',
      title: 'Code Compliant',
      description: 'All units meet local building codes and ADA accessibility requirements.'
    }
  ]

  // Use CMS specifications or fallback to hardcoded data
  const specifications = solutionData?.specifications || [
    {
      title: 'Single Office',
      size: '8\' x 20\'',
      capacity: '2-4 people',
      price: 'Starting at $850/month',
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
    },
    {
      title: 'Double Office',
      size: '16\' x 20\'',
      capacity: '4-8 people',
      price: 'Starting at $1,200/month',
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_double_double_office_modular_building_inter.webp'
    },
    {
      title: 'Conference Room',
      size: '12\' x 24\'',
      capacity: '8-12 people',
      price: 'Starting at $1,500/month',
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_conference_conference_room_modular_building.webp'
    },
    {
      title: 'Multi-Room Complex',
      size: '24\' x 60\'',
      capacity: '15-25 people',
      price: 'Starting at $2,800/month',
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_complex_multi_room_office_complex_interior.webp'
    }
  ]

  // Use CMS included items or fallback to hardcoded data
  const included = solutionData?.included_items || [
    'Professional interior finishes',
    'Climate control (heating & cooling)',
    'Electrical system with outlets',
    'LED lighting throughout',
    'Professional flooring',
    'Windows with blinds',
    'Entry door with lock',
    'ADA-compliant options available'
  ]

  const getLocationDisplayName = () => {
    if (locationType === 'city' && stateName) {
      return `${locationName}, ${stateName}`
    }
    return locationName || ''
  }

  const pageTitle = locationName 
    ? `Office Buildings in ${getLocationDisplayName()}`
    : "Modular Office Buildings"

  const pageDescription = locationName
    ? `Professional modular office spaces in ${getLocationDisplayName()}. Perfect for construction sites, temporary offices, and permanent installations with flexible rental, purchase, and lease options.`
    : "Professional modular office spaces designed for productivity and comfort. Perfect for construction sites, temporary offices, and permanent installations with flexible rental, purchase, and lease options."

  const breadcrumbs = locationName
    ? [
        { label: 'Home', href: '/' },
        { label: 'Solutions', href: '/solutions' },
        { label: 'Office Buildings', href: '/solutions/office-buildings' },
        { label: getLocationDisplayName(), href: '#' }
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Solutions', href: '/solutions' },
        { label: 'Office Buildings', href: '/solutions/office-buildings' }
      ]

  return (
    <PageLayout>
      <PageHeader
        subtitle="Professional Solutions"
        title={pageTitle}
        description={pageDescription}
        breadcrumbs={breadcrumbs}
      />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = typeof feature.icon === 'string' ? iconMap[feature.icon] : feature.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-full mb-6">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-4">{feature.title}</h3>
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
            <h2 className="text-4xl font-bold text-primary mb-6">
              {solutionData?.specifications_title || 'Available Configurations'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {solutionData?.specifications_subtitle || 'Choose from our standard configurations or let us customize a solution for your specific needs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specifications.map((spec, index) => (
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
                  <h3 className="text-xl font-bold text-primary mb-2">{spec.title}</h3>
                  <div className="space-y-2 mb-4 text-gray-600">
                    <div>Size: {spec.size}</div>
                    <div>Capacity: {spec.capacity}</div>
                  </div>
                  <div className="text-2xl font-bold text-steel-500 mb-4">{spec.price}</div>
                  <Link href="/quote">
                    <Button variant="outline" className="w-full">
                      Learn More
                    </Button>
                  </Link>
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
              <h2 className="text-4xl font-bold text-primary mb-6">What's Included</h2>
              <p className="text-xl text-gray-600 mb-8">
                Every modular office building comes fully equipped and ready for immediate occupancy.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {included.map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/feature_office_professional_office_interior_modern.webp"
                alt="Professional office interior"
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
        pageSlug="office-buildings"
        defaultTitle="Why Choose Our Modular Office Buildings?"
      />

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <PageFAQs 
            pageSlug="office-buildings"
            title="Office Buildings FAQs"
            subtitle="Common questions about our modular office building solutions"
            showSearch={false}
            showFilters={false}
            showFeatured={false}
            showCategories={false}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a custom quote for your modular office building project. We'll work with you to find the perfect solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <Button variant="gradient" size="xl" className="group">
                Get Custom Quote
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="tel:8668199017">
              <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
                Call (866) 819-9017
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
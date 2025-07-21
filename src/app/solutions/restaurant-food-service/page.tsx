import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import SEOContentWrapper from '@/components/SEOContentWrapper'
import { ChefHat, Utensils, Users, Shield, ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FAQ from '@/components/FAQ'
import { solutionsFAQs } from '@/data/faq-data'

export const metadata = {
  title: 'Restaurant & Food Service Buildings - Commercial Kitchens | Aman Modular',
  description: 'Modular restaurant and food service buildings with commercial kitchens. Health code compliant, fully equipped, and ready for food service operations.',
}

export default function RestaurantFoodServicePage() {
  const features = [
    {
      icon: ChefHat,
      title: 'Commercial Grade',
      description: 'Professional commercial kitchen equipment and food-safe construction materials.'
    },
    {
      icon: Utensils,
      title: 'Health Code Compliant',
      description: 'Meets all health department requirements and food safety regulations.'
    },
    {
      icon: Users,
      title: 'Flexible Layouts',
      description: 'Customizable configurations for quick-service, full-service, or catering operations.'
    },
    {
      icon: Shield,
      title: 'Safety Systems',
      description: 'Advanced fire suppression, ventilation, and safety systems for commercial cooking.'
    }
  ]

  const specifications = [
    {
      title: 'Food Truck Kitchen',
      size: '8\' x 16\'',
      capacity: '2-3 staff',
      price: 'Starting at $2,800/month',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop'
    },
    {
      title: 'Quick Service Restaurant',
      size: '12\' x 24\'',
      capacity: '4-6 staff',
      price: 'Starting at $4,200/month',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop'
    },
    {
      title: 'Full Service Kitchen',
      size: '16\' x 32\'',
      capacity: '8-12 staff',
      price: 'Starting at $6,800/month',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop'
    },
    {
      title: 'Catering Complex',
      size: '20\' x 40\'',
      capacity: '15+ staff',
      price: 'Starting at $9,500/month',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    }
  ]

  const kitchenFeatures = [
    'Commercial-grade cooking equipment',
    'Stainless steel prep surfaces',
    'NSF certified fixtures',
    'Grease trap systems',
    'Fire suppression system',
    'Commercial dishwashing station',
    'Walk-in cooler/freezer options',
    'Point-of-sale ready wiring',
    'Health department approved layouts',
    'Commercial ventilation system'
  ]

  const applications = [
    {
      title: 'Pop-Up Restaurants',
      description: 'Temporary dining concepts and seasonal restaurant operations.',
      image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=250&fit=crop'
    },
    {
      title: 'Catering Operations',
      description: 'Commercial kitchens for catering businesses and event food service.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop'
    },
    {
      title: 'Event Food Service',
      description: 'Temporary food service for festivals, fairs, and large events.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=250&fit=crop'
    },
    {
      title: 'Franchise Expansion',
      description: 'Quick deployment for restaurant franchises and chain expansions.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=250&fit=crop'
    }
  ]

  return (
    <PageLayout>
      <PageHeader
        subtitle="Food Service Solutions"
        title="Restaurant & Food Service"
        description="Professional modular restaurant and food service buildings with commercial kitchens. Health code compliant, fully equipped, and ready for immediate food service operations."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: 'Restaurant & Food Service', href: '/solutions/restaurant-food-service' }
        ]}
      />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-navy-600 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="relative h-96 rounded-2xl overflow-hidden mb-12">
            <Image
              src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop"
              alt="Modern commercial kitchen interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-600/80 to-transparent flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-lg text-white">
                  <h3 className="text-3xl font-bold mb-4">Built for Food Service</h3>
                  <p className="text-xl text-blue-100">
                    Every kitchen is designed with food safety and operational efficiency in mind, featuring commercial-grade equipment and health code compliance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Food Service Configurations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From food truck kitchens to full catering complexes, we have solutions for every food service operation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specifications.map((spec, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
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

      {/* Kitchen Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy-600 mb-6">Commercial Kitchen Features</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our food service buildings come equipped with professional-grade kitchen equipment and features designed for commercial food operations.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kitchenFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop"
                alt="Commercial kitchen with professional equipment"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Food Service Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our food service buildings serve a wide range of culinary applications across different business models and events.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {applications.map((application, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={application.image}
                    alt={application.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-600 mb-3">{application.title}</h3>
                  <p className="text-gray-600">{application.description}</p>
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
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Why Choose Our Food Service Buildings?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-600 mb-4">Health Code Compliance</h3>
              <p className="text-gray-600 leading-relaxed">Built to meet all health department requirements and food safety regulations for commercial operations.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                <ChefHat className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-600 mb-4">Professional Equipment</h3>
              <p className="text-gray-600 leading-relaxed">Commercial-grade kitchen equipment and appliances designed for high-volume food service operations.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-600 mb-4">Operational Efficiency</h3>
              <p className="text-gray-600 leading-relaxed">Optimized layouts and workflow design for maximum efficiency and staff productivity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContentWrapper 
        pageType="solution" 
        pageSlug="restaurant-food-service"
        defaultTitle="Why Choose Our Restaurant & Food Service Buildings?"
      />

      {/* FAQ Section */}
      <FAQ faqs={solutionsFAQs} />

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Launch Your Food Service Business
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Professional food service buildings with commercial kitchens ready for immediate operation. Get started with your culinary venture today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get Food Service Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              Kitchen Consultation
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
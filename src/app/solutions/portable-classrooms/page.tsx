import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import SEOContentWrapper from '@/components/SEOContentWrapper'
import { GraduationCap, Users, Book, Shield, ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FAQ from '@/components/FAQ'
import { solutionsFAQs } from '@/data/faq-data'

export const metadata = {
  title: 'Portable Classrooms - Educational Modular Buildings | Aman Modular',
  description: 'Professional portable classrooms for schools and educational facilities. ADA compliant, energy efficient, and designed for modern learning environments.',
}

export default function PortableClassroomsPage() {
  const features = [
    {
      icon: GraduationCap,
      title: 'Educational Design',
      description: 'Purpose-built for learning with optimal acoustics, lighting, and classroom layout.'
    },
    {
      icon: Users,
      title: 'Flexible Capacity',
      description: 'Available in sizes from 20-30 students with options for different grade levels.'
    },
    {
      icon: Book,
      title: 'Technology Ready',
      description: 'Pre-wired for smart boards, computers, and modern educational technology.'
    },
    {
      icon: Shield,
      title: 'Safety Compliant',
      description: 'Meets all educational building codes, fire safety, and ADA accessibility requirements.'
    }
  ]

  const specifications = [
    {
      title: 'Standard Classroom',
      size: '24\' x 32\'',
      capacity: '20-25 students',
      price: 'Starting at $1,200/month',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop'
    },
    {
      title: 'Large Classroom',
      size: '28\' x 40\'',
      capacity: '25-30 students',
      price: 'Starting at $1,500/month',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop'
    },
    {
      title: 'Science Lab',
      size: '24\' x 40\'',
      capacity: '20-24 students',
      price: 'Starting at $1,800/month',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop'
    },
    {
      title: 'Multi-Purpose Room',
      size: '32\' x 40\'',
      capacity: '30-40 students',
      price: 'Starting at $2,200/month',
      image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop'
    }
  ]

  const included = [
    'Energy-efficient HVAC system',
    'LED lighting with dimmer controls',
    'Sound insulation for optimal acoustics',
    'Technology infrastructure (data/power)',
    'Smart board mounting capability',
    'Student storage solutions',
    'Teacher desk and storage',
    'Emergency exits and safety features',
    'ADA compliant accessibility',
    'Fire suppression system'
  ]

  return (
    <PageLayout>
      <PageHeader
        subtitle="Educational Solutions"
        title="Portable Classrooms"
        description="Modern portable classrooms designed for optimal learning environments. Energy efficient, technology-ready, and fully compliant with educational building standards."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: 'Portable Classrooms', href: '/solutions/portable-classrooms' }
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
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=400&fit=crop"
              alt="Modern portable classroom interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-600/80 to-transparent flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-lg text-white">
                  <h3 className="text-3xl font-bold mb-4">Built for Learning</h3>
                  <p className="text-xl text-blue-100">
                    Every classroom is designed with education in mind, featuring optimal lighting, acoustics, and technology integration.
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
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Classroom Configurations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From standard classrooms to specialized learning environments, we have solutions for every educational need.
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

      {/* What's Included */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Standard Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every portable classroom comes fully equipped with everything needed for a modern learning environment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {included.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <span className="text-gray-700 font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop"
                alt="Students in modern classroom"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-navy-600 mb-6">Why Choose Our Classrooms?</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-steel-500 mb-2">Quick Installation</h3>
                  <p className="text-gray-600">Minimal disruption to your school schedule with professional installation typically completed in 1-2 days.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-steel-500 mb-2">Energy Efficient</h3>
                  <p className="text-gray-600">Advanced insulation and HVAC systems reduce operating costs while maintaining comfortable learning conditions.</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-steel-500 mb-2">Flexible Terms</h3>
                  <p className="text-gray-600">Rent short-term for renovations or long-term for enrollment growth. Purchase and lease options also available.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContentWrapper 
        pageType="solution" 
        pageSlug="portable-classrooms"
        defaultTitle="Why Choose Our Portable Classrooms?"
      />

      {/* FAQ Section */}
      <FAQ faqs={solutionsFAQs} />

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Expand Your School's Capacity
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Whether you need temporary space during renovations or permanent capacity expansion, we have the perfect classroom solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get Educational Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              Schedule Site Visit
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
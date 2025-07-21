import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import SEOContentWrapper from '@/components/SEOContentWrapper'
import { Shield, Camera, Lock, Users, ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FAQ from '@/components/FAQ'
import { solutionsFAQs } from '@/data/faq-data'

export const metadata = {
  title: 'Security Buildings & Guard Houses - Access Control | Aman Modular',
  description: 'Professional security buildings and guard houses for access control, perimeter security, and checkpoint operations. Customizable security solutions.',
}

export default function SecurityBuildingsPage() {
  const features = [
    {
      icon: Shield,
      title: 'Security-First Design',
      description: 'Purpose-built for security operations with reinforced construction and strategic sight lines.'
    },
    {
      icon: Camera,
      title: 'Surveillance Ready',
      description: 'Pre-wired for security cameras, monitors, and advanced surveillance equipment integration.'
    },
    {
      icon: Lock,
      title: 'Access Control',
      description: 'Integrated access control systems with card readers, intercoms, and barrier gate controls.'
    },
    {
      icon: Users,
      title: 'Multi-Person Capacity',
      description: 'Available in sizes from single-guard stations to multi-officer security command centers.'
    }
  ]

  const specifications = [
    {
      title: 'Guard Booth',
      size: '4\' x 6\'',
      capacity: '1 officer',
      price: 'Starting at $350/month',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop'
    },
    {
      title: 'Security Station',
      size: '8\' x 10\'',
      capacity: '2-3 officers',
      price: 'Starting at $650/month',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop'
    },
    {
      title: 'Checkpoint Building',
      size: '12\' x 16\'',
      capacity: '4-6 officers',
      price: 'Starting at $1,200/month',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop'
    },
    {
      title: 'Command Center',
      size: '16\' x 24\'',
      capacity: '8+ officers',
      price: 'Starting at $2,400/month',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    }
  ]

  const securityFeatures = [
    'Bullet-resistant glass options',
    'Reinforced steel construction',
    'Climate control systems',
    'Emergency communication systems',
    'Multiple entry/exit points',
    'Secure document storage',
    'Equipment mounting systems',
    'Backup power capabilities',
    'Perimeter lighting integration',
    'Alarm system compatibility'
  ]

  const applications = [
    {
      title: 'Corporate Campus Security',
      description: 'Main gate security stations for corporate facilities and business parks.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop'
    },
    {
      title: 'Government Facilities',
      description: 'High-security checkpoints for government buildings and military installations.',
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=250&fit=crop'
    },
    {
      title: 'Industrial Sites',
      description: 'Perimeter security for manufacturing facilities, warehouses, and industrial complexes.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop'
    },
    {
      title: 'Event Security',
      description: 'Temporary security stations for large events, festivals, and public gatherings.',
      image: 'https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=400&h=250&fit=crop'
    }
  ]

  return (
    <PageLayout>
      <PageHeader
        subtitle="Security Solutions"
        title="Security Buildings"
        description="Professional security buildings and guard houses designed for access control, perimeter security, and checkpoint operations. Customizable solutions for any security requirement."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: 'Security Buildings', href: '/solutions/security-buildings' }
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
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop"
              alt="Modern security checkpoint building"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-600/80 to-transparent flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-lg text-white">
                  <h3 className="text-3xl font-bold mb-4">Built for Security</h3>
                  <p className="text-xl text-blue-100">
                    Every security building is designed with safety and functionality in mind, featuring reinforced construction and advanced security integration.
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
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Security Building Options</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From single-guard booths to multi-officer command centers, we have security solutions for every application.
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

      {/* Security Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy-600 mb-6">Advanced Security Features</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our security buildings come equipped with professional-grade features designed for maximum safety and operational efficiency.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {securityFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop"
                alt="Security checkpoint with advanced features"
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
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Security Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our security buildings serve a wide range of applications across different industries and security requirements.
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
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Why Choose Our Security Buildings?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-600 mb-4">Enhanced Security</h3>
              <p className="text-gray-600 leading-relaxed">Reinforced construction and security-focused design provide superior protection and deterrence.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                <Camera className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-600 mb-4">Technology Integration</h3>
              <p className="text-gray-600 leading-relaxed">Pre-wired for modern security systems, cameras, and access control equipment.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-600 mb-4">Operational Efficiency</h3>
              <p className="text-gray-600 leading-relaxed">Designed for optimal workflow and officer comfort during extended security operations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContentWrapper 
        pageType="solution" 
        pageSlug="security-buildings"
        defaultTitle="Why Choose Our Security Buildings?"
      />

      {/* FAQ Section */}
      <FAQ faqs={solutionsFAQs} />

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Secure Your Facility Today
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Professional security buildings designed for maximum protection and operational efficiency. Get a custom security solution for your facility.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get Security Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              Security Consultation
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
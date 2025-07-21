import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import SEOContentWrapper from '@/components/SEOContentWrapper'
import { Heart, Shield, Stethoscope, Users, ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import FAQ from '@/components/FAQ'
import { solutionsFAQs } from '@/data/faq-data'

export const metadata = {
  title: 'Healthcare Facilities - Medical Modular Buildings | Aman Modular',
  description: 'Professional healthcare facilities and medical modular buildings. HIPAA compliant, medical-grade construction, and designed for patient care environments.',
}

export default function HealthcareFacilitiesPage() {
  const features = [
    {
      icon: Heart,
      title: 'Medical Grade',
      description: 'Medical-grade materials, finishes, and infection control features for healthcare environments.'
    },
    {
      icon: Shield,
      title: 'HIPAA Compliant',
      description: 'Privacy-focused design and security features to ensure HIPAA compliance and patient confidentiality.'
    },
    {
      icon: Stethoscope,
      title: 'Equipment Ready',
      description: 'Pre-configured for medical equipment with specialized electrical and gas systems.'
    },
    {
      icon: Users,
      title: 'Patient Focused',
      description: 'ADA compliant design with patient comfort and accessibility as primary considerations.'
    }
  ]

  const specifications = [
    {
      title: 'Examination Room',
      size: '8\' x 12\'',
      capacity: '1 patient + staff',
      price: 'Starting at $1,800/month',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop'
    },
    {
      title: 'Medical Clinic',
      size: '12\' x 24\'',
      capacity: '4-6 exam rooms',
      price: 'Starting at $3,200/month',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=300&fit=crop'
    },
    {
      title: 'Emergency Medical Unit',
      size: '16\' x 32\'',
      capacity: '8-10 treatment areas',
      price: 'Starting at $5,800/month',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop'
    },
    {
      title: 'Medical Complex',
      size: '24\' x 48\'',
      capacity: '15+ treatment rooms',
      price: 'Starting at $8,500/month',
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop'
    }
  ]

  const medicalFeatures = [
    'Medical-grade air filtration systems',
    'Infection control surfaces',
    'HIPAA compliant layouts',
    'Emergency power systems',
    'Medical gas supply ready',
    'Specialized lighting systems',
    'Temperature controlled environments',
    'Secure medical record storage',
    'ADA accessibility features',
    'Biohazard waste management'
  ]

  const applications = [
    {
      title: 'Temporary Clinics',
      description: 'Mobile medical clinics and temporary healthcare facilities for underserved areas.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop'
    },
    {
      title: 'Emergency Response',
      description: 'Rapid deployment medical facilities for disaster relief and emergency healthcare.',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop'
    },
    {
      title: 'Hospital Expansion',
      description: 'Additional patient care space during hospital renovations or capacity increases.',
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=250&fit=crop'
    },
    {
      title: 'Specialty Care Centers',
      description: 'Specialized medical facilities for testing, treatment, and specialized care.',
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=250&fit=crop'
    }
  ]

  return (
    <PageLayout>
      <PageHeader
        subtitle="Healthcare Solutions"
        title="Healthcare Facilities"
        description="Professional healthcare facilities and medical modular buildings designed for patient care. HIPAA compliant, medical-grade construction, and equipped for comprehensive healthcare delivery."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Solutions', href: '/solutions' },
          { label: 'Healthcare Facilities', href: '/solutions/healthcare-facilities' }
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
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=400&fit=crop"
              alt="Modern healthcare facility interior"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy-600/80 to-transparent flex items-center">
              <div className="container mx-auto px-4">
                <div className="max-w-lg text-white">
                  <h3 className="text-3xl font-bold mb-4">Built for Healthcare</h3>
                  <p className="text-xl text-blue-100">
                    Every healthcare facility is designed with patient safety and care quality in mind, featuring medical-grade construction and compliance standards.
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
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Healthcare Facility Options</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From single examination rooms to complete medical complexes, we provide healthcare solutions for every medical application.
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

      {/* Medical Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy-600 mb-6">Medical-Grade Features</h2>
              <p className="text-xl text-gray-600 mb-8">
                Our healthcare facilities incorporate specialized features and systems designed specifically for medical environments and patient care.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {medicalFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&h=400&fit=crop"
                alt="Healthcare facility with medical equipment"
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
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Healthcare Applications</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our healthcare facilities serve diverse medical applications from emergency response to specialized care delivery.
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
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Why Choose Our Healthcare Facilities?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-600 mb-4">Regulatory Compliance</h3>
              <p className="text-gray-600 leading-relaxed">Built to meet all healthcare regulations including HIPAA, ADA, and medical facility codes.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-600 mb-4">Patient-Centered Design</h3>
              <p className="text-gray-600 leading-relaxed">Designed with patient comfort, safety, and accessibility as the primary focus.</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-6">
                <Stethoscope className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy-600 mb-4">Medical Equipment Ready</h3>
              <p className="text-gray-600 leading-relaxed">Pre-configured infrastructure for medical equipment and specialized healthcare technology.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Content Section */}
      <SEOContentWrapper 
        pageType="solution" 
        pageSlug="healthcare-facilities"
        defaultTitle="Why Choose Our Healthcare Facilities?"
      />

      {/* FAQ Section */}
      <FAQ faqs={solutionsFAQs} />

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Enhance Your Healthcare Delivery
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Professional healthcare facilities designed for optimal patient care and medical operations. Get a custom healthcare solution today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get Healthcare Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              Medical Consultation
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
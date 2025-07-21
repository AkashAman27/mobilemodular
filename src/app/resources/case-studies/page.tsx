import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { FileText, Calendar, MapPin, Users, ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import FAQ from '@/components/FAQ'
import { resourcesFAQs } from '@/data/faq-data'

export const metadata = {
  title: 'Case Studies - Real Modular Building Success Stories | Aman Modular',
  description: 'Discover how organizations across industries have successfully implemented modular building solutions. Read detailed case studies and project outcomes.',
}

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: 'Riverside School District Classroom Expansion',
      slug: 'riverside-school-classroom-expansion',
      industry: 'Education',
      location: 'Riverside, CA',
      date: '2024',
      challenge: 'Needed 12 additional classrooms for growing enrollment while main building was under construction.',
      solution: 'Deployed 12 portable classrooms with full ADA compliance and technology integration.',
      results: ['Zero disruption to school year', '300 students accommodated', '18-month successful operation', 'Saved $2M vs permanent construction'],
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop',
      featured: true
    },
    {
      title: 'Metropolitan Hospital Emergency Expansion',
      slug: 'metropolitan-hospital-emergency-expansion',
      industry: 'Healthcare',
      location: 'Dallas, TX',
      date: '2024',
      challenge: 'Urgent need for additional patient care facilities during hospital renovation.',
      solution: 'Rapid deployment of medical-grade modular units with specialized HVAC and power systems.',
      results: ['24-hour installation', '50 additional patient beds', 'Full medical equipment integration', 'Maintained patient care quality'],
      image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&h=400&fit=crop',
      featured: true
    },
    {
      title: 'TechCorp Startup Office Campus',
      slug: 'techcorp-startup-office-campus',
      industry: 'Technology',
      location: 'Austin, TX',
      date: '2023',
      challenge: 'Fast-growing startup needed immediate office space for 100 employees.',
      solution: 'Modular office complex with modern amenities and flexible workspace design.',
      results: ['Immediate occupancy', '100 employees housed', 'Professional environment', '40% cost savings'],
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
      featured: false
    },
    {
      title: 'City Hall Renovation Project',
      slug: 'city-hall-renovation-project',
      industry: 'Government',
      location: 'Phoenix, AZ',
      date: '2023',
      challenge: 'City operations needed to continue during 2-year renovation project.',
      solution: 'Temporary government offices with security features and public access.',
      results: ['Uninterrupted city services', 'Secure document handling', 'Public accessibility maintained', '24-month operation'],
      image: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=600&h=400&fit=crop',
      featured: false
    },
    {
      title: 'Highway Construction Site Offices',
      slug: 'highway-construction-site-offices',
      industry: 'Construction',
      location: 'Interstate 95, FL',
      date: '2023',
      challenge: 'Multi-year highway project required on-site offices and facilities.',
      solution: 'Complete site office complex with meeting rooms, storage, and restroom facilities.',
      results: ['Mobile solution for 50-mile project', 'Weather-resistant construction', 'Improved project coordination', '3-year successful operation'],
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop',
      featured: false
    },
    {
      title: 'Emergency Response Command Center',
      slug: 'emergency-response-command-center',
      industry: 'Emergency Services',
      location: 'New Orleans, LA',
      date: '2023',
      challenge: 'Hurricane season required mobile command center for emergency response.',
      solution: 'Rapid-deployment command center with advanced communications and power systems.',
      results: ['2-hour deployment time', 'Full communication capabilities', 'Weather-resistant design', 'Successful emergency coordination'],
      image: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop',
      featured: false
    }
  ]

  const industries = ['All', 'Education', 'Healthcare', 'Technology', 'Government', 'Construction', 'Emergency Services']

  return (
    <PageLayout>
      <PageHeader
        subtitle="Success Stories"
        title="Case Studies"
        description="Discover how organizations across industries have successfully implemented modular building solutions. Real projects, real results, real success stories."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Case Studies', href: '/resources/case-studies' }
        ]}
      />

      {/* Industry Filter */}
      <section className="py-12 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            {industries.map((industry) => (
              <button
                key={industry}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  industry === 'All' 
                    ? 'bg-navy-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {industry}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Case Studies */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Featured Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Detailed case studies showcasing our most impactful modular building projects.
            </p>
          </div>

          <div className="space-y-16">
            {caseStudies.filter(study => study.featured).map((study, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="relative h-64 lg:h-auto">
                    <Image
                      src={study.image}
                      alt={study.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-8 lg:p-12">
                    <div className="flex items-center mb-4 text-sm text-gray-500">
                      <span className="bg-steel-100 text-steel-700 px-3 py-1 rounded-full mr-3">
                        {study.industry}
                      </span>
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="mr-3">{study.location}</span>
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{study.date}</span>
                    </div>
                    
                    <h3 className="text-3xl font-bold text-navy-600 mb-6">{study.title}</h3>
                    
                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Challenge:</h4>
                        <p className="text-gray-600">{study.challenge}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">Solution:</h4>
                        <p className="text-gray-600">{study.solution}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Results:</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {study.results.map((result, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-700">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Link href={`/resources/case-studies/${study.slug}`}>
                      <Button variant="outline" className="group">
                        Read Full Case Study
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Case Studies Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">More Success Stories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.filter(study => !study.featured).map((study, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3 text-sm text-gray-500">
                    <span className="bg-steel-100 text-steel-700 px-2 py-1 rounded text-xs mr-2">
                      {study.industry}
                    </span>
                    <span>{study.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-navy-600 mb-3">{study.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{study.challenge}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {study.results.slice(0, 2).map((result, idx) => (
                      <div key={idx} className="flex items-center text-xs text-gray-700">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1 flex-shrink-0" />
                        {result}
                      </div>
                    ))}
                  </div>
                  <Link href={`/resources/case-studies/${study.slug}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      Read More
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">Our Impact</h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Real numbers from real projects across diverse industries.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-xl text-blue-100 mb-1">Projects Completed</div>
              <div className="text-blue-200 text-sm">Across all industries</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">99%</div>
              <div className="text-xl text-blue-100 mb-1">Customer Satisfaction</div>
              <div className="text-blue-200 text-sm">Verified client feedback</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">$50M+</div>
              <div className="text-xl text-blue-100 mb-1">Client Savings</div>
              <div className="text-blue-200 text-sm">Compared to traditional construction</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-yellow-400 mb-2">24hr</div>
              <div className="text-xl text-blue-100 mb-1">Average Setup</div>
              <div className="text-blue-200 text-sm">From delivery to occupancy</div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ faqs={resourcesFAQs} />

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-navy-600 mb-6">
            Ready to Create Your Success Story?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have transformed their operations with our modular building solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-navy-600 text-navy-600 hover:bg-navy-600 hover:text-white">
              Download Case Studies
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
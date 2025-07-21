import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Users, Building, Target } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { PageLayout } from '@/components/layout/PageLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import { industries } from '@/data/demo-data'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Industries We Serve - Modular Building Solutions',
  description: 'Specialized modular building solutions for education, construction, healthcare, government, retail, and emergency response industries.',
  keywords: 'modular buildings, portable buildings, construction site offices, portable classrooms, healthcare facilities, government buildings',
  openGraph: {
    title: 'Industries We Serve - Modular Building Solutions',
    description: 'Specialized modular building solutions for education, construction, healthcare, government, retail, and emergency response industries.',
    type: 'website',
    url: '/industries',
    siteName: 'Aman Modular Buildings'
  }
}

export default function IndustriesPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Industries We Serve"
        description="Specialized modular building solutions tailored to meet the unique needs of different industries"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Industries' }
        ]}
      />

      <div className="py-16">
        <div className="container mx-auto px-4">
          {/* Overview Section */}
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Trusted Across Industries
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              With decades of experience, we understand that every industry has unique requirements. 
              Our modular building solutions are designed to meet specific regulations, workflows, and 
              operational needs across diverse sectors.
            </p>
          </div>

          {/* Industries Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {industries.map((industry) => (
              <Card key={industry.id} className="group hover:shadow-lg transition-all duration-300">
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={industry.imageUrl}
                    alt={industry.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {industry.caseStudies} Case Studies
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="text-xl">{industry.name}</CardTitle>
                  <CardDescription>{industry.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-4">
                    <h4 className="font-medium text-gray-800 mb-2">Available Solutions:</h4>
                    <div className="flex flex-wrap gap-2">
                      {industry.solutions.slice(0, 3).map((solutionId) => (
                        <Badge key={solutionId} variant="outline" className="text-xs">
                          {solutionId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      ))}
                      {industry.solutions.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{industry.solutions.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center text-sm text-gray-600">
                      <Building className="h-4 w-4 mr-1" />
                      <span>{industry.solutions.length} Solutions</span>
                    </div>
                    <Link href={`/industries/${industry.id}`}>
                      <Button variant="ghost" size="sm" className="group">
                        Learn More
                        <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <div className="bg-gradient-to-br from-primary to-steel-500 rounded-2xl p-8 lg:p-12 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                Why Industries Choose Our Solutions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-white">Industry Expertise</h3>
                  <p className="text-blue-100">
                    Deep understanding of industry-specific regulations, codes, and operational requirements
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-white">Custom Solutions</h3>
                  <p className="text-blue-100">
                    Tailored modular buildings designed to meet your specific workflow and space needs
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg mb-3 text-white">Proven Track Record</h3>
                  <p className="text-blue-100">
                    Hundreds of successful projects across industries with satisfied customers nationwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Find Your Industry Solution?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our industry experts are ready to help you find the perfect modular building solution 
              for your specific needs and requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/quote">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Get Industry-Specific Quote
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Speak with an Expert
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
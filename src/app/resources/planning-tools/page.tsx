import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { Calculator, Ruler, DollarSign, Clock, Building, Users, Settings, FileText, ArrowRight, CheckCircle, Download } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'

// Client-side AI Calculator Component
import AISmartCalculator from '@/components/ai/AISmartCalculator'

// Generate metadata for SEO
export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/resources/planning-tools')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Planning Tools & Calculators | Modular Building Solutions'
  const fallbackDescription = 'Interactive calculators and planning tools to help you determine size, cost, and requirements for your modular building project. Plan with confidence using our expert tools.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/resources/planning-tools`
  )
}

interface PlanningTool {
  id: string
  name: string
  description: string
  icon_name: string
  category: string
  data: any
  order_index: number
}

async function getPlanningToolsData() {
  const supabase = createClient()
  
  const result = await supabase
    .from('planning_tools')
    .select('*')
    .eq('is_active', true)
    .order('order_index')

  return result.data || []
}

export default async function PlanningToolsPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/resources/planning-tools')
  const planningTools = await getPlanningToolsData()

  // Define interactive calculators
  const calculators = [
    {
      title: 'Size Calculator',
      description: 'Determine the optimal building size based on your space requirements and occupancy needs.',
      icon: Ruler,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      fields: [
        { name: 'occupancy', label: 'Number of Occupants', type: 'number', placeholder: '25' },
        { name: 'purpose', label: 'Primary Use', type: 'select', options: ['Office Space', 'Classroom', 'Storage', 'Healthcare', 'Retail'] },
        { name: 'equipment', label: 'Special Equipment', type: 'select', options: ['None', 'Basic Office', 'Medical Equipment', 'Heavy Machinery'] }
      ],
      result: '1,200 - 1,500 sq ft recommended'
    },
    {
      title: 'Cost Estimator',
      description: 'Get preliminary cost estimates for rental, lease, or purchase options.',
      icon: DollarSign,
      color: 'from-green-600 to-green-700',
      bgColor: 'bg-green-50',
      fields: [
        { name: 'size', label: 'Square Footage', type: 'number', placeholder: '1200' },
        { name: 'type', label: 'Building Type', type: 'select', options: ['Office Building', 'Portable Classroom', 'Storage Unit', 'Healthcare Facility'] },
        { name: 'option', label: 'Preferred Option', type: 'select', options: ['Rental', 'Lease-to-Own', 'Purchase'] }
      ],
      result: '$2,400 - $3,200 per month (rental)'
    },
    {
      title: 'Timeline Planner',
      description: 'Plan your project timeline from order to installation and occupancy.',
      icon: Clock,
      color: 'from-purple-600 to-purple-700',
      bgColor: 'bg-purple-50',
      fields: [
        { name: 'complexity', label: 'Project Complexity', type: 'select', options: ['Standard', 'Custom', 'Complex Multi-Unit'] },
        { name: 'permits', label: 'Permits Required', type: 'select', options: ['Standard', 'Special Use', 'Healthcare/School'] },
        { name: 'site', label: 'Site Preparation', type: 'select', options: ['Minimal', 'Standard', 'Extensive'] }
      ],
      result: '18 - 25 business days total'
    },
    {
      title: 'Site Requirements',
      description: 'Determine site preparation needs and utility requirements for your project.',
      icon: Building,
      color: 'from-orange-600 to-orange-700',
      bgColor: 'bg-orange-50',
      fields: [
        { name: 'terrain', label: 'Site Terrain', type: 'select', options: ['Level', 'Slight Slope', 'Steep Slope', 'Uneven'] },
        { name: 'access', label: 'Access Requirements', type: 'select', options: ['Standard', 'Restricted', 'Crane Required'] },
        { name: 'utilities', label: 'Existing Utilities', type: 'select', options: ['All Available', 'Partial', 'None'] }
      ],
      result: 'Standard foundation and utility connections'
    }
  ]

  // Planning resources
  const planningResources = [
    {
      title: 'Project Planning Guide',
      description: 'Comprehensive guide covering all aspects of modular building projects.',
      icon: FileText,
      downloadUrl: '/downloads/project-planning-guide.pdf',
      type: 'PDF Guide'
    },
    {
      title: 'Site Preparation Checklist',
      description: 'Essential checklist for preparing your site before installation.',
      icon: CheckCircle,
      downloadUrl: '/downloads/site-preparation-checklist.pdf',
      type: 'Checklist'
    },
    {
      title: 'Building Code Requirements',
      description: 'Overview of common building codes and compliance requirements.',
      icon: Settings,
      downloadUrl: '/downloads/building-code-requirements.pdf',
      type: 'Reference'
    },
    {
      title: 'ROI Calculator Worksheet',
      description: 'Calculate return on investment for your modular building project.',
      icon: Calculator,
      downloadUrl: '/downloads/roi-calculator.xlsx',
      type: 'Excel Tool'
    }
  ]

  return (
    <PageLayout>
      {/* Structured Data */}
      <StructuredData
        type="WebPage"
        data={{
          name: 'Planning Tools & Calculators',
          description: 'Interactive planning tools and calculators for modular building projects',
          url: `${seoSettings.site_url}/resources/planning-tools`,
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: calculators.map((calc, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: calc.title,
              description: calc.description
            }))
          }
        }}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <PageHeader
        subtitle="Resources"
        title="Planning Tools & Calculators"
        description="Use our interactive tools to plan your modular building project with precision. Get accurate estimates, timelines, and requirements to make informed decisions."
        backgroundImage="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/hero_background_modern_modular_building_complex_ae.webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Planning Tools', href: '/resources/planning-tools' }
        ]}
      />

      {/* AI Smart Calculator */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">🤖 AI-Powered Smart Calculator</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience our revolutionary AI calculator that provides intelligent recommendations based on your specific needs, location, and real-time market conditions.
            </p>
          </div>

          <div className="max-w-6xl mx-auto mb-16">
            <AISmartCalculator />
          </div>
        </div>
      </section>

      {/* Traditional Calculators */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Additional Planning Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Quick calculation tools for specific requirements and comparisons.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {calculators.map((calculator, index) => {
              const IconComponent = calculator.icon
              
              return (
                <Card key={index} className={`${calculator.bgColor} border-0 overflow-hidden`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className={`p-3 bg-gradient-to-r ${calculator.color} rounded-lg`}>
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl text-navy-600">{calculator.title}</CardTitle>
                    <p className="text-gray-600">{calculator.description}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {calculator.fields.map((field, fieldIndex) => (
                      <div key={fieldIndex} className="space-y-2">
                        <Label htmlFor={`${calculator.title}-${field.name}`} className="text-sm font-medium">
                          {field.label}
                        </Label>
                        {field.type === 'select' ? (
                          <Select>
                            <SelectTrigger className="bg-white">
                              <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                            </SelectTrigger>
                            <SelectContent>
                              {field.options?.map((option, optionIndex) => (
                                <SelectItem key={optionIndex} value={option.toLowerCase().replace(/\s+/g, '-')}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            id={`${calculator.title}-${field.name}`}
                            type={field.type}
                            placeholder={field.placeholder}
                            className="bg-white"
                          />
                        )}
                      </div>
                    ))}
                    
                    <div className="pt-4 border-t">
                      <Button className={`w-full bg-gradient-to-r ${calculator.color}`}>
                        Calculate
                      </Button>
                      <div className="mt-3 p-3 bg-white rounded-lg">
                        <p className="text-sm text-gray-600 mb-1">Sample Result:</p>
                        <p className="font-semibold text-navy-600">{calculator.result}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Planning Resources */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Planning Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Download our comprehensive planning guides and tools to support your project development.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {planningResources.map((resource, index) => {
              const IconComponent = resource.icon
              
              return (
                <Card key={index} className="bg-white hover:shadow-lg transition-shadow duration-300 group">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-600 rounded-full mb-4 group-hover:bg-steel-600 transition-colors">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-600 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <div className="text-xs text-steel-600 mb-4 bg-gray-50 px-2 py-1 rounded">
                      {resource.type}
                    </div>
                    <Button variant="outline" size="sm" className="w-full group-hover:bg-navy-600 group-hover:text-white group-hover:border-navy-600">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Expert Consultation */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">Need Expert Assistance?</h2>
            <p className="text-xl text-gray-600 mb-12">
              Our planning experts are available to help you navigate complex requirements and customize solutions for your unique needs.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-600 mb-2">Free Consultation</h3>
                <p className="text-gray-600">One-on-one planning session with our experts</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <FileText className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-600 mb-2">Custom Plans</h3>
                <p className="text-gray-600">Tailored project plans and specifications</p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                  <Settings className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-navy-600 mb-2">Technical Support</h3>
                <p className="text-gray-600">Ongoing support throughout your project</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="group">
                <Link href="/contact">
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/quote">
                  Get Detailed Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-navy-600">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">How Our Planning Tools Work</h2>
            <p className="text-xl text-steel-200 max-w-3xl mx-auto">
              Follow our simple 4-step process to plan your modular building project effectively.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Use Calculators', description: 'Input your requirements into our interactive tools' },
              { step: '2', title: 'Review Results', description: 'Get instant estimates and recommendations' },
              { step: '3', title: 'Download Resources', description: 'Access detailed guides and checklists' },
              { step: '4', title: 'Connect with Experts', description: 'Consult with our specialists for refinement' }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-steel-500 rounded-full mb-6">
                  <span className="text-2xl font-bold text-white">{step.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                <p className="text-steel-300">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Planning Your Project?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Use our planning tools to get started, then connect with our experts to bring your vision to life.
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
                Schedule Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
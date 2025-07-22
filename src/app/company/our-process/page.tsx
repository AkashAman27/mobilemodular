'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import SEOMetaTags from '@/components/SEOMetaTags'
import { 
  Phone, 
  Search, 
  Truck, 
  Settings, 
  CheckCircle, 
  Clock,
  Users,
  Shield,
  ArrowRight,
  Calendar,
  MapPin,
  Wrench
} from 'lucide-react'
import { PageLayout } from '@/components/layout'
import { Button } from '@/components/ui/button'

const processSteps = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "We discuss your specific needs, timeline, and requirements to understand your project scope.",
    icon: Phone,
    duration: "1-2 Days",
    details: [
      "Free consultation call or site visit",
      "Requirements analysis and needs assessment",
      "Budget discussion and initial pricing",
      "Timeline planning and project scoping"
    ],
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    title: "Site Assessment",
    description: "Our experts evaluate your site conditions and local requirements for optimal placement.",
    icon: Search,
    duration: "2-3 Days",
    details: [
      "Site survey and ground condition analysis",
      "Utility access and connection planning",
      "Permit requirements research",
      "Zoning and compliance verification"
    ],
    color: "from-green-500 to-green-600"
  },
  {
    id: 3,
    title: "Custom Design",
    description: "We create detailed plans and specifications tailored to your exact requirements.",
    icon: Settings,
    duration: "3-5 Days",
    details: [
      "Architectural planning and layout design",
      "Custom modifications and features",
      "Electrical and HVAC system design",
      "3D renderings and visual mockups"
    ],
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 4,
    title: "Permitting & Approval",
    description: "We handle all necessary permits and regulatory approvals for your project.",
    icon: Shield,
    duration: "5-10 Days",
    details: [
      "Building permit applications",
      "Local authority submissions",
      "Code compliance documentation",
      "Regulatory approval coordination"
    ],
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 5,
    title: "Manufacturing",
    description: "Your modular building is constructed in our controlled factory environment.",
    icon: Wrench,
    duration: "10-15 Days",
    details: [
      "Quality-controlled factory construction",
      "Custom modifications and installations",
      "Quality assurance inspections",
      "Final finishing and detailing"
    ],
    color: "from-red-500 to-red-600"
  },
  {
    id: 6,
    title: "Delivery & Setup",
    description: "Professional delivery and complete installation at your location.",
    icon: Truck,
    duration: "1-2 Days",
    details: [
      "Coordinated delivery scheduling",
      "Professional crane and placement",
      "Utility connections and hookups",
      "Final inspection and walkthrough"
    ],
    color: "from-teal-500 to-teal-600"
  },
  {
    id: 7,
    title: "Final Inspection",
    description: "Complete quality check and handover of your ready-to-use modular building.",
    icon: CheckCircle,
    duration: "1 Day",
    details: [
      "Comprehensive quality inspection",
      "Systems testing and verification",
      "Documentation and warranty handover",
      "Training on building features"
    ],
    color: "from-indigo-500 to-indigo-600"
  }
]

const benefits = [
  {
    icon: Clock,
    title: "Fast Turnaround",
    description: "Complete projects 50-75% faster than traditional construction",
    metric: "3-6 Weeks"
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Factory-controlled environment ensures consistent quality",
    metric: "99.5% Success Rate"
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Experienced professionals handling every aspect",
    metric: "25+ Years Experience"
  },
  {
    icon: MapPin,
    title: "Nationwide Service",
    description: "Serving customers across all 50 states",
    metric: "275+ Locations"
  }
]

export default function OurProcessPage() {
  const [processStepsState, setProcessStepsState] = useState(processSteps)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProcessSteps()
  }, [])

  const fetchProcessSteps = async () => {
    try {
      const response = await fetch('/api/process-steps')
      if (response.ok) {
        const data = await response.json()
        setProcessStepsState(data)
      } else {
        console.error('Failed to fetch process steps')
        // Fallback to hardcoded data if API fails
        setProcessStepsState(processSteps)
      }
    } catch (error) {
      console.error('Error fetching process steps:', error)
    } finally {
      setLoading(false)
    }
  }


  if (loading) {
    return (
      <PageLayout>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading process steps...</p>
          </div>
        </div>
      </PageLayout>
    )
  }

  return (
    <>
      <SEOMetaTags
        pagePath="/company/our-process"
        fallbackTitle="Our Proven 7-Step Process | Aman Modular Buildings"
        fallbackDescription="Discover our streamlined 7-step process for modular building construction. From consultation to final delivery, we ensure quality, efficiency, and transparency every step of the way."
        fallbackImage="https://amanmodular.com/images/process-hero.jpg"
      />
      <PageLayout>
        <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-navy-600 to-steel-600 text-white py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <h1 className="text-5xl font-bold mb-6">
                Our <span className="text-orange-400">Proven Process</span>
              </h1>
              <p className="text-xl mb-8 text-gray-200">
                From initial consultation to final delivery, we guide you through every step 
                of your modular building project with expertise and transparency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600" onClick={() => window.location.href = '/quote'}>
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-navy-600 bg-white border-white hover:bg-gray-100 hover:text-navy-700">
                  Download Process Guide
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Process Timeline */}
        <section className="py-20">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-navy-600 mb-4">
                7-Step Process to Success
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our streamlined process ensures your project is completed on time, 
                within budget, and to your exact specifications.
              </p>
            </motion.div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-teal-500"></div>

              {processStepsState.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`relative flex items-center mb-20 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  } flex-col lg:flex-row`}
                >
                  {/* Content Card */}
                  <div className={`w-full lg:w-5/12 ${index % 2 === 0 ? 'lg:pr-12' : 'lg:pl-12'}`}>
                    <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow duration-300">
                      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${step.color} text-white mb-6`}>
                        {React.createElement(step.icon, { className: "h-8 w-8" })}
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-2xl font-bold text-navy-600">
                          {step.title}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                          <Clock className="h-4 w-4 mr-1" />
                          {step.duration}
                        </div>
                      </div>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      
                      <ul className="space-y-2">
                        {step.details.map((detail, detailIndex) => (
                          <li key={detailIndex} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Timeline Node */}
                  <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 items-center justify-center w-12 h-12 bg-white border-4 border-gray-200 rounded-full shadow-lg">
                    <span className="text-lg font-bold text-navy-600">{step.id}</span>
                  </div>

                  {/* Mobile Timeline Node */}
                  <div className="lg:hidden flex items-center justify-center w-12 h-12 bg-gradient-to-r from-navy-500 to-steel-500 text-white rounded-full shadow-lg mb-4">
                    <span className="text-lg font-bold">{step.id}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold text-navy-600 mb-4">
                Why Choose Our Process?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our proven methodology delivers superior results with unmatched efficiency and quality.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white mb-6 group-hover:shadow-lg transition-shadow">
                    <benefit.icon className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-600 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {benefit.description}
                  </p>
                  <div className="text-2xl font-bold text-orange-500">
                    {benefit.metric}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-navy-600 to-steel-600 text-white">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center max-w-4xl mx-auto"
            >
              <h2 className="text-4xl font-bold mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl mb-8 text-gray-200">
                Let's discuss your needs and begin your modular building journey today. 
                Our experts are ready to guide you through every step.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600" onClick={() => window.location.href = '/quote'}>
                  Get Your Free Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-navy-600">
                  <Phone className="mr-2 h-5 w-5" />
                  Call (866) 819-9017
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
        </div>
      </PageLayout>
    </>
  )
}
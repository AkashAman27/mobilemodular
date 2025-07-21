'use client'

import { Button } from '@/components/ui/button'
import { Building2, Users, Zap, Shield, ArrowRight, CheckCircle } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface Solution {
  id: string
  slug: string
  name: string
  description: string
  features: string[]
  image_url: string
  category: string
  starting_price: string
  dimensions: string
  capacity: string
  power: string
  climate_control: boolean
}

interface SolutionPreviewProps {
  solution: Solution
}

// Helper function to get icon component
const getIconComponent = (iconName: string) => {
  const icons: { [key: string]: any } = {
    'building2': Building2,
    'users': Users,
    'zap': Zap,
    'shield': Shield,
    'checkcircle': CheckCircle,
  }
  return icons[iconName.toLowerCase()] || Building2
}

export default function SolutionPreview({ solution }: SolutionPreviewProps) {
  // Create dynamic features for display (fallback to solution features if no specific ones)
  const displayFeatures = [
    {
      icon: 'building2',
      title: 'Professional Design',
      description: 'Modern interior finishes and professional appearance suitable for any business environment.'
    },
    {
      icon: 'users',
      title: 'Flexible Capacity',
      description: `Available in sizes from 2-person offices to large conference rooms and multi-room complexes.`
    },
    {
      icon: 'zap',
      title: 'Quick Setup',
      description: 'Fast delivery and professional installation, typically ready for occupancy within days.'
    },
    {
      icon: 'shield',
      title: 'Code Compliant',
      description: 'All units meet local building codes and ADA accessibility requirements.'
    }
  ]

  // Create specifications based on solution data
  const specifications = [
    {
      title: `${solution.category.charAt(0).toUpperCase() + solution.category.slice(1)} Unit`,
      size: solution.dimensions || "Custom sizes available",
      capacity: solution.capacity || "Varies by configuration",
      price: solution.starting_price || "Contact for pricing",
      image: solution.image_url || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    }
  ]

  // What's included items based on solution features
  const included = solution.features.length > 0 ? solution.features : [
    'Professional interior finishes',
    'Climate control (heating & cooling)',
    'Electrical system with outlets',
    'LED lighting throughout',
    'Professional flooring',
    'Windows with blinds',
    'Entry door with lock',
    'ADA-compliant options available'
  ]

  return (
    <div className="bg-white">
      {/* Page Header - matching the exact PageHeader component structure */}
      <section className="relative py-20 hero-gradient overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Breadcrumbs */}
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center space-x-2 text-blue-200 text-sm mb-6"
            >
              <span className="hover:text-white transition-colors">Home</span>
              <span className="text-blue-300">•</span>
              <span className="hover:text-white transition-colors">Solutions</span>
              <span className="text-blue-300">•</span>
              <span className="hover:text-white transition-colors">{solution.name}</span>
            </motion.nav>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-yellow-400 font-semibold text-sm uppercase tracking-wide mb-4"
            >
              {'Professional Solutions'}
            </motion.p>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              {solution.name}
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              {solution.description}
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Button 
                variant="gradient" 
                size="xl"
                className="group"
              >
                {'Get Custom Quote'}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - matching exact structure from real page */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {displayFeatures.map((feature, index) => {
              const IconComponent = getIconComponent(feature.icon)
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

      {/* Specifications Grid - matching exact structure */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-navy-600 mb-6">
              {'Available Configurations'}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {'Choose from our standard configurations or let us customize a solution for your specific needs.'}
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

      {/* What's Included - matching exact structure */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-navy-600 mb-6">
                {"What's Included"}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {`Every modular ${solution.category} building comes fully equipped and ready for immediate occupancy.`}
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
                src={solution.image_url || "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop"}
                alt={`Professional ${solution.category} interior`}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - matching exact structure */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            {'Ready to Get Started?'}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {`Get a custom quote for your modular ${solution.category} building project. We'll work with you to find the perfect solution.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              {'Get Custom Quote'}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              {'Call (866) 819-9017'}
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
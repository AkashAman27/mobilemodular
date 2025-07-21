'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Building2, GraduationCap, Package, Heart, Shield, Utensils } from 'lucide-react'
import { useSolutions } from '@/hooks/useSolutions'

const iconMap = {
  office: Building2,
  education: GraduationCap,
  storage: Package,
  healthcare: Heart,
  security: Shield,
  restaurant: Utensils,
}

const SolutionsGrid = () => {
  const { solutions, loading, error } = useSolutions()

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading solutions...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-steel-500 font-semibold text-sm uppercase tracking-wide mb-4"
          >
            OUR PRODUCT OFFERINGS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-navy-600 mb-6"
          >
            Complete your space with our industry-leading solutions
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            From portable classrooms to office complexes, we provide flexible modular building solutions 
            for every industry and application.
          </motion.p>
        </div>

        {/* Solutions Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {solutions.map((solution) => {
            const IconComponent = iconMap[solution.category]
            
            return (
              <motion.div
                key={solution.id}
                variants={item}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:scale-105"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={solution.imageUrl}
                    alt={solution.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="text-sm font-semibold bg-steel-500 px-2 py-1 rounded">
                      Starting at {solution.startingPrice}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-navy-600 mb-3 group-hover:text-steel-500 transition-colors">
                    {solution.name}
                  </h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {solution.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {solution.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-steel-500 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Specifications Quick View */}
                  <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-gray-600">
                    <div>
                      <span className="font-semibold">Size:</span><br />
                      {solution.specifications.dimensions}
                    </div>
                    <div>
                      <span className="font-semibold">Capacity:</span><br />
                      {solution.specifications.capacity}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/solutions/${solution.id}`}
                    className="group/link flex items-center justify-between text-steel-500 hover:text-navy-600 font-semibold transition-colors"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/solutions"
            className="inline-flex items-center space-x-2 bg-navy-600 text-white px-8 py-4 rounded-lg hover:bg-navy-800 transition-colors font-semibold cursor-pointer relative z-10"
            onClick={(e) => {
              e.stopPropagation()
              console.log('View All Solutions button clicked - navigating to /solutions')
            }}
          >
            <span>View All Solutions</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default SolutionsGrid
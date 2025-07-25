'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Settings, Zap, Users } from 'lucide-react'

interface ValuePropositionProps {
  valuesData?: {
    values_section_title?: string
    values_core_values?: Array<{
      icon: string
      title: string
      description: string
    }>
    values_cta_title?: string
    values_cta_content?: string
    values_cta_button_text?: string
  }
}

const ValueProposition = ({ valuesData }: ValuePropositionProps) => {
  // Icon mapping
  const iconMap: Record<string, any> = {
    Shield,
    Settings, 
    Zap,
    Users
  }

  // Default values as fallback
  const defaultValues = [
    {
      icon: 'Shield',
      title: 'Safe and Secure',
      description: 'Engineered for peace of mind with solutions that prioritize safety, meet rigorous standards, and create secure environments.'
    },
    {
      icon: 'Settings',
      title: 'Customization',
      description: 'Create tailored solutions that fulfill your vision. Our solutions adapt seamlessly to suit your unique requirements and preferences.'
    },
    {
      icon: 'Zap',
      title: 'Speed',
      description: 'We deliver unmatched efficiency, swiftly providing temporary space solutions that meet your urgent demands without compromising quality.'
    },
    {
      icon: 'Users',
      title: 'Customer Support',
      description: 'Beyond structures, we build relationships. Our team stands with you with unwavering local support, expertise, and guidance through the project\'s life cycle.'
    }
  ]

  const values = valuesData?.values_core_values && valuesData.values_core_values.length > 0 
    ? valuesData.values_core_values 
    : defaultValues

  const sectionTitle = valuesData?.values_section_title || 'Providing value at every step'
  const ctaTitle = valuesData?.values_cta_title || 'Start your project today'
  const ctaContent = valuesData?.values_cta_content || 'Request a quote today to start your project right.'
  const ctaButtonText = valuesData?.values_cta_button_text || 'Request a quote'

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-20 hero-gradient">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            {sectionTitle}
          </motion.h2>
        </div>

        {/* Values Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {values.map((value, index) => {
            const IconComponent = iconMap[value.icon] || Shield
            return (
              <motion.div
                key={index}
                variants={item}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-blue-100 leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-3xl font-bold text-white mb-4">{ctaTitle}</h3>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">{ctaContent}</p>
          <button className="gradient-orange text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200">
            {ctaButtonText}
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default ValueProposition
'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function LocationsAnimatedCTA() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contact your local office or get a quote online. Our team is ready to help you find the perfect modular building solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/quote">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                Get Free Quote
              </motion.button>
            </Link>
            <motion.a
              href="tel:(866) 819-9017"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-50 transition-colors inline-block text-center"
            >
              Call (866) 819-9017
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  )
}
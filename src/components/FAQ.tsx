'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  title?: string
  faqs: FAQItem[]
}

const FAQ: React.FC<FAQProps> = ({ title = "Top 10 Frequently Asked Questions", faqs }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy-600 mb-6">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to the most common questions about our modular building solutions.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                >
                  <span className="font-semibold text-navy-600 pr-4">
                    {index + 1}. {faq.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-steel-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-steel-500 flex-shrink-0" />
                  )}
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 bg-white border-t border-gray-100">
                        <p className="text-gray-700 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <div className="bg-gray-50 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-navy-600 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our expert team is ready to help you find the perfect modular building solution for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-navy-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-800 transition-colors"
              >
                Contact Us
              </a>
              <a
                href="tel:8668199017"
                className="border border-navy-600 text-navy-600 px-6 py-3 rounded-lg font-semibold hover:bg-navy-600 hover:text-white transition-colors"
              >
                Call (866) 819-9017
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FAQ
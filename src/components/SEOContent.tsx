'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface SEOContentProps {
  title?: string
  paragraphs: string[]
  className?: string
}

const SEOContent: React.FC<SEOContentProps> = ({ 
  title = "Why Choose Our Solutions?",
  paragraphs,
  className = ""
}) => {
  const [isExpanded, setIsExpanded] = useState(false)

  if (!paragraphs || paragraphs.length === 0) {
    return null
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  // Determine how many paragraphs to show initially
  const mobileInitialCount = 1
  const desktopInitialCount = 2
  const showReadMore = paragraphs.length > desktopInitialCount

  return (
    <section className={`py-20 bg-gray-50 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-600 mb-6">
              {title}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="prose prose-lg max-w-none"
          >
            {/* Mobile: Show 1 paragraph initially */}
            <div className="block md:hidden">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                {paragraphs.slice(0, mobileInitialCount).map((paragraph, index) => (
                  <p key={index} className="text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {paragraphs.slice(mobileInitialCount).map((paragraph, index) => (
                        <p key={index + mobileInitialCount} className="text-base md:text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {paragraphs.length > mobileInitialCount && (
                  <button
                    onClick={toggleExpanded}
                    className="inline-flex items-center space-x-2 text-steel-500 hover:text-navy-600 font-semibold transition-colors mt-4"
                  >
                    <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            </div>

            {/* Desktop: Show 2 paragraphs initially */}
            <div className="hidden md:block">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                {paragraphs.slice(0, desktopInitialCount).map((paragraph, index) => (
                  <p key={index} className="text-base md:text-lg">
                    {paragraph}
                  </p>
                ))}
                
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-6"
                    >
                      {paragraphs.slice(desktopInitialCount).map((paragraph, index) => (
                        <p key={index + desktopInitialCount} className="text-base md:text-lg">
                          {paragraph}
                        </p>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {showReadMore && (
                  <button
                    onClick={toggleExpanded}
                    className="inline-flex items-center space-x-2 text-steel-500 hover:text-navy-600 font-semibold transition-colors mt-4"
                  >
                    <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default SEOContent
'use client'

import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface FAQ {
  id: string
  category: string
  question: string
  answer: string
  sort_order: number
}

interface FAQPreviewProps {
  faq: FAQ
}

export default function FAQPreview({ faq }: FAQPreviewProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const getCategoryColor = (category: string) => {
    const colors = {
      General: 'bg-blue-100 text-blue-800 border-blue-200',
      Solutions: 'bg-green-100 text-green-800 border-green-200',
      Industries: 'bg-purple-100 text-purple-800 border-purple-200',
      Locations: 'bg-orange-100 text-orange-800 border-orange-200',
      Resources: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      Company: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* FAQ Page Header */}
      <div className="px-8 py-12 bg-gradient-to-r from-navy-600 to-steel-600 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-6 text-steel-300" />
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl opacity-90">
            Find answers to common questions about our modular building solutions
          </p>
        </div>
      </div>

      {/* FAQ Section with Category */}
      <div className="px-8 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getCategoryColor(faq.category)}`}>
              {faq.category} Questions
            </span>
          </div>

          {/* Accordion Style FAQ */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-steel-500 focus:ring-inset"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <HelpCircle className="h-6 w-6 text-steel-600 mt-1 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-900 leading-relaxed">
                    {faq.question}
                  </h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </div>
              </div>
            </button>
            
            {isExpanded && (
              <div className="px-6 pb-6 border-t border-gray-100">
                <div className="ml-10">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Alternative Simple Format */}
      <div className="px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-gray-900">Alternative Display Format</h3>
          
          <div className="space-y-8">
            <div className="border-l-4 border-steel-500 pl-6">
              <div className="flex items-start space-x-3 mb-4">
                <HelpCircle className="h-6 w-6 text-steel-600 mt-1 flex-shrink-0" />
                <h4 className="text-xl font-semibold text-gray-900 leading-relaxed">
                  {faq.question}
                </h4>
              </div>
              <p className="text-gray-700 leading-relaxed ml-9">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Format */}
      <div className="px-8 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-gray-900">Card Format</h3>
          
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-steel-100 flex items-center justify-center">
                  <HelpCircle className="h-6 w-6 text-steel-600" />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(faq.category)}`}>
                    {faq.category}
                  </span>
                </div>
                
                <h4 className="text-xl font-semibold text-gray-900 mb-4 leading-relaxed">
                  {faq.question}
                </h4>
                
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
                
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <span className="text-sm text-gray-500">
                    Sort order: {faq.sort_order} in {faq.category} category
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Context */}
      <div className="px-8 py-12 bg-blue-50 border-t border-blue-200">
        <div className="max-w-3xl mx-auto text-center">
          <h4 className="font-semibold text-blue-900 mb-2">Display Options</h4>
          <p className="text-blue-700 text-sm">
            This FAQ can be displayed in accordion format, card format, or as part of a categorized FAQ section.
            Sort order determines the position within the {faq.category} category.
          </p>
        </div>
      </div>
    </div>
  )
}
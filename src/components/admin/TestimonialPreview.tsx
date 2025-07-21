'use client'

import { Star, Quote } from 'lucide-react'
import Image from 'next/image'

interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  content: string
  rating: number
  image_url: string
}

interface TestimonialPreviewProps {
  testimonial: Testimonial
}

export default function TestimonialPreview({ testimonial }: TestimonialPreviewProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Testimonial Section */}
      <div className="relative bg-gradient-to-r from-navy-600 to-steel-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-8 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="h-16 w-16 text-steel-300 mx-auto mb-8" />
            <blockquote className="text-2xl font-medium leading-relaxed mb-8 italic">
              "{testimonial.content}"
            </blockquote>
            
            <div className="flex items-center justify-center space-x-1 mb-6">
              {renderStars(testimonial.rating)}
            </div>

            <div className="flex items-center justify-center space-x-4">
              {testimonial.image_url ? (
                <div className="relative h-16 w-16 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={testimonial.image_url}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-16 w-16 rounded-full bg-steel-500 flex items-center justify-center text-white font-bold text-xl border-4 border-white shadow-lg">
                  {testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
              )}
              
              <div className="text-left">
                <div className="font-semibold text-xl">{testimonial.name}</div>
                <div className="text-steel-200">
                  {testimonial.role && `${testimonial.role} • `}{testimonial.company}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial Card Section */}
      <div className="px-8 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">What Our Customers Say</h2>
          
          {/* Card Format */}
          <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
            <div className="flex items-start space-x-6">
              {testimonial.image_url ? (
                <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image_url}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-20 w-20 rounded-full bg-navy-600 flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  {testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center space-x-1 mb-4">
                  {renderStars(testimonial.rating)}
                  <span className="text-sm text-gray-500 ml-2">({testimonial.rating}/5 stars)</span>
                </div>
                
                <blockquote className="text-lg text-gray-700 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="border-t pt-4">
                  <div className="font-semibold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-gray-600">
                    {testimonial.role && `${testimonial.role} • `}{testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Simple List Format */}
      <div className="px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-gray-900">Alternative Display Format</h3>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4 p-6 bg-gray-50 rounded-lg">
              {testimonial.image_url ? (
                <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={testimonial.image_url}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="h-12 w-12 rounded-full bg-navy-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </div>
              )}
              
              <div className="flex-1">
                <div className="flex items-center space-x-1 mb-2">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="text-gray-700 mb-3 italic">"{testimonial.content}"</p>
                <div>
                  <span className="font-semibold text-gray-900">{testimonial.name}</span>
                  <span className="text-gray-600">
                    {testimonial.role && `, ${testimonial.role}`} at {testimonial.company}
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
            This testimonial can be displayed in the hero section, testimonials page, or as social proof throughout the website.
          </p>
        </div>
      </div>
    </div>
  )
}
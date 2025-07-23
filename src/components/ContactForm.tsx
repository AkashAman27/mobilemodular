'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface ContactFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  topic: string
  message: string
}

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    topic: '',
    message: ''
  })
  
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'First name is required'
    if (!formData.lastName.trim()) return 'Last name is required'
    if (!formData.email.trim()) return 'Email is required'
    if (!formData.topic) return 'Please select a topic'
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) return 'Please enter a valid email address'
    
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSuccess(true)
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          company: '',
          topic: '',
          message: ''
        })
      } else {
        setError(result.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      console.error('Form submission error:', error)
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-navy-600 mb-2">Message Sent Successfully!</h3>
          <p className="text-gray-600 mb-6">
            Thank you for contacting us. We'll get back to you within 2 hours during business hours.
          </p>
          <Button 
            onClick={() => setSuccess(false)} 
            variant="outline"
            className="text-navy-600 border-navy-600 hover:bg-navy-600 hover:text-white"
          >
            Send Another Message
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-navy-600 mb-6">Send Us a Message</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent"
              placeholder="John"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent"
              placeholder="Doe"
              disabled={loading}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent"
              placeholder="john@company.com"
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent"
              placeholder="(555) 123-4567"
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent"
            placeholder="Company Name"
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">How can we help? *</label>
          <select 
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent"
            disabled={loading}
          >
            <option value="">Select a topic</option>
            <option value="quote">Request a Quote</option>
            <option value="rental">Rental Information</option>
            <option value="purchase">Purchase Options</option>
            <option value="lease">Lease Information</option>
            <option value="support">Customer Support</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-steel-500 focus:border-transparent resize-vertical"
            placeholder="Tell us about your project requirements..."
            disabled={loading}
          />
        </div>

        <Button 
          type="submit" 
          variant="gradient" 
          size="lg" 
          className="w-full group"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Sending Message...
            </div>
          ) : (
            <>
              Send Message
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </Button>
      </form>
    </div>
  )
}
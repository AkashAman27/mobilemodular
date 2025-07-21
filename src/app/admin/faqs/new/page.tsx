'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, HelpCircle } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

interface FAQFormData {
  category: string
  question: string
  answer: string
  sort_order: number
}

export default function NewFAQ() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState<FAQFormData>({
    category: 'General',
    question: '',
    answer: '',
    sort_order: 1
  })

  const handleInputChange = (field: keyof FAQFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const categories = [
    'General',
    'Solutions',
    'Industries',
    'Locations',
    'Resources',
    'Company'
  ]

  const validateForm = () => {
    if (!formData.question.trim()) return 'Question is required'
    if (!formData.answer.trim()) return 'Answer is required'
    if (!formData.category.trim()) return 'Category is required'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      alert(validationError)
      return
    }

    setSaving(true)

    try {
      const { error } = await supabase
        .from('faqs')
        .insert([formData])

      if (error) {
        // Silent error handling - removed console.error
        alert('Error creating FAQ: ' + error.message)
        return
      }

      alert('FAQ created successfully!')
      router.push('/admin/faqs')
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error creating FAQ')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/faqs">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to FAQs
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New FAQ</h1>
                <p className="text-gray-600">Create a new frequently asked question</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* FAQ Information */}
          <Card>
            <CardHeader>
              <CardTitle>FAQ Information</CardTitle>
              <CardDescription>Enter the question and answer details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => handleInputChange('sort_order', parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    min="1"
                    placeholder="1"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Lower numbers appear first in the category
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question *
                </label>
                <input
                  type="text"
                  value={formData.question}
                  onChange={(e) => handleInputChange('question', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Enter the frequently asked question..."
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Character count: {formData.question.length}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Answer *
                </label>
                <textarea
                  value={formData.answer}
                  onChange={(e) => handleInputChange('answer', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Enter the detailed answer to this question..."
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Character count: {formData.answer.length}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          {(formData.question || formData.answer) && (
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>How this FAQ will appear on your website</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <HelpCircle className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {formData.question || 'Your question will appear here...'}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {formData.answer || 'Your answer will appear here...'}
                      </p>
                      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                        <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
                          {formData.category}
                        </span>
                        <span>Sort order: {formData.sort_order}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Writing Tips */}
          <Card>
            <CardHeader>
              <CardTitle>Writing Tips</CardTitle>
              <CardDescription>Best practices for writing effective FAQs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-green-600">✓</span>
                  <span>Write questions from the customer's perspective</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-green-600">✓</span>
                  <span>Keep answers clear, concise, and helpful</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-green-600">✓</span>
                  <span>Use specific details and avoid jargon</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-green-600">✓</span>
                  <span>Include relevant contact information when appropriate</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="font-medium text-green-600">✓</span>
                  <span>Update regularly based on actual customer questions</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Link href="/admin/faqs">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={saving}
              className="bg-navy-600 hover:bg-navy-700"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Create FAQ
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
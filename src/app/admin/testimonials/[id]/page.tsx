'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Star } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload from '@/components/ui/image-upload'

interface TestimonialFormData {
  id: string
  name: string
  company: string
  role: string
  content: string
  rating: number
  image_url: string
}

export default function EditTestimonial() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState<TestimonialFormData>({
    id: '',
    name: '',
    company: '',
    role: '',
    content: '',
    rating: 5,
    image_url: ''
  })

  useEffect(() => {
    if (params.id) {
      fetchTestimonial(params.id as string)
    }
  }, [params.id])

  const fetchTestimonial = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        // Silent error handling - removed console.error
        alert('Error loading testimonial')
        router.push('/admin/testimonials')
        return
      }

      if (data) {
        setFormData({
          id: data.id,
          name: data.name,
          company: data.company,
          role: data.role || '',
          content: data.content,
          rating: data.rating,
          image_url: data.image_url || ''
        })
      }
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error loading testimonial')
      router.push('/admin/testimonials')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof TestimonialFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required'
    if (!formData.company.trim()) return 'Company is required'
    if (!formData.content.trim()) return 'Testimonial content is required'
    if (formData.rating < 1 || formData.rating > 5) return 'Rating must be between 1 and 5'
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
      const { id, ...updateData } = formData
      const { error } = await supabase
        .from('testimonials')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        alert('Error updating testimonial: ' + error.message)
        return
      }

      alert('Testimonial updated successfully!')
      router.push('/admin/testimonials')
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error updating testimonial')
    } finally {
      setSaving(false)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => handleInputChange('rating', i + 1)}
        className={`h-6 w-6 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        } hover:text-yellow-400 transition-colors`}
      >
        <Star className="h-6 w-6" />
      </button>
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonial...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/testimonials">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Testimonials
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Testimonial</h1>
                <p className="text-gray-600">Update testimonial from {formData.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
              <CardDescription>Update the customer's details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., Sarah Johnson"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleInputChange('company', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., ABC Construction"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role/Title
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., Project Manager"
                  />
                </div>
                <div>
                  <ImageUpload
                    label="Customer Photo"
                    value={formData.image_url}
                    onChange={(url) => handleInputChange('image_url', url)}
                    bucketName="images"
                    folder="testimonials"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testimonial Content */}
          <Card>
            <CardHeader>
              <CardTitle>Testimonial Content</CardTitle>
              <CardDescription>Update the testimonial details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating *
                </label>
                <div className="flex items-center space-x-1">
                  {renderStars(formData.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    ({formData.rating} out of 5 stars)
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Testimonial Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Enter the customer's testimonial here..."
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Character count: {formData.content.length}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How this testimonial will appear on your website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  {formData.image_url ? (
                    <div className="w-12 h-12 rounded-full bg-navy-600 flex items-center justify-center text-white font-semibold">
                      <img 
                        src={formData.image_url} 
                        alt={formData.name}
                        className="w-12 h-12 rounded-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.nextElementSibling?.classList.remove('hidden');
                        }}
                      />
                      <span className="hidden">
                        {formData.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                      </span>
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-navy-600 flex items-center justify-center text-white font-semibold">
                      {formData.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-1 mb-2">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < formData.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-3 italic">"{formData.content}"</p>
                    <div>
                      <p className="font-semibold text-gray-900">{formData.name}</p>
                      <p className="text-sm text-gray-600">
                        {formData.role && `${formData.role} at `}{formData.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Link href="/admin/testimonials">
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
                  Update Testimonial
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
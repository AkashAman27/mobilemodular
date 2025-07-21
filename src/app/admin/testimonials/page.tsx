'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, ArrowLeft, MessageSquare, Star, Eye } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import PreviewModal from '@/components/admin/PreviewModal'
import TestimonialPreview from '@/components/admin/TestimonialPreview'

interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  content: string
  rating: number
  image_url: string
  created_at: string
  updated_at: string
}

export default function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [previewTestimonial, setPreviewTestimonial] = useState<Testimonial | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  useEffect(() => {
    fetchTestimonials()
  }, [])

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        // Silent error handling - removed console.error
        return
      }

      setTestimonials(data || [])
    } catch (error) {
      // Silent error handling - removed console.error
    } finally {
      setLoading(false)
    }
  }

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return

    try {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        alert('Error deleting testimonial')
        return
      }

      setTestimonials(testimonials.filter(testimonial => testimonial.id !== id))
      alert('Testimonial deleted successfully')
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error deleting testimonial')
    }
  }

  const handlePreview = (testimonial: Testimonial) => {
    setPreviewTestimonial(testimonial)
    setIsPreviewOpen(true)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimonials...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
                <p className="text-gray-600">Manage customer testimonials</p>
              </div>
            </div>
            <Link href="/admin/testimonials/new">
              <Button className="bg-navy-600 hover:bg-navy-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Testimonial
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {testimonials.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Testimonials Found</CardTitle>
              <CardDescription>
                No testimonials have been created yet. Click the button above to add your first testimonial.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    {testimonial.image_url && (
                      <div className="relative h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={testimonial.image_url}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-purple-600" />
                        <span>{testimonial.name}</span>
                      </CardTitle>
                      <CardDescription>
                        {testimonial.role} at {testimonial.company}
                      </CardDescription>
                      <div className="flex items-center space-x-1 mt-1">
                        {renderStars(testimonial.rating)}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 italic line-clamp-3">
                      "{testimonial.content}"
                    </p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(testimonial)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Link href={`/admin/testimonials/${testimonial.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteTestimonial(testimonial.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={`Preview: ${previewTestimonial?.name || 'Testimonial'}`}
      >
        {previewTestimonial && <TestimonialPreview testimonial={previewTestimonial} />}
      </PreviewModal>
    </div>
  )
}
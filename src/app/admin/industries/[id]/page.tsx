'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PreviewButton from '@/components/admin/PreviewButton'
import { supabase } from '@/lib/supabase'

interface IndustryFormData {
  id: string
  slug: string
  name: string
  description: string
  image_url: string
  case_studies_count: number
}

export default function EditIndustry() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [usingDemoData, setUsingDemoData] = useState(false)
  
  const [formData, setFormData] = useState<IndustryFormData>({
    id: '',
    slug: '',
    name: '',
    description: '',
    image_url: '',
    case_studies_count: 0
  })

  useEffect(() => {
    if (params.id) {
      fetchIndustry(params.id as string)
    }
  }, [params.id])

  const fetchIndustry = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('industries')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        // Silently fall back to demo data for testing purposes
        const demoIndustry = {
          id: id,
          slug: 'education',
          name: 'Education (Demo)',
          description: 'Flexible learning spaces for schools and universities. Our modular classrooms and educational buildings provide safe, comfortable environments that support modern learning while offering the flexibility to expand or relocate as enrollment changes.',
          image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
          case_studies_count: 15
        }
        
        setUsingDemoData(true)
        setFormData(demoIndustry)
        setLoading(false)
        return
      }

      if (data) {
        setFormData({
          id: data.id,
          slug: data.slug,
          name: data.name,
          description: data.description,
          image_url: data.image_url || '',
          case_studies_count: data.case_studies_count || 0
        })
      }
    } catch (error) {
      alert('Error loading industry')
      router.push('/admin/industries')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof IndustryFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleNameChange = (name: string) => {
    handleInputChange('name', name)
    if (!formData.slug || formData.slug === generateSlug(formData.name)) {
      handleInputChange('slug', generateSlug(name))
    }
  }

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required'
    if (!formData.slug.trim()) return 'Slug is required'
    if (!formData.description.trim()) return 'Description is required'
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
      if (usingDemoData) {
        // For demo data, save to localStorage
        const saveData = { ...formData }
        localStorage.setItem(`industry_form_${params.id}`, JSON.stringify(saveData))
        alert('Industry changes saved locally! (Demo mode - changes will persist in browser)')
      } else {
        // For real database data, save to Supabase
        const { id, ...updateData } = formData
        const { error } = await supabase
          .from('industries')
          .update({
            ...updateData,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)

        if (error) {
          alert('Error updating industry: ' + error.message)
          return
        }

        alert('Industry updated successfully!')
      }
    } catch (error) {
      alert('Error updating industry')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading industry...</p>
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
              <Link href="/admin/industries">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Industries
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Industry</h1>
                <p className="text-gray-600">Update industry: {formData.name}</p>
                {usingDemoData && (
                  <div className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-md inline-block">
                    📝 Demo Mode - Changes saved locally
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              <PreviewButton 
                href={`/industries/${formData.slug}`}
                label="Preview Live Page"
                variant="outline"
                size="sm"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update the basic details for this industry</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Industry Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                    placeholder="e.g., Education, Healthcare, Construction"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                    placeholder="e.g., education, healthcare, construction"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Used in URLs. Auto-generated from name if left empty.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                  placeholder="Describe the industry and how your modular buildings serve it..."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={formData.image_url}
                  onChange={(e) => handleInputChange('image_url', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                  placeholder="https://example.com/image.jpg"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Optional. URL to an image representing this industry.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Case Studies Count
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.case_studies_count}
                  onChange={(e) => handleInputChange('case_studies_count', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500"
                  placeholder="0"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Number of case studies available for this industry.
                </p>
              </div>

              {/* Image Preview */}
              {formData.image_url && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Preview
                  </label>
                  <div className="relative h-48 w-full rounded-lg overflow-hidden border">
                    <img
                      src={formData.image_url}
                      alt={formData.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <Link href="/admin/industries">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={saving}
              className="bg-navy-600 hover:bg-navy-700"
            >
              {saving ? 'Updating...' : 'Update Industry'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
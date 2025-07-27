'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import PreviewButton from '@/components/admin/PreviewButton'
import { supabase } from '@/lib/supabase'
import SEOSection from '@/components/admin/SEOSection'
import { SEOData } from '@/types/seo'
import { toast } from 'react-hot-toast'

interface IndustryFormData {
  id: string
  slug: string
  name: string
  description: string
  image_url: string
  case_studies_count: number
  // SEO fields
  seo_title?: string
  seo_description?: string
  focus_keyword?: string
  seo_keywords?: string
  canonical_url?: string
  robots_index?: boolean
  robots_follow?: boolean
  robots_nosnippet?: boolean
  og_title?: string
  og_description?: string
  og_image?: string
  og_image_alt?: string
  twitter_title?: string
  twitter_description?: string
  twitter_image?: string
  twitter_image_alt?: string
  structured_data_type?: string
  custom_json_ld?: string
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
    case_studies_count: 0,
    // SEO defaults
    seo_title: '',
    seo_description: '',
    focus_keyword: '',
    seo_keywords: '',
    canonical_url: '',
    robots_index: true,
    robots_follow: true,
    robots_nosnippet: false,
    og_title: '',
    og_description: '',
    og_image: '',
    og_image_alt: '',
    twitter_title: '',
    twitter_description: '',
    twitter_image: '',
    twitter_image_alt: '',
    structured_data_type: 'Service',
    custom_json_ld: ''
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
          case_studies_count: data.case_studies_count || 0,
          // Load SEO fields
          seo_title: data.seo_title || '',
          seo_description: data.seo_description || '',
          focus_keyword: data.focus_keyword || '',
          seo_keywords: data.seo_keywords || '',
          canonical_url: data.canonical_url || '',
          robots_index: data.robots_index ?? true,
          robots_follow: data.robots_follow ?? true,
          robots_nosnippet: data.robots_nosnippet ?? false,
          og_title: data.og_title || '',
          og_description: data.og_description || '',
          og_image: data.og_image || '',
          og_image_alt: data.og_image_alt || '',
          twitter_title: data.twitter_title || '',
          twitter_description: data.twitter_description || '',
          twitter_image: data.twitter_image || '',
          twitter_image_alt: data.twitter_image_alt || '',
          structured_data_type: data.structured_data_type || 'Service',
          custom_json_ld: data.custom_json_ld || ''
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

  const handleSEOSave = async (seoData: SEOData) => {
    try {
      // Update local state with SEO data
      const updatedFormData = {
        ...formData,
        seo_title: seoData.seo_title || '',
        seo_description: seoData.seo_description || '',
        focus_keyword: seoData.focus_keyword || '',
        seo_keywords: seoData.seo_keywords ? seoData.seo_keywords.join(', ') : '',
        canonical_url: seoData.canonical_url || '',
        robots_index: seoData.robots_index ?? true,
        robots_follow: seoData.robots_follow ?? true,
        robots_nosnippet: seoData.robots_nosnippet ?? false,
        og_title: seoData.og_title || '',
        og_description: seoData.og_description || '',
        og_image: seoData.og_image || '',
        og_image_alt: seoData.og_image_alt || '',
        twitter_title: seoData.twitter_title || '',
        twitter_description: seoData.twitter_description || '',
        twitter_image: seoData.twitter_image || '',
        twitter_image_alt: seoData.twitter_image_alt || '',
        structured_data_type: seoData.structured_data_type || 'Service',
        custom_json_ld: seoData.custom_json_ld || ''
      }
      
      setFormData(updatedFormData)
      
      if (usingDemoData) {
        // For demo data, save to localStorage
        localStorage.setItem(`industry_form_${params.id}`, JSON.stringify(updatedFormData))
        toast.success('SEO settings saved locally (Demo mode)')
      } else {
        // For real database data, save to Supabase
        const { id, ...updateData } = updatedFormData
        const { error } = await supabase
          .from('industries')
          .update({
            ...updateData,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)

        if (error) {
          throw new Error(error.message)
        }
        
        toast.success('SEO settings saved successfully!')
      }
    } catch (error) {
      console.error('Error saving SEO data:', error)
      toast.error('Failed to save SEO settings')
      throw error
    }
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

          {/* Comprehensive SEO Section */}
          <SEOSection
            pageType="industry"
            contentId={formData.id}
            pagePath={`/industries/${formData.slug}`}
            initialData={{
              seo_title: formData.seo_title || '',
              seo_description: formData.seo_description || '',
              focus_keyword: formData.focus_keyword || '',
              seo_keywords: formData.seo_keywords ? formData.seo_keywords.split(',').map(k => k.trim()).filter(k => k) : [],
              canonical_url: formData.canonical_url || '',
              robots_index: formData.robots_index ?? true,
              robots_follow: formData.robots_follow ?? true,
              robots_nosnippet: formData.robots_nosnippet ?? false,
              og_title: formData.og_title || '',
              og_description: formData.og_description || '',
              og_image: formData.og_image || formData.image_url || '',
              og_image_alt: formData.og_image_alt || `${formData.name} Industry Solutions`,
              twitter_title: formData.twitter_title || '',
              twitter_description: formData.twitter_description || '',
              twitter_image: formData.twitter_image || formData.image_url || '',
              twitter_image_alt: formData.twitter_image_alt || `${formData.name} Industry Solutions`,
              structured_data_type: formData.structured_data_type || 'Service',
              custom_json_ld: formData.custom_json_ld || ''
            }}
            onSave={handleSEOSave}
            className="mt-6"
          />

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
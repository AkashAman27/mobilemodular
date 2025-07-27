'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Save, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import SEOSection from '@/components/admin/SEOSection'
import { SEOData } from '@/types/seo'
import { toast } from 'react-hot-toast'

interface StateLocationData {
  id: string
  state_id: string
  name: string
  abbreviation: string
  locations: number
  phone: string
  primary_city: string
  coverage: string
  description: string
  major_cities: string[]
  service_areas: string[]
  created_at: string
  updated_at: string
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

export default function EditState() {
  const params = useParams()
  const router = useRouter()
  const [state, setState] = useState<StateLocationData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    state_id: '',
    locations: 0,
    phone: '',
    primary_city: '',
    coverage: 'Statewide',
    description: '',
    major_cities: ['', '', '', '', ''],
    service_areas: ['', '', '', '', ''],
    // SEO fields
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
    structured_data_type: 'Place',
    custom_json_ld: ''
  })

  useEffect(() => {
    if (params.id) {
      fetchState(params.id as string)
    }
  }, [params.id])

  const fetchState = async (id: string) => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('state_locations')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        setError('Failed to fetch state data')
        return
      }

      setState(data)
      setFormData({
        name: data.name || '',
        abbreviation: data.abbreviation || '',
        state_id: data.state_id || '',
        locations: data.locations || 0,
        phone: data.phone || '',
        primary_city: data.primary_city || '',
        coverage: data.coverage || 'Statewide',
        description: data.description || '',
        major_cities: [...(data.major_cities || []), '', '', '', '', ''].slice(0, 5),
        service_areas: [...(data.service_areas || []), '', '', '', '', ''].slice(0, 5),
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
        structured_data_type: data.structured_data_type || 'Place',
        custom_json_ld: data.custom_json_ld || ''
      })
    } catch (err) {
      setError('Failed to fetch state data')
    } finally {
      setLoading(false)
    }
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
        structured_data_type: seoData.structured_data_type || 'Place',
        custom_json_ld: seoData.custom_json_ld || ''
      }
      
      setFormData(updatedFormData)
      
      // Save to database
      const { error } = await supabase
        .from('state_locations')
        .update({
          seo_title: seoData.seo_title,
          seo_description: seoData.seo_description,
          focus_keyword: seoData.focus_keyword,
          seo_keywords: seoData.seo_keywords ? seoData.seo_keywords.join(', ') : null,
          canonical_url: seoData.canonical_url,
          robots_index: seoData.robots_index ?? true,
          robots_follow: seoData.robots_follow ?? true,
          robots_nosnippet: seoData.robots_nosnippet ?? false,
          og_title: seoData.og_title,
          og_description: seoData.og_description,
          og_image: seoData.og_image,
          og_image_alt: seoData.og_image_alt,
          twitter_title: seoData.twitter_title,
          twitter_description: seoData.twitter_description,
          twitter_image: seoData.twitter_image,
          twitter_image_alt: seoData.twitter_image_alt,
          structured_data_type: seoData.structured_data_type,
          custom_json_ld: seoData.custom_json_ld,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id)

      if (error) {
        throw new Error(error.message)
      }
      
      toast.success('SEO settings saved successfully!')
    } catch (error) {
      console.error('Error saving SEO data:', error)
      toast.error('Failed to save SEO settings')
      throw error
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from('state_locations')
        .update({
          name: formData.name,
          abbreviation: formData.abbreviation,
          state_id: formData.state_id,
          locations: formData.locations,
          phone: formData.phone,
          primary_city: formData.primary_city,
          coverage: formData.coverage,
          description: formData.description,
          major_cities: formData.major_cities.filter(city => city.trim() !== ''),
          service_areas: formData.service_areas.filter(area => area.trim() !== ''),
          // Include SEO fields in main form save
          seo_title: formData.seo_title,
          seo_description: formData.seo_description,
          focus_keyword: formData.focus_keyword,
          seo_keywords: formData.seo_keywords,
          canonical_url: formData.canonical_url,
          robots_index: formData.robots_index,
          robots_follow: formData.robots_follow,
          robots_nosnippet: formData.robots_nosnippet,
          og_title: formData.og_title,
          og_description: formData.og_description,
          og_image: formData.og_image,
          og_image_alt: formData.og_image_alt,
          twitter_title: formData.twitter_title,
          twitter_description: formData.twitter_description,
          twitter_image: formData.twitter_image,
          twitter_image_alt: formData.twitter_image_alt,
          structured_data_type: formData.structured_data_type,
          custom_json_ld: formData.custom_json_ld,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id)

      if (error) {
        setError('Failed to update state')
        return
      }

      toast.success('Location updated successfully!')
      router.push('/admin/locations')
    } catch (err) {
      setError('Failed to update state')
    } finally {
      setSaving(false)
    }
  }

  const updateMajorCity = (index: number, value: string) => {
    const newCities = [...formData.major_cities]
    newCities[index] = value
    setFormData({ ...formData, major_cities: newCities })
  }

  const updateServiceArea = (index: number, value: string) => {
    const newAreas = [...formData.service_areas]
    newAreas[index] = value
    setFormData({ ...formData, service_areas: newAreas })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading state data...</p>
        </div>
      </div>
    )
  }

  if (error && !state) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Link href="/admin/locations">
            <Button>Back to Locations</Button>
          </Link>
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
              <Link href="/admin/locations">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Locations
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Edit {state?.name} Coverage
                </h1>
                <p className="text-gray-600">Update state coverage details and information</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <div className="text-red-600 font-medium">{error}</div>
              <button 
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">State Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Abbreviation *
                </label>
                <input
                  type="text"
                  value={formData.abbreviation}
                  onChange={(e) => setFormData({ ...formData, abbreviation: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  maxLength={2}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State ID *
                </label>
                <input
                  type="text"
                  value={formData.state_id}
                  onChange={(e) => setFormData({ ...formData, state_id: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="georgia"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary City *
                </label>
                <input
                  type="text"
                  value={formData.primary_city}
                  onChange={(e) => setFormData({ ...formData, primary_city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Enter primary city"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location Count
                </label>
                <input
                  type="number"
                  value={formData.locations}
                  onChange={(e) => setFormData({ ...formData, locations: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="(404) 555-0987"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coverage
              </label>
              <input
                type="text"
                value={formData.coverage}
                onChange={(e) => setFormData({ ...formData, coverage: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Statewide"
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Describe the coverage area, expertise, and capabilities for this state"
                required
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Major Cities
              </label>
              <div className="space-y-2">
                {formData.major_cities.map((city, index) => (
                  <input
                    key={index}
                    type="text"
                    value={city}
                    onChange={(e) => updateMajorCity(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder={`Major city ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Areas
              </label>
              <div className="space-y-2">
                {formData.service_areas.map((area, index) => (
                  <input
                    key={index}
                    type="text"
                    value={area}
                    onChange={(e) => updateServiceArea(index, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder={`Service area ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Regional Templates */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Templates</h2>
            <p className="text-gray-600 mb-4">Use these templates to quickly populate coverage descriptions based on regional expertise.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setFormData({ 
                    ...formData, 
                    description: `${formData.name} coverage with hurricane-resistant construction and emergency response capabilities. Specializing in rapid deployment and storm recovery operations.`,
                    phone: '(800) 555-0002'
                  })
                }}
                className="text-left p-4 h-auto cursor-pointer hover:bg-orange-50 hover:border-orange-300"
              >
                <div>
                  <div className="font-medium">Southeast Template</div>
                  <div className="text-sm text-gray-500">Hurricane resistance & emergency response</div>
                </div>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setFormData({ 
                    ...formData, 
                    description: `${formData.name} coverage with cold weather construction and extreme temperature expertise. Specializing in energy-efficient heating systems and winter weather preparation.`,
                    phone: '(800) 555-0001'
                  })
                }}
                className="text-left p-4 h-auto cursor-pointer hover:bg-blue-50 hover:border-blue-300"
              >
                <div>
                  <div className="font-medium">Northeast Template</div>
                  <div className="text-sm text-gray-500">Cold weather & energy efficiency</div>
                </div>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setFormData({ 
                    ...formData, 
                    description: `${formData.name} coverage with seismic-resistant construction and technology industry expertise. Specializing in earthquake safety and smart building systems.`,
                    phone: '(800) 555-0006'
                  })
                }}
                className="text-left p-4 h-auto cursor-pointer hover:bg-green-50 hover:border-green-300"
              >
                <div>
                  <div className="font-medium">Pacific Template</div>
                  <div className="text-sm text-gray-500">Seismic resistance & technology</div>
                </div>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setFormData({ 
                    ...formData, 
                    description: `${formData.name} coverage with desert climate construction and energy industry expertise. Specializing in extreme heat construction and energy-efficient cooling systems.`,
                    phone: '(800) 555-0004'
                  })
                }}
                className="text-left p-4 h-auto cursor-pointer hover:bg-yellow-50 hover:border-yellow-300"
              >
                <div>
                  <div className="font-medium">Southwest Template</div>
                  <div className="text-sm text-gray-500">Desert climate & energy industry</div>
                </div>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setFormData({ 
                    ...formData, 
                    description: `${formData.name} coverage with high-altitude construction and extreme weather expertise. Specializing in snow load construction and mining industry support.`,
                    phone: '(800) 555-0005'
                  })
                }}
                className="text-left p-4 h-auto cursor-pointer hover:bg-purple-50 hover:border-purple-300"
              >
                <div>
                  <div className="font-medium">Mountain West Template</div>
                  <div className="text-sm text-gray-500">High altitude & extreme weather</div>
                </div>
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setFormData({ 
                    ...formData, 
                    description: `${formData.name} coverage with agricultural and industrial expertise. Specializing in rural site access and manufacturing support facilities.`,
                    phone: '(800) 555-0003'
                  })
                }}
                className="text-left p-4 h-auto cursor-pointer hover:bg-gray-50 hover:border-gray-300"
              >
                <div>
                  <div className="font-medium">Central Template</div>
                  <div className="text-sm text-gray-500">Agricultural & industrial</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Comprehensive SEO Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <SEOSection
              pageType="location"
              contentId={params.id as string}
              pagePath={`/locations/${formData.state_id}`}
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
                og_image: formData.og_image || '',
                og_image_alt: formData.og_image_alt || `Modular Buildings in ${formData.name}`,
                twitter_title: formData.twitter_title || '',
                twitter_description: formData.twitter_description || '',
                twitter_image: formData.twitter_image || '',
                twitter_image_alt: formData.twitter_image_alt || `Modular Buildings in ${formData.name}`,
                structured_data_type: formData.structured_data_type || 'Place',
                custom_json_ld: formData.custom_json_ld || ''
              }}
              onSave={handleSEOSave}
            />
          </div>

          {/* Save Button */}
          <div className="flex space-x-3">
            <Button 
              type="submit" 
              disabled={saving} 
              className="flex-1 bg-navy-600 hover:bg-navy-700"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
            <Link href="/admin/locations" className="flex-1">
              <Button type="button" variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
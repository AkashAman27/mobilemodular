'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Save, ArrowLeft, MapPin, Phone, Clock, Building, Plus, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { supabase } from '@/lib/supabase'

interface CityFormData {
  state_code: string
  state_name: string
  city_name: string
  city_slug: string
  phone: string
  sales_phone: string
  service_phone: string
  address: string
  latitude: number | null
  longitude: number | null
  service_radius: number
  coverage_area: string
  hours_operation: Record<string, string>
  hero_title: string
  hero_description: string
  hero_image_url: string
  building_types: string[]
  industries_served: string[]
  key_features: string[]
  meta_title: string
  meta_description: string
  custom_content: string
  related_cities: string[]
  is_active: boolean
  is_primary: boolean
}

const defaultFormData: CityFormData = {
  state_code: '',
  state_name: '',
  city_name: '',
  city_slug: '',
  phone: '(866) 819-9017',
  sales_phone: '',
  service_phone: '',
  address: '',
  latitude: null,
  longitude: null,
  service_radius: 75,
  coverage_area: '',
  hours_operation: {
    monday: '8:00 AM - 5:00 PM',
    tuesday: '8:00 AM - 5:00 PM',
    wednesday: '8:00 AM - 5:00 PM',
    thursday: '8:00 AM - 5:00 PM',
    friday: '8:00 AM - 5:00 PM',
    saturday: 'Closed',
    sunday: 'Closed'
  },
  hero_title: '',
  hero_description: '',
  hero_image_url: '',
  building_types: [],
  industries_served: [],
  key_features: [],
  meta_title: '',
  meta_description: '',
  custom_content: '',
  related_cities: [],
  is_active: true,
  is_primary: false
}

const states = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' }
]

const defaultBuildingTypes = [
  'Office Trailers', 'Modular Classrooms', 'Custom Modular Solutions', 'Modular Kitchen Solutions',
  'Swing Spaces', 'DropBox™ Blast-Resistant Modules', 'ADA-Compliant Restrooms', 'Storage Containers',
  'Healthcare Facilities', 'Security Buildings'
]

const defaultIndustries = [
  'Education', 'Construction', 'Medical', 'Government', 'Manufacturing', 'Industrial',
  'Retail', 'Disaster & Emergency Response', 'Religious Organizations', 'Healthcare'
]

const defaultFeatures = [
  'On-Time Delivery', 'Quick Turnaround', 'Dedicated Sales Specialist', 'Competitive Pricing',
  'Quality Accessories', 'Variety of Products', 'Quality Products'
]

const CityEditPage = () => {
  const params = useParams()
  const router = useRouter()
  const cityId = params.id as string
  const isNew = cityId === 'new'

  const [formData, setFormData] = useState<CityFormData>(defaultFormData)
  const [loading, setLoading] = useState(!isNew)
  const [saving, setSaving] = useState(false)
  const [newBuildingType, setNewBuildingType] = useState('')
  const [newIndustry, setNewIndustry] = useState('')
  const [newFeature, setNewFeature] = useState('')
  const [newRelatedCity, setNewRelatedCity] = useState('')

  useEffect(() => {
    if (!isNew) {
      loadCity()
    }
  }, [cityId, isNew])

  const loadCity = async () => {
    try {
      const response = await fetch(`/api/cities-admin/${cityId}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to load city')
      }

      const { data } = await response.json()
      setFormData(data)
    } catch (error) {
      console.error('Error loading city:', error)
      alert('Failed to load city data')
    } finally {
      setLoading(false)
    }
  }

  const generateSlug = (cityName: string) => {
    return cityName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const dataToSave = {
        ...formData,
        city_slug: formData.city_slug || generateSlug(formData.city_name),
        latitude: formData.latitude ? Number(formData.latitude) : null,
        longitude: formData.longitude ? Number(formData.longitude) : null,
        service_radius: Number(formData.service_radius)
      }

      if (isNew) {
        const response = await fetch('/api/cities-admin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSave)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create city')
        }

        const { data } = await response.json()
        router.push(`/admin/cities/${data.id}`)
      } else {
        const response = await fetch(`/api/cities-admin/${cityId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSave)
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to update city')
        }

        alert('City updated successfully!')
      }
    } catch (error) {
      console.error('Error saving city:', error)
      alert('Failed to save city')
    } finally {
      setSaving(false)
    }
  }

  const addArrayItem = (field: keyof CityFormData, value: string) => {
    if (value.trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...(prev[field] as string[]), value.trim()]
      }))
    }
  }

  const removeArrayItem = (field: keyof CityFormData, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index)
    }))
  }

  if (loading) {
    return (
      <LoadingSpinner 
        message={isNew ? "Preparing city form..." : "Loading city data..."}
        size="md"
        variant="default"
        showLogo={false}
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href="/admin/cities">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cities
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-gray-800 ml-4">
          {isNew ? 'Add New City' : `Edit ${formData.city_name}`}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={formData.state_code}
                onChange={(e) => {
                  const state = states.find(s => s.code === e.target.value)
                  setFormData(prev => ({
                    ...prev,
                    state_code: e.target.value,
                    state_name: state?.name || ''
                  }))
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state.code} value={state.code}>{state.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City Name</label>
              <input
                type="text"
                value={formData.city_name}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  city_name: e.target.value,
                  city_slug: generateSlug(e.target.value)
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City Slug</label>
              <input
                type="text"
                value={formData.city_slug}
                onChange={(e) => setFormData(prev => ({ ...prev, city_slug: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Main Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sales Phone</label>
              <input
                type="text"
                value={formData.sales_phone}
                onChange={(e) => setFormData(prev => ({ ...prev, sales_phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Phone</label>
              <input
                type="text"
                value={formData.service_phone}
                onChange={(e) => setFormData(prev => ({ ...prev, service_phone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Latitude</label>
              <input
                type="number"
                step="any"
                value={formData.latitude || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  latitude: e.target.value ? Number(e.target.value) : null 
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Longitude</label>
              <input
                type="number"
                step="any"
                value={formData.longitude || ''}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  longitude: e.target.value ? Number(e.target.value) : null 
                }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                  className="mr-2"
                />
                Active
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.is_primary}
                  onChange={(e) => setFormData(prev => ({ ...prev, is_primary: e.target.checked }))}
                  className="mr-2"
                />
                Primary Location
              </label>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Hero Section</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
              <input
                type="text"
                value={formData.hero_title}
                onChange={(e) => setFormData(prev => ({ ...prev, hero_title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Rent, Lease or Buy Modular Buildings in ${formData.city_name}, ${formData.state_code}`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
              <textarea
                value={formData.hero_description}
                onChange={(e) => setFormData(prev => ({ ...prev, hero_description: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe the services and solutions available in this city..."
              />
            </div>
          </div>
        </div>

        {/* Building Types */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Building Types</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newBuildingType}
                onChange={(e) => setNewBuildingType(e.target.value)}
                placeholder="Add building type..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Button
                type="button"
                onClick={() => {
                  addArrayItem('building_types', newBuildingType)
                  setNewBuildingType('')
                }}
                disabled={!newBuildingType.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.building_types.map((type, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {type}
                  <button
                    type="button"
                    onClick={() => removeArrayItem('building_types', index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Industries Served */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Industries Served</h2>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newIndustry}
                onChange={(e) => setNewIndustry(e.target.value)}
                placeholder="Add industry..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Button
                type="button"
                onClick={() => {
                  addArrayItem('industries_served', newIndustry)
                  setNewIndustry('')
                }}
                disabled={!newIndustry.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.industries_served.map((industry, index) => (
                <span
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                >
                  {industry}
                  <button
                    type="button"
                    onClick={() => removeArrayItem('industries_served', index)}
                    className="ml-2 text-green-600 hover:text-green-800"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SEO */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
              <input
                type="text"
                value={formData.meta_title}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Modular Buildings ${formData.city_name} ${formData.state_code} | Office Trailers & Classrooms for Rent`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
              <textarea
                value={formData.meta_description}
                onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder={`Professional modular buildings in ${formData.city_name}, ${formData.state_name}. Office trailers, portable classrooms, and custom solutions for rent, lease, or purchase.`}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end space-x-4">
          <Link href="/admin/cities">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : (isNew ? 'Create City' : 'Update City')}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CityEditPage
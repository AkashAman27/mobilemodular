'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Plus, X, Eye } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import PreviewModal from '@/components/admin/PreviewModal'
import SolutionPreview from '@/components/admin/SolutionPreview'
import SEOFormFields from '@/components/seo/SEOFormFields'
import ImageUpload from '@/components/ui/image-upload'

interface FeatureCard {
  icon: string
  title: string
  description: string
}

interface Specification {
  title: string
  size: string
  capacity: string
  price: string
  image: string
}

interface SolutionFormData {
  id: string
  slug: string
  name: string
  description: string
  features: string[] // Legacy field
  image_url: string
  category: 'office' | 'education' | 'storage' | 'healthcare' | 'security' | 'restaurant'
  starting_price: string
  dimensions: string
  capacity: string
  power: string
  climate_control: boolean
  
  // New comprehensive content fields
  page_subtitle: string
  hero_cta_text: string
  hero_cta_secondary: string
  feature_cards: FeatureCard[]
  specifications_title: string
  specifications_subtitle: string
  specifications: Specification[]
  included_title: string
  included_subtitle: string
  included_items: string[]
  included_image: string
  cta_title: string
  cta_subtitle: string
  cta_primary_text: string
  cta_secondary_text: string
  
  // SEO fields
  seo_title: string
  seo_description: string
  seo_keywords: string
  canonical_url: string
  robots_index: boolean
  robots_follow: boolean
  robots_nosnippet: boolean
  og_title: string
  og_description: string
  og_image: string
  og_image_alt: string
  twitter_title: string
  twitter_description: string
  twitter_image: string
  twitter_image_alt: string
  structured_data_type: string
  custom_json_ld: string
  focus_keyword: string
}

export default function EditSolution() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newFeature, setNewFeature] = useState('')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [usingDemoData, setUsingDemoData] = useState(false)
  
  const [formData, setFormData] = useState<SolutionFormData>({
    id: '',
    slug: '',
    name: '',
    description: '',
    features: [],
    image_url: '',
    category: 'office',
    starting_price: '',
    dimensions: '',
    capacity: '',
    power: '',
    climate_control: false,
    
    // New comprehensive content fields with defaults
    page_subtitle: 'Professional Solutions',
    hero_cta_text: 'Get Custom Quote',
    hero_cta_secondary: 'Call (866) 819-9017',
    feature_cards: [],
    specifications_title: 'Available Configurations',
    specifications_subtitle: 'Choose from our standard configurations or let us customize a solution for your specific needs.',
    specifications: [],
    included_title: 'What\'s Included',
    included_subtitle: 'Every modular building comes fully equipped and ready for immediate occupancy.',
    included_items: [],
    included_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    cta_title: 'Ready to Get Started?',
    cta_subtitle: 'Get a custom quote for your modular building project. We\'ll work with you to find the perfect solution.',
    cta_primary_text: 'Get Custom Quote',
    cta_secondary_text: 'Call (866) 819-9017',
    
    // SEO fields
    seo_title: '',
    seo_description: '',
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
    structured_data_type: 'Product',
    custom_json_ld: '',
    focus_keyword: ''
  })

  useEffect(() => {
    if (params.id) {
      fetchSolution(params.id as string)
    }
  }, [params.id])

  // Load any saved form data from localStorage
  useEffect(() => {
    if (params.id && !loading) {
      const savedData = localStorage.getItem(`solution_form_${params.id}`)
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          setFormData(prev => ({ ...prev, ...parsedData }))
          // Loaded saved form data from localStorage
        } catch (error) {
          // Error loading saved form data - silent fallback
        }
      }
    }
  }, [params.id, loading])

  // Save form data to localStorage when it changes
  useEffect(() => {
    if (params.id && !loading && formData.id) {
      const saveData = {
        image_url: formData.image_url,
        included_image: formData.included_image,
        specifications: formData.specifications,
        // Save other key fields that might be changed
        name: formData.name,
        description: formData.description,
        starting_price: formData.starting_price
      }
      localStorage.setItem(`solution_form_${params.id}`, JSON.stringify(saveData))
    }
  }, [formData, params.id, loading])

  const fetchSolution = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('solutions')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        // Silently fall back to demo data for testing purposes
        
        const demoSolution = {
          id: id,
          slug: 'office-buildings',
          name: 'Office Buildings (Demo)',
          description: 'Professional modular office spaces designed for productivity and comfort. Perfect for temporary offices, construction site headquarters, or permanent workspace solutions.',
          features: ['Climate Control', 'Professional Interior', 'Flexible Layouts', 'High-Speed Internet Ready'],
          image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
          category: 'office',
          starting_price: '$850/month',
          dimensions: '8\' x 20\' to 24\' x 60\'',
          capacity: '2-20 people',
          power: '120V/240V electrical',
          climate_control: true,
          
          // Content fields
          page_subtitle: 'Professional Solutions',
          hero_cta_text: 'Get Custom Quote',
          hero_cta_secondary: 'Call (866) 819-9017',
          feature_cards: [
            { icon: 'Building2', title: 'Professional Design', description: 'Modern interior finishes and layouts' },
            { icon: 'Zap', title: 'Quick Setup', description: 'Ready for occupancy in 24-48 hours' },
            { icon: 'Shield', title: 'Code Compliant', description: 'Meets all local building codes' },
            { icon: 'Users', title: 'Flexible Capacity', description: 'Accommodates 2-20 people comfortably' }
          ],
          specifications_title: 'Available Configurations',
          specifications_subtitle: 'Choose from our standard configurations or let us customize a solution for your specific needs.',
          specifications: [
            { title: 'Single Office', size: '8\' x 20\'', capacity: '2-4 people', price: 'Starting at $850/month', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop' },
            { title: 'Multi-Office', size: '12\' x 32\'', capacity: '6-10 people', price: 'Starting at $1,200/month', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop' }
          ],
          included_title: 'What\'s Included',
          included_subtitle: 'Every modular building comes fully equipped and ready for immediate occupancy.',
          included_items: ['Professional flooring', 'Climate control system', 'Electrical outlets', 'Lighting fixtures', 'Windows with blinds', 'Entry door with lock'],
          included_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
          cta_title: 'Ready to Get Started?',
          cta_subtitle: 'Get a custom quote for your modular building project. We\'ll work with you to find the perfect solution.',
          cta_primary_text: 'Get Custom Quote',
          cta_secondary_text: 'Call (866) 819-9017',
          
          // SEO fields  
          seo_title: 'Office Buildings - Professional Modular Workspace Solutions',
          seo_description: 'Professional modular office buildings for rent or purchase. Climate controlled, flexible layouts, ready for immediate occupancy. Starting at $850/month.',
          seo_keywords: 'modular office buildings, portable offices, temporary office space, construction site offices',
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
          structured_data_type: 'Article',
          custom_json_ld: '',
          focus_keyword: 'modular office buildings'
        }
        
        setUsingDemoData(true)
        setFormData({
          id: demoSolution.id,
          slug: demoSolution.slug,
          name: demoSolution.name,
          description: demoSolution.description,
          features: demoSolution.features || [],
          image_url: demoSolution.image_url || '',
          category: demoSolution.category as 'office' | 'education' | 'storage' | 'healthcare' | 'security' | 'restaurant',
          starting_price: demoSolution.starting_price,
          dimensions: demoSolution.dimensions || '',
          capacity: demoSolution.capacity || '',
          power: demoSolution.power || '',
          climate_control: demoSolution.climate_control || false,
          
          // Load comprehensive content fields
          page_subtitle: demoSolution.page_subtitle || 'Professional Solutions',
          hero_cta_text: demoSolution.hero_cta_text || 'Get Custom Quote',
          hero_cta_secondary: demoSolution.hero_cta_secondary || 'Call (866) 819-9017',
          feature_cards: demoSolution.feature_cards || [],
          specifications_title: demoSolution.specifications_title || 'Available Configurations',
          specifications_subtitle: demoSolution.specifications_subtitle || 'Choose from our standard configurations or let us customize a solution for your specific needs.',
          specifications: demoSolution.specifications || [],
          included_title: demoSolution.included_title || 'What\'s Included',
          included_subtitle: demoSolution.included_subtitle || 'Every modular building comes fully equipped and ready for immediate occupancy.',
          included_items: demoSolution.included_items || [],
          included_image: demoSolution.included_image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
          cta_title: demoSolution.cta_title || 'Ready to Get Started?',
          cta_subtitle: demoSolution.cta_subtitle || 'Get a custom quote for your modular building project. We\'ll work with you to find the perfect solution.',
          cta_primary_text: demoSolution.cta_primary_text || 'Get Custom Quote',
          cta_secondary_text: demoSolution.cta_secondary_text || 'Call (866) 819-9017',
          
          // SEO fields
          seo_title: demoSolution.seo_title || '',
          seo_description: demoSolution.seo_description || '',
          seo_keywords: demoSolution.seo_keywords || '',
          canonical_url: demoSolution.canonical_url || '',
          robots_index: demoSolution.robots_index !== false,
          robots_follow: demoSolution.robots_follow !== false,
          robots_nosnippet: demoSolution.robots_nosnippet || false,
          og_title: demoSolution.og_title || '',
          og_description: demoSolution.og_description || '',
          og_image: demoSolution.og_image || '',
          og_image_alt: demoSolution.og_image_alt || '',
          twitter_title: demoSolution.twitter_title || '',
          twitter_description: demoSolution.twitter_description || '',
          twitter_image: demoSolution.twitter_image || '',
          twitter_image_alt: demoSolution.twitter_image_alt || '',
          structured_data_type: demoSolution.structured_data_type || 'Article',
          custom_json_ld: demoSolution.custom_json_ld || '',
          focus_keyword: demoSolution.focus_keyword || ''
        })
        setLoading(false)
        return
      }

      if (data) {
        setFormData({
          id: data.id,
          slug: data.slug,
          name: data.name,
          description: data.description,
          features: data.features || [],
          image_url: data.image_url || '',
          category: data.category,
          starting_price: data.starting_price,
          dimensions: data.dimensions || '',
          capacity: data.capacity || '',
          power: data.power || '',
          climate_control: data.climate_control || false,
          
          // Load comprehensive content fields
          page_subtitle: data.page_subtitle || 'Professional Solutions',
          hero_cta_text: data.hero_cta_text || 'Get Custom Quote',
          hero_cta_secondary: data.hero_cta_secondary || 'Call (866) 819-9017',
          feature_cards: data.feature_cards || [],
          specifications_title: data.specifications_title || 'Available Configurations',
          specifications_subtitle: data.specifications_subtitle || 'Choose from our standard configurations or let us customize a solution for your specific needs.',
          specifications: data.specifications || [],
          included_title: data.included_title || 'What\'s Included',
          included_subtitle: data.included_subtitle || 'Every modular building comes fully equipped and ready for immediate occupancy.',
          included_items: data.included_items || [],
          included_image: data.included_image || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
          cta_title: data.cta_title || 'Ready to Get Started?',
          cta_subtitle: data.cta_subtitle || 'Get a custom quote for your modular building project. We\'ll work with you to find the perfect solution.',
          cta_primary_text: data.cta_primary_text || 'Get Custom Quote',
          cta_secondary_text: data.cta_secondary_text || 'Call (866) 819-9017',
          
          // SEO fields
          seo_title: data.seo_title || '',
          seo_description: data.seo_description || '',
          seo_keywords: data.seo_keywords || '',
          canonical_url: data.canonical_url || '',
          robots_index: data.robots_index !== false,
          robots_follow: data.robots_follow !== false,
          robots_nosnippet: data.robots_nosnippet || false,
          og_title: data.og_title || '',
          og_description: data.og_description || '',
          og_image: data.og_image || '',
          og_image_alt: data.og_image_alt || '',
          twitter_title: data.twitter_title || '',
          twitter_description: data.twitter_description || '',
          twitter_image: data.twitter_image || '',
          twitter_image_alt: data.twitter_image_alt || '',
          structured_data_type: data.structured_data_type || 'Product',
          custom_json_ld: data.custom_json_ld || '',
          focus_keyword: data.focus_keyword || ''
        })
      }
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error loading solution')
      router.push('/admin/solutions')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof SolutionFormData, value: any) => {
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

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      handleInputChange('features', [...formData.features, newFeature.trim()])
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    handleInputChange('features', formData.features.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addFeature()
    }
  }

  // Helper functions for managing feature cards
  const addFeatureCard = () => {
    const newCard: FeatureCard = {
      icon: 'Building2',
      title: '',
      description: ''
    }
    handleInputChange('feature_cards', [...formData.feature_cards, newCard])
  }

  const updateFeatureCard = (index: number, field: keyof FeatureCard, value: string) => {
    const updatedCards = [...formData.feature_cards]
    updatedCards[index] = { ...updatedCards[index], [field]: value }
    handleInputChange('feature_cards', updatedCards)
  }

  const removeFeatureCard = (index: number) => {
    handleInputChange('feature_cards', formData.feature_cards.filter((_, i) => i !== index))
  }

  // Helper functions for managing specifications
  const addSpecification = () => {
    const newSpec: Specification = {
      title: '',
      size: '',
      capacity: '',
      price: '',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
    }
    handleInputChange('specifications', [...formData.specifications, newSpec])
  }

  const updateSpecification = (index: number, field: keyof Specification, value: string) => {
    const updatedSpecs = [...formData.specifications]
    updatedSpecs[index] = { ...updatedSpecs[index], [field]: value }
    handleInputChange('specifications', updatedSpecs)
  }

  const removeSpecification = (index: number) => {
    handleInputChange('specifications', formData.specifications.filter((_, i) => i !== index))
  }

  // Helper functions for managing included items
  const addIncludedItem = (item: string) => {
    if (item.trim() && !formData.included_items.includes(item.trim())) {
      handleInputChange('included_items', [...formData.included_items, item.trim()])
    }
  }

  const removeIncludedItem = (index: number) => {
    handleInputChange('included_items', formData.included_items.filter((_, i) => i !== index))
  }

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required'
    if (!formData.slug.trim()) return 'Slug is required'
    if (!formData.description.trim()) return 'Description is required'
    if (!formData.starting_price.trim()) return 'Starting price is required'
    if (formData.features.length === 0) return 'At least one feature is required'
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
        localStorage.setItem(`solution_form_${params.id}`, JSON.stringify(saveData))
        alert('Solution changes saved locally! (Demo mode - changes will persist in browser)')
      } else {
        // For real database data, save to Supabase
        const { id, ...updateData } = formData
        const { error } = await supabase
          .from('solutions')
          .update({
            ...updateData,
            updated_at: new Date().toISOString()
          })
          .eq('id', id)

        if (error) {
          // Error updating solution - silent fallback
          alert('Error updating solution: ' + error.message)
          return
        }

        alert('Solution updated successfully!')
      }
      
      // Don't redirect, stay on the page to show the changes
      // router.push('/admin/solutions')
    } catch (error) {
      // Error updating solution - silent fallback
      alert('Error updating solution')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading solution...</p>
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
              <Link href="/admin/solutions">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Solutions
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Solution</h1>
                <p className="text-gray-600">Update solution: {formData.name}</p>
                {usingDemoData && (
                  <div className="mt-2 px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-md inline-block">
                    📝 Demo Mode - Changes saved locally
                  </div>
                )}
              </div>
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
              <CardDescription>Update the basic details for this solution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Solution Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., Office Buildings"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., office-buildings"
                    required
                  />
                </div>
              </div>

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
                    <option value="office">Office</option>
                    <option value="education">Education</option>
                    <option value="storage">Storage</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="security">Security</option>
                    <option value="restaurant">Restaurant</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Starting Price *
                  </label>
                  <input
                    type="text"
                    value={formData.starting_price}
                    onChange={(e) => handleInputChange('starting_price', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., $850/month"
                    required
                  />
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Enter a detailed description of this solution..."
                  required
                />
              </div>

              <ImageUpload
                label="Main Solution Image"
                value={formData.image_url}
                onChange={(url) => handleInputChange('image_url', url)}
                bucketName="images"
                folder="solutions"
                className="col-span-2"
              />
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
              <CardDescription>Update technical specifications and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => handleInputChange('dimensions', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., 8' x 20' to 24' x 60'"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Capacity
                  </label>
                  <input
                    type="text"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., 2-20 people"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Power Requirements
                  </label>
                  <input
                    type="text"
                    value={formData.power}
                    onChange={(e) => handleInputChange('power', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., 120V/240V electrical"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="climate_control"
                  checked={formData.climate_control}
                  onChange={(e) => handleInputChange('climate_control', e.target.checked)}
                  className="rounded border-gray-300 text-navy-600 focus:ring-navy-500"
                />
                <label htmlFor="climate_control" className="text-sm font-medium text-gray-700">
                  Climate Control Available
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>Update key features for this solution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter a feature and press Enter"
                  />
                  <Button type="button" onClick={addFeature} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.features.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-gray-700">Current Features:</h4>
                    <div className="space-y-2">
                      {formData.features.map((feature, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                          <span className="text-sm">{feature}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeFeature(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Hero Page Content */}
          <Card>
            <CardHeader>
              <CardTitle>Hero Section Content</CardTitle>
              <CardDescription>Customize the main hero section content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.page_subtitle}
                    onChange={(e) => handleInputChange('page_subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., Professional Solutions"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.hero_cta_text}
                    onChange={(e) => handleInputChange('hero_cta_text', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., Get Custom Quote"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary CTA Button Text
                </label>
                <input
                  type="text"
                  value={formData.hero_cta_secondary}
                  onChange={(e) => handleInputChange('hero_cta_secondary', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="e.g., Call (866) 819-9017"
                />
              </div>
            </CardContent>
          </Card>

          {/* Feature Cards Section */}
          <Card>
            <CardHeader>
              <CardTitle>Feature Cards (4 Icon Features)</CardTitle>
              <CardDescription>Manage the 4 feature cards with icons that appear below the hero</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {formData.feature_cards.map((card, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-700">Feature Card {index + 1}</h4>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeFeatureCard(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                        <select
                          value={card.icon}
                          onChange={(e) => updateFeatureCard(index, 'icon', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                        >
                          <option value="Building2">Building2 (Professional)</option>
                          <option value="Users">Users (Capacity)</option>
                          <option value="Zap">Zap (Speed)</option>
                          <option value="Shield">Shield (Security/Code)</option>
                          <option value="CheckCircle">CheckCircle (Quality)</option>
                          <option value="Clock">Clock (Time)</option>
                          <option value="Truck">Truck (Delivery)</option>
                          <option value="Award">Award (Quality)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={card.title}
                          onChange={(e) => updateFeatureCard(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                          placeholder="e.g., Professional Design"
                        />
                      </div>
                      <div className="md:col-span-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                          value={card.description}
                          onChange={(e) => updateFeatureCard(index, 'description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                          placeholder="Feature description..."
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addFeatureCard}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Feature Card
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Specifications Section */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications Section</CardTitle>
              <CardDescription>Manage the specifications/configurations that appear on the page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={formData.specifications_title}
                    onChange={(e) => handleInputChange('specifications_title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., Available Configurations"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.specifications_subtitle}
                    onChange={(e) => handleInputChange('specifications_subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., Choose from our standard configurations..."
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Specification Cards</h4>
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="font-medium text-gray-700">Specification {index + 1}</h5>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSpecification(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={spec.title}
                          onChange={(e) => updateSpecification(index, 'title', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                          placeholder="e.g., Single Office"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                        <input
                          type="text"
                          value={spec.size}
                          onChange={(e) => updateSpecification(index, 'size', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                          placeholder="e.g., 8' x 20'"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                        <input
                          type="text"
                          value={spec.capacity}
                          onChange={(e) => updateSpecification(index, 'capacity', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                          placeholder="e.g., 2-4 people"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                        <input
                          type="text"
                          value={spec.price}
                          onChange={(e) => updateSpecification(index, 'price', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                          placeholder="e.g., Starting at $850/month"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <ImageUpload
                        label="Specification Image"
                        value={spec.image}
                        onChange={(url) => updateSpecification(index, 'image', url)}
                        bucketName="images"
                        folder="specifications"
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSpecification}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Specification
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* What's Included Section */}
          <Card>
            <CardHeader>
              <CardTitle>What's Included Section</CardTitle>
              <CardDescription>Manage the "What's Included" section content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={formData.included_title}
                    onChange={(e) => handleInputChange('included_title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., What's Included"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.included_subtitle}
                    onChange={(e) => handleInputChange('included_subtitle', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., Every modular building comes fully equipped..."
                  />
                </div>
              </div>
              
              <ImageUpload
                label="Right Side Image"
                value={formData.included_image}
                onChange={(url) => handleInputChange('included_image', url)}
                bucketName="images"
                folder="included"
                className="col-span-2"
              />

              <div className="space-y-4">
                <h4 className="font-medium text-gray-700">Included Items (with checkmarks)</h4>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addIncludedItem((e.target as HTMLInputElement).value)
                        ;(e.target as HTMLInputElement).value = ''
                      }
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter an included item and press Enter"
                  />
                  <Button 
                    type="button" 
                    onClick={(e) => {
                      const input = e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement
                      if (input?.value) {
                        addIncludedItem(input.value)
                        input.value = ''
                      }
                    }}
                    size="sm"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {formData.included_items.length > 0 && (
                  <div className="space-y-2">
                    <h5 className="font-medium text-gray-700">Current Items:</h5>
                    <div className="space-y-2">
                      {formData.included_items.map((item, index) => (
                        <div key={index} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md">
                          <span className="text-sm">{item}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeIncludedItem(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card>
            <CardHeader>
              <CardTitle>Call-to-Action Section</CardTitle>
              <CardDescription>Customize the final CTA section content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CTA Title
                  </label>
                  <input
                    type="text"
                    value={formData.cta_title}
                    onChange={(e) => handleInputChange('cta_title', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., Ready to Get Started?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.cta_primary_text}
                    onChange={(e) => handleInputChange('cta_primary_text', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., Get Custom Quote"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CTA Subtitle/Description
                  </label>
                  <textarea
                    value={formData.cta_subtitle}
                    onChange={(e) => handleInputChange('cta_subtitle', e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., Get a custom quote for your modular building project..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Button Text
                  </label>
                  <input
                    type="text"
                    value={formData.cta_secondary_text}
                    onChange={(e) => handleInputChange('cta_secondary_text', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., Call (866) 819-9017"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SEO Section */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Configure search engine optimization for this solution page</CardDescription>
            </CardHeader>
            <CardContent>
              <SEOFormFields
                data={{
                  seo_title: formData.seo_title,
                  seo_description: formData.seo_description,
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
                  focus_keyword: formData.focus_keyword
                }}
                onChange={(field, value) => handleInputChange(field as keyof SolutionFormData, value)}
                fallbackTitle={`${formData.name} - Modular Building Solutions`}
                fallbackDescription={formData.description}
                defaultImage={formData.image_url}
              />
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPreviewOpen(true)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Website View
            </Button>
            
            <div className="flex space-x-4">
              <Link href="/admin/solutions">
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
                    Update Solution
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={`Preview: ${formData.name || 'Solution'}`}
      >
        <SolutionPreview solution={formData} />
      </PreviewModal>
    </div>
  )
}
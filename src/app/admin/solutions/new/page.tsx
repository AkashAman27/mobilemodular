'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Plus, X, Eye } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import PreviewModal from '@/components/admin/PreviewModal'
import SolutionPreview from '@/components/admin/SolutionPreview'
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
  slug: string
  name: string
  description: string
  features: string[] // Legacy field, kept for backward compatibility
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
}

export default function NewSolution() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [newFeature, setNewFeature] = useState('')
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  
  const [formData, setFormData] = useState<SolutionFormData>({
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
    feature_cards: [
      {
        icon: 'Building2',
        title: 'Professional Design',
        description: 'Modern interior finishes and professional appearance suitable for any business environment.'
      },
      {
        icon: 'Users',
        title: 'Flexible Capacity',
        description: 'Available in sizes from 2-person offices to large conference rooms and multi-room complexes.'
      },
      {
        icon: 'Zap',
        title: 'Quick Setup',
        description: 'Fast delivery and professional installation, typically ready for occupancy within days.'
      },
      {
        icon: 'Shield',
        title: 'Code Compliant',
        description: 'All units meet local building codes and ADA accessibility requirements.'
      }
    ],
    specifications_title: 'Available Configurations',
    specifications_subtitle: 'Choose from our standard configurations or let us customize a solution for your specific needs.',
    specifications: [
      {
        title: 'Standard Unit',
        size: '8\' x 20\'',
        capacity: '2-4 people',
        price: 'Starting at $850/month',
        image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
      }
    ],
    included_title: 'What\'s Included',
    included_subtitle: 'Every modular building comes fully equipped and ready for immediate occupancy.',
    included_items: [
      'Professional interior finishes',
      'Climate control (heating & cooling)',
      'Electrical system with outlets',
      'LED lighting throughout',
      'Professional flooring',
      'Windows with blinds',
      'Entry door with lock',
      'ADA-compliant options available'
    ],
    included_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    cta_title: 'Ready to Get Started?',
    cta_subtitle: 'Get a custom quote for your modular building project. We\'ll work with you to find the perfect solution.',
    cta_primary_text: 'Get Custom Quote',
    cta_secondary_text: 'Call (866) 819-9017'
  })

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
      const { error } = await supabase
        .from('solutions')
        .insert([formData])

      if (error) {
        // Silent error handling - removed console.error
        alert('Error creating solution: ' + error.message)
        return
      }

      alert('Solution created successfully!')
      router.push('/admin/solutions')
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error creating solution')
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
              <Link href="/admin/solutions">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Solutions
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Add New Solution</h1>
                <p className="text-gray-600">Create a new modular building solution</p>
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
              <CardDescription>Enter the basic details for this solution</CardDescription>
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

              <div>
                <ImageUpload
                  label="Main Solution Image"
                  value={formData.image_url}
                  onChange={(url) => handleInputChange('image_url', url)}
                  bucketName="images"
                  folder="solutions"
                />
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
              <CardDescription>Enter technical specifications and details</CardDescription>
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
              <CardDescription>Add key features for this solution</CardDescription>
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
                    <div>
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
              
              <div>
                <ImageUpload
                  label="Right Side Image"
                  value={formData.included_image}
                  onChange={(url) => handleInputChange('included_image', url)}
                  bucketName="images"
                  folder="included"
                />
              </div>

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
                    Create Solution
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
        title={`Preview: ${formData.name || 'New Solution'}`}
      >
        <SolutionPreview solution={{...formData, id: 'preview'}} />
      </PreviewModal>
    </div>
  )
}
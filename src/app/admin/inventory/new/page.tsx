'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, Save, Upload, X } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

interface InventoryCategory {
  id: string
  name: string
  slug: string
}

interface NewInventoryItem {
  name: string
  model_number: string
  description: string
  width_feet: number | null
  length_feet: number | null
  square_feet: number | null
  category_id: string
  location_state: string
  location_city: string
  main_image_url: string
  gallery_images: string[]
  features: string[]
  specifications: Record<string, any>
  availability_status: string
  rental_price_monthly: number | null
  meta_title: string
  meta_description: string
  is_active: boolean
  is_featured: boolean
}

const AVAILABILITY_OPTIONS = [
  { value: 'available', label: 'Available' },
  { value: 'rented', label: 'Rented' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'reserved', label: 'Reserved' }
]

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
]

const COMMON_FEATURES = [
  'Air Conditioning', 'WiFi', 'Kitchenette', 'Restroom', 'Conference Room',
  'Reception Area', 'Storage', 'Security System', 'Parking', 'Handicap Accessible',
  'Fire Suppression', 'Emergency Exits', 'Electrical Outlets', 'Natural Lighting',
  'Climate Control', 'Sound Insulation', 'Carpet Flooring', 'Tile Flooring'
]

export default function NewInventoryPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<InventoryCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newFeature, setNewFeature] = useState('')

  const [item, setItem] = useState<NewInventoryItem>({
    name: '',
    model_number: '',
    description: '',
    width_feet: null,
    length_feet: null,
    square_feet: null,
    category_id: '',
    location_state: '',
    location_city: '',
    main_image_url: '',
    gallery_images: [],
    features: [],
    specifications: {},
    availability_status: 'available',
    rental_price_monthly: null,
    meta_title: '',
    meta_description: '',
    is_active: true,
    is_featured: false
  })

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      
      // Fetch categories using admin API
      const categoriesResponse = await fetch('/api/inventory-admin/categories')
      const categoriesResult = await categoriesResponse.json()
      
      if (categoriesResult.success) {
        setCategories(categoriesResult.categories || [])
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Failed to load categories')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!item.name.trim()) {
      toast.error('Name is required')
      return
    }

    if (!item.category_id) {
      toast.error('Category is required')
      return
    }

    try {
      setSaving(true)
      toast.loading('Creating inventory item...', { id: 'save-operation' })

      // Calculate square feet if dimensions are provided
      const calculatedSquareFeet = item.width_feet && item.length_feet 
        ? item.width_feet * item.length_feet 
        : item.square_feet

      const createData = {
        ...item,
        name: item.name.trim(),
        model_number: item.model_number?.trim() || null,
        description: item.description?.trim() || null,
        square_feet: calculatedSquareFeet,
        location_state: item.location_state || null,
        location_city: item.location_city?.trim() || null,
        main_image_url: item.main_image_url?.trim() || null,
        meta_title: item.meta_title?.trim() || null,
        meta_description: item.meta_description?.trim() || null,
      }

      const { data, error } = await supabase
        .from('inventory_items')
        .insert([createData])
        .select()
        .single()

      if (error) throw error

      toast.success('✅ Inventory item created successfully!', { id: 'save-operation' })
      
      // Redirect to the edit page for the new item
      router.push(`/admin/inventory/${data.id}`)
    } catch (error) {
      console.error('Error creating item:', error)
      toast.error('❌ Failed to create inventory item', { id: 'save-operation' })
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field: keyof NewInventoryItem, value: any) => {
    setItem(prev => ({ ...prev, [field]: value }))
  }

  const addFeature = (feature: string) => {
    if (feature && !item.features.includes(feature)) {
      updateField('features', [...item.features, feature])
    }
  }

  const removeFeature = (feature: string) => {
    updateField('features', item.features.filter(f => f !== feature))
  }

  const addCustomFeature = () => {
    if (newFeature.trim() && !item.features.includes(newFeature.trim())) {
      addFeature(newFeature.trim())
      setNewFeature('')
    }
  }

  const addGalleryImage = () => {
    const url = prompt('Enter image URL:')
    if (url && url.trim()) {
      updateField('gallery_images', [...item.gallery_images, url.trim()])
    }
  }

  const removeGalleryImage = (index: number) => {
    const newImages = [...item.gallery_images]
    newImages.splice(index, 1)
    updateField('gallery_images', newImages)
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/admin/inventory">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inventory
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Inventory Item</h1>
            <p className="text-gray-600 mt-1">Create a new modular building inventory item</p>
          </div>
        </div>
        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Creating...' : 'Create Item'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Essential details about the inventory item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={item.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <Label htmlFor="model_number">Model Number</Label>
                  <Input
                    id="model_number"
                    value={item.model_number}
                    onChange={(e) => updateField('model_number', e.target.value)}
                    placeholder="Enter model number"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={item.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Enter item description"
                  rows={4}
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select value={item.category_id} onValueChange={(value) => updateField('category_id', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Dimensions */}
          <Card>
            <CardHeader>
              <CardTitle>Dimensions</CardTitle>
              <CardDescription>Size specifications for the building</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="width_feet">Width (feet)</Label>
                  <Input
                    id="width_feet"
                    type="number"
                    value={item.width_feet || ''}
                    onChange={(e) => updateField('width_feet', e.target.value ? parseInt(e.target.value) : null)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="length_feet">Length (feet)</Label>
                  <Input
                    id="length_feet"
                    type="number"
                    value={item.length_feet || ''}
                    onChange={(e) => updateField('length_feet', e.target.value ? parseInt(e.target.value) : null)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="square_feet">Square Feet</Label>
                  <Input
                    id="square_feet"
                    type="number"
                    value={item.square_feet || (item.width_feet && item.length_feet ? item.width_feet * item.length_feet : '')}
                    onChange={(e) => updateField('square_feet', e.target.value ? parseInt(e.target.value) : null)}
                    placeholder="Auto-calculated"
                    disabled={!!(item.width_feet && item.length_feet)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>Select applicable features for this item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {COMMON_FEATURES.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={item.features.includes(feature)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          addFeature(feature)
                        } else {
                          removeFeature(feature)
                        }
                      }}
                    />
                    <Label htmlFor={feature} className="text-sm">{feature}</Label>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Custom Features</Label>
                <div className="flex space-x-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add custom feature"
                  />
                  <Button type="button" onClick={addCustomFeature}>Add</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.features.filter(f => !COMMON_FEATURES.includes(f)).map((feature) => (
                    <div key={feature} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
                      <span className="text-sm">{feature}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-4 w-4 p-0"
                        onClick={() => removeFeature(feature)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="availability_status">Availability</Label>
                <Select 
                  value={item.availability_status} 
                  onValueChange={(value) => updateField('availability_status', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABILITY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_active"
                  checked={item.is_active}
                  onCheckedChange={(checked) => updateField('is_active', checked)}
                />
                <Label htmlFor="is_active">Active</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="is_featured"
                  checked={item.is_featured}
                  onCheckedChange={(checked) => updateField('is_featured', checked)}
                />
                <Label htmlFor="is_featured">Featured</Label>
              </div>
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>Location</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location_state">State</Label>
                <Select 
                  value={item.location_state} 
                  onValueChange={(value) => updateField('location_state', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location_city">City</Label>
                <Input
                  id="location_city"
                  value={item.location_city}
                  onChange={(e) => updateField('location_city', e.target.value)}
                  placeholder="Enter city"
                />
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="rental_price_monthly">Monthly Rental Price</Label>
                <Input
                  id="rental_price_monthly"
                  type="number"
                  step="0.01"
                  value={item.rental_price_monthly || ''}
                  onChange={(e) => updateField('rental_price_monthly', e.target.value ? parseFloat(e.target.value) : null)}
                  placeholder="0.00"
                />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="main_image_url">Main Image URL</Label>
                <Input
                  id="main_image_url"
                  value={item.main_image_url}
                  onChange={(e) => updateField('main_image_url', e.target.value)}
                  placeholder="https://..."
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <Label>Gallery Images</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addGalleryImage}>
                    <Upload className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>
                <div className="space-y-2">
                  {item.gallery_images.map((url, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input value={url} readOnly className="flex-1" />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeGalleryImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
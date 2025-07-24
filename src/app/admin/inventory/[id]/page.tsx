'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { ArrowLeft, Save, Trash2, Upload, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { toast } from 'react-hot-toast'

interface InventoryItem {
  id: string
  name: string
  model_number: string
  description: string
  width_feet: number
  length_feet: number
  square_feet: number
  category_id: string
  location_state: string
  location_city: string
  main_image_url: string
  gallery_images: string[]
  features: string[]
  specifications: Record<string, any>
  availability_status: string
  rental_price_monthly: number
  rating: number
  review_count: number
  meta_title: string
  meta_description: string
  is_active: boolean
  is_featured: boolean
  created_at: string
  updated_at: string
}

interface InventoryCategory {
  id: string
  name: string
  slug: string
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

export default function InventoryEditPage() {
  const router = useRouter()
  const params = useParams()
  const [item, setItem] = useState<InventoryItem | null>(null)
  const [categories, setCategories] = useState<InventoryCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newFeature, setNewFeature] = useState('')


  useEffect(() => {
    if (params.id) {
      fetchData()
    }
  }, [params.id])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('inventory_categories')
        .select('id, name, slug')
        .eq('is_active', true)
        .order('order_index')

      // Fetch inventory item
      const { data: itemData } = await supabase
        .from('inventory_items')
        .select('*')
        .eq('id', params.id)
        .single()

      setCategories(categoriesData || [])
      
      if (itemData) {
        setItem({
          ...itemData,
          features: itemData.features || [],
          gallery_images: itemData.gallery_images || [],
          specifications: itemData.specifications || {}
        })
      }
    } catch (error) {
      console.error('Error fetching data:', error)
      toast.error('Failed to load inventory item')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    if (!item) return

    try {
      setSaving(true)

      // Validate required fields
      if (!item.name.trim()) {
        toast.error('Name is required')
        return
      }

      const updateData = {
        name: item.name.trim(),
        model_number: item.model_number?.trim() || null,
        description: item.description?.trim() || null,
        width_feet: item.width_feet || null,
        length_feet: item.length_feet || null,
        square_feet: item.square_feet || null,
        category_id: item.category_id || null,
        location_state: item.location_state || null,
        location_city: item.location_city?.trim() || null,
        main_image_url: item.main_image_url?.trim() || null,
        gallery_images: item.gallery_images || [],
        features: item.features || [],
        specifications: item.specifications || {},
        availability_status: item.availability_status || 'available',
        rental_price_monthly: item.rental_price_monthly || null,
        rating: item.rating || null,
        review_count: item.review_count || null,
        meta_title: item.meta_title?.trim() || null,
        meta_description: item.meta_description?.trim() || null,
        is_active: item.is_active || false,
        is_featured: item.is_featured || false,
        updated_at: new Date().toISOString()
      }

      console.log('Updating item with data:', updateData)

      const { data, error } = await supabase
        .from('inventory_items')
        .update(updateData)
        .eq('id', item.id)
        .select()

      console.log('Update result:', { data, error })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      toast.success('Inventory item updated successfully!')
      // Refresh the item data to reflect changes
      await fetchData()
    } catch (error) {
      console.error('Error saving item:', error)
      toast.error(`Failed to save inventory item: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!item || !confirm('Are you sure you want to delete this inventory item? This action cannot be undone.')) return

    try {
      const { error } = await supabase
        .from('inventory_items')
        .delete()
        .eq('id', item.id)

      if (error) throw error

      toast.success('Inventory item deleted successfully!')
      router.push('/admin/inventory')
    } catch (error) {
      console.error('Error deleting item:', error)
      toast.error('Failed to delete inventory item')
    }
  }

  const addFeature = () => {
    if (newFeature.trim() && item && !item.features.includes(newFeature.trim())) {
      setItem({
        ...item,
        features: [...item.features, newFeature.trim()]
      })
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    if (item) {
      setItem({
        ...item,
        features: item.features.filter((_, i) => i !== index)
      })
    }
  }

  const toggleCommonFeature = (feature: string) => {
    if (!item) return

    const features = item.features.includes(feature)
      ? item.features.filter(f => f !== feature)
      : [...item.features, feature]

    setItem({ ...item, features })
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading inventory item...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!item) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Item Not Found</h2>
          <p className="text-gray-600 mb-6">The inventory item you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/admin/inventory">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inventory
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" asChild>
            <Link href="/admin/inventory">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Inventory
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Inventory Item</h1>
            <p className="text-gray-600 mt-1">Update the details of your inventory item</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" onClick={handleDelete} className="text-red-600">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Update the basic details of your inventory item</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={item.name}
                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                    placeholder="Enter item name"
                  />
                </div>
                <div>
                  <Label htmlFor="model_number">Model Number</Label>
                  <Input
                    id="model_number"
                    value={item.model_number || ''}
                    onChange={(e) => setItem({ ...item, model_number: e.target.value })}
                    placeholder="Enter model number"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={item.description || ''}
                  onChange={(e) => setItem({ ...item, description: e.target.value })}
                  placeholder="Describe the inventory item"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="width_feet">Width (feet)</Label>
                  <Input
                    id="width_feet"
                    type="number"
                    value={item.width_feet || ''}
                    onChange={(e) => setItem({ ...item, width_feet: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="length_feet">Length (feet)</Label>
                  <Input
                    id="length_feet"
                    type="number"
                    value={item.length_feet || ''}
                    onChange={(e) => setItem({ ...item, length_feet: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="square_feet">Square Feet</Label>
                  <Input
                    id="square_feet"
                    type="number"
                    value={item.square_feet || ''}
                    onChange={(e) => setItem({ ...item, square_feet: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location & Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Location & Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location_city">City</Label>
                  <Input
                    id="location_city"
                    value={item.location_city || ''}
                    onChange={(e) => setItem({ ...item, location_city: e.target.value })}
                    placeholder="Enter city"
                  />
                </div>
                <div>
                  <Label htmlFor="location_state">State</Label>
                  <Select value={item.location_state} onValueChange={(value) => setItem({ ...item, location_state: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((state) => (
                        <SelectItem key={state} value={state}>{state}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rental_price_monthly">Monthly Rental Price ($)</Label>
                  <Input
                    id="rental_price_monthly"
                    type="number"
                    step="0.01"
                    value={item.rental_price_monthly || ''}
                    onChange={(e) => setItem({ ...item, rental_price_monthly: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label htmlFor="availability_status">Availability Status</Label>
                  <Select value={item.availability_status} onValueChange={(value) => setItem({ ...item, availability_status: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {AVAILABILITY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
              <CardDescription>Select common features or add custom ones</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Common Features */}
              <div>
                <Label>Common Features</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {COMMON_FEATURES.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <Checkbox
                        id={`feature-${feature}`}
                        checked={item.features.includes(feature)}
                        onCheckedChange={() => toggleCommonFeature(feature)}
                      />
                      <Label htmlFor={`feature-${feature}`} className="text-sm">{feature}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Features */}
              <div>
                <Label>Custom Features</Label>
                <div className="flex space-x-2 mt-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add custom feature"
                    onKeyPress={(e) => e.key === 'Enter' && addFeature()}
                  />
                  <Button onClick={addFeature} variant="outline">Add</Button>
                </div>
              </div>

              {/* Selected Features */}
              {item.features.length > 0 && (
                <div>
                  <Label>Selected Features</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.features.map((feature, index) => (
                      <div key={index} className="flex items-center bg-gray-100 rounded-md px-3 py-1">
                        <span className="text-sm">{feature}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeature(index)}
                          className="ml-2 h-auto p-0"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
              <CardDescription>Optimize for search engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                  id="meta_title"
                  value={item.meta_title || ''}
                  onChange={(e) => setItem({ ...item, meta_title: e.target.value })}
                  placeholder="SEO title for this item"
                />
              </div>
              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={item.meta_description || ''}
                  onChange={(e) => setItem({ ...item, meta_description: e.target.value })}
                  placeholder="SEO description for this item"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Image */}
          <Card>
            <CardHeader>
              <CardTitle>Main Image</CardTitle>
            </CardHeader>
            <CardContent>
              {item.main_image_url && (
                <div className="relative w-full h-48 bg-gray-100 rounded-lg overflow-hidden mb-4">
                  <Image
                    src={item.main_image_url}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <Label htmlFor="main_image_url">Image URL</Label>
                <Input
                  id="main_image_url"
                  value={item.main_image_url || ''}
                  onChange={(e) => setItem({ ...item, main_image_url: e.target.value })}
                  placeholder="Enter image URL"
                />
              </div>
            </CardContent>
          </Card>

          {/* Category & Status */}
          <Card>
            <CardHeader>
              <CardTitle>Category & Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category_id">Category</Label>
                <Select value={item.category_id} onValueChange={(value) => setItem({ ...item, category_id: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_active"
                    checked={item.is_active}
                    onCheckedChange={(checked) => setItem({ ...item, is_active: !!checked })}
                  />
                  <Label htmlFor="is_active">Active</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="is_featured"
                    checked={item.is_featured}
                    onCheckedChange={(checked) => setItem({ ...item, is_featured: !!checked })}
                  />
                  <Label htmlFor="is_featured">Featured</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ratings */}
          <Card>
            <CardHeader>
              <CardTitle>Ratings & Reviews</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="rating">Rating (0-5)</Label>
                <Input
                  id="rating"
                  type="number"
                  min="0"
                  max="5"
                  step="0.1"
                  value={item.rating || ''}
                  onChange={(e) => setItem({ ...item, rating: parseFloat(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label htmlFor="review_count">Review Count</Label>
                <Input
                  id="review_count"
                  type="number"
                  min="0"
                  value={item.review_count || ''}
                  onChange={(e) => setItem({ ...item, review_count: parseInt(e.target.value) || 0 })}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Upload, Star, Tag, Eye } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { ImageUpload } from '@/components/ui/image-upload'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

interface GalleryFormData {
  title: string
  description: string
  image_url: string
  alt_text: string
  category: string
  tags: string[]
  sort_order: number
  is_featured: boolean
  is_active: boolean
}

const categoryOptions = [
  { value: 'office-buildings', label: 'Office Buildings' },
  { value: 'portable-classrooms', label: 'Portable Classrooms' },
  { value: 'restroom-facilities', label: 'Restroom Facilities' },
  { value: 'restaurant-food-service', label: 'Restaurant & Food Service' },
  { value: 'healthcare-facilities', label: 'Healthcare Facilities' },
  { value: 'security-buildings', label: 'Security Buildings' },
  { value: 'storage-containers', label: 'Storage Containers' },
  { value: 'general', label: 'General' }
]

interface EditGalleryItemProps {
  params: Promise<{ id: string }>
}

export default function EditGalleryItem({ params }: EditGalleryItemProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newTag, setNewTag] = useState('')
  const [itemId, setItemId] = useState<string>('')
  
  const [formData, setFormData] = useState<GalleryFormData>({
    title: '',
    description: '',
    image_url: '',
    alt_text: '',
    category: 'general',
    tags: [],
    sort_order: 0,
    is_featured: false,
    is_active: true
  })

  useEffect(() => {
    const resolveParams = async () => {
      const resolvedParams = await params
      setItemId(resolvedParams.id)
    }
    resolveParams()
  }, [params])

  useEffect(() => {
    if (itemId) {
      fetchGalleryItem()
    }
  }, [itemId])

  const fetchGalleryItem = async () => {
    try {
      const { data, error } = await supabase
        .from('product_gallery')
        .select('*')
        .eq('id', itemId)
        .single()

      if (error) {
        // Silent error handling - removed console.error
        alert('Error loading gallery item')
        router.push('/admin/product-gallery')
        return
      }

      if (data) {
        setFormData({
          title: data.title || '',
          description: data.description || '',
          image_url: data.image_url || '',
          alt_text: data.alt_text || '',
          category: data.category || 'general',
          tags: data.tags || [],
          sort_order: data.sort_order || 0,
          is_featured: data.is_featured || false,
          is_active: data.is_active !== false
        })
      }
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error loading gallery item')
      router.push('/admin/product-gallery')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof GalleryFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({
      ...prev,
      image_url: url
    }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }))
      setNewTag('')
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required'
    if (!formData.image_url.trim()) return 'Image is required'
    if (!formData.category) return 'Category is required'
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
        .from('product_gallery')
        .update({
          ...formData,
          tags: formData.tags.length > 0 ? formData.tags : null,
          updated_at: new Date().toISOString()
        })
        .eq('id', itemId)

      if (error) {
        // Silent error handling - removed console.error
        alert('Error updating gallery item: ' + error.message)
        return
      }

      alert('Gallery item updated successfully!')
      router.push('/admin/product-gallery')
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error updating gallery item')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading gallery item...</p>
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
              <Link href="/admin/product-gallery">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Gallery
                </Button>
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">Edit Gallery Item</h1>
            </div>
            <Button onClick={handleSubmit} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the basic details for this gallery item
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter item title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter item description"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={formData.alt_text}
                    onChange={(e) => handleInputChange('alt_text', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe the image for accessibility"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) => handleInputChange('sort_order', parseInt(e.target.value) || 0)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Lower numbers appear first (0 = highest priority)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add tags to help categorize and filter this item
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                    className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a tag"
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Tag className="h-4 w-4" />
                  </Button>
                </div>
                
                {formData.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-1 text-xs hover:text-red-600"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>
                  Configure visibility and featured status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_featured"
                    checked={formData.is_featured}
                    onChange={(e) => handleInputChange('is_featured', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="is_featured" className="text-sm font-medium text-gray-700 flex items-center">
                    <Star className="h-4 w-4 mr-1" />
                    Featured Item
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={formData.is_active}
                    onChange={(e) => handleInputChange('is_active', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="is_active" className="text-sm font-medium text-gray-700 flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    Active (visible on website)
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Image Upload & Preview */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Image *</CardTitle>
                <CardDescription>
                  Upload an image for this gallery item
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  value={formData.image_url}
                  onChange={handleImageUpload}
                  className="w-full"
                />
                
                {formData.image_url && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                    <div className="relative aspect-video w-full rounded-lg overflow-hidden border">
                      <Image
                        src={formData.image_url}
                        alt={formData.alt_text || formData.title || 'Preview'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preview Card */}
            {formData.title && formData.image_url && (
              <Card>
                <CardHeader>
                  <CardTitle>Gallery Preview</CardTitle>
                  <CardDescription>
                    How this item will appear in the gallery
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-48">
                      <Image
                        src={formData.image_url}
                        alt={formData.alt_text || formData.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 flex gap-2">
                        {formData.is_featured && (
                          <Badge className="bg-yellow-400 text-black text-xs">
                            Featured
                          </Badge>
                        )}
                        {!formData.is_active && (
                          <Badge variant="secondary" className="text-xs">
                            Inactive
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-1">{formData.title}</h3>
                      {formData.description && (
                        <p className="text-sm text-gray-600 mb-2">{formData.description}</p>
                      )}
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {formData.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {formData.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{formData.tags.length - 3} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
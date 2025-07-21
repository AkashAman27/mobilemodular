'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, ArrowLeft, Image as ImageIcon, Star, Eye, Filter } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/select'

interface GalleryItem {
  id: string
  title: string
  description?: string
  image_url: string
  alt_text?: string
  category: string
  tags?: string[]
  sort_order: number
  is_featured: boolean
  is_active: boolean
  created_at: string
  updated_at: string
}

const categoryLabels = {
  'office-buildings': 'Office Buildings',
  'portable-classrooms': 'Portable Classrooms',
  'restroom-facilities': 'Restroom Facilities',
  'restaurant-food-service': 'Restaurant & Food Service',
  'healthcare-facilities': 'Healthcare Facilities',
  'security-buildings': 'Security Buildings',
  'storage-containers': 'Storage Containers',
  'general': 'General'
}

export default function ProductGalleryAdmin() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([])

  useEffect(() => {
    fetchGalleryItems()
  }, [])

  useEffect(() => {
    filterItems()
  }, [selectedCategory, galleryItems])

  const fetchGalleryItems = async () => {
    try {
      const { data, error } = await supabase
        .from('product_gallery')
        .select('*')
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) {
        // Silent error handling - removed console.error
        return
      }

      setGalleryItems(data || [])
    } catch (error) {
      // Silent error handling - removed console.error
    } finally {
      setLoading(false)
    }
  }

  const filterItems = () => {
    if (selectedCategory === 'all') {
      setFilteredItems(galleryItems)
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === selectedCategory))
    }
  }

  const deleteItem = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('product_gallery')
        .delete()
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        alert('Error deleting item')
        return
      }

      // Remove from local state
      setGalleryItems(prev => prev.filter(item => item.id !== id))
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error deleting item')
    }
  }

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('product_gallery')
        .update({ is_featured: !currentStatus })
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        return
      }

      // Update local state
      setGalleryItems(prev => prev.map(item => 
        item.id === id ? { ...item, is_featured: !currentStatus } : item
      ))
    } catch (error) {
      // Silent error handling - removed console.error
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('product_gallery')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        return
      }

      // Update local state
      setGalleryItems(prev => prev.map(item => 
        item.id === id ? { ...item, is_active: !currentStatus } : item
      ))
    } catch (error) {
      // Silent error handling - removed console.error
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Product Gallery</h1>
        </div>
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/admin">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Product Gallery</h1>
        </div>
        <Link href="/admin/product-gallery/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Gallery Item
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{galleryItems.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Featured Items</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {galleryItems.filter(item => item.is_featured).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Items</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {galleryItems.filter(item => item.is_active).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Filter className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(galleryItems.map(item => item.category)).size}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center space-x-4">
        <label className="text-sm font-medium">Filter by Category:</label>
        <select 
          value={selectedCategory} 
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm"
        >
          <option value="all">All Categories ({galleryItems.length})</option>
          {Object.entries(categoryLabels).map(([key, label]) => {
            const count = galleryItems.filter(item => item.category === key).length
            if (count === 0) return null
            return (
              <option key={key} value={key}>
                {label} ({count})
              </option>
            )
          })}
        </select>
      </div>

      {/* Gallery Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative h-48">
              <Image
                src={item.image_url}
                alt={item.alt_text || item.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 flex gap-2">
                {item.is_featured && (
                  <Badge className="bg-yellow-400 text-black text-xs">
                    Featured
                  </Badge>
                )}
                {!item.is_active && (
                  <Badge variant="secondary" className="text-xs">
                    Inactive
                  </Badge>
                )}
              </div>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {categoryLabels[item.category as keyof typeof categoryLabels]}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {item.description && (
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {item.description}
                </p>
              )}
              
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {item.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {item.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{item.tags.length - 3} more
                    </Badge>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFeatured(item.id, item.is_featured)}
                    className="text-xs"
                  >
                    <Star className={`h-3 w-3 mr-1 ${item.is_featured ? 'fill-current text-yellow-500' : ''}`} />
                    {item.is_featured ? 'Unfeature' : 'Feature'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleActive(item.id, item.is_active)}
                    className="text-xs"
                  >
                    <Eye className={`h-3 w-3 mr-1 ${!item.is_active ? 'opacity-50' : ''}`} />
                    {item.is_active ? 'Hide' : 'Show'}
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Link href={`/admin/product-gallery/${item.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteItem(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No gallery items found</h3>
          <p className="text-gray-600 mb-6">
            {selectedCategory === 'all' 
              ? 'Get started by adding your first gallery item.'
              : 'No items found in this category. Try selecting a different category or add a new item.'}
          </p>
          <Link href="/admin/product-gallery/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Gallery Item
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
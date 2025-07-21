'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { PageLayout } from '@/components/layout/PageLayout'
import { PageHeader } from '@/components/layout/PageHeader'
import { supabase } from '@/lib/supabase'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
// Dialog removed - using modal overlay instead
import { ArrowLeft, ArrowRight, ZoomIn, Filter, Grid, List } from 'lucide-react'
// Metadata is handled by layout.tsx since this is a client component

interface GalleryItem {
  id: string
  title: string
  description?: string
  image_url: string
  alt_text?: string
  category: string
  tags?: string[]
  is_featured: boolean
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

const fallbackGalleryData: GalleryItem[] = [
  {
    id: '1',
    title: 'Modern Office Complex',
    description: 'Professional modular office building with conference room and workstations',
    image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    alt_text: 'Modern modular office building exterior',
    category: 'office-buildings',
    tags: ['professional', 'multi-room', 'climate-controlled'],
    is_featured: true
  },
  {
    id: '2',
    title: 'Portable Classroom',
    description: 'Fully equipped classroom for 25 students with interactive technology',
    image_url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
    alt_text: 'Interior of a portable classroom',
    category: 'portable-classrooms',
    tags: ['education', 'technology-ready', 'ADA-compliant'],
    is_featured: true
  },
  {
    id: '3',
    title: 'Construction Site Office',
    description: 'On-site project management office with plan review area',
    image_url: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    alt_text: 'Construction site with modular office building',
    category: 'office-buildings',
    tags: ['construction', 'project-management', 'durable'],
    is_featured: false
  },
  {
    id: '4',
    title: 'Medical Facility',
    description: 'Healthcare-grade modular building with examination rooms',
    image_url: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&h=600&fit=crop',
    alt_text: 'Medical examination room in modular facility',
    category: 'healthcare-facilities',
    tags: ['medical-grade', 'HVAC-filtered', 'emergency-power'],
    is_featured: true
  },
  {
    id: '5',
    title: 'Security Checkpoint',
    description: 'Professional security building with 360-degree visibility',
    image_url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
    alt_text: 'Security checkpoint building',
    category: 'security-buildings',
    tags: ['security', 'bullet-resistant', 'communications-ready'],
    is_featured: false
  },
  {
    id: '6',
    title: 'Commercial Kitchen',
    description: 'Food service building with commercial-grade kitchen equipment',
    image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    alt_text: 'Commercial kitchen in modular restaurant facility',
    category: 'restaurant-food-service',
    tags: ['commercial-kitchen', 'health-code-compliant', 'ventilation'],
    is_featured: false
  },
  {
    id: '7',
    title: 'ADA-Compliant Restrooms',
    description: 'Clean, accessible restroom facilities for events and construction sites',
    image_url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
    alt_text: 'Clean modular restroom facility',
    category: 'restroom-facilities',
    tags: ['ADA-compliant', 'running-water', 'waste-management'],
    is_featured: false
  },
  {
    id: '8',
    title: 'Storage Container',
    description: 'Secure portable storage solution for equipment and materials',
    image_url: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    alt_text: 'Secure storage container',
    category: 'storage-containers',
    tags: ['weather-resistant', 'secure-locks', 'ground-level-access'],
    is_featured: false
  }
]

export default function ProductGalleryPage() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(fallbackGalleryData)
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(fallbackGalleryData)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [loading, setLoading] = useState(true)

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
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) {
        // Silent error handling - use fallback data
        setGalleryItems(fallbackGalleryData)
        setFilteredItems(fallbackGalleryData)
      } else if (data && data.length > 0) {
        setGalleryItems(data)
        setFilteredItems(data)
      } else {
        // No data found, use fallback
        setGalleryItems(fallbackGalleryData)
        setFilteredItems(fallbackGalleryData)
      }
    } catch (err) {
      // Silent error handling - use fallback data
      setGalleryItems(fallbackGalleryData)
      setFilteredItems(fallbackGalleryData)
    } finally {
      setLoading(false)
    }
  }

  const filterItems = () => {
    if (selectedCategory === 'all') {
      setFilteredItems(galleryItems)
    } else if (selectedCategory === 'featured') {
      setFilteredItems(galleryItems.filter(item => item.is_featured))
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === selectedCategory))
    }
  }

  const categories = Object.keys(categoryLabels)
  const featuredItems = galleryItems.filter(item => item.is_featured)

  return (
    <PageLayout>
      <PageHeader
        subtitle="Resource Gallery"
        title="Product Gallery"
        description="Browse our comprehensive gallery of modular building solutions. From office buildings to portable classrooms, see the quality and versatility of our products."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Product Gallery' }
        ]}
      />

      {/* Featured Items Section */}
      {featuredItems.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-primary mb-4">Featured Projects</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Showcase of our most popular and versatile modular building solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredItems.map((item) => (
                <div
                  key={item.id}
                  className="group cursor-pointer bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
                  onClick={() => setSelectedImage(item)}
                >
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt={item.alt_text || item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <Badge className="absolute top-4 left-4 bg-yellow-400 text-black">
                      Featured
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-gray-600 mb-4">{item.description}</p>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {item.tags?.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Filter and View Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12 gap-6">
            <div className="flex flex-wrap gap-3">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                className={selectedCategory === 'all' ? 'bg-primary' : ''}
              >
                All ({galleryItems.length})
              </Button>
              <Button
                variant={selectedCategory === 'featured' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('featured')}
                className={selectedCategory === 'featured' ? 'bg-primary' : ''}
              >
                Featured ({featuredItems.length})
              </Button>
              {categories.map((category) => {
                const count = galleryItems.filter(item => item.category === category).length
                if (count === 0) return null
                return (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'bg-primary' : ''}
                  >
                    {categoryLabels[category as keyof typeof categoryLabels]} ({count})
                  </Button>
                )
              })}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className={viewMode === 'grid' ? 'bg-primary' : ''}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
                className={viewMode === 'list' ? 'bg-primary' : ''}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Gallery Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="text-gray-600 mt-4">Loading gallery...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No items found</h3>
              <p className="text-gray-600">Try selecting a different category or view all items.</p>
            </div>
          ) : (
            <div className={`${
              viewMode === 'grid' 
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-6'
            }`}>
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`group cursor-pointer bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                  }`}
                  onClick={() => setSelectedImage(item)}
                >
                  <div className={`relative overflow-hidden ${
                    viewMode === 'list' ? 'md:w-1/3 h-48 md:h-auto' : 'h-48'
                  }`}>
                    <Image
                      src={item.image_url}
                      alt={item.alt_text || item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    {item.is_featured && (
                      <Badge className="absolute top-2 left-2 bg-yellow-400 text-black text-xs">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <div className={`p-4 ${viewMode === 'list' ? 'md:w-2/3 flex flex-col justify-center' : ''}`}>
                    <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                    {item.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                    )}
                    <div className="flex flex-wrap gap-1">
                      {item.tags?.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-primary">{selectedImage.title}</h3>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setSelectedImage(null)}
                >
                  ✕
                </Button>
              </div>
              <div className="relative aspect-video w-full rounded-lg overflow-hidden mb-4">
                <Image
                  src={selectedImage.image_url}
                  alt={selectedImage.alt_text || selectedImage.title}
                  fill
                  className="object-cover"
                />
              </div>
              {selectedImage.description && (
                <p className="text-gray-600 mb-4">{selectedImage.description}</p>
              )}
              {selectedImage.tags && selectedImage.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {selectedImage.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Inspired by What You See?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a custom quote for your modular building project. We'll work with you to create the perfect solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Get Custom Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white/10">
              Call (866) 819-9017
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
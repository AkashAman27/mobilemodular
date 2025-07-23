'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { MapPin, Ruler, Star, Building, Users, ChevronDown, Search, Filter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface InventoryItem {
  id: string
  name: string
  model_number: string
  description: string
  width_feet: number
  length_feet: number
  square_feet: number
  location_state: string
  location_city: string
  main_image_url: string
  features: string[]
  availability_status: string
  rating: number
  review_count: number
  is_featured: boolean
  category: {
    name: string
    slug: string
  }
  floorplans: Array<{
    id: string
    name: string
    model_number: string
    square_feet: number
    restrooms: number
    offices: number
    floorplan_image_url: string
    rental_price_monthly: number
  }>
}

interface InventoryCategory {
  id: string
  name: string
  slug: string
}

export default function LiveInventoryClient() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [categories, setCategories] = useState<InventoryCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedLocation, setSelectedLocation] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('inventory_categories')
        .select('id, name, slug')
        .eq('is_active', true)
        .order('order_index')

      // Fetch inventory items with related data
      const { data: itemsData } = await supabase
        .from('inventory_items')
        .select(`
          *,
          category:inventory_categories(name, slug),
          floorplans(
            id, name, model_number, square_feet, restrooms, offices,
            floorplan_image_url, rental_price_monthly
          )
        `)
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false })

      setCategories(categoriesData || [])
      setItems(itemsData || [])
    } catch (error) {
      console.error('Error fetching inventory data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category?.slug === selectedCategory
    const matchesLocation = selectedLocation === 'all' || item.location_city === selectedLocation
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model_number.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesLocation && matchesSearch
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)
      case 'rating':
        return b.rating - a.rating
      case 'size':
        return b.square_feet - a.square_feet
      case 'price':
        const aPrice = a.floorplans?.[0]?.rental_price_monthly || 0
        const bPrice = b.floorplans?.[0]?.rental_price_monthly || 0
        return aPrice - bPrice
      default:
        return 0
    }
  })

  const uniqueLocations = [...new Set(items.map(item => item.location_city))].sort()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading inventory...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search buildings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.slug}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger className="w-[180px]">
                  <MapPin className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="All Locations" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="size">Largest First</SelectItem>
                  <SelectItem value="price">Lowest Price</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {sortedItems.length} of {items.length} available buildings
          </div>
        </div>
      </section>

      {/* Inventory Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {sortedItems.length === 0 ? (
            <div className="text-center py-16">
              <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No buildings found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
              <Button onClick={() => {
                setSelectedCategory('all')
                setSelectedLocation('all')
                setSearchQuery('')
              }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {sortedItems.map((item) => (
                <InventoryCard key={item.id} item={item} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function InventoryCard({ item }: { item: InventoryItem }) {
  const [activeTab, setActiveTab] = useState('buildings')

  return (
    <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <Image
          src={item.main_image_url || '/images/placeholder-building.jpg'}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.is_featured && (
          <Badge className="absolute top-4 left-4 bg-orange-500 hover:bg-orange-600">
            Featured
          </Badge>
        )}
        <Badge 
          className={`absolute top-4 right-4 ${
            item.availability_status === 'available' 
              ? 'bg-green-500 hover:bg-green-600' 
              : 'bg-red-500 hover:bg-red-600'
          }`}
        >
          {item.availability_status === 'available' ? 'Available' : 'Rented'}
        </Badge>
      </div>

      <CardContent className="p-6">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {item.category?.name}
            </Badge>
            {item.rating > 0 && (
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium ml-1">{item.rating}</span>
                <span className="text-xs text-gray-500 ml-1">({item.review_count})</span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-navy-600 group-hover:text-steel-600 transition-colors">
            {item.name}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{item.description}</p>
        </div>

        {/* Specifications */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center">
            <Ruler className="h-4 w-4 text-gray-400 mr-2" />
            <span>Width: {item.width_feet}'</span>
          </div>
          <div className="flex items-center">
            <Ruler className="h-4 w-4 text-gray-400 mr-2" />
            <span>Length: {item.length_feet}'</span>
          </div>
          <div className="flex items-center">
            <Building className="h-4 w-4 text-gray-400 mr-2" />
            <span>Square Feet: {item.square_feet}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <span>{item.location_city}, {item.location_state}</span>
          </div>
        </div>

        {/* Tabs for Buildings and Floorplans */}
        {item.floorplans && item.floorplans.length > 0 && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="buildings">Buildings</TabsTrigger>
              <TabsTrigger value="floorplans">Floorplans</TabsTrigger>
            </TabsList>
            
            <TabsContent value="buildings" className="mt-4">
              <div className="space-y-2">
                {item.features && item.features.slice(0, 3).map((feature, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="floorplans" className="mt-4">
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {item.floorplans.map((floorplan) => (
                  <div key={floorplan.id} className="flex justify-between items-center text-sm p-2 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">{floorplan.name}</div>
                      <div className="text-gray-500 text-xs">
                        {floorplan.square_feet} sq ft • {floorplan.restrooms} restroom{floorplan.restrooms !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-navy-600">
                        ${floorplan.rental_price_monthly}/mo
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button asChild className="flex-1">
            <Link href={`/resources/live-inventory/${item.id}`}>
              See Details
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/quote?item=${item.id}`}>
              Add to Quote
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
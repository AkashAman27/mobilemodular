'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Search, MapPin, Ruler, Star, Building, DollarSign,
  Eye, Grid3X3, List, Brain, Sparkles, Filter, SlidersHorizontal, RotateCcw
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface EnhancedInventoryItem {
  id: string
  name: string
  model_number: string
  description: string
  width_feet: number
  length_feet: number
  square_feet: number
  location_state: string
  location_city: string
  availability_status: 'available' | 'rented' | 'maintenance' | 'reserved'
  main_image_url: string
  features: string[]
  amenities: string[]
  base_price_monthly: number
  setup_fee: number
  delivery_fee: number
  is_featured: boolean
  is_new_arrival: boolean
  is_popular: boolean
  rating: number
  review_count: number
  view_count: number
  ai_tags: string[]
  category: {
    id: string
    name: string
    slug: string
    color_hex: string
  }
}

export default function SimpleModernClient() {
  const [items, setItems] = useState<EnhancedInventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    location: 'all',
    priceRange: 'all',
    size: 'all',
    availability: 'available',
    features: [] as string[]
  })

  const supabase = createClient()

  useEffect(() => {
    fetchInventoryData()
  }, [])

  const fetchInventoryData = async () => {
    try {
      setLoading(true)
      
      const { data: itemsData } = await supabase
        .from('inventory_items_enhanced')
        .select(`
          *,
          category:inventory_categories_enhanced(id, name, slug, color_hex)
        `)
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('rating', { ascending: false })
        .limit(20)

      if (itemsData) {
        setItems(itemsData as EnhancedInventoryItem[])
      }
    } catch (error) {
      console.error('Error fetching inventory:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location_city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location_state.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || item.category?.slug === selectedCategory
    
    const matchesLocation = filters.location === 'all' || item.location_state === filters.location
    
    const matchesAvailability = filters.availability === 'all' || item.availability_status === filters.availability
    
    const matchesSize = filters.size === 'all' || 
      (filters.size === 'small' && item.square_feet < 500) ||
      (filters.size === 'medium' && item.square_feet >= 500 && item.square_feet < 1000) ||
      (filters.size === 'large' && item.square_feet >= 1000)
    
    const matchesPriceRange = filters.priceRange === 'all' ||
      (filters.priceRange === 'budget' && item.base_price_monthly < 1000) ||
      (filters.priceRange === 'mid' && item.base_price_monthly >= 1000 && item.base_price_monthly < 2500) ||
      (filters.priceRange === 'premium' && item.base_price_monthly >= 2500)
    
    return matchesSearch && matchesCategory && matchesLocation && matchesAvailability && matchesSize && matchesPriceRange
  }).sort((a, b) => {
    switch (sortBy) {
      case 'featured':
        return (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0)
      case 'price_low':
        return a.base_price_monthly - b.base_price_monthly
      case 'price_high':
        return b.base_price_monthly - a.base_price_monthly
      case 'size_large':
        return b.square_feet - a.square_feet
      case 'size_small':
        return a.square_feet - b.square_feet
      case 'rating':
        return b.rating - a.rating
      case 'newest':
        return (b.is_new_arrival ? 1 : 0) - (a.is_new_arrival ? 1 : 0)
      default:
        return 0
    }
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 border-4 border-navy-200 border-t-navy-600 rounded-full mx-auto mb-4"
            />
            <Brain className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-navy-600" />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-navy-700 font-medium"
          >
            AI is analyzing inventory and preparing personalized recommendations...
          </motion.p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Search and Filter Header */}
      <section className="bg-white border-b shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
            {/* Enhanced Search */}  
            <div className="relative flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  placeholder="Search buildings by name, location, features..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 h-12 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-xl"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              {/* Filter Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="h-12 px-4"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              {/* View Mode Toggle */}
              <div className="flex rounded-lg border border-gray-200 p-1 bg-gray-50">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t bg-gray-50 p-4 mb-4 rounded-lg"
            >
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <Select value={filters.location} onValueChange={(value) => setFilters(prev => ({...prev, location: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent align="start">
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="AL">Alabama</SelectItem>
                      <SelectItem value="AK">Alaska</SelectItem>
                      <SelectItem value="AZ">Arizona</SelectItem>
                      <SelectItem value="AR">Arkansas</SelectItem>
                      <SelectItem value="CA">California</SelectItem>
                      <SelectItem value="CO">Colorado</SelectItem>
                      <SelectItem value="CT">Connecticut</SelectItem>
                      <SelectItem value="DE">Delaware</SelectItem>
                      <SelectItem value="FL">Florida</SelectItem>
                      <SelectItem value="GA">Georgia</SelectItem>
                      <SelectItem value="HI">Hawaii</SelectItem>
                      <SelectItem value="ID">Idaho</SelectItem>
                      <SelectItem value="IL">Illinois</SelectItem>
                      <SelectItem value="IN">Indiana</SelectItem>
                      <SelectItem value="IA">Iowa</SelectItem>
                      <SelectItem value="KS">Kansas</SelectItem>
                      <SelectItem value="KY">Kentucky</SelectItem>
                      <SelectItem value="LA">Louisiana</SelectItem>
                      <SelectItem value="ME">Maine</SelectItem>
                      <SelectItem value="MD">Maryland</SelectItem>
                      <SelectItem value="MA">Massachusetts</SelectItem>
                      <SelectItem value="MI">Michigan</SelectItem>
                      <SelectItem value="MN">Minnesota</SelectItem>
                      <SelectItem value="MS">Mississippi</SelectItem>
                      <SelectItem value="MO">Missouri</SelectItem>
                      <SelectItem value="MT">Montana</SelectItem>
                      <SelectItem value="NE">Nebraska</SelectItem>
                      <SelectItem value="NV">Nevada</SelectItem>
                      <SelectItem value="NH">New Hampshire</SelectItem>
                      <SelectItem value="NJ">New Jersey</SelectItem>
                      <SelectItem value="NM">New Mexico</SelectItem>
                      <SelectItem value="NY">New York</SelectItem>
                      <SelectItem value="NC">North Carolina</SelectItem>
                      <SelectItem value="ND">North Dakota</SelectItem>
                      <SelectItem value="OH">Ohio</SelectItem>
                      <SelectItem value="OK">Oklahoma</SelectItem>
                      <SelectItem value="OR">Oregon</SelectItem>
                      <SelectItem value="PA">Pennsylvania</SelectItem>
                      <SelectItem value="RI">Rhode Island</SelectItem>
                      <SelectItem value="SC">South Carolina</SelectItem>
                      <SelectItem value="SD">South Dakota</SelectItem>
                      <SelectItem value="TN">Tennessee</SelectItem>
                      <SelectItem value="TX">Texas</SelectItem>
                      <SelectItem value="UT">Utah</SelectItem>
                      <SelectItem value="VT">Vermont</SelectItem>
                      <SelectItem value="VA">Virginia</SelectItem>
                      <SelectItem value="WA">Washington</SelectItem>
                      <SelectItem value="WV">West Virginia</SelectItem>
                      <SelectItem value="WI">Wisconsin</SelectItem>
                      <SelectItem value="WY">Wyoming</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Size Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                  <Select value={filters.size} onValueChange={(value) => setFilters(prev => ({...prev, size: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Sizes" />
                    </SelectTrigger>
                    <SelectContent align="start">
                      <SelectItem value="all">All Sizes</SelectItem>
                      <SelectItem value="small">Small (Under 500 sq ft)</SelectItem>
                      <SelectItem value="medium">Medium (500-1000 sq ft)</SelectItem>
                      <SelectItem value="large">Large (1000+ sq ft)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                  <Select value={filters.priceRange} onValueChange={(value) => setFilters(prev => ({...prev, priceRange: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent align="start">
                      <SelectItem value="all">All Prices</SelectItem>
                      <SelectItem value="budget">Budget (Under $1,000)</SelectItem>
                      <SelectItem value="mid">Mid-Range ($1,000-$2,500)</SelectItem>
                      <SelectItem value="premium">Premium ($2,500+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Availability Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
                  <Select value={filters.availability} onValueChange={(value) => setFilters(prev => ({...prev, availability: value}))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Available Now" />
                    </SelectTrigger>
                    <SelectContent align="start">
                      <SelectItem value="available">Available Now</SelectItem>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="rented">Currently Rented</SelectItem>
                      <SelectItem value="maintenance">In Maintenance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Results Summary and Sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {filteredItems.length} buildings found
              </span>
            </div>

            {/* Sorting */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Sort by:</span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end" side="bottom" sideOffset={4}>
                  <SelectItem value="featured">🌟 Featured</SelectItem>
                  <SelectItem value="rating">⭐ Highest Rated</SelectItem>
                  <SelectItem value="price_low">💰 Price: Low to High</SelectItem>
                  <SelectItem value="price_high">💰 Price: High to Low</SelectItem>
                  <SelectItem value="size_large">📏 Size: Large to Small</SelectItem>
                  <SelectItem value="size_small">📏 Size: Small to Large</SelectItem>
                  <SelectItem value="newest">🆕 Newest First</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>


      {/* Inventory Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {filteredItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <Building className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No buildings match your criteria</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filters to see more results.
              </p>
              <Button onClick={() => {
                setSearchQuery('')
                setFilters({
                  location: 'all',
                  priceRange: 'all', 
                  size: 'all',
                  availability: 'available',
                  features: []
                })
              }}>
                <RotateCcw className="h-4 w-4 mr-2" />
                Reset Filters
              </Button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
            >
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <EnhancedInventoryCard item={item} viewMode={viewMode} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

// Enhanced Inventory Card Component
function EnhancedInventoryCard({
  item,
  viewMode
}: {
  item: EnhancedInventoryItem
  viewMode: 'grid' | 'list'
}) {
  return (
    <Card className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden bg-white border-0 shadow-lg ${
      viewMode === 'list' ? 'flex flex-row' : ''
    }`}>
      {/* Image Section */}
      <div className={`relative overflow-hidden ${
        viewMode === 'list' ? 'w-80 flex-shrink-0' : 'h-72'
      }`}>
        <Image
          src={item.main_image_url || '/images/placeholder-building.jpg'}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Status badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {item.is_featured && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
              Featured
            </Badge>
          )}
          
          {item.is_new_arrival && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
              New
            </Badge>
          )}
          
          {item.is_popular && (
            <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0">
              Popular
            </Badge>
          )}
          
          <Badge 
            className={`${
              item.availability_status === 'available' 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                : 'bg-gradient-to-r from-red-500 to-pink-500'
            } text-white border-0`}
          >
            {item.availability_status === 'available' ? 'Available Now' : 'Currently Rented'}
          </Badge>
        </div>
      </div>

      {/* Content Section */}
      <CardContent className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge 
                variant="outline" 
                className="text-xs"
                style={{ 
                  borderColor: item.category?.color_hex,
                  color: item.category?.color_hex 
                }}
              >
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
            
            <h3 className="text-xl font-bold text-navy-600 group-hover:text-steel-600 transition-colors mb-2 line-clamp-2">
              {item.name}
            </h3>
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-3">
              {item.description}
            </p>
          </div>
        </div>

        {/* Specifications Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center bg-gray-50 p-2 rounded">
            <Ruler className="h-4 w-4 text-gray-400 mr-2" />
            <span>{item.width_feet}' × {item.length_feet}'</span>
          </div>
          
          <div className="flex items-center bg-gray-50 p-2 rounded">
            <Building className="h-4 w-4 text-gray-400 mr-2" />
            <span>{item.square_feet} sq ft</span>
          </div>
          
          <div className="flex items-center bg-gray-50 p-2 rounded">
            <MapPin className="h-4 w-4 text-gray-400 mr-2" />
            <span>{item.location_city}, {item.location_state}</span>
          </div>
          
          <div className="flex items-center bg-gray-50 p-2 rounded">
            <DollarSign className="h-4 w-4 text-gray-400 mr-2" />
            <span>${item.base_price_monthly}/mo</span>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-2xl font-bold text-navy-600">
                ${item.base_price_monthly}
                <span className="text-sm font-normal text-gray-600">/month</span>
              </div>
              <div className="text-sm text-gray-600">
                Setup: ${item.setup_fee} • Delivery: ${item.delivery_fee}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button asChild className="flex-1 bg-gradient-to-r from-navy-600 to-steel-600 hover:from-navy-700 hover:to-steel-700">
            <Link href={`/resources/live-inventory/${item.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="flex-1 border-orange-500 text-orange-600 hover:bg-orange-50">
            <Link href={`/quote?item=${item.id}`}>
              Add to Quote
            </Link>
          </Button>
        </div>

        {/* AI Insights */}
        {item.ai_tags.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-purple-600 mb-2">
              <Brain className="h-3 w-3 mr-1" />
              AI Insights
            </div>
            <div className="flex flex-wrap gap-1">
              {item.ai_tags.slice(0, 3).map((tag, index) => (
                <span key={index} className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
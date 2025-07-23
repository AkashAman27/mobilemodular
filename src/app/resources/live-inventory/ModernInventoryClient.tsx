'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { 
  Search, Filter, MapPin, Ruler, Star, Building, Users, Heart, 
  Share2, Calendar, Truck, Zap, Award, Eye, TrendingUp,
  Brain, Sparkles, ChevronDown, SlidersHorizontal, X, Grid3X3,
  List, Maximize2, RotateCcw, ShoppingCart, Clock, DollarSign,
  Shield, Wifi, Car, Coffee, Phone, Mail, MessageSquare
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// Enhanced interfaces with modern features
interface EnhancedInventoryItem {
  id: string
  name: string
  model_number: string
  description: string
  detailed_description: string
  width_feet: number
  length_feet: number
  height_feet: number
  square_feet: number
  location_state: string
  location_city: string
  latitude: number
  longitude: number
  availability_status: 'available' | 'rented' | 'maintenance' | 'reserved'
  available_from: string
  available_until: string
  main_image_url: string
  gallery_images: string[]
  virtual_tour_url?: string
  threejs_model_url?: string
  features: string[]
  amenities: string[]
  technical_specs: Record<string, any>
  certifications: string[]
  base_price_monthly: number
  base_price_weekly: number
  base_price_daily: number
  setup_fee: number
  delivery_fee: number
  is_featured: boolean
  is_new_arrival: boolean
  is_popular: boolean
  rating: number
  review_count: number
  view_count: number
  inquiry_count: number
  ai_tags: string[]
  similar_items_ids: string[]
  category: {
    id: string
    name: string
    slug: string
    icon_name: string
    color_hex: string
  }
  enhanced_floorplans: EnhancedFloorplan[]
}

interface EnhancedFloorplan {
  id: string
  name: string
  square_feet: number
  ceiling_height: number
  restrooms: number
  offices: number
  conference_rooms: number
  floorplan_image_url: string
  interactive_floorplan_url?: string
  rental_price_monthly: number
  amenities: string[]
  accessibility_features: string[]
  energy_efficiency_rating: string
}

interface FilterState {
  search: string
  category: string
  location: string
  priceRange: [number, number]
  sizeRange: [number, number]
  availability: string[]
  amenities: string[]
  certifications: string[]
  rating: number
  energyRating: string[]
}

interface UserPreferences {
  favoriteItems: string[]
  comparisonItems: string[]
  searchHistory: string[]
  viewHistory: string[]
}

// Custom hooks for modern features
const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>({
    favoriteItems: [],
    comparisonItems: [],
    searchHistory: [],
    viewHistory: []
  })

  useEffect(() => {
    const saved = localStorage.getItem('user-inventory-preferences')
    if (saved) {
      setPreferences(JSON.parse(saved))
    }
  }, [])

  const updatePreferences = useCallback((newPrefs: Partial<UserPreferences>) => {
    setPreferences(prev => {
      const updated = { ...prev, ...newPrefs }
      localStorage.setItem('user-inventory-preferences', JSON.stringify(updated))
      return updated
    })
  }, [])

  return { preferences, updatePreferences }
}

const useAIRecommendations = (currentItem?: string, userHistory: string[] = []) => {
  const [recommendations, setRecommendations] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (currentItem || userHistory.length > 0) {
      setLoading(true)
      // Simulate AI recommendation API call
      setTimeout(() => {
        // Mock AI recommendations based on user behavior
        const mockRecommendations = ['item1', 'item2', 'item3']
        setRecommendations(mockRecommendations)
        setLoading(false)
      }, 1000)
    }
  }, [currentItem, userHistory])

  return { recommendations, loading }
}

export default function ModernInventoryClient() {
  // State management
  const [items, setItems] = useState<EnhancedInventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('ai_recommended')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    location: 'all',
    priceRange: [0, 5000],
    sizeRange: [0, 2000],
    availability: ['available'],
    amenities: [],
    certifications: [],
    rating: 0,
    energyRating: []
  })

  const { preferences, updatePreferences } = useUserPreferences()
  const { recommendations } = useAIRecommendations(undefined, preferences.viewHistory)
  const supabase = createClient()

  // Enhanced data fetching
  useEffect(() => {
    fetchEnhancedInventoryData()
  }, [])

  const fetchEnhancedInventoryData = async () => {
    try {
      setLoading(true)
      
      const { data: itemsData } = await supabase
        .from('inventory_items_enhanced')
        .select(`
          *,
          category:inventory_categories_enhanced(id, name, slug, icon_name, color_hex),
          enhanced_floorplans(*)
        `)
        .eq('is_active', true)
        .order('is_featured', { ascending: false })
        .order('rating', { ascending: false })
        .limit(50)

      if (itemsData) {
        setItems(itemsData as EnhancedInventoryItem[])
      }
    } catch (error) {
      console.error('Error fetching enhanced inventory:', error)
      // Fallback to demo data or show error
    } finally {
      setLoading(false)
    }
  }

  // AI-powered search and filtering
  const filteredAndSortedItems = useMemo(() => {
    let filtered = items.filter(item => {
      // Search filter with AI enhancement
      const searchMatch = filters.search === '' || 
        item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.ai_tags.some(tag => tag.toLowerCase().includes(filters.search.toLowerCase()))

      // Category filter
      const categoryMatch = filters.category === 'all' || item.category?.slug === filters.category

      // Location filter
      const locationMatch = filters.location === 'all' || 
        `${item.location_city}, ${item.location_state}` === filters.location

      // Price range filter
      const priceMatch = item.base_price_monthly >= filters.priceRange[0] && 
        item.base_price_monthly <= filters.priceRange[1]

      // Size range filter
      const sizeMatch = item.square_feet >= filters.sizeRange[0] && 
        item.square_feet <= filters.sizeRange[1]

      // Availability filter
      const availabilityMatch = filters.availability.includes(item.availability_status)

      // Rating filter
      const ratingMatch = item.rating >= filters.rating

      // Amenities filter
      const amenitiesMatch = filters.amenities.length === 0 || 
        filters.amenities.every(amenity => item.amenities.includes(amenity))

      return searchMatch && categoryMatch && locationMatch && priceMatch && 
             sizeMatch && availabilityMatch && ratingMatch && amenitiesMatch
    })

    // AI-enhanced sorting
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'ai_recommended':
          // AI scoring based on user preferences and behavior
          const aScore = calculateAIScore(a, preferences)
          const bScore = calculateAIScore(b, preferences)
          return bScore - aScore
        case 'price_low':
          return a.base_price_monthly - b.base_price_monthly
        case 'price_high':
          return b.base_price_monthly - a.base_price_monthly
        case 'popularity':
          return (b.view_count + b.inquiry_count) - (a.view_count + a.inquiry_count)
        case 'rating':
          return b.rating - a.rating
        case 'newest':
          return b.id.localeCompare(a.id) // Use ID as proxy for newest
        case 'size_large':
          return b.square_feet - a.square_feet
        case 'size_small':
          return a.square_feet - b.square_feet
        default:
          return 0
      }
    })
  }, [items, filters, sortBy, preferences])

  // AI scoring function
  const calculateAIScore = (item: EnhancedInventoryItem, userPrefs: UserPreferences): number => {
    let score = 0
    
    // Base popularity score
    score += (item.view_count * 0.1) + (item.inquiry_count * 0.3) + (item.rating * 20)
    
    // User preference bonuses
    if (userPrefs.favoriteItems.includes(item.id)) score += 100
    if (userPrefs.viewHistory.includes(item.id)) score += 50
    
    // Similar items bonus
    const viewedSimilar = userPrefs.viewHistory.some(viewedId => 
      item.similar_items_ids.includes(viewedId)
    )
    if (viewedSimilar) score += 30
    
    // Category preference from history
    const categoryViews = userPrefs.viewHistory.filter(id => {
      const viewedItem = items.find(i => i.id === id)
      return viewedItem?.category?.slug === item.category?.slug
    }).length
    score += categoryViews * 10
    
    return score
  }

  // User interaction handlers
  const handleItemView = (itemId: string) => {
    updatePreferences({
      viewHistory: [...preferences.viewHistory.slice(-19), itemId]
    })
    
    // Track analytics
    supabase.rpc('track_item_view', { item_id: itemId })
  }

  const toggleFavorite = (itemId: string) => {
    const newFavorites = preferences.favoriteItems.includes(itemId)
      ? preferences.favoriteItems.filter(id => id !== itemId)
      : [...preferences.favoriteItems, itemId]
    
    updatePreferences({ favoriteItems: newFavorites })
  }

  const toggleComparison = (itemId: string) => {
    const newComparison = preferences.comparisonItems.includes(itemId)
      ? preferences.comparisonItems.filter(id => id !== itemId)
      : [...preferences.comparisonItems.slice(-2), itemId] // Max 3 items
    
    updatePreferences({ comparisonItems: newComparison })
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      category: 'all',
      location: 'all',
      priceRange: [0, 5000],
      sizeRange: [0, 2000],
      availability: ['available'],
      amenities: [],
      certifications: [],
      rating: 0,
      energyRating: []
    })
  }

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
      {/* Advanced Search and Filter Header */}
      <section className="bg-white border-b shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          {/* Top Row - Search and Quick Actions */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-4">
            {/* AI-Enhanced Search */}
            <div className="relative flex-1 max-w-2xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Brain className="absolute right-12 top-1/2 transform -translate-y-1/2 text-purple-500 h-4 w-4" />
                <Input
                  placeholder="Search with AI assistance (e.g., 'large office with conference room near Atlanta')"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="pl-12 pr-16 h-12 text-lg border-2 border-gray-200 focus:border-purple-500 rounded-xl"
                />
              </div>
              
              {/* AI Search Suggestions */}
              {filters.search && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-50"
                >
                  <div className="p-3">
                    <div className="flex items-center text-sm text-purple-600 mb-2">
                      <Sparkles className="h-4 w-4 mr-1" />
                      AI Suggestions
                    </div>
                    <div className="space-y-1">
                      <div className="p-2 hover:bg-gray-50 rounded cursor-pointer text-sm">
                        "Large office buildings in {filters.search}"
                      </div>
                      <div className="p-2 hover:bg-gray-50 rounded cursor-pointer text-sm">
                        "Similar to what you viewed before"
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-3">
              {/* Comparison Badge */}
              {preferences.comparisonItems.length > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="relative"
                >
                  <Button
                    variant="outline"
                    size="sm"
                    className="relative border-purple-200 text-purple-700 hover:bg-purple-50"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    Compare ({preferences.comparisonItems.length})
                  </Button>
                </motion.div>
              )}

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

              {/* Advanced Filters Toggle */}
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="relative"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {Object.values(filters).some(f => 
                  (Array.isArray(f) && f.length > 0) || 
                  (typeof f === 'string' && f !== '' && f !== 'all') ||
                  (Array.isArray(f) && f[0] !== 0)
                ) && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </Button>
            </div>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-gray-200 pt-4"
              >
                <AdvancedFiltersPanel filters={filters} setFilters={setFilters} onClear={clearFilters} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results Summary and Sorting */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                {filteredAndSortedItems.length} buildings found
              </span>
              
              {/* AI Recommendations Indicator */}
              {sortBy === 'ai_recommended' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center text-sm text-purple-600 bg-purple-50 px-3 py-1 rounded-full"
                >
                  <Brain className="h-4 w-4 mr-1" />
                  AI Personalized
                </motion.div>
              )}
            </div>

            {/* Smart Sorting */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="ai_recommended">🤖 AI Recommended</option>
                <option value="popularity">🔥 Most Popular</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="price_low">💰 Price: Low to High</option>
                <option value="price_high">💰 Price: High to Low</option>
                <option value="size_large">📏 Size: Large to Small</option>
                <option value="size_small">📏 Size: Small to Large</option>
                <option value="newest">🆕 Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* AI Recommendations Bar */}
      {recommendations.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                <span className="font-medium">Based on your activity, you might like:</span>
              </div>
              <div className="flex gap-2">
                {/* Quick recommendation chips */}
                <span className="text-xs bg-white/20 px-2 py-1 rounded">Large Offices</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded">Atlanta Area</span>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Inventory Grid/List */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {filteredAndSortedItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <Building className="h-24 w-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No buildings match your criteria</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Try adjusting your filters or search terms. Our AI can help suggest alternatives.
              </p>
              <div className="flex justify-center gap-3">
                <Button onClick={clearFilters} variant="outline">
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Clear All Filters
                </Button>
                <Button>
                  <Brain className="h-4 w-4 mr-2" />
                  Get AI Suggestions
                </Button>
              </div>
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
              <AnimatePresence mode="popLayout">
                {filteredAndSortedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <EnhancedInventoryCard
                      item={item}
                      viewMode={viewMode}
                      preferences={preferences}
                      onView={handleItemView}
                      onToggleFavorite={toggleFavorite}
                      onToggleComparison={toggleComparison}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

// Advanced Filters Panel Component
function AdvancedFiltersPanel({ 
  filters, 
  setFilters, 
  onClear 
}: { 
  filters: FilterState
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>
  onClear: () => void 
}) {
  const amenitiesList = [
    'WiFi', 'Air Conditioning', 'Heating', 'Kitchenette', 'Conference Room',
    'Reception Area', 'Parking', 'Security System', 'Handicap Accessible'
  ]

  const certificationsList = [
    'LEED Certified', 'Energy Star', 'ADA Compliant', 'Fire Safety', 'Building Code Compliant'
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-lg">
      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Monthly Price Range: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </label>
        <Slider
          value={filters.priceRange}
          onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
          max={5000}
          min={0}
          step={100}
          className="w-full"
        />
      </div>

      {/* Size Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Size Range: {filters.sizeRange[0]} - {filters.sizeRange[1]} sq ft
        </label>
        <Slider
          value={filters.sizeRange}
          onValueChange={(value) => setFilters(prev => ({ ...prev, sizeRange: value as [number, number] }))}
          max={2000}
          min={0}
          step={50}
          className="w-full"
        />
      </div>

      {/* Amenities */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Amenities</label>
        <div className="space-y-2 max-h-32 overflow-y-auto">
          {amenitiesList.map((amenity) => (
            <div key={amenity} className="flex items-center">
              <Checkbox
                id={amenity}
                checked={filters.amenities.includes(amenity)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilters(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }))
                  } else {
                    setFilters(prev => ({ ...prev, amenities: prev.amenities.filter(a => a !== amenity) }))
                  }
                }}
              />
              <label htmlFor={amenity} className="ml-2 text-sm text-gray-600">{amenity}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Minimum Rating: {filters.rating} stars
        </label>
        <Slider
          value={[filters.rating]}
          onValueChange={(value) => setFilters(prev => ({ ...prev, rating: value[0] }))}
          max={5}
          min={0}
          step={0.5}
          className="w-full"
        />
        <div className="flex items-center mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-4 w-4 ${star <= filters.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="md:col-span-2 lg:col-span-4 flex justify-end">
        <Button onClick={onClear} variant="outline">
          <X className="h-4 w-4 mr-2" />
          Clear All Filters
        </Button>
      </div>
    </div>
  )
}

// Enhanced Inventory Card Component
function EnhancedInventoryCard({
  item,
  viewMode,
  preferences,
  onView,
  onToggleFavorite,
  onToggleComparison
}: {
  item: EnhancedInventoryItem
  viewMode: 'grid' | 'list'
  preferences: UserPreferences
  onView: (id: string) => void
  onToggleFavorite: (id: string) => void
  onToggleComparison: (id: string) => void
}) {
  const isFavorite = preferences.favoriteItems.includes(item.id)
  const isInComparison = preferences.comparisonItems.includes(item.id)
  
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
          onClick={() => onView(item.id)}
        />
        
        {/* Overlay with quick actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onToggleFavorite(item.id)}
              className={`w-10 h-10 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white/90 text-gray-700'} hover:scale-110 transition-transform`}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? 'fill-current' : ''}`} />
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onToggleComparison(item.id)}
              className={`w-10 h-10 rounded-full ${isInComparison ? 'bg-purple-500 text-white' : 'bg-white/90 text-gray-700'} hover:scale-110 transition-transform`}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Status badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {item.is_featured && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
              <Award className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          
          {item.is_new_arrival && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
              <Sparkles className="h-3 w-3 mr-1" />
              New
            </Badge>
          )}
          
          {item.is_popular && (
            <Badge className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0">
              <TrendingUp className="h-3 w-3 mr-1" />
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

        {/* Virtual tour button */}
        {item.virtual_tour_url && (
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
              <Eye className="h-4 w-4 mr-2" />
              Virtual Tour
            </Button>
          </div>
        )}
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

        {/* Enhanced Features with Icons */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Key Features</h4>
          <div className="flex flex-wrap gap-2">
            {item.amenities.slice(0, 4).map((amenity, index) => (
              <div key={index} className="flex items-center text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                {getAmenityIcon(amenity)}
                <span className="ml-1">{amenity}</span>
              </div>
            ))}
            {item.amenities.length > 4 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{item.amenities.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing and Availability */}
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
            
            <div className="text-right">
              <div className="flex items-center text-sm text-green-600">
                <Calendar className="h-4 w-4 mr-1" />
                Available {item.available_from ? new Date(item.available_from).toLocaleDateString() : 'Now'}
              </div>
              <div className="flex items-center text-sm text-blue-600">
                <Truck className="h-4 w-4 mr-1" />
                Fast Delivery
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
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Quote
            </Link>
          </Button>
          
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-navy-600">
            <Share2 className="h-4 w-4" />
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

// Helper function to get amenity icons
function getAmenityIcon(amenity: string) {
  const iconMap: Record<string, React.ReactNode> = {
    'WiFi': <Wifi className="h-3 w-3" />,
    'Air Conditioning': <Zap className="h-3 w-3" />,
    'Parking': <Car className="h-3 w-3" />,
    'Kitchenette': <Coffee className="h-3 w-3" />,
    'Security System': <Shield className="h-3 w-3" />,
    'Conference Room': <Users className="h-3 w-3" />
  }
  
  return iconMap[amenity] || <Building className="h-3 w-3" />
}
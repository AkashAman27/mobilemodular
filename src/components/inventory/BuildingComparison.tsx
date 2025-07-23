'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  X, Check, Building, Ruler, MapPin, DollarSign, Star, 
  Heart, ShoppingCart, Eye, Download, Share2, Zap,
  Wifi, Car, Coffee, Shield, Users, Clock, Truck
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

interface BuildingComparisonProps {
  isOpen: boolean
  onClose: () => void
  buildings: EnhancedInventoryItem[]
  onRemoveBuilding: (id: string) => void
  onAddToQuote: (buildings: EnhancedInventoryItem[]) => void
}

export default function BuildingComparison({
  isOpen,
  onClose,
  buildings,
  onRemoveBuilding,
  onAddToQuote
}: BuildingComparisonProps) {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([])

  // Get all unique features across all buildings
  const allFeatures = [...new Set(buildings.flatMap(b => [...b.features, ...b.amenities]))]
  
  // Comparison metrics
  const comparisonData = [
    { key: 'square_feet' as keyof EnhancedInventoryItem, label: 'Square Feet', icon: Building, format: (val: any) => `${val} sq ft` },
    { key: 'width_feet' as keyof EnhancedInventoryItem, label: 'Width', icon: Ruler, format: (val: any) => `${val}'` },
    { key: 'length_feet' as keyof EnhancedInventoryItem, label: 'Length', icon: Ruler, format: (val: any) => `${val}'` },
    { key: 'base_price_monthly' as keyof EnhancedInventoryItem, label: 'Monthly Price', icon: DollarSign, format: (val: any) => `$${val}` },
    { key: 'setup_fee' as keyof EnhancedInventoryItem, label: 'Setup Fee', icon: Truck, format: (val: any) => `$${val}` },
    { key: 'delivery_fee' as keyof EnhancedInventoryItem, label: 'Delivery Fee', icon: Truck, format: (val: any) => `$${val}` },
    { key: 'rating' as keyof EnhancedInventoryItem, label: 'Rating', icon: Star, format: (val: any) => `${val}/5` },
    { key: 'location_city' as keyof EnhancedInventoryItem, label: 'Location', icon: MapPin, format: (val: any, building: EnhancedInventoryItem) => `${val}, ${building.location_state}` }
  ]

  const getFeatureIcon = (feature: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'WiFi': <Wifi className="h-4 w-4" />,
      'Air Conditioning': <Zap className="h-4 w-4" />,
      'Parking': <Car className="h-4 w-4" />,
      'Kitchenette': <Coffee className="h-4 w-4" />,
      'Security System': <Shield className="h-4 w-4" />,
      'Conference Room': <Users className="h-4 w-4" />
    }
    return iconMap[feature] || <Check className="h-4 w-4" />
  }

  const exportComparison = () => {
    // Generate comparison report
    const comparisonReport = {
      date: new Date().toISOString(),
      buildings: buildings.map(b => ({
        name: b.name,
        model: b.model_number,
        price: b.base_price_monthly,
        size: b.square_feet,
        location: `${b.location_city}, ${b.location_state}`,
        features: [...b.features, ...b.amenities]
      }))
    }
    
    const dataStr = JSON.stringify(comparisonReport, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `building-comparison-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  if (buildings.length === 0) {
    return null
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold text-navy-600">
              Building Comparison ({buildings.length})
            </DialogTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={exportComparison}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Building Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {buildings.map((building) => (
              <motion.div
                key={building.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative"
              >
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={building.main_image_url || '/images/placeholder-building.jpg'}
                      alt={building.name}
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 h-8 w-8 p-0"
                      onClick={() => onRemoveBuilding(building.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    {building.is_featured && (
                      <Badge className="absolute top-2 left-2 bg-orange-500">
                        Featured
                      </Badge>
                    )}
                  </div>
                  
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg text-navy-600 mb-2 line-clamp-2">
                      {building.name}
                    </h3>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Size:</span>
                        <span className="font-medium">{building.square_feet} sq ft</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Price:</span>
                        <span className="font-bold text-green-600">${building.base_price_monthly}/mo</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span>{building.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button asChild size="sm" className="flex-1">
                        <Link href={`/resources/live-inventory/${building.id}`}>
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Heart className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Detailed Comparison Table */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-navy-600 mb-4">Detailed Comparison</h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Specification</th>
                      {buildings.map((building) => (
                        <th key={building.id} className="text-center py-3 px-4 font-semibold text-gray-700 min-w-48">
                          {building.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((metric) => (
                      <tr key={metric.key} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4 flex items-center font-medium text-gray-700">
                          <metric.icon className="h-4 w-4 mr-2 text-gray-500" />
                          {metric.label}
                        </td>
                        {buildings.map((building) => (
                          <td key={building.id} className="py-3 px-4 text-center">
                            <span className="inline-block px-3 py-1 bg-gray-100 rounded-full text-sm">
                              {metric.format(building[metric.key], building)}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Features Comparison */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold text-navy-600 mb-4">Features & Amenities</h3>
              
              <div className="space-y-3">
                {allFeatures.map((feature) => (
                  <div key={feature} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center">
                      {getFeatureIcon(feature)}
                      <span className="ml-2 font-medium text-gray-700">{feature}</span>
                    </div>
                    
                    <div className="flex gap-4">
                      {buildings.map((building) => {
                        const hasFeature = [...building.features, ...building.amenities].includes(feature)
                        return (
                          <div key={building.id} className="w-12 flex justify-center">
                            {hasFeature ? (
                              <Check className="h-5 w-5 text-green-500" />
                            ) : (
                              <X className="h-5 w-5 text-red-300" />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendation */}
          <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-purple-700 mb-2">AI Recommendation</h3>
                  <p className="text-purple-600 mb-4">
                    Based on your comparison, we recommend <strong>{buildings[0]?.name}</strong> as it offers 
                    the best value for money with {buildings[0]?.square_feet} sq ft at ${buildings[0]?.base_price_monthly}/month, 
                    plus it includes premium amenities like {buildings[0]?.amenities?.slice(0, 2).join(' and ')}.
                  </p>
                  <div className="flex gap-3">
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add Recommended to Quote
                    </Button>
                    <Button variant="outline" className="border-purple-300 text-purple-700">
                      See More Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-4 border-t">
            <div className="text-sm text-gray-600">
              Compare up to 3 buildings side by side
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose}>
                Close Comparison
              </Button>
              <Button 
                onClick={() => onAddToQuote(buildings)}
                className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add All to Quote
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
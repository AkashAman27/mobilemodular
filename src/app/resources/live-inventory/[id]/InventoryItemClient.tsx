'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  MapPin, Ruler, Star, Building, Users, Calendar, 
  CheckCircle, Phone, Mail, ArrowRight, Image as ImageIcon 
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

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
  specifications: any
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
    description: string
    square_feet: number
    restrooms: number
    offices: number
    conference_rooms: number
    floorplan_image_url: string
    rental_price_monthly: number
    features: string[]
    max_occupancy: number
    construction_type: string
    order_index: number
  }>
}

interface Props {
  item: InventoryItem
}

export default function InventoryItemClient({ item }: Props) {
  const [selectedFloorplan, setSelectedFloorplan] = useState(item.floorplans?.[0]?.id || '')
  const [activeTab, setActiveTab] = useState('overview')

  const sortedFloorplans = item.floorplans?.sort((a, b) => a.order_index - b.order_index) || []
  const currentFloorplan = sortedFloorplans.find(fp => fp.id === selectedFloorplan) || sortedFloorplans[0]

  return (
    <div className="bg-gray-50">
      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Image Gallery */}
              <Card>
                <CardContent className="p-0">
                  <div className="relative h-96 bg-gray-100 rounded-t-lg overflow-hidden">
                    <Image
                      src={item.main_image_url || '/images/placeholder-building.jpg'}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                    {item.is_featured && (
                      <Badge className="absolute top-4 left-4 bg-orange-500">
                        Featured
                      </Badge>
                    )}
                    <Badge 
                      className={`absolute top-4 right-4 ${
                        item.availability_status === 'available' 
                          ? 'bg-green-500' 
                          : 'bg-red-500'
                      }`}
                    >
                      {item.availability_status === 'available' ? 'Available' : 'Rented'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs for Details */}
              <Card>
                <CardContent className="p-6">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="features">Features</TabsTrigger>
                      <TabsTrigger value="specifications">Specifications</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="overview" className="mt-6">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-3">About This Building</h3>
                          <p className="text-gray-600 leading-relaxed">{item.description}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Ruler className="h-8 w-8 text-navy-600 mx-auto mb-2" />
                            <div className="font-semibold text-lg">{item.width_feet}'</div>
                            <div className="text-sm text-gray-600">Width</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Ruler className="h-8 w-8 text-navy-600 mx-auto mb-2" />
                            <div className="font-semibold text-lg">{item.length_feet}'</div>
                            <div className="text-sm text-gray-600">Length</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <Building className="h-8 w-8 text-navy-600 mx-auto mb-2" />
                            <div className="font-semibold text-lg">{item.square_feet}</div>
                            <div className="text-sm text-gray-600">Sq Ft</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-lg">
                            <MapPin className="h-8 w-8 text-navy-600 mx-auto mb-2" />
                            <div className="font-semibold text-lg">{item.location_city}</div>
                            <div className="text-sm text-gray-600">{item.location_state}</div>
                          </div>
                        </div>

                        {item.rating > 0 && (
                          <div className="flex items-center justify-center p-4 bg-yellow-50 rounded-lg">
                            <Star className="h-6 w-6 text-yellow-400 fill-current mr-2" />
                            <span className="text-lg font-semibold">{item.rating}</span>
                            <span className="text-gray-600 ml-2">({item.review_count} reviews)</span>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="features" className="mt-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Standard Features</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {item.features?.map((feature, index) => (
                            <div key={index} className="flex items-center">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                              <span className="text-gray-700">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="specifications" className="mt-6">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Technical Specifications</h3>
                        
                        {/* Basic Specifications from Item Data */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          <div className="flex justify-between p-3 bg-gray-50 rounded">
                            <span className="font-medium">Dimensions:</span>
                            <span className="text-gray-600">{item.width_feet}' × {item.length_feet}'</span>
                          </div>
                          <div className="flex justify-between p-3 bg-gray-50 rounded">
                            <span className="font-medium">Square Footage:</span>
                            <span className="text-gray-600">{item.square_feet} sq ft</span>
                          </div>
                          <div className="flex justify-between p-3 bg-gray-50 rounded">
                            <span className="font-medium">Category:</span>
                            <span className="text-gray-600">{item.category?.name}</span>
                          </div>
                          <div className="flex justify-between p-3 bg-gray-50 rounded">
                            <span className="font-medium">Model Number:</span>
                            <span className="text-gray-600">{item.model_number}</span>
                          </div>
                        </div>

                        {/* Additional Specifications from Database */}
                        {item.specifications && Object.keys(item.specifications).length > 0 && (
                          <>
                            <h4 className="text-md font-semibold text-gray-700 mt-6 mb-3">Detailed Technical Specifications</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {Object.entries(item.specifications).map(([key, value]) => (
                                <div key={key} className="flex justify-between p-3 bg-gray-50 rounded">
                                  <span className="font-medium capitalize">{key.replace(/_/g, ' ')}:</span>
                                  <span className="text-gray-600">{value as string}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}

                        {/* Features as Specifications */}
                        {item.features && item.features.length > 0 && (
                          <>
                            <h4 className="text-md font-semibold text-gray-700 mt-6 mb-3">Included Features</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {item.features.map((feature, index) => (
                                <div key={index} className="flex items-center p-2 bg-green-50 rounded">
                                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                                  <span className="text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Pricing and Floorplans */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    Get Quote
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-navy-600 mb-1">
                      Available Now
                    </div>
                    <div className="text-sm text-gray-600">
                      Starting from ${currentFloorplan?.rental_price_monthly || 0}/month
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button asChild className="w-full" size="lg">
                      <Link href={`/quote?item=${item.id}`}>
                        <Calendar className="h-4 w-4 mr-2" />
                        Get Detailed Quote
                      </Link>
                    </Button>
                    <Button variant="outline" asChild className="w-full">
                      <Link href="/contact">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Expert
                      </Link>
                    </Button>
                  </div>

                  <div className="text-center pt-4 border-t">
                    <div className="text-sm text-gray-600 mb-2">Need help deciding?</div>
                    <div className="flex items-center justify-center text-navy-600">
                      <Phone className="h-4 w-4 mr-1" />
                      <span className="font-semibold">866-352-4651</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floorplans */}
              {sortedFloorplans.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ImageIcon className="h-5 w-5 mr-2" />
                      Available Floorplans
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Floorplan Selection */}
                    <div className="space-y-3">
                      {sortedFloorplans.map((floorplan) => (
                        <div
                          key={floorplan.id}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            selectedFloorplan === floorplan.id
                              ? 'border-navy-600 bg-navy-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => setSelectedFloorplan(floorplan.id)}
                        >
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <div className="font-semibold text-sm">{floorplan.name}</div>
                              <div className="text-xs text-gray-500">Model #{floorplan.model_number}</div>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-navy-600">
                                ${floorplan.rental_price_monthly}/mo
                              </div>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
                            <div>{floorplan.square_feet} sq ft</div>
                            <div>{floorplan.restrooms} restroom{floorplan.restrooms !== 1 ? 's' : ''}</div>
                            <div>{floorplan.offices} office{floorplan.offices !== 1 ? 's' : ''}</div>
                          </div>

                          {floorplan.description && (
                            <div className="text-xs text-gray-600 mt-2">
                              {floorplan.description}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Current Floorplan Details */}
                    {currentFloorplan && (
                      <div className="border-t pt-4">
                        <div className="space-y-3">
                          {currentFloorplan.floorplan_image_url && (
                            <div className="relative h-48 bg-gray-100 rounded overflow-hidden">
                              <Image
                                src={currentFloorplan.floorplan_image_url}
                                alt={`${currentFloorplan.name} floorplan`}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center">
                              <Building className="h-4 w-4 text-gray-400 mr-2" />
                              <span>{currentFloorplan.square_feet} sq ft</span>
                            </div>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 text-gray-400 mr-2" />
                              <span>Max {currentFloorplan.max_occupancy || 'N/A'}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="w-4 h-4 mr-2 text-center text-xs">🚻</span>
                              <span>{currentFloorplan.restrooms} restroom{currentFloorplan.restrooms !== 1 ? 's' : ''}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="w-4 h-4 mr-2 text-center text-xs">🏢</span>
                              <span>{currentFloorplan.offices} office{currentFloorplan.offices !== 1 ? 's' : ''}</span>
                            </div>
                          </div>

                          {currentFloorplan.features && currentFloorplan.features.length > 0 && (
                            <div>
                              <div className="font-medium text-sm mb-2">Floorplan Features:</div>
                              <div className="space-y-1">
                                {currentFloorplan.features.slice(0, 3).map((feature, index) => (
                                  <div key={index} className="flex items-center text-xs text-gray-600">
                                    <CheckCircle className="h-3 w-3 text-green-500 mr-2 flex-shrink-0" />
                                    {feature}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}

              {/* Contact Info */}
              <Card>
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold mb-4">Questions about this building?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-navy-600" />
                      <span>Call: 866-352-4651</span>
                    </div>
                    <div className="flex items-center justify-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-navy-600" />
                      <span>Email: info@modularbuilding.com</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Rent This Building?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get a detailed quote with delivery and setup options for your location.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" asChild className="group">
              <Link href={`/quote?item=${item.id}`}>
                Get Your Quote Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="border-white/30 text-white hover:bg-white hover:text-navy-600" asChild>
              <Link href="/resources/live-inventory">
                View More Buildings
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
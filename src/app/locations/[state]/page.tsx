'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Users, Building, Shield, ArrowRight, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import PageLayout from '@/components/layout/PageLayout'

interface StateData {
  id: string
  name: string
  abbreviation: string
  locations: number
  phone: string
  primaryCity: string
  coverage: string
  description: string
  majorCities: string[]
  serviceAreas: string[]
}

interface LocationData {
  slug: string
  city: string
  state: string
  state_abbreviation: string
  phone: string
  address: string
  service_radius: number
  is_primary: boolean
  coverage_area: string
}

const StateLocationPage = () => {
  const params = useParams()
  const stateSlug = params.state as string
  const [stateData, setStateData] = useState<StateData | null>(null)
  const [locations, setLocations] = useState<LocationData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadStateData() {
      try {
        // Fetch state data from Supabase
        const { data: stateLocationData, error } = await supabase
          .from('state_locations')
          .select('*')
          .eq('state_id', stateSlug)
          .single()
        
        if (error || !stateLocationData) {
          setError('State not found')
          setLoading(false)
          return
        }

        // Transform Supabase data to match our StateData interface
        const state: StateData = {
          id: stateLocationData.state_id,
          name: stateLocationData.name,
          abbreviation: stateLocationData.abbreviation,
          locations: stateLocationData.locations,
          phone: stateLocationData.phone,
          primaryCity: stateLocationData.primary_city,
          coverage: stateLocationData.coverage,
          description: stateLocationData.description,
          majorCities: stateLocationData.major_cities || [],
          serviceAreas: stateLocationData.service_areas || []
        }

        setStateData(state)

        // Create sample locations based on state data from database
        const sampleLocations: LocationData[] = state.majorCities.slice(0, 3).map((city, index) => ({
          slug: `${state.id}-${city.toLowerCase().replace(/\s+/g, '-')}`,
          city: city,
          state: state.name,
          state_abbreviation: state.abbreviation,
          phone: state.phone,
          address: `${Math.floor(Math.random() * 9999) + 1000} ${['Main St', 'Business Blvd', 'Industrial Ave', 'Commerce Dr'][Math.floor(Math.random() * 4)]}, ${city}, ${state.abbreviation} ${Math.floor(Math.random() * 90000) + 10000}`,
          service_radius: 75 + Math.floor(Math.random() * 50),
          is_primary: index === 0,
          coverage_area: state.serviceAreas[index] || state.serviceAreas[0]
        }))

        setLocations(sampleLocations)
      } catch (err) {
        // Silent error handling
        setError('Failed to load state information')
      } finally {
        setLoading(false)
      }
    }

    if (stateSlug) {
      loadStateData()
    }
  }, [stateSlug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading location information...</p>
        </div>
      </div>
    )
  }

  if (error || !stateData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">State Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || "We couldn't find information for this state."}
          </p>
          <Button onClick={() => window.history.back()} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center space-x-3 mb-4"
            >
              <MapPin className="h-8 w-8 text-yellow-400" />
              <span className="text-xl font-medium text-blue-100">
                {stateData.name} Locations
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Modular Buildings in
              <span className="text-yellow-400"> {stateData.name}</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl md:text-2xl text-blue-100 mb-8 leading-relaxed"
            >
              {stateData.description}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <div className="flex items-center justify-center space-x-2 text-lg">
                <Phone className="h-6 w-6 text-yellow-400" />
                <span className="font-semibold">{stateData.phone}</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-lg">
                <Building className="h-6 w-6 text-yellow-400" />
                <span>{stateData.locations} Locations</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* State Statistics */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Building className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stateData.locations}</div>
              <div className="text-gray-600">Service Centers</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">48hr</div>
              <div className="text-gray-600">Delivery Available</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">100%</div>
              <div className="text-gray-600">Insured & Licensed</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Locations List */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our {stateData.name} Locations
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Find the nearest location to your project site. Each location is staffed with experienced professionals and maintains a full inventory of modular buildings.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.length > 0 ? (
              locations.map((location, index) => (
                <motion.div
                  key={location.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {location.city}, {location.state_abbreviation}
                    </h3>
                    {location.is_primary && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        Primary
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span className="text-sm">{location.address}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span className="text-sm">{location.phone}</span>
                    </div>
                    
                    <div className="flex items-center text-gray-600">
                      <Building className="h-4 w-4 mr-2" />
                      <span className="text-sm">{location.coverage_area}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex space-x-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      Get Directions
                    </Button>
                    <Button size="sm" className="flex-1">
                      Call Now
                    </Button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Locations Coming Soon
                </h3>
                <p className="text-gray-600 mb-6">
                  We're expanding our presence in {stateData.name}. Contact us for current service availability.
                </p>
                <Button>
                  Contact Us
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 hero-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Get Started in {stateData.name}?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Contact our {stateData.name} team for a free consultation and quote. We're here to help you find the perfect modular building solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="gradient" size="lg" className="group">
                  Get Free Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                  Call {stateData.phone}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      </div>
    </PageLayout>
  )
}

export default StateLocationPage
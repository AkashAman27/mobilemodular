'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { MapPin, Phone, Users, Building } from 'lucide-react'
import HTML5USMap from './HTML5USMap'
import { statesData, type StateData } from '@/data/states-data'

// Create a simplified interface for the map selector
interface MapStateData {
  id: string
  name: string
  abbreviation: string
  locations: number
  phone: string
  primaryCity: string
  coverage: string
}

// Convert StateData to MapStateData
const mapStatesData: MapStateData[] = statesData.map(state => ({
  id: state.id,
  name: state.name,
  abbreviation: state.abbreviation,
  locations: state.locations,
  phone: state.phone,
  primaryCity: state.primaryCity,
  coverage: state.coverage
}))

const USMapSelector = () => {
  const [selectedState, setSelectedState] = useState<StateData | null>(null)
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const router = useRouter()

  const handleStateClick = (state: StateData) => {
    router.push(`/locations/${state.id}`)
  }

  const handleStateHover = (stateId: string) => {
    const state = statesData.find(s => s.id === stateId)
    if (state) {
      setHoveredState(stateId)
      setSelectedState(state)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Map Section */}
        <div className="lg:col-span-2">
          <HTML5USMap 
            onStateSelect={(state) => {
              setSelectedState(state)
              setHoveredState(state.id)
            }}
          />
        </div>

        {/* State Info Panel */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {selectedState ? (
              <motion.div
                key={selectedState.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 mr-2" />
                  <h3 className="text-2xl font-bold">{selectedState.name}</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Building className="h-5 w-5 mr-2" />
                    <div>
                      <div className="font-semibold">{selectedState.locations} Locations</div>
                      <div className="text-sm text-blue-100">{selectedState.coverage}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2" />
                    <div>
                      <div className="font-semibold">Primary Hub</div>
                      <div className="text-sm text-blue-100">{selectedState.primaryCity}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 mr-2" />
                    <div>
                      <div className="font-semibold">{selectedState.phone}</div>
                      <div className="text-sm text-blue-100">24/7 Support</div>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleStateClick(selectedState)}
                    className="w-full bg-white text-blue-600 font-semibold py-3 px-4 rounded-lg hover:bg-blue-50 transition-colors mt-4"
                  >
                    View {selectedState.name} Details
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-50 rounded-2xl p-6 text-center"
              >
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Select a State
                </h3>
                <p className="text-gray-600">
                  Hover over or click on any state to see our locations and contact information.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Nationwide Coverage</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">50</div>
                <div className="text-sm text-gray-600">States Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">275+</div>
                <div className="text-sm text-gray-600">Total Locations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">100+</div>
                <div className="text-sm text-gray-600">Mile Service Radius</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default USMapSelector
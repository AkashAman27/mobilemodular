'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, Edit, MapPin, Phone, Clock, Building, Eye, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { supabase } from '@/lib/supabase'

interface City {
  id: string
  state_code: string
  state_name: string
  city_name: string
  city_slug: string
  phone: string
  sales_phone?: string
  service_phone?: string
  address?: string
  hero_title: string
  hero_description: string
  building_types: string[]
  industries_served: string[]
  key_features: string[]
  related_cities: string[]
  is_active: boolean
  is_primary: boolean
  created_at: string
  updated_at: string
}

const CitiesAdmin = () => {
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterState, setFilterState] = useState('')
  const [filterActive, setFilterActive] = useState('all')

  useEffect(() => {
    loadCities()
  }, [])

  const loadCities = async () => {
    try {
      setLoading(true)
      console.log('Loading cities...')
      
      const response = await fetch('/api/cities-admin')
      
      if (!response.ok) {
        const errorData = await response.json()
        console.error('API error loading cities:', errorData)
        throw new Error(errorData.error || 'Failed to load cities')
      }

      const { data } = await response.json()
      console.log('Cities loaded successfully:', data?.length || 0, 'cities')
      setCities(data || [])
    } catch (error) {
      console.error('Error loading cities:', error)
      // Only show user-friendly error message without exposing technical details
      alert('Unable to load city data. Please try again or contact support if the problem persists.')
    } finally {
      setLoading(false)
    }
  }

  const deleteCity = async (id: string) => {
    if (!confirm('Are you sure you want to delete this city? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/cities-admin/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to delete city')
      }
      
      setCities(cities.filter(city => city.id !== id))
    } catch (error) {
      console.error('Error deleting city:', error)
      alert('Failed to delete city')
    }
  }

  const toggleCityStatus = async (id: string, currentStatus: boolean) => {
    try {
      const response = await fetch(`/api/cities-admin/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ is_active: !currentStatus })
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to update city status')
      }
      
      setCities(cities.map(city => 
        city.id === id ? { ...city, is_active: !currentStatus } : city
      ))
    } catch (error) {
      console.error('Error updating city status:', error)
      alert('Failed to update city status')
    }
  }

  const filteredCities = cities.filter(city => {
    const matchesSearch = city.city_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         city.state_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesState = !filterState || city.state_code === filterState
    const matchesActive = filterActive === 'all' || 
                         (filterActive === 'active' && city.is_active) ||
                         (filterActive === 'inactive' && !city.is_active)
    
    return matchesSearch && matchesState && matchesActive
  })

  const uniqueStates = Array.from(new Set(cities.map(city => city.state_code))).sort()

  if (loading) {
    return (
      <LoadingSpinner 
        message="Loading cities..."
        size="md"
        variant="default"
        showLogo={false}
      />
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Cities Management</h1>
          <p className="text-gray-600 mt-2">Manage city pages and locations</p>
        </div>
        <Link href="/admin/cities/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add New City
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search cities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          
          <select
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All States</option>
            {uniqueStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>

          <select
            value={filterActive}
            onChange={(e) => setFilterActive(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active Only</option>
            <option value="inactive">Inactive Only</option>
          </select>

          <div className="text-sm text-gray-600 flex items-center">
            <Building className="h-4 w-4 mr-1" />
            {filteredCities.length} cities
          </div>
        </div>
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCities.map((city) => (
          <motion.div
            key={city.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {city.city_name}, {city.state_code}
                  </h3>
                  <p className="text-gray-600 text-sm">{city.state_name}</p>
                </div>
                <div className="flex items-center space-x-2">
                  {city.is_primary && (
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                      Primary
                    </span>
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    city.is_active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {city.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{city.address || 'No address set'}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>{city.phone}</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  <span>{city.building_types.length} building types</span>
                </div>
              </div>

              <div className="text-sm text-gray-600 mb-4">
                <p className="line-clamp-2">{city.hero_description}</p>
              </div>

              <div className="flex flex-wrap gap-1 mb-4">
                {city.industries_served.slice(0, 3).map((industry) => (
                  <span
                    key={industry}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded"
                  >
                    {industry}
                  </span>
                ))}
                {city.industries_served.length > 3 && (
                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                    +{city.industries_served.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex justify-between items-center">
                <div className="text-xs text-gray-500">
                  Updated {new Date(city.updated_at).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <Link 
                    href={`/locations/${city.state_name.toLowerCase().replace(/\s+/g, '-')}/${city.city_slug}`}
                    target="_blank"
                  >
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href={`/admin/cities/${city.id}`}>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCityStatus(city.id, city.is_active)}
                    className={city.is_active ? 'text-red-600' : 'text-green-600'}
                  >
                    {city.is_active ? 'Deactivate' : 'Activate'}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteCity(city.id)}
                    className="text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCities.length === 0 && (
        <div className="text-center py-12">
          <Building className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No cities found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterState ? 'Try adjusting your filters' : 'Get started by adding your first city'}
          </p>
          <Link href="/admin/cities/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New City
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default CitiesAdmin
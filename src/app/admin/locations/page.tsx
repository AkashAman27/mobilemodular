'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, ArrowLeft, MapPin, Phone, Users, Building, RefreshCw } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface StateLocationData {
  id: string
  state_id: string
  name: string
  abbreviation: string
  locations: number
  phone: string
  primary_city: string
  coverage: string
  description: string
  major_cities: string[]
  service_areas: string[]
  created_at: string
  updated_at: string
}

const US_STATES = [
  { name: 'Alabama', abbreviation: 'AL', id: 'alabama' },
  { name: 'Alaska', abbreviation: 'AK', id: 'alaska' },
  { name: 'Arizona', abbreviation: 'AZ', id: 'arizona' },
  { name: 'Arkansas', abbreviation: 'AR', id: 'arkansas' },
  { name: 'California', abbreviation: 'CA', id: 'california' },
  { name: 'Colorado', abbreviation: 'CO', id: 'colorado' },
  { name: 'Connecticut', abbreviation: 'CT', id: 'connecticut' },
  { name: 'Delaware', abbreviation: 'DE', id: 'delaware' },
  { name: 'Florida', abbreviation: 'FL', id: 'florida' },
  { name: 'Georgia', abbreviation: 'GA', id: 'georgia' },
  { name: 'Hawaii', abbreviation: 'HI', id: 'hawaii' },
  { name: 'Idaho', abbreviation: 'ID', id: 'idaho' },
  { name: 'Illinois', abbreviation: 'IL', id: 'illinois' },
  { name: 'Indiana', abbreviation: 'IN', id: 'indiana' },
  { name: 'Iowa', abbreviation: 'IA', id: 'iowa' },
  { name: 'Kansas', abbreviation: 'KS', id: 'kansas' },
  { name: 'Kentucky', abbreviation: 'KY', id: 'kentucky' },
  { name: 'Louisiana', abbreviation: 'LA', id: 'louisiana' },
  { name: 'Maine', abbreviation: 'ME', id: 'maine' },
  { name: 'Maryland', abbreviation: 'MD', id: 'maryland' },
  { name: 'Massachusetts', abbreviation: 'MA', id: 'massachusetts' },
  { name: 'Michigan', abbreviation: 'MI', id: 'michigan' },
  { name: 'Minnesota', abbreviation: 'MN', id: 'minnesota' },
  { name: 'Mississippi', abbreviation: 'MS', id: 'mississippi' },
  { name: 'Missouri', abbreviation: 'MO', id: 'missouri' },
  { name: 'Montana', abbreviation: 'MT', id: 'montana' },
  { name: 'Nebraska', abbreviation: 'NE', id: 'nebraska' },
  { name: 'Nevada', abbreviation: 'NV', id: 'nevada' },
  { name: 'New Hampshire', abbreviation: 'NH', id: 'new-hampshire' },
  { name: 'New Jersey', abbreviation: 'NJ', id: 'new-jersey' },
  { name: 'New Mexico', abbreviation: 'NM', id: 'new-mexico' },
  { name: 'New York', abbreviation: 'NY', id: 'new-york' },
  { name: 'North Carolina', abbreviation: 'NC', id: 'north-carolina' },
  { name: 'North Dakota', abbreviation: 'ND', id: 'north-dakota' },
  { name: 'Ohio', abbreviation: 'OH', id: 'ohio' },
  { name: 'Oklahoma', abbreviation: 'OK', id: 'oklahoma' },
  { name: 'Oregon', abbreviation: 'OR', id: 'oregon' },
  { name: 'Pennsylvania', abbreviation: 'PA', id: 'pennsylvania' },
  { name: 'Rhode Island', abbreviation: 'RI', id: 'rhode-island' },
  { name: 'South Carolina', abbreviation: 'SC', id: 'south-carolina' },
  { name: 'South Dakota', abbreviation: 'SD', id: 'south-dakota' },
  { name: 'Tennessee', abbreviation: 'TN', id: 'tennessee' },
  { name: 'Texas', abbreviation: 'TX', id: 'texas' },
  { name: 'Utah', abbreviation: 'UT', id: 'utah' },
  { name: 'Vermont', abbreviation: 'VT', id: 'vermont' },
  { name: 'Virginia', abbreviation: 'VA', id: 'virginia' },
  { name: 'Washington', abbreviation: 'WA', id: 'washington' },
  { name: 'West Virginia', abbreviation: 'WV', id: 'west-virginia' },
  { name: 'Wisconsin', abbreviation: 'WI', id: 'wisconsin' },
  { name: 'Wyoming', abbreviation: 'WY', id: 'wyoming' }
]

export default function LocationsAdmin() {
  const [stateLocations, setStateLocations] = useState<StateLocationData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedState, setSelectedState] = useState<string>('')
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [populating, setPopulating] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    abbreviation: '',
    state_id: '',
    locations: 0,
    phone: '',
    primary_city: '',
    coverage: 'Statewide',
    description: '',
    major_cities: [''],
    service_areas: ['']
  })

  useEffect(() => {
    fetchStateLocations()
  }, [])

  const fetchStateLocations = async () => {
    try {
      const { data, error } = await supabase
        .from('state_locations')
        .select('*')
        .order('name', { ascending: true })

      if (error) {
        // Silent error handling with fallback
        setStateLocations([])
        return
      }

      setStateLocations(data || [])
    } catch (error) {
      setStateLocations([])
    } finally {
      setLoading(false)
    }
  }

  const populateFromStatesData = async () => {
    setPopulating(true)
    try {
      // Import the states data directly
      const { statesData } = await import('@/data/states-data')
      
      // Transform the data to match our interface
      const transformedData = statesData.slice(0, 50).map(state => ({
        id: crypto.randomUUID(),
        state_id: state.id,
        name: state.name,
        abbreviation: state.abbreviation,
        locations: state.locations,
        phone: state.phone,
        primary_city: state.primaryCity,
        coverage: state.coverage,
        description: state.description,
        major_cities: state.majorCities,
        service_areas: state.serviceAreas,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }))

      // Try to insert to Supabase, but fall back to local state if it fails
      try {
        const { data, error } = await supabase
          .from('state_locations')
          .insert(transformedData)
          .select()

        if (error) {
          // If Supabase fails, just populate the local state
          setStateLocations(transformedData)
          alert(`Successfully populated ${transformedData.length} states (local mode - Supabase not connected)`)
        } else {
          await fetchStateLocations()
          alert(`Successfully populated ${data.length} states in Supabase!`)
        }
      } catch (dbError) {
        // Fallback to local state
        setStateLocations(transformedData)
        alert(`Successfully populated ${transformedData.length} states (local mode - Supabase not connected)`)
      }
    } catch (error) {
      alert('Error loading states data')
    } finally {
      setPopulating(false)
    }
  }

  const handleStateSelect = (stateName: string, abbreviation: string, stateId: string) => {
    setSelectedState(stateName)
    
    // Pre-populate with regional data based on state
    const getRegionalData = (state: string) => {
      const southeastStates = ['Florida', 'Georgia', 'Alabama', 'Mississippi', 'Tennessee', 'Kentucky', 'Virginia', 'West Virginia', 'North Carolina', 'South Carolina']
      const northeastStates = ['Maine', 'New Hampshire', 'Vermont', 'Massachusetts', 'Rhode Island', 'Connecticut', 'New York', 'New Jersey', 'Pennsylvania', 'Delaware', 'Maryland']
      const southwestStates = ['Texas', 'Oklahoma', 'New Mexico', 'Arizona']
      const mountainStates = ['Montana', 'Wyoming', 'Colorado', 'Utah', 'Idaho']
      const pacificStates = ['California', 'Nevada', 'Oregon', 'Washington', 'Alaska', 'Hawaii']
      
      if (southeastStates.includes(state)) {
        return {
          phone: '1-800-MODULAR ext. 2',
          description: `${state} coverage with hurricane-resistant construction and emergency response capabilities. Specializing in rapid deployment and storm recovery operations.`,
          areas: ['Metro Area', 'Coastal Region', 'Inland Region', 'Border Area', 'Rural Counties']
        }
      } else if (northeastStates.includes(state)) {
        return {
          phone: '1-800-MODULAR ext. 1',
          description: `${state} coverage with cold weather construction and energy efficiency expertise. Specializing in winter weather preparation and urban deployment.`,
          areas: ['Metro Area', 'Urban Centers', 'Rural Region', 'Coastal Area', 'Mountain Region']
        }
      } else if (southwestStates.includes(state)) {
        return {
          phone: '1-800-MODULAR ext. 4',
          description: `${state} coverage with desert climate construction and energy industry expertise. Specializing in extreme heat construction and oil & gas support.`,
          areas: ['Metro Area', 'Desert Region', 'Border Area', 'Energy Corridor', 'Rural Counties']
        }
      } else if (mountainStates.includes(state)) {
        return {
          phone: '1-800-MODULAR ext. 5',
          description: `${state} coverage with high-altitude construction and extreme weather expertise. Specializing in snow load construction and mining industry support.`,
          areas: ['Metro Area', 'Mountain Region', 'High Plains', 'Mining Areas', 'Rural Counties']
        }
      } else if (pacificStates.includes(state)) {
        return {
          phone: '1-800-MODULAR ext. 6',
          description: `${state} coverage with seismic-resistant construction and technology industry expertise. Specializing in earthquake safety and environmental compliance.`,
          areas: ['Metro Area', 'Coastal Region', 'Central Valley', 'Desert Region', 'Mountain Areas']
        }
      } else {
        return {
          phone: '1-800-MODULAR ext. 3',
          description: `${state} coverage with agricultural and industrial expertise. Specializing in rural site access and manufacturing support facilities.`,
          areas: ['Metro Area', 'Agricultural Region', 'Industrial Corridor', 'Rural Counties', 'Border Areas']
        }
      }
    }

    const regionalData = getRegionalData(stateName)
    
    setFormData({
      name: stateName,
      abbreviation: abbreviation,
      state_id: stateId,
      locations: 5,
      phone: regionalData.phone,
      primary_city: '',
      coverage: 'Statewide',
      description: regionalData.description,
      major_cities: ['', '', '', ''],
      service_areas: regionalData.areas
    })
    setShowCreateForm(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const { data, error } = await supabase
        .from('state_locations')
        .insert([{
          state_id: formData.state_id,
          name: formData.name,
          abbreviation: formData.abbreviation,
          locations: formData.locations,
          phone: formData.phone,
          primary_city: formData.primary_city,
          coverage: formData.coverage,
          description: formData.description,
          major_cities: formData.major_cities.filter(city => city.trim() !== ''),
          service_areas: formData.service_areas.filter(area => area.trim() !== '')
        }])
        .select()

      if (error) {
        alert('Error creating state location: ' + error.message)
        return
      }

      await fetchStateLocations()
      setShowCreateForm(false)
      resetForm()
      alert('State location created successfully!')
    } catch (error) {
      alert('Error creating state location')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      abbreviation: '',
      state_id: '',
      locations: 0,
      phone: '',
      primary_city: '',
      coverage: 'Statewide',
      description: '',
      major_cities: [''],
      service_areas: ['']
    })
    setSelectedState('')
  }

  const deleteStateLocation = async (id: string) => {
    if (!confirm('Are you sure you want to delete this state location?')) return

    try {
      const { error } = await supabase
        .from('state_locations')
        .delete()
        .eq('id', id)

      if (error) {
        alert('Error deleting state location')
        return
      }

      setStateLocations(stateLocations.filter(state => state.id !== id))
      alert('State location deleted successfully')
    } catch (error) {
      alert('Error deleting state location')
    }
  }

  const updateMajorCity = (index: number, value: string) => {
    const newCities = [...formData.major_cities]
    newCities[index] = value
    setFormData({ ...formData, major_cities: newCities })
  }

  const updateServiceArea = (index: number, value: string) => {
    const newAreas = [...formData.service_areas]
    newAreas[index] = value
    setFormData({ ...formData, service_areas: newAreas })
  }

  const availableStates = US_STATES.filter(usState => 
    !stateLocations.some(state => state.abbreviation === usState.abbreviation)
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading state locations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Location Data Management</h1>
                <p className="text-gray-600">Manage location page data for all 50 US states</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={populateFromStatesData}
                disabled={populating}
                variant="outline"
                className="text-blue-600 border-blue-600 hover:bg-blue-50"
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${populating ? 'animate-spin' : ''}`} />
                {populating ? 'Populating...' : 'Auto-Populate All States'}
              </Button>
              {availableStates.length > 0 ? (
                <Button 
                  onClick={() => setShowCreateForm(!showCreateForm)}
                  className="bg-navy-600 hover:bg-navy-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add State Data
                </Button>
              ) : (
                <Button 
                  disabled
                  className="bg-gray-400 cursor-not-allowed"
                  title="All 50 states have been added. Use Edit to modify existing states."
                >
                  <Plus className="h-4 w-4 mr-2" />
                  All States Added
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add State Form */}
      {showCreateForm && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Card>
            <CardHeader>
              <CardTitle>Add State Location Data</CardTitle>
              <CardDescription>
                Configure location page data that matches the frontend requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              {availableStates.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-green-600 mb-4">
                    <Building className="h-16 w-16 mx-auto mb-2" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">All States Added!</h3>
                  <p className="text-gray-600 mb-4">
                    All 50 US states have been added to the system. Use the "Edit" button on any state card below to modify existing state data.
                  </p>
                  <Button 
                    onClick={() => setShowCreateForm(false)}
                    variant="outline"
                  >
                    Close
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* State Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select State
                    </label>
                    <select
                      value={selectedState}
                      onChange={(e) => {
                        const selected = US_STATES.find(state => state.name === e.target.value)
                        if (selected) {
                          handleStateSelect(selected.name, selected.abbreviation, selected.id)
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                      required
                    >
                      <option value="">Choose a state...</option>
                      {availableStates.map((state) => (
                        <option key={state.abbreviation} value={state.name}>
                          {state.name} ({state.abbreviation})
                        </option>
                      ))}
                    </select>
                  </div>

                {selectedState && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Primary City *
                        </label>
                        <input
                          type="text"
                          value={formData.primary_city}
                          onChange={(e) => setFormData({ ...formData, primary_city: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                          placeholder="Enter primary city"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location Count
                        </label>
                        <input
                          type="number"
                          value={formData.locations}
                          onChange={(e) => setFormData({ ...formData, locations: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                          min="0"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                          placeholder="(404) 555-0987"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Description *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                        placeholder="Describe the coverage and expertise for this state"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Major Cities
                      </label>
                      <div className="space-y-2">
                        {formData.major_cities.map((city, index) => (
                          <input
                            key={index}
                            type="text"
                            value={city}
                            onChange={(e) => updateMajorCity(index, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                            placeholder={`Major city ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service Areas
                      </label>
                      <div className="space-y-2">
                        {formData.service_areas.map((area, index) => (
                          <input
                            key={index}
                            type="text"
                            value={area}
                            onChange={(e) => updateServiceArea(index, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                            placeholder={`Service area ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <Button type="submit" className="bg-navy-600 hover:bg-navy-700">
                        Create State Location Data
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </>
                )}
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* States Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">State Location Data ({stateLocations.length}/50)</h2>
            <p className="text-gray-600">Location page data that powers /locations/[state] pages</p>
          </div>
        </div>

        {stateLocations.length === 0 ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>No State Location Data Found</CardTitle>
                <CardDescription>
                  No state location data has been configured yet. Use the "Auto-Populate All States" button to populate with demo data, or add individual states manually.
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-blue-800">🛠️ Database Setup (Optional)</CardTitle>
                <CardDescription className="text-blue-700">
                  For persistent data storage, set up the Supabase table. The system works with local data if Supabase is not configured.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-blue-800">
                <div className="space-y-3">
                  <p><strong>1. Create table in Supabase SQL Editor:</strong></p>
                  <pre className="bg-blue-100 p-3 rounded text-xs overflow-x-auto">
{`CREATE TABLE state_locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state_id VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  abbreviation VARCHAR(2) NOT NULL,
  locations INTEGER DEFAULT 0,
  phone VARCHAR(50),
  primary_city VARCHAR(255),
  coverage VARCHAR(255) DEFAULT 'Statewide',
  description TEXT,
  major_cities TEXT[],
  service_areas TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);`}
                  </pre>
                  <p><strong>2. Enable Row Level Security (optional):</strong></p>
                  <pre className="bg-blue-100 p-3 rounded text-xs">
{`ALTER TABLE state_locations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read access" ON state_locations FOR SELECT USING (true);`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stateLocations.map((stateLocation) => (
              <Card key={stateLocation.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-orange-600" />
                        <span>{stateLocation.name}</span>
                        <span className="text-sm font-normal text-gray-500">({stateLocation.abbreviation})</span>
                      </CardTitle>
                      <CardDescription className="text-sm mt-2">
                        {stateLocation.primary_city && `Primary: ${stateLocation.primary_city}`}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{stateLocation.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Building className="h-4 w-4 text-gray-400" />
                      <span>{stateLocation.locations} locations</span>
                    </div>
                    <div className="text-sm">
                      <p className="text-gray-600 line-clamp-2">{stateLocation.description}</p>
                    </div>
                    <div className="text-xs text-gray-500">
                      <p>{stateLocation.major_cities?.length || 0} cities, {stateLocation.service_areas?.length || 0} service areas</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link href={`/admin/locations/${stateLocation.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteStateLocation(stateLocation.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Available States to Add */}
        {availableStates.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Available States to Add</h3>
            <div className="flex flex-wrap gap-2">
              {availableStates.slice(0, 10).map((state) => (
                <Button
                  key={state.abbreviation}
                  variant="outline"
                  size="sm"
                  onClick={() => handleStateSelect(state.name, state.abbreviation, state.id)}
                  className="text-sm"
                >
                  {state.name} ({state.abbreviation})
                </Button>
              ))}
              {availableStates.length > 10 && (
                <span className="text-sm text-gray-500 py-2">
                  +{availableStates.length - 10} more states available
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
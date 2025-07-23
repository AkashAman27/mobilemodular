// Migration script to populate cities table from locations-menu.ts data
// Run with: node scripts/migrate-cities.js

const { createClient } = require('@supabase/supabase-js')

// Note: Replace with your actual Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-supabase-anon-key'

const supabase = createClient(supabaseUrl, supabaseKey)

// Location data from locations-menu.ts
const stateLocations = [
  {
    state: 'AK',
    stateName: 'Alaska',
    cities: [
      { name: 'Anchorage', href: '/locations/alaska/anchorage' },
      { name: 'Fairbanks', href: '/locations/alaska/fairbanks' },
      { name: 'Juneau', href: '/locations/alaska/juneau' }
    ]
  },
  {
    state: 'AL',
    stateName: 'Alabama',
    cities: [
      { name: 'Mobile', href: '/locations/alabama/mobile' },
      { name: 'Montgomery', href: '/locations/alabama/montgomery' },
      { name: 'Birmingham', href: '/locations/alabama/birmingham' },
      { name: 'Huntsville', href: '/locations/alabama/huntsville' },
      { name: 'Theodore', href: '/locations/alabama/theodore' }
    ]
  },
  {
    state: 'AR',
    stateName: 'Arkansas',
    cities: [
      { name: 'Little Rock', href: '/locations/arkansas/little-rock' },
      { name: 'Fort Smith', href: '/locations/arkansas/fort-smith' },
      { name: 'Fayetteville', href: '/locations/arkansas/fayetteville' }
    ]
  },
  {
    state: 'AZ',
    stateName: 'Arizona',
    cities: [
      { name: 'Phoenix', href: '/locations/arizona/phoenix' },
      { name: 'Tucson', href: '/locations/arizona/tucson' },
      { name: 'Mesa', href: '/locations/arizona/mesa' },
      { name: 'Scottsdale', href: '/locations/arizona/scottsdale' }
    ]
  },
  {
    state: 'CA',
    stateName: 'California',
    cities: [
      { name: 'Los Angeles', href: '/locations/california/los-angeles' },
      { name: 'San Francisco', href: '/locations/california/san-francisco' },
      { name: 'San Diego', href: '/locations/california/san-diego' },
      { name: 'Sacramento', href: '/locations/california/sacramento' },
      { name: 'San Jose', href: '/locations/california/san-jose' },
      { name: 'Fresno', href: '/locations/california/fresno' }
    ]
  },
  // Add more states as needed - continuing with a few key ones for brevity
  {
    state: 'FL',
    stateName: 'Florida',
    cities: [
      { name: 'Miami', href: '/locations/florida/miami' },
      { name: 'Orlando', href: '/locations/florida/orlando' },
      { name: 'Tampa', href: '/locations/florida/tampa' },
      { name: 'Jacksonville', href: '/locations/florida/jacksonville' },
      { name: 'Fort Lauderdale', href: '/locations/florida/fort-lauderdale' },
      { name: 'Tallahassee', href: '/locations/florida/tallahassee' }
    ]
  },
  {
    state: 'TX',
    stateName: 'Texas',
    cities: [
      { name: 'Houston', href: '/locations/texas/houston' },
      { name: 'San Antonio', href: '/locations/texas/san-antonio' },
      { name: 'Dallas', href: '/locations/texas/dallas' },
      { name: 'Austin', href: '/locations/texas/austin' },
      { name: 'Fort Worth', href: '/locations/texas/fort-worth' },
      { name: 'El Paso', href: '/locations/texas/el-paso' }
    ]
  }
]

// Default data templates
const defaultBuildingTypes = [
  'Office Trailers',
  'Modular Classrooms',
  'Custom Modular Solutions',
  'Modular Kitchen Solutions',
  'Swing Spaces',
  'DropBox™ Blast-Resistant Modules',
  'ADA-Compliant Restrooms'
]

const defaultIndustries = [
  'Education',
  'Construction',
  'Medical',
  'Government',
  'Manufacturing',
  'Industrial',
  'Retail',
  'Disaster & Emergency Response',
  'Religious Organizations'
]

const defaultFeatures = [
  'On-Time Delivery',
  'Quick Turnaround',
  'Dedicated Sales Specialist',
  'Competitive Pricing',
  'Quality Accessories',
  'Variety of Products',
  'Quality Products'
]

const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
}

const getRandomAddress = (cityName, stateCode) => {
  const streets = ['Main St', 'Business Blvd', 'Industrial Ave', 'Commerce Dr', 'Enterprise Way']
  const streetNumber = Math.floor(Math.random() * 9999) + 1000
  const street = streets[Math.floor(Math.random() * streets.length)]
  const zipCode = Math.floor(Math.random() * 90000) + 10000
  
  return `${streetNumber} ${street}, ${cityName}, ${stateCode} ${zipCode}`
}

const getRandomCoordinates = (stateCode) => {
  // Approximate center coordinates for each state
  const stateCoordinates = {
    'AL': { lat: 32.3617, lng: -86.2792 },
    'AK': { lat: 64.0685, lng: -152.2782 },
    'AZ': { lat: 34.2744, lng: -111.6602 },
    'AR': { lat: 34.7519, lng: -92.1313 },
    'CA': { lat: 36.7783, lng: -119.4179 },
    'FL': { lat: 27.9944, lng: -81.7603 },
    'TX': { lat: 31.9544, lng: -99.9018 }
  }
  
  const base = stateCoordinates[stateCode] || { lat: 39.8283, lng: -98.5795 }
  
  // Add some random variation
  const latVariation = (Math.random() - 0.5) * 2 // ±1 degree
  const lngVariation = (Math.random() - 0.5) * 4 // ±2 degrees
  
  return {
    latitude: base.lat + latVariation,
    longitude: base.lng + lngVariation
  }
}

async function migrateCities() {
  console.log('Starting city migration...')
  
  let totalInserted = 0
  
  for (const stateLocation of stateLocations) {
    console.log(`Processing ${stateLocation.stateName}...`)
    
    for (let i = 0; i < stateLocation.cities.length; i++) {
      const city = stateLocation.cities[i]
      const citySlug = generateSlug(city.name)
      const coordinates = getRandomCoordinates(stateLocation.state)
      
      // Get related cities (other cities in same state, excluding current)
      const relatedCities = stateLocation.cities
        .filter(c => c.name !== city.name)
        .slice(0, 2)
        .map(c => c.name)
      
      const cityData = {
        state_code: stateLocation.state,
        state_name: stateLocation.stateName,
        city_name: city.name,
        city_slug: citySlug,
        phone: '(866) 819-9017',
        sales_phone: '866-974-2990',
        service_phone: '855-841-5263',
        address: getRandomAddress(city.name, stateLocation.state),
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        service_radius: 75 + Math.floor(Math.random() * 50),
        coverage_area: `${city.name} Metropolitan Area`,
        hours_operation: {
          monday: '8:00 AM - 5:00 PM',
          tuesday: '8:00 AM - 5:00 PM',
          wednesday: '8:00 AM - 5:00 PM',
          thursday: '8:00 AM - 5:00 PM',
          friday: '8:00 AM - 5:00 PM',
          saturday: 'Closed',
          sunday: 'Closed'
        },
        hero_title: `Rent, Lease or Buy Modular Buildings in ${city.name}, ${stateLocation.state}`,
        hero_description: `We provide office trailers in ${city.name} to support the city's thriving businesses. Our comprehensive portfolio includes sales offices, modular office complexes, custom modular solutions, modular kitchen solutions, swing spaces, climate-controlled DropBox™ blast-resistant modules, and ADA-compliant modular restrooms.`,
        building_types: defaultBuildingTypes,
        industries_served: defaultIndustries,
        key_features: defaultFeatures,
        meta_title: `Modular Buildings ${city.name} ${stateLocation.state} | Office Trailers & Classrooms for Rent`,
        meta_description: `Professional modular buildings in ${city.name}, ${stateLocation.stateName}. Office trailers, portable classrooms, and custom solutions for rent, lease, or purchase. Call (866) 819-9017.`,
        related_cities: relatedCities,
        is_active: true,
        is_primary: i === 0 // First city in each state is primary
      }
      
      try {
        const { data, error } = await supabase
          .from('cities')
          .upsert([cityData], { 
            onConflict: 'state_code,city_slug',
            ignoreDuplicates: false 
          })
        
        if (error) {
          console.error(`Error inserting ${city.name}, ${stateLocation.state}:`, error)
        } else {
          console.log(`✓ Inserted ${city.name}, ${stateLocation.state}`)
          totalInserted++
        }
      } catch (err) {
        console.error(`Exception inserting ${city.name}, ${stateLocation.state}:`, err)
      }
    }
  }
  
  console.log(`\nMigration complete! Inserted ${totalInserted} cities.`)
}

// Run the migration
migrateCities().catch(console.error)
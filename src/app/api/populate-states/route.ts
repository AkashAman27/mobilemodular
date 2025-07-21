import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // All 50 US States with regional assignments and demo data
    const statesData = [
      // Northeast Region
      { slug: 'maine', name: 'Maine', abbreviation: 'ME', location_count: 3, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Portland', coverage_description: 'Complete Maine coverage with specialized cold weather construction expertise' },
      { slug: 'new-hampshire', name: 'New Hampshire', abbreviation: 'NH', location_count: 2, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Manchester', coverage_description: 'Comprehensive New Hampshire service with expertise in educational and healthcare facilities' },
      { slug: 'vermont', name: 'Vermont', abbreviation: 'VT', location_count: 2, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Burlington', coverage_description: 'Vermont coverage specializing in environmental compliance and rural site access' },
      { slug: 'massachusetts', name: 'Massachusetts', abbreviation: 'MA', location_count: 8, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Boston', coverage_description: 'Massachusetts coverage with expertise in urban delivery and historic district compliance' },
      { slug: 'rhode-island', name: 'Rhode Island', abbreviation: 'RI', location_count: 2, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Providence', coverage_description: 'Complete Rhode Island coverage with coastal construction expertise' },
      { slug: 'connecticut', name: 'Connecticut', abbreviation: 'CT', location_count: 4, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Hartford', coverage_description: 'Connecticut service with expertise in corporate and educational facilities' },
      { slug: 'new-york', name: 'New York', abbreviation: 'NY', location_count: 15, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'New York City', coverage_description: 'Comprehensive New York coverage with expertise in urban delivery and complex installations' },
      { slug: 'new-jersey', name: 'New Jersey', abbreviation: 'NJ', location_count: 6, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Newark', coverage_description: 'New Jersey coverage specializing in healthcare and educational facilities' },
      { slug: 'pennsylvania', name: 'Pennsylvania', abbreviation: 'PA', location_count: 8, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Philadelphia', coverage_description: 'Pennsylvania coverage with manufacturing center and specialized facility expertise' },
      { slug: 'delaware', name: 'Delaware', abbreviation: 'DE', location_count: 1, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Wilmington', coverage_description: 'Delaware coverage with expertise in corporate and government facilities' },
      { slug: 'maryland', name: 'Maryland', abbreviation: 'MD', location_count: 4, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Baltimore', coverage_description: 'Maryland coverage specializing in government and healthcare facilities' },

      // Southeast Region
      { slug: 'virginia', name: 'Virginia', abbreviation: 'VA', location_count: 6, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Richmond', coverage_description: 'Virginia coverage with expertise in government and military facility support' },
      { slug: 'west-virginia', name: 'West Virginia', abbreviation: 'WV', location_count: 2, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Charleston', coverage_description: 'West Virginia coverage with expertise in mining industry and rural site access' },
      { slug: 'north-carolina', name: 'North Carolina', abbreviation: 'NC', location_count: 8, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Charlotte', coverage_description: 'North Carolina coverage with expertise in educational and research facilities' },
      { slug: 'south-carolina', name: 'South Carolina', abbreviation: 'SC', location_count: 4, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Columbia', coverage_description: 'South Carolina coverage specializing in manufacturing and educational support' },
      { slug: 'georgia', name: 'Georgia', abbreviation: 'GA', location_count: 10, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Atlanta', coverage_description: 'Georgia coverage with regional manufacturing center and hurricane-resistant construction' },
      { slug: 'florida', name: 'Florida', abbreviation: 'FL', location_count: 15, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Miami', coverage_description: 'Florida coverage with hurricane preparedness and rapid recovery capabilities' },
      { slug: 'alabama', name: 'Alabama', abbreviation: 'AL', location_count: 5, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Birmingham', coverage_description: 'Alabama coverage with expertise in industrial and educational facilities' },
      { slug: 'mississippi', name: 'Mississippi', abbreviation: 'MS', location_count: 3, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Jackson', coverage_description: 'Mississippi coverage specializing in rural healthcare and educational support' },
      { slug: 'tennessee', name: 'Tennessee', abbreviation: 'TN', location_count: 6, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Nashville', coverage_description: 'Tennessee coverage with expertise in healthcare and music industry facilities' },
      { slug: 'kentucky', name: 'Kentucky', abbreviation: 'KY', location_count: 4, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Louisville', coverage_description: 'Kentucky coverage with expertise in agricultural and equine industry facilities' },

      // Central Region
      { slug: 'ohio', name: 'Ohio', abbreviation: 'OH', location_count: 10, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Columbus', coverage_description: 'Ohio coverage with expertise in manufacturing and educational facilities' },
      { slug: 'indiana', name: 'Indiana', abbreviation: 'IN', location_count: 6, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Indianapolis', coverage_description: 'Indiana coverage specializing in automotive industry and agricultural support' },
      { slug: 'illinois', name: 'Illinois', abbreviation: 'IL', location_count: 12, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Chicago', coverage_description: 'Illinois coverage with regional manufacturing center and urban expertise' },
      { slug: 'michigan', name: 'Michigan', abbreviation: 'MI', location_count: 8, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Detroit', coverage_description: 'Michigan coverage with automotive industry and cold weather construction expertise' },
      { slug: 'wisconsin', name: 'Wisconsin', abbreviation: 'WI', location_count: 5, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Milwaukee', coverage_description: 'Wisconsin coverage specializing in agricultural and manufacturing support' },
      { slug: 'iowa', name: 'Iowa', abbreviation: 'IA', location_count: 3, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Des Moines', coverage_description: 'Iowa coverage with expertise in agricultural and renewable energy facilities' },
      { slug: 'missouri', name: 'Missouri', abbreviation: 'MO', location_count: 6, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Kansas City', coverage_description: 'Missouri coverage with expertise in transportation and logistics facilities' },
      { slug: 'arkansas', name: 'Arkansas', abbreviation: 'AR', location_count: 3, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Little Rock', coverage_description: 'Arkansas coverage specializing in agricultural and retail industry support' },
      { slug: 'louisiana', name: 'Louisiana', abbreviation: 'LA', location_count: 4, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'New Orleans', coverage_description: 'Louisiana coverage with expertise in oil and gas industry and hurricane recovery' },
      { slug: 'minnesota', name: 'Minnesota', abbreviation: 'MN', location_count: 5, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Minneapolis', coverage_description: 'Minnesota coverage with cold weather expertise and healthcare facility specialization' },
      { slug: 'north-dakota', name: 'North Dakota', abbreviation: 'ND', location_count: 2, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Fargo', coverage_description: 'North Dakota coverage with oil and gas industry and extreme weather expertise' },
      { slug: 'south-dakota', name: 'South Dakota', abbreviation: 'SD', location_count: 2, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Sioux Falls', coverage_description: 'South Dakota coverage specializing in agricultural and tourism support' },
      { slug: 'nebraska', name: 'Nebraska', abbreviation: 'NE', location_count: 2, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Omaha', coverage_description: 'Nebraska coverage with agricultural and transportation industry expertise' },
      { slug: 'kansas', name: 'Kansas', abbreviation: 'KS', location_count: 3, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Wichita', coverage_description: 'Kansas coverage specializing in agricultural and aviation industry support' },

      // Southwest Region
      { slug: 'texas', name: 'Texas', abbreviation: 'TX', location_count: 20, primary_phone: '1-800-MODULAR ext. 4', primary_city: 'Houston', coverage_description: 'Texas coverage with regional manufacturing center and oil and gas industry expertise' },
      { slug: 'oklahoma', name: 'Oklahoma', abbreviation: 'OK', location_count: 4, primary_phone: '1-800-MODULAR ext. 4', primary_city: 'Oklahoma City', coverage_description: 'Oklahoma coverage with oil and gas industry and agricultural expertise' },
      { slug: 'new-mexico', name: 'New Mexico', abbreviation: 'NM', location_count: 3, primary_phone: '1-800-MODULAR ext. 4', primary_city: 'Albuquerque', coverage_description: 'New Mexico coverage with border security and desert climate expertise' },
      { slug: 'arizona', name: 'Arizona', abbreviation: 'AZ', location_count: 6, primary_phone: '1-800-MODULAR ext. 4', primary_city: 'Phoenix', coverage_description: 'Arizona coverage specializing in extreme heat construction and border security' },

      // Mountain West Region
      { slug: 'montana', name: 'Montana', abbreviation: 'MT', location_count: 2, primary_phone: '1-800-MODULAR ext. 5', primary_city: 'Billings', coverage_description: 'Montana coverage with mining industry and extreme weather expertise' },
      { slug: 'wyoming', name: 'Wyoming', abbreviation: 'WY', location_count: 2, primary_phone: '1-800-MODULAR ext. 5', primary_city: 'Cheyenne', coverage_description: 'Wyoming coverage specializing in energy industry and high-altitude construction' },
      { slug: 'colorado', name: 'Colorado', abbreviation: 'CO', location_count: 6, primary_phone: '1-800-MODULAR ext. 5', primary_city: 'Denver', coverage_description: 'Colorado coverage with regional manufacturing center and high-altitude expertise' },
      { slug: 'utah', name: 'Utah', abbreviation: 'UT', location_count: 3, primary_phone: '1-800-MODULAR ext. 5', primary_city: 'Salt Lake City', coverage_description: 'Utah coverage with mining industry and desert climate construction expertise' },
      { slug: 'idaho', name: 'Idaho', abbreviation: 'ID', location_count: 2, primary_phone: '1-800-MODULAR ext. 5', primary_city: 'Boise', coverage_description: 'Idaho coverage specializing in agricultural and remote site access expertise' },

      // Pacific Region
      { slug: 'california', name: 'California', abbreviation: 'CA', location_count: 25, primary_phone: '1-800-MODULAR ext. 6', primary_city: 'Los Angeles', coverage_description: 'California coverage with regional manufacturing center and seismic-resistant construction' },
      { slug: 'nevada', name: 'Nevada', abbreviation: 'NV', location_count: 3, primary_phone: '1-800-MODULAR ext. 6', primary_city: 'Las Vegas', coverage_description: 'Nevada coverage with mining industry and desert climate expertise' },
      { slug: 'oregon', name: 'Oregon', abbreviation: 'OR', location_count: 4, primary_phone: '1-800-MODULAR ext. 6', primary_city: 'Portland', coverage_description: 'Oregon coverage specializing in environmental compliance and coastal construction' },
      { slug: 'washington', name: 'Washington', abbreviation: 'WA', location_count: 6, primary_phone: '1-800-MODULAR ext. 6', primary_city: 'Seattle', coverage_description: 'Washington coverage with technology industry and seismic safety expertise' },
      { slug: 'alaska', name: 'Alaska', abbreviation: 'AK', location_count: 2, primary_phone: '1-800-MODULAR ext. 6', primary_city: 'Anchorage', coverage_description: 'Alaska coverage with extreme weather and remote deployment expertise' },
      { slug: 'hawaii', name: 'Hawaii', abbreviation: 'HI', location_count: 2, primary_phone: '1-800-MODULAR ext. 6', primary_city: 'Honolulu', coverage_description: 'Hawaii coverage with tropical climate and island logistics expertise' }
    ]

    // Insert data into states table
    const { data, error } = await supabase
      .from('states')
      .insert(statesData)
      .select()

    if (error) {
      console.error('Error populating states:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'States populated successfully',
      count: data.length,
      data: data 
    })
    
  } catch (error) {
    console.error('Error in populate-states API:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
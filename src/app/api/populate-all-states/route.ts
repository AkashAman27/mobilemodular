import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Check if states table exists, if not, inform user to run database setup
    const { data: existingStates, error: checkError } = await supabase
      .from('states')
      .select('count')
      .limit(1)

    if (checkError && checkError.message.includes('does not exist')) {
      return NextResponse.json({ 
        success: false, 
        error: 'States table does not exist. Please run the database schema setup first.',
        setup_needed: true
      }, { status: 400 })
    }

    // Clear existing data
    await supabase.from('states').delete().neq('id', '00000000-0000-0000-0000-000000000000')

    // All 50 US States with regional assignments and demo data
    const statesData = [
      // Northeast Region - ext. 1
      { slug: 'maine', name: 'Maine', abbreviation: 'ME', location_count: 3, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Portland', coverage_description: 'Maine coverage with cold weather construction expertise and specialized educational facility support for rural communities.' },
      { slug: 'new-hampshire', name: 'New Hampshire', abbreviation: 'NH', location_count: 2, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Manchester', coverage_description: 'New Hampshire service with expertise in educational facilities, winter weather preparation, and historic district compliance.' },
      { slug: 'vermont', name: 'Vermont', abbreviation: 'VT', location_count: 2, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Burlington', coverage_description: 'Vermont coverage specializing in environmental compliance, rural site access, and energy-efficient construction for cold climates.' },
      { slug: 'massachusetts', name: 'Massachusetts', abbreviation: 'MA', location_count: 8, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Boston', coverage_description: 'Massachusetts coverage with expertise in urban delivery, historic district compliance, and high-density educational facility deployment.' },
      { slug: 'rhode-island', name: 'Rhode Island', abbreviation: 'RI', location_count: 2, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Providence', coverage_description: 'Rhode Island service with coastal construction expertise and specialized support for compact urban educational facilities.' },
      { slug: 'connecticut', name: 'Connecticut', abbreviation: 'CT', location_count: 4, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Hartford', coverage_description: 'Connecticut coverage with expertise in corporate facilities, educational institutions, and high-end architectural coordination.' },
      { slug: 'new-york', name: 'New York', abbreviation: 'NY', location_count: 15, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'New York City', coverage_description: 'New York coverage with expertise in complex urban delivery, high-rise construction sites, and large-scale educational projects.' },
      { slug: 'new-jersey', name: 'New Jersey', abbreviation: 'NJ', location_count: 6, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Newark', coverage_description: 'New Jersey service specializing in healthcare facilities, dense urban deployment, and rapid transit accessibility.' },
      { slug: 'pennsylvania', name: 'Pennsylvania', abbreviation: 'PA', location_count: 8, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Philadelphia', coverage_description: 'Pennsylvania coverage with manufacturing center, industrial expertise, and specialized government facility support.' },
      { slug: 'delaware', name: 'Delaware', abbreviation: 'DE', location_count: 1, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Wilmington', coverage_description: 'Delaware service with expertise in corporate facilities, coastal construction, and rapid deployment for business needs.' },
      { slug: 'maryland', name: 'Maryland', abbreviation: 'MD', location_count: 4, primary_phone: '1-800-MODULAR ext. 1', primary_city: 'Baltimore', coverage_description: 'Maryland coverage specializing in government facilities, federal agency support, and Chesapeake Bay area construction.' },

      // Southeast Region - ext. 2
      { slug: 'virginia', name: 'Virginia', abbreviation: 'VA', location_count: 6, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Richmond', coverage_description: 'Virginia coverage with expertise in government facilities, military base support, and federal contracting compliance.' },
      { slug: 'west-virginia', name: 'West Virginia', abbreviation: 'WV', location_count: 2, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Charleston', coverage_description: 'West Virginia service with mining industry expertise, mountainous terrain access, and rural community support.' },
      { slug: 'north-carolina', name: 'North Carolina', abbreviation: 'NC', location_count: 8, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Charlotte', coverage_description: 'North Carolina coverage with expertise in research facilities, university campus expansion, and technology sector support.' },
      { slug: 'south-carolina', name: 'South Carolina', abbreviation: 'SC', location_count: 4, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Columbia', coverage_description: 'South Carolina service specializing in manufacturing support, coastal construction, and hurricane preparedness.' },
      { slug: 'georgia', name: 'Georgia', abbreviation: 'GA', location_count: 10, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Atlanta', coverage_description: 'Georgia coverage with regional manufacturing center, hurricane-resistant construction, and rapid growth area support.' },
      { slug: 'florida', name: 'Florida', abbreviation: 'FL', location_count: 15, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Miami', coverage_description: 'Florida coverage with hurricane preparedness expertise, tropical climate construction, and rapid disaster recovery capabilities.' },
      { slug: 'alabama', name: 'Alabama', abbreviation: 'AL', location_count: 5, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Birmingham', coverage_description: 'Alabama service with industrial facility expertise, automotive industry support, and severe weather construction standards.' },
      { slug: 'mississippi', name: 'Mississippi', abbreviation: 'MS', location_count: 3, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Jackson', coverage_description: 'Mississippi coverage specializing in rural healthcare facilities, educational support, and flood-resistant construction.' },
      { slug: 'tennessee', name: 'Tennessee', abbreviation: 'TN', location_count: 6, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Nashville', coverage_description: 'Tennessee service with healthcare facility expertise, music industry support, and logistics center construction.' },
      { slug: 'kentucky', name: 'Kentucky', abbreviation: 'KY', location_count: 4, primary_phone: '1-800-MODULAR ext. 2', primary_city: 'Louisville', coverage_description: 'Kentucky coverage with agricultural facility expertise, equine industry support, and bourbon industry facility construction.' },

      // Central Region - ext. 3
      { slug: 'ohio', name: 'Ohio', abbreviation: 'OH', location_count: 10, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Columbus', coverage_description: 'Ohio coverage with manufacturing expertise, automotive industry support, and Great Lakes region construction standards.' },
      { slug: 'indiana', name: 'Indiana', abbreviation: 'IN', location_count: 6, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Indianapolis', coverage_description: 'Indiana service specializing in automotive manufacturing support, agricultural facilities, and motorsports industry expertise.' },
      { slug: 'illinois', name: 'Illinois', abbreviation: 'IL', location_count: 12, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Chicago', coverage_description: 'Illinois coverage with regional manufacturing center, urban construction expertise, and transportation hub facility support.' },
      { slug: 'michigan', name: 'Michigan', abbreviation: 'MI', location_count: 8, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Detroit', coverage_description: 'Michigan service with automotive industry expertise, Great Lakes construction standards, and cold weather specialization.' },
      { slug: 'wisconsin', name: 'Wisconsin', abbreviation: 'WI', location_count: 5, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Milwaukee', coverage_description: 'Wisconsin coverage specializing in agricultural support, manufacturing facilities, and cold weather construction expertise.' },
      { slug: 'iowa', name: 'Iowa', abbreviation: 'IA', location_count: 3, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Des Moines', coverage_description: 'Iowa service with agricultural expertise, renewable energy facility support, and rural site access capabilities.' },
      { slug: 'missouri', name: 'Missouri', abbreviation: 'MO', location_count: 6, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Kansas City', coverage_description: 'Missouri coverage with transportation industry expertise, logistics facility support, and central location advantages.' },
      { slug: 'arkansas', name: 'Arkansas', abbreviation: 'AR', location_count: 3, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Little Rock', coverage_description: 'Arkansas service specializing in agricultural facilities, retail industry support, and poultry industry expertise.' },
      { slug: 'louisiana', name: 'Louisiana', abbreviation: 'LA', location_count: 4, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'New Orleans', coverage_description: 'Louisiana coverage with oil and gas industry expertise, hurricane recovery capabilities, and coastal construction standards.' },
      { slug: 'minnesota', name: 'Minnesota', abbreviation: 'MN', location_count: 5, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Minneapolis', coverage_description: 'Minnesota service with extreme cold weather expertise, healthcare facility specialization, and agricultural support.' },
      { slug: 'north-dakota', name: 'North Dakota', abbreviation: 'ND', location_count: 2, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Fargo', coverage_description: 'North Dakota coverage with oil industry expertise, extreme weather construction, and agricultural facility support.' },
      { slug: 'south-dakota', name: 'South Dakota', abbreviation: 'SD', location_count: 2, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Sioux Falls', coverage_description: 'South Dakota service specializing in agricultural support, tourism facilities, and wind energy project construction.' },
      { slug: 'nebraska', name: 'Nebraska', abbreviation: 'NE', location_count: 2, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Omaha', coverage_description: 'Nebraska coverage with agricultural expertise, transportation industry support, and central plains construction standards.' },
      { slug: 'kansas', name: 'Kansas', abbreviation: 'KS', location_count: 3, primary_phone: '1-800-MODULAR ext. 3', primary_city: 'Wichita', coverage_description: 'Kansas service specializing in agricultural facilities, aviation industry support, and central plains construction.' },

      // Southwest Region - ext. 4
      { slug: 'texas', name: 'Texas', abbreviation: 'TX', location_count: 20, primary_phone: '1-800-MODULAR ext. 4', primary_city: 'Houston', coverage_description: 'Texas coverage with regional manufacturing center, oil and gas industry expertise, and extreme heat construction capabilities.' },
      { slug: 'oklahoma', name: 'Oklahoma', abbreviation: 'OK', location_count: 4, primary_phone: '1-800-MODULAR ext. 4', primary_city: 'Oklahoma City', coverage_description: 'Oklahoma service with oil and gas expertise, agricultural facility support, and severe weather construction standards.' },
      { slug: 'new-mexico', name: 'New Mexico', abbreviation: 'NM', location_count: 3, primary_phone: '1-800-MODULAR ext. 4', primary_city: 'Albuquerque', coverage_description: 'New Mexico coverage with border security expertise, desert climate construction, and federal research facility support.' },
      { slug: 'arizona', name: 'Arizona', abbreviation: 'AZ', location_count: 6, primary_phone: '1-800-MODULAR ext. 4', primary_city: 'Phoenix', coverage_description: 'Arizona service specializing in extreme heat construction, border security facilities, and desert climate expertise.' },

      // Mountain West Region - ext. 5
      { slug: 'montana', name: 'Montana', abbreviation: 'MT', location_count: 2, primary_phone: '1-800-MODULAR ext. 5', primary_city: 'Billings', coverage_description: 'Montana coverage with mining industry expertise, extreme weather construction, and remote site access capabilities.' },
      { slug: 'wyoming', name: 'Wyoming', abbreviation: 'WY', location_count: 2, primary_phone: '1-800-MODULAR ext. 5', primary_city: 'Cheyenne', coverage_description: 'Wyoming service specializing in energy industry support, high-altitude construction, and extreme weather preparation.' },
      { slug: 'colorado', name: 'Colorado', abbreviation: 'CO', location_count: 6, primary_phone: '1-800-MODULAR ext. 5', primary_city: 'Denver', coverage_description: 'Colorado coverage with regional manufacturing center, high-altitude expertise, and snow load construction specialization.' },
      { slug: 'utah', name: 'Utah', abbreviation: 'UT', location_count: 3, primary_phone: '1-800-MODULAR ext. 5', primary_city: 'Salt Lake City', coverage_description: 'Utah service with mining industry expertise, desert climate construction, and religious facility specialization.' },
      { slug: 'idaho', name: 'Idaho', abbreviation: 'ID', location_count: 2, primary_phone: '1-800-MODULAR ext. 5', primary_city: 'Boise', coverage_description: 'Idaho coverage specializing in agricultural support, remote site access, and forest service facility construction.' },

      // Pacific Region - ext. 6
      { slug: 'california', name: 'California', abbreviation: 'CA', location_count: 25, primary_phone: '1-800-MODULAR ext. 6', primary_city: 'Los Angeles', coverage_description: 'California coverage with regional manufacturing center, seismic-resistant construction, and technology industry expertise.' },
      { slug: 'nevada', name: 'Nevada', abbreviation: 'NV', location_count: 3, primary_phone: '1-800-MODULAR ext. 6', primary_city: 'Las Vegas', coverage_description: 'Nevada service with mining industry expertise, desert climate construction, and entertainment industry facility support.' },
      { slug: 'oregon', name: 'Oregon', abbreviation: 'OR', location_count: 4, primary_phone: '1-800-MODULAR ext. 6', primary_city: 'Portland', coverage_description: 'Oregon coverage specializing in environmental compliance, coastal construction, and sustainable building practices.' },
      { slug: 'washington', name: 'Washington', abbreviation: 'WA', location_count: 6, primary_phone: '1-800-MODULAR ext. 6', primary_city: 'Seattle', coverage_description: 'Washington service with technology industry expertise, seismic safety specialization, and aerospace industry support.' },
      { slug: 'alaska', name: 'Alaska', abbreviation: 'AK', location_count: 2, primary_phone: '1-800-MODULAR ext. 6', primary_city: 'Anchorage', coverage_description: 'Alaska coverage with extreme weather expertise, remote deployment capabilities, and oil industry facility support.' },
      { slug: 'hawaii', name: 'Hawaii', abbreviation: 'HI', location_count: 2, primary_phone: '1-800-MODULAR ext. 6', primary_city: 'Honolulu', coverage_description: 'Hawaii service with tropical climate expertise, island logistics specialization, and tourism industry facility support.' }
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
      message: 'All 50 states populated successfully',
      count: data.length,
      regions: {
        'Northeast (ext. 1)': 11,
        'Southeast (ext. 2)': 10, 
        'Central (ext. 3)': 14,
        'Southwest (ext. 4)': 4,
        'Mountain West (ext. 5)': 5,
        'Pacific (ext. 6)': 6
      }
    })
    
  } catch (error) {
    console.error('Error in populate-all-states API:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
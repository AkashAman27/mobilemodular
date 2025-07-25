import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🏭 Populating complete industries data...')

    // Enhanced industry data with comprehensive information
    const industriesData = [
      {
        slug: 'education',
        name: 'Education',
        description: 'Flexible learning spaces for schools and universities. Our modular classrooms and educational buildings provide safe, comfortable environments that support modern learning while offering the flexibility to expand or relocate as enrollment changes.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
        case_studies_count: 15,
        solutions: ['Portable Classrooms', 'Administrative Offices', 'Science Labs', 'Library Extensions'],
        benefits: ['Quick Deployment', 'Capacity Solutions', 'Cost Effective', 'Education Focused'],
        statistics: {
          schools_served: '500+',
          classrooms_delivered: '15K+',
          customer_satisfaction: '98%',
          emergency_response: '24hr'
        },
        case_studies: [
          {
            title: 'Riverside Elementary Expansion',
            description: 'Provided 8 portable classrooms to accommodate 200 additional students during permanent building construction.',
            results: ['Zero disruption to classes', '18-month rental term', 'ADA compliant installation']
          },
          {
            title: 'State University Research Labs',
            description: 'Temporary science labs during renovation of the chemistry building.',
            results: ['Full lab capabilities maintained', 'Specialized ventilation systems', 'Research continuity preserved']
          }
        ]
      },
      {
        slug: 'construction',
        name: 'Construction',
        description: 'On-site offices and storage solutions for construction projects. Durable modular buildings designed to withstand job site conditions while providing professional work environments for project management and worker facilities.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp',
        case_studies_count: 28,
        solutions: ['Job Site Offices', 'Equipment Storage', 'Worker Facilities', 'Security Buildings'],
        benefits: ['Rapid Deployment', 'Weather Resistant', 'Professional Environment', 'Cost Savings'],
        statistics: {
          projects_served: '1,200+',
          buildings_deployed: '8K+',
          project_completion: '99%',
          deployment_time: '48hr'
        },
        case_studies: [
          {
            title: 'Downtown High-Rise Project',
            description: 'Complete office complex for 18-month construction project including management offices and worker facilities.',
            results: ['Professional work environment', 'Improved project coordination', 'Enhanced worker satisfaction']
          },
          {
            title: 'Highway Infrastructure Project',
            description: 'Mobile offices and storage for 50-mile highway expansion project.',
            results: ['Mobile capability as needed', 'Weather-resistant construction', 'Enhanced security features']
          }
        ]
      },
      {
        slug: 'healthcare',
        name: 'Healthcare',
        description: 'Medical facilities and emergency response buildings. Specialized modular healthcare buildings that meet medical standards and provide flexible solutions for hospitals, clinics, and emergency medical services.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_healthcare_modular_medical_building_at_ho.webp',
        case_studies_count: 12,
        solutions: ['Medical Offices', 'Emergency Clinics', 'Testing Facilities', 'Administrative Offices'],
        benefits: ['Medical Grade Standards', 'Rapid Deployment', 'Infection Control', 'Equipment Ready'],
        statistics: {
          facilities_served: '300+',
          patients_treated: '1M+',
          response_time: '24hr',
          medical_compliance: '100%'
        },
        case_studies: [
          {
            title: 'Metropolitan Hospital Expansion',
            description: 'Emergency expansion during COVID-19 surge with specialized isolation and treatment facilities.',
            results: ['200% capacity increase', 'Infection control protocols', 'Critical care capabilities']
          },
          {
            title: 'Rural Health Clinic',
            description: 'Temporary medical facility serving remote community during permanent facility construction.',
            results: ['Uninterrupted medical services', 'Full diagnostic capabilities', 'Specialist consultation ready']
          }
        ]
      },
      {
        slug: 'government',
        name: 'Government',
        description: 'Secure buildings for government and municipal use. Purpose-built modular facilities that meet government security requirements and provide professional environments for public services and administrative functions.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp',
        case_studies_count: 22,
        solutions: ['Administrative Offices', 'Security Checkpoints', 'Public Service Centers', 'Court Facilities'],
        benefits: ['Security Compliant', 'Public Access Ready', 'Professional Environment', 'Scalable Solutions'],
        statistics: {
          agencies_served: '150+',
          facilities_deployed: '800+',
          security_compliance: '100%',
          public_satisfaction: '94%'
        },
        case_studies: [
          {
            title: 'City Hall Renovation Project',
            description: 'Temporary city services building during major renovation of historic city hall.',
            results: ['Uninterrupted public services', 'ADA compliant facilities', 'Enhanced security features']
          },
          {
            title: 'Emergency Operations Center',
            description: 'Rapid deployment emergency command center following natural disaster.',
            results: ['24-hour deployment', 'Full communication capabilities', 'Multi-agency coordination']
          }
        ]
      },
      {
        slug: 'retail-commercial',
        name: 'Retail & Commercial',
        description: 'Pop-up stores and temporary commercial spaces. Flexible retail solutions perfect for seasonal businesses, market expansions, and temporary commercial needs with professional finishes and customer-ready environments.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp',
        case_studies_count: 18,
        solutions: ['Pop-up Stores', 'Seasonal Retail', 'Sales Offices', 'Customer Service Centers'],
        benefits: ['Quick Market Entry', 'Professional Appearance', 'Cost Effective', 'Flexible Terms'],
        statistics: {
          retailers_served: '400+',
          stores_deployed: '2K+',
          sales_increase: '35%',
          setup_time: '3 days'
        },
        case_studies: [
          {
            title: 'Holiday Retail Expansion',
            description: 'Seasonal retail spaces for major retailer during peak holiday shopping season.',
            results: ['40% sales increase', 'Professional customer experience', 'Rapid deployment across multiple locations']
          },
          {
            title: 'Product Launch Tour',
            description: 'Mobile showroom for technology company product launch across major cities.',
            results: ['Consistent brand experience', 'High customer engagement', 'Successful market penetration']
          }
        ]
      },
      {
        slug: 'emergency-response',
        name: 'Emergency Response',
        description: 'Rapid deployment buildings for emergency situations. Specialized modular facilities designed for disaster response, emergency management, and crisis situations with fast deployment capabilities and essential infrastructure.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp',
        case_studies_count: 9,
        solutions: ['Command Centers', 'Medical Triage', 'Emergency Shelters', 'Communication Hubs'],
        benefits: ['Instant Deployment', 'Self-Contained Systems', 'Disaster Resistant', 'Multi-Purpose Use'],
        statistics: {
          disasters_responded: '50+',
          people_served: '100K+',
          deployment_time: '6hr',
          availability: '24/7'
        },
        case_studies: [
          {
            title: 'Hurricane Relief Operations',
            description: 'Emergency command and medical facilities deployed within hours of hurricane landfall.',
            results: ['6-hour deployment time', 'Coordinated multi-agency response', 'Thousands of residents served']
          },
          {
            title: 'Wildfire Emergency Response',
            description: 'Mobile command centers and evacuation facilities for wildfire emergency management.',
            results: ['Real-time coordination', 'Safe evacuation processing', 'Communication hub establishment']
          }
        ]
      }
    ]

    // Check existing data
    const { data: existingIndustries } = await supabaseAdmin
      .from('industries')
      .select('slug')

    const existingSlugs = existingIndustries?.map(item => item.slug) || []

    // Insert or update industries
    for (const industry of industriesData) {
      try {
        if (existingSlugs.includes(industry.slug)) {
          // Update existing
          const { error: updateError } = await supabaseAdmin
            .from('industries')
            .update({
              name: industry.name,
              description: industry.description,
              image_url: industry.image_url,
              case_studies_count: industry.case_studies_count,
              updated_at: new Date().toISOString()
            })
            .eq('slug', industry.slug)

          if (updateError) {
            console.error(`❌ Error updating ${industry.name}:`, updateError)
          } else {
            console.log(`✅ Updated: ${industry.name}`)
          }
        } else {
          // Insert new
          const { error: insertError } = await supabaseAdmin
            .from('industries')
            .insert(industry)

          if (insertError) {
            console.error(`❌ Error inserting ${industry.name}:`, insertError)
          } else {
            console.log(`✅ Inserted: ${industry.name}`)
          }
        }
      } catch (error) {
        console.error(`❌ Exception for ${industry.name}:`, error)
      }
    }

    console.log('🎉 Complete industries population finished!')

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${industriesData.length} industries`,
      industries: industriesData.map(i => ({ slug: i.slug, name: i.name })),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Error in populate-complete-industries:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to populate industries',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
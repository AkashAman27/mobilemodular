import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🏭 Populating comprehensive industry content...')

    // Comprehensive industry data with all webpage content
    const industriesData = [
      {
        slug: 'education',
        name: 'Education',
        subtitle: 'Industry Solutions',
        description: 'Flexible modular building solutions for schools, universities, and educational institutions. From portable classrooms to administrative offices, we support learning environments of all sizes.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
        case_studies_count: 15,
        meta_title: 'Education Industry Solutions - Schools & Universities | Modular Building Solutions',
        meta_description: 'Modular building solutions for schools and universities. Portable classrooms, administrative offices, and specialized educational facilities.',
        solutions: [
          {
            title: 'Portable Classrooms',
            description: 'Modern learning environments with technology integration and optimal acoustics.',
            icon_name: 'BookOpen',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
            features: ['Smart board ready', 'Energy efficient HVAC', 'ADA compliant', 'Sound insulation']
          },
          {
            title: 'Administrative Offices',
            description: 'Professional office spaces for school administration, counseling, and meetings.',
            icon_name: 'Calculator',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
            features: ['Climate controlled', 'Professional finishes', 'Flexible layouts', 'Security features']
          },
          {
            title: 'Specialized Labs',
            description: 'Science labs, computer labs, and specialized learning environments.',
            icon_name: 'Beaker',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
            features: ['Lab-grade utilities', 'Ventilation systems', 'Technology infrastructure', 'Safety compliant']
          }
        ],
        benefits: [
          {
            title: 'Quick Deployment',
            description: 'Minimal disruption to the school year with fast installation and setup.',
            icon_name: 'Clock'
          },
          {
            title: 'Capacity Solutions', 
            description: 'Handle enrollment growth or provide space during renovations.',
            icon_name: 'Users'
          },
          {
            title: 'Cost Effective',
            description: 'More affordable than permanent construction with flexible terms.',
            icon_name: 'Building2'
          },
          {
            title: 'Education Focused',
            description: 'Designed specifically for educational environments and requirements.',
            icon_name: 'GraduationCap'
          }
        ],
        case_studies: [
          {
            title: 'Riverside Elementary Expansion',
            description: 'Provided 8 portable classrooms to accommodate 200 additional students during permanent building construction.',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp',
            results: ['Zero disruption to classes', '18-month rental term', 'ADA compliant installation']
          },
          {
            title: 'State University Research Labs',
            description: 'Temporary science labs during renovation of the chemistry building.',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
            results: ['Full lab capabilities maintained', 'Specialized ventilation systems', 'Research continuity preserved']
          },
          {
            title: 'Metro High School Offices',
            description: 'Administrative offices during main building renovation project.',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
            results: ['Professional work environment', 'Secure document storage', 'Meeting room facilities']
          }
        ],
        statistics: [
          { label: 'Schools Served', value: '500+', description: 'Educational institutions nationwide' },
          { label: 'Classrooms Delivered', value: '15K+', description: 'Portable learning spaces deployed' },
          { label: 'Customer Satisfaction', value: '98%', description: 'Client satisfaction rating' },
          { label: 'Emergency Response', value: '24hr', description: 'Rapid deployment capability' }
        ]
      },
      {
        slug: 'construction',
        name: 'Construction',
        subtitle: 'Industry Solutions',
        description: 'On-site offices and storage solutions for construction projects. Durable modular buildings designed to withstand job site conditions while providing professional work environments.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp',
        case_studies_count: 28,
        meta_title: 'Construction Industry Solutions - Job Site Offices & Storage',
        meta_description: 'Durable modular buildings for construction sites. Job site offices, equipment storage, and worker facilities.',
        solutions: [
          {
            title: 'Job Site Offices',
            description: 'Professional work environments for project management and coordination.',
            icon_name: 'Building2',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp',
            features: ['Durable construction', 'Climate controlled', 'Communication ready', 'Secure storage']
          },
          {
            title: 'Equipment Storage',
            description: 'Secure storage solutions for tools, equipment, and materials.',
            icon_name: 'Shield',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
            features: ['Weather resistant', 'Multiple lock options', 'Easy access', 'Ventilation systems']
          },
          {
            title: 'Worker Facilities',
            description: 'Break rooms, changing areas, and worker comfort facilities.',
            icon_name: 'Users',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
            features: ['OSHA compliant', 'Heating and cooling', 'Restroom facilities', 'Break area setup']
          }
        ],
        benefits: [
          {
            title: 'Rapid Deployment',
            description: 'Quick setup to keep projects on schedule and within budget.',
            icon_name: 'Clock'
          },
          {
            title: 'Weather Resistant',
            description: 'Built to withstand harsh job site conditions and weather.',
            icon_name: 'Shield'
          },
          {
            title: 'Professional Environment',
            description: 'Maintain professional standards for meetings and operations.',
            icon_name: 'Building2'
          },
          {
            title: 'Cost Savings',
            description: 'More affordable than permanent structures with flexible rental terms.',
            icon_name: 'Users'
          }
        ],
        case_studies: [
          {
            title: 'Downtown High-Rise Project',
            description: 'Complete office complex for 18-month construction project including management offices and worker facilities.',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp',
            results: ['Professional work environment', 'Improved project coordination', 'Enhanced worker satisfaction']
          },
          {
            title: 'Highway Infrastructure Project',
            description: 'Mobile offices and storage for 50-mile highway expansion project.',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp',
            results: ['Mobile capability as needed', 'Weather-resistant construction', 'Enhanced security features']
          }
        ],
        statistics: [
          { label: 'Projects Served', value: '1,200+', description: 'Construction projects nationwide' },
          { label: 'Buildings Deployed', value: '8K+', description: 'Site offices and facilities' },
          { label: 'Project Completion', value: '99%', description: 'On-time project delivery' },
          { label: 'Deployment Time', value: '48hr', description: 'Average setup time' }
        ]
      },
      {
        slug: 'healthcare',
        name: 'Healthcare',
        subtitle: 'Industry Solutions',
        description: 'Medical facilities and emergency response buildings. Specialized modular healthcare buildings that meet medical standards and provide flexible solutions for hospitals and clinics.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_healthcare_modular_medical_building_at_ho.webp',
        case_studies_count: 12,
        meta_title: 'Healthcare Industry Solutions - Medical Facilities & Emergency Response',
        meta_description: 'Specialized modular healthcare buildings. Medical offices, emergency clinics, and testing facilities.',
        solutions: [
          {
            title: 'Medical Offices',
            description: 'Professional medical environments for patient care and consultations.',
            icon_name: 'Stethoscope',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp',
            features: ['Medical grade flooring', 'HVAC filtration', 'ADA compliant', 'Privacy features']
          },
          {
            title: 'Emergency Clinics',
            description: 'Rapid deployment medical facilities for emergency and disaster response.',
            icon_name: 'AlertTriangle',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_healthcare_modular_medical_building_at_ho.webp',
            features: ['Emergency power', 'Medical equipment ready', 'Isolation capabilities', 'Quick setup']
          },
          {
            title: 'Testing Facilities',
            description: 'Specialized spaces for medical testing and diagnostic procedures.',
            icon_name: 'Shield',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp',
            features: ['Controlled environment', 'Privacy compliant', 'Equipment integration', 'Safety protocols']
          }
        ],
        benefits: [
          {
            title: 'Medical Grade Standards',
            description: 'All facilities meet medical industry standards and regulations.',
            icon_name: 'Clock'
          },
          {
            title: 'Rapid Deployment',
            description: 'Quick setup for emergency medical needs and capacity expansion.',
            icon_name: 'Users'
          },
          {
            title: 'Infection Control',
            description: 'Designed with proper ventilation and sanitation capabilities.',
            icon_name: 'Shield'
          },
          {
            title: 'Equipment Ready',
            description: 'Infrastructure ready for medical equipment installation.',
            icon_name: 'Building2'
          }
        ],
        case_studies: [
          {
            title: 'Metropolitan Hospital Expansion',
            description: 'Emergency expansion during COVID-19 surge with specialized isolation and treatment facilities.',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_healthcare_modular_medical_building_at_ho.webp',
            results: ['200% capacity increase', 'Infection control protocols', 'Critical care capabilities']
          },
          {
            title: 'Rural Health Clinic',
            description: 'Temporary medical facility serving remote community during permanent facility construction.',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp',
            results: ['Uninterrupted medical services', 'Full diagnostic capabilities', 'Specialist consultation ready']
          }
        ],
        statistics: [
          { label: 'Facilities Served', value: '300+', description: 'Healthcare institutions' },
          { label: 'Patients Treated', value: '1M+', description: 'Patients served in our facilities' },
          { label: 'Response Time', value: '24hr', description: 'Emergency deployment capability' },
          { label: 'Medical Compliance', value: '100%', description: 'Regulatory compliance rate' }
        ]
      },
      {
        slug: 'government',
        name: 'Government',
        subtitle: 'Industry Solutions',
        description: 'Secure buildings for government and municipal use. Purpose-built modular facilities that meet government security requirements and provide professional environments.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp',
        case_studies_count: 22,
        meta_title: 'Government Industry Solutions - Secure Administrative Buildings',
        meta_description: 'Secure modular buildings for government use. Administrative offices, security checkpoints, and public service centers.',
        solutions: [
          {
            title: 'Administrative Offices',
            description: 'Professional government office spaces for public service delivery.',
            icon_name: 'Building',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp',
            features: ['Security compliant', 'ADA accessible', 'Professional finishes', 'Climate controlled']
          },
          {
            title: 'Security Checkpoints', 
            description: 'Secure screening and checkpoint facilities for government facilities.',
            icon_name: 'Shield',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
            features: ['Bullet resistant options', 'Communication systems', 'Surveillance ready', 'Access control']
          },
          {
            title: 'Public Service Centers',
            description: 'Citizen service centers for permits, licensing, and public interactions.',
            icon_name: 'Users',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp',
            features: ['Public friendly design', 'Waiting areas', 'Service windows', 'Document processing']
          }
        ],
        benefits: [
          {
            title: 'Security Compliant',
            description: 'Meets government security requirements and protocols.',
            icon_name: 'Shield'
          },
          {
            title: 'Public Access Ready',
            description: 'ADA compliant with proper public access features.',
            icon_name: 'Users'
          },
          {
            title: 'Professional Environment',
            description: 'Maintains government standards for public service.',
            icon_name: 'Building2'
          },
          {
            title: 'Scalable Solutions',
            description: 'Flexible capacity to meet changing government needs.',
            icon_name: 'Clock'
          }
        ],
        case_studies: [
          {
            title: 'City Hall Renovation Project',
            description: 'Temporary city services building during major renovation of historic city hall.',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp',
            results: ['Uninterrupted public services', 'ADA compliant facilities', 'Enhanced security features']
          },
          {
            title: 'Emergency Operations Center',
            description: 'Rapid deployment emergency command center following natural disaster.',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp',
            results: ['24-hour deployment', 'Full communication capabilities', 'Multi-agency coordination']
          }
        ],
        statistics: [
          { label: 'Agencies Served', value: '150+', description: 'Government agencies' },
          { label: 'Facilities Deployed', value: '800+', description: 'Government buildings' },
          { label: 'Security Compliance', value: '100%', description: 'Security standard compliance' },
          { label: 'Public Satisfaction', value: '94%', description: 'Citizen service satisfaction' }
        ]
      },
      {
        slug: 'retail-commercial',
        name: 'Retail & Commercial',
        subtitle: 'Industry Solutions',
        description: 'Pop-up stores and temporary commercial spaces. Flexible retail solutions perfect for seasonal businesses, market expansions, and temporary commercial needs.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp',
        case_studies_count: 18,
        meta_title: 'Retail & Commercial Solutions - Pop-up Stores & Temporary Spaces',
        meta_description: 'Flexible retail solutions for pop-up stores, seasonal businesses, and temporary commercial spaces.',
        solutions: [
          {
            title: 'Pop-up Stores',
            description: 'Temporary retail spaces for seasonal businesses and market testing.',
            icon_name: 'ShoppingBag',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp',
            features: ['Professional appearance', 'Customer ready', 'Flexible layouts', 'Branding ready']
          },
          {
            title: 'Sales Offices',
            description: 'Professional sales environments for customer consultations and presentations.',
            icon_name: 'Building2',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
            features: ['Professional finishes', 'Meeting spaces', 'Display areas', 'Client comfort']
          },
          {
            title: 'Customer Service Centers',
            description: 'Dedicated spaces for customer support and service operations.',
            icon_name: 'Users',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp',
            features: ['Sound insulation', 'Technology ready', 'Comfortable environment', 'Professional appearance']
          }
        ],
        benefits: [
          {
            title: 'Quick Market Entry',
            description: 'Rapid deployment to capitalize on market opportunities.',
            icon_name: 'Clock'
          },
          {
            title: 'Professional Appearance',
            description: 'High-quality finishes that reflect your brand standards.',
            icon_name: 'Building2'
          },
          {
            title: 'Cost Effective',
            description: 'Lower costs than permanent retail space with flexible terms.',
            icon_name: 'Users'
          },
          {
            title: 'Flexible Terms',
            description: 'Seasonal and short-term rental options available.',
            icon_name: 'ShoppingBag'
          }
        ],
        case_studies: [
          {
            title: 'Holiday Retail Expansion',
            description: 'Seasonal retail spaces for major retailer during peak holiday shopping season.',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp',
            results: ['40% sales increase', 'Professional customer experience', 'Rapid deployment across multiple locations']
          },
          {
            title: 'Product Launch Tour',
            description: 'Mobile showroom for technology company product launch across major cities.',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp',
            results: ['Consistent brand experience', 'High customer engagement', 'Successful market penetration']
          }
        ],
        statistics: [
          { label: 'Retailers Served', value: '400+', description: 'Retail businesses' },
          { label: 'Stores Deployed', value: '2K+', description: 'Pop-up and temporary stores' },
          { label: 'Sales Increase', value: '35%', description: 'Average client sales boost' },
          { label: 'Setup Time', value: '3 days', description: 'Average deployment time' }
        ]
      },
      {
        slug: 'emergency-response',
        name: 'Emergency Response', 
        subtitle: 'Industry Solutions',
        description: 'Rapid deployment buildings for emergency situations. Specialized modular facilities designed for disaster response, emergency management, and crisis situations.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp',
        case_studies_count: 9,
        meta_title: 'Emergency Response Solutions - Rapid Deployment Buildings',
        meta_description: 'Specialized modular facilities for emergency response. Command centers, medical triage, and emergency shelters.',
        solutions: [
          {
            title: 'Command Centers',
            description: 'Emergency management and coordination facilities for disaster response.',
            icon_name: 'AlertTriangle',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp',
            features: ['Communication systems', 'Power backup', 'Climate controlled', 'Quick deployment']
          },
          {
            title: 'Medical Triage',
            description: 'Emergency medical facilities for disaster and emergency response.',
            icon_name: 'Stethoscope',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp',
            features: ['Medical equipment ready', 'Isolation capabilities', 'Emergency power', 'Rapid setup']
          },
          {
            title: 'Emergency Shelters',
            description: 'Temporary housing and shelter facilities for displaced populations.',
            icon_name: 'Shield',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp',
            features: ['Weather resistant', 'Privacy options', 'Basic utilities', 'Mass deployment']
          }
        ],
        benefits: [
          {
            title: 'Instant Deployment',
            description: 'Rapid response capabilities for emergency situations.',
            icon_name: 'Clock'
          },
          {
            title: 'Self-Contained Systems',
            description: 'Independent power, water, and communication systems.',
            icon_name: 'Shield'
          },
          {
            title: 'Disaster Resistant',
            description: 'Built to withstand extreme weather and conditions.',
            icon_name: 'Building2'
          },
          {
            title: 'Multi-Purpose Use',
            description: 'Flexible spaces that can serve multiple emergency functions.',
            icon_name: 'Users'
          }
        ],
        case_studies: [
          {
            title: 'Hurricane Relief Operations',
            description: 'Emergency command and medical facilities deployed within hours of hurricane landfall.',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp',
            results: ['6-hour deployment time', 'Coordinated multi-agency response', 'Thousands of residents served']
          },
          {
            title: 'Wildfire Emergency Response',
            description: 'Mobile command centers and evacuation facilities for wildfire emergency management.',
            image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp',
            results: ['Real-time coordination', 'Safe evacuation processing', 'Communication hub establishment']
          }
        ],
        statistics: [
          { label: 'Disasters Responded', value: '50+', description: 'Emergency situations handled' },
          { label: 'People Served', value: '100K+', description: 'Individuals assisted' },
          { label: 'Deployment Time', value: '6hr', description: 'Average emergency deployment' },
          { label: 'Availability', value: '24/7', description: 'Emergency response availability' }
        ]
      }
    ]

    // Insert data for each industry
    for (const industry of industriesData) {
      try {
        console.log(`📊 Processing industry: ${industry.name}`)

        // Insert main industry content
        const { data: industryRecord, error: industryError } = await supabaseAdmin
          .from('industry_content')
          .upsert({
            slug: industry.slug,
            name: industry.name,
            subtitle: industry.subtitle,
            description: industry.description,
            image_url: industry.image_url,
            case_studies_count: industry.case_studies_count,
            meta_title: industry.meta_title,
            meta_description: industry.meta_description,
            updated_at: new Date().toISOString()
          }, { onConflict: 'slug' })
          .select()

        if (industryError) {
          console.error(`❌ Error inserting industry ${industry.name}:`, industryError)
          continue
        }

        // Insert solutions
        for (let i = 0; i < industry.solutions.length; i++) {
          const solution = industry.solutions[i]
          const { error: solutionError } = await supabaseAdmin
            .from('industry_solutions')
            .upsert({
              industry_slug: industry.slug,
              title: solution.title,
              description: solution.description,
              icon_name: solution.icon_name,
              image_url: solution.image_url,
              features: solution.features,
              sort_order: i
            })

          if (solutionError) {
            console.error(`❌ Error inserting solution ${solution.title}:`, solutionError)
          }
        }

        // Insert benefits
        for (let i = 0; i < industry.benefits.length; i++) {
          const benefit = industry.benefits[i]
          const { error: benefitError } = await supabaseAdmin
            .from('industry_benefits')
            .upsert({
              industry_slug: industry.slug,
              title: benefit.title,
              description: benefit.description,
              icon_name: benefit.icon_name,
              sort_order: i
            })

          if (benefitError) {
            console.error(`❌ Error inserting benefit ${benefit.title}:`, benefitError)
          }
        }

        // Insert case studies
        for (let i = 0; i < industry.case_studies.length; i++) {
          const caseStudy = industry.case_studies[i]
          const { error: caseStudyError } = await supabaseAdmin
            .from('industry_case_studies')
            .upsert({
              industry_slug: industry.slug,
              title: caseStudy.title,
              description: caseStudy.description,
              image_url: caseStudy.image_url,
              results: caseStudy.results,
              sort_order: i
            })

          if (caseStudyError) {
            console.error(`❌ Error inserting case study ${caseStudy.title}:`, caseStudyError)
          }
        }

        // Insert statistics
        for (let i = 0; i < industry.statistics.length; i++) {
          const statistic = industry.statistics[i]
          const { error: statisticError } = await supabaseAdmin
            .from('industry_statistics')
            .upsert({
              industry_slug: industry.slug,
              label: statistic.label,
              value: statistic.value,
              description: statistic.description,
              sort_order: i
            })

          if (statisticError) {
            console.error(`❌ Error inserting statistic ${statistic.label}:`, statisticError)
          }
        }

        console.log(`✅ Completed industry: ${industry.name}`)

      } catch (error) {
        console.error(`❌ Exception processing ${industry.name}:`, error)
      }
    }

    console.log('🎉 Full industry content population complete!')

    return NextResponse.json({
      success: true,
      message: `Successfully populated content for ${industriesData.length} industries`,
      industries: industriesData.map(i => ({ slug: i.slug, name: i.name })),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Error in populate-full-industry-content:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to populate industry content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
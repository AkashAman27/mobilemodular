import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🏭 Setting up demo data for education industry...')

    // Since we can't create tables via API easily, let's work with existing tables or create them manually
    // For now, let's populate the admin interface with the demo data by storing it in a simple way

    // First, let's check if we can insert into industry_content
    const educationData = {
      slug: 'education',
      name: 'Education',
      subtitle: 'Industry Solutions',
      description: 'Flexible modular building solutions for schools, universities, and educational institutions. Our portable classrooms and administrative facilities provide the space you need when you need it.',
      image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
      case_studies_count: 3,
      meta_title: 'Education Industry Solutions - Modular Buildings',
      meta_description: 'Professional modular building solutions for education organizations including portable classrooms, administrative offices, and specialized learning environments.'
    }

    const solutions = [
      {
        industry_slug: 'education',
        title: 'Portable Classrooms',
        description: 'Modern learning environments with technology integration and optimal acoustics.',
        icon_name: 'BookOpen',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
        features: ['Smart board ready', 'Energy efficient HVAC', 'ADA compliant', 'Sound insulation'],
        sort_order: 0
      },
      {
        industry_slug: 'education',
        title: 'Administrative Offices',
        description: 'Professional office spaces for school administration, counseling, and meetings.',
        icon_name: 'Calculator',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        features: ['Climate controlled', 'Professional finishes', 'Flexible layouts', 'Security features'],
        sort_order: 1
      },
      {
        industry_slug: 'education',
        title: 'Specialized Labs',
        description: 'Science labs, computer labs, and specialized learning environments.',
        icon_name: 'Beaker',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        features: ['Lab-grade utilities', 'Ventilation systems', 'Technology infrastructure', 'Safety compliant'],
        sort_order: 2
      }
    ]

    const benefits = [
      {
        industry_slug: 'education',
        title: 'Quick Deployment',
        description: 'Minimal disruption to the school year with fast installation and setup.',
        icon_name: 'Clock',
        sort_order: 0
      },
      {
        industry_slug: 'education', 
        title: 'Capacity Solutions',
        description: 'Handle enrollment growth or provide space during renovations.',
        icon_name: 'Users',
        sort_order: 1
      },
      {
        industry_slug: 'education',
        title: 'Cost Effective',
        description: 'More affordable than permanent construction with flexible terms.',
        icon_name: 'Building2',
        sort_order: 2
      },
      {
        industry_slug: 'education',
        title: 'Education Focused',
        description: 'Designed specifically for educational environments and requirements.',
        icon_name: 'GraduationCap',
        sort_order: 3
      }
    ]

    const caseStudies = [
      {
        industry_slug: 'education',
        title: 'Riverside Elementary Expansion',
        description: 'Quick classroom addition during peak enrollment period, providing seamless educational continuity.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
        results: ['6 additional classrooms deployed in 2 weeks', '150 additional students accommodated', 'Zero disruption to existing classes', 'Permanent feel with temporary flexibility'],
        sort_order: 0
      },
      {
        industry_slug: 'education',
        title: 'Central High School Renovation',
        description: 'Temporary facilities during major school renovation project, maintaining full educational services.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
        results: ['12 month renovation completed on schedule', 'All 800 students remained on campus', 'Full curriculum maintained', 'Modern facilities ready for return'],
        sort_order: 1
      },
      {
        industry_slug: 'education',
        title: 'University Research Lab',
        description: 'Specialized laboratory space for new research program, equipped with advanced utilities.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        results: ['Lab operational in 4 weeks', 'Full utility integration achieved', 'Research program launched on time', 'Flexibility for future expansion'],
        sort_order: 2
      }
    ]

    const statistics = [
      {
        industry_slug: 'education',
        label: 'Schools Served',
        value: '500+',
        description: 'Educational institutions across the country',
        sort_order: 0
      },
      {
        industry_slug: 'education',
        label: 'Students Accommodated',
        value: '50,000+',
        description: 'Students learning in our modular classrooms',
        sort_order: 1
      },
      {
        industry_slug: 'education', 
        label: 'Average Setup Time',
        value: '2 weeks',
        description: 'From delivery to ready for occupancy',
        sort_order: 2
      },
      {
        industry_slug: 'education',
        label: 'Client Satisfaction',
        value: '98%',
        description: 'Would recommend our services',
        sort_order: 3
      }
    ]

    // Try to insert data - if tables don't exist, we'll get errors but that's OK
    const results: any = {}

    try {
      const { data: industryResult, error: industryError } = await supabaseAdmin
        .from('industry_content')
        .upsert(educationData, { onConflict: 'slug' })
      
      results.industry = { success: !industryError, error: industryError?.message }
      if (industryError) console.log('Industry insert error:', industryError)
    } catch (err) {
      results.industry = { success: false, error: 'Table does not exist' }
    }

    try {
      // Delete existing solutions first
      await supabaseAdmin.from('industry_solutions').delete().eq('industry_slug', 'education')
      
      const { data: solutionsResult, error: solutionsError } = await supabaseAdmin
        .from('industry_solutions')
        .insert(solutions)
      
      results.solutions = { success: !solutionsError, error: solutionsError?.message }
      if (solutionsError) console.log('Solutions insert error:', solutionsError)
    } catch (err) {
      results.solutions = { success: false, error: 'Table does not exist' }
    }

    try {
      // Delete existing benefits first
      await supabaseAdmin.from('industry_benefits').delete().eq('industry_slug', 'education')
      
      const { data: benefitsResult, error: benefitsError } = await supabaseAdmin
        .from('industry_benefits')
        .insert(benefits)
      
      results.benefits = { success: !benefitsError, error: benefitsError?.message }
      if (benefitsError) console.log('Benefits insert error:', benefitsError)
    } catch (err) {
      results.benefits = { success: false, error: 'Table does not exist' }
    }

    try {
      // Delete existing case studies first
      await supabaseAdmin.from('industry_case_studies').delete().eq('industry_slug', 'education')
      
      const { data: caseStudiesResult, error: caseStudiesError } = await supabaseAdmin
        .from('industry_case_studies')
        .insert(caseStudies)
      
      results.caseStudies = { success: !caseStudiesError, error: caseStudiesError?.message }
      if (caseStudiesError) console.log('Case studies insert error:', caseStudiesError)
    } catch (err) {
      results.caseStudies = { success: false, error: 'Table does not exist' }
    }

    try {
      // Delete existing statistics first
      await supabaseAdmin.from('industry_statistics').delete().eq('industry_slug', 'education')
      
      const { data: statisticsResult, error: statisticsError } = await supabaseAdmin
        .from('industry_statistics')
        .insert(statistics)
      
      results.statistics = { success: !statisticsError, error: statisticsError?.message }
      if (statisticsError) console.log('Statistics insert error:', statisticsError)
    } catch (err) {
      results.statistics = { success: false, error: 'Table does not exist' }
    }

    return NextResponse.json({
      success: true,
      message: 'Demo data population completed',
      results,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Error in setup-and-populate-demo:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to setup demo data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
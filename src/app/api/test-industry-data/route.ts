import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug') || 'education'

    // Get main industry data
    const { data: industryData, error: industryError } = await supabaseAdmin
      .from('industry_content')
      .select('*')
      .eq('slug', slug)
      .single()

    console.log('Industry data query result:', { industryData, industryError })

    if (industryError) {
      return NextResponse.json({
        error: 'Failed to fetch industry data',
        details: industryError,
        slug
      }, { status: 500 })
    }

    // Get solutions
    const { data: solutions, error: solutionsError } = await supabaseAdmin
      .from('industry_solutions')
      .select('*')
      .eq('industry_slug', slug)
      .order('sort_order')

    // Get benefits
    const { data: benefits, error: benefitsError } = await supabaseAdmin
      .from('industry_benefits')
      .select('*')
      .eq('industry_slug', slug)
      .order('sort_order')

    // Get case studies
    const { data: caseStudies, error: caseStudiesError } = await supabaseAdmin
      .from('industry_case_studies')
      .select('*')
      .eq('industry_slug', slug)
      .order('sort_order')

    // Get statistics
    const { data: statistics, error: statisticsError } = await supabaseAdmin
      .from('industry_statistics')
      .select('*')
      .eq('industry_slug', slug)
      .order('sort_order')

    return NextResponse.json({
      success: true,
      data: {
        industry: industryData,
        solutions: solutions || [],
        benefits: benefits || [],
        caseStudies: caseStudies || [],
        statistics: statistics || []
      },
      errors: {
        industryError,
        solutionsError,
        benefitsError,
        caseStudiesError,
        statisticsError
      }
    })

  } catch (error) {
    console.error('Test industry data error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
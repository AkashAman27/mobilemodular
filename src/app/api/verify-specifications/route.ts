import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Verifying solution specifications...')

    // Get both office buildings and portable classrooms
    const { data: solutions, error } = await supabaseAdmin
      .from('solutions')
      .select('id, slug, name, specifications')
      .in('slug', ['office-buildings', 'portable-classrooms'])
      .order('slug')

    if (error) {
      console.error('❌ Error fetching solutions:', error)
      return NextResponse.json(
        { success: false, error: 'Failed to fetch solutions' },
        { status: 500 }
      )
    }

    const verification = solutions?.map(solution => ({
      id: solution.id,
      slug: solution.slug,
      name: solution.name,
      specificationCount: solution.specifications?.length || 0,
      specifications: solution.specifications?.map((spec: any) => ({
        title: spec.title,
        size: spec.size,
        capacity: spec.capacity,
        price: spec.price,
        hasImage: !!spec.image
      })) || []
    })) || []

    console.log('📊 Verification results:')
    verification.forEach(solution => {
      console.log(`  ${solution.name}: ${solution.specificationCount} specifications`)
    })

    return NextResponse.json({
      success: true,
      message: 'Specifications verification complete',
      data: verification,
      summary: {
        totalSolutions: verification.length,
        totalSpecifications: verification.reduce((sum, sol) => sum + sol.specificationCount, 0),
        solutionsWithMultipleSpecs: verification.filter(sol => sol.specificationCount > 1).length
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Error in verify-specifications:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to verify specifications',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
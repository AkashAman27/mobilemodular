import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Getting pages table structure...')

    // Get all pages
    const { data: allPages, error: allPagesError } = await supabaseAdmin
      .from('pages')
      .select('*')
      .order('title')

    if (allPagesError) {
      console.error('❌ Error getting pages:', allPagesError)
      return NextResponse.json({
        success: false,
        error: allPagesError.message
      })
    }

    console.log('✅ Found pages:', allPages?.length)

    return NextResponse.json({
      success: true,
      pages: allPages,
      structure: allPages?.[0] ? Object.keys(allPages[0]) : []
    })

  } catch (error) {
    console.error('💥 Server error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
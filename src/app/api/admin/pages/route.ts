import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Admin fetching pages...')

    // Get all pages for admin use
    const { data: pages, error } = await supabaseAdmin
      .from('pages')
      .select('*')
      .order('title')

    if (error) {
      console.error('❌ Error fetching pages:', error)
      return NextResponse.json(
        { error: 'Failed to fetch pages', details: error.message },
        { status: 500 }
      )
    }

    console.log('✅ Successfully fetched pages:', pages?.length)
    return NextResponse.json({ success: true, pages })

  } catch (error) {
    console.error('💥 Server error:', error)
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Admin fetching all FAQs...')

    // Get all active FAQs for admin use
    const { data: faqs, error } = await supabaseAdmin
      .from('faqs')
      .select('*')
      .eq('is_active', true)
      .order('category')
      .order('display_order')

    if (error) {
      console.error('❌ Error fetching FAQs:', error)
      return NextResponse.json(
        { error: 'Failed to fetch FAQs', details: error.message },
        { status: 500 }
      )
    }

    console.log('✅ Successfully fetched FAQs:', faqs?.length)
    return NextResponse.json({ success: true, faqs })

  } catch (error) {
    console.error('💥 Server error:', error)
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const pageId = searchParams.get('pageId')

    if (!pageId) {
      return NextResponse.json(
        { error: 'Page ID is required' },
        { status: 400 }
      )
    }

    console.log('🔍 Admin fetching page FAQs for page:', pageId)

    // Get page FAQs with FAQ details
    const { data: pageFaqs, error } = await supabaseAdmin
      .from('page_faqs')
      .select(`
        *,
        faq:faqs(*)
      `)
      .eq('page_id', pageId)
      .order('display_order')

    if (error) {
      console.error('❌ Error fetching page FAQs:', error)
      return NextResponse.json(
        { error: 'Failed to fetch page FAQs', details: error.message },
        { status: 500 }
      )
    }

    console.log('✅ Successfully fetched page FAQs:', pageFaqs?.length)
    return NextResponse.json({ success: true, pageFaqs })

  } catch (error) {
    console.error('💥 Server error:', error)
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
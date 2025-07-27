import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Testing pages table...')

    // Test if pages table exists and what structure it has
    const { data: pagesData, error: pagesError } = await supabaseAdmin
      .from('pages')
      .select('*')
      .limit(1)

    console.log('Pages table test:', { data: pagesData, error: pagesError })

    // Test if page_faqs table exists
    const { data: pageFaqsData, error: pageFaqsError } = await supabaseAdmin
      .from('page_faqs')
      .select('*')
      .limit(1)

    console.log('Page FAQs table test:', { data: pageFaqsData, error: pageFaqsError })

    // Test if faqs table exists
    const { data: faqsData, error: faqsError } = await supabaseAdmin
      .from('faqs')
      .select('*')
      .limit(1)

    console.log('FAQs table test:', { data: faqsData, error: faqsError })

    return NextResponse.json({
      success: true,
      tables: {
        pages: {
          exists: !pagesError,
          error: pagesError?.message,
          sampleData: pagesData
        },
        page_faqs: {
          exists: !pageFaqsError,
          error: pageFaqsError?.message,
          sampleData: pageFaqsData
        },
        faqs: {
          exists: !faqsError,
          error: faqsError?.message,
          sampleData: faqsData
        }
      }
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
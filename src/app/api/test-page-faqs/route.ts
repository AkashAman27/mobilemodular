import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Testing database connections...')

    // Test pages table
    const { data: pages, error: pagesError } = await supabase
      .from('pages')
      .select('*')
      .limit(5)

    if (pagesError) {
      console.error('Pages error:', pagesError)
      return NextResponse.json({
        success: false,
        error: 'Pages table error',
        details: pagesError
      }, { status: 500 })
    }

    // Test faqs table
    const { data: faqs, error: faqsError } = await supabase
      .from('faqs')
      .select('*')
      .limit(5)

    if (faqsError) {
      console.error('FAQs error:', faqsError)
      return NextResponse.json({
        success: false,
        error: 'FAQs table error',
        details: faqsError
      }, { status: 500 })
    }

    // Test page_faqs table
    const { data: pageFaqs, error: pageFaqsError } = await supabase
      .from('page_faqs')
      .select(`
        *,
        faq:faqs(*),
        page:pages(*)
      `)
      .limit(5)

    if (pageFaqsError) {
      console.error('Page FAQs error:', pageFaqsError)
      return NextResponse.json({
        success: false,
        error: 'Page FAQs table error',
        details: pageFaqsError
      }, { status: 500 })
    }

    // Test insert capability
    const testPageId = pages?.[0]?.id
    const testFaqId = faqs?.[0]?.id

    if (testPageId && testFaqId) {
      // Check if test assignment already exists
      const { data: existing } = await supabase
        .from('page_faqs')
        .select('id')
        .eq('page_id', testPageId)
        .eq('faq_id', testFaqId)
        .single()

      if (!existing) {
        const { data: testInsert, error: insertError } = await supabase
          .from('page_faqs')
          .insert({
            page_id: testPageId,
            faq_id: testFaqId,
            display_order: 999,
            is_featured: false
          })
          .select()

        if (insertError) {
          console.error('Insert error:', insertError)
          return NextResponse.json({
            success: false,
            error: 'Insert test failed',
            details: insertError
          }, { status: 500 })
        }

        // Clean up test insert
        if (testInsert && testInsert.length > 0) {
          await supabase
            .from('page_faqs')
            .delete()
            .eq('id', testInsert[0].id)
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: 'All database operations working correctly',
      data: {
        pagesCount: pages?.length || 0,
        faqsCount: faqs?.length || 0,
        pageFaqsCount: pageFaqs?.length || 0,
        samplePages: pages?.map(p => ({ id: p.id, slug: p.slug, title: p.title })),
        sampleFaqs: faqs?.map(f => ({ id: f.id, question: f.question.substring(0, 50) + '...' })),
        sampleAssignments: pageFaqs?.map(pf => ({ 
          id: pf.id, 
          pageTitle: pf.page?.title, 
          faqQuestion: pf.faq?.question?.substring(0, 50) + '...' 
        }))
      }
    })

  } catch (error) {
    console.error('Database test error:', error)
    return NextResponse.json({
      success: false,
      error: 'Database test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
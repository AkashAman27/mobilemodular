import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { pageSlug, faqId } = await request.json()
    
    console.log('🔧 Admin assigning FAQ to page:', { pageSlug, faqId })

    // Check if assignment already exists
    const { data: existing } = await supabaseAdmin
      .from('page_faqs')
      .select('*')
      .eq('page_slug', pageSlug)
      .eq('faq_id', faqId)
      .single()

    if (existing) {
      return NextResponse.json({
        success: false,
        error: 'FAQ is already assigned to this page'
      })
    }

    // Create the assignment using admin client
    const { data, error } = await supabaseAdmin
      .from('page_faqs')
      .insert({
        page_slug: pageSlug,
        faq_id: faqId,
        created_at: new Date().toISOString()
      })
      .select()

    if (error) {
      console.error('❌ Error assigning FAQ:', error)
      return NextResponse.json({
        success: false,
        error: error.message
      })
    }

    console.log('✅ Successfully assigned FAQ to page')
    return NextResponse.json({
      success: true,
      message: 'FAQ assigned to page successfully',
      data: data[0]
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

export async function DELETE(request: NextRequest) {
  try {
    const { pageSlug, faqId } = await request.json()
    
    console.log('🗑️ Admin removing FAQ from page:', { pageSlug, faqId })

    const { error } = await supabaseAdmin
      .from('page_faqs')
      .delete()
      .eq('page_slug', pageSlug)
      .eq('faq_id', faqId)

    if (error) {
      console.error('❌ Error removing FAQ:', error)
      return NextResponse.json({
        success: false,
        error: error.message
      })
    }

    console.log('✅ Successfully removed FAQ from page')
    return NextResponse.json({
      success: true,
      message: 'FAQ removed from page successfully'
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
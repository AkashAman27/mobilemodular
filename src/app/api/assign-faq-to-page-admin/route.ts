import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, requireServiceRoleKey } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    // Ensure we have proper admin privileges
    requireServiceRoleKey()
    
    const { pageSlug, faqId } = await request.json()
    
    console.log('🔧 Admin assigning FAQ to page:', { pageSlug, faqId })

    // First, get the page ID from the slug
    const { data: pageData, error: pageError } = await supabaseAdmin
      .from('pages')
      .select('id')
      .eq('slug', pageSlug)
      .single()

    if (pageError || !pageData) {
      console.error('❌ Error finding page:', pageError)
      return NextResponse.json({
        success: false,
        error: `Page not found for slug: ${pageSlug}`
      })
    }

    const pageId = pageData.id

    // Check if assignment already exists
    const { data: existing } = await supabaseAdmin
      .from('page_faqs')
      .select('*')
      .eq('page_id', pageId)
      .eq('faq_id', faqId)
      .single()

    if (existing) {
      return NextResponse.json({
        success: false,
        error: 'FAQ is already assigned to this page'
      })
    }

    // Get the next display order
    const { data: lastOrder } = await supabaseAdmin
      .from('page_faqs')
      .select('display_order')
      .eq('page_id', pageId)
      .order('display_order', { ascending: false })
      .limit(1)

    const nextOrder = (lastOrder && lastOrder.length > 0) ? (lastOrder[0].display_order + 1) : 1

    // Create the assignment using admin client with proper schema
    const { data, error } = await supabaseAdmin
      .from('page_faqs')
      .insert({
        page_id: pageId,
        faq_id: faqId,
        page_slug: pageSlug,
        display_order: nextOrder,
        is_featured: false
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
    // Ensure we have proper admin privileges
    requireServiceRoleKey()
    
    const { pageSlug, faqId } = await request.json()
    
    console.log('🗑️ Admin removing FAQ from page:', { pageSlug, faqId })

    // First, get the page ID from the slug
    const { data: pageData, error: pageError } = await supabaseAdmin
      .from('pages')
      .select('id')
      .eq('slug', pageSlug)
      .single()

    if (pageError || !pageData) {
      console.error('❌ Error finding page:', pageError)
      return NextResponse.json({
        success: false,
        error: `Page not found for slug: ${pageSlug}`
      })
    }

    const pageId = pageData.id

    const { error } = await supabaseAdmin
      .from('page_faqs')
      .delete()
      .eq('page_id', pageId)
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
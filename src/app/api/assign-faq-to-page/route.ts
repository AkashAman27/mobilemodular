import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { page_id, faq_id, display_order, is_featured } = await request.json()

    if (!page_id || !faq_id) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: page_id and faq_id'
      }, { status: 400 })
    }

    // Check if this FAQ is already assigned to this page
    const { data: existingAssignment } = await supabaseAdmin
      .from('page_faqs')
      .select('id')
      .eq('page_id', page_id)
      .eq('faq_id', faq_id)
      .single()

    if (existingAssignment) {
      return NextResponse.json({
        success: false,
        error: 'This FAQ is already assigned to this page'
      }, { status: 400 })
    }

    // Insert the new assignment
    const { data, error } = await supabaseAdmin
      .from('page_faqs')
      .insert({
        page_id,
        faq_id,
        display_order: display_order || 1,
        is_featured: is_featured || false
      })
      .select()

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      data: data[0],
      message: 'FAQ assigned to page successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({
        success: false,
        error: 'Missing page_faq ID'
      }, { status: 400 })
    }

    const { error } = await supabaseAdmin
      .from('page_faqs')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json({
        success: false,
        error: error.message
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'FAQ removed from page successfully'
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
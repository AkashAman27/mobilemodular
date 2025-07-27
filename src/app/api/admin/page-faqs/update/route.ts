import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function PATCH(request: NextRequest) {
  try {
    const updateData = await request.json()
    const { id, ...fieldsToUpdate } = updateData

    if (!id) {
      return NextResponse.json(
        { error: 'Page FAQ ID is required' },
        { status: 400 }
      )
    }

    console.log('🔧 Admin updating page FAQ:', { id, fieldsToUpdate })

    // Update the page FAQ
    const { data, error } = await supabaseAdmin
      .from('page_faqs')
      .update(fieldsToUpdate)
      .eq('id', id)
      .select()

    if (error) {
      console.error('❌ Error updating page FAQ:', error)
      return NextResponse.json(
        { error: 'Failed to update page FAQ', details: error.message },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      return NextResponse.json(
        { error: 'Page FAQ not found', id },
        { status: 404 }
      )
    }

    console.log('✅ Successfully updated page FAQ')
    return NextResponse.json({ 
      success: true, 
      message: 'Page FAQ updated successfully',
      data: data[0]
    })

  } catch (error) {
    console.error('💥 Server error:', error)
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
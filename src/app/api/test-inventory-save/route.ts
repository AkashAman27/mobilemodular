import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { itemId, updateData } = body
    
    console.log('Testing inventory save with data:', { itemId, updateData })

    // First, let's try to fetch the existing item
    const { data: existingItem, error: fetchError } = await supabase
      .from('inventory_items')
      .select('*')
      .eq('id', itemId)
      .single()

    console.log('Fetch result:', { existingItem, fetchError })

    if (fetchError) {
      return NextResponse.json({
        success: false,
        step: 'fetch',
        error: fetchError.message,
        details: fetchError
      })
    }

    // Now try to update
    const { data: updateResult, error: updateError } = await supabase
      .from('inventory_items')
      .update({
        ...updateData,
        updated_at: new Date().toISOString()
      })
      .eq('id', itemId)
      .select()

    console.log('Update result:', { updateResult, updateError })

    if (updateError) {
      return NextResponse.json({
        success: false,
        step: 'update',
        error: updateError.message,
        details: updateError,
        originalItem: existingItem
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Update successful',
      originalItem: existingItem,
      updatedItem: updateResult?.[0] || null
    })

  } catch (error) {
    console.error('Error in test save:', error)
    return NextResponse.json(
      { 
        error: 'Failed to test save',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
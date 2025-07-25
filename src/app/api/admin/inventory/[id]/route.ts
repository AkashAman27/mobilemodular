import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('🔍 Admin fetching inventory item:', params.id)

    const { data, error } = await supabaseAdmin
      .from('inventory_items')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('❌ Error fetching item:', error)
      return NextResponse.json(
        { error: 'Failed to fetch inventory item', details: error.message },
        { status: 500 }
      )
    }

    console.log('✅ Successfully fetched item:', data?.name)
    return NextResponse.json({ success: true, item: data })

  } catch (error) {
    console.error('💥 Server error:', error)
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('💾 Admin updating inventory item:', params.id)
    
    const updateData = await request.json()
    console.log('📝 Update data:', updateData)

    // Add timestamp
    updateData.updated_at = new Date().toISOString()

    const { data, error } = await supabaseAdmin
      .from('inventory_items')
      .update(updateData)
      .eq('id', params.id)
      .select()

    if (error) {
      console.error('❌ Error updating item:', error)
      return NextResponse.json(
        { error: 'Failed to update inventory item', details: error.message },
        { status: 500 }
      )
    }

    if (!data || data.length === 0) {
      console.warn('⚠️ No rows affected - item may not exist')
      return NextResponse.json(
        { error: 'Item not found or no changes made', itemId: params.id },
        { status: 404 }
      )
    }

    console.log('✅ Successfully updated item:', data[0].name)
    return NextResponse.json({ 
      success: true, 
      item: data[0],
      message: 'Inventory item updated successfully'
    })

  } catch (error) {
    console.error('💥 Server error:', error)
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
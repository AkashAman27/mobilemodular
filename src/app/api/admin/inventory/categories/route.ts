import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('🔍 Admin fetching inventory categories')

    const { data, error } = await supabaseAdmin
      .from('inventory_categories')
      .select('id, name, slug')
      .eq('is_active', true)
      .order('order_index')

    if (error) {
      console.error('❌ Error fetching categories:', error)
      return NextResponse.json(
        { error: 'Failed to fetch categories', details: error.message },
        { status: 500 }
      )
    }

    console.log('✅ Successfully fetched categories:', data?.length)
    return NextResponse.json({ success: true, categories: data || [] })

  } catch (error) {
    console.error('💥 Server error:', error)
    return NextResponse.json(
      { error: 'Server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('Fetching inventory items...')

    // Get all inventory items
    const { data: items, error: itemsError } = await supabase
      .from('inventory_items')
      .select('*')
      .limit(5)

    console.log('Items result:', { items, itemsError })

    // Get all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('inventory_categories')
      .select('*')

    console.log('Categories result:', { categories, categoriesError })

    return NextResponse.json({
      success: true,
      items: items || [],
      categories: categories || [],
      itemsError: itemsError?.message || null,
      categoriesError: categoriesError?.message || null
    })

  } catch (error) {
    console.error('Error fetching inventory data:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch inventory data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
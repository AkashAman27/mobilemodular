import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('Testing inventory list data...')

    // Test the main inventory items query (same as used in the list page)
    const { data: items, error: itemsError } = await supabase
      .from('inventory_items')
      .select(`
        id,
        name,
        model_number,
        width_feet,
        length_feet,
        square_feet,
        location_state,
        location_city,
        main_image_url,
        availability_status,
        rating,
        review_count,
        is_featured,
        is_active,
        created_at,
        category_id
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(10)

    console.log('Items query result:', { items, itemsError })

    // Test categories query
    const { data: categories, error: categoriesError } = await supabase
      .from('inventory_categories')
      .select('id, name, slug')
      .eq('is_active', true)
      .order('order_index')

    console.log('Categories query result:', { categories, categoriesError })

    return NextResponse.json({
      success: true,
      itemsCount: items?.length || 0,
      items: items?.slice(0, 3) || [], // Show first 3 items
      categoriesCount: categories?.length || 0,
      categories: categories || [],
      errors: {
        items: itemsError?.message || null,
        categories: categoriesError?.message || null
      },
      debug: {
        hasItems: !!items && items.length > 0,
        hasCategories: !!categories && categories.length > 0,
        firstItemId: items?.[0]?.id || null,
        recommendation: !items || items.length === 0 
          ? 'No items found - inventory list will appear empty'
          : 'Items found - check browser console for JavaScript errors'
      }
    })

  } catch (error) {
    console.error('Error testing inventory list:', error)
    return NextResponse.json(
      { 
        error: 'Failed to test inventory list',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
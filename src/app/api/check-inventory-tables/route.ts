import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    console.log('Checking inventory table availability...')

    // Try to query inventory_categories table
    const { data: categories, error: categoriesError } = await supabase
      .from('inventory_categories')
      .select('id, name, slug')
      .limit(1)

    console.log('Categories query result:', { categories, categoriesError })

    // Try to query inventory_items table
    const { data: items, error: itemsError } = await supabase
      .from('inventory_items')
      .select('id, name, model_number')
      .limit(1)

    console.log('Items query result:', { items, itemsError })

    // Check if we can create a simple test record
    let canWrite = false
    if (!categoriesError) {
      const testCategory = {
        name: 'Test Category',
        slug: 'test-category-' + Date.now(),
        description: 'Test category for checking write access'
      }

      const { data: writeTest, error: writeError } = await supabase
        .from('inventory_categories')
        .insert([testCategory])
        .select()

      if (!writeError && writeTest && writeTest.length > 0) {
        canWrite = true
        // Clean up test record
        await supabase
          .from('inventory_categories')
          .delete()
          .eq('id', writeTest[0].id)
      }

      console.log('Write test result:', { writeTest, writeError, canWrite })
    }

    return NextResponse.json({
      success: true,
      tables: {
        inventory_categories: {
          exists: !categoriesError,
          error: categoriesError?.message || null,
          recordCount: categories?.length || 0
        },
        inventory_items: {
          exists: !itemsError,
          error: itemsError?.message || null,
          recordCount: items?.length || 0
        }
      },
      canWrite,
      message: categoriesError && itemsError 
        ? 'Neither table exists - manual setup required'
        : 'At least one table exists'
    })

  } catch (error) {
    console.error('Error checking tables:', error)
    return NextResponse.json(
      { 
        error: 'Failed to check table availability',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
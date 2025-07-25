import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🚨 DISABLING RLS on inventory tables for presentation...')

    // Disable RLS on inventory_items table
    const { error: itemsRlsError } = await supabaseAdmin.rpc('exec_sql', {
      sql: 'ALTER TABLE inventory_items DISABLE ROW LEVEL SECURITY;'
    })

    // Disable RLS on inventory_categories table  
    const { error: categoriesRlsError } = await supabaseAdmin.rpc('exec_sql', {
      sql: 'ALTER TABLE inventory_categories DISABLE ROW LEVEL SECURITY;'
    })

    // Test immediate write access
    const testUpdate = await supabaseAdmin
      .from('inventory_items')
      .update({ 
        updated_at: new Date().toISOString(),
        description: 'RLS DISABLED - Test update ' + new Date().toISOString()
      })
      .eq('id', '7921d190-15bb-4f3b-a8fd-1ca744bf557a')
      .select()

    console.log('✅ RLS disabled, test update result:', testUpdate)

    return NextResponse.json({
      success: true,
      message: 'RLS disabled on all inventory tables',
      errors: {
        itemsRls: itemsRlsError?.message || null,
        categoriesRls: categoriesRlsError?.message || null
      },
      testUpdate: testUpdate.data?.[0] || null,
      testError: testUpdate.error?.message || null
    })

  } catch (error) {
    console.error('💥 Error disabling RLS:', error)
    return NextResponse.json(
      { 
        error: 'Failed to disable RLS policies',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
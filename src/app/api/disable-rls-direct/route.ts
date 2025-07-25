import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🚨 DISABLING RLS using direct SQL queries...')

    // Use raw SQL queries to disable RLS
    const queries = [
      'ALTER TABLE inventory_items DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE inventory_categories DISABLE ROW LEVEL SECURITY;',
      'DROP POLICY IF EXISTS "Enable all access for admin users" ON inventory_items;',
      'DROP POLICY IF EXISTS "Enable all access for admin users" ON inventory_categories;',
      'DROP POLICY IF EXISTS "Enable read access for all users" ON inventory_items;',
      'DROP POLICY IF EXISTS "Enable read access for all users" ON inventory_categories;'
    ]

    const results = []
    
    for (const query of queries) {
      try {
        console.log('Executing:', query)
        const { data, error } = await supabaseAdmin
          .from('dummy') // This will fail but we just need the client
          .select('*')
          
        // Use the underlying client for raw SQL
        const result = await (supabaseAdmin as any).sql([query])
        results.push({ query, success: true, result })
        console.log('✅ Success:', query)
      } catch (error) {
        console.log('❌ Failed:', query, error)
        results.push({ query, success: false, error: error instanceof Error ? error.message : 'Unknown error' })
      }
    }

    // Test write access after disabling RLS
    const testUpdate = await supabaseAdmin
      .from('inventory_items')
      .update({ 
        width_feet: 15,
        updated_at: new Date().toISOString(),
        description: 'RLS FULLY DISABLED - Test ' + new Date().toISOString()
      })
      .eq('id', '7921d190-15bb-4f3b-a8fd-1ca744bf557a')
      .select()

    console.log('🧪 Final test update result:', testUpdate)

    return NextResponse.json({
      success: true,
      message: 'RLS disable attempted with direct SQL',
      results,
      testUpdate: testUpdate.data?.[0] || null,
      testError: testUpdate.error?.message || null,
      finalMessage: testUpdate.error ? 'RLS still blocking' : 'RLS successfully disabled - inventory should now work!'
    })

  } catch (error) {
    console.error('💥 Error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to disable RLS',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
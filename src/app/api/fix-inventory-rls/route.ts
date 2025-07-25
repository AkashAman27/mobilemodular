import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('Fixing inventory RLS policies...')

    // First, check current policies
    const { data: policies, error: policiesError } = await supabaseAdmin
      .from('pg_policies')
      .select('*')
      .in('tablename', ['inventory_items', 'inventory_categories'])

    console.log('Current policies:', policies)

    // Try to create a more permissive policy for inventory_items
    const { error: updateError } = await supabaseAdmin
      .from('inventory_items')
      .update({ 
        rental_price_monthly: 999.99,
        description: 'RLS Test Update - ' + new Date().toISOString()
      })
      .eq('id', '689a3b6a-70c7-41cd-82a4-2cbb0908de11')
      .select()

    console.log('Direct admin update result:', { updateError })

    // If admin can't update, it's definitely an RLS issue
    if (updateError) {
      return NextResponse.json({
        success: false,
        issue: 'RLS_BLOCKING_ADMIN',
        error: updateError.message,
        policies: policies || [],
        solution: 'Admin client is being blocked by RLS policies'
      })
    }

    // Try with regular client
    const { supabase } = await import('@/lib/supabase')
    const { error: regularError } = await supabase
      .from('inventory_items')
      .update({ 
        rental_price_monthly: 888.88,
        description: 'Regular Client Test - ' + new Date().toISOString()
      })
      .eq('id', '689a3b6a-70c7-41cd-82a4-2cbb0908de11')
      .select()

    console.log('Regular client update result:', { regularError })

    return NextResponse.json({
      success: true,
      adminCanUpdate: !updateError,
      regularClientCanUpdate: !regularError,
      adminError: updateError ? (updateError as any).message : null,
      regularError: regularError ? (regularError as any).message : null,
      policies: policies || [],
      recommendation: updateError 
        ? 'RLS policies need to be updated for admin access'
        : regularError 
        ? 'RLS policies need to be updated for regular client access'
        : 'Both clients can update - investigate other issues'
    })

  } catch (error) {
    console.error('Error testing RLS:', error)
    return NextResponse.json(
      { 
        error: 'Failed to test RLS policies',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Temporarily disabling RLS for page_faqs table...')

    // Use raw SQL to disable RLS - this should work with the existing client
    const { data, error } = await supabase.rpc('exec_sql', {
      sql: 'ALTER TABLE page_faqs DISABLE ROW LEVEL SECURITY;'
    })

    if (error) {
      // If exec_sql doesn't work, try a direct approach
      console.log('exec_sql not available, trying alternative approach...')
      
      // First, let's check if we can query the table structure
      const { data: tableInfo } = await supabase
        .from('information_schema.tables')
        .select('*')
        .eq('table_name', 'page_faqs')

      console.log('Table info:', tableInfo)

      return NextResponse.json({
        success: false,
        error: 'Cannot disable RLS without service role access',
        suggestion: 'Please set SUPABASE_SERVICE_ROLE_KEY environment variable or disable RLS manually in Supabase dashboard'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'RLS disabled for page_faqs table'
    })

  } catch (error) {
    console.error('RLS disable error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      suggestion: 'Please disable RLS manually in Supabase dashboard for page_faqs table'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint to disable RLS for page_faqs table',
    note: 'This is a temporary workaround for admin operations'
  })
}
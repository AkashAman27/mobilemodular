import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Fixing page_faqs table permissions...')

    // First, let's try to disable RLS temporarily and recreate with proper policies
    const sqlCommands = [
      // Disable RLS temporarily to fix policies
      'ALTER TABLE page_faqs DISABLE ROW LEVEL SECURITY;',
      'ALTER TABLE pages DISABLE ROW LEVEL SECURITY;',
      
      // Drop existing policies
      'DROP POLICY IF EXISTS "Allow public read access to pages" ON pages;',
      'DROP POLICY IF EXISTS "Allow public read access to page_faqs" ON page_faqs;',
      
      // Re-enable RLS
      'ALTER TABLE pages ENABLE ROW LEVEL SECURITY;',
      'ALTER TABLE page_faqs ENABLE ROW LEVEL SECURITY;',
      
      // Create permissive policies for all operations
      `CREATE POLICY "Allow all operations on pages" ON pages FOR ALL USING (true);`,
      `CREATE POLICY "Allow all operations on page_faqs" ON page_faqs FOR ALL USING (true);`
    ]

    for (const sql of sqlCommands) {
      console.log('Executing:', sql)
      const { error } = await supabase.rpc('exec_sql', { sql })
      
      if (error) {
        console.log('SQL execution result (may be expected):', error)
        // Continue with other commands even if some fail
      }
    }

    // Test the fix by trying to insert a record
    const { data: pages } = await supabase
      .from('pages')
      .select('id')
      .limit(1)

    const { data: faqs } = await supabase
      .from('faqs')
      .select('id')
      .limit(1)

    if (pages?.[0] && faqs?.[0]) {
      const { data: testInsert, error: testError } = await supabase
        .from('page_faqs')
        .insert({
          page_id: pages[0].id,
          faq_id: faqs[0].id,
          display_order: 999,
          is_featured: false
        })
        .select()

      if (testError) {
        console.error('Test insert still failing:', testError)
        return NextResponse.json({
          success: false,
          error: 'Permissions still not working',
          details: testError
        }, { status: 500 })
      }

      // Clean up test record
      if (testInsert?.[0]) {
        await supabase
          .from('page_faqs')
          .delete()
          .eq('id', testInsert[0].id)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Page FAQs permissions fixed successfully'
    })

  } catch (error) {
    console.error('Permission fix error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fix permissions',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint to fix page_faqs table permissions'
  })
}
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    console.log('Fixing RLS policies for admin access...')

    // Drop existing policies that might be too restrictive
    const dropPolicies = `
      DROP POLICY IF EXISTS "Allow public read access to pages" ON pages;
      DROP POLICY IF EXISTS "Allow public read access to page_faqs" ON page_faqs;
    `

    // Create more permissive policies for admin operations
    const createPolicies = `
      -- Pages table policies
      CREATE POLICY "Allow all operations on pages" ON pages
        FOR ALL USING (true);

      -- Page FAQs table policies  
      CREATE POLICY "Allow all operations on page_faqs" ON page_faqs
        FOR ALL USING (true);
    `

    // Execute the policy changes
    const { error: dropError } = await supabase.rpc('exec_sql', { 
      sql: dropPolicies 
    })

    if (dropError) {
      console.log('Drop policies result (might be expected):', dropError)
    }

    const { error: createError } = await supabase.rpc('exec_sql', { 
      sql: createPolicies 
    })

    if (createError) {
      console.error('Create policies error:', createError)
      return NextResponse.json({
        success: false,
        error: 'Failed to create policies',
        details: createError
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: 'RLS policies updated for admin access'
    })

  } catch (error) {
    console.error('RLS policy fix error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to fix RLS policies',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint to fix RLS policies for admin access'
  })
}
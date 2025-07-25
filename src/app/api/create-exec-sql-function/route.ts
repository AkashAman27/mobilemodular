import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🛠️ Creating exec_sql function...')

    // Create the exec_sql function if it doesn't exist
    const createFunctionSQL = `
      CREATE OR REPLACE FUNCTION exec_sql(sql text)
      RETURNS text
      LANGUAGE plpgsql
      SECURITY DEFINER
      AS $$
      BEGIN
        EXECUTE sql;
        RETURN 'SUCCESS';
      EXCEPTION
        WHEN OTHERS THEN
          RAISE EXCEPTION 'Error executing SQL: %', SQLERRM;
      END;
      $$;
    `

    // Use raw SQL execution through Supabase
    const { data, error } = await supabaseAdmin.rpc('exec_sql', { sql: createFunctionSQL })
    
    if (error) {
      // If exec_sql doesn't exist, try creating it directly
      console.log('exec_sql function does not exist, creating it...')
      
      // We need to use a different approach - try direct SQL execution
      const result = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
          'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY || ''
        },
        body: JSON.stringify({ sql: createFunctionSQL })
      })

      if (!result.ok) {
        throw new Error('Could not create exec_sql function')
      }
    }

    return NextResponse.json({
      success: true,
      message: 'exec_sql function created successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Error creating exec_sql function:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to create exec_sql function',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Create states table
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
        -- Create states table
        CREATE TABLE IF NOT EXISTS states (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          slug VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          abbreviation VARCHAR(2) UNIQUE NOT NULL,
          location_count INTEGER DEFAULT 0,
          primary_phone VARCHAR(20),
          primary_city VARCHAR(255),
          coverage_description TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );

        -- Create indexes
        CREATE INDEX IF NOT EXISTS idx_states_slug ON states(slug);
        CREATE INDEX IF NOT EXISTS idx_states_abbreviation ON states(abbreviation);

        -- Enable RLS
        ALTER TABLE states ENABLE ROW LEVEL SECURITY;

        -- Create policy for public read access
        CREATE POLICY IF NOT EXISTS "Public can read states" ON states FOR SELECT USING (true);
      `
    })

    if (createError) {
      console.error('Error creating states table:', createError)
      
      // If RPC doesn't work, try direct SQL
      const { error: directError } = await supabase
        .from('states')
        .select('id')
        .limit(1)

      if (directError && directError.message.includes('does not exist')) {
        return NextResponse.json({ 
          success: false, 
          error: 'States table needs to be created in database. Please run the database schema setup.',
          details: createError?.message || 'Table creation failed'
        }, { status: 500 })
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: 'States table setup completed'
    })
    
  } catch (error) {
    console.error('Error in setup-states-table API:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    console.log('🔧 Creating pages table and fixing FAQ system...')

    // Create pages table with proper structure
    const createPagesTable = `
      -- Create pages table for FAQ management
      CREATE TABLE IF NOT EXISTS pages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        description TEXT,
        page_type TEXT DEFAULT 'general',
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      );
    `

    const { error: createError } = await supabaseAdmin.rpc('exec_sql', { 
      sql: createPagesTable 
    })

    if (createError) {
      console.error('❌ Error creating pages table:', createError)
      // Try direct SQL execution
      const { error: directError } = await supabaseAdmin
        .from('_sql_execute')
        .insert({ query: createPagesTable })
      
      if (directError) {
        console.log('Will try alternative approach...')
      }
    }

    // Enable RLS and create policies
    const enableRLS = `
      ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
      
      DROP POLICY IF EXISTS "Allow public read access to pages" ON pages;
      DROP POLICY IF EXISTS "Allow admin full access to pages" ON pages;
      
      CREATE POLICY "Allow public read access to pages" ON pages
        FOR SELECT USING (is_active = true);
      
      CREATE POLICY "Allow admin full access to pages" ON pages
        FOR ALL USING (true);
    `

    const { error: rlsError } = await supabaseAdmin.rpc('exec_sql', { 
      sql: enableRLS 
    })

    if (rlsError) {
      console.log('RLS setup may need manual configuration')
    }

    // Insert default pages - let's try using standard insert
    const defaultPages = [
      { slug: 'home', title: 'Homepage', description: 'Main homepage of the website', page_type: 'homepage' },
      { slug: 'solutions', title: 'Solutions', description: 'Solutions overview page', page_type: 'solutions' },
      { slug: 'portable-offices', title: 'Portable Offices', description: 'Portable office solutions page', page_type: 'solution' },
      { slug: 'portable-classrooms', title: 'Portable Classrooms', description: 'Portable classroom solutions page', page_type: 'solution' },
      { slug: 'construction-offices', title: 'Construction Offices', description: 'Construction office solutions page', page_type: 'solution' },
      { slug: 'portable-restrooms', title: 'Portable Restrooms', description: 'Portable restroom solutions page', page_type: 'solution' },
      { slug: 'storage-containers', title: 'Storage Containers', description: 'Storage container solutions page', page_type: 'solution' },
      { slug: 'industries', title: 'Industries', description: 'Industries overview page', page_type: 'industries' },
      { slug: 'healthcare-facilities', title: 'Healthcare Facilities', description: 'Healthcare industry page', page_type: 'industry' },
      { slug: 'education', title: 'Education', description: 'Education industry page', page_type: 'industry' },
      { slug: 'construction', title: 'Construction', description: 'Construction industry page', page_type: 'industry' },
      { slug: 'government', title: 'Government', description: 'Government industry page', page_type: 'industry' },
      { slug: 'locations', title: 'Locations', description: 'Locations overview page', page_type: 'locations' },
      { slug: 'about', title: 'About Us', description: 'About us page', page_type: 'company' },
      { slug: 'contact', title: 'Contact', description: 'Contact page', page_type: 'contact' },
      { slug: 'resources', title: 'Resources', description: 'Resources page', page_type: 'resources' },
      { slug: 'live-inventory', title: 'Live Inventory', description: 'Live inventory page', page_type: 'resources' },
      { slug: 'quote', title: 'Get a Quote', description: 'Quote request page', page_type: 'quote' }
    ]

    // Try to insert pages with upsert to avoid conflicts
    const { data: insertData, error: insertError } = await supabaseAdmin
      .from('pages')
      .upsert(defaultPages, { onConflict: 'slug' })
      .select()

    if (insertError) {
      console.error('❌ Error inserting pages:', insertError)
      return NextResponse.json({
        success: false,
        error: 'Failed to create default pages',
        details: insertError.message
      })
    }

    console.log('✅ Successfully created pages table and default pages')
    
    return NextResponse.json({
      success: true,
      message: 'Pages table created successfully',
      pagesCreated: insertData?.length || 0,
      pages: insertData
    })

  } catch (error) {
    console.error('💥 Server error:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
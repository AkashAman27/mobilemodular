import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🏭 Setting up comprehensive industry content tables...')

    // Drop existing tables if they exist to recreate with new structure
    const dropTables = [
      'DROP TABLE IF EXISTS industry_solutions CASCADE;',
      'DROP TABLE IF EXISTS industry_benefits CASCADE;', 
      'DROP TABLE IF EXISTS industry_case_studies CASCADE;',
      'DROP TABLE IF EXISTS industry_statistics CASCADE;',
      'DROP TABLE IF EXISTS industry_content CASCADE;'
    ]

    for (const dropQuery of dropTables) {
      await supabaseAdmin.rpc('exec_sql', { query: dropQuery })
    }

    // Create industry_content table (main industry data)
    const industryContentTable = `
      CREATE TABLE industry_content (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        subtitle TEXT,
        description TEXT NOT NULL,
        image_url TEXT,
        case_studies_count INTEGER DEFAULT 0,
        meta_title TEXT,
        meta_description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    // Create industry_solutions table
    const solutionsTable = `
      CREATE TABLE industry_solutions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        industry_slug TEXT NOT NULL REFERENCES industry_content(slug) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon_name TEXT,
        image_url TEXT,
        features JSONB DEFAULT '[]'::jsonb,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    // Create industry_benefits table
    const benefitsTable = `
      CREATE TABLE industry_benefits (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        industry_slug TEXT NOT NULL REFERENCES industry_content(slug) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon_name TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    // Create industry_case_studies table  
    const caseStudiesTable = `
      CREATE TABLE industry_case_studies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        industry_slug TEXT NOT NULL REFERENCES industry_content(slug) ON DELETE CASCADE,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT,
        results JSONB DEFAULT '[]'::jsonb,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    // Create industry_statistics table
    const statisticsTable = `
      CREATE TABLE industry_statistics (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        industry_slug TEXT NOT NULL REFERENCES industry_content(slug) ON DELETE CASCADE,
        label TEXT NOT NULL,
        value TEXT NOT NULL,
        description TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    const tables = [
      { name: 'industry_content', query: industryContentTable },
      { name: 'industry_solutions', query: solutionsTable },
      { name: 'industry_benefits', query: benefitsTable },
      { name: 'industry_case_studies', query: caseStudiesTable },
      { name: 'industry_statistics', query: statisticsTable }
    ]

    // Create tables
    for (const table of tables) {
      try {
        await supabaseAdmin.rpc('exec_sql', { query: table.query })
        console.log(`✅ Created table: ${table.name}`)
      } catch (error) {
        console.error(`❌ Error creating ${table.name}:`, error)
      }
    }

    // Create indexes for better performance
    const indexes = [
      'CREATE INDEX idx_industry_solutions_slug ON industry_solutions(industry_slug);',
      'CREATE INDEX idx_industry_benefits_slug ON industry_benefits(industry_slug);',
      'CREATE INDEX idx_industry_case_studies_slug ON industry_case_studies(industry_slug);',
      'CREATE INDEX idx_industry_statistics_slug ON industry_statistics(industry_slug);',
      'CREATE INDEX idx_solutions_sort ON industry_solutions(sort_order);',
      'CREATE INDEX idx_benefits_sort ON industry_benefits(sort_order);',
      'CREATE INDEX idx_case_studies_sort ON industry_case_studies(sort_order);',
      'CREATE INDEX idx_statistics_sort ON industry_statistics(sort_order);'
    ]

    for (const indexQuery of indexes) {
      try {
        await supabaseAdmin.rpc('exec_sql', { query: indexQuery })
        console.log('✅ Created index')
      } catch (error) {
        console.error('❌ Error creating index:', error)
      }
    }

    // Enable RLS and create policies
    const rlsPolicies = [
      'ALTER TABLE industry_content ENABLE ROW LEVEL SECURITY;',
      'ALTER TABLE industry_solutions ENABLE ROW LEVEL SECURITY;',
      'ALTER TABLE industry_benefits ENABLE ROW LEVEL SECURITY;',
      'ALTER TABLE industry_case_studies ENABLE ROW LEVEL SECURITY;',
      'ALTER TABLE industry_statistics ENABLE ROW LEVEL SECURITY;',
      
      // Allow public read access
      'CREATE POLICY "Public read access" ON industry_content FOR SELECT USING (true);',
      'CREATE POLICY "Public read access" ON industry_solutions FOR SELECT USING (true);',
      'CREATE POLICY "Public read access" ON industry_benefits FOR SELECT USING (true);',
      'CREATE POLICY "Public read access" ON industry_case_studies FOR SELECT USING (true);',
      'CREATE POLICY "Public read access" ON industry_statistics FOR SELECT USING (true);',
      
      // Allow service role full access
      'CREATE POLICY "Service role full access" ON industry_content FOR ALL USING (auth.role() = \'service_role\');',
      'CREATE POLICY "Service role full access" ON industry_solutions FOR ALL USING (auth.role() = \'service_role\');',
      'CREATE POLICY "Service role full access" ON industry_benefits FOR ALL USING (auth.role() = \'service_role\');',
      'CREATE POLICY "Service role full access" ON industry_case_studies FOR ALL USING (auth.role() = \'service_role\');',
      'CREATE POLICY "Service role full access" ON industry_statistics FOR ALL USING (auth.role() = \'service_role\');'
    ]

    for (const policy of rlsPolicies) {
      try {
        await supabaseAdmin.rpc('exec_sql', { query: policy })
        console.log('✅ Applied RLS policy')
      } catch (error) {
        console.error('❌ Error applying RLS policy:', error)
      }
    }

    console.log('🎉 Industry content tables setup complete!')

    return NextResponse.json({
      success: true,
      message: 'Industry content tables created successfully',
      tables: tables.map(t => t.name),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Error in setup-industry-content-tables:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to setup industry content tables',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
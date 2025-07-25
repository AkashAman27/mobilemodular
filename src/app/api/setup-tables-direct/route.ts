import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🏭 Setting up industry tables directly...')

    // Drop existing tables first
    try {
      await supabaseAdmin.from('industry_solutions').delete().neq('id', 'dummy')
      await supabaseAdmin.from('industry_benefits').delete().neq('id', 'dummy') 
      await supabaseAdmin.from('industry_case_studies').delete().neq('id', 'dummy')
      await supabaseAdmin.from('industry_statistics').delete().neq('id', 'dummy')
      await supabaseAdmin.from('industry_content').delete().neq('id', 'dummy')
    } catch (err) {
      console.log('Tables do not exist yet, proceeding with creation...')
    }

    // Let's try a different approach - using Supabase client library to create tables
    // First, let's create the tables using raw SQL via the REST API
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

    const executeSQL = async (sql: string) => {
      const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${serviceKey}`,
          'apikey': serviceKey
        },
        body: JSON.stringify({ sql })
      })
      
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`SQL execution failed: ${response.status} - ${errorText}`)
      }
      
      return response.json()
    }

    // Create tables with SQL
    const createTablesSQL = `
      -- Drop existing tables
      DROP TABLE IF EXISTS industry_solutions CASCADE;
      DROP TABLE IF EXISTS industry_benefits CASCADE;
      DROP TABLE IF EXISTS industry_case_studies CASCADE;
      DROP TABLE IF EXISTS industry_statistics CASCADE;
      DROP TABLE IF EXISTS industry_content CASCADE;

      -- Create industry_content table
      CREATE TABLE industry_content (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        slug TEXT UNIQUE NOT NULL,
        name TEXT NOT NULL,
        subtitle TEXT DEFAULT 'Industry Solutions',
        description TEXT NOT NULL,
        image_url TEXT,
        case_studies_count INTEGER DEFAULT 0,
        meta_title TEXT,
        meta_description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create industry_solutions table
      CREATE TABLE industry_solutions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        industry_slug TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon_name TEXT DEFAULT 'Building2',
        image_url TEXT,
        features TEXT[] DEFAULT '{}',
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create industry_benefits table
      CREATE TABLE industry_benefits (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        industry_slug TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        icon_name TEXT DEFAULT 'CheckCircle',
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create industry_case_studies table
      CREATE TABLE industry_case_studies (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        industry_slug TEXT NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT,
        results TEXT[] DEFAULT '{}',
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Create industry_statistics table
      CREATE TABLE industry_statistics (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        industry_slug TEXT NOT NULL,
        label TEXT NOT NULL,
        value TEXT NOT NULL,
        description TEXT,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      -- Enable RLS
      ALTER TABLE industry_content ENABLE ROW LEVEL SECURITY;
      ALTER TABLE industry_solutions ENABLE ROW LEVEL SECURITY;
      ALTER TABLE industry_benefits ENABLE ROW LEVEL SECURITY;
      ALTER TABLE industry_case_studies ENABLE ROW LEVEL SECURITY;
      ALTER TABLE industry_statistics ENABLE ROW LEVEL SECURITY;

      -- Create policies for public read access
      CREATE POLICY "Public read access" ON industry_content FOR SELECT USING (true);
      CREATE POLICY "Public read access" ON industry_solutions FOR SELECT USING (true);
      CREATE POLICY "Public read access" ON industry_benefits FOR SELECT USING (true);
      CREATE POLICY "Public read access" ON industry_case_studies FOR SELECT USING (true);
      CREATE POLICY "Public read access" ON industry_statistics FOR SELECT USING (true);

      -- Create policies for authenticated users (full access)
      CREATE POLICY "Authenticated full access" ON industry_content FOR ALL USING (auth.role() = 'authenticated');
      CREATE POLICY "Authenticated full access" ON industry_solutions FOR ALL USING (auth.role() = 'authenticated');
      CREATE POLICY "Authenticated full access" ON industry_benefits FOR ALL USING (auth.role() = 'authenticated');
      CREATE POLICY "Authenticated full access" ON industry_case_studies FOR ALL USING (auth.role() = 'authenticated');
      CREATE POLICY "Authenticated full access" ON industry_statistics FOR ALL USING (auth.role() = 'authenticated');

      -- Create policies for service role (full access)
      CREATE POLICY "Service role full access" ON industry_content FOR ALL USING (true);
      CREATE POLICY "Service role full access" ON industry_solutions FOR ALL USING (true);
      CREATE POLICY "Service role full access" ON industry_benefits FOR ALL USING (true);
      CREATE POLICY "Service role full access" ON industry_case_studies FOR ALL USING (true);
      CREATE POLICY "Service role full access" ON industry_statistics FOR ALL USING (true);
    `

    try {
      await executeSQL(createTablesSQL)
      console.log('✅ Tables created successfully')
    } catch (error) {
      console.error('❌ Error creating tables via SQL:', error)
      throw error
    }

    return NextResponse.json({
      success: true,
      message: 'Industry content tables created successfully',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Error in setup-tables-direct:', error)
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
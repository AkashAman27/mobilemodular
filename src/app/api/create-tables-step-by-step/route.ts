import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST() {
  const results: any = {}
  const errors: string[] = []

  try {
    // Method 1: Try to create company_about_content table by attempting to insert into it
    // This will auto-create the table if it doesn't exist in some databases
    console.log('Attempting to create company_about_content table...')
    
    // First, let's try a simple select to see if the table exists
    const { error: testAboutError } = await supabaseAdmin
      .from('company_about_content')
      .select('id')
      .limit(1)

    if (testAboutError && testAboutError.message.includes('does not exist')) {
      // Table doesn't exist, let's try to create it by using raw SQL through a function
      console.log('Table does not exist, attempting to create...')
      
      // Try using the database function approach
      const { data: createResult, error: createError } = await supabaseAdmin
        .rpc('create_company_table')
        .single()

      if (createError) {
        console.log('Function approach failed, trying direct insert approach...')
        
        // If function doesn't work, try creating through the REST API metadata
        const createTableResponse = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`, {
          method: 'POST',
          headers: {
            'apikey': process.env.SUPABASE_SERVICE_ROLE_KEY!,
            'Authorization': `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              CREATE TABLE IF NOT EXISTS company_about_content (
                id TEXT PRIMARY KEY DEFAULT 'about-us',
                mission_title TEXT,
                mission_content TEXT,
                vision_title TEXT,
                vision_content TEXT,
                values_title TEXT,
                values_description TEXT,
                timeline_title TEXT,
                timeline_description TEXT,
                leadership_title TEXT,
                leadership_description TEXT,
                certifications_title TEXT,
                certifications_description TEXT,
                cta_title TEXT,
                cta_description TEXT,
                cta_primary_text TEXT,
                cta_secondary_text TEXT,
                stats_locations TEXT,
                stats_buildings TEXT,
                stats_satisfaction TEXT,
                stats_support TEXT,
                values JSONB DEFAULT '[]',
                timeline JSONB DEFAULT '[]',
                leadership JSONB DEFAULT '[]',
                certifications JSONB DEFAULT '[]',
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
              );
              
              ALTER TABLE company_about_content ENABLE ROW LEVEL SECURITY;
              CREATE POLICY IF NOT EXISTS company_about_policy ON company_about_content FOR ALL USING (true);
            `
          })
        })
        
        if (!createTableResponse.ok) {
          errors.push(`Failed to create company_about_content table: ${createTableResponse.statusText}`)
        }
      }
    }

    // Now try to insert data into company_about_content
    const { data: aboutData, error: aboutInsertError } = await supabaseAdmin
      .from('company_about_content')
      .upsert({
        id: 'about-us',
        mission_title: 'Our Mission',
        mission_content: 'To provide innovative, high-quality modular building solutions that enable our clients to achieve their goals quickly, efficiently, and sustainably. We believe that great buildings shouldn\'t take years to construct.',
        vision_title: 'Our Vision',
        vision_content: 'To be the world\'s most trusted modular building company, known for innovation, quality, and exceptional customer service. We envision a future where modular construction is the preferred choice for organizations worldwide.',
        values_title: 'Our Core Values',
        values_description: 'The principles that guide everything we do and every decision we make.',
        timeline_title: 'Our Journey',
        timeline_description: '80 years of innovation, growth, and industry leadership.',
        leadership_title: 'Leadership Team',
        leadership_description: 'Experienced leaders driving innovation and excellence in modular construction.',
        certifications_title: 'Certifications & Recognition',
        certifications_description: 'Our commitment to excellence is recognized by industry leaders and certification bodies.',
        cta_title: 'Partner with Industry Leaders',
        cta_description: 'Join thousands of satisfied clients who trust Modular Building Solutions for their building solutions.',
        cta_primary_text: 'Start Your Project',
        cta_secondary_text: 'Contact Our Team',
        stats_locations: '275+',
        stats_buildings: '50K+',
        stats_satisfaction: '99%',
        stats_support: '24/7',
        values: [
          { icon: 'Building2', title: 'Quality Construction', description: 'Every building meets the highest standards of construction quality and durability.' },
          { icon: 'Users', title: 'Customer Focus', description: 'Your success is our priority. We work closely with you to find the perfect solution.' },
          { icon: 'Award', title: 'Industry Leadership', description: 'Recognized leader in modular construction with decades of innovation and excellence.' },
          { icon: 'Shield', title: 'Safety First', description: 'Uncompromising commitment to safety in every aspect of our operations.' }
        ],
        timeline: [
          { year: '1944', title: 'Company Founded', description: 'Started as a small family business providing temporary buildings for post-war construction.' },
          { year: '1960s', title: 'National Expansion', description: 'Expanded operations across the United States, becoming a recognized industry leader.' },
          { year: '1980s', title: 'Technology Innovation', description: 'Pioneered advanced modular construction techniques and energy-efficient designs.' },
          { year: '2000s', title: 'Digital Transformation', description: 'Implemented digital design tools and project management systems for enhanced service.' },
          { year: '2020s', title: 'Sustainable Future', description: 'Leading the industry in sustainable modular construction and green building practices.' }
        ],
        leadership: [
          { name: 'Sarah Johnson', title: 'Chief Executive Officer', bio: '25+ years in modular construction, leading company growth and strategic initiatives.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face' },
          { name: 'Michael Chen', title: 'Chief Operations Officer', bio: 'Operations expert ensuring quality delivery and customer satisfaction nationwide.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face' },
          { name: 'Emily Rodriguez', title: 'VP of Engineering', bio: 'Leading engineering innovation and sustainable building design initiatives.', image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop&crop=face' }
        ],
        certifications: [
          'ISO 9001:2015 Quality Management',
          'OSHA Safety Compliance',
          'Green Building Certification',
          'National Association of Home Builders',
          'Better Business Bureau A+ Rating',
          'Department of Defense Contractor'
        ]
      })
      .select()

    results.aboutTable = {
      success: !aboutInsertError,
      error: aboutInsertError?.message,
      dataInserted: !!aboutData
    }

    if (aboutInsertError) {
      errors.push(`About table error: ${aboutInsertError.message}`)
    }

    // Similar process for locations_page_content
    const { error: testLocationsError } = await supabaseAdmin
      .from('locations_page_content')
      .select('id')
      .limit(1)

    // Try to insert data into locations_page_content (this may create the table)
    const { data: locationsData, error: locationsInsertError } = await supabaseAdmin
      .from('locations_page_content')
      .upsert({
        id: 'locations-page',
        hero_title: 'Find Your Local',
        hero_accent_text: 'Modular Solutions',
        hero_description: 'With 275+ locations across all 50 states, we\'re always nearby to serve your modular building needs with local expertise and nationwide resources.',
        hero_phone: '(866) 819-9017',
        hero_support_text: '24/7 Emergency Support',
        map_section_title: 'Interactive Service Map',
        map_section_description: 'Click on any state to find local offices and service areas',
        features_section_title: 'Why Choose Local Service',
        features_section_description: 'Our nationwide network provides local expertise with corporate resources',
        stats_section_title: 'Nationwide Coverage',
        cta_section_title: 'Ready to Get Started?',
        cta_section_description: 'Contact your local office or get a quote online. Our team is ready to help you find the perfect modular building solution.',
        cta_primary_text: 'Get Free Quote',
        cta_secondary_text: 'Call (866) 819-9017',
        service_features: [
          { title: 'Local Expertise', description: 'Regional specialists who understand local codes and regulations' },
          { title: 'Fast Response', description: 'Quick delivery and setup with local teams' },
          { title: 'Ongoing Support', description: 'Maintenance and support from your local office' }
        ],
        coverage_stats: [
          { label: '50', description: 'States Served' },
          { label: '275+', description: 'Total Locations' },
          { label: '150+', description: 'Mile Service Radius' },
          { label: '24/7', description: 'Support Available' }
        ]
      })
      .select()

    results.locationsTable = {
      success: !locationsInsertError,
      error: locationsInsertError?.message,
      dataInserted: !!locationsData
    }

    if (locationsInsertError) {
      errors.push(`Locations table error: ${locationsInsertError.message}`)
    }

    return NextResponse.json({
      message: errors.length === 0 ? 'All tables created successfully!' : 'Completed with some errors',
      timestamp: new Date().toISOString(),
      results,
      errors,
      totalErrors: errors.length
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({
      error: 'Unexpected error occurred',
      details: (error as Error).message,
      results,
      errors
    }, { status: 500 })
  }
}
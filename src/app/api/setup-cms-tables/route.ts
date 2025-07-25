import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST() {
  try {
    // Create company_about_content table using raw SQL
    const { error: aboutError } = await supabaseAdmin.rpc('exec', {
      sql: `
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
        
        -- Enable RLS
        ALTER TABLE company_about_content ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for authenticated users
        CREATE POLICY IF NOT EXISTS "Allow all for authenticated users" ON company_about_content
          FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
      `
    })

    if (aboutError) {
      console.error('Error creating company_about_content table:', aboutError)
    }

    // Update site_settings table to include additional contact fields
    const { error: settingsError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        ALTER TABLE site_settings 
        ADD COLUMN IF NOT EXISTS emergency_phone TEXT,
        ADD COLUMN IF NOT EXISTS quotes_email TEXT,
        ADD COLUMN IF NOT EXISTS phone_description TEXT,
        ADD COLUMN IF NOT EXISTS email_description TEXT,
        ADD COLUMN IF NOT EXISTS chat_availability TEXT,
        ADD COLUMN IF NOT EXISTS chat_response_time TEXT,
        ADD COLUMN IF NOT EXISTS chat_description TEXT,
        ADD COLUMN IF NOT EXISTS locations_count TEXT,
        ADD COLUMN IF NOT EXISTS coverage_area TEXT,
        ADD COLUMN IF NOT EXISTS locations_description TEXT;
      `
    })

    if (settingsError) {
      console.error('Error updating site_settings table:', settingsError)
    }

    // Create locations_page_content table
    const { error: locationsError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS locations_page_content (
          id TEXT PRIMARY KEY DEFAULT 'locations-page',
          hero_title TEXT,
          hero_accent_text TEXT,
          hero_description TEXT,
          hero_phone TEXT,
          hero_support_text TEXT,
          map_section_title TEXT,
          map_section_description TEXT,
          features_section_title TEXT,
          features_section_description TEXT,
          service_features JSONB DEFAULT '[]',
          stats_section_title TEXT,
          coverage_stats JSONB DEFAULT '[]',
          cta_section_title TEXT,
          cta_section_description TEXT,
          cta_primary_text TEXT,
          cta_secondary_text TEXT,
          created_at TIMESTAMPTZ DEFAULT NOW(),
          updated_at TIMESTAMPTZ DEFAULT NOW()
        );
        
        -- Enable RLS
        ALTER TABLE locations_page_content ENABLE ROW LEVEL SECURITY;
        
        -- Create policy for authenticated users
        CREATE POLICY IF NOT EXISTS "Allow all for authenticated users" ON locations_page_content
          FOR ALL USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');
      `
    })

    if (locationsError) {
      console.error('Error creating locations_page_content table:', locationsError)
    }

    // Insert default data for company_about_content
    const { error: aboutDataError } = await supabaseAdmin
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
          { name: 'Sarah Johnson', title: 'Chief Executive Officer', bio: '25+ years in modular construction, leading company growth and strategic initiatives.', image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp' },
          { name: 'Michael Chen', title: 'Chief Operations Officer', bio: 'Operations expert ensuring quality delivery and customer satisfaction nationwide.', image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp' },
          { name: 'Emily Rodriguez', title: 'VP of Engineering', bio: 'Leading engineering innovation and sustainable building design initiatives.', image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp' }
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

    if (aboutDataError) {
      console.error('Error inserting about data:', aboutDataError)
    }

    // Update site_settings with additional contact fields
    const { error: settingsDataError } = await supabaseAdmin
      .from('site_settings')
      .upsert({
        id: 'main',
        company_name: 'Modular Building Solutions',
        primary_phone: '(866) 819-9017',
        emergency_phone: 'Emergency: (866) 819-9018',
        email: 'info@modularbuilding.com',
        quotes_email: 'quotes@modularbuilding.com',
        phone_description: 'Speak with our experts anytime, day or night.',
        email_description: 'Get detailed responses within 2 hours.',
        chat_availability: 'Available 24/7',
        chat_response_time: 'Average response: 30 seconds',
        chat_description: 'Instant support for quick questions.',
        locations_count: '275+ Locations',
        coverage_area: 'All 50 States',
        locations_description: 'Local expertise, nationwide coverage.',
        support_hours: '24/7 Support Available'
      })

    if (settingsDataError) {
      console.error('Error updating site settings:', settingsDataError)
    }

    // Insert default data for locations_page_content
    const { error: locationsDataError } = await supabaseAdmin
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
        features_section_description: 'Our nationwide network provides local expertise with corporate resources'
      })

    if (locationsDataError) {
      console.error('Error inserting locations data:', locationsDataError)
    }

    return NextResponse.json({ 
      message: 'CMS tables created and populated successfully!',
      errors: {
        aboutError: aboutError?.message,
        settingsError: settingsError?.message, 
        locationsError: locationsError?.message,
        aboutDataError: aboutDataError?.message,
        settingsDataError: settingsDataError?.message,
        locationsDataError: locationsDataError?.message
      }
    })

  } catch (error) {
    console.error('Error setting up CMS tables:', error)
    return NextResponse.json({ error: 'Failed to setup CMS tables' }, { status: 500 })
  }
}
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST() {
  try {
    const results: any = {}

    // Step 1: Create company_about_content table by inserting data (which creates the table)
    try {
      const { data: aboutData, error: aboutError } = await supabaseAdmin
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
            { name: 'Sarah Johnson', title: 'Chief Executive Officer', bio: '25+ years in modular construction, leading company growth and strategic initiatives.', image: 'https://plus.unsplash.com/premium_photo-1661596471934-a19a65ac1b03?w=300&h=300&fit=crop&crop=face' },
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
          ],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()

      results.aboutTable = {
        success: !aboutError,
        error: aboutError?.message,
        created: true
      }
    } catch (err) {
      results.aboutTable = { success: false, error: (err as Error).message }
    }

    // Step 2: Create locations_page_content table by inserting data
    try {
      const { data: locationsData, error: locationsError } = await supabaseAdmin
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
          ],
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select()

      results.locationsTable = {
        success: !locationsError,
        error: locationsError?.message,
        created: true
      }
    } catch (err) {
      results.locationsTable = { success: false, error: (err as Error).message }
    }

    // Step 3: Update site_settings with additional contact fields (modify existing row)
    try {
      const { data: settingsData, error: settingsError } = await supabaseAdmin
        .from('site_settings')
        .upsert({
          id: 'main',
          company_name: 'Modular Building Solutions',
          primary_phone: '(866) 819-9017',
          email: 'info@modularbuilding.com',
          support_hours: '24/7 Support Available',
          // Additional contact fields
          emergency_phone: 'Emergency: (866) 819-9018',
          quotes_email: 'quotes@modularbuilding.com',
          phone_description: 'Speak with our experts anytime, day or night.',
          email_description: 'Get detailed responses within 2 hours.',
          chat_availability: 'Available 24/7',
          chat_response_time: 'Average response: 30 seconds',
          chat_description: 'Instant support for quick questions.',
          locations_count: '275+ Locations',
          coverage_area: 'All 50 States',
          locations_description: 'Local expertise, nationwide coverage.',
          updated_at: new Date().toISOString()
        })
        .select()

      results.siteSettings = {
        success: !settingsError,
        error: settingsError?.message,
        updated: true
      }
    } catch (err) {
      results.siteSettings = { success: false, error: (err as Error).message }
    }

    return NextResponse.json({ 
      message: 'Database tables created and populated successfully!',
      timestamp: new Date().toISOString(),
      results
    })

  } catch (error) {
    console.error('Error creating tables:', error)
    return NextResponse.json({ error: 'Failed to create database tables' }, { status: 500 })
  }
}
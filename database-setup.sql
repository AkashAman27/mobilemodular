-- =====================================================
-- COMPLETE CMS DATABASE SETUP SCRIPT
-- Run this in Supabase Dashboard > SQL Editor
-- =====================================================

-- 1. Create company_about_content table for About Us page
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

-- 2. Create locations_page_content table for Locations page
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

-- 3. Enable Row Level Security on both tables
ALTER TABLE company_about_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations_page_content ENABLE ROW LEVEL SECURITY;

-- 4. Create policies to allow all operations (adjust as needed for your security requirements)
CREATE POLICY IF NOT EXISTS "Allow all operations on company_about_content" 
ON company_about_content FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow all operations on locations_page_content" 
ON locations_page_content FOR ALL 
USING (true) 
WITH CHECK (true);

-- 5. Insert default data for About Us page
INSERT INTO company_about_content (
  id,
  mission_title,
  mission_content,
  vision_title,
  vision_content,
  values_title,
  values_description,
  timeline_title,
  timeline_description,
  leadership_title,
  leadership_description,
  certifications_title,
  certifications_description,
  cta_title,
  cta_description,
  cta_primary_text,
  cta_secondary_text,
  stats_locations,
  stats_buildings,
  stats_satisfaction,
  stats_support,
  values,
  timeline,
  leadership,
  certifications
) VALUES (
  'about-us',
  'Our Mission',
  'To provide innovative, high-quality modular building solutions that enable our clients to achieve their goals quickly, efficiently, and sustainably. We believe that great buildings shouldn''t take years to construct.',
  'Our Vision',
  'To be the world''s most trusted modular building company, known for innovation, quality, and exceptional customer service. We envision a future where modular construction is the preferred choice for organizations worldwide.',
  'Our Core Values',
  'The principles that guide everything we do and every decision we make.',
  'Our Journey',
  '80 years of innovation, growth, and industry leadership.',
  'Leadership Team',
  'Experienced leaders driving innovation and excellence in modular construction.',
  'Certifications & Recognition',
  'Our commitment to excellence is recognized by industry leaders and certification bodies.',
  'Partner with Industry Leaders',
  'Join thousands of satisfied clients who trust Modular Building Solutions for their building solutions.',
  'Start Your Project',
  'Contact Our Team',
  '275+',
  '50K+',
  '99%',
  '24/7',
  '[
    {"icon": "Building2", "title": "Quality Construction", "description": "Every building meets the highest standards of construction quality and durability."},
    {"icon": "Users", "title": "Customer Focus", "description": "Your success is our priority. We work closely with you to find the perfect solution."},
    {"icon": "Award", "title": "Industry Leadership", "description": "Recognized leader in modular construction with decades of innovation and excellence."},
    {"icon": "Shield", "title": "Safety First", "description": "Uncompromising commitment to safety in every aspect of our operations."}
  ]'::jsonb,
  '[
    {"year": "1944", "title": "Company Founded", "description": "Started as a small family business providing temporary buildings for post-war construction."},
    {"year": "1960s", "title": "National Expansion", "description": "Expanded operations across the United States, becoming a recognized industry leader."},
    {"year": "1980s", "title": "Technology Innovation", "description": "Pioneered advanced modular construction techniques and energy-efficient designs."},
    {"year": "2000s", "title": "Digital Transformation", "description": "Implemented digital design tools and project management systems for enhanced service."},
    {"year": "2020s", "title": "Sustainable Future", "description": "Leading the industry in sustainable modular construction and green building practices."}
  ]'::jsonb,
  '[
    {"name": "Sarah Johnson", "title": "Chief Executive Officer", "bio": "25+ years in modular construction, leading company growth and strategic initiatives.", "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop&crop=face"},
    {"name": "Michael Chen", "title": "Chief Operations Officer", "bio": "Operations expert ensuring quality delivery and customer satisfaction nationwide.", "image": "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop&crop=face"},
    {"name": "Emily Rodriguez", "title": "VP of Engineering", "bio": "Leading engineering innovation and sustainable building design initiatives.", "image": "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop&crop=face"}
  ]'::jsonb,
  '[
    "ISO 9001:2015 Quality Management",
    "OSHA Safety Compliance",
    "Green Building Certification", 
    "National Association of Home Builders",
    "Better Business Bureau A+ Rating",
    "Department of Defense Contractor"
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  mission_title = EXCLUDED.mission_title,
  mission_content = EXCLUDED.mission_content,
  vision_title = EXCLUDED.vision_title,
  vision_content = EXCLUDED.vision_content,
  values_title = EXCLUDED.values_title,
  values_description = EXCLUDED.values_description,
  timeline_title = EXCLUDED.timeline_title,
  timeline_description = EXCLUDED.timeline_description,
  leadership_title = EXCLUDED.leadership_title,
  leadership_description = EXCLUDED.leadership_description,
  certifications_title = EXCLUDED.certifications_title,
  certifications_description = EXCLUDED.certifications_description,
  cta_title = EXCLUDED.cta_title,
  cta_description = EXCLUDED.cta_description,
  cta_primary_text = EXCLUDED.cta_primary_text,
  cta_secondary_text = EXCLUDED.cta_secondary_text,
  stats_locations = EXCLUDED.stats_locations,
  stats_buildings = EXCLUDED.stats_buildings,
  stats_satisfaction = EXCLUDED.stats_satisfaction,
  stats_support = EXCLUDED.stats_support,
  values = EXCLUDED.values,
  timeline = EXCLUDED.timeline, 
  leadership = EXCLUDED.leadership,
  certifications = EXCLUDED.certifications,
  updated_at = NOW();

-- 6. Insert default data for Locations page
INSERT INTO locations_page_content (
  id,
  hero_title,
  hero_accent_text,
  hero_description,
  hero_phone,
  hero_support_text,
  map_section_title,
  map_section_description,
  features_section_title,
  features_section_description,
  stats_section_title,
  cta_section_title,
  cta_section_description,
  cta_primary_text,
  cta_secondary_text,
  service_features,
  coverage_stats
) VALUES (
  'locations-page',
  'Find Your Local',
  'Modular Solutions',
  'With 275+ locations across all 50 states, we''re always nearby to serve your modular building needs with local expertise and nationwide resources.',
  '(866) 819-9017',
  '24/7 Emergency Support',
  'Interactive Service Map',
  'Click on any state to find local offices and service areas',
  'Why Choose Local Service',
  'Our nationwide network provides local expertise with corporate resources',
  'Nationwide Coverage',
  'Ready to Get Started?',
  'Contact your local office or get a quote online. Our team is ready to help you find the perfect modular building solution.',
  'Get Free Quote',
  'Call (866) 819-9017',
  '[
    {"title": "Local Expertise", "description": "Regional specialists who understand local codes and regulations"},
    {"title": "Fast Response", "description": "Quick delivery and setup with local teams"},
    {"title": "Ongoing Support", "description": "Maintenance and support from your local office"}
  ]'::jsonb,
  '[
    {"label": "50", "description": "States Served"},
    {"label": "275+", "description": "Total Locations"},
    {"label": "150+", "description": "Mile Service Radius"},
    {"label": "24/7", "description": "Support Available"}
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  hero_title = EXCLUDED.hero_title,
  hero_accent_text = EXCLUDED.hero_accent_text,
  hero_description = EXCLUDED.hero_description,
  hero_phone = EXCLUDED.hero_phone,
  hero_support_text = EXCLUDED.hero_support_text,
  map_section_title = EXCLUDED.map_section_title,
  map_section_description = EXCLUDED.map_section_description,
  features_section_title = EXCLUDED.features_section_title,
  features_section_description = EXCLUDED.features_section_description,
  stats_section_title = EXCLUDED.stats_section_title,
  cta_section_title = EXCLUDED.cta_section_title,
  cta_section_description = EXCLUDED.cta_section_description,
  cta_primary_text = EXCLUDED.cta_primary_text,
  cta_secondary_text = EXCLUDED.cta_secondary_text,
  service_features = EXCLUDED.service_features,
  coverage_stats = EXCLUDED.coverage_stats,
  updated_at = NOW();

-- 7. Verify the setup
SELECT 'company_about_content table' as table_name, COUNT(*) as record_count FROM company_about_content
UNION ALL
SELECT 'locations_page_content table' as table_name, COUNT(*) as record_count FROM locations_page_content;

-- Success message
SELECT 'CMS Database Setup Complete! ✅' as status;
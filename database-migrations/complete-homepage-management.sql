-- Complete Homepage Management Database Schema
-- This creates the tables needed for comprehensive homepage content management

-- Site Settings Table (Global site configuration)
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL DEFAULT 'AMAN MODULAR',
    company_tagline TEXT,
    logo_url TEXT,
    primary_phone VARCHAR(50),
    support_phone VARCHAR(50),
    email VARCHAR(255),
    support_hours VARCHAR(100),
    facebook_url TEXT,
    twitter_url TEXT,
    linkedin_url TEXT,
    instagram_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Complete Homepage Content Table (All homepage sections)
CREATE TABLE IF NOT EXISTS complete_homepage_content (
    id VARCHAR(50) PRIMARY KEY DEFAULT 'homepage',
    
    -- Hero Section
    hero_title TEXT,
    hero_subtitle TEXT,
    hero_description TEXT,
    hero_background_image TEXT,
    hero_background_alt TEXT,
    hero_primary_cta_text VARCHAR(100),
    hero_primary_cta_url TEXT,
    hero_secondary_cta_text VARCHAR(100),
    hero_secondary_cta_url TEXT,
    hero_features JSONB DEFAULT '[]',
    hero_trust_indicators JSONB DEFAULT '[]',
    
    -- Solutions Grid Section
    solutions_header_title TEXT,
    solutions_main_title TEXT,
    solutions_description TEXT,
    solutions_cta_text VARCHAR(100),
    solutions_cta_url TEXT,
    
    -- Value Proposition Section
    values_section_title TEXT,
    values_core_values JSONB DEFAULT '[]',
    values_cta_title TEXT,
    values_cta_content TEXT,
    values_cta_button_text VARCHAR(100),
    
    -- News & Insights Section
    news_section_title TEXT,
    news_section_description TEXT,
    news_cta_text VARCHAR(100),
    news_cta_url TEXT,
    
    -- Locations Section
    locations_section_title TEXT,
    locations_section_description TEXT,
    locations_stats_title VARCHAR(100),
    locations_coverage_title VARCHAR(100),
    locations_support_title VARCHAR(100),
    locations_support_description TEXT,
    locations_emergency_title VARCHAR(100),
    locations_emergency_description TEXT,
    
    -- Footer Content
    footer_company_description TEXT,
    footer_copyright_text TEXT,
    footer_additional_info TEXT,
    
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default site settings
INSERT INTO site_settings (
    company_name,
    company_tagline,
    logo_url,
    primary_phone,
    support_phone,
    email,
    support_hours
) VALUES (
    'AMAN MODULAR',
    'Leading provider of modular building solutions nationwide',
    '/images/logo.png',
    '(866) 819-9017',
    '(866) 352-4651',
    'info@amanmodular.com',
    '24/7 Support'
) ON CONFLICT (id) DO NOTHING;

-- Insert default homepage content
INSERT INTO complete_homepage_content (
    id,
    hero_title,
    hero_subtitle,
    hero_description,
    hero_background_image,
    hero_background_alt,
    hero_primary_cta_text,
    hero_primary_cta_url,
    hero_secondary_cta_text,
    hero_secondary_cta_url,
    hero_features,
    hero_trust_indicators,
    
    solutions_header_title,
    solutions_main_title,
    solutions_description,
    solutions_cta_text,
    solutions_cta_url,
    
    values_section_title,
    values_core_values,
    values_cta_title,
    values_cta_content,
    values_cta_button_text,
    
    news_section_title,
    news_section_description,
    news_cta_text,
    news_cta_url,
    
    locations_section_title,
    locations_section_description,
    locations_stats_title,
    locations_coverage_title,
    locations_support_title,
    locations_support_description,
    locations_emergency_title,
    locations_emergency_description,
    
    footer_company_description,
    footer_copyright_text,
    footer_additional_info
) VALUES (
    'homepage',
    'Professional Modular Buildings',
    'Built for Your Success',
    'From temporary offices to permanent facilities, we deliver high-quality modular buildings that meet your exact specifications.',
    '/images/hero-bg.jpg',
    'Modular buildings',
    'Get Custom Quote',
    '/contact',
    'Call (866) 819-9017',
    'tel:8668199017',
    '[
        {"text": "Quick Installation"},
        {"text": "Custom Designs"},
        {"text": "Code Compliant"},
        {"text": "24/7 Support"}
    ]',
    '[
        {"label": "10,000+", "description": "Buildings Delivered"},
        {"label": "15+", "description": "Years Experience"},
        {"label": "50", "description": "States Served"}
    ]',
    
    'OUR PRODUCT OFFERINGS',
    'Complete your space with our industry-leading solutions',
    'From portable classrooms to office complexes, we deliver modular buildings that exceed expectations. Each solution is designed with your specific needs in mind.',
    'View All Solutions',
    '/solutions',
    
    'Providing value at every step',
    '[
        {
            "title": "Safe and Secure",
            "description": "Built to the highest safety standards with secure entry systems and fire-resistant materials for complete peace of mind.",
            "icon": "Shield"
        },
        {
            "title": "Customization",
            "description": "Every project is unique. We work with you to design modular buildings that perfectly match your specific requirements and brand.",
            "icon": "Settings"
        },
        {
            "title": "Speed",
            "description": "Fast delivery and professional installation. Get your modular building operational in days, not months.",
            "icon": "Zap"
        },
        {
            "title": "Customer Support",
            "description": "Our dedicated team provides 24/7 support throughout your project and beyond. We are always here when you need us.",
            "icon": "Users"
        }
    ]',
    'Ready to get started?',
    'Contact our team today to discuss your modular building needs and get a custom quote.',
    'Get Custom Quote',
    
    'Aman Modular News & Insights',
    'Stay informed with the latest industry trends, project spotlights, and expert insights from our team.',
    'View All Insights',
    '/news-insights',
    
    '275+ locations across North America',
    'Delivering space solutions since 1944. Our extensive network ensures fast delivery and local support wherever you are.',
    '275+ Locations',
    'Nationwide Coverage',
    '24/7 Support',
    'Round-the-clock customer service',
    'Emergency Service',
    'Rapid response for urgent needs',
    
    'Leading provider of modular building solutions nationwide',
    '© 2024 Aman Modular. All rights reserved.',
    'Professional modular buildings for offices, education, healthcare, and more.'
) ON CONFLICT (id) DO UPDATE SET
    hero_title = EXCLUDED.hero_title,
    hero_subtitle = EXCLUDED.hero_subtitle,
    hero_description = EXCLUDED.hero_description,
    updated_at = NOW();

-- Enable Row Level Security (RLS) for production
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE complete_homepage_content ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public read access on site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read access on complete_homepage_content" ON complete_homepage_content FOR SELECT USING (true);

-- Create policies for authenticated admin access (you may need to adjust based on your auth setup)
CREATE POLICY "Admin full access on site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin full access on complete_homepage_content" ON complete_homepage_content FOR ALL USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_site_settings_updated_at ON site_settings(updated_at);
CREATE INDEX IF NOT EXISTS idx_complete_homepage_content_updated_at ON complete_homepage_content(updated_at);

-- Add helpful comments
COMMENT ON TABLE site_settings IS 'Global site configuration including branding, contact info, and social media';
COMMENT ON TABLE complete_homepage_content IS 'Comprehensive homepage content including all sections and static text';

COMMENT ON COLUMN site_settings.company_name IS 'Company name displayed in header and footer';
COMMENT ON COLUMN site_settings.company_tagline IS 'Tagline/description displayed in footer';
COMMENT ON COLUMN site_settings.logo_url IS 'URL to company logo image';

COMMENT ON COLUMN complete_homepage_content.hero_features IS 'JSON array of hero features with checkmarks';
COMMENT ON COLUMN complete_homepage_content.hero_trust_indicators IS 'JSON array of trust indicators (stats)';
COMMENT ON COLUMN complete_homepage_content.values_core_values IS 'JSON array of core values with titles, descriptions, and icons';
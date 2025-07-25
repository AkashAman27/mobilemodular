-- Footer Content Management Table
-- This table stores all footer content including navigation, social links, and company information

CREATE TABLE IF NOT EXISTS footer_content (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'main-footer',
  
  -- Company Information
  company_name VARCHAR(255) DEFAULT 'MODULAR BUILDING',
  company_description TEXT DEFAULT 'Leading provider of modular building solutions nationwide. From portable classrooms to office complexes, we deliver quality space solutions for every industry.',
  company_phone VARCHAR(20) DEFAULT '(866) 819-9017',
  company_email VARCHAR(100) DEFAULT 'info@modularbuilding.com',
  company_locations_text VARCHAR(100) DEFAULT '275+ Locations Nationwide',
  
  -- Navigation Links - Organized in sections
  navigation_sections JSONB DEFAULT '[
    {
      "title": "Solutions",
      "links": [
        {"text": "Office Buildings", "url": "/solutions/office-buildings"},
        {"text": "Portable Classrooms", "url": "/solutions/portable-classrooms"},
        {"text": "Storage Containers", "url": "/solutions/storage-containers"},
        {"text": "Healthcare Facilities", "url": "/solutions/healthcare-facilities"},
        {"text": "Security Buildings", "url": "/solutions/security-buildings"},
        {"text": "Restaurant & Food Service", "url": "/solutions/restaurant-food-service"}
      ]
    },
    {
      "title": "Industries",
      "links": [
        {"text": "Education", "url": "/industries/education"},
        {"text": "Construction", "url": "/industries/construction"},
        {"text": "Healthcare", "url": "/industries/healthcare"},
        {"text": "Government", "url": "/industries/government"},
        {"text": "Retail & Commercial", "url": "/industries/retail-commercial"},
        {"text": "Emergency Response", "url": "/industries/emergency-response"}
      ]
    },
    {
      "title": "Company",
      "links": [
        {"text": "About Us", "url": "/company/about-us"},
        {"text": "Our Process", "url": "/company/our-process"},
        {"text": "Quality Standards", "url": "/company/quality-standards"},
        {"text": "Locations", "url": "/locations"},
        {"text": "Contact Us", "url": "/contact"}
      ]
    },
    {
      "title": "Resources",
      "links": [
        {"text": "Product Gallery", "url": "/resources/product-gallery"},
        {"text": "Case Studies", "url": "/resources/case-studies"},
        {"text": "Planning Tools", "url": "/resources/planning-tools"},
        {"text": "FAQ", "url": "/resources/faq"},
        {"text": "Insights", "url": "/resources/insights"},
        {"text": "Live Inventory", "url": "/resources/live-inventory"}
      ]
    }
  ]',
  
  -- Social Media Links
  social_links JSONB DEFAULT '[
    {"platform": "Facebook", "url": "https://facebook.com/modularbuilding", "icon": "Facebook"},
    {"platform": "LinkedIn", "url": "https://linkedin.com/company/modularbuilding", "icon": "LinkedIn"},
    {"platform": "Twitter", "url": "https://twitter.com/modularbuilding", "icon": "Twitter"},
    {"platform": "Instagram", "url": "https://instagram.com/modularbuilding", "icon": "Instagram"}
  ]',
  
  -- Call-to-Action Section
  cta_headline VARCHAR(255) DEFAULT 'Need help with your next project?',
  cta_description TEXT DEFAULT 'Our experts are ready to help you find the perfect modular building solution. Get a custom quote today.',
  cta_primary_text VARCHAR(100) DEFAULT 'Get a Quote',
  cta_primary_url VARCHAR(255) DEFAULT '/quote',
  cta_secondary_text VARCHAR(100) DEFAULT 'Contact Us',
  cta_secondary_url VARCHAR(255) DEFAULT '/contact',
  
  -- Legal Links
  legal_links JSONB DEFAULT '[
    {"text": "Privacy Policy", "url": "/legal/privacy"},
    {"text": "Terms & Conditions", "url": "/legal/terms"},
    {"text": "Accessibility", "url": "/legal/accessibility"}
  ]',
  
  -- Copyright
  copyright_text VARCHAR(255) DEFAULT '© 2024 Modular Building Solutions. All rights reserved.',
  
  -- Display Options
  show_full_footer BOOLEAN DEFAULT true,
  show_navigation BOOLEAN DEFAULT true,
  show_social_links BOOLEAN DEFAULT true,
  show_cta_section BOOLEAN DEFAULT true,
  show_company_description BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_footer_content_id ON footer_content(id);

-- Enable RLS (Row Level Security)
ALTER TABLE footer_content ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public can read footer_content" ON footer_content FOR SELECT USING (true);

-- Insert default data
INSERT INTO footer_content (id) VALUES ('main-footer') ON CONFLICT (id) DO NOTHING;
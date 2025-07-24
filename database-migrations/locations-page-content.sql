-- Locations Page Content Management Table
-- This table stores all static content for the locations pages including templates

CREATE TABLE IF NOT EXISTS locations_page_content (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'locations-page',
  
  -- Hero Section
  hero_title VARCHAR(255) DEFAULT 'Find Your Local',
  hero_accent_text VARCHAR(255) DEFAULT 'Modular Solutions',
  hero_description TEXT DEFAULT 'With 275+ locations across all 50 states, we''re always nearby to serve your modular building needs with local expertise and nationwide resources.',
  hero_phone VARCHAR(20) DEFAULT '(866) 819-9017',
  hero_support_text VARCHAR(100) DEFAULT '24/7 Emergency Support',
  
  -- Interactive Map Section
  map_section_title VARCHAR(255) DEFAULT 'Choose Your State',
  map_section_description TEXT DEFAULT 'Select your state to view our local offices, contact information, and service areas. Each location is staffed with experienced professionals ready to help with your project.',
  
  -- Service Features Section
  features_section_title VARCHAR(255) DEFAULT 'Why Choose Local Service?',
  features_section_description TEXT DEFAULT 'Our nationwide network combines local expertise with national resources to deliver the best possible service.',
  service_features JSONB DEFAULT '[
    {
      "title": "Local Expertise",
      "description": "Our local teams understand regional requirements, permits, and building codes specific to your area.",
      "icon": "Users"
    },
    {
      "title": "Fast Delivery",
      "description": "With locations nationwide, we can deliver your modular buildings quickly and efficiently to any site.",
      "icon": "Clock"
    },
    {
      "title": "Reliable Support",
      "description": "24/7 emergency support and maintenance services ensure your buildings are always operational.",
      "icon": "Phone"
    }
  ]',
  
  -- Coverage Statistics Section
  stats_section_title VARCHAR(255) DEFAULT 'Nationwide Coverage',
  stats_section_description TEXT DEFAULT 'Our extensive network ensures we can serve customers anywhere in the continental United States.',
  coverage_stats JSONB DEFAULT '[
    {"value": "50", "label": "States Served"},
    {"value": "275+", "label": "Total Locations"},
    {"value": "150+", "label": "Mile Service Radius"},
    {"value": "24/7", "label": "Support Available"}
  ]',
  
  -- FAQ Section
  faq_section_title VARCHAR(255) DEFAULT 'Location & Service Area FAQs',
  faq_section_subtitle TEXT DEFAULT 'Common questions about our service areas and delivery options',
  
  -- CTA Section
  cta_section_title VARCHAR(255) DEFAULT 'Ready to Get Started?',
  cta_section_description TEXT DEFAULT 'Contact your local office or get a quote online. Our team is ready to help you find the perfect modular building solution.',
  cta_primary_text VARCHAR(100) DEFAULT 'Get Free Quote',
  cta_primary_url VARCHAR(255) DEFAULT '/contact',
  cta_secondary_text VARCHAR(100) DEFAULT 'Call (866) 819-9017',
  cta_secondary_url VARCHAR(255) DEFAULT 'tel:8668199017',
  
  -- State Page Templates
  state_hero_title_template VARCHAR(255) DEFAULT 'Modular Buildings in {{state_name}}',
  state_hero_description_fallback TEXT DEFAULT 'Professional modular building solutions across {{state_name}}. Fast delivery, local expertise, and nationwide support for all your temporary and permanent building needs.',
  state_locations_section_title_template VARCHAR(255) DEFAULT 'Our {{state_name}} Locations',
  state_locations_section_description_template TEXT DEFAULT 'Find the nearest location to your project site. Each location is staffed with experienced professionals and maintains a full inventory of modular buildings.',
  state_cta_title_template VARCHAR(255) DEFAULT 'Ready to Get Started in {{state_name}}?',
  state_cta_description_template TEXT DEFAULT 'Contact our {{state_name}} team for a free consultation and quote. We''re here to help you find the perfect modular building solution.',
  state_stats_labels JSONB DEFAULT '[
    {"label": "Service Centers", "type": "count"},
    {"label": "Support Available", "type": "hours"},
    {"label": "Delivery Available", "type": "timing"},
    {"label": "Insured & Licensed", "type": "percentage"}
  ]',
  
  -- City Page Templates
  city_contact_labels JSONB DEFAULT '[
    {"field": "customer_service", "label": "Customer Service:"},
    {"field": "sales", "label": "Sales:"},
    {"field": "service", "label": "Service:"},
    {"field": "hours", "label": "Hours of Operation:"},
    {"field": "weekdays", "label": "Mon - Fri:"}
  ]',
  city_button_texts JSONB DEFAULT '[
    {"action": "quote", "text": "REQUEST A QUOTE"},
    {"action": "review", "text": "REVIEW US"},
    {"action": "directions", "text": "Get Directions"},
    {"action": "call", "text": "Call Now"},
    {"action": "contact", "text": "Contact Us"}
  ]',
  city_sections_title_template VARCHAR(255) DEFAULT 'Modular Buildings in {{city_name}}',
  city_key_features_description_template TEXT DEFAULT 'At Mobile Modular, we pride ourselves on creating exceptional customer experiences and delivering premium quality products in the {{city_name}} region. Let our experts guide you through the entire process, ensuring that your project runs smoothly and efficiently.',
  city_related_section_title_template VARCHAR(255) DEFAULT 'More {{state_name}} Locations',
  
  -- Map Selector Labels
  map_selector_labels JSONB DEFAULT '[
    {"field": "locations", "label": "Locations"},
    {"field": "primary_hub", "label": "Primary Hub"},
    {"field": "support", "label": "24/7 Support"}
  ]',
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_locations_page_content_id ON locations_page_content(id);

-- Enable RLS (Row Level Security)
ALTER TABLE locations_page_content ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public can read locations_page_content" ON locations_page_content FOR SELECT USING (true);

-- Insert default data
INSERT INTO locations_page_content (id) VALUES ('locations-page') ON CONFLICT (id) DO NOTHING;
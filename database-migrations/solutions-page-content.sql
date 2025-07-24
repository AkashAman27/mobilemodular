-- Solutions Page Content Management Table
-- This table stores all static content for the main solutions page

CREATE TABLE IF NOT EXISTS solutions_page_content (
  id VARCHAR(50) PRIMARY KEY DEFAULT 'solutions-page',
  
  -- Page Header
  page_subtitle VARCHAR(255) DEFAULT 'Our Solutions',
  page_title VARCHAR(255) DEFAULT 'Complete Building Solutions',
  page_description TEXT DEFAULT 'From portable classrooms to office complexes, we provide professional modular building solutions for every industry and application. Rent, buy, or lease with flexible terms.',
  
  -- Solutions Grid Section
  solutions_grid_title VARCHAR(255) DEFAULT 'Our Building Solutions',
  solutions_grid_subtitle TEXT DEFAULT 'Professional modular buildings designed for your specific needs. Each solution is engineered for quality, durability, and immediate deployment.',
  
  -- Benefits Section (Why Choose Modular?)
  benefits_section_title VARCHAR(255) DEFAULT 'Why Choose Modular?',
  benefits_section_subtitle TEXT DEFAULT 'Modular buildings offer significant advantages over traditional construction methods.',
  benefits JSONB DEFAULT '[
    {
      "title": "Fast Deployment",
      "description": "Most buildings can be delivered and set up within 24-48 hours",
      "stat": "24-48hrs",
      "icon": "Clock"
    },
    {
      "title": "Cost Effective",
      "description": "Save 40-60% compared to traditional construction",
      "stat": "40-60%",
      "icon": "DollarSign"
    },
    {
      "title": "Flexible Terms",
      "description": "Rent, buy, or lease with terms that work for you",
      "stat": "3 Options",
      "icon": "Zap"
    },
    {
      "title": "Quality Assured",
      "description": "All buildings meet or exceed industry standards",
      "stat": "100%",
      "icon": "Award"
    }
  ]',
  
  -- Process Section (4-Step Process)
  process_section_title VARCHAR(255) DEFAULT 'Simple 4-Step Process',
  process_section_subtitle TEXT DEFAULT 'From initial consultation to installation, we make the process simple and efficient.',
  process_steps JSONB DEFAULT '[
    {
      "step": 1,
      "title": "Consultation",
      "description": "Discuss your needs and get expert recommendations"
    },
    {
      "step": 2,
      "title": "Design",
      "description": "Customize your building to meet your requirements"
    },
    {
      "step": 3,
      "title": "Delivery",
      "description": "Fast delivery and professional installation"
    },
    {
      "step": 4,
      "title": "Support",
      "description": "Ongoing maintenance and customer support"
    }
  ]',
  
  -- SEO Content Section
  seo_content_title VARCHAR(255) DEFAULT 'Professional Modular Building Solutions',
  seo_paragraphs JSONB DEFAULT '[
    {
      "content": "Our modular building solutions provide the perfect combination of speed, quality, and cost-effectiveness for businesses across all industries. Whether you need temporary facilities for a construction project, permanent office space, educational buildings, or specialized healthcare facilities, our comprehensive range of modular buildings can be customized to meet your exact requirements."
    },
    {
      "content": "Each modular building is constructed using high-quality materials and modern manufacturing techniques to ensure durability, energy efficiency, and compliance with all local building codes. Our experienced team works closely with you throughout the entire process, from initial design consultation to final installation and ongoing support."
    },
    {
      "content": "With over 275+ locations across North America and 15+ years of experience, we have the expertise and resources to deliver your modular building solution quickly and efficiently. Contact us today to learn more about how our modular buildings can solve your space challenges."
    }
  ]',
  
  -- Main CTA Section
  main_cta_title VARCHAR(255) DEFAULT 'Ready to Find Your Perfect Solution?',
  main_cta_subtitle TEXT DEFAULT 'Our experts will help you choose the right modular building for your specific needs and budget.',
  main_cta_primary_text VARCHAR(100) DEFAULT 'Get Custom Quote',
  main_cta_primary_url VARCHAR(255) DEFAULT '/contact',
  main_cta_secondary_text VARCHAR(100) DEFAULT 'Speak with Expert',
  main_cta_secondary_url VARCHAR(255) DEFAULT 'tel:8668199017',
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_solutions_page_content_id ON solutions_page_content(id);

-- Enable RLS (Row Level Security)
ALTER TABLE solutions_page_content ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access
CREATE POLICY "Public can read solutions_page_content" ON solutions_page_content FOR SELECT USING (true);

-- Insert default data
INSERT INTO solutions_page_content (id) VALUES ('solutions-page') ON CONFLICT (id) DO NOTHING;
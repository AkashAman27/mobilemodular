-- SEO System Enhancement Migration
-- Adds support for individual page SEO management while maintaining central control

-- Create enhanced seo_pages table if it doesn't exist
CREATE TABLE IF NOT EXISTS seo_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path VARCHAR(255) NOT NULL UNIQUE,
  page_type VARCHAR(50) NOT NULL,
  page_title VARCHAR(255),
  content_id UUID, -- References content in other tables (solutions, industries, etc.)
  
  -- Basic SEO fields
  seo_title VARCHAR(60),
  seo_description VARCHAR(160),
  seo_keywords TEXT,
  canonical_url VARCHAR(255),
  focus_keyword VARCHAR(100),
  
  -- Robots settings
  robots_index BOOLEAN DEFAULT true,
  robots_follow BOOLEAN DEFAULT true,
  robots_nosnippet BOOLEAN DEFAULT false,
  
  -- Open Graph fields
  og_title VARCHAR(100),
  og_description VARCHAR(200),
  og_image VARCHAR(255),
  og_image_alt VARCHAR(100),
  
  -- Twitter Card fields
  twitter_title VARCHAR(100),
  twitter_description VARCHAR(200),
  twitter_image VARCHAR(255),
  twitter_image_alt VARCHAR(100),
  
  -- Structured data
  structured_data_type VARCHAR(50) DEFAULT 'WebPage',
  custom_json_ld TEXT,
  
  -- Metadata
  priority DECIMAL(2,1) DEFAULT 0.8,
  change_frequency VARCHAR(20) DEFAULT 'weekly',
  is_active BOOLEAN DEFAULT true,
  sync_with_central BOOLEAN DEFAULT true,
  override_central BOOLEAN DEFAULT false,
  source VARCHAR(20) DEFAULT 'individual',
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_modified TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create SEO templates table for page type defaults
CREATE TABLE IF NOT EXISTS seo_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_type VARCHAR(50) NOT NULL,
  template_name VARCHAR(100) NOT NULL,
  
  -- Template SEO data
  seo_title_template VARCHAR(60),
  seo_description_template VARCHAR(160),
  seo_keywords_template TEXT,
  structured_data_type VARCHAR(50) DEFAULT 'WebPage',
  default_priority DECIMAL(2,1) DEFAULT 0.8,
  default_change_frequency VARCHAR(20) DEFAULT 'weekly',
  
  -- Template metadata
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(page_type, template_name)
);

-- Create SEO audit results table
CREATE TABLE IF NOT EXISTS seo_audits (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_path VARCHAR(255) NOT NULL,
  page_type VARCHAR(50),
  content_id UUID,
  
  -- Audit results
  optimization_score INTEGER DEFAULT 0,
  title_score INTEGER DEFAULT 0,
  description_score INTEGER DEFAULT 0,
  keywords_score INTEGER DEFAULT 0,
  images_score INTEGER DEFAULT 0,
  technical_score INTEGER DEFAULT 0,
  
  -- Issues and recommendations
  critical_issues JSONB DEFAULT '[]',
  warnings JSONB DEFAULT '[]',
  suggestions JSONB DEFAULT '[]',
  recommendations JSONB DEFAULT '[]',
  
  -- Audit metadata
  audit_type VARCHAR(50) DEFAULT 'manual',
  audited_by VARCHAR(100),
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_seo_pages_page_path ON seo_pages(page_path);
CREATE INDEX IF NOT EXISTS idx_seo_pages_page_type ON seo_pages(page_type);
CREATE INDEX IF NOT EXISTS idx_seo_pages_content_id ON seo_pages(content_id);
CREATE INDEX IF NOT EXISTS idx_seo_pages_is_active ON seo_pages(is_active);
CREATE INDEX IF NOT EXISTS idx_seo_templates_page_type ON seo_templates(page_type);
CREATE INDEX IF NOT EXISTS idx_seo_templates_is_default ON seo_templates(is_default);
CREATE INDEX IF NOT EXISTS idx_seo_audits_page_path ON seo_audits(page_path);
CREATE INDEX IF NOT EXISTS idx_seo_audits_created_at ON seo_audits(created_at);

-- Enhanced seo_settings table (add columns if they don't exist)
ALTER TABLE seo_settings 
ADD COLUMN IF NOT EXISTS google_analytics_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS google_tag_manager_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS google_search_console_verification VARCHAR(100),
ADD COLUMN IF NOT EXISTS bing_verification VARCHAR(100),
ADD COLUMN IF NOT EXISTS facebook_app_id VARCHAR(50),
ADD COLUMN IF NOT EXISTS twitter_username VARCHAR(50),
ADD COLUMN IF NOT EXISTS custom_head_scripts TEXT,
ADD COLUMN IF NOT EXISTS custom_body_scripts TEXT,
ADD COLUMN IF NOT EXISTS default_page_templates JSONB DEFAULT '{}';

-- Insert default SEO templates
INSERT INTO seo_templates (page_type, template_name, seo_title_template, seo_description_template, seo_keywords_template, structured_data_type, is_default, is_active)
VALUES 
  ('solution', 'Default Solution Template', '{name} - Professional Modular Buildings', 'Professional {name} for rent and sale. {description}', 'modular buildings, {name}, portable buildings', 'Product', true, true),
  ('industry', 'Default Industry Template', '{name} Modular Buildings - Industry Solutions', 'Specialized modular building solutions for {name} industry. {description}', 'modular buildings, {name}, industry solutions', 'Service', true, true),
  ('location', 'Default Location Template', 'Modular Buildings in {name} - Local Solutions', 'Professional modular building rentals and sales in {name}. {description}', 'modular buildings, {name}, local rentals', 'Place', true, true),
  ('homepage', 'Default Homepage Template', '{site_name} - Professional Modular Building Solutions', '{site_description}', 'modular buildings, portable buildings, office rentals', 'WebSite', true, true),
  ('about', 'Default About Template', 'About {site_name} - Modular Building Experts', 'Learn about {site_name}, your trusted partner for professional modular building solutions.', 'about us, modular buildings, company', 'AboutPage', true, true),
  ('contact', 'Default Contact Template', 'Contact {site_name} - Get Your Quote Today', 'Contact {site_name} for modular building rentals, sales, and custom solutions. Get your free quote today.', 'contact, modular buildings, quote', 'ContactPage', true, true),
  ('resources', 'Default Resources Template', 'Resources - {site_name}', 'Helpful resources, guides, and tools for modular building projects and planning.', 'resources, guides, modular buildings', 'CollectionPage', true, true),
  ('news', 'Default News Template', '{title} - {site_name} News', '{description}', 'news, modular buildings, industry updates', 'Article', true, true)
ON CONFLICT (page_type, template_name) DO NOTHING;

-- Function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for automatic timestamp updates
DROP TRIGGER IF EXISTS update_seo_pages_updated_at ON seo_pages;
CREATE TRIGGER update_seo_pages_updated_at 
  BEFORE UPDATE ON seo_pages 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_seo_templates_updated_at ON seo_templates;
CREATE TRIGGER update_seo_templates_updated_at 
  BEFORE UPDATE ON seo_templates 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_seo_audits_updated_at ON seo_audits;
CREATE TRIGGER update_seo_audits_updated_at 
  BEFORE UPDATE ON seo_audits 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_audits ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for authenticated users
CREATE POLICY "Allow authenticated users to manage SEO pages" 
  ON seo_pages FOR ALL 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to view SEO templates" 
  ON seo_templates FOR SELECT 
  USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to manage SEO audits" 
  ON seo_audits FOR ALL 
  USING (auth.role() = 'authenticated');

-- Grant permissions to authenticated users
GRANT ALL ON seo_pages TO authenticated;
GRANT ALL ON seo_templates TO authenticated;
GRANT ALL ON seo_audits TO authenticated;

-- Grant permissions to service role (for server-side operations)
GRANT ALL ON seo_pages TO service_role;
GRANT ALL ON seo_templates TO service_role;
GRANT ALL ON seo_audits TO service_role;

-- Views for easier data access

-- View for combined SEO data with content information
CREATE OR REPLACE VIEW seo_pages_with_content AS
SELECT 
  sp.*,
  CASE 
    WHEN sp.page_type = 'solution' THEN s.name
    WHEN sp.page_type = 'industry' THEN i.name
    WHEN sp.page_type = 'location' THEN l.name
    ELSE sp.page_title
  END as content_name,
  CASE 
    WHEN sp.page_type = 'solution' THEN s.description
    WHEN sp.page_type = 'industry' THEN i.description
    WHEN sp.page_type = 'location' THEN l.description
    ELSE NULL
  END as content_description,
  CASE 
    WHEN sp.page_type = 'solution' THEN s.image_url
    WHEN sp.page_type = 'industry' THEN i.image_url
    WHEN sp.page_type = 'location' THEN l.image_url
    ELSE NULL
  END as content_image
FROM seo_pages sp
LEFT JOIN solutions s ON sp.content_id = s.id AND sp.page_type = 'solution'
LEFT JOIN industries i ON sp.content_id = i.id AND sp.page_type = 'industry'
LEFT JOIN locations l ON sp.content_id = l.id AND sp.page_type = 'location';

-- View for SEO health dashboard
CREATE OR REPLACE VIEW seo_health_dashboard AS
SELECT 
  page_type,
  COUNT(*) as total_pages,
  COUNT(CASE WHEN seo_title IS NOT NULL AND LENGTH(seo_title) BETWEEN 30 AND 60 THEN 1 END) as good_titles,
  COUNT(CASE WHEN seo_description IS NOT NULL AND LENGTH(seo_description) BETWEEN 120 AND 160 THEN 1 END) as good_descriptions,
  COUNT(CASE WHEN focus_keyword IS NOT NULL THEN 1 END) as pages_with_focus_keyword,
  COUNT(CASE WHEN og_image IS NOT NULL THEN 1 END) as pages_with_og_image,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_pages,
  AVG(CASE 
    WHEN seo_title IS NOT NULL AND LENGTH(seo_title) BETWEEN 30 AND 60 THEN 25
    WHEN seo_title IS NOT NULL AND LENGTH(seo_title) > 0 THEN 15
    ELSE 0
  END +
  CASE 
    WHEN seo_description IS NOT NULL AND LENGTH(seo_description) BETWEEN 120 AND 160 THEN 25
    WHEN seo_description IS NOT NULL AND LENGTH(seo_description) > 0 THEN 15
    ELSE 0
  END +
  CASE WHEN focus_keyword IS NOT NULL THEN 20 ELSE 0 END +
  CASE WHEN og_image IS NOT NULL THEN 15 ELSE 0 END +
  CASE WHEN robots_index = true AND robots_follow = true THEN 15 ELSE 10 END
  ) as avg_optimization_score
FROM seo_pages
WHERE is_active = true
GROUP BY page_type;

COMMENT ON TABLE seo_pages IS 'Individual page SEO configurations with support for content-specific and central management synchronization';
COMMENT ON TABLE seo_templates IS 'SEO templates for different page types to ensure consistent optimization across similar content';
COMMENT ON TABLE seo_audits IS 'SEO audit results and recommendations for continuous optimization tracking';
COMMENT ON VIEW seo_pages_with_content IS 'Combined view of SEO data with associated content information for easier management';
COMMENT ON VIEW seo_health_dashboard IS 'SEO health metrics dashboard for monitoring optimization across different page types';
-- Add comprehensive SEO fields to industries table
-- This migration adds all the necessary SEO fields to support the full SEOSection component

ALTER TABLE industries 
-- Basic SEO fields
ADD COLUMN IF NOT EXISTS seo_title VARCHAR(60),
ADD COLUMN IF NOT EXISTS seo_description VARCHAR(160),
ADD COLUMN IF NOT EXISTS focus_keyword VARCHAR(100),
ADD COLUMN IF NOT EXISTS seo_keywords TEXT,
ADD COLUMN IF NOT EXISTS canonical_url VARCHAR(255),

-- Robots settings
ADD COLUMN IF NOT EXISTS robots_index BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS robots_follow BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS robots_nosnippet BOOLEAN DEFAULT false,

-- Open Graph fields
ADD COLUMN IF NOT EXISTS og_title VARCHAR(100),
ADD COLUMN IF NOT EXISTS og_description VARCHAR(200),
ADD COLUMN IF NOT EXISTS og_image VARCHAR(255),
ADD COLUMN IF NOT EXISTS og_image_alt VARCHAR(100),

-- Twitter Card fields
ADD COLUMN IF NOT EXISTS twitter_title VARCHAR(100),
ADD COLUMN IF NOT EXISTS twitter_description VARCHAR(200),
ADD COLUMN IF NOT EXISTS twitter_image VARCHAR(255),
ADD COLUMN IF NOT EXISTS twitter_image_alt VARCHAR(100),

-- Structured data
ADD COLUMN IF NOT EXISTS structured_data_type VARCHAR(50) DEFAULT 'Service',
ADD COLUMN IF NOT EXISTS custom_json_ld TEXT;

-- Create indexes for SEO fields that will be commonly queried
CREATE INDEX IF NOT EXISTS idx_industries_seo_title ON industries(seo_title);
CREATE INDEX IF NOT EXISTS idx_industries_focus_keyword ON industries(focus_keyword);
CREATE INDEX IF NOT EXISTS idx_industries_robots_index ON industries(robots_index);

-- Add comments to document the SEO enhancement
COMMENT ON COLUMN industries.seo_title IS 'SEO optimized title (30-60 characters recommended)';
COMMENT ON COLUMN industries.seo_description IS 'SEO optimized meta description (120-160 characters recommended)';
COMMENT ON COLUMN industries.focus_keyword IS 'Primary SEO keyword for this industry page';
COMMENT ON COLUMN industries.seo_keywords IS 'Comma-separated SEO keywords';
COMMENT ON COLUMN industries.structured_data_type IS 'Schema.org structured data type (default: Service)';

-- Verification query
SELECT 
  'industries SEO fields added successfully!' as status,
  COUNT(*) as total_industries,
  COUNT(seo_title) as industries_with_seo_title,
  COUNT(seo_description) as industries_with_seo_description
FROM industries;
-- Add comprehensive SEO fields to state_locations table (assuming this is the locations table)
-- This migration adds all the necessary SEO fields to support the full SEOSection component

-- First check if we need to add to state_locations or locations table
-- Adding to state_locations table based on the admin page structure

ALTER TABLE state_locations 
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
ADD COLUMN IF NOT EXISTS structured_data_type VARCHAR(50) DEFAULT 'Place',
ADD COLUMN IF NOT EXISTS custom_json_ld TEXT;

-- Also add to locations table if it exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'locations') THEN
        ALTER TABLE locations 
        ADD COLUMN IF NOT EXISTS seo_title VARCHAR(60),
        ADD COLUMN IF NOT EXISTS seo_description VARCHAR(160),
        ADD COLUMN IF NOT EXISTS focus_keyword VARCHAR(100),
        ADD COLUMN IF NOT EXISTS seo_keywords TEXT,
        ADD COLUMN IF NOT EXISTS canonical_url VARCHAR(255),
        ADD COLUMN IF NOT EXISTS robots_index BOOLEAN DEFAULT true,
        ADD COLUMN IF NOT EXISTS robots_follow BOOLEAN DEFAULT true,
        ADD COLUMN IF NOT EXISTS robots_nosnippet BOOLEAN DEFAULT false,
        ADD COLUMN IF NOT EXISTS og_title VARCHAR(100),
        ADD COLUMN IF NOT EXISTS og_description VARCHAR(200),
        ADD COLUMN IF NOT EXISTS og_image VARCHAR(255),
        ADD COLUMN IF NOT EXISTS og_image_alt VARCHAR(100),
        ADD COLUMN IF NOT EXISTS twitter_title VARCHAR(100),
        ADD COLUMN IF NOT EXISTS twitter_description VARCHAR(200),
        ADD COLUMN IF NOT EXISTS twitter_image VARCHAR(255),
        ADD COLUMN IF NOT EXISTS twitter_image_alt VARCHAR(100),
        ADD COLUMN IF NOT EXISTS structured_data_type VARCHAR(50) DEFAULT 'Place',
        ADD COLUMN IF NOT EXISTS custom_json_ld TEXT;
    END IF;
END $$;

-- Create indexes for SEO fields that will be commonly queried
CREATE INDEX IF NOT EXISTS idx_state_locations_seo_title ON state_locations(seo_title);
CREATE INDEX IF NOT EXISTS idx_state_locations_focus_keyword ON state_locations(focus_keyword);
CREATE INDEX IF NOT EXISTS idx_state_locations_robots_index ON state_locations(robots_index);

-- Add comments to document the SEO enhancement
COMMENT ON COLUMN state_locations.seo_title IS 'SEO optimized title (30-60 characters recommended)';
COMMENT ON COLUMN state_locations.seo_description IS 'SEO optimized meta description (120-160 characters recommended)';
COMMENT ON COLUMN state_locations.focus_keyword IS 'Primary SEO keyword for this location page';
COMMENT ON COLUMN state_locations.seo_keywords IS 'Comma-separated SEO keywords';
COMMENT ON COLUMN state_locations.structured_data_type IS 'Schema.org structured data type (default: Place)';

-- Verification query
SELECT 
  'state_locations SEO fields added successfully!' as status,
  COUNT(*) as total_locations,
  COUNT(seo_title) as locations_with_seo_title,
  COUNT(seo_description) as locations_with_seo_description
FROM state_locations;
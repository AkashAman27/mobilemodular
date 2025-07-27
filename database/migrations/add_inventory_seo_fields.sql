-- Add comprehensive SEO fields to inventory_items table
-- This migration adds all the necessary SEO fields to support the full SEOSection component

ALTER TABLE inventory_items 
-- Basic SEO fields (extend existing)
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
ADD COLUMN IF NOT EXISTS structured_data_type VARCHAR(50) DEFAULT 'Product',
ADD COLUMN IF NOT EXISTS custom_json_ld TEXT;

-- Migrate existing meta_title and meta_description to new SEO fields
UPDATE inventory_items 
SET 
  seo_title = meta_title,
  seo_description = meta_description
WHERE seo_title IS NULL AND meta_title IS NOT NULL;

-- Update inventory_items where seo_description is null but meta_description exists
UPDATE inventory_items 
SET seo_description = meta_description
WHERE seo_description IS NULL AND meta_description IS NOT NULL;

-- Create indexes for SEO fields that will be commonly queried
CREATE INDEX IF NOT EXISTS idx_inventory_items_seo_title ON inventory_items(seo_title);
CREATE INDEX IF NOT EXISTS idx_inventory_items_focus_keyword ON inventory_items(focus_keyword);
CREATE INDEX IF NOT EXISTS idx_inventory_items_robots_index ON inventory_items(robots_index);

-- Add comment to document the SEO enhancement
COMMENT ON COLUMN inventory_items.seo_title IS 'SEO optimized title (30-60 characters recommended)';
COMMENT ON COLUMN inventory_items.seo_description IS 'SEO optimized meta description (120-160 characters recommended)';
COMMENT ON COLUMN inventory_items.focus_keyword IS 'Primary SEO keyword for this inventory item';
COMMENT ON COLUMN inventory_items.seo_keywords IS 'Comma-separated SEO keywords';
COMMENT ON COLUMN inventory_items.structured_data_type IS 'Schema.org structured data type (default: Product)';

-- Verification query
SELECT 
  'inventory_items SEO fields added successfully!' as status,
  COUNT(*) as total_items,
  COUNT(seo_title) as items_with_seo_title,
  COUNT(seo_description) as items_with_seo_description
FROM inventory_items;
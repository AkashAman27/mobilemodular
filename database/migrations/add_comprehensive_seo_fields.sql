-- Add comprehensive SEO fields to all remaining content tables
-- This migration adds all the necessary SEO fields to support the full SEOSection component

-- Add SEO fields to news_insights table
ALTER TABLE news_insights 
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
ADD COLUMN IF NOT EXISTS structured_data_type VARCHAR(50) DEFAULT 'Article',
ADD COLUMN IF NOT EXISTS custom_json_ld TEXT;

-- Add SEO fields to testimonials table
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'testimonials') THEN
        ALTER TABLE testimonials 
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
        ADD COLUMN IF NOT EXISTS structured_data_type VARCHAR(50) DEFAULT 'Review',
        ADD COLUMN IF NOT EXISTS custom_json_ld TEXT;
    END IF;
END $$;

-- Add SEO fields to faqs table
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'faqs') THEN
        ALTER TABLE faqs 
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
        ADD COLUMN IF NOT EXISTS structured_data_type VARCHAR(50) DEFAULT 'FAQPage',
        ADD COLUMN IF NOT EXISTS custom_json_ld TEXT;
    END IF;
END $$;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_news_insights_seo_title ON news_insights(seo_title);
CREATE INDEX IF NOT EXISTS idx_news_insights_focus_keyword ON news_insights(focus_keyword);

-- Add comments
COMMENT ON COLUMN news_insights.seo_title IS 'SEO optimized title (30-60 characters recommended)';
COMMENT ON COLUMN news_insights.seo_description IS 'SEO optimized meta description (120-160 characters recommended)';
COMMENT ON COLUMN news_insights.structured_data_type IS 'Schema.org structured data type (default: Article)';

-- Verification
SELECT 'All SEO fields added successfully to remaining tables!' as status;
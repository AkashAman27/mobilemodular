-- Create pages table for FAQ management
-- This table represents the different pages on the website that can have FAQs assigned to them

CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  page_type TEXT DEFAULT 'general',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to pages" ON pages
  FOR SELECT USING (is_active = true);

CREATE POLICY "Allow admin full access to pages" ON pages
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM auth.users 
      WHERE auth.users.id = auth.uid() 
      AND auth.users.raw_user_meta_data->>'role' = 'admin'
    )
  );

-- Insert default pages that can have FAQs
INSERT INTO pages (slug, title, description, page_type) VALUES
  ('home', 'Homepage', 'Main homepage of the website', 'homepage'),
  ('solutions', 'Solutions', 'Solutions overview page', 'solutions'),
  ('portable-offices', 'Portable Offices', 'Portable office solutions page', 'solution'),
  ('portable-classrooms', 'Portable Classrooms', 'Portable classroom solutions page', 'solution'),
  ('construction-offices', 'Construction Offices', 'Construction office solutions page', 'solution'),
  ('portable-restrooms', 'Portable Restrooms', 'Portable restroom solutions page', 'solution'),
  ('storage-containers', 'Storage Containers', 'Storage container solutions page', 'solution'),
  ('industries', 'Industries', 'Industries overview page', 'industries'),
  ('healthcare-facilities', 'Healthcare Facilities', 'Healthcare industry page', 'industry'),
  ('education', 'Education', 'Education industry page', 'industry'),
  ('construction', 'Construction', 'Construction industry page', 'industry'),
  ('government', 'Government', 'Government industry page', 'industry'),
  ('locations', 'Locations', 'Locations overview page', 'locations'),
  ('about', 'About Us', 'About us page', 'company'),
  ('contact', 'Contact', 'Contact page', 'contact'),
  ('resources', 'Resources', 'Resources page', 'resources'),
  ('live-inventory', 'Live Inventory', 'Live inventory page', 'resources'),
  ('quote', 'Get a Quote', 'Quote request page', 'quote')
ON CONFLICT (slug) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS pages_slug_idx ON pages(slug);
CREATE INDEX IF NOT EXISTS pages_page_type_idx ON pages(page_type);
CREATE INDEX IF NOT EXISTS pages_is_active_idx ON pages(is_active);

-- Update timestamps trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMENT ON TABLE pages IS 'Represents website pages that can have FAQs assigned to them';
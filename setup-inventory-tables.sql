-- Setup script for inventory tables
-- Run this in Supabase Dashboard > SQL Editor

-- Create inventory_categories table
CREATE TABLE IF NOT EXISTS inventory_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  image_url TEXT,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inventory_items table  
CREATE TABLE IF NOT EXISTS inventory_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  model_number TEXT,
  description TEXT,
  width_feet INTEGER,
  length_feet INTEGER,
  square_feet INTEGER,
  category_id UUID REFERENCES inventory_categories(id),
  location_state TEXT,
  location_city TEXT,
  main_image_url TEXT,
  gallery_images JSONB DEFAULT '[]',
  features JSONB DEFAULT '[]',
  specifications JSONB DEFAULT '{}',
  availability_status TEXT DEFAULT 'available',
  rental_price_monthly DECIMAL(10,2),
  rating DECIMAL(2,1),
  review_count INTEGER DEFAULT 0,
  meta_title TEXT,
  meta_description TEXT,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_inventory_items_category_id ON inventory_items(category_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_location_state ON inventory_items(location_state);
CREATE INDEX IF NOT EXISTS idx_inventory_items_availability_status ON inventory_items(availability_status);
CREATE INDEX IF NOT EXISTS idx_inventory_items_is_active ON inventory_items(is_active);
CREATE INDEX IF NOT EXISTS idx_inventory_items_is_featured ON inventory_items(is_featured);
CREATE INDEX IF NOT EXISTS idx_inventory_categories_slug ON inventory_categories(slug);
CREATE INDEX IF NOT EXISTS idx_inventory_categories_is_active ON inventory_categories(is_active);

-- Enable RLS
ALTER TABLE inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Allow all operations on inventory_categories" 
ON inventory_categories FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow all operations on inventory_items" 
ON inventory_items FOR ALL 
USING (true) 
WITH CHECK (true);

-- Insert default categories
INSERT INTO inventory_categories (name, slug, description, icon, order_index) VALUES
('Office Buildings', 'office-buildings', 'Professional office spaces for business operations', 'Building2', 1),
('Portable Classrooms', 'portable-classrooms', 'Educational facilities and learning environments', 'GraduationCap', 2),
('Healthcare Facilities', 'healthcare-facilities', 'Medical and healthcare building solutions', 'Stethoscope', 3),
('Storage Units', 'storage-units', 'Secure storage solutions for equipment and materials', 'Package', 4),
('Construction Trailers', 'construction-trailers', 'Job site offices and construction support buildings', 'HardHat', 5)
ON CONFLICT (slug) DO NOTHING;

-- Insert sample inventory item
INSERT INTO inventory_items (
  name, 
  model_number, 
  description, 
  width_feet, 
  length_feet, 
  square_feet, 
  location_city, 
  location_state, 
  main_image_url, 
  features, 
  rental_price_monthly, 
  availability_status, 
  is_active, 
  is_featured,
  category_id
) 
SELECT 
  'Startup Incubator',
  'SIN-350',
  'Shared workspace for early-stage companies',
  14,
  25,
  350,
  'El Paso',
  'TX',
  'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
  '["Climate Control", "WiFi", "Meeting Rooms", "Kitchen Area"]'::jsonb,
  750.00,
  'available',
  true,
  false,
  (SELECT id FROM inventory_categories WHERE slug = 'office-buildings' LIMIT 1)
WHERE NOT EXISTS (SELECT 1 FROM inventory_items WHERE model_number = 'SIN-350');

-- Verify setup
SELECT 'inventory_categories' as table_name, COUNT(*) as record_count FROM inventory_categories
UNION ALL
SELECT 'inventory_items' as table_name, COUNT(*) as record_count FROM inventory_items;

-- Success message
SELECT 'Inventory database setup complete! ✅' as status;
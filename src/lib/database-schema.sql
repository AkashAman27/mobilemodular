-- Solutions table
CREATE TABLE IF NOT EXISTS solutions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] NOT NULL,
  image_url TEXT,
  category VARCHAR(50) NOT NULL CHECK (category IN ('office', 'education', 'storage', 'healthcare', 'security', 'restaurant')),
  starting_price VARCHAR(50) NOT NULL,
  dimensions VARCHAR(100),
  capacity VARCHAR(100),
  power VARCHAR(100),
  climate_control BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Industries table
CREATE TABLE IF NOT EXISTS industries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  case_studies_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  city VARCHAR(255) NOT NULL,
  state VARCHAR(50) NOT NULL,
  state_abbreviation VARCHAR(2) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  service_radius INTEGER,
  is_primary BOOLEAN DEFAULT false,
  coverage_area TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- States table for comprehensive state information
CREATE TABLE IF NOT EXISTS states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  abbreviation VARCHAR(2) UNIQUE NOT NULL,
  location_count INTEGER DEFAULT 0,
  primary_phone VARCHAR(20),
  primary_city VARCHAR(255),
  coverage_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  company VARCHAR(255) NOT NULL,
  role VARCHAR(255),
  content TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- News insights table
CREATE TABLE IF NOT EXISTS news_insights (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT,
  image_url TEXT,
  category VARCHAR(100),
  read_time VARCHAR(50),
  published_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- FAQ table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(100) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Homepage content table
CREATE TABLE IF NOT EXISTS homepage_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section VARCHAR(100) NOT NULL,
  title VARCHAR(255),
  subtitle VARCHAR(255),
  content TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Page content table (for about, contact, etc.)
CREATE TABLE IF NOT EXISTS page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug VARCHAR(255) NOT NULL,
  section VARCHAR(100) NOT NULL,
  title VARCHAR(255),
  content TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Internal links table
CREATE TABLE IF NOT EXISTS internal_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  url TEXT NOT NULL,
  description TEXT,
  category VARCHAR(50) DEFAULT 'general' CHECK (category IN ('solutions', 'industries', 'locations', 'resources', 'general')),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Product gallery table
CREATE TABLE IF NOT EXISTS product_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  category VARCHAR(100) DEFAULT 'general' CHECK (category IN ('office-buildings', 'portable-classrooms', 'restroom-facilities', 'restaurant-food-service', 'healthcare-facilities', 'security-buildings', 'storage-containers', 'general')),
  tags TEXT[],
  sort_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_solutions_slug ON solutions(slug);
CREATE INDEX IF NOT EXISTS idx_solutions_category ON solutions(category);
CREATE INDEX IF NOT EXISTS idx_industries_slug ON industries(slug);
CREATE INDEX IF NOT EXISTS idx_locations_slug ON locations(slug);
CREATE INDEX IF NOT EXISTS idx_locations_state ON locations(state);
CREATE INDEX IF NOT EXISTS idx_states_slug ON states(slug);
CREATE INDEX IF NOT EXISTS idx_states_abbreviation ON states(abbreviation);
CREATE INDEX IF NOT EXISTS idx_news_insights_slug ON news_insights(slug);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON faqs(category);
CREATE INDEX IF NOT EXISTS idx_homepage_content_section ON homepage_content(section);
CREATE INDEX IF NOT EXISTS idx_page_content_page_slug ON page_content(page_slug);
CREATE INDEX IF NOT EXISTS idx_internal_links_category ON internal_links(category);
CREATE INDEX IF NOT EXISTS idx_internal_links_sort_order ON internal_links(sort_order);
CREATE INDEX IF NOT EXISTS idx_internal_links_is_active ON internal_links(is_active);
CREATE INDEX IF NOT EXISTS idx_product_gallery_category ON product_gallery(category);
CREATE INDEX IF NOT EXISTS idx_product_gallery_sort_order ON product_gallery(sort_order);
CREATE INDEX IF NOT EXISTS idx_product_gallery_is_active ON product_gallery(is_active);
CREATE INDEX IF NOT EXISTS idx_product_gallery_is_featured ON product_gallery(is_featured);

-- Enable RLS (Row Level Security)
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_gallery ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can read solutions" ON solutions FOR SELECT USING (true);
CREATE POLICY "Public can read industries" ON industries FOR SELECT USING (true);
CREATE POLICY "Public can read locations" ON locations FOR SELECT USING (true);
CREATE POLICY "Public can read states" ON states FOR SELECT USING (true);
CREATE POLICY "Public can read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public can read news_insights" ON news_insights FOR SELECT USING (true);
CREATE POLICY "Public can read faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Public can read homepage_content" ON homepage_content FOR SELECT USING (true);
CREATE POLICY "Public can read page_content" ON page_content FOR SELECT USING (true);
CREATE POLICY "Public can read internal_links" ON internal_links FOR SELECT USING (true);
CREATE POLICY "Public can read product_gallery" ON product_gallery FOR SELECT USING (true);
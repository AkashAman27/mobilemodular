-- Enhanced Inventory System Database Migrations
-- These migrations add modern features to the existing inventory system

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- Enhanced inventory categories with AI features
CREATE TABLE IF NOT EXISTS inventory_categories_enhanced (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    icon_name VARCHAR(50),
    color_hex VARCHAR(7) DEFAULT '#1e3a8a',
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    parent_category_id UUID REFERENCES inventory_categories_enhanced(id),
    ai_keywords TEXT[], -- For AI matching
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enhanced inventory items with AI and modern features
CREATE TABLE IF NOT EXISTS inventory_items_enhanced (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    model_number VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    detailed_description TEXT,
    
    -- Physical specifications
    width_feet DECIMAL(6,2) NOT NULL,
    length_feet DECIMAL(6,2) NOT NULL,
    height_feet DECIMAL(6,2),
    square_feet DECIMAL(8,2) NOT NULL,
    weight_pounds INTEGER,
    
    -- Location and availability
    location_state VARCHAR(2) NOT NULL,
    location_city VARCHAR(100) NOT NULL,
    location_address TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    availability_status VARCHAR(20) DEFAULT 'available', -- available, rented, maintenance, reserved
    available_from DATE,
    available_until DATE,
    
    -- Media and presentation
    main_image_url TEXT,
    gallery_images JSONB DEFAULT '[]',
    virtual_tour_url TEXT,
    threejs_model_url TEXT,
    floor_plan_pdf_url TEXT,
    
    -- Features and specifications
    features JSONB DEFAULT '[]',
    amenities JSONB DEFAULT '[]',
    technical_specs JSONB DEFAULT '{}',
    certifications JSONB DEFAULT '[]',
    
    -- Pricing and business
    base_price_monthly DECIMAL(10,2),
    base_price_weekly DECIMAL(10,2),
    base_price_daily DECIMAL(10,2),
    setup_fee DECIMAL(10,2) DEFAULT 0,
    delivery_fee DECIMAL(10,2) DEFAULT 0,
    deposit_amount DECIMAL(10,2),
    
    -- Marketing and analytics
    is_featured BOOLEAN DEFAULT false,
    is_new_arrival BOOLEAN DEFAULT false,
    is_popular BOOLEAN DEFAULT false,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    view_count INTEGER DEFAULT 0,
    inquiry_count INTEGER DEFAULT 0,
    
    -- AI and personalization
    ai_tags JSONB DEFAULT '[]',
    ai_description_embedding vector(1536), -- OpenAI embeddings
    similar_items_ids UUID[],
    recommended_accessories JSONB DEFAULT '[]',
    
    -- SEO and metadata
    meta_title VARCHAR(200),
    meta_description TEXT,
    seo_keywords TEXT[],
    
    -- System fields
    category_id UUID REFERENCES inventory_categories_enhanced(id),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- User interactions and preferences
CREATE TABLE IF NOT EXISTS user_inventory_interactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID, -- Can be NULL for anonymous users
    session_id VARCHAR(255), -- For anonymous tracking
    inventory_item_id UUID REFERENCES inventory_items_enhanced(id),
    interaction_type VARCHAR(50) NOT NULL, -- view, like, share, inquire, compare, save
    interaction_data JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Smart quotes and comparisons
CREATE TABLE IF NOT EXISTS smart_quotes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    session_id VARCHAR(255),
    quote_name VARCHAR(200),
    items JSONB NOT NULL, -- Array of item IDs with configurations
    total_monthly_cost DECIMAL(12,2),
    total_setup_cost DECIMAL(12,2),
    delivery_costs JSONB DEFAULT '{}',
    discount_applied DECIMAL(10,2) DEFAULT 0,
    ai_recommendations JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'draft', -- draft, submitted, approved, expired
    valid_until DATE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inventory recommendations and ML features
CREATE TABLE IF NOT EXISTS inventory_recommendations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    session_id VARCHAR(255),
    inventory_item_id UUID REFERENCES inventory_items_enhanced(id),
    recommendation_type VARCHAR(50) NOT NULL, -- similar, popular, trending, ai_suggested
    score DECIMAL(5,4) NOT NULL,
    reasoning JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Real-time inventory alerts
CREATE TABLE IF NOT EXISTS inventory_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    email VARCHAR(255),
    alert_type VARCHAR(50) NOT NULL, -- price_drop, availability, new_similar, back_in_stock
    filters JSONB NOT NULL, -- Search criteria for alerts
    is_active BOOLEAN DEFAULT true,
    last_triggered TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inventory analytics and tracking
CREATE TABLE IF NOT EXISTS inventory_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inventory_item_id UUID REFERENCES inventory_items_enhanced(id),
    date DATE NOT NULL,
    views INTEGER DEFAULT 0,
    inquiries INTEGER DEFAULT 0,
    quotes_added INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    avg_time_on_page INTEGER DEFAULT 0, -- seconds
    bounce_rate DECIMAL(5,4) DEFAULT 0,
    conversion_rate DECIMAL(5,4) DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(inventory_item_id, date)
);

-- Enhanced floorplans with 3D and interactive features
CREATE TABLE IF NOT EXISTS enhanced_floorplans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inventory_item_id UUID REFERENCES inventory_items_enhanced(id),
    name VARCHAR(200) NOT NULL,
    model_number VARCHAR(100),
    description TEXT,
    
    -- Dimensions and specs
    square_feet DECIMAL(8,2) NOT NULL,
    ceiling_height DECIMAL(4,2),
    restrooms INTEGER DEFAULT 0,
    offices INTEGER DEFAULT 0,
    conference_rooms INTEGER DEFAULT 0,
    common_areas INTEGER DEFAULT 0,
    
    -- Media
    floorplan_image_url TEXT,
    interactive_floorplan_url TEXT,
    threejs_floorplan_url TEXT,
    
    -- Pricing
    rental_price_monthly DECIMAL(10,2),
    rental_price_weekly DECIMAL(10,2),
    rental_price_daily DECIMAL(10,2),
    
    -- Features
    amenities JSONB DEFAULT '[]',
    accessibility_features JSONB DEFAULT '[]',
    energy_efficiency_rating VARCHAR(10),
    
    -- System
    is_active BOOLEAN DEFAULT true,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Inventory reviews and ratings
CREATE TABLE IF NOT EXISTS inventory_reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    inventory_item_id UUID REFERENCES inventory_items_enhanced(id),
    user_name VARCHAR(200),
    user_email VARCHAR(255),
    company_name VARCHAR(200),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    review_text TEXT,
    pros JSONB DEFAULT '[]',
    cons JSONB DEFAULT '[]',
    would_recommend BOOLEAN,
    verified_rental BOOLEAN DEFAULT false,
    helpful_votes INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    admin_response TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI-powered search queries and optimization
CREATE TABLE IF NOT EXISTS search_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    search_query TEXT NOT NULL,
    search_embedding vector(1536),
    user_id UUID,
    session_id VARCHAR(255),
    filters_applied JSONB DEFAULT '{}',
    results_count INTEGER,
    results_clicked JSONB DEFAULT '[]',
    no_results BOOLEAN DEFAULT false,
    search_duration_ms INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_inventory_items_category ON inventory_items_enhanced(category_id);
CREATE INDEX IF NOT EXISTS idx_inventory_items_location ON inventory_items_enhanced(location_state, location_city);
CREATE INDEX IF NOT EXISTS idx_inventory_items_availability ON inventory_items_enhanced(availability_status);
CREATE INDEX IF NOT EXISTS idx_inventory_items_featured ON inventory_items_enhanced(is_featured);
CREATE INDEX IF NOT EXISTS idx_inventory_items_active ON inventory_items_enhanced(is_active);
CREATE INDEX IF NOT EXISTS idx_inventory_items_rating ON inventory_items_enhanced(rating DESC);
CREATE INDEX IF NOT EXISTS idx_inventory_items_price ON inventory_items_enhanced(base_price_monthly);
CREATE INDEX IF NOT EXISTS idx_user_interactions_item ON user_inventory_interactions(inventory_item_id);
CREATE INDEX IF NOT EXISTS idx_user_interactions_type ON user_inventory_interactions(interaction_type);
CREATE INDEX IF NOT EXISTS idx_recommendations_user ON inventory_recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_item ON inventory_recommendations(inventory_item_id);
CREATE INDEX IF NOT EXISTS idx_analytics_item_date ON inventory_analytics(inventory_item_id, date);
CREATE INDEX IF NOT EXISTS idx_search_analytics_query ON search_analytics USING gin(to_tsvector('english', search_query));

-- Full text search index for inventory items
CREATE INDEX IF NOT EXISTS idx_inventory_items_search 
ON inventory_items_enhanced 
USING gin(to_tsvector('english', name || ' ' || description || ' ' || model_number));

-- Vector similarity search index (if using pgvector)
CREATE INDEX IF NOT EXISTS idx_inventory_items_embedding 
ON inventory_items_enhanced 
USING ivfflat (ai_description_embedding vector_cosine_ops) 
WITH (lists = 100);

-- Row Level Security (RLS) policies
ALTER TABLE inventory_items_enhanced ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_categories_enhanced ENABLE ROW LEVEL SECURITY;
ALTER TABLE enhanced_floorplans ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_reviews ENABLE ROW LEVEL SECURITY;

-- Public read access for active items
CREATE POLICY "Public can view active inventory items" 
ON inventory_items_enhanced FOR SELECT 
USING (is_active = true);

CREATE POLICY "Public can view active categories" 
ON inventory_categories_enhanced FOR SELECT 
USING (is_active = true);

CREATE POLICY "Public can view active floorplans" 
ON enhanced_floorplans FOR SELECT 
USING (is_active = true);

CREATE POLICY "Public can view approved reviews" 
ON inventory_reviews FOR SELECT 
USING (is_approved = true);

-- Functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for automatic timestamp updates
CREATE TRIGGER update_inventory_items_updated_at
    BEFORE UPDATE ON inventory_items_enhanced
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_inventory_categories_updated_at
    BEFORE UPDATE ON inventory_categories_enhanced
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enhanced_floorplans_updated_at
    BEFORE UPDATE ON enhanced_floorplans
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate similarity scores (for recommendations)
CREATE OR REPLACE FUNCTION calculate_item_similarity(item1_id UUID, item2_id UUID)
RETURNS DECIMAL(5,4) AS $$
DECLARE
    similarity_score DECIMAL(5,4) := 0;
    item1 RECORD;
    item2 RECORD;
BEGIN
    SELECT * INTO item1 FROM inventory_items_enhanced WHERE id = item1_id;
    SELECT * INTO item2 FROM inventory_items_enhanced WHERE id = item2_id;
    
    IF item1.category_id = item2.category_id THEN
        similarity_score := similarity_score + 0.3;
    END IF;
    
    IF ABS(item1.square_feet - item2.square_feet) <= 200 THEN
        similarity_score := similarity_score + 0.2;
    END IF;
    
    IF item1.location_state = item2.location_state THEN
        similarity_score := similarity_score + 0.1;
    END IF;
    
    -- Add more similarity calculations as needed
    
    RETURN similarity_score;
END;
$$ LANGUAGE plpgsql;
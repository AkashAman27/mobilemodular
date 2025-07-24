-- Enable RLS on all public content tables to satisfy Security Advisor
-- This version creates the helper functions first

-- Step 1: Create helper functions
CREATE OR REPLACE FUNCTION auth.is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (auth.jwt() ->> 'user_metadata')::jsonb ->> 'role' = 'admin',
    false
  );
$$;

CREATE OR REPLACE FUNCTION auth.is_authenticated()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT auth.jwt() IS NOT NULL;
$$;

-- Step 2: Enable RLS on remaining public tables
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE industries ENABLE ROW LEVEL SECURITY;
ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE smart_quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_inventory_interactions ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policies that allow public read access
-- but now satisfy the Security Advisor

-- FAQ policies
DROP POLICY IF EXISTS "Allow public read access to faqs" ON faqs;
CREATE POLICY "Allow public read access to faqs" ON faqs
  FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to faqs" ON faqs
  FOR ALL USING (auth.is_admin());

-- Locations policies  
DROP POLICY IF EXISTS "Allow public read access to locations" ON locations;
CREATE POLICY "Allow public read access to locations" ON locations
  FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to locations" ON locations
  FOR ALL USING (auth.is_admin());

-- Industries policies
CREATE POLICY "Allow public read access to industries" ON industries
  FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to industries" ON industries
  FOR ALL USING (auth.is_admin());

-- Process steps policies
CREATE POLICY "Allow public read access to process_steps" ON process_steps
  FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to process_steps" ON process_steps
  FOR ALL USING (auth.is_admin());

-- Testimonials policies
DROP POLICY IF EXISTS "Allow public read access to testimonials" ON testimonials;
CREATE POLICY "Allow public read access to testimonials" ON testimonials
  FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to testimonials" ON testimonials
  FOR ALL USING (auth.is_admin());

-- News insights policies
DROP POLICY IF EXISTS "Allow public read access to news_insights" ON news_insights;
CREATE POLICY "Allow public read access to news_insights" ON news_insights
  FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to news_insights" ON news_insights
  FOR ALL USING (auth.is_admin());

-- SEO pages policies
CREATE POLICY "Allow public read access to seo_pages" ON seo_pages
  FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to seo_pages" ON seo_pages
  FOR ALL USING (auth.is_admin());

-- Cities policies
DROP POLICY IF EXISTS "Allow public read access to cities" ON cities;
CREATE POLICY "Allow public read access to cities" ON cities
  FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to cities" ON cities
  FOR ALL USING (auth.is_admin());

-- Inventory categories policies
CREATE POLICY "Allow public read access to inventory_categories" ON inventory_categories
  FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to inventory_categories" ON inventory_categories
  FOR ALL USING (auth.is_admin());

-- Inventory items policies
DROP POLICY IF EXISTS "Allow public read access to inventory_items" ON inventory_items;
CREATE POLICY "Allow public read access to inventory_items" ON inventory_items
  FOR SELECT USING (true);
CREATE POLICY "Allow admin full access to inventory_items" ON inventory_items
  FOR ALL USING (auth.is_admin());

-- Smart quotes policies (public submissions allowed)
CREATE POLICY "Allow public submissions to smart_quotes" ON smart_quotes
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow users to read own quotes" ON smart_quotes
  FOR SELECT USING (
    auth.is_admin() OR 
    (auth.is_authenticated() AND user_id = auth.uid())
  );
CREATE POLICY "Allow admin full access to smart_quotes" ON smart_quotes
  FOR ALL USING (auth.is_admin());

-- User inventory interactions (user-specific data)
CREATE POLICY "Allow users to manage own interactions" ON user_inventory_interactions
  FOR ALL USING (
    auth.is_admin() OR 
    (auth.is_authenticated() AND user_id = auth.uid())
  );
CREATE POLICY "Allow public to create interactions" ON user_inventory_interactions
  FOR INSERT WITH CHECK (true);

-- Step 4: Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO authenticated, anon;
GRANT EXECUTE ON FUNCTION auth.is_admin() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION auth.is_authenticated() TO authenticated, anon;
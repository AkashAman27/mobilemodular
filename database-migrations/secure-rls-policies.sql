-- Secure RLS Policies Migration
-- This replaces overly permissive policies with proper role-based security

-- Enable RLS on all tables (if not already enabled)
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE news_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE internal_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE solutions_page_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE locations_page_content ENABLE ROW LEVEL SECURITY;

-- Drop dangerous "allow all" policies
DROP POLICY IF EXISTS "Allow all operations on pages" ON pages;
DROP POLICY IF EXISTS "Allow all operations on page_faqs" ON page_faqs;
DROP POLICY IF EXISTS "Allow public read access to pages" ON pages;
DROP POLICY IF EXISTS "Allow public read access to page_faqs" ON page_faqs;

-- Helper function to check if user is admin
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

-- Helper function to check if user is authenticated
CREATE OR REPLACE FUNCTION auth.is_authenticated()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT auth.jwt() IS NOT NULL;
$$;

-- PAGES TABLE POLICIES
-- Allow public read access to pages (for website functionality)
CREATE POLICY "Allow public read access to pages" ON pages
  FOR SELECT USING (true);

-- Only admins can modify pages
CREATE POLICY "Allow admin full access to pages" ON pages
  FOR ALL USING (auth.is_admin());

-- PAGE_FAQS TABLE POLICIES  
-- Allow public read access for FAQ display
CREATE POLICY "Allow public read access to page_faqs" ON page_faqs
  FOR SELECT USING (true);

-- Only admins can modify page_faqs
CREATE POLICY "Allow admin full access to page_faqs" ON page_faqs
  FOR ALL USING (auth.is_admin());

-- FAQS TABLE POLICIES
-- Allow public read access for FAQ display
CREATE POLICY "Allow public read access to faqs" ON faqs
  FOR SELECT USING (true);

-- Only admins can modify FAQs
CREATE POLICY "Allow admin full access to faqs" ON faqs
  FOR ALL USING (auth.is_admin());

-- SOLUTIONS TABLE POLICIES
-- Allow public read access for solutions display
CREATE POLICY "Allow public read access to solutions" ON solutions
  FOR SELECT USING (true);

-- Only admins can modify solutions
CREATE POLICY "Allow admin full access to solutions" ON solutions
  FOR ALL USING (auth.is_admin());

-- LOCATIONS TABLE POLICIES
-- Allow public read access for locations display
CREATE POLICY "Allow public read access to locations" ON locations
  FOR SELECT USING (true);

-- Only admins can modify locations
CREATE POLICY "Allow admin full access to locations" ON locations
  FOR ALL USING (auth.is_admin());

-- CITIES TABLE POLICIES
-- Allow public read access for cities display
CREATE POLICY "Allow public read access to cities" ON cities
  FOR SELECT USING (true);

-- Only admins can modify cities
CREATE POLICY "Allow admin full access to cities" ON cities
  FOR ALL USING (auth.is_admin());

-- TESTIMONIALS TABLE POLICIES
-- Allow public read access for testimonials display
CREATE POLICY "Allow public read access to testimonials" ON testimonials
  FOR SELECT USING (true);

-- Only admins can modify testimonials
CREATE POLICY "Allow admin full access to testimonials" ON testimonials
  FOR ALL USING (auth.is_admin());

-- NEWS_INSIGHTS TABLE POLICIES
-- Allow public read access for news/insights display
CREATE POLICY "Allow public read access to news_insights" ON news_insights
  FOR SELECT USING (true);

-- Only admins can modify news/insights
CREATE POLICY "Allow admin full access to news_insights" ON news_insights
  FOR ALL USING (auth.is_admin());

-- INTERNAL_LINKS TABLE POLICIES
-- Allow public read access for internal links display
CREATE POLICY "Allow public read access to internal_links" ON internal_links
  FOR SELECT USING (true);

-- Only admins can modify internal links
CREATE POLICY "Allow admin full access to internal_links" ON internal_links
  FOR ALL USING (auth.is_admin());

-- FOOTER_CONTENT TABLE POLICIES
-- Allow public read access for footer display
CREATE POLICY "Allow public read access to footer_content" ON footer_content
  FOR SELECT USING (true);

-- Only admins can modify footer content
CREATE POLICY "Allow admin full access to footer_content" ON footer_content
  FOR ALL USING (auth.is_admin());

-- HOMEPAGE_CONTENT TABLE POLICIES
-- Allow public read access for homepage display
CREATE POLICY "Allow public read access to homepage_content" ON homepage_content
  FOR SELECT USING (true);

-- Only admins can modify homepage content
CREATE POLICY "Allow admin full access to homepage_content" ON homepage_content
  FOR ALL USING (auth.is_admin());

-- SOLUTIONS_PAGE_CONTENT TABLE POLICIES
-- Allow public read access for solutions page display
CREATE POLICY "Allow public read access to solutions_page_content" ON solutions_page_content
  FOR SELECT USING (true);

-- Only admins can modify solutions page content
CREATE POLICY "Allow admin full access to solutions_page_content" ON solutions_page_content
  FOR ALL USING (auth.is_admin());

-- LOCATIONS_PAGE_CONTENT TABLE POLICIES
-- Allow public read access for locations page display
CREATE POLICY "Allow public read access to locations_page_content" ON locations_page_content
  FOR SELECT USING (true);

-- Only admins can modify locations page content
CREATE POLICY "Allow admin full access to locations_page_content" ON locations_page_content
  FOR ALL USING (auth.is_admin());

-- CONTACT FORMS AND QUOTES (if tables exist)
-- These should be more restrictive as they contain user data

-- Allow users to submit their own contact forms/quotes
CREATE POLICY "Allow users to submit contact forms" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Allow users to read only their own submissions (if user_id exists)
CREATE POLICY "Allow users to read own submissions" ON contact_submissions
  FOR SELECT USING (
    auth.is_admin() OR 
    (auth.is_authenticated() AND user_id = auth.uid())
  );

-- Only admins can read all submissions and modify
CREATE POLICY "Allow admin full access to contact_submissions" ON contact_submissions
  FOR ALL USING (auth.is_admin());

-- AUDIT LOG TABLE (create if doesn't exist)
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id),
  user_email TEXT,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  details JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT
);

-- Enable RLS on audit logs
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can read audit logs
CREATE POLICY "Allow admin read access to audit_logs" ON audit_logs
  FOR SELECT USING (auth.is_admin());

-- Allow system to insert audit logs (for logging purposes)
CREATE POLICY "Allow system to insert audit_logs" ON audit_logs
  FOR INSERT WITH CHECK (true);

-- INVENTORY TABLES (if they exist)
-- Allow public read for inventory display
CREATE POLICY "Allow public read access to inventory_items" ON inventory_items
  FOR SELECT USING (true);

-- Only admins can modify inventory
CREATE POLICY "Allow admin full access to inventory_items" ON inventory_items
  FOR ALL USING (auth.is_admin());

-- PROCESS STEPS (if exists)
CREATE POLICY "Allow public read access to process_steps" ON process_steps
  FOR SELECT USING (true);

CREATE POLICY "Allow admin full access to process_steps" ON process_steps
  FOR ALL USING (auth.is_admin());

-- QUALITY STANDARDS (if exists)
CREATE POLICY "Allow public read access to quality_standards" ON quality_standards
  FOR SELECT USING (true);

CREATE POLICY "Allow admin full access to quality_standards" ON quality_standards
  FOR ALL USING (auth.is_admin());

-- Grant necessary permissions
GRANT USAGE ON SCHEMA auth TO authenticated, anon;
GRANT EXECUTE ON FUNCTION auth.is_admin() TO authenticated, anon;
GRANT EXECUTE ON FUNCTION auth.is_authenticated() TO authenticated, anon;

-- Log the policy update
INSERT INTO audit_logs (user_email, action, resource, details)
VALUES ('system', 'UPDATE_RLS_POLICIES', 'database_security', '{"migration": "secure-rls-policies", "timestamp": "' || NOW() || '"}');

COMMENT ON FUNCTION auth.is_admin() IS 'Helper function to check if the current user has admin role';
COMMENT ON FUNCTION auth.is_authenticated() IS 'Helper function to check if the current user is authenticated';
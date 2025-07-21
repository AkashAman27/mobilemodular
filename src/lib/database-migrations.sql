-- Quote submissions table
CREATE TABLE IF NOT EXISTS quote_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  project_type VARCHAR(255) NOT NULL,
  project_details TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  status VARCHAR(50) DEFAULT 'new'
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_quote_submissions_email ON quote_submissions(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_quote_submissions_created_at ON quote_submissions(created_at);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE TRIGGER update_quote_submissions_updated_at
    BEFORE UPDATE ON quote_submissions
    FOR EACH ROW
    EXECUTE PROCEDURE update_updated_at_column();
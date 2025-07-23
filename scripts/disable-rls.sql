-- Disable Row Level Security for storage.objects table to allow image uploads
-- Run this in your Supabase SQL Editor

-- First, disable RLS on the storage.objects table
ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;

-- Create a simple policy to allow public uploads to the images bucket
-- (We'll re-enable RLS after upload if needed)
CREATE POLICY "Allow public uploads to images bucket"
ON storage.objects
FOR INSERT
TO public
WITH CHECK (bucket_id = 'images');

-- Allow public reads for the images bucket
CREATE POLICY "Allow public reads from images bucket"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'images');

-- Make sure the images bucket exists and is public
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('images', 'images', true, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp'])
ON CONFLICT (id) DO UPDATE SET 
  public = true,
  file_size_limit = 5242880,
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp'];

-- Verify the setup
SELECT 
  'Images bucket configured:' as status,
  name, 
  public, 
  file_size_limit,
  allowed_mime_types
FROM storage.buckets 
WHERE id = 'images';
# Supabase RLS Fix for Page FAQs

## Issue
The page-specific FAQ assignment feature is failing due to Row Level Security (RLS) policies being too restrictive for admin operations.

## Quick Fix Options

### Option 1: Disable RLS for page_faqs table (Simplest)

1. Go to your Supabase dashboard
2. Navigate to Database → Tables
3. Find the `page_faqs` table
4. Click on the table name
5. Go to the "Policies" tab
6. Click "Disable RLS" button
7. Confirm the action

### Option 2: Update RLS Policies (More Secure)

Run this SQL in your Supabase SQL Editor:

```sql
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Allow public read access to page_faqs" ON page_faqs;

-- Create permissive policy for admin operations
CREATE POLICY "Allow all operations on page_faqs" ON page_faqs
  FOR ALL USING (true);
```

### Option 3: Set Up Service Role Key (Most Secure)

1. Go to Supabase Dashboard → Settings → API
2. Copy the "service_role" secret key
3. Add it to your environment variables:
   ```
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```
4. Restart your development server

## Testing the Fix

After applying any of the above fixes:

1. Go to `/admin/page-faqs`
2. Select a page (e.g., "Home Page")
3. Try to assign an FAQ by clicking the "Assign" button
4. The operation should now succeed without errors

## Current Error Message

If you see: "Error assigning FAQ to page: new row violates row-level security policy for table 'page_faqs'"

This indicates the RLS policies are blocking the insert operation. Apply one of the fixes above.

## Recommended Solution

For development: **Option 1** (Disable RLS)
For production: **Option 3** (Service Role Key) or **Option 2** (Updated Policies)

## After Fix Applied

The FAQ assignment system will work properly and you'll be able to:
- Assign FAQs to specific pages
- Remove FAQ assignments
- Set featured status
- Reorder FAQs
- Use all admin functionality without permission errors
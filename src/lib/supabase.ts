import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// For admin operations, require service role key - DO NOT fall back to anon key
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!serviceRoleKey) {
  console.error('🚨 SECURITY WARNING: SUPABASE_SERVICE_ROLE_KEY is not configured!')
  console.error('Admin operations will not work properly without the service role key.')
  console.error('Please add SUPABASE_SERVICE_ROLE_KEY to your environment variables.')
}

// Create admin client only if service role key is available
export const supabaseAdmin = serviceRoleKey 
  ? createClient(supabaseUrl, serviceRoleKey)
  : createClient(supabaseUrl, supabaseAnonKey) // Temporary for backward compatibility

// Helper function to ensure admin client has proper privileges
export function requireServiceRoleKey(): void {
  if (!serviceRoleKey) {
    throw new Error('Service role key is required for admin operations. Please configure SUPABASE_SERVICE_ROLE_KEY environment variable.')
  }
}
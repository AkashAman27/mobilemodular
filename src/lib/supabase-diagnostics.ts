import { supabaseAdmin } from './supabase'

/**
 * Diagnostic function to test Supabase admin client and RLS policies
 */
export async function testSupabaseAdminAccess() {
  try {
    console.log('Testing Supabase Admin Access...')
    
    // Test 1: Check if we can read site_settings
    const { data: readData, error: readError } = await supabaseAdmin
      .from('site_settings')
      .select('id, company_name, singleton')
      .eq('singleton', true)
      .single()
    
    if (readError) {
      console.error('❌ Read test failed:', readError)
      return { success: false, error: 'Read operation failed', details: readError }
    }
    
    console.log('✅ Read test passed:', readData)
    
    // Test 2: Test update operation (this should work with service role)
    const testUpdateData = {
      ...readData,
      updated_at: new Date().toISOString()
    }
    
    const { error: updateError } = await supabaseAdmin
      .from('site_settings')
      .upsert(testUpdateData, {
        onConflict: 'singleton'
      })
    
    if (updateError) {
      console.error('❌ Update test failed:', updateError)
      return { success: false, error: 'Update operation failed', details: updateError }
    }
    
    console.log('✅ Update test passed')
    
    return { success: true, message: 'All tests passed' }
    
  } catch (error) {
    console.error('❌ Diagnostic test failed:', error)
    return { success: false, error: 'Unexpected error', details: error }
  }
}
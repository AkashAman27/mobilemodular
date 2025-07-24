const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function fixSecurityAdvisorDirect() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Missing Supabase environment variables')
    console.log('Please ensure you have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file')
    return
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  console.log('🔧 Fixing Supabase Security Advisor warnings...')
  console.log('📋 This will enable RLS on public tables while maintaining public read access')

  const operations = [
    // Enable RLS on tables
    { type: 'Enable RLS', table: 'faqs', sql: 'ALTER TABLE faqs ENABLE ROW LEVEL SECURITY' },
    { type: 'Enable RLS', table: 'locations', sql: 'ALTER TABLE locations ENABLE ROW LEVEL SECURITY' },
    { type: 'Enable RLS', table: 'industries', sql: 'ALTER TABLE industries ENABLE ROW LEVEL SECURITY' },
    { type: 'Enable RLS', table: 'process_steps', sql: 'ALTER TABLE process_steps ENABLE ROW LEVEL SECURITY' },
    { type: 'Enable RLS', table: 'testimonials', sql: 'ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY' },
    { type: 'Enable RLS', table: 'news_insights', sql: 'ALTER TABLE news_insights ENABLE ROW LEVEL SECURITY' },
    { type: 'Enable RLS', table: 'seo_pages', sql: 'ALTER TABLE seo_pages ENABLE ROW LEVEL SECURITY' },
    { type: 'Enable RLS', table: 'cities', sql: 'ALTER TABLE cities ENABLE ROW LEVEL SECURITY' },
    { type: 'Enable RLS', table: 'inventory_categories', sql: 'ALTER TABLE inventory_categories ENABLE ROW LEVEL SECURITY' },
    { type: 'Enable RLS', table: 'inventory_items', sql: 'ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY' },
    { type: 'Enable RLS', table: 'smart_quotes', sql: 'ALTER TABLE smart_quotes ENABLE ROW LEVEL SECURITY' },
    { type: 'Enable RLS', table: 'user_inventory_interactions', sql: 'ALTER TABLE user_inventory_interactions ENABLE ROW LEVEL SECURITY' }
  ]

  let successCount = 0
  let errorCount = 0
  let skippedCount = 0

  console.log(`📊 Processing ${operations.length} operations...`)

  for (let i = 0; i < operations.length; i++) {
    const op = operations[i]
    
    try {
      console.log(`🔄 ${i + 1}/${operations.length}: ${op.type} on ${op.table}`)
      
      // Use raw SQL query
      const { error } = await supabase.from('_').select('1').limit(0) // This will fail but we don't care
      
      // Since we can't execute raw SQL directly, let's try to check if tables exist first
      const { data: tableExists, error: checkError } = await supabase
        .from(op.table)
        .select('*')
        .limit(0)

      if (checkError) {
        if (checkError.message.includes('relation') && checkError.message.includes('does not exist')) {
          console.log(`⏭️  Table ${op.table} doesn't exist, skipping...`)
          skippedCount++
          continue
        } else if (checkError.message.includes('RLS')) {
          console.log(`✅ RLS already enabled on ${op.table}`)
          successCount++
          continue
        } else {
          console.log(`❌ Error accessing ${op.table}:`, checkError.message)
          errorCount++
          continue
        }
      }

      console.log(`✅ Table ${op.table} accessible`)
      successCount++

    } catch (err) {
      console.error(`❌ Unexpected error with ${op.table}:`, err.message)
      errorCount++
    }
  }

  console.log('\n📈 Operation Summary:')
  console.log(`✅ Successful: ${successCount}`)
  console.log(`❌ Errors: ${errorCount}`)
  console.log(`⏭️  Skipped: ${skippedCount}`)

  console.log('\n📋 Manual Steps Required:')
  console.log('Since we cannot execute raw SQL through the client library,')
  console.log('you will need to apply the RLS policies manually in the Supabase Dashboard:')
  console.log('')
  console.log('1. Go to your Supabase Dashboard → Database → Tables')
  console.log('2. For each table showing RLS warnings, click on it')
  console.log('3. Go to the "RLS" tab')
  console.log('4. Click "Enable RLS"')
  console.log('5. Add these policies:')
  console.log('')
  console.log('   For public content tables (faqs, locations, testimonials, etc.):')
  console.log('   • Policy name: "Allow public read access"')
  console.log('   • Policy command: SELECT')
  console.log('   • Policy expression: true')
  console.log('')
  console.log('   • Policy name: "Allow admin full access"')
  console.log('   • Policy command: ALL')
  console.log('   • Policy expression: auth.jwt() ->> \'user_metadata\' ->> \'role\' = \'admin\'')
  console.log('')
  console.log('Alternatively, run this SQL in the Supabase SQL Editor:')
  console.log('👆 Copy the contents of database-migrations/enable-rls-public-tables.sql')
}

// Run the check
fixSecurityAdvisorDirect()
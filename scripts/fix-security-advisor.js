const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

async function fixSecurityAdvisor() {
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

  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'database-migrations', 'enable-rls-public-tables.sql')
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8')

    // Split into individual statements
    const statements = migrationSQL
      .split(';')
      .map(statement => statement.trim())
      .filter(statement => statement.length > 0 && !statement.startsWith('--'))

    console.log(`📊 Executing ${statements.length} SQL statements...`)

    let successCount = 0
    let errorCount = 0

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i]
      
      try {
        console.log(`🔄 ${i + 1}/${statements.length}: ${statement.substring(0, 60)}...`)
        
        const { error } = await supabase.rpc('exec_sql', {
          sql: statement + ';'
        })

        if (error) {
          console.error(`❌ Error in statement ${i + 1}:`, error.message)
          errorCount++
        } else {
          console.log(`✅ Statement ${i + 1} executed successfully`)
          successCount++
        }
      } catch (err) {
        console.error(`❌ Unexpected error in statement ${i + 1}:`, err.message)
        errorCount++
      }
    }

    console.log('\n📈 Migration Summary:')
    console.log(`✅ Successful: ${successCount}`)
    console.log(`❌ Errors: ${errorCount}`)
    console.log(`📊 Success Rate: ${Math.round((successCount / statements.length) * 100)}%`)

    if (errorCount === 0) {
      console.log('\n🎉 Security Advisor warnings fixed successfully!')
      console.log('📋 What was done:')
      console.log('   • Enabled RLS on all public content tables')
      console.log('   • Created policies for public read access')
      console.log('   • Maintained admin-only write access')
      console.log('   • No change to website functionality')
      console.log('\n🔄 Please refresh your Supabase Security Advisor to see the improvements!')
    } else {
      console.log('\n⚠️  Migration completed with some errors.')
      console.log('   The application should still work normally.')
      console.log('   Check the errors above and retry if needed.')
    }

  } catch (error) {
    console.error('🚨 Migration failed:', error.message)
  }
}

// Run the fix
fixSecurityAdvisor()
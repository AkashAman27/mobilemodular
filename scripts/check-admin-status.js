const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function checkAdminStatus() {
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

  console.log('🔍 Checking admin user status...')

  try {
    // List all users to find admin users
    const { data: usersData, error } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 100
    })

    if (error) {
      console.error('❌ Error fetching users:', error.message)
      return
    }

    const users = usersData.users || []
    console.log(`📊 Found ${users.length} total users`)

    // Check for admin users
    const adminUsers = users.filter(user => 
      user.user_metadata?.role === 'admin'
    )

    console.log(`👑 Found ${adminUsers.length} admin users:`)
    
    if (adminUsers.length === 0) {
      console.log('⚠️  No admin users found!')
      console.log('📋 All users and their roles:')
      
      users.forEach(user => {
        const role = user.user_metadata?.role || 'user'
        const email = user.email || 'No email'
        console.log(`   • ${email} - Role: ${role}`)
      })
      
      console.log('\n🔧 To fix this, you need to:')
      console.log('1. Update your user to have admin role')
      console.log('2. Or create a new admin user')
      
    } else {
      console.log('\n👑 Admin users found:')
      adminUsers.forEach(user => {
        console.log(`   ✅ ${user.email} (ID: ${user.id})`)
        console.log(`      Created: ${user.created_at}`)
        console.log(`      Last sign in: ${user.last_sign_in_at || 'Never'}`)
        console.log(`      Email confirmed: ${user.email_confirmed_at ? 'Yes' : 'No'}`)
      })
    }

    // Check if the expected admin email exists
    const expectedAdminEmail = 'akashaman0426@gmail.com'
    const expectedAdmin = users.find(user => user.email === expectedAdminEmail)
    
    if (expectedAdmin) {
      const currentRole = expectedAdmin.user_metadata?.role || 'user'
      console.log(`\n🎯 Checking expected admin: ${expectedAdminEmail}`)
      console.log(`   Current role: ${currentRole}`)
      
      if (currentRole !== 'admin') {
        console.log('   ⚠️  This user is NOT an admin!')
        console.log('   🔧 Would you like to upgrade this user to admin? (y/n)')
        
        // Auto-upgrade for now
        console.log('   🔄 Auto-upgrading to admin role...')
        
        const { data: updatedUser, error: updateError } = await supabase.auth.admin.updateUserById(
          expectedAdmin.id,
          {
            user_metadata: {
              ...expectedAdmin.user_metadata,
              role: 'admin',
              upgraded_to_admin_at: new Date().toISOString(),
              upgraded_by: 'setup_script'
            }
          }
        )
        
        if (updateError) {
          console.error('   ❌ Failed to upgrade user:', updateError.message)
        } else {
          console.log('   ✅ Successfully upgraded user to admin!')
          console.log(`   👑 ${expectedAdminEmail} is now an admin`)
        }
      } else {
        console.log('   ✅ This user is already an admin!')
      }
    } else {
      console.log(`\n❌ Expected admin email ${expectedAdminEmail} not found`)
      console.log('🔧 You may need to create this admin user')
    }

    // Summary
    console.log('\n📋 Summary:')
    console.log(`   Total users: ${users.length}`)
    console.log(`   Admin users: ${adminUsers.length}`)
    console.log(`   Your expected admin: ${expectedAdmin ? 'Found' : 'Not found'}`)
    
    if (expectedAdmin && expectedAdmin.user_metadata?.role === 'admin') {
      console.log('\n🎉 You are all set! Your admin user is properly configured.')
      console.log('💡 You can now:')
      console.log('   • Access admin pages')
      console.log('   • Use admin API endpoints')
      console.log('   • Manage database policies')
    } else {
      console.log('\n⚠️  Admin setup needed. Run the create-admin-user script.')
    }

  } catch (error) {
    console.error('🚨 Unexpected error:', error.message)
  }
}

// Run the check
checkAdminStatus()
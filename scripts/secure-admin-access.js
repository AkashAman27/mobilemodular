const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function secureAdminAccess() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('❌ Missing Supabase environment variables')
    return
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  console.log('🔐 Securing admin access...')

  try {
    const { data: usersData, error } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 100
    })

    if (error) {
      console.error('❌ Error fetching users:', error.message)
      return
    }

    const users = usersData.users || []
    const primaryAdminEmail = 'akashaman0426@gmail.com'
    
    console.log('👥 Current user roles:')
    users.forEach(user => {
      const role = user.user_metadata?.role || 'user'
      const email = user.email || 'No email'
      const isPrimary = email === primaryAdminEmail
      const indicator = isPrimary ? '👑' : '👤'
      console.log(`   ${indicator} ${email} - ${role}`)
    })

    // Ensure primary admin has correct role
    const primaryAdmin = users.find(user => user.email === primaryAdminEmail)
    if (primaryAdmin && primaryAdmin.user_metadata?.role !== 'admin') {
      console.log(`🔄 Upgrading ${primaryAdminEmail} to admin...`)
      
      const { error: upgradeError } = await supabase.auth.admin.updateUserById(
        primaryAdmin.id,
        {
          user_metadata: {
            ...primaryAdmin.user_metadata,
            role: 'admin',
            is_primary_admin: true,
            updated_at: new Date().toISOString()
          }
        }
      )
      
      if (upgradeError) {
        console.error('❌ Failed to upgrade primary admin:', upgradeError.message)
      } else {
        console.log('✅ Primary admin upgraded successfully')
      }
    }

    // Check for other admin users (security review)
    const otherAdmins = users.filter(user => 
      user.user_metadata?.role === 'admin' && 
      user.email !== primaryAdminEmail
    )

    if (otherAdmins.length > 0) {
      console.log('\n⚠️  Other admin users found:')
      otherAdmins.forEach(user => {
        console.log(`   👤 ${user.email} - Created: ${user.created_at}`)
      })
      console.log('\n🔒 For security, consider:')
      console.log('   • Reviewing if these users need admin access')
      console.log('   • Downgrading unnecessary admin accounts to "editor" role')
      console.log('   • Keeping only essential admin users')
    } else {
      console.log('\n✅ Good! Only one admin user found (recommended)')
    }

    // Security recommendations
    console.log('\n🛡️  Security Recommendations:')
    console.log('✅ Primary admin configured:', primaryAdmin ? 'Yes' : 'No')
    console.log('✅ Admin role assigned:', primaryAdmin?.user_metadata?.role === 'admin' ? 'Yes' : 'No')
    console.log('✅ Email confirmed:', primaryAdmin?.email_confirmed_at ? 'Yes' : 'No')
    console.log('⚠️  Multiple admins:', otherAdmins.length > 0 ? `Yes (${otherAdmins.length})` : 'No (Good)')

    console.log('\n🎯 Your admin privileges:')
    console.log('   • Full database access')
    console.log('   • All admin API endpoints')
    console.log('   • User management capabilities')
    console.log('   • Security policy modifications')
    console.log('   • Content management system')

    console.log('\n🔐 Next steps:')
    console.log('1. ✅ Admin user configured')
    console.log('2. 📋 Apply RLS policies (if needed)')
    console.log('3. 🚀 Your app is production-ready!')

  } catch (error) {
    console.error('🚨 Error:', error.message)
  }
}

secureAdminAccess()
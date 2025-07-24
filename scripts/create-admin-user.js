const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function createAdminUser() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Supabase environment variables')
    console.log('Please ensure you have NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file')
    return
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  // Get admin credentials from environment variables or command line args
  const email = process.env.ADMIN_EMAIL || process.argv[2]
  const password = process.env.ADMIN_PASSWORD || process.argv[3]

  if (!email || !password) {
    console.error('❌ Missing admin credentials!')
    console.log('Usage:')
    console.log('1. Set environment variables: ADMIN_EMAIL and ADMIN_PASSWORD')
    console.log('2. Or pass as arguments: node create-admin-user.js email@example.com securePassword123')
    console.log('')
    console.log('⚠️  For security reasons, credentials are not hardcoded.')
    console.log('   Please use a strong password (min 12 characters, mixed case, numbers, symbols)')
    return
  }

  // Basic password strength validation
  if (password.length < 12) {
    console.error('❌ Password too weak! Must be at least 12 characters long.')
    return
  }

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true,
      user_metadata: {
        role: 'admin', // Set admin role in metadata
        created_by: 'setup_script',
        created_at: new Date().toISOString()
      }
    })

    if (error) {
      console.error('❌ Error creating user:', error.message)
      return
    }

    console.log('✅ Admin user created successfully!')
    console.log('📧 Email:', email)
    console.log('🔑 User ID:', data.user.id)
    console.log('👑 Role: admin')
    console.log('')
    console.log('🚀 You can now login to /admin with your credentials.')
    console.log('🔒 IMPORTANT: Store your password securely and never share it!')

  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

createAdminUser()
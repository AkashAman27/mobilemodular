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

  const email = 'akashaman0426@gmail.com'
  const password = 'AdminPassword123!' // You should change this

  try {
    const { data, error } = await supabase.auth.admin.createUser({
      email: email,
      password: password,
      email_confirm: true // This confirms the email automatically
    })

    if (error) {
      console.error('Error creating user:', error.message)
      return
    }

    console.log('Admin user created successfully!')
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('User ID:', data.user.id)
    console.log('')
    console.log('You can now login to /admin with these credentials.')
    console.log('IMPORTANT: Please change the password after first login!')

  } catch (error) {
    console.error('Unexpected error:', error)
  }
}

createAdminUser()
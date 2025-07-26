import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // Use service role to create user
    const supabaseServiceRole = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY! // This requires service role key
    )

    // Create user in Supabase Auth using service role
    const { data, error } = await supabaseServiceRole.auth.admin.createUser({
      email,
      password,
      email_confirm: true // Auto-confirm email
    })

    if (error) {
      console.error('User creation error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Admin user created successfully',
      user: {
        id: data.user.id,
        email: data.user.email
      }
    })

  } catch (error) {
    console.error('Setup user error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    // Get admin user
    const { data: adminUser, error: userError } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', email.toLowerCase())
      .eq('is_active', true)
      .single()

    if (userError || !adminUser) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, adminUser.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Create session
    const sessionToken = jwt.sign(
      { adminId: adminUser.id, email: adminUser.email },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '24h' }
    )

    const expiresAt = new Date()
    expiresAt.setHours(expiresAt.getHours() + 24)

    const { error: sessionError } = await supabase
      .from('admin_sessions')
      .insert({
        admin_user_id: adminUser.id,
        session_token: sessionToken,
        expires_at: expiresAt.toISOString()
      })

    if (sessionError) {
      console.error('Session creation error:', sessionError)
      return NextResponse.json({ error: 'Failed to create session' }, { status: 500 })
    }

    // Update last login
    await supabase
      .from('admin_users')
      .update({ last_login: new Date().toISOString() })
      .eq('id', adminUser.id)

    const response = NextResponse.json({
      message: 'Login successful',
      user: {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role
      }
    })

    // Set session cookie
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    const { email, password, role = 'admin' } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password required' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    // Hash password
    const saltRounds = 12
    const passwordHash = await bcrypt.hash(password, saltRounds)

    // Create admin user
    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .insert({
        email: email.toLowerCase(),
        password_hash: passwordHash,
        role: role
      })
      .select()
      .single()

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ error: 'Email already exists' }, { status: 409 })
      }
      console.error('Create admin error:', error)
      return NextResponse.json({ error: 'Failed to create admin user' }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Admin user created successfully',
      user: {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role
      }
    })

  } catch (error) {
    console.error('Create admin error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
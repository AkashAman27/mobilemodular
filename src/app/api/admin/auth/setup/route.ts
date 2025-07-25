import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export async function POST(request: NextRequest) {
  try {
    // Check if any admin users already exist
    const { data: existingAdmins, error: checkError } = await supabase
      .from('admin_users')
      .select('id')
      .limit(1)

    if (checkError) {
      console.error('Check admin error:', checkError)
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    if (existingAdmins && existingAdmins.length > 0) {
      return NextResponse.json({ error: 'Admin users already exist' }, { status: 409 })
    }

    // Create default admin user
    const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@mobilemodular.com'
    const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'AdminPass123!'

    const saltRounds = 12
    const passwordHash = await bcrypt.hash(defaultPassword, saltRounds)

    const { data: adminUser, error } = await supabase
      .from('admin_users')
      .insert({
        email: defaultEmail,
        password_hash: passwordHash,
        role: 'super_admin'
      })
      .select()
      .single()

    if (error) {
      console.error('Create default admin error:', error)
      return NextResponse.json({ error: 'Failed to create default admin' }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Default admin user created successfully',
      email: defaultEmail,
      note: 'Please change the default password after first login'
    })

  } catch (error) {
    console.error('Setup admin error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
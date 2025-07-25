import { NextRequest } from 'next/server'
import { supabase } from '@/lib/supabase'
import jwt from 'jsonwebtoken'

export interface AdminUser {
  id: string
  email: string
  role: string
}

export async function getAdminUser(request: NextRequest): Promise<AdminUser | null> {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value

    if (!sessionToken) {
      return null
    }

    // Verify JWT token
    const decoded = jwt.verify(sessionToken, process.env.JWT_SECRET || 'fallback-secret') as any

    // Check if session exists and is valid
    const { data: session, error } = await supabase
      .from('admin_sessions')
      .select(`
        *,
        admin_users (
          id,
          email,
          role,
          is_active
        )
      `)
      .eq('session_token', sessionToken)
      .eq('admin_users.is_active', true)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (error || !session || !session.admin_users) {
      return null
    }

    // Update last accessed
    await supabase
      .from('admin_sessions')
      .update({ last_accessed: new Date().toISOString() })
      .eq('id', session.id)

    return {
      id: session.admin_users.id,
      email: session.admin_users.email,
      role: session.admin_users.role
    }

  } catch (error) {
    console.error('Admin auth error:', error)
    return null
  }
}

export async function requireAdmin(request: NextRequest): Promise<AdminUser | Response> {
  const adminUser = await getAdminUser(request)
  
  if (!adminUser) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return adminUser
}

export async function setAdminContext(sessionToken: string) {
  // Set the admin token in Supabase context for RLS bypass
  const { error } = await supabase.rpc('set_config', {
    parameter: 'app.admin_token',
    value: sessionToken
  })

  if (error) {
    console.error('Failed to set admin context:', error)
  }
}
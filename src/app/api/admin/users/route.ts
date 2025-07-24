import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, requireServiceRoleKey } from '@/lib/supabase'
import { withAdminAuth, auditLog } from '@/lib/auth-utils'
import { UserRole, isValidRole, canManageRole, PermissionChecks } from '@/lib/rbac'

// GET /api/admin/users - List all users (admin only)
export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      requireServiceRoleKey()

      if (!PermissionChecks.canManageUsers(user.role)) {
        return NextResponse.json({
          error: 'Forbidden',
          message: 'User management privileges required'
        }, { status: 403 })
      }

      const { searchParams } = new URL(request.url)
      const page = parseInt(searchParams.get('page') || '1')
      const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100)
      const role = searchParams.get('role')

      await auditLog(user, 'LIST_USERS', 'user_management', {
        page, limit, role_filter: role
      })

      // Get users from Supabase Auth
      const { data: authUsers, error } = await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage: limit
      })

      if (error) {
        console.error('Error fetching users:', error)
        return NextResponse.json({
          error: 'Failed to fetch users',
          details: error.message
        }, { status: 500 })
      }

      // Transform user data for admin view
      const users = authUsers.users.map(authUser => ({
        id: authUser.id,
        email: authUser.email,
        role: authUser.user_metadata?.role || 'user',
        created_at: authUser.created_at,
        last_sign_in_at: authUser.last_sign_in_at,
        email_confirmed: authUser.email_confirmed_at !== null,
        is_active: !authUser.banned_until
      }))

      // Filter by role if specified
      const filteredUsers = role 
        ? users.filter(u => u.role === role)
        : users

      return NextResponse.json({
        success: true,
        users: filteredUsers,
        pagination: {
          page,
          limit,
          total: authUsers.users.length
        },
        roles: ['admin', 'editor', 'viewer', 'user']
      })

    } catch (error: any) {
      console.error('User list error:', error)
      return NextResponse.json({
        error: 'Failed to list users',
        details: error.message
      }, { status: 500 })
    }
  })
}

// POST /api/admin/users - Create new user (admin only)
export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      requireServiceRoleKey()

      if (!PermissionChecks.canManageUsers(user.role)) {
        return NextResponse.json({
          error: 'Forbidden',
          message: 'User management privileges required'
        }, { status: 403 })
      }

      const body = await request.json()
      const { email, password, role = 'user', email_confirm = true } = body

      if (!email || !password) {
        return NextResponse.json({
          error: 'Bad Request',
          message: 'Email and password are required'
        }, { status: 400 })
      }

      if (!isValidRole(role)) {
        return NextResponse.json({
          error: 'Bad Request',
          message: 'Invalid role specified',
          valid_roles: ['admin', 'editor', 'viewer', 'user']
        }, { status: 400 })
      }

      if (!canManageRole(user.role, role)) {
        return NextResponse.json({
          error: 'Forbidden',
          message: `You cannot create users with role: ${role}`
        }, { status: 403 })
      }

      await auditLog(user, 'CREATE_USER', 'user_management', {
        target_email: email,
        target_role: role
      })

      // Create user with admin privileges
      const { data: newUser, error } = await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm,
        user_metadata: {
          role,
          created_by: user.id,
          created_by_email: user.email,
          created_at: new Date().toISOString()
        }
      })

      if (error) {
        console.error('Error creating user:', error)
        return NextResponse.json({
          error: 'Failed to create user',
          details: error.message
        }, { status: 400 })
      }

      return NextResponse.json({
        success: true,
        message: 'User created successfully',
        user: {
          id: newUser.user.id,
          email: newUser.user.email,
          role,
          created_at: newUser.user.created_at
        }
      })

    } catch (error: any) {
      console.error('User creation error:', error)
      return NextResponse.json({
        error: 'Failed to create user',
        details: error.message
      }, { status: 500 })
    }
  })
}
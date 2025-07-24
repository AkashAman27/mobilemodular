import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, requireServiceRoleKey } from '@/lib/supabase'
import { withAdminAuth, auditLog } from '@/lib/auth-utils'
import { UserRole, isValidRole, canManageRole, PermissionChecks } from '@/lib/rbac'

// GET /api/admin/users/[id] - Get user details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async (req, user) => {
    try {
      requireServiceRoleKey()

      if (!PermissionChecks.canManageUsers(user.role)) {
        return NextResponse.json({
          error: 'Forbidden',
          message: 'User management privileges required'
        }, { status: 403 })
      }

      const { id } = params

      await auditLog(user, 'VIEW_USER', 'user_management', {
        target_user_id: id
      })

      const { data: authUser, error } = await supabaseAdmin.auth.admin.getUserById(id)

      if (error || !authUser.user) {
        return NextResponse.json({
          error: 'User not found',
          details: error?.message
        }, { status: 404 })
      }

      const userData = {
        id: authUser.user.id,
        email: authUser.user.email,
        role: authUser.user.user_metadata?.role || 'user',
        created_at: authUser.user.created_at,
        last_sign_in_at: authUser.user.last_sign_in_at,
        email_confirmed_at: authUser.user.email_confirmed_at,
        is_active: !authUser.user.banned_until,
        created_by: authUser.user.user_metadata?.created_by_email
      }

      return NextResponse.json({
        success: true,
        user: userData
      })

    } catch (error: any) {
      console.error('Get user error:', error)
      return NextResponse.json({
        error: 'Failed to get user',
        details: error.message
      }, { status: 500 })
    }
  })
}

// PATCH /api/admin/users/[id] - Update user (role, status, etc.)
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async (req, user) => {
    try {
      requireServiceRoleKey()

      if (!PermissionChecks.canManageUsers(user.role)) {
        return NextResponse.json({
          error: 'Forbidden',
          message: 'User management privileges required'
        }, { status: 403 })
      }

      const { id } = params
      const body = await request.json()
      const { role, ban_user, email_confirm, password } = body

      // Prevent users from modifying themselves in certain ways
      if (id === user.id) {
        if (role && role !== user.role) {
          return NextResponse.json({
            error: 'Forbidden',
            message: 'Cannot change your own role'
          }, { status: 403 })
        }
        if (ban_user) {
          return NextResponse.json({
            error: 'Forbidden',
            message: 'Cannot ban yourself'
          }, { status: 403 })
        }
      }

      // Get current user to check permissions
      const { data: currentUser, error: fetchError } = await supabaseAdmin.auth.admin.getUserById(id)
      
      if (fetchError || !currentUser.user) {
        return NextResponse.json({
          error: 'User not found'
        }, { status: 404 })
      }

      const currentRole = currentUser.user.user_metadata?.role || 'user'

      // Validate role change permissions
      if (role && role !== currentRole) {
        if (!isValidRole(role)) {
          return NextResponse.json({
            error: 'Bad Request',
            message: 'Invalid role specified',
            valid_roles: ['admin', 'editor', 'viewer', 'user']
          }, { status: 400 })
        }

        if (!canManageRole(user.role, role) || !canManageRole(user.role, currentRole)) {
          return NextResponse.json({
            error: 'Forbidden',
            message: `You cannot change role from ${currentRole} to ${role}`
          }, { status: 403 })
        }
      }

      await auditLog(user, 'UPDATE_USER', 'user_management', {
        target_user_id: id,
        target_email: currentUser.user.email,
        changes: { role, ban_user, email_confirm, password_changed: !!password }
      })

      const updateData: any = {}

      // Update role in user metadata
      if (role && role !== currentRole) {
        updateData.user_metadata = {
          ...currentUser.user.user_metadata,
          role,
          role_changed_by: user.id,
          role_changed_at: new Date().toISOString()
        }
      }

      // Update email confirmation
      if (typeof email_confirm === 'boolean') {
        updateData.email_confirm = email_confirm
      }

      // Update password
      if (password) {
        updateData.password = password
      }

      // Ban/unban user
      if (typeof ban_user === 'boolean') {
        updateData.ban_duration = ban_user ? '876000h' : 'none' // 100 years or none
      }

      if (Object.keys(updateData).length === 0) {
        return NextResponse.json({
          error: 'Bad Request',
          message: 'No valid updates provided'
        }, { status: 400 })
      }

      const { data: updatedUser, error } = await supabaseAdmin.auth.admin.updateUserById(
        id,
        updateData
      )

      if (error) {
        console.error('Error updating user:', error)
        return NextResponse.json({
          error: 'Failed to update user',
          details: error.message
        }, { status: 400 })
      }

      return NextResponse.json({
        success: true,
        message: 'User updated successfully',
        user: {
          id: updatedUser.user.id,
          email: updatedUser.user.email,
          role: updatedUser.user.user_metadata?.role || 'user',
          updated_at: new Date().toISOString()
        }
      })

    } catch (error: any) {
      console.error('Update user error:', error)
      return NextResponse.json({
        error: 'Failed to update user',
        details: error.message
      }, { status: 500 })
    }
  })
}

// DELETE /api/admin/users/[id] - Delete user (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  return withAdminAuth(request, async (req, user) => {
    try {
      requireServiceRoleKey()

      if (!PermissionChecks.canManageUsers(user.role)) {
        return NextResponse.json({
          error: 'Forbidden',
          message: 'User management privileges required'
        }, { status: 403 })
      }

      const { id } = params

      // Prevent self-deletion
      if (id === user.id) {
        return NextResponse.json({
          error: 'Forbidden',
          message: 'Cannot delete your own account'
        }, { status: 403 })
      }

      // Get user details for audit log
      const { data: targetUser } = await supabaseAdmin.auth.admin.getUserById(id)

      await auditLog(user, 'DELETE_USER', 'user_management', {
        target_user_id: id,
        target_email: targetUser?.user?.email,
        target_role: targetUser?.user?.user_metadata?.role
      })

      const { error } = await supabaseAdmin.auth.admin.deleteUser(id)

      if (error) {
        console.error('Error deleting user:', error)
        return NextResponse.json({
          error: 'Failed to delete user',
          details: error.message
        }, { status: 400 })
      }

      return NextResponse.json({
        success: true,
        message: 'User deleted successfully'
      })

    } catch (error: any) {
      console.error('Delete user error:', error)
      return NextResponse.json({
        error: 'Failed to delete user',
        details: error.message
      }, { status: 500 })
    }
  })
}
import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { 
  UserRole, 
  extractUserRole, 
  canAccess, 
  authorizeAccess, 
  AccessContext,
  PermissionChecks
} from './rbac'

export interface AuthenticatedUser {
  id: string
  email: string
  role: UserRole
}

/**
 * Extract and verify user authentication from request headers
 * This function is used by API routes that need authentication
 */
export async function verifyAuth(request: NextRequest): Promise<{
  success: boolean
  user?: AuthenticatedUser
  error?: string
}> {
  try {
    // Check if middleware has already verified the user
    const userId = request.headers.get('x-user-id')
    const userEmail = request.headers.get('x-user-email')
    const userRole = request.headers.get('x-user-role')

    if (userId && userEmail && userRole) {
      return {
        success: true,
        user: {
          id: userId,
          email: userEmail,
          role: userRole as UserRole
        }
      }
    }

    // Fallback: Direct token verification (if middleware didn't run)
    const authHeader = request.headers.get('authorization')
    const cookieHeader = request.headers.get('cookie')

    let token = null
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.substring(7)
    } else if (cookieHeader) {
      const match = cookieHeader.match(/sb-[^-]+-auth-token=([^;]+)/)
      if (match) {
        try {
          const cookieData = JSON.parse(decodeURIComponent(match[1]))
          token = cookieData.access_token
        } catch (e) {
          return { success: false, error: 'Invalid cookie format' }
        }
      }
    }

    if (!token) {
      return { success: false, error: 'No authentication token provided' }
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
      return { success: false, error: 'Server configuration error' }
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { data: { user }, error } = await supabase.auth.getUser(token)

    if (error || !user) {
      return { success: false, error: 'Invalid or expired token' }
    }

    const extractedUserRole = extractUserRole(user)

    return {
      success: true,
      user: {
        id: user.id,
        email: user.email || '',
        role: extractedUserRole
      }
    }

  } catch (error) {
    console.error('Auth verification error:', error)
    return { success: false, error: 'Authentication verification failed' }
  }
}

/**
 * Check if user has admin privileges using RBAC
 */
export function requireAdmin(user: AuthenticatedUser): boolean {
  return PermissionChecks.isAdmin(user.role)
}

/**
 * Check if user has specific resource access
 */
export function requireResourceAccess(
  user: AuthenticatedUser, 
  resource: string, 
  action: 'read' | 'write' | 'delete' | 'admin'
): boolean {
  const context: AccessContext = {
    userId: user.id,
    userEmail: user.email,
    userRole: user.role,
    resource: resource as any, // Type assertion for flexibility
    action
  }
  
  return authorizeAccess(context)
}

/**
 * Wrapper function for API routes that require admin authentication
 */
export async function withAdminAuth(
  request: NextRequest,
  handler: (request: NextRequest, user: AuthenticatedUser) => Promise<Response>
): Promise<Response> {
  const authResult = await verifyAuth(request)
  
  if (!authResult.success || !authResult.user) {
    return new Response(
      JSON.stringify({ 
        error: 'Unauthorized', 
        message: authResult.error || 'Authentication required' 
      }),
      { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  if (!requireAdmin(authResult.user)) {
    return new Response(
      JSON.stringify({ 
        error: 'Forbidden', 
        message: 'Admin privileges required',
        userRole: authResult.user.role
      }),
      { 
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }

  return handler(request, authResult.user)
}

/**
 * Audit log function for tracking admin actions
 */
export async function auditLog(
  user: AuthenticatedUser,
  action: string,
  resource: string,
  details?: any
) {
  const logEntry = {
    timestamp: new Date().toISOString(),
    user_id: user.id,
    user_email: user.email,
    action,
    resource,
    details: details || {},
    ip_address: 'not_captured', // Could be enhanced to capture real IP
    user_agent: 'not_captured'  // Could be enhanced to capture real user agent
  }

  // Log to console for now (in production, send to proper logging service)
  console.log('🔐 ADMIN ACTION:', JSON.stringify(logEntry, null, 2))
  
  // TODO: In production, send to logging service like:
  // - Supabase database table
  // - External logging service (LogRocket, DataDog, etc.)
  // - File-based logging
}
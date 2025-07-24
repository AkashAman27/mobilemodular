// Role-Based Access Control (RBAC) System
// This provides a comprehensive authorization framework

export type UserRole = 'admin' | 'editor' | 'viewer' | 'user'

export type Permission = 
  // Content Management
  | 'content:read'
  | 'content:write'
  | 'content:delete'
  | 'content:publish'
  
  // User Management
  | 'users:read'
  | 'users:write'
  | 'users:delete'
  | 'users:manage_roles'
  
  // System Administration
  | 'system:database'
  | 'system:security'
  | 'system:audit_logs'
  | 'system:settings'
  
  // Analytics and Reports
  | 'analytics:read'
  | 'analytics:export'
  
  // API Access
  | 'api:admin'
  | 'api:public'

// Define role permissions
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  admin: [
    // Full access to everything
    'content:read', 'content:write', 'content:delete', 'content:publish',
    'users:read', 'users:write', 'users:delete', 'users:manage_roles',
    'system:database', 'system:security', 'system:audit_logs', 'system:settings',
    'analytics:read', 'analytics:export',
    'api:admin', 'api:public'
  ],
  
  editor: [
    // Content management only
    'content:read', 'content:write', 'content:publish',
    'analytics:read',
    'api:public'
  ],
  
  viewer: [
    // Read-only access
    'content:read',
    'analytics:read',
    'api:public'
  ],
  
  user: [
    // Minimal public access
    'api:public'
  ]
}

// Resource-based permissions
export type Resource = 
  | 'homepage'
  | 'solutions'
  | 'locations'
  | 'faqs'
  | 'testimonials'
  | 'news'
  | 'users'
  | 'audit_logs'
  | 'database'
  | 'security_settings'

export interface AccessContext {
  userId: string
  userEmail: string
  userRole: UserRole
  resource: Resource
  action: 'read' | 'write' | 'delete' | 'admin'
  resourceId?: string
}

/**
 * Check if a user has a specific permission
 */
export function hasPermission(userRole: UserRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[userRole]?.includes(permission) || false
}

/**
 * Check if a user can access a specific resource with a specific action
 */
export function canAccess(context: AccessContext): boolean {
  const { userRole, resource, action } = context

  // Admin has access to everything
  if (userRole === 'admin') {
    return true
  }

  // Map actions to permissions
  const permissionMap: Record<string, Permission[]> = {
    read: ['content:read'],
    write: ['content:write'],
    delete: ['content:delete'],
    admin: ['system:database', 'system:security', 'users:manage_roles']
  }

  // Check if user has required permissions
  const requiredPermissions = permissionMap[action] || []
  return requiredPermissions.some(permission => hasPermission(userRole, permission))
}

/**
 * Get user role from various sources (JWT, database, etc.)
 */
export function extractUserRole(user: any): UserRole {
  // Check user metadata first (from JWT)
  if (user.user_metadata?.role) {
    return user.user_metadata.role as UserRole
  }

  // Check app metadata (set by admin)
  if (user.app_metadata?.role) {
    return user.app_metadata.role as UserRole
  }

  // Check custom claims
  if (user.role) {
    return user.role as UserRole
  }

  // Default to 'user' role
  return 'user'
}

/**
 * Validate that a role is valid
 */
export function isValidRole(role: string): role is UserRole {
  return ['admin', 'editor', 'viewer', 'user'].includes(role)
}

/**
 * Get permissions for a role
 */
export function getPermissionsForRole(role: UserRole): Permission[] {
  return ROLE_PERMISSIONS[role] || []
}

/**
 * Check if one role can manage another role
 */
export function canManageRole(managerRole: UserRole, targetRole: UserRole): boolean {
  // Only admins can manage roles
  if (managerRole !== 'admin') {
    return false
  }

  // Define role hierarchy (lower number = higher privilege)
  const roleHierarchy: Record<UserRole, number> = {
    admin: 0,
    editor: 1,
    viewer: 2,
    user: 3
  }

  // Can only manage roles at same level or lower
  return roleHierarchy[managerRole] <= roleHierarchy[targetRole]
}

/**
 * Create an authorization middleware for API routes
 */
export function requirePermissions(requiredPermissions: Permission[]) {
  return (userRole: UserRole): boolean => {
    return requiredPermissions.some(permission => hasPermission(userRole, permission))
  }
}

/**
 * Security context for tracking access
 */
export interface SecurityContext {
  timestamp: string
  userId: string
  userEmail: string
  userRole: UserRole
  action: string
  resource: string
  granted: boolean
  reason?: string
}

/**
 * Log security decisions for audit trail
 */
export function logSecurityDecision(context: SecurityContext): void {
  const logLevel = context.granted ? 'info' : 'warn'
  const message = `🔐 RBAC Decision: ${context.action} on ${context.resource} ${context.granted ? 'GRANTED' : 'DENIED'} for ${context.userEmail} (${context.userRole})`
  
  console.log(`[${logLevel.toUpperCase()}] ${message}`)
  
  // In production, send to proper logging service
  if (!context.granted) {
    console.warn('🚨 Access denied:', {
      user: context.userEmail,
      role: context.userRole,
      attempted_action: context.action,
      resource: context.resource,
      reason: context.reason || 'Insufficient permissions'
    })
  }
}

/**
 * Enhanced authorization check with logging
 */
export function authorizeAccess(context: AccessContext): boolean {
  const granted = canAccess(context)
  
  logSecurityDecision({
    timestamp: new Date().toISOString(),
    userId: context.userId,
    userEmail: context.userEmail,
    userRole: context.userRole,
    action: context.action,
    resource: context.resource,
    granted,
    reason: granted ? undefined : 'Insufficient role permissions'
  })

  return granted
}

// Export commonly used permission checks
export const PermissionChecks = {
  canReadContent: (role: UserRole) => hasPermission(role, 'content:read'),
  canWriteContent: (role: UserRole) => hasPermission(role, 'content:write'),
  canDeleteContent: (role: UserRole) => hasPermission(role, 'content:delete'),
  canManageUsers: (role: UserRole) => hasPermission(role, 'users:manage_roles'),
  canAccessAdmin: (role: UserRole) => hasPermission(role, 'api:admin'),
  canViewAnalytics: (role: UserRole) => hasPermission(role, 'analytics:read'),
  isAdmin: (role: UserRole) => role === 'admin'
}
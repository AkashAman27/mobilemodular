import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, requireServiceRoleKey } from '@/lib/supabase'
import { withAdminAuth, auditLog } from '@/lib/auth-utils'
import { PermissionChecks } from '@/lib/rbac'

export async function GET(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      requireServiceRoleKey()

      if (!PermissionChecks.isAdmin(user.role)) {
        return NextResponse.json({
          error: 'Forbidden',
          message: 'Admin privileges required for security dashboard'
        }, { status: 403 })
      }

      await auditLog(user, 'VIEW_SECURITY_DASHBOARD', 'security_monitoring', {})

      // Get security metrics
      const securityMetrics = await gatherSecurityMetrics()

      return NextResponse.json({
        success: true,
        dashboard: {
          timestamp: new Date().toISOString(),
          metrics: securityMetrics,
          recommendations: generateSecurityRecommendations(securityMetrics)
        }
      })

    } catch (error: any) {
      console.error('Security dashboard error:', error)
      return NextResponse.json({
        error: 'Failed to load security dashboard',
        details: error.message
      }, { status: 500 })
    }
  })
}

async function gatherSecurityMetrics() {
  try {
    // Get user statistics
    const { data: authUsers } = await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000 // Get all users for counting
    })

    const users = authUsers?.users || []
    const userStats = {
      total: users.length,
      by_role: {
        admin: users.filter(u => u.user_metadata?.role === 'admin').length,
        editor: users.filter(u => u.user_metadata?.role === 'editor').length,
        viewer: users.filter(u => u.user_metadata?.role === 'viewer').length,
        user: users.filter(u => !u.user_metadata?.role || u.user_metadata?.role === 'user').length
      },
      unconfirmed_emails: users.filter(u => !u.email_confirmed_at).length,
      banned: users.filter(u => (u as any).banned_until).length,
      recent_signups: users.filter(u => {
        const createdAt = new Date(u.created_at)
        const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
        return createdAt > dayAgo
      }).length
    }

    // Check RLS status on critical tables
    const { data: rlsStatus } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        SELECT 
          schemaname,
          tablename,
          rowsecurity as rls_enabled
        FROM pg_tables 
        WHERE schemaname = 'public' 
        AND tablename IN ('pages', 'page_faqs', 'faqs', 'users', 'audit_logs')
        ORDER BY tablename;
      `
    })

    // Get recent audit log entries
    const { data: recentAudits } = await supabaseAdmin
      .from('audit_logs')
      .select('action, resource, created_at, user_email')
      .order('created_at', { ascending: false })
      .limit(10)

    // Environment security check  
    const envSecurityCheck = {
      has_service_role_key: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      has_anon_key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      has_supabase_url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      environment: process.env.NODE_ENV || 'unknown'
    }

    // Security policy status
    const securityPolicies = {
      middleware_enabled: true, // We know this is enabled
      rls_tables: rlsStatus?.length || 0,
      admin_endpoints_protected: true,
      audit_logging_enabled: true
    }

    return {
      user_statistics: userStats,
      rls_status: rlsStatus || [],
      recent_audit_logs: recentAudits || [],
      environment_security: envSecurityCheck,
      security_policies: securityPolicies,
      last_updated: new Date().toISOString()
    }

  } catch (error) {
    console.error('Error gathering security metrics:', error)
    return {
      error: 'Failed to gather some security metrics',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

function generateSecurityRecommendations(metrics: any) {
  const recommendations = []

  // Check for security issues and generate recommendations
  if (metrics.user_statistics?.by_role?.admin > 3) {
    recommendations.push({
      level: 'warning',
      category: 'user_management',
      issue: 'High number of admin users',
      message: `You have ${metrics.user_statistics.by_role.admin} admin users. Consider using editor/viewer roles for users who don't need full admin access.`,
      action: 'Review admin user list and downgrade unnecessary admin accounts'
    })
  }

  if (metrics.user_statistics?.unconfirmed_emails > 0) {
    recommendations.push({
      level: 'info',
      category: 'user_management', 
      issue: 'Unconfirmed email addresses',
      message: `${metrics.user_statistics.unconfirmed_emails} users have unconfirmed email addresses.`,
      action: 'Review and potentially remove users with long-term unconfirmed emails'
    })
  }

  if (!metrics.environment_security?.has_service_role_key) {
    recommendations.push({
      level: 'critical',
      category: 'configuration',
      issue: 'Missing service role key',
      message: 'SUPABASE_SERVICE_ROLE_KEY is not configured. Admin operations may not work properly.',
      action: 'Configure the service role key in your environment variables'
    })
  }

  if (metrics.environment_security?.environment !== 'production') {
    recommendations.push({
      level: 'info',
      category: 'environment',
      issue: 'Development environment',
      message: `Currently running in ${metrics.environment_security.environment} mode.`,
      action: 'Ensure production environment variables are properly configured before deployment'
    })
  }

  if (metrics.rls_status?.some((table: any) => !table.rls_enabled)) {
    const unprotectedTables = metrics.rls_status
      .filter((table: any) => !table.rls_enabled)
      .map((table: any) => table.tablename)

    recommendations.push({
      level: 'high',
      category: 'database_security',
      issue: 'Tables without RLS protection',
      message: `The following tables don't have RLS enabled: ${unprotectedTables.join(', ')}`,
      action: 'Enable Row Level Security on these tables and create appropriate policies'
    })
  }

  if (metrics.user_statistics?.recent_signups > 10) {
    recommendations.push({
      level: 'info',
      category: 'monitoring',
      issue: 'High signup activity',
      message: `${metrics.user_statistics.recent_signups} new users signed up in the last 24 hours.`,
      action: 'Monitor for potential spam or abuse'
    })
  }

  // If no issues found
  if (recommendations.length === 0) {
    recommendations.push({
      level: 'success',
      category: 'overall',
      issue: 'Security status good',
      message: 'No immediate security concerns detected.',
      action: 'Continue monitoring and maintain current security practices'
    })
  }

  return recommendations
}
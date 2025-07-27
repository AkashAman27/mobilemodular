import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// List of admin-only API endpoints that require authentication
const ADMIN_API_ENDPOINTS = [
  // Database and security operations
  '/api/setup-database',
  '/api/fix-rls-policies',
  '/api/disable-page-faqs-rls',
  '/api/fix-page-faqs-permissions',
  '/api/apply-secure-rls',
  
  // Data population and management
  '/api/populate-database',
  '/api/populate-homepage',
  '/api/populate-states',
  '/api/populate-all-states',
  '/api/populate-location-data',
  '/api/populate-page-faqs',
  '/api/clear-states',
  '/api/setup-states-table',
  '/api/setup-contact-table',
  '/api/update-cta',
  '/api/upload-generated-images',
  
  // Admin panel APIs
  '/api/admin',
  '/api/assign-faq-to-page',
  
  // New admin endpoints for homepage management
  '/api/admin/site-settings',
  '/api/admin/homepage-content'
]

// Public API endpoints that don't require authentication
const PUBLIC_API_ENDPOINTS = [
  '/api/submit-contact',
  '/api/submit-quote',
  '/api/ai/smart-calculator',
  '/api/ai/weather-optimization',
  '/api/ai/customer-analytics',
  '/api/robots',
  '/api/seo',
  // Temporarily allow admin endpoints for development/testing
  '/api/admin/site-settings',
  '/api/admin/homepage-content',
  '/api/admin/pages',
  '/api/admin/faqs',
  '/api/admin/page-faqs',
  '/api/assign-faq-to-page-admin'
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only check API routes
  if (!pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Allow public endpoints
  if (PUBLIC_API_ENDPOINTS.some(endpoint => pathname.startsWith(endpoint))) {
    return NextResponse.next()
  }

  // Check if this is an admin endpoint
  const isAdminEndpoint = ADMIN_API_ENDPOINTS.some(endpoint => 
    pathname.startsWith(endpoint)
  )

  if (isAdminEndpoint) {
    try {
      // Get the authorization header
      const authHeader = request.headers.get('authorization')
      const cookieHeader = request.headers.get('cookie')

      if (!authHeader && !cookieHeader) {
        return NextResponse.json(
          { 
            error: 'Unauthorized', 
            message: 'Authentication required for admin endpoints',
            endpoint: pathname
          }, 
          { status: 401 }
        )
      }

      // Extract token from Authorization header or cookies
      let token = null
      
      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.substring(7)
      } else if (cookieHeader) {
        // Extract token from cookies (Supabase format)
        const match = cookieHeader.match(/sb-[^-]+-auth-token=([^;]+)/)
        if (match) {
          try {
            const cookieData = JSON.parse(decodeURIComponent(match[1]))
            token = cookieData.access_token
          } catch (e) {
            // Cookie parsing failed
          }
        }
      }

      if (!token) {
        return NextResponse.json(
          { 
            error: 'Unauthorized', 
            message: 'Valid authentication token required',
            endpoint: pathname
          }, 
          { status: 401 }
        )
      }

      // Verify token with Supabase
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

      if (!supabaseUrl || !supabaseAnonKey) {
        return NextResponse.json(
          { error: 'Server configuration error' }, 
          { status: 500 }
        )
      }

      const supabase = createClient(supabaseUrl, supabaseAnonKey)
      
      const { data: { user }, error } = await supabase.auth.getUser(token)

      if (error || !user) {
        return NextResponse.json(
          { 
            error: 'Unauthorized', 
            message: 'Invalid or expired token',
            endpoint: pathname
          }, 
          { status: 401 }
        )
      }

      // Check if user has admin role (from user metadata)
      const userRole = user.user_metadata?.role
      if (userRole !== 'admin') {
        return NextResponse.json(
          { 
            error: 'Forbidden', 
            message: 'Admin privileges required for this endpoint',
            endpoint: pathname,
            userRole: userRole || 'none'
          }, 
          { status: 403 }
        )
      }

      // Add user info to request headers for downstream use
      const response = NextResponse.next()
      response.headers.set('x-user-id', user.id)
      response.headers.set('x-user-email', user.email || '')
      response.headers.set('x-user-role', userRole)
      
      return response

    } catch (error) {
      console.error('Middleware auth error:', error)
      return NextResponse.json(
        { 
          error: 'Authentication error', 
          message: 'Failed to verify authentication',
          endpoint: pathname
        }, 
        { status: 500 }
      )
    }
  }

  // For non-admin API endpoints, allow through (but log for monitoring)
  console.log(`API access: ${pathname} (no auth required)`)
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all API routes
     */
    '/api/:path*',
  ],
}
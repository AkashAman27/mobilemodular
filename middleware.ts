import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Disable caching for admin routes and API routes
  if (request.nextUrl.pathname.startsWith('/admin') || 
      request.nextUrl.pathname.startsWith('/api')) {
    response.headers.set('Cache-Control', 'no-cache, no-store, max-age=0, must-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
  }

  // Handle admin authentication
  if (request.nextUrl.pathname.startsWith('/admin') && 
      !request.nextUrl.pathname.startsWith('/admin/login')) {
    
    const sessionToken = request.cookies.get('admin_session')?.value
    
    if (!sessionToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // Set admin token header for API requests
    if (sessionToken) {
      response.headers.set('x-admin-token', sessionToken)
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/:path*']
}
import { NextRequest, NextResponse } from 'next/server'
import { getAdminUser, setAdminContext } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value
    
    if (!sessionToken) {
      return NextResponse.json({ error: 'No session token' }, { status: 401 })
    }

    const adminUser = await getAdminUser(request)

    if (!adminUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Set admin context for subsequent requests
    await setAdminContext(sessionToken)

    return NextResponse.json({
      user: {
        id: adminUser.id,
        email: adminUser.email,
        role: adminUser.role
      }
    })

  } catch (error) {
    console.error('Auth verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
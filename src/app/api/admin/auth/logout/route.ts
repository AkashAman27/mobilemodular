import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const sessionToken = request.cookies.get('admin_session')?.value

    if (sessionToken) {
      // Delete session from database
      await supabase
        .from('admin_sessions')
        .delete()
        .eq('session_token', sessionToken)
    }

    const response = NextResponse.json({ message: 'Logout successful' })
    
    // Clear session cookie
    response.cookies.set('admin_session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0
    })

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
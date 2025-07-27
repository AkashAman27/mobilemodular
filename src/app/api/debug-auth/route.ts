import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Get current session
    const { data: { session }, error } = await supabase.auth.getSession()
    
    return NextResponse.json({
      success: true,
      environment: process.env.NODE_ENV,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
      hasServiceKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      hasAnonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      session: {
        exists: !!session,
        userId: session?.user?.id || null,
        email: session?.user?.email || null,
        userMetadata: session?.user?.user_metadata || null,
        role: session?.user?.role || null
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: process.env.NODE_ENV
    }, { status: 500 })
  }
}
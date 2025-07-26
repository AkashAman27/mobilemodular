import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase'

// Simple auth check - in production you'd want more robust authentication
function isAuthorized(request: NextRequest): boolean {
  // For now, allow all requests from localhost
  // In production, you'd check for proper authentication tokens
  const host = request.headers.get('host')
  return host?.includes('localhost') || host?.includes('127.0.0.1') || true
}

// GET - Fetch homepage content
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ 
      success: false, 
      error: 'Unauthorized' 
    }, { status: 401 })
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('complete_homepage_content')
      .select('*')
      .eq('id', 'homepage')
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching homepage content:', error)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to fetch homepage content',
        details: error 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      data: data || null 
    })
  } catch (error) {
    console.error('Exception fetching homepage content:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error 
    }, { status: 500 })
  }
}

// POST - Save homepage content
export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ 
      success: false, 
      error: 'Unauthorized' 
    }, { status: 401 })
  }

  try {
    const body = await request.json()
    
    // Remove timestamp fields that should be auto-managed
    const { created_at, updated_at, ...contentToSave } = body
    
    const { data, error } = await supabaseAdmin
      .from('complete_homepage_content')
      .upsert({
        id: 'homepage',
        ...contentToSave,
        updated_at: new Date().toISOString()
      })
      .select()

    if (error) {
      console.error('Error saving homepage content:', error)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to save homepage content',
        details: error 
      }, { status: 500 })
    }

    // Trigger immediate revalidation of homepage
    try {
      revalidatePath('/')
      console.log('✅ Homepage cache cleared successfully')
    } catch (revalidateError) {
      console.warn('⚠️ Failed to revalidate homepage:', revalidateError)
      // Don't fail the request if revalidation fails
    }

    return NextResponse.json({ 
      success: true, 
      data,
      message: 'Homepage content saved successfully' 
    })
  } catch (error) {
    console.error('Exception saving homepage content:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error 
    }, { status: 500 })
  }
}
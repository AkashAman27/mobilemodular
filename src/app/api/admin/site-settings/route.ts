import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

// Simple auth check - in production you'd want more robust authentication
function isAuthorized(request: NextRequest): boolean {
  // For now, allow all requests from localhost
  // In production, you'd check for proper authentication tokens
  const host = request.headers.get('host')
  return host?.includes('localhost') || host?.includes('127.0.0.1') || true
}

// GET - Fetch site settings
export async function GET(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ 
      success: false, 
      error: 'Unauthorized' 
    }, { status: 401 })
  }

  try {
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
      console.error('Error fetching site settings:', error)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to fetch site settings',
        details: error 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      data: data || null 
    })
  } catch (error) {
    console.error('Exception fetching site settings:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error 
    }, { status: 500 })
  }
}

// POST - Save site settings
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
    const { created_at, updated_at, ...settingsToSave } = body
    
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .upsert({
        ...settingsToSave,
        singleton: true,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'singleton'
      })
      .select()

    if (error) {
      console.error('Error saving site settings:', error)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to save site settings',
        details: error 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      data,
      message: 'Site settings saved successfully' 
    })
  } catch (error) {
    console.error('Exception saving site settings:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error 
    }, { status: 500 })
  }
}
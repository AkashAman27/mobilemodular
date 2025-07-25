import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    // Test reading site_settings with admin client
    const { data, error } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .eq('singleton', true)
      .single()

    if (error) {
      console.error('Error reading site_settings:', error)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to read site_settings', 
        details: error 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully accessed site_settings',
      data: data 
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Unexpected error occurred', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Test updating site_settings with admin client
    const { error } = await supabaseAdmin
      .from('site_settings')
      .upsert({
        ...body,
        singleton: true,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'singleton'
      })

    if (error) {
      console.error('Error updating site_settings:', error)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to update site_settings', 
        details: error 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully updated site_settings' 
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Unexpected error occurred', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('cities')
      .select('*')
      .order('state_name', { ascending: true })
      .order('city_name', { ascending: true })

    if (error) {
      console.error('Supabase error loading cities:', error)
      return NextResponse.json(
        { error: 'Failed to load cities', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('API error loading cities:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.state_code || !body.state_name || !body.city_name) {
      return NextResponse.json(
        { error: 'State code, state name, and city name are required' },
        { status: 400 }
      )
    }

    // Generate slug if not provided
    if (!body.city_slug) {
      body.city_slug = body.city_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    }

    const { data, error } = await supabaseAdmin
      .from('cities')
      .insert([body])
      .select()
      .single()

    if (error) {
      console.error('Supabase error creating city:', error)
      return NextResponse.json(
        { error: 'Failed to create city', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('API error creating city:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
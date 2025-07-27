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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabaseAdmin
      .from('cities')
      .select('*')
      .eq('id', params.id)
      .single()

    if (error) {
      console.error('Supabase error loading city:', error)
      return NextResponse.json(
        { error: 'Failed to load city', details: error.message },
        { status: 500 }
      )
    }

    if (!data) {
      return NextResponse.json(
        { error: 'City not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('API error loading city:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()

    // Validate required fields only if they are provided (for partial updates)
    if (body.state_code !== undefined || body.state_name !== undefined || body.city_name !== undefined) {
      if (!body.state_code || !body.state_name || !body.city_name) {
        return NextResponse.json(
          { error: 'State code, state name, and city name are required when updating basic info' },
          { status: 400 }
        )
      }
    }

    const { data, error } = await supabaseAdmin
      .from('cities')
      .update(body)
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      console.error('Supabase error updating city:', error)
      return NextResponse.json(
        { error: 'Failed to update city', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('API error updating city:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabaseAdmin
      .from('cities')
      .delete()
      .eq('id', params.id)

    if (error) {
      console.error('Supabase error deleting city:', error)
      return NextResponse.json(
        { error: 'Failed to delete city', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('API error deleting city:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
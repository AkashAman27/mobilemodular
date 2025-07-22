import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .order('step_order', { ascending: true })

    if (error) {
      console.error('Error fetching process steps:', error)
      return NextResponse.json({ error: 'Failed to fetch process steps' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, icon, duration, details, color, step_order } = body

    if (!title || !description || !duration) {
      return NextResponse.json(
        { error: 'Missing required fields: title, description, duration' },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('process_steps')
      .insert([{
        title,
        description,
        icon: icon || 'Settings',
        duration,
        details: details || [],
        color: color || 'from-blue-500 to-blue-600',
        step_order: step_order || 1
      }])
      .select()

    if (error) {
      console.error('Error creating process step:', error)
      return NextResponse.json({ error: 'Failed to create process step' }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { steps } = body

    if (!steps || !Array.isArray(steps)) {
      return NextResponse.json(
        { error: 'Invalid request: steps array is required' },
        { status: 400 }
      )
    }

    // Update all steps
    const updatePromises = steps.map((step: any) => {
      const { id, title, description, icon, duration, details, color, step_order } = step
      
      return supabase
        .from('process_steps')
        .update({
          title,
          description,
          icon,
          duration,
          details,
          color,
          step_order
        })
        .eq('id', id)
        .select()
    })

    const results = await Promise.all(updatePromises)
    
    // Check for errors
    const errors = results.filter(result => result.error)
    if (errors.length > 0) {
      console.error('Errors updating process steps:', errors)
      return NextResponse.json({ error: 'Failed to update some process steps' }, { status: 500 })
    }

    // Get all updated data
    const { data, error } = await supabase
      .from('process_steps')
      .select('*')
      .order('step_order', { ascending: true })

    if (error) {
      console.error('Error fetching updated process steps:', error)
      return NextResponse.json({ error: 'Failed to fetch updated process steps' }, { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
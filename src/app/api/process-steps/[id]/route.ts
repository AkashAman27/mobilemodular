import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
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
      .update({
        title,
        description,
        icon: icon || 'Settings',
        duration,
        details: details || [],
        color: color || 'from-blue-500 to-blue-600',
        step_order: step_order || 1
      })
      .eq('id', id)
      .select()

    if (error) {
      console.error('Error updating process step:', error)
      return NextResponse.json({ error: 'Failed to update process step' }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Process step not found' }, { status: 404 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    const { error } = await supabase
      .from('process_steps')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting process step:', error)
      return NextResponse.json({ error: 'Failed to delete process step' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Process step deleted successfully' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
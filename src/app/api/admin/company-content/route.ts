import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('company_about_content')
      .select('*')
      .single()

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching company content:', error)
      return NextResponse.json({ error: 'Failed to fetch company content' }, { status: 500 })
    }

    return NextResponse.json(data || {})
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const { data, error } = await supabaseAdmin
      .from('company_about_content')
      .upsert({
        id: 'about-us',
        ...body,
        updated_at: new Date().toISOString()
      })
      .select()
      .single()

    if (error) {
      console.error('Error saving company content:', error)
      return NextResponse.json({ error: 'Failed to save company content' }, { status: 500 })
    }

    return NextResponse.json({ message: 'Company content saved successfully', data })
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
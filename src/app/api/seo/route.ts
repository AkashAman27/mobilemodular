import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    
    if (path) {
      // Get SEO data for specific path
      const { data, error } = await supabase
        .from('seo_pages')
        .select('*')
        .eq('page_path', path)
        .maybeSingle()

      if (error) {
        console.error('Error fetching SEO data:', error)
        return NextResponse.json({ error: 'Failed to fetch SEO data' }, { status: 500 })
      }

      return NextResponse.json(data || {})
    } else {
      // Get all SEO pages
      const { data, error } = await supabase
        .from('seo_pages')
        .select('*')
        .order('page_path', { ascending: true })

      if (error) {
        console.error('Error fetching SEO pages:', error)
        return NextResponse.json({ error: 'Failed to fetch SEO pages' }, { status: 500 })
      }

      return NextResponse.json(data || [])
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      page_path,
      page_title,
      seo_title,
      seo_description,
      seo_keywords,
      canonical_url,
      robots_index,
      robots_follow,
      robots_nosnippet,
      og_title,
      og_description,
      og_image,
      og_image_alt,
      twitter_title,
      twitter_description,
      twitter_image,
      twitter_image_alt,
      structured_data_type,
      custom_json_ld,
      focus_keyword,
      is_active
    } = body

    if (!page_path || !page_title) {
      return NextResponse.json(
        { error: 'page_path and page_title are required' },
        { status: 400 }
      )
    }

    // Check if SEO data already exists for this path
    const { data: existing } = await supabase
      .from('seo_pages')
      .select('id')
      .eq('page_path', page_path)
      .maybeSingle()

    if (existing) {
      // Update existing record
      const { data, error } = await supabase
        .from('seo_pages')
        .update({
          page_title,
          seo_title,
          seo_description,
          seo_keywords,
          canonical_url,
          robots_index: robots_index !== undefined ? robots_index : true,
          robots_follow: robots_follow !== undefined ? robots_follow : true,
          robots_nosnippet: robots_nosnippet || false,
          og_title,
          og_description,
          og_image,
          og_image_alt,
          twitter_title,
          twitter_description,
          twitter_image,
          twitter_image_alt,
          structured_data_type,
          custom_json_ld,
          focus_keyword,
          is_active: is_active !== undefined ? is_active : true,
          last_modified: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('id', existing.id)
        .select()
        .single()

      if (error) {
        console.error('Error updating SEO data:', error)
        return NextResponse.json({ error: 'Failed to update SEO data' }, { status: 500 })
      }

      return NextResponse.json(data)
    } else {
      // Create new record
      const { data, error } = await supabase
        .from('seo_pages')
        .insert([{
          page_path,
          page_title,
          seo_title,
          seo_description,
          seo_keywords,
          canonical_url,
          robots_index: robots_index !== undefined ? robots_index : true,
          robots_follow: robots_follow !== undefined ? robots_follow : true,
          robots_nosnippet: robots_nosnippet || false,
          og_title,
          og_description,
          og_image,
          og_image_alt,
          twitter_title,
          twitter_description,
          twitter_image,
          twitter_image_alt,
          structured_data_type,
          custom_json_ld,
          focus_keyword,
          is_active: is_active !== undefined ? is_active : true,
          last_modified: new Date().toISOString()
        }])
        .select()
        .single()

      if (error) {
        console.error('Error creating SEO data:', error)
        return NextResponse.json({ error: 'Failed to create SEO data' }, { status: 500 })
      }

      return NextResponse.json(data, { status: 201 })
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
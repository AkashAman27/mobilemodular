import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

const supabase = createClient(supabaseUrl, supabaseKey)

export async function PUT(
  request: NextRequest,
  { params }: { params: { path: string } }
) {
  try {
    const path = decodeURIComponent(params.path)
    const body = await request.json()

    const {
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

    if (!page_title) {
      return NextResponse.json(
        { error: 'page_title is required' },
        { status: 400 }
      )
    }

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
      .eq('page_path', path)
      .select()
      .maybeSingle()

    if (error) {
      console.error('Error updating SEO data:', error)
      return NextResponse.json({ error: 'Failed to update SEO data' }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: 'SEO data not found' }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { path: string } }
) {
  try {
    const path = decodeURIComponent(params.path)

    const { error } = await supabase
      .from('seo_pages')
      .delete()
      .eq('page_path', path)

    if (error) {
      console.error('Error deleting SEO data:', error)
      return NextResponse.json({ error: 'Failed to delete SEO data' }, { status: 500 })
    }

    return NextResponse.json({ message: 'SEO data deleted successfully' })
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
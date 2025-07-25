import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('seo_settings')
      .select('robots_txt')
      .eq('id', 1)
      .single()

    if (error) {
      console.error('Error fetching robots.txt:', error)
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      data: {
        content: data?.robots_txt || getDefaultRobotsContent()
      }
    })
  } catch (error) {
    console.error('Error in robots GET:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { content } = await request.json()
    
    if (!content) {
      return NextResponse.json({ success: false, error: 'Content is required' }, { status: 400 })
    }

    // First try to update existing record
    const { data: existingData, error: fetchError } = await supabase
      .from('seo_settings')
      .select('id')
      .eq('id', 1)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking existing robots.txt:', fetchError)
      return NextResponse.json({ success: false, error: fetchError.message }, { status: 500 })
    }

    let result
    if (existingData) {
      // Update existing record
      result = await supabase
        .from('seo_settings')
        .update({ 
          robots_txt: content,
          updated_at: new Date().toISOString()
        })
        .eq('id', 1)
    } else {
      // Insert new record
      result = await supabase
        .from('seo_settings')
        .insert({ 
          id: 1,
          robots_txt: content,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
    }

    if (result.error) {
      console.error('Error saving robots.txt:', result.error)
      return NextResponse.json({ success: false, error: result.error.message }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Robots.txt saved successfully',
      data: { content }
    })
  } catch (error) {
    console.error('Error in robots POST:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

function getDefaultRobotsContent(): string {
  return `# Robots.txt for Modular Building Solutions
# Generated automatically - ${new Date().toLocaleString()}

User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /_next/
Disallow: /temp/

User-agent: Googlebot
Allow: /
Disallow: /admin/
Disallow: /private/
Crawl-delay: 1

Sitemap: https://mobilemodular.vercel.app/sitemap.xml`
}
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('seo_settings')
      .select('robots_txt')
      .eq('id', 1)
      .single()

    let robotsContent = ''
    
    if (error || !data?.robots_txt) {
      // Return default robots.txt if no custom one exists
      robotsContent = getDefaultRobotsContent()
    } else {
      robotsContent = data.robots_txt
    }

    return new NextResponse(robotsContent, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error serving robots.txt:', error)
    
    // Return default robots.txt on error
    const defaultContent = getDefaultRobotsContent()
    return new NextResponse(defaultContent, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'public, max-age=300', // Shorter cache on error
      },
    })
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
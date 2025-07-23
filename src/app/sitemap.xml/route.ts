import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get all active solutions, industries, locations, etc.
    const [solutionsResult, industriesResult, locationsResult, newsResult] = await Promise.all([
      supabase.from('solutions').select('slug, updated_at').eq('is_active', true),
      supabase.from('industries').select('slug, updated_at').eq('is_active', true),
      supabase.from('locations').select('slug, updated_at').eq('is_active', true),
      supabase.from('news_insights').select('slug, updated_at').eq('is_active', true)
    ])

    const baseUrl = 'https://mobilemodular.vercel.app'
    const currentDate = new Date().toISOString()

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Static Pages -->
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/solutions</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/industries</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/locations</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/quote</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/our-process</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/quality-standards</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${baseUrl}/news-insights</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/faqs</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>${baseUrl}/resources/planning-tools</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`

    // Add solution pages
    if (solutionsResult.data) {
      solutionsResult.data.forEach(solution => {
        sitemap += `
  <url>
    <loc>${baseUrl}/solutions/${solution.slug}</loc>
    <lastmod>${solution.updated_at || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
      })
    }

    // Add industry pages
    if (industriesResult.data) {
      industriesResult.data.forEach(industry => {
        sitemap += `
  <url>
    <loc>${baseUrl}/industries/${industry.slug}</loc>
    <lastmod>${industry.updated_at || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
      })
    }

    // Add location pages
    if (locationsResult.data) {
      locationsResult.data.forEach(location => {
        sitemap += `
  <url>
    <loc>${baseUrl}/locations/${location.slug}</loc>
    <lastmod>${location.updated_at || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
      })
    }

    // Add news/blog pages
    if (newsResult.data) {
      newsResult.data.forEach(article => {
        sitemap += `
  <url>
    <loc>${baseUrl}/news-insights/${article.slug}</loc>
    <lastmod>${article.updated_at || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
      })
    }

    sitemap += `
</urlset>`

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Return basic sitemap on error
    const basicSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mobilemodular.vercel.app</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`

    return new NextResponse(basicSitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300', // Shorter cache on error
      },
    })
  }
}
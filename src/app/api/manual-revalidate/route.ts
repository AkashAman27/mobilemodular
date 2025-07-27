import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const path = searchParams.get('path')
    
    const revalidatedPaths = []
    
    if (path) {
      // Revalidate specific path if provided
      revalidatePath(path)
      revalidatedPaths.push(path)
    } else {
      // Revalidate all common CMS pages and their layouts
      const commonPaths = [
        '/',                           // Homepage
        '/layout',                     // Layout changes (header/footer)
        '/about',                      // About page
        '/contact',                    // Contact page
        '/solutions',                  // Solutions main page
        '/solutions/office-buildings', // Solution pages
        '/solutions/healthcare-facilities',
        '/solutions/portable-classrooms',
        '/solutions/restaurant-food-service',
        '/solutions/restroom-facilities',
        '/solutions/security-buildings',
        '/industries',                 // Industries main page
        '/resources',                  // Resources pages
        '/resources/live-inventory',   // Live inventory
        '/our-process',                // Our process page
        '/quality-standards',          // Quality standards
        '/news-insights',              // News & insights
      ]
      
      for (const p of commonPaths) {
        revalidatePath(p)
        revalidatedPaths.push(p)
      }
    }
    
    return NextResponse.json({
      success: true,
      message: path 
        ? `Cache cleared for ${path}` 
        : `Successfully synced ${revalidatedPaths.length} pages`,
      revalidated_paths: revalidatedPaths,
      revalidated_count: revalidatedPaths.length,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      instruction: 'Content changes are now live - refresh pages to see updates',
      usage: 'Add ?path=/specific-page to revalidate just one page'
    })
  } catch (error) {
    console.error('Manual revalidation failed:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to clear cache',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
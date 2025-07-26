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
      // Revalidate all common CMS pages
      const commonPaths = [
        '/',              // Homepage
        '/layout',        // Layout changes (header/footer)
        '/about',         // About page
        '/contact',       // Contact page
        '/solutions',     // Solutions page
        '/industries',    // Industries
        '/industries/[slug]', // Dynamic industry pages
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
        : 'All CMS content cache cleared successfully',
      revalidated_paths: revalidatedPaths,
      timestamp: new Date().toISOString(),
      instruction: 'Refresh any affected pages - changes should appear immediately',
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
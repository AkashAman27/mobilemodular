import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    // Revalidate the homepage immediately
    revalidatePath('/')
    
    return NextResponse.json({
      success: true,
      message: 'Homepage cache cleared successfully',
      timestamp: new Date().toISOString(),
      instruction: 'Refresh your homepage now - changes should appear immediately'
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
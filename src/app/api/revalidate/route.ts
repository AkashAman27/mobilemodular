import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { path, tag } = await request.json()

    if (path) {
      // Revalidate specific path
      revalidatePath(path)
      console.log(`✅ Revalidated path: ${path}`)
    }

    if (tag) {
      // Revalidate by tag
      revalidateTag(tag)
      console.log(`✅ Revalidated tag: ${tag}`)
    }

    // Always revalidate homepage when CMS content changes
    revalidatePath('/')
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      path: path || '/',
      tag
    })

  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json({ 
      error: 'Failed to revalidate' 
    }, { status: 500 })
  }
}
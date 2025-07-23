import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { error: 'Missing Supabase configuration' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    const outputDir = path.join(process.cwd(), 'output')
    
    if (!fs.existsSync(outputDir)) {
      return NextResponse.json(
        { error: 'Output directory not found' },
        { status: 404 }
      )
    }

    // Get all WebP files from output directory
    const files = fs.readdirSync(outputDir).filter(file => file.endsWith('.webp'))
    
    const results = []
    let uploadedCount = 0
    let errorCount = 0

    for (const filename of files) {
      try {
        const filePath = path.join(outputDir, filename)
        const fileBuffer = fs.readFileSync(filePath)
        
        // Extract the clean name (remove timestamp suffix)
        const cleanName = filename.replace(/_\d{8}_\d{6}\.webp$/, '.webp')
        const storagePath = `generated/${cleanName}`

        const { data, error } = await supabase.storage
          .from('images')
          .upload(storagePath, fileBuffer, {
            contentType: 'image/webp',
            upsert: true
          })

        if (error) {
          console.error(`Error uploading ${filename}:`, error.message)
          results.push({
            filename,
            status: 'error',
            error: error.message
          })
          errorCount++
        } else {
          const publicUrl = `${supabaseUrl}/storage/v1/object/public/images/${storagePath}`
          results.push({
            filename,
            cleanName,
            storagePath,
            publicUrl,
            status: 'success'
          })
          uploadedCount++
        }

      } catch (err: any) {
        console.error(`Error processing ${filename}:`, err.message)
        results.push({
          filename,
          status: 'error',
          error: err.message
        })
        errorCount++
      }
    }

    return NextResponse.json({
      success: true,
      summary: {
        total: files.length,
        uploaded: uploadedCount,
        errors: errorCount
      },
      results
    })

  } catch (error: any) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Failed to upload images', details: error.message },
      { status: 500 }
    )
  }
}
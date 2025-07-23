const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

async function uploadImages() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !anonKey) {
    console.error('Missing Supabase credentials in .env.local')
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, anonKey)

  const outputDir = path.join(__dirname, '..', 'output')
  
  if (!fs.existsSync(outputDir)) {
    console.error('Output directory not found:', outputDir)
    process.exit(1)
  }

  console.log('🚀 Starting image upload to Supabase...')
  
  // Get all WebP files from output directory
  const files = fs.readdirSync(outputDir).filter(file => file.endsWith('.webp'))
  console.log(`📁 Found ${files.length} WebP images to upload`)

  let uploadedCount = 0
  let errorCount = 0

  for (const filename of files) {
    try {
      const filePath = path.join(outputDir, filename)
      const fileBuffer = fs.readFileSync(filePath)
      
      // Extract the clean name (remove timestamp suffix)
      const cleanName = filename.replace(/_\d{8}_\d{6}\.webp$/, '.webp')
      const storagePath = `generated/${cleanName}`

      console.log(`📤 Uploading: ${filename} -> ${storagePath}`)

      const { data, error } = await supabase.storage
        .from('images')
        .upload(storagePath, fileBuffer, {
          contentType: 'image/webp',
          upsert: true // Allow overwriting existing files
        })

      if (error) {
        console.error(`❌ Error uploading ${filename}:`, error.message)
        errorCount++
      } else {
        console.log(`✅ Uploaded: ${storagePath}`)
        uploadedCount++
      }

    } catch (err) {
      console.error(`❌ Error processing ${filename}:`, err.message)
      errorCount++
    }
  }

  console.log(`\n📊 Upload Summary:`)
  console.log(`   ✅ Successfully uploaded: ${uploadedCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log(`   📁 Total files: ${files.length}`)

  if (uploadedCount > 0) {
    console.log(`\n🌐 Images are now accessible at:`)
    console.log(`${supabaseUrl}/storage/v1/object/public/images/generated/[filename].webp`)
  }
}

uploadImages().catch(console.error)
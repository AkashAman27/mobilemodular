const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

async function simpleUpload() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !anonKey) {
    console.error('Missing Supabase credentials in .env.local')
    process.exit(1)
  }

  console.log('🚀 Attempting upload with anon key...')
  console.log('📝 Note: If RLS is blocking uploads, please disable it manually in Supabase dashboard')
  console.log('   Dashboard > Storage > images bucket > Settings > Disable RLS')

  const supabase = createClient(supabaseUrl, anonKey)

  const outputDir = path.join(__dirname, '..', 'output')
  
  if (!fs.existsSync(outputDir)) {
    console.error('❌ Output directory not found:', outputDir)
    process.exit(1)
  }

  // Get all WebP files from output directory
  const files = fs.readdirSync(outputDir).filter(file => file.endsWith('.webp'))
  console.log(`📁 Found ${files.length} WebP images to upload`)

  let uploadedCount = 0
  let errorCount = 0
  const uploadResults = []

  // Try uploading just the first few files as a test
  const testFiles = files.slice(0, 5)
  console.log(`🧪 Testing with first ${testFiles.length} files...`)

  for (const filename of testFiles) {
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
          upsert: true
        })

      if (error) {
        console.error(`❌ Error uploading ${filename}:`, error.message)
        
        if (error.message.includes('row-level security') || error.message.includes('RLS')) {
          console.log(`\n🔒 RLS is blocking uploads!`)
          console.log(`Please go to Supabase Dashboard and:`)
          console.log(`1. Go to Storage > images bucket`)
          console.log(`2. Click on Settings/Policies`)
          console.log(`3. Temporarily disable RLS or add a policy allowing public uploads`)
          console.log(`4. Or run this SQL in the SQL editor:`)
          console.log(`   ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;`)
          return
        }
        
        errorCount++
      } else {
        const publicUrl = `${supabaseUrl}/storage/v1/object/public/images/${storagePath}`
        console.log(`✅ Uploaded: ${storagePath}`)
        uploadResults.push({
          filename,
          cleanName,
          storagePath,
          publicUrl,
          status: 'success'
        })
        uploadedCount++
      }

    } catch (err) {
      console.error(`❌ Error processing ${filename}:`, err.message)
      errorCount++
    }
  }

  if (uploadedCount > 0) {
    console.log(`\n✅ Test successful! ${uploadedCount} files uploaded`)
    console.log(`🚀 Proceeding with full upload...`)
    
    // Upload remaining files
    const remainingFiles = files.slice(5)
    
    for (const filename of remainingFiles) {
      try {
        const filePath = path.join(outputDir, filename)
        const fileBuffer = fs.readFileSync(filePath)
        
        const cleanName = filename.replace(/_\d{8}_\d{6}\.webp$/, '.webp')
        const storagePath = `generated/${cleanName}`

        console.log(`📤 Uploading: ${filename} -> ${storagePath}`)

        const { data, error } = await supabase.storage
          .from('images')
          .upload(storagePath, fileBuffer, {
            contentType: 'image/webp',
            upsert: true
          })

        if (error) {
          console.error(`❌ Error uploading ${filename}:`, error.message)
          errorCount++
        } else {
          const publicUrl = `${supabaseUrl}/storage/v1/object/public/images/${storagePath}`
          console.log(`✅ Uploaded: ${storagePath}`)
          uploadResults.push({
            filename,
            cleanName,
            storagePath,
            publicUrl,
            status: 'success'
          })
          uploadedCount++
        }

      } catch (err) {
        console.error(`❌ Error processing ${filename}:`, err.message)
        errorCount++
      }
    }
  }

  console.log(`\n📊 Final Upload Summary:`)
  console.log(`   ✅ Successfully uploaded: ${uploadedCount}`)
  console.log(`   ❌ Errors: ${errorCount}`)
  console.log(`   📁 Total files: ${files.length}`)

  if (uploadedCount > 0) {
    console.log(`\n🌐 Images are accessible at:`)
    console.log(`${supabaseUrl}/storage/v1/object/public/images/generated/[filename].webp`)
    
    // Create Supabase mapping
    const supabaseMapping = {}
    uploadResults.forEach(result => {
      if (result.status === 'success') {
        const keyName = result.cleanName.replace('.webp', '')
        supabaseMapping[keyName] = result.publicUrl
      }
    })
    
    const mappingPath = path.join(__dirname, '..', 'src', 'data', 'supabase-image-mapping.json')
    fs.writeFileSync(mappingPath, JSON.stringify(supabaseMapping, null, 2))
    console.log(`🗂️  Supabase mapping saved: ${mappingPath}`)
  }
}

simpleUpload().catch(console.error)
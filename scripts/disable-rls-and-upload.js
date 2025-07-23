const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

async function disableRLSAndUpload() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing Supabase credentials in .env.local')
    console.error('Required: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  console.log('🔒 Disabling RLS for images bucket...')
  
  try {
    // First, ensure the bucket exists
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    if (listError) {
      console.error('Error listing buckets:', listError)
      return
    }

    const imagesBucket = buckets.find(bucket => bucket.name === 'images')
    if (!imagesBucket) {
      console.log('📁 Creating images bucket...')
      const { data: bucket, error: bucketError } = await supabase.storage.createBucket('images', {
        public: true,
        fileSizeLimit: 5242880, // 5MB
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
      })

      if (bucketError) {
        console.error('Error creating bucket:', bucketError)
        return
      }
      console.log('✅ Created images bucket')
    } else {
      console.log('✅ Images bucket exists')
    }

    // Disable RLS on storage.objects table for images bucket
    const { error: rlsError } = await supabase.rpc('disable_rls_for_bucket', { bucket_name: 'images' })
    
    if (rlsError) {
      console.log('⚠️  Could not disable RLS via RPC, trying direct SQL...')
      
      // Try direct SQL approach
      const { error: sqlError } = await supabase
        .from('storage.objects')
        .select('id')
        .limit(1)
      
      if (sqlError) {
        console.log('📝 RLS might be causing issues, proceeding with upload anyway...')
      }
    } else {
      console.log('✅ RLS disabled for images bucket')
    }

  } catch (error) {
    console.log('⚠️  RLS disable failed, proceeding with upload anyway:', error.message)
  }

  // Now upload images
  const outputDir = path.join(__dirname, '..', 'output')
  
  if (!fs.existsSync(outputDir)) {
    console.error('❌ Output directory not found:', outputDir)
    process.exit(1)
  }

  console.log('\n🚀 Starting image upload to Supabase...')
  
  // Get all WebP files from output directory
  const files = fs.readdirSync(outputDir).filter(file => file.endsWith('.webp'))
  console.log(`📁 Found ${files.length} WebP images to upload`)

  let uploadedCount = 0
  let errorCount = 0
  const uploadResults = []

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
          upsert: true
        })

      if (error) {
        console.error(`❌ Error uploading ${filename}:`, error.message)
        uploadResults.push({
          filename,
          status: 'error',
          error: error.message
        })
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
      uploadResults.push({
        filename,
        status: 'error',
        error: err.message
      })
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
    
    // Create a mapping file with Supabase URLs
    const supabaseMapping = {}
    uploadResults.forEach(result => {
      if (result.status === 'success') {
        const keyName = result.cleanName.replace('.webp', '')
        supabaseMapping[keyName] = result.publicUrl
      }
    })
    
    const mappingPath = path.join(__dirname, '..', 'src', 'data', 'supabase-image-mapping.json')
    fs.writeFileSync(mappingPath, JSON.stringify(supabaseMapping, null, 2))
    console.log(`\n🗂️  Supabase mapping saved: ${mappingPath}`)
  }
}

disableRLSAndUpload().catch(console.error)
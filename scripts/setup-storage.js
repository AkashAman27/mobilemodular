const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

async function setupStorage() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL')
    process.exit(1)
  }

  if (!serviceRoleKey || serviceRoleKey === 'your_service_role_key_here') {
    console.log('\n📋 SUPABASE STORAGE SETUP INSTRUCTIONS')
    console.log('=====================================\n')
    
    console.log('Since you don\'t have the service role key configured, please follow these manual steps:\n')
    
    console.log('1. Go to your Supabase Dashboard: https://supabase.com/dashboard')
    console.log('2. Select your project: ' + supabaseUrl.replace('https://', '').replace('.supabase.co', ''))
    console.log('3. Navigate to Storage > Buckets')
    console.log('4. Create a new bucket with these settings:')
    console.log('   - Name: "images"')
    console.log('   - Public: Yes (checked)')
    console.log('   - File size limit: 5MB')
    console.log('   - Allowed MIME types: image/jpeg, image/png, image/webp')
    console.log('\n5. Create the following folders in the bucket:')
    console.log('   - uploads/')
    console.log('   - solutions/')
    console.log('   - specifications/')
    console.log('   - included/')
    console.log('\n6. Set up RLS (Row Level Security) policies:')
    console.log('   Go to Storage > Policies and create these policies:')
    console.log('\n   Policy 1: "Allow public read access"')
    console.log('   - Operation: SELECT')
    console.log('   - Target roles: public')
    console.log('   - Policy definition: true')
    console.log('\n   Policy 2: "Allow authenticated uploads"')
    console.log('   - Operation: INSERT')
    console.log('   - Target roles: authenticated')
    console.log('   - Policy definition: true')
    console.log('\n   Policy 3: "Allow authenticated updates"')
    console.log('   - Operation: UPDATE')  
    console.log('   - Target roles: authenticated')
    console.log('   - Policy definition: true')
    console.log('\n   Policy 4: "Allow authenticated deletes"')
    console.log('   - Operation: DELETE')
    console.log('   - Target roles: authenticated')
    console.log('   - Policy definition: true')
    
    console.log('\n7. Test the setup by uploading an image through the admin interface')
    console.log('\n✅ After completing these steps, your image upload functionality will work!')
    
    return
  }

  // If we have the service role key, try to set up programmatically
  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })

  try {
    console.log('Setting up Supabase Storage...')

    // Try to create the images bucket
    const { data: bucket, error: bucketError } = await supabase.storage.createBucket('images', {
      public: true,
      fileSizeLimit: 5242880, // 5MB
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp']
    })

    if (bucketError && !bucketError.message.includes('already exists')) {
      console.error('Error creating bucket:', bucketError)
      return
    }

    if (bucket) {
      console.log('✅ Created images bucket')
    } else {
      console.log('✅ Images bucket already exists')
    }

    console.log('\n📁 Storage bucket "images" is ready!')
    console.log('Public URL format: ' + supabaseUrl + '/storage/v1/object/public/images/uploads/filename.jpg')
    console.log('\n🔧 You can now use the image upload component in your admin forms!')

  } catch (error) {
    console.error('Error setting up storage:', error)
  }
}

setupStorage()
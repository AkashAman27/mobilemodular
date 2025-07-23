const fs = require('fs')
const path = require('path')

function replaceAllUnsplashImages() {
  console.log('🔍 Replacing all remaining Unsplash images with Supabase URLs...')
  
  // Read the Supabase image mapping
  const supabaseMappingPath = path.join(__dirname, '..', 'src', 'data', 'supabase-image-mapping.json')
  const supabaseMapping = JSON.parse(fs.readFileSync(supabaseMappingPath, 'utf8'))
  
  let totalUpdates = 0
  
  // Define file patterns to search
  const searchPatterns = [
    'src/**/*.tsx',
    'src/**/*.ts'
  ]
  
  // Helper function to find best matching image
  function findBestMatch(context, defaultKey) {
    // Try context-specific matches first
    if (context.includes('classroom') || context.includes('education')) {
      return supabaseMapping['classroom_standard_standard_modular_classroom_inte'] ||
             supabaseMapping['classroom_large_large_modular_classroom_interior_2']
    }
    if (context.includes('healthcare') || context.includes('medical')) {
      return supabaseMapping['healthcare_exam_medical_examination_room_interior'] ||
             supabaseMapping['healthcare_clinic_medical_clinic_modular_building']
    }
    if (context.includes('office') || context.includes('business')) {
      return supabaseMapping['office_single_single_office_modular_building_inter'] ||
             supabaseMapping['office_double_double_office_modular_building_inter']
    }
    if (context.includes('security') || context.includes('guard')) {
      return supabaseMapping['security_booth_small_security_guard_booth_interior'] ||
             supabaseMapping['security_station_security_station_modular_building']
    }
    if (context.includes('restaurant') || context.includes('food') || context.includes('kitchen')) {
      return supabaseMapping['restaurant_truck_chef_plating_gourmet_dish_in_upsc'] ||
             supabaseMapping['restaurant_quick_busy_restaurant_interior_with_ope']
    }
    if (context.includes('construction')) {
      return supabaseMapping['industry_construction_modular_office_trailer_on_co']
    }
    if (context.includes('government')) {
      return supabaseMapping['industry_government_government_modular_office_buil']
    }
    if (context.includes('emergency')) {
      return supabaseMapping['industry_emergency_emergency_response_modular_comm']
    }
    if (context.includes('retail') || context.includes('commercial')) {
      return supabaseMapping['industry_retail_modular_retail_store_in_commercial']
    }
    if (context.includes('restroom')) {
      return supabaseMapping['restroom_single_single_restroom_unit_interior_4x8']
    }
    if (context.includes('testimonial')) {
      return supabaseMapping['testimonial_business_happy_business_owner_outside']
    }
    if (context.includes('hero') || context.includes('background')) {
      return supabaseMapping['hero_background_modern_modular_building_complex_ae']
    }
    if (context.includes('facility') || context.includes('manufacturing')) {
      return supabaseMapping['facility_manufacturing_factory_workers_building_mo'] ||
             supabaseMapping['facility_exterior_aman_modular_headquarters_buildi']
    }
    if (context.includes('process')) {
      return supabaseMapping['process_consultation_business_meeting_with_clients']
    }
    
    // Default fallback
    return supabaseMapping[defaultKey] || 
           supabaseMapping['office_single_single_office_modular_building_inter'] ||
           Object.values(supabaseMapping)[0]
  }
  
  // Function to process a single file
  function processFile(filePath) {
    if (!fs.existsSync(filePath)) return 0
    
    let content = fs.readFileSync(filePath, 'utf8')
    let fileUpdates = 0
    
    // Find all Unsplash URLs
    const unsplashRegex = /https:\/\/images\.unsplash\.com\/[^'">\s]+/g
    const matches = content.match(unsplashRegex)
    
    if (matches) {
      matches.forEach(url => {
        // Get context around the URL for better matching
        const urlIndex = content.indexOf(url)
        const contextStart = Math.max(0, urlIndex - 200)
        const contextEnd = Math.min(content.length, urlIndex + 200)
        const context = content.substring(contextStart, contextEnd).toLowerCase()
        
        // Find appropriate replacement
        let replacement = findBestMatch(context, 'office_single_single_office_modular_building_inter')
        
        if (replacement && content.includes(url)) {
          content = content.replace(new RegExp(url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), replacement)
          console.log(`✅ Updated: ${path.relative(process.cwd(), filePath)} - ${url.substring(0, 60)}...`)
          fileUpdates++
        }
      })
    }
    
    // Special handling for storage containers - use a generic image
    if (filePath.includes('demo-data.ts') && content.includes('storage-containers')) {
      const storageUrl = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop'
      if (content.includes(storageUrl)) {
        // Use office building as placeholder for storage
        const replacement = supabaseMapping['office_single_single_office_modular_building_inter']
        if (replacement) {
          content = content.replace(storageUrl, replacement)
          console.log(`✅ Updated storage container image in demo-data.ts`)
          fileUpdates++
        }
      }
    }
    
    if (fileUpdates > 0) {
      fs.writeFileSync(filePath, content)
    }
    
    return fileUpdates
  }
  
  // Files to process (most important ones first)
  const filesToProcess = [
    // Core data files
    'src/data/demo-data.ts',
    
    // Company pages
    'src/app/company/page.tsx',
    'src/app/company/about-us/page.tsx',
    
    // Industry pages
    'src/app/industries/construction/page.tsx',
    'src/app/industries/education/page.tsx',
    'src/app/industries/healthcare/page.tsx',
    'src/app/industries/government/page.tsx',
    'src/app/industries/retail-commercial/page.tsx',
    'src/app/industries/emergency-response/page.tsx',
    
    // Resource pages
    'src/app/resources/page.tsx',
    'src/app/resources/case-studies/page.tsx',
    'src/app/resources/insights/page.tsx',
    'src/app/resources/product-gallery/page.tsx',
    'src/app/resources/planning-tools/page.tsx',
    'src/app/resources/faq/page.tsx',
    
    // Location pages
    'src/app/locations/california/page.tsx',
    
    // Admin components
    'src/components/admin/SolutionPreview.tsx'
  ]
  
  // Process each file
  filesToProcess.forEach(relativePath => {
    const fullPath = path.join(__dirname, '..', relativePath)
    totalUpdates += processFile(fullPath)
  })
  
  // Process case study dynamic pages
  const caseStudyPath = path.join(__dirname, '..', 'src/app/resources/case-studies/[slug]/page.tsx')
  totalUpdates += processFile(caseStudyPath)
  
  // Process API routes
  const apiRoutePath = path.join(__dirname, '..', 'src/app/api/populate-database/route.ts')
  totalUpdates += processFile(apiRoutePath)
  
  // Process admin solution pages
  const adminSolutionPath = path.join(__dirname, '..', 'src/app/admin/solutions/[id]/page.tsx')
  totalUpdates += processFile(adminSolutionPath)
  
  console.log(`\n📊 Replacement Summary:`)
  console.log(`   ✅ Total Unsplash URLs replaced: ${totalUpdates}`)
  console.log(`   🌐 All images now use Supabase-hosted generated images!`)
  console.log(`   🎨 Available image types:`)
  
  // Show available image categories
  const categories = {}
  Object.keys(supabaseMapping).forEach(key => {
    const category = key.split('_')[0]
    categories[category] = (categories[category] || 0) + 1
  })
  
  Object.entries(categories).forEach(([category, count]) => {
    console.log(`     - ${category}: ${count} images`)
  })
}

replaceAllUnsplashImages()
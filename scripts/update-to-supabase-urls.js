const fs = require('fs')
const path = require('path')

function updateToSupabaseURLs() {
  console.log('🔄 Updating website to use Supabase image URLs...')
  
  // Read the Supabase image mapping
  const supabaseMappingPath = path.join(__dirname, '..', 'src', 'data', 'supabase-image-mapping.json')
  const supabaseMapping = JSON.parse(fs.readFileSync(supabaseMappingPath, 'utf8'))
  
  // Update demo data
  console.log('📝 Updating demo-data.ts...')
  const demoDataPath = path.join(__dirname, '..', 'src', 'data', 'demo-data.ts')
  let demoData = fs.readFileSync(demoDataPath, 'utf8')
  
  // Define mappings for different solution types
  const imageMappings = {
    'office-buildings': supabaseMapping['office_single_single_office_modular_building_inter'],
    'portable-classrooms': supabaseMapping['classroom_standard_standard_modular_classroom_inte'],
    'healthcare-facilities': supabaseMapping['healthcare_exam_medical_examination_room_interior'],
    'security-buildings': supabaseMapping['security_booth_small_security_guard_booth_interior'],
    'restaurant-facilities': supabaseMapping['restaurant_truck_chef_plating_gourmet_dish_in_upsc'],
    'restroom-facilities': supabaseMapping['restroom_single_single_restroom_unit_interior_4x8']
  }
  
  // Industry mappings
  const industryMappings = {
    'construction': supabaseMapping['industry_construction_modular_office_trailer_on_co'],
    'healthcare': supabaseMapping['industry_healthcare_modular_medical_building_at_ho'],
    'government': supabaseMapping['industry_government_government_modular_office_buil'],
    'retail': supabaseMapping['industry_retail_modular_retail_store_in_commercial'],
    'emergency': supabaseMapping['industry_emergency_emergency_response_modular_comm']
  }
  
  // Testimonial mappings
  const testimonialMappings = [
    supabaseMapping['testimonial_business_happy_business_owner_outside'],
    supabaseMapping['testimonial_education_school_principal_at_modular'],
    supabaseMapping['testimonial_healthcare_doctor_at_modular_medical_c']
  ]
  
  let updatedCount = 0
  
  // Update solution images
  for (const [solutionId, newImageUrl] of Object.entries(imageMappings)) {
    if (newImageUrl) {
      const oldPattern = new RegExp(`(id: '${solutionId}'[\\s\\S]*?)imageUrl: '[^']*'`, 'm')
      if (oldPattern.test(demoData)) {
        demoData = demoData.replace(oldPattern, `$1imageUrl: '${newImageUrl}'`)
        console.log(`✅ Updated ${solutionId} image`)
        updatedCount++
      }
    }
  }
  
  // Update industry images
  for (const [industryId, newImageUrl] of Object.entries(industryMappings)) {
    if (newImageUrl) {
      const oldPattern = new RegExp(`(id: '${industryId}'[\\s\\S]*?)imageUrl: '[^']*'`, 'm')
      if (oldPattern.test(demoData)) {
        demoData = demoData.replace(oldPattern, `$1imageUrl: '${newImageUrl}'`)
        console.log(`✅ Updated ${industryId} industry image`)
        updatedCount++
      }
    }
  }
  
  // Update testimonial images  
  const testimonialIds = ['1', '2', '3']
  testimonialIds.forEach((id, index) => {
    if (testimonialMappings[index]) {
      const oldPattern = new RegExp(`(id: '${id}'[\\s\\S]*?)imageUrl: '[^']*'`, 'm')
      if (oldPattern.test(demoData)) {
        demoData = demoData.replace(oldPattern, `$1imageUrl: '${testimonialMappings[index]}'`)
        console.log(`✅ Updated testimonial ${id} image`)
        updatedCount++
      }
    }
  })
  
  // Write the updated demo data back
  fs.writeFileSync(demoDataPath, demoData)
  
  // Update restaurant page
  console.log('📝 Updating restaurant-food-service page...')
  const restaurantPagePath = path.join(__dirname, '..', 'src', 'app', 'solutions', 'restaurant-food-service', 'page.tsx')
  let restaurantPage = fs.readFileSync(restaurantPagePath, 'utf8')
  
  // Update main restaurant configurations
  const restaurantSpecs = {
    'restaurant_truck_chef_plating_gourmet_dish_in_upsc': supabaseMapping['restaurant_truck_chef_plating_gourmet_dish_in_upsc'],
    'restaurant_quick_busy_restaurant_interior_with_ope': supabaseMapping['restaurant_quick_busy_restaurant_interior_with_ope'],
    'restaurant_full_couple_cooking_together_in_modern': supabaseMapping['restaurant_full_couple_cooking_together_in_modern'],
    'restaurant_catering_person_doing_yogaexercise_outd': supabaseMapping['restaurant_catering_person_doing_yogaexercise_outd']
  }
  
  // Update food service applications
  const foodApps = {
    'food_popup_chef_plating_gourmet_dish_in_upscale_re': supabaseMapping['food_popup_chef_plating_gourmet_dish_in_upscale_re'],
    'food_catering_ops_person_doing_yogaexercise_outdoo': supabaseMapping['food_catering_ops_person_doing_yogaexercise_outdoo'],
    'food_event_service_busy_restaurant_interior_with_o': supabaseMapping['food_event_service_busy_restaurant_interior_with_o'],
    'food_franchise_couple_cooking_together_in_modern_h': supabaseMapping['food_franchise_couple_cooking_together_in_modern_h']
  }
  
  // Replace local image paths with Supabase URLs
  for (const [key, url] of Object.entries({...restaurantSpecs, ...foodApps})) {
    if (url) {
      const localPattern = `/images/generated/${key}.webp`
      if (restaurantPage.includes(localPattern)) {
        restaurantPage = restaurantPage.replace(new RegExp(localPattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), url)
        console.log(`✅ Updated ${key} in restaurant page`)
        updatedCount++
      }
    }
  }
  
  fs.writeFileSync(restaurantPagePath, restaurantPage)
  
  console.log(`\n📊 Update Summary:`)
  console.log(`   ✅ Images updated: ${updatedCount}`)
  console.log(`   📁 Demo data updated: ${demoDataPath}`)
  console.log(`   📁 Restaurant page updated: ${restaurantPagePath}`)
  console.log(`\n🌐 Website now uses Supabase-hosted images!`)
}

updateToSupabaseURLs()
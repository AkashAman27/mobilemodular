const fs = require('fs')
const path = require('path')

function updateDemoDataImages() {
  console.log('🔄 Updating demo data with generated images...')
  
  // Read the image mapping
  const mappingPath = path.join(__dirname, '..', 'src', 'data', 'image-mapping.json')
  const imageMapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'))
  
  // Read the demo data file
  const demoDataPath = path.join(__dirname, '..', 'src', 'data', 'demo-data.ts')
  let demoData = fs.readFileSync(demoDataPath, 'utf8')
  
  // Define mappings for different solution types
  const imageMappings = {
    // Office Buildings
    'office-buildings': imageMapping['office_single_single_office_modular_building_inter'] || 
                       'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    
    // Portable Classrooms  
    'portable-classrooms': imageMapping['classroom_standard_standard_modular_classroom_inte'] ||
                          'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
    
    // Storage Containers (no generated image, keep original)
    'storage-containers': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
    
    // Healthcare Facilities
    'healthcare-facilities': imageMapping['healthcare_exam_medical_examination_room_interior'] ||
                            'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&h=600&fit=crop',
    
    // Security Buildings
    'security-buildings': imageMapping['security_booth_small_security_guard_booth_interior'] ||
                         'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
    
    // Restaurant & Food Service
    'restaurant-facilities': imageMapping['restaurant_truck_chef_plating_gourmet_dish_in_upsc'] ||
                            'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
    
    // Restroom Facilities
    'restroom-facilities': imageMapping['restroom_single_single_restroom_unit_interior_4x8'] ||
                          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop'
  }
  
  // Industry mappings
  const industryMappings = {
    'education': imageMapping['industry_education_modular_classroom_buildings_on_school'] ||
                'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    
    'construction': imageMapping['industry_construction_modular_office_trailer_on_co'] ||
                   'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    
    'healthcare': imageMapping['industry_healthcare_modular_medical_building_at_ho'] ||
                 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    
    'government': imageMapping['industry_government_government_modular_office_buil'] ||
                 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&h=600&fit=crop',
    
    'retail': imageMapping['industry_retail_modular_retail_store_in_commercial'] ||
             'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    
    'emergency': imageMapping['industry_emergency_emergency_response_modular_comm'] ||
                'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop'
  }
  
  // Testimonial mappings
  const testimonialMappings = {
    'testimonial-business': imageMapping['testimonial_business_happy_business_owner_outside'] ||
                           'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face',
    
    'testimonial-education': imageMapping['testimonial_education_school_principal_at_modular'] ||
                            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    
    'testimonial-healthcare': imageMapping['testimonial_healthcare_doctor_at_modular_medical_c'] ||
                             'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
  
  let updatedCount = 0
  
  // Update solution images
  for (const [solutionId, newImageUrl] of Object.entries(imageMappings)) {
    const oldPattern = new RegExp(`(id: '${solutionId}'[\\s\\S]*?)imageUrl: '[^']*'`, 'm')
    if (oldPattern.test(demoData)) {
      demoData = demoData.replace(oldPattern, `$1imageUrl: '${newImageUrl}'`)
      console.log(`✅ Updated ${solutionId} image`)
      updatedCount++
    }
  }
  
  // Update industry images
  for (const [industryId, newImageUrl] of Object.entries(industryMappings)) {
    const oldPattern = new RegExp(`(id: '${industryId}'[\\s\\S]*?)imageUrl: '[^']*'`, 'm')
    if (oldPattern.test(demoData)) {
      demoData = demoData.replace(oldPattern, `$1imageUrl: '${newImageUrl}'`)
      console.log(`✅ Updated ${industryId} industry image`)
      updatedCount++
    }
  }
  
  // Update testimonial images  
  const testimonialIds = ['1', '2', '3']
  const testimonialImages = Object.values(testimonialMappings)
  
  testimonialIds.forEach((id, index) => {
    if (testimonialImages[index]) {
      const oldPattern = new RegExp(`(id: '${id}'[\\s\\S]*?)imageUrl: '[^']*'`, 'm')
      if (oldPattern.test(demoData)) {
        demoData = demoData.replace(oldPattern, `$1imageUrl: '${testimonialImages[index]}'`)
        console.log(`✅ Updated testimonial ${id} image`)
        updatedCount++
      }
    }
  })
  
  // Write the updated demo data back
  fs.writeFileSync(demoDataPath, demoData)
  
  console.log(`\n📊 Update Summary:`)
  console.log(`   ✅ Images updated: ${updatedCount}`)
  console.log(`   📁 File updated: ${demoDataPath}`)
  console.log(`\n🎨 Demo data now uses generated images!`)
}

updateDemoDataImages()
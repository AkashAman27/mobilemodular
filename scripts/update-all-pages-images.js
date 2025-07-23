const fs = require('fs')
const path = require('path')

function updateAllPagesImages() {
  console.log('🎨 Updating all webpage images with Supabase URLs...')
  
  // Read the Supabase image mapping
  const supabaseMappingPath = path.join(__dirname, '..', 'src', 'data', 'supabase-image-mapping.json')
  const supabaseMapping = JSON.parse(fs.readFileSync(supabaseMappingPath, 'utf8'))
  
  let totalUpdates = 0

  // Update Healthcare Facilities page
  console.log('📝 Updating healthcare-facilities page...')
  const healthcarePage = path.join(__dirname, '..', 'src', 'app', 'solutions', 'healthcare-facilities', 'page.tsx')
  let healthcareContent = fs.readFileSync(healthcarePage, 'utf8')
  
  const healthcareSpecs = [
    { old: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop', new: supabaseMapping['healthcare_exam_medical_examination_room_interior'] },
    { old: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=300&fit=crop', new: supabaseMapping['healthcare_clinic_medical_clinic_modular_building'] },
    { old: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop', new: supabaseMapping['healthcare_emergency_emergency_medical_unit_interi'] },
    { old: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop', new: supabaseMapping['healthcare_complex_medical_complex_interior_24x48'] }
  ]
  
  const healthcareApplications = [
    { old: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop', new: supabaseMapping['healthcare_temp_clinic_temporary_medical_clinic_ex'] },
    { old: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=250&fit=crop', new: supabaseMapping['healthcare_emergency_response_emergency_response_m'] },
    { old: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=250&fit=crop', new: supabaseMapping['healthcare_hospital_expansion_hospital_campus_with'] },
    { old: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=250&fit=crop', new: supabaseMapping['healthcare_specialty_care_specialty_care_center_in'] }
  ]
  
  const healthcareHero = { old: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=400&fit=crop', new: supabaseMapping['hero_healthcare_modern_healthcare_facility_interio'] }
  const healthcareFeature = { old: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=600&h=400&fit=crop', new: supabaseMapping['feature_healthcare_healthcare_facility_with_medica'] }
  
  healthcareSpecs.concat(healthcareApplications, [healthcareHero, healthcareFeature]).forEach((item) => {
    const { old, new: newUrl } = item
    if (newUrl && healthcareContent.includes(old)) {
      healthcareContent = healthcareContent.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl)
      console.log(`✅ Updated healthcare image: ${old.substring(0, 50)}...`)
      totalUpdates++
    }
  })
  
  fs.writeFileSync(healthcarePage, healthcareContent)

  // Update Security Buildings page
  console.log('📝 Updating security-buildings page...')
  const securityPage = path.join(__dirname, '..', 'src', 'app', 'solutions', 'security-buildings', 'page.tsx')
  let securityContent = fs.readFileSync(securityPage, 'utf8')
  
  const securitySpecs = [
    { old: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop', new: supabaseMapping['security_booth_small_security_guard_booth_interior'] },
    { old: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop', new: supabaseMapping['security_station_security_station_modular_building'] },
    { old: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop', new: supabaseMapping['security_checkpoint_checkpoint_security_building_i'] },
    { old: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop', new: supabaseMapping['security_command_security_command_center_interior'] }
  ]
  
  const securityApplications = [
    { old: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop', new: supabaseMapping['security_corporate_corporate_campus_security_check'] },
    { old: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=250&fit=crop', new: supabaseMapping['security_government_government_facility_security_s'] },
    { old: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop', new: supabaseMapping['security_industrial_industrial_site_security_booth'] },
    { old: 'https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=400&h=250&fit=crop', new: supabaseMapping['security_event_event_security_command_center_festi'] }
  ]
  
  const securityHero = { old: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop', new: supabaseMapping['hero_security_modern_security_checkpoint_building'] }
  const securityFeature = { old: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop', new: supabaseMapping['feature_security_security_checkpoint_with_advanced'] }
  
  securitySpecs.concat(securityApplications, [securityHero, securityFeature]).forEach((item) => {
    const { old, new: newUrl } = item
    if (newUrl && securityContent.includes(old)) {
      securityContent = securityContent.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl)
      console.log(`✅ Updated security image: ${old.substring(0, 50)}...`)
      totalUpdates++
    }
  })
  
  fs.writeFileSync(securityPage, securityContent)

  // Update Portable Classrooms page
  console.log('📝 Updating portable-classrooms page...')
  const classroomPage = path.join(__dirname, '..', 'src', 'app', 'solutions', 'portable-classrooms', 'page.tsx')
  let classroomContent = fs.readFileSync(classroomPage, 'utf8')
  
  const classroomSpecs = [
    { old: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop', new: supabaseMapping['classroom_standard_standard_modular_classroom_inte'] },
    { old: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop', new: supabaseMapping['classroom_large_large_modular_classroom_interior_2'] },
    { old: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop', new: supabaseMapping['classroom_multipurpose_alt_multi_purpose_education'] },
    { old: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=300&fit=crop', new: supabaseMapping['classroom_standard_standard_modular_classroom_inte'] }
  ]
  
  const classroomHero = { old: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&h=400&fit=crop', new: supabaseMapping['classroom_standard_standard_modular_classroom_inte'] }
  const classroomFeature = { old: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&h=400&fit=crop', new: supabaseMapping['classroom_large_large_modular_classroom_interior_2'] }
  
  classroomSpecs.concat([classroomHero, classroomFeature]).forEach((item) => {
    const { old, new: newUrl } = item
    if (newUrl && classroomContent.includes(old)) {
      classroomContent = classroomContent.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl)
      console.log(`✅ Updated classroom image: ${old.substring(0, 50)}...`)
      totalUpdates++
    }
  })
  
  fs.writeFileSync(classroomPage, classroomContent)

  // Update Office Buildings page
  console.log('📝 Updating office-buildings page...')
  const officePage = path.join(__dirname, '..', 'src', 'app', 'solutions', 'office-buildings', 'page.tsx')
  let officeContent = fs.readFileSync(officePage, 'utf8')
  
  const officeSpecs = [
    { old: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop', new: supabaseMapping['office_single_single_office_modular_building_inter'] },
    { old: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop', new: supabaseMapping['office_double_double_office_modular_building_inter'] },
    { old: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop', new: supabaseMapping['office_conference_conference_room_modular_building'] },
    { old: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop', new: supabaseMapping['office_complex_multi_room_office_complex_interior'] }
  ]
  
  const officeFeature = { old: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop', new: supabaseMapping['feature_office_professional_office_interior_modern'] }
  
  officeSpecs.concat([officeFeature]).forEach((item) => {
    const { old, new: newUrl } = item
    if (newUrl && officeContent.includes(old)) {
      officeContent = officeContent.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl)
      console.log(`✅ Updated office image: ${old.substring(0, 50)}...`)
      totalUpdates++
    }
  })
  
  fs.writeFileSync(officePage, officeContent)

  // Update Restroom Facilities page
  console.log('📝 Updating restroom-facilities page...')
  const restroomPage = path.join(__dirname, '..', 'src', 'app', 'solutions', 'restroom-facilities', 'page.tsx')
  let restroomContent = fs.readFileSync(restroomPage, 'utf8')
  
  const restroomSpecs = [
    { old: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop', new: supabaseMapping['restroom_single_single_restroom_unit_interior_4x8'] },
    { old: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop', new: supabaseMapping['restroom_double_double_restroom_unit_interior_8x8'] },
    { old: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop', new: supabaseMapping['restroom_ada_ada_accessible_restroom_interior_8x10'] },
    { old: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&h=300&fit=crop', new: supabaseMapping['restroom_complex_multi_stall_restroom_complex_inte'] }
  ]
  
  const restroomFeature = { old: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=600&h=400&fit=crop', new: supabaseMapping['feature_restroom_professional_restroom_facility_cl'] }
  
  restroomSpecs.concat([restroomFeature]).forEach((item) => {
    const { old, new: newUrl } = item
    if (newUrl && restroomContent.includes(old)) {
      restroomContent = restroomContent.replace(new RegExp(old.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl)
      console.log(`✅ Updated restroom image: ${old.substring(0, 50)}...`)
      totalUpdates++
    }
  })
  
  fs.writeFileSync(restroomPage, restroomContent)

  // Update Our Process page
  console.log('📝 Updating our-process page...')
  const processPage = path.join(__dirname, '..', 'src', 'app', 'company', 'our-process', 'page.tsx')
  if (fs.existsSync(processPage)) {
    let processContent = fs.readFileSync(processPage, 'utf8')
    
    // Process step images
    const processSteps = [
      { pattern: /consultation.*?image:\s*['"]([^'"]+)['"]/gi, replacement: supabaseMapping['process_consultation_business_meeting_with_clients'] },
      { pattern: /design.*?image:\s*['"]([^'"]+)['"]/gi, replacement: supabaseMapping['process_design_engineers_designing_modular_buildin'] },
      { pattern: /manufacturing.*?image:\s*['"]([^'"]+)['"]/gi, replacement: supabaseMapping['process_manufacturing_workers_assembling_modular_u'] },
      { pattern: /delivery.*?image:\s*['"]([^'"]+)['"]/gi, replacement: supabaseMapping['process_delivery_truck_transporting_modular_buildi'] },
      { pattern: /installation.*?image:\s*['"]([^'"]+)['"]/gi, replacement: supabaseMapping['process_installation_crane_placing_modular_buildin'] },
      { pattern: /inspection.*?image:\s*['"]([^'"]+)['"]/gi, replacement: supabaseMapping['process_inspection_final_walkthrough_with_client_q'] }
    ]
    
    processSteps.forEach(({ pattern, replacement }) => {
      if (replacement) {
        const matches = processContent.match(pattern)
        if (matches) {
          matches.forEach(match => {
            const newMatch = match.replace(/image:\s*['"]([^'"]+)['"]/, `image: '${replacement}'`)
            processContent = processContent.replace(match, newMatch)
            console.log(`✅ Updated process step image`)
            totalUpdates++
          })
        }
      }
    })
    
    fs.writeFileSync(processPage, processContent)
  }

  console.log(`\n📊 Update Summary:`)
  console.log(`   ✅ Total images updated: ${totalUpdates}`)
  console.log(`   📁 Pages updated:`)
  console.log(`     - Healthcare Facilities`)
  console.log(`     - Security Buildings`)
  console.log(`     - Portable Classrooms`)
  console.log(`     - Office Buildings`)
  console.log(`     - Restroom Facilities`)
  console.log(`     - Restaurant & Food Service (already done)`)
  console.log(`     - Our Process (if exists)`)
  console.log(`\n🎨 All webpages now use Supabase-hosted generated images!`)
}

updateAllPagesImages()
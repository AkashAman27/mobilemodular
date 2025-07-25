import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🎨 Fixing duplicate inventory images...')

    // Fix specific duplicates identified in the analysis
    const duplicateFixes = [
      {
        // For the 4 items using the same corporate office image
        originalUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
        targetItems: ['Startup Incubator', 'Executive Complex'], // Keep Corporate Headquarters and Compact Executive Office as-is
        newImages: [
          'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_conference_conference_room_modular_building.webp',
          'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_complex_multi_room_office_complex_interior.webp'
        ]
      },
      {
        // For the 3 items using the same office interior image
        originalUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        targetItems: ['24\' x 10\' Standard Office Module'], // Keep the other two as-is since they're more specific
        newImages: [
          'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/feature_office_professional_office_interior_modern.webp'
        ]
      },
      {
        // For the 2 items using the same workspace image
        originalUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
        targetItems: ['Solo Workspace Pod'], // Keep Freelancer Studio as-is
        newImages: [
          'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
        ]
      },
      {
        // For the 2 items using government building image
        originalUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp',
        targetItems: ['12\' x 8\' Security Guard Station'], // Keep Blast Resistant as-is since it's more appropriate
        newImages: [
          'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_security_guard_house.webp'
        ]
      }
    ]

    let fixedCount = 0
    const results = []

    for (const fix of duplicateFixes) {
      for (let i = 0; i < fix.targetItems.length; i++) {
        const itemName = fix.targetItems[i]
        const newImageUrl = fix.newImages[i]

        try {
          const { data, error } = await supabaseAdmin
            .from('inventory_items')
            .update({ main_image_url: newImageUrl })
            .eq('name', itemName)
            .eq('main_image_url', fix.originalUrl) // Extra safety check
            .select('id, name, main_image_url')

          if (error) {
            console.error(`❌ Error updating ${itemName}:`, error)
            results.push({
              item: itemName,
              status: 'error',
              error: error.message
            })
          } else if (data && data.length > 0) {
            fixedCount++
            console.log(`✅ Fixed duplicate: ${itemName}`)
            results.push({
              item: itemName,
              status: 'success',
              oldUrl: fix.originalUrl,
              newUrl: newImageUrl,
              updated: data.length
            })
          } else {
            console.log(`⚠️  No items found or updated: ${itemName}`)
            results.push({
              item: itemName,
              status: 'not_found',
              message: 'No matching items found or already updated'
            })
          }
        } catch (err) {
          console.error(`❌ Exception updating ${itemName}:`, err)
          results.push({
            item: itemName,
            status: 'exception',
            error: err instanceof Error ? err.message : 'Unknown error'
          })
        }
      }
    }

    console.log(`🎉 Duplicate fix complete! Fixed ${fixedCount} items.`)

    return NextResponse.json({
      success: true,
      message: `Successfully fixed ${fixedCount} duplicate inventory images`,
      results,
      summary: {
        totalFixed: fixedCount,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('❌ Error in fix-duplicate-images:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fix duplicate images',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
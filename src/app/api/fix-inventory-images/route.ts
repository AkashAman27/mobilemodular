import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🔧 Starting inventory image fixes...')

    // Fix broken inventory images with proper generated alternatives
    const imageFixes = [
      {
        condition: { name: "12' Wide MS Portable Mobile Offices" },
        newImageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
      },
      {
        condition: { name: "12' Wide Portable Mobile Offices (DCA)" },
        newImageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_double_double_office_modular_building_inter.webp'
      },
      {
        condition: { name: "14' Wide Portable Mobile Offices" },
        newImageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp'
      },
      {
        condition: { name: "Blast Resistant Modular Buildings" },
        newImageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp'
      },
      {
        condition: { name: "Campus Maker Hybrid™ Modular Portable Classroom" },
        newImageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_large_large_modular_classroom_interior_2.webp'
      },
      {
        condition: { name: "Campus Maker ModPod® Portable Classroom" },
        newImageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_multipurpose_alt_multi_purpose_education.webp'
      }
    ]

    let fixedCount = 0
    const results = []

    for (const fix of imageFixes) {
      try {
        // Update the image URL for items matching the condition
        const { data, error } = await supabaseAdmin
          .from('inventory_items')
          .update({ main_image_url: fix.newImageUrl })
          .match(fix.condition)
          .select('id, name, main_image_url')

        if (error) {
          console.error(`❌ Error updating ${fix.condition.name}:`, error)
          results.push({
            item: fix.condition.name,
            status: 'error',
            error: error.message
          })
        } else if (data && data.length > 0) {
          fixedCount++
          console.log(`✅ Fixed: ${fix.condition.name}`)
          results.push({
            item: fix.condition.name,
            status: 'success',
            newUrl: fix.newImageUrl,
            updated: data.length
          })
        } else {
          console.log(`⚠️  No items found matching: ${fix.condition.name}`)
          results.push({
            item: fix.condition.name,
            status: 'not_found',
            message: 'No matching items found'
          })
        }
      } catch (err) {
        console.error(`❌ Exception updating ${fix.condition.name}:`, err)
        results.push({
          item: fix.condition.name,
          status: 'exception',
          error: err instanceof Error ? err.message : 'Unknown error'
        })
      }
    }

    // Also fix any remaining items with broken image URLs that contain '/inventory/'
    try {
      const { data: brokenItems, error: brokenError } = await supabaseAdmin
        .from('inventory_items')
        .select('id, name, main_image_url')
        .like('main_image_url', '%/inventory/%')

      if (brokenError) {
        console.error('❌ Error finding broken inventory images:', brokenError)
      } else if (brokenItems && brokenItems.length > 0) {
        console.log(`📋 Found ${brokenItems.length} additional items with /inventory/ URLs`)
        
        // Set a fallback image for any remaining broken inventory images
        const fallbackImageUrl = 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/hero_background_modern_modular_building_complex_ae.webp'
        
        const { data: fallbackFixed, error: fallbackError } = await supabaseAdmin
          .from('inventory_items')
          .update({ main_image_url: fallbackImageUrl })
          .like('main_image_url', '%/inventory/%')
          .select('id, name')

        if (fallbackError) {
          console.error('❌ Error applying fallback images:', fallbackError)
        } else if (fallbackFixed) {
          console.log(`✅ Applied fallback image to ${fallbackFixed.length} additional items`)
          results.push({
            item: 'Additional broken inventory URLs',
            status: 'success',
            newUrl: fallbackImageUrl,
            updated: fallbackFixed.length
          })
          fixedCount += fallbackFixed.length
        }
      }
    } catch (err) {
      console.error('❌ Exception handling additional broken images:', err)
    }

    console.log(`🎉 Image fix complete! Fixed ${fixedCount} items.`)

    return NextResponse.json({
      success: true,
      message: `Successfully fixed ${fixedCount} inventory item images`,
      results,
      summary: {
        totalFixed: fixedCount,
        specificFixes: imageFixes.length,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('❌ Error in fix-inventory-images:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fix inventory images',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
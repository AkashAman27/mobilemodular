import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🎨 Starting inventory image quality improvements...')

    // Diversify duplicate Unsplash images with high-quality generated alternatives
    const imageImprovements = [
      {
        condition: { main_image_url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
        newImageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_conference_conference_room_modular_building.webp',
        description: 'Replace duplicate office image with conference room variant'
      },
      {
        condition: { main_image_url: 'https://images.unsplash.com/photo-1517502884422-41eaead166d4?auto=format&fit=crop&w=800&q=80' },
        newImageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_complex_multi_room_office_complex_interior.webp',
        description: 'Replace duplicate workspace image with complex office variant'
      },
      {
        condition: { main_image_url: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80' },
        newImageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/feature_office_professional_office_interior_modern.webp',
        description: 'Replace generic office image with professional modern variant'
      }
    ]

    let improvedCount = 0
    const results = []

    // First, get the current inventory to see what duplicates exist
    const { data: currentItems, error: fetchError } = await supabaseAdmin
      .from('inventory_items')
      .select('id, name, main_image_url')
      .not('main_image_url', 'is', null)

    if (fetchError) {
      console.error('❌ Error fetching current inventory:', fetchError)
      return NextResponse.json({ success: false, error: 'Failed to fetch inventory' }, { status: 500 })
    }

    // Count duplicates
    const imageUsage = new Map()
    currentItems?.forEach(item => {
      const url = item.main_image_url
      if (!imageUsage.has(url)) {
        imageUsage.set(url, [])
      }
      imageUsage.get(url).push(item)
    })

    console.log(`📊 Found ${imageUsage.size} unique images across ${currentItems?.length} items`)

    // Show duplicates
    for (const [url, items] of imageUsage.entries()) {
      if (items.length > 1) {
        console.log(`🔄 Duplicate image (${items.length} items): ${url}`)
        console.log(`   Items: ${items.map((i: any) => i.name).join(', ')}`)
      }
    }

    // Apply improvements - only update ONE item per duplicate image to maintain some consistency
    for (const improvement of imageImprovements) {
      try {
        const duplicateItems = imageUsage.get(improvement.condition.main_image_url) || []
        
        if (duplicateItems.length > 1) {
          // Update only the first item to diversify without losing all instances
          const itemToUpdate = duplicateItems[0]
          
          const { data, error } = await supabaseAdmin
            .from('inventory_items')
            .update({ main_image_url: improvement.newImageUrl })
            .eq('id', itemToUpdate.id)
            .select('id, name, main_image_url')

          if (error) {
            console.error(`❌ Error updating ${itemToUpdate.name}:`, error)
            results.push({
              item: itemToUpdate.name,
              status: 'error',
              error: error.message
            })
          } else if (data && data.length > 0) {
            improvedCount++
            console.log(`✅ Improved: ${itemToUpdate.name}`)
            results.push({
              item: itemToUpdate.name,
              status: 'success',
              oldUrl: improvement.condition.main_image_url,
              newUrl: improvement.newImageUrl,
              description: improvement.description
            })
          }
        } else {
          console.log(`ℹ️  No duplicates found for: ${improvement.condition.main_image_url}`)
          results.push({
            item: 'No duplicates found',
            status: 'skipped',
            url: improvement.condition.main_image_url
          })
        }
      } catch (err) {
        console.error(`❌ Exception during improvement:`, err)
        results.push({
          item: 'Exception occurred',
          status: 'exception',
          error: err instanceof Error ? err.message : 'Unknown error'
        })
      }
    }

    console.log(`🎉 Image improvement complete! Improved ${improvedCount} items.`)

    return NextResponse.json({
      success: true,
      message: `Successfully improved ${improvedCount} inventory item images`,
      results,
      duplicateAnalysis: {
        totalUniqueImages: imageUsage.size,
        totalItems: currentItems?.length,
        duplicatesFound: Array.from(imageUsage.entries())
          .filter(([url, items]) => items.length > 1)
          .map(([url, items]) => ({
            url,
            count: items.length,
            items: items.map((i: any) => i.name)
          }))
      },
      summary: {
        totalImproved: improvedCount,
        timestamp: new Date().toISOString()
      }
    })

  } catch (error) {
    console.error('❌ Error in improve-inventory-images:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to improve inventory images',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
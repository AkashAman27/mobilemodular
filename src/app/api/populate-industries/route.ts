import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { industries as demoIndustries } from '@/data/demo-data'

export async function POST(request: NextRequest) {
  try {
    console.log('🏭 Populating industries table...')

    // Check if industries already exist
    const { data: existingIndustries, error: fetchError } = await supabaseAdmin
      .from('industries')
      .select('id')
      .limit(1)

    if (fetchError) {
      console.error('❌ Error checking existing industries:', fetchError)
      return NextResponse.json(
        { success: false, error: 'Failed to check existing industries' },
        { status: 500 }
      )
    }

    if (existingIndustries && existingIndustries.length > 0) {
      console.log('ℹ️ Industries already exist, skipping population')
      return NextResponse.json({
        success: true,
        message: 'Industries already exist',
        count: existingIndustries.length
      })
    }

    // Transform demo data to database format
    const industriesData = demoIndustries.map(industry => ({
      slug: industry.id, // Use demo ID as slug
      name: industry.name,
      description: industry.description,
      image_url: industry.imageUrl,
      case_studies_count: industry.caseStudies || 0
    }))

    console.log(`📊 Inserting ${industriesData.length} industries...`)

    // Insert industries
    const { data: insertedIndustries, error: insertError } = await supabaseAdmin
      .from('industries')
      .insert(industriesData)
      .select('id, slug, name')

    if (insertError) {
      console.error('❌ Error inserting industries:', insertError)
      return NextResponse.json(
        { success: false, error: 'Failed to insert industries', details: insertError.message },
        { status: 500 }
      )
    }

    console.log('✅ Successfully populated industries table')
    console.log(`📋 Inserted industries: ${insertedIndustries?.map(i => i.name).join(', ')}`)

    return NextResponse.json({
      success: true,
      message: `Successfully populated ${insertedIndustries?.length} industries`,
      data: {
        inserted: insertedIndustries?.length,
        industries: insertedIndustries?.map(industry => ({
          id: industry.id,
          slug: industry.slug,
          name: industry.name
        }))
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Error in populate-industries:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to populate industries',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
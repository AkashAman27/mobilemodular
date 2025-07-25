import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🏢 Populating office building specifications...')

    // Complete specifications array matching the hardcoded frontend data
    const completeSpecifications = [
      {
        title: 'Single Office',
        size: '8\' x 20\'',
        capacity: '2-4 people',
        price: 'Starting at $850/month',
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
      },
      {
        title: 'Double Office',
        size: '16\' x 20\'',
        capacity: '4-8 people',
        price: 'Starting at $1,200/month',
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_double_double_office_modular_building_inter.webp'
      },
      {
        title: 'Conference Room',
        size: '12\' x 24\'',
        capacity: '8-12 people',
        price: 'Starting at $1,500/month',
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_conference_conference_room_modular_building.webp'
      },
      {
        title: 'Multi-Room Complex',
        size: '24\' x 60\'',
        capacity: '15-25 people',
        price: 'Starting at $2,800/month',
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_complex_multi_room_office_complex_interior.webp'
      }
    ]

    // First, check if office-buildings solution exists
    const { data: existingSolution, error: fetchError } = await supabaseAdmin
      .from('solutions')
      .select('id, slug, name, specifications')
      .eq('slug', 'office-buildings')
      .single()

    if (fetchError) {
      console.error('❌ Error fetching office-buildings solution:', fetchError)
      return NextResponse.json(
        { success: false, error: 'Office buildings solution not found' },
        { status: 404 }
      )
    }

    console.log('📋 Current solution:', {
      id: existingSolution.id,
      name: existingSolution.name,
      currentSpecs: existingSolution.specifications?.length || 0
    })

    // Update the solution with complete specifications
    const { data: updatedSolution, error: updateError } = await supabaseAdmin
      .from('solutions')
      .update({
        specifications: completeSpecifications
      })
      .eq('slug', 'office-buildings')
      .select('id, name, specifications')

    if (updateError) {
      console.error('❌ Error updating specifications:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to update specifications', details: updateError.message },
        { status: 500 }
      )
    }

    console.log('✅ Successfully updated office building specifications')
    console.log(`📊 Updated from ${existingSolution.specifications?.length || 0} to ${completeSpecifications.length} specifications`)

    return NextResponse.json({
      success: true,
      message: `Successfully populated ${completeSpecifications.length} office building specifications`,
      data: {
        solutionId: existingSolution.id,
        solutionName: existingSolution.name,
        previousSpecCount: existingSolution.specifications?.length || 0,
        newSpecCount: completeSpecifications.length,
        specifications: completeSpecifications
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('❌ Error in populate-office-specifications:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to populate office specifications',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
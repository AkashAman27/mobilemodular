import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('🏫 Populating portable classroom specifications...')

    // Check the portable classrooms page to get the correct specifications
    // Based on standard modular classroom configurations
    const completeSpecifications = [
      {
        title: 'Standard Classroom',
        size: '24\' x 32\'',
        capacity: '20-25 students',
        price: 'Starting at $1,200/month',
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_classroom_interior_mod.webp'
      },
      {
        title: 'Large Classroom',
        size: '28\' x 40\'',
        capacity: '25-30 students',
        price: 'Starting at $1,500/month',
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_large_large_modular_classroom_interior_2.webp'
      },
      {
        title: 'Computer Lab',
        size: '24\' x 36\'',
        capacity: '20-24 students',
        price: 'Starting at $1,800/month',
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_computer_computer_lab_classroom_interior.webp'
      },
      {
        title: 'Multi-Purpose Room',
        size: '32\' x 40\'',
        capacity: '30-40 students',
        price: 'Starting at $2,200/month',
        image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_multipurpose_alt_multi_purpose_education.webp'
      }
    ]

    // Check if portable-classrooms solution exists
    const { data: existingSolution, error: fetchError } = await supabaseAdmin
      .from('solutions')
      .select('id, slug, name, specifications')
      .eq('slug', 'portable-classrooms')
      .single()

    if (fetchError) {
      console.error('❌ Error fetching portable-classrooms solution:', fetchError)
      return NextResponse.json(
        { success: false, error: 'Portable classrooms solution not found' },
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
      .eq('slug', 'portable-classrooms')
      .select('id, name, specifications')

    if (updateError) {
      console.error('❌ Error updating specifications:', updateError)
      return NextResponse.json(
        { success: false, error: 'Failed to update specifications', details: updateError.message },
        { status: 500 }
      )
    }

    console.log('✅ Successfully updated portable classroom specifications')
    console.log(`📊 Updated from ${existingSolution.specifications?.length || 0} to ${completeSpecifications.length} specifications`)

    return NextResponse.json({
      success: true,
      message: `Successfully populated ${completeSpecifications.length} portable classroom specifications`,
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
    console.error('❌ Error in populate-classroom-specifications:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to populate classroom specifications',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
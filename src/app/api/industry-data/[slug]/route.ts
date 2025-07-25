import { NextRequest, NextResponse } from 'next/server'
import { industryData } from '@/data/industry-data'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    
    // Check if we have data for this slug
    const data = industryData[slug as keyof typeof industryData]
    
    if (!data) {
      return NextResponse.json(
        { error: 'Industry not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data
    })

  } catch (error) {
    console.error('Error fetching industry data:', error)
    return NextResponse.json(
      { 
        error: 'Failed to fetch industry data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    const updatedData = await request.json()
    
    // Update the industry data (in production this would save to database)
    if (industryData[slug as keyof typeof industryData]) {
      // Update the in-memory data directly
      Object.assign(industryData[slug as keyof typeof industryData], updatedData)
      
      console.log(`Updated ${slug} data:`, JSON.stringify(industryData[slug as keyof typeof industryData].statistics, null, 2))
      
      return NextResponse.json({
        success: true,
        message: 'Industry data updated successfully',
        data: industryData[slug as keyof typeof industryData]
      })
    } else {
      return NextResponse.json(
        { error: 'Industry not found' },
        { status: 404 }
      )
    }

  } catch (error) {
    console.error('Error updating industry data:', error)
    return NextResponse.json(
      { 
        error: 'Failed to update industry data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
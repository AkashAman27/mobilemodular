import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Update the CTA content to remove "Away"
    const { data, error } = await supabase
      .from('homepage_content')
      .update({ 
        content: 'Request a quote today to start your project right.'
      })
      .eq('section', 'cta')
      .select()

    if (error) {
      console.error('Error updating CTA content:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'CTA content updated successfully',
      data: data 
    })
    
  } catch (error) {
    console.error('Error in update-cta API:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
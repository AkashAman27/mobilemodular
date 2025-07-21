import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // Sample homepage content data
    const homepageContent = [
      {
        section: 'hero',
        title: 'Professional Modular Buildings',
        subtitle: 'Rent, Buy, or Lease',
        content: 'From portable classrooms to office complexes, we provide flexible space solutions for every industry. Fast deployment, professional quality, cost-effective solutions.',
        sort_order: 1,
        is_active: true
      },
      {
        section: 'values',
        title: 'Providing value at every step',
        subtitle: 'Our Core Values',
        content: 'We deliver unmatched efficiency and quality in modular building solutions.',
        sort_order: 2,
        is_active: true
      },
      {
        section: 'cta',
        title: 'Start your project today',
        subtitle: 'Request a quote',
        content: 'Request a quote today to start your project right.',
        sort_order: 3,
        is_active: true
      },
      {
        section: 'safe-secure',
        title: 'Safe and Secure',
        subtitle: 'Value 1',
        content: 'Engineered for peace of mind with solutions that prioritize safety, meet rigorous standards, and create secure environments.',
        sort_order: 4,
        is_active: true
      },
      {
        section: 'customization',
        title: 'Customization',
        subtitle: 'Value 2', 
        content: 'Create tailored solutions that fulfill your vision. Our solutions adapt seamlessly to suit your unique requirements and preferences.',
        sort_order: 5,
        is_active: true
      },
      {
        section: 'speed',
        title: 'Speed',
        subtitle: 'Value 3',
        content: 'We deliver unmatched efficiency, swiftly providing temporary space solutions that meet your urgent demands without compromising quality.',
        sort_order: 6,
        is_active: true
      },
      {
        section: 'customer-support',
        title: 'Customer Support',
        subtitle: 'Value 4',
        content: 'Beyond structures, we build relationships. Our team stands with you with unwavering local support, expertise, and guidance through the project life cycle.',
        sort_order: 7,
        is_active: true
      }
    ]

    // Insert data into homepage_content table
    const { data, error } = await supabase
      .from('homepage_content')
      .insert(homepageContent)
      .select()

    if (error) {
      console.error('Error populating homepage content:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Homepage content populated successfully',
      data: data 
    })
    
  } catch (error) {
    console.error('Error in populate-homepage API:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
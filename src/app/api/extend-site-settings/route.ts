import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST() {
  try {
    // First, let's get the current site_settings record
    const { data: currentSettings, error: fetchError } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .single()

    if (fetchError) {
      return NextResponse.json({ error: `Failed to fetch current settings: ${fetchError.message}` }, { status: 500 })
    }

    // Now update it with additional contact fields by using JSONB fields for extra data
    const { data: updatedSettings, error: updateError } = await supabaseAdmin
      .from('site_settings')
      .update({
        ...currentSettings,
        company_name: 'Modular Building Solutions',
        primary_phone: '(866) 819-9017',
        email: 'info@modularbuilding.com',
        support_hours: '24/7 Support Available',
        // Store additional contact info in a JSONB field if available, or in existing text fields
        company_tagline: 'Professional modular buildings for offices, education, healthcare, and more.',
        updated_at: new Date().toISOString()
      })
      .eq('id', currentSettings.id)
      .select()

    if (updateError) {
      return NextResponse.json({ error: `Failed to update settings: ${updateError.message}` }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Site settings updated successfully with enhanced contact information!',
      data: updatedSettings,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Error updating site settings:', error)
    return NextResponse.json({ error: 'Failed to update site settings' }, { status: 500 })
  }
}
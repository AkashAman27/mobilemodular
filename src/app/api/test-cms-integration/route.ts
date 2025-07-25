import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    const results: any = {}

    // Test 1: Check if company_about_content table exists
    const { data: aboutData, error: aboutError } = await supabaseAdmin
      .from('company_about_content')
      .select('*')
      .limit(1)

    results.aboutTable = {
      exists: !aboutError,
      error: aboutError?.message,
      hasData: aboutData && aboutData.length > 0
    }

    // Test 2: Check site_settings table
    const { data: settingsData, error: settingsError } = await supabaseAdmin
      .from('site_settings')
      .select('*')
      .limit(1)

    results.siteSettings = {
      exists: !settingsError,
      error: settingsError?.message,
      hasData: settingsData && settingsData.length > 0,
      data: settingsData?.[0] || null
    }

    // Test 3: Check locations_page_content table
    const { data: locationsData, error: locationsError } = await supabaseAdmin
      .from('locations_page_content')
      .select('*')
      .limit(1)

    results.locationsTable = {
      exists: !locationsError,
      error: locationsError?.message,
      hasData: locationsData && locationsData.length > 0
    }

    // Test 4: Check industries table
    const { data: industriesData, error: industriesError } = await supabaseAdmin
      .from('industries')
      .select('*')
      .limit(5)

    results.industriesTable = {
      exists: !industriesError,
      error: industriesError?.message,
      hasData: industriesData && industriesData.length > 0,
      count: industriesData?.length || 0
    }

    // Test 5: Check complete_homepage_content table
    const { data: homepageData, error: homepageError } = await supabaseAdmin
      .from('complete_homepage_content')
      .select('*')
      .limit(1)

    results.homepageTable = {
      exists: !homepageError,
      error: homepageError?.message,
      hasData: homepageData && homepageData.length > 0
    }

    return NextResponse.json({
      status: 'CMS Integration Test Results',
      timestamp: new Date().toISOString(),
      results
    })

  } catch (error) {
    console.error('Error testing CMS integration:', error)
    return NextResponse.json({ error: 'Failed to test CMS integration' }, { status: 500 })
  }
}
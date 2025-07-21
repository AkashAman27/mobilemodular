import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET() {
  try {
    // Check if environment variables exist
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        success: false,
        error: 'Environment variables missing',
        details: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey,
          url: supabaseUrl ? 'Set' : 'Missing',
          key: supabaseKey ? 'Set' : 'Missing'
        }
      });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Test database connection by trying to select from quote_submissions table
    const { data, error } = await supabase
      .from('quote_submissions')
      .select('count(*)')
      .limit(1);

    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Database connection failed',
        details: error
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      data: data
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}

export async function POST() {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Test inserting a simple record
    const testData = {
      first_name: 'Test',
      last_name: 'User',
      email: 'test@example.com',
      project_type: 'Test Project',
      project_details: 'This is a test submission'
    };

    const { data, error } = await supabase
      .from('quote_submissions')
      .insert([testData])
      .select()
      .single();

    if (error) {
      return NextResponse.json({
        success: false,
        error: 'Insert failed',
        details: error
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Test record inserted successfully',
      data: data
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: 'Test insert failed',
      details: error instanceof Error ? error.message : String(error)
    });
  }
}
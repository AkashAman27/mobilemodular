import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    // Check specific tables by trying to access them
    const tables = ['industry_content', 'industry_solutions', 'industry_benefits', 'industry_case_studies', 'industry_statistics']
    const tableExists = []
    
    for (const tableName of tables) {
      try {
        const { data, error } = await supabaseAdmin
          .from(tableName)
          .select('*')
          .limit(1)
        
        tableExists.push({
          table: tableName,
          exists: !error,
          error: error?.message || null,
          recordCount: data?.length || 0
        })
      } catch (err) {
        tableExists.push({
          table: tableName,
          exists: false,
          error: err instanceof Error ? err.message : 'Unknown error',
          recordCount: 0
        })
      }
    }

    return NextResponse.json({
      success: true,
      tables: tableExists
    })

  } catch (error) {
    console.error('List tables error:', error)
    return NextResponse.json({
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
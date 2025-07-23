import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST() {
  try {
    // Create contact_submissions table
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS contact_submissions (
          id SERIAL PRIMARY KEY,
          first_name VARCHAR(255) NOT NULL,
          last_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          company VARCHAR(255),
          topic VARCHAR(100) NOT NULL,
          message TEXT,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );

        -- Create an index on email for faster lookups
        CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON contact_submissions(email);
        
        -- Create an index on created_at for faster date-based queries
        CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at);
      `
    })

    if (error) {
      console.error('Database setup error:', error)
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to set up contact submissions table',
        details: error.message 
      }, { status: 500 })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Contact submissions table created successfully' 
    })

  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error' 
    }, { status: 500 })
  }
}
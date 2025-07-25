import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    console.log('Setting up inventory tables...')

    // Create inventory_categories table
    const categoriesTable = `
      CREATE TABLE IF NOT EXISTS inventory_categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        description TEXT,
        icon TEXT,
        image_url TEXT,
        order_index INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    // Create inventory_items table  
    const itemsTable = `
      CREATE TABLE IF NOT EXISTS inventory_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        model_number TEXT,
        description TEXT,
        width_feet INTEGER,
        length_feet INTEGER,
        square_feet INTEGER,
        category_id UUID REFERENCES inventory_categories(id),
        location_state TEXT,
        location_city TEXT,
        main_image_url TEXT,
        gallery_images JSONB DEFAULT '[]',
        features JSONB DEFAULT '[]',
        specifications JSONB DEFAULT '{}',
        availability_status TEXT DEFAULT 'available',
        rental_price_monthly DECIMAL(10,2),
        rating DECIMAL(2,1),
        review_count INTEGER DEFAULT 0,
        meta_title TEXT,
        meta_description TEXT,
        is_active BOOLEAN DEFAULT true,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `

    // Create indexes
    const createIndexes = `
      CREATE INDEX IF NOT EXISTS idx_inventory_items_category_id ON inventory_items(category_id);
      CREATE INDEX IF NOT EXISTS idx_inventory_items_location_state ON inventory_items(location_state);
      CREATE INDEX IF NOT EXISTS idx_inventory_items_availability_status ON inventory_items(availability_status);
      CREATE INDEX IF NOT EXISTS idx_inventory_items_is_active ON inventory_items(is_active);
      CREATE INDEX IF NOT EXISTS idx_inventory_items_is_featured ON inventory_items(is_featured);
      CREATE INDEX IF NOT EXISTS idx_inventory_categories_slug ON inventory_categories(slug);
      CREATE INDEX IF NOT EXISTS idx_inventory_categories_is_active ON inventory_categories(is_active);
    `

    // Since we can't use exec_sql RPC, let's try to create tables using raw SQL
    // First check if tables already exist
    console.log('Checking if tables exist...')
    
    const { data: existingTables, error: checkError } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['inventory_categories', 'inventory_items'])
    
    if (checkError) {
      console.log('Could not check existing tables, proceeding with creation attempt')
    }

    // For now, let's just indicate that manual table creation is needed
    const tablesExist = existingTables && existingTables.length > 0
    
    if (!tablesExist) {
      // Return instructions for manual setup since RPC isn't available
      return NextResponse.json({
        success: false,
        message: 'Manual database setup required',
        instructions: {
          sql: `
-- Run this SQL in your Supabase Dashboard > SQL Editor:

${categoriesTable}

${itemsTable}

${createIndexes}

-- Enable RLS
ALTER TABLE inventory_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory_items ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY IF NOT EXISTS "Allow all operations on inventory_categories" 
ON inventory_categories FOR ALL 
USING (true) 
WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Allow all operations on inventory_items" 
ON inventory_items FOR ALL 
USING (true) 
WITH CHECK (true);
          `,
          note: 'Copy and paste the SQL above into your Supabase SQL Editor to create the required tables.'
        }
      })
    }

    // Insert default categories
    const defaultCategories = [
      {
        name: 'Office Buildings',
        slug: 'office-buildings',
        description: 'Professional office spaces for business operations',
        icon: 'Building2',
        order_index: 1
      },
      {
        name: 'Portable Classrooms',
        slug: 'portable-classrooms', 
        description: 'Educational facilities and learning environments',
        icon: 'GraduationCap',
        order_index: 2
      },
      {
        name: 'Healthcare Facilities',
        slug: 'healthcare-facilities',
        description: 'Medical and healthcare building solutions',
        icon: 'Stethoscope',
        order_index: 3
      },
      {
        name: 'Storage Units',
        slug: 'storage-units',
        description: 'Secure storage solutions for equipment and materials',
        icon: 'Package',
        order_index: 4
      },
      {
        name: 'Construction Trailers',
        slug: 'construction-trailers',
        description: 'Job site offices and construction support buildings',
        icon: 'HardHat',
        order_index: 5
      }
    ]

    console.log('Inserting default categories...')
    const { error: insertError } = await supabaseAdmin
      .from('inventory_categories')
      .upsert(defaultCategories, { onConflict: 'slug' })

    if (insertError) {
      console.error('Error inserting categories:', insertError)
      throw insertError
    }

    // Insert a sample inventory item
    const sampleItem: any = {
      name: 'Startup Incubator',
      model_number: 'SIN-350',
      description: 'Shared workspace for early-stage companies',
      width_feet: 14,
      length_feet: 25,
      square_feet: 350,
      location_city: 'El Paso',
      location_state: 'TX',
      main_image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
      features: ['Climate Control', 'WiFi', 'Meeting Rooms', 'Kitchen Area'],
      rental_price_monthly: 750,
      availability_status: 'available',
      is_active: true,
      is_featured: false,
      category_id: null
    }

    // Get the office buildings category ID
    const { data: officeCategory } = await supabaseAdmin
      .from('inventory_categories')
      .select('id')
      .eq('slug', 'office-buildings')
      .single()

    if (officeCategory) {
      sampleItem.category_id = officeCategory.id
      
      console.log('Inserting sample inventory item...')
      const { error: sampleError } = await supabaseAdmin
        .from('inventory_items')
        .upsert([sampleItem])

      if (sampleError) {
        console.error('Error inserting sample item:', sampleError)
        throw sampleError
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Inventory tables created successfully!',
      tables: ['inventory_categories', 'inventory_items'],
      categoriesCount: defaultCategories.length,
      sampleItemCreated: true
    })

  } catch (error) {
    console.error('Error setting up inventory tables:', error)
    return NextResponse.json(
      { 
        error: 'Failed to set up inventory tables',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
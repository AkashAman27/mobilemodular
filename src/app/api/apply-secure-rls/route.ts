import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, requireServiceRoleKey } from '@/lib/supabase'
import { withAdminAuth, auditLog } from '@/lib/auth-utils'
import { readFileSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  return withAdminAuth(request, async (req, user) => {
    try {
      // Ensure we have proper service role privileges
      requireServiceRoleKey()

      // Audit log this critical security operation
      await auditLog(user, 'APPLY_SECURE_RLS_POLICIES', 'database_security', {
        action: 'apply_secure_rls_policies',
        migration_file: 'secure-rls-policies.sql'
      })

      console.log(`🔐 Admin ${user.email} is applying secure RLS policies...`)

      // Read the SQL migration file
      const migrationPath = join(process.cwd(), 'database-migrations', 'secure-rls-policies.sql')
      const migrationSQL = readFileSync(migrationPath, 'utf8')

      // Split the SQL into individual statements
      const statements = migrationSQL
        .split(';')
        .map(statement => statement.trim())
        .filter(statement => statement.length > 0 && !statement.startsWith('--'))

      console.log(`📊 Executing ${statements.length} SQL statements...`)

      const results = []
      let successCount = 0
      let errorCount = 0

      // Execute each statement individually for better error handling
      for (let i = 0; i < statements.length; i++) {
        const statement = statements[i]
        
        try {
          console.log(`🔄 Executing statement ${i + 1}/${statements.length}`)
          
          const { data, error } = await supabaseAdmin.rpc('exec_sql', {
            sql: statement + ';'
          })

          if (error) {
            console.error(`❌ Error in statement ${i + 1}:`, error)
            results.push({
              statement_number: i + 1,
              status: 'error',
              error: error.message,
              statement: statement.substring(0, 100) + '...'
            })
            errorCount++
          } else {
            console.log(`✅ Statement ${i + 1} executed successfully`)
            results.push({
              statement_number: i + 1,
              status: 'success',
              statement: statement.substring(0, 100) + '...'
            })
            successCount++
          }
        } catch (err: any) {
          console.error(`❌ Unexpected error in statement ${i + 1}:`, err)
          results.push({
            statement_number: i + 1,
            status: 'error',
            error: err.message,
            statement: statement.substring(0, 100) + '...'
          })
          errorCount++
        }
      }

      const summary = {
        total_statements: statements.length,
        successful: successCount,
        errors: errorCount,
        success_rate: `${Math.round((successCount / statements.length) * 100)}%`
      }

      console.log('📈 Migration Summary:', summary)

      // Log the completion
      await auditLog(user, 'SECURE_RLS_MIGRATION_COMPLETED', 'database_security', {
        summary,
        results: results.filter(r => r.status === 'error') // Only log errors
      })

      return NextResponse.json({
        success: errorCount === 0,
        message: errorCount === 0 
          ? 'Secure RLS policies applied successfully!' 
          : `Migration completed with ${errorCount} errors`,
        summary,
        details: results,
        security_improvements: [
          '✅ Replaced permissive USING (true) policies',
          '✅ Added proper admin role checking',
          '✅ Enabled RLS on all sensitive tables',
          '✅ Created audit log table for tracking',
          '✅ Added helper functions for role checking',
          '✅ Implemented least-privilege access control'
        ]
      })

    } catch (error: any) {
      console.error('🚨 Secure RLS migration error:', error)
      
      await auditLog(user, 'SECURE_RLS_MIGRATION_FAILED', 'database_security', {
        error: error.message,
        stack: error.stack
      })

      return NextResponse.json({
        success: false,
        error: 'Failed to apply secure RLS policies',
        details: error.message,
        instructions: [
          '1. Ensure SUPABASE_SERVICE_ROLE_KEY is configured',
          '2. Check that the migration file exists',
          '3. Verify database connection',
          '4. Review Supabase logs for detailed errors'
        ]
      }, { status: 500 })
    }
  })
}

export async function GET() {
  return NextResponse.json({
    message: 'POST to this endpoint to apply secure RLS policies',
    description: 'This endpoint replaces dangerous USING (true) policies with proper role-based security',
    security_benefits: [
      'Prevents unauthorized database access',
      'Implements proper admin role checking',
      'Adds audit logging capabilities',
      'Follows least-privilege security model'
    ],
    warning: 'This operation requires admin authentication and service role key'
  })
}
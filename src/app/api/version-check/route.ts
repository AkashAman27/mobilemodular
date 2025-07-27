import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    version: '2025-07-27-v1.2',
    lastUpdate: 'Admin user display fix',
    hasAdminLayoutFix: true,
    hasDebugEndpoints: true,
    timestamp: new Date().toISOString(),
    buildTime: process.env.VERCEL_GIT_COMMIT_SHA || 'local'
  })
}
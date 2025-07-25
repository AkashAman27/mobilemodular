'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'

// Disable caching for admin pages
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <AdminLayout>
        {children}
      </AdminLayout>
    </ProtectedRoute>
  )
}
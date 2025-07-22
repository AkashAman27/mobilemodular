'use client'

import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import AdminLayout from '@/components/admin/AdminLayout'

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
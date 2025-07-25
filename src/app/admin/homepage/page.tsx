'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'

export default function HomepageAdmin() {
  const router = useRouter()

  useEffect(() => {
    // Automatically redirect to the new complete homepage management
    router.replace('/admin/homepage/complete')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="max-w-md">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-teal-600" />
            <CardTitle>Homepage Management</CardTitle>
          </div>
          <CardDescription>
            We've upgraded the homepage management interface
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">
            The homepage management has been consolidated into a single, comprehensive interface for easier content management.
          </p>
          <Link href="/admin/homepage/complete">
            <Button className="w-full bg-teal-600 hover:bg-teal-700">
              <ArrowRight className="h-4 w-4 mr-2" />
              Go to Complete Homepage Management
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
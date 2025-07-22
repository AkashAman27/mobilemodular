'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RotateCcw as Redirect, Link, ArrowRight, Settings } from 'lucide-react'

export default function URLRedirectsPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">URL Redirects Management</h1>
          <p className="text-gray-600 mt-1">Manage 301/302 redirects and URL structure changes</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Redirect className="h-5 w-5 mr-2 text-purple-500" />
                Redirect Management Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                This page will contain URL redirect management tools including:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Link className="h-4 w-4 mr-2 text-blue-500" />
                  301 and 302 redirect creation and management
                </li>
                <li className="flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
                  Bulk redirect import and export
                </li>
                <li className="flex items-center">
                  <Settings className="h-4 w-4 mr-2 text-orange-500" />
                  Redirect testing and validation
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
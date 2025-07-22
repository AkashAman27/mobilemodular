'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Bot, Shield, Search } from 'lucide-react'

export default function RobotsPage() {
  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Robots.txt Management</h1>
          <p className="text-gray-600 mt-1">Manage search engine crawling rules and directives</p>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="h-5 w-5 mr-2 text-purple-500" />
                Robots.txt Editor Coming Soon
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                This page will contain robots.txt management tools including:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li className="flex items-center">
                  <Bot className="h-4 w-4 mr-2 text-blue-500" />
                  Visual robots.txt editor and generator
                </li>
                <li className="flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-green-500" />
                  Crawl directive management for different bots
                </li>
                <li className="flex items-center">
                  <Search className="h-4 w-4 mr-2 text-orange-500" />
                  Sitemap.xml location configuration
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
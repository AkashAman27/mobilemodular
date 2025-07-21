'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Users, MapPin, MessageSquare, Newspaper, HelpCircle, Home, Link as LinkIcon, LogOut } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminDashboard() {
  const { signOut, user } = useAuth()

  const adminSections = [
    {
      title: 'Solutions',
      description: 'Manage modular building solutions',
      icon: Building2,
      href: '/admin/solutions',
      color: 'bg-blue-500'
    },
    {
      title: 'Industries',
      description: 'Manage industry content',
      icon: Users,
      href: '/admin/industries',
      color: 'bg-green-500'
    },
    {
      title: 'Locations',
      description: 'Manage service locations',
      icon: MapPin,
      href: '/admin/locations',
      color: 'bg-orange-500'
    },
    {
      title: 'Testimonials',
      description: 'Manage customer testimonials',
      icon: MessageSquare,
      href: '/admin/testimonials',
      color: 'bg-purple-500'
    },
    {
      title: 'News & Insights',
      description: 'Manage blog posts and news',
      icon: Newspaper,
      href: '/admin/news-insights',
      color: 'bg-red-500'
    },
    {
      title: 'FAQs',
      description: 'Manage frequently asked questions',
      icon: HelpCircle,
      href: '/admin/faqs',
      color: 'bg-indigo-500'
    },
    {
      title: 'Homepage Content',
      description: 'Manage homepage sections and content',
      icon: Home,
      href: '/admin/homepage',
      color: 'bg-teal-500'
    },
    {
      title: 'Internal Links',
      description: 'Manage internal links shown at bottom of pages',
      icon: LinkIcon,
      href: '/admin/internal-links',
      color: 'bg-cyan-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Welcome, {user?.email}</p>
            </div>
            <div className="flex gap-4">
              <Button onClick={signOut} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Solutions</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6</div>
              <p className="text-xs text-muted-foreground">Building types available</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Locations</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Service locations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Customer Reviews</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">Published testimonials</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminSections.map((section) => (
            <Link key={section.title} href={section.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-lg ${section.color}`}>
                      <section.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <Button variant="outline">
                  <Link href="/admin/solutions/new">Add New Solution</Link>
                </Button>
                <Button variant="outline">
                  <Link href="/admin/testimonials/new">Add New Testimonial</Link>
                </Button>
                <Button variant="outline">
                  <Link href="/admin/news-insights/new">Add News Article</Link>
                </Button>
                <Button variant="outline">
                  <Link href="/admin/faqs/new">Add New FAQ</Link>
                </Button>
                <Button variant="outline">
                  <Link href="/admin/homepage/new">Add Homepage Content</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
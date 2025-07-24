'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Building2, Users, MapPin, MessageSquare, Newspaper, HelpCircle, Home, Link as LinkIcon, LogOut, Settings, Package, FileText } from 'lucide-react'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'

export default function AdminDashboard() {
  const { signOut, user } = useAuth()

  const adminSections = [
    {
      title: 'Live Inventory',
      description: 'Manage inventory items and floorplans',
      icon: Package,
      href: '/admin/inventory',
      color: 'bg-navy-500'
    },
    {
      title: 'Solutions',
      description: 'Manage modular building solutions',
      icon: Building2,
      href: '/admin/solutions',
      color: 'bg-blue-500'
    },
    {
      title: 'Solutions Page Content',
      description: 'Manage all static content on the main solutions page',
      icon: Building2,
      href: '/admin/solutions-page',
      color: 'bg-sky-500'
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
      title: 'Locations Page Content',
      description: 'Manage all static content on locations pages including state & city templates',
      icon: MapPin,
      href: '/admin/locations-page',
      color: 'bg-amber-500'
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
      title: 'FAQs Management',
      description: 'Manage and assign FAQs to specific pages',
      icon: HelpCircle,
      href: '/admin/page-faqs',
      color: 'bg-indigo-500'
    },
    {
      title: 'Homepage Content',
      description: 'Manage ALL homepage content including branding & static text',
      icon: Home,
      href: '/admin/homepage/complete',
      color: 'bg-teal-500'
    },
    {
      title: 'Internal Links',
      description: 'Manage internal links shown at bottom of pages',
      icon: LinkIcon,
      href: '/admin/internal-links',
      color: 'bg-cyan-500'
    },
    {
      title: 'Our Process',
      description: 'Manage the 7-step process content',
      icon: Settings,
      href: '/admin/our-process',
      color: 'bg-yellow-500'
    }
  ]

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome to your Aman Modular CMS dashboard</p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
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

        {/* Quick Actions Grid */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {adminSections.map((section) => (
              <Link key={section.title} href={section.href}>
                <Card className="hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300">
                  <CardHeader className="pb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${section.color}`}>
                        <section.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base font-medium">{section.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-500">{section.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Database initialized with sample data</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Admin panel created</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">Supabase integration active</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-sm text-gray-600">SEO system implemented</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
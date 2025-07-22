'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'

const { 
  Building2, 
  Users, 
  MapPin, 
  MessageSquare, 
  Newspaper, 
  HelpCircle, 
  Home, 
  Link: LinkIcon, 
  LogOut,
  Settings,
  BarChart3,
  Eye,
  Menu,
  X,
  Globe,
  RotateCcw,
  Code,
  FileText,
  Search
} = Icons

// Use RotateCcw as Redirect
const Redirect = RotateCcw

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { signOut, user } = useAuth()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigationItems = [
    {
      name: 'Dashboard',
      href: '/admin',
      icon: BarChart3,
      current: pathname === '/admin'
    },
    {
      name: 'Homepage',
      href: '/admin/homepage',
      icon: Home,
      current: pathname.startsWith('/admin/homepage')
    },
    {
      name: 'Solutions',
      href: '/admin/solutions', 
      icon: Building2,
      current: pathname.startsWith('/admin/solutions')
    },
    {
      name: 'Industries',
      href: '/admin/industries',
      icon: Users,
      current: pathname.startsWith('/admin/industries')
    },
    {
      name: 'Locations',
      href: '/admin/locations',
      icon: MapPin,
      current: pathname.startsWith('/admin/locations')
    },
    {
      name: 'Our Process',
      href: '/admin/our-process',
      icon: Settings,
      current: pathname.startsWith('/admin/our-process')
    },
    {
      name: 'Testimonials',
      href: '/admin/testimonials',
      icon: MessageSquare,
      current: pathname.startsWith('/admin/testimonials')
    },
    {
      name: 'News & Insights',
      href: '/admin/news-insights',
      icon: Newspaper,
      current: pathname.startsWith('/admin/news-insights')
    },
    {
      name: 'FAQs',
      href: '/admin/faqs',
      icon: HelpCircle,
      current: pathname.startsWith('/admin/faqs')
    },
    {
      name: 'Internal Links',
      href: '/admin/internal-links',
      icon: LinkIcon,
      current: pathname.startsWith('/admin/internal-links')
    }
  ]

  const seoItems = [
    {
      name: 'SEO Content',
      href: '/admin/seo-content',
      icon: Search,
      current: pathname.startsWith('/admin/seo-content')
    },
    {
      name: 'Page Schemas',
      href: '/admin/page-schemas',
      icon: Code,
      current: pathname.startsWith('/admin/page-schemas')
    },
    {
      name: 'URL Redirects',
      href: '/admin/url-redirects',
      icon: Redirect,
      current: pathname.startsWith('/admin/url-redirects')
    },
    {
      name: 'Robots.txt',
      href: '/admin/robots',
      icon: FileText,
      current: pathname.startsWith('/admin/robots')
    }
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-lg font-bold text-gray-900">AM Site Admin</span>
          </div>
          <button
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <div className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    item.current
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    item.current ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                  }`} />
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* SEO Section */}
          <div className="pt-6">
            <div className="px-3 mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                SEO & Technical
              </h3>
            </div>
            <div className="space-y-1">
              {seoItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      item.current
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
                      item.current ? 'text-purple-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`} />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        </nav>

        {/* User section */}
        <div className="flex-shrink-0 border-t border-gray-200 p-4">
          <div className="flex items-center mb-3">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-blue-700">
                  {user?.email?.charAt(0).toUpperCase() || 'G'}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">Guest User</p>
              <p className="text-xs text-gray-500">Demo Mode</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              asChild
            >
              <Link href="/">
                <Eye className="h-4 w-4 mr-1" />
                View Site
              </Link>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={signOut}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-500 hover:text-gray-700"
            >
              <Menu className="h-6 w-6" />
            </button>
            <h1 className="text-lg font-medium text-gray-900">Content Management</h1>
            <div className="w-6" /> {/* Spacer for alignment */}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
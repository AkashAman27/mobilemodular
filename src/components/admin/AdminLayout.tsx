'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import * as Icons from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'
import SyncButton from './SyncButton'

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
  Search,
  Award,
  Brain
} = Icons

const Redirect = RotateCcw

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [user, setUser] = useState<User | null>(null)
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }
    getSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

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
      current: pathname.startsWith('/admin/locations') && !pathname.startsWith('/admin/cities')
    },
    {
      name: 'Cities',
      href: '/admin/cities',
      icon: Building2,
      current: pathname.startsWith('/admin/cities')
    },
    {
      name: 'Our Process',
      href: '/admin/our-process',
      icon: Settings,
      current: pathname.startsWith('/admin/our-process')
    },
    {
      name: 'Quality Standards',
      href: '/admin/quality-standards',
      icon: Award,
      current: pathname.startsWith('/admin/quality-standards')
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
      href: '/admin/page-faqs',
      icon: HelpCircle,
      current: pathname.startsWith('/admin/page-faqs') || pathname.startsWith('/admin/faqs')
    },
    {
      name: 'Internal Links',
      href: '/admin/internal-links',
      icon: LinkIcon,
      current: pathname.startsWith('/admin/internal-links')
    },
    {
      name: 'Footer Content',
      href: '/admin/footer-content',
      icon: FileText,
      current: pathname.startsWith('/admin/footer-content')
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
    // Temporarily disabled - can be re-enabled later
    // {
    //   name: '🤖 AI Analytics',
    //   href: '/admin/ai-analytics',
    //   icon: Brain,
    //   current: pathname.startsWith('/admin/ai-analytics')
    // }
  ]

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
        <div className="flex items-center">
          <Building2 className="h-8 w-8 text-blue-400" />
          <span className="ml-2 text-lg font-bold text-white">CMS Admin</span>
        </div>
        <button
          className="lg:hidden text-slate-400 hover:text-white"
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
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  item.current
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
                  item.current ? 'text-blue-200' : 'text-slate-400 group-hover:text-blue-200'
                }`} />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="pt-6">
          <div className="px-3 mb-2">
            <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
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
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    item.current
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    item.current ? 'text-purple-200' : 'text-slate-400 group-hover:text-purple-200'
                  }`} />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      </nav>

      <div className="flex-shrink-0 border-t border-slate-700 p-4">
        <div className="flex items-center mb-3">
          {/* Display authenticated user info */}
          <div className="flex-shrink-0">
            <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.email?.charAt(0).toUpperCase() || 'A'}
              </span>
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">
              {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Admin User'}
            </p>
            <p className="text-xs text-slate-400">Dashboard Mode</p>
          </div>
        </div>
        <div className="space-y-2">
          {/* Sync Button */}
          <div className="flex justify-center">
            <SyncButton size="md" className="w-full" />
          </div>
          
          {/* Action Buttons */}
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700"
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
              className="bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:border-blue-700"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-slate-900 bg-opacity-50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Single Sidebar - Responsive */}
      <div className="fixed inset-y-0 left-0 z-50 w-64">
        {/* Desktop version - always visible on lg+ */}
        <div className="hidden lg:flex flex-col h-full bg-slate-900 shadow-xl">
          <SidebarContent />
        </div>
        
        {/* Mobile version - only when sidebarOpen */}
        <div className={`lg:hidden flex flex-col h-full bg-slate-900 shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <SidebarContent />
        </div>
      </div>

      <div className="flex">

        {/* Main content area */}
        <div className="lg:pl-64 flex flex-col flex-1">
          {/* Mobile header */}
          <div className="lg:hidden bg-white shadow-sm border-b border-slate-200">
            <div className="flex items-center justify-between h-16 px-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-slate-600 hover:text-slate-900"
              >
                <Menu className="h-6 w-6" />
              </button>
              <h1 className="text-lg font-medium text-slate-900">Content Management</h1>
              <SyncButton size="sm" />
            </div>
          </div>

          {/* Page content */}
          <main className="flex-1 p-4 lg:p-6 min-w-0">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
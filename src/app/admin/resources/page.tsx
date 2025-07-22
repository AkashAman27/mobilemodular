import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, FileText, Calculator, HelpCircle, Settings, BarChart, Users, Edit } from 'lucide-react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

interface ResourceStats {
  totalContent: number
  totalTools: number
  totalCategories: number
  activeContent: number
}

async function getResourceStats(): Promise<ResourceStats> {
  const supabase = createClient()
  
  const [contentResult, toolsResult, categoriesResult, activeContentResult] = await Promise.all([
    supabase.from('resources_content').select('id', { count: 'exact' }),
    supabase.from('planning_tools').select('id', { count: 'exact' }),
    supabase.from('resource_categories').select('id', { count: 'exact' }),
    supabase.from('resources_content').select('id', { count: 'exact' }).eq('is_active', true)
  ])

  return {
    totalContent: contentResult.count || 0,
    totalTools: toolsResult.count || 0,
    totalCategories: categoriesResult.count || 0,
    activeContent: activeContentResult.count || 0
  }
}

async function getRecentContent() {
  const supabase = createClient()
  
  const result = await supabase
    .from('resources_content')
    .select('*')
    .order('updated_at', { ascending: false })
    .limit(5)

  return result.data || []
}

export default async function AdminResourcesPage() {
  const stats = await getResourceStats()
  const recentContent = await getRecentContent()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Resources Management</h1>
            <p className="text-muted-foreground">
              Manage resource content, planning tools, and FAQ data across the site.
            </p>
          </div>
          <div className="flex space-x-2">
            <Link href="/admin/resources/content/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Content
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Content
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalContent}</div>
              <p className="text-xs text-muted-foreground">
                {stats.activeContent} active
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Planning Tools
              </CardTitle>
              <Calculator className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTools}</div>
              <p className="text-xs text-muted-foreground">
                Interactive tools
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Categories
              </CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCategories}</div>
              <p className="text-xs text-muted-foreground">
                Resource categories
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                FAQ Items
              </CardTitle>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">124</div>
              <p className="text-xs text-muted-foreground">
                Across all categories
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href="/admin/resources/content">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Resource Content
                </CardTitle>
                <CardDescription>
                  Manage main resource page content, sections, and statistics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-start">
                  <Edit className="mr-2 h-4 w-4" />
                  Manage Content
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href="/admin/resources/planning-tools">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calculator className="mr-2 h-5 w-5" />
                  Planning Tools
                </CardTitle>
                <CardDescription>
                  Configure calculators, forms, and interactive planning resources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure Tools
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href="/admin/resources/categories">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Categories
                </CardTitle>
                <CardDescription>
                  Manage resource categories, icons, and organization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Categories
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href="/admin/resources/faq">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <HelpCircle className="mr-2 h-5 w-5" />
                  FAQ Management
                </CardTitle>
                <CardDescription>
                  Add, edit, and organize frequently asked questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-start">
                  <Edit className="mr-2 h-4 w-4" />
                  Manage FAQ
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href="/admin/resources/analytics">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-5 w-5" />
                  Analytics
                </CardTitle>
                <CardDescription>
                  View usage statistics and popular content metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart className="mr-2 h-4 w-4" />
                  View Analytics
                </Button>
              </CardContent>
            </Link>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <Link href="/admin/resources/settings">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="mr-2 h-5 w-5" />
                  Settings
                </CardTitle>
                <CardDescription>
                  Configure global resource settings and preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure Settings
                </Button>
              </CardContent>
            </Link>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Content Updates</CardTitle>
            <CardDescription>
              Latest changes to resource content and planning tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentContent.length > 0 ? (
                recentContent.map((content, index) => (
                  <div key={content.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">{content.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {content.section_type} • Updated {new Date(content.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs ${content.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        {content.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <Link href={`/admin/resources/content/${content.id}`}>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No content updates yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Page Links */}
        <Card>
          <CardHeader>
            <CardTitle>Resource Pages</CardTitle>
            <CardDescription>
              Quick access to manage resource section pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Link href="/resources" target="_blank" className="flex items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <h4 className="font-semibold">Main Resources</h4>
                  <p className="text-sm text-muted-foreground">/resources</p>
                </div>
              </Link>

              <Link href="/resources/planning-tools" target="_blank" className="flex items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <h4 className="font-semibold">Planning Tools</h4>
                  <p className="text-sm text-muted-foreground">/resources/planning-tools</p>
                </div>
              </Link>

              <Link href="/resources/faq" target="_blank" className="flex items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <h4 className="font-semibold">FAQ Center</h4>
                  <p className="text-sm text-muted-foreground">/resources/faq</p>
                </div>
              </Link>

              <Link href="/resources/case-studies" target="_blank" className="flex items-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                <div className="flex-1">
                  <h4 className="font-semibold">Case Studies</h4>
                  <p className="text-sm text-muted-foreground">/resources/case-studies</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
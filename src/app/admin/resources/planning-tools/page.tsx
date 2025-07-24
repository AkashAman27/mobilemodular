import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Eye, MoreHorizontal, Calculator, ArrowLeft, Search, Settings } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import PreviewButton from '@/components/admin/PreviewButton'

async function getPlanningTools() {
  const supabase = createClient()
  
  const result = await supabase
    .from('planning_tools')
    .select('*')
    .order('order_index', { ascending: true })

  return result.data || []
}

export default async function AdminPlanningToolsPage() {
  const tools = await getPlanningTools()

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/admin/resources">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Resources
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Planning Tools</h1>
              <p className="text-muted-foreground">
                Manage interactive calculators and planning resources
              </p>
            </div>
          </div>
          <div className="flex space-x-2">
            <PreviewButton 
              href="/resources/planning-tools"
              label="Preview Planning Tools"
              variant="outline"
              size="sm"
            />
            <Link href="/admin/resources/planning-tools/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Tool
              </Button>
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search planning tools..." className="pl-10" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Tools Table */}
        <Card>
          <CardHeader>
            <CardTitle>Planning Tools</CardTitle>
            <CardDescription>
              Interactive calculators and planning resources for customers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tool Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tools.length > 0 ? (
                  tools.map((tool) => (
                    <TableRow key={tool.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-3">
                          <Calculator className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <div className="font-semibold">{tool.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {tool.description?.substring(0, 60)}...
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {tool.category}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          Calculator
                        </Badge>
                      </TableCell>
                      <TableCell>{tool.order_index}</TableCell>
                      <TableCell>
                        <Badge variant={tool.is_active ? "default" : "secondary"}>
                          {tool.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(tool.updated_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Configure
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <div className="flex flex-col items-center space-y-4">
                        <Calculator className="h-12 w-12 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">No planning tools found</p>
                          <p className="text-sm text-muted-foreground">Add your first planning tool to get started</p>
                        </div>
                        <Link href="/admin/resources/planning-tools/new">
                          <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Planning Tool
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Tool Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Tool Categories</CardTitle>
            <CardDescription>
              Available categories for organizing planning tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Size Calculator</h4>
                <p className="text-sm text-muted-foreground">
                  Tools for calculating space requirements
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Cost Estimator</h4>
                <p className="text-sm text-muted-foreground">
                  Tools for estimating project costs
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Timeline Planner</h4>
                <p className="text-sm text-muted-foreground">
                  Tools for project timeline planning
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Site Requirements</h4>
                <p className="text-sm text-muted-foreground">
                  Tools for site preparation planning
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common administrative tasks for planning tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="font-semibold">Import Tools</div>
                  <div className="text-sm text-muted-foreground">Import tools from CSV or JSON</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="font-semibold">Export Configuration</div>
                  <div className="text-sm text-muted-foreground">Export current tool settings</div>
                </div>
              </Button>
              <Button variant="outline" className="h-auto p-4 justify-start">
                <div className="text-left">
                  <div className="font-semibold">Reset Defaults</div>
                  <div className="text-sm text-muted-foreground">Reset tools to default configuration</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
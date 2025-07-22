import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Eye, MoreHorizontal, FileText, ArrowLeft, Search } from 'lucide-react'
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

async function getResourceContent() {
  const supabase = createClient()
  
  const result = await supabase
    .from('resources_content')
    .select('*')
    .order('order_index', { ascending: true })

  return result.data || []
}

export default async function AdminResourceContentPage() {
  const content = await getResourceContent()

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
              <h1 className="text-3xl font-bold tracking-tight">Resource Content</h1>
              <p className="text-muted-foreground">
                Manage content sections for the main resources page
              </p>
            </div>
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

        {/* Search and Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input placeholder="Search content..." className="pl-10" />
              </div>
              <Button variant="outline">Filter</Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Table */}
        <Card>
          <CardHeader>
            <CardTitle>Content Sections</CardTitle>
            <CardDescription>
              All content sections for the resources page
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Section Type</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {content.length > 0 ? (
                  content.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        <div>
                          <div className="font-semibold">{item.title}</div>
                          {item.subtitle && (
                            <div className="text-sm text-muted-foreground">{item.subtitle}</div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {item.section_type}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.order_index}</TableCell>
                      <TableCell>
                        <Badge variant={item.is_active ? "default" : "secondary"}>
                          {item.is_active ? 'Active' : 'Inactive'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(item.updated_at).toLocaleDateString()}
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
                              View
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
                    <TableCell colSpan={6} className="text-center py-8">
                      <div className="flex flex-col items-center space-y-4">
                        <FileText className="h-12 w-12 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">No content sections found</p>
                          <p className="text-sm text-muted-foreground">Add your first content section to get started</p>
                        </div>
                        <Link href="/admin/resources/content/new">
                          <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Content
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

        {/* Content Types Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Content Types</CardTitle>
            <CardDescription>
              Overview of different content section types available
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Overview</h4>
                <p className="text-sm text-muted-foreground">
                  Main hero content with title, description, and stats
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Section</h4>
                <p className="text-sm text-muted-foreground">
                  Individual content sections with icons and descriptions
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Feature</h4>
                <p className="text-sm text-muted-foreground">
                  Feature highlights with benefits and details
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
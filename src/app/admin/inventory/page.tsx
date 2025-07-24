'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, MapPin, 
  Building, Star, AlertCircle, CheckCircle 
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import PreviewButton from '@/components/admin/PreviewButton'

interface InventoryItem {
  id: string
  name: string
  model_number: string
  width_feet: number
  length_feet: number
  square_feet: number
  location_state: string
  location_city: string
  main_image_url: string
  availability_status: string
  rating: number
  review_count: number
  is_featured: boolean
  is_active: boolean
  created_at: string
  category: {
    name: string
    slug: string
  }
  floorplans: Array<{
    id: string
    name: string
    rental_price_monthly: number
  }>
}

interface InventoryCategory {
  id: string
  name: string
  slug: string
}

export default function InventoryAdminPage() {
  const [items, setItems] = useState<InventoryItem[]>([])
  const [categories, setCategories] = useState<InventoryCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('inventory_categories')
        .select('id, name, slug')
        .eq('is_active', true)
        .order('order_index')

      // Fetch inventory items with related data
      const { data: itemsData } = await supabase
        .from('inventory_items')
        .select(`
          *,
          category:inventory_categories(name, slug),
          floorplans(id, name, rental_price_monthly)
        `)
        .order('created_at', { ascending: false })

      setCategories(categoriesData || [])
      setItems(itemsData || [])
    } catch (error) {
      console.error('Error fetching inventory data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('inventory_items')
        .delete()
        .eq('id', id)

      if (error) throw error

      setItems(items.filter(item => item.id !== id))
      setDeleteDialogOpen(false)
      setItemToDelete(null)
    } catch (error) {
      console.error('Error deleting item:', error)
    }
  }

  const handleToggleStatus = async (id: string, newStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('inventory_items')
        .update({ is_active: newStatus })
        .eq('id', id)

      if (error) throw error

      setItems(items.map(item => 
        item.id === id ? { ...item, is_active: newStatus } : item
      ))
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const handleToggleFeatured = async (id: string, newFeatured: boolean) => {
    try {
      const { error } = await supabase
        .from('inventory_items')
        .update({ is_featured: newFeatured })
        .eq('id', id)

      if (error) throw error

      setItems(items.map(item => 
        item.id === id ? { ...item, is_featured: newFeatured } : item
      ))
    } catch (error) {
      console.error('Error updating featured status:', error)
    }
  }

  const filteredItems = items.filter(item => {
    const matchesSearch = searchQuery === '' || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.model_number.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || item.category?.slug === selectedCategory
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'active' && item.is_active) ||
      (selectedStatus === 'inactive' && !item.is_active) ||
      (selectedStatus === 'available' && item.availability_status === 'available') ||
      (selectedStatus === 'rented' && item.availability_status === 'rented')
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const stats = {
    total: items.length,
    active: items.filter(item => item.is_active).length,
    available: items.filter(item => item.availability_status === 'available').length,
    featured: items.filter(item => item.is_featured).length
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading inventory...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Manage your modular building inventory</p>
        </div>
        <div className="flex space-x-2">
          <PreviewButton 
            href="/resources/live-inventory"
            label="Preview Live Inventory"
            variant="outline"
            size="sm"
          />
          <Button asChild>
            <Link href="/admin/inventory/new">
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Building className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active</p>
                <p className="text-2xl font-bold text-green-600">{stats.active}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available</p>
                <p className="text-2xl font-bold text-blue-600">{stats.available}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Featured</p>
                <p className="text-2xl font-bold text-orange-600">{stats.featured}</p>
              </div>
              <Star className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.slug}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="rented">Rented</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Items Table */}
      <Card>
        <CardHeader>
          <CardTitle>Inventory Items ({filteredItems.length})</CardTitle>
          <CardDescription>
            Manage your inventory items, update availability, and track performance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Dimensions</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Floorplans</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="relative w-16 h-12 bg-gray-100 rounded overflow-hidden">
                        <Image
                          src={item.main_image_url || '/images/placeholder-building.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-gray-500">{item.model_number}</div>
                        <div className="flex items-center space-x-2 mt-1">
                          {item.is_featured && (
                            <Badge className="bg-orange-100 text-orange-800 text-xs">
                              Featured
                            </Badge>
                          )}
                          <Badge 
                            variant={item.is_active ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {item.is_active ? 'Active' : 'Inactive'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.category?.name || 'N/A'}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <div>{item.width_feet}' × {item.length_feet}'</div>
                      <div className="text-gray-500">{item.square_feet} sq ft</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center text-sm">
                      <MapPin className="h-4 w-4 mr-1 text-gray-400" />
                      {item.location_city}, {item.location_state}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        item.availability_status === 'available' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }
                    >
                      {item.availability_status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {item.rating > 0 ? (
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                        <span className="text-sm">{item.rating} ({item.review_count})</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">No reviews</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      {item.floorplans?.length || 0} floorplan{item.floorplans?.length !== 1 ? 's' : ''}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/resources/live-inventory/${item.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/inventory/${item.id}`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleStatus(item.id, !item.is_active)}
                        className={item.is_active ? 'text-red-600' : 'text-green-600'}
                      >
                        {item.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleToggleFeatured(item.id, !item.is_featured)}
                        className={item.is_featured ? 'text-orange-600' : 'text-gray-600'}
                      >
                        {item.is_featured ? 'Unfeature' : 'Feature'}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setItemToDelete(item.id)
                          setDeleteDialogOpen(true)
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredItems.length === 0 && (
            <div className="text-center py-8">
              <Building className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No items found</h3>
              <p className="text-gray-500">Try adjusting your search or filters</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Modal */}
      {deleteDialogOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setDeleteDialogOpen(false)} />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Inventory Item</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this inventory item? This action cannot be undone and will also delete all associated floorplans.
                </p>
                <div className="flex justify-end space-x-3">
                  <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    variant="destructive" 
                    onClick={() => itemToDelete && handleDelete(itemToDelete)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
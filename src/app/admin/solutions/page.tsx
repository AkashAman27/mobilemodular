'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, ArrowLeft, Eye, EyeOff, Hash, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PreviewModal from '@/components/admin/PreviewModal'
import SolutionPreview from '@/components/admin/SolutionPreview'

interface Solution {
  id: string
  slug: string
  name: string
  description: string
  features: string[]
  image_url: string
  category: string
  starting_price: string
  dimensions: string
  capacity: string
  power: string
  climate_control: boolean
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export default function SolutionsAdmin() {
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [loading, setLoading] = useState(true)
  const [previewSolution, setPreviewSolution] = useState<Solution | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  useEffect(() => {
    fetchSolutions()
  }, [])

  const fetchSolutions = async () => {
    try {
      const { data, error } = await supabase
        .from('solutions')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) {
        // Silent error handling - removed console.error
        return
      }

      setSolutions(data || [])
    } catch (error) {
      // Silent error handling - removed console.error
    } finally {
      setLoading(false)
    }
  }

  const deleteSolution = async (id: string) => {
    if (!confirm('Are you sure you want to delete this solution?')) return

    try {
      const { error } = await supabase
        .from('solutions')
        .delete()
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        alert('Error deleting solution')
        return
      }

      setSolutions(solutions.filter(solution => solution.id !== id))
      alert('Solution deleted successfully')
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error deleting solution')
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('solutions')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        alert('Error updating solution')
        return
      }

      setSolutions(solutions.map(item => 
        item.id === id ? { ...item, is_active: !currentStatus } : item
      ))
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error updating solution')
    }
  }

  const handlePreview = (solution: Solution) => {
    setPreviewSolution(solution)
    setIsPreviewOpen(true)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      office: 'bg-blue-100 text-blue-800',
      education: 'bg-green-100 text-green-800',
      storage: 'bg-yellow-100 text-yellow-800',
      healthcare: 'bg-red-100 text-red-800',
      security: 'bg-purple-100 text-purple-800',
      restaurant: 'bg-orange-100 text-orange-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading solutions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Solutions Management</h1>
                <p className="text-gray-600">Manage modular building solutions</p>
              </div>
            </div>
            <Link href="/admin/solutions/new">
              <Button className="bg-navy-600 hover:bg-navy-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Solution
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {solutions.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Solutions Found</CardTitle>
              <CardDescription>
                No solutions have been created yet. Click the button above to add your first solution.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => (
              <Card key={solution.id} className={`hover:shadow-lg transition-shadow ${!solution.is_active ? 'opacity-60' : ''}`}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(solution.category)}`}>
                          {solution.category}
                        </span>
                        <div className="flex items-center space-x-1 text-green-600">
                          <DollarSign className="h-3 w-3" />
                          <span className="font-medium text-sm">{solution.starting_price}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{solution.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {solution.description.substring(0, 100)}...
                      </CardDescription>
                      <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                        <div className="flex items-center space-x-2">
                          <Hash className="h-3 w-3" />
                          <span>Order: {solution.display_order}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {solution.is_active ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-red-600" />
                          )}
                          <span className={solution.is_active ? 'text-green-600' : 'text-red-600'}>
                            {solution.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-medium">Dimensions:</span> {solution.dimensions}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Capacity:</span> {solution.capacity}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Features:</span> {solution.features.length} items
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(solution)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Link href={`/admin/solutions/${solution.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(solution.id, solution.is_active)}
                      className={`${solution.is_active ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`}
                    >
                      {solution.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteSolution(solution.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={`Preview: ${previewSolution?.name || 'Solution'}`}
      >
        {previewSolution && <SolutionPreview solution={previewSolution} />}
      </PreviewModal>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, ArrowLeft, Users } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

interface Industry {
  id: string
  slug: string
  name: string
  description: string
  image_url: string
  case_studies_count: number
  created_at: string
  updated_at: string
}

export default function IndustriesAdmin() {
  const [industries, setIndustries] = useState<Industry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchIndustries()
  }, [])

  const fetchIndustries = async () => {
    try {
      const { data, error } = await supabase
        .from('industries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        // Silent error handling - removed console.error
        return
      }

      setIndustries(data || [])
    } catch (error) {
      // Silent error handling - removed console.error
    } finally {
      setLoading(false)
    }
  }

  const deleteIndustry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this industry?')) return

    try {
      const { error } = await supabase
        .from('industries')
        .delete()
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        alert('Error deleting industry')
        return
      }

      setIndustries(industries.filter(industry => industry.id !== id))
      alert('Industry deleted successfully')
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error deleting industry')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading industries...</p>
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
                <h1 className="text-3xl font-bold text-gray-900">Industries Management</h1>
                <p className="text-gray-600">Manage industry-specific content</p>
              </div>
            </div>
            <Link href="/admin/industries/new">
              <Button className="bg-navy-600 hover:bg-navy-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Industry
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {industries.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Industries Found</CardTitle>
              <CardDescription>
                No industries have been created yet. Click the button above to add your first industry.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((industry) => (
              <Card key={industry.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Users className="h-5 w-5 text-green-600" />
                        <span>{industry.name}</span>
                      </CardTitle>
                      <CardDescription className="text-sm mt-2">
                        {industry.description.substring(0, 100)}...
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {industry.image_url && (
                    <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={industry.image_url}
                        alt={industry.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-medium">Case Studies:</span> {industry.case_studies_count}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Slug:</span> {industry.slug}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link href={`/admin/industries/${industry.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteIndustry(industry.id)}
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
    </div>
  )
}
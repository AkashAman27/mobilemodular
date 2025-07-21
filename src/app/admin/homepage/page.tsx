'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, ArrowLeft, Home, Eye, EyeOff, Hash } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'

interface HomepageContent {
  id: string
  section: string
  title: string
  subtitle: string
  content: string
  image_url: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export default function HomepageAdmin() {
  const [homepageContent, setHomepageContent] = useState<HomepageContent[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState<string>('all')

  useEffect(() => {
    fetchHomepageContent()
  }, [])

  const fetchHomepageContent = async () => {
    try {
      const { data, error } = await supabase
        .from('homepage_content')
        .select('*')
        .order('section', { ascending: true })
        .order('sort_order', { ascending: true })

      if (error) {
        // Silent error handling - removed console.error
        return
      }

      setHomepageContent(data || [])
    } catch (error) {
      // Silent error handling - removed console.error
    } finally {
      setLoading(false)
    }
  }

  const deleteHomepageContent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this homepage section?')) return

    try {
      const { error } = await supabase
        .from('homepage_content')
        .delete()
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        alert('Error deleting homepage section')
        return
      }

      setHomepageContent(homepageContent.filter(item => item.id !== id))
      alert('Homepage section deleted successfully')
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error deleting homepage section')
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('homepage_content')
        .update({ is_active: !currentStatus })
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        alert('Error updating homepage section')
        return
      }

      setHomepageContent(homepageContent.map(item => 
        item.id === id ? { ...item, is_active: !currentStatus } : item
      ))
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error updating homepage section')
    }
  }

  const getSectionColor = (section: string) => {
    const colors = {
      solutions_grid: 'bg-blue-100 text-blue-800',
      value_proposition: 'bg-green-100 text-green-800',
      news_insights: 'bg-purple-100 text-purple-800',
      locations_map: 'bg-orange-100 text-orange-800',
      hero_section: 'bg-red-100 text-red-800',
      testimonials: 'bg-indigo-100 text-indigo-800'
    }
    return colors[section as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getUniqueSections = () => {
    const sections = Array.from(new Set(homepageContent.map(item => item.section)))
    return sections.sort()
  }

  const filteredContent = selectedSection === 'all' 
    ? homepageContent 
    : homepageContent.filter(item => item.section === selectedSection)

  const getContentBySection = () => {
    const groupedContent: { [key: string]: HomepageContent[] } = {}
    filteredContent.forEach(item => {
      if (!groupedContent[item.section]) {
        groupedContent[item.section] = []
      }
      groupedContent[item.section].push(item)
    })
    return groupedContent
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading homepage content...</p>
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
                <h1 className="text-3xl font-bold text-gray-900">Homepage Content Management</h1>
                <p className="text-gray-600">Manage homepage sections and content</p>
              </div>
            </div>
            <Link href="/admin/homepage/new">
              <Button className="bg-navy-600 hover:bg-navy-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Homepage Content
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedSection === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedSection('all')}
            className={selectedSection === 'all' ? 'bg-navy-600 hover:bg-navy-700' : ''}
          >
            All Sections ({homepageContent.length})
          </Button>
          {getUniqueSections().map(section => {
            const count = homepageContent.filter(item => item.section === section).length
            return (
              <Button
                key={section}
                variant={selectedSection === section ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedSection(section)}
                className={selectedSection === section ? 'bg-navy-600 hover:bg-navy-700' : ''}
              >
                {section.replace('_', ' ')} ({count})
              </Button>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {filteredContent.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Homepage Content Found</CardTitle>
              <CardDescription>
                {selectedSection === 'all' 
                  ? 'No homepage content has been created yet. Click the button above to add your first content section.'
                  : `No content found in the ${selectedSection.replace('_', ' ')} section.`
                }
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(getContentBySection()).map(([section, sectionContent]) => (
              <div key={section}>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium mr-3 ${getSectionColor(section)}`}>
                    {section.replace('_', ' ')}
                  </span>
                  ({sectionContent.length} items)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sectionContent.map((item) => (
                    <Card key={item.id} className={`hover:shadow-lg transition-shadow ${!item.is_active ? 'opacity-60' : ''}`}>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-start space-x-2">
                          <Home className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                          <span className="line-clamp-2">{item.title || 'Untitled'}</span>
                        </CardTitle>
                        {item.subtitle && (
                          <CardDescription className="text-sm line-clamp-1">
                            {item.subtitle}
                          </CardDescription>
                        )}
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-2">
                            <Hash className="h-3 w-3" />
                            <span>Order: {item.sort_order}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {item.is_active ? (
                              <Eye className="h-4 w-4 text-green-600" />
                            ) : (
                              <EyeOff className="h-4 w-4 text-red-600" />
                            )}
                            <span className={item.is_active ? 'text-green-600' : 'text-red-600'}>
                              {item.is_active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        {item.content && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-600 line-clamp-3">
                              {item.content}
                            </p>
                          </div>
                        )}
                        
                        <div className="flex space-x-2">
                          <Link href={`/admin/homepage/${item.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleActive(item.id, item.is_active)}
                            className={`${item.is_active ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : 'text-green-600 hover:text-green-700 hover:bg-green-50'}`}
                          >
                            {item.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteHomepageContent(item.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
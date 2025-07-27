'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, ArrowLeft, Settings, Eye, Star, Hash } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PreviewButton from '@/components/admin/PreviewButton'

interface FAQ {
  id: string
  category: string
  question: string
  answer: string
  display_order: number
  is_active: boolean
  tags: string[]
  is_featured: boolean
  created_at: string
  updated_at: string
}

interface Page {
  id: string
  slug: string
  title: string
  description: string
}

interface PageFAQ {
  id: string
  page_id: string
  faq_id: string
  display_order: number
  is_featured: boolean
  faq: FAQ
}

export default function PageFAQsAdmin() {
  const [pages, setPages] = useState<Page[]>([])
  const [selectedPage, setSelectedPage] = useState<string>('')
  const [pageFaqs, setPageFaqs] = useState<PageFAQ[]>([])
  const [availableFaqs, setAvailableFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [assignLoading, setAssignLoading] = useState(false)

  useEffect(() => {
    fetchPages()
    fetchAllFaqs()
  }, [])

  useEffect(() => {
    if (selectedPage) {
      fetchPageFaqs()
    }
  }, [selectedPage])

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/admin/pages')
      const result = await response.json()

      if (!response.ok || !result.success) {
        console.error('Error fetching pages:', result)
        alert(`Error loading pages: ${result.error || 'Unknown error'}`)
        return
      }

      setPages(result.pages || [])
      if (result.pages && result.pages.length > 0 && !selectedPage) {
        setSelectedPage(result.pages[0].id)
      }
    } catch (error) {
      console.error('Error fetching pages:', error)
      alert(`Error loading pages: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const fetchAllFaqs = async () => {
    try {
      const response = await fetch('/api/admin/faqs')
      const result = await response.json()

      if (response.ok && result.success) {
        setAvailableFaqs(result.faqs || [])
      } else {
        console.error('Error fetching FAQs:', result)
      }
    } catch (error) {
      console.error('Error fetching FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchPageFaqs = async () => {
    if (!selectedPage) return

    try {
      const response = await fetch(`/api/admin/page-faqs?pageId=${selectedPage}`)
      const result = await response.json()

      if (!response.ok || !result.success) {
        console.error('Error fetching page FAQs:', result)
        alert(`Error loading page FAQs: ${result.error || 'Unknown error'}`)
        return
      }

      setPageFaqs(result.pageFaqs || [])
    } catch (error) {
      console.error('Error fetching page FAQs:', error)
      alert(`Error loading page FAQs: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  const assignFaqToPage = async (faqId: string) => {
    if (!selectedPage) {
      alert('Please select a page first')
      return
    }

    setAssignLoading(true)
    try {
      // Find the page slug from the selected page ID
      const selectedPageData = pages.find(page => page.id === selectedPage)
      if (!selectedPageData) {
        alert('Selected page not found')
        setAssignLoading(false)
        return
      }

      // Use API endpoint with service role key to bypass RLS
      const response = await fetch('/api/assign-faq-to-page-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageSlug: selectedPageData.slug,
          faqId: faqId
        })
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        console.error('API error:', result)
        
        // Provide more helpful error messages
        let errorMessage = result.error || 'Unknown error'
        if (errorMessage.includes('Service role key')) {
          errorMessage = 'Admin permissions not configured. Please check environment variables.'
        } else if (errorMessage.includes('Page not found')) {
          errorMessage = 'Selected page could not be found. Please refresh and try again.'
        } else if (errorMessage.includes('already assigned')) {
          errorMessage = 'This FAQ is already assigned to the selected page.'
        }
        
        alert(`Error assigning FAQ to page: ${errorMessage}`)
        return
      }

      await fetchPageFaqs()
      alert('FAQ assigned to page successfully')
    } catch (error) {
      console.error('Assignment error:', error)
      alert(`Error assigning FAQ to page: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setAssignLoading(false)
    }
  }

  const removeFaqFromPage = async (pageFaqId: string) => {
    if (!confirm('Remove this FAQ from the page?')) return

    try {
      // Find the assignment to get page and FAQ IDs
      const assignment = pageFaqs.find(pf => pf.id === pageFaqId)
      if (!assignment) {
        alert('Assignment not found')
        return
      }

      // Find the page slug from the page ID
      const pageData = pages.find(page => page.id === assignment.page_id)
      if (!pageData) {
        alert('Page not found')
        return
      }

      const response = await fetch(`/api/assign-faq-to-page-admin`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageSlug: pageData.slug,
          faqId: assignment.faq_id
        })
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        console.error('API error:', result)
        
        // Provide more helpful error messages  
        let errorMessage = result.error || 'Unknown error'
        if (errorMessage.includes('Service role key')) {
          errorMessage = 'Admin permissions not configured. Please check environment variables.'
        } else if (errorMessage.includes('Page not found')) {
          errorMessage = 'Selected page could not be found. Please refresh and try again.'
        }
        
        alert(`Error removing FAQ from page: ${errorMessage}`)
        return
      }

      setPageFaqs(pageFaqs.filter(pf => pf.id !== pageFaqId))
      alert('FAQ removed from page successfully')
    } catch (error) {
      console.error('Remove error:', error)
      alert('Error removing FAQ from page')
    }
  }

  const toggleFeatured = async (pageFaqId: string, currentFeatured: boolean) => {
    try {
      const response = await fetch('/api/admin/page-faqs/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pageFaqId,
          is_featured: !currentFeatured
        })
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        alert(`Error updating featured status: ${result.error || 'Unknown error'}`)
        return
      }

      fetchPageFaqs()
    } catch (error) {
      alert('Error updating featured status')
    }
  }

  const updateDisplayOrder = async (pageFaqId: string, newOrder: number) => {
    try {
      const response = await fetch('/api/admin/page-faqs/update', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pageFaqId,
          display_order: newOrder
        })
      })

      const result = await response.json()

      if (!response.ok || !result.success) {
        alert(`Error updating display order: ${result.error || 'Unknown error'}`)
        return
      }

      fetchPageFaqs()
    } catch (error) {
      alert('Error updating display order')
    }
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      General: 'bg-blue-100 text-blue-800',
      Solutions: 'bg-green-100 text-green-800',
      Industries: 'bg-purple-100 text-purple-800',
      Locations: 'bg-orange-100 text-orange-800',
      Resources: 'bg-indigo-100 text-indigo-800',
      Company: 'bg-gray-100 text-gray-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getUnassignedFaqs = () => {
    const assignedFaqIds = new Set(pageFaqs.map(pf => pf.faq_id))
    return availableFaqs.filter(faq => !assignedFaqIds.has(faq.id))
  }

  const selectedPageData = pages.find(page => page.id === selectedPage)

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading page FAQs...</p>
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
                <h1 className="text-3xl font-bold text-gray-900">Page-Specific FAQs</h1>
                <p className="text-gray-600">Manage FAQs for specific pages</p>
              </div>
            </div>
            <div className="flex space-x-2">
              {selectedPageData && (
                <PreviewButton 
                  href={selectedPageData.slug === 'home' ? '/' : `/${selectedPageData.slug}`}
                  label={`Preview ${selectedPageData.title}`}
                  variant="outline"
                  size="sm"
                />
              )}
              <Link href="/admin/faqs">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Create/Edit FAQs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Page Selection */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Card>
          <CardHeader>
            <CardTitle>Select Page</CardTitle>
            <CardDescription>Choose a page to manage its FAQs</CardDescription>
          </CardHeader>
          <CardContent>
            <Select value={selectedPage} onValueChange={setSelectedPage}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a page" />
              </SelectTrigger>
              <SelectContent>
                {pages.map((page) => (
                  <SelectItem key={page.id} value={page.id}>
                    {page.title} ({page.slug})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedPageData && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{selectedPageData.description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {selectedPage && (
        <div className="max-w-7xl mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Assigned FAQs */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Assigned FAQs ({pageFaqs.length})
              </h2>
              
              {pageFaqs.length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">No FAQs assigned to this page yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {pageFaqs.map((pageFaq) => (
                    <Card key={pageFaq.id} className="relative">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge className={getCategoryColor(pageFaq.faq.category)}>
                                {pageFaq.faq.category}
                              </Badge>
                              {pageFaq.is_featured && (
                                <Badge variant="secondary">
                                  <Star className="h-3 w-3 mr-1" />
                                  Featured
                                </Badge>
                              )}
                            </div>
                            <CardTitle className="text-lg">{pageFaq.faq.question}</CardTitle>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                              <Hash className="h-3 w-3" />
                              <span>Order: {pageFaq.display_order}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                          {pageFaq.faq.answer}
                        </p>
                        
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => toggleFeatured(pageFaq.id, pageFaq.is_featured)}
                          >
                            <Star className={`h-4 w-4 ${pageFaq.is_featured ? 'fill-current' : ''}`} />
                          </Button>
                          <input
                            type="number"
                            value={pageFaq.display_order}
                            onChange={(e) => updateDisplayOrder(pageFaq.id, parseInt(e.target.value) || 0)}
                            className="w-16 px-2 py-1 text-sm border rounded"
                            min="0"
                          />
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFaqFromPage(pageFaq.id)}
                            className="text-red-600 hover:text-red-700"
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

            {/* Available FAQs */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Available FAQs ({getUnassignedFaqs().length})
              </h2>
              
              {getUnassignedFaqs().length === 0 ? (
                <Card>
                  <CardContent className="p-6 text-center">
                    <p className="text-gray-500">All FAQs are already assigned to this page.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4 max-h-[600px] overflow-y-auto">
                  {getUnassignedFaqs().map((faq) => (
                    <Card key={faq.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Badge className={getCategoryColor(faq.category)}>
                              {faq.category}
                            </Badge>
                            <CardTitle className="text-lg mt-2">{faq.question}</CardTitle>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                          {faq.answer}
                        </p>
                        
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            onClick={() => assignFaqToPage(faq.id)}
                            disabled={assignLoading}
                            className="bg-navy-600 hover:bg-navy-700"
                          >
                            <Plus className="h-4 w-4 mr-1" />
                            Assign
                          </Button>
                          <Link href={`/admin/faqs/${faq.id}`}>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
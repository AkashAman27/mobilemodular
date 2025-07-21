'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, ArrowLeft, HelpCircle, Hash, Eye } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PreviewModal from '@/components/admin/PreviewModal'
import FAQPreview from '@/components/admin/FAQPreview'

interface FAQ {
  id: string
  category: string
  question: string
  answer: string
  sort_order: number
  created_at: string
  updated_at: string
}

export default function FAQsAdmin() {
  const [faqs, setFaqs] = useState<FAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [previewFAQ, setPreviewFAQ] = useState<FAQ | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  useEffect(() => {
    fetchFaqs()
  }, [])

  const fetchFaqs = async () => {
    try {
      const { data, error } = await supabase
        .from('faqs')
        .select('*')
        .order('category', { ascending: true })
        .order('sort_order', { ascending: true })

      if (error) {
        // Silent error handling - removed console.error
        return
      }

      setFaqs(data || [])
    } catch (error) {
      // Silent error handling - removed console.error
    } finally {
      setLoading(false)
    }
  }

  const deleteFaq = async (id: string) => {
    if (!confirm('Are you sure you want to delete this FAQ?')) return

    try {
      const { error } = await supabase
        .from('faqs')
        .delete()
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        alert('Error deleting FAQ')
        return
      }

      setFaqs(faqs.filter(faq => faq.id !== id))
      alert('FAQ deleted successfully')
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error deleting FAQ')
    }
  }

  const handlePreview = (faq: FAQ) => {
    setPreviewFAQ(faq)
    setIsPreviewOpen(true)
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

  const getUniqueCategories = () => {
    const categories = Array.from(new Set(faqs.map(faq => faq.category)))
    return categories.sort()
  }

  const filteredFaqs = selectedCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === selectedCategory)

  const getFaqsByCategory = () => {
    const groupedFaqs: { [key: string]: FAQ[] } = {}
    filteredFaqs.forEach(faq => {
      if (!groupedFaqs[faq.category]) {
        groupedFaqs[faq.category] = []
      }
      groupedFaqs[faq.category].push(faq)
    })
    return groupedFaqs
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading FAQs...</p>
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
                <h1 className="text-3xl font-bold text-gray-900">FAQs Management</h1>
                <p className="text-gray-600">Manage frequently asked questions</p>
              </div>
            </div>
            <Link href="/admin/faqs/new">
              <Button className="bg-navy-600 hover:bg-navy-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory('all')}
            className={selectedCategory === 'all' ? 'bg-navy-600 hover:bg-navy-700' : ''}
          >
            All Categories ({faqs.length})
          </Button>
          {getUniqueCategories().map(category => {
            const count = faqs.filter(faq => faq.category === category).length
            return (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-navy-600 hover:bg-navy-700' : ''}
              >
                {category} ({count})
              </Button>
            )
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        {filteredFaqs.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No FAQs Found</CardTitle>
              <CardDescription>
                {selectedCategory === 'all' 
                  ? 'No FAQs have been created yet. Click the button above to add your first FAQ.'
                  : `No FAQs found in the ${selectedCategory} category.`
                }
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="space-y-6">
            {Object.entries(getFaqsByCategory()).map(([category, categoryFaqs]) => (
              <div key={category}>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium mr-3 ${getCategoryColor(category)}`}>
                    {category}
                  </span>
                  ({categoryFaqs.length} FAQs)
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {categoryFaqs.map((faq) => (
                    <Card key={faq.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg flex items-start space-x-2">
                          <HelpCircle className="h-5 w-5 text-indigo-600 mt-1 flex-shrink-0" />
                          <span className="line-clamp-2">{faq.question}</span>
                        </CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-gray-500">
                          <Hash className="h-3 w-3" />
                          <span>Sort: {faq.sort_order}</span>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <p className="text-sm text-gray-600 line-clamp-3">
                            {faq.answer}
                          </p>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handlePreview(faq)}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Link href={`/admin/faqs/${faq.id}`} className="flex-1">
                            <Button variant="outline" size="sm" className="w-full">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteFaq(faq.id)}
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

      {/* Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title={`Preview: ${previewFAQ?.question || 'FAQ'}`}
      >
        {previewFAQ && <FAQPreview faq={previewFAQ} />}
      </PreviewModal>
    </div>
  )
}
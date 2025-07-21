'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, Edit, Trash2, ArrowLeft, Newspaper, Calendar, Eye } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import PreviewModal from '@/components/admin/PreviewModal'
import NewsPreview from '@/components/admin/NewsPreview'

interface NewsInsight {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url: string
  category: string
  read_time: string
  published_date: string
  created_at: string
  updated_at: string
}

export default function NewsInsightsAdmin() {
  const [newsInsights, setNewsInsights] = useState<NewsInsight[]>([])
  const [loading, setLoading] = useState(true)
  const [previewArticle, setPreviewArticle] = useState<NewsInsight | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)

  useEffect(() => {
    fetchNewsInsights()
  }, [])

  const fetchNewsInsights = async () => {
    try {
      const { data, error } = await supabase
        .from('news_insights')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        // Silent error handling - removed console.error
        return
      }

      setNewsInsights(data || [])
    } catch (error) {
      // Silent error handling - removed console.error
    } finally {
      setLoading(false)
    }
  }

  const deleteNewsInsight = async (id: string) => {
    if (!confirm('Are you sure you want to delete this news article?')) return

    try {
      const { error } = await supabase
        .from('news_insights')
        .delete()
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        alert('Error deleting news article')
        return
      }

      setNewsInsights(newsInsights.filter(item => item.id !== id))
      alert('News article deleted successfully')
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error deleting news article')
    }
  }

  const handlePreview = (article: NewsInsight) => {
    setPreviewArticle(article)
    setIsPreviewOpen(true)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      Education: 'bg-blue-100 text-blue-800',
      Construction: 'bg-green-100 text-green-800',
      Healthcare: 'bg-red-100 text-red-800',
      Sustainability: 'bg-emerald-100 text-emerald-800',
      Government: 'bg-purple-100 text-purple-800',
      Technology: 'bg-indigo-100 text-indigo-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading news & insights...</p>
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
                <h1 className="text-3xl font-bold text-gray-900">News & Insights Management</h1>
                <p className="text-gray-600">Manage blog posts and news articles</p>
              </div>
            </div>
            <Link href="/admin/news-insights/new">
              <Button className="bg-navy-600 hover:bg-navy-700">
                <Plus className="h-4 w-4 mr-2" />
                Add New Article
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {newsInsights.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>No Articles Found</CardTitle>
              <CardDescription>
                No news articles have been created yet. Click the button above to add your first article.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsInsights.map((article) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                          {article.category}
                        </span>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          {formatDate(article.published_date)}
                        </div>
                      </div>
                      <CardTitle className="text-lg flex items-center space-x-2">
                        <Newspaper className="h-5 w-5 text-red-600" />
                        <span>{article.title}</span>
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {article.excerpt.substring(0, 100)}...
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {article.image_url && (
                    <div className="relative h-32 w-full mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={article.image_url}
                        alt={article.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  
                  <div className="space-y-2 mb-4">
                    <div className="text-sm">
                      <span className="font-medium">Read Time:</span> {article.read_time}
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Slug:</span> {article.slug}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePreview(article)}
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Link href={`/admin/news-insights/${article.id}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteNewsInsight(article.id)}
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
        title={`Preview: ${previewArticle?.title || 'News Article'}`}
      >
        {previewArticle && <NewsPreview article={previewArticle} />}
      </PreviewModal>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Newspaper, Calendar } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import { useRouter, useParams } from 'next/navigation'
import ImageUpload from '@/components/ui/image-upload'

interface NewsInsightFormData {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url: string
  category: string
  read_time: string
  published_date: string
}

export default function EditNewsInsight() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [formData, setFormData] = useState<NewsInsightFormData>({
    id: '',
    slug: '',
    title: '',
    excerpt: '',
    content: '',
    image_url: '',
    category: 'Education',
    read_time: '5 min read',
    published_date: new Date().toISOString().split('T')[0]
  })

  useEffect(() => {
    if (params.id) {
      fetchNewsInsight(params.id as string)
    }
  }, [params.id])

  const fetchNewsInsight = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('news_insights')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        // Silent error handling - removed console.error
        alert('Error loading news article')
        router.push('/admin/news-insights')
        return
      }

      if (data) {
        setFormData({
          id: data.id,
          slug: data.slug,
          title: data.title,
          excerpt: data.excerpt,
          content: data.content || '',
          image_url: data.image_url || '',
          category: data.category || 'Education',
          read_time: data.read_time || '5 min read',
          published_date: data.published_date || new Date().toISOString().split('T')[0]
        })
      }
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error loading news article')
      router.push('/admin/news-insights')
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof NewsInsightFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    handleInputChange('title', title)
    if (!formData.slug || formData.slug === generateSlug(formData.title)) {
      handleInputChange('slug', generateSlug(title))
    }
  }

  const categories = [
    'Education',
    'Construction',
    'Healthcare',
    'Government',
    'Retail',
    'Emergency Response',
    'Sustainability',
    'Technology',
    'Industry News'
  ]

  const validateForm = () => {
    if (!formData.title.trim()) return 'Title is required'
    if (!formData.slug.trim()) return 'Slug is required'
    if (!formData.excerpt.trim()) return 'Excerpt is required'
    if (!formData.category.trim()) return 'Category is required'
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validationError = validateForm()
    if (validationError) {
      alert(validationError)
      return
    }

    setSaving(true)

    try {
      const { id, ...updateData } = formData
      const { error } = await supabase
        .from('news_insights')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        alert('Error updating news article: ' + error.message)
        return
      }

      alert('News article updated successfully!')
      router.push('/admin/news-insights')
    } catch (error) {
      // Silent error handling - removed console.error
      alert('Error updating news article')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading news article...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/news-insights">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to News & Insights
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit News Article</h1>
                <p className="text-gray-600">Update: {formData.title}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Article Information</CardTitle>
              <CardDescription>Update the basic details for this article</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., The Future of Modular Construction"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => handleInputChange('slug', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., future-of-modular-construction"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    required
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={formData.read_time}
                    onChange={(e) => handleInputChange('read_time', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="e.g., 5 min read"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Published Date
                  </label>
                  <input
                    type="date"
                    value={formData.published_date}
                    onChange={(e) => handleInputChange('published_date', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Enter a brief summary of the article..."
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Character count: {formData.excerpt.length}
                </p>
              </div>

              <div>
                <ImageUpload
                  label="Featured Image"
                  value={formData.image_url}
                  onChange={(url) => handleInputChange('image_url', url)}
                  bucketName="images"
                  folder="news-insights"
                />
              </div>
            </CardContent>
          </Card>

          {/* Article Content */}
          <Card>
            <CardHeader>
              <CardTitle>Article Content</CardTitle>
              <CardDescription>Write the full article content</CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Article Content
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  rows={12}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Write the full article content here. You can use Markdown formatting..."
                />
                <p className="text-sm text-gray-500 mt-1">
                  Character count: {formData.content.length}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Tip: You can use Markdown formatting for headings, links, and formatting.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>How this article will appear in the news section</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-start space-x-4">
                  <Newspaper className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                        {formData.category}
                      </span>
                      <div className="flex items-center text-xs text-gray-500">
                        <Calendar className="h-3 w-3 mr-1" />
                        {new Date(formData.published_date).toLocaleDateString()}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {formData.title || 'Article title will appear here...'}
                    </h3>
                    <p className="text-gray-600 mb-3">
                      {formData.excerpt || 'Article excerpt will appear here...'}
                    </p>
                    <div className="text-sm text-gray-500">
                      {formData.read_time}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-end space-x-4">
            <Link href="/admin/news-insights">
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              disabled={saving}
              className="bg-navy-600 hover:bg-navy-700"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Update Article
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
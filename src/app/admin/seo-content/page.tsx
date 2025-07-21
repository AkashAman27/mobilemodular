'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, Eye, EyeOff, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

interface SEOContentData {
  id: string
  page_type: 'solution' | 'industry'
  page_slug: string
  title: string
  paragraphs: string[]
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export default function SEOContentAdmin() {
  const [content, setContent] = useState<SEOContentData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingContent, setEditingContent] = useState<SEOContentData | null>(null)

  const [formData, setFormData] = useState({
    page_type: 'solution' as 'solution' | 'industry',
    page_slug: '',
    title: '',
    paragraphs: [''],
    is_active: true
  })

  const pageTypeOptions = [
    { value: 'solution', label: 'Solution' },
    { value: 'industry', label: 'Industry' }
  ]

  // Fetch content from Supabase
  const fetchContent = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('seo_content')
        .select('*')
        .order('page_type', { ascending: true })
        .order('page_slug', { ascending: true })

      if (error) {
        // Silent error handling - removed console.error
        
        // If table doesn't exist, use static demo data
        if (error.code === '42P01') {
          // Silent logging - removed console.log
          const { seoContentData } = await import('@/data/seo-content-data')
          setContent(seoContentData)
          setError('Demo Mode: Using static data. Create tables in Supabase to enable database functionality.')
          setLoading(false)
          return
        }
        
        setError('Failed to fetch content')
        return
      }

      setContent(data || [])
      setError(null)
    } catch (err) {
      // Silent error handling - removed console.error
      setError('Failed to fetch content')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContent()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingContent) {
        // Update existing content
        const { error } = await supabase
          .from('seo_content')
          .update({
            page_type: formData.page_type,
            page_slug: formData.page_slug,
            title: formData.title,
            paragraphs: formData.paragraphs.filter(p => p.trim() !== ''),
            is_active: formData.is_active,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingContent.id)

        if (error) {
          // Silent error handling - removed console.error
          setError('Failed to update content')
          return
        }
      } else {
        // Create new content
        const { error } = await supabase
          .from('seo_content')
          .insert([{
            page_type: formData.page_type,
            page_slug: formData.page_slug,
            title: formData.title,
            paragraphs: formData.paragraphs.filter(p => p.trim() !== ''),
            is_active: formData.is_active
          }])

        if (error) {
          // Silent error handling - removed console.error
          setError('Failed to create content')
          return
        }
      }

      // Refresh content and reset form
      await fetchContent()
      resetForm()
      setError(null)
    } catch (err) {
      // Silent error handling - removed console.error
      setError('Failed to save content')
    }
  }

  const handleEdit = (contentItem: SEOContentData) => {
    setEditingContent(contentItem)
    setFormData({
      page_type: contentItem.page_type,
      page_slug: contentItem.page_slug,
      title: contentItem.title,
      paragraphs: [...contentItem.paragraphs, ''], // Add empty paragraph for editing
      is_active: contentItem.is_active
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this SEO content?')) {
      try {
        const { error } = await supabase
          .from('seo_content')
          .delete()
          .eq('id', id)

        if (error) {
          // Silent error handling - removed console.error
          setError('Failed to delete content')
          return
        }

        await fetchContent()
        setError(null)
      } catch (err) {
        // Silent error handling - removed console.error
        setError('Failed to delete content')
      }
    }
  }

  const toggleActive = async (id: string) => {
    try {
      const contentItem = content.find(c => c.id === id)
      if (!contentItem) return

      const { error } = await supabase
        .from('seo_content')
        .update({
          is_active: !contentItem.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        setError('Failed to update content status')
        return
      }

      await fetchContent()
      setError(null)
    } catch (err) {
      // Silent error handling - removed console.error
      setError('Failed to update content status')
    }
  }

  const resetForm = () => {
    setFormData({
      page_type: 'solution',
      page_slug: '',
      title: '',
      paragraphs: [''],
      is_active: true
    })
    setEditingContent(null)
    setIsModalOpen(false)
  }

  const addParagraph = () => {
    setFormData({
      ...formData,
      paragraphs: [...formData.paragraphs, '']
    })
  }

  const removeParagraph = (index: number) => {
    const newParagraphs = formData.paragraphs.filter((_, i) => i !== index)
    setFormData({
      ...formData,
      paragraphs: newParagraphs.length > 0 ? newParagraphs : ['']
    })
  }

  const updateParagraph = (index: number, value: string) => {
    const newParagraphs = [...formData.paragraphs]
    newParagraphs[index] = value
    setFormData({
      ...formData,
      paragraphs: newParagraphs
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SEO content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Error Alert */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-600 font-medium">{error}</div>
              <button 
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">SEO Content Management</h1>
              <p className="text-gray-600 mt-2">Manage SEO-optimized content sections for solutions and industries pages</p>
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Content
            </Button>
          </div>
        </div>

        {/* Content Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Page Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Page Slug</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Paragraphs</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {content.map((item, index) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {item.page_type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-800">{item.page_slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-800">{item.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{item.paragraphs.length} paragraphs</div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActive(item.id)}
                        className={`inline-flex items-center space-x-1 ${
                          item.is_active ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        {item.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        <span className="text-sm">{item.is_active ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingContent ? 'Edit SEO Content' : 'Add New SEO Content'}
              </h2>
              <button
                onClick={resetForm}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Type *
                  </label>
                  <select
                    value={formData.page_type}
                    onChange={(e) => setFormData({ ...formData, page_type: e.target.value as 'solution' | 'industry' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  >
                    {pageTypeOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Slug *
                  </label>
                  <input
                    type="text"
                    value={formData.page_slug}
                    onChange={(e) => setFormData({ ...formData, page_slug: e.target.value })}
                    placeholder="e.g., office-buildings, education"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Why Choose Our Solutions?"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Paragraphs *
                  </label>
                  <Button
                    type="button"
                    onClick={addParagraph}
                    className="text-sm bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Paragraph
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {formData.paragraphs.map((paragraph, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start space-x-2">
                        <div className="flex-1">
                          <textarea
                            value={paragraph}
                            onChange={(e) => updateParagraph(index, e.target.value)}
                            placeholder={`Paragraph ${index + 1}`}
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
                          />
                        </div>
                        {formData.paragraphs.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeParagraph(index)}
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                  Active
                </label>
              </div>

              <div className="flex space-x-3 pt-6">
                <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  {editingContent ? 'Update Content' : 'Save Content'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  )
}
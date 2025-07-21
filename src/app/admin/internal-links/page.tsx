'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit3, Trash2, Eye, EyeOff, ArrowUp, ArrowDown, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'

interface InternalLink {
  id: string
  title: string
  url: string
  description?: string
  category?: string
  sort_order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

export default function InternalLinksAdmin() {
  const [links, setLinks] = useState<InternalLink[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingLink, setEditingLink] = useState<InternalLink | null>(null)

  // Fetch links from Supabase
  const fetchLinks = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('internal_links')
        .select('*')
        .order('sort_order', { ascending: true })

      if (error) {
        // Silent error handling - removed console.error
        
        // If table doesn't exist, use static demo data
        if (error.code === '42P01') {
          // Silent logging - removed console.log
          const { internalLinksData } = await import('@/data/internal-links-data')
          const staticLinks = internalLinksData.map(link => ({
            ...link,
            sort_order: link.order
          }))
          setLinks(staticLinks)
          setError('Demo Mode: Using static data. Create tables in Supabase to enable database functionality.')
          setLoading(false)
          return
        }
        
        setError('Failed to fetch links')
        return
      }

      setLinks(data || [])
      setError(null)
    } catch (err) {
      // Silent error handling - removed console.error
      setError('Failed to fetch links')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: '',
    category: 'general',
    order: 1,
    is_active: true
  })

  const categories = [
    { value: 'solutions', label: 'Solutions' },
    { value: 'industries', label: 'Industries' },
    { value: 'locations', label: 'Locations' },
    { value: 'resources', label: 'Resources' },
    { value: 'general', label: 'General' }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingLink) {
        // Update existing link
        const { error } = await supabase
          .from('internal_links')
          .update({
            title: formData.title,
            url: formData.url,
            description: formData.description,
            category: formData.category,
            sort_order: formData.order,
            is_active: formData.is_active,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingLink.id)

        if (error) {
          // Silent error handling - removed console.error
          setError('Failed to update link')
          return
        }
      } else {
        // Create new link
        const { error } = await supabase
          .from('internal_links')
          .insert([{
            title: formData.title,
            url: formData.url,
            description: formData.description,
            category: formData.category,
            sort_order: formData.order,
            is_active: formData.is_active
          }])

        if (error) {
          // Silent error handling - removed console.error
          setError('Failed to create link')
          return
        }
      }

      // Refresh links and reset form
      await fetchLinks()
      setFormData({
        title: '',
        url: '',
        description: '',
        category: 'general',
        order: 1,
        is_active: true
      })
      setEditingLink(null)
      setIsModalOpen(false)
      setError(null)
    } catch (err) {
      // Silent error handling - removed console.error
      setError('Failed to save link')
    }
  }

  const handleEdit = (link: InternalLink) => {
    setEditingLink(link)
    setFormData({
      title: link.title,
      url: link.url,
      description: link.description || '',
      category: link.category || 'general',
      order: link.sort_order,
      is_active: link.is_active
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this link?')) {
      try {
        const { error } = await supabase
          .from('internal_links')
          .delete()
          .eq('id', id)

        if (error) {
          // Silent error handling - removed console.error
          setError('Failed to delete link')
          return
        }

        await fetchLinks()
        setError(null)
      } catch (err) {
        // Silent error handling - removed console.error
        setError('Failed to delete link')
      }
    }
  }

  const toggleActive = async (id: string) => {
    try {
      const link = links.find(l => l.id === id)
      if (!link) return

      const { error } = await supabase
        .from('internal_links')
        .update({
          is_active: !link.is_active,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)

      if (error) {
        // Silent error handling - removed console.error
        setError('Failed to update link status')
        return
      }

      await fetchLinks()
      setError(null)
    } catch (err) {
      // Silent error handling - removed console.error
      setError('Failed to update link status')
    }
  }

  const moveLink = async (id: string, direction: 'up' | 'down') => {
    const currentIndex = links.findIndex(link => link.id === id)
    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1
    
    if (newIndex >= 0 && newIndex < links.length) {
      try {
        const newLinks = [...links]
        const [movedLink] = newLinks.splice(currentIndex, 1)
        newLinks.splice(newIndex, 0, movedLink)
        
        // Update all sort orders in database
        const updates = newLinks.map((link, index) => 
          supabase
            .from('internal_links')
            .update({
              sort_order: index + 1,
              updated_at: new Date().toISOString()
            })
            .eq('id', link.id)
        )

        await Promise.all(updates)
        await fetchLinks()
        setError(null)
      } catch (err) {
        // Silent error handling - removed console.error
        setError('Failed to reorder links')
      }
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setEditingLink(null)
    setFormData({
      title: '',
      url: '',
      description: '',
      category: 'general',
      order: 1,
      is_active: true
    })
  }

  const sortedLinks = [...links].sort((a, b) => a.sort_order - b.sort_order)

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading internal links...</p>
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
              <h1 className="text-3xl font-bold text-gray-800">Internal Links Management</h1>
              <p className="text-gray-600 mt-2">Manage internal links that appear at the bottom of pages</p>
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Link
            </Button>
          </div>
        </div>

        {/* Links Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Order</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">URL</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Status</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedLinks.map((link, index) => (
                  <motion.tr
                    key={link.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium text-gray-800">{link.sort_order}</span>
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => moveLink(link.id, 'up')}
                            disabled={index === 0}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            <ArrowUp className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => moveLink(link.id, 'down')}
                            disabled={index === sortedLinks.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                          >
                            <ArrowDown className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-800">{link.title}</div>
                        {link.description && (
                          <div className="text-sm text-gray-600 mt-1">{link.description}</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">{link.url}</span>
                        <a 
                          href={link.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                        {link.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleActive(link.id)}
                        className={`inline-flex items-center space-x-1 ${
                          link.is_active ? 'text-green-600' : 'text-gray-400'
                        }`}
                      >
                        {link.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                        <span className="text-sm">{link.is_active ? 'Active' : 'Inactive'}</span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(link)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(link.id)}
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
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              {editingLink ? 'Edit Link' : 'Add New Link'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL *
                </label>
                <input
                  type="text"
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  placeholder="/solutions/example or https://external.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  {editingLink ? 'Update Link' : 'Add Link'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeModal}
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
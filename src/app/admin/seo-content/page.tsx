'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Search, Plus, Edit, Trash2, Save, X, FileText, BarChart3, Eye } from 'lucide-react'

interface SEOContentItem {
  id: string
  page_path: string
  meta_title: string
  meta_description: string
  keywords: string
  h1_title: string
  content_focus: string
  target_keywords: string[]
  internal_links: string[]
  external_links: string[]
  created_at: string
  updated_at: string
}

export default function SEOContentPage() {
  const [seoItems, setSeoItems] = useState<SEOContentItem[]>([])
  const [loading, setLoading] = useState(false)
  const [editingItem, setEditingItem] = useState<SEOContentItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({
    page_path: '',
    meta_title: '',
    meta_description: '',
    keywords: '',
    h1_title: '',
    content_focus: '',
    target_keywords: '',
    internal_links: '',
    external_links: ''
  })

  // Load demo data on component mount
  useEffect(() => {
    loadDemoData()
  }, [])

  const loadDemoData = () => {
    const demoData: SEOContentItem[] = [
      {
        id: '1',
        page_path: '/',
        meta_title: 'Premium Modular Buildings | Custom Solutions',
        meta_description: 'Discover premium modular buildings designed for your needs. Custom office spaces, retail locations, and commercial buildings with fast delivery.',
        keywords: 'modular buildings, prefab construction, office spaces, commercial buildings',
        h1_title: 'Premium Modular Building Solutions',
        content_focus: 'Homepage conversion and brand positioning',
        target_keywords: ['modular buildings', 'prefab construction', 'office spaces'],
        internal_links: ['/solutions', '/company/our-process', '/quote'],
        external_links: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        page_path: '/solutions',
        meta_title: 'Modular Building Solutions | Office, Retail & Commercial',
        meta_description: 'Explore our range of modular building solutions including office buildings, retail spaces, and commercial structures. Built to last, delivered fast.',
        keywords: 'office buildings, retail spaces, commercial modular buildings, prefab solutions',
        h1_title: 'Modular Building Solutions for Every Need',
        content_focus: 'Solution showcase and feature benefits',
        target_keywords: ['office buildings', 'retail modular', 'commercial buildings'],
        internal_links: ['/quote', '/company/our-process'],
        external_links: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        page_path: '/company/our-process',
        meta_title: 'Our 7-Step Construction Process | Proven Method',
        meta_description: 'Learn about our proven 7-step modular building process from consultation to delivery. Quality construction with transparent timelines.',
        keywords: 'construction process, modular building steps, consultation, delivery',
        h1_title: 'Our Proven 7-Step Process',
        content_focus: 'Process transparency and trust building',
        target_keywords: ['construction process', 'modular building process', 'consultation'],
        internal_links: ['/quote', '/solutions'],
        external_links: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
    setSeoItems(demoData)
  }

  const resetForm = () => {
    setFormData({
      page_path: '',
      meta_title: '',
      meta_description: '',
      keywords: '',
      h1_title: '',
      content_focus: '',
      target_keywords: '',
      internal_links: '',
      external_links: ''
    })
    setEditingItem(null)
    setIsModalOpen(false)
  }

  const handleEdit = (item: SEOContentItem) => {
    setEditingItem(item)
    setFormData({
      page_path: item.page_path,
      meta_title: item.meta_title,
      meta_description: item.meta_description,
      keywords: item.keywords,
      h1_title: item.h1_title,
      content_focus: item.content_focus,
      target_keywords: item.target_keywords.join(', '),
      internal_links: item.internal_links.join(', '),
      external_links: item.external_links.join(', ')
    })
    setIsModalOpen(true)
  }

  const handleSave = () => {
    const newItem: SEOContentItem = {
      id: editingItem?.id || Date.now().toString(),
      page_path: formData.page_path,
      meta_title: formData.meta_title,
      meta_description: formData.meta_description,
      keywords: formData.keywords,
      h1_title: formData.h1_title,
      content_focus: formData.content_focus,
      target_keywords: formData.target_keywords.split(',').map(k => k.trim()).filter(k => k),
      internal_links: formData.internal_links.split(',').map(l => l.trim()).filter(l => l),
      external_links: formData.external_links.split(',').map(l => l.trim()).filter(l => l),
      created_at: editingItem?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    if (editingItem) {
      setSeoItems(prev => prev.map(item => item.id === editingItem.id ? newItem : item))
    } else {
      setSeoItems(prev => [...prev, newItem])
    }

    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this SEO content?')) {
      setSeoItems(prev => prev.filter(item => item.id !== id))
    }
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">SEO Content Management</h1>
            <p className="text-gray-600 mt-1">Manage meta descriptions, keywords, and content optimization</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add SEO Content
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Pages</p>
                  <p className="text-2xl font-bold text-gray-900">{seoItems.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <BarChart3 className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Optimized</p>
                  <p className="text-2xl font-bold text-gray-900">{seoItems.filter(item => item.meta_title && item.meta_description).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Search className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Keywords</p>
                  <p className="text-2xl font-bold text-gray-900">{seoItems.reduce((acc, item) => acc + item.target_keywords.length, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SEO Items List */}
        <div className="space-y-4">
          {seoItems.map((item) => (
            <Card key={item.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.page_path}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.meta_title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{item.meta_description}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.target_keywords.map((keyword, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800">
                          {keyword}
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">Content Focus: {item.content_focus}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingItem ? 'Edit SEO Content' : 'Add SEO Content'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page Path</label>
                  <Input
                    value={formData.page_path}
                    onChange={(e) => setFormData({...formData, page_path: e.target.value})}
                    placeholder="e.g., /solutions, /about"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title</label>
                  <Input
                    value={formData.meta_title}
                    onChange={(e) => setFormData({...formData, meta_title: e.target.value})}
                    placeholder="SEO-optimized page title"
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description</label>
                  <Textarea
                    value={formData.meta_description}
                    onChange={(e) => setFormData({...formData, meta_description: e.target.value})}
                    placeholder="Brief description for search results"
                    rows={3}
                  />
                  <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">H1 Title</label>
                  <Input
                    value={formData.h1_title}
                    onChange={(e) => setFormData({...formData, h1_title: e.target.value})}
                    placeholder="Main heading for the page"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Keywords</label>
                  <Input
                    value={formData.target_keywords}
                    onChange={(e) => setFormData({...formData, target_keywords: e.target.value})}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Content Focus</label>
                  <Input
                    value={formData.content_focus}
                    onChange={(e) => setFormData({...formData, content_focus: e.target.value})}
                    placeholder="Main purpose and goal of this page"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Internal Links</label>
                  <Input
                    value={formData.internal_links}
                    onChange={(e) => setFormData({...formData, internal_links: e.target.value})}
                    placeholder="/page1, /page2, /page3"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">External Links</label>
                  <Input
                    value={formData.external_links}
                    onChange={(e) => setFormData({...formData, external_links: e.target.value})}
                    placeholder="https://example.com, https://another.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">Separate with commas</p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  {editingItem ? 'Update' : 'Save'} Content
                </Button>
                <Button variant="outline" onClick={resetForm} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
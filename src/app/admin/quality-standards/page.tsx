'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Plus, Edit, Trash2, Save, X, Shield, Award, Settings, Users, CheckCircle, Clock, ArrowUp, ArrowDown } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface QualityStandard {
  id: string
  title: string
  subtitle: string
  icon_name: string
  description: string
  features: Array<{title: string, description: string}>
  certifications: string[]
  processes: string[]
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

interface QualityContent {
  id: string
  section_type: string
  title: string
  subtitle: string
  content: string
  image_url: string
  data: any
  order_index: number
  is_active: boolean
  created_at: string
  updated_at: string
}

const ICON_OPTIONS = [
  { name: 'Shield', icon: Shield },
  { name: 'Award', icon: Award },
  { name: 'Settings', icon: Settings },
  { name: 'Users', icon: Users },
  { name: 'CheckCircle', icon: CheckCircle },
  { name: 'Clock', icon: Clock }
]

const SECTION_TYPES = [
  'hero',
  'overview', 
  'commitment',
  'stats',
  'certifications'
]

export default function QualityStandardsAdmin() {
  const [standards, setStandards] = useState<QualityStandard[]>([])
  const [content, setContent] = useState<QualityContent[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'standards' | 'content'>('standards')
  const [editingStandard, setEditingStandard] = useState<QualityStandard | null>(null)
  const [editingContent, setEditingContent] = useState<QualityContent | null>(null)
  const [isStandardModalOpen, setIsStandardModalOpen] = useState(false)
  const [isContentModalOpen, setIsContentModalOpen] = useState(false)
  const [standardFormData, setStandardFormData] = useState({
    title: '',
    subtitle: '',
    icon_name: 'Shield',
    description: '',
    features: '',
    certifications: '',
    processes: '',
    order_index: 0,
    is_active: true
  })
  const [contentFormData, setContentFormData] = useState({
    section_type: 'hero',
    title: '',
    subtitle: '',
    content: '',
    image_url: '',
    data: '{}',
    order_index: 0,
    is_active: true
  })

  const supabase = createClient()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [standardsResult, contentResult] = await Promise.all([
        supabase
          .from('quality_standards')
          .select('*')
          .order('order_index'),
        supabase
          .from('quality_content')
          .select('*')
          .order('section_type', { ascending: true })
          .order('order_index', { ascending: true })
      ])

      if (standardsResult.data) setStandards(standardsResult.data)
      if (contentResult.data) setContent(contentResult.data)
    } catch (error) {
      console.error('Error loading data:', error)
      alert('Error loading data')
    }
    setLoading(false)
  }

  const resetStandardForm = () => {
    setStandardFormData({
      title: '',
      subtitle: '',
      icon_name: 'Shield',
      description: '',
      features: '',
      certifications: '',
      processes: '',
      order_index: 0,
      is_active: true
    })
    setEditingStandard(null)
    setIsStandardModalOpen(false)
  }

  const resetContentForm = () => {
    setContentFormData({
      section_type: 'hero',
      title: '',
      subtitle: '',
      content: '',
      image_url: '',
      data: '{}',
      order_index: 0,
      is_active: true
    })
    setEditingContent(null)
    setIsContentModalOpen(false)
  }

  const handleEditStandard = (standard: QualityStandard) => {
    setEditingStandard(standard)
    setStandardFormData({
      title: standard.title,
      subtitle: standard.subtitle,
      icon_name: standard.icon_name,
      description: standard.description,
      features: JSON.stringify(standard.features, null, 2),
      certifications: standard.certifications.join(', '),
      processes: standard.processes.join(', '),
      order_index: standard.order_index,
      is_active: standard.is_active
    })
    setIsStandardModalOpen(true)
  }

  const handleEditContent = (contentItem: QualityContent) => {
    setEditingContent(contentItem)
    setContentFormData({
      section_type: contentItem.section_type,
      title: contentItem.title,
      subtitle: contentItem.subtitle,
      content: contentItem.content,
      image_url: contentItem.image_url,
      data: JSON.stringify(contentItem.data, null, 2),
      order_index: contentItem.order_index,
      is_active: contentItem.is_active
    })
    setIsContentModalOpen(true)
  }

  const handleSaveStandard = async () => {
    try {
      let features = []
      try {
        features = JSON.parse(standardFormData.features)
      } catch {
        features = []
      }

      const standardData = {
        title: standardFormData.title,
        subtitle: standardFormData.subtitle,
        icon_name: standardFormData.icon_name,
        description: standardFormData.description,
        features,
        certifications: standardFormData.certifications.split(',').map(c => c.trim()).filter(c => c),
        processes: standardFormData.processes.split(',').map(p => p.trim()).filter(p => p),
        order_index: standardFormData.order_index,
        is_active: standardFormData.is_active,
        updated_at: new Date().toISOString()
      }

      let result
      if (editingStandard) {
        result = await supabase
          .from('quality_standards')
          .update(standardData)
          .eq('id', editingStandard.id)
      } else {
        result = await supabase
          .from('quality_standards')
          .insert([standardData])
      }

      if (result.error) {
        throw result.error
      }

      await loadData()
      resetStandardForm()
      alert('Standard saved successfully!')
    } catch (error) {
      console.error('Error saving standard:', error)
      alert('Error saving standard')
    }
  }

  const handleSaveContent = async () => {
    try {
      let data = {}
      try {
        data = JSON.parse(contentFormData.data)
      } catch {
        data = {}
      }

      const contentData = {
        section_type: contentFormData.section_type,
        title: contentFormData.title,
        subtitle: contentFormData.subtitle,
        content: contentFormData.content,
        image_url: contentFormData.image_url,
        data,
        order_index: contentFormData.order_index,
        is_active: contentFormData.is_active,
        updated_at: new Date().toISOString()
      }

      let result
      if (editingContent) {
        result = await supabase
          .from('quality_content')
          .update(contentData)
          .eq('id', editingContent.id)
      } else {
        result = await supabase
          .from('quality_content')
          .insert([contentData])
      }

      if (result.error) {
        throw result.error
      }

      await loadData()
      resetContentForm()
      alert('Content saved successfully!')
    } catch (error) {
      console.error('Error saving content:', error)
      alert('Error saving content')
    }
  }

  const handleDeleteStandard = async (id: string) => {
    if (confirm('Are you sure you want to delete this quality standard?')) {
      try {
        const result = await supabase
          .from('quality_standards')
          .delete()
          .eq('id', id)

        if (result.error) {
          throw result.error
        }

        await loadData()
        alert('Standard deleted successfully!')
      } catch (error) {
        console.error('Error deleting standard:', error)
        alert('Error deleting standard')
      }
    }
  }

  const handleDeleteContent = async (id: string) => {
    if (confirm('Are you sure you want to delete this content section?')) {
      try {
        const result = await supabase
          .from('quality_content')
          .delete()
          .eq('id', id)

        if (result.error) {
          throw result.error
        }

        await loadData()
        alert('Content deleted successfully!')
      } catch (error) {
        console.error('Error deleting content:', error)
        alert('Error deleting content')
      }
    }
  }

  const updateOrder = async (type: 'standard' | 'content', id: string, newIndex: number) => {
    try {
      const table = type === 'standard' ? 'quality_standards' : 'quality_content'
      const result = await supabase
        .from(table)
        .update({ order_index: newIndex, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (result.error) {
        throw result.error
      }

      await loadData()
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Error updating order')
    }
  }

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Quality Standards Management</h1>
            <p className="text-slate-600 mt-1">Manage quality standards and page content</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('standards')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'standards'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Quality Standards ({standards.length})
          </button>
          <button
            onClick={() => setActiveTab('content')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              activeTab === 'content'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-100'
            }`}
          >
            Page Content ({content.length})
          </button>
        </div>

        {/* Standards Tab */}
        {activeTab === 'standards' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Quality Standards</h2>
              <Button 
                onClick={() => setIsStandardModalOpen(true)} 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Standard
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {standards.map((standard) => {
                const IconComponent = ICON_OPTIONS.find(opt => opt.name === standard.icon_name)?.icon || Shield
                
                return (
                  <Card key={standard.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-2 bg-blue-100 rounded-lg">
                            <IconComponent className="h-6 w-6 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-slate-900 mb-1">{standard.title}</h3>
                            <p className="text-slate-600 text-sm">{standard.subtitle}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            standard.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {standard.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-700 text-sm mb-4 line-clamp-3">{standard.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateOrder('standard', standard.id, standard.order_index - 1)}
                            disabled={standard.order_index <= 1}
                          >
                            <ArrowUp className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateOrder('standard', standard.id, standard.order_index + 1)}
                          >
                            <ArrowDown className="h-4 w-4" />
                          </Button>
                          <span className="text-sm text-slate-500">Order: {standard.order_index}</span>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditStandard(standard)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteStandard(standard.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Content Tab */}
        {activeTab === 'content' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Page Content</h2>
              <Button 
                onClick={() => setIsContentModalOpen(true)} 
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Content Section
              </Button>
            </div>

            <div className="space-y-4">
              {content.map((contentItem) => (
                <Card key={contentItem.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {contentItem.section_type}
                          </span>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            contentItem.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {contentItem.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">{contentItem.title}</h3>
                        {contentItem.subtitle && (
                          <p className="text-slate-600 text-sm mb-2">{contentItem.subtitle}</p>
                        )}
                        {contentItem.content && (
                          <p className="text-slate-700 text-sm line-clamp-2">{contentItem.content}</p>
                        )}
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditContent(contentItem)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteContent(contentItem.id)}
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
          </div>
        )}

        {/* Standard Modal */}
        {isStandardModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingStandard ? 'Edit Quality Standard' : 'Add Quality Standard'}
                </h2>
                <button onClick={resetStandardForm} className="text-slate-400 hover:text-slate-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <Input
                    value={standardFormData.title}
                    onChange={(e) => setStandardFormData({...standardFormData, title: e.target.value})}
                    placeholder="Quality standard title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subtitle</label>
                  <Input
                    value={standardFormData.subtitle}
                    onChange={(e) => setStandardFormData({...standardFormData, subtitle: e.target.value})}
                    placeholder="Brief subtitle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Icon</label>
                  <select
                    value={standardFormData.icon_name}
                    onChange={(e) => setStandardFormData({...standardFormData, icon_name: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {ICON_OPTIONS.map(option => (
                      <option key={option.name} value={option.name}>{option.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
                  <Textarea
                    value={standardFormData.description}
                    onChange={(e) => setStandardFormData({...standardFormData, description: e.target.value})}
                    placeholder="Detailed description of the quality standard"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Features (JSON)</label>
                  <Textarea
                    value={standardFormData.features}
                    onChange={(e) => setStandardFormData({...standardFormData, features: e.target.value})}
                    placeholder='[{"title": "Feature Name", "description": "Feature description"}]'
                    rows={4}
                    className="font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Certifications (comma-separated)</label>
                  <Input
                    value={standardFormData.certifications}
                    onChange={(e) => setStandardFormData({...standardFormData, certifications: e.target.value})}
                    placeholder="ISO 9001:2015, OSHA Compliance, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Processes (comma-separated)</label>
                  <Input
                    value={standardFormData.processes}
                    onChange={(e) => setStandardFormData({...standardFormData, processes: e.target.value})}
                    placeholder="Process 1, Process 2, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Order Index</label>
                    <Input
                      type="number"
                      value={standardFormData.order_index}
                      onChange={(e) => setStandardFormData({...standardFormData, order_index: parseInt(e.target.value) || 0})}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_active_standard"
                      checked={standardFormData.is_active}
                      onChange={(e) => setStandardFormData({...standardFormData, is_active: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <label htmlFor="is_active_standard" className="ml-2 block text-sm text-slate-700">
                      Active
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={handleSaveStandard} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <Save className="h-4 w-4 mr-2" />
                  {editingStandard ? 'Update' : 'Save'} Standard
                </Button>
                <Button variant="outline" onClick={resetStandardForm} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Content Modal */}
        {isContentModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  {editingContent ? 'Edit Content Section' : 'Add Content Section'}
                </h2>
                <button onClick={resetContentForm} className="text-slate-400 hover:text-slate-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Section Type</label>
                  <select
                    value={contentFormData.section_type}
                    onChange={(e) => setContentFormData({...contentFormData, section_type: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {SECTION_TYPES.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Title</label>
                  <Input
                    value={contentFormData.title}
                    onChange={(e) => setContentFormData({...contentFormData, title: e.target.value})}
                    placeholder="Section title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Subtitle</label>
                  <Input
                    value={contentFormData.subtitle}
                    onChange={(e) => setContentFormData({...contentFormData, subtitle: e.target.value})}
                    placeholder="Section subtitle"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Content</label>
                  <Textarea
                    value={contentFormData.content}
                    onChange={(e) => setContentFormData({...contentFormData, content: e.target.value})}
                    placeholder="Main content text"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Image URL</label>
                  <Input
                    value={contentFormData.image_url}
                    onChange={(e) => setContentFormData({...contentFormData, image_url: e.target.value})}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Data (JSON)</label>
                  <Textarea
                    value={contentFormData.data}
                    onChange={(e) => setContentFormData({...contentFormData, data: e.target.value})}
                    placeholder='{"key": "value"}'
                    rows={6}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Order Index</label>
                    <Input
                      type="number"
                      value={contentFormData.order_index}
                      onChange={(e) => setContentFormData({...contentFormData, order_index: parseInt(e.target.value) || 0})}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_active_content"
                      checked={contentFormData.is_active}
                      onChange={(e) => setContentFormData({...contentFormData, is_active: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                    />
                    <label htmlFor="is_active_content" className="ml-2 block text-sm text-slate-700">
                      Active
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={handleSaveContent} className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
                  <Save className="h-4 w-4 mr-2" />
                  {editingContent ? 'Update' : 'Save'} Content
                </Button>
                <Button variant="outline" onClick={resetContentForm} className="flex-1">
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
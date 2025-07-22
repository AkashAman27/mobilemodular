'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { RotateCcw as Redirect, Plus, Edit, Trash2, Save, X, ArrowRight, Settings, CheckCircle, AlertTriangle, Upload, Download } from 'lucide-react'

interface RedirectItem {
  id: string
  from_url: string
  to_url: string
  redirect_type: '301' | '302' | '307'
  status: 'active' | 'inactive'
  description: string
  hits: number
  last_accessed: string
  created_at: string
  updated_at: string
}

const REDIRECT_TYPES = {
  '301': { name: '301 - Permanent', description: 'Permanently moved, passes SEO value' },
  '302': { name: '302 - Temporary', description: 'Temporarily moved, does not pass SEO value' },
  '307': { name: '307 - Temporary', description: 'HTTP method preserved temporary redirect' }
}

export default function URLRedirectsPage() {
  const [redirects, setRedirects] = useState<RedirectItem[]>([])
  const [loading, setLoading] = useState(false)
  const [editingRedirect, setEditingRedirect] = useState<RedirectItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false)
  const [bulkData, setBulkData] = useState('')
  const [formData, setFormData] = useState({
    from_url: '',
    to_url: '',
    redirect_type: '301' as '301' | '302' | '307',
    status: 'active' as 'active' | 'inactive',
    description: ''
  })

  useEffect(() => {
    loadDemoData()
  }, [])

  const loadDemoData = () => {
    const demoData: RedirectItem[] = [
      {
        id: '1',
        from_url: '/old-services',
        to_url: '/solutions',
        redirect_type: '301',
        status: 'active',
        description: 'Updated URL structure for services page',
        hits: 145,
        last_accessed: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        created_at: new Date(Date.now() - 2592000000).toISOString(), // 30 days ago
        updated_at: new Date(Date.now() - 2592000000).toISOString()
      },
      {
        id: '2',
        from_url: '/contact-us',
        to_url: '/quote',
        redirect_type: '302',
        status: 'active',
        description: 'Temporary redirect to quote form during contact page redesign',
        hits: 87,
        last_accessed: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
        created_at: new Date(Date.now() - 1209600000).toISOString(), // 14 days ago
        updated_at: new Date(Date.now() - 1209600000).toISOString()
      },
      {
        id: '3',
        from_url: '/blog',
        to_url: '/resources/insights',
        redirect_type: '301',
        status: 'active',
        description: 'Moved blog to insights section',
        hits: 234,
        last_accessed: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
        created_at: new Date(Date.now() - 5184000000).toISOString(), // 60 days ago
        updated_at: new Date(Date.now() - 5184000000).toISOString()
      },
      {
        id: '4',
        from_url: '/pricing',
        to_url: '/quote',
        redirect_type: '301',
        status: 'inactive',
        description: 'Old pricing page redirect - disabled for testing',
        hits: 56,
        last_accessed: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
        created_at: new Date(Date.now() - 1728000000).toISOString(), // 20 days ago
        updated_at: new Date(Date.now() - 86400000).toISOString() // 1 day ago
      }
    ]
    setRedirects(demoData)
  }

  const resetForm = () => {
    setFormData({
      from_url: '',
      to_url: '',
      redirect_type: '301',
      status: 'active',
      description: ''
    })
    setEditingRedirect(null)
    setIsModalOpen(false)
  }

  const handleEdit = (redirect: RedirectItem) => {
    setEditingRedirect(redirect)
    setFormData({
      from_url: redirect.from_url,
      to_url: redirect.to_url,
      redirect_type: redirect.redirect_type,
      status: redirect.status,
      description: redirect.description
    })
    setIsModalOpen(true)
  }

  const handleSave = () => {
    const newRedirect: RedirectItem = {
      id: editingRedirect?.id || Date.now().toString(),
      from_url: formData.from_url,
      to_url: formData.to_url,
      redirect_type: formData.redirect_type,
      status: formData.status,
      description: formData.description,
      hits: editingRedirect?.hits || 0,
      last_accessed: editingRedirect?.last_accessed || new Date().toISOString(),
      created_at: editingRedirect?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    if (editingRedirect) {
      setRedirects(prev => prev.map(redirect => redirect.id === editingRedirect.id ? newRedirect : redirect))
    } else {
      setRedirects(prev => [...prev, newRedirect])
    }

    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this redirect?')) {
      setRedirects(prev => prev.filter(redirect => redirect.id !== id))
    }
  }

  const toggleStatus = (id: string) => {
    setRedirects(prev => prev.map(redirect => 
      redirect.id === id 
        ? { ...redirect, status: redirect.status === 'active' ? 'inactive' : 'active', updated_at: new Date().toISOString() }
        : redirect
    ))
  }

  const handleBulkImport = () => {
    const lines = bulkData.trim().split('\n')
    const newRedirects: RedirectItem[] = []

    lines.forEach((line, index) => {
      const [from_url, to_url, redirect_type = '301', description = ''] = line.split(',').map(s => s.trim())
      
      if (from_url && to_url) {
        newRedirects.push({
          id: `bulk_${Date.now()}_${index}`,
          from_url,
          to_url,
          redirect_type: (redirect_type as '301' | '302' | '307'),
          status: 'active',
          description,
          hits: 0,
          last_accessed: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
      }
    })

    setRedirects(prev => [...prev, ...newRedirects])
    setBulkData('')
    setIsBulkModalOpen(false)
  }

  const exportRedirects = () => {
    const csvContent = redirects.map(redirect => 
      `${redirect.from_url},${redirect.to_url},${redirect.redirect_type},"${redirect.description}"`
    ).join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'redirects_export.csv'
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const testRedirect = async (fromUrl: string, toUrl: string) => {
    // Simulate redirect testing
    alert(`Testing redirect from ${fromUrl} to ${toUrl}.\n\nIn a real implementation, this would:\n- Check if source URL exists\n- Verify target URL is accessible\n- Test redirect response codes\n- Validate redirect chain`)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">URL Redirects Management</h1>
            <p className="text-gray-600 mt-1">Manage 301/302 redirects and URL structure changes</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setIsBulkModalOpen(true)} variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Bulk Import
            </Button>
            <Button onClick={exportRedirects} variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Redirect
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Redirect className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Redirects</p>
                  <p className="text-2xl font-bold text-gray-900">{redirects.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{redirects.filter(r => r.status === 'active').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Settings className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">301 Redirects</p>
                  <p className="text-2xl font-bold text-gray-900">{redirects.filter(r => r.redirect_type === '301').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <ArrowRight className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Hits</p>
                  <p className="text-2xl font-bold text-gray-900">{redirects.reduce((acc, r) => acc + r.hits, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Redirects List */}
        <div className="space-y-4">
          {redirects.map((redirect) => (
            <Card key={redirect.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        redirect.redirect_type === '301' ? 'bg-green-100 text-green-800' :
                        redirect.redirect_type === '302' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {redirect.redirect_type}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        redirect.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {redirect.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">{redirect.from_url}</code>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <code className="text-sm bg-blue-50 px-2 py-1 rounded text-blue-700">{redirect.to_url}</code>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{redirect.description}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span>Hits: {redirect.hits}</span>
                      <span>Last accessed: {new Date(redirect.last_accessed).toLocaleString()}</span>
                      <span>Created: {new Date(redirect.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testRedirect(redirect.from_url, redirect.to_url)}
                      title="Test redirect"
                    >
                      Test
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleStatus(redirect.id)}
                    >
                      {redirect.status === 'active' ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(redirect)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(redirect.id)}
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

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingRedirect ? 'Edit Redirect' : 'Add Redirect'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From URL</label>
                  <Input
                    value={formData.from_url}
                    onChange={(e) => setFormData({...formData, from_url: e.target.value})}
                    placeholder="/old-page"
                  />
                  <p className="text-xs text-gray-500 mt-1">The URL to redirect from (relative path)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To URL</label>
                  <Input
                    value={formData.to_url}
                    onChange={(e) => setFormData({...formData, to_url: e.target.value})}
                    placeholder="/new-page or https://external-site.com"
                  />
                  <p className="text-xs text-gray-500 mt-1">The destination URL (relative or absolute)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Redirect Type</label>
                  <select
                    value={formData.redirect_type}
                    onChange={(e) => setFormData({...formData, redirect_type: e.target.value as '301' | '302' | '307'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Object.entries(REDIRECT_TYPES).map(([code, info]) => (
                      <option key={code} value={code}>{info.name}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {REDIRECT_TYPES[formData.redirect_type].description}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as 'active' | 'inactive'})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Brief description of this redirect"
                    rows={3}
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  {editingRedirect ? 'Update' : 'Save'} Redirect
                </Button>
                <Button variant="outline" onClick={resetForm} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Bulk Import Modal */}
        {isBulkModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Bulk Import Redirects</h2>
                <button onClick={() => setIsBulkModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CSV Data</label>
                  <Textarea
                    value={bulkData}
                    onChange={(e) => setBulkData(e.target.value)}
                    placeholder="from_url,to_url,redirect_type,description&#10;/old-page,/new-page,301,Page moved&#10;/contact-us,/quote,302,Temporary redirect"
                    rows={10}
                    className="font-mono text-sm"
                  />
                  <div className="mt-2 text-xs text-gray-500">
                    <p>Format: from_url,to_url,redirect_type,description</p>
                    <p>One redirect per line. Redirect type is optional (defaults to 301).</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={handleBulkImport} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Redirects
                </Button>
                <Button variant="outline" onClick={() => setIsBulkModalOpen(false)} className="flex-1">
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
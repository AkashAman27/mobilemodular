'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Code, Plus, Edit, Trash2, Save, X, Database, CheckCircle, AlertCircle } from 'lucide-react'

interface SchemaItem {
  id: string
  page_path: string
  schema_type: string
  schema_name: string
  schema_json: string
  is_active: boolean
  validation_status: 'valid' | 'invalid' | 'warning'
  validation_message: string
  created_at: string
  updated_at: string
}

const SCHEMA_TEMPLATES = {
  Organization: {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Aman Modular Buildings",
    "url": "https://amanmodular.com",
    "logo": "https://amanmodular.com/logo.png",
    "description": "Premium modular building solutions",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "",
      "addressLocality": "",
      "addressRegion": "",
      "postalCode": "",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "",
      "contactType": "customer service"
    }
  },
  Product: {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "",
    "description": "",
    "brand": {
      "@type": "Brand",
      "name": "Aman Modular Buildings"
    },
    "offers": {
      "@type": "Offer",
      "price": "",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  },
  Service: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "",
    "description": "",
    "provider": {
      "@type": "Organization",
      "name": "Aman Modular Buildings"
    },
    "serviceType": "",
    "areaServed": ""
  },
  WebPage: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "",
    "description": "",
    "url": "",
    "mainEntity": {
      "@type": "Organization",
      "name": "Aman Modular Buildings"
    }
  }
}

export default function PageSchemasPage() {
  const [schemas, setSchemas] = useState<SchemaItem[]>([])
  const [loading, setLoading] = useState(false)
  const [editingSchema, setEditingSchema] = useState<SchemaItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState('')
  const [formData, setFormData] = useState({
    page_path: '',
    schema_type: '',
    schema_name: '',
    schema_json: '',
    is_active: true
  })

  useEffect(() => {
    loadDemoData()
  }, [])

  const loadDemoData = () => {
    const demoData: SchemaItem[] = [
      {
        id: '1',
        page_path: '/',
        schema_type: 'Organization',
        schema_name: 'Main Organization Schema',
        schema_json: JSON.stringify(SCHEMA_TEMPLATES.Organization, null, 2),
        is_active: true,
        validation_status: 'valid',
        validation_message: 'Schema is valid',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '2',
        page_path: '/solutions',
        schema_type: 'Service',
        schema_name: 'Modular Building Services',
        schema_json: JSON.stringify({
          ...SCHEMA_TEMPLATES.Service,
          name: "Modular Building Construction",
          description: "Custom modular building solutions for commercial and residential needs",
          serviceType: "Construction Services",
          areaServed: "United States"
        }, null, 2),
        is_active: true,
        validation_status: 'valid',
        validation_message: 'Schema is valid',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      },
      {
        id: '3',
        page_path: '/company/our-process',
        schema_type: 'WebPage',
        schema_name: 'Process Page Schema',
        schema_json: JSON.stringify({
          ...SCHEMA_TEMPLATES.WebPage,
          name: "Our Construction Process",
          description: "Learn about our proven 7-step modular building process",
          url: "https://amanmodular.com/company/our-process"
        }, null, 2),
        is_active: true,
        validation_status: 'warning',
        validation_message: 'Consider adding breadcrumb markup',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
    ]
    setSchemas(demoData)
  }

  const validateSchema = (jsonString: string): { status: 'valid' | 'invalid' | 'warning', message: string } => {
    try {
      const parsed = JSON.parse(jsonString)
      if (!parsed['@context'] || !parsed['@type']) {
        return { status: 'invalid', message: 'Missing required @context or @type properties' }
      }
      return { status: 'valid', message: 'Schema is valid' }
    } catch (error) {
      return { status: 'invalid', message: 'Invalid JSON format' }
    }
  }

  const resetForm = () => {
    setFormData({
      page_path: '',
      schema_type: '',
      schema_name: '',
      schema_json: '',
      is_active: true
    })
    setEditingSchema(null)
    setIsModalOpen(false)
    setSelectedTemplate('')
  }

  const handleTemplateSelect = (templateType: string) => {
    setSelectedTemplate(templateType)
    setFormData({
      ...formData,
      schema_type: templateType,
      schema_json: JSON.stringify(SCHEMA_TEMPLATES[templateType as keyof typeof SCHEMA_TEMPLATES], null, 2)
    })
  }

  const handleEdit = (schema: SchemaItem) => {
    setEditingSchema(schema)
    setFormData({
      page_path: schema.page_path,
      schema_type: schema.schema_type,
      schema_name: schema.schema_name,
      schema_json: schema.schema_json,
      is_active: schema.is_active
    })
    setIsModalOpen(true)
  }

  const handleSave = () => {
    const validation = validateSchema(formData.schema_json)
    
    const newSchema: SchemaItem = {
      id: editingSchema?.id || Date.now().toString(),
      page_path: formData.page_path,
      schema_type: formData.schema_type,
      schema_name: formData.schema_name,
      schema_json: formData.schema_json,
      is_active: formData.is_active,
      validation_status: validation.status,
      validation_message: validation.message,
      created_at: editingSchema?.created_at || new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    if (editingSchema) {
      setSchemas(prev => prev.map(schema => schema.id === editingSchema.id ? newSchema : schema))
    } else {
      setSchemas(prev => [...prev, newSchema])
    }

    resetForm()
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this schema?')) {
      setSchemas(prev => prev.filter(schema => schema.id !== id))
    }
  }

  const toggleActive = (id: string) => {
    setSchemas(prev => prev.map(schema => 
      schema.id === id 
        ? { ...schema, is_active: !schema.is_active, updated_at: new Date().toISOString() }
        : schema
    ))
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Page Schemas & Structured Data</h1>
            <p className="text-gray-600 mt-1">Manage JSON-LD schemas and structured data markup</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Schema
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Database className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Schemas</p>
                  <p className="text-2xl font-bold text-gray-900">{schemas.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Valid</p>
                  <p className="text-2xl font-bold text-gray-900">{schemas.filter(s => s.validation_status === 'valid').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <AlertCircle className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Warnings</p>
                  <p className="text-2xl font-bold text-gray-900">{schemas.filter(s => s.validation_status === 'warning').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <Code className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-gray-900">{schemas.filter(s => s.is_active).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schemas List */}
        <div className="space-y-4">
          {schemas.map((schema) => (
            <Card key={schema.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {schema.page_path}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {schema.schema_type}
                      </span>
                      <div className="flex items-center gap-1">
                        {schema.validation_status === 'valid' && <CheckCircle className="h-4 w-4 text-green-500" />}
                        {schema.validation_status === 'warning' && <AlertCircle className="h-4 w-4 text-orange-500" />}
                        {schema.validation_status === 'invalid' && <AlertCircle className="h-4 w-4 text-red-500" />}
                        <span className={`text-xs ${
                          schema.validation_status === 'valid' ? 'text-green-600' :
                          schema.validation_status === 'warning' ? 'text-orange-600' :
                          'text-red-600'
                        }`}>
                          {schema.validation_message}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{schema.schema_name}</h3>
                    <div className="bg-gray-100 rounded-md p-3 mb-3">
                      <pre className="text-xs text-gray-700 font-mono overflow-x-auto">
                        {schema.schema_json.substring(0, 200)}{schema.schema_json.length > 200 ? '...' : ''}
                      </pre>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                        schema.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {schema.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-xs text-gray-500">
                        Updated: {new Date(schema.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleActive(schema.id)}
                    >
                      {schema.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(schema)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(schema.id)}
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
            <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingSchema ? 'Edit Schema' : 'Add Schema'}
                </h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column - Form Fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Page Path</label>
                    <Input
                      value={formData.page_path}
                      onChange={(e) => setFormData({...formData, page_path: e.target.value})}
                      placeholder="/page-path"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Schema Name</label>
                    <Input
                      value={formData.schema_name}
                      onChange={(e) => setFormData({...formData, schema_name: e.target.value})}
                      placeholder="Descriptive name for this schema"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Schema Type</label>
                    <Input
                      value={formData.schema_type}
                      onChange={(e) => setFormData({...formData, schema_type: e.target.value})}
                      placeholder="Organization, Product, Service, etc."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Schema Templates</label>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.keys(SCHEMA_TEMPLATES).map((template) => (
                        <Button
                          key={template}
                          variant={selectedTemplate === template ? "default" : "outline"}
                          size="sm"
                          onClick={() => handleTemplateSelect(template)}
                          className="text-xs"
                        >
                          {template}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label htmlFor="is_active" className="ml-2 block text-sm text-gray-700">
                      Active (will be included in page output)
                    </label>
                  </div>
                </div>

                {/* Right Column - JSON Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">JSON-LD Schema</label>
                  <Textarea
                    value={formData.schema_json}
                    onChange={(e) => setFormData({...formData, schema_json: e.target.value})}
                    placeholder="Enter JSON-LD schema markup"
                    rows={20}
                    className="font-mono text-sm"
                  />
                  <div className="mt-2">
                    {formData.schema_json && (
                      <div className="flex items-center gap-2">
                        {(() => {
                          const validation = validateSchema(formData.schema_json)
                          return (
                            <>
                              {validation.status === 'valid' && <CheckCircle className="h-4 w-4 text-green-500" />}
                              {validation.status === 'invalid' && <AlertCircle className="h-4 w-4 text-red-500" />}
                              <span className={`text-xs ${
                                validation.status === 'valid' ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {validation.message}
                              </span>
                            </>
                          )
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Button onClick={handleSave} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  {editingSchema ? 'Update' : 'Save'} Schema
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
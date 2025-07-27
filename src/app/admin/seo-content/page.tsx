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

  // Available website pages for easy selection
  const availablePages = [
    { 
      path: '/', 
      title: 'Homepage',
      suggestedMetaTitle: 'Premium Modular Buildings | Custom Solutions',
      suggestedDescription: 'Discover premium modular buildings designed for your needs. Custom office spaces, retail locations, and commercial buildings with fast delivery.',
      suggestedKeywords: 'modular buildings, prefab construction, office spaces, commercial buildings'
    },
    { 
      path: '/solutions', 
      title: 'Solutions Overview',
      suggestedMetaTitle: 'Modular Building Solutions | Office, Retail & Commercial',
      suggestedDescription: 'Explore our range of modular building solutions including office buildings, retail spaces, and commercial structures. Built to last, delivered fast.',
      suggestedKeywords: 'office buildings, retail spaces, commercial modular buildings, prefab solutions'
    },
    { 
      path: '/solutions/office-buildings', 
      title: 'Office Buildings',
      suggestedMetaTitle: 'Modular Office Buildings | Professional Workspace Solutions',
      suggestedDescription: 'Professional modular office buildings for businesses. Flexible designs, quick installation, and cost-effective workspace solutions.',
      suggestedKeywords: 'modular office buildings, professional workspace, business offices, commercial spaces'
    },
    { 
      path: '/solutions/portable-classrooms', 
      title: 'Portable Classrooms',
      suggestedMetaTitle: 'Portable Classrooms | Educational Modular Buildings',
      suggestedDescription: 'Quality portable classrooms for schools and educational institutions. Flexible learning spaces with modern amenities.',
      suggestedKeywords: 'portable classrooms, educational buildings, school modular buildings, learning spaces'
    },
    { 
      path: '/solutions/healthcare-facilities', 
      title: 'Healthcare Facilities',
      suggestedMetaTitle: 'Healthcare Modular Buildings | Medical Facilities',
      suggestedDescription: 'Specialized modular healthcare facilities for medical practices, clinics, and healthcare institutions.',
      suggestedKeywords: 'healthcare modular buildings, medical facilities, clinic buildings, healthcare construction'
    },
    { 
      path: '/solutions/security-buildings', 
      title: 'Security Buildings',
      suggestedMetaTitle: 'Security Buildings | Guard Stations & Security Facilities',
      suggestedDescription: 'Professional security buildings and guard stations for enhanced safety and surveillance.',
      suggestedKeywords: 'security buildings, guard stations, security facilities, surveillance buildings'
    },
    { 
      path: '/solutions/commercial-spaces', 
      title: 'Commercial Spaces',
      suggestedMetaTitle: 'Commercial Modular Buildings | Retail & Business Spaces',
      suggestedDescription: 'Versatile commercial modular buildings for retail, business, and industrial applications.',
      suggestedKeywords: 'commercial modular buildings, retail spaces, business buildings, industrial facilities'
    },
    { 
      path: '/solutions/emergency-response', 
      title: 'Emergency Response',
      suggestedMetaTitle: 'Emergency Response Buildings | Disaster Relief Facilities',
      suggestedDescription: 'Rapid deployment emergency response buildings for disaster relief and crisis management.',
      suggestedKeywords: 'emergency response buildings, disaster relief, crisis management facilities, rapid deployment'
    },
    { 
      path: '/company/about', 
      title: 'About Us',
      suggestedMetaTitle: 'About Our Modular Building Company | Industry Leaders',
      suggestedDescription: 'Learn about our company\'s mission, values, and commitment to delivering quality modular building solutions.',
      suggestedKeywords: 'modular building company, construction expertise, industry leaders, company history'
    },
    { 
      path: '/company/our-process', 
      title: 'Our Process',
      suggestedMetaTitle: 'Our 7-Step Construction Process | Proven Method',
      suggestedDescription: 'Learn about our proven 7-step modular building process from consultation to delivery. Quality construction with transparent timelines.',
      suggestedKeywords: 'construction process, modular building steps, consultation, delivery, quality assurance'
    },
    { 
      path: '/company/quality-standards', 
      title: 'Quality Standards',
      suggestedMetaTitle: 'Quality Standards | Premium Construction & Materials',
      suggestedDescription: 'Our commitment to quality through rigorous standards, premium materials, and expert craftsmanship.',
      suggestedKeywords: 'quality standards, premium construction, materials, craftsmanship, building codes'
    },
    { 
      path: '/company/testimonials', 
      title: 'Testimonials',
      suggestedMetaTitle: 'Customer Testimonials | Success Stories & Reviews',
      suggestedDescription: 'Read success stories and testimonials from satisfied customers who chose our modular building solutions.',
      suggestedKeywords: 'customer testimonials, success stories, reviews, client satisfaction, case studies'
    },
    { 
      path: '/industries', 
      title: 'Industries Overview',
      suggestedMetaTitle: 'Industries We Serve | Specialized Modular Solutions',
      suggestedDescription: 'Specialized modular building solutions for various industries including education, healthcare, construction, and more.',
      suggestedKeywords: 'industry solutions, specialized buildings, sector-specific, custom applications'
    },
    { 
      path: '/industries/education', 
      title: 'Education Industry',
      suggestedMetaTitle: 'Education Modular Buildings | Schools & Universities',
      suggestedDescription: 'Modular building solutions for educational institutions, schools, and universities. Flexible learning environments.',
      suggestedKeywords: 'education buildings, school construction, university facilities, learning environments'
    },
    { 
      path: '/industries/healthcare', 
      title: 'Healthcare Industry',
      suggestedMetaTitle: 'Healthcare Modular Solutions | Medical Industry Buildings',
      suggestedDescription: 'Specialized modular solutions for the healthcare industry including clinics, medical offices, and patient facilities.',
      suggestedKeywords: 'healthcare industry, medical buildings, clinic construction, patient facilities'
    },
    { 
      path: '/industries/construction', 
      title: 'Construction Industry',
      suggestedMetaTitle: 'Construction Industry Buildings | Job Site Solutions',
      suggestedDescription: 'Modular buildings for construction sites including offices, storage, and temporary facilities.',
      suggestedKeywords: 'construction industry, job site buildings, temporary offices, construction facilities'
    },
    { 
      path: '/industries/government', 
      title: 'Government Industry',
      suggestedMetaTitle: 'Government Modular Buildings | Public Sector Solutions',
      suggestedDescription: 'Modular building solutions for government agencies and public sector organizations.',
      suggestedKeywords: 'government buildings, public sector, agency facilities, municipal buildings'
    },
    { 
      path: '/industries/manufacturing', 
      title: 'Manufacturing Industry',
      suggestedMetaTitle: 'Manufacturing Facilities | Industrial Modular Buildings',
      suggestedDescription: 'Industrial modular buildings for manufacturing operations, warehouses, and production facilities.',
      suggestedKeywords: 'manufacturing facilities, industrial buildings, production spaces, warehouse solutions'
    },
    { 
      path: '/resources', 
      title: 'Resources Overview',
      suggestedMetaTitle: 'Modular Building Resources | Planning Tools & Guides',
      suggestedDescription: 'Comprehensive resources for planning your modular building project including tools, guides, and inventory.',
      suggestedKeywords: 'modular building resources, planning tools, construction guides, project planning'
    },
    { 
      path: '/resources/live-inventory', 
      title: 'Live Inventory',
      suggestedMetaTitle: 'Live Inventory | Available Modular Buildings',
      suggestedDescription: 'Browse our live inventory of available modular buildings ready for immediate delivery or customization.',
      suggestedKeywords: 'live inventory, available buildings, ready to ship, immediate delivery'
    },
    { 
      path: '/resources/planning-tools', 
      title: 'Planning Tools',
      suggestedMetaTitle: 'Planning Tools | Modular Building Project Planning',
      suggestedDescription: 'Essential planning tools and calculators to help you design and plan your modular building project.',
      suggestedKeywords: 'planning tools, project planning, design tools, building calculators'
    },
    { 
      path: '/resources/content', 
      title: 'Content Resources',
      suggestedMetaTitle: 'Content Resources | Guides & Educational Materials',
      suggestedDescription: 'Educational content and resources about modular construction, best practices, and industry insights.',
      suggestedKeywords: 'educational resources, construction guides, industry insights, best practices'
    },
    { 
      path: '/locations', 
      title: 'Locations Overview',
      suggestedMetaTitle: 'Service Locations | Nationwide Modular Building Delivery',
      suggestedDescription: 'Find our service locations and coverage areas for modular building delivery and installation.',
      suggestedKeywords: 'service locations, delivery areas, nationwide service, coverage map'
    },
    { 
      path: '/news-insights', 
      title: 'News & Insights',
      suggestedMetaTitle: 'News & Insights | Modular Construction Updates',
      suggestedDescription: 'Latest news, insights, and updates from the modular construction industry and our company.',
      suggestedKeywords: 'industry news, construction insights, company updates, modular trends'
    },
    { 
      path: '/quote', 
      title: 'Get Quote',
      suggestedMetaTitle: 'Get Free Quote | Modular Building Cost Estimate',
      suggestedDescription: 'Get a free quote for your modular building project. Fast, accurate estimates with no obligation.',
      suggestedKeywords: 'free quote, cost estimate, pricing, modular building cost, project estimate'
    },
    { 
      path: '/contact', 
      title: 'Contact Us',
      suggestedMetaTitle: 'Contact Us | Modular Building Experts',
      suggestedDescription: 'Contact our modular building experts for consultation, quotes, and project support. Multiple ways to reach us.',
      suggestedKeywords: 'contact us, consultation, expert support, customer service, project help'
    }
  ]

  // Auto-suggest content based on selected page
  const handlePageSelection = (pagePath: string) => {
    const selectedPage = availablePages.find(page => page.path === pagePath)
    if (selectedPage && !editingItem) {
      setFormData(prev => ({
        ...prev,
        page_path: pagePath,
        meta_title: selectedPage.suggestedMetaTitle,
        meta_description: selectedPage.suggestedDescription,
        keywords: selectedPage.suggestedKeywords,
        h1_title: selectedPage.title,
        content_focus: `SEO optimization for ${selectedPage.title.toLowerCase()}`
      }))
    } else {
      setFormData(prev => ({ ...prev, page_path: pagePath }))
    }
  }

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
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">SEO Content Management</h1>
            <p className="text-slate-600 mt-1">Manage meta descriptions, keywords, and content optimization</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg">
            <Plus className="h-4 w-4 mr-2" />
            Add SEO Content
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-700">Total Pages</p>
                  <p className="text-2xl font-bold text-blue-900">{seoItems.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl shadow-lg">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-emerald-700">Optimized</p>
                  <p className="text-2xl font-bold text-emerald-900">{seoItems.filter(item => item.meta_title && item.meta_description).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-gradient-to-r from-amber-600 to-amber-700 rounded-xl shadow-lg">
                  <Search className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-amber-700">Keywords</p>
                  <p className="text-2xl font-bold text-amber-900">{seoItems.reduce((acc, item) => acc + item.target_keywords.length, 0)}</p>
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
                  <select
                    value={formData.page_path}
                    onChange={(e) => handlePageSelection(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  >
                    <option value="">Select a page to optimize...</option>
                    {availablePages.map((page) => (
                      <option key={page.path} value={page.path}>
                        {page.title} ({page.path})
                      </option>
                    ))}
                  </select>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-xs text-gray-500">Choose from existing website pages</p>
                    {formData.page_path && !editingItem && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          const selectedPage = availablePages.find(page => page.path === formData.page_path)
                          if (selectedPage) {
                            setFormData(prev => ({
                              ...prev,
                              meta_title: selectedPage.suggestedMetaTitle,
                              meta_description: selectedPage.suggestedDescription,
                              keywords: selectedPage.suggestedKeywords,
                              h1_title: selectedPage.title,
                              content_focus: `SEO optimization for ${selectedPage.title.toLowerCase()}`
                            }))
                          }
                        }}
                        className="text-xs"
                      >
                        Auto-fill suggestions
                      </Button>
                    )}
                  </div>
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
                  <div className="space-y-2">
                    <select
                      onChange={(e) => {
                        if (e.target.value && !formData.internal_links.includes(e.target.value)) {
                          const newLinks = formData.internal_links ? `${formData.internal_links}, ${e.target.value}` : e.target.value
                          setFormData({...formData, internal_links: newLinks})
                        }
                        e.target.value = ''
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="">Add internal link...</option>
                      {availablePages
                        .filter(page => page.path !== formData.page_path)
                        .map((page) => (
                          <option key={page.path} value={page.path}>
                            {page.title} ({page.path})
                          </option>
                        ))}
                    </select>
                    <Input
                      value={formData.internal_links}
                      onChange={(e) => setFormData({...formData, internal_links: e.target.value})}
                      placeholder="Selected links will appear here..."
                      className="text-sm"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Select from dropdown or edit manually (comma-separated)</p>
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
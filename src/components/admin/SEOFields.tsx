'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Search, 
  Globe, 
  Eye, 
  EyeOff, 
  Share2, 
  Twitter, 
  Facebook,
  Code,
  Settings,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react'

interface SEOData {
  page_path: string
  page_title: string
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
  canonical_url?: string
  robots_index?: boolean
  robots_follow?: boolean
  robots_nosnippet?: boolean
  og_title?: string
  og_description?: string
  og_image?: string
  og_image_alt?: string
  twitter_title?: string
  twitter_description?: string
  twitter_image?: string
  twitter_image_alt?: string
  structured_data_type?: string
  custom_json_ld?: string
  focus_keyword?: string
  is_active?: boolean
}

interface SEOFieldsProps {
  data: Partial<SEOData>
  onChange: (data: Partial<SEOData>) => void
  pagePath: string
  pageTitle: string
}

export default function SEOFields({ data, onChange, pagePath, pageTitle }: SEOFieldsProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'social' | 'advanced' | 'analysis'>('basic')

  const updateField = (field: keyof SEOData, value: any) => {
    onChange({ ...data, [field]: value })
  }

  const getTitleLength = () => (data.seo_title || pageTitle).length
  const getDescriptionLength = () => (data.seo_description || '').length
  
  const getTitleStatus = () => {
    const length = getTitleLength()
    if (length === 0) return { status: 'error', message: 'Title is required' }
    if (length < 30) return { status: 'warning', message: 'Title too short (30+ recommended)' }
    if (length > 60) return { status: 'warning', message: 'Title too long (60 max recommended)' }
    return { status: 'success', message: 'Title length is optimal' }
  }

  const getDescriptionStatus = () => {
    const length = getDescriptionLength()
    if (length === 0) return { status: 'error', message: 'Description is required' }
    if (length < 120) return { status: 'warning', message: 'Description too short (120+ recommended)' }
    if (length > 160) return { status: 'warning', message: 'Description too long (160 max recommended)' }
    return { status: 'success', message: 'Description length is optimal' }
  }

  const StatusIcon = ({ status }: { status: string }) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case 'error': return <AlertCircle className="h-4 w-4 text-red-500" />
      default: return <Info className="h-4 w-4 text-gray-500" />
    }
  }

  const tabs = [
    { id: 'basic', label: 'Basic SEO', icon: Search },
    { id: 'social', label: 'Social Media', icon: Share2 },
    { id: 'advanced', label: 'Advanced', icon: Code },
    { id: 'analysis', label: 'Analysis', icon: Settings }
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5" />
          SEO Configuration
          <Badge variant={data.is_active !== false ? 'default' : 'secondary'}>
            {data.is_active !== false ? 'Active' : 'Inactive'}
          </Badge>
        </CardTitle>
        
        {/* Tab Navigation */}
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab(tab.id as any)}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                {tab.label}
              </Button>
            )
          })}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Hidden fields for page identification */}
          <input type="hidden" value={pagePath} onChange={() => updateField('page_path', pagePath)} />
          <input type="hidden" value={pageTitle} onChange={() => updateField('page_title', pageTitle)} />

          {activeTab === 'basic' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Basic SEO Settings</h3>
              
              {/* SEO Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO Title *
                  <span className="ml-2 text-xs text-gray-500">
                    ({getTitleLength()}/60 characters)
                  </span>
                </label>
                <div className="relative">
                  <Input
                    value={data.seo_title || pageTitle}
                    onChange={(e) => updateField('seo_title', e.target.value)}
                    placeholder="Enter SEO title"
                    className="pr-10"
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <StatusIcon status={getTitleStatus().status} />
                  </div>
                </div>
                <p className={`text-xs mt-1 ${
                  getTitleStatus().status === 'error' ? 'text-red-500' :
                  getTitleStatus().status === 'warning' ? 'text-yellow-500' : 'text-green-500'
                }`}>
                  {getTitleStatus().message}
                </p>
              </div>

              {/* SEO Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meta Description *
                  <span className="ml-2 text-xs text-gray-500">
                    ({getDescriptionLength()}/160 characters)
                  </span>
                </label>
                <div className="relative">
                  <Textarea
                    value={data.seo_description || ''}
                    onChange={(e) => updateField('seo_description', e.target.value)}
                    placeholder="Enter meta description"
                    rows={3}
                  />
                </div>
                <p className={`text-xs mt-1 ${
                  getDescriptionStatus().status === 'error' ? 'text-red-500' :
                  getDescriptionStatus().status === 'warning' ? 'text-yellow-500' : 'text-green-500'
                }`}>
                  {getDescriptionStatus().message}
                </p>
              </div>

              {/* Focus Keyword */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Focus Keyword
                </label>
                <Input
                  value={data.focus_keyword || ''}
                  onChange={(e) => updateField('focus_keyword', e.target.value)}
                  placeholder="Enter primary keyword"
                />
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Keywords (comma-separated)
                </label>
                <Input
                  value={data.seo_keywords || ''}
                  onChange={(e) => updateField('seo_keywords', e.target.value)}
                  placeholder="keyword1, keyword2, keyword3"
                />
              </div>

              {/* Canonical URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Canonical URL
                </label>
                <Input
                  value={data.canonical_url || ''}
                  onChange={(e) => updateField('canonical_url', e.target.value)}
                  placeholder="https://example.com/canonical-page"
                />
              </div>

              {/* Robots Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Engine Settings
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={data.robots_index !== false}
                      onChange={(e) => updateField('robots_index', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">
                      {data.robots_index !== false ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      Allow indexing
                    </span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={data.robots_follow !== false}
                      onChange={(e) => updateField('robots_follow', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">Follow links</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={data.robots_nosnippet || false}
                      onChange={(e) => updateField('robots_nosnippet', e.target.checked)}
                      className="rounded border-gray-300"
                    />
                    <span className="text-sm">No snippet</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Social Media Settings</h3>
              
              {/* Open Graph */}
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-md font-medium">
                  <Facebook className="h-4 w-4" />
                  Open Graph (Facebook)
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">OG Title</label>
                  <Input
                    value={data.og_title || data.seo_title || pageTitle}
                    onChange={(e) => updateField('og_title', e.target.value)}
                    placeholder="Facebook title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">OG Description</label>
                  <Textarea
                    value={data.og_description || data.seo_description || ''}
                    onChange={(e) => updateField('og_description', e.target.value)}
                    placeholder="Facebook description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OG Image URL</label>
                    <Input
                      value={data.og_image || ''}
                      onChange={(e) => updateField('og_image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">OG Image Alt</label>
                    <Input
                      value={data.og_image_alt || ''}
                      onChange={(e) => updateField('og_image_alt', e.target.value)}
                      placeholder="Image description"
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Twitter Cards */}
              <div className="space-y-4">
                <h4 className="flex items-center gap-2 text-md font-medium">
                  <Twitter className="h-4 w-4" />
                  Twitter Cards
                </h4>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Title</label>
                  <Input
                    value={data.twitter_title || data.og_title || data.seo_title || pageTitle}
                    onChange={(e) => updateField('twitter_title', e.target.value)}
                    placeholder="Twitter title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Description</label>
                  <Textarea
                    value={data.twitter_description || data.og_description || data.seo_description || ''}
                    onChange={(e) => updateField('twitter_description', e.target.value)}
                    placeholder="Twitter description"
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Image URL</label>
                    <Input
                      value={data.twitter_image || data.og_image || ''}
                      onChange={(e) => updateField('twitter_image', e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Twitter Image Alt</label>
                    <Input
                      value={data.twitter_image_alt || data.og_image_alt || ''}
                      onChange={(e) => updateField('twitter_image_alt', e.target.value)}
                      placeholder="Image description"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Advanced Settings</h3>
              
              {/* Structured Data Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Structured Data Type
                </label>
                <select
                  value={data.structured_data_type || ''}
                  onChange={(e) => updateField('structured_data_type', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select type...</option>
                  <option value="Article">Article</option>
                  <option value="Product">Product</option>
                  <option value="Service">Service</option>
                  <option value="Organization">Organization</option>
                  <option value="LocalBusiness">Local Business</option>
                  <option value="FAQ">FAQ</option>
                  <option value="HowTo">How-To</option>
                  <option value="WebPage">Web Page</option>
                </select>
              </div>

              {/* Custom JSON-LD */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom JSON-LD Schema
                </label>
                <Textarea
                  value={data.custom_json_ld || ''}
                  onChange={(e) => updateField('custom_json_ld', e.target.value)}
                  placeholder='{"@context": "https://schema.org", "@type": "WebPage", ...}'
                  rows={8}
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter valid JSON-LD structured data
                </p>
              </div>

              {/* Active Status */}
              <div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={data.is_active !== false}
                    onChange={(e) => updateField('is_active', e.target.checked)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium">
                    SEO Active (publish meta tags)
                  </span>
                </label>
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">SEO Analysis</h3>
              
              {/* SERP Preview */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="text-md font-medium mb-3">Search Engine Preview</h4>
                <div className="bg-white p-4 rounded border">
                  <div className="text-blue-600 text-lg hover:underline cursor-pointer">
                    {data.seo_title || pageTitle}
                  </div>
                  <div className="text-green-600 text-sm">
                    {data.canonical_url || `https://example.com${pagePath}`}
                  </div>
                  <div className="text-gray-700 text-sm mt-1">
                    {data.seo_description || 'No meta description provided.'}
                  </div>
                </div>
              </div>

              {/* SEO Score */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Title Optimization</h4>
                  <div className="flex items-center justify-between">
                    <StatusIcon status={getTitleStatus().status} />
                    <span className="text-xs text-gray-600">{getTitleLength()}/60</span>
                  </div>
                </div>
                
                <div className="bg-white p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-2">Description Optimization</h4>
                  <div className="flex items-center justify-between">
                    <StatusIcon status={getDescriptionStatus().status} />
                    <span className="text-xs text-gray-600">{getDescriptionLength()}/160</span>
                  </div>
                </div>
              </div>

              {/* Quick Improvements */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="text-md font-medium mb-2">Quick Improvements</h4>
                <ul className="text-sm space-y-1 text-gray-700">
                  {!data.focus_keyword && <li>• Add a focus keyword</li>}
                  {!data.og_image && <li>• Add an Open Graph image</li>}
                  {!data.canonical_url && <li>• Set a canonical URL</li>}
                  {(!data.seo_keywords || data.seo_keywords.split(',').length < 3) && <li>• Add more relevant keywords</li>}
                </ul>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
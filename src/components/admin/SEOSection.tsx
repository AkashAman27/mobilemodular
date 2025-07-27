'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { 
  Search, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Eye,
  Share2,
  Settings,
  BarChart3,
  Lightbulb,
  ExternalLink
} from 'lucide-react'
import { SEOData, SEOValidationStatus, PageType } from '@/types/seo'
import { seoValidator } from '@/lib/seo-validation'

interface SEOSectionProps {
  pageType: PageType
  contentId: string
  pagePath: string
  initialData?: Partial<SEOData>
  onSave?: (data: SEOData) => Promise<void>
  className?: string
}

export default function SEOSection({
  pageType,
  contentId,
  pagePath,
  initialData = {},
  onSave,
  className = ''
}: SEOSectionProps) {
  const [seoData, setSeoData] = useState<Partial<SEOData>>({
    page_path: pagePath,
    page_type: pageType,
    seo_title: '',
    seo_description: '',
    focus_keyword: '',
    seo_keywords: [],
    canonical_url: '',
    social_title: '',
    social_description: '',
    social_image: '',
    robots_meta: 'index, follow',
    json_ld_schema: '',
    ...initialData
  })

  const [validation, setValidation] = useState<SEOValidationStatus | null>(null)
  const [saving, setSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [activeTab, setActiveTab] = useState('basic')

  // Validate SEO data when it changes
  React.useEffect(() => {
    try {
      const validationResult = seoValidator.validateSEOData(seoData)
      setValidation(validationResult)
    } catch (error) {
      console.error('SEO validation error:', error)
      setValidation(null)
    }
  }, [seoData])

  const handleSave = async () => {
    if (!onSave) return

    setSaving(true)
    try {
      await onSave(seoData as SEOData)
      setLastSaved(new Date())
    } catch (error) {
      console.error('Failed to save SEO data:', error)
      alert('Failed to save SEO settings. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const updateSEOData = (field: keyof SEOData, value: any) => {
    setSeoData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 80) return 'default'
    if (score >= 60) return 'secondary'
    return 'destructive'
  }

  const criticalIssues = validation?.issues.filter(i => i.severity === 'critical') || []
  const majorIssues = validation?.issues.filter(i => i.severity === 'major') || []

  return (
    <Card className={`w-full ${className}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Search className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg">SEO Optimization</CardTitle>
              <p className="text-sm text-gray-600 mt-1">
                Configure search engine optimization for this {pageType}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {validation && (
              <div className="flex items-center space-x-2">
                <Badge variant={getScoreBadgeVariant(validation.score)}>
                  {validation.score}/100
                </Badge>
                {validation.isValid ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            )}
            
            <Button 
              onClick={handleSave}
              disabled={saving || !validation?.isValid}
              size="sm"
            >
              {saving ? 'Saving...' : 'Save SEO'}
            </Button>
          </div>
        </div>

        {/* Quick Status Overview */}
        {validation && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-500" />
                <span className="text-sm">
                  Score: <span className={getScoreColor(validation.score)}>{validation.score}/100</span>
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm">
                  Issues: {criticalIssues.length + majorIssues.length}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Lightbulb className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">
                  Suggestions: {validation.suggestions.length}
                </span>
              </div>
            </div>

            {/* Critical Issues Alert */}
            {criticalIssues.length > 0 && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-red-800">Critical Issues Found</p>
                    <ul className="mt-1 text-sm text-red-700">
                      {criticalIssues.slice(0, 2).map((issue, index) => (
                        <li key={index}>• {issue.message}</li>
                      ))}
                      {criticalIssues.length > 2 && (
                        <li>• +{criticalIssues.length - 2} more issues</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic" className="flex items-center space-x-1">
              <Search className="h-4 w-4" />
              <span>Basic SEO</span>
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center space-x-1">
              <Share2 className="h-4 w-4" />
              <span>Social</span>
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center space-x-1">
              <Settings className="h-4 w-4" />
              <span>Advanced</span>
            </TabsTrigger>
            <TabsTrigger value="analysis" className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span>Analysis</span>
            </TabsTrigger>
          </TabsList>

          {/* Basic SEO Tab */}
          <TabsContent value="basic" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="seo_title">SEO Title</Label>
                <Input
                  id="seo_title"
                  value={seoData.seo_title || ''}
                  onChange={(e) => updateSEOData('seo_title', e.target.value)}
                  placeholder="Enter SEO title (30-60 characters recommended)"
                  className="mt-1"
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    {(seoData.seo_title || '').length}/60 characters
                  </p>
                  {validation?.issues.find(i => i.field === 'seo_title') && (
                    <span className="text-xs text-red-500">
                      {validation.issues.find(i => i.field === 'seo_title')?.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="seo_description">Meta Description</Label>
                <Textarea
                  id="seo_description"
                  value={seoData.seo_description || ''}
                  onChange={(e) => updateSEOData('seo_description', e.target.value)}
                  placeholder="Enter meta description (120-160 characters recommended)"
                  rows={3}
                  className="mt-1"
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-xs text-gray-500">
                    {(seoData.seo_description || '').length}/160 characters
                  </p>
                  {validation?.issues.find(i => i.field === 'seo_description') && (
                    <span className="text-xs text-red-500">
                      {validation.issues.find(i => i.field === 'seo_description')?.message}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="focus_keyword">Focus Keyword</Label>
                <Input
                  id="focus_keyword"
                  value={seoData.focus_keyword || ''}
                  onChange={(e) => updateSEOData('focus_keyword', e.target.value)}
                  placeholder="Primary keyword for this page"
                  className="mt-1"
                />
                {validation?.issues.find(i => i.field === 'focus_keyword') && (
                  <p className="text-xs text-red-500 mt-1">
                    {validation.issues.find(i => i.field === 'focus_keyword')?.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="seo_keywords">SEO Keywords</Label>
                <Input
                  id="seo_keywords"
                  value={(seoData.seo_keywords || []).join(', ')}
                  onChange={(e) => updateSEOData('seo_keywords', e.target.value.split(',').map(k => k.trim()).filter(k => k))}
                  placeholder="keyword1, keyword2, keyword3"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate keywords with commas. 3-10 keywords recommended.
                </p>
              </div>
            </div>

            {/* Search Preview */}
            <div className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center space-x-2 mb-3">
                <Eye className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Search Engine Preview</span>
              </div>
              <div className="space-y-1">
                <div className="text-blue-600 text-lg font-medium hover:underline cursor-pointer">
                  {seoData.seo_title || 'Your SEO Title Here'}
                </div>
                <div className="text-green-700 text-sm">
                  https://mobilemodular.com{pagePath}
                </div>
                <div className="text-gray-600 text-sm">
                  {seoData.seo_description || 'Your meta description will appear here...'}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Social Media Tab */}
          <TabsContent value="social" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="social_title">Social Media Title</Label>
                <Input
                  id="social_title"
                  value={seoData.social_title || ''}
                  onChange={(e) => updateSEOData('social_title', e.target.value)}
                  placeholder="Title for social media sharing (optional)"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {(seoData.social_title || '').length}/60 characters for optimal display
                </p>
              </div>

              <div>
                <Label htmlFor="social_description">Social Media Description</Label>
                <Textarea
                  id="social_description"
                  value={seoData.social_description || ''}
                  onChange={(e) => updateSEOData('social_description', e.target.value)}
                  placeholder="Description for social media sharing (optional)"
                  rows={3}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {(seoData.social_description || '').length}/200 characters for optimal display
                </p>
              </div>

              <div>
                <Label htmlFor="social_image">Social Media Image URL</Label>
                <Input
                  id="social_image"
                  value={seoData.social_image || ''}
                  onChange={(e) => updateSEOData('social_image', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Recommended: 1200x630px for optimal social media display
                </p>
              </div>
            </div>

            {/* Social Preview */}
            <div className="p-4 border rounded-lg bg-gray-50">
              <div className="flex items-center space-x-2 mb-3">
                <Share2 className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Social Media Preview</span>
              </div>
              <div className="border rounded-lg overflow-hidden bg-white max-w-md">
                {seoData.social_image && (
                  <div className="h-32 bg-gray-200 flex items-center justify-center">
                    <img 
                      src={seoData.social_image} 
                      alt="Social preview" 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </div>
                )}
                <div className="p-3">
                  <div className="text-sm font-medium text-gray-900 line-clamp-2">
                    {seoData.social_title || seoData.seo_title || 'Your title here'}
                  </div>
                  <div className="text-xs text-gray-600 mt-1 line-clamp-2">
                    {seoData.social_description || seoData.seo_description || 'Your description here'}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    mobilemodular.com
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Advanced Tab */}
          <TabsContent value="advanced" className="space-y-6 mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="canonical_url">Canonical URL</Label>
                <Input
                  id="canonical_url"
                  value={seoData.canonical_url || ''}
                  onChange={(e) => updateSEOData('canonical_url', e.target.value)}
                  placeholder="https://mobilemodular.com/page"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Specify the preferred URL if this content exists at multiple URLs
                </p>
              </div>

              <div>
                <Label htmlFor="robots_meta">Robots Meta</Label>
                <select
                  id="robots_meta"
                  value={seoData.robots_meta || 'index, follow'}
                  onChange={(e) => updateSEOData('robots_meta', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
                >
                  <option value="index, follow">Index, Follow</option>
                  <option value="noindex, follow">No Index, Follow</option>
                  <option value="index, nofollow">Index, No Follow</option>
                  <option value="noindex, nofollow">No Index, No Follow</option>
                  <option value="noindex, nofollow, noarchive">No Index, No Follow, No Archive</option>
                  <option value="noindex, nofollow, nosnippet">No Index, No Follow, No Snippet</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Control how search engines crawl and index this page
                </p>
              </div>

              <div>
                <Label htmlFor="json_ld_schema">JSON-LD Structured Data</Label>
                <Textarea
                  id="json_ld_schema"
                  value={seoData.json_ld_schema || ''}
                  onChange={(e) => updateSEOData('json_ld_schema', e.target.value)}
                  placeholder='{"@context": "https://schema.org", "@type": "Organization", "name": "Example"}'
                  rows={6}
                  className="mt-1 font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Add structured data to help search engines understand your content
                </p>
                {validation?.issues.find(i => i.field === 'json_ld_schema') && (
                  <p className="text-xs text-red-500 mt-1">
                    {validation.issues.find(i => i.field === 'json_ld_schema')?.message}
                  </p>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6 mt-6">
            {validation ? (
              <div className="space-y-6">
                {/* Optimization Score */}
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">SEO Score</h3>
                    <Badge variant={getScoreBadgeVariant(validation.score)} className="text-lg px-3 py-1">
                      {validation.score}/100
                    </Badge>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        validation.score >= 80 ? 'bg-green-500' : 
                        validation.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${validation.score}%` }}
                    />
                  </div>
                </div>

                {/* Issues */}
                {validation.issues.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-red-600">Issues to Fix</h3>
                    {validation.issues.map((issue, index) => (
                      <div key={index} className="p-3 border border-red-200 rounded-lg bg-red-50">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-red-800">{issue.message}</p>
                            {issue.recommendation && (
                              <p className="text-xs text-red-600 mt-1">{issue.recommendation}</p>
                            )}
                            <Badge variant="outline" className="mt-2 text-xs">
                              {issue.field} • {issue.severity}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Warnings */}
                {validation.warnings.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-yellow-600">Warnings</h3>
                    {validation.warnings.map((warning, index) => (
                      <div key={index} className="p-3 border border-yellow-200 rounded-lg bg-yellow-50">
                        <div className="flex items-start space-x-2">
                          <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-yellow-800">{warning.message}</p>
                            {warning.recommended_value && (
                              <p className="text-xs text-yellow-600 mt-1">{warning.recommended_value}</p>
                            )}
                            <Badge variant="outline" className="mt-2 text-xs">
                              {warning.field}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {validation.suggestions.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-lg font-medium text-blue-600">Suggestions for Improvement</h3>
                    {validation.suggestions.map((suggestion, index) => (
                      <div key={index} className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                        <div className="flex items-start space-x-2">
                          <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5" />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-blue-800">{suggestion.message}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {suggestion.field}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {suggestion.priority} priority
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Link to Central SEO Management */}
                <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-800">Centralized SEO Management</h3>
                      <p className="text-xs text-gray-600 mt-1">
                        Manage SEO for all pages from one place
                      </p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <a href="/admin/seo-content" target="_blank">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Open SEO Center
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">Enter SEO data to see analysis</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Save Status */}
        {lastSaved && (
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              Last saved: {lastSaved.toLocaleString()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
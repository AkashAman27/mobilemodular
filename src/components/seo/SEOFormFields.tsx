'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Info, ExternalLink, X } from 'lucide-react'

export interface SEOFormData {
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
}

interface SEOFormFieldsProps {
  data: SEOFormData
  onChange: (field: keyof SEOFormData, value: any) => void
  baseUrl?: string
  slug?: string
  contentType?: 'solution' | 'homepage' | 'page' | 'industry' | 'location'
  showJsonLd?: boolean
  fallbackTitle?: string
  fallbackDescription?: string
  defaultImage?: string
}

const structuredDataTypes = [
  { value: 'WebPage', label: 'Web Page' },
  { value: 'Product', label: 'Product' },
  { value: 'Service', label: 'Service' },
  { value: 'Organization', label: 'Organization' },
  { value: 'LocalBusiness', label: 'Local Business' },
  { value: 'AboutPage', label: 'About Page' },
  { value: 'ContactPage', label: 'Contact Page' },
  { value: 'CollectionPage', label: 'Collection Page' },
  { value: 'FAQPage', label: 'FAQ Page' },
  { value: 'Article', label: 'Article' },
  { value: 'BlogPosting', label: 'Blog Posting' }
]

export function SEOFormFields({ 
  data, 
  onChange, 
  baseUrl = 'https://amanmodular.com',
  slug = '',
  contentType = 'page',
  showJsonLd = false,
  fallbackTitle = '',
  fallbackDescription = '',
  defaultImage = ''
}: SEOFormFieldsProps) {
  
  const getFullUrl = () => {
    if (!slug) return baseUrl
    switch (contentType) {
      case 'solution':
        return `${baseUrl}/solutions/${slug}`
      case 'industry':
        return `${baseUrl}/industries/${slug}`
      case 'location':
        return `${baseUrl}/locations/${slug}`
      case 'page':
        return `${baseUrl}/${slug}`
      default:
        return baseUrl
    }
  }

  const fullUrl = getFullUrl()
  
  const titleLength = data.seo_title?.length || 0
  const descriptionLength = data.seo_description?.length || 0
  
  const getTitleStatus = () => {
    if (titleLength === 0) return { color: 'bg-gray-200', text: 'No title' }
    if (titleLength < 30) return { color: 'bg-orange-200', text: 'Too short' }
    if (titleLength > 60) return { color: 'bg-red-200', text: 'Too long' }
    return { color: 'bg-green-200', text: 'Good' }
  }
  
  const getDescriptionStatus = () => {
    if (descriptionLength === 0) return { color: 'bg-gray-200', text: 'No description' }
    if (descriptionLength < 120) return { color: 'bg-orange-200', text: 'Too short' }
    if (descriptionLength > 160) return { color: 'bg-red-200', text: 'Too long' }
    return { color: 'bg-green-200', text: 'Good' }
  }

  return (
    <div className="space-y-6 w-full admin-form-container">
      {/* Basic SEO */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            SEO Basics
            <Badge variant="secondary">P0</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* SEO Title */}
          <div className="space-y-2">
            <Label htmlFor="seo_title" className="flex items-center gap-2">
              Page Title
              <Badge className={getTitleStatus().color}>{getTitleStatus().text}</Badge>
              <span className="text-sm text-gray-500">({titleLength}/60 chars)</span>
            </Label>
            <Input
              id="seo_title"
              value={data.seo_title || ''}
              onChange={(e) => onChange('seo_title', e.target.value)}
              placeholder="Enter SEO-optimized page title..."
              maxLength={60}
            />
            <p className="text-xs text-gray-600">
              Appears in search results and browser tabs. Keep it under 60 characters.
            </p>
          </div>

          {/* Meta Description */}
          <div className="space-y-2">
            <Label htmlFor="seo_description" className="flex items-center gap-2">
              Meta Description
              <Badge className={getDescriptionStatus().color}>{getDescriptionStatus().text}</Badge>
              <span className="text-sm text-gray-500">({descriptionLength}/160 chars)</span>
            </Label>
            <Textarea
              id="seo_description"
              value={data.seo_description || ''}
              onChange={(e) => onChange('seo_description', e.target.value)}
              placeholder="Write a compelling description that will appear in search results..."
              maxLength={160}
              rows={3}
            />
            <p className="text-xs text-gray-600">
              Appears below the title in search results. Keep it between 120-160 characters.
            </p>
          </div>

          {/* URL Preview */}
          {fullUrl && (
            <div className="space-y-2">
              <Label>URL Preview</Label>
              <div className="p-3 bg-gray-50 rounded border text-sm">
                <div className="flex items-center gap-2">
                  <ExternalLink className="h-4 w-4 text-gray-500" />
                  <span className="text-blue-600">{fullUrl}</span>
                </div>
              </div>
            </div>
          )}

          {/* Focus Keyword */}
          <div className="space-y-2">
            <Label htmlFor="focus_keyword">Focus Keyword</Label>
            <Input
              id="focus_keyword"
              value={data.focus_keyword || ''}
              onChange={(e) => onChange('focus_keyword', e.target.value)}
              placeholder="Primary keyword for this content..."
            />
            <p className="text-xs text-gray-600">
              Main keyword you want this page to rank for.
            </p>
          </div>

          {/* SEO Keywords */}
          <div className="space-y-2">
            <Label htmlFor="seo_keywords">SEO Keywords</Label>
            <Input
              id="seo_keywords"
              value={data.seo_keywords || ''}
              onChange={(e) => onChange('seo_keywords', e.target.value)}
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-gray-600">
              Comma-separated keywords for internal tracking and analysis.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Robots & Indexing */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Search Engine Indexing
            <Badge variant="secondary">P0</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="robots_index"
                checked={data.robots_index !== false}
                onCheckedChange={(checked) => onChange('robots_index', checked)}
              />
              <Label htmlFor="robots_index">Allow Indexing</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="robots_follow"
                checked={data.robots_follow !== false}
                onCheckedChange={(checked) => onChange('robots_follow', checked)}
              />
              <Label htmlFor="robots_follow">Follow Links</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="robots_nosnippet"
                checked={data.robots_nosnippet === true}
                onCheckedChange={(checked) => onChange('robots_nosnippet', checked)}
              />
              <Label htmlFor="robots_nosnippet">No Snippet</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="canonical_url">Canonical URL (Optional)</Label>
            <Input
              id="canonical_url"
              value={data.canonical_url || ''}
              onChange={(e) => onChange('canonical_url', e.target.value)}
              placeholder="https://amanmodular.com/canonical-url"
            />
            <p className="text-xs text-gray-600">
              Leave empty to use the default URL. Use for duplicate content prevention.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Social Media Preview
            <Badge variant="secondary">P0</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Open Graph */}
          <div className="space-y-4">
            <h4 className="font-medium">Open Graph (Facebook, LinkedIn)</h4>
            
            <div className="space-y-2">
              <Label htmlFor="og_title">OG Title</Label>
              <Input
                id="og_title"
                value={data.og_title || ''}
                onChange={(e) => onChange('og_title', e.target.value)}
                placeholder="Title for social media sharing (defaults to SEO title)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="og_description">OG Description</Label>
              <Textarea
                id="og_description"
                value={data.og_description || ''}
                onChange={(e) => onChange('og_description', e.target.value)}
                placeholder="Description for social media sharing (defaults to meta description)"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="og_image">OG Image URL</Label>
                <Input
                  id="og_image"
                  value={data.og_image || ''}
                  onChange={(e) => onChange('og_image', e.target.value)}
                  placeholder="https://amanmodular.com/og-image.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="og_image_alt">OG Image Alt Text</Label>
                <Input
                  id="og_image_alt"
                  value={data.og_image_alt || ''}
                  onChange={(e) => onChange('og_image_alt', e.target.value)}
                  placeholder="Descriptive alt text for the image"
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Twitter */}
          <div className="space-y-4">
            <h4 className="font-medium">Twitter Card</h4>
            
            <div className="space-y-2">
              <Label htmlFor="twitter_title">Twitter Title</Label>
              <Input
                id="twitter_title"
                value={data.twitter_title || ''}
                onChange={(e) => onChange('twitter_title', e.target.value)}
                placeholder="Twitter-specific title (defaults to OG title)"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="twitter_description">Twitter Description</Label>
              <Textarea
                id="twitter_description"
                value={data.twitter_description || ''}
                onChange={(e) => onChange('twitter_description', e.target.value)}
                placeholder="Twitter-specific description (defaults to OG description)"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="twitter_image">Twitter Image URL</Label>
                <Input
                  id="twitter_image"
                  value={data.twitter_image || ''}
                  onChange={(e) => onChange('twitter_image', e.target.value)}
                  placeholder="https://amanmodular.com/twitter-image.jpg"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="twitter_image_alt">Twitter Image Alt</Label>
                <Input
                  id="twitter_image_alt"
                  value={data.twitter_image_alt || ''}
                  onChange={(e) => onChange('twitter_image_alt', e.target.value)}
                  placeholder="Alt text for Twitter image"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Structured Data */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Structured Data
            <Badge variant="secondary">P0</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="structured_data_type">Schema Type</Label>
            <Select 
              value={data.structured_data_type || 'WebPage'} 
              onValueChange={(value) => {
                // Silent logging - removed console.log
                onChange('structured_data_type', value)
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select schema type" />
              </SelectTrigger>
              <SelectContent>
                {structuredDataTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-600">
              Schema.org type for structured data markup.
            </p>
          </div>

          {showJsonLd && (
            <div className="space-y-2">
              <Label htmlFor="custom_json_ld">Custom JSON-LD (Optional)</Label>
              <Textarea
                id="custom_json_ld"
                value={data.custom_json_ld || ''}
                onChange={(e) => onChange('custom_json_ld', e.target.value)}
                placeholder="Enter custom JSON-LD structured data..."
                rows={6}
                className="font-mono text-sm"
              />
              <p className="text-xs text-gray-600">
                Custom JSON-LD structured data. Will override automatic generation.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* SEO Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            SEO Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Include your focus keyword in the title and description naturally</li>
            <li>• Write for humans first, search engines second</li>
            <li>• Use unique titles and descriptions for each page</li>
            <li>• Optimize images with descriptive alt text</li>
            <li>• Ensure your content provides value to users</li>
            <li>• Use header tags (H1, H2, H3) to structure content</li>
            <li>• Include internal links to related pages</li>
            <li>• Keep URLs short and descriptive</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

export default SEOFormFields
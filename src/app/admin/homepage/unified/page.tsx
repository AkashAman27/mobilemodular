'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, Plus, X, Eye, ChevronDown, ChevronUp, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import PreviewButton from '@/components/admin/PreviewButton'
import ImageUpload from '@/components/ui/image-upload'

interface HomepageSection {
  id: string
  section_type: string
  title: string
  subtitle: string
  description: string
  display_order: number
  is_active: boolean
  content_data: any
}

interface HeroContent {
  background_image: string
  background_alt: string
  features: Array<{ text: string }>
  trust_indicators: Array<{
    label: string
    description: string
  }>
  primary_cta: {
    text: string
    url: string
  }
  secondary_cta: {
    text: string
    url: string
  }
}

interface ValueContent {
  cta_title: string
  cta_description: string
  values: Array<{
    title: string
    description: string
    icon: string
  }>
}

export default function UnifiedHomepageAdmin() {
  const [sections, setSections] = useState<HomepageSection[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(['hero'])

  useEffect(() => {
    fetchHomepageData()
  }, [])

  const fetchHomepageData = async () => {
    try {
      // Try to fetch from homepage_sections first (newer structure)
      const { data: sectionsData, error: sectionsError } = await supabase
        .from('homepage_sections')
        .select('*')
        .order('display_order')

      if (sectionsData && sectionsData.length > 0) {
        setSections(sectionsData)
      } else {
        // Fallback to homepage_content (older structure) and convert
        const { data: contentData, error: contentError } = await supabase
          .from('homepage_content')
          .select('*')
          .order('sort_order')

        if (contentData) {
          // Convert old structure to new structure
          const convertedSections = convertLegacyData(contentData)
          setSections(convertedSections)
        }
      }
    } catch (error) {
      console.error('Error fetching homepage data:', error)
      // Initialize with default sections if nothing exists
      initializeDefaultSections()
    } finally {
      setLoading(false)
    }
  }

  const convertLegacyData = (legacyData: any[]) => {
    return legacyData.map((item, index) => ({
      id: item.id,
      section_type: item.section,
      title: item.title || '',
      subtitle: item.subtitle || '',
      description: item.content || '',
      display_order: item.sort_order || index,
      is_active: item.is_active !== false,
      content_data: {
        image_url: item.image_url || ''
      }
    }))
  }

  const initializeDefaultSections = () => {
    const defaultSections: HomepageSection[] = [
      {
        id: 'hero-default',
        section_type: 'hero',
        title: 'Professional Modular Buildings',
        subtitle: 'Built for Your Success',
        description: 'From temporary offices to permanent facilities, we deliver high-quality modular buildings that meet your exact specifications.',
        display_order: 1,
        is_active: true,
        content_data: {
          background_image: '/images/hero-bg.jpg',
          background_alt: 'Modular buildings',
          features: [
            { text: 'Quick Installation' },
            { text: 'Custom Designs' },
            { text: 'Code Compliant' },
            { text: '24/7 Support' }
          ],
          trust_indicators: [
            { label: '10,000+', description: 'Buildings Delivered' },
            { label: '15+', description: 'Years Experience' },
            { label: '50', description: 'States Served' }
          ],
          primary_cta: { text: 'Get Custom Quote', url: '/contact' },
          secondary_cta: { text: 'Call (866) 819-9017', url: 'tel:8668199017' }
        }
      },
      {
        id: 'values-default',
        section_type: 'values',
        title: 'Why Choose Our Modular Buildings',
        subtitle: 'Built on Values That Matter',
        description: 'Our commitment to excellence drives everything we do.',
        display_order: 2,
        is_active: true,
        content_data: {
          values: [
            { title: 'Safe & Secure', description: 'Built to the highest safety standards', icon: 'Shield' },
            { title: 'Customization', description: 'Tailored to your exact needs', icon: 'Settings' },
            { title: 'Speed', description: 'Fast delivery and installation', icon: 'Zap' },
            { title: 'Customer Support', description: '24/7 dedicated support team', icon: 'Users' }
          ]
        }
      },
      {
        id: 'solutions-default',
        section_type: 'solutions',
        title: 'Our Solutions',
        subtitle: 'Modular Buildings for Every Need',
        description: 'Explore our comprehensive range of modular building solutions.',
        display_order: 3,
        is_active: true,
        content_data: {}
      }
    ]
    setSections(defaultSections)
  }

  const updateSection = (sectionId: string, field: keyof HomepageSection | string, value: any) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        if (field.includes('.')) {
          // Handle nested content_data updates
          const [parent, child] = field.split('.')
          if (parent === 'content_data') {
            return {
              ...section,
              content_data: {
                ...section.content_data,
                [child]: value
              }
            }
          }
        }
        return { ...section, [field]: value }
      }
      return section
    }))
  }

  const updateNestedContent = (sectionId: string, path: string, value: any) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        const newContentData = { ...section.content_data }
        const keys = path.split('.')
        let current = newContentData
        
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) current[keys[i]] = {}
          current = current[keys[i]]
        }
        
        current[keys[keys.length - 1]] = value
        
        return { ...section, content_data: newContentData }
      }
      return section
    }))
  }

  const addArrayItem = (sectionId: string, arrayPath: string, newItem: any) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        const newContentData = { ...section.content_data }
        if (!newContentData[arrayPath]) newContentData[arrayPath] = []
        newContentData[arrayPath] = [...newContentData[arrayPath], newItem]
        return { ...section, content_data: newContentData }
      }
      return section
    }))
  }

  const removeArrayItem = (sectionId: string, arrayPath: string, index: number) => {
    setSections(prev => prev.map(section => {
      if (section.id === sectionId) {
        const newContentData = { ...section.content_data }
        if (newContentData[arrayPath]) {
          newContentData[arrayPath] = newContentData[arrayPath].filter((_: any, i: number) => i !== index)
        }
        return { ...section, content_data: newContentData }
      }
      return section
    }))
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Save all sections
      for (const section of sections) {
        const { error } = await supabase
          .from('homepage_sections')
          .upsert({
            id: section.id,
            section_type: section.section_type,
            title: section.title,
            subtitle: section.subtitle,
            description: section.description,
            display_order: section.display_order,
            is_active: section.is_active,
            content_data: section.content_data,
            updated_at: new Date().toISOString()
          })

        if (error) {
          console.error('Error saving section:', error)
          alert(`Error saving ${section.section_type} section: ${error.message}`)
          return
        }
      }

      alert('Homepage updated successfully!')
    } catch (error) {
      console.error('Error saving homepage:', error)
      alert('Error saving homepage')
    } finally {
      setSaving(false)
    }
  }

  const getSectionIcon = (sectionType: string) => {
    switch (sectionType) {
      case 'hero': return '🏠'
      case 'values': return '⭐'
      case 'solutions': return '🏗️'
      case 'news': return '📰'
      case 'locations': return '📍'
      case 'testimonials': return '💬'
      default: return '📄'
    }
  }

  const renderHeroSection = (section: HomepageSection) => {
    const content = section.content_data as HeroContent || {}
    
    return (
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
            <Input
              value={section.title}
              onChange={(e) => updateSection(section.id, 'title', e.target.value)}
              placeholder="Main hero title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
            <Input
              value={section.subtitle}
              onChange={(e) => updateSection(section.id, 'subtitle', e.target.value)}
              placeholder="Hero subtitle"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
          <Textarea
            value={section.description}
            onChange={(e) => updateSection(section.id, 'description', e.target.value)}
            placeholder="Hero description text"
            rows={3}
          />
        </div>

        {/* Background Image */}
        <div>
          <ImageUpload
            label="Hero Background Image"
            value={content.background_image || ''}
            onChange={(url) => updateNestedContent(section.id, 'background_image', url)}
            bucketName="images"
            folder="hero"
          />
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Primary CTA Button</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <Input
                  value={content.primary_cta?.text || ''}
                  onChange={(e) => updateNestedContent(section.id, 'primary_cta.text', e.target.value)}
                  placeholder="Get Custom Quote"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button URL</label>
                <Input
                  value={content.primary_cta?.url || ''}
                  onChange={(e) => updateNestedContent(section.id, 'primary_cta.url', e.target.value)}
                  placeholder="/contact"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Secondary CTA Button</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                <Input
                  value={content.secondary_cta?.text || ''}
                  onChange={(e) => updateNestedContent(section.id, 'secondary_cta.text', e.target.value)}
                  placeholder="Call (866) 819-9017"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Button URL</label>
                <Input
                  value={content.secondary_cta?.url || ''}
                  onChange={(e) => updateNestedContent(section.id, 'secondary_cta.url', e.target.value)}
                  placeholder="tel:8668199017"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Hero Features (Checkmark Items)</CardTitle>
            <CardDescription>Features that appear with checkmarks below the hero text</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(content.features || []).map((feature: any, index: number) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={feature.text || ''}
                    onChange={(e) => {
                      const newFeatures = [...(content.features || [])]
                      newFeatures[index] = { text: e.target.value }
                      updateNestedContent(section.id, 'features', newFeatures)
                    }}
                    placeholder="Feature text"
                    className="flex-1"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem(section.id, 'features', index)}
                    className="text-red-600"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem(section.id, 'features', { text: '' })}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Feature
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Trust Indicators (Stats)</CardTitle>
            <CardDescription>Statistics that build trust (e.g., "10,000+ Buildings Delivered")</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(content.trust_indicators || []).map((indicator: any, index: number) => (
                <div key={index} className="grid grid-cols-2 gap-3 p-3 border rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Label (e.g., "10,000+")</label>
                    <Input
                      value={indicator.label || ''}
                      onChange={(e) => {
                        const newIndicators = [...(content.trust_indicators || [])]
                        newIndicators[index] = { ...newIndicators[index], label: e.target.value }
                        updateNestedContent(section.id, 'trust_indicators', newIndicators)
                      }}
                      placeholder="10,000+"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <Input
                      value={indicator.description || ''}
                      onChange={(e) => {
                        const newIndicators = [...(content.trust_indicators || [])]
                        newIndicators[index] = { ...newIndicators[index], description: e.target.value }
                        updateNestedContent(section.id, 'trust_indicators', newIndicators)
                      }}
                      placeholder="Buildings Delivered"
                    />
                  </div>
                  <div className="col-span-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem(section.id, 'trust_indicators', index)}
                      className="text-red-600"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Remove Indicator
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem(section.id, 'trust_indicators', { label: '', description: '' })}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Trust Indicator
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderValuesSection = (section: HomepageSection) => {
    const content = section.content_data as ValueContent || {}
    
    return (
      <div className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
            <Input
              value={section.title}
              onChange={(e) => updateSection(section.id, 'title', e.target.value)}
              placeholder="Why Choose Our Modular Buildings"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
            <Input
              value={section.subtitle}
              onChange={(e) => updateSection(section.id, 'subtitle', e.target.value)}
              placeholder="Built on Values That Matter"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
          <Textarea
            value={section.description}
            onChange={(e) => updateSection(section.id, 'description', e.target.value)}
            placeholder="Our commitment to excellence drives everything we do."
            rows={2}
          />
        </div>

        {/* Values */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Core Values</CardTitle>
            <CardDescription>The four core values with icons that define your business</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(content.values || []).map((value: any, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                        <select
                          value={value.icon || 'Shield'}
                          onChange={(e) => {
                            const newValues = [...(content.values || [])]
                            newValues[index] = { ...newValues[index], icon: e.target.value }
                            updateNestedContent(section.id, 'values', newValues)
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="Shield">Shield (Safe & Secure)</option>
                          <option value="Settings">Settings (Customization)</option>
                          <option value="Zap">Zap (Speed)</option>
                          <option value="Users">Users (Customer Support)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <Input
                          value={value.title || ''}
                          onChange={(e) => {
                            const newValues = [...(content.values || [])]
                            newValues[index] = { ...newValues[index], title: e.target.value }
                            updateNestedContent(section.id, 'values', newValues)
                          }}
                          placeholder="Safe & Secure"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <Textarea
                          value={value.description || ''}
                          onChange={(e) => {
                            const newValues = [...(content.values || [])]
                            newValues[index] = { ...newValues[index], description: e.target.value }
                            updateNestedContent(section.id, 'values', newValues)
                          }}
                          placeholder="Built to the highest safety standards"
                          rows={2}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderGenericSection = (section: HomepageSection) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
            <Input
              value={section.title}
              onChange={(e) => updateSection(section.id, 'title', e.target.value)}
              placeholder="Section title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
            <Input
              value={section.subtitle}
              onChange={(e) => updateSection(section.id, 'subtitle', e.target.value)}
              placeholder="Section subtitle"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
          <Textarea
            value={section.description}
            onChange={(e) => updateSection(section.id, 'description', e.target.value)}
            placeholder="Section description"
            rows={3}
          />
        </div>

        {section.content_data?.image_url !== undefined && (
          <ImageUpload
            label="Section Image"
            value={section.content_data.image_url || ''}
            onChange={(url) => updateNestedContent(section.id, 'image_url', url)}
            bucketName="images"
            folder={section.section_type}
          />
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading homepage content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Complete Homepage Management</h1>
                <p className="text-gray-600">Manage all homepage sections in one place</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <PreviewButton 
                href="/"
                label="Preview Homepage"
                variant="outline"
                size="sm"
              />
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-navy-600 hover:bg-navy-700"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    Save All Changes
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-4">
          {sections.map((section) => {
            const isExpanded = expandedSections.includes(section.id)
            
            return (
              <Card key={section.id} className="overflow-hidden">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getSectionIcon(section.section_type)}</span>
                      <div>
                        <CardTitle className="text-lg capitalize">
                          {section.section_type.replace('_', ' ')} Section
                        </CardTitle>
                        <CardDescription>
                          {section.title || `Configure the ${section.section_type} section`}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={section.is_active}
                          onChange={(e) => {
                            e.stopPropagation()
                            updateSection(section.id, 'is_active', e.target.checked)
                          }}
                          className="rounded border-gray-300 text-navy-600 focus:ring-navy-500"
                        />
                        <span className="text-sm text-gray-600">Active</span>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                
                {isExpanded && (
                  <CardContent className="border-t bg-gray-50/50">
                    <div className="pt-6">
                      {section.section_type === 'hero' && renderHeroSection(section)}
                      {section.section_type === 'values' && renderValuesSection(section)}
                      {!['hero', 'values'].includes(section.section_type) && renderGenericSection(section)}
                    </div>
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
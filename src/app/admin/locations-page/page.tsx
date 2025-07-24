'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, Plus, X, ChevronDown, ChevronUp, MapPin, Building2, Users, Clock, Phone, FileText } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PreviewButton from '@/components/admin/PreviewButton'

interface LocationsPageContent {
  // Hero Section
  hero_title: string
  hero_accent_text: string
  hero_description: string
  hero_phone: string
  hero_support_text: string
  
  // Interactive Map Section
  map_section_title: string
  map_section_description: string
  
  // Service Features Section
  features_section_title: string
  features_section_description: string
  service_features: Array<{
    title: string
    description: string
    icon: string
  }>
  
  // Coverage Statistics Section
  stats_section_title: string
  stats_section_description: string
  coverage_stats: Array<{
    value: string
    label: string
  }>
  
  // FAQ Section
  faq_section_title: string
  faq_section_subtitle: string
  
  // CTA Section
  cta_section_title: string
  cta_section_description: string
  cta_primary_text: string
  cta_primary_url: string
  cta_secondary_text: string
  cta_secondary_url: string
  
  // State Page Templates
  state_hero_title_template: string
  state_hero_description_fallback: string
  state_locations_section_title_template: string
  state_locations_section_description_template: string
  state_cta_title_template: string
  state_cta_description_template: string
  state_stats_labels: Array<{
    label: string
    type: string
  }>
  
  // City Page Templates
  city_contact_labels: Array<{
    field: string
    label: string
  }>
  city_button_texts: Array<{
    action: string
    text: string
  }>
  city_sections_title_template: string
  city_key_features_description_template: string
  city_related_section_title_template: string
  
  // Map Selector Labels
  map_selector_labels: Array<{
    field: string
    label: string
  }>
}

export default function LocationsPageAdmin() {
  const [content, setContent] = useState<LocationsPageContent>({
    hero_title: '',
    hero_accent_text: '',
    hero_description: '',
    hero_phone: '',
    hero_support_text: '',
    
    map_section_title: '',
    map_section_description: '',
    
    features_section_title: '',
    features_section_description: '',
    service_features: [],
    
    stats_section_title: '',
    stats_section_description: '',
    coverage_stats: [],
    
    faq_section_title: '',
    faq_section_subtitle: '',
    
    cta_section_title: '',
    cta_section_description: '',
    cta_primary_text: '',
    cta_primary_url: '',
    cta_secondary_text: '',
    cta_secondary_url: '',
    
    state_hero_title_template: '',
    state_hero_description_fallback: '',
    state_locations_section_title_template: '',
    state_locations_section_description_template: '',
    state_cta_title_template: '',
    state_cta_description_template: '',
    state_stats_labels: [],
    
    city_contact_labels: [],
    city_button_texts: [],
    city_sections_title_template: '',
    city_key_features_description_template: '',
    city_related_section_title_template: '',
    
    map_selector_labels: []
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(['hero-section'])

  useEffect(() => {
    loadLocationsPageContent()
  }, [])

  const loadLocationsPageContent = async () => {
    try {
      const { data, error } = await supabase
        .from('locations_page_content')
        .select('*')
        .single()

      if (data) {
        setContent(data)
      } else {
        // Initialize with current hardcoded values from the site
        setContent({
          hero_title: 'Find Your Local',
          hero_accent_text: 'Modular Solutions',
          hero_description: "With 275+ locations across all 50 states, we're always nearby to serve your modular building needs with local expertise and nationwide resources.",
          hero_phone: '(866) 819-9017',
          hero_support_text: '24/7 Emergency Support',
          
          map_section_title: 'Choose Your State',
          map_section_description: 'Select your state to view our local offices, contact information, and service areas. Each location is staffed with experienced professionals ready to help with your project.',
          
          features_section_title: 'Why Choose Local Service?',
          features_section_description: 'Our nationwide network combines local expertise with national resources to deliver the best possible service.',
          service_features: [
            {
              title: 'Local Expertise',
              description: 'Our local teams understand regional requirements, permits, and building codes specific to your area.',
              icon: 'Users'
            },
            {
              title: 'Fast Delivery',
              description: 'With locations nationwide, we can deliver your modular buildings quickly and efficiently to any site.',
              icon: 'Clock'
            },
            {
              title: 'Reliable Support',
              description: '24/7 emergency support and maintenance services ensure your buildings are always operational.',
              icon: 'Phone'
            }
          ],
          
          stats_section_title: 'Nationwide Coverage',
          stats_section_description: 'Our extensive network ensures we can serve customers anywhere in the continental United States.',
          coverage_stats: [
            { value: '50', label: 'States Served' },
            { value: '275+', label: 'Total Locations' },
            { value: '150+', label: 'Mile Service Radius' },
            { value: '24/7', label: 'Support Available' }
          ],
          
          faq_section_title: 'Location & Service Area FAQs',
          faq_section_subtitle: 'Common questions about our service areas and delivery options',
          
          cta_section_title: 'Ready to Get Started?',
          cta_section_description: 'Contact your local office or get a quote online. Our team is ready to help you find the perfect modular building solution.',
          cta_primary_text: 'Get Free Quote',
          cta_primary_url: '/contact',
          cta_secondary_text: 'Call (866) 819-9017',
          cta_secondary_url: 'tel:8668199017',
          
          state_hero_title_template: 'Modular Buildings in {{state_name}}',
          state_hero_description_fallback: 'Professional modular building solutions across {{state_name}}. Fast delivery, local expertise, and nationwide support for all your temporary and permanent building needs.',
          state_locations_section_title_template: 'Our {{state_name}} Locations',
          state_locations_section_description_template: 'Find the nearest location to your project site. Each location is staffed with experienced professionals and maintains a full inventory of modular buildings.',
          state_cta_title_template: 'Ready to Get Started in {{state_name}}?',
          state_cta_description_template: 'Contact our {{state_name}} team for a free consultation and quote. We\'re here to help you find the perfect modular building solution.',
          state_stats_labels: [
            { label: 'Service Centers', type: 'count' },
            { label: 'Support Available', type: 'hours' },
            { label: 'Delivery Available', type: 'timing' },
            { label: 'Insured & Licensed', type: 'percentage' }
          ],
          
          city_contact_labels: [
            { field: 'customer_service', label: 'Customer Service:' },
            { field: 'sales', label: 'Sales:' },
            { field: 'service', label: 'Service:' },
            { field: 'hours', label: 'Hours of Operation:' },
            { field: 'weekdays', label: 'Mon - Fri:' }
          ],
          city_button_texts: [
            { action: 'quote', text: 'REQUEST A QUOTE' },
            { action: 'review', text: 'REVIEW US' },
            { action: 'directions', text: 'Get Directions' },
            { action: 'call', text: 'Call Now' },
            { action: 'contact', text: 'Contact Us' }
          ],
          city_sections_title_template: 'Modular Buildings in {{city_name}}',
          city_key_features_description_template: 'At Mobile Modular, we pride ourselves on creating exceptional customer experiences and delivering premium quality products in the {{city_name}} region. Let our experts guide you through the entire process, ensuring that your project runs smoothly and efficiently.',
          city_related_section_title_template: 'More {{state_name}} Locations',
          
          map_selector_labels: [
            { field: 'locations', label: 'Locations' },
            { field: 'primary_hub', label: 'Primary Hub' },
            { field: 'support', label: '24/7 Support' }
          ]
        })
      }
    } catch (error) {
      console.error('Error loading locations page content:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateContent = (field: keyof LocationsPageContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }))
  }

  const addArrayItem = (field: keyof LocationsPageContent, newItem: any) => {
    const currentArray = content[field] as any[]
    updateContent(field, [...currentArray, newItem])
  }

  const removeArrayItem = (field: keyof LocationsPageContent, index: number) => {
    const currentArray = content[field] as any[]
    updateContent(field, currentArray.filter((_, i) => i !== index))
  }

  const updateArrayItem = (field: keyof LocationsPageContent, index: number, itemField: string, value: any) => {
    const currentArray = content[field] as any[]
    const updatedArray = [...currentArray]
    updatedArray[index] = { ...updatedArray[index], [itemField]: value }
    updateContent(field, updatedArray)
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
      const { error } = await supabase
        .from('locations_page_content')
        .upsert({
          id: 'locations-page',
          ...content,
          updated_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error saving locations page content:', error)
        alert('Error saving content: ' + error.message)
        return
      }

      alert('Locations page content saved successfully!')
    } catch (error) {
      console.error('Error saving data:', error)
      alert('Error saving data')
    } finally {
      setSaving(false)
    }
  }

  const renderSectionCard = (
    id: string,
    title: string,
    description: string,
    icon: React.ReactNode,
    children: React.ReactNode
  ) => {
    const isExpanded = expandedSections.includes(id)
    
    return (
      <Card key={id} className="overflow-hidden">
        <CardHeader 
          className="cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => toggleSection(id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {icon}
              <div>
                <CardTitle className="text-lg">{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
              </div>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </div>
        </CardHeader>
        
        {isExpanded && (
          <CardContent className="border-t bg-gray-50/50">
            <div className="pt-6">
              {children}
            </div>
          </CardContent>
        )}
      </Card>
    )
  }

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Users': return <Users className="h-5 w-5" />
      case 'Clock': return <Clock className="h-5 w-5" />
      case 'Phone': return <Phone className="h-5 w-5" />
      default: return <MapPin className="h-5 w-5" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading locations page content...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Locations Page Management</h1>
                <p className="text-gray-600">Manage all content across locations pages including state & city templates</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <PreviewButton 
                href="/locations"
                label="Preview Locations Page"
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
          
          {/* Hero Section */}
          {renderSectionCard(
            'hero-section',
            'Hero Section',
            'Main hero content with title, description, phone and support text',
            <MapPin className="h-6 w-6 text-blue-600" />,
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                  <Input
                    value={content.hero_title}
                    onChange={(e) => updateContent('hero_title', e.target.value)}
                    placeholder="Find Your Local"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Accent Text</label>
                  <Input
                    value={content.hero_accent_text}
                    onChange={(e) => updateContent('hero_accent_text', e.target.value)}
                    placeholder="Modular Solutions"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
                <Textarea
                  value={content.hero_description}
                  onChange={(e) => updateContent('hero_description', e.target.value)}
                  placeholder="With 275+ locations across all 50 states..."
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input
                    value={content.hero_phone}
                    onChange={(e) => updateContent('hero_phone', e.target.value)}
                    placeholder="(866) 819-9017"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Text</label>
                  <Input
                    value={content.hero_support_text}
                    onChange={(e) => updateContent('hero_support_text', e.target.value)}
                    placeholder="24/7 Emergency Support"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Interactive Map Section */}
          {renderSectionCard(
            'map-section',
            'Interactive Map Section',
            'Content above the state selector map',
            <MapPin className="h-6 w-6 text-green-600" />,
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                <Input
                  value={content.map_section_title}
                  onChange={(e) => updateContent('map_section_title', e.target.value)}
                  placeholder="Choose Your State"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
                <Textarea
                  value={content.map_section_description}
                  onChange={(e) => updateContent('map_section_description', e.target.value)}
                  placeholder="Select your state to view our local offices..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Service Features Section */}
          {renderSectionCard(
            'features-section',
            'Service Features Section',
            'Why Choose Local Service section with feature cards',
            <Building2 className="h-6 w-6 text-purple-600" />,
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <Input
                    value={content.features_section_title}
                    onChange={(e) => updateContent('features_section_title', e.target.value)}
                    placeholder="Why Choose Local Service?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
                  <Input
                    value={content.features_section_description}
                    onChange={(e) => updateContent('features_section_description', e.target.value)}
                    placeholder="Our nationwide network combines local expertise..."
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Service Features (3 cards)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {content.service_features.map((feature, index) => (
                      <Card key={index}>
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                <select
                                  value={feature.icon}
                                  onChange={(e) => updateArrayItem('service_features', index, 'icon', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                  <option value="Users">Users (Expertise)</option>
                                  <option value="Clock">Clock (Fast)</option>
                                  <option value="Phone">Phone (Support)</option>
                                </select>
                              </div>
                              <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Feature Title</label>
                                <Input
                                  value={feature.title}
                                  onChange={(e) => updateArrayItem('service_features', index, 'title', e.target.value)}
                                  placeholder="Local Expertise"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Feature Description</label>
                              <Textarea
                                value={feature.description}
                                onChange={(e) => updateArrayItem('service_features', index, 'description', e.target.value)}
                                placeholder="Our local teams understand regional requirements..."
                                rows={2}
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeArrayItem('service_features', index)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Remove Feature
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addArrayItem('service_features', { title: '', description: '', icon: 'Users' })}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Service Feature
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Coverage Statistics Section */}
          {renderSectionCard(
            'stats-section',
            'Coverage Statistics Section',
            'Nationwide coverage statistics with numbers',
            <FileText className="h-6 w-6 text-indigo-600" />,
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <Input
                    value={content.stats_section_title}
                    onChange={(e) => updateContent('stats_section_title', e.target.value)}
                    placeholder="Nationwide Coverage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
                  <Input
                    value={content.stats_section_description}
                    onChange={(e) => updateContent('stats_section_description', e.target.value)}
                    placeholder="Our extensive network ensures we can serve customers..."
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Coverage Statistics (4 stats)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {content.coverage_stats.map((stat, index) => (
                      <div key={index} className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                          <Input
                            value={stat.value}
                            onChange={(e) => updateArrayItem('coverage_stats', index, 'value', e.target.value)}
                            placeholder="50"
                          />
                        </div>
                        <div className="flex items-end space-x-2">
                          <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                            <Input
                              value={stat.label}
                              onChange={(e) => updateArrayItem('coverage_stats', index, 'label', e.target.value)}
                              placeholder="States Served"
                            />
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('coverage_stats', index)}
                            className="text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addArrayItem('coverage_stats', { value: '', label: '' })}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Statistic
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* FAQ Section */}
          {renderSectionCard(
            'faq-section',
            'FAQ Section Headers',
            'Headers for the FAQ section (questions managed separately)',
            <FileText className="h-6 w-6 text-yellow-600" />,
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">FAQ Section Title</label>
                <Input
                  value={content.faq_section_title}
                  onChange={(e) => updateContent('faq_section_title', e.target.value)}
                  placeholder="Location & Service Area FAQs"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">FAQ Section Subtitle</label>
                <Input
                  value={content.faq_section_subtitle}
                  onChange={(e) => updateContent('faq_section_subtitle', e.target.value)}
                  placeholder="Common questions about our service areas and delivery options"
                />
              </div>
            </div>
          )}

          {/* CTA Section */}
          {renderSectionCard(
            'cta-section',
            'Call-to-Action Section',
            'Bottom CTA section with buttons',
            <Phone className="h-6 w-6 text-red-600" />,
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CTA Title</label>
                  <Input
                    value={content.cta_section_title}
                    onChange={(e) => updateContent('cta_section_title', e.target.value)}
                    placeholder="Ready to Get Started?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CTA Description</label>
                  <Input
                    value={content.cta_section_description}
                    onChange={(e) => updateContent('cta_section_description', e.target.value)}
                    placeholder="Contact your local office or get a quote online..."
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Primary CTA Button</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button Text</label>
                      <Input
                        value={content.cta_primary_text}
                        onChange={(e) => updateContent('cta_primary_text', e.target.value)}
                        placeholder="Get Free Quote"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button URL</label>
                      <Input
                        value={content.cta_primary_url}
                        onChange={(e) => updateContent('cta_primary_url', e.target.value)}
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
                        value={content.cta_secondary_text}
                        onChange={(e) => updateContent('cta_secondary_text', e.target.value)}
                        placeholder="Call (866) 819-9017"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button URL</label>
                      <Input
                        value={content.cta_secondary_url}
                        onChange={(e) => updateContent('cta_secondary_url', e.target.value)}
                        placeholder="tel:8668199017"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
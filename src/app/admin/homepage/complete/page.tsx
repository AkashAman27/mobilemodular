'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, Plus, X, ChevronDown, ChevronUp, Settings, Globe, Home, Star, MapPin, Newspaper, MessageSquare, Users } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PreviewButton from '@/components/admin/PreviewButton'
import ImageUpload from '@/components/ui/image-upload'

interface CompleteSiteSettings {
  // Site Branding
  company_name: string
  company_tagline: string
  logo_url: string
  
  // Contact Information
  primary_phone: string
  support_phone: string
  email: string
  support_hours: string
  
  // Social Media
  facebook_url: string
  twitter_url: string
  linkedin_url: string
  instagram_url: string
}

interface HomepageContent {
  // Hero Section
  hero_title: string
  hero_subtitle: string
  hero_description: string
  hero_background_image: string
  hero_background_alt: string
  hero_primary_cta_text: string
  hero_primary_cta_url: string
  hero_secondary_cta_text: string
  hero_secondary_cta_url: string
  hero_features: Array<{ text: string }>
  hero_trust_indicators: Array<{ label: string; description: string }>
  
  // Solutions Grid Section
  solutions_header_title: string
  solutions_main_title: string
  solutions_description: string
  solutions_cta_text: string
  solutions_cta_url: string
  
  // Value Proposition Section
  values_section_title: string
  values_core_values: Array<{
    title: string
    description: string
    icon: string
  }>
  values_cta_title: string
  values_cta_content: string
  values_cta_button_text: string
  
  // News & Insights Section
  news_section_title: string
  news_section_description: string
  news_cta_text: string
  news_cta_url: string
  
  // Locations Section
  locations_section_title: string
  locations_section_description: string
  locations_stats_title: string
  locations_coverage_title: string
  locations_support_title: string
  locations_support_description: string
  locations_emergency_title: string
  locations_emergency_description: string
  
  // Footer Content
  footer_company_description: string
  footer_copyright_text: string
  footer_additional_info: string
}

export default function CompleteHomepageAdmin() {
  const [siteSettings, setSiteSettings] = useState<CompleteSiteSettings>({
    company_name: '',
    company_tagline: '',
    logo_url: '',
    primary_phone: '',
    support_phone: '',
    email: '',
    support_hours: '',
    facebook_url: '',
    twitter_url: '',
    linkedin_url: '',
    instagram_url: ''
  })

  const [homepageContent, setHomepageContent] = useState<HomepageContent>({
    hero_title: '',
    hero_subtitle: '',
    hero_description: '',
    hero_background_image: '',
    hero_background_alt: '',
    hero_primary_cta_text: '',
    hero_primary_cta_url: '',
    hero_secondary_cta_text: '',
    hero_secondary_cta_url: '',
    hero_features: [],
    hero_trust_indicators: [],
    
    solutions_header_title: '',
    solutions_main_title: '',
    solutions_description: '',
    solutions_cta_text: '',
    solutions_cta_url: '',
    
    values_section_title: '',
    values_core_values: [],
    values_cta_title: '',
    values_cta_content: '',
    values_cta_button_text: '',
    
    news_section_title: '',
    news_section_description: '',
    news_cta_text: '',
    news_cta_url: '',
    
    locations_section_title: '',
    locations_section_description: '',
    locations_stats_title: '',
    locations_coverage_title: '',
    locations_support_title: '',
    locations_support_description: '',
    locations_emergency_title: '',
    locations_emergency_description: '',
    
    footer_company_description: '',
    footer_copyright_text: '',
    footer_additional_info: ''
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(['site-branding'])

  useEffect(() => {
    loadCompleteHomepageData()
  }, [])

  const loadCompleteHomepageData = async () => {
    try {
      // Load site settings
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('*')
        .single()

      if (settingsData) {
        setSiteSettings(settingsData)
      } else {
        // Initialize with current hardcoded values from the site
        setSiteSettings({
          company_name: 'AMAN MODULAR',
          company_tagline: 'Leading provider of modular building solutions nationwide',
          logo_url: '/images/logo.png',
          primary_phone: '(866) 819-9017',
          support_phone: '(866) 352-4651',
          email: 'info@amanmodular.com',
          support_hours: '24/7 Support',
          facebook_url: '',
          twitter_url: '',
          linkedin_url: '',
          instagram_url: ''
        })
      }

      // Load homepage content
      const { data: homepageData } = await supabase
        .from('complete_homepage_content')
        .select('*')
        .single()

      if (homepageData) {
        setHomepageContent(homepageData)
      } else {
        // Initialize with current hardcoded values from the site
        setHomepageContent({
          hero_title: 'Professional Modular Buildings',
          hero_subtitle: 'Built for Your Success',
          hero_description: 'From temporary offices to permanent facilities, we deliver high-quality modular buildings that meet your exact specifications.',
          hero_background_image: '/images/hero-bg.jpg',
          hero_background_alt: 'Modular buildings',
          hero_primary_cta_text: 'Get Custom Quote',
          hero_primary_cta_url: '/contact',
          hero_secondary_cta_text: 'Call (866) 819-9017',
          hero_secondary_cta_url: 'tel:8668199017',
          hero_features: [
            { text: 'Quick Installation' },
            { text: 'Custom Designs' },
            { text: 'Code Compliant' },
            { text: '24/7 Support' }
          ],
          hero_trust_indicators: [
            { label: '10,000+', description: 'Buildings Delivered' },
            { label: '15+', description: 'Years Experience' },
            { label: '50', description: 'States Served' }
          ],
          
          solutions_header_title: 'OUR PRODUCT OFFERINGS',
          solutions_main_title: 'Complete your space with our industry-leading solutions',
          solutions_description: 'From portable classrooms to office complexes, we deliver modular buildings that exceed expectations. Each solution is designed with your specific needs in mind.',
          solutions_cta_text: 'View All Solutions',
          solutions_cta_url: '/solutions',
          
          values_section_title: 'Providing value at every step',
          values_core_values: [
            { title: 'Safe and Secure', description: 'Built to the highest safety standards with secure entry systems and fire-resistant materials for complete peace of mind.', icon: 'Shield' },
            { title: 'Customization', description: 'Every project is unique. We work with you to design modular buildings that perfectly match your specific requirements and brand.', icon: 'Settings' },
            { title: 'Speed', description: 'Fast delivery and professional installation. Get your modular building operational in days, not months.', icon: 'Zap' },
            { title: 'Customer Support', description: 'Our dedicated team provides 24/7 support throughout your project and beyond. We\'re always here when you need us.', icon: 'Users' }
          ],
          values_cta_title: 'Ready to get started?',
          values_cta_content: 'Contact our team today to discuss your modular building needs and get a custom quote.',
          values_cta_button_text: 'Get Custom Quote',
          
          news_section_title: 'Aman Modular News & Insights',
          news_section_description: 'Stay informed with the latest industry trends, project spotlights, and expert insights from our team.',
          news_cta_text: 'View All Insights',
          news_cta_url: '/news-insights',
          
          locations_section_title: '275+ locations across North America',
          locations_section_description: 'Delivering space solutions since 1944. Our extensive network ensures fast delivery and local support wherever you are.',
          locations_stats_title: '275+ Locations',
          locations_coverage_title: 'Nationwide Coverage',
          locations_support_title: '24/7 Support',
          locations_support_description: 'Round-the-clock customer service',
          locations_emergency_title: 'Emergency Service',
          locations_emergency_description: 'Rapid response for urgent needs',
          
          footer_company_description: 'Leading provider of modular building solutions nationwide',
          footer_copyright_text: '© 2024 Aman Modular. All rights reserved.',
          footer_additional_info: 'Professional modular buildings for offices, education, healthcare, and more.'
        })
      }
    } catch (error) {
      console.error('Error loading homepage data:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateSiteSettings = (field: keyof CompleteSiteSettings, value: string) => {
    setSiteSettings(prev => ({ ...prev, [field]: value }))
  }

  const updateHomepageContent = (field: keyof HomepageContent, value: any) => {
    setHomepageContent(prev => ({ ...prev, [field]: value }))
  }

  const addArrayItem = (field: keyof HomepageContent, newItem: any) => {
    const currentArray = homepageContent[field] as any[]
    updateHomepageContent(field, [...currentArray, newItem])
  }

  const removeArrayItem = (field: keyof HomepageContent, index: number) => {
    const currentArray = homepageContent[field] as any[]
    updateHomepageContent(field, currentArray.filter((_, i) => i !== index))
  }

  const updateArrayItem = (field: keyof HomepageContent, index: number, itemField: string, value: any) => {
    const currentArray = homepageContent[field] as any[]
    const updatedArray = [...currentArray]
    updatedArray[index] = { ...updatedArray[index], [itemField]: value }
    updateHomepageContent(field, updatedArray)
  }

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const handleSaveAll = async () => {
    setSaving(true)
    try {
      // Save site settings
      const { error: settingsError } = await supabase
        .from('site_settings')
        .upsert(siteSettings)

      if (settingsError) {
        console.error('Error saving site settings:', settingsError)
        alert('Error saving site settings: ' + settingsError.message)
        return
      }

      // Save complete homepage content
      const { error: contentError } = await supabase
        .from('complete_homepage_content')
        .upsert({
          id: 'homepage',
          ...homepageContent,
          updated_at: new Date().toISOString()
        })

      if (contentError) {
        console.error('Error saving homepage content:', contentError)
        alert('Error saving homepage content: ' + contentError.message)
        return
      }

      alert('All homepage content saved successfully!')
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading complete homepage content...</p>
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
                <p className="text-gray-600">Manage ALL homepage content including branding, sections, and static text</p>
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
                onClick={handleSaveAll}
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
          
          {/* Site Branding & Settings */}
          {renderSectionCard(
            'site-branding',
            'Site Branding & Settings',
            'Company information, logo, contact details, and social media',
            <Settings className="h-6 w-6 text-blue-600" />,
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <Input
                    value={siteSettings.company_name}
                    onChange={(e) => updateSiteSettings('company_name', e.target.value)}
                    placeholder="AMAN MODULAR"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Tagline</label>
                  <Input
                    value={siteSettings.company_tagline}
                    onChange={(e) => updateSiteSettings('company_tagline', e.target.value)}
                    placeholder="Leading provider of modular building solutions"
                  />
                </div>
              </div>

              <ImageUpload
                label="Company Logo"
                value={siteSettings.logo_url}
                onChange={(url) => updateSiteSettings('logo_url', url)}
                bucketName="images"
                folder="branding"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Phone</label>
                  <Input
                    value={siteSettings.primary_phone}
                    onChange={(e) => updateSiteSettings('primary_phone', e.target.value)}
                    placeholder="(866) 819-9017"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                  <Input
                    value={siteSettings.support_phone}
                    onChange={(e) => updateSiteSettings('support_phone', e.target.value)}
                    placeholder="(866) 352-4651"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input
                    value={siteSettings.email}
                    onChange={(e) => updateSiteSettings('email', e.target.value)}
                    placeholder="info@amanmodular.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Hours</label>
                  <Input
                    value={siteSettings.support_hours}
                    onChange={(e) => updateSiteSettings('support_hours', e.target.value)}
                    placeholder="24/7 Support"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Hero Section */}
          {renderSectionCard(
            'hero-section',
            'Hero Section',
            'Main banner with title, description, CTA buttons, features, and trust indicators',
            <Home className="h-6 w-6 text-red-600" />,
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Title</label>
                  <Input
                    value={homepageContent.hero_title}
                    onChange={(e) => updateHomepageContent('hero_title', e.target.value)}
                    placeholder="Professional Modular Buildings"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hero Subtitle</label>
                  <Input
                    value={homepageContent.hero_subtitle}
                    onChange={(e) => updateHomepageContent('hero_subtitle', e.target.value)}
                    placeholder="Built for Your Success"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Hero Description</label>
                <Textarea
                  value={homepageContent.hero_description}
                  onChange={(e) => updateHomepageContent('hero_description', e.target.value)}
                  placeholder="From temporary offices to permanent facilities..."
                  rows={3}
                />
              </div>

              <ImageUpload
                label="Hero Background Image"
                value={homepageContent.hero_background_image}
                onChange={(url) => updateHomepageContent('hero_background_image', url)}
                bucketName="images"
                folder="hero"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Primary CTA Button</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      value={homepageContent.hero_primary_cta_text}
                      onChange={(e) => updateHomepageContent('hero_primary_cta_text', e.target.value)}
                      placeholder="Get Custom Quote"
                    />
                    <Input
                      value={homepageContent.hero_primary_cta_url}
                      onChange={(e) => updateHomepageContent('hero_primary_cta_url', e.target.value)}
                      placeholder="/contact"
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Secondary CTA Button</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Input
                      value={homepageContent.hero_secondary_cta_text}
                      onChange={(e) => updateHomepageContent('hero_secondary_cta_text', e.target.value)}
                      placeholder="Call (866) 819-9017"
                    />
                    <Input
                      value={homepageContent.hero_secondary_cta_url}
                      onChange={(e) => updateHomepageContent('hero_secondary_cta_url', e.target.value)}
                      placeholder="tel:8668199017"
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Hero Features */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Hero Features (Checkmark Items)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {homepageContent.hero_features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Input
                          value={feature.text}
                          onChange={(e) => updateArrayItem('hero_features', index, 'text', e.target.value)}
                          placeholder="Feature text"
                          className="flex-1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeArrayItem('hero_features', index)}
                          className="text-red-600"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addArrayItem('hero_features', { text: '' })}
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
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {homepageContent.hero_trust_indicators.map((indicator, index) => (
                      <div key={index} className="grid grid-cols-2 gap-3 p-3 border rounded-lg">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                          <Input
                            value={indicator.label}
                            onChange={(e) => updateArrayItem('hero_trust_indicators', index, 'label', e.target.value)}
                            placeholder="10,000+"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                          <Input
                            value={indicator.description}
                            onChange={(e) => updateArrayItem('hero_trust_indicators', index, 'description', e.target.value)}
                            placeholder="Buildings Delivered"
                          />
                        </div>
                        <div className="col-span-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('hero_trust_indicators', index)}
                            className="text-red-600"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addArrayItem('hero_trust_indicators', { label: '', description: '' })}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Trust Indicator
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Solutions Grid Section */}
          {renderSectionCard(
            'solutions-section',
            'Solutions Grid Section',
            'Product offerings section with titles and call-to-action',
            <Globe className="h-6 w-6 text-blue-600" />,
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Header Title (Small text above)</label>
                  <Input
                    value={homepageContent.solutions_header_title}
                    onChange={(e) => updateHomepageContent('solutions_header_title', e.target.value)}
                    placeholder="OUR PRODUCT OFFERINGS"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
                  <Input
                    value={homepageContent.solutions_cta_text}
                    onChange={(e) => updateHomepageContent('solutions_cta_text', e.target.value)}
                    placeholder="View All Solutions"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Title</label>
                <Input
                  value={homepageContent.solutions_main_title}
                  onChange={(e) => updateHomepageContent('solutions_main_title', e.target.value)}
                  placeholder="Complete your space with our industry-leading solutions"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <Textarea
                  value={homepageContent.solutions_description}
                  onChange={(e) => updateHomepageContent('solutions_description', e.target.value)}
                  placeholder="From portable classrooms to office complexes..."
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button URL</label>
                <Input
                  value={homepageContent.solutions_cta_url}
                  onChange={(e) => updateHomepageContent('solutions_cta_url', e.target.value)}
                  placeholder="/solutions"
                />
              </div>
            </div>
          )}

          {/* Value Proposition Section */}
          {renderSectionCard(
            'values-section',
            'Value Proposition Section',
            'Core values with icons and CTA section',
            <Star className="h-6 w-6 text-green-600" />,
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                <Input
                  value={homepageContent.values_section_title}
                  onChange={(e) => updateHomepageContent('values_section_title', e.target.value)}
                  placeholder="Providing value at every step"
                />
              </div>

              {/* Core Values */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Core Values</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {homepageContent.values_core_values.map((value, index) => (
                      <Card key={index}>
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                <select
                                  value={value.icon}
                                  onChange={(e) => updateArrayItem('values_core_values', index, 'icon', e.target.value)}
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
                                  value={value.title}
                                  onChange={(e) => updateArrayItem('values_core_values', index, 'title', e.target.value)}
                                  placeholder="Safe and Secure"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                              <Textarea
                                value={value.description}
                                onChange={(e) => updateArrayItem('values_core_values', index, 'description', e.target.value)}
                                placeholder="Built to the highest safety standards..."
                                rows={3}
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeArrayItem('values_core_values', index)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Remove Value
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addArrayItem('values_core_values', { title: '', description: '', icon: 'Shield' })}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Core Value
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Values CTA */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Values Section CTA</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CTA Title</label>
                    <Input
                      value={homepageContent.values_cta_title}
                      onChange={(e) => updateHomepageContent('values_cta_title', e.target.value)}
                      placeholder="Ready to get started?"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CTA Content</label>
                    <Textarea
                      value={homepageContent.values_cta_content}
                      onChange={(e) => updateHomepageContent('values_cta_content', e.target.value)}
                      placeholder="Contact our team today to discuss..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
                    <Input
                      value={homepageContent.values_cta_button_text}
                      onChange={(e) => updateHomepageContent('values_cta_button_text', e.target.value)}
                      placeholder="Get Custom Quote"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* News & Insights Section */}
          {renderSectionCard(
            'news-section',
            'News & Insights Section',
            'Blog articles section with title and CTA',
            <Newspaper className="h-6 w-6 text-red-600" />,
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <Input
                    value={homepageContent.news_section_title}
                    onChange={(e) => updateHomepageContent('news_section_title', e.target.value)}
                    placeholder="Aman Modular News & Insights"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button Text</label>
                  <Input
                    value={homepageContent.news_cta_text}
                    onChange={(e) => updateHomepageContent('news_cta_text', e.target.value)}
                    placeholder="View All Insights"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
                <Textarea
                  value={homepageContent.news_section_description}
                  onChange={(e) => updateHomepageContent('news_section_description', e.target.value)}
                  placeholder="Stay informed with the latest industry trends..."
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Button URL</label>
                <Input
                  value={homepageContent.news_cta_url}
                  onChange={(e) => updateHomepageContent('news_cta_url', e.target.value)}
                  placeholder="/news-insights"
                />
              </div>
            </div>
          )}

          {/* Locations Section */}
          {renderSectionCard(
            'locations-section',
            'Locations Section',
            'Map section with statistics and service information',
            <MapPin className="h-6 w-6 text-orange-600" />,
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <Input
                    value={homepageContent.locations_section_title}
                    onChange={(e) => updateHomepageContent('locations_section_title', e.target.value)}
                    placeholder="275+ locations across North America"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Statistics Title</label>
                  <Input
                    value={homepageContent.locations_stats_title}
                    onChange={(e) => updateHomepageContent('locations_stats_title', e.target.value)}
                    placeholder="275+ Locations"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Description</label>
                <Textarea
                  value={homepageContent.locations_section_description}
                  onChange={(e) => updateHomepageContent('locations_section_description', e.target.value)}
                  placeholder="Delivering space solutions since 1944..."
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Coverage Title</label>
                  <Input
                    value={homepageContent.locations_coverage_title}
                    onChange={(e) => updateHomepageContent('locations_coverage_title', e.target.value)}
                    placeholder="Nationwide Coverage"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Title</label>
                  <Input
                    value={homepageContent.locations_support_title}
                    onChange={(e) => updateHomepageContent('locations_support_title', e.target.value)}
                    placeholder="24/7 Support"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Description</label>
                  <Input
                    value={homepageContent.locations_support_description}
                    onChange={(e) => updateHomepageContent('locations_support_description', e.target.value)}
                    placeholder="Round-the-clock customer service"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Title</label>
                  <Input
                    value={homepageContent.locations_emergency_title}
                    onChange={(e) => updateHomepageContent('locations_emergency_title', e.target.value)}
                    placeholder="Emergency Service"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Description</label>
                <Input
                  value={homepageContent.locations_emergency_description}
                  onChange={(e) => updateHomepageContent('locations_emergency_description', e.target.value)}
                  placeholder="Rapid response for urgent needs"
                />
              </div>
            </div>
          )}

          {/* Footer Content */}
          {renderSectionCard(
            'footer-section',
            'Footer Content',
            'Company description, copyright, and additional information',
            <MessageSquare className="h-6 w-6 text-gray-600" />,
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                <Input
                  value={homepageContent.footer_company_description}
                  onChange={(e) => updateHomepageContent('footer_company_description', e.target.value)}
                  placeholder="Leading provider of modular building solutions nationwide"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
                <Input
                  value={homepageContent.footer_copyright_text}
                  onChange={(e) => updateHomepageContent('footer_copyright_text', e.target.value)}
                  placeholder="© 2024 Aman Modular. All rights reserved."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Info</label>
                <Input
                  value={homepageContent.footer_additional_info}
                  onChange={(e) => updateHomepageContent('footer_additional_info', e.target.value)}
                  placeholder="Professional modular buildings for offices, education, healthcare, and more."
                />
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
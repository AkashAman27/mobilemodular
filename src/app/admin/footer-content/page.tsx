'use client'

// Footer Content Management System - Last updated with comprehensive CMS features
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, Plus, X, ChevronDown, ChevronUp, Building2, Phone, Mail, Globe, Share2, FileText, ExternalLink } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PreviewButton from '@/components/admin/PreviewButton'

interface FooterContent {
  // Company Information
  company_name: string
  company_description: string
  company_phone: string
  company_email: string
  company_locations_text: string
  
  // Navigation Links
  navigation_sections: Array<{
    title: string
    links: Array<{
      text: string
      url: string
    }>
  }>
  
  // Social Media Links
  social_links: Array<{
    platform: string
    url: string
    icon: string
  }>
  
  // Call-to-Action Section
  cta_headline: string
  cta_description: string
  cta_primary_text: string
  cta_primary_url: string
  cta_secondary_text: string
  cta_secondary_url: string
  
  // Legal Links
  legal_links: Array<{
    text: string
    url: string
  }>
  
  // Copyright
  copyright_text: string
  
  // Display Options
  show_full_footer: boolean
  show_navigation: boolean
  show_social_links: boolean
  show_cta_section: boolean
  show_company_description: boolean
}

export default function FooterContentAdmin() {
  const [content, setContent] = useState<FooterContent>({
    company_name: '',
    company_description: '',
    company_phone: '',
    company_email: '',
    company_locations_text: '',
    
    navigation_sections: [],
    social_links: [],
    
    cta_headline: '',
    cta_description: '',
    cta_primary_text: '',
    cta_primary_url: '',
    cta_secondary_text: '',
    cta_secondary_url: '',
    
    legal_links: [],
    copyright_text: '',
    
    show_full_footer: true,
    show_navigation: true,
    show_social_links: true,
    show_cta_section: true,
    show_company_description: true
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(['company-info'])

  useEffect(() => {
    loadFooterContent()
  }, [])

  const loadFooterContent = async () => {
    try {
      const { data, error } = await supabase
        .from('footer_content')
        .select('*')
        .single()

      if (data) {
        setContent(data)
      } else {
        // Initialize with current values from the site
        setContent({
          company_name: 'MODULAR BUILDING',
          company_description: 'Leading provider of modular building solutions nationwide. From portable classrooms to office complexes, we deliver quality space solutions for every industry.',
          company_phone: '(866) 819-9017',
          company_email: 'info@modularbuilding.com',
          company_locations_text: '275+ Locations Nationwide',
          
          navigation_sections: [
            {
              title: 'Solutions',
              links: [
                { text: 'Office Buildings', url: '/solutions/office-buildings' },
                { text: 'Portable Classrooms', url: '/solutions/portable-classrooms' },
                { text: 'Storage Containers', url: '/solutions/storage-containers' },
                { text: 'Healthcare Facilities', url: '/solutions/healthcare-facilities' },
                { text: 'Security Buildings', url: '/solutions/security-buildings' },
                { text: 'Restaurant & Food Service', url: '/solutions/restaurant-food-service' }
              ]
            },
            {
              title: 'Industries',
              links: [
                { text: 'Education', url: '/industries/education' },
                { text: 'Construction', url: '/industries/construction' },
                { text: 'Healthcare', url: '/industries/healthcare' },
                { text: 'Government', url: '/industries/government' },
                { text: 'Retail & Commercial', url: '/industries/retail-commercial' },
                { text: 'Emergency Response', url: '/industries/emergency-response' }
              ]
            },
            {
              title: 'Company',
              links: [
                { text: 'About Us', url: '/company/about-us' },
                { text: 'Our Process', url: '/company/our-process' },
                { text: 'Quality Standards', url: '/company/quality-standards' },
                { text: 'Locations', url: '/locations' },
                { text: 'Contact Us', url: '/contact' }
              ]
            },
            {
              title: 'Resources',
              links: [
                { text: 'Product Gallery', url: '/resources/product-gallery' },
                { text: 'Case Studies', url: '/resources/case-studies' },
                { text: 'Planning Tools', url: '/resources/planning-tools' },
                { text: 'FAQ', url: '/resources/faq' },
                { text: 'Insights', url: '/resources/insights' },
                { text: 'Live Inventory', url: '/resources/live-inventory' }
              ]
            }
          ],
          
          social_links: [
            { platform: 'Facebook', url: 'https://facebook.com/modularbuilding', icon: 'Facebook' },
            { platform: 'LinkedIn', url: 'https://linkedin.com/company/modularbuilding', icon: 'LinkedIn' },
            { platform: 'Twitter', url: 'https://twitter.com/modularbuilding', icon: 'Twitter' },
            { platform: 'Instagram', url: 'https://instagram.com/modularbuilding', icon: 'Instagram' }
          ],
          
          cta_headline: 'Need help with your next project?',
          cta_description: 'Our experts are ready to help you find the perfect modular building solution. Get a custom quote today.',
          cta_primary_text: 'Get a Quote',
          cta_primary_url: '/quote',
          cta_secondary_text: 'Contact Us',
          cta_secondary_url: '/contact',
          
          legal_links: [
            { text: 'Privacy Policy', url: '/legal/privacy' },
            { text: 'Terms & Conditions', url: '/legal/terms' },
            { text: 'Accessibility', url: '/legal/accessibility' }
          ],
          
          copyright_text: '© 2024 Modular Building Solutions. All rights reserved.',
          
          show_full_footer: true,
          show_navigation: true,
          show_social_links: true,
          show_cta_section: true,
          show_company_description: true
        })
      }
    } catch (error) {
      console.error('Error loading footer content:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateContent = (field: keyof FooterContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }))
  }

  const addArrayItem = (field: keyof FooterContent, newItem: any) => {
    const currentArray = content[field] as any[]
    updateContent(field, [...currentArray, newItem])
  }

  const removeArrayItem = (field: keyof FooterContent, index: number) => {
    const currentArray = content[field] as any[]
    updateContent(field, currentArray.filter((_, i) => i !== index))
  }

  const updateArrayItem = (field: keyof FooterContent, index: number, itemField: string, value: any) => {
    const currentArray = content[field] as any[]
    const updatedArray = [...currentArray]
    updatedArray[index] = { ...updatedArray[index], [itemField]: value }
    updateContent(field, updatedArray)
  }

  const updateNestedArrayItem = (field: keyof FooterContent, sectionIndex: number, linkIndex: number, itemField: string, value: any) => {
    const currentArray = content[field] as any[]
    const updatedArray = [...currentArray]
    updatedArray[sectionIndex].links[linkIndex] = { ...updatedArray[sectionIndex].links[linkIndex], [itemField]: value }
    updateContent(field, updatedArray)
  }

  const addNestedArrayItem = (field: keyof FooterContent, sectionIndex: number, newItem: any) => {
    const currentArray = content[field] as any[]
    const updatedArray = [...currentArray]
    updatedArray[sectionIndex].links = [...updatedArray[sectionIndex].links, newItem]
    updateContent(field, updatedArray)
  }

  const removeNestedArrayItem = (field: keyof FooterContent, sectionIndex: number, linkIndex: number) => {
    const currentArray = content[field] as any[]
    const updatedArray = [...currentArray]
    updatedArray[sectionIndex].links = updatedArray[sectionIndex].links.filter((_: any, i: number) => i !== linkIndex)
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
        .from('footer_content')
        .upsert({
          id: 'main-footer',
          ...content,
          updated_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error saving footer content:', error)
        alert('Error saving content: ' + error.message)
        return
      }

      alert('Footer content saved successfully!')
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

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Facebook': return '📘'
      case 'LinkedIn': return '💼'
      case 'Twitter': return '🐦'
      case 'Instagram': return '📷'
      default: return '🔗'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading footer content...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Footer Content Management</h1>
                <p className="text-gray-600">Manage all footer content including navigation, social links, and company information</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <PreviewButton 
                href="/"
                label="Preview Footer"
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
          
          {/* Company Information */}
          {renderSectionCard(
            'company-info',
            'Company Information',
            'Company name, description, contact details, and location info',
            <Building2 className="h-6 w-6 text-blue-600" />,
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  <Input
                    value={content.company_name}
                    onChange={(e) => updateContent('company_name', e.target.value)}
                    placeholder="MODULAR BUILDING"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Locations Text</label>
                  <Input
                    value={content.company_locations_text}
                    onChange={(e) => updateContent('company_locations_text', e.target.value)}
                    placeholder="275+ Locations Nationwide"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                <Textarea
                  value={content.company_description}
                  onChange={(e) => updateContent('company_description', e.target.value)}
                  placeholder="Leading provider of modular building solutions nationwide..."
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <Input
                    value={content.company_phone}
                    onChange={(e) => updateContent('company_phone', e.target.value)}
                    placeholder="(866) 819-9017"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input
                    value={content.company_email}
                    onChange={(e) => updateContent('company_email', e.target.value)}
                    placeholder="info@modularbuilding.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          {renderSectionCard(
            'navigation-links',
            'Navigation Links',
            'Organized navigation sections for the footer',
            <Globe className="h-6 w-6 text-green-600" />,
            <div className="space-y-6">
              {content.navigation_sections.map((section, sectionIndex) => (
                <Card key={sectionIndex}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{section.title} Section</CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeArrayItem('navigation_sections', sectionIndex)}
                        className="text-red-600"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Remove Section
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                        <Input
                          value={section.title}
                          onChange={(e) => updateArrayItem('navigation_sections', sectionIndex, 'title', e.target.value)}
                          placeholder="Solutions"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Links</label>
                        <div className="space-y-3">
                          {section.links.map((link, linkIndex) => (
                            <div key={linkIndex} className="grid grid-cols-2 gap-3">
                              <Input
                                value={link.text}
                                onChange={(e) => updateNestedArrayItem('navigation_sections', sectionIndex, linkIndex, 'text', e.target.value)}
                                placeholder="Link Text"
                              />
                              <div className="flex space-x-2">
                                <Input
                                  value={link.url}
                                  onChange={(e) => updateNestedArrayItem('navigation_sections', sectionIndex, linkIndex, 'url', e.target.value)}
                                  placeholder="/solutions/office-buildings"
                                />
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeNestedArrayItem('navigation_sections', sectionIndex, linkIndex)}
                                  className="text-red-600"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => addNestedArrayItem('navigation_sections', sectionIndex, { text: '', url: '' })}
                            className="w-full"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Link
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              <Button
                variant="outline"
                onClick={() => addArrayItem('navigation_sections', { title: '', links: [] })}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Navigation Section
              </Button>
            </div>
          )}

          {/* Social Media Links */}
          {renderSectionCard(
            'social-links',
            'Social Media Links',
            'Social media platform links with icons',
            <Share2 className="h-6 w-6 text-purple-600" />,
            <div className="space-y-4">
              {content.social_links.map((social, index) => (
                <Card key={index}>
                  <CardContent className="pt-4">
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                          <select
                            value={social.platform}
                            onChange={(e) => {
                              updateArrayItem('social_links', index, 'platform', e.target.value)
                              updateArrayItem('social_links', index, 'icon', e.target.value)
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="Facebook">Facebook {getSocialIcon('Facebook')}</option>
                            <option value="LinkedIn">LinkedIn {getSocialIcon('LinkedIn')}</option>
                            <option value="Twitter">Twitter {getSocialIcon('Twitter')}</option>
                            <option value="Instagram">Instagram {getSocialIcon('Instagram')}</option>
                          </select>
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-1">URL</label>
                          <div className="flex space-x-2">
                            <Input
                              value={social.url}
                              onChange={(e) => updateArrayItem('social_links', index, 'url', e.target.value)}
                              placeholder="https://facebook.com/modularbuilding"
                            />
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeArrayItem('social_links', index)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('social_links', { platform: 'Facebook', url: '', icon: 'Facebook' })}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Social Link
              </Button>
            </div>
          )}

          {/* Call-to-Action Section */}
          {renderSectionCard(
            'cta-section',
            'Call-to-Action Section',
            'Footer CTA with headline, description, and action buttons',
            <ExternalLink className="h-6 w-6 text-orange-600" />,
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Headline</label>
                <Input
                  value={content.cta_headline}
                  onChange={(e) => updateContent('cta_headline', e.target.value)}
                  placeholder="Need help with your next project?"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">CTA Description</label>
                <Textarea
                  value={content.cta_description}
                  onChange={(e) => updateContent('cta_description', e.target.value)}
                  placeholder="Our experts are ready to help you find the perfect modular building solution..."
                  rows={3}
                />
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
                        placeholder="Get a Quote"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button URL</label>
                      <Input
                        value={content.cta_primary_url}
                        onChange={(e) => updateContent('cta_primary_url', e.target.value)}
                        placeholder="/quote"
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
                        placeholder="Contact Us"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button URL</label>
                      <Input
                        value={content.cta_secondary_url}
                        onChange={(e) => updateContent('cta_secondary_url', e.target.value)}
                        placeholder="/contact"
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Legal Links */}
          {renderSectionCard(
            'legal-links',
            'Legal Links',
            'Privacy policy, terms of service, and other legal pages',
            <FileText className="h-6 w-6 text-indigo-600" />,
            <div className="space-y-4">
              {content.legal_links.map((legal, index) => (
                <div key={index} className="grid grid-cols-2 gap-3">
                  <Input
                    value={legal.text}
                    onChange={(e) => updateArrayItem('legal_links', index, 'text', e.target.value)}
                    placeholder="Privacy Policy"
                  />
                  <div className="flex space-x-2">
                    <Input
                      value={legal.url}
                      onChange={(e) => updateArrayItem('legal_links', index, 'url', e.target.value)}
                      placeholder="/legal/privacy"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeArrayItem('legal_links', index)}
                      className="text-red-600"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <Button
                variant="outline"
                onClick={() => addArrayItem('legal_links', { text: '', url: '' })}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Legal Link
              </Button>
            </div>
          )}

          {/* Copyright & Display Options */}
          {renderSectionCard(
            'settings',
            'Footer Settings',
            'Copyright text and display options for footer sections',
            <FileText className="h-6 w-6 text-gray-600" />,
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Copyright Text</label>
                <Input
                  value={content.copyright_text}
                  onChange={(e) => updateContent('copyright_text', e.target.value)}
                  placeholder="© 2024 Modular Building Solutions. All rights reserved."
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Display Options</CardTitle>
                  <CardDescription>Control which sections appear in the footer</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="show_full_footer"
                        checked={content.show_full_footer}
                        onChange={(e) => updateContent('show_full_footer', e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor="show_full_footer" className="text-sm">Show Full Footer</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="show_navigation"
                        checked={content.show_navigation}
                        onChange={(e) => updateContent('show_navigation', e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor="show_navigation" className="text-sm">Show Navigation Links</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="show_social_links"
                        checked={content.show_social_links}
                        onChange={(e) => updateContent('show_social_links', e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor="show_social_links" className="text-sm">Show Social Links</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="show_cta_section"
                        checked={content.show_cta_section}
                        onChange={(e) => updateContent('show_cta_section', e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor="show_cta_section" className="text-sm">Show CTA Section</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="show_company_description"
                        checked={content.show_company_description}
                        onChange={(e) => updateContent('show_company_description', e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor="show_company_description" className="text-sm">Show Company Description</label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, Plus, X, ChevronDown, ChevronUp, Building2, Zap, DollarSign, Clock, Award } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import PreviewButton from '@/components/admin/PreviewButton'

interface SolutionsPageContent {
  // Page Header
  page_subtitle: string
  page_title: string
  page_description: string
  
  // Solutions Grid Section
  solutions_grid_title: string
  solutions_grid_subtitle: string
  
  // Benefits Section (Why Choose Modular?)
  benefits_section_title: string
  benefits_section_subtitle: string
  benefits: Array<{
    title: string
    description: string
    stat: string
    icon: string
  }>
  
  // Process Section (4-Step Process)
  process_section_title: string
  process_section_subtitle: string
  process_steps: Array<{
    step: number
    title: string
    description: string
  }>
  
  // SEO Content Section
  seo_content_title: string
  seo_paragraphs: Array<{
    content: string
  }>
  
  // Main CTA Section
  main_cta_title: string
  main_cta_subtitle: string
  main_cta_primary_text: string
  main_cta_primary_url: string
  main_cta_secondary_text: string
  main_cta_secondary_url: string
}

export default function SolutionsPageAdmin() {
  const [content, setContent] = useState<SolutionsPageContent>({
    page_subtitle: '',
    page_title: '',
    page_description: '',
    
    solutions_grid_title: '',
    solutions_grid_subtitle: '',
    
    benefits_section_title: '',
    benefits_section_subtitle: '',
    benefits: [],
    
    process_section_title: '',
    process_section_subtitle: '',
    process_steps: [],
    
    seo_content_title: '',
    seo_paragraphs: [],
    
    main_cta_title: '',
    main_cta_subtitle: '',
    main_cta_primary_text: '',
    main_cta_primary_url: '',
    main_cta_secondary_text: '',
    main_cta_secondary_url: ''
  })

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [expandedSections, setExpandedSections] = useState<string[]>(['page-header'])

  useEffect(() => {
    loadSolutionsPageContent()
  }, [])

  const loadSolutionsPageContent = async () => {
    try {
      const { data, error } = await supabase
        .from('solutions_page_content')
        .select('*')
        .single()

      if (data) {
        setContent(data)
      } else {
        // Initialize with current hardcoded values from the site
        setContent({
          page_subtitle: 'Our Solutions',
          page_title: 'Complete Building Solutions',
          page_description: 'From portable classrooms to office complexes, we provide professional modular building solutions for every industry and application. Rent, buy, or lease with flexible terms.',
          
          solutions_grid_title: 'Our Building Solutions',
          solutions_grid_subtitle: 'Professional modular buildings designed for your specific needs. Each solution is engineered for quality, durability, and immediate deployment.',
          
          benefits_section_title: 'Why Choose Modular?',
          benefits_section_subtitle: 'Modular buildings offer significant advantages over traditional construction methods.',
          benefits: [
            {
              title: 'Fast Deployment',
              description: 'Most buildings can be delivered and set up within 24-48 hours',
              stat: '24-48hrs',
              icon: 'Clock'
            },
            {
              title: 'Cost Effective',
              description: 'Save 40-60% compared to traditional construction',
              stat: '40-60%',
              icon: 'DollarSign'
            },
            {
              title: 'Flexible Terms',
              description: 'Rent, buy, or lease with terms that work for you',
              stat: '3 Options',
              icon: 'Zap'
            },
            {
              title: 'Quality Assured',
              description: 'All buildings meet or exceed industry standards',
              stat: '100%',
              icon: 'Award'
            }
          ],
          
          process_section_title: 'Simple 4-Step Process',
          process_section_subtitle: 'From initial consultation to installation, we make the process simple and efficient.',
          process_steps: [
            {
              step: 1,
              title: 'Consultation',
              description: 'Discuss your needs and get expert recommendations'
            },
            {
              step: 2,
              title: 'Design',
              description: 'Customize your building to meet your requirements'
            },
            {
              step: 3,
              title: 'Delivery',
              description: 'Fast delivery and professional installation'
            },
            {
              step: 4,
              title: 'Support',
              description: 'Ongoing maintenance and customer support'
            }
          ],
          
          seo_content_title: 'Professional Modular Building Solutions',
          seo_paragraphs: [
            {
              content: 'Our modular building solutions provide the perfect combination of speed, quality, and cost-effectiveness for businesses across all industries. Whether you need temporary facilities for a construction project, permanent office space, educational buildings, or specialized healthcare facilities, our comprehensive range of modular buildings can be customized to meet your exact requirements.'
            },
            {
              content: 'Each modular building is constructed using high-quality materials and modern manufacturing techniques to ensure durability, energy efficiency, and compliance with all local building codes. Our experienced team works closely with you throughout the entire process, from initial design consultation to final installation and ongoing support.'
            },
            {
              content: 'With over 275+ locations across North America and 15+ years of experience, we have the expertise and resources to deliver your modular building solution quickly and efficiently. Contact us today to learn more about how our modular buildings can solve your space challenges.'
            }
          ],
          
          main_cta_title: 'Ready to Find Your Perfect Solution?',
          main_cta_subtitle: 'Our experts will help you choose the right modular building for your specific needs and budget.',
          main_cta_primary_text: 'Get Custom Quote',
          main_cta_primary_url: '/contact',
          main_cta_secondary_text: 'Speak with Expert',
          main_cta_secondary_url: 'tel:8668199017'
        })
      }
    } catch (error) {
      console.error('Error loading solutions page content:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateContent = (field: keyof SolutionsPageContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }))
  }

  const addArrayItem = (field: keyof SolutionsPageContent, newItem: any) => {
    const currentArray = content[field] as any[]
    updateContent(field, [...currentArray, newItem])
  }

  const removeArrayItem = (field: keyof SolutionsPageContent, index: number) => {
    const currentArray = content[field] as any[]
    updateContent(field, currentArray.filter((_, i) => i !== index))
  }

  const updateArrayItem = (field: keyof SolutionsPageContent, index: number, itemField: string, value: any) => {
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
        .from('solutions_page_content')
        .upsert({
          id: 'solutions-page',
          ...content,
          updated_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error saving solutions page content:', error)
        alert('Error saving content: ' + error.message)
        return
      }

      alert('Solutions page content saved successfully!')
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
      case 'Clock': return <Clock className="h-5 w-5" />
      case 'DollarSign': return <DollarSign className="h-5 w-5" />
      case 'Zap': return <Zap className="h-5 w-5" />
      case 'Award': return <Award className="h-5 w-5" />
      default: return <Building2 className="h-5 w-5" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading solutions page content...</p>
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
                <h1 className="text-2xl font-bold text-gray-900">Solutions Page Management</h1>
                <p className="text-gray-600">Manage all static content on the main solutions page</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <PreviewButton 
                href="/solutions"
                label="Preview Solutions Page"
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
          
          {/* Page Header */}
          {renderSectionCard(
            'page-header',
            'Page Header Content',
            'Main page title, subtitle, and description at the top',
            <Building2 className="h-6 w-6 text-blue-600" />,
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page Subtitle</label>
                  <Input
                    value={content.page_subtitle}
                    onChange={(e) => updateContent('page_subtitle', e.target.value)}
                    placeholder="Our Solutions"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Page Title</label>
                  <Input
                    value={content.page_title}
                    onChange={(e) => updateContent('page_title', e.target.value)}
                    placeholder="Complete Building Solutions"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Page Description</label>
                <Textarea
                  value={content.page_description}
                  onChange={(e) => updateContent('page_description', e.target.value)}
                  placeholder="From portable classrooms to office complexes..."
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Solutions Grid Section */}
          {renderSectionCard(
            'solutions-grid',
            'Solutions Grid Section',
            'Content above the solutions grid',
            <Building2 className="h-6 w-6 text-green-600" />,
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                <Input
                  value={content.solutions_grid_title}
                  onChange={(e) => updateContent('solutions_grid_title', e.target.value)}
                  placeholder="Our Building Solutions"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
                <Textarea
                  value={content.solutions_grid_subtitle}
                  onChange={(e) => updateContent('solutions_grid_subtitle', e.target.value)}
                  placeholder="Professional modular buildings designed for your specific needs..."
                  rows={2}
                />
              </div>
            </div>
          )}

          {/* Benefits Section */}
          {renderSectionCard(
            'benefits-section',
            'Benefits Section (Why Choose Modular?)',
            'Four benefits with stats and icons',
            <Zap className="h-6 w-6 text-yellow-600" />,
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <Input
                    value={content.benefits_section_title}
                    onChange={(e) => updateContent('benefits_section_title', e.target.value)}
                    placeholder="Why Choose Modular?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
                  <Input
                    value={content.benefits_section_subtitle}
                    onChange={(e) => updateContent('benefits_section_subtitle', e.target.value)}
                    placeholder="Modular buildings offer significant advantages..."
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Benefits (4 items with stats)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {content.benefits.map((benefit, index) => (
                      <Card key={index}>
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
                                <select
                                  value={benefit.icon}
                                  onChange={(e) => updateArrayItem('benefits', index, 'icon', e.target.value)}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                >
                                  <option value="Clock">Clock (Fast)</option>
                                  <option value="DollarSign">DollarSign (Cost)</option>
                                  <option value="Zap">Zap (Flexible)</option>
                                  <option value="Award">Award (Quality)</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <Input
                                  value={benefit.title}
                                  onChange={(e) => updateArrayItem('benefits', index, 'title', e.target.value)}
                                  placeholder="Fast Deployment"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Stat</label>
                                <Input
                                  value={benefit.stat}
                                  onChange={(e) => updateArrayItem('benefits', index, 'stat', e.target.value)}
                                  placeholder="24-48hrs"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                              <Textarea
                                value={benefit.description}
                                onChange={(e) => updateArrayItem('benefits', index, 'description', e.target.value)}
                                placeholder="Most buildings can be delivered and set up within 24-48 hours"
                                rows={2}
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeArrayItem('benefits', index)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Remove Benefit
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addArrayItem('benefits', { title: '', description: '', stat: '', icon: 'Clock' })}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Benefit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Process Section */}
          {renderSectionCard(
            'process-section',
            'Process Section (4-Step Process)',
            'Four-step process with descriptions',
            <Clock className="h-6 w-6 text-purple-600" />,
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
                  <Input
                    value={content.process_section_title}
                    onChange={(e) => updateContent('process_section_title', e.target.value)}
                    placeholder="Simple 4-Step Process"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Section Subtitle</label>
                  <Input
                    value={content.process_section_subtitle}
                    onChange={(e) => updateContent('process_section_subtitle', e.target.value)}
                    placeholder="From initial consultation to installation..."
                  />
                </div>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Process Steps</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {content.process_steps.map((step, index) => (
                      <Card key={index}>
                        <CardContent className="pt-4">
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Step Number</label>
                                <Input
                                  type="number"
                                  value={step.step}
                                  onChange={(e) => updateArrayItem('process_steps', index, 'step', parseInt(e.target.value))}
                                  min="1"
                                  max="10"
                                />
                              </div>
                              <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Step Title</label>
                                <Input
                                  value={step.title}
                                  onChange={(e) => updateArrayItem('process_steps', index, 'title', e.target.value)}
                                  placeholder="Consultation"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">Step Description</label>
                              <Textarea
                                value={step.description}
                                onChange={(e) => updateArrayItem('process_steps', index, 'description', e.target.value)}
                                placeholder="Discuss your needs and get expert recommendations"
                                rows={2}
                              />
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeArrayItem('process_steps', index)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Remove Step
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addArrayItem('process_steps', { step: content.process_steps.length + 1, title: '', description: '' })}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Process Step
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* SEO Content Section */}
          {renderSectionCard(
            'seo-content',
            'SEO Content Section',
            'SEO-focused content paragraphs at the bottom of the page',
            <Building2 className="h-6 w-6 text-indigo-600" />,
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">SEO Section Title</label>
                <Input
                  value={content.seo_content_title}
                  onChange={(e) => updateContent('seo_content_title', e.target.value)}
                  placeholder="Professional Modular Building Solutions"
                />
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">SEO Content Paragraphs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {content.seo_paragraphs.map((paragraph, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <label className="block text-sm font-medium text-gray-700">Paragraph {index + 1}</label>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeArrayItem('seo_paragraphs', index)}
                            className="text-red-600"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Textarea
                          value={paragraph.content}
                          onChange={(e) => updateArrayItem('seo_paragraphs', index, 'content', e.target.value)}
                          placeholder="Enter SEO content paragraph..."
                          rows={4}
                        />
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => addArrayItem('seo_paragraphs', { content: '' })}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add SEO Paragraph
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main CTA Section */}
          {renderSectionCard(
            'main-cta',
            'Main CTA Section',
            'Call-to-action section at the bottom of the page',
            <Building2 className="h-6 w-6 text-red-600" />,
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CTA Title</label>
                  <Input
                    value={content.main_cta_title}
                    onChange={(e) => updateContent('main_cta_title', e.target.value)}
                    placeholder="Ready to Find Your Perfect Solution?"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CTA Subtitle</label>
                  <Input
                    value={content.main_cta_subtitle}
                    onChange={(e) => updateContent('main_cta_subtitle', e.target.value)}
                    placeholder="Our experts will help you choose the right modular building..."
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
                        value={content.main_cta_primary_text}
                        onChange={(e) => updateContent('main_cta_primary_text', e.target.value)}
                        placeholder="Get Custom Quote"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button URL</label>
                      <Input
                        value={content.main_cta_primary_url}
                        onChange={(e) => updateContent('main_cta_primary_url', e.target.value)}
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
                        value={content.main_cta_secondary_text}
                        onChange={(e) => updateContent('main_cta_secondary_text', e.target.value)}
                        placeholder="Speak with Expert"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Button URL</label>
                      <Input
                        value={content.main_cta_secondary_url}
                        onChange={(e) => updateContent('main_cta_secondary_url', e.target.value)}
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
'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Plus, Trash2, Edit, Save, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import PreviewButton from '@/components/admin/PreviewButton'
import { supabase } from '@/lib/supabase'

interface IndustryData {
  slug: string
  name: string
  subtitle: string
  description: string
  image_url: string
  case_studies_count: number
  meta_title: string
  meta_description: string
}

interface Solution {
  id?: string
  title: string
  description: string
  icon_name: string
  image_url: string
  features: string[]
  sort_order: number
}

interface Benefit {
  id?: string
  title: string
  description: string
  icon_name: string
  sort_order: number
}

interface CaseStudy {
  id?: string
  title: string
  description: string
  image_url: string
  results: string[]
  sort_order: number
}

interface Statistic {
  id?: string
  label: string
  value: string
  description: string
  sort_order: number
}

export default function ComprehensiveIndustryEdit() {
  const router = useRouter()
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  
  const [industryData, setIndustryData] = useState<IndustryData>({
    slug: '',
    name: '',
    subtitle: 'Industry Solutions',
    description: '',
    image_url: '',
    case_studies_count: 0,
    meta_title: '',
    meta_description: ''
  })
  
  const [solutions, setSolutions] = useState<Solution[]>([])
  const [benefits, setBenefits] = useState<Benefit[]>([])
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([])
  const [statistics, setStatistics] = useState<Statistic[]>([])

  useEffect(() => {
    if (params.id) {
      fetchIndustryData(params.id as string)
    }
  }, [params.id])

  const fetchIndustryData = async (id: string) => {
    try {
      setLoading(true)
      
      // Get main industry data
      const { data: industryRecord, error: industryError } = await supabase
        .from('industry_content')
        .select('*')
        .eq('slug', id)
        .single()

      if (industryError) {
        console.error('Error fetching industry:', industryError)
        alert('Error loading industry data')
        return
      }

      if (industryRecord) {
        setIndustryData(industryRecord)
      }

      // Get solutions
      const { data: solutionsData, error: solutionsError } = await supabase
        .from('industry_solutions')
        .select('*')
        .eq('industry_slug', id)
        .order('sort_order')

      if (!solutionsError && solutionsData) {
        setSolutions(solutionsData)
      }

      // Get benefits
      const { data: benefitsData, error: benefitsError } = await supabase
        .from('industry_benefits')
        .select('*')
        .eq('industry_slug', id)
        .order('sort_order')

      if (!benefitsError && benefitsData) {
        setBenefits(benefitsData)
      }

      // Get case studies
      const { data: caseStudiesData, error: caseStudiesError } = await supabase
        .from('industry_case_studies')
        .select('*')
        .eq('industry_slug', id)
        .order('sort_order')

      if (!caseStudiesError && caseStudiesData) {
        setCaseStudies(caseStudiesData)
      }

      // Get statistics
      const { data: statisticsData, error: statisticsError } = await supabase
        .from('industry_statistics')
        .select('*')
        .eq('industry_slug', id)
        .order('sort_order')

      if (!statisticsError && statisticsData) {
        setStatistics(statisticsData)
      }

    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Error loading industry data')
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)

      // Update main industry data
      const { error: industryError } = await supabase
        .from('industry_content')
        .update({
          ...industryData,
          updated_at: new Date().toISOString()
        })
        .eq('slug', params.id)

      if (industryError) {
        console.error('Error updating industry:', industryError)
        alert('Error saving industry data')
        return
      }

      // Update solutions
      for (const solution of solutions) {
        if (solution.id) {
          await supabase
            .from('industry_solutions')
            .update(solution)
            .eq('id', solution.id)
        } else {
          await supabase
            .from('industry_solutions')
            .insert({
              ...solution,
              industry_slug: params.id
            })
        }
      }

      // Update benefits
      for (const benefit of benefits) {
        if (benefit.id) {
          await supabase
            .from('industry_benefits')
            .update(benefit)
            .eq('id', benefit.id)
        } else {
          await supabase
            .from('industry_benefits')
            .insert({
              ...benefit,
              industry_slug: params.id
            })
        }
      }

      // Update case studies
      for (const caseStudy of caseStudies) {
        if (caseStudy.id) {
          await supabase
            .from('industry_case_studies')
            .update(caseStudy)
            .eq('id', caseStudy.id)
        } else {
          await supabase
            .from('industry_case_studies')
            .insert({
              ...caseStudy,
              industry_slug: params.id
            })
        }
      }

      // Update statistics
      for (const statistic of statistics) {
        if (statistic.id) {
          await supabase
            .from('industry_statistics')
            .update(statistic)
            .eq('id', statistic.id)
        } else {
          await supabase
            .from('industry_statistics')
            .insert({
              ...statistic,
              industry_slug: params.id
            })
        }
      }

      alert('Industry content updated successfully!')
      
    } catch (error) {
      console.error('Error saving:', error)
      alert('Error saving industry content')
    } finally {
      setSaving(false)
    }
  }

  const addSolution = () => {
    setSolutions([...solutions, {
      title: '',
      description: '',
      icon_name: 'Building2',
      image_url: '',
      features: [],
      sort_order: solutions.length
    }])
  }

  const addBenefit = () => {
    setBenefits([...benefits, {
      title: '',
      description: '',
      icon_name: 'CheckCircle',
      sort_order: benefits.length
    }])
  }

  const addCaseStudy = () => {
    setCaseStudies([...caseStudies, {
      title: '',
      description: '',
      image_url: '',
      results: [],
      sort_order: caseStudies.length
    }])
  }

  const addStatistic = () => {
    setStatistics([...statistics, {
      label: '',
      value: '',
      description: '',
      sort_order: statistics.length
    }])
  }

  const removeSolution = async (index: number) => {
    const solution = solutions[index]
    if (solution.id) {
      await supabase.from('industry_solutions').delete().eq('id', solution.id)
    }
    setSolutions(solutions.filter((_, i) => i !== index))
  }

  const removeBenefit = async (index: number) => {
    const benefit = benefits[index]
    if (benefit.id) {
      await supabase.from('industry_benefits').delete().eq('id', benefit.id)
    }
    setBenefits(benefits.filter((_, i) => i !== index))
  }

  const removeCaseStudy = async (index: number) => {
    const caseStudy = caseStudies[index]
    if (caseStudy.id) {
      await supabase.from('industry_case_studies').delete().eq('id', caseStudy.id)
    }
    setCaseStudies(caseStudies.filter((_, i) => i !== index))
  }

  const removeStatistic = async (index: number) => {
    const statistic = statistics[index]
    if (statistic.id) {
      await supabase.from('industry_statistics').delete().eq('id', statistic.id)
    }
    setStatistics(statistics.filter((_, i) => i !== index))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading industry content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/industries">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Industries
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Comprehensive Industry Editor</h1>
                <p className="text-gray-600">Managing all content for: {industryData.name}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <PreviewButton 
                href={`/industries/${params.id}`}
                label="Preview Live Page"
                variant="outline"
                size="sm"
              />
              <Button 
                onClick={handleSave}
                disabled={saving}
                className="bg-navy-600 hover:bg-navy-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save All Changes'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Core industry information and SEO settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Industry Name</label>
                <Input
                  value={industryData.name}
                  onChange={(e) => setIndustryData({...industryData, name: e.target.value})}
                  placeholder="e.g., Education, Healthcare"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subtitle</label>
                <Input
                  value={industryData.subtitle}
                  onChange={(e) => setIndustryData({...industryData, subtitle: e.target.value})}
                  placeholder="e.g., Industry Solutions"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <Textarea
                value={industryData.description}
                onChange={(e) => setIndustryData({...industryData, description: e.target.value})}
                rows={3}
                placeholder="Describe the industry and how your modular buildings serve it..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Main Image URL</label>
                <Input
                  value={industryData.image_url}
                  onChange={(e) => setIndustryData({...industryData, image_url: e.target.value})}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Case Studies Count</label>
                <Input
                  type="number"
                  value={industryData.case_studies_count}
                  onChange={(e) => setIndustryData({...industryData, case_studies_count: parseInt(e.target.value) || 0})}
                  placeholder="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Title (SEO)</label>
                <Input
                  value={industryData.meta_title}
                  onChange={(e) => setIndustryData({...industryData, meta_title: e.target.value})}
                  placeholder="SEO title for search engines"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Meta Description (SEO)</label>
                <Input
                  value={industryData.meta_description}
                  onChange={(e) => setIndustryData({...industryData, meta_description: e.target.value})}
                  placeholder="SEO description for search engines"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Solutions Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Solutions</CardTitle>
                <CardDescription>Specific solutions offered for this industry</CardDescription>
              </div>
              <Button onClick={addSolution} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Solution
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Solution {index + 1}</Badge>
                    <Button onClick={() => removeSolution(index)} variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Solution Title"
                      value={solution.title}
                      onChange={(e) => {
                        const newSolutions = [...solutions]
                        newSolutions[index].title = e.target.value
                        setSolutions(newSolutions)
                      }}
                    />
                    <Input
                      placeholder="Icon Name (e.g., Building2)"
                      value={solution.icon_name}
                      onChange={(e) => {
                        const newSolutions = [...solutions]
                        newSolutions[index].icon_name = e.target.value
                        setSolutions(newSolutions)
                      }}
                    />
                  </div>
                  
                  <Textarea
                    placeholder="Solution Description"
                    value={solution.description}
                    onChange={(e) => {
                      const newSolutions = [...solutions]
                      newSolutions[index].description = e.target.value
                      setSolutions(newSolutions)
                    }}
                    rows={2}
                  />
                  
                  <Input
                    placeholder="Image URL"
                    value={solution.image_url}
                    onChange={(e) => {
                      const newSolutions = [...solutions]
                      newSolutions[index].image_url = e.target.value
                      setSolutions(newSolutions)
                    }}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma-separated)</label>
                    <Input
                      placeholder="Feature 1, Feature 2, Feature 3"
                      value={solution.features.join(', ')}
                      onChange={(e) => {
                        const newSolutions = [...solutions]
                        newSolutions[index].features = e.target.value.split(',').map(f => f.trim()).filter(f => f)
                        setSolutions(newSolutions)
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Benefits</CardTitle>
                <CardDescription>Key benefits for this industry</CardDescription>
              </div>
              <Button onClick={addBenefit} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Benefit
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Benefit {index + 1}</Badge>
                    <Button onClick={() => removeBenefit(index)} variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Benefit Title"
                      value={benefit.title}
                      onChange={(e) => {
                        const newBenefits = [...benefits]
                        newBenefits[index].title = e.target.value
                        setBenefits(newBenefits)
                      }}
                    />
                    <Input
                      placeholder="Icon Name (e.g., CheckCircle)"
                      value={benefit.icon_name}
                      onChange={(e) => {
                        const newBenefits = [...benefits]
                        newBenefits[index].icon_name = e.target.value
                        setBenefits(newBenefits)
                      }}
                    />
                  </div>
                  
                  <Textarea
                    placeholder="Benefit Description"
                    value={benefit.description}
                    onChange={(e) => {
                      const newBenefits = [...benefits]
                      newBenefits[index].description = e.target.value
                      setBenefits(newBenefits)
                    }}
                    rows={2}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Case Studies Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Case Studies</CardTitle>
                <CardDescription>Success stories and case studies</CardDescription>
              </div>
              <Button onClick={addCaseStudy} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Case Study
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {caseStudies.map((caseStudy, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Case Study {index + 1}</Badge>
                    <Button onClick={() => removeCaseStudy(index)} variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Input
                    placeholder="Case Study Title"
                    value={caseStudy.title}
                    onChange={(e) => {
                      const newCaseStudies = [...caseStudies]
                      newCaseStudies[index].title = e.target.value
                      setCaseStudies(newCaseStudies)
                    }}
                  />
                  
                  <Textarea
                    placeholder="Case Study Description"
                    value={caseStudy.description}
                    onChange={(e) => {
                      const newCaseStudies = [...caseStudies]
                      newCaseStudies[index].description = e.target.value
                      setCaseStudies(newCaseStudies)
                    }}
                    rows={2}
                  />
                  
                  <Input
                    placeholder="Image URL"
                    value={caseStudy.image_url}
                    onChange={(e) => {
                      const newCaseStudies = [...caseStudies]
                      newCaseStudies[index].image_url = e.target.value
                      setCaseStudies(newCaseStudies)
                    }}
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Results (comma-separated)</label>
                    <Input
                      placeholder="Result 1, Result 2, Result 3"
                      value={caseStudy.results.join(', ')}
                      onChange={(e) => {
                        const newCaseStudies = [...caseStudies]
                        newCaseStudies[index].results = e.target.value.split(',').map(r => r.trim()).filter(r => r)
                        setCaseStudies(newCaseStudies)
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Statistics Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Key statistics and metrics</CardDescription>
              </div>
              <Button onClick={addStatistic} size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Statistic
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {statistics.map((statistic, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Statistic {index + 1}</Badge>
                    <Button onClick={() => removeStatistic(index)} variant="outline" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      placeholder="Label (e.g., Schools Served)"
                      value={statistic.label}
                      onChange={(e) => {
                        const newStatistics = [...statistics]
                        newStatistics[index].label = e.target.value
                        setStatistics(newStatistics)
                      }}
                    />
                    <Input
                      placeholder="Value (e.g., 500+)"
                      value={statistic.value}
                      onChange={(e) => {
                        const newStatistics = [...statistics]
                        newStatistics[index].value = e.target.value
                        setStatistics(newStatistics)
                      }}
                    />
                  </div>
                  
                  <Input
                    placeholder="Description"
                    value={statistic.description}
                    onChange={(e) => {
                      const newStatistics = [...statistics]
                      newStatistics[index].description = e.target.value
                      setStatistics(newStatistics)
                    }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
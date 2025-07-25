'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Save, Plus, Trash2 } from 'lucide-react'

interface CompanyContent {
  mission_title?: string
  mission_content?: string
  vision_title?: string
  vision_content?: string
  values_title?: string
  values_description?: string
  timeline_title?: string
  timeline_description?: string
  leadership_title?: string
  leadership_description?: string
  certifications_title?: string
  certifications_description?: string
  cta_title?: string
  cta_description?: string
  cta_primary_text?: string
  cta_secondary_text?: string
  stats_locations?: string
  stats_buildings?: string
  stats_satisfaction?: string
  stats_support?: string
  values?: Array<{
    icon: string
    title: string
    description: string
  }>
  timeline?: Array<{
    year: string
    title: string
    description: string
  }>
  leadership?: Array<{
    name: string
    title: string
    bio: string
    image: string
  }>
  certifications?: string[]
}

export default function CompanyAboutAdminPage() {
  const [content, setContent] = useState<CompanyContent>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchContent()
  }, [])

  const fetchContent = async () => {
    try {
      const response = await fetch('/api/admin/company-content')
      const data = await response.json()
      setContent(data)
    } catch (error) {
      console.error('Error fetching content:', error)
      setMessage({ type: 'error', text: 'Failed to load content' })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setMessage(null)

    try {
      const response = await fetch('/api/admin/company-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content)
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Company content saved successfully!' })
      } else {
        throw new Error('Failed to save')
      }
    } catch (error) {
      console.error('Error saving content:', error)
      setMessage({ type: 'error', text: 'Failed to save company content' })
    } finally {
      setIsSaving(false)
    }
  }

  const updateField = (field: keyof CompanyContent, value: any) => {
    setContent(prev => ({ ...prev, [field]: value }))
  }

  const addValue = () => {
    const newValue = { icon: 'Building2', title: '', description: '' }
    updateField('values', [...(content.values || []), newValue])
  }

  const updateValue = (index: number, field: string, value: string) => {
    const values = [...(content.values || [])]
    values[index] = { ...values[index], [field]: value }
    updateField('values', values)
  }

  const removeValue = (index: number) => {
    const values = content.values?.filter((_, i) => i !== index) || []
    updateField('values', values)
  }

  const addTimelineItem = () => {
    const newItem = { year: '', title: '', description: '' }
    updateField('timeline', [...(content.timeline || []), newItem])
  }

  const updateTimelineItem = (index: number, field: string, value: string) => {
    const timeline = [...(content.timeline || [])]
    timeline[index] = { ...timeline[index], [field]: value }
    updateField('timeline', timeline)
  }

  const removeTimelineItem = (index: number) => {
    const timeline = content.timeline?.filter((_, i) => i !== index) || []
    updateField('timeline', timeline)
  }

  const addLeadershipMember = () => {
    const newMember = { name: '', title: '', bio: '', image: '' }
    updateField('leadership', [...(content.leadership || []), newMember])
  }

  const updateLeadershipMember = (index: number, field: string, value: string) => {
    const leadership = [...(content.leadership || [])]
    leadership[index] = { ...leadership[index], [field]: value }
    updateField('leadership', leadership)
  }

  const removeLeadershipMember = (index: number) => {
    const leadership = content.leadership?.filter((_, i) => i !== index) || []
    updateField('leadership', leadership)
  }

  if (isLoading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">About Us Content Management</h1>

      {message && (
        <div className={`mb-6 p-4 rounded-md ${
          message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
        }`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Mission & Vision */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Mission & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="mission_title">Mission Title</Label>
              <Input
                id="mission_title"
                value={content.mission_title || ''}
                onChange={(e) => updateField('mission_title', e.target.value)}
                placeholder="Our Mission"
              />
            </div>
            <div>
              <Label htmlFor="vision_title">Vision Title</Label>
              <Input
                id="vision_title"
                value={content.vision_title || ''}
                onChange={(e) => updateField('vision_title', e.target.value)}
                placeholder="Our Vision"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="mission_content">Mission Content</Label>
              <Textarea
                id="mission_content"
                value={content.mission_content || ''}
                onChange={(e) => updateField('mission_content', e.target.value)}
                rows={4}
                placeholder="Mission statement..."
              />
            </div>
            <div>
              <Label htmlFor="vision_content">Vision Content</Label>
              <Textarea
                id="vision_content"
                value={content.vision_content || ''}
                onChange={(e) => updateField('vision_content', e.target.value)}
                rows={4}
                placeholder="Vision statement..."
              />
            </div>
          </div>
        </div>

        {/* Company Stats */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Company Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="stats_locations">Service Locations</Label>
              <Input
                id="stats_locations"
                value={content.stats_locations || ''}
                onChange={(e) => updateField('stats_locations', e.target.value)}
                placeholder="275+"
              />
            </div>
            <div>
              <Label htmlFor="stats_buildings">Buildings Delivered</Label>
              <Input
                id="stats_buildings"
                value={content.stats_buildings || ''}
                onChange={(e) => updateField('stats_buildings', e.target.value)}
                placeholder="50K+"
              />
            </div>
            <div>
              <Label htmlFor="stats_satisfaction">Customer Satisfaction</Label>
              <Input
                id="stats_satisfaction"
                value={content.stats_satisfaction || ''}
                onChange={(e) => updateField('stats_satisfaction', e.target.value)}
                placeholder="99%"
              />
            </div>
            <div>
              <Label htmlFor="stats_support">Customer Support</Label>
              <Input
                id="stats_support"
                value={content.stats_support || ''}
                onChange={(e) => updateField('stats_support', e.target.value)}
                placeholder="24/7"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Core Values</h2>
            <Button type="button" onClick={addValue} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Value
            </Button>
          </div>
          
          {content.values?.map((value, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">Value {index + 1}</h3>
                <Button 
                  type="button" 
                  onClick={() => removeValue(index)} 
                  variant="outline" 
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Icon</Label>
                  <Input
                    value={value.icon}
                    onChange={(e) => updateValue(index, 'icon', e.target.value)}
                    placeholder="Building2"
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={value.title}
                    onChange={(e) => updateValue(index, 'title', e.target.value)}
                    placeholder="Value title"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={value.description}
                    onChange={(e) => updateValue(index, 'description', e.target.value)}
                    rows={2}
                    placeholder="Value description"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Company Timeline</h2>
            <Button type="button" onClick={addTimelineItem} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Timeline Item
            </Button>
          </div>
          
          {content.timeline?.map((item, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">Timeline Item {index + 1}</h3>
                <Button 
                  type="button" 
                  onClick={() => removeTimelineItem(index)} 
                  variant="outline" 
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>Year</Label>
                  <Input
                    value={item.year}
                    onChange={(e) => updateTimelineItem(index, 'year', e.target.value)}
                    placeholder="2024"
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => updateTimelineItem(index, 'title', e.target.value)}
                    placeholder="Major milestone"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={item.description}
                    onChange={(e) => updateTimelineItem(index, 'description', e.target.value)}
                    rows={2}
                    placeholder="Description of milestone"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leadership Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Leadership Team</h2>
            <Button type="button" onClick={addLeadershipMember} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Leader
            </Button>
          </div>
          
          {content.leadership?.map((leader, index) => (
            <div key={index} className="border p-4 rounded mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">Leader {index + 1}</h3>
                <Button 
                  type="button" 
                  onClick={() => removeLeadershipMember(index)} 
                  variant="outline" 
                  size="sm"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    value={leader.name}
                    onChange={(e) => updateLeadershipMember(index, 'name', e.target.value)}
                    placeholder="Leader name"
                  />
                </div>
                <div>
                  <Label>Title</Label>
                  <Input
                    value={leader.title}
                    onChange={(e) => updateLeadershipMember(index, 'title', e.target.value)}
                    placeholder="Job title"
                  />
                </div>
                <div>
                  <Label>Bio</Label>
                  <Textarea
                    value={leader.bio}
                    onChange={(e) => updateLeadershipMember(index, 'bio', e.target.value)}
                    rows={2}
                    placeholder="Leader biography"
                  />
                </div>
                <div>
                  <Label>Image URL</Label>
                  <Input
                    value={leader.image}
                    onChange={(e) => updateLeadershipMember(index, 'image', e.target.value)}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={isSaving} size="lg">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </div>
  )
}
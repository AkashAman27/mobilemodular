'use client'

import React, { useState, useEffect } from 'react'
import SEOFields from '@/components/admin/SEOFields'
import { motion } from 'framer-motion'
import { 
  Phone, 
  Search, 
  Truck, 
  Settings, 
  CheckCircle, 
  Clock,
  Shield,
  Wrench,
  Plus,
  Edit,
  Trash2,
  Save,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const iconOptions = [
  { value: 'Phone', label: 'Phone', icon: Phone },
  { value: 'Search', label: 'Search', icon: Search },
  { value: 'Settings', label: 'Settings', icon: Settings },
  { value: 'Shield', label: 'Shield', icon: Shield },
  { value: 'Wrench', label: 'Wrench', icon: Wrench },
  { value: 'Truck', label: 'Truck', icon: Truck },
  { value: 'CheckCircle', label: 'Check Circle', icon: CheckCircle },
  { value: 'Clock', label: 'Clock', icon: Clock }
]

const colorOptions = [
  { value: 'from-blue-500 to-blue-600', label: 'Blue' },
  { value: 'from-green-500 to-green-600', label: 'Green' },
  { value: 'from-purple-500 to-purple-600', label: 'Purple' },
  { value: 'from-orange-500 to-orange-600', label: 'Orange' },
  { value: 'from-red-500 to-red-600', label: 'Red' },
  { value: 'from-teal-500 to-teal-600', label: 'Teal' },
  { value: 'from-indigo-500 to-indigo-600', label: 'Indigo' },
  { value: 'from-pink-500 to-pink-600', label: 'Pink' }
]

const initialProcessSteps = [
  {
    id: 1,
    title: "Initial Consultation",
    description: "We discuss your specific needs, timeline, and requirements to understand your project scope.",
    icon: "Phone",
    duration: "1-2 Days",
    details: [
      "Free consultation call or site visit",
      "Requirements analysis and needs assessment",
      "Budget discussion and initial pricing",
      "Timeline planning and project scoping"
    ],
    color: "from-blue-500 to-blue-600"
  },
  {
    id: 2,
    title: "Site Assessment",
    description: "Our experts evaluate your site conditions and local requirements for optimal placement.",
    icon: "Search",
    duration: "2-3 Days",
    details: [
      "Site survey and ground condition analysis",
      "Utility access and connection planning",
      "Permit requirements research",
      "Zoning and compliance verification"
    ],
    color: "from-green-500 to-green-600"
  },
  {
    id: 3,
    title: "Custom Design",
    description: "We create detailed plans and specifications tailored to your exact requirements.",
    icon: "Settings",
    duration: "3-5 Days",
    details: [
      "Architectural planning and layout design",
      "Custom modifications and features",
      "Electrical and HVAC system design",
      "3D renderings and visual mockups"
    ],
    color: "from-purple-500 to-purple-600"
  },
  {
    id: 4,
    title: "Permitting & Approval",
    description: "We handle all necessary permits and regulatory approvals for your project.",
    icon: "Shield",
    duration: "5-10 Days",
    details: [
      "Building permit applications",
      "Local authority submissions",
      "Code compliance documentation",
      "Regulatory approval coordination"
    ],
    color: "from-orange-500 to-orange-600"
  },
  {
    id: 5,
    title: "Manufacturing",
    description: "Your modular building is constructed in our controlled factory environment.",
    icon: "Wrench",
    duration: "10-15 Days",
    details: [
      "Quality-controlled factory construction",
      "Custom modifications and installations",
      "Quality assurance inspections",
      "Final finishing and detailing"
    ],
    color: "from-red-500 to-red-600"
  },
  {
    id: 6,
    title: "Delivery & Setup",
    description: "Professional delivery and complete installation at your location.",
    icon: "Truck",
    duration: "1-2 Days",
    details: [
      "Coordinated delivery scheduling",
      "Professional crane and placement",
      "Utility connections and hookups",
      "Final inspection and walkthrough"
    ],
    color: "from-teal-500 to-teal-600"
  },
  {
    id: 7,
    title: "Final Inspection",
    description: "Complete quality check and handover of your ready-to-use modular building.",
    icon: "CheckCircle",
    duration: "1 Day",
    details: [
      "Comprehensive quality inspection",
      "Systems testing and verification",
      "Documentation and warranty handover",
      "Training on building features"
    ],
    color: "from-indigo-500 to-indigo-600"
  }
]

export default function OurProcessAdminPage() {
  const [processSteps, setProcessSteps] = useState<any[]>([])
  const [editingStep, setEditingStep] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [seoData, setSeoData] = useState({})
  const [seoLoading, setSeoLoading] = useState(true)

  // Fetch process steps from API
  useEffect(() => {
    fetchProcessSteps()
    fetchSEOData()
  }, [])

  const fetchSEOData = async () => {
    try {
      setSeoLoading(true)
      const response = await fetch('/api/seo?path=/company/our-process')
      if (response.ok) {
        const data = await response.json()
        setSeoData(data)
      } else {
        console.error('Failed to fetch SEO data')
        setSeoData({})
      }
    } catch (error) {
      console.error('Error fetching SEO data:', error)
    } finally {
      setSeoLoading(false)
    }
  }

  const handleSEODataChange = async (newSeoData: any) => {
    setSeoData(newSeoData)
    
    try {
      const response = await fetch('/api/seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          page_path: '/company/our-process',
          page_title: 'Our Proven Process - Manage',
          ...newSeoData
        }),
      })

      if (!response.ok) {
        console.error('Failed to save SEO data')
      }
    } catch (error) {
      console.error('Error saving SEO data:', error)
    }
  }

  const fetchProcessSteps = async () => {
    try {
      const response = await fetch('/api/process-steps')
      if (response.ok) {
        const data = await response.json()
        setProcessSteps(data)
      } else {
        console.error('Failed to fetch process steps')
      }
    } catch (error) {
      console.error('Error fetching process steps:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveStep = async (stepId: any, updatedStep: any) => {
    try {
      setSaving(true)
      console.log('Saving step:', stepId, updatedStep)
      
      // Close the edit form immediately to prevent React errors
      setEditingStep(null)
      
      const response = await fetch(`/api/process-steps/${stepId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStep),
      })
      console.log('Response status:', response.status)

      if (response.ok) {
        const updatedData = await response.json()
        console.log('Updated data received:', updatedData)
        
        // Force a complete refresh from the server
        setLoading(true)
        await fetchProcessSteps()
        
        console.log('Data refreshed successfully')
      } else {
        const errorData = await response.text()
        console.error('Failed to save process step:', errorData)
        alert('Failed to save changes. Please try again.')
      }
    } catch (error) {
      console.error('Error saving process step:', error)
      alert('Error saving changes. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteStep = async (stepId: any) => {
    if (!confirm('Are you sure you want to delete this step?')) {
      return
    }

    try {
      const response = await fetch(`/api/process-steps/${stepId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setProcessSteps(prev => prev.filter(step => step.id !== stepId))
      } else {
        console.error('Failed to delete process step')
        alert('Failed to delete step. Please try again.')
      }
    } catch (error) {
      console.error('Error deleting process step:', error)
      alert('Error deleting step. Please try again.')
    }
  }

  const handleAddStep = async () => {
    try {
      const newStep = {
        title: "New Step",
        description: "Step description",
        icon: "Settings",
        duration: "1 Day",
        details: ["New detail"],
        color: "from-blue-500 to-blue-600",
        step_order: processSteps.length + 1
      }

      const response = await fetch('/api/process-steps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStep),
      })

      if (response.ok) {
        const createdStep = await response.json()
        setProcessSteps(prev => [...prev, createdStep])
        setEditingStep(createdStep.id)
      } else {
        console.error('Failed to create process step')
        alert('Failed to create new step. Please try again.')
      }
    } catch (error) {
      console.error('Error creating process step:', error)
      alert('Error creating new step. Please try again.')
    }
  }


  const getIconComponent = (iconName: string) => {
    const iconOption = iconOptions.find(opt => opt.value === iconName)
    return iconOption ? iconOption.icon : Settings
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading process steps...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Our Process</h1>
            <p className="text-gray-600 mt-1">Edit the 7-step process content and order</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={fetchProcessSteps} variant="outline" disabled={loading}>
              {loading ? 'Loading...' : 'Refresh Data'}
            </Button>
            <Button onClick={handleAddStep} className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </div>
        </div>

        <div className="grid gap-6">
          {processSteps.map((step, index) => (
            <Card key={`step-${step.id}-${step.updated_at || Date.now()}`} className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center text-gray-900">
                  <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${step.color} text-white mr-3`}>
                    {React.createElement(getIconComponent(step.icon), { className: "h-5 w-5" })}
                  </div>
                  Step {index + 1}: {step.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingStep(editingStep === step.id ? null : step.id)}
                  >
                    {editingStep === step.id ? <X className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteStep(step.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {editingStep === step.id ? (
                  <EditStepForm
                    step={step}
                    onSave={(updatedStep: any) => handleSaveStep(step.id, updatedStep)}
                    onCancel={() => setEditingStep(null)}
                    iconOptions={iconOptions}
                    colorOptions={colorOptions}
                  />
                ) : (
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-600 mb-2">{step.description}</p>
                      <p className="text-sm text-gray-500">Duration: {step.duration}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-2">Details:</h4>
                      <ul className="list-disc list-inside space-y-1">
                        {step.details.map((detail: any, detailIndex: number) => (
                          <li key={detailIndex} className="text-gray-600">{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-white rounded-lg shadow">
          <Button 
            className="bg-green-600 hover:bg-green-700"
            disabled={saving}
          >
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Saving...' : 'All Changes Saved Automatically'}
          </Button>
          <p className="text-sm text-gray-500 mt-2">
            Changes are automatically saved to the database and applied to the live Our Process page
          </p>
        </div>

        {/* SEO Configuration Section */}
        <div className="mt-8">
          <SEOFields
            data={seoData}
            onChange={handleSEODataChange}
            pagePath="/company/our-process"
            pageTitle="Our Proven Process"
          />
        </div>
      </div>
    </div>
  )
}

function EditStepForm({ step, onSave, onCancel, iconOptions, colorOptions }: any) {
  const [formData, setFormData] = useState(step)
  const [newDetail, setNewDetail] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log('Form submitted with data:', formData)
    onSave(formData)
  }

  const addDetail = () => {
    if (newDetail.trim()) {
      console.log('Adding new detail:', newDetail)
      setFormData((prev: any) => {
        const updatedData = {
          ...prev,
          details: [...prev.details, newDetail.trim()]
        }
        console.log('Updated form data:', updatedData)
        return updatedData
      })
      setNewDetail("")
    } else {
      console.log('No detail to add (empty)')
    }
  }

  const removeDetail = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      details: prev.details.filter((_: any, i: number) => i !== index)
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, title: e.target.value }))}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
          <Input
            value={formData.duration}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, duration: e.target.value }))}
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <Textarea
          value={formData.description}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
          rows={3}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
          <select
            value={formData.icon}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, icon: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {iconOptions.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
          <select
            value={formData.color}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, color: e.target.value }))}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            {colorOptions.map((option: any) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
        <div className="space-y-2">
          {formData.details.map((detail: any, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={detail}
                onChange={(e) => {
                  const newDetails = [...formData.details]
                  newDetails[index] = e.target.value
                  setFormData((prev: any) => ({ ...prev, details: newDetails }))
                }}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => removeDetail(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Input
              value={newDetail}
              onChange={(e) => setNewDetail(e.target.value)}
              placeholder="Add new detail..."
              className="flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  addDetail()
                }
              }}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addDetail}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Save Step
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
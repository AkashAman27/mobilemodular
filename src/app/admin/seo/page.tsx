'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Save, Settings, Globe, Building, Code } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ImageUpload from '@/components/ui/image-upload'

interface SEOSettings {
  id?: string
  site_name: string
  site_description: string
  site_url: string
  default_og_image: string
  default_twitter_image: string
  google_analytics_id: string
  google_tag_manager_id: string
  google_search_console_verification: string
  bing_verification: string
  facebook_app_id: string
  twitter_username: string
  organization_name: string
  organization_logo: string
  organization_phone: string
  organization_email: string
  organization_address: string
  organization_city: string
  organization_state: string
  organization_country: string
  organization_postal_code: string
  robots_txt: string
  custom_head_scripts: string
  custom_body_scripts: string
}

const defaultSettings: SEOSettings = {
  site_name: 'Aman Modular Buildings',
  site_description: 'Professional modular buildings for rent, sale, and lease. From portable classrooms to office complexes, we provide flexible space solutions for every industry.',
  site_url: 'https://amanmodular.com',
  default_og_image: '',
  default_twitter_image: '',
  google_analytics_id: '',
  google_tag_manager_id: '',
  google_search_console_verification: '',
  bing_verification: '',
  facebook_app_id: '',
  twitter_username: '',
  organization_name: 'Aman Modular Buildings',
  organization_logo: '',
  organization_phone: '(555) 123-4567',
  organization_email: 'info@amanmodular.com',
  organization_address: '1234 Industrial Boulevard',
  organization_city: 'Los Angeles',
  organization_state: 'CA',
  organization_country: 'USA',
  organization_postal_code: '90028',
  robots_txt: `User-agent: *
Allow: /
Sitemap: https://amanmodular.com/sitemap.xml

User-agent: *
Disallow: /admin/
Disallow: /api/
Disallow: /private/`,
  custom_head_scripts: '',
  custom_body_scripts: ''
}

export default function SEOSettingsAdmin() {
  const [settings, setSettings] = useState<SEOSettings>(defaultSettings)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchSEOSettings()
  }, [])

  const fetchSEOSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('seo_settings')
        .select('*')
        .single()

      if (error) {
        if (error.code === 'PGRST116') {
          // No settings found, use defaults
          setSettings(defaultSettings)
        } else {
          // Silent error handling - removed console.error
          setError('Failed to fetch SEO settings')
        }
      } else {
        setSettings({ ...defaultSettings, ...data })
      }
    } catch (err) {
      // Silent error handling - removed console.error
      setError('Failed to fetch SEO settings')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const { id, ...settingsData } = settings
      
      if (id) {
        // Update existing settings
        const { error } = await supabase
          .from('seo_settings')
          .update(settingsData)
          .eq('id', id)
      } else {
        // Create new settings
        const { error } = await supabase
          .from('seo_settings')
          .insert([settingsData])
      }

      if (error) {
        throw error
      }

      alert('SEO settings saved successfully!')
      await fetchSEOSettings()
    } catch (err) {
      // Silent error handling - removed console.error
      setError('Failed to save SEO settings')
    } finally {
      setSaving(false)
    }
  }

  const updateSetting = (key: keyof SEOSettings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading SEO settings...</p>
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
              <Link href="/admin">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">SEO Settings</h1>
                <p className="text-gray-600">Manage global SEO configuration and metadata</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-red-600 font-medium">{error}</div>
              <button 
                onClick={() => setError(null)}
                className="ml-auto text-red-400 hover:text-red-600"
              >
                ✕
              </button>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="organization" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Organization
              </TabsTrigger>
              <TabsTrigger value="tracking" className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Tracking
              </TabsTrigger>
              <TabsTrigger value="technical" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Technical
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Site Information</CardTitle>
                  <CardDescription>Basic site information and default metadata</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="site_name">Site Name</Label>
                      <Input
                        id="site_name"
                        value={settings.site_name}
                        onChange={(e) => updateSetting('site_name', e.target.value)}
                        placeholder="Your site name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="site_url">Site URL</Label>
                      <Input
                        id="site_url"
                        value={settings.site_url}
                        onChange={(e) => updateSetting('site_url', e.target.value)}
                        placeholder="https://amanmodular.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site_description">Site Description</Label>
                    <Textarea
                      id="site_description"
                      value={settings.site_description}
                      onChange={(e) => updateSetting('site_description', e.target.value)}
                      placeholder="Brief description of your site"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <ImageUpload
                        label="Default Open Graph Image"
                        value={settings.default_og_image}
                        onChange={(url) => updateSetting('default_og_image', url)}
                        bucketName="images"
                        folder="seo"
                      />
                    </div>
                    <div className="space-y-2">
                      <ImageUpload
                        label="Default Twitter Image"
                        value={settings.default_twitter_image}
                        onChange={(url) => updateSetting('default_twitter_image', url)}
                        bucketName="images"
                        folder="seo"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="organization" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Details</CardTitle>
                  <CardDescription>Information about your business for structured data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="organization_name">Organization Name</Label>
                      <Input
                        id="organization_name"
                        value={settings.organization_name}
                        onChange={(e) => updateSetting('organization_name', e.target.value)}
                        placeholder="Your organization name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <ImageUpload
                        label="Organization Logo"
                        value={settings.organization_logo}
                        onChange={(url) => updateSetting('organization_logo', url)}
                        bucketName="images"
                        folder="logos"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="organization_phone">Phone Number</Label>
                      <Input
                        id="organization_phone"
                        value={settings.organization_phone}
                        onChange={(e) => updateSetting('organization_phone', e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization_email">Email Address</Label>
                      <Input
                        id="organization_email"
                        type="email"
                        value={settings.organization_email}
                        onChange={(e) => updateSetting('organization_email', e.target.value)}
                        placeholder="info@amanmodular.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organization_address">Street Address</Label>
                    <Input
                      id="organization_address"
                      value={settings.organization_address}
                      onChange={(e) => updateSetting('organization_address', e.target.value)}
                      placeholder="1234 Industrial Boulevard"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="organization_city">City</Label>
                      <Input
                        id="organization_city"
                        value={settings.organization_city}
                        onChange={(e) => updateSetting('organization_city', e.target.value)}
                        placeholder="Los Angeles"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization_state">State</Label>
                      <Input
                        id="organization_state"
                        value={settings.organization_state}
                        onChange={(e) => updateSetting('organization_state', e.target.value)}
                        placeholder="CA"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization_postal_code">Postal Code</Label>
                      <Input
                        id="organization_postal_code"
                        value={settings.organization_postal_code}
                        onChange={(e) => updateSetting('organization_postal_code', e.target.value)}
                        placeholder="90028"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="organization_country">Country</Label>
                      <Input
                        id="organization_country"
                        value={settings.organization_country}
                        onChange={(e) => updateSetting('organization_country', e.target.value)}
                        placeholder="USA"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tracking" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Tracking</CardTitle>
                  <CardDescription>Configure tracking and verification codes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
                      <Input
                        id="google_analytics_id"
                        value={settings.google_analytics_id}
                        onChange={(e) => updateSetting('google_analytics_id', e.target.value)}
                        placeholder="G-XXXXXXXXXX"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="google_tag_manager_id">Google Tag Manager ID</Label>
                      <Input
                        id="google_tag_manager_id"
                        value={settings.google_tag_manager_id}
                        onChange={(e) => updateSetting('google_tag_manager_id', e.target.value)}
                        placeholder="GTM-XXXXXXX"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="google_search_console_verification">Google Search Console Verification</Label>
                      <Input
                        id="google_search_console_verification"
                        value={settings.google_search_console_verification}
                        onChange={(e) => updateSetting('google_search_console_verification', e.target.value)}
                        placeholder="Verification code"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bing_verification">Bing Verification</Label>
                      <Input
                        id="bing_verification"
                        value={settings.bing_verification}
                        onChange={(e) => updateSetting('bing_verification', e.target.value)}
                        placeholder="Verification code"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="facebook_app_id">Facebook App ID</Label>
                      <Input
                        id="facebook_app_id"
                        value={settings.facebook_app_id}
                        onChange={(e) => updateSetting('facebook_app_id', e.target.value)}
                        placeholder="123456789"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter_username">Twitter Username</Label>
                      <Input
                        id="twitter_username"
                        value={settings.twitter_username}
                        onChange={(e) => updateSetting('twitter_username', e.target.value)}
                        placeholder="@amanmodular"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="technical" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Technical SEO</CardTitle>
                  <CardDescription>Robots.txt and custom scripts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="robots_txt">Robots.txt Content</Label>
                    <Textarea
                      id="robots_txt"
                      value={settings.robots_txt}
                      onChange={(e) => updateSetting('robots_txt', e.target.value)}
                      placeholder="User-agent: *&#10;Allow: /&#10;Sitemap: https://amanmodular.com/sitemap.xml"
                      rows={8}
                      className="font-mono text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom_head_scripts">Custom Head Scripts</Label>
                    <Textarea
                      id="custom_head_scripts"
                      value={settings.custom_head_scripts}
                      onChange={(e) => updateSetting('custom_head_scripts', e.target.value)}
                      placeholder="<script>/* Custom scripts for head */</script>"
                      rows={4}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-600">
                      Scripts to be added to the head section of all pages
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="custom_body_scripts">Custom Body Scripts</Label>
                    <Textarea
                      id="custom_body_scripts"
                      value={settings.custom_body_scripts}
                      onChange={(e) => updateSetting('custom_body_scripts', e.target.value)}
                      placeholder="<script>/* Custom scripts for body */</script>"
                      rows={4}
                      className="font-mono text-sm"
                    />
                    <p className="text-xs text-gray-600">
                      Scripts to be added to the end of the body section of all pages
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-8">
            <Button type="submit" disabled={saving} className="bg-navy-600 hover:bg-navy-700">
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save SEO Settings'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
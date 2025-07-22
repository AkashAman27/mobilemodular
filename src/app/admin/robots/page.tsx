'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { FileText, Save, RefreshCw, Eye, Bot, Shield, Search, Globe, AlertCircle, CheckCircle } from 'lucide-react'

interface RobotsConfig {
  content: string
  sitemap_urls: string[]
  user_agents: UserAgentRule[]
  last_updated: string
  validation_status: 'valid' | 'warning' | 'error'
  validation_messages: string[]
}

interface UserAgentRule {
  id: string
  user_agent: string
  allow: string[]
  disallow: string[]
  crawl_delay?: number
  is_active: boolean
}

const COMMON_USER_AGENTS = [
  'Googlebot',
  'Bingbot', 
  'Slurp', // Yahoo
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'facebookexternalhit',
  'Twitterbot',
  'LinkedInBot',
  '*' // All robots
]

const COMMON_PATTERNS = [
  '/admin/',
  '/api/',
  '/.git/',
  '/node_modules/',
  '/_next/',
  '/temp/',
  '/backup/',
  '/private/',
  '*.json',
  '*.xml',
  '*.txt'
]

export default function RobotsPage() {
  const [robotsConfig, setRobotsConfig] = useState<RobotsConfig>({
    content: '',
    sitemap_urls: [],
    user_agents: [],
    last_updated: new Date().toISOString(),
    validation_status: 'valid',
    validation_messages: []
  })
  
  const [manualEdit, setManualEdit] = useState(false)
  const [newSitemapUrl, setNewSitemapUrl] = useState('')
  const [selectedUserAgent, setSelectedUserAgent] = useState('')
  const [newAllowPattern, setNewAllowPattern] = useState('')
  const [newDisallowPattern, setNewDisallowPattern] = useState('')

  useEffect(() => {
    loadDefaultConfig()
  }, [])

  const loadDefaultConfig = () => {
    const defaultConfig: RobotsConfig = {
      content: generateRobotsContent([
        {
          id: '1',
          user_agent: '*',
          allow: ['/'],
          disallow: ['/admin/', '/api/', '/_next/', '/temp/'],
          is_active: true
        },
        {
          id: '2', 
          user_agent: 'Googlebot',
          allow: ['/'],
          disallow: ['/admin/', '/private/'],
          crawl_delay: 1,
          is_active: true
        }
      ], ['https://amanmodular.com/sitemap.xml']),
      sitemap_urls: ['https://amanmodular.com/sitemap.xml'],
      user_agents: [
        {
          id: '1',
          user_agent: '*',
          allow: ['/'],
          disallow: ['/admin/', '/api/', '/_next/', '/temp/'],
          is_active: true
        },
        {
          id: '2',
          user_agent: 'Googlebot', 
          allow: ['/'],
          disallow: ['/admin/', '/private/'],
          crawl_delay: 1,
          is_active: true
        }
      ],
      last_updated: new Date().toISOString(),
      validation_status: 'valid',
      validation_messages: []
    }
    setRobotsConfig(defaultConfig)
  }

  const generateRobotsContent = (userAgents: UserAgentRule[], sitemapUrls: string[]): string => {
    let content = '# Robots.txt for Aman Modular Buildings\n'
    content += '# Generated automatically - ' + new Date().toLocaleString() + '\n\n'

    userAgents.filter(ua => ua.is_active).forEach(ua => {
      content += `User-agent: ${ua.user_agent}\n`
      
      ua.allow.forEach(pattern => {
        content += `Allow: ${pattern}\n`
      })
      
      ua.disallow.forEach(pattern => {
        content += `Disallow: ${pattern}\n`
      })
      
      if (ua.crawl_delay) {
        content += `Crawl-delay: ${ua.crawl_delay}\n`
      }
      
      content += '\n'
    })

    sitemapUrls.forEach(url => {
      content += `Sitemap: ${url}\n`
    })

    return content.trim()
  }

  const validateRobots = (content: string): { status: 'valid' | 'warning' | 'error', messages: string[] } => {
    const messages: string[] = []
    let status: 'valid' | 'warning' | 'error' = 'valid'

    const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'))
    
    if (lines.length === 0) {
      return { status: 'error', messages: ['Robots.txt is empty'] }
    }

    let hasUserAgent = false
    let hasSitemap = false
    let currentUserAgent = ''

    lines.forEach((line, index) => {
      const trimmedLine = line.trim().toLowerCase()
      
      if (trimmedLine.startsWith('user-agent:')) {
        hasUserAgent = true
        currentUserAgent = line.split(':')[1]?.trim() || ''
      } else if (trimmedLine.startsWith('sitemap:')) {
        hasSitemap = true
        const sitemapUrl = line.split(':')[1]?.trim()
        if (sitemapUrl && !sitemapUrl.startsWith('http')) {
          messages.push(`Line ${index + 1}: Sitemap URL should be absolute`)
          status = 'warning'
        }
      } else if (trimmedLine.startsWith('disallow:')) {
        if (!currentUserAgent) {
          messages.push(`Line ${index + 1}: Disallow directive without User-agent`)
          status = 'error'
        }
      } else if (trimmedLine.startsWith('allow:')) {
        if (!currentUserAgent) {
          messages.push(`Line ${index + 1}: Allow directive without User-agent`)
          status = 'error'
        }
      }
    })

    if (!hasUserAgent) {
      messages.push('No User-agent directives found')
      status = 'error'
    }

    if (!hasSitemap) {
      messages.push('No Sitemap directives found - consider adding your sitemap URL')
      status = status === 'error' ? 'error' : 'warning'
    }

    if (messages.length === 0) {
      messages.push('Robots.txt is valid')
    }

    return { status, messages }
  }

  const updateValidation = (content: string) => {
    const validation = validateRobots(content)
    setRobotsConfig(prev => ({
      ...prev,
      validation_status: validation.status,
      validation_messages: validation.messages
    }))
  }

  const handleContentChange = (content: string) => {
    setRobotsConfig(prev => ({ ...prev, content, last_updated: new Date().toISOString() }))
    updateValidation(content)
  }

  const addUserAgent = () => {
    if (!selectedUserAgent) return
    
    const newRule: UserAgentRule = {
      id: Date.now().toString(),
      user_agent: selectedUserAgent,
      allow: ['/'],
      disallow: [],
      is_active: true
    }
    
    const updatedUserAgents = [...robotsConfig.user_agents, newRule]
    const newContent = generateRobotsContent(updatedUserAgents, robotsConfig.sitemap_urls)
    
    setRobotsConfig(prev => ({
      ...prev,
      user_agents: updatedUserAgents,
      content: newContent,
      last_updated: new Date().toISOString()
    }))
    
    setSelectedUserAgent('')
    updateValidation(newContent)
  }

  const updateUserAgent = (id: string, updates: Partial<UserAgentRule>) => {
    const updatedUserAgents = robotsConfig.user_agents.map(ua => 
      ua.id === id ? { ...ua, ...updates } : ua
    )
    const newContent = generateRobotsContent(updatedUserAgents, robotsConfig.sitemap_urls)
    
    setRobotsConfig(prev => ({
      ...prev,
      user_agents: updatedUserAgents,
      content: newContent,
      last_updated: new Date().toISOString()
    }))
    
    updateValidation(newContent)
  }

  const deleteUserAgent = (id: string) => {
    const updatedUserAgents = robotsConfig.user_agents.filter(ua => ua.id !== id)
    const newContent = generateRobotsContent(updatedUserAgents, robotsConfig.sitemap_urls)
    
    setRobotsConfig(prev => ({
      ...prev,
      user_agents: updatedUserAgents,
      content: newContent,
      last_updated: new Date().toISOString()
    }))
    
    updateValidation(newContent)
  }

  const addSitemapUrl = () => {
    if (!newSitemapUrl) return
    
    const updatedSitemaps = [...robotsConfig.sitemap_urls, newSitemapUrl]
    const newContent = generateRobotsContent(robotsConfig.user_agents, updatedSitemaps)
    
    setRobotsConfig(prev => ({
      ...prev,
      sitemap_urls: updatedSitemaps,
      content: newContent,
      last_updated: new Date().toISOString()
    }))
    
    setNewSitemapUrl('')
    updateValidation(newContent)
  }

  const removeSitemapUrl = (url: string) => {
    const updatedSitemaps = robotsConfig.sitemap_urls.filter(u => u !== url)
    const newContent = generateRobotsContent(robotsConfig.user_agents, updatedSitemaps)
    
    setRobotsConfig(prev => ({
      ...prev,
      sitemap_urls: updatedSitemaps,
      content: newContent,
      last_updated: new Date().toISOString()
    }))
    
    updateValidation(newContent)
  }

  const addPattern = (id: string, type: 'allow' | 'disallow', pattern: string) => {
    if (!pattern) return
    
    const updatedUserAgents = robotsConfig.user_agents.map(ua => {
      if (ua.id === id) {
        return {
          ...ua,
          [type]: [...ua[type], pattern]
        }
      }
      return ua
    })
    
    const newContent = generateRobotsContent(updatedUserAgents, robotsConfig.sitemap_urls)
    
    setRobotsConfig(prev => ({
      ...prev,
      user_agents: updatedUserAgents,
      content: newContent,
      last_updated: new Date().toISOString()
    }))
    
    if (type === 'allow') setNewAllowPattern('')
    else setNewDisallowPattern('')
    
    updateValidation(newContent)
  }

  const removePattern = (id: string, type: 'allow' | 'disallow', pattern: string) => {
    const updatedUserAgents = robotsConfig.user_agents.map(ua => {
      if (ua.id === id) {
        return {
          ...ua,
          [type]: ua[type].filter(p => p !== pattern)
        }
      }
      return ua
    })
    
    const newContent = generateRobotsContent(updatedUserAgents, robotsConfig.sitemap_urls)
    
    setRobotsConfig(prev => ({
      ...prev,
      user_agents: updatedUserAgents,
      content: newContent,
      last_updated: new Date().toISOString()
    }))
    
    updateValidation(newContent)
  }

  const saveRobots = async () => {
    // In a real implementation, this would save to the server
    alert(`Robots.txt saved successfully!\n\nIn production, this would:\n- Save robots.txt to the public directory\n- Update server configuration\n- Notify search engines of changes`)
  }

  const testRobots = async () => {
    // Simulate robots.txt testing
    alert(`Testing robots.txt...\n\nIn a real implementation, this would:\n- Validate syntax and directives\n- Test against common bot behaviors\n- Check for conflicts and issues\n- Verify sitemap accessibility`)
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Robots.txt Management</h1>
            <p className="text-gray-600 mt-1">Manage search engine crawling rules and directives</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={testRobots} variant="outline">
              <Search className="h-4 w-4 mr-2" />
              Test
            </Button>
            <Button onClick={() => setManualEdit(!manualEdit)} variant="outline">
              {manualEdit ? <Bot className="h-4 w-4 mr-2" /> : <FileText className="h-4 w-4 mr-2" />}
              {manualEdit ? 'Visual Editor' : 'Manual Edit'}
            </Button>
            <Button onClick={saveRobots} className="bg-blue-600 hover:bg-blue-700">
              <Save className="h-4 w-4 mr-2" />
              Save Robots.txt
            </Button>
          </div>
        </div>

        {/* Validation Status */}
        <div className="mb-6">
          <Card className={`border-l-4 ${
            robotsConfig.validation_status === 'valid' ? 'border-l-green-500 bg-green-50' :
            robotsConfig.validation_status === 'warning' ? 'border-l-yellow-500 bg-yellow-50' :
            'border-l-red-500 bg-red-50'
          }`}>
            <CardContent className="p-4">
              <div className="flex items-start">
                {robotsConfig.validation_status === 'valid' && <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 mr-3" />}
                {robotsConfig.validation_status === 'warning' && <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5 mr-3" />}
                {robotsConfig.validation_status === 'error' && <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-3" />}
                <div>
                  <h4 className={`font-medium ${
                    robotsConfig.validation_status === 'valid' ? 'text-green-800' :
                    robotsConfig.validation_status === 'warning' ? 'text-yellow-800' :
                    'text-red-800'
                  }`}>
                    Validation {robotsConfig.validation_status === 'valid' ? 'Passed' : 
                              robotsConfig.validation_status === 'warning' ? 'Warnings' : 'Errors'}
                  </h4>
                  <ul className={`text-sm mt-1 ${
                    robotsConfig.validation_status === 'valid' ? 'text-green-700' :
                    robotsConfig.validation_status === 'warning' ? 'text-yellow-700' :
                    'text-red-700'
                  }`}>
                    {robotsConfig.validation_messages.map((message, index) => (
                      <li key={index}>{message}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Visual Editor / Manual Editor */}
          <div>
            {!manualEdit ? (
              /* Visual Editor */
              <div className="space-y-6">
                {/* User Agents Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Bot className="h-5 w-5 mr-2" />
                      User Agent Rules
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Add new user agent */}
                    <div className="flex gap-2">
                      <select
                        value={selectedUserAgent}
                        onChange={(e) => setSelectedUserAgent(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select User Agent</option>
                        {COMMON_USER_AGENTS.map(ua => (
                          <option key={ua} value={ua}>{ua}</option>
                        ))}
                      </select>
                      <Button onClick={addUserAgent} disabled={!selectedUserAgent}>
                        Add
                      </Button>
                    </div>

                    {/* User agent rules list */}
                    <div className="space-y-4">
                      {robotsConfig.user_agents.map(ua => (
                        <div key={ua.id} className="border rounded-lg p-4 bg-gray-50">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">User-agent: {ua.user_agent}</h4>
                            <div className="flex items-center gap-2">
                              <label className="flex items-center gap-1">
                                <input
                                  type="checkbox"
                                  checked={ua.is_active}
                                  onChange={(e) => updateUserAgent(ua.id, { is_active: e.target.checked })}
                                  className="rounded"
                                />
                                <span className="text-sm">Active</span>
                              </label>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => deleteUserAgent(ua.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                Delete
                              </Button>
                            </div>
                          </div>

                          {/* Crawl delay */}
                          <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Crawl Delay (seconds)</label>
                            <Input
                              type="number"
                              value={ua.crawl_delay || ''}
                              onChange={(e) => updateUserAgent(ua.id, { crawl_delay: e.target.value ? parseInt(e.target.value) : undefined })}
                              placeholder="Optional"
                              className="w-24"
                            />
                          </div>

                          {/* Allow patterns */}
                          <div className="mb-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Allow Patterns</label>
                            <div className="space-y-1">
                              {ua.allow.map((pattern, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <code className="flex-1 text-sm bg-green-100 px-2 py-1 rounded">{pattern}</code>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removePattern(ua.id, 'allow', pattern)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                              <div className="flex gap-2">
                                <Input
                                  value={newAllowPattern}
                                  onChange={(e) => setNewAllowPattern(e.target.value)}
                                  placeholder="e.g., /, /public/"
                                  className="flex-1"
                                />
                                <Button
                                  onClick={() => addPattern(ua.id, 'allow', newAllowPattern)}
                                  disabled={!newAllowPattern}
                                >
                                  Add Allow
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Disallow patterns */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Disallow Patterns</label>
                            <div className="space-y-1">
                              {ua.disallow.map((pattern, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <code className="flex-1 text-sm bg-red-100 px-2 py-1 rounded">{pattern}</code>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removePattern(ua.id, 'disallow', pattern)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              ))}
                              <div className="flex gap-2">
                                <select
                                  value={newDisallowPattern}
                                  onChange={(e) => setNewDisallowPattern(e.target.value)}
                                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                  <option value="">Select common pattern or type custom</option>
                                  {COMMON_PATTERNS.map(pattern => (
                                    <option key={pattern} value={pattern}>{pattern}</option>
                                  ))}
                                </select>
                                <Button
                                  onClick={() => addPattern(ua.id, 'disallow', newDisallowPattern)}
                                  disabled={!newDisallowPattern}
                                >
                                  Add Disallow
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Sitemaps Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Globe className="h-5 w-5 mr-2" />
                      Sitemap URLs
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newSitemapUrl}
                        onChange={(e) => setNewSitemapUrl(e.target.value)}
                        placeholder="https://example.com/sitemap.xml"
                        className="flex-1"
                      />
                      <Button onClick={addSitemapUrl} disabled={!newSitemapUrl}>
                        Add Sitemap
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {robotsConfig.sitemap_urls.map((url, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <code className="flex-1 text-sm bg-blue-100 px-2 py-1 rounded">{url}</code>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeSitemapUrl(url)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              /* Manual Editor */
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2" />
                    Manual Edit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={robotsConfig.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    rows={20}
                    className="font-mono text-sm"
                    placeholder="Enter robots.txt content manually..."
                  />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Preview */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Eye className="h-5 w-5 mr-2" />
                    Robots.txt Preview
                  </div>
                  <span className="text-sm text-gray-500">
                    Last updated: {new Date(robotsConfig.last_updated).toLocaleString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="text-xs font-mono bg-gray-100 p-4 rounded-lg overflow-auto whitespace-pre-wrap">
                  {robotsConfig.content}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
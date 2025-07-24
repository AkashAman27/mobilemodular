'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { 
  Calculator, 
  Zap, 
  TrendingUp, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle, 
  AlertTriangle,
  Lightbulb,
  CloudSun
} from 'lucide-react'

interface CalculatorData {
  buildingType: string
  occupancy: number
  location: string
  zipCode: string
  features: string[]
  timeline: string
}

interface AIResult {
  recommendedSize: number
  estimatedCost: {
    base: number
    delivery: number
    permits: number
    features: number
    total: number
  }
  timeline: {
    planning: number
    permits: number
    delivery: number
    installation: number
    total: number
  }
  suggestions: string[]
  alternatives: Array<{
    type: string
    savings: number
    description: string
  }>
  confidence: number
}

interface WeatherOptimization {
  currentConditions: {
    temperature: number
    conditions: string
    windSpeed: number
    precipitation: number
  }
  deliveryRecommendations: {
    optimalWindows: Array<{
      date: string
      timeSlot: string
      suitability: 'excellent' | 'good' | 'fair' | 'poor'
      reason: string
    }>
    riskFactors: string[]
  }
  costImpact: {
    weatherSurcharge: number
    rushDelivery: boolean
    insuranceRequired: boolean
  }
}

export default function AISmartCalculator() {
  const [formData, setFormData] = useState<CalculatorData>({
    buildingType: '',
    occupancy: 0,
    location: '',
    zipCode: '',
    features: [],
    timeline: ''
  })
  
  const [aiResult, setAiResult] = useState<AIResult | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherOptimization | null>(null)
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  
  const sessionId = React.useMemo(() => 
    'session_' + Math.random().toString(36).substr(2, 9), []
  )

  const handleCalculate = async () => {
    if (!formData.buildingType || !formData.occupancy || !formData.zipCode) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    
    try {
      // Track analytics event
      await fetch('/api/ai/customer-analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          eventType: 'calculator_use',
          eventData: { 
            calculatorType: 'ai_smart_calculator',
            formData 
          },
          pageUrl: window.location.pathname
        })
      })

      // Get AI calculations
      const aiResponse = await fetch('/api/ai/smart-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, sessionId })
      })
      
      const aiData = await aiResponse.json()
      if (aiData.success) {
        setAiResult(aiData.data)
      }

      // Get weather optimization if location provided
      if (formData.zipCode) {
        const weatherResponse = await fetch('/api/ai/weather-optimization', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            zipCode: formData.zipCode,
            city: formData.location.split(',')[0],
            state: formData.location.split(',')[1]?.trim(),
            deliveryType: formData.timeline === 'urgent' ? 'expedited' : 'standard'
          })
        })
        
        const weatherResult = await weatherResponse.json()
        if (weatherResult.success) {
          setWeatherData(weatherResult.data)
        }
      }
      
      setStep(2)
    } catch (error) {
      console.error('Calculation error:', error)
      alert('Calculation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }))
  }

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount)

  if (step === 2 && aiResult) {
    return (
      <div className="space-y-6">
        {/* Results Header */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
          <CardContent className="p-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-2">🤖 AI-Powered Results</h3>
                <p className="text-blue-100">
                  Based on {aiResult.confidence > 0.8 ? 'high-confidence' : 'moderate-confidence'} analysis
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold">{formatCurrency(aiResult.estimatedCost.total)}</div>
                <div className="text-blue-200">{aiResult.recommendedSize} sq ft</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cost Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-green-600" />
                Cost Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {Object.entries(aiResult.estimatedCost).map(([key, value]) => {
                  if (key === 'total') return null
                  return (
                    <div key={key} className="flex justify-between items-center">
                      <span className="capitalize">{key.replace('_', ' ')}</span>
                      <span className="font-semibold">{formatCurrency(value)}</span>
                    </div>
                  )
                })}
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Investment</span>
                  <span className="text-green-600">{formatCurrency(aiResult.estimatedCost.total)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="mr-2 h-5 w-5 text-blue-600" />
                Project Timeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {Object.entries(aiResult.timeline).map(([key, value]) => {
                  if (key === 'total') return null
                  return (
                    <div key={key} className="flex justify-between items-center">
                      <span className="capitalize">{key}</span>
                      <span className="font-semibold">{value} days</span>
                    </div>
                  )
                })}
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Timeline</span>
                  <span className="text-blue-600">{aiResult.timeline.total} days</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Weather Optimization */}
          {weatherData && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CloudSun className="mr-2 h-5 w-5 text-orange-600" />
                  🌤️ Weather-Optimized Delivery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Current Conditions</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Temperature:</span>
                        <span>{weatherData.currentConditions.temperature}°F</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conditions:</span>
                        <span>{weatherData.currentConditions.conditions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Wind Speed:</span>
                        <span>{weatherData.currentConditions.windSpeed} mph</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Optimal Delivery Windows</h4>
                    <div className="space-y-2">
                      {weatherData.deliveryRecommendations.optimalWindows.slice(0, 3).map((window, index) => (
                        <div key={index} className="flex items-center justify-between text-sm">
                          <span>{new Date(window.date).toLocaleDateString()}</span>
                          <Badge variant={
                            window.suitability === 'excellent' ? 'default' : 
                            window.suitability === 'good' ? 'secondary' : 'outline'
                          }>
                            {window.suitability}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {weatherData.costImpact.weatherSurcharge > 0 && (
                  <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center text-yellow-800">
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Weather surcharge: {(weatherData.costImpact.weatherSurcharge * 100).toFixed(1)}%
                      {weatherData.costImpact.rushDelivery && ' (Rush delivery recommended)'}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* AI Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-600" />
              🧠 AI Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3">Smart Suggestions</h4>
                <div className="space-y-2">
                  {aiResult.suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-start">
                      <CheckCircle className="mr-2 h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{suggestion}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Alternative Options</h4>
                <div className="space-y-3">
                  {aiResult.alternatives.map((alt, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">{alt.type}</span>
                        <span className="text-green-600 font-semibold text-sm">
                          Save {formatCurrency(alt.savings)}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600">{alt.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={() => setStep(1)} variant="outline">
            Recalculate
          </Button>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800">
            <Link href="/quote">
              Get Detailed Quote
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/contact">
              Schedule Consultation
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 overflow-visible">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Zap className="mr-3 h-6 w-6 text-blue-600" />
          🤖 AI-Powered Smart Calculator
        </CardTitle>
        <p className="text-gray-600">
          Get intelligent recommendations based on AI analysis of your requirements, location, and current market conditions.
        </p>
      </CardHeader>
      <CardContent className="space-y-6 overflow-visible">
        <div className="space-y-8">
          {/* Row 1: Building Type and ZIP Code */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="mb-4">
              <Label htmlFor="buildingType" className="block mb-2 text-sm font-medium">Building Type *</Label>
              <Select onValueChange={(value) => setFormData(prev => ({...prev, buildingType: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select building type" />
                </SelectTrigger>
                <SelectContent 
                  className="z-[9999] max-h-48 overflow-y-auto bg-white border shadow-lg"
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={8}
                  avoidCollisions={true}
                  collisionPadding={10}
                >
                  <SelectItem value="office">Office Building</SelectItem>
                  <SelectItem value="classroom">Portable Classroom</SelectItem>
                  <SelectItem value="storage">Storage Unit</SelectItem>
                  <SelectItem value="healthcare">Healthcare Facility</SelectItem>
                  <SelectItem value="retail">Retail Space</SelectItem>
                  <SelectItem value="restaurant">Restaurant</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="zipCode" className="block mb-2 text-sm font-medium">ZIP Code *</Label>
              <Input
                placeholder="12345"
                maxLength={5}
                value={formData.zipCode}
                onChange={(e) => setFormData(prev => ({...prev, zipCode: e.target.value}))}
              />
            </div>
          </div>

          {/* Row 2: Occupancy and Timeline */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="occupancy" className="block mb-2 text-sm font-medium">Number of Occupants *</Label>
              <Input
                type="number"
                placeholder="25"
                value={formData.occupancy || ''}
                onChange={(e) => setFormData(prev => ({...prev, occupancy: parseInt(e.target.value) || 0}))}
              />
            </div>

            <div>
              <Label htmlFor="timeline" className="block mb-2 text-sm font-medium">Timeline</Label>
              <Select onValueChange={(value) => setFormData(prev => ({...prev, timeline: value}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Project timeline" />
                </SelectTrigger>
                <SelectContent 
                  className="z-[9999] max-h-48 overflow-y-auto bg-white border shadow-lg"
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={8}
                  avoidCollisions={true}
                  collisionPadding={10}
                >
                  <SelectItem value="urgent">Urgent (ASAP)</SelectItem>
                  <SelectItem value="standard">Standard (4-6 weeks)</SelectItem>
                  <SelectItem value="flexible">Flexible (2-3 months)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Location (full width) */}
          <div>
            <Label htmlFor="location" className="block mb-2 text-sm font-medium">State</Label>
            <Select onValueChange={(value) => setFormData(prev => ({...prev, location: value}))}>
              <SelectTrigger>
                <SelectValue placeholder="Select your state" />
              </SelectTrigger>
              <SelectContent 
                className="z-[9999] max-h-48 overflow-y-auto bg-white border shadow-lg"
                position="popper"
                side="bottom"
                align="start"
                sideOffset={8}
                avoidCollisions={true}
                collisionPadding={10}
              >
                <SelectItem value="AL">Alabama</SelectItem>
                <SelectItem value="AK">Alaska</SelectItem>
                <SelectItem value="AZ">Arizona</SelectItem>
                <SelectItem value="AR">Arkansas</SelectItem>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="CO">Colorado</SelectItem>
                <SelectItem value="CT">Connecticut</SelectItem>
                <SelectItem value="DE">Delaware</SelectItem>
                <SelectItem value="FL">Florida</SelectItem>
                <SelectItem value="GA">Georgia</SelectItem>
                <SelectItem value="HI">Hawaii</SelectItem>
                <SelectItem value="ID">Idaho</SelectItem>
                <SelectItem value="IL">Illinois</SelectItem>
                <SelectItem value="IN">Indiana</SelectItem>
                <SelectItem value="IA">Iowa</SelectItem>
                <SelectItem value="KS">Kansas</SelectItem>
                <SelectItem value="KY">Kentucky</SelectItem>
                <SelectItem value="LA">Louisiana</SelectItem>
                <SelectItem value="ME">Maine</SelectItem>
                <SelectItem value="MD">Maryland</SelectItem>
                <SelectItem value="MA">Massachusetts</SelectItem>
                <SelectItem value="MI">Michigan</SelectItem>
                <SelectItem value="MN">Minnesota</SelectItem>
                <SelectItem value="MS">Mississippi</SelectItem>
                <SelectItem value="MO">Missouri</SelectItem>
                <SelectItem value="MT">Montana</SelectItem>
                <SelectItem value="NE">Nebraska</SelectItem>
                <SelectItem value="NV">Nevada</SelectItem>
                <SelectItem value="NH">New Hampshire</SelectItem>
                <SelectItem value="NJ">New Jersey</SelectItem>
                <SelectItem value="NM">New Mexico</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
                <SelectItem value="NC">North Carolina</SelectItem>
                <SelectItem value="ND">North Dakota</SelectItem>
                <SelectItem value="OH">Ohio</SelectItem>
                <SelectItem value="OK">Oklahoma</SelectItem>
                <SelectItem value="OR">Oregon</SelectItem>
                <SelectItem value="PA">Pennsylvania</SelectItem>
                <SelectItem value="RI">Rhode Island</SelectItem>
                <SelectItem value="SC">South Carolina</SelectItem>
                <SelectItem value="SD">South Dakota</SelectItem>
                <SelectItem value="TN">Tennessee</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
                <SelectItem value="UT">Utah</SelectItem>
                <SelectItem value="VT">Vermont</SelectItem>
                <SelectItem value="VA">Virginia</SelectItem>
                <SelectItem value="WA">Washington</SelectItem>
                <SelectItem value="WV">West Virginia</SelectItem>
                <SelectItem value="WI">Wisconsin</SelectItem>
                <SelectItem value="WY">Wyoming</SelectItem>
                <SelectItem value="DC">Washington, D.C.</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Row 4: Special Features */}
          <div>
            <Label className="block mb-3 text-sm font-medium">Special Features</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[
                'HVAC Upgrade',
                'Security System',
                'Accessibility Features',
                'Technology Package',
                'Energy Efficiency',
                'Custom Interior'
              ].map(feature => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => handleFeatureToggle(feature.toLowerCase().replace(/\s+/g, '_'))}
                  className={`p-3 text-sm rounded-lg border transition-colors text-center ${
                    formData.features.includes(feature.toLowerCase().replace(/\s+/g, '_'))
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 hover:border-blue-300'
                  }`}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            onClick={handleCalculate} 
            disabled={loading || !formData.buildingType || !formData.occupancy || formData.occupancy <= 0 || !formData.zipCode}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6"
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                🤖 AI is analyzing your requirements...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <TrendingUp className="mr-2 h-5 w-5" />
                Get AI-Powered Analysis
              </div>
            )}
          </Button>
        </div>

        <div className="flex items-center justify-center text-sm text-gray-500 pt-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Zap className="h-4 w-4 mr-1 text-blue-500" />
              AI Analysis
            </span>
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1 text-green-500" />
              Location Optimization
            </span>
            <span className="flex items-center">
              <CloudSun className="h-4 w-4 mr-1 text-orange-500" />
              Weather Integration
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
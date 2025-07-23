'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { 
  Calculator, TrendingDown, Zap, Clock, Truck, Shield, 
  DollarSign, Calendar, MapPin, Building, Users, Star,
  Sparkles, Brain, CheckCircle, AlertCircle, Info,
  Download, Send, Save, Share2, Plus, Minus, X
} from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Image from 'next/image'

interface QuoteItem {
  id: string
  building: any // Replace with proper building type
  quantity: number
  duration_months: number
  start_date: string
  delivery_location: string
  special_requirements: string[]
  accessories: string[]
}

interface SmartQuoteGeneratorProps {
  initialItems?: any[]
  onSaveQuote: (quote: any) => void
  onSubmitQuote: (quote: any) => void
}

interface PricingBreakdown {
  base_monthly: number
  setup_fees: number
  delivery_fees: number
  accessories_cost: number
  bulk_discount: number
  duration_discount: number
  seasonal_discount: number
  total_monthly: number
  total_one_time: number
  grand_total: number
}

interface AIRecommendation {
  type: 'cost_optimization' | 'bundle_suggestion' | 'timing_optimization' | 'location_optimization'
  title: string
  description: string
  potential_savings: number
  action_required: boolean
  suggested_changes: any[]
}

export default function SmartQuoteGenerator({
  initialItems = [],
  onSaveQuote,
  onSubmitQuote
}: SmartQuoteGeneratorProps) {
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([])
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    project_type: '',
    budget_range: '',
    timeline: '',
    special_notes: ''
  })
  const [pricingBreakdown, setPricingBreakdown] = useState<PricingBreakdown>({
    base_monthly: 0,
    setup_fees: 0,
    delivery_fees: 0,
    accessories_cost: 0,
    bulk_discount: 0,
    duration_discount: 0,
    seasonal_discount: 0,
    total_monthly: 0,
    total_one_time: 0,
    grand_total: 0
  })
  const [aiRecommendations, setAiRecommendations] = useState<AIRecommendation[]>([])
  const [isCalculating, setIsCalculating] = useState(false)

  // Initialize quote items from props
  useEffect(() => {
    if (initialItems.length > 0) {
      const items = initialItems.map(building => ({
        id: building.id,
        building,
        quantity: 1,
        duration_months: 12,
        start_date: new Date().toISOString().split('T')[0],
        delivery_location: `${building.location_city}, ${building.location_state}`,
        special_requirements: [],
        accessories: []
      }))
      setQuoteItems(items)
    }
  }, [initialItems])

  // Recalculate pricing when items change
  useEffect(() => {
    calculatePricing()
    generateAIRecommendations()
  }, [quoteItems, customerInfo])

  const calculatePricing = async () => {
    setIsCalculating(true)
    
    // Simulate AI-powered pricing calculation
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    let baseMonthly = 0
    let setupFees = 0
    let deliveryFees = 0
    let accessoriesCost = 0
    
    quoteItems.forEach(item => {
      baseMonthly += item.building.base_price_monthly * item.quantity
      setupFees += item.building.setup_fee * item.quantity
      deliveryFees += item.building.delivery_fee * item.quantity
      // Add accessories cost calculation
    })
    
    // Calculate AI-powered discounts
    const bulkDiscount = quoteItems.length >= 3 ? baseMonthly * 0.1 : 0
    const durationDiscount = quoteItems.some(item => item.duration_months >= 12) ? baseMonthly * 0.05 : 0
    const seasonalDiscount = new Date().getMonth() >= 10 || new Date().getMonth() <= 2 ? baseMonthly * 0.03 : 0
    
    const totalMonthly = baseMonthly - bulkDiscount - durationDiscount - seasonalDiscount
    const totalOneTime = setupFees + deliveryFees + accessoriesCost
    
    setPricingBreakdown({
      base_monthly: baseMonthly,
      setup_fees: setupFees,
      delivery_fees: deliveryFees,
      accessories_cost: accessoriesCost,
      bulk_discount: bulkDiscount,
      duration_discount: durationDiscount,
      seasonal_discount: seasonalDiscount,
      total_monthly: totalMonthly,
      total_one_time: totalOneTime,
      grand_total: totalMonthly + totalOneTime
    })
    
    setIsCalculating(false)
  }

  const generateAIRecommendations = () => {
    const recommendations: AIRecommendation[] = []
    
    // Cost optimization recommendations
    if (quoteItems.length >= 2 && pricingBreakdown.bulk_discount === 0) {
      recommendations.push({
        type: 'cost_optimization',
        title: 'Bundle Discount Available',
        description: 'Add one more building to qualify for a 10% bulk discount',
        potential_savings: pricingBreakdown.base_monthly * 0.1,
        action_required: true,
        suggested_changes: ['Add similar building']
      })
    }
    
    // Duration optimization
    if (quoteItems.some(item => item.duration_months < 12)) {
      recommendations.push({
        type: 'timing_optimization',
        title: 'Extended Term Discount',
        description: 'Extend rental to 12+ months for 5% discount',
        potential_savings: pricingBreakdown.base_monthly * 0.05,
        action_required: false,
        suggested_changes: ['Extend rental duration']
      })
    }
    
    // Seasonal recommendations
    const currentMonth = new Date().getMonth()
    if (currentMonth >= 3 && currentMonth <= 9) {
      recommendations.push({
        type: 'timing_optimization',
        title: 'Winter Discount Coming',
        description: 'Wait until November for 3% seasonal discount',
        potential_savings: pricingBreakdown.base_monthly * 0.03,
        action_required: false,
        suggested_changes: ['Delay start date to November']
      })
    }
    
    setAiRecommendations(recommendations)
  }

  const updateQuoteItem = (itemId: string, updates: Partial<QuoteItem>) => {
    setQuoteItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, ...updates } : item
    ))
  }

  const removeQuoteItem = (itemId: string) => {
    setQuoteItems(prev => prev.filter(item => item.id !== itemId))
  }

  const addAccessory = (itemId: string, accessory: string) => {
    updateQuoteItem(itemId, {
      accessories: [...quoteItems.find(i => i.id === itemId)?.accessories || [], accessory]
    })
  }

  const availableAccessories = [
    { name: 'Furniture Package', price: 150 },
    { name: 'Security System', price: 200 },
    { name: 'Generator Hookup', price: 300 },
    { name: 'Extra Parking', price: 100 },
    { name: 'WiFi Package', price: 75 },
    { name: 'Cleaning Service', price: 125 }
  ]

  const exportQuote = () => {
    const quoteData = {
      id: `QUOTE-${Date.now()}`,
      created_at: new Date().toISOString(),
      customer: customerInfo,
      items: quoteItems,
      pricing: pricingBreakdown,
      recommendations: aiRecommendations,
      total_savings: aiRecommendations.reduce((sum, rec) => sum + rec.potential_savings, 0)
    }
    
    const dataStr = JSON.stringify(quoteData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `quote-${quoteData.id}.json`
    link.click()
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-600 flex items-center">
            <Calculator className="h-8 w-8 mr-3" />
            Smart Quote Generator
          </h1>
          <p className="text-gray-600 mt-2">AI-powered pricing optimization and bundle recommendations</p>
        </div>
        
        <div className="flex gap-3">
          <Button variant="outline" onClick={exportQuote}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={() => onSaveQuote({ quoteItems, customerInfo, pricingBreakdown })}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button onClick={() => onSubmitQuote({ quoteItems, customerInfo, pricingBreakdown })}>
            <Send className="h-4 w-4 mr-2" />
            Submit Quote
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Quote Builder */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="Full Name"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                />
                <Input
                  placeholder="Company Name"
                  value={customerInfo.company}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, company: e.target.value }))}
                />
                <Input
                  placeholder="Email Address"
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                />
                <Input
                  placeholder="Phone Number"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                />
                <Select value={customerInfo.project_type} onValueChange={(value) => setCustomerInfo(prev => ({ ...prev, project_type: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Project Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="construction">Construction</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="government">Government</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={customerInfo.budget_range} onValueChange={(value) => setCustomerInfo(prev => ({ ...prev, budget_range: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Budget Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="under-5k">Under $5,000/month</SelectItem>
                    <SelectItem value="5k-10k">$5,000 - $10,000/month</SelectItem>
                    <SelectItem value="10k-25k">$10,000 - $25,000/month</SelectItem>
                    <SelectItem value="25k-50k">$25,000 - $50,000/month</SelectItem>
                    <SelectItem value="over-50k">Over $50,000/month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Textarea
                placeholder="Special notes or requirements..."
                className="mt-4"
                value={customerInfo.special_notes}
                onChange={(e) => setCustomerInfo(prev => ({ ...prev, special_notes: e.target.value }))}
              />
            </CardContent>
          </Card>

          {/* Quote Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Buildings in Quote ({quoteItems.length})
                </span>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Building
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {quoteItems.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-lg p-4"
                  >
                    <div className="flex items-start gap-4">
                      <div className="relative w-24 h-16 rounded overflow-hidden flex-shrink-0">
                        <Image
                          src={item.building.main_image_url || '/images/placeholder-building.jpg'}
                          alt={item.building.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold text-navy-600">{item.building.name}</h4>
                            <p className="text-sm text-gray-600">{item.building.model_number}</p>
                            <p className="text-sm text-gray-500">
                              {item.building.square_feet} sq ft • {item.building.location_city}, {item.building.location_state}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeQuoteItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <label className="text-xs text-gray-600">Quantity</label>
                            <div className="flex items-center mt-1">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuoteItem(item.id, { quantity: Math.max(1, item.quantity - 1) })}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="mx-3 font-medium">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuoteItem(item.id, { quantity: item.quantity + 1 })}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-600">Duration (months)</label>
                            <Input
                              type="number"
                              value={item.duration_months}
                              onChange={(e) => updateQuoteItem(item.id, { duration_months: parseInt(e.target.value) || 1 })}
                              className="h-8 mt-1"
                              min="1"
                            />
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-600">Start Date</label>
                            <Input
                              type="date"
                              value={item.start_date}
                              onChange={(e) => updateQuoteItem(item.id, { start_date: e.target.value })}
                              className="h-8 mt-1"
                            />
                          </div>
                          
                          <div>
                            <label className="text-xs text-gray-600">Monthly Cost</label>
                            <div className="mt-1 text-lg font-bold text-green-600">
                              ${(item.building.base_price_monthly * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        
                        {/* Accessories */}
                        <div className="mt-4">
                          <label className="text-xs text-gray-600">Add-ons & Accessories</label>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {availableAccessories.map((accessory) => (
                              <Button
                                key={accessory.name}
                                variant={item.accessories.includes(accessory.name) ? "default" : "outline"}
                                size="sm"
                                onClick={() => {
                                  if (item.accessories.includes(accessory.name)) {
                                    updateQuoteItem(item.id, {
                                      accessories: item.accessories.filter(a => a !== accessory.name)
                                    })
                                  } else {
                                    addAccessory(item.id, accessory.name)
                                  }
                                }}
                                className="text-xs"
                              >
                                {accessory.name} (+${accessory.price})
                              </Button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {quoteItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Building className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p>No buildings added to quote yet</p>
                    <Button className="mt-3">Browse Inventory</Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Sidebar */}
        <div className="space-y-6">
          {/* AI Recommendations */}
          {aiRecommendations.length > 0 && (
            <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Brain className="h-5 w-5 mr-2" />
                  AI Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {aiRecommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-3 rounded-lg border border-purple-100"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-1 rounded-full ${
                          rec.action_required ? 'bg-orange-100' : 'bg-green-100'
                        }`}>
                          {rec.action_required ? (
                            <AlertCircle className="h-4 w-4 text-orange-600" />
                          ) : (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-gray-800">{rec.title}</h4>
                          <p className="text-xs text-gray-600 mt-1">{rec.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-medium text-green-600">
                              Save ${rec.potential_savings.toLocaleString()}
                            </span>
                            {rec.action_required && (
                              <Button size="sm" variant="outline" className="text-xs h-6">
                                Apply
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Pricing Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center">
                  <DollarSign className="h-5 w-5 mr-2" />
                  Pricing Breakdown
                </span>
                {isCalculating && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Calculator className="h-5 w-5 text-blue-500" />
                  </motion.div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Monthly</span>
                  <span className="font-medium">${pricingBreakdown.base_monthly.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Setup Fees</span>
                  <span className="font-medium">${pricingBreakdown.setup_fees.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fees</span>
                  <span className="font-medium">${pricingBreakdown.delivery_fees.toLocaleString()}</span>
                </div>
                
                {pricingBreakdown.accessories_cost > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Accessories</span>
                    <span className="font-medium">${pricingBreakdown.accessories_cost.toLocaleString()}</span>
                  </div>
                )}
                
                {/* Discounts */}
                {pricingBreakdown.bulk_discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Bulk Discount</span>
                    <span>-${pricingBreakdown.bulk_discount.toLocaleString()}</span>
                  </div>
                )}
                
                {pricingBreakdown.duration_discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Duration Discount</span>
                    <span>-${pricingBreakdown.duration_discount.toLocaleString()}</span>
                  </div>
                )}
                
                {pricingBreakdown.seasonal_discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Seasonal Discount</span>
                    <span>-${pricingBreakdown.seasonal_discount.toLocaleString()}</span>
                  </div>
                )}
                
                <hr />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Monthly</span>
                  <span className="text-navy-600">${pricingBreakdown.total_monthly.toLocaleString()}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">One-time Costs</span>
                  <span className="font-medium">${pricingBreakdown.total_one_time.toLocaleString()}</span>
                </div>
                
                <div className="bg-navy-50 p-3 rounded-lg">
                  <div className="flex justify-between text-xl font-bold text-navy-700">
                    <span>Grand Total (1st Month)</span>
                    <span>${pricingBreakdown.grand_total.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Then ${pricingBreakdown.total_monthly.toLocaleString()}/month thereafter
                  </p>
                </div>
                
                {/* Total Savings */}
                {aiRecommendations.length > 0 && (
                  <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between">
                      <span className="text-green-700 font-medium">Potential Savings</span>
                      <span className="text-green-700 font-bold">
                        ${aiRecommendations.reduce((sum, rec) => sum + rec.potential_savings, 0).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-green-600 mt-1">
                      Apply AI recommendations above
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Quote Link
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Site Visit
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Calculator className="h-4 w-4 mr-2" />
                  Compare Financing Options
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
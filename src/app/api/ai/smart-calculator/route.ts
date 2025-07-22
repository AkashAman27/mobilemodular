import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface CalculatorRequest {
  buildingType: string
  occupancy: number
  location: string
  zipCode: string
  features: string[]
  timeline: string
  sessionId: string
}

interface AICalculation {
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

export async function POST(request: NextRequest) {
  try {
    const data: CalculatorRequest = await request.json()
    const supabase = createClient()
    
    // Get AI configuration data
    const { data: configs } = await supabase
      .from('ai_configurations')
      .select('config_key, config_value')
      .eq('is_active', true)

    const configMap = configs?.reduce((acc: any, config) => {
      acc[config.config_key] = config.config_value
      return acc
    }, {}) || {}

    // AI-powered calculations
    const aiResult = await calculateWithAI(data, configMap)
    
    // Store calculation session
    await supabase.from('calculator_sessions').insert({
      session_id: data.sessionId,
      user_ip: request.ip,
      building_requirements: data,
      ai_suggestions: aiResult,
      calculated_results: aiResult
    })

    return NextResponse.json({
      success: true,
      data: aiResult
    })
  } catch (error) {
    console.error('Smart calculator error:', error)
    return NextResponse.json(
      { success: false, error: 'Calculation failed' },
      { status: 500 }
    )
  }
}

async function calculateWithAI(data: CalculatorRequest, configs: any): Promise<AICalculation> {
  const sizeMultipliers = configs.size_multipliers || {}
  const regionalFactors = configs.regional_factors || {}
  const deliveryFactors = configs.delivery_factors || {}
  const permitComplexity = configs.permit_complexity || {}
  
  // AI-enhanced size calculation
  const baseSize = Math.max(data.occupancy * 120, 800) // 120 sq ft per person, minimum 800
  const typeMultiplier = sizeMultipliers[data.buildingType.toLowerCase()] || 1.0
  const recommendedSize = Math.round(baseSize * typeMultiplier)
  
  // AI cost estimation
  const baseCostPerSqFt = 45
  const regionalFactor = getRegionalFactor(data.location, regionalFactors)
  const deliveryFactor = getDeliveryFactor(data.zipCode, deliveryFactors)
  
  const baseCost = recommendedSize * baseCostPerSqFt * regionalFactor
  const deliveryCost = baseCost * 0.1 * deliveryFactor
  const featuresCost = calculateFeaturesCost(data.features, baseCost)
  const permitCost = getPermitCost(data.buildingType, baseCost, permitComplexity)
  
  const totalCost = baseCost + deliveryCost + featuresCost + permitCost
  
  // AI timeline prediction
  const permitInfo = permitComplexity[getPermitType(data.buildingType)] || { days: 5, factor: 1.0 }
  const timeline = {
    planning: 3,
    permits: permitInfo.days,
    delivery: getDeliveryDays(data.location, data.timeline),
    installation: Math.ceil(recommendedSize / 500), // 500 sq ft per day
    total: 0
  }
  timeline.total = timeline.planning + timeline.permits + timeline.delivery + timeline.installation
  
  // AI suggestions
  const suggestions = generateAISuggestions(data, configs, {
    cost: totalCost,
    size: recommendedSize,
    timeline: timeline.total
  })
  
  // Alternative recommendations
  const alternatives = generateAlternatives(data, totalCost, recommendedSize)
  
  return {
    recommendedSize,
    estimatedCost: {
      base: Math.round(baseCost),
      delivery: Math.round(deliveryCost),
      permits: Math.round(permitCost),
      features: Math.round(featuresCost),
      total: Math.round(totalCost)
    },
    timeline,
    suggestions,
    alternatives,
    confidence: calculateConfidence(data, configs)
  }
}

function getRegionalFactor(location: string, factors: any): number {
  const state = location.toLowerCase().split(',')[1]?.trim()
  return factors[state] || factors.default || 1.0
}

function getDeliveryFactor(zipCode: string, factors: any): number {
  // Simple zip-code based area classification
  const zip = parseInt(zipCode)
  if (zip >= 10000 && zip <= 19999) return factors.urban || 1.0
  if (zip >= 90000 && zip <= 96999) return factors.urban || 1.0
  if (zip >= 20000 && zip <= 39999) return factors.suburban || 1.1
  return factors.rural || 1.3
}

function calculateFeaturesCost(features: string[], baseCost: number): number {
  const featureCosts: { [key: string]: number } = {
    'hvac_upgrade': 0.15,
    'security_system': 0.08,
    'accessibility_features': 0.12,
    'technology_package': 0.10,
    'energy_efficiency': 0.18
  }
  
  return features.reduce((total, feature) => {
    const factor = featureCosts[feature.toLowerCase().replace(/\s+/g, '_')] || 0.05
    return total + (baseCost * factor)
  }, 0)
}

function getPermitCost(buildingType: string, baseCost: number, complexity: any): number {
  const permitType = getPermitType(buildingType)
  const info = complexity[permitType] || { factor: 1.0 }
  return baseCost * 0.03 * info.factor
}

function getPermitType(buildingType: string): string {
  if (buildingType.toLowerCase().includes('healthcare')) return 'healthcare'
  if (buildingType.toLowerCase().includes('school') || buildingType.toLowerCase().includes('classroom')) return 'special_use'
  return 'standard'
}

function getDeliveryDays(location: string, timeline: string): number {
  const urgency = timeline.toLowerCase()
  const baseDelivery = urgency.includes('urgent') ? 3 : urgency.includes('standard') ? 7 : 14
  
  // Add location-based delays
  if (location.includes('Alaska') || location.includes('Hawaii')) return baseDelivery + 5
  if (location.includes('Montana') || location.includes('Wyoming')) return baseDelivery + 2
  
  return baseDelivery
}

function generateAISuggestions(data: CalculatorRequest, configs: any, results: any): string[] {
  const suggestions: string[] = []
  
  // Cost optimization suggestions
  if (results.cost > 100000) {
    suggestions.push('Consider a smaller configuration or fewer premium features to reduce costs')
    suggestions.push('Lease-to-own option could reduce upfront investment by 40%')
  }
  
  // Timeline optimization
  if (results.timeline > 30) {
    suggestions.push('Choose standard features to accelerate delivery by 1-2 weeks')
    suggestions.push('Consider pre-approved building types to expedite permitting')
  }
  
  // Location-specific suggestions
  if (data.location.includes('California')) {
    suggestions.push('Energy-efficient features qualify for state rebates up to $15,000')
  }
  
  // Occupancy optimization
  if (data.occupancy > 50) {
    suggestions.push('Multi-unit configuration may be more cost-effective for large occupancy')
    suggestions.push('Consider modular expansion capability for future growth')
  }
  
  return suggestions.slice(0, 4) // Limit to top 4 suggestions
}

function generateAlternatives(data: CalculatorRequest, baseCost: number, baseSize: number): Array<{type: string, savings: number, description: string}> {
  return [
    {
      type: 'Economy Package',
      savings: baseCost * 0.25,
      description: 'Standard features with basic finishes - 25% cost reduction'
    },
    {
      type: 'Rental Option',
      savings: baseCost * 0.7,
      description: 'Monthly rental starting at $' + Math.round(baseCost * 0.015) + ' - 70% lower upfront cost'
    },
    {
      type: 'Smaller Configuration',
      savings: baseCost * 0.15,
      description: (baseSize * 0.85) + ' sq ft option - 15% cost savings with efficient layout'
    }
  ]
}

function calculateConfidence(data: CalculatorRequest, configs: any): number {
  let confidence = 0.8 // Base confidence
  
  // Reduce confidence for unusual requirements
  if (data.occupancy > 100) confidence -= 0.1
  if (data.features.length > 5) confidence -= 0.1
  if (!data.zipCode || data.zipCode.length !== 5) confidence -= 0.15
  
  // Increase confidence for standard cases
  if (data.buildingType === 'office' || data.buildingType === 'classroom') confidence += 0.1
  if (data.timeline === 'standard') confidence += 0.05
  
  return Math.max(0.5, Math.min(0.95, confidence))
}
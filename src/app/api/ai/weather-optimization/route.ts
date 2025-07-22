import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface WeatherRequest {
  zipCode: string
  city?: string
  state?: string
  deliveryType: 'standard' | 'expedited' | 'scheduled'
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
    alternativeDates: string[]
  }
  costImpact: {
    weatherSurcharge: number
    rushDelivery: boolean
    insuranceRequired: boolean
  }
  installationAdvice: {
    preparationNeeded: string[]
    equipmentRequired: string[]
    timelineAdjustment: number
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: WeatherRequest = await request.json()
    const supabase = createClient()
    
    // Check cache first
    const locationKey = `${data.zipCode}_${data.city}_${data.state}`
    const { data: cached } = await supabase
      .from('weather_cache')
      .select('*')
      .eq('location_key', locationKey)
      .gt('expires_at', new Date().toISOString())
      .single()

    let weatherData
    if (cached) {
      weatherData = cached.weather_data
    } else {
      // Fetch fresh weather data
      weatherData = await fetchWeatherData(data)
      
      // Cache the results
      await supabase.from('weather_cache').upsert({
        location_key: locationKey,
        zip_code: data.zipCode,
        city: data.city,
        state: data.state,
        weather_data: weatherData,
        forecast_data: weatherData.forecast,
        delivery_recommendations: null,
        cached_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString() // 6 hours
      })
    }

    // Generate AI-powered delivery optimization
    const optimization = await generateDeliveryOptimization(weatherData, data)
    
    return NextResponse.json({
      success: true,
      data: optimization
    })
  } catch (error) {
    console.error('Weather optimization error:', error)
    return NextResponse.json(
      { success: false, error: 'Weather optimization failed' },
      { status: 500 }
    )
  }
}

async function fetchWeatherData(data: WeatherRequest) {
  // Mock weather data (in production, use OpenWeatherMap, WeatherAPI, etc.)
  const mockWeather = {
    current: {
      temperature: Math.floor(Math.random() * 60) + 40, // 40-100°F
      conditions: ['Clear', 'Partly Cloudy', 'Cloudy', 'Light Rain', 'Heavy Rain', 'Windy'][Math.floor(Math.random() * 6)],
      windSpeed: Math.floor(Math.random() * 30) + 5, // 5-35 mph
      precipitation: Math.random() * 0.8, // 0-0.8 inches
      humidity: Math.floor(Math.random() * 40) + 30, // 30-70%
      visibility: Math.floor(Math.random() * 8) + 2 // 2-10 miles
    },
    forecast: Array.from({ length: 14 }, (_, i) => ({
      date: new Date(Date.now() + i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      high: Math.floor(Math.random() * 30) + 60,
      low: Math.floor(Math.random() * 30) + 30,
      conditions: ['Clear', 'Partly Cloudy', 'Cloudy', 'Showers', 'Rain', 'Storms'][Math.floor(Math.random() * 6)],
      windSpeed: Math.floor(Math.random() * 25) + 5,
      precipitation: Math.random() * 0.6,
      precipitationChance: Math.floor(Math.random() * 100)
    }))
  }

  // Add some location-specific variations
  if (data.state?.toLowerCase().includes('florida')) {
    mockWeather.current.temperature += 15
    mockWeather.current.humidity = Math.max(mockWeather.current.humidity, 60)
  }
  if (data.state?.toLowerCase().includes('montana')) {
    mockWeather.current.temperature -= 20
    mockWeather.current.windSpeed += 10
  }
  
  return mockWeather
}

async function generateDeliveryOptimization(weatherData: any, request: WeatherRequest): Promise<WeatherOptimization> {
  const supabase = createClient()
  
  // Get delivery condition thresholds from AI config
  const { data: configs } = await supabase
    .from('ai_configurations')
    .select('config_value')
    .eq('config_type', 'weather')
    .eq('config_key', 'delivery_conditions')
    .single()

  const conditions = configs?.config_value || {
    good: { wind: [0, 25], precipitation: [0, 0.1], temperature: [-10, 100] },
    fair: { wind: [25, 35], precipitation: [0.1, 0.5], temperature: [-20, 110] },
    poor: { wind: [35, 999], precipitation: [0.5, 999], temperature: [-999, -20] }
  }

  // Analyze current conditions
  const current = weatherData.current
  const currentSuitability = assessWeatherSuitability(current, conditions)
  
  // Find optimal delivery windows
  const optimalWindows = weatherData.forecast
    .map((day: any) => {
      const suitability = assessWeatherSuitability({
        windSpeed: day.windSpeed,
        precipitation: day.precipitation,
        temperature: (day.high + day.low) / 2
      }, conditions)
      
      return {
        date: day.date,
        timeSlot: getBestTimeSlot(day),
        suitability,
        reason: getDeliveryReason(day, suitability)
      }
    })
    .filter((window: any) => window.suitability !== 'poor')
    .slice(0, 7) // Next 7 suitable days

  // Identify risk factors
  const riskFactors = identifyRiskFactors(weatherData, conditions)
  
  // Calculate cost impacts
  const costImpact = calculateWeatherCosts(currentSuitability, riskFactors, request.deliveryType)
  
  // Generate installation advice
  const installationAdvice = generateInstallationAdvice(weatherData, currentSuitability)
  
  return {
    currentConditions: {
      temperature: current.temperature,
      conditions: current.conditions,
      windSpeed: current.windSpeed,
      precipitation: current.precipitation
    },
    deliveryRecommendations: {
      optimalWindows,
      riskFactors,
      alternativeDates: optimalWindows
        .filter((w: any) => w.suitability === 'excellent')
        .map((w: any) => w.date)
        .slice(0, 3)
    },
    costImpact,
    installationAdvice
  }
}

function assessWeatherSuitability(weather: any, conditions: any): 'excellent' | 'good' | 'fair' | 'poor' {
  const { windSpeed, precipitation, temperature } = weather
  
  // Check against good conditions
  if (windSpeed >= conditions.good.wind[0] && windSpeed <= conditions.good.wind[1] &&
      precipitation >= conditions.good.precipitation[0] && precipitation <= conditions.good.precipitation[1] &&
      temperature >= conditions.good.temperature[0] && temperature <= conditions.good.temperature[1]) {
    return windSpeed <= 15 && precipitation <= 0.05 ? 'excellent' : 'good'
  }
  
  // Check against fair conditions
  if (windSpeed >= conditions.fair.wind[0] && windSpeed <= conditions.fair.wind[1] &&
      precipitation >= conditions.fair.precipitation[0] && precipitation <= conditions.fair.precipitation[1] &&
      temperature >= conditions.fair.temperature[0] && temperature <= conditions.fair.temperature[1]) {
    return 'fair'
  }
  
  return 'poor'
}

function getBestTimeSlot(day: any): string {
  // Simple logic for best delivery times
  if (day.conditions.includes('Rain') || day.conditions.includes('Storm')) {
    return '10:00 AM - 12:00 PM' // Before afternoon storms
  }
  if (day.windSpeed > 20) {
    return '7:00 AM - 9:00 AM' // Early morning, less wind
  }
  return '8:00 AM - 4:00 PM' // Standard delivery window
}

function getDeliveryReason(day: any, suitability: string): string {
  switch (suitability) {
    case 'excellent':
      return 'Perfect conditions - clear skies, low wind, ideal temperature'
    case 'good':
      return 'Good conditions - minor weather factors, safe for delivery'
    case 'fair':
      return `Manageable conditions - ${day.windSpeed > 25 ? 'windy' : ''} ${day.precipitation > 0.1 ? 'light precipitation' : ''}`
    case 'poor':
      return 'Challenging conditions - recommend rescheduling if possible'
    default:
      return 'Weather assessment unavailable'
  }
}

function identifyRiskFactors(weatherData: any, conditions: any): string[] {
  const risks: string[] = []
  const current = weatherData.current
  
  if (current.windSpeed > 30) {
    risks.push('High winds may affect crane operations and setup')
  }
  if (current.precipitation > 0.3) {
    risks.push('Heavy precipitation may delay delivery and installation')
  }
  if (current.temperature < 20) {
    risks.push('Cold temperatures may require additional preparation time')
  }
  if (current.temperature > 95) {
    risks.push('Extreme heat may limit working hours and require additional hydration breaks')
  }
  if (current.visibility < 3) {
    risks.push('Low visibility conditions may require special safety protocols')
  }
  
  // Check forecast for upcoming risks
  const upcomingStorms = weatherData.forecast
    .slice(0, 3)
    .filter((day: any) => day.conditions.includes('Storm') || day.precipitationChance > 80)
  
  if (upcomingStorms.length > 0) {
    risks.push('Storm system approaching - consider expedited delivery')
  }
  
  return risks
}

function calculateWeatherCosts(suitability: string, riskFactors: string[], deliveryType: string): any {
  let weatherSurcharge = 0
  let rushDelivery = false
  let insuranceRequired = false
  
  // Base surcharges by weather conditions
  switch (suitability) {
    case 'poor':
      weatherSurcharge = 0.15 // 15% surcharge
      insuranceRequired = true
      break
    case 'fair':
      weatherSurcharge = 0.08 // 8% surcharge
      break
    case 'good':
      weatherSurcharge = 0.03 // 3% surcharge
      break
    default:
      weatherSurcharge = 0
  }
  
  // Additional costs for high-risk factors
  if (riskFactors.length >= 3) {
    weatherSurcharge += 0.05
    insuranceRequired = true
  }
  
  // Rush delivery recommendations
  if (riskFactors.some(risk => risk.includes('Storm') || risk.includes('severe'))) {
    rushDelivery = deliveryType !== 'expedited'
  }
  
  return {
    weatherSurcharge: Math.round(weatherSurcharge * 100) / 100,
    rushDelivery,
    insuranceRequired
  }
}

function generateInstallationAdvice(weatherData: any, suitability: string): any {
  const current = weatherData.current
  const preparationNeeded: string[] = []
  const equipmentRequired: string[] = []
  let timelineAdjustment = 0
  
  // Temperature-based advice
  if (current.temperature < 32) {
    preparationNeeded.push('Ground may be frozen - allow extra site preparation time')
    equipmentRequired.push('Ground thawing equipment')
    timelineAdjustment += 1
  } else if (current.temperature > 90) {
    preparationNeeded.push('Schedule frequent breaks for crew safety')
    preparationNeeded.push('Provide additional hydration stations')
    timelineAdjustment += 0.5
  }
  
  // Wind-based advice
  if (current.windSpeed > 25) {
    preparationNeeded.push('Secure all materials and equipment')
    equipmentRequired.push('Additional tie-down equipment')
    if (current.windSpeed > 35) {
      preparationNeeded.push('Consider postponing crane operations')
      timelineAdjustment += 1
    }
  }
  
  // Precipitation advice
  if (current.precipitation > 0.1) {
    preparationNeeded.push('Provide covered work areas')
    preparationNeeded.push('Use slip-resistant walkways')
    equipmentRequired.push('Weatherproof tarps and covers')
    timelineAdjustment += 0.5
  }
  
  // Visibility advice
  if (current.visibility < 5) {
    preparationNeeded.push('Install additional lighting')
    preparationNeeded.push('Use high-visibility safety gear')
    equipmentRequired.push('Portable lighting equipment')
  }
  
  return {
    preparationNeeded,
    equipmentRequired,
    timelineAdjustment
  }
}
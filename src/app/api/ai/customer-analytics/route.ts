import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

interface AnalyticsEvent {
  sessionId: string
  eventType: string
  eventData: any
  pageUrl: string
  timestamp?: string
}

interface AnalyticsInsights {
  popularPages: Array<{
    page: string
    visits: number
    avgTimeOnPage: number
    bounceRate: number
  }>
  customerBehavior: {
    mostUsedCalculators: string[]
    commonQuoteRequests: any[]
    conversionFunnels: any[]
    peakUsageHours: number[]
  }
  marketTrends: {
    topBuildingTypes: string[]
    popularLocations: string[]
    seasonalPatterns: any[]
    priceRangePreferences: any[]
  }
  businessMetrics: {
    totalSessions: number
    averageSessionDuration: number
    quoteConversionRate: number
    customerSatisfactionScore: number
  }
  realTimeData: {
    activeUsers: number
    currentPopularActions: string[]
    todayQuotes: number
    liveChatEngagements: number
  }
}

// POST - Track analytics event
export async function POST(request: NextRequest) {
  try {
    const eventData: AnalyticsEvent = await request.json()
    const supabase = createClient()
    
    // Get client IP and user agent
    const clientIP = request.ip || 'unknown'
    const userAgent = request.headers.get('user-agent') || ''
    const referrer = request.headers.get('referer') || ''
    
    // Store analytics event
    await supabase.from('customer_analytics').insert({
      session_id: eventData.sessionId,
      user_ip: clientIP,
      page_path: eventData.pageUrl,
      event_type: eventData.eventType,
      event_data: eventData.eventData,
      user_agent: userAgent,
      referrer: referrer,
      timestamp: eventData.timestamp || new Date().toISOString()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Analytics tracking error:', error)
    return NextResponse.json(
      { success: false, error: 'Tracking failed' },
      { status: 500 }
    )
  }
}

// GET - Retrieve analytics insights
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || '30d'
    const includeRealTime = searchParams.get('realTime') === 'true'
    
    const supabase = createClient()
    
    // Calculate date range
    const endDate = new Date()
    const startDate = new Date()
    
    switch (timeRange) {
      case '24h':
        startDate.setDate(endDate.getDate() - 1)
        break
      case '7d':
        startDate.setDate(endDate.getDate() - 7)
        break
      case '30d':
        startDate.setDate(endDate.getDate() - 30)
        break
      case '90d':
        startDate.setDate(endDate.getDate() - 90)
        break
      default:
        startDate.setDate(endDate.getDate() - 30)
    }
    
    // Get analytics data
    const { data: analyticsData } = await supabase
      .from('customer_analytics')
      .select('*')
      .gte('timestamp', startDate.toISOString())
      .lte('timestamp', endDate.toISOString())
      .order('timestamp', { ascending: false })
    
    if (!analyticsData) {
      return NextResponse.json({ success: false, error: 'No data found' })
    }
    
    // Process data into insights
    const insights = await generateAnalyticsInsights(analyticsData, includeRealTime, supabase)
    
    return NextResponse.json({
      success: true,
      data: insights,
      timeRange,
      recordCount: analyticsData.length
    })
  } catch (error) {
    console.error('Analytics insights error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to generate insights' },
      { status: 500 }
    )
  }
}

async function generateAnalyticsInsights(data: any[], includeRealTime: boolean, supabase: any): Promise<AnalyticsInsights> {
  // Popular pages analysis
  const pageViews = data.filter(event => event.event_type === 'page_view')
  const pageStats = aggregatePageStats(pageViews)
  
  // Customer behavior analysis
  const calculatorUsage = data.filter(event => event.event_type === 'calculator_use')
  const quoteRequests = data.filter(event => event.event_type === 'quote_request')
  const customerBehavior = analyzeCustomerBehavior(data, calculatorUsage, quoteRequests)
  
  // Market trends analysis
  const marketTrends = analyzeMarketTrends(data, quoteRequests)
  
  // Business metrics
  const businessMetrics = calculateBusinessMetrics(data, pageViews, quoteRequests)
  
  // Real-time data (if requested)
  let realTimeData = {
    activeUsers: 0,
    currentPopularActions: [] as string[],
    todayQuotes: 0,
    liveChatEngagements: 0
  }
  
  if (includeRealTime) {
    realTimeData = await generateRealTimeData(data, supabase)
  }
  
  return {
    popularPages: pageStats,
    customerBehavior,
    marketTrends,
    businessMetrics,
    realTimeData
  }
}

function aggregatePageStats(pageViews: any[]) {
  const pageMap = new Map()
  
  pageViews.forEach(view => {
    const page = view.page_path
    if (!pageMap.has(page)) {
      pageMap.set(page, {
        page,
        visits: 0,
        totalTime: 0,
        sessions: new Set(),
        bounces: 0
      })
    }
    
    const stats = pageMap.get(page)
    stats.visits++
    stats.sessions.add(view.session_id)
    
    // Estimate time on page (simplified)
    if (view.event_data?.timeOnPage) {
      stats.totalTime += view.event_data.timeOnPage
    }
  })
  
  return Array.from(pageMap.values())
    .map(stats => ({
      page: stats.page,
      visits: stats.visits,
      avgTimeOnPage: Math.round(stats.totalTime / stats.visits) || 0,
      bounceRate: Math.round((stats.bounces / stats.visits) * 100) || 0
    }))
    .sort((a, b) => b.visits - a.visits)
    .slice(0, 10)
}

function analyzeCustomerBehavior(allData: any[], calculatorUsage: any[], quoteRequests: any[]) {
  // Most used calculators
  const calculatorTypes = calculatorUsage
    .map(usage => usage.event_data?.calculatorType || 'unknown')
    .reduce((acc: any, type) => {
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})
  
  const mostUsedCalculators = Object.entries(calculatorTypes)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, 5)
    .map(([type]) => type)
  
  // Common quote requests
  const commonQuoteRequests = quoteRequests
    .map(quote => ({
      buildingType: quote.event_data?.buildingType || 'unknown',
      size: quote.event_data?.size || 'unknown',
      location: quote.event_data?.location || 'unknown'
    }))
    .slice(0, 10)
  
  // Conversion funnels (simplified)
  const conversionFunnels = calculateConversionFunnels(allData)
  
  // Peak usage hours
  const hourCounts = allData.reduce((acc: any, event) => {
    const hour = new Date(event.timestamp).getHours()
    acc[hour] = (acc[hour] || 0) + 1
    return acc
  }, {})
  
  const peakUsageHours = Object.entries(hourCounts)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, 3)
    .map(([hour]) => parseInt(hour))
  
  return {
    mostUsedCalculators,
    commonQuoteRequests,
    conversionFunnels,
    peakUsageHours
  }
}

function analyzeMarketTrends(allData: any[], quoteRequests: any[]) {
  // Top building types
  const buildingTypes = quoteRequests
    .map(quote => quote.event_data?.buildingType)
    .filter(Boolean)
    .reduce((acc: any, type) => {
      acc[type] = (acc[type] || 0) + 1
      return acc
    }, {})
  
  const topBuildingTypes = Object.entries(buildingTypes)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, 5)
    .map(([type]) => type)
  
  // Popular locations
  const locations = allData
    .map(event => event.event_data?.location || event.event_data?.zipCode)
    .filter(Boolean)
    .reduce((acc: any, location) => {
      acc[location] = (acc[location] || 0) + 1
      return acc
    }, {})
  
  const popularLocations = Object.entries(locations)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, 10)
    .map(([location]) => location)
  
  // Seasonal patterns (simplified)
  const monthCounts = allData.reduce((acc: any, event) => {
    const month = new Date(event.timestamp).getMonth()
    acc[month] = (acc[month] || 0) + 1
    return acc
  }, {})
  
  const seasonalPatterns = Object.entries(monthCounts)
    .map(([month, count]) => ({
      month: parseInt(month),
      activity: count
    }))
  
  // Price range preferences
  const priceRanges = quoteRequests
    .map(quote => {
      const budget = quote.event_data?.budget || quote.event_data?.estimatedCost
      if (!budget) return null
      if (budget < 50000) return '$0-$50k'
      if (budget < 100000) return '$50k-$100k'
      if (budget < 200000) return '$100k-$200k'
      return '$200k+'
    })
    .filter(range => range !== null)
    .reduce((acc: Record<string, number>, range: string) => {
      acc[range] = (acc[range] || 0) + 1
      return acc
    }, {})
  
  const priceRangePreferences = Object.entries(priceRanges)
    .map(([range, count]) => ({ range, count }))
    .sort((a: any, b: any) => b.count - a.count)
  
  return {
    topBuildingTypes,
    popularLocations,
    seasonalPatterns,
    priceRangePreferences
  }
}

function calculateBusinessMetrics(allData: any[], pageViews: any[], quoteRequests: any[]) {
  const uniqueSessions = new Set(allData.map(event => event.session_id))
  const totalSessions = uniqueSessions.size
  
  // Average session duration (simplified estimate)
  const sessionDurations = new Map()
  allData.forEach(event => {
    const sessionId = event.session_id
    const timestamp = new Date(event.timestamp).getTime()
    
    if (!sessionDurations.has(sessionId)) {
      sessionDurations.set(sessionId, { start: timestamp, end: timestamp })
    } else {
      const session = sessionDurations.get(sessionId)
      session.end = Math.max(session.end, timestamp)
    }
  })
  
  const avgSessionDuration = Array.from(sessionDurations.values())
    .reduce((total, session) => total + (session.end - session.start), 0) / sessionDurations.size / (1000 * 60) // Convert to minutes
  
  // Quote conversion rate
  const calculatorSessions = new Set(
    allData.filter(event => event.event_type === 'calculator_use')
      .map(event => event.session_id)
  )
  const quoteSessions = new Set(
    quoteRequests.map(quote => quote.session_id)
  )
  
  const quoteConversionRate = calculatorSessions.size > 0 ? 
    (quoteSessions.size / calculatorSessions.size) * 100 : 0
  
  // Mock customer satisfaction score (would come from actual feedback)
  const customerSatisfactionScore = 4.2 + (Math.random() * 0.6) // 4.2-4.8 range
  
  return {
    totalSessions,
    averageSessionDuration: Math.round(avgSessionDuration * 10) / 10,
    quoteConversionRate: Math.round(quoteConversionRate * 10) / 10,
    customerSatisfactionScore: Math.round(customerSatisfactionScore * 10) / 10
  }
}

function calculateConversionFunnels(data: any[]) {
  const funnelSteps = [
    { name: 'Page Visit', eventType: 'page_view' },
    { name: 'Calculator Use', eventType: 'calculator_use' },
    { name: 'Quote Request', eventType: 'quote_request' },
    { name: 'Contact Form', eventType: 'form_submission' }
  ]
  
  return funnelSteps.map(step => {
    const stepSessions = new Set(
      data.filter(event => event.event_type === step.eventType)
        .map(event => event.session_id)
    )
    return {
      step: step.name,
      sessions: stepSessions.size,
      conversionRate: step.name === 'Page Visit' ? 100 : 0 // Would calculate actual rates
    }
  })
}

async function generateRealTimeData(data: any[], supabase: any) {
  const now = new Date()
  const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
  // Active users (last hour)
  const recentSessions = new Set(
    data.filter(event => new Date(event.timestamp) > oneHourAgo)
      .map(event => event.session_id)
  )
  const activeUsers = recentSessions.size
  
  // Current popular actions (last hour)
  const recentActions = data
    .filter(event => new Date(event.timestamp) > oneHourAgo)
    .reduce((acc: any, event) => {
      acc[event.event_type] = (acc[event.event_type] || 0) + 1
      return acc
    }, {})
  
  const currentPopularActions = Object.entries(recentActions)
    .sort(([,a]: any, [,b]: any) => b - a)
    .slice(0, 3)
    .map(([action]) => action)
  
  // Today's quotes
  const todayQuotes = data.filter(event => 
    event.event_type === 'quote_request' && 
    new Date(event.timestamp) > today
  ).length
  
  // Mock live chat engagements
  const liveChatEngagements = Math.floor(Math.random() * 5) + 1
  
  return {
    activeUsers,
    currentPopularActions,
    todayQuotes,
    liveChatEngagements
  }
}
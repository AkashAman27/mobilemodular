'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  TrendingUp, TrendingDown, Eye, Heart, ShoppingCart, MapPin,
  Building, DollarSign, Clock, Users, Star, BarChart3,
  PieChart, Calendar, Download, Filter, RefreshCw,
  Target, Zap, Award, AlertTriangle
} from 'lucide-react'
import { 
  ResponsiveContainer, LineChart, Line, AreaChart, Area, BarChart, Bar,
  PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, RadarChart, PolarGrid, PolarAngleAxis, 
  PolarRadiusAxis, Radar
} from 'recharts'

interface AnalyticsData {
  overview: {
    total_inventory: number
    available_units: number
    rented_units: number
    total_views: number
    total_inquiries: number
    conversion_rate: number
    avg_rental_price: number
    occupancy_rate: number
  }
  trends: {
    date: string
    views: number
    inquiries: number
    rentals: number
    revenue: number
  }[]
  popular_items: {
    id: string
    name: string
    category: string
    views: number
    inquiries: number
    conversion_rate: number
    revenue: number
    image_url: string
  }[]
  geographic_data: {
    state: string
    city: string
    total_units: number
    rented_units: number
    avg_price: number
    demand_score: number
  }[]
  category_performance: {
    category: string
    units: number
    revenue: number
    avg_rental_duration: number
    satisfaction_rating: number
  }[]
  user_behavior: {
    avg_session_duration: number
    bounce_rate: number
    pages_per_session: number
    top_search_terms: string[]
    conversion_funnel: {
      stage: string
      users: number
      conversion_rate: number
    }[]
  }
}

const COLORS = ['#1e40af', '#059669', '#d97706', '#dc2626', '#7c3aed', '#0891b2']

export default function InventoryAnalytics() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  useEffect(() => {
    loadAnalyticsData()
  }, [timeRange])

  const loadAnalyticsData = async () => {
    setLoading(true)
    
    // Simulate API call with mock data
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockData: AnalyticsData = {
      overview: {
        total_inventory: 245,
        available_units: 187,
        rented_units: 58,
        total_views: 12847,
        total_inquiries: 1284,
        conversion_rate: 23.5,
        avg_rental_price: 1850,
        occupancy_rate: 76.3
      },
      trends: generateTrendData(),
      popular_items: [
        {
          id: '1',
          name: '20\' x 8\' Executive Office',
          category: 'Office Buildings',
          views: 1247,
          inquiries: 156,
          conversion_rate: 12.5,
          revenue: 18750,
          image_url: '/images/office-1.jpg'
        },
        {
          id: '2',
          name: 'Standard Classroom Module',
          category: 'Education',
          views: 987,
          inquiries: 134,
          conversion_rate: 13.6,
          revenue: 14200,
          image_url: '/images/classroom-1.jpg'
        },
        {
          id: '3',
          name: 'Security Guard Station',
          category: 'Security',
          views: 756,
          inquiries: 98,
          conversion_rate: 13.0,
          revenue: 9800,
          image_url: '/images/security-1.jpg'
        }
      ],
      geographic_data: [
        { state: 'AL', city: 'Birmingham', total_units: 45, rented_units: 34, avg_price: 1950, demand_score: 8.5 },
        { state: 'AL', city: 'Montgomery', total_units: 38, rented_units: 29, avg_price: 1800, demand_score: 7.8 },
        { state: 'GA', city: 'Atlanta', total_units: 62, rented_units: 47, avg_price: 2100, demand_score: 9.2 },
        { state: 'FL', city: 'Miami', total_units: 41, rented_units: 31, avg_price: 2300, demand_score: 8.9 },
        { state: 'TX', city: 'Houston', total_units: 59, rented_units: 45, avg_price: 1900, demand_score: 8.7 }
      ],
      category_performance: [
        { category: 'Office Buildings', units: 85, revenue: 156750, avg_rental_duration: 14.2, satisfaction_rating: 4.6 },
        { category: 'Classrooms', units: 56, revenue: 89600, avg_rental_duration: 18.5, satisfaction_rating: 4.8 },
        { category: 'Healthcare', units: 32, revenue: 76800, avg_rental_duration: 22.1, satisfaction_rating: 4.7 },
        { category: 'Security', units: 28, revenue: 42000, avg_rental_duration: 12.3, satisfaction_rating: 4.5 },
        { category: 'Commercial', units: 44, revenue: 95200, avg_rental_duration: 16.8, satisfaction_rating: 4.4 }
      ],
      user_behavior: {
        avg_session_duration: 8.5,
        bounce_rate: 34.2,
        pages_per_session: 5.7,
        top_search_terms: ['office trailer', 'classroom mobile', 'construction office', 'portable building', 'modular office'],
        conversion_funnel: [
          { stage: 'Landing Page', users: 10000, conversion_rate: 100 },
          { stage: 'Browse Inventory', users: 6500, conversion_rate: 65 },
          { stage: 'View Details', users: 3200, conversion_rate: 32 },
          { stage: 'Add to Quote', users: 960, conversion_rate: 9.6 },
          { stage: 'Submit Quote', users: 480, conversion_rate: 4.8 },
          { stage: 'Rental Agreement', users: 240, conversion_rate: 2.4 }
        ]
      }
    }
    
    setAnalyticsData(mockData)
    setLoading(false)
  }

  const generateTrendData = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90
    const data = []
    
    for (let i = days; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      
      data.push({
        date: date.toISOString().split('T')[0],
        views: Math.floor(Math.random() * 500) + 200,
        inquiries: Math.floor(Math.random() * 50) + 20,
        rentals: Math.floor(Math.random() * 10) + 2,
        revenue: Math.floor(Math.random() * 15000) + 5000
      })
    }
    
    return data
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-navy-600 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  if (!analyticsData) {
    return <div>No data available</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-navy-600">Inventory Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into inventory performance and user behavior</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" onClick={loadAnalyticsData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Inventory</p>
                  <p className="text-3xl font-bold text-navy-600">{analyticsData.overview.total_inventory}</p>
                  <p className="text-sm text-green-600 mt-1">
                    <TrendingUp className="h-4 w-4 inline mr-1" />
                    +12% from last month
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                  <p className="text-3xl font-bold text-navy-600">{analyticsData.overview.occupancy_rate}%</p>
                  <p className="text-sm text-green-600 mt-1">
                    <TrendingUp className="h-4 w-4 inline mr-1" />
                    +5.2% from last month
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Target className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Rental Price</p>
                  <p className="text-3xl font-bold text-navy-600">${analyticsData.overview.avg_rental_price}</p>
                  <p className="text-sm text-red-600 mt-1">
                    <TrendingDown className="h-4 w-4 inline mr-1" />
                    -2.1% from last month
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
                  <p className="text-3xl font-bold text-navy-600">{analyticsData.overview.conversion_rate}%</p>
                  <p className="text-sm text-green-600 mt-1">
                    <TrendingUp className="h-4 w-4 inline mr-1" />
                    +8.3% from last month
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Zap className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Analytics Tabs */}
      <Tabs defaultValue="performance" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="behavior">User Behavior</TabsTrigger>
          <TabsTrigger value="predictions">AI Insights</TabsTrigger>
        </TabsList>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Trends Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Performance Trends</span>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Revenue</SelectItem>
                      <SelectItem value="views">Views</SelectItem>
                      <SelectItem value="inquiries">Inquiries</SelectItem>
                      <SelectItem value="rentals">Rentals</SelectItem>
                    </SelectContent>
                  </Select>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={analyticsData.trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey={selectedMetric} 
                      stroke="#1e40af" 
                      fill="#1e40af" 
                      fillOpacity={0.3} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Popular Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Top Performing Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.popular_items.map((item, index) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-8 h-8 bg-navy-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-600">{item.category}</p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {item.views}
                          </span>
                          <span className="flex items-center">
                            <ShoppingCart className="h-3 w-3 mr-1" />
                            {item.inquiries}
                          </span>
                          <span className="text-green-600 font-medium">
                            {item.conversion_rate}%
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-green-600">${item.revenue.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory Status</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <RechartsPieChart>
                    <Pie
                      data={[
                        { name: 'Available', value: analyticsData.overview.available_units },
                        { name: 'Rented', value: analyticsData.overview.rented_units }
                      ]}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#1e40af" />
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Geographic Tab */}
        <TabsContent value="geographic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Geographic Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.geographic_data.map((location, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold">{location.city}, {location.state}</h4>
                        <p className="text-sm text-gray-600">
                          {location.rented_units}/{location.total_units} units rented
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold">${location.avg_price}/mo</div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span className="text-sm">{location.demand_score}/10</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Demand Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.geographic_data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="city" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="demand_score" fill="#1e40af" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Categories Tab */}
        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Category Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analyticsData.category_performance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#1e40af" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Performance Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={analyticsData.category_performance}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="category" />
                    <PolarRadiusAxis angle={30} domain={[0, 5]} />
                    <Radar
                      name="Satisfaction"
                      dataKey="satisfaction_rating"
                      stroke="#1e40af"
                      fill="#1e40af"
                      fillOpacity={0.3}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* User Behavior Tab */}
        <TabsContent value="behavior" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Conversion Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.user_behavior.conversion_funnel.map((stage, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{stage.stage}</span>
                        <span className="text-sm text-gray-600">{stage.conversion_rate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${stage.conversion_rate}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {stage.users.toLocaleString()} users
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* User Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>User Engagement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-blue-600 mr-2" />
                      <span className="font-medium">Avg Session Duration</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">
                      {analyticsData.user_behavior.avg_session_duration}m
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <Eye className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-medium">Pages per Session</span>
                    </div>
                    <span className="text-xl font-bold text-green-600">
                      {analyticsData.user_behavior.pages_per_session}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center">
                      <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
                      <span className="font-medium">Bounce Rate</span>
                    </div>
                    <span className="text-xl font-bold text-red-600">
                      {analyticsData.user_behavior.bounce_rate}%
                    </span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Top Search Terms</h4>
                  <div className="flex flex-wrap gap-2">
                    {analyticsData.user_behavior.top_search_terms.map((term, index) => (
                      <Badge key={index} variant="outline">
                        {term}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* AI Insights Tab */}
        <TabsContent value="predictions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                AI-Powered Insights & Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">Inventory Optimization</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Increase office buildings inventory in Atlanta by 25%. Demand prediction shows 40% higher interest in Q2.
                    </p>
                    <Badge className="bg-blue-600">High Impact</Badge>
                  </div>
                  
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">Pricing Strategy</h4>
                    <p className="text-sm text-green-700 mb-3">
                      Consider 8% price increase for classroom modules. Market analysis shows low price sensitivity.
                    </p>
                    <Badge className="bg-green-600">Revenue +$12k/month</Badge>
                  </div>
                  
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">Seasonal Trends</h4>
                    <p className="text-sm text-orange-700 mb-3">
                      Construction category shows 35% spike in spring. Prepare additional inventory for March-May.
                    </p>
                    <Badge className="bg-orange-600">Seasonal Alert</Badge>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">User Experience</h4>
                    <p className="text-sm text-purple-700 mb-3">
                      Add virtual tours to top 10 buildings. Users with tour access have 45% higher conversion.
                    </p>
                    <Badge className="bg-purple-600">Conversion +45%</Badge>
                  </div>
                  
                  <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-800 mb-2">Geographic Expansion</h4>
                    <p className="text-sm text-indigo-700 mb-3">
                      Tampa, FL shows highest search volume vs inventory ratio. Consider market entry.
                    </p>
                    <Badge className="bg-indigo-600">Market Opportunity</Badge>
                  </div>
                  
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">Risk Alert</h4>
                    <p className="text-sm text-red-700 mb-3">
                      Security buildings showing declining interest. Monitor competitor pricing and features.
                    </p>
                    <Badge className="bg-red-600">Attention Required</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
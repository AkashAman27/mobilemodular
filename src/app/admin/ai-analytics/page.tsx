import AdminLayout from '@/components/admin/AdminLayout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnalyticsDashboard } from '@/components/ai/AnalyticsDashboard'
import { 
  TrendingUp, 
  Users, 
  Calculator, 
  Quote, 
  Eye, 
  Clock,
  MapPin,
  DollarSign,
  Brain,
  Activity
} from 'lucide-react'

export default function AIAnalyticsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight flex items-center">
              <Brain className="mr-3 h-8 w-8 text-blue-600" />
              🤖 AI Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">
              Real-time insights powered by artificial intelligence and customer data analysis.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Activity className="mr-1 h-3 w-3" />
              Live Data
            </Badge>
            <Badge variant="outline">
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* AI Feature Overview */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                AI Calculations
              </CardTitle>
              <Calculator className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-900">1,247</div>
              <p className="text-xs text-blue-700">
                +12% from last week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Weather Optimizations
              </CardTitle>
              <MapPin className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-900">892</div>
              <p className="text-xs text-green-700">
                98.5% accuracy rate
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Quote Conversions
              </CardTitle>
              <Quote className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-900">34.2%</div>
              <p className="text-xs text-purple-700">
                +8.1% improvement
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Customer Insights
              </CardTitle>
              <Eye className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-900">4.7/5</div>
              <p className="text-xs text-orange-700">
                AI suggestion rating
              </p>
            </CardContent>
          </Card>
        </div>

        {/* AI Features Status */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="mr-2 h-5 w-5 text-blue-600" />
                Smart Calculator AI
              </CardTitle>
              <CardDescription>
                Intelligent cost and size predictions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Prediction Accuracy</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">94.2%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Daily Calculations</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Model Confidence</span>
                  <Badge variant="default">High</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-green-600" />
                Weather Integration
              </CardTitle>
              <CardDescription>
                Delivery optimization by weather
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Delivery Optimization</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">98.5%</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Weather Forecasts</span>
                  <span className="font-semibold">Real-time</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cost Savings</span>
                  <Badge variant="default" className="bg-blue-100 text-blue-800">$127K</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-purple-600" />
                Customer Analytics
              </CardTitle>
              <CardDescription>
                Behavioral insights and patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Data Points</span>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800">45.2K</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Active Sessions</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Insights Generated</span>
                  <Badge variant="default" className="bg-orange-100 text-orange-800">1,892</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interactive Analytics Dashboard */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Activity className="mr-2 h-5 w-5 text-indigo-600" />
              📊 Live Customer Analytics
            </CardTitle>
            <CardDescription>
              Real-time customer behavior analysis and business insights powered by AI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AnalyticsDashboard />
          </CardContent>
        </Card>

        {/* AI Model Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Brain className="mr-2 h-5 w-5 text-pink-600" />
              🧠 AI Model Performance
            </CardTitle>
            <CardDescription>
              Machine learning model accuracy and optimization metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <div className="text-2xl font-bold text-blue-900 mb-1">94.2%</div>
                <div className="text-sm text-blue-700">Size Prediction Accuracy</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <div className="text-2xl font-bold text-green-900 mb-1">91.8%</div>
                <div className="text-sm text-green-700">Cost Estimation Accuracy</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg">
                <div className="text-2xl font-bold text-purple-900 mb-1">96.5%</div>
                <div className="text-sm text-purple-700">Weather Forecast Accuracy</div>
              </div>
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <div className="text-2xl font-bold text-orange-900 mb-1">88.7%</div>
                <div className="text-sm text-orange-700">Customer Satisfaction</div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold mb-2">🎯 Recent AI Improvements</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Enhanced regional pricing model (+3.2% accuracy)</li>
                <li>• Improved weather risk assessment algorithms</li>
                <li>• Added seasonal demand prediction capabilities</li>
                <li>• Optimized customer behavior clustering</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Business Impact */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="mr-2 h-5 w-5 text-green-600" />
              💰 Business Impact
            </CardTitle>
            <CardDescription>
              ROI and business value generated by AI features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">💸 Cost Savings</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Weather optimization:</span>
                    <span className="font-semibold text-green-600">$127,430</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Route optimization:</span>
                    <span className="font-semibold text-green-600">$89,240</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inventory optimization:</span>
                    <span className="font-semibold text-green-600">$45,680</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">📈 Revenue Impact</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Increased conversions:</span>
                    <span className="font-semibold text-blue-600">+34.2%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Higher average order:</span>
                    <span className="font-semibold text-blue-600">+12.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Customer retention:</span>
                    <span className="font-semibold text-blue-600">+28.5%</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2">⚡ Efficiency Gains</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Faster quotes:</span>
                    <span className="font-semibold text-purple-600">-67% time</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reduced errors:</span>
                    <span className="font-semibold text-purple-600">-43%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auto recommendations:</span>
                    <span className="font-semibold text-purple-600">94.2% accuracy</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-900">$2.4M</div>
                  <div className="text-sm text-green-700">Total AI-driven value this year</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold text-green-900">847% ROI</div>
                  <div className="text-xs text-green-700">on AI investment</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
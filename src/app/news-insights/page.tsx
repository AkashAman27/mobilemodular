import type { Metadata } from 'next'
import { PageLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout'
import { supabase } from '@/lib/supabase'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'News & Insights | Modular Building Solutions',
  description: 'Stay informed with the latest industry trends, case studies, and expert insights from the world of modular construction and building solutions.',
  alternates: {
    canonical: 'https://mobilemodular.com/news-insights'
  },
  openGraph: {
    title: 'News & Insights | Modular Building Solutions',
    description: 'Stay informed with the latest industry trends, case studies, and expert insights from the world of modular construction.',
    url: 'https://mobilemodular.com/news-insights',
    siteName: 'Modular Building Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'News & Insights | Modular Building Solutions',
    description: 'Stay informed with the latest industry trends, case studies, and expert insights from the world of modular construction.',
  }
}

interface NewsInsight {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url: string
  category: string
  read_time: string
  created_at: string
  updated_at: string
}

async function getNewsInsights(): Promise<NewsInsight[]> {
  try {
    const { data, error } = await supabase
      .from('news_insights')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(12)

    if (error) {
      console.error('Error fetching news insights:', error)
      return []
    }

    return data || []
  } catch (error) {
    console.error('Error fetching news insights:', error)
    return []
  }
}

function getCategoryColor(category: string) {
  const colors = {
    'industry-trends': 'bg-blue-100 text-blue-800',
    'case-studies': 'bg-green-100 text-green-800',
    'expert-insights': 'bg-purple-100 text-purple-800',
    'company-news': 'bg-orange-100 text-orange-800',
    'technology': 'bg-indigo-100 text-indigo-800',
    'sustainability': 'bg-emerald-100 text-emerald-800',
    'regulations': 'bg-red-100 text-red-800',
    'default': 'bg-gray-100 text-gray-800'
  }
  return colors[category as keyof typeof colors] || colors.default
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default async function NewsInsightsPage() {
  const newsInsights = await getNewsInsights()

  return (
    <PageLayout>
      <PageHeader
        title="News & Insights"
        description="Stay informed with the latest industry trends, case studies, and expert insights from the world of modular construction"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'News & Insights', href: '/news-insights' }
        ]}
      />
      <div className="max-w-7xl mx-auto">
        {/* Featured Article */}
        {newsInsights.length > 0 && (
          <div className="mb-16">
            <div className="bg-gradient-to-r from-navy-600 to-steel-500 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="p-8 lg:p-12 text-white">
                  <div className="mb-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(newsInsights[0].category)} bg-white/20 text-white`}>
                      {newsInsights[0].category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </div>
                  <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                    {newsInsights[0].title}
                  </h2>
                  <p className="text-blue-100 mb-6 text-lg leading-relaxed">
                    {newsInsights[0].excerpt}
                  </p>
                  <div className="flex items-center space-x-6 text-blue-100 mb-6">
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm">{formatDate(newsInsights[0].created_at)}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{newsInsights[0].read_time}</span>
                    </div>
                  </div>
                  <Link
                    href={`/news-insights/${newsInsights[0].slug}`}
                    className="inline-flex items-center space-x-2 bg-white text-navy-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="relative h-64 lg:h-96">
                  <Image
                    src={newsInsights[0].image_url || '/images/modular-building-default.jpg'}
                    alt={newsInsights[0].title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-2 bg-navy-600 text-white rounded-full font-medium">
              All Articles
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Industry Trends
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Case Studies
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Expert Insights
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Technology
            </button>
            <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors">
              Sustainability
            </button>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {newsInsights.slice(1).map((article) => (
            <div key={article.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <Image
                  src={article.image_url || '/images/modular-building-default.jpg'}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(article.category)}`}>
                    {article.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-4 text-gray-500 text-sm mb-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(article.created_at)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.read_time}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.excerpt}
                </p>
                <Link
                  href={`/news-insights/${article.slug}`}
                  className="inline-flex items-center space-x-1 text-navy-600 font-semibold hover:text-steel-500 transition-colors"
                >
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {newsInsights.length >= 12 && (
          <div className="text-center">
            <button className="bg-navy-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-navy-700 transition-colors">
              Load More Articles
            </button>
          </div>
        )}

        {/* Newsletter Signup */}
        <div className="mt-20 bg-gradient-to-r from-steel-500 to-navy-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter to receive the latest industry insights, case studies, and modular building trends delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* No Articles Message */}
        {newsInsights.length === 0 && (
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Calendar className="h-12 w-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Articles Yet</h3>
              <p className="text-gray-600 mb-6">
                We're working on creating valuable content for you. Check back soon for the latest industry insights and news.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center space-x-2 bg-navy-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-navy-700 transition-colors"
              >
                <span>Contact Us</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import { Clock, ArrowRight, Tag } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Industry Insights & News - Modular Building Trends | Aman Modular',
  description: 'Stay informed with the latest industry trends, case studies, and expert insights from the world of modular construction and portable buildings.',
}

const insights = [
  {
    id: 1,
    category: 'Education',
    title: 'The Future of Modular Construction in Education',
    excerpt: 'How portable classrooms are revolutionizing school expansion projects across the nation.',
    content: 'Discover how educational institutions are leveraging modular construction to rapidly expand capacity while maintaining quality learning environments.',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop',
    readTime: '5 min read',
    publishDate: '2024-07-10',
    author: 'Education Team'
  },
  {
    id: 2,
    category: 'Construction',
    title: 'Construction Site Efficiency with Modular Offices',
    excerpt: 'Learn how on-site modular offices improve project management and worker productivity.',
    content: 'Explore the benefits of temporary office solutions for construction sites and how they enhance project coordination and safety.',
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop',
    readTime: '4 min read',
    publishDate: '2024-07-08',
    author: 'Construction Team'
  },
  {
    id: 3,
    category: 'Healthcare',
    title: 'Healthcare Facility Solutions for Emergency Response',
    excerpt: 'Rapid deployment medical facilities for disaster relief and emergency healthcare needs.',
    content: 'Learn about specialized healthcare modular buildings designed for emergency response and temporary medical facilities.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
    readTime: '6 min read',
    publishDate: '2024-07-05',
    author: 'Healthcare Team'
  },
  {
    id: 4,
    category: 'Sustainability',
    title: 'Sustainable Building Practices in Modular Construction',
    excerpt: 'Environmental benefits and energy efficiency in modern modular building solutions.',
    content: 'Discover how modular construction contributes to sustainable building practices and environmental conservation.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    readTime: '7 min read',
    publishDate: '2024-07-01',
    author: 'Sustainability Team'
  },
  {
    id: 5,
    category: 'Technology',
    title: 'Smart Building Technology in Modular Structures',
    excerpt: 'Integration of IoT and smart systems in portable buildings for enhanced efficiency.',
    content: 'Explore how modern technology is being integrated into modular buildings for improved operations and user experience.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
    readTime: '5 min read',
    publishDate: '2024-06-28',
    author: 'Technology Team'
  },
  {
    id: 6,
    category: 'Government',
    title: 'Government Facility Solutions: Meeting Public Sector Needs',
    excerpt: 'How modular buildings serve government agencies and public sector requirements.',
    content: 'Learn about specialized solutions for government facilities including security features and compliance requirements.',
    image: 'https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=600&h=400&fit=crop',
    readTime: '6 min read',
    publishDate: '2024-06-25',
    author: 'Government Team'
  }
]

const categories = ['All', 'Education', 'Construction', 'Healthcare', 'Sustainability', 'Technology', 'Government']

export default function InsightsPage() {
  const featuredInsight = insights[0]
  const otherInsights = insights.slice(1)

  return (
    <PageLayout>
      <PageHeader
        subtitle="Resources"
        title="News & Insights"
        description="Stay informed with the latest industry trends, case studies, and expert insights from the world of modular construction."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Insights', href: '/resources/insights' }
        ]}
      />

      {/* Featured Article */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-600 mb-8">Featured Insight</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={featuredInsight.image}
                  alt={featuredInsight.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-steel-500 text-white">
                    {featuredInsight.category}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-navy-600 mb-4">{featuredInsight.title}</h3>
                <p className="text-xl text-gray-600 mb-6">{featuredInsight.content}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{featuredInsight.readTime}</span>
                  </div>
                  <span>{featuredInsight.publishDate}</span>
                  <span>By {featuredInsight.author}</span>
                </div>
                <Button variant="gradient" size="lg" className="group">
                  Read Full Article
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === 'All' ? 'gradient' : 'outline'}
                className={category === 'All' ? '' : 'border-gray-300 text-gray-600 hover:border-navy-600 hover:text-navy-600'}
              >
                <Tag className="h-4 w-4 mr-2" />
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-navy-600 mb-8">Latest Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherInsights.map((insight) => (
                <Link key={insight.id} href={`/resources/insights/${insight.id}`} className="group">
                  <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={insight.image}
                        alt={insight.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-steel-500 text-white">
                          {insight.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-navy-600 mb-3 group-hover:text-steel-500 transition-colors">
                        {insight.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">{insight.excerpt}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{insight.readTime}</span>
                          </div>
                          <span>{insight.publishDate}</span>
                        </div>
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 hero-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Stay Updated with Industry Insights
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest trends, case studies, and expert insights in modular construction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-white/30 bg-white/10 text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Button variant="gradient" size="lg">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
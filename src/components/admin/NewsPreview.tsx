'use client'

import { Calendar, Clock, ArrowRight, Share2, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

interface NewsInsight {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  image_url: string
  category: string
  read_time: string
  published_date: string
}

interface NewsPreviewProps {
  article: NewsInsight
}

export default function NewsPreview({ article }: NewsPreviewProps) {
  const getCategoryColor = (category: string) => {
    const colors = {
      Education: 'bg-blue-100 text-blue-800 border-blue-200',
      Construction: 'bg-green-100 text-green-800 border-green-200',
      Healthcare: 'bg-red-100 text-red-800 border-red-200',
      Government: 'bg-purple-100 text-purple-800 border-purple-200',
      Retail: 'bg-orange-100 text-orange-800 border-orange-200',
      'Emergency Response': 'bg-red-100 text-red-800 border-red-200',
      Sustainability: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      Technology: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      'Industry News': 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Article Header */}
      <div className="px-8 py-12 bg-white">
        <div className="max-w-3xl mx-auto">
          {/* Category and Meta */}
          <div className="flex items-center space-x-4 mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(article.category)}`}>
              {article.category}
            </span>
            <div className="flex items-center text-gray-500 text-sm space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.published_date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{article.read_time}</span>
              </div>
            </div>
          </div>

          {/* Title and Excerpt */}
          <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {article.excerpt}
          </p>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4 mb-8">
            <Button className="bg-navy-600 hover:bg-navy-700">
              <Share2 className="h-4 w-4 mr-2" />
              Share Article
            </Button>
            <Button variant="outline">
              <Bookmark className="h-4 w-4 mr-2" />
              Save for Later
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      {article.image_url && (
        <div className="px-8">
          <div className="max-w-4xl mx-auto">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-lg">
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            {article.content ? (
              <div className="whitespace-pre-line text-gray-700 leading-relaxed">
                {article.content}
              </div>
            ) : (
              <div className="text-gray-500 italic p-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 text-center">
                <p>Article content will appear here when added.</p>
                <p className="text-sm mt-2">Preview shows the article layout with title, excerpt, and metadata.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Article Card Format (for blog listing) */}
      <div className="px-8 py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-gray-900">How this appears in blog listing</h3>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {article.image_url && (
              <div className="relative h-48 w-full">
                <Image
                  src={article.image_url}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
                <div className="flex items-center text-gray-500 text-sm space-x-3">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(article.published_date)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-3 w-3" />
                    <span>{article.read_time}</span>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">
                {article.title}
              </h3>
              
              <p className="text-gray-600 mb-4 leading-relaxed">
                {article.excerpt.length > 150 
                  ? `${article.excerpt.substring(0, 150)}...`
                  : article.excerpt
                }
              </p>
              
              <Button variant="outline" size="sm">
                Read More
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Simple List Format */}
      <div className="px-8 py-16">
        <div className="max-w-3xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 text-gray-900">Simple list format</h3>
          
          <div className="border-l-4 border-steel-500 pl-6 py-4">
            <div className="flex items-center space-x-3 mb-2">
              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                {article.category}
              </span>
              <span className="text-sm text-gray-500">{formatDate(article.published_date)}</span>
            </div>
            
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {article.title}
            </h4>
            
            <p className="text-gray-600 text-sm mb-2">
              {article.excerpt.length > 120 
                ? `${article.excerpt.substring(0, 120)}...`
                : article.excerpt
              }
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{article.read_time}</span>
              <Button variant="link" size="sm" className="p-0 h-auto text-steel-600">
                Read more →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Context */}
      <div className="px-8 py-12 bg-blue-50 border-t border-blue-200">
        <div className="max-w-3xl mx-auto text-center">
          <h4 className="font-semibold text-blue-900 mb-2">Display Options</h4>
          <p className="text-blue-700 text-sm">
            This article can be displayed as a full article page, blog card in listings, or simple list item in news sections.
          </p>
        </div>
      </div>
    </div>
  )
}
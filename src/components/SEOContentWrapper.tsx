'use client'

import React from 'react'
import SEOContent from './SEOContent'
import { useSEOContent } from '@/hooks/useSEOContent'

interface SEOContentWrapperProps {
  pageType: 'solution' | 'industry'
  pageSlug: string
  defaultTitle?: string
}

const SEOContentWrapper: React.FC<SEOContentWrapperProps> = ({
  pageType,
  pageSlug,
  defaultTitle
}) => {
  const { content, loading, error } = useSEOContent(pageType, pageSlug)

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="h-8 bg-gray-200 rounded mb-6 animate-pulse"></div>
              <div className="w-24 h-1 bg-gray-200 mx-auto rounded-full animate-pulse"></div>
            </div>
            <div className="space-y-6">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error && !content) {
    return null // Don't show anything if there's an error and no fallback content
  }

  if (!content) {
    return null // No content available
  }

  return (
    <SEOContent
      title={content.title || defaultTitle}
      paragraphs={content.paragraphs}
    />
  )
}

export default SEOContentWrapper
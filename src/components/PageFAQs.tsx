'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Star, Search, Filter } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { supabase } from '@/lib/supabase'

interface FAQ {
  id: string
  category: string
  question: string
  answer: string
  display_order: number
  is_active: boolean
  tags: string[]
  is_featured: boolean
}

interface PageFAQ {
  id: string
  page_id: string
  faq_id: string
  display_order: number
  is_featured: boolean
  faq: FAQ
}

interface PageFAQsProps {
  pageSlug: string
  title?: string
  subtitle?: string
  showSearch?: boolean
  showFilters?: boolean
  maxItems?: number
  showFeatured?: boolean
  showCategories?: boolean
  className?: string
}

export default function PageFAQs({
  pageSlug,
  title = "Frequently Asked Questions",
  subtitle,
  showSearch = true,
  showFilters = true,
  maxItems,
  showFeatured = true,
  showCategories = true,
  className = ""
}: PageFAQsProps) {
  const [faqs, setFaqs] = useState<PageFAQ[]>([])
  const [loading, setLoading] = useState(true)
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    fetchPageFaqs()
  }, [pageSlug])

  const fetchPageFaqs = async () => {
    try {
      // First get the page ID
      const { data: pageData, error: pageError } = await supabase
        .from('pages')
        .select('id')
        .eq('slug', pageSlug)
        .single()

      if (pageError || !pageData) {
        console.error('Page not found:', pageSlug)
        setLoading(false)
        return
      }

      // Then get the FAQs for this page
      const { data, error } = await supabase
        .from('page_faqs')
        .select(`
          *,
          faq:faqs!inner(*)
        `)
        .eq('page_id', pageData.id)
        .eq('faq.is_active', true)
        .order('is_featured', { ascending: false })
        .order('display_order', { ascending: true })

      if (error) {
        console.error('Error fetching page FAQs:', error)
        setLoading(false)
        return
      }

      let processedFaqs = data || []
      
      // Apply max items limit
      if (maxItems && maxItems > 0) {
        processedFaqs = processedFaqs.slice(0, maxItems)
      }

      setFaqs(processedFaqs)
    } catch (error) {
      console.error('Error fetching page FAQs:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleItem = (id: string) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id)
    } else {
      newOpenItems.add(id)
    }
    setOpenItems(newOpenItems)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      General: 'bg-blue-100 text-blue-800',
      Solutions: 'bg-green-100 text-green-800',
      Industries: 'bg-purple-100 text-purple-800',
      Locations: 'bg-orange-100 text-orange-800',
      Resources: 'bg-indigo-100 text-indigo-800',
      Company: 'bg-gray-100 text-gray-800'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  const getUniqueCategories = () => {
    const categories = Array.from(new Set(faqs.map(pf => pf.faq.category)))
    return categories.sort()
  }

  const filteredFaqs = faqs.filter(pageFaq => {
    const faq = pageFaq.faq
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (faq.tags && faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  // Separate featured and regular FAQs
  const featuredFaqs = showFeatured ? filteredFaqs.filter(pf => pf.is_featured) : []
  const regularFaqs = filteredFaqs.filter(pf => !showFeatured || !pf.is_featured)

  if (loading) {
    return (
      <div className={`w-full ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (faqs.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600">No FAQs available for this page yet.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        {subtitle && (
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        )}
      </div>

      {/* Search and Filters */}
      {(showSearch || showFilters) && (
        <div className="mb-8 space-y-4">
          {showSearch && (
            <div className="relative max-w-lg mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search FAQs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
          
          {showFilters && getUniqueCategories().length > 1 && (
            <div className="flex justify-center">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={selectedCategory === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                  className={selectedCategory === 'all' ? 'bg-navy-600 hover:bg-navy-700' : ''}
                >
                  All
                </Button>
                {getUniqueCategories().map(category => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? 'bg-navy-600 hover:bg-navy-700' : ''}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Featured FAQs */}
      {featuredFaqs.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Star className="h-5 w-5 text-yellow-500 mr-2" />
            Featured Questions
          </h3>
          <div className="space-y-4">
            {featuredFaqs.map((pageFaq) => (
              <FAQItem
                key={pageFaq.id}
                pageFaq={pageFaq}
                isOpen={openItems.has(pageFaq.id)}
                onToggle={() => toggleItem(pageFaq.id)}
                getCategoryColor={getCategoryColor}
                showCategories={showCategories}
                featured={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Regular FAQs */}
      {regularFaqs.length > 0 && (
        <div className="space-y-4">
          {featuredFaqs.length > 0 && (
            <h3 className="text-xl font-semibold text-gray-900 mb-4">All Questions</h3>
          )}
          {regularFaqs.map((pageFaq) => (
            <FAQItem
              key={pageFaq.id}
              pageFaq={pageFaq}
              isOpen={openItems.has(pageFaq.id)}
              onToggle={() => toggleItem(pageFaq.id)}
              getCategoryColor={getCategoryColor}
              showCategories={showCategories}
              featured={false}
            />
          ))}
        </div>
      )}

      {/* No results message */}
      {filteredFaqs.length === 0 && (searchTerm || selectedCategory !== 'all') && (
        <div className="text-center py-8">
          <p className="text-gray-600">No FAQs match your search criteria.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchTerm('')
              setSelectedCategory('all')
            }}
            className="mt-2"
          >
            Clear filters
          </Button>
        </div>
      )}
    </div>
  )
}

interface FAQItemProps {
  pageFaq: PageFAQ
  isOpen: boolean
  onToggle: () => void
  getCategoryColor: (category: string) => string
  showCategories: boolean
  featured: boolean
}

function FAQItem({ pageFaq, isOpen, onToggle, getCategoryColor, showCategories, featured }: FAQItemProps) {
  const { faq } = pageFaq

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${featured ? 'ring-2 ring-yellow-200' : ''}`}>
      <button
        onClick={onToggle}
        className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex items-center justify-between"
      >
        <div className="flex-1">
          {(showCategories || featured) && (
            <div className="flex items-center space-x-2 mb-2">
              {showCategories && (
                <Badge className={getCategoryColor(faq.category)}>
                  {faq.category}
                </Badge>
              )}
              {featured && (
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
              )}
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900 pr-4">
            {faq.question}
          </h3>
        </div>
        <div className="flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div
                className="text-gray-700 prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
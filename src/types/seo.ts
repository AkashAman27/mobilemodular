// Core SEO interfaces for individual page management
export interface SEOData {
  id?: string
  page_path: string
  page_type: PageType
  seo_title?: string
  seo_description?: string
  focus_keyword?: string
  seo_keywords?: string[]
  canonical_url?: string
  json_ld_schema?: string
  social_title?: string
  social_description?: string
  social_image?: string
  robots_meta?: string
  robots_index?: boolean
  robots_follow?: boolean
  robots_nosnippet?: boolean
  og_title?: string
  og_description?: string
  og_image?: string
  og_image_alt?: string
  twitter_title?: string
  twitter_description?: string
  twitter_image?: string
  twitter_image_alt?: string
  structured_data_type?: string
  custom_json_ld?: string
  last_modified?: string
  is_active?: boolean
  last_analyzed?: string
  optimization_score?: number
  created_at?: string
  updated_at?: string
}

export type PageType = 
  | 'homepage' 
  | 'solution' 
  | 'industry' 
  | 'location' 
  | 'resource' 
  | 'company' 
  | 'news'
  | 'contact'
  | 'quote'
  | 'inventory'
  | 'testimonial'
  | 'faq'

export interface SEOValidationStatus {
  isValid: boolean
  score: number
  issues: SEOIssue[]
  warnings: SEOWarning[]
  suggestions: SEOSuggestion[]
}

export interface SEOIssue {
  type: 'error' | 'warning' | 'suggestion'
  field: keyof SEOData
  message: string
  severity: 'critical' | 'major' | 'minor'
  recommendation?: string
}

export interface SEOWarning {
  field: keyof SEOData
  message: string
  current_value?: string
  recommended_value?: string
}

export interface SEOSuggestion {
  field: keyof SEOData
  message: string
  improvement_type: 'length' | 'keyword' | 'structure' | 'content'
  priority: 'high' | 'medium' | 'low'
}

export interface SEOValidationConstraints {
  title: { minLength: number; maxLength: number }
  description: { minLength: number; maxLength: number }
  keywords: { minCount: number; maxCount: number }
  focus_keyword: { required: boolean }
}

export interface SEOSettings {
  id: string
  site_name: string
  site_description: string
  site_url?: string
  default_title_suffix: string
  default_description: string
  default_keywords: string[]
  social_image_default: string
  default_og_image: string
  default_twitter_image: string
  robots_default: string
  json_ld_organization: string
  analytics_tracking?: string
  search_console_verification?: string
  google_search_console_verification?: string
  twitter_username?: string
  organization_name?: string
  organization_logo?: string
  organization_phone?: string
  organization_email?: string
  organization_address?: string
  organization_city?: string
  organization_state?: string
  organization_postal_code?: string
  organization_country?: string
  created_at: string
  updated_at: string
}

export interface SEOTemplate {
  id: string
  page_type: PageType
  title_template: string
  description_template: string
  keywords_template: string[]
  json_ld_template: string
  social_template: {
    title: string
    description: string
    image: string
  }
  template_data?: Record<string, any>
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SEOSyncResult {
  success: boolean
  updated_fields: Array<{
    field: keyof SEOData
    old_value: string | number | boolean | null
    new_value: string | number | boolean | null
    source: 'central' | 'individual' | 'template'
  }>
  conflicts: Array<{
    field: keyof SEOData
    central_value: string | number | boolean | null
    individual_value: string | number | boolean | null
    resolution: 'keep_individual' | 'use_central' | 'merge'
  }>
  changes_applied?: boolean
  errors?: string[]
}

export interface SEOAnalytics {
  page_path: string
  optimization_score: number
  last_crawled?: string
  search_impressions?: number
  search_clicks?: number
  average_position?: number
  click_through_rate?: number
  indexed_pages?: number
  crawl_errors?: number
  performance_score?: number
}

// Error types for better error handling
export class SEOError extends Error {
  constructor(
    message: string,
    public field?: keyof SEOData,
    public code?: string
  ) {
    super(message)
    this.name = 'SEOError'
  }
}

export class SEOValidationError extends SEOError {
  constructor(
    message: string,
    field: keyof SEOData,
    public validationRule: string
  ) {
    super(message, field, 'VALIDATION_ERROR')
    this.name = 'SEOValidationError'
  }
}

export class SEOSyncError extends SEOError {
  constructor(
    message: string,
    public syncType: 'load' | 'save' | 'merge'
  ) {
    super(message, undefined, 'SYNC_ERROR')
    this.name = 'SEOSyncError'
  }
}

// Validation constants
export const SEO_CONSTRAINTS: SEOValidationConstraints = {
  title: { minLength: 30, maxLength: 60 },
  description: { minLength: 120, maxLength: 160 },
  keywords: { minCount: 3, maxCount: 10 },
  focus_keyword: { required: true }
}

// Page type to table mapping for security
export const PAGE_TYPE_TABLES: Record<PageType, string> = {
  homepage: 'homepage_content',
  solution: 'solutions',
  industry: 'industries', 
  location: 'locations',
  resource: 'resources',
  company: 'company_pages',
  news: 'news_insights',
  contact: 'contact_pages',
  quote: 'quote_pages',
  inventory: 'inventory_items',
  testimonial: 'testimonials',
  faq: 'faqs'
}

// Allowed robots meta values
export const ROBOTS_META_OPTIONS = [
  'index, follow',
  'noindex, follow', 
  'index, nofollow',
  'noindex, nofollow',
  'noindex, nofollow, noarchive',
  'noindex, nofollow, nosnippet'
] as const

export type RobotsMetaValue = typeof ROBOTS_META_OPTIONS[number]

// Additional missing types
export type PageSEOData = SEOData

export interface SEOValidationRules {
  title: {
    required: boolean
    minLength: number
    maxLength: number
  }
  description: {
    required: boolean
    minLength: number
    maxLength: number
  }
  keywords: {
    required: boolean
    minCount: number
    maxCount: number
  }
  focus_keyword: {
    required: boolean
    minLength: number
  }
}

export const defaultSEOValidationRules: SEOValidationRules = {
  title: {
    required: true,
    minLength: 30,
    maxLength: 60
  },
  description: {
    required: true,
    minLength: 120,
    maxLength: 160
  },
  keywords: {
    required: false,
    minCount: 3,
    maxCount: 10
  },
  focus_keyword: {
    required: true,
    minLength: 2
  }
}
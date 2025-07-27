import { 
  SEOData, 
  SEOValidationStatus, 
  SEOIssue, 
  SEOWarning, 
  SEOSuggestion,
  SEO_CONSTRAINTS,
  SEOValidationError,
  RobotsMetaValue,
  ROBOTS_META_OPTIONS
} from '@/types/seo'

/**
 * Secure SEO validation utilities with input sanitization
 */
export class SEOValidator {
  private static instance: SEOValidator
  
  static getInstance(): SEOValidator {
    if (!SEOValidator.instance) {
      SEOValidator.instance = new SEOValidator()
    }
    return SEOValidator.instance
  }

  /**
   * Validate complete SEO data with security checks
   */
  validateSEOData(data: Partial<SEOData>): SEOValidationStatus {
    const issues: SEOIssue[] = []
    const warnings: SEOWarning[] = []
    const suggestions: SEOSuggestion[] = []

    try {
      // Validate title
      if (data.seo_title) {
        this.validateTitle(data.seo_title, issues, warnings, suggestions)
      } else {
        issues.push({
          type: 'error',
          field: 'seo_title',
          message: 'SEO title is required',
          severity: 'critical',
          recommendation: 'Add a descriptive title for better search visibility'
        })
      }

      // Validate description
      if (data.seo_description) {
        this.validateDescription(data.seo_description, issues, warnings, suggestions)
      } else {
        issues.push({
          type: 'error',
          field: 'seo_description',
          message: 'Meta description is required',
          severity: 'critical',
          recommendation: 'Add a compelling description to improve click-through rates'
        })
      }

      // Validate focus keyword
      if (data.focus_keyword) {
        this.validateFocusKeyword(data.focus_keyword, issues, warnings, suggestions, data.seo_title, data.seo_description)
      } else {
        issues.push({
          type: 'error',
          field: 'focus_keyword',
          message: 'Focus keyword is required',
          severity: 'major',
          recommendation: 'Choose a primary keyword to target for this page'
        })
      }

      // Validate keywords array
      if (data.seo_keywords) {
        this.validateKeywords(data.seo_keywords, issues, warnings, suggestions)
      }

      // Validate URLs
      if (data.canonical_url) {
        this.validateURL(data.canonical_url, 'canonical_url', issues)
      }

      // Validate JSON-LD
      if (data.json_ld_schema) {
        this.validateJsonLD(data.json_ld_schema, issues)
      }

      // Validate robots meta
      if (data.robots_meta) {
        this.validateRobotsMeta(data.robots_meta, issues)
      }

      // Validate social media fields
      this.validateSocialFields(data, issues, warnings, suggestions)

      // Calculate optimization score
      const score = this.calculateOptimizationScore(data, issues, warnings)

      return {
        isValid: issues.filter(i => i.severity === 'critical').length === 0,
        score,
        issues,
        warnings,
        suggestions
      }

    } catch (error) {
      console.error('SEO validation error:', error)
      return {
        isValid: false,
        score: 0,
        issues: [{
          type: 'error',
          field: 'seo_title',
          message: 'Validation failed due to internal error',
          severity: 'critical'
        }],
        warnings: [],
        suggestions: []
      }
    }
  }

  /**
   * Sanitize and validate title
   */
  private validateTitle(title: string, issues: SEOIssue[], warnings: SEOWarning[], suggestions: SEOSuggestion[]): void {
    const sanitizedTitle = this.sanitizeInput(title)
    const length = sanitizedTitle.length

    if (length < SEO_CONSTRAINTS.title.minLength) {
      issues.push({
        type: 'warning',
        field: 'seo_title',
        message: `Title too short (${length} chars). Minimum ${SEO_CONSTRAINTS.title.minLength} recommended.`,
        severity: 'major',
        recommendation: `Add ${SEO_CONSTRAINTS.title.minLength - length} more characters for better SEO`
      })
    }

    if (length > SEO_CONSTRAINTS.title.maxLength) {
      issues.push({
        type: 'error',
        field: 'seo_title',
        message: `Title too long (${length} chars). Maximum ${SEO_CONSTRAINTS.title.maxLength} recommended.`,
        severity: 'major',
        recommendation: `Reduce by ${length - SEO_CONSTRAINTS.title.maxLength} characters to avoid truncation`
      })
    }

    // Check for HTML tags (security)
    if (this.containsHTML(sanitizedTitle)) {
      issues.push({
        type: 'error',
        field: 'seo_title',
        message: 'Title contains HTML tags which are not allowed',
        severity: 'critical',
        recommendation: 'Remove HTML tags from title'
      })
    }

    // Check for proper capitalization
    if (sanitizedTitle === sanitizedTitle.toLowerCase()) {
      suggestions.push({
        field: 'seo_title',
        message: 'Consider using title case for better readability',
        improvement_type: 'structure',
        priority: 'low'
      })
    }
  }

  /**
   * Sanitize and validate description
   */
  private validateDescription(description: string, issues: SEOIssue[], warnings: SEOWarning[], suggestions: SEOSuggestion[]): void {
    const sanitizedDescription = this.sanitizeInput(description)
    const length = sanitizedDescription.length

    if (length < SEO_CONSTRAINTS.description.minLength) {
      warnings.push({
        field: 'seo_description',
        message: `Description could be longer (${length} chars). ${SEO_CONSTRAINTS.description.minLength}+ recommended.`,
        current_value: length.toString(),
        recommended_value: SEO_CONSTRAINTS.description.minLength.toString()
      })
    }

    if (length > SEO_CONSTRAINTS.description.maxLength) {
      issues.push({
        type: 'error',
        field: 'seo_description',
        message: `Description too long (${length} chars). Maximum ${SEO_CONSTRAINTS.description.maxLength} recommended.`,
        severity: 'major',
        recommendation: `Reduce by ${length - SEO_CONSTRAINTS.description.maxLength} characters`
      })
    }

    // Check for HTML tags
    if (this.containsHTML(sanitizedDescription)) {
      issues.push({
        type: 'error',
        field: 'seo_description',
        message: 'Description contains HTML tags which are not allowed',
        severity: 'critical',
        recommendation: 'Remove HTML tags from description'
      })
    }

    // Check for call-to-action
    const hasCallToAction = /\b(learn more|get quote|contact|call|visit|discover|explore)\b/i.test(sanitizedDescription)
    if (!hasCallToAction) {
      suggestions.push({
        field: 'seo_description',
        message: 'Consider adding a call-to-action to improve click-through rates',
        improvement_type: 'content',
        priority: 'medium'
      })
    }
  }

  /**
   * Validate focus keyword presence and density
   */
  private validateFocusKeyword(
    focusKeyword: string, 
    issues: SEOIssue[], 
    warnings: SEOWarning[], 
    suggestions: SEOSuggestion[],
    title?: string, 
    description?: string
  ): void {
    const sanitizedKeyword = this.sanitizeInput(focusKeyword).toLowerCase()
    
    if (!sanitizedKeyword || sanitizedKeyword.length < 2) {
      issues.push({
        type: 'error',
        field: 'focus_keyword',
        message: 'Focus keyword must be at least 2 characters long',
        severity: 'major'
      })
      return
    }

    // Check keyword in title
    if (title && !title.toLowerCase().includes(sanitizedKeyword)) {
      warnings.push({
        field: 'focus_keyword',
        message: 'Focus keyword not found in title',
        recommended_value: 'Include focus keyword in title for better relevance'
      })
    }

    // Check keyword in description
    if (description && !description.toLowerCase().includes(sanitizedKeyword)) {
      warnings.push({
        field: 'focus_keyword',
        message: 'Focus keyword not found in description',
        recommended_value: 'Include focus keyword in description naturally'
      })
    }

    // Check for keyword stuffing
    if (title && description) {
      const combinedText = `${title} ${description}`.toLowerCase()
      const keywordCount = (combinedText.match(new RegExp(sanitizedKeyword, 'g')) || []).length
      const totalWords = combinedText.split(/\s+/).length
      const density = (keywordCount / totalWords) * 100

      if (density > 5) {
        issues.push({
          type: 'warning',
          field: 'focus_keyword',
          message: `Keyword density too high (${density.toFixed(1)}%). Keep under 5%.`,
          severity: 'major',
          recommendation: 'Reduce keyword repetition to avoid over-optimization'
        })
      }
    }
  }

  /**
   * Validate keywords array
   */
  private validateKeywords(keywords: string[], issues: SEOIssue[], warnings: SEOWarning[], suggestions: SEOSuggestion[]): void {
    const sanitizedKeywords = keywords.map(k => this.sanitizeInput(k)).filter(k => k.length > 0)

    if (sanitizedKeywords.length < SEO_CONSTRAINTS.keywords.minCount) {
      warnings.push({
        field: 'seo_keywords',
        message: `Consider adding more keywords (${sanitizedKeywords.length}/${SEO_CONSTRAINTS.keywords.minCount} minimum)`,
        recommended_value: `Add ${SEO_CONSTRAINTS.keywords.minCount - sanitizedKeywords.length} more relevant keywords`
      })
    }

    if (sanitizedKeywords.length > SEO_CONSTRAINTS.keywords.maxCount) {
      warnings.push({
        field: 'seo_keywords',
        message: `Too many keywords (${sanitizedKeywords.length}/${SEO_CONSTRAINTS.keywords.maxCount} maximum)`,
        recommended_value: `Focus on ${SEO_CONSTRAINTS.keywords.maxCount} most important keywords`
      })
    }

    // Check for duplicates
    const duplicates = sanitizedKeywords.filter((item, index) => sanitizedKeywords.indexOf(item) !== index)
    if (duplicates.length > 0) {
      warnings.push({
        field: 'seo_keywords',
        message: `Duplicate keywords found: ${duplicates.join(', ')}`,
        recommended_value: 'Remove duplicate keywords'
      })
    }
  }

  /**
   * Validate URL format and security
   */
  private validateURL(url: string, field: keyof SEOData, issues: SEOIssue[]): void {
    const sanitizedUrl = this.sanitizeInput(url)
    
    try {
      const urlObj = new URL(sanitizedUrl)
      
      // Only allow HTTPS URLs
      if (urlObj.protocol !== 'https:') {
        issues.push({
          type: 'error',
          field,
          message: 'URL must use HTTPS protocol',
          severity: 'major',
          recommendation: 'Change to HTTPS for security and SEO benefits'
        })
      }

      // Check for suspicious patterns
      if (this.containsSuspiciousPatterns(sanitizedUrl)) {
        issues.push({
          type: 'error',
          field,
          message: 'URL contains potentially malicious content',
          severity: 'critical',
          recommendation: 'Use a safe, clean URL'
        })
      }

    } catch (error) {
      issues.push({
        type: 'error',
        field,
        message: 'Invalid URL format',
        severity: 'major',
        recommendation: 'Provide a valid URL starting with https://'
      })
    }
  }

  /**
   * Validate and sanitize JSON-LD schema
   */
  private validateJsonLD(jsonLD: string, issues: SEOIssue[]): void {
    try {
      const sanitized = this.sanitizeInput(jsonLD)
      const parsed = JSON.parse(sanitized)
      
      // Validate required @context
      if (!parsed['@context']) {
        issues.push({
          type: 'error',
          field: 'json_ld_schema',
          message: 'JSON-LD schema missing @context',
          severity: 'major',
          recommendation: 'Add @context property to JSON-LD schema'
        })
      }

      // Validate @type
      if (!parsed['@type']) {
        issues.push({
          type: 'error',
          field: 'json_ld_schema',
          message: 'JSON-LD schema missing @type',
          severity: 'major',
          recommendation: 'Add @type property to define schema type'
        })
      }

      // Check for XSS patterns in JSON values
      const jsonString = JSON.stringify(parsed)
      if (this.containsXSSPatterns(jsonString)) {
        issues.push({
          type: 'error',
          field: 'json_ld_schema',
          message: 'JSON-LD contains potentially malicious content',
          severity: 'critical',
          recommendation: 'Remove script tags and unsafe content from JSON-LD'
        })
      }

    } catch (error) {
      issues.push({
        type: 'error',
        field: 'json_ld_schema',
        message: 'Invalid JSON-LD format',
        severity: 'major',
        recommendation: 'Provide valid JSON-LD structured data'
      })
    }
  }

  /**
   * Validate robots meta directive
   */
  private validateRobotsMeta(robotsMeta: string, issues: SEOIssue[]): void {
    const sanitized = this.sanitizeInput(robotsMeta)
    
    if (!ROBOTS_META_OPTIONS.includes(sanitized as RobotsMetaValue)) {
      issues.push({
        type: 'error',
        field: 'robots_meta',
        message: 'Invalid robots meta directive',
        severity: 'major',
        recommendation: `Use one of: ${ROBOTS_META_OPTIONS.join(', ')}`
      })
    }
  }

  /**
   * Validate social media fields
   */
  private validateSocialFields(
    data: Partial<SEOData>, 
    issues: SEOIssue[], 
    warnings: SEOWarning[], 
    suggestions: SEOSuggestion[]
  ): void {
    // Validate social title
    if (data.social_title) {
      const length = data.social_title.length
      if (length > 60) {
        warnings.push({
          field: 'social_title',
          message: `Social title may be truncated (${length} chars)`,
          recommended_value: 'Keep under 60 characters for social media'
        })
      }
    }

    // Validate social description
    if (data.social_description) {
      const length = data.social_description.length
      if (length > 200) {
        warnings.push({
          field: 'social_description',
          message: `Social description may be truncated (${length} chars)`,
          recommended_value: 'Keep under 200 characters for social media'
        })
      }
    }

    // Validate social image URL
    if (data.social_image) {
      this.validateURL(data.social_image, 'social_image', issues)
    } else {
      suggestions.push({
        field: 'social_image',
        message: 'Add social media image for better engagement',
        improvement_type: 'content',
        priority: 'medium'
      })
    }
  }

  /**
   * Calculate optimization score based on validation results
   */
  private calculateOptimizationScore(
    data: Partial<SEOData>, 
    issues: SEOIssue[], 
    warnings: SEOWarning[]
  ): number {
    let score = 100

    // Deduct for critical issues
    const criticalIssues = issues.filter(i => i.severity === 'critical')
    score -= criticalIssues.length * 25

    // Deduct for major issues
    const majorIssues = issues.filter(i => i.severity === 'major')
    score -= majorIssues.length * 15

    // Deduct for minor issues
    const minorIssues = issues.filter(i => i.severity === 'minor')
    score -= minorIssues.length * 5

    // Deduct for warnings
    score -= warnings.length * 3

    // Bonus points for completeness
    if (data.seo_title && data.seo_description && data.focus_keyword) {
      score += 10
    }

    if (data.json_ld_schema) {
      score += 5
    }

    if (data.social_title && data.social_description && data.social_image) {
      score += 5
    }

    return Math.max(0, Math.min(100, score))
  }

  /**
   * Security utilities
   */
  private sanitizeInput(input: string): string {
    if (typeof input !== 'string') return ''
    
    return input
      .trim()
      .replace(/[<>]/g, '') // Remove angle brackets
      .replace(/javascript:/gi, '') // Remove javascript: protocol
      .replace(/data:/gi, '') // Remove data: protocol
      .slice(0, 1000) // Limit length
  }

  private containsHTML(input: string): boolean {
    return /<[^>]*>/g.test(input)
  }

  private containsXSSPatterns(input: string): boolean {
    const xssPatterns = [
      /<script/gi,
      /javascript:/gi,
      /onload=/gi,
      /onerror=/gi,
      /onclick=/gi,
      /eval\(/gi,
      /document\./gi,
      /window\./gi
    ]
    
    return xssPatterns.some(pattern => pattern.test(input))
  }

  private containsSuspiciousPatterns(input: string): boolean {
    const suspiciousPatterns = [
      /[<>'"]/,
      /javascript:/gi,
      /data:/gi,
      /vbscript:/gi,
      /file:/gi
    ]
    
    return suspiciousPatterns.some(pattern => pattern.test(input))
  }
}

// Export singleton instance
export const seoValidator = SEOValidator.getInstance()
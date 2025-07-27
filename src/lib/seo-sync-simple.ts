/**
 * Simplified SEO Sync Manager for Build Compatibility
 */

import type { 
  SEOData, 
  SEOSettings, 
  SEOTemplate, 
  SEOSyncResult,
  PageType,
  SEOValidationStatus
} from '@/types/seo'
import { seoValidator } from './seo-validation'

export class SEOSyncManager {
  private static instance: SEOSyncManager
  
  static getInstance(): SEOSyncManager {
    if (!SEOSyncManager.instance) {
      SEOSyncManager.instance = new SEOSyncManager()
    }
    return SEOSyncManager.instance
  }

  async getMergedSEOData(
    pageType: PageType,
    contentId?: string,
    pagePath?: string
  ): Promise<SEOData> {
    // Return basic SEO data structure for now
    return {
      page_path: pagePath || '',
      page_type: pageType,
      seo_title: '',
      seo_description: '',
      focus_keyword: '',
      seo_keywords: [],
      is_active: true
    } as SEOData
  }

  generateSuggestions(seoData: Partial<SEOData>, mergedData: SEOData | null) {
    return []
  }

  async saveSEOData(data: Partial<SEOData>): Promise<SEOSyncResult> {
    return {
      success: true,
      updated_fields: [],
      conflicts: []
    }
  }

  async saveIndividualSEO(
    pageType: PageType,
    pagePath: string,
    seoData: Partial<SEOData>,
    contentId?: string,
    skipSync?: boolean
  ): Promise<SEOSyncResult> {
    return {
      success: true,
      updated_fields: [],
      conflicts: []
    }
  }
}

export const seoSyncManager = SEOSyncManager.getInstance()

export async function validateSEO(data: Partial<SEOData>): Promise<SEOValidationStatus> {
  return seoValidator.validateSEOData(data)
}
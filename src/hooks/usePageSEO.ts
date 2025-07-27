/**
 * Page SEO Hook
 * Provides easy integration for SEO functionality across different page types
 */

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import type { 
  SEOData, 
  PageType, 
  SEOValidationStatus,
  SEOSyncResult 
} from '@/types/seo'
import { seoSyncManager, validateSEO } from '@/lib/seo-sync-simple'

interface UsePageSEOOptions {
  pageType: PageType
  pagePath: string
  contentId?: string
  initialData?: Partial<SEOData>
  autoSave?: boolean
  onSave?: (data: Partial<SEOData>) => void
  onValidationChange?: (status: SEOValidationStatus) => void
}

interface UsePageSEOReturn {
  // Data
  seoData: Partial<SEOData>
  mergedData: SEOData | null
  validationStatus: SEOValidationStatus | null
  
  // States
  loading: boolean
  saving: boolean
  syncing: boolean
  hasUnsavedChanges: boolean
  
  // Actions
  updateField: (field: keyof SEOData, value: any) => void
  updateMultiple: (data: Partial<SEOData>) => void
  save: (silent?: boolean) => Promise<SEOSyncResult | null>
  syncWithCentral: () => Promise<void>
  reset: () => void
  loadData: () => Promise<void>
  
  // Utilities
  generateSlug: (title: string) => string
  getOptimizationScore: () => number
  getSuggestions: () => Array<{ field: keyof SEOData; suggestion: string; priority: 'high' | 'medium' | 'low' }>
  validateData: () => SEOValidationStatus
  
  // Sync results
  lastSyncResult: SEOSyncResult | null
}

export function usePageSEO({
  pageType,
  pagePath,
  contentId,
  initialData = {},
  autoSave = false,
  onSave,
  onValidationChange
}: UsePageSEOOptions): UsePageSEOReturn {
  
  const [seoData, setSeoData] = useState<Partial<SEOData>>(initialData)
  const [mergedData, setMergedData] = useState<SEOData | null>(null)
  const [validationStatus, setValidationStatus] = useState<SEOValidationStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
  const [lastSyncResult, setLastSyncResult] = useState<SEOSyncResult | null>(null)
  const [originalData, setOriginalData] = useState<Partial<SEOData>>(initialData)

  // Load SEO data on mount
  useEffect(() => {
    loadData()
  }, [pageType, pagePath, contentId])

  // Validate data when it changes
  useEffect(() => {
    if (Object.keys(seoData).length > 0) {
      validateSEO(seoData).then(status => {
        setValidationStatus(status)
        onValidationChange?.(status)
      }).catch(error => {
        console.warn('Validation error:', error)
        setValidationStatus(null)
      })
    }
  }, [seoData, onValidationChange])

  // Track unsaved changes
  useEffect(() => {
    const hasChanges = JSON.stringify(seoData) !== JSON.stringify(originalData)
    setHasUnsavedChanges(hasChanges)
  }, [seoData, originalData])

  // Auto-save functionality
  useEffect(() => {
    if (autoSave && hasUnsavedChanges && Object.keys(seoData).length > 0) {
      const timer = setTimeout(() => {
        save(true) // Silent save
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [seoData, autoSave, hasUnsavedChanges])

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const data = await seoSyncManager.getMergedSEOData(pageType, contentId, pagePath)
      setMergedData(data)
      
      // Use merged data for SEO
      setSeoData(data)
      setOriginalData(data)
      setHasUnsavedChanges(false)
    } catch (error) {
      console.warn('Failed to load SEO data:', error)
      setSeoData(initialData)
    } finally {
      setLoading(false)
    }
  }, [pageType, contentId, pagePath, initialData])

  const updateField = useCallback((field: keyof SEOData, value: any) => {
    setSeoData(prev => ({ ...prev, [field]: value }))
  }, [])

  const updateMultiple = useCallback((data: Partial<SEOData>) => {
    setSeoData(prev => ({ ...prev, ...data }))
  }, [])

  const save = useCallback(async (silent: boolean = false): Promise<SEOSyncResult | null> => {
    setSaving(true)
    try {
      const result = await seoSyncManager.saveIndividualSEO(
        pageType, 
        pagePath, 
        seoData, 
        contentId
      )
      
      if (result.success) {
        setLastSyncResult(result)
        setOriginalData(seoData)
        setHasUnsavedChanges(false)
        if (!silent) {
          onSave?.(seoData)
        }
        return result
      } else {
        console.error('Save failed:', result.errors)
        return result
      }
    } catch (error) {
      console.error('Error saving SEO data:', error)
      return null
    } finally {
      setSaving(false)
    }
  }, [pageType, pagePath, seoData, contentId, onSave])

  const syncWithCentral = useCallback(async () => {
    setSyncing(true)
    try {
      // Reload merged data to get latest central settings
      const freshData = await seoSyncManager.getMergedSEOData(pageType, contentId, pagePath)
      setMergedData(freshData)
      
      // Apply central defaults to empty fields
      const updatedData = { ...seoData }
      let hasChanges = false

      Object.entries(freshData).forEach(([key, value]) => {
        if (!updatedData[key as keyof SEOData] && value) {
          (updatedData as any)[key] = value
          hasChanges = true
        }
      })

      if (hasChanges) {
        setSeoData(updatedData)
        await save(true)
      }
    } catch (error) {
      console.error('Error syncing with central:', error)
    } finally {
      setSyncing(false)
    }
  }, [pageType, contentId, pagePath, seoData, save])

  const reset = useCallback(() => {
    setSeoData(originalData)
    setHasUnsavedChanges(false)
    setLastSyncResult(null)
  }, [originalData])

  const generateSlug = useCallback((title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }, [])

  const getOptimizationScore = useCallback((): number => {
    if (!validationStatus) return 0
    return validationStatus.score
  }, [validationStatus])

  const getSuggestions = useCallback(() => {
    return seoSyncManager.generateSuggestions(seoData, mergedData)
  }, [seoData, mergedData])

  const validateData = useCallback((): SEOValidationStatus => {
    // Return basic validation for now
    return {
      isValid: true,
      score: 100,
      issues: [],
      warnings: [],
      suggestions: []
    }
  }, [seoData])

  return {
    // Data
    seoData,
    mergedData,
    validationStatus,
    
    // States
    loading,
    saving,
    syncing,
    hasUnsavedChanges,
    
    // Actions
    updateField,
    updateMultiple,
    save,
    syncWithCentral,
    reset,
    loadData,
    
    // Utilities
    generateSlug,
    getOptimizationScore,
    getSuggestions,
    validateData,
    
    // Sync results
    lastSyncResult
  }
}
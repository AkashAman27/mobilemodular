'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw, CheckCircle } from 'lucide-react'

interface SyncButtonProps {
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function SyncButton({ className = '', size = 'sm' }: SyncButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [lastSync, setLastSync] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const getBaseUrl = () => {
    // Environment detection
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname
      
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3000'
      } else {
        return 'https://mobilemodular.vercel.app'
      }
    }
    
    // Fallback for server-side rendering
    return process.env.NODE_ENV === 'development' 
      ? 'http://localhost:3000' 
      : 'https://mobilemodular.vercel.app'
  }

  const handleSync = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const baseUrl = getBaseUrl()
      const response = await fetch(`${baseUrl}/api/manual-revalidate`, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to sync: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.success) {
        setLastSync(new Date().toLocaleTimeString())
        
        // Show success feedback for 3 seconds
        setTimeout(() => {
          setLastSync(null)
        }, 3000)
      } else {
        throw new Error(data.error || 'Sync failed')
      }
    } catch (err) {
      console.error('Sync error:', err)
      setError(err instanceof Error ? err.message : 'Sync failed')
      
      // Clear error after 5 seconds
      setTimeout(() => {
        setError(null)
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }

  const buttonSizes = {
    sm: 'h-8 px-3 text-xs',
    md: 'h-10 px-4 text-sm',
    lg: 'h-12 px-6 text-base'
  }

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        onClick={handleSync}
        disabled={isLoading}
        variant="outline"
        className={`
          ${buttonSizes[size]}
          ${lastSync ? 'border-green-500 bg-green-50 text-green-700' : ''}
          ${error ? 'border-red-500 bg-red-50 text-red-700' : ''}
          ${isLoading ? 'opacity-70' : ''}
          flex items-center gap-2 font-medium transition-all duration-200
        `}
        title={
          lastSync 
            ? `Last synced at ${lastSync}` 
            : error 
            ? error
            : 'Sync content changes to live site'
        }
      >
        {lastSync ? (
          <>
            <CheckCircle className={iconSizes[size]} />
            {size !== 'sm' && 'Synced'}
          </>
        ) : (
          <>
            <RefreshCw className={`${iconSizes[size]} ${isLoading ? 'animate-spin' : ''}`} />
            {size !== 'sm' && (isLoading ? 'Syncing...' : 'Sync')}
          </>
        )}
      </Button>
      
      {/* Status text for small buttons */}
      {size === 'sm' && (lastSync || error) && (
        <span className={`text-xs ${lastSync ? 'text-green-600' : 'text-red-600'}`}>
          {lastSync ? `Synced ${lastSync}` : error}
        </span>
      )}
    </div>
  )
}
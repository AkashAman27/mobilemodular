'use client'

import React from 'react'
import LoadingSpinner from './LoadingSpinner'

interface PageLoaderProps {
  loading: boolean
  error?: string | null
  children: React.ReactNode
  loadingMessage?: string
  errorMessage?: string
  variant?: 'default' | 'city' | 'location'
  size?: 'sm' | 'md' | 'lg'
  showLogo?: boolean
  layout?: React.ComponentType<{ children: React.ReactNode }> | null
}

const PageLoader = ({
  loading,
  error,
  children,
  loadingMessage = "Loading...",
  errorMessage,
  variant = 'default',
  size = 'lg',
  showLogo = true,
  layout: Layout = null
}: PageLoaderProps) => {
  
  const LoadingComponent = () => (
    <LoadingSpinner 
      message={loadingMessage}
      size={size}
      variant={variant}
      showLogo={showLogo}
    />
  )

  const ErrorComponent = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="text-6xl text-gray-400 mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong</h1>
        <p className="text-gray-600 mb-6">
          {errorMessage || error || "We encountered an unexpected error. Please try again."}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  )

  if (loading) {
    return Layout ? (
      <Layout>
        <LoadingComponent />
      </Layout>
    ) : (
      <LoadingComponent />
    )
  }

  if (error) {
    return Layout ? (
      <Layout>
        <ErrorComponent />
      </Layout>
    ) : (
      <ErrorComponent />
    )
  }

  return <>{children}</>
}

export default PageLoader
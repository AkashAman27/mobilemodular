'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Building2, MapPin } from 'lucide-react'
import Image from 'next/image'

interface LoadingSpinnerProps {
  message?: string
  size?: 'sm' | 'md' | 'lg'
  showLogo?: boolean
  variant?: 'default' | 'city' | 'location'
}

const LoadingSpinner = ({ 
  message = "Loading...", 
  size = 'md', 
  showLogo = true,
  variant = 'default'
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24'
  }

  const containerSizes = {
    sm: 'min-h-[200px]',
    md: 'min-h-[400px]',
    lg: 'min-h-screen'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-lg',
    lg: 'text-xl'
  }

  // Animated building blocks
  const BuildingBlocks = () => (
    <div className="relative">
      {/* Main building animation */}
      <motion.div
        className="flex items-end justify-center space-x-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {[1, 2, 3, 4, 5].map((block, index) => (
          <motion.div
            key={block}
            className={`bg-gradient-to-t from-navy-600 to-blue-500 rounded-sm ${
              size === 'lg' ? 'w-3' : size === 'md' ? 'w-2' : 'w-1.5'
            }`}
            style={{
              height: `${20 + (index % 3) * 15}px`
            }}
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 1 }}
            transition={{
              duration: 0.8,
              delay: index * 0.15,
              ease: "easeOut"
            }}
          />
        ))}
      </motion.div>
      
      {/* Floating crane */}
      <motion.div
        className="absolute -top-4 -right-2"
        animate={{
          x: [0, 5, 0],
          y: [0, -2, 0]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className={`${size === 'lg' ? 'text-yellow-500 text-lg' : 'text-yellow-500 text-sm'}`}>
          🏗️
        </div>
      </motion.div>
    </div>
  )

  // Spinning compass for location loading
  const LocationCompass = () => (
    <div className="relative">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear"
        }}
        className="relative"
      >
        <MapPin className={`${sizeClasses[size]} text-blue-600`} />
      </motion.div>
      
      {/* Pulsing circle */}
      <motion.div
        className="absolute inset-0 border-2 border-blue-300 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.1, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </div>
  )

  // Modular building assembly animation
  const ModularAssembly = () => (
    <div className="relative">
      <motion.div className="grid grid-cols-2 gap-1">
        {[1, 2, 3, 4].map((module, index) => (
          <motion.div
            key={module}
            className={`bg-gradient-to-br from-blue-500 to-navy-600 rounded-sm ${
              size === 'lg' ? 'w-6 h-6' : size === 'md' ? 'w-4 h-4' : 'w-3 h-3'
            }`}
            initial={{ 
              scale: 0,
              rotate: 180,
              opacity: 0
            }}
            animate={{ 
              scale: 1,
              rotate: 0,
              opacity: 1
            }}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: "backOut"
            }}
          />
        ))}
      </motion.div>
      
      {/* Connecting lines animation */}
      <motion.div
        className="absolute inset-0 border border-yellow-400 rounded-sm"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      />
    </div>
  )

  const getLoadingIcon = () => {
    switch (variant) {
      case 'city':
        return <BuildingBlocks />
      case 'location':
        return <LocationCompass />
      default:
        return <ModularAssembly />
    }
  }

  return (
    <div className={`flex items-center justify-center ${containerSizes[size]} bg-gradient-to-br from-gray-50 to-blue-50`}>
      <div className="text-center">
        {/* Logo Section */}
        {showLogo && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="relative h-12 w-12">
                <Image
                  src="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/company_logo_professional_aman_modular_constructio.webp"
                  alt="Aman Modular Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-2xl font-bold text-navy-600">AMAN MODULAR</div>
            </div>
          </motion.div>
        )}

        {/* Main Loading Animation */}
        <motion.div
          className="mb-6 flex justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {getLoadingIcon()}
        </motion.div>

        {/* Loading Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-2"
        >
          <p className={`${textSizes[size]} font-semibold text-navy-600`}>
            {message}
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center space-x-1">
            {[1, 2, 3].map((dot) => (
              <motion.div
                key={dot}
                className="w-2 h-2 bg-blue-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: dot * 0.2
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: '100%' }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-8 max-w-xs mx-auto"
        >
          <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-yellow-400 rounded-full"
              animate={{
                x: ["-100%", "100%"]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>

        {/* Additional Context Message */}
        {variant === 'city' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-4 text-sm text-gray-600 max-w-md mx-auto"
          >
            Preparing your custom city experience with local information and services...
          </motion.p>
        )}

        {variant === 'location' && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mt-4 text-sm text-gray-600 max-w-md mx-auto"
          >
            Finding the best modular building solutions in your area...
          </motion.p>
        )}
      </div>
    </div>
  )
}

export default LoadingSpinner
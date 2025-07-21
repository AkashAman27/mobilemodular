'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
  backgroundImage?: string
  ctaText?: string
  ctaLink?: string
  breadcrumbs?: { label: string; href?: string }[]
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  description,
  backgroundImage,
  ctaText = "Get Quote",
  ctaLink = "/quote",
  breadcrumbs
}) => {
  return (
    <section className="relative py-20 hero-gradient overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Breadcrumbs */}
          {breadcrumbs && (
            <motion.nav
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center justify-center space-x-2 text-blue-200 text-sm mb-6"
            >
              {breadcrumbs.map((crumb, index) => (
                <React.Fragment key={crumb.href || crumb.label}>
                  {crumb.href ? (
                    <a href={crumb.href} className="hover:text-white transition-colors">
                      {crumb.label}
                    </a>
                  ) : (
                    <span className="text-white">
                      {crumb.label}
                    </span>
                  )}
                  {index < breadcrumbs.length - 1 && (
                    <span className="text-blue-300">•</span>
                  )}
                </React.Fragment>
              ))}
            </motion.nav>
          )}

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-yellow-400 font-semibold text-sm uppercase tracking-wide mb-4"
            >
              {subtitle}
            </motion.p>
          )}

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          >
            {title}
          </motion.h1>

          {/* Description */}
          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              {description}
            </motion.p>
          )}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button 
              variant="gradient" 
              size="xl"
              className="group"
              onClick={() => window.location.href = ctaLink}
            >
              {ctaText}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export { PageHeader }
export default PageHeader
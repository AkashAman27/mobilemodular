'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, Phone, Clock } from 'lucide-react'
import { Button } from './ui/button'

interface NavigationItem {
  name: string
  href: string
  dropdown?: Array<{ label: string; href: string }>
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navigation: NavigationItem[] = [
    {
      name: 'Solutions',
      href: '/solutions',
      dropdown: [
        { label: 'Office Buildings', href: '/solutions/office-buildings' },
        { label: 'Portable Classrooms', href: '/solutions/portable-classrooms' },
        { label: 'Restroom Facilities', href: '/solutions/restroom-facilities' },
        { label: 'Restaurant & Food Service', href: '/solutions/restaurant-food-service' },
        { label: 'Healthcare Facilities', href: '/solutions/healthcare-facilities' },
        { label: 'Security Buildings', href: '/solutions/security-buildings' },
      ]
    },
    {
      name: 'Industries',
      href: '/industries',
      dropdown: [
        { label: 'Education', href: '/industries/education' },
        { label: 'Construction', href: '/industries/construction' },
        { label: 'Healthcare', href: '/industries/healthcare' },
        { label: 'Government', href: '/industries/government' },
        { label: 'Retail & Commercial', href: '/industries/retail-commercial' },
        { label: 'Emergency Response', href: '/industries/emergency-response' },
      ]
    },
    { name: 'Locations', href: '/locations' },
    {
      name: 'Resources',
      href: '/resources',
      dropdown: [
        { label: 'Product Gallery', href: '/resources/product-gallery' },
        { label: 'Case Studies', href: '/resources/case-studies' },
        { label: 'Planning Tools', href: '/resources/planning-tools' },
        { label: 'FAQ', href: '/resources/faq' },
      ]
    },
    {
      name: 'Company',
      href: '/company',
      dropdown: [
        { label: 'About Us', href: '/company/about-us' },
        { label: 'Our Process', href: '/company/our-process' },
        { label: 'Quality Standards', href: '/company/quality-standards' },
      ]
    },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 hero-gradient">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full gradient-blue flex items-center justify-center">
              <span className="text-white font-bold text-sm">AM</span>
            </div>
            <span className="text-xl font-bold text-white">AMAN MODULAR</span>
          </Link>

          {/* Desktop Navigation - Moved more towards center-right */}
          <nav className="hidden lg:flex items-center space-x-8 ml-32 flex-1 justify-center">
            {navigation.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="flex items-center space-x-1 text-white hover:text-yellow-400 font-medium transition-colors"
                >
                  <span>{item.name}</span>
                  {item.dropdown && (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && activeDropdown === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2"
                    >
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-navy-600 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Desktop CTA - Positioned on far right with more spacing */}
          <div className="hidden lg:flex items-center space-x-8 ml-8">
            <div className="flex items-center space-x-2 text-sm text-white">
              <Phone className="h-4 w-4" />
              <span>(866) 819-9017</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-white">
              <Clock className="h-4 w-4" />
              <span>24/7 Support</span>
            </div>
            <div className="ml-6">
              <Link href="/quote">
                <Button variant="gradient" size="lg">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-yellow-400"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-navy-600 border-t border-white/20"
          >
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navigation.map((item) => (
                <div key={item.name}>
                  <Link
                    href={item.href}
                    className="block text-white hover:text-yellow-400 font-medium py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="ml-4 space-y-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block text-blue-200 hover:text-yellow-400 py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-white/20">
                <div className="flex items-center space-x-2 text-sm text-white mb-2">
                  <Phone className="h-4 w-4" />
                  <span>(866) 819-9017</span>
                </div>
                <Link href="/quote">
                  <Button variant="gradient" className="w-full">
                    Get Quote
                  </Button>
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Menu, X, Phone, Clock, ChevronRight, Package, Users, ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'
import { stateLocations } from '@/data/locations-menu'

interface NavigationItem {
  name: string
  href: string
  dropdown?: Array<{ label: string; href: string }>
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [selectedState, setSelectedState] = useState<string>('AL') // Default to Alabama

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
    { name: 'Locations', href: '/locations', dropdown: [] }, // Special handling for locations
    {
      name: 'Resources',
      href: '/resources',
      dropdown: [
        { label: 'Live Inventory', href: '/resources/live-inventory' },
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

  // Top menu items
  const topMenuItems = [
    { 
      name: 'Live Inventory', 
      href: '/resources/live-inventory', 
      icon: Package,
      description: 'Browse Available Buildings'
    },
    { 
      name: 'Fleet For Sale', 
      href: '/fleet-for-sale', 
      icon: null,
      description: null
    },
    { 
      name: 'Request Service', 
      href: '/request-service', 
      icon: null,
      description: null
    },
    { 
      name: 'CustomerHub', 
      href: '/customer-hub', 
      icon: Users,
      description: null
    },
  ]

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top Menu Bar */}
      <div className="bg-navy-800 border-b border-navy-700">
        <div className="container mx-auto px-4">
          <div className="flex h-12 items-center justify-end">
            {/* Left - Empty space for future expansion */}
            <div className="flex-1"></div>

            {/* Center-Right - Top Menu Items */}
            <nav className="hidden lg:flex items-center space-x-8 mr-8">
              {topMenuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-sm text-white hover:text-yellow-400 transition-colors"
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>

            {/* Right - Contact Info */}
            <div className="hidden lg:flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded text-sm text-gray-700">
                <Phone className="h-4 w-4 text-orange-500" />
                <span className="font-medium">866-352-4651</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded text-sm text-gray-700">
                <Clock className="h-4 w-4 text-orange-500" />
                <span className="font-medium">24/7 Support</span>
              </div>
            </div>

            {/* Mobile - Show just phone number */}
            <div className="lg:hidden flex items-center">
              <div className="flex items-center space-x-2 bg-white px-3 py-1 rounded text-sm text-gray-700">
                <Phone className="h-4 w-4 text-orange-500" />
                <span className="font-medium">866-352-4651</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-gradient-to-r from-navy-600 to-steel-600 border-b border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <Image
                  src="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/company_logo_professional_aman_modular_constructio.webp"
                  alt="Aman Modular Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white">AMAN MODULAR</span>
            </Link>

            {/* Desktop Navigation */}
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
                        className={`absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 ${
                          item.name === 'Locations' ? 'w-96' : 'w-64'
                        }`}
                      >
                        {item.name === 'Locations' ? (
                          // Special Locations Dropdown with States and Cities
                          <div className="flex">
                            <div className="w-1/2 border-r border-gray-200">
                              <div className="max-h-96 overflow-y-auto">
                                {stateLocations.map((state) => (
                                  <div
                                    key={state.state}
                                    className={`cursor-pointer transition-colors flex items-center justify-between ${
                                      selectedState === state.state 
                                        ? 'bg-navy-600 text-white' 
                                        : 'text-gray-700 hover:bg-gray-50'
                                    }`}
                                    onMouseEnter={() => setSelectedState(state.state)}
                                  >
                                    <Link
                                      href={`/locations/${state.stateName.toLowerCase().replace(/\s+/g, '-')}`}
                                      className="flex-1 px-4 py-2 flex items-center justify-between"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      <span>{state.stateName}</span>
                                      <ChevronRight className={`h-4 w-4 ${
                                        selectedState === state.state ? 'text-white' : 'text-gray-400'
                                      }`} />
                                    </Link>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="w-1/2">
                              <Link
                                href={`/locations/${stateLocations.find(s => s.state === selectedState)?.stateName.toLowerCase().replace(/\s+/g, '-')}`}
                                className="block px-4 py-2 text-sm font-semibold text-navy-600 border-b border-gray-100 hover:bg-gray-50 transition-colors"
                                onClick={() => setActiveDropdown(null)}
                              >
                                All {stateLocations.find(s => s.state === selectedState)?.stateName} Locations
                              </Link>
                              <div className="max-h-96 overflow-y-auto">
                                {stateLocations
                                  .find(state => state.state === selectedState)
                                  ?.cities.map((city) => (
                                    <Link
                                      key={city.name}
                                      href={city.href}
                                      className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-navy-600 transition-colors"
                                      onClick={() => setActiveDropdown(null)}
                                    >
                                      {city.name}
                                    </Link>
                                  ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          // Regular dropdown for other menu items
                          item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-navy-600 transition-colors"
                            >
                              {subItem.label}
                            </Link>
                          ))
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center space-x-4 ml-8">
              <Link href="/cart" className="text-white hover:text-yellow-400 transition-colors">
                <ShoppingCart className="h-6 w-6" />
              </Link>
              <Link href="/quote">
                <Button variant="gradient" size="lg">
                  Get Quote
                </Button>
              </Link>
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
              {/* Top Menu Items in Mobile */}
              <div className="border-b border-white/20 pb-4 mb-4">
                <h3 className="text-sm font-semibold text-steel-200 mb-2">Quick Access</h3>
                {topMenuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center space-x-2 text-white hover:text-yellow-400 py-2"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <span>{item.name}</span>
                  </Link>
                ))}
              </div>

              {/* Main Navigation Items */}
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
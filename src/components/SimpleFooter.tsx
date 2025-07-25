'use client'

import React from 'react'
import Link from 'next/link'

interface FooterCMSData {
  company_name?: string
  company_description?: string
  company_phone?: string
  company_email?: string
  company_locations_text?: string
  navigation_sections?: Array<{
    title: string
    links: Array<{
      text: string
      url: string
    }>
  }>
  social_links?: Array<{
    platform: string
    url: string
    icon: string
  }>
  cta_headline?: string
  cta_description?: string
  cta_primary_text?: string
  cta_primary_url?: string
  cta_secondary_text?: string
  cta_secondary_url?: string
  legal_links?: Array<{
    text: string
    url: string
  }>
  copyright_text?: string
  show_full_footer?: boolean
  show_navigation?: boolean
  show_social_links?: boolean
  show_cta_section?: boolean
  show_company_description?: boolean
}

interface SimpleFooterProps {
  footerData?: FooterCMSData
  siteSettings?: {
    company_name?: string
    primary_phone?: string
    email?: string
  }
}

const SimpleFooter: React.FC<SimpleFooterProps> = ({ footerData, siteSettings }) => {
  // Default fallback data
  const defaultFooterData = {
    company_name: 'Modular Building Solutions',
    company_description: 'Leading provider of modular building solutions nationwide',
    company_phone: '(866) 819-9018',
    company_email: 'info@modularbuilding.com',
    navigation_sections: [
      {
        title: 'Solutions',
        links: [
          { text: 'Office Buildings', url: '/solutions/office-buildings' },
          { text: 'Portable Classrooms', url: '/solutions/portable-classrooms' },
          { text: 'Restroom Facilities', url: '/solutions/restroom-facilities' },
          { text: 'Healthcare Facilities', url: '/solutions/healthcare-facilities' }
        ]
      },
      {
        title: 'Company',
        links: [
          { text: 'About Us', url: '/company/about-us' },
          { text: 'Our Process', url: '/company/our-process' },
          { text: 'Locations', url: '/locations' },
          { text: 'Contact', url: '/contact' }
        ]
      },
      {
        title: 'Resources',
        links: [
          { text: 'Live Inventory', url: '/resources/live-inventory' },
          { text: 'Case Studies', url: '/resources/case-studies' },
          { text: 'FAQ', url: '/resources/faq' },
          { text: 'Get Quote', url: '/quote' }
        ]
      }
    ],
    copyright_text: `© ${new Date().getFullYear()} Modular Building Solutions. All rights reserved.`,
    show_full_footer: true,
    show_navigation: true,
    show_company_description: true
  }

  // Use CMS data if available, otherwise use defaults
  const companyName = footerData?.company_name || siteSettings?.company_name || defaultFooterData.company_name
  const companyDescription = footerData?.company_description || defaultFooterData.company_description
  const companyPhone = footerData?.company_phone || siteSettings?.primary_phone || defaultFooterData.company_phone
  const companyEmail = footerData?.company_email || siteSettings?.email || defaultFooterData.company_email
  const navigationSections = footerData?.navigation_sections || defaultFooterData.navigation_sections
  const copyrightText = footerData?.copyright_text || defaultFooterData.copyright_text
  const showNavigation = footerData?.show_navigation ?? defaultFooterData.show_navigation
  const showCompanyDescription = footerData?.show_company_description ?? defaultFooterData.show_company_description

  return (
    <footer className="bg-navy-800 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-bold mb-4">{companyName}</h3>
            {showCompanyDescription && (
              <p className="text-gray-300 mb-4 leading-relaxed">
                {companyDescription}
              </p>
            )}
            <div className="space-y-2 text-sm text-gray-300">
              <div>Phone: <a href={`tel:${companyPhone.replace(/[^0-9]/g, '')}`} className="text-white hover:text-yellow-400">{companyPhone}</a></div>
              <div>Email: <a href={`mailto:${companyEmail}`} className="text-white hover:text-yellow-400">{companyEmail}</a></div>
            </div>
          </div>

          {/* Navigation Sections */}
          {showNavigation && navigationSections && navigationSections.map((section, index) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {section.links && section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.url} className="hover:text-white transition-colors">
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="border-t border-gray-700 bg-navy-900">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-sm text-gray-400">
            <p className="mb-2">{copyrightText}</p>
            <p>Professional modular buildings for offices, education, healthcare, and more.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default SimpleFooter
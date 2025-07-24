'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import InternalLinks from './InternalLinks'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface FooterContent {
  company_name: string
  company_description: string
  company_phone: string
  company_email: string
  company_locations_text: string
  navigation_sections: Array<{
    title: string
    links: Array<{
      text: string
      url: string
    }>
  }>
  social_links: Array<{
    platform: string
    url: string
    icon: string
  }>
  cta_headline: string
  cta_description: string
  cta_primary_text: string
  cta_primary_url: string
  cta_secondary_text: string
  cta_secondary_url: string
  legal_links: Array<{
    text: string
    url: string
  }>
  copyright_text: string
  show_full_footer: boolean
  show_navigation: boolean
  show_social_links: boolean
  show_cta_section: boolean
  show_company_description: boolean
}

const SimpleFooter: React.FC = () => {
  const pathname = usePathname()
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null)
  
  // Don't show global internal links on location pages since they have contextual ones
  const isLocationPage = pathname?.startsWith('/locations/')

  useEffect(() => {
    loadFooterContent()
  }, [])

  const loadFooterContent = async () => {
    try {
      const { data, error } = await supabase
        .from('footer_content')
        .select('*')
        .single()

      if (data) {
        setFooterContent(data)
      } else {
        // Fallback to default content if no CMS data
        setFooterContent({
          company_name: 'AMAN MODULAR',
          company_description: 'Leading provider of modular building solutions nationwide.',
          company_phone: '(866) 819-9017',
          company_email: 'info@amanmodular.com',
          company_locations_text: '275+ Locations Nationwide',
          navigation_sections: [],
          social_links: [],
          cta_headline: '',
          cta_description: '',
          cta_primary_text: '',
          cta_primary_url: '',
          cta_secondary_text: '',
          cta_secondary_url: '',
          legal_links: [],
          copyright_text: '© 2024 Aman Modular. All rights reserved.',
          show_full_footer: false,
          show_navigation: false,
          show_social_links: false,
          show_cta_section: false,
          show_company_description: true
        })
      }
    } catch (error) {
      console.error('Error loading footer content:', error)
      // Use fallback content on error
      setFooterContent({
        company_name: 'AMAN MODULAR',
        company_description: 'Leading provider of modular building solutions nationwide.',
        company_phone: '(866) 819-9017',
        company_email: 'info@amanmodular.com',
        company_locations_text: '275+ Locations Nationwide',
        navigation_sections: [],
        social_links: [],
        cta_headline: '',
        cta_description: '',
        cta_primary_text: '',
        cta_primary_url: '',
        cta_secondary_text: '',
        cta_secondary_url: '',
        legal_links: [],
        copyright_text: '© 2024 Aman Modular. All rights reserved.',
        show_full_footer: false,
        show_navigation: false,
        show_social_links: false,
        show_cta_section: false,
        show_company_description: true
      })
    }
  }

  if (!footerContent) {
    return (
      <>
        {!isLocationPage && (
          <InternalLinks 
            title="Explore More"
            maxLinks={8}
          />
        )}
        <footer className="bg-navy-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="animate-pulse">
                <div className="h-8 bg-blue-500/30 rounded mb-4 w-48 mx-auto"></div>
                <div className="h-4 bg-blue-500/30 rounded mb-8 w-96 mx-auto"></div>
              </div>
            </div>
          </div>
        </footer>
      </>
    )
  }

  // Show full footer if enabled, otherwise show simple footer
  if (footerContent.show_full_footer) {
    return (
      <>
        {!isLocationPage && (
          <InternalLinks 
            title="Explore More"
            maxLinks={8}
          />
        )}
        
        {/* Full Footer with all sections */}
        <footer className="bg-navy-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              
              {/* Company Info */}
              <div className="lg:col-span-1">
                <h3 className="text-2xl font-bold mb-4">{footerContent.company_name}</h3>
                {footerContent.show_company_description && (
                  <p className="text-blue-100 mb-6">
                    {footerContent.company_description}
                  </p>
                )}
                <div className="space-y-2">
                  <div className="text-blue-100">
                    Phone: {footerContent.company_phone}
                  </div>
                  <div className="text-blue-100">
                    Email: {footerContent.company_email}
                  </div>
                  <div className="text-blue-100">
                    {footerContent.company_locations_text}
                  </div>
                </div>
              </div>

              {/* Navigation Sections */}
              {footerContent.show_navigation && footerContent.navigation_sections.map((section, index) => (
                <div key={index}>
                  <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                  <ul className="space-y-2">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link href={link.url} className="text-blue-100 hover:text-white transition-colors">
                          {link.text}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            {footerContent.show_cta_section && footerContent.cta_headline && (
              <div className="border-t border-blue-500/30 pt-8 mb-8">
                <div className="text-center">
                  <h4 className="text-xl font-bold mb-4">{footerContent.cta_headline}</h4>
                  <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                    {footerContent.cta_description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {footerContent.cta_primary_text && (
                      <Link 
                        href={footerContent.cta_primary_url}
                        className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        {footerContent.cta_primary_text}
                      </Link>
                    )}
                    {footerContent.cta_secondary_text && (
                      <Link 
                        href={footerContent.cta_secondary_url}
                        className="border border-white/30 text-white hover:bg-white/10 px-6 py-3 rounded-lg font-semibold transition-colors"
                      >
                        {footerContent.cta_secondary_text}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Social Links & Legal */}
            <div className="border-t border-blue-500/30 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                
                {/* Social Links */}
                {footerContent.show_social_links && footerContent.social_links.length > 0 && (
                  <div className="flex space-x-4">
                    {footerContent.social_links.map((social, index) => (
                      <Link 
                        key={index}
                        href={social.url} 
                        className="text-blue-100 hover:text-white transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {social.platform}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Legal Links */}
                {footerContent.legal_links.length > 0 && (
                  <div className="flex flex-wrap gap-4">
                    {footerContent.legal_links.map((legal, index) => (
                      <Link 
                        key={index}
                        href={legal.url} 
                        className="text-blue-100 hover:text-white transition-colors text-sm"
                      >
                        {legal.text}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Copyright */}
              <div className="text-center mt-8">
                <p className="text-blue-100 text-sm">
                  {footerContent.copyright_text}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </>
    )
  }

  // Simple Footer (default)
  return (
    <>
      {/* Internal Links Section - Only show on non-location pages */}
      {!isLocationPage && (
        <InternalLinks 
          title="Explore More"
          maxLinks={8}
        />
      )}
      
      <footer className="bg-navy-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">{footerContent.company_name}</h3>
            {footerContent.show_company_description && (
              <p className="text-blue-100 mb-8">
                {footerContent.company_description}
              </p>
            )}
            <div className="space-y-4">
              <div className="text-blue-100">
                Phone: {footerContent.company_phone}
              </div>
              <div className="text-blue-100">
                Email: {footerContent.company_email}
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-blue-500/30">
              <p className="text-blue-100 text-sm">
                {footerContent.copyright_text}
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default SimpleFooter
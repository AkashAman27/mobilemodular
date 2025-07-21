'use client'

import React from 'react'
import Link from 'next/link'
import { Building2, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'

const Footer = () => {
  const footerSections = [
    {
      title: 'Solutions',
      links: [
        { label: 'Office Buildings', href: '/solutions/office-buildings' },
        { label: 'Portable Classrooms', href: '/solutions/portable-classrooms' },
        { label: 'Storage Containers', href: '/solutions/storage-containers' },
        { label: 'Healthcare Facilities', href: '/solutions/healthcare-facilities' },
        { label: 'Security Buildings', href: '/solutions/security-buildings' },
        { label: 'Restaurant & Food Service', href: '/solutions/restaurant-facilities' },
      ]
    },
    {
      title: 'Industries',
      links: [
        { label: 'Education', href: '/industries/education' },
        { label: 'Construction', href: '/industries/construction' },
        { label: 'Healthcare', href: '/industries/healthcare' },
        { label: 'Government', href: '/industries/government' },
        { label: 'Retail & Commercial', href: '/industries/retail' },
        { label: 'Emergency Response', href: '/industries/emergency' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/company/about' },
        { label: 'Our Process', href: '/company/process' },
        { label: 'Quality Standards', href: '/company/quality' },
        { label: 'Locations', href: '/company/locations' },
        { label: 'Careers', href: '/company/careers' },
        { label: 'News & Updates', href: '/company/news' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Product Gallery', href: '/resources/gallery' },
        { label: 'Case Studies', href: '/resources/case-studies' },
        { label: 'Planning Tools', href: '/resources/planning-tools' },
        { label: 'FAQ', href: '/resources/faq' },
        { label: 'Blog & Insights', href: '/resources/insights' },
        { label: 'Documentation', href: '/resources/docs' },
      ]
    }
  ]

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ]

  return (
    <footer className="bg-navy-600 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="h-10 w-10 rounded-full gradient-blue flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">AMAN MODULAR</span>
            </Link>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Leading provider of modular building solutions nationwide. From portable classrooms 
              to office complexes, we deliver quality space solutions for every industry.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-yellow-400" />
                <span className="text-blue-100">(866) 819-9017</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-yellow-400" />
                <span className="text-blue-100">info@amanmodular.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-yellow-400" />
                <span className="text-blue-100">275+ Locations Nationwide</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-blue-100 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-12 pt-8 border-t border-blue-500/30">
          <div className="bg-gradient-to-r from-steel-500 to-navy-800 rounded-2xl p-8 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Need help with your next project?
            </h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Our experts are ready to help you find the perfect modular building solution. 
              Get a custom quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="gradient-orange text-white px-8 py-3 rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                Get a Quote
              </button>
              <button className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-blue-500/30">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-blue-100 text-sm">
              © 2024 Aman Modular. All rights reserved.
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>

            {/* Legal Links */}
            <div className="flex items-center space-x-6 text-sm text-blue-100">
              <Link href="/legal/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/legal/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <Link href="/legal/accessibility" className="hover:text-white transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
import React from 'react'
import Link from 'next/link'
import InternalLinks from './InternalLinks'

const SimpleFooter: React.FC = () => {
  return (
    <>
      {/* Internal Links Section */}
      <InternalLinks 
        title="Explore More"
        maxLinks={8}
      />
      
      <footer className="bg-navy-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">AMAN MODULAR</h3>
            <p className="text-blue-100 mb-8">
              Leading provider of modular building solutions nationwide.
            </p>
            <div className="space-y-4">
              <div className="text-blue-100">
                Phone: (866) 819-9017
              </div>
              <div className="text-blue-100">
                Email: info@amanmodular.com
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-blue-500/30">
              <p className="text-blue-100 text-sm">
                © 2024 Aman Modular. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default SimpleFooter
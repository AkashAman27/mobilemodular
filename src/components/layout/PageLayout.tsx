'use client'

import React from 'react'
import Header from '../Header'
import SimpleFooter from '../SimpleFooter'

interface PageLayoutProps {
  children: React.ReactNode
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {children}
      </main>
      <SimpleFooter />
    </div>
  )
}

export { PageLayout }
export default PageLayout
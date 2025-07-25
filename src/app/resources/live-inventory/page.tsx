import { Suspense } from 'react'
import SimpleModernClient from './SimpleModernClient'
import PageHeader from '@/components/layout/PageHeader'
import PageLayout from '@/components/layout/PageLayout'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const seoData = await getSEOPageData('/resources/live-inventory')
  const seoSettings = await getSEOSettings()
  
  const fallbackTitle = 'Live Inventory - Available Modular Buildings | Modular Building Solutions'
  const fallbackDescription = 'Browse our live inventory of available modular buildings in Alabama. Find portable offices, classrooms, and commercial buildings available for rent.'
  
  return generateSEOMetadata(
    seoData || {},
    fallbackTitle,
    fallbackDescription,
    `${seoSettings.site_url}/resources/live-inventory`
  )
}

export default async function LiveInventoryPage() {
  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs('/resources/live-inventory')

  return (
    <PageLayout>
      <StructuredData
        type="WebPage"
        data={{
          name: 'Live Inventory - Available Modular Buildings',
          description: 'Browse our live inventory of available modular buildings including portable offices, classrooms, and commercial buildings',
          url: `${seoSettings.site_url}/resources/live-inventory`
        }}
      />

      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <PageHeader
        subtitle="Available Now"
        title="Live Inventory"
        description="Browse our current inventory of portable buildings available for rent. Filter by type, size, location, and features to find the perfect modular solution for your needs."
        backgroundImage="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/hero_background_modular_inventory_warehouse.webp"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Live Inventory', href: '/resources/live-inventory' }
        ]}
      />

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading inventory...</div>}>
        <SimpleModernClient />
      </Suspense>
    </PageLayout>
  )
}
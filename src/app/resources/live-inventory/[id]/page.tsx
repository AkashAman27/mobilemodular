import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import PageLayout from '@/components/layout/PageLayout'
import PageHeader from '@/components/layout/PageHeader'
import InventoryItemClient from './InventoryItemClient'
import { getSEOPageData, getSEOSettings, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import type { Metadata } from 'next'

interface Props {
  params: { id: string }
}

async function getInventoryItem(id: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase
    .from('inventory_items')
    .select(`
      *,
      category:inventory_categories(name, slug),
      floorplans(
        id, name, model_number, description, square_feet, 
        restrooms, offices, conference_rooms, floorplan_image_url,
        rental_price_monthly, features, max_occupancy, construction_type,
        order_index
      )
    `)
    .eq('id', id)
    .eq('is_active', true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const item = await getInventoryItem(params.id)
  
  if (!item) {
    return {
      title: 'Item Not Found | Modular Building Solutions',
      description: 'The requested inventory item could not be found.'
    }
  }

  const seoSettings = await getSEOSettings()
  
  return generateSEOMetadata(
    {},
    `${item.name} - Available for Rent | Modular Building Solutions`,
    item.description || `Rent this ${item.name} modular building. ${item.width_feet}' x ${item.length_feet}' with ${item.square_feet} sq ft in ${item.location_city}, ${item.location_state}.`,
    `${seoSettings.site_url}/resources/live-inventory/${params.id}`
  )
}

export default async function InventoryItemPage({ params }: Props) {
  const item = await getInventoryItem(params.id)
  
  if (!item) {
    notFound()
  }

  const seoSettings = await getSEOSettings()
  const breadcrumbs = getBreadcrumbs(`/resources/live-inventory/${params.id}`)

  return (
    <PageLayout>
      <StructuredData
        type="Product"
        data={{
          name: item.name,
          description: item.description,
          image: item.main_image_url,
          offers: {
            '@type': 'Offer',
            availability: item.availability_status === 'available' ? 'InStock' : 'OutOfStock',
            priceCurrency: 'USD',
            price: item.floorplans?.[0]?.rental_price_monthly || 0
          },
          aggregateRating: item.review_count > 0 ? {
            '@type': 'AggregateRating',
            ratingValue: item.rating,
            reviewCount: item.review_count
          } : undefined
        }}
      />

      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />
      
      <PageHeader
        subtitle={item.category?.name || "Modular Building"}
        title={item.name}
        description={item.description}
        backgroundImage={item.main_image_url || "https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/hero_background_modular_building.webp"}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: 'Live Inventory', href: '/resources/live-inventory' },
          { label: item.name, href: `/resources/live-inventory/${params.id}` }
        ]}
      />

      <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading details...</div>}>
        <InventoryItemClient item={item} />
      </Suspense>
    </PageLayout>
  )
}
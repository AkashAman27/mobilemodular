import { generateStructuredData, combineStructuredData, StructuredDataType, BaseStructuredData } from '@/lib/structuredData'

interface StructuredDataProps {
  type: StructuredDataType
  data: Record<string, any>
  customJsonLd?: string | null
  globalSchemas?: BaseStructuredData[]
  priority?: number
}

export function StructuredData({ 
  type, 
  data, 
  customJsonLd, 
  globalSchemas = [],
  priority = 0 
}: StructuredDataProps) {
  // Generate structured data using our comprehensive system
  const schemas = generateStructuredData({
    type,
    data,
    override: customJsonLd || undefined
  })

  // Combine with global schemas if provided
  const allSchemas = combineStructuredData(...globalSchemas, ...schemas)

  // Don't render if no schemas
  if (allSchemas.length === 0) {
    return null
  }

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={`structured-data-${type}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0)
          }}
        />
      ))}
    </>
  )
}

// Component for global website schemas
export function GlobalStructuredData({ siteData }: { siteData: Record<string, any> }) {
  const websiteSchema = generateStructuredData({
    type: 'WebSite',
    data: {
      name: siteData.name || 'Aman Modular Buildings',
      url: siteData.url || 'https://amanmodular.com',
      description: siteData.description || 'Professional modular buildings for rent, sale, and lease. From portable classrooms to office complexes, we provide flexible space solutions for every industry.',
      ...siteData
    }
  })

  const organizationSchema = generateStructuredData({
    type: 'Organization',
    data: {
      name: siteData.organizationName || 'Aman Modular Buildings',
      url: siteData.url || 'https://amanmodular.com',
      logo: siteData.logo,
      description: siteData.organizationDescription || 'Leading provider of modular building solutions',
      telephone: siteData.telephone,
      email: siteData.email,
      address: siteData.address,
      city: siteData.city,
      state: siteData.state,
      postal_code: siteData.postalCode,
      country: siteData.country,
      social_links: siteData.socialLinks || [],
      ...siteData
    }
  })

  const localBusinessSchema = generateStructuredData({
    type: 'LocalBusiness',
    data: {
      name: siteData.businessName || 'Aman Modular Buildings',
      url: siteData.url || 'https://amanmodular.com',
      description: siteData.businessDescription || 'Professional modular buildings for rent, sale, and lease',
      telephone: siteData.telephone,
      email: siteData.email,
      address: siteData.address,
      city: siteData.city || 'Los Angeles',
      state: siteData.state || 'CA',
      postal_code: siteData.postalCode || '90028',
      country: siteData.country || 'US',
      latitude: siteData.latitude || 34.0522,
      longitude: siteData.longitude || -118.2437,
      opening_hours: siteData.openingHours || ['Mo-Fr 08:00-17:00'],
      price_range: siteData.priceRange || '$$',
      social_links: siteData.socialLinks || [],
      ...siteData
    }
  })

  const allSchemas = combineStructuredData(...websiteSchema, ...organizationSchema, ...localBusinessSchema)

  return (
    <>
      {allSchemas.map((schema, index) => (
        <script
          key={`global-structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema, null, 0)
          }}
        />
      ))}
    </>
  )
}

// Breadcrumb structured data component
export function BreadcrumbStructuredData({ breadcrumbs }: { breadcrumbs: Array<{ label: string; url: string }> }) {
  const schema = generateStructuredData({
    type: 'BreadcrumbList',
    data: { breadcrumbs }
  })

  if (schema.length === 0) {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema[0], null, 0)
      }}
    />
  )
}

// FAQ structured data component
export function FAQStructuredData({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const schema = generateStructuredData({
    type: 'FAQPage',
    data: { faqs }
  })

  if (schema.length === 0) {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema[0], null, 0)
      }}
    />
  )
}

// Product structured data component
export function ProductStructuredData({ product }: { product: any }) {
  const schema = generateStructuredData({
    type: 'Product',
    data: product
  })

  if (schema.length === 0) {
    return null
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema[0], null, 0)
      }}
    />
  )
}
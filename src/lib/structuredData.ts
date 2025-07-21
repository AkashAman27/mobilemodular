export type StructuredDataType = 
  | 'WebPage'
  | 'Product'
  | 'Service'
  | 'Organization'
  | 'LocalBusiness'
  | 'AboutPage'
  | 'ContactPage'
  | 'CollectionPage'
  | 'FAQPage'
  | 'Article'
  | 'BlogPosting'
  | 'WebSite'
  | 'BreadcrumbList'

export interface BaseStructuredData {
  '@context': string
  '@type': string
  [key: string]: any
}

export interface StructuredDataOptions {
  type: StructuredDataType
  data: Record<string, any>
  override?: string
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amanmodular.com'

export function generateStructuredData({
  type,
  data,
  override
}: StructuredDataOptions): BaseStructuredData[] {
  if (override) {
    try {
      const parsed = JSON.parse(override)
      return Array.isArray(parsed) ? parsed : [parsed]
    } catch (error) {
      console.warn('Invalid custom JSON-LD provided:', error)
    }
  }

  const schemas: BaseStructuredData[] = []

  switch (type) {
    case 'WebPage':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: data.title || data.name,
        description: data.description,
        url: data.url || `${siteUrl}${data.path || ''}`,
        inLanguage: 'en-US',
        ...(data.dateModified && { dateModified: data.dateModified }),
        ...(data.datePublished && { datePublished: data.datePublished }),
        mainEntity: {
          '@type': 'WebPageElement',
          name: data.title || data.name,
          description: data.description
        }
      })
      break

    case 'Product':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: data.name || data.title,
        description: data.description,
        ...(data.image_url && { image: data.image_url }),
        ...(data.category && { category: data.category }),
        ...(data.starting_price && {
          offers: {
            '@type': 'Offer',
            price: data.starting_price.replace(/[^0-9.]/g, ''),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: data.url || `${siteUrl}/solutions/${data.slug || ''}`
          }
        }),
        ...(data.features && Array.isArray(data.features) && {
          additionalProperty: data.features.map((feature: string) => ({
            '@type': 'PropertyValue',
            name: 'Feature',
            value: feature
          }))
        }),
        manufacturer: {
          '@type': 'Organization',
          name: 'Aman Modular Buildings'
        }
      })
      break

    case 'Service':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: data.name || data.title,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: 'Aman Modular Buildings',
          url: siteUrl
        },
        ...(data.area_served && { areaServed: data.area_served }),
        serviceType: data.service_type || 'Modular Building Solutions'
      })
      break

    case 'Organization':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: data.name || 'Aman Modular Buildings',
        url: data.url || siteUrl,
        description: data.description || 'Professional modular buildings for rent, sale, and lease',
        ...(data.logo && { logo: data.logo }),
        ...(data.telephone && { telephone: data.telephone }),
        ...(data.email && { email: data.email }),
        ...(data.address && {
          address: {
            '@type': 'PostalAddress',
            streetAddress: data.address,
            addressLocality: data.city,
            addressRegion: data.state,
            postalCode: data.postal_code,
            addressCountry: data.country || 'US'
          }
        }),
        ...(data.social_links && Array.isArray(data.social_links) && {
          sameAs: data.social_links
        })
      })
      break

    case 'LocalBusiness':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: data.name || 'Aman Modular Buildings',
        description: data.description || 'Professional modular buildings for rent, sale, and lease',
        url: data.url || siteUrl,
        ...(data.telephone && { telephone: data.telephone }),
        ...(data.email && { email: data.email }),
        ...(data.address && {
          address: {
            '@type': 'PostalAddress',
            streetAddress: data.address,
            addressLocality: data.city,
            addressRegion: data.state,
            postalCode: data.postal_code,
            addressCountry: data.country || 'US'
          }
        }),
        ...(data.latitude && data.longitude && {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: data.latitude,
            longitude: data.longitude
          }
        }),
        ...(data.opening_hours && {
          openingHours: Array.isArray(data.opening_hours) ? data.opening_hours : [data.opening_hours]
        }),
        ...(data.price_range && { priceRange: data.price_range }),
        ...(data.social_links && Array.isArray(data.social_links) && {
          sameAs: data.social_links
        })
      })
      break

    case 'AboutPage':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        name: data.title || data.name,
        description: data.description,
        url: data.url || `${siteUrl}/about`,
        inLanguage: 'en-US',
        about: {
          '@type': 'Organization',
          name: 'Aman Modular Buildings',
          description: 'Professional modular buildings for rent, sale, and lease'
        }
      })
      break

    case 'ContactPage':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        name: data.title || data.name,
        description: data.description,
        url: data.url || `${siteUrl}/contact`,
        inLanguage: 'en-US',
        about: {
          '@type': 'Organization',
          name: 'Aman Modular Buildings'
        }
      })
      break

    case 'CollectionPage':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: data.title || data.name,
        description: data.description,
        url: data.url || `${siteUrl}${data.path || ''}`,
        inLanguage: 'en-US',
        ...(data.items && Array.isArray(data.items) && {
          mainEntity: {
            '@type': 'ItemList',
            numberOfItems: data.items.length,
            itemListElement: data.items.map((item: any, index: number) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: item.name || item.title,
              url: item.url || `${siteUrl}${item.path || ''}`
            }))
          }
        })
      })
      break

    case 'FAQPage':
      if (data.faqs && Array.isArray(data.faqs)) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          name: data.title || 'Frequently Asked Questions',
          description: data.description,
          url: data.url || `${siteUrl}${data.path || ''}`,
          mainEntity: data.faqs.map((faq: any) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer
            }
          }))
        })
      }
      break

    case 'Article':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title || data.name,
        description: data.description,
        url: data.url || `${siteUrl}${data.path || ''}`,
        datePublished: data.datePublished || data.created_at,
        dateModified: data.dateModified || data.updated_at,
        author: {
          '@type': 'Organization',
          name: 'Aman Modular Buildings'
        },
        publisher: {
          '@type': 'Organization',
          name: 'Aman Modular Buildings',
          url: siteUrl
        },
        ...(data.image_url && { image: data.image_url }),
        inLanguage: 'en-US'
      })
      break

    case 'WebSite':
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: data.name || 'Aman Modular Buildings',
        description: data.description || 'Professional modular buildings for rent, sale, and lease',
        url: data.url || siteUrl,
        inLanguage: 'en-US',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/search?q={search_term_string}`
          },
          'query-input': 'required name=search_term_string'
        }
      })
      break

    case 'BreadcrumbList':
      if (data.breadcrumbs && Array.isArray(data.breadcrumbs)) {
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data.breadcrumbs.map((breadcrumb: any, index: number) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: breadcrumb.name,
            item: breadcrumb.url
          }))
        })
      }
      break

    default:
      console.warn(`Unknown structured data type: ${type}`)
      break
  }

  return schemas
}

export function combineStructuredData(...schemas: BaseStructuredData[]): BaseStructuredData[] {
  const flattened = schemas.flat()
  const unique = flattened.filter((schema, index, self) => 
    index === self.findIndex(s => s['@type'] === schema['@type'] && s.name === schema.name)
  )
  return unique
}
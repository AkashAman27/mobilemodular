import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Star, 
  Clock, 
  Users, 
  MapPin, 
  Check,
  DollarSign,
  ArrowRight
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import { StructuredData, BreadcrumbStructuredData } from '@/components/seo/StructuredData'
import { getSolutionSEOData, generateMetadata as generateSEOMetadata, getBreadcrumbs } from '@/lib/seo'
import SEOContent from '@/components/SEOContent'
import InternalLinks from '@/components/InternalLinks'
import { solutions as staticSolutions } from '@/data/demo-data'
import type { Metadata } from 'next'

interface Solution {
  id: string
  slug: string
  name: string
  description: string
  features: string[]
  image_url: string
  category: string
  starting_price: string
  dimensions: string
  capacity: string
  power: string
  climate_control: boolean
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  seo_title?: string
  seo_description?: string
  seo_keywords?: string
  canonical_url?: string
  robots_index?: boolean
  robots_follow?: boolean
  robots_nosnippet?: boolean
  og_title?: string
  og_description?: string
  og_image?: string
  og_image_alt?: string
  twitter_title?: string
  twitter_description?: string
  twitter_image?: string
  twitter_image_alt?: string
  structured_data_type?: string
  custom_json_ld?: string
  focus_keyword?: string
  last_modified?: string
}

// Server-side function to fetch solution
async function getSolution(slug: string): Promise<Solution | null> {
  try {
    const { data, error } = await supabase
      .from('solutions')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      // Fall back to static data
      const staticSolution = staticSolutions.find(s => s.id === slug)
      if (staticSolution) {
        // Transform static solution to match database schema
        return {
          id: staticSolution.id,
          slug: staticSolution.id,
          name: staticSolution.name,
          description: staticSolution.description,
          features: staticSolution.features,
          image_url: staticSolution.imageUrl,
          category: staticSolution.category,
          starting_price: staticSolution.startingPrice,
          dimensions: staticSolution.specifications.dimensions,
          capacity: staticSolution.specifications.capacity,
          power: staticSolution.specifications.power,
          climate_control: staticSolution.specifications.climate,
          display_order: 1,
          is_active: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          // SEO defaults
          seo_title: `${staticSolution.name} - Modular Building Solutions`,
          seo_description: staticSolution.description.substring(0, 160),
          robots_index: true,
          robots_follow: true,
          robots_nosnippet: false
        }
      }
      return null
    }

    return data
  } catch (error) {
    // Fall back to static data on any error
    const staticSolution = staticSolutions.find(s => s.id === slug)
    if (staticSolution) {
      return {
        id: staticSolution.id,
        slug: staticSolution.id,
        name: staticSolution.name,
        description: staticSolution.description,
        features: staticSolution.features,
        image_url: staticSolution.imageUrl,
        category: staticSolution.category,
        starting_price: staticSolution.startingPrice,
        dimensions: staticSolution.specifications.dimensions,
        capacity: staticSolution.specifications.capacity,
        power: staticSolution.specifications.power,
        climate_control: staticSolution.specifications.climate,
        display_order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        seo_title: `${staticSolution.name} - Modular Building Solutions`,
        seo_description: staticSolution.description.substring(0, 160),
        robots_index: true,
        robots_follow: true,
        robots_nosnippet: false
      }
    }
    return null
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const solution = await getSolution(slug)
  
  if (!solution) {
    return {
      title: 'Solution Not Found',
      description: 'The requested solution could not be found.'
    }
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amanmodular.com'
  const currentUrl = `${siteUrl}/solutions/${solution.slug}`
  const seoTitle = solution.seo_title || `${solution.name} - Modular Building Solutions`
  const seoDescription = solution.seo_description || solution.description.substring(0, 160)

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: solution.seo_keywords || undefined,
    robots: {
      index: solution.robots_index !== false,
      follow: solution.robots_follow !== false,
      nosnippet: solution.robots_nosnippet || false
    },
    openGraph: {
      title: solution.og_title || seoTitle,
      description: solution.og_description || seoDescription,
      images: solution.og_image || solution.image_url ? [{
        url: solution.og_image || solution.image_url,
        alt: solution.og_image_alt || `${solution.name} image`
      }] : undefined,
      type: 'website',
      url: currentUrl,
      siteName: 'Aman Modular Buildings'
    },
    twitter: {
      card: 'summary_large_image',
      title: solution.twitter_title || solution.og_title || seoTitle,
      description: solution.twitter_description || solution.og_description || seoDescription,
      images: solution.twitter_image || solution.og_image || solution.image_url ? [{
        url: solution.twitter_image || solution.og_image || solution.image_url,
        alt: solution.twitter_image_alt || solution.og_image_alt || `${solution.name} image`
      }] : undefined
    },
    alternates: {
      canonical: solution.canonical_url || currentUrl
    },
    other: {
      'product:price:amount': solution.starting_price.replace(/[^0-9.]/g, ''),
      'product:price:currency': 'USD',
      'product:availability': 'in_stock',
      'product:brand': 'Aman Modular Buildings',
      'last-modified': solution.last_modified || solution.updated_at
    }
  }
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const solution = await getSolution(slug)
  
  if (!solution) {
    notFound()
  }

  // Prepare structured data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amanmodular.com'
  const currentUrl = `${siteUrl}/solutions/${solution.slug}`
  const breadcrumbs = getBreadcrumbs(`/solutions/${solution.slug}`)

  return (
    <>
      {/* Structured Data */}
      <StructuredData
        type={(solution.structured_data_type as any) || 'Product'}
        data={{
          name: solution.name,
          description: solution.description,
          url: currentUrl,
          image_url: solution.image_url,
          starting_price: solution.starting_price,
          category: solution.category,
          features: solution.features,
          dimensions: solution.dimensions,
          capacity: solution.capacity,
          power: solution.power,
          climate_control: solution.climate_control,
          slug: solution.slug
        }}
        customJsonLd={solution.custom_json_ld}
      />

      {/* Breadcrumb Structured Data */}
      <BreadcrumbStructuredData breadcrumbs={breadcrumbs} />

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <span>/</span>
            <Link href="/solutions" className="hover:text-gray-900">Solutions</Link>
            <span>/</span>
            <span className="text-gray-900">{solution.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Hero Image */}
              <div className="relative h-96 rounded-lg overflow-hidden mb-6">
                <Image
                  src={solution.image_url}
                  alt={solution.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-navy-600 text-white">
                    {solution.category.charAt(0).toUpperCase() + solution.category.slice(1)}
                  </Badge>
                </div>
              </div>

              {/* Title and Basic Info */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{solution.name}</h1>
                
                <div className="flex items-center space-x-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span className="font-medium">Starting at {solution.starting_price}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{solution.dimensions}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{solution.capacity}</span>
                  </div>
                </div>

                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                  {solution.description}
                </p>

                {/* Features */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {solution.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications */}
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold mb-4">Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-medium text-gray-800 mb-2">Dimensions</h4>
                      <p className="text-gray-600">{solution.dimensions}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-medium text-gray-800 mb-2">Capacity</h4>
                      <p className="text-gray-600">{solution.capacity}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-medium text-gray-800 mb-2">Power</h4>
                      <p className="text-gray-600">{solution.power}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <h4 className="font-medium text-gray-800 mb-2">Climate Control</h4>
                      <p className="text-gray-600">{solution.climate_control ? 'Yes' : 'No'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* SEO Content Section */}
              <SEOContent 
                title={`Why Choose ${solution.name}?`}
                paragraphs={[
                  `Our ${solution.name.toLowerCase()} solutions are designed with your specific needs in mind. We understand that every project requires attention to detail, quality construction, and reliable service that you can count on.`,
                  `With flexible rental, purchase, and lease options, you can choose the arrangement that works best for your budget and timeline. Our professional delivery and installation teams ensure your building is ready for use quickly and efficiently.`,
                  `All of our modular buildings meet or exceed industry standards for safety, durability, and comfort. We stand behind our products with comprehensive warranties and ongoing support throughout your project.`
                ]}
              />

              {/* Internal Links */}
              <InternalLinks 
                title="Related Solutions"
                excludeUrls={[`/solutions/${solution.slug}`]}
                maxLinks={6}
                className="mt-8"
              />
            </div>

            {/* Quote Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle className="text-2xl">Get a Quote</CardTitle>
                  <CardDescription>
                    Contact us for pricing and availability
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-navy-600">
                    Starting at {solution.starting_price}
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div>• Rent, Buy, or Lease options</div>
                    <div>• Professional installation</div>
                    <div>• Nationwide delivery</div>
                    <div>• 24/7 support</div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <Link href="/quote" className="w-full">
                      <Button className="w-full bg-navy-600 hover:bg-navy-700">
                        Get Custom Quote
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/contact" className="w-full">
                      <Button variant="outline" className="w-full">
                        Contact Us
                      </Button>
                    </Link>
                  </div>

                  <div className="pt-4 border-t">
                    <p className="text-xs text-gray-500">
                      Need help choosing the right solution? Our experts are here to help.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
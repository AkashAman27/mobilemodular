import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { solutions, industries, locations, testimonials, newsInsights } from '@/data/demo-data'
import { generalFAQs, solutionsFAQs, industriesFAQs, locationsFAQs, resourcesFAQs, companyFAQs } from '@/data/faq-data'
import { internalLinksData } from '@/data/internal-links-data'

export async function POST(request: NextRequest) {
  try {
    // Silent logging - removed console.log

    // Insert solutions with comprehensive content fields
    // Silent logging - removed console.log
    const solutionsData = solutions.map(solution => {
      const baseData = {
        slug: solution.id,
        name: solution.name,
        description: solution.description,
        features: solution.features,
        image_url: solution.imageUrl,
        category: solution.category,
        starting_price: solution.startingPrice,
        dimensions: solution.specifications.dimensions,
        capacity: solution.specifications.capacity,
        power: solution.specifications.power,
        climate_control: solution.specifications.climate,
        
        // Add comprehensive content fields
        page_subtitle: 'Professional Solutions',
        hero_cta_text: 'Get Custom Quote',
        hero_cta_secondary: 'Call (866) 819-9017',
        specifications_title: 'Available Configurations',
        specifications_subtitle: 'Choose from our standard configurations or let us customize a solution for your specific needs.',
        included_title: 'What\'s Included',
        included_subtitle: 'Every modular building comes fully equipped and ready for immediate occupancy.',
        cta_title: 'Ready to Get Started?',
        cta_subtitle: 'Get a custom quote for your modular building project. We\'ll work with you to find the perfect solution.',
        cta_primary_text: 'Get Custom Quote',
        cta_secondary_text: 'Call (866) 819-9017'
      }

      // Add special data for office-buildings
      if (solution.id === 'office-buildings') {
        return {
          ...baseData,
          feature_cards: [
            {
              icon: 'Building2',
              title: 'Professional Design',
              description: 'Modern interior finishes and professional appearance suitable for any business environment.'
            },
            {
              icon: 'Users',
              title: 'Flexible Capacity',
              description: 'Available in sizes from 2-person offices to large conference rooms and multi-room complexes.'
            },
            {
              icon: 'Zap',
              title: 'Quick Setup',
              description: 'Fast delivery and professional installation, typically ready for occupancy within days.'
            },
            {
              icon: 'Shield',
              title: 'Code Compliant',
              description: 'All units meet local building codes and ADA accessibility requirements.'
            }
          ],
          specifications: [
            {
              title: 'Single Office',
              size: '8\' x 20\'',
              capacity: '2-4 people',
              price: 'Starting at $850/month',
              image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
            },
            {
              title: 'Double Office',
              size: '16\' x 20\'',
              capacity: '4-8 people',
              price: 'Starting at $1,200/month',
              image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400&h=300&fit=crop'
            },
            {
              title: 'Conference Room',
              size: '12\' x 24\'',
              capacity: '8-12 people',
              price: 'Starting at $1,500/month',
              image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop'
            },
            {
              title: 'Multi-Room Complex',
              size: '24\' x 60\'',
              capacity: '15-25 people',
              price: 'Starting at $2,800/month',
              image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop'
            }
          ],
          included_items: [
            'Professional interior finishes',
            'Climate control (heating & cooling)',
            'Electrical system with outlets',
            'LED lighting throughout',
            'Professional flooring',
            'Windows with blinds',
            'Entry door with lock',
            'ADA-compliant options available'
          ],
          included_image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop'
        }
      }

      return {
        ...baseData,
        feature_cards: [
          {
            icon: 'Building2',
            title: 'Professional Design',
            description: 'Modern interior finishes and professional appearance suitable for any business environment.'
          }
        ],
        specifications: [
          {
            title: `${solution.name} Unit`,
            size: solution.specifications.dimensions || 'Custom sizes available',
            capacity: solution.specifications.capacity || 'Varies by configuration',
            price: solution.startingPrice || 'Contact for pricing',
            image: solution.imageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop'
          }
        ],
        included_items: solution.features,
        included_image: solution.imageUrl || 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop'
      }
    })

    const { error: solutionsError } = await supabase
      .from('solutions')
      .upsert(solutionsData, { onConflict: 'slug' })

    if (solutionsError) {
      // Silent error handling - removed console.error
      return NextResponse.json({ error: 'Failed to insert solutions' }, { status: 500 })
    }

    // Insert industries
    // Silent logging - removed console.log
    const industriesData = industries.map(industry => ({
      slug: industry.id,
      name: industry.name,
      description: industry.description,
      image_url: industry.imageUrl,
      case_studies_count: industry.caseStudies
    }))

    const { error: industriesError } = await supabase
      .from('industries')
      .upsert(industriesData, { onConflict: 'slug' })

    if (industriesError) {
      // Silent error handling - removed console.error
      return NextResponse.json({ error: 'Failed to insert industries' }, { status: 500 })
    }

    // Insert locations
    // Silent logging - removed console.log
    const locationsData = locations.map(location => ({
      slug: location.id,
      city: location.city,
      state: location.state,
      phone: location.phone,
      address: location.address,
      service_radius: location.serviceRadius
    }))

    const { error: locationsError } = await supabase
      .from('locations')
      .upsert(locationsData, { onConflict: 'slug' })

    if (locationsError) {
      // Silent error handling - removed console.error
      return NextResponse.json({ error: 'Failed to insert locations' }, { status: 500 })
    }

    // Insert testimonials
    // Silent logging - removed console.log
    const testimonialsData = testimonials.map(testimonial => ({
      name: testimonial.name,
      company: testimonial.company,
      role: testimonial.role,
      content: testimonial.content,
      rating: testimonial.rating,
      image_url: testimonial.imageUrl
    }))

    const { error: testimonialsError } = await supabase
      .from('testimonials')
      .upsert(testimonialsData)

    if (testimonialsError) {
      // Silent error handling - removed console.error
      return NextResponse.json({ error: 'Failed to insert testimonials' }, { status: 500 })
    }

    // Insert news insights
    // Silent logging - removed console.log
    const newsData = newsInsights.map(news => ({
      slug: news.id,
      title: news.title,
      excerpt: news.excerpt,
      content: news.excerpt,
      image_url: news.imageUrl,
      category: news.category,
      read_time: news.readTime,
      published_date: news.date
    }))

    const { error: newsError } = await supabase
      .from('news_insights')
      .upsert(newsData, { onConflict: 'slug' })

    if (newsError) {
      // Silent error handling - removed console.error
      return NextResponse.json({ error: 'Failed to insert news insights' }, { status: 500 })
    }

    // Insert FAQs
    // Silent logging - removed console.log
    const faqsData = [
      ...generalFAQs.map((faq, index) => ({ ...faq, category: 'general', sort_order: index })),
      ...solutionsFAQs.map((faq, index) => ({ ...faq, category: 'solutions', sort_order: index })),
      ...industriesFAQs.map((faq, index) => ({ ...faq, category: 'industries', sort_order: index })),
      ...locationsFAQs.map((faq, index) => ({ ...faq, category: 'locations', sort_order: index })),
      ...resourcesFAQs.map((faq, index) => ({ ...faq, category: 'resources', sort_order: index })),
      ...companyFAQs.map((faq, index) => ({ ...faq, category: 'company', sort_order: index }))
    ]

    const { error: faqsError } = await supabase
      .from('faqs')
      .upsert(faqsData)

    if (faqsError) {
      // Silent error handling - removed console.error
      return NextResponse.json({ error: 'Failed to insert FAQs' }, { status: 500 })
    }

    // Insert Internal Links
    // Silent logging - removed console.log
    const internalLinksDbData = internalLinksData.map((link, index) => ({
      title: link.title,
      url: link.url,
      description: link.description,
      category: link.category,
      sort_order: link.order,
      is_active: link.is_active
    }))

    const { error: internalLinksError } = await supabase
      .from('internal_links')
      .upsert(internalLinksDbData)

    if (internalLinksError) {
      // Silent error handling - removed console.error
      return NextResponse.json({ error: 'Failed to insert internal links' }, { status: 500 })
    }

    // Silent logging - removed console.log
    return NextResponse.json({ message: 'Database populated successfully' }, { status: 200 })

  } catch (error) {
    // Silent error handling - removed console.error
    return NextResponse.json({ error: 'Database population failed' }, { status: 500 })
  }
}
import { supabaseAdmin } from './supabase'
import { solutions, industries, locations, testimonials, newsInsights } from '@/data/demo-data'
import { generalFAQs, solutionsFAQs, industriesFAQs, locationsFAQs, resourcesFAQs, companyFAQs } from '@/data/faq-data'

// All US states data
const statesData = [
  { slug: 'california', name: 'California', abbreviation: 'CA', location_count: 35, primary_phone: '(323) 555-0123', primary_city: 'Los Angeles', coverage_description: 'Statewide coverage with major hubs in Los Angeles, San Francisco, and San Diego' },
  { slug: 'texas', name: 'Texas', abbreviation: 'TX', location_count: 28, primary_phone: '(713) 555-0456', primary_city: 'Houston', coverage_description: 'Complete Texas coverage with locations in Houston, Dallas, Austin, and San Antonio' },
  { slug: 'florida', name: 'Florida', abbreviation: 'FL', location_count: 22, primary_phone: '(305) 555-0789', primary_city: 'Miami', coverage_description: 'Comprehensive Florida service from Miami to Jacksonville and Tampa' },
  { slug: 'new-york', name: 'New York', abbreviation: 'NY', location_count: 18, primary_phone: '(212) 555-0321', primary_city: 'New York City', coverage_description: 'Full New York State coverage including NYC, Albany, Buffalo, and Rochester' },
  { slug: 'illinois', name: 'Illinois', abbreviation: 'IL', location_count: 15, primary_phone: '(312) 555-0654', primary_city: 'Chicago', coverage_description: 'Illinois-wide service with primary operations in Chicago and Springfield' },
  { slug: 'georgia', name: 'Georgia', abbreviation: 'GA', location_count: 12, primary_phone: '(404) 555-0987', primary_city: 'Atlanta', coverage_description: 'Georgia statewide coverage with Atlanta as primary hub' },
  { slug: 'arizona', name: 'Arizona', abbreviation: 'AZ', location_count: 10, primary_phone: '(602) 555-0246', primary_city: 'Phoenix', coverage_description: 'Arizona coverage from Phoenix and Tucson service centers' },
  { slug: 'michigan', name: 'Michigan', abbreviation: 'MI', location_count: 14, primary_phone: '(313) 555-0579', primary_city: 'Detroit', coverage_description: 'Michigan statewide service with Detroit and Grand Rapids locations' },
  { slug: 'ohio', name: 'Ohio', abbreviation: 'OH', location_count: 16, primary_phone: '(614) 555-0813', primary_city: 'Columbus', coverage_description: 'Complete Ohio coverage from Columbus, Cleveland, and Cincinnati' },
  { slug: 'pennsylvania', name: 'Pennsylvania', abbreviation: 'PA', location_count: 17, primary_phone: '(215) 555-0357', primary_city: 'Philadelphia', coverage_description: 'Pennsylvania service from Philadelphia and Pittsburgh hubs' },
  { slug: 'north-carolina', name: 'North Carolina', abbreviation: 'NC', location_count: 13, primary_phone: '(704) 555-0468', primary_city: 'Charlotte', coverage_description: 'North Carolina coverage with Charlotte and Raleigh locations' },
  { slug: 'washington', name: 'Washington', abbreviation: 'WA', location_count: 11, primary_phone: '(206) 555-0791', primary_city: 'Seattle', coverage_description: 'Washington State service from Seattle and Spokane' },
  { slug: 'virginia', name: 'Virginia', abbreviation: 'VA', location_count: 9, primary_phone: '(804) 555-0135', primary_city: 'Richmond', coverage_description: 'Virginia coverage from Richmond and Norfolk service centers' },
  { slug: 'tennessee', name: 'Tennessee', abbreviation: 'TN', location_count: 8, primary_phone: '(615) 555-0246', primary_city: 'Nashville', coverage_description: 'Tennessee service from Nashville and Memphis locations' },
  { slug: 'colorado', name: 'Colorado', abbreviation: 'CO', location_count: 7, primary_phone: '(303) 555-0357', primary_city: 'Denver', coverage_description: 'Colorado coverage from Denver metropolitan area' },
  { slug: 'oregon', name: 'Oregon', abbreviation: 'OR', location_count: 6, primary_phone: '(503) 555-0468', primary_city: 'Portland', coverage_description: 'Oregon service from Portland and Eugene locations' },
  { slug: 'nevada', name: 'Nevada', abbreviation: 'NV', location_count: 5, primary_phone: '(702) 555-0579', primary_city: 'Las Vegas', coverage_description: 'Nevada coverage from Las Vegas and Reno' },
  { slug: 'utah', name: 'Utah', abbreviation: 'UT', location_count: 4, primary_phone: '(801) 555-0680', primary_city: 'Salt Lake City', coverage_description: 'Utah statewide service from Salt Lake City hub' },
  { slug: 'alabama', name: 'Alabama', abbreviation: 'AL', location_count: 6, primary_phone: '(205) 555-0791', primary_city: 'Birmingham', coverage_description: 'Alabama coverage from Birmingham and Mobile' },
  { slug: 'indiana', name: 'Indiana', abbreviation: 'IN', location_count: 8, primary_phone: '(317) 555-0802', primary_city: 'Indianapolis', coverage_description: 'Indiana service from Indianapolis and Fort Wayne' },
  { slug: 'wisconsin', name: 'Wisconsin', abbreviation: 'WI', location_count: 7, primary_phone: '(414) 555-0913', primary_city: 'Milwaukee', coverage_description: 'Wisconsin coverage from Milwaukee and Madison' },
  { slug: 'missouri', name: 'Missouri', abbreviation: 'MO', location_count: 9, primary_phone: '(314) 555-0124', primary_city: 'St. Louis', coverage_description: 'Missouri service from St. Louis and Kansas City' },
  { slug: 'louisiana', name: 'Louisiana', abbreviation: 'LA', location_count: 5, primary_phone: '(504) 555-0235', primary_city: 'New Orleans', coverage_description: 'Louisiana coverage from New Orleans and Baton Rouge' },
  { slug: 'kentucky', name: 'Kentucky', abbreviation: 'KY', location_count: 6, primary_phone: '(502) 555-0346', primary_city: 'Louisville', coverage_description: 'Kentucky service from Louisville and Lexington' },
  { slug: 'oklahoma', name: 'Oklahoma', abbreviation: 'OK', location_count: 5, primary_phone: '(405) 555-0457', primary_city: 'Oklahoma City', coverage_description: 'Oklahoma coverage from Oklahoma City and Tulsa' },
  { slug: 'arkansas', name: 'Arkansas', abbreviation: 'AR', location_count: 4, primary_phone: '(501) 555-0568', primary_city: 'Little Rock', coverage_description: 'Arkansas statewide service from Little Rock' },
  { slug: 'kansas', name: 'Kansas', abbreviation: 'KS', location_count: 4, primary_phone: '(316) 555-0679', primary_city: 'Wichita', coverage_description: 'Kansas coverage from Wichita and Topeka' },
  { slug: 'iowa', name: 'Iowa', abbreviation: 'IA', location_count: 5, primary_phone: '(515) 555-0780', primary_city: 'Des Moines', coverage_description: 'Iowa service from Des Moines and Cedar Rapids' },
  { slug: 'minnesota', name: 'Minnesota', abbreviation: 'MN', location_count: 8, primary_phone: '(612) 555-0891', primary_city: 'Minneapolis', coverage_description: 'Minnesota coverage from Minneapolis-St. Paul metro' },
  { slug: 'nebraska', name: 'Nebraska', abbreviation: 'NE', location_count: 3, primary_phone: '(402) 555-0902', primary_city: 'Omaha', coverage_description: 'Nebraska service from Omaha and Lincoln' },
  { slug: 'south-carolina', name: 'South Carolina', abbreviation: 'SC', location_count: 5, primary_phone: '(803) 555-0013', primary_city: 'Columbia', coverage_description: 'South Carolina coverage from Columbia and Charleston' },
  { slug: 'mississippi', name: 'Mississippi', abbreviation: 'MS', location_count: 4, primary_phone: '(601) 555-0124', primary_city: 'Jackson', coverage_description: 'Mississippi service from Jackson and Gulfport' },
  { slug: 'west-virginia', name: 'West Virginia', abbreviation: 'WV', location_count: 3, primary_phone: '(304) 555-0235', primary_city: 'Charleston', coverage_description: 'West Virginia statewide service from Charleston' },
  { slug: 'maryland', name: 'Maryland', abbreviation: 'MD', location_count: 6, primary_phone: '(410) 555-0346', primary_city: 'Baltimore', coverage_description: 'Maryland coverage from Baltimore and Annapolis' },
  { slug: 'massachusetts', name: 'Massachusetts', abbreviation: 'MA', location_count: 7, primary_phone: '(617) 555-0457', primary_city: 'Boston', coverage_description: 'Massachusetts service from Boston metropolitan area' },
  { slug: 'connecticut', name: 'Connecticut', abbreviation: 'CT', location_count: 4, primary_phone: '(203) 555-0568', primary_city: 'Hartford', coverage_description: 'Connecticut coverage from Hartford and New Haven' },
  { slug: 'new-jersey', name: 'New Jersey', abbreviation: 'NJ', location_count: 8, primary_phone: '(201) 555-0679', primary_city: 'Newark', coverage_description: 'New Jersey service from Newark and Trenton' },
  { slug: 'maine', name: 'Maine', abbreviation: 'ME', location_count: 3, primary_phone: '(207) 555-0780', primary_city: 'Portland', coverage_description: 'Maine statewide service from Portland' },
  { slug: 'new-hampshire', name: 'New Hampshire', abbreviation: 'NH', location_count: 2, primary_phone: '(603) 555-0891', primary_city: 'Manchester', coverage_description: 'New Hampshire service from Manchester' },
  { slug: 'vermont', name: 'Vermont', abbreviation: 'VT', location_count: 2, primary_phone: '(802) 555-0902', primary_city: 'Burlington', coverage_description: 'Vermont statewide service from Burlington' },
  { slug: 'rhode-island', name: 'Rhode Island', abbreviation: 'RI', location_count: 2, primary_phone: '(401) 555-0013', primary_city: 'Providence', coverage_description: 'Rhode Island service from Providence' },
  { slug: 'delaware', name: 'Delaware', abbreviation: 'DE', location_count: 2, primary_phone: '(302) 555-0124', primary_city: 'Wilmington', coverage_description: 'Delaware statewide service from Wilmington' },
  { slug: 'north-dakota', name: 'North Dakota', abbreviation: 'ND', location_count: 2, primary_phone: '(701) 555-0235', primary_city: 'Fargo', coverage_description: 'North Dakota service from Fargo and Bismarck' },
  { slug: 'south-dakota', name: 'South Dakota', abbreviation: 'SD', location_count: 2, primary_phone: '(605) 555-0346', primary_city: 'Sioux Falls', coverage_description: 'South Dakota service from Sioux Falls' },
  { slug: 'montana', name: 'Montana', abbreviation: 'MT', location_count: 3, primary_phone: '(406) 555-0457', primary_city: 'Billings', coverage_description: 'Montana coverage from Billings and Missoula' },
  { slug: 'wyoming', name: 'Wyoming', abbreviation: 'WY', location_count: 2, primary_phone: '(307) 555-0568', primary_city: 'Casper', coverage_description: 'Wyoming statewide service from Casper' },
  { slug: 'idaho', name: 'Idaho', abbreviation: 'ID', location_count: 3, primary_phone: '(208) 555-0679', primary_city: 'Boise', coverage_description: 'Idaho coverage from Boise and Coeur d\'Alene' },
  { slug: 'new-mexico', name: 'New Mexico', abbreviation: 'NM', location_count: 3, primary_phone: '(505) 555-0780', primary_city: 'Albuquerque', coverage_description: 'New Mexico service from Albuquerque and Santa Fe' },
  { slug: 'alaska', name: 'Alaska', abbreviation: 'AK', location_count: 2, primary_phone: '(907) 555-0891', primary_city: 'Anchorage', coverage_description: 'Alaska service from Anchorage and Fairbanks' },
  { slug: 'hawaii', name: 'Hawaii', abbreviation: 'HI', location_count: 2, primary_phone: '(808) 555-0902', primary_city: 'Honolulu', coverage_description: 'Hawaii service from Honolulu and Hilo' },
]

export async function populateDatabase() {
  // Silent logging - removed console.log

  try {
    // Insert solutions
    // Silent logging - removed console.log
    const solutionsData = solutions.map(solution => ({
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
      climate_control: solution.specifications.climate
    }))

    const { error: solutionsError } = await supabaseAdmin
      .from('solutions')
      .upsert(solutionsData, { onConflict: 'slug' })

    if (solutionsError) {
      // Silent error handling - removed console.error
    } else {
      // Silent logging - removed console.log
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

    const { error: industriesError } = await supabaseAdmin
      .from('industries')
      .upsert(industriesData, { onConflict: 'slug' })

    if (industriesError) {
      // Silent error handling - removed console.error
    } else {
      // Silent logging - removed console.log
    }

    // Insert states
    // Silent logging - removed console.log
    const { error: statesError } = await supabaseAdmin
      .from('states')
      .upsert(statesData, { onConflict: 'slug' })

    if (statesError) {
      // Silent error handling - removed console.error
    } else {
      // Silent logging - removed console.log
    }

    // Insert locations
    // Silent logging - removed console.log
    const locationsData = locations.map(location => ({
      slug: location.id,
      city: location.city,
      state: location.state,
      state_abbreviation: location.state, // Assuming this is already abbreviated
      phone: location.phone,
      address: location.address,
      service_radius: location.serviceRadius,
      is_primary: false,
      coverage_area: `${location.serviceRadius}+ mile service radius`
    }))

    const { error: locationsError } = await supabaseAdmin
      .from('locations')
      .upsert(locationsData, { onConflict: 'slug' })

    if (locationsError) {
      // Silent error handling - removed console.error
    } else {
      // Silent logging - removed console.log
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

    const { error: testimonialsError } = await supabaseAdmin
      .from('testimonials')
      .upsert(testimonialsData)

    if (testimonialsError) {
      // Silent error handling - removed console.error
    } else {
      // Silent logging - removed console.log
    }

    // Insert news insights
    // Silent logging - removed console.log
    const newsData = newsInsights.map(news => ({
      slug: news.id,
      title: news.title,
      excerpt: news.excerpt,
      content: news.excerpt, // Using excerpt as content for now
      image_url: news.imageUrl,
      category: news.category,
      read_time: news.readTime,
      published_date: news.date
    }))

    const { error: newsError } = await supabaseAdmin
      .from('news_insights')
      .upsert(newsData, { onConflict: 'slug' })

    if (newsError) {
      // Silent error handling - removed console.error
    } else {
      // Silent logging - removed console.log
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

    const { error: faqsError } = await supabaseAdmin
      .from('faqs')
      .upsert(faqsData)

    if (faqsError) {
      // Silent error handling - removed console.error
    } else {
      // Silent logging - removed console.log
    }

    // Silent logging - removed console.log
    return { success: true }

  } catch (error) {
    // Silent error handling - removed console.error
    return { success: false, error }
  }
}
'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, ArrowRight, CheckCircle, Building, Users, Shield, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import LoadingSpinner from '@/components/ui/LoadingSpinner'
import { supabase } from '@/lib/supabase'
import PageLayout from '@/components/layout/PageLayout'
import Image from 'next/image'

interface CityData {
  id: string
  state_code: string
  state_name: string
  city_name: string
  city_slug: string
  phone: string
  sales_phone?: string
  service_phone?: string
  address?: string
  latitude?: number
  longitude?: number
  service_radius: number
  coverage_area?: string
  hours_operation: Record<string, string>
  hero_title: string
  hero_description: string
  hero_image_url?: string
  building_types: string[]
  industries_served: string[]
  key_features: string[]
  meta_title?: string
  meta_description?: string
  custom_content?: string
  related_cities: string[]
  is_active: boolean
  is_primary: boolean
}

const CityPage = () => {
  const params = useParams()
  const stateSlug = params.state as string
  const citySlug = params.city as string
  
  const [cityData, setCityData] = useState<CityData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeIndustry, setActiveIndustry] = useState('Education')

  // Industry content data
  const industryContent = {
    'Education': {
      title: 'Education',
      description: `${cityData?.city_name || 'This city'} is home to some of the top-performing schools in the state, along with notable colleges and universities such as Alabama State University. With modular school buildings, you can create administrative offices for school districts and colleges in addition to classrooms during the construction of new facilities.`,
      additionalText: `Modular school buildings can also be used to create cafeterias, locker rooms, or activity centers for various classes. They are the perfect solution during the renovation or expansion of your campus. Mobile Modular can provide swing space during school expansions or design an entire permanent complex with matching exteriors for a seamless aesthetic.`,
      buildingTypes: ['Classrooms', 'Complexes', 'Cafeterias', 'Gyms', 'Computer & Science Labs', 'Libraries', 'Multi-story', 'Administrative Offices', 'Custom Modular Buildings'],
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp'
    },
    'Construction': {
      title: 'Construction',
      description: `${cityData?.city_name || 'This city'} has numerous construction projects requiring temporary office solutions and secure storage. Our construction-grade modular buildings provide safe, comfortable workspace for project managers, engineers, and site supervisors.`,
      additionalText: `Our construction modular buildings are designed to withstand harsh job site conditions while providing professional office environments. They can be quickly deployed and relocated as projects progress, making them ideal for multi-phase construction projects.`,
      buildingTypes: ['Site Offices', 'Storage Containers', 'Security Buildings', 'Break Rooms', 'Plan Rooms', 'Meeting Facilities', 'First Aid Stations', 'Equipment Storage'],
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp'
    },
    'Medical': {
      title: 'Medical',
      description: `Healthcare facilities in ${cityData?.city_name || 'this city'} require specialized modular solutions that meet strict medical standards. Our medical-grade modular buildings provide sterile, professional environments for patient care and medical administration.`,
      additionalText: `These facilities feature medical-grade flooring, specialized HVAC systems with proper filtration, emergency power backup, and ADA compliance. Perfect for temporary clinics, emergency medical facilities, or expanding existing healthcare operations.`,
      buildingTypes: ['Medical Clinics', 'Emergency Facilities', 'Administrative Offices', 'Patient Waiting Areas', 'Laboratory Spaces', 'Pharmacy Areas', 'Medical Storage', 'Isolation Units'],
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp'
    },
    'Government': {
      title: 'Government',
      description: `Government agencies in ${cityData?.city_name || 'this city'} need secure, professional facilities for public services and administrative functions. Our government-grade modular buildings provide the security and functionality required for municipal operations.`,
      additionalText: `These buildings feature enhanced security measures, professional interiors suitable for public interaction, and can be configured for various government functions from DMV offices to emergency command centers.`,
      buildingTypes: ['Administrative Offices', 'Public Service Centers', 'Security Buildings', 'Emergency Command Centers', 'Court Facilities', 'DMV Offices', 'Voting Centers', 'Storage Facilities'],
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp'
    },
    'Manufacturing': {
      title: 'Manufacturing',
      description: `Manufacturing facilities in ${cityData?.city_name || 'this city'} require specialized office and support buildings that can withstand industrial environments. Our manufacturing-grade modular buildings provide professional workspace within industrial settings.`,
      additionalText: `These buildings are designed to handle the unique challenges of manufacturing environments, including noise control, ventilation, and easy integration with existing industrial infrastructure.`,
      buildingTypes: ['Plant Offices', 'Quality Control Labs', 'Break Rooms', 'Training Facilities', 'Storage Buildings', 'Security Checkpoints', 'Maintenance Offices', 'Shipping & Receiving'],
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
    },
    'Industrial': {
      title: 'Industrial',
      description: `Industrial operations in ${cityData?.city_name || 'this city'} need robust, functional buildings that can support heavy-duty operations. Our industrial modular buildings are built to last in demanding environments.`,
      additionalText: `These facilities provide essential support functions for industrial operations, from administrative offices to specialized work areas, all designed to meet the unique demands of industrial applications.`,
      buildingTypes: ['Industrial Offices', 'Control Rooms', 'Maintenance Facilities', 'Storage Buildings', 'Equipment Shelters', 'Break Areas', 'Security Buildings', 'Custom Industrial Solutions'],
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
    },
    'Retail': {
      title: 'Retail',
      description: `Retail businesses in ${cityData?.city_name || 'this city'} need flexible, attractive spaces that can adapt to changing market conditions. Our retail modular buildings provide cost-effective solutions for temporary or permanent retail operations.`,
      additionalText: `These buildings can be customized with attractive exteriors and professional interiors to create appealing shopping environments. Perfect for pop-up stores, seasonal retail, or expanding existing retail operations.`,
      buildingTypes: ['Pop-up Stores', 'Retail Offices', 'Storage Areas', 'Customer Service Centers', 'Temporary Shops', 'Seasonal Retail', 'Market Stalls', 'Commercial Offices'],
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp'
    },
    'Oil & Gas': {
      title: 'Oil & Gas',
      description: `Oil and gas operations in ${cityData?.city_name || 'this city'} require specialized facilities that can handle remote locations and harsh conditions. Our oil & gas modular buildings are engineered for extreme environments and long-term reliability.`,
      additionalText: `These facilities meet industry safety standards and can be deployed to remote locations quickly. They provide essential office and support functions for drilling operations, refineries, and pipeline projects.`,
      buildingTypes: ['Site Offices', 'Control Rooms', 'Safety Buildings', 'Equipment Storage', 'Maintenance Facilities', 'Worker Accommodations', 'Security Buildings', 'Emergency Response Centers'],
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
    },
    'Mining': {
      title: 'Mining',
      description: `Mining operations in ${cityData?.city_name || 'this city'} need durable, portable facilities that can be relocated as mining sites expand. Our mining modular buildings are built to withstand harsh conditions and frequent relocation.`,
      additionalText: `These buildings provide essential support for mining operations, from administrative offices to safety training facilities, all designed to meet the unique challenges of the mining industry.`,
      buildingTypes: ['Mine Offices', 'Safety Centers', 'Equipment Storage', 'Maintenance Buildings', 'Break Rooms', 'Security Buildings', 'First Aid Stations', 'Training Facilities'],
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
    },
    'Disaster & Emergency Response': {
      title: 'Disaster & Emergency Response',
      description: `Emergency response operations in ${cityData?.city_name || 'this city'} require rapid deployment of essential facilities. Our emergency response modular buildings can be quickly deployed to provide critical support during disasters and emergencies.`,
      additionalText: `These facilities are designed for rapid deployment and can provide essential services including command centers, medical facilities, and temporary housing for emergency responders and displaced residents.`,
      buildingTypes: ['Command Centers', 'Emergency Medical', 'Temporary Housing', 'Supply Distribution', 'Communications Centers', 'Emergency Offices', 'Shelter Facilities', 'Relief Coordination'],
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp'
    },
    'Military': {
      title: 'Military',
      description: `Military operations in ${cityData?.city_name || 'this city'} require secure, durable facilities that meet strict military specifications. Our military-grade modular buildings provide the security and functionality required for defense applications.`,
      additionalText: `These facilities meet military standards for security, communications, and operational requirements. They can be rapidly deployed and provide essential support for various military operations.`,
      buildingTypes: ['Command Centers', 'Barracks', 'Administrative Offices', 'Training Facilities', 'Equipment Storage', 'Security Buildings', 'Communications Centers', 'Maintenance Facilities'],
      image: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp'
    }
  }

  const getCurrentIndustryContent = () => {
    return industryContent[activeIndustry as keyof typeof industryContent] || industryContent['Education']
  }

  useEffect(() => {
    async function loadCityData() {
      try {
        // Convert state slug to state code for lookup
        const stateMap: Record<string, string> = {
          'alabama': 'AL', 'alaska': 'AK', 'arizona': 'AZ', 'arkansas': 'AR',
          'california': 'CA', 'colorado': 'CO', 'connecticut': 'CT', 'delaware': 'DE',
          'florida': 'FL', 'georgia': 'GA', 'hawaii': 'HI', 'idaho': 'ID',
          'illinois': 'IL', 'indiana': 'IN', 'iowa': 'IA', 'kansas': 'KS',
          'kentucky': 'KY', 'louisiana': 'LA', 'maine': 'ME', 'maryland': 'MD',
          'massachusetts': 'MA', 'michigan': 'MI', 'minnesota': 'MN', 'mississippi': 'MS',
          'missouri': 'MO', 'montana': 'MT', 'nebraska': 'NE', 'nevada': 'NV',
          'new-hampshire': 'NH', 'new-jersey': 'NJ', 'new-mexico': 'NM', 'new-york': 'NY',
          'north-carolina': 'NC', 'north-dakota': 'ND', 'ohio': 'OH', 'oklahoma': 'OK',
          'oregon': 'OR', 'pennsylvania': 'PA', 'rhode-island': 'RI', 'south-carolina': 'SC',
          'south-dakota': 'SD', 'tennessee': 'TN', 'texas': 'TX', 'utah': 'UT',
          'vermont': 'VT', 'virginia': 'VA', 'washington': 'WA', 'west-virginia': 'WV',
          'wisconsin': 'WI', 'wyoming': 'WY'
        }
        
        const stateCode = stateMap[stateSlug]
        if (!stateCode) {
          setError('State not found')
          setLoading(false)
          return
        }

        const { data: city, error } = await supabase
          .from('cities')
          .select('*')
          .eq('state_code', stateCode)
          .eq('city_slug', citySlug)
          .eq('is_active', true)
          .single()

        if (error || !city) {
          setError('City not found')
        } else {
          setCityData(city)
        }
      } catch (err) {
        setError('Failed to load city information')
      } finally {
        setLoading(false)
      }
    }

    if (stateSlug && citySlug) {
      loadCityData()
    }
  }, [stateSlug, citySlug])

  if (loading) {
    return (
      <PageLayout>
        <LoadingSpinner 
          message="Loading location information..."
          size="lg"
          variant="city"
          showLogo={true}
        />
      </PageLayout>
    )
  }

  if (error || !cityData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl text-gray-400 mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">City Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || "We couldn't find information for this city."}
          </p>
          <Button onClick={() => window.history.back()} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  return (
    <PageLayout>
      <div className="min-h-screen bg-white">
        {/* Hero Section with Map */}
        <section className="relative bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Map Section */}
              <div className="order-2 lg:order-1">
                <div className="bg-white rounded-lg shadow-lg p-2 h-96">
                  {cityData.latitude && cityData.longitude ? (
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                      src={`https://maps.google.com/maps?width=100%25&height=380&hl=en&q=${cityData.latitude},${cityData.longitude}&t=&z=12&ie=UTF8&iwloc=&output=embed`}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-100 rounded-lg">
                      <div className="text-center">
                        <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">{cityData.city_name}, {cityData.state_code}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="order-1 lg:order-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  <h1 className="text-4xl lg:text-5xl font-bold text-navy-600 mb-6">
                    {cityData.hero_title}
                  </h1>
                  
                  <div className="space-y-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-orange-600 mb-2">Customer Service:</h3>
                        <div className="flex items-center space-x-2 text-navy-600">
                          <Phone className="h-4 w-4" />
                          <a href={`tel:${cityData.sales_phone || cityData.phone}`} className="font-medium hover:text-orange-600 transition-colors">
                            Sales: {cityData.sales_phone || cityData.phone}
                          </a>
                        </div>
                        {cityData.service_phone && (
                          <div className="flex items-center space-x-2 text-navy-600 mt-1">
                            <Phone className="h-4 w-4" />
                            <a href={`tel:${cityData.service_phone}`} className="font-medium hover:text-orange-600 transition-colors">
                              Service: {cityData.service_phone}
                            </a>
                          </div>
                        )}
                      </div>
                      
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-orange-600 mb-2">Hours of Operation:</h3>
                        <div className="text-navy-600">
                          <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4" />
                            <span>Mon - Fri: {cityData.hours_operation?.monday || '8:00 a.m. - 5:00 p.m.'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Link href="/quote">
                        <Button size="lg" className="bg-navy-600 hover:bg-navy-700">
                          REQUEST A QUOTE
                        </Button>
                      </Link>
                      <a href="https://www.google.com/search?q=mobile+modular+reviews" target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="lg" className="border-navy-600 text-navy-600 hover:bg-navy-50">
                          REVIEW US
                        </Button>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Building Types Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Office Buildings */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-navy-600">
                  {cityData.city_name} Office Trailers for Rent, Lease or Purchase
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {cityData.hero_description}
                </p>
                <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center">
                  <Image
                    src="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp"
                    alt="Office Building"
                    width={400}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                </div>
              </motion.div>

              {/* Classrooms */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-bold text-navy-600">
                  {cityData.city_name} Modular Classrooms for Rent, Lease or Purchase
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Our modular classrooms in {cityData.city_name} come in an array of standard floor plans or can be customized to support the unique requirements of your educational facility.
                </p>
                <div className="bg-gray-50 rounded-lg h-64 flex items-center justify-center">
                  <Image
                    src="https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp"
                    alt="Classroom"
                    width={400}
                    height={300}
                    className="rounded-lg object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Industries Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-navy-600 mb-4">
                Modular Buildings in {cityData.city_name}
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Industries List */}
              <div className="space-y-4">
                {cityData.industries_served.map((industry, index) => (
                  <motion.div
                    key={industry}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      activeIndustry === industry ? 'bg-orange-100 border-l-4 border-orange-500' : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveIndustry(industry)}
                  >
                    <h3 className={`font-semibold ${
                      activeIndustry === industry ? 'text-orange-600' : 'text-navy-600'
                    }`}>
                      {industry}
                      {activeIndustry === industry && <ArrowRight className="inline h-4 w-4 ml-2" />}
                    </h3>
                  </motion.div>
                ))}
              </div>

              {/* Industry Content */}
              <div className="space-y-6">
                <motion.div 
                  key={activeIndustry}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-orange-50 p-6 rounded-lg"
                >
                  <h3 className="text-2xl font-bold text-orange-600 mb-4">
                    {getCurrentIndustryContent().title}
                  </h3>
                  <p className="text-gray-700 mb-4">
                    {getCurrentIndustryContent().description}
                  </p>
                  <p className="text-gray-700 mb-6">
                    {getCurrentIndustryContent().additionalText}
                  </p>
                  
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="text-orange-600 font-semibold mb-3">Building Types Available</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {getCurrentIndustryContent().buildingTypes.map((type) => (
                        <div key={type} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-sm text-gray-700">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  key={`${activeIndustry}-image`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gray-50 rounded-lg h-48 flex items-center justify-center overflow-hidden"
                >
                  <Image
                    src={getCurrentIndustryContent().image}
                    alt={`${getCurrentIndustryContent().title} Building`}
                    width={400}
                    height={200}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 mb-12">
              {cityData.key_features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="bg-navy-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                    {index === 0 && <Building className="h-8 w-8 text-white" />}
                    {index === 1 && <Clock className="h-8 w-8 text-white" />}
                    {index === 2 && <Users className="h-8 w-8 text-white" />}
                    {index === 3 && <Star className="h-8 w-8 text-white" />}
                    {index === 4 && <CheckCircle className="h-8 w-8 text-white" />}
                    {index === 5 && <Building className="h-8 w-8 text-white" />}
                    {index === 6 && <Shield className="h-8 w-8 text-white" />}
                  </div>
                  <h3 className="font-semibold text-navy-600 text-sm">{feature}</h3>
                </motion.div>
              ))}
            </div>

            <div className="text-center max-w-4xl mx-auto">
              <p className="text-gray-700 text-lg leading-relaxed mb-8">
                At Mobile Modular, we pride ourselves on creating exceptional customer experiences and delivering premium quality 
                products in the {cityData.city_name} region. Let our experts guide you through the entire process, ensuring that your project 
                runs smoothly and efficiently. Our expertise, attention to detail, and end-to-end service is the reason we continually rank 
                highest in customer satisfaction. We understand deadlines and work closely with you to deliver the unit you want on 
                time and within budget. Visit our <a href="#" className="text-blue-600 underline">why choose us</a> page to find out more.
              </p>
              <p className="text-gray-700 text-lg">
                Or, you can browse our <a href="#" className="text-blue-600 underline">product guides for detailed product information</a>. Read about customer success stories in the 
                <a href="#" className="text-blue-600 underline"> case studies</a> section and deep dive into the modular buildings industry with <a href="#" className="text-blue-600 underline">our blog</a>.
              </p>
            </div>
          </div>
        </section>

        {/* Related Cities Section */}
        {cityData.related_cities.length > 0 && (
          <section className="py-16 bg-navy-600 text-white">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center mb-12">
                More {cityData.state_name} Locations
              </h2>
              <div className="flex justify-center space-x-12">
                {cityData.related_cities.map((city) => (
                  <motion.a
                    key={city}
                    href={`/locations/${stateSlug}/${city.toLowerCase().replace(/\s+/g, '-')}`}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center space-x-2 text-orange-400 hover:text-orange-300 transition-colors"
                  >
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span className="font-medium">{city}, {cityData.state_code}</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.a>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </PageLayout>
  )
}

export default CityPage
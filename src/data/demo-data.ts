export interface Solution {
  id: string
  name: string
  description: string
  features: string[]
  imageUrl: string
  category: 'office' | 'education' | 'storage' | 'healthcare' | 'security' | 'restaurant'
  startingPrice: string
  specifications: {
    dimensions: string
    capacity: string
    power: string
    climate: boolean
  }
}

export interface Industry {
  id: string
  name: string
  description: string
  solutions: string[]
  imageUrl: string
  caseStudies: number
}

export interface Location {
  id: string
  city: string
  state: string
  phone: string
  address: string
  serviceRadius: number
}

export const solutions: Solution[] = [
  {
    id: 'office-buildings',
    name: 'Office Buildings',
    description: 'Professional modular office spaces designed for productivity and comfort',
    features: ['Climate Control', 'Professional Interior', 'Flexible Layouts', 'High-Speed Internet Ready'],
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
    category: 'office',
    startingPrice: '$850/month',
    specifications: {
      dimensions: '8\' x 20\' to 24\' x 60\'',
      capacity: '2-20 people',
      power: '120V/240V electrical',
      climate: true
    }
  },
  {
    id: 'portable-classrooms',
    name: 'Portable Classrooms',
    description: 'Educational spaces that meet modern learning requirements',
    features: ['ADA Compliant', 'Smart Board Ready', 'Energy Efficient', 'Sound Insulation'],
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
    category: 'education',
    startingPrice: '$1,200/month',
    specifications: {
      dimensions: '24\' x 32\' to 28\' x 40\'',
      capacity: '20-30 students',
      power: '240V electrical service',
      climate: true
    }
  },
  {
    id: 'storage-containers',
    name: 'Storage Containers',
    description: 'Secure portable storage solutions for equipment and materials',
    features: ['Weather Resistant', 'Multiple Lock Options', 'Shelving Available', 'Ground Level Access'],
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
    category: 'storage',
    startingPrice: '$125/month',
    specifications: {
      dimensions: '8\' x 10\' to 8\' x 40\'',
      capacity: '160-320 sq ft',
      power: 'Optional electrical',
      climate: false
    }
  },
  {
    id: 'healthcare-facilities',
    name: 'Healthcare Facilities',
    description: 'Medical-grade modular buildings for healthcare applications',
    features: ['Medical Grade Flooring', 'HVAC Filtration', 'Emergency Power', 'ADA Compliant'],
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp',
    category: 'healthcare',
    startingPrice: '$1,500/month',
    specifications: {
      dimensions: '12\' x 32\' to 24\' x 60\'',
      capacity: '4-15 patients',
      power: 'Medical grade electrical',
      climate: true
    }
  },
  {
    id: 'security-buildings',
    name: 'Security Buildings',
    description: 'Secure guard stations and security checkpoints',
    features: ['Bullet Resistant Options', '360° Visibility', 'Communication Ready', 'Climate Control'],
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/security_booth_small_security_guard_booth_interior.webp',
    category: 'security',
    startingPrice: '$650/month',
    specifications: {
      dimensions: '4\' x 6\' to 8\' x 12\'',
      capacity: '1-3 guards',
      power: '120V electrical',
      climate: true
    }
  },
  {
    id: 'restaurant-facilities',
    name: 'Restaurant & Food Service',
    description: 'Food service buildings with commercial kitchen capabilities',
    features: ['Commercial Kitchen', 'Grease Trap Ready', 'Ventilation System', 'Health Code Compliant'],
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/restaurant_truck_chef_plating_gourmet_dish_in_upsc.webp',
    category: 'restaurant',
    startingPrice: '$1,800/month',
    specifications: {
      dimensions: '12\' x 24\' to 16\' x 40\'',
      capacity: '10-40 diners',
      power: '240V three-phase',
      climate: true
    }
  },
  {
    id: 'restroom-facilities',
    name: 'Restroom Facilities',
    description: 'Clean, ADA-compliant portable restroom facilities for events, construction sites, and temporary needs',
    features: ['ADA Compliant', 'Running Water', 'Waste Management', 'Ventilation System', 'Hand Sanitizer Stations'],
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/restroom_single_single_restroom_unit_interior_4x8.webp',
    category: 'storage',
    startingPrice: '$275/month',
    specifications: {
      dimensions: '8\' x 12\' to 12\' x 20\'',
      capacity: '1-8 units',
      power: '120V electrical',
      climate: false
    }
  }
]

export const industries: Industry[] = [
  {
    id: 'education',
    name: 'Education',
    description: 'Flexible learning spaces for schools and universities',
    solutions: ['portable-classrooms', 'office-buildings', 'storage-containers'],
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
    caseStudies: 15
  },
  {
    id: 'construction',
    name: 'Construction',
    description: 'On-site offices and storage for construction projects',
    solutions: ['office-buildings', 'storage-containers', 'security-buildings'],
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp',
    caseStudies: 28
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Medical facilities and emergency response buildings',
    solutions: ['healthcare-facilities', 'office-buildings'],
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_healthcare_modular_medical_building_at_ho.webp',
    caseStudies: 12
  },
  {
    id: 'government',
    name: 'Government',
    description: 'Secure buildings for government and municipal use',
    solutions: ['office-buildings', 'security-buildings', 'storage-containers'],
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp',
    caseStudies: 22
  },
  {
    id: 'retail',
    name: 'Retail & Commercial',
    description: 'Pop-up stores and temporary commercial spaces',
    solutions: ['office-buildings', 'restaurant-facilities', 'storage-containers'],
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp',
    caseStudies: 18
  },
  {
    id: 'emergency',
    name: 'Emergency Response',
    description: 'Rapid deployment buildings for emergency situations',
    solutions: ['office-buildings', 'healthcare-facilities', 'storage-containers'],
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp',
    caseStudies: 9
  }
]

export const locations: Location[] = [
  {
    id: 'los-angeles',
    city: 'Los Angeles',
    state: 'CA',
    phone: '(323) 555-0123',
    address: '1234 Industrial Blvd, Los Angeles, CA 90028',
    serviceRadius: 100
  },
  {
    id: 'houston',
    city: 'Houston',
    state: 'TX',
    phone: '(713) 555-0456',
    address: '5678 Commerce St, Houston, TX 77002',
    serviceRadius: 150
  },
  {
    id: 'atlanta',
    city: 'Atlanta',
    state: 'GA',
    phone: '(404) 555-0789',
    address: '9012 Peachtree Rd, Atlanta, GA 30309',
    serviceRadius: 125
  },
  {
    id: 'chicago',
    city: 'Chicago',
    state: 'IL',
    phone: '(312) 555-0012',
    address: '3456 Lake Shore Dr, Chicago, IL 60611',
    serviceRadius: 175
  },
  {
    id: 'phoenix',
    city: 'Phoenix',
    state: 'AZ',
    phone: '(602) 555-0345',
    address: '7890 Desert View Ave, Phoenix, AZ 85001',
    serviceRadius: 200
  }
]

export const testimonials = [
  {
    id: '1',
    name: 'Sarah Johnson',
    company: 'ABC Construction',
    role: 'Project Manager',
    content: 'The modular office buildings from Modular Building Solutions provided exactly what we needed for our construction site. Professional, quick setup, and great customer service.',
    rating: 5,
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/testimonial_business_happy_business_owner_outside.webp'
  },
  {
    id: '2',
    name: 'Michael Chen',
    company: 'Riverside School District',
    role: 'Facilities Director',
    content: 'Our portable classrooms have been essential during our campus renovation. The quality and functionality exceeded our expectations.',
    rating: 5,
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/testimonial_education_school_principal_at_modular.webp'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    company: 'TechStart Inc.',
    role: 'CEO',
    content: 'Perfect solution for our growing startup. The modular office gave us professional space without the long-term commitment.',
    rating: 5,
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/testimonial_healthcare_doctor_at_modular_medical_c.webp'
  }
]

export const newsInsights = [
  {
    id: '1',
    title: 'The Future of Modular Construction in Education',
    excerpt: 'How portable classrooms are revolutionizing school expansion projects across the nation.',
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
    date: '2024-07-10',
    category: 'Education',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Construction Site Efficiency with Modular Offices',
    excerpt: 'Learn how on-site modular offices improve project management and worker productivity.',
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
    date: '2024-07-08',
    category: 'Construction',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Healthcare Facility Solutions for Emergency Response',
    excerpt: 'Rapid deployment medical facilities for disaster relief and emergency healthcare needs.',
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp',
    date: '2024-07-05',
    category: 'Healthcare',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Sustainable Building Practices in Modular Construction',
    excerpt: 'Environmental benefits and energy efficiency in modern modular building solutions.',
    imageUrl: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp',
    date: '2024-07-01',
    category: 'Sustainability',
    readTime: '7 min read'
  }
]
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
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
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
    imageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    caseStudies: 15
  },
  {
    id: 'construction',
    name: 'Construction',
    description: 'On-site offices and storage for construction projects',
    solutions: ['office-buildings', 'storage-containers', 'security-buildings'],
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
    caseStudies: 28
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    description: 'Medical facilities and emergency response buildings',
    solutions: ['healthcare-facilities', 'office-buildings'],
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop',
    caseStudies: 12
  },
  {
    id: 'government',
    name: 'Government',
    description: 'Secure buildings for government and municipal use',
    solutions: ['office-buildings', 'security-buildings', 'storage-containers'],
    imageUrl: 'https://images.unsplash.com/photo-1589578527966-fdac0f44566c?w=800&h=600&fit=crop',
    caseStudies: 22
  },
  {
    id: 'retail',
    name: 'Retail & Commercial',
    description: 'Pop-up stores and temporary commercial spaces',
    solutions: ['office-buildings', 'restaurant-facilities', 'storage-containers'],
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    caseStudies: 18
  },
  {
    id: 'emergency',
    name: 'Emergency Response',
    description: 'Rapid deployment buildings for emergency situations',
    solutions: ['office-buildings', 'healthcare-facilities', 'storage-containers'],
    imageUrl: 'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=800&h=600&fit=crop',
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
    content: 'The modular office buildings from Aman Modular provided exactly what we needed for our construction site. Professional, quick setup, and great customer service.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '2',
    name: 'Michael Chen',
    company: 'Riverside School District',
    role: 'Facilities Director',
    content: 'Our portable classrooms have been essential during our campus renovation. The quality and functionality exceeded our expectations.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    company: 'TechStart Inc.',
    role: 'CEO',
    content: 'Perfect solution for our growing startup. The modular office gave us professional space without the long-term commitment.',
    rating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
  }
]

export const newsInsights = [
  {
    id: '1',
    title: 'The Future of Modular Construction in Education',
    excerpt: 'How portable classrooms are revolutionizing school expansion projects across the nation.',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop',
    date: '2024-07-10',
    category: 'Education',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Construction Site Efficiency with Modular Offices',
    excerpt: 'Learn how on-site modular offices improve project management and worker productivity.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=250&fit=crop',
    date: '2024-07-08',
    category: 'Construction',
    readTime: '4 min read'
  },
  {
    id: '3',
    title: 'Healthcare Facility Solutions for Emergency Response',
    excerpt: 'Rapid deployment medical facilities for disaster relief and emergency healthcare needs.',
    imageUrl: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=250&fit=crop',
    date: '2024-07-05',
    category: 'Healthcare',
    readTime: '6 min read'
  },
  {
    id: '4',
    title: 'Sustainable Building Practices in Modular Construction',
    excerpt: 'Environmental benefits and energy efficiency in modern modular building solutions.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop',
    date: '2024-07-01',
    category: 'Sustainability',
    readTime: '7 min read'
  }
]
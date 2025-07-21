// Internal Links Data
export interface InternalLink {
  id: string
  title: string
  url: string
  description?: string
  category?: string
  order: number
  is_active: boolean
  created_at?: string
  updated_at?: string
}

// Demo data for internal links
export const internalLinksData: InternalLink[] = [
  {
    id: '1',
    title: 'Portable Classrooms',
    url: '/solutions/portable-classrooms',
    description: 'Educational modular buildings for schools and universities',
    category: 'solutions',
    order: 1,
    is_active: true
  },
  {
    id: '2',
    title: 'Office Buildings',
    url: '/solutions/office-buildings',
    description: 'Professional workspace solutions for any industry',
    category: 'solutions',
    order: 2,
    is_active: true
  },
  {
    id: '3',
    title: 'Healthcare Facilities',
    url: '/solutions/healthcare-facilities',
    description: 'Medical-grade modular buildings',
    category: 'solutions',
    order: 3,
    is_active: true
  },
  {
    id: '4',
    title: 'Education Industry',
    url: '/industries/education',
    description: 'Serving schools and educational institutions',
    category: 'industries',
    order: 4,
    is_active: true
  },
  {
    id: '5',
    title: 'Construction Industry',
    url: '/industries/construction',
    description: 'Site offices and construction facilities',
    category: 'industries',
    order: 5,
    is_active: true
  },
  {
    id: '6',
    title: 'California Locations',
    url: '/locations/california',
    description: 'Find our California service centers',
    category: 'locations',
    order: 6,
    is_active: true
  },
  {
    id: '7',
    title: 'Texas Locations',
    url: '/locations/texas',
    description: 'Find our Texas service centers',
    category: 'locations',
    order: 7,
    is_active: true
  },
  {
    id: '8',
    title: 'Case Studies',
    url: '/resources/case-studies',
    description: 'Success stories from our customers',
    category: 'resources',
    order: 8,
    is_active: true
  },
  {
    id: '9',
    title: 'Get a Quote',
    url: '/quote',
    description: 'Request a custom quote for your project',
    category: 'general',
    order: 9,
    is_active: true
  },
  {
    id: '10',
    title: 'Contact Us',
    url: '/contact',
    description: 'Get in touch with our team',
    category: 'general',
    order: 10,
    is_active: true
  }
]

// Helper functions
export const getActiveInternalLinks = (limit?: number): InternalLink[] => {
  const activeLinks = internalLinksData
    .filter(link => link.is_active)
    .sort((a, b) => a.order - b.order)
  
  return limit ? activeLinks.slice(0, limit) : activeLinks
}

export const getInternalLinksByCategory = (category: string): InternalLink[] => {
  return internalLinksData
    .filter(link => link.is_active && link.category === category)
    .sort((a, b) => a.order - b.order)
}
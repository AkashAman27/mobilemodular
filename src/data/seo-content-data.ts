// SEO Content Data
export interface SEOContentData {
  id: string
  page_type: 'solution' | 'industry'
  page_slug: string
  title: string
  paragraphs: string[]
  is_active: boolean
  created_at?: string
  updated_at?: string
}

// Demo data for SEO content sections
export const seoContentData: SEOContentData[] = [
  {
    id: '1',
    page_type: 'solution',
    page_slug: 'office-buildings',
    title: 'Why Choose Our Modular Office Buildings?',
    paragraphs: [
      'Our modular office buildings represent the perfect fusion of functionality, professionalism, and cost-effectiveness. Whether you need temporary workspace during construction projects, permanent expansion solutions, or emergency office space, our modular buildings deliver unmatched versatility. Each unit is engineered to meet the highest standards of commercial construction while providing the flexibility to adapt to your changing business needs.',
      'We understand that your workspace directly impacts productivity and employee satisfaction. That\'s why our modular office buildings feature professional interior finishes, optimal lighting systems, and advanced HVAC technology that maintains comfortable working conditions year-round. From single-person offices to multi-room complexes accommodating entire teams, our solutions scale seamlessly with your requirements.',
      'The construction industry has evolved, and so have we. Our modular office buildings utilize cutting-edge manufacturing techniques and premium materials to ensure longevity and durability. Each unit undergoes rigorous quality control testing and meets all local building codes and ADA accessibility requirements. This commitment to excellence has made us the trusted partner for thousands of businesses across the United States.',
      'Environmental responsibility is at the core of our manufacturing process. Our modular office buildings are designed for energy efficiency, featuring LED lighting systems, high-performance insulation, and efficient HVAC systems that reduce operational costs while minimizing environmental impact. The modular construction process itself generates significantly less waste compared to traditional construction methods, making it an environmentally conscious choice for forward-thinking businesses.',
      'Time is money in business, and our rapid deployment capabilities ensure you\'re operational quickly. Unlike traditional construction that can take months, our modular office buildings can be delivered and installed within days of your order. This speed to market advantage allows you to respond quickly to opportunities, accommodate sudden growth, or address urgent space needs without the lengthy delays associated with conventional construction projects.'
    ],
    is_active: true
  },
  {
    id: '2',
    page_type: 'solution',
    page_slug: 'portable-classrooms',
    title: 'Why Choose Our Portable Classrooms?',
    paragraphs: [
      'Education is the foundation of our future, and our portable classrooms are designed to provide optimal learning environments that inspire both students and educators. Each classroom is purpose-built with educational excellence in mind, featuring acoustically engineered interiors, optimal natural lighting, and flexible layouts that accommodate various teaching methods. Whether you\'re addressing enrollment growth, renovating existing facilities, or establishing temporary educational spaces, our portable classrooms deliver the quality and functionality that educational institutions demand.',
      'Modern education requires modern solutions, and our portable classrooms are equipped with the latest technology infrastructure to support digital learning initiatives. Pre-wired for smart boards, computer networks, and multimedia systems, these classrooms seamlessly integrate with contemporary educational technology. The carefully planned electrical systems and data connectivity ensure that teachers can implement innovative teaching methods while students benefit from enhanced learning experiences.',
      'Safety and compliance are non-negotiable in educational environments. Every portable classroom we deliver meets or exceeds all educational building codes, fire safety regulations, and ADA accessibility requirements. Our comprehensive safety features include emergency exits, fire suppression systems, and security-conscious design elements that provide peace of mind for administrators, teachers, and parents alike.',
      'Energy efficiency and environmental stewardship are increasingly important considerations for educational institutions. Our portable classrooms feature advanced insulation systems, energy-efficient LED lighting, and high-performance HVAC systems that maintain comfortable learning conditions while minimizing operational costs. This commitment to sustainability helps schools allocate more resources to educational programs rather than utility expenses.',
      'The speed of deployment that our portable classrooms offer is particularly valuable in educational settings where timing is critical. Unlike traditional construction that disrupts academic calendars, our portable classrooms can be delivered and installed during short breaks, minimizing disruption to the learning process. This rapid deployment capability has made us the preferred partner for school districts nationwide when they need reliable, high-quality educational space solutions.'
    ],
    is_active: true
  },
  {
    id: '3',
    page_type: 'solution',
    page_slug: 'healthcare-facilities',
    title: 'Why Choose Our Healthcare Facilities?',
    paragraphs: [
      'Healthcare demands the highest standards of cleanliness, functionality, and patient safety, and our modular healthcare facilities are engineered to meet these critical requirements. Each unit is constructed with medical-grade materials and finishes that support infection control protocols while providing the professional environment that patients and healthcare providers expect. Whether you need temporary facilities during renovations, emergency medical space, or permanent healthcare expansion, our solutions deliver the reliability and quality that healthcare applications demand.',
      'Our healthcare facilities feature specialized HVAC systems with advanced filtration capabilities, ensuring optimal air quality and maintaining the sterile environments required for medical procedures. The electrical systems are designed to support medical equipment, with emergency power capabilities and isolated grounding systems that meet healthcare electrical standards. These technical specifications ensure that our facilities can accommodate the sophisticated equipment and technology that modern healthcare relies upon.',
      'Patient comfort and accessibility are fundamental to quality healthcare delivery. Our modular healthcare facilities are designed with ADA compliance as a standard feature, ensuring that all patients can access care regardless of mobility limitations. The interior layouts are optimized for efficient workflow while maintaining patient privacy and dignity. From examination rooms to patient consultation areas, every space is thoughtfully designed to support positive healthcare outcomes.'
    ],
    is_active: true
  },
  {
    id: '4',
    page_type: 'industry',
    page_slug: 'education',
    title: 'Comprehensive Modular Solutions for Educational Excellence',
    paragraphs: [
      'The education industry faces unique challenges that require innovative, flexible solutions. From rapidly growing enrollment numbers to aging infrastructure requiring renovation, educational institutions need space solutions that can adapt quickly to changing needs while maintaining the high standards that learning environments demand. Our comprehensive range of modular buildings for the education sector provides schools, colleges, and universities with the flexibility to expand, renovate, or establish new facilities without the lengthy timelines and significant costs associated with traditional construction.',
      'Every educational institution has distinct needs based on their student population, curriculum requirements, and physical constraints. Our modular solutions for education are designed with this diversity in mind, offering everything from single classrooms to complete educational complexes. Whether you\'re a K-12 school district managing enrollment fluctuations, a community college expanding vocational programs, or a university establishing satellite campuses, our modular buildings provide the professional, functional space that supports educational excellence.',
      'Modern education increasingly relies on technology integration, and our educational modular buildings are designed to seamlessly support digital learning initiatives. Each facility comes pre-wired for smart boards, computer networks, and multimedia systems, ensuring that educators can implement the latest teaching methodologies without technical limitations. The robust electrical infrastructure and data connectivity options provide the foundation for innovative educational programs while maintaining the flexibility to adapt as technology continues to evolve.',
      'Budget constraints are a reality for most educational institutions, making cost-effectiveness a critical consideration in facility planning. Our modular approach delivers significant cost savings compared to traditional construction while maintaining the quality and durability that educational environments require. The predictable pricing, shorter project timelines, and minimal site disruption help institutions allocate more resources to educational programs rather than construction overruns and delays.'
    ],
    is_active: true
  },
  {
    id: '5',
    page_type: 'solution',
    page_slug: 'restroom-facilities',
    title: 'Why Choose Our Restroom Facilities?',
    paragraphs: [
      'Professional restroom facilities are essential for maintaining workplace standards, ensuring employee comfort, and meeting regulatory requirements across various industries. Our modular restroom facilities provide clean, comfortable, and fully functional sanitation solutions that rival permanent installations while offering the flexibility and cost-effectiveness that temporary and semi-permanent applications demand. Whether you need facilities for construction sites, events, emergency situations, or temporary workplace expansions, our restroom facilities deliver the quality and reliability that your organization requires.',
      'Hygiene and cleanliness are paramount in restroom facilities, and our modular units are designed with these priorities in mind. Each facility features high-quality fixtures, professional-grade finishes, and advanced ventilation systems that maintain fresh air circulation and prevent odors. The easy-to-clean surfaces and antimicrobial materials support ongoing sanitation efforts, while the robust plumbing systems ensure reliable operation even in demanding applications.',
      'Accessibility compliance is not just a legal requirement but a fundamental aspect of providing inclusive facilities for all users. Our ADA-compliant restroom options ensure that individuals with mobility limitations have full access to clean, comfortable facilities. These units feature appropriate spatial configurations, grab bars, accessible fixtures, and other accommodations that meet or exceed ADA requirements, demonstrating your organization\'s commitment to inclusion and compliance.',
      'The self-contained nature of our modular restroom facilities makes them ideal for locations where traditional plumbing connections are impractical or unavailable. With integrated fresh water systems, waste holding tanks, and electrical systems, these facilities can be deployed virtually anywhere while maintaining full functionality. This independence from existing infrastructure makes them perfect for remote job sites, temporary events, or emergency response situations where reliable sanitation facilities are needed immediately.'
    ],
    is_active: true
  },
  {
    id: '6',
    page_type: 'solution',
    page_slug: 'restaurant-food-service',
    title: 'Why Choose Our Restaurant & Food Service Buildings?',
    paragraphs: [
      'The food service industry requires specialized facilities that meet stringent health codes, support efficient operations, and provide the professional environment that customers expect. Our modular restaurant and food service buildings are designed specifically for culinary applications, featuring commercial-grade kitchen equipment compatibility, proper ventilation systems, and food-safe construction materials. Whether you\'re launching a new restaurant concept, expanding existing operations, or establishing temporary food service for events, our buildings provide the foundation for successful culinary enterprises.',
      'Food safety regulations are complex and non-negotiable in the food service industry. Our modular food service buildings are constructed with materials and finishes that meet health department requirements, featuring seamless surfaces that prevent bacterial growth, proper drainage systems, and ventilation designed for commercial cooking operations. The electrical systems are engineered to support commercial kitchen equipment while maintaining the safety standards required for food preparation environments.',
      'Efficient workflow is critical to restaurant success, and our modular food service buildings are designed with operational efficiency in mind. The layout options accommodate various service models, from quick-service counters to full-service dining operations, with flexible configurations that optimize staff movement and customer flow. Storage areas, prep spaces, and service counters can be customized to match your specific operational requirements and service style.',
      'Speed to market is often crucial in the competitive food service industry, and our modular approach delivers significant time advantages over traditional restaurant construction. While conventional restaurant buildouts can take months and face numerous delays, our modular food service buildings can be operational within weeks of order, allowing entrepreneurs to capitalize on market opportunities quickly and efficiently. This rapid deployment capability has helped numerous food service operators establish successful businesses with minimal startup delays.'
    ],
    is_active: true
  },
  {
    id: '7',
    page_type: 'solution',
    page_slug: 'security-buildings',
    title: 'Why Choose Our Security Buildings?',
    paragraphs: [
      'Security operations demand facilities that provide optimal protection, surveillance capabilities, and operational efficiency. Our modular security buildings are purpose-engineered for law enforcement, corporate security, and access control applications, featuring reinforced construction, bullet-resistant options, and integrated technology infrastructure. Whether you need guard stations for corporate campuses, checkpoint buildings for government facilities, or command centers for large-scale security operations, our buildings deliver the specialized features that security professionals require.',
      'Modern security operations rely heavily on technology integration, and our security buildings are designed to seamlessly accommodate surveillance systems, communication equipment, and access control technology. Pre-wired for multiple camera feeds, monitoring stations, and secure communication networks, these facilities provide the technological foundation necessary for effective security operations. The robust electrical systems and backup power capabilities ensure continuous operation even during emergencies or power outages.',
      'The strategic positioning and design of security facilities can significantly impact their effectiveness. Our modular security buildings feature optimal sight lines, multiple entry and exit points, and defensive positioning capabilities that enhance operational security. The reinforced construction and security-focused architectural elements provide both physical protection for personnel and psychological deterrence for potential threats, creating a comprehensive security presence that supports your overall security strategy.',
      'Rapid deployment capabilities are often critical in security applications, whether responding to emerging threats, establishing temporary security perimeters, or expanding existing security infrastructure. Our modular security buildings can be delivered and operational within days, providing immediate security enhancement without the lengthy planning and construction timelines associated with permanent facilities. This agility allows security operations to respond quickly to changing threat environments and operational requirements.'
    ],
    is_active: true
  },
  {
    id: '8',
    page_type: 'industry',
    page_slug: 'construction',
    title: 'Reliable Construction Site Solutions Built for Demanding Environments',
    paragraphs: [
      'Construction sites are dynamic, demanding environments that require robust, flexible infrastructure solutions. From project management offices to worker facilities, temporary structures on construction sites must withstand harsh conditions while providing functional, professional space for critical operations. Our modular buildings for the construction industry are engineered specifically for these challenging applications, delivering the durability, security, and functionality that construction professionals depend on to keep projects moving forward efficiently.',
      'Project success in construction often depends on effective coordination and communication among diverse teams of professionals. Our modular office buildings provide the professional environment necessary for project meetings, plan reviews, and client presentations directly on-site. With features like conference rooms, private offices, and secure document storage, these facilities enable construction teams to maintain productivity and professionalism throughout the project lifecycle, regardless of the site\'s remote location or challenging conditions.',
      'Worker safety and comfort are paramount concerns in construction, and our modular facilities support these priorities through thoughtful design and robust construction. From break rooms and locker facilities to training centers and safety equipment storage, our buildings provide essential support infrastructure that helps construction companies maintain high safety standards while supporting worker productivity and morale. The quick deployment capability also means that essential facilities can be operational immediately, supporting project startup efficiency.'
    ],
    is_active: true
  }
]

// Helper functions
export const getSEOContent = (pageType: 'solution' | 'industry', pageSlug: string): SEOContentData | undefined => {
  return seoContentData.find(content => 
    content.page_type === pageType && 
    content.page_slug === pageSlug && 
    content.is_active
  )
}

export const getSEOContentByType = (pageType: 'solution' | 'industry'): SEOContentData[] => {
  return seoContentData.filter(content => 
    content.page_type === pageType && 
    content.is_active
  )
}
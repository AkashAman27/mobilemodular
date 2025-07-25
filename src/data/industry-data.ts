// Shared industry data that can be updated by CMS
export const industryData = {
  education: {
    industry: {
      slug: 'education',
      name: 'Education',
      subtitle: 'Industry Solutions',
      description: 'Flexible modular building solutions for schools, universities, and educational institutions. From portable classrooms to administrative offices, we support learning environments of all sizes.',
      image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
      case_studies_count: 3,
      meta_title: 'Education Industry Solutions - Schools & Universities | Modular Building Solutions',
      meta_description: 'Modular building solutions for schools and universities. Portable classrooms, administrative offices, and specialized educational facilities.'
    },
    solutions: [
      {
        title: 'Portable Classrooms',
        description: 'Modern learning environments with technology integration and optimal acoustics.',
        icon_name: 'BookOpen',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
        features: ['Smart board ready', 'Energy efficient HVAC', 'ADA compliant', 'Sound insulation'],
        sort_order: 0
      },
      {
        title: 'Administrative Offices',
        description: 'Professional office spaces for school administration, counseling, and meetings.',
        icon_name: 'Calculator',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        features: ['Climate controlled', 'Professional finishes', 'Flexible layouts', 'Security features'],
        sort_order: 1
      },
      {
        title: 'Specialized Labs',
        description: 'Science labs, computer labs, and specialized learning environments.',
        icon_name: 'Beaker',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        features: ['Lab-grade utilities', 'Ventilation systems', 'Technology infrastructure', 'Safety compliant'],
        sort_order: 2
      }
    ],
    benefits: [
      {
        title: 'Quick Deployment',
        description: 'Minimal disruption to the school year with fast installation and setup.',
        icon_name: 'Clock',
        sort_order: 0
      },
      {
        title: 'Capacity Solutions',
        description: 'Handle enrollment growth or provide space during renovations.',
        icon_name: 'Users',
        sort_order: 1
      },
      {
        title: 'Cost Effective',
        description: 'More affordable than permanent construction with flexible terms.',
        icon_name: 'Building2',
        sort_order: 2
      },
      {
        title: 'Education Focused',
        description: 'Designed specifically for educational environments and requirements.',
        icon_name: 'GraduationCap',
        sort_order: 3
      }
    ],
    caseStudies: [
      {
        title: 'Riverside Elementary Expansion',
        description: 'Quick classroom addition during peak enrollment period, providing seamless educational continuity.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
        results: ['6 additional classrooms deployed in 2 weeks', '150 additional students accommodated', 'Zero disruption to existing classes', 'Permanent feel with temporary flexibility'],
        sort_order: 0
      },
      {
        title: 'Central High School Renovation',
        description: 'Temporary facilities during major school renovation project, maintaining full educational services.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/classroom_standard_standard_modular_classroom_inte.webp',
        results: ['12 month renovation completed on schedule', 'All 800 students remained on campus', 'Full curriculum maintained', 'Modern facilities ready for return'],
        sort_order: 1
      },
      {
        title: 'Metro High School Offices',
        description: 'Administrative offices during main building renovation project.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        results: ['Professional work environment', 'Secure document storage', 'Meeting room facilities'],
        sort_order: 2
      }
    ],
    statistics: [
      {
        label: 'Schools Served',
        value: '500+',
        description: 'Educational institutions across the country',
        sort_order: 0
      },
      {
        label: 'Classrooms Delivered',
        value: '15K+',
        description: 'Modular classrooms delivered nationwide',
        sort_order: 1
      },
      {
        label: 'Customer Satisfaction',
        value: '98%',
        description: 'Client satisfaction rating',
        sort_order: 2
      },
      {
        label: 'Emergency Response',
        value: '24hr',
        description: 'Emergency deployment capability',
        sort_order: 3
      }
    ]
  },
  construction: {
    industry: {
      slug: 'construction',
      name: 'Construction',
      subtitle: 'Industry Solutions',
      description: 'Durable modular buildings designed for construction sites, project management, and temporary facilities. Built to withstand harsh conditions while providing professional work environments.',
      image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp',
      case_studies_count: 3,
      meta_title: 'Construction Industry Solutions - Job Site Offices | Modular Building Solutions',
      meta_description: 'Professional modular buildings for construction sites. Job site offices, equipment storage, and worker facilities designed for durability and functionality.'
    },
    solutions: [
      {
        title: 'Job Site Offices',
        description: 'Professional work environments for project management and coordination.',
        icon_name: 'Building2',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp',
        features: ['Durable construction', 'Climate controlled', 'Communication ready', 'Secure storage'],
        sort_order: 0
      },
      {
        title: 'Equipment Storage',
        description: 'Secure storage solutions for tools, equipment, and materials.',
        icon_name: 'Shield',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        features: ['Weather resistant', 'Multiple lock options', 'Easy access', 'Ventilation systems'],
        sort_order: 1
      },
      {
        title: 'Worker Facilities',
        description: 'Break rooms, changing areas, and worker comfort facilities.',
        icon_name: 'Users',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        features: ['OSHA compliant', 'Heating and cooling', 'Restroom facilities', 'Break area setup'],
        sort_order: 2
      }
    ],
    benefits: [
      {
        title: 'Rapid Deployment',
        description: 'Quick setup to keep projects on schedule and within budget.',
        icon_name: 'Clock',
        sort_order: 0
      },
      {
        title: 'Weather Resistant',
        description: 'Built to withstand harsh job site conditions and weather.',
        icon_name: 'Shield',
        sort_order: 1
      },
      {
        title: 'Professional Environment',
        description: 'Maintain professional standards for meetings and operations.',
        icon_name: 'Building2',
        sort_order: 2
      },
      {
        title: 'Cost Savings',
        description: 'More affordable than permanent structures with flexible rental terms.',
        icon_name: 'Users',
        sort_order: 3
      }
    ],
    caseStudies: [
      {
        title: 'Downtown Office Complex',
        description: 'Project management facilities for major commercial construction project.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp',
        results: ['24-month project completed on time', 'Professional client meeting space', 'Secure document storage', 'Weather-resistant operations'],
        sort_order: 0
      },
      {
        title: 'Highway Infrastructure Project',
        description: 'Mobile offices for state highway construction and maintenance.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_construction_modular_office_trailer_on_co.webp',
        results: ['Multiple site relocations', 'Continuous operations maintained', 'All safety standards met', 'Equipment storage secured'],
        sort_order: 1
      },
      {
        title: 'Residential Development',
        description: 'Sales offices and worker facilities for large residential development.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        results: ['Professional sales environment', 'Worker comfort facilities', 'Project management center', 'Equipment storage solutions'],
        sort_order: 2
      }
    ],
    statistics: [
      {
        label: 'Projects Supported',
        value: '1,200+',
        description: 'Construction projects across the nation',
        sort_order: 0
      },
      {
        label: 'Weather Uptime',
        value: '99.8%',
        description: 'Operational despite harsh conditions',
        sort_order: 1
      },
      {
        label: 'Safety Record',
        value: '100%',
        description: 'OSHA compliance rating',
        sort_order: 2
      },
      {
        label: 'Setup Time',
        value: '4hrs',
        description: 'Average deployment time',
        sort_order: 3
      }
    ]
  },
  healthcare: {
    industry: {
      slug: 'healthcare',
      name: 'Healthcare',
      subtitle: 'Industry Solutions',
      description: 'Medical-grade modular facilities for healthcare providers, emergency medical services, and temporary health facilities. Built to meet stringent medical industry standards.',
      image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp',
      case_studies_count: 3,
      meta_title: 'Healthcare Industry Solutions - Medical Facilities | Modular Building Solutions',
      meta_description: 'Medical-grade modular buildings for healthcare. Emergency clinics, medical offices, and testing facilities that meet all healthcare industry standards.'
    },
    solutions: [
      {
        title: 'Medical Offices',
        description: 'Professional medical environments for patient care and consultations.',
        icon_name: 'Stethoscope',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp',
        features: ['Medical grade flooring', 'HVAC filtration', 'ADA compliant', 'Privacy features'],
        sort_order: 0
      },
      {
        title: 'Emergency Clinics',
        description: 'Rapid deployment medical facilities for emergency and disaster response.',
        icon_name: 'AlertTriangle',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_healthcare_modular_medical_building_at_ho.webp',
        features: ['Emergency power', 'Medical equipment ready', 'Isolation capabilities', 'Quick setup'],
        sort_order: 1
      },
      {
        title: 'Testing Facilities',
        description: 'Specialized spaces for medical testing and diagnostic procedures.',
        icon_name: 'Shield',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp',
        features: ['Controlled environment', 'Privacy compliant', 'Equipment integration', 'Safety protocols'],
        sort_order: 2
      }
    ],
    benefits: [
      {
        title: 'Medical Grade Standards',
        description: 'All facilities meet medical industry standards and regulations.',
        icon_name: 'Clock',
        sort_order: 0
      },
      {
        title: 'Rapid Deployment',
        description: 'Quick setup for emergency medical needs and capacity expansion.',
        icon_name: 'Users',
        sort_order: 1
      },
      {
        title: 'Infection Control',
        description: 'Designed with proper ventilation and sanitation capabilities.',
        icon_name: 'Shield',
        sort_order: 2
      },
      {
        title: 'Equipment Ready',
        description: 'Infrastructure ready for medical equipment installation.',
        icon_name: 'Building2',
        sort_order: 3
      }
    ],
    caseStudies: [
      {
        title: 'Regional Hospital Expansion',
        description: 'Emergency department overflow during renovation project.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp',
        results: ['24/7 emergency services maintained', 'Full medical equipment integration', 'Patient privacy compliance', 'Infection control protocols met'],
        sort_order: 0
      },
      {
        title: 'Rural Health Clinic',
        description: 'Temporary medical services for underserved rural community.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_healthcare_modular_medical_building_at_ho.webp',
        results: ['500+ patients served monthly', 'Full primary care services', 'Pharmacy integration', 'Telemedicine capabilities'],
        sort_order: 1
      },
      {
        title: 'COVID-19 Testing Center',
        description: 'Rapid deployment testing facility during pandemic response.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp',
        results: ['2-day deployment', '1,000+ tests daily capacity', 'Drive-through configuration', 'CDC compliance achieved'],
        sort_order: 2
      }
    ],
    statistics: [
      {
        label: 'Medical Facilities',
        value: '350+',
        description: 'Healthcare facilities nationwide',
        sort_order: 0
      },
      {
        label: 'Patients Served',
        value: '2M+',
        description: 'Patients treated in our facilities',
        sort_order: 1
      },
      {
        label: 'Compliance Rate',
        value: '100%',
        description: 'Medical standards compliance',
        sort_order: 2
      },
      {
        label: 'Emergency Response',
        value: '12hr',
        description: 'Emergency medical deployment',
        sort_order: 3
      }
    ]
  },
  government: {
    industry: {
      slug: 'government',
      name: 'Government',
      subtitle: 'Industry Solutions',
      description: 'Secure, compliant modular buildings for government agencies, public services, and administrative functions. Meeting security requirements and accessibility standards.',
      image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp',
      case_studies_count: 3,
      meta_title: 'Government Industry Solutions - Public Service Buildings | Modular Building Solutions',
      meta_description: 'Secure modular buildings for government agencies. Administrative offices, security checkpoints, and public service centers with full compliance.'
    },
    solutions: [
      {
        title: 'Administrative Offices',
        description: 'Professional government office spaces for public service delivery.',
        icon_name: 'Building',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp',
        features: ['Security compliant', 'ADA accessible', 'Professional finishes', 'Climate controlled'],
        sort_order: 0
      },
      {
        title: 'Security Checkpoints',
        description: 'Secure screening and checkpoint facilities for government facilities.',
        icon_name: 'Shield',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        features: ['Bullet resistant options', 'Communication systems', 'Surveillance ready', 'Access control'],
        sort_order: 1
      },
      {
        title: 'Public Service Centers',
        description: 'Citizen service centers for permits, licensing, and public interactions.',
        icon_name: 'Users',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp',
        features: ['Public friendly design', 'Waiting areas', 'Service windows', 'Document processing'],
        sort_order: 2
      }
    ],
    benefits: [
      {
        title: 'Security Compliant',
        description: 'Meets government security requirements and protocols.',
        icon_name: 'Shield',
        sort_order: 0
      },
      {
        title: 'Public Access Ready',
        description: 'ADA compliant with proper public access features.',
        icon_name: 'Users',
        sort_order: 1
      },
      {
        title: 'Professional Environment',
        description: 'Maintains government standards for public service.',
        icon_name: 'Building2',
        sort_order: 2
      },
      {
        title: 'Scalable Solutions',
        description: 'Flexible capacity to meet changing government needs.',
        icon_name: 'Clock',
        sort_order: 3
      }
    ],
    caseStudies: [
      {
        title: 'City Hall Renovation',
        description: 'Temporary administrative offices during major renovation project.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp',
        results: ['Uninterrupted public services', 'Security compliance maintained', 'ADA accessibility achieved', 'Professional government image'],
        sort_order: 0
      },
      {
        title: 'Border Security Checkpoint',
        description: 'Enhanced security screening facility at border crossing.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        results: ['Enhanced security protocols', 'Increased processing capacity', 'Weather-resistant operations', 'Full communication systems'],
        sort_order: 1
      },
      {
        title: 'DMV Services Center',
        description: 'Additional capacity for driver licensing and vehicle registration.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_government_government_modular_office_buil.webp',
        results: ['Reduced wait times', 'Improved customer service', 'Full system integration', 'Accessible design features'],
        sort_order: 2
      }
    ],
    statistics: [
      {
        label: 'Agencies Served',
        value: '200+',
        description: 'Government agencies nationwide',
        sort_order: 0
      },
      {
        label: 'Citizens Served',
        value: '5M+',
        description: 'Public interactions annually',
        sort_order: 1
      },
      {
        label: 'Security Clearance',
        value: '100%',
        description: 'Security compliance rate',
        sort_order: 2
      },
      {
        label: 'Deployment Time',
        value: '48hr',
        description: 'Emergency response capability',
        sort_order: 3
      }
    ]
  },
  'retail-commercial': {
    industry: {
      slug: 'retail-commercial',
      name: 'Retail & Commercial',
      subtitle: 'Industry Solutions',
      description: 'Professional modular buildings for retail operations, temporary stores, sales offices, and commercial applications. Designed for customer-facing environments.',
      image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp',
      case_studies_count: 3,
      meta_title: 'Retail & Commercial Solutions - Pop-up Stores | Modular Building Solutions',
      meta_description: 'Professional modular buildings for retail and commercial use. Pop-up stores, sales offices, and customer service centers with commercial-grade finishes.'
    },
    solutions: [
      {
        title: 'Pop-up Stores',
        description: 'Temporary retail spaces for seasonal businesses and market testing.',
        icon_name: 'ShoppingBag',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp',
        features: ['Professional appearance', 'Customer ready', 'Flexible layouts', 'Branding ready'],
        sort_order: 0
      },
      {
        title: 'Sales Offices',
        description: 'Professional sales environments for customer consultations and presentations.',
        icon_name: 'Building2',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        features: ['Professional finishes', 'Meeting spaces', 'Display areas', 'Client comfort'],
        sort_order: 1
      },
      {
        title: 'Customer Service Centers',
        description: 'Dedicated spaces for customer support and service operations.',
        icon_name: 'Users',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp',
        features: ['Sound insulation', 'Technology ready', 'Comfortable environment', 'Professional appearance'],
        sort_order: 2
      }
    ],
    benefits: [
      {
        title: 'Quick Market Entry',
        description: 'Rapid deployment to capitalize on market opportunities.',
        icon_name: 'Clock',
        sort_order: 0
      },
      {
        title: 'Professional Appearance',
        description: 'High-quality finishes that reflect your brand standards.',
        icon_name: 'Building2',
        sort_order: 1
      },
      {
        title: 'Cost Effective',
        description: 'Lower costs than permanent retail space with flexible terms.',
        icon_name: 'Users',
        sort_order: 2
      },
      {
        title: 'Flexible Terms',
        description: 'Seasonal and short-term rental options available.',
        icon_name: 'ShoppingBag',
        sort_order: 3
      }
    ],
    caseStudies: [
      {
        title: 'Holiday Pop-up Store',
        description: 'Seasonal retail location for major holiday shopping period.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp',
        results: ['300% increase in holiday sales', 'Professional brand presentation', 'High customer traffic', 'Flexible seasonal deployment'],
        sort_order: 0
      },
      {
        title: 'Real Estate Sales Center',
        description: 'On-site sales office for new residential development.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/office_single_single_office_modular_building_inter.webp',
        results: ['85% of units sold on-site', 'Professional meeting spaces', 'Model displays integrated', 'Climate-controlled comfort'],
        sort_order: 1
      },
      {
        title: 'Auto Dealership Expansion',
        description: 'Additional sales space during dealership renovation.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_retail_modular_retail_store_in_commercial.webp',
        results: ['Maintained sales operations', 'Customer service continuity', 'Professional appearance', 'Flexible floor plan'],
        sort_order: 2
      }
    ],
    statistics: [
      {
        label: 'Retail Locations',
        value: '800+',
        description: 'Retail and commercial installations',
        sort_order: 0
      },
      {
        label: 'Customer Interactions',
        value: '10M+',
        description: 'Annual customer visits',
        sort_order: 1
      },
      {
        label: 'Brand Satisfaction',
        value: '96%',
        description: 'Client brand representation rating',
        sort_order: 2
      },
      {
        label: 'Setup Time',
        value: '3 days',
        description: 'Average retail deployment',
        sort_order: 3
      }
    ]
  },
  'emergency-response': {
    industry: {
      slug: 'emergency-response',
      name: 'Emergency Response',
      subtitle: 'Industry Solutions',
      description: 'Rapid deployment emergency facilities for disaster response, emergency management, and crisis situations. Built for immediate deployment when every minute counts.',
      image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp',
      case_studies_count: 3,
      meta_title: 'Emergency Response Solutions - Disaster Relief | Modular Building Solutions',
      meta_description: 'Rapid deployment emergency facilities for disaster response. Command centers, medical triage, and emergency shelters for crisis management.'
    },
    solutions: [
      {
        title: 'Command Centers',
        description: 'Emergency management and coordination facilities for disaster response.',
        icon_name: 'AlertTriangle',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp',
        features: ['Communication systems', 'Power backup', 'Climate controlled', 'Quick deployment'],
        sort_order: 0
      },
      {
        title: 'Medical Triage',
        description: 'Emergency medical facilities for disaster and emergency response.',
        icon_name: 'Stethoscope',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp',
        features: ['Medical equipment ready', 'Isolation capabilities', 'Emergency power', 'Rapid setup'],
        sort_order: 1
      },
      {
        title: 'Emergency Shelters',
        description: 'Temporary housing and shelter facilities for displaced populations.',
        icon_name: 'Shield',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp',
        features: ['Weather resistant', 'Privacy options', 'Basic utilities', 'Mass deployment'],
        sort_order: 2
      }
    ],
    benefits: [
      {
        title: 'Instant Deployment',
        description: 'Rapid response capabilities for emergency situations.',
        icon_name: 'Clock',
        sort_order: 0
      },
      {
        title: 'Self-Contained Systems',
        description: 'Independent power, water, and communication systems.',
        icon_name: 'Shield',
        sort_order: 1
      },
      {
        title: 'Disaster Resistant',
        description: 'Built to withstand extreme weather and conditions.',
        icon_name: 'Building2',
        sort_order: 2
      },
      {
        title: 'Multi-Purpose Use',
        description: 'Flexible spaces that can serve multiple emergency functions.',
        icon_name: 'Users',
        sort_order: 3
      }
    ],
    caseStudies: [
      {
        title: 'Hurricane Response Center',
        description: 'Emergency command center deployed for major hurricane response.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp',
        results: ['24-hour operational readiness', '500+ rescues coordinated', 'Multi-agency coordination', 'Communication hub established'],
        sort_order: 0
      },
      {
        title: 'Wildfire Medical Station',
        description: 'Emergency medical triage for wildfire evacuation center.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/healthcare_exam_medical_examination_room_interior.webp',
        results: ['2,000+ evacuees treated', 'Smoke inhalation treatment', '6-hour deployment time', 'Critical care coordination'],
        sort_order: 1
      },
      {
        title: 'Flood Emergency Shelters',
        description: 'Temporary housing for flood-displaced families.',
        image_url: 'https://ixyniofgkhhzidivmtrz.supabase.co/storage/v1/object/public/images/generated/industry_emergency_emergency_response_modular_comm.webp',
        results: ['150 families housed', '3-month temporary housing', 'Privacy and dignity maintained', 'Community services integrated'],
        sort_order: 2
      }
    ],
    statistics: [
      {
        label: 'Emergency Deployments',
        value: '85+',
        description: 'Disaster response deployments',
        sort_order: 0
      },
      {
        label: 'Lives Impacted',
        value: '50K+',
        description: 'People assisted in emergencies',
        sort_order: 1
      },
      {
        label: 'Response Time',
        value: '6hr',
        description: 'Average emergency deployment',
        sort_order: 2
      },
      {
        label: 'Reliability',
        value: '100%',
        description: 'Emergency readiness rate',
        sort_order: 3
      }
    ]
  }
}

// Function to update industry data (simulates database save)
export function updateIndustryData(slug: string, newData: any) {
  if (industryData[slug as keyof typeof industryData]) {
    Object.assign(industryData[slug as keyof typeof industryData], newData)
    
    // Simulate persistence by storing in localStorage
    if (typeof window !== 'undefined') {
      const existingData = JSON.parse(localStorage.getItem('industryData') || '{}')
      existingData[slug] = industryData[slug as keyof typeof industryData]
      localStorage.setItem('industryData', JSON.stringify(existingData))
    }
    
    return true
  }
  return false
}

// Function to load industry data with localStorage overrides
export function getIndustryData(slug: string) {
  if (typeof window !== 'undefined') {
    const savedData = JSON.parse(localStorage.getItem('industryData') || '{}')
    if (savedData[slug]) {
      return savedData[slug]
    }
  }
  
  return industryData[slug as keyof typeof industryData] || null
}
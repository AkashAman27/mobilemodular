export interface PageFAQData {
  pageSlug: string
  faqs: {
    question: string
    answer: string
    category: string
    tags: string[]
    is_featured: boolean
    display_order: number
  }[]
}

export const pageSpecificFAQs: PageFAQData[] = [
  {
    pageSlug: 'home',
    faqs: [
      {
        question: 'What types of modular buildings do you offer?',
        answer: 'We offer a comprehensive range of modular buildings including office buildings, portable classrooms, healthcare facilities, retail spaces, and custom solutions. Each building is designed for durability, functionality, and can be customized to meet your specific needs.',
        category: 'General',
        tags: ['types', 'buildings', 'solutions'],
        is_featured: true,
        display_order: 1
      },
      {
        question: 'How quickly can a modular building be installed?',
        answer: 'Installation timelines vary based on size and complexity, but most modular buildings can be installed within 2-8 weeks from approval. This is significantly faster than traditional construction, which can take 6-18 months.',
        category: 'General',
        tags: ['installation', 'timeline', 'speed'],
        is_featured: true,
        display_order: 2
      },
      {
        question: 'Are modular buildings as durable as traditional construction?',
        answer: 'Yes, our modular buildings are built to the same building codes and standards as traditional construction. They are designed to withstand harsh weather conditions and can last for decades with proper maintenance.',
        category: 'General',
        tags: ['durability', 'quality', 'standards'],
        is_featured: true,
        display_order: 3
      },
      {
        question: 'Do you provide financing options?',
        answer: 'Yes, we offer various financing options including lease-to-own, rental agreements, and purchase financing. Our team can work with you to find the best solution for your budget and timeline.',
        category: 'General',
        tags: ['financing', 'payment', 'budget'],
        is_featured: false,
        display_order: 4
      },
      {
        question: 'What areas do you serve?',
        answer: 'We serve customers across multiple states with our modular building solutions. Contact us to confirm availability in your specific location and discuss delivery options.',
        category: 'Locations',
        tags: ['service area', 'locations', 'delivery'],
        is_featured: false,
        display_order: 5
      }
    ]
  },
  {
    pageSlug: 'office-buildings',
    faqs: [
      {
        question: 'What sizes of modular office buildings are available?',
        answer: 'Our modular office buildings range from compact 240 sq ft units perfect for single offices to expansive multi-section buildings exceeding 10,000 sq ft. Popular sizes include 12x20, 24x40, and 24x60 configurations, with the ability to connect multiple units.',
        category: 'Solutions',
        tags: ['office', 'sizes', 'configurations'],
        is_featured: true,
        display_order: 1
      },
      {
        question: 'Can office buildings be customized with specific layouts?',
        answer: 'Absolutely! We offer extensive customization options including private offices, open workspaces, conference rooms, reception areas, break rooms, and restrooms. Our design team works with you to create the perfect layout for your business needs.',
        category: 'Solutions',
        tags: ['customization', 'layout', 'design'],
        is_featured: true,
        display_order: 2
      },
      {
        question: 'What technology infrastructure is included?',
        answer: 'Our office buildings come pre-wired for modern technology needs including electrical outlets, data/network cabling, phone lines, and high-speed internet connectivity. We can also accommodate specialized technology requirements.',
        category: 'Solutions',
        tags: ['technology', 'infrastructure', 'connectivity'],
        is_featured: true,
        display_order: 3
      },
      {
        question: 'Are the office buildings climate controlled?',
        answer: 'Yes, all our office buildings include efficient HVAC systems with both heating and cooling capabilities. The systems are designed for energy efficiency and can maintain comfortable temperatures year-round.',
        category: 'Solutions',
        tags: ['hvac', 'climate control', 'comfort'],
        is_featured: false,
        display_order: 4
      },
      {
        question: 'What about parking and site preparation?',
        answer: 'We can advise on optimal site preparation and parking arrangements. Most office installations require a level, compacted surface. We work with local contractors for site prep and can help design efficient parking layouts.',
        category: 'Solutions',
        tags: ['parking', 'site prep', 'installation'],
        is_featured: false,
        display_order: 5
      },
      {
        question: 'Do office buildings meet ADA compliance requirements?',
        answer: 'Yes, our office buildings can be designed to meet all ADA compliance requirements including ramps, accessible doorways, restrooms, and workspace layouts. We ensure full compliance with accessibility standards.',
        category: 'Solutions',
        tags: ['ADA', 'accessibility', 'compliance'],
        is_featured: false,
        display_order: 6
      }
    ]
  },
  {
    pageSlug: 'portable-classrooms',
    faqs: [
      {
        question: 'What makes a classroom "portable" vs permanent?',
        answer: 'Portable classrooms are designed for easy relocation and temporary installation. They feature skid-mounted construction, quick-connect utilities, and can be moved between locations as enrollment needs change, making them ideal for growing school districts.',
        category: 'Solutions',
        tags: ['portable', 'temporary', 'relocation'],
        is_featured: true,
        display_order: 1
      },
      {
        question: 'How many students can a portable classroom accommodate?',
        answer: 'Standard portable classrooms accommodate 20-30 students comfortably. We offer various sizes from compact 24x32 units to larger 24x40 and 28x60 configurations that can hold up to 35-40 students depending on the grade level and setup.',
        category: 'Solutions',
        tags: ['capacity', 'students', 'classroom size'],
        is_featured: true,
        display_order: 2
      },
      {
        question: 'Are portable classrooms safe and up to education standards?',
        answer: 'Absolutely. Our portable classrooms meet or exceed all state and federal education facility standards including fire safety codes, structural requirements, and educational space guidelines. They undergo rigorous safety inspections.',
        category: 'Solutions',
        tags: ['safety', 'standards', 'education'],
        is_featured: true,
        display_order: 3
      },
      {
        question: 'What technology features are included?',
        answer: 'Modern portable classrooms include interactive whiteboards, high-speed internet connectivity, abundant electrical outlets, built-in projection systems, and complete data/network infrastructure to support 21st-century learning.',
        category: 'Solutions',
        tags: ['technology', 'education', 'modern'],
        is_featured: false,
        display_order: 4
      },
      {
        question: 'How quickly can portable classrooms be installed?',
        answer: 'Most portable classroom installations can be completed within 1-2 weeks from site preparation to move-in ready. This rapid deployment helps schools address sudden enrollment increases or facility emergencies quickly.',
        category: 'Solutions',
        tags: ['installation', 'quick', 'deployment'],
        is_featured: false,
        display_order: 5
      },
      {
        question: 'Can classrooms be connected together?',
        answer: 'Yes, multiple portable classrooms can be connected with covered walkways or breezeways to create larger educational complexes. This allows for flexible campus expansion while maintaining weather protection between units.',
        category: 'Solutions',
        tags: ['connection', 'complex', 'expansion'],
        is_featured: false,
        display_order: 6
      }
    ]
  },
  {
    pageSlug: 'pricing',
    faqs: [
      {
        question: 'How much does a modular building cost?',
        answer: 'Modular building costs vary widely based on size, features, and customization. Basic units start around $15,000-$25,000, while fully customized buildings can range from $50,000-$200,000+. We provide detailed quotes based on your specific requirements.',
        category: 'General',
        tags: ['cost', 'pricing', 'budget'],
        is_featured: true,
        display_order: 1
      },
      {
        question: 'What factors affect the price of a modular building?',
        answer: 'Key pricing factors include building size, customization level, interior finishes, HVAC systems, electrical requirements, plumbing complexity, site preparation needs, delivery distance, and any special features or compliance requirements.',
        category: 'General',
        tags: ['pricing factors', 'customization', 'features'],
        is_featured: true,
        display_order: 2
      },
      {
        question: 'Are there additional costs beyond the building price?',
        answer: 'Additional costs may include site preparation, utility connections, permits, delivery, installation, and ongoing maintenance. We provide comprehensive quotes that outline all potential costs upfront to avoid surprises.',
        category: 'General',
        tags: ['additional costs', 'hidden fees', 'total cost'],
        is_featured: true,
        display_order: 3
      },
      {
        question: 'Do you offer leasing or rental options?',
        answer: 'Yes, we offer flexible financing including short-term rentals, long-term leases, lease-to-own programs, and traditional purchase financing. Monthly payments can start as low as $300-$800 depending on the building and terms.',
        category: 'General',
        tags: ['leasing', 'rental', 'financing'],
        is_featured: false,
        display_order: 4
      },
      {
        question: 'What is included in the base price?',
        answer: 'Base prices typically include the structural building, basic electrical and HVAC systems, standard flooring, interior walls, and basic exterior finishes. Customizations, site work, and delivery are usually additional.',
        category: 'General',
        tags: ['base price', 'included', 'standard features'],
        is_featured: false,
        display_order: 5
      },
      {
        question: 'How do modular building costs compare to traditional construction?',
        answer: 'Modular buildings typically cost 10-20% less than traditional construction and can be completed 50-80% faster, resulting in significant savings on both construction costs and lost productivity time.',
        category: 'General',
        tags: ['comparison', 'traditional', 'savings'],
        is_featured: false,
        display_order: 6
      }
    ]
  },
  {
    pageSlug: 'installation',
    faqs: [
      {
        question: 'What site preparation is required?',
        answer: 'Sites need to be level, well-drained, and accessible for delivery trucks. Basic requirements include a compacted gravel pad or concrete foundation, utility access points, and clearance for crane placement during installation.',
        category: 'Resources',
        tags: ['site preparation', 'foundation', 'requirements'],
        is_featured: true,
        display_order: 1
      },
      {
        question: 'Who handles the installation process?',
        answer: 'Our certified installation crews handle the entire process including building placement, utility connections, final inspections, and walkthrough. We coordinate all aspects to ensure a smooth, professional installation.',
        category: 'Resources',
        tags: ['installation crew', 'professional', 'coordination'],
        is_featured: true,
        display_order: 2
      },
      {
        question: 'How long does installation typically take?',
        answer: 'Most installations are completed within 1-3 days for single units. Larger or multi-unit installations may take 1-2 weeks. Weather conditions and site complexity can affect timelines, but we always provide realistic schedules.',
        category: 'Resources',
        tags: ['timeline', 'installation time', 'schedule'],
        is_featured: true,
        display_order: 3
      },
      {
        question: 'What utilities need to be connected?',
        answer: 'Typical utility connections include electrical service, water supply, sewer/septic, natural gas (if required), telephone/internet, and sometimes propane or other specialized utilities. We coordinate with local utility companies.',
        category: 'Resources',
        tags: ['utilities', 'connections', 'services'],
        is_featured: false,
        display_order: 4
      },
      {
        question: 'Are permits required for installation?',
        answer: 'Yes, most installations require building permits and inspections. We can assist with the permit application process and ensure all local building codes and zoning requirements are met before installation.',
        category: 'Resources',
        tags: ['permits', 'building codes', 'inspections'],
        is_featured: false,
        display_order: 5
      },
      {
        question: 'What happens if there are installation problems?',
        answer: 'Our experienced teams are prepared for various installation challenges. We carry comprehensive insurance and warranty coverage, and any issues are resolved quickly at no additional cost to you.',
        category: 'Resources',
        tags: ['problems', 'warranty', 'insurance'],
        is_featured: false,
        display_order: 6
      }
    ]
  },
  {
    pageSlug: 'locations',
    faqs: [
      {
        question: 'Which states do you serve?',
        answer: 'We currently serve customers across multiple states in the Southeast, Midwest, and Southwest regions. Contact us to confirm service availability in your specific location and discuss delivery options and timelines.',
        category: 'Locations',
        tags: ['states', 'service area', 'regions'],
        is_featured: true,
        display_order: 1
      },
      {
        question: 'How far will you deliver?',
        answer: 'We typically deliver within a 500-mile radius of our manufacturing facilities. Longer distances may be possible with additional delivery charges. We have strategically located facilities to serve customers efficiently.',
        category: 'Locations',
        tags: ['delivery distance', 'radius', 'shipping'],
        is_featured: true,
        display_order: 2
      },
      {
        question: 'Are there location-specific building codes to consider?',
        answer: 'Yes, building codes vary by state and locality. Our team is familiar with regional requirements including wind load, snow load, seismic, and other environmental factors that affect building design in different areas.',
        category: 'Locations',
        tags: ['building codes', 'local requirements', 'compliance'],
        is_featured: true,
        display_order: 3
      },
      {
        question: 'Do you have local representatives in my area?',
        answer: 'We have sales representatives and service technicians covering most of our service territories. Contact us to connect with your local representative who understands regional needs and requirements.',
        category: 'Locations',
        tags: ['representatives', 'local service', 'support'],
        is_featured: false,
        display_order: 4
      },
      {
        question: 'What about delivery to rural or remote locations?',
        answer: 'We regularly deliver to rural and remote locations. Special considerations may include road access for large trucks, crane requirements, and utility availability. We assess each site individually.',
        category: 'Locations',
        tags: ['rural', 'remote', 'access'],
        is_featured: false,
        display_order: 5
      },
      {
        question: 'Can buildings be moved between locations?',
        answer: 'Yes, many of our buildings are designed for relocation. Portable units can be moved relatively easily, while permanent installations require more extensive preparation but can still be relocated when necessary.',
        category: 'Locations',
        tags: ['relocation', 'moving', 'portable'],
        is_featured: false,
        display_order: 6
      }
    ]
  }
]
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PageLayout } from '@/components/layout/PageLayout'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, MapPin, Users, CheckCircle, Phone, Download, Share } from 'lucide-react'

// Case study data with full content
const caseStudies = {
  'riverside-school-classroom-expansion': {
    title: 'Riverside School District Classroom Expansion',
    industry: 'Education',
    location: 'Riverside, CA',
    date: '2024',
    duration: '18 months',
    projectValue: '$2.8M',
    challenge: 'Needed 12 additional classrooms for growing enrollment while main building was under construction.',
    solution: 'Deployed 12 portable classrooms with full ADA compliance and technology integration.',
    results: ['Zero disruption to school year', '300 students accommodated', '18-month successful operation', 'Saved $2M vs permanent construction'],
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop'
    ],
    fullContent: {
      overview: `Riverside School District faced a critical challenge when their main building renovation project coincided with unexpectedly high enrollment growth. With 300 additional students needing classroom space and construction preventing the use of existing facilities, the district needed an immediate, reliable solution that wouldn't compromise educational quality.`,
      
      detailedChallenge: `The district's main challenge was multi-faceted:
      
      • **Timeline Pressure**: Students needed classroom space within 30 days of the school year start
      • **Quality Standards**: Facilities needed to meet all educational standards and ADA compliance
      • **Technology Integration**: Modern learning required full IT infrastructure and multimedia capabilities
      • **Safety Requirements**: All buildings needed to meet strict safety protocols for educational facilities
      • **Budget Constraints**: Solution needed to be cost-effective compared to permanent construction delays`,
      
      solutionDetails: `Our comprehensive solution included:
      
      **Phase 1: Rapid Assessment & Planning (Week 1)**
      • Site evaluation and utility assessment
      • Customized floor plans for educational use
      • Technology infrastructure planning
      • Permit acquisition and compliance verification
      
      **Phase 2: Manufacturing & Preparation (Weeks 2-3)**
      • Custom classroom modules with 30' x 40' configurations
      • Built-in smart boards and projection systems
      • Climate control systems optimized for year-round use
      • ADA-compliant entrances and accessibility features
      
      **Phase 3: Installation & Setup (Week 4)**
      • Site preparation and foundation work
      • Module placement and connection
      • Utility hookups (electrical, HVAC, data)
      • Final inspections and safety certifications`,
      
      resultsDetail: `The project exceeded expectations in multiple areas:
      
      **Operational Success:**
      • 100% on-time delivery for school year start
      • Zero learning disruption during installation
      • Full technology integration completed within budget
      • Perfect safety record throughout 18-month operation
      
      **Financial Impact:**
      • Total project cost: $2.8M
      • Savings vs. permanent construction: $2M
      • Energy efficiency 25% better than district standards
      • Maintenance costs 40% lower than anticipated
      
      **Educational Outcomes:**
      • Student test scores maintained pre-expansion levels
      • Teacher satisfaction surveys showed 95% approval
      • Parent feedback highlighted modern facility quality
      • District able to accept additional enrollment growth`,
      
      testimonial: {
        quote: "The modular classrooms exceeded our expectations in every way. Students and teachers love the modern facilities, and we couldn't be happier with the quality and speed of installation.",
        author: "Dr. Sarah Martinez",
        role: "Superintendent, Riverside School District"
      },
      
      specifications: [
        { label: 'Total Square Footage', value: '14,400 sq ft' },
        { label: 'Number of Classrooms', value: '12 units' },
        { label: 'Student Capacity', value: '300 students' },
        { label: 'Installation Time', value: '4 weeks' },
        { label: 'Energy Rating', value: 'ENERGY STAR certified' },
        { label: 'Technology Features', value: 'Smart boards, WiFi 6, multimedia' }
      ]
    }
  },
  
  'metropolitan-hospital-emergency-expansion': {
    title: 'Metropolitan Hospital Emergency Expansion',
    industry: 'Healthcare',
    location: 'Dallas, TX',
    date: '2024',
    duration: '12 months',
    projectValue: '$4.2M',
    challenge: 'Urgent need for additional patient care facilities during hospital renovation.',
    solution: 'Rapid deployment of medical-grade modular units with specialized HVAC and power systems.',
    results: ['24-hour installation', '50 additional patient beds', 'Full medical equipment integration', 'Maintained patient care quality'],
    image: 'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop'
    ],
    fullContent: {
      overview: `Metropolitan Hospital faced an unprecedented challenge when their emergency department renovation coincided with a seasonal surge in patient admissions. The hospital needed immediate additional capacity without compromising patient care quality or safety standards.`,
      
      detailedChallenge: `Critical healthcare requirements included:
      
      • **Patient Safety**: All facilities must meet hospital-grade safety and sanitation standards
      • **Medical Equipment Compatibility**: Support for advanced diagnostic and treatment equipment
      • **Infection Control**: Specialized HVAC systems with negative pressure capabilities
      • **Emergency Access**: Direct connectivity to existing emergency department
      • **Regulatory Compliance**: Full compliance with Joint Commission and state health department requirements`,
      
      solutionDetails: `Our medical-grade solution featured:
      
      **Specialized Medical Modules:**
      • 6 patient care units with private bathrooms
      • 2 treatment rooms with surgical lighting
      • 1 isolation unit with negative pressure
      • Central nursing station with full monitoring capabilities
      
      **Advanced Systems Integration:**
      • Medical-grade HVAC with HEPA filtration
      • Redundant power systems with emergency backup
      • Integrated nurse call and monitoring systems
      • Direct connection to hospital's existing infrastructure`,
      
      resultsDetail: `Outstanding healthcare outcomes achieved:
      
      **Patient Care Excellence:**
      • Zero patient safety incidents during operation
      • 98% patient satisfaction scores
      • Seamless integration with existing workflows
      • Maintained all quality metrics throughout expansion
      
      **Operational Efficiency:**
      • Reduced ER wait times by 35%
      • Increased patient throughput by 40%
      • Enabled continuation of renovation without service disruption
      • Generated additional revenue of $3.2M during operation period`,
      
      testimonial: {
        quote: "The modular expansion units allowed us to maintain exceptional patient care during our renovation. The quality and safety features matched our permanent facilities perfectly.",
        author: "Dr. Michael Chen",
        role: "Chief Medical Officer, Metropolitan Hospital"
      },
      
      specifications: [
        { label: 'Patient Capacity', value: '50 beds' },
        { label: 'Treatment Rooms', value: '8 fully equipped' },
        { label: 'Installation Time', value: '24 hours' },
        { label: 'Medical Grade HVAC', value: 'HEPA filtration' },
        { label: 'Power Systems', value: 'Redundant with backup' },
        { label: 'Compliance', value: 'Joint Commission approved' }
      ]
    }
  },
  
  'techcorp-startup-office-campus': {
    title: 'TechCorp Startup Office Campus',
    industry: 'Technology',
    location: 'Austin, TX',
    date: '2023',
    duration: '6 months',
    projectValue: '$1.8M',
    challenge: 'Fast-growing startup needed immediate office space for 100 employees.',
    solution: 'Modular office complex with modern amenities and flexible workspace design.',
    results: ['Immediate occupancy', '100 employees housed', 'Professional environment', '40% cost savings'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=400&h=300&fit=crop'
    ],
    fullContent: {
      overview: `TechCorp, a rapidly scaling AI startup, secured major funding and needed to triple their workforce within 90 days. Traditional office leasing couldn't meet their timeline, and they needed a flexible solution that could adapt to their uncertain growth trajectory.`,
      
      detailedChallenge: `The startup faced unique challenges:
      
      • **Speed to Market**: Needed workspace in 30 days to avoid losing key hires
      • **Scalability**: Uncertain future growth required flexible expansion options
      • **Budget Efficiency**: Startup budget required cost-effective solution
      • **Modern Standards**: Tech talent expected high-quality, modern work environment
      • **Technology Infrastructure**: Required enterprise-grade IT and networking capabilities`,
      
      solutionDetails: `Our flexible campus solution included:
      
      **Phase 1: Core Workspace (Month 1)**
      • 5 modular office units with open floor plans
      • Executive offices and conference rooms
      • Break room and collaboration spaces
      • Enterprise networking and power infrastructure
      
      **Phase 2: Expansion Ready (Months 2-6)**
      • Designed for easy addition of modules
      • Scalable IT infrastructure
      • Parking and utility expansion capabilities
      • Option to convert to permanent lease`,
      
      resultsDetail: `Exceptional business outcomes delivered:
      
      **Business Growth Support:**
      • Enabled hiring of 100 employees on schedule
      • Supported $15M funding round presentations
      • Facilitated major client meetings and demos
      • Provided platform for team expansion to 150 employees
      
      **Financial Success:**
      • Total cost 40% less than traditional office lease
      • No long-term commitments or deposits
      • Included all utilities and maintenance
      • Option value for future expansion saved estimated $500K`,
      
      testimonial: {
        quote: "The modular office solution was exactly what we needed as a growing startup. Professional, flexible, and cost-effective. It enabled our rapid scaling without the risks of a long-term lease.",
        author: "Jennifer Wu",
        role: "CEO, TechCorp"
      },
      
      specifications: [
        { label: 'Office Space', value: '8,000 sq ft' },
        { label: 'Employee Capacity', value: '100 workstations' },
        { label: 'Conference Rooms', value: '4 fully equipped' },
        { label: 'Setup Time', value: '2 weeks' },
        { label: 'Internet', value: 'Gigabit fiber' },
        { label: 'Flexibility', value: 'Expandable design' }
      ]
    }
  }
}

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({
    slug: slug,
  }))
}

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params
  const caseStudy = caseStudies[slug as keyof typeof caseStudies]

  if (!caseStudy) {
    notFound()
  }

  return (
    <PageLayout>
      {/* Header */}
      <section className="hero-gradient py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <div className="flex items-center text-blue-200 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/resources" className="hover:text-white transition-colors">Resources</Link>
              <span className="mx-2">/</span>
              <Link href="/resources/case-studies" className="hover:text-white transition-colors">Case Studies</Link>
              <span className="mx-2">/</span>
              <span className="text-white">{caseStudy.title}</span>
            </div>

            {/* Back Button */}
            <Link href="/resources/case-studies">
              <Button variant="outline" className="mb-8 border-white text-white hover:bg-white hover:text-navy-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Case Studies
              </Button>
            </Link>

            {/* Title and Meta */}
            <div className="text-white mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-blue-200">
                <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                  {caseStudy.industry}
                </span>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {caseStudy.location}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {caseStudy.date}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {caseStudy.duration}
                </div>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-6">
                {caseStudy.title}
              </h1>
              
              <p className="text-xl text-blue-100 max-w-3xl">
                {caseStudy.fullContent.overview}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <section className="py-0">
        <div className="container mx-auto px-4">
          <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl -mt-10 mb-20">
            <Image
              src={caseStudy.image}
              alt={caseStudy.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Project Overview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-12">
                {/* Challenge */}
                <div>
                  <h2 className="text-3xl font-bold text-navy-600 mb-6">The Challenge</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 whitespace-pre-line">{caseStudy.fullContent.detailedChallenge}</p>
                  </div>
                </div>

                {/* Solution */}
                <div>
                  <h2 className="text-3xl font-bold text-navy-600 mb-6">Our Solution</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 whitespace-pre-line">{caseStudy.fullContent.solutionDetails}</p>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h2 className="text-3xl font-bold text-navy-600 mb-6">Results & Impact</h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-gray-600 whitespace-pre-line">{caseStudy.fullContent.resultsDetail}</p>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gray-50 rounded-2xl p-8">
                  <blockquote className="text-xl italic text-gray-800 mb-4">
                    "{caseStudy.fullContent.testimonial.quote}"
                  </blockquote>
                  <div className="flex items-center">
                    <div>
                      <div className="font-semibold text-navy-600">{caseStudy.fullContent.testimonial.author}</div>
                      <div className="text-gray-600">{caseStudy.fullContent.testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-8">
                {/* Project Specs */}
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-navy-600 mb-4">Project Specifications</h3>
                  <div className="space-y-3">
                    {caseStudy.fullContent.specifications.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                        <span className="text-gray-600 text-sm">{spec.label}</span>
                        <span className="font-semibold text-navy-600">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Value */}
                <div className="bg-navy-600 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Project Value</h3>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{caseStudy.projectValue}</div>
                  <p className="text-blue-200 text-sm">Total project investment</p>
                </div>

                {/* Quick Results */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-navy-600">Key Results</h3>
                  {caseStudy.results.map((result, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-700">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      {result}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="space-y-3">
                  <Button className="w-full bg-navy-600 hover:bg-navy-700">
                    <Phone className="h-4 w-4 mr-2" />
                    Discuss Your Project
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-navy-600 mb-12 text-center">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudy.gallery.map((image, index) => (
                <div key={index} className="relative h-64 rounded-lg overflow-hidden">
                  <Image
                    src={image}
                    alt={`${caseStudy.title} - Image ${index + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related Case Studies */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-navy-600 mb-12">Explore More Success Stories</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/resources/case-studies">
                <Button variant="outline" size="lg">
                  View All Case Studies
                </Button>
              </Link>
              <Link href="/quote">
                <Button variant="gradient" size="lg">
                  Start Your Project
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  )
}
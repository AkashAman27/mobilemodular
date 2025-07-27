import type { Metadata } from 'next'
import { PageLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Terms & Conditions | Modular Building Solutions',
  description: 'Read the terms and conditions for using Modular Building Solutions services. Comprehensive terms governing our modular building rental and purchase agreements.',
  alternates: {
    canonical: 'https://mobilemodular.com/legal/terms'
  },
  openGraph: {
    title: 'Terms & Conditions | Modular Building Solutions',
    description: 'Read the terms and conditions for using Modular Building Solutions services.',
    url: 'https://mobilemodular.com/legal/terms',
    siteName: 'Modular Building Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Terms & Conditions | Modular Building Solutions',
    description: 'Read the terms and conditions for using Modular Building Solutions services.',
  }
}

export default function TermsConditionsPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Terms & Conditions"
        description="Terms and conditions governing the use of our services and website"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Legal', href: '/legal' },
          { label: 'Terms & Conditions', href: '/legal/terms' }
        ]}
      />
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg max-w-none">
          <div className="mb-8">
            <p className="text-gray-600 text-sm mb-4">
              Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              By accessing and using the Modular Building Solutions website and services, you accept and agree 
              to be bound by the terms and provision of this agreement. If you do not agree to abide by these 
              terms and conditions, you are not authorized to use or access this website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the materials on Modular Building Solutions' 
              website for personal, non-commercial transitory viewing only. This is the grant of a license, not a 
              transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
            </ul>
            <p className="text-gray-700 leading-relaxed">
              This license shall automatically terminate if you violate any of these restrictions and may be 
              terminated by Modular Building Solutions at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Terms</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Rental Agreements</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All modular building rentals are subject to specific rental agreements that will be provided 
              at the time of service. These agreements include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Rental duration and payment terms</li>
              <li>Delivery and pickup scheduling</li>
              <li>Maintenance and damage responsibilities</li>
              <li>Insurance requirements</li>
              <li>Permitted uses and restrictions</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Purchase Agreements</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              All modular building purchases are subject to specific purchase agreements that include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Specifications and customization details</li>
              <li>Payment schedules and financing options</li>
              <li>Delivery timelines and installation services</li>
              <li>Warranty terms and conditions</li>
              <li>Building codes and permit compliance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              The materials on Modular Building Solutions' website are provided on an 'as is' basis. 
              Modular Building Solutions makes no warranties, expressed or implied, and hereby disclaims 
              and negates all other warranties including without limitation, implied warranties or conditions 
              of merchantability, fitness for a particular purpose, or non-infringement of intellectual property 
              or other violation of rights.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Further, Modular Building Solutions does not warrant or make any representations concerning 
              the accuracy, likely results, or reliability of the use of the materials on its website or 
              otherwise relating to such materials or on any sites linked to this site.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations</h2>
            <p className="text-gray-700 leading-relaxed">
              In no event shall Modular Building Solutions or its suppliers be liable for any damages 
              (including, without limitation, damages for loss of data or profit, or due to business 
              interruption) arising out of the use or inability to use the materials on Modular Building 
              Solutions' website, even if Modular Building Solutions or an authorized representative has 
              been notified orally or in writing of the possibility of such damage. Because some jurisdictions 
              do not allow limitations on implied warranties, or limitations of liability for consequential 
              or incidental damages, these limitations may not apply to you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy of Materials</h2>
            <p className="text-gray-700 leading-relaxed">
              The materials appearing on Modular Building Solutions' website could include technical, 
              typographical, or photographic errors. Modular Building Solutions does not warrant that 
              any of the materials on its website are accurate, complete, or current. Modular Building 
              Solutions may make changes to the materials contained on its website at any time without notice. 
              However, Modular Building Solutions does not make any commitment to update the materials.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Links</h2>
            <p className="text-gray-700 leading-relaxed">
              Modular Building Solutions has not reviewed all of the sites linked to our website and is 
              not responsible for the contents of any such linked site. The inclusion of any link does 
              not imply endorsement by Modular Building Solutions of the site. Use of any such linked 
              website is at the user's own risk.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              Modular Building Solutions may revise these terms of service for its website at any time 
              without notice. By using this website, you are agreeing to be bound by the then current 
              version of these terms of service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of 
              the United States and you irrevocably submit to the exclusive jurisdiction of the courts 
              in that state or location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Terms</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Payment terms for our services include:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Quotes are valid for 30 days unless otherwise specified</li>
              <li>Payment schedules will be outlined in individual service agreements</li>
              <li>Late payment fees may apply as specified in service agreements</li>
              <li>All prices are subject to change without notice</li>
              <li>Applicable taxes will be added to all invoices</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cancellation Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our cancellation policy varies by service type:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Rental cancellations: 48-hour notice required to avoid cancellation fees</li>
              <li>Purchase cancellations: Subject to manufacturing stage and customization level</li>
              <li>Delivery cancellations: Same-day cancellation fees may apply</li>
              <li>Custom orders: May be subject to restocking fees</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about these Terms & Conditions, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-2 text-gray-700">
                <p><strong>Modular Building Solutions</strong></p>
                <p>Phone: (866) 819-9017</p>
                <p>Email: legal@modularbuilding.com</p>
                <p>Address: 275+ Locations Nationwide</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
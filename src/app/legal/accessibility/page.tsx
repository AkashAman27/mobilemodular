import type { Metadata } from 'next'
import { PageLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Accessibility Statement | Modular Building Solutions',
  description: 'Our commitment to digital accessibility. Learn about our efforts to ensure our website and services are accessible to all users, including those with disabilities.',
  alternates: {
    canonical: 'https://mobilemodular.com/legal/accessibility'
  },
  openGraph: {
    title: 'Accessibility Statement | Modular Building Solutions',
    description: 'Our commitment to digital accessibility and ensuring our services are accessible to all users.',
    url: 'https://mobilemodular.com/legal/accessibility',
    siteName: 'Modular Building Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Accessibility Statement | Modular Building Solutions',
    description: 'Our commitment to digital accessibility and ensuring our services are accessible to all users.',
  }
}

export default function AccessibilityPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Accessibility Statement"
        description="Our commitment to ensuring our website and services are accessible to everyone"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Legal', href: '/legal' },
          { label: 'Accessibility', href: '/legal/accessibility' }
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Commitment</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Modular Building Solutions is committed to ensuring digital accessibility for people with disabilities. 
              We are continually improving the user experience for everyone and applying the relevant accessibility standards 
              to ensure we provide equal access to information and functionality.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe that everyone should have access to information about our modular building solutions, 
              regardless of their abilities or the technologies they use to access our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility Standards</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. 
              These guidelines help make web content more accessible to people with disabilities, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
              <li>Visual impairments (blindness, low vision, color blindness)</li>
              <li>Hearing impairments (deafness, hearing loss)</li>
              <li>Motor impairments (inability to use a mouse, slow response time)</li>
              <li>Cognitive impairments (learning disabilities, distractibility, inability to focus)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Accessibility Features</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website includes the following accessibility features:
            </p>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Navigation and Structure</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Semantic HTML markup for proper screen reader navigation</li>
              <li>Consistent navigation and page structure throughout the site</li>
              <li>Skip links to main content for keyboard users</li>
              <li>Descriptive page titles and headings</li>
              <li>Breadcrumb navigation on all pages</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Visual Design</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>High contrast color schemes that meet WCAG guidelines</li>
              <li>Scalable text that can be increased up to 200% without loss of functionality</li>
              <li>Focus indicators for keyboard navigation</li>
              <li>Alternative text for all meaningful images</li>
              <li>Clear visual hierarchy and spacing</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Interactive Elements</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Keyboard accessible forms and interactive elements</li>
              <li>Clear form labels and error messages</li>
              <li>Logical tab order throughout the site</li>
              <li>Button and link descriptions for screen readers</li>
              <li>Accessible dropdown menus and navigation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Assistive Technologies</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our website is designed to be compatible with the following assistive technologies:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Screen readers (JAWS, NVDA, VoiceOver)</li>
              <li>Voice recognition software (Dragon NaturallySpeaking)</li>
              <li>Switch navigation devices</li>
              <li>Keyboard-only navigation</li>
              <li>Screen magnification software</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Browser and Technology Requirements</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              For the best accessibility experience, we recommend using:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Updated versions of modern browsers (Chrome, Firefox, Safari, Edge)</li>
              <li>JavaScript enabled for full functionality</li>
              <li>Current versions of screen readers and assistive technologies</li>
              <li>Browsers with CSS support for proper visual formatting</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ongoing Efforts</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We are continuously working to improve accessibility through:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Regular accessibility audits and testing</li>
              <li>Staff training on accessibility best practices</li>
              <li>User testing with people who use assistive technologies</li>
              <li>Staying updated with evolving accessibility standards</li>
              <li>Incorporating accessibility considerations in all new development</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Alternative Access Methods</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you encounter barriers while using our website, we offer alternative ways to access our services:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Phone support: (866) 819-9017</li>
              <li>Email assistance: accessibility@modularbuilding.com</li>
              <li>In-person consultations at our locations</li>
              <li>Alternative document formats upon request</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Physical Accessibility</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our modular building solutions are designed with accessibility in mind:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>ADA-compliant ramps and doorways available</li>
              <li>Accessible restroom facilities</li>
              <li>Wheelchair-accessible layouts and configurations</li>
              <li>Compliance with local accessibility building codes</li>
              <li>Custom accessibility modifications available</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Feedback and Contact</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We welcome your feedback on the accessibility of our website and services. Please let us know if you 
              encounter accessibility barriers or have suggestions for improvement:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-2 text-gray-700">
                <p><strong>Accessibility Coordinator</strong></p>
                <p>Phone: (866) 819-9017</p>
                <p>Email: accessibility@modularbuilding.com</p>
                <p>Mail: Modular Building Solutions, Accessibility Department</p>
                <p>275+ Locations Nationwide</p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Response Time</h2>
            <p className="text-gray-700 leading-relaxed">
              We aim to respond to accessibility feedback within 2 business days. For urgent accessibility needs, 
              please call our main number at (866) 819-9017 for immediate assistance.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Content</h2>
            <p className="text-gray-700 leading-relaxed">
              While we strive to ensure accessibility across our entire website, some third-party content or 
              embedded elements may not fully meet our accessibility standards. We are working with our vendors 
              to improve accessibility of all integrated content and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates and Improvements</h2>
            <p className="text-gray-700 leading-relaxed">
              This accessibility statement will be updated as we continue to improve our website's accessibility. 
              We review and update our accessibility practices regularly to ensure we are providing the best 
              possible experience for all users.
            </p>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
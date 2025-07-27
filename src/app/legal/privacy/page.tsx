import type { Metadata } from 'next'
import { PageLayout } from '@/components/layout'
import { PageHeader } from '@/components/layout'

export const metadata: Metadata = {
  title: 'Privacy Policy | Modular Building Solutions',
  description: 'Learn how Modular Building Solutions collects, uses, and protects your personal information. Comprehensive privacy policy for our modular building services.',
  alternates: {
    canonical: 'https://mobilemodular.com/legal/privacy'
  },
  openGraph: {
    title: 'Privacy Policy | Modular Building Solutions',
    description: 'Learn how Modular Building Solutions collects, uses, and protects your personal information.',
    url: 'https://mobilemodular.com/legal/privacy',
    siteName: 'Modular Building Solutions',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy | Modular Building Solutions',
    description: 'Learn how Modular Building Solutions collects, uses, and protects your personal information.',
  }
}

export default function PrivacyPolicyPage() {
  return (
    <PageLayout>
      <PageHeader
        title="Privacy Policy"
        description="Learn how we collect, use, and protect your personal information"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Legal', href: '/legal' },
          { label: 'Privacy Policy', href: '/legal/privacy' }
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Modular Building Solutions ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website or use our services.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Please read this privacy policy carefully. If you do not agree with the terms of this 
              privacy policy, please do not access the site or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Information</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              We may collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Request a quote or information about our services</li>
              <li>Contact us through our website or phone</li>
              <li>Subscribe to our newsletter or marketing communications</li>
              <li>Create an account or register for our services</li>
              <li>Participate in surveys or feedback requests</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 mb-3">Information Collected Automatically</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              When you visit our website, we may automatically collect certain information about your device, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>IP address and location data</li>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website addresses</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Providing and maintaining our services</li>
              <li>Processing and responding to your inquiries and quote requests</li>
              <li>Sending you information about our products and services</li>
              <li>Improving our website and customer experience</li>
              <li>Conducting market research and analytics</li>
              <li>Complying with legal obligations</li>
              <li>Protecting against fraud and security threats</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Service providers who assist us in operating our website and conducting business</li>
              <li>Legal requirements or to protect our rights and safety</li>
              <li>Business transfers (mergers, acquisitions, etc.)</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 leading-relaxed">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic 
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights and Choices</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              You have certain rights regarding your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Access and review your personal information</li>
              <li>Request corrections to inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Restrict processing of your information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 leading-relaxed">
              Our website uses cookies and similar tracking technologies to enhance your browsing experience, 
              analyze site traffic, and understand where our visitors are coming from. You can control cookie 
              settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              Our services are not directed to children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you become aware that a child has provided us 
              with personal information, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
              the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="space-y-2 text-gray-700">
                <p><strong>Modular Building Solutions</strong></p>
                <p>Phone: (866) 819-9017</p>
                <p>Email: privacy@modularbuilding.com</p>
                <p>Address: 275+ Locations Nationwide</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  )
}
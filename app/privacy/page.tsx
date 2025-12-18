import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/" className="text-2xl font-bold text-gray-900 hover:text-orange-600">
                  UniEats
                </Link>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-500 hover:text-orange-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/support" className="text-gray-500 hover:text-orange-600 px-3 py-2 text-sm font-medium">
                Support
              </Link>
              <Link href="/privacy" className="text-gray-900 hover:text-orange-600 px-3 py-2 text-sm font-medium">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-xl text-gray-600">
            Last updated: August 24, 2024
          </p>
        </div>

        {/* Privacy Content */}
        <div className="bg-white rounded-lg shadow-md p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                update your profile, or communicate with us. This may include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name, email address, and university affiliation</li>
                <li>Profile information including photos and preferences</li>
                <li>Location data when you use location-based features</li>
                <li>Content you post, including eating statuses and photos</li>
                <li>Communications with other users and our support team</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
            <div className="space-y-4 text-gray-600">
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Connect you with other users at your university</li>
                <li>Show you relevant content and recommendations</li>
                <li>Send you notifications about new connections and activities</li>
                <li>Respond to your comments, questions, and support requests</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, prevent, and address technical issues</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except in the following circumstances:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With other users based on your privacy settings and campus mode preferences</li>
                <li>With service providers who assist us in operating our platform</li>
                <li>When required by law or to protect our rights and safety</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and updates</li>
                <li>Access controls and authentication procedures</li>
                <li>Monitoring for suspicious activities</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Your Rights and Choices</h2>
            <div className="space-y-4 text-gray-600">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access and update your personal information</li>
                <li>Delete your account and associated data</li>
                <li>Control your privacy settings and visibility</li>
                <li>Opt out of certain communications</li>
                <li>Request a copy of your data</li>
                <li>Object to certain processing of your information</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Location Services</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                UniEats uses location services to help you find nearby friends and eating spots. 
                You can control location permissions through your device settings. We only collect 
                location data when you actively use location-based features.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We use cookies and similar technologies to enhance your experience, analyze usage, 
                and provide personalized content. You can control cookie settings through your 
                browser preferences.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children&apos;s Privacy</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                UniEats is designed for university students and is not intended for children under 13. 
                We do not knowingly collect personal information from children under 13. If you believe 
                we have collected such information, please contact us immediately.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Users</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                If you are accessing UniEats from outside the United States, please note that your 
                information may be transferred to, stored, and processed in the United States where 
                our servers are located and our central database is operated.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes 
                by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date. 
                We encourage you to review this Privacy Policy periodically.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p><strong>Email:</strong> <a href="mailto:aprameyakannan@gmail.com" className="hover:text-orange-600">aprameyakannan@gmail.com</a></p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="mt-16 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2024 UniEats. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/support" className="text-sm text-gray-500 hover:text-orange-600">
                Support
              </Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-orange-600">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

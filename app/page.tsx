import Link from 'next/link';

export default function AdminLandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">UniEats</h1>
              </div>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link href="/support" className="text-gray-500 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                Support
              </Link>
              <Link href="/privacy" className="text-gray-500 hover:text-gray-600 px-3 py-2 text-sm font-medium">
                Privacy
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">UniEats</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A social platform for university students to connect through food.
          </p>
        </div>

        {/* Footer */}
        <footer className="mt-24 border-t border-gray-200 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-500">
              © 2024 UniEats. All rights reserved.
            </div>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <Link href="/support" className="text-sm text-gray-500 hover:text-gray-600">
                Support
              </Link>
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-gray-600">
                Privacy Policy
              </Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

import Link from 'next/link'

const footerLinks = {
  categories: [
    { name: 'Home Decor', href: '/home-decor' },
    { name: 'Holidays', href: '/holidays' },
    // Add more main categories here as needed
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Sitemap', href: '/sitemap.xml' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
  social: [
    { name: 'Pinterest', href: 'https://www.pinterest.com/' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3 sm:mb-4">
              Modern Life Maven
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              Your source for practical lifestyle tips, money-saving strategies, home decor inspiration, and expert advice to help you live better.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4">Categories</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm hover:text-white transition-colors touch-manipulation"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4">Company</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm hover:text-white transition-colors touch-manipulation"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-3 sm:mb-4">Follow Us</h4>
            <ul className="space-y-1.5 sm:space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-xs sm:text-sm hover:text-white transition-colors touch-manipulation"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Modern Life Maven. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}


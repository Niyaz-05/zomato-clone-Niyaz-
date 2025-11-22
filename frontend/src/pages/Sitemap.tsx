import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Home, User, FileText, HelpCircle, MapPin } from 'lucide-react'

const Sitemap = () => {
  const sitemapSections = [
    {
      title: 'Main Pages',
      icon: Home,
      links: [
        { name: 'Home', path: '/' },
        { name: 'Restaurants', path: '/restaurants' },
        { name: 'Offers', path: '/offers' },
        { name: 'Favorites', path: '/favorites' }
      ]
    },
    {
      title: 'User Account',
      icon: User,
      links: [
        { name: 'Profile', path: '/profile' },
        { name: 'Order History', path: '/order-history' },
        { name: 'Addresses', path: '/addresses' },
        { name: 'Cart', path: '/cart' }
      ]
    },
    {
      title: 'Company',
      icon: FileText,
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Team', path: '/team' },
        { name: 'Blog', path: '/blog' }
      ]
    },
    {
      title: 'Legal',
      icon: FileText,
      links: [
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Security', path: '/security' }
      ]
    },
    {
      title: 'Support',
      icon: HelpCircle,
      links: [
        { name: 'Help & Support', path: '/help' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'FAQs', path: '/faq' }
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <MapPin className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Sitemap
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Navigate through all pages on Zomato
          </p>
        </motion.div>

        {/* Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sitemapSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-3">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">{section.title}</h2>
              </div>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-gray-600 hover:text-red-600 transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-gray-600 mb-6">
            Our support team is here to help you navigate our platform
          </p>
          <Link
            to="/contact"
            className="inline-block px-8 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Contact Support
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Sitemap

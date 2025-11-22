import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { HelpCircle, MessageCircle, Phone, Mail, Book, Search } from 'lucide-react'
import { useState } from 'react'

const Help = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const helpCategories = [
    {
      icon: Book,
      title: 'Getting Started',
      description: 'Learn the basics of using Zomato',
      articles: 5
    },
    {
      icon: MessageCircle,
      title: 'Orders & Delivery',
      description: 'Track orders and delivery information',
      articles: 8
    },
    {
      icon: Phone,
      title: 'Account & Settings',
      description: 'Manage your account preferences',
      articles: 6
    },
    {
      icon: Mail,
      title: 'Payments & Refunds',
      description: 'Payment methods and refund policies',
      articles: 7
    }
  ]

  const popularArticles = [
    'How to place an order?',
    'How to track my delivery?',
    'What payment methods are accepted?',
    'How do I cancel an order?',
    'How to add a new delivery address?',
    'How to contact customer support?'
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
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Help & Support
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find answers to your questions and get the help you need
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Help Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {helpCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all cursor-pointer group"
              >
                <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-4 w-16 h-16 mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-3">{category.description}</p>
                <span className="text-sm text-red-600 font-medium">
                  {category.articles} articles
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Popular Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Popular Articles</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <ul className="space-y-4">
              {popularArticles.map((article, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                >
                  <a
                    href="#"
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-red-50 transition-colors group"
                  >
                    <span className="text-gray-700 group-hover:text-red-600 transition-colors">
                      {article}
                    </span>
                    <span className="text-gray-400 group-hover:text-red-600 transition-colors">→</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl shadow-xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
          <p className="text-xl opacity-90 mb-8">
            Our support team is available 24/7 to assist you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-red-600 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Contact Support
            </Link>
            <Link
              to="/faq"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-red-600 transition-all"
            >
              View FAQs
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Help

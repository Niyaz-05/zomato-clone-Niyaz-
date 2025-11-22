import { motion } from 'framer-motion'
import { FileText, CheckCircle } from 'lucide-react'

const Terms = () => {
  const terms = [
    {
      title: 'Acceptance of Terms',
      content: 'By accessing and using Zomato\'s services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these terms, please do not use our services.'
    },
    {
      title: 'Use of Services',
      content: 'You agree to use our services only for lawful purposes and in accordance with these Terms. You are responsible for maintaining the confidentiality of your account and password.'
    },
    {
      title: 'Orders and Payments',
      content: 'All orders placed through our platform are subject to acceptance by the restaurant. Prices are subject to change without notice. Payment must be made at the time of order placement.'
    },
    {
      title: 'Delivery',
      content: 'Delivery times are estimates and may vary based on various factors. We are not responsible for delays caused by circumstances beyond our control.'
    },
    {
      title: 'Cancellations and Refunds',
      content: 'Cancellation and refund policies vary by restaurant. Please review the specific policy before placing your order. Refunds, if applicable, will be processed within 5-7 business days.'
    },
    {
      title: 'User Content',
      content: 'You retain ownership of content you submit to our platform, but grant us a license to use, display, and distribute such content in connection with our services.'
    },
    {
      title: 'Intellectual Property',
      content: 'All content on our platform, including text, graphics, logos, and software, is the property of Zomato and protected by intellectual property laws.'
    },
    {
      title: 'Limitation of Liability',
      content: 'Zomato shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-600">
            Last updated: March 2024
          </p>
        </motion.div>

        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8"
        >
          <p className="text-gray-600 leading-relaxed">
            Welcome to Zomato. These Terms of Service govern your use of our website and services. 
            By using our platform, you agree to comply with and be bound by these terms. Please read 
            them carefully before using our services.
          </p>
        </motion.div>

        {/* Terms List */}
        <div className="space-y-6">
          {terms.map((term, index) => (
            <motion.div
              key={term.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">{term.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{term.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl shadow-xl p-8 mt-8 text-white text-center"
        >
          <h2 className="text-2xl font-bold mb-4">Questions About Our Terms?</h2>
          <p className="mb-6">
            If you have any questions about these Terms of Service, please contact us.
          </p>
          <a
            href="mailto:savagebaba00@gmail.com"
            className="inline-block px-8 py-3 bg-white text-red-600 rounded-lg font-medium hover:shadow-lg transition-all"
          >
            Contact Legal Team
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default Terms

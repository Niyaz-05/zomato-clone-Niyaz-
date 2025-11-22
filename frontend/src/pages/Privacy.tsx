import { motion } from 'framer-motion'
import { Shield, Lock, Eye, FileText } from 'lucide-react'

const Privacy = () => {
  const sections = [
    {
      icon: Shield,
      title: 'Information We Collect',
      content: 'We collect information you provide directly to us, such as when you create an account, place an order, or contact customer support. This includes your name, email address, phone number, delivery address, and payment information.'
    },
    {
      icon: Lock,
      title: 'How We Use Your Information',
      content: 'We use the information we collect to provide, maintain, and improve our services, process your orders, send you updates and promotional materials, and protect against fraudulent or illegal activity.'
    },
    {
      icon: Eye,
      title: 'Information Sharing',
      content: 'We share your information with restaurant partners to fulfill your orders, payment processors to handle transactions, and service providers who assist in our operations. We never sell your personal information to third parties.'
    },
    {
      icon: FileText,
      title: 'Your Rights',
      content: 'You have the right to access, update, or delete your personal information. You can also opt-out of promotional communications and request a copy of your data. Contact us to exercise these rights.'
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Privacy Policy
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
            At Zomato, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you use our platform. Please read this 
            privacy policy carefully. If you do not agree with the terms of this privacy policy, 
            please do not access the site or use our services.
          </p>
        </motion.div>

        {/* Main Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <div className="flex items-start gap-4">
                <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-3 flex-shrink-0">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
                  <p className="text-gray-600 leading-relaxed">{section.content}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Security</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We implement appropriate technical and organizational security measures to protect your 
            personal information. However, please note that no method of transmission over the Internet 
            or electronic storage is 100% secure.
          </p>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have questions or comments about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:savagebaba00@gmail.com" className="text-red-600 hover:underline">
              savagebaba00@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default Privacy

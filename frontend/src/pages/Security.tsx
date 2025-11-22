import { motion } from 'framer-motion'
import { Shield, Lock, Key, Eye, AlertTriangle, CheckCircle } from 'lucide-react'

const Security = () => {
  const securityFeatures = [
    {
      icon: Lock,
      title: 'Data Encryption',
      description: 'All data transmitted between your device and our servers is encrypted using industry-standard SSL/TLS protocols.'
    },
    {
      icon: Key,
      title: 'Secure Authentication',
      description: 'Multi-factor authentication and secure password policies protect your account from unauthorized access.'
    },
    {
      icon: Shield,
      title: 'Payment Security',
      description: 'We use PCI-DSS compliant payment processors to ensure your financial information is always protected.'
    },
    {
      icon: Eye,
      title: 'Privacy Protection',
      description: 'Your personal information is stored securely and never shared without your explicit consent.'
    }
  ]

  const bestPractices = [
    'Use a strong, unique password for your Zomato account',
    'Enable two-factor authentication for added security',
    'Never share your password or OTP with anyone',
    'Log out from shared or public devices',
    'Keep your contact information up to date',
    'Review your order history regularly for any suspicious activity'
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
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Security & Safety
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your security is our top priority. Learn how we protect your data and account.
          </p>
        </motion.div>

        {/* Security Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Security Measures</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow"
              >
                <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Best Practices */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Security Best Practices</h2>
            <ul className="space-y-4">
              {bestPractices.map((practice, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{practice}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <div className="flex items-start gap-4 mb-6">
              <AlertTriangle className="w-8 h-8 text-orange-500 flex-shrink-0" />
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Report Security Issues</h2>
                <p className="text-gray-600">
                  If you discover a security vulnerability or suspicious activity, please report it immediately.
                </p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-2">Security Team</h3>
                <a href="mailto:savagebaba00@gmail.com" className="text-red-600 hover:underline">
                  savagebaba00@gmail.com
                </a>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="font-bold text-gray-800 mb-2">24/7 Support</h3>
                <a href="tel:+917499178303" className="text-orange-600 hover:underline">
                  +91 7499178303
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl shadow-xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Certified & Compliant</h2>
          <p className="text-xl opacity-90 mb-8">
            We maintain the highest security standards and comply with international regulations
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-lg font-medium">
            <span>ISO 27001 Certified</span>
            <span>•</span>
            <span>PCI-DSS Compliant</span>
            <span>•</span>
            <span>GDPR Compliant</span>
            <span>•</span>
            <span>SOC 2 Type II</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Security

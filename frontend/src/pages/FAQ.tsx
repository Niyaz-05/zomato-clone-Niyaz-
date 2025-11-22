import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDown, Search, HelpCircle } from 'lucide-react'

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      category: 'Orders & Delivery',
      questions: [
        {
          q: 'How do I place an order?',
          a: 'Browse restaurants, add items to your cart, proceed to checkout, enter your delivery address, choose a payment method, and confirm your order.'
        },
        {
          q: 'How can I track my order?',
          a: 'Once your order is placed, you can track it in real-time from the Order History page or by clicking the tracking link in your confirmation email.'
        },
        {
          q: 'What are the delivery charges?',
          a: 'Delivery charges vary based on distance and restaurant. You can see the exact delivery fee before placing your order at checkout.'
        },
        {
          q: 'Can I schedule an order for later?',
          a: 'Yes, many restaurants offer scheduled delivery. Select your preferred delivery time during checkout.'
        }
      ]
    },
    {
      category: 'Payments & Refunds',
      questions: [
        {
          q: 'What payment methods do you accept?',
          a: 'We accept credit/debit cards, UPI, net banking, digital wallets, and cash on delivery (where available).'
        },
        {
          q: 'How do I get a refund?',
          a: 'Refunds are processed automatically for cancelled orders. The amount will be credited to your original payment method within 5-7 business days.'
        },
        {
          q: 'Is my payment information secure?',
          a: 'Yes, we use industry-standard encryption and PCI-DSS compliant payment processors to ensure your payment information is always secure.'
        },
        {
          q: 'Can I save my payment methods?',
          a: 'Yes, you can securely save your payment methods in your account settings for faster checkout.'
        }
      ]
    },
    {
      category: 'Account & Settings',
      questions: [
        {
          q: 'How do I create an account?',
          a: 'Click on "Sign In" in the top right corner, then select "Create Account". Fill in your details and verify your email or phone number.'
        },
        {
          q: 'I forgot my password. What should I do?',
          a: 'Click on "Forgot Password" on the login page, enter your email, and follow the instructions sent to your email to reset your password.'
        },
        {
          q: 'How do I update my profile information?',
          a: 'Go to your Profile page, click on "Edit Profile", make your changes, and save.'
        },
        {
          q: 'Can I have multiple delivery addresses?',
          a: 'Yes, you can add and manage multiple delivery addresses in the Addresses section of your account.'
        }
      ]
    },
    {
      category: 'Offers & Discounts',
      questions: [
        {
          q: 'How do I apply a promo code?',
          a: 'Enter your promo code in the "Apply Coupon" field at checkout. The discount will be applied automatically if the code is valid.'
        },
        {
          q: 'Why isn\'t my promo code working?',
          a: 'Promo codes may have specific terms like minimum order value, validity period, or restaurant restrictions. Check the offer details.'
        },
        {
          q: 'Where can I find current offers?',
          a: 'Visit the Offers page to see all available deals and promotions. You can also check individual restaurant pages for exclusive offers.'
        },
        {
          q: 'Do you have a loyalty program?',
          a: 'Yes, frequent customers earn rewards points that can be redeemed for discounts on future orders.'
        }
      ]
    },
    {
      category: 'Restaurant Partners',
      questions: [
        {
          q: 'How can I list my restaurant on Zomato?',
          a: 'Visit our Partner page and fill out the registration form. Our team will contact you to complete the onboarding process.'
        },
        {
          q: 'What are the commission rates?',
          a: 'Commission rates vary based on several factors. Contact our partner support team for detailed information.'
        },
        {
          q: 'How do I update my restaurant menu?',
          a: 'Log in to your restaurant dashboard and navigate to the Menu Management section to add, edit, or remove items.'
        }
      ]
    }
  ]

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      faq =>
        faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.questions.length > 0)

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
            <HelpCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find quick answers to common questions
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-200 rounded-xl placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 shadow-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-8">
          {filteredFaqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * categoryIndex }}
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{category.category}</h2>
              <div className="space-y-3">
                {category.questions.map((faq, index) => {
                  const globalIndex = categoryIndex * 100 + index
                  const isOpen = openIndex === globalIndex

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-red-50 transition-colors"
                      >
                        <span className="font-medium text-gray-800 pr-4">{faq.q}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-red-600 flex-shrink-0 transition-transform ${
                            isOpen ? 'transform rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-4 text-gray-600"
                        >
                          {faq.a}
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl shadow-xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl opacity-90 mb-8">
            Our support team is here to help you 24/7
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-3 bg-white text-red-600 rounded-lg font-medium hover:shadow-lg transition-all"
            >
              Contact Support
            </a>
            <a
              href="/help"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-medium hover:bg-white hover:text-red-600 transition-all"
            >
              Visit Help Center
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default FAQ

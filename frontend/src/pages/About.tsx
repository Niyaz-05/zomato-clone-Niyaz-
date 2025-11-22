import { motion } from 'framer-motion'
import { Users, Target, Award, Heart } from 'lucide-react'

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Customer First',
      description: 'We prioritize our customers in everything we do'
    },
    {
      icon: Target,
      title: 'Innovation',
      description: 'Constantly improving and innovating our services'
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'Delivering the best food delivery experience'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'Passionate about connecting people with great food'
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
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
            About Zomato
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting people with the best food experiences since our inception
          </p>
        </motion.div>

        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600">
            <p>
              Zomato was founded with a simple mission: to ensure nobody has a bad meal. 
              What started as a restaurant discovery platform has evolved into a comprehensive 
              food delivery and dining experience service.
            </p>
            <p>
              Today, we serve millions of customers across multiple cities, partnering with 
              thousands of restaurants to bring delicious food right to your doorstep. Our 
              platform combines cutting-edge technology with a deep understanding of local 
              food culture.
            </p>
            <p>
              We're not just a food delivery service – we're a community of food lovers, 
              restaurant partners, and delivery heroes working together to make every meal 
              memorable.
            </p>
          </div>
        </motion.div>

        {/* Values Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-2xl transition-shadow"
              >
                <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-16 bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl shadow-xl p-12 text-white"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">10M+</div>
              <div className="text-xl opacity-90">Happy Customers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50K+</div>
              <div className="text-xl opacity-90">Restaurant Partners</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">100+</div>
              <div className="text-xl opacity-90">Cities Served</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default About

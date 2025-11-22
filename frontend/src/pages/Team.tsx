import { motion } from 'framer-motion'
import { Linkedin, Twitter, Mail } from 'lucide-react'

const Team = () => {
  const teamMembers = [
    {
      name: 'Deepinder Goyal',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      bio: 'Visionary leader driving Zomato\'s growth',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'deepinder@zomato.com'
      }
    },
    {
      name: 'Pankaj Chaddah',
      role: 'Co-founder',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      bio: 'Strategic thinker and operations expert',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'pankaj@zomato.com'
      }
    },
    {
      name: 'Mohit Gupta',
      role: 'CEO - Food Delivery',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
      bio: 'Leading our food delivery operations',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'mohit@zomato.com'
      }
    },
    {
      name: 'Akshant Goyal',
      role: 'CFO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      bio: 'Managing financial strategy and growth',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'akshant@zomato.com'
      }
    },
    {
      name: 'Rahul Ganjoo',
      role: 'Head of New Initiatives',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
      bio: 'Driving innovation and new ventures',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'rahul@zomato.com'
      }
    },
    {
      name: 'Sandhya Devanathan',
      role: 'Head of Marketing',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      bio: 'Building our brand and customer engagement',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sandhya@zomato.com'
      }
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
            Meet Our Team
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The passionate people behind Zomato's success
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-red-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex gap-3">
                  <a
                    href={member.social.linkedin}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={member.social.twitter}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-sky-500 hover:text-white transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a
                    href={`mailto:${member.social.email}`}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-red-600 hover:text-white transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Team

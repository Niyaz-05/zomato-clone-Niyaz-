import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'

const Blog = () => {
  const blogPosts = [
    {
      title: 'The Future of Food Delivery',
      excerpt: 'Exploring how technology is transforming the food delivery industry and what it means for customers and restaurants.',
      author: 'Deepinder Goyal',
      date: 'March 15, 2024',
      image: 'https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800',
      category: 'Technology'
    },
    {
      title: '10 Tips for Restaurant Partners',
      excerpt: 'Essential strategies to maximize your restaurant\'s success on Zomato and increase customer satisfaction.',
      author: 'Mohit Gupta',
      date: 'March 10, 2024',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
      category: 'Business'
    },
    {
      title: 'Sustainability in Food Delivery',
      excerpt: 'Our commitment to reducing environmental impact through eco-friendly packaging and sustainable practices.',
      author: 'Rahul Ganjoo',
      date: 'March 5, 2024',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
      category: 'Sustainability'
    },
    {
      title: 'Customer Stories: Food Lovers Unite',
      excerpt: 'Heartwarming stories from our community of food enthusiasts and how Zomato brought them together.',
      author: 'Sandhya Devanathan',
      date: 'February 28, 2024',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800',
      category: 'Community'
    },
    {
      title: 'Behind the Scenes: Our Tech Stack',
      excerpt: 'A deep dive into the technology powering Zomato\'s platform and ensuring seamless food delivery.',
      author: 'Tech Team',
      date: 'February 20, 2024',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
      category: 'Technology'
    },
    {
      title: 'Celebrating Local Cuisines',
      excerpt: 'Discovering and promoting regional delicacies across India through our platform.',
      author: 'Content Team',
      date: 'February 15, 2024',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
      category: 'Food Culture'
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
            Zomato Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stories, insights, and updates from the world of food delivery
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{post.date}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-red-600 font-medium group-hover:gap-3 transition-all"
                >
                  Read More
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Blog

import { Link } from 'react-router-dom'
import { Home, Search, Utensils } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../components/ui/button'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mb-8"
        >
          <div className="text-9xl font-bold text-red-600 opacity-20">404</div>
          <Utensils className="w-32 h-32 text-red-600 mx-auto -mt-16" />
        </motion.div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you're looking for seems to have wandered off the menu.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full border-2 border-transparent hover:border-red-800 transition-all">
              <Home className="w-5 h-5 mr-2" />
              Go Home
            </Button>
          </Link>
          <Link to="/restaurants">
            <Button variant="outline" className="w-full sm:w-auto border-2 border-red-600 text-red-600 hover:bg-red-50 px-8 py-3 rounded-full transition-all">
              <Search className="w-5 h-5 mr-2" />
              Browse Restaurants
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound


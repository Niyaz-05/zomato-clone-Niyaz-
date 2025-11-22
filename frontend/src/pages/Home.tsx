import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, Sparkles } from 'lucide-react'
import { RESTAURANTS, CUISINES, FOOD_ITEMS } from '../data/data'
import RestaurantCard from '../components/RestaurantCard'
import { Carousel } from '../components/ui/carousel'

const Home = () => {
  const featuredRestaurants = RESTAURANTS.slice(0, 6)
  const topRatedRestaurants = [...RESTAURANTS].sort((a, b) => b.rating - a.rating).slice(0, 8)
  const popularFoods = FOOD_ITEMS.slice(0, 8)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Gradient */}
      <section className="bg-gradient-to-br from-red-500 via-orange-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
              <Sparkles className="h-10 w-10" />
              Order food from the best restaurants
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Explore top-rated restaurants and exclusive offers near you
            </p>
            <Link
              to="/restaurants"
              className="inline-flex items-center bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Browse Restaurants
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Food Categories Carousel */}
      <section className="py-16 bg-gradient-to-r from-yellow-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Browse by Cuisine</h2>
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
            {CUISINES.map((cuisine, idx) => (
              <Link key={idx} to={`/restaurants?cuisine=${cuisine}`}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-4 shadow-md hover:shadow-xl transition-all text-center"
                >
                  <div className="text-3xl mb-2">
                    {cuisine === 'Indian' && '🍛'}
                    {cuisine === 'Chinese' && '🥡'}
                    {cuisine === 'Italian' && '🍕'}
                    {cuisine === 'Desserts' && '🍰'}
                    {cuisine === 'Beverages' && '☕'}
                    {cuisine === 'Street Food' && '🌮'}
                    {cuisine === 'Fast Food' && '🍔'}
                    {cuisine === 'Mexican' && '🌯'}
                    {cuisine === 'Japanese' && '🍣'}
                  </div>
                  <p className="text-sm font-medium text-gray-700">{cuisine}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants with Gradient Background */}
      <section className="py-16 bg-gradient-to-br from-pink-50 via-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Restaurants</h2>
            <Link to="/restaurants" className="text-red-600 hover:text-red-700 font-medium flex items-center">
              View All <ChevronRight className="h-5 w-5 ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} {...restaurant} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Rated Restaurants Carousel */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Top Rated Near You</h2>
          <Carousel autoPlay autoPlayInterval={4000}>
            {topRatedRestaurants.map((restaurant) => (
              <div key={restaurant.id} className="px-2">
                <RestaurantCard {...restaurant} />
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      {/* Popular Dishes */}
      <section className="py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Dishes</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularFoods.map((food) => (
              <Link key={food.id} to={`/restaurant/${food.restaurantId}`}>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                >
                  <img src={food.image} alt={food.name} className="w-full h-32 object-cover" />
                  <div className="p-3">
                    <h4 className="font-semibold text-sm mb-1">{food.name}</h4>
                    <p className="text-xs text-gray-500 mb-2">{food.category}</p>
                    <span className="font-bold text-red-600">₹{food.price}</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Hungry? Order Now!
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Get your favorite food delivered to your doorstep in minutes
            </p>
            <Link
              to="/restaurants"
              className="inline-flex items-center bg-white text-red-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg"
            >
              Explore Restaurants
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home

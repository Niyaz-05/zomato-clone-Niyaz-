import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Store, UtensilsCrossed } from 'lucide-react'
import { useFavorites } from '../lib/favorites'
import RestaurantCard from '../components/RestaurantCard'
import FoodCard from '../components/FoodCard'
import { Button } from '../components/ui/button'
import { useCart } from '../lib/cart'
import toast from 'react-hot-toast'

const Favorites = () => {
  const [activeTab, setActiveTab] = useState<'restaurants' | 'foods'>('restaurants')
  const { favorites } = useFavorites()
  const navigate = useNavigate()
  const { addItem, isItemFromDifferentRestaurant } = useCart()

  const handleAddFoodToCart = (food: typeof favorites.foods[0], quantity: number) => {
    if (isItemFromDifferentRestaurant(food.restaurantId)) {
      toast.error('You can only order from one restaurant at a time. Please clear your cart first.')
      return
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: food.id,
        name: food.name,
        description: '',
        price: food.price,
        image: food.image,
        restaurantId: food.restaurantId,
        restaurantName: food.restaurantName,
        isVeg: false
      })
    }

    toast.success(`${quantity}x ${food.name} added to cart!`)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-orange-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Heart className="h-8 w-8 mr-3 text-red-600 fill-red-600" />
            My Favorites
          </h1>
          <p className="text-gray-600">Your saved restaurants and dishes</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex space-x-2 mb-8 bg-white rounded-lg p-1 shadow-sm">
          <button
            onClick={() => setActiveTab('restaurants')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'restaurants'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Store className="h-5 w-5" />
            <span>Restaurants ({favorites.restaurants.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('foods')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all flex items-center justify-center space-x-2 ${
              activeTab === 'foods'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <UtensilsCrossed className="h-5 w-5" />
            <span>Dishes ({favorites.foods.length})</span>
          </button>
        </div>

        {/* Content */}
        {activeTab === 'restaurants' ? (
          favorites.restaurants.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {favorites.restaurants.map((restaurant, index) => (
                <motion.div
                  key={restaurant.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <RestaurantCard {...restaurant} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-white rounded-lg shadow-sm"
            >
              <Store className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No favorite restaurants yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start adding restaurants to your favorites by clicking the heart icon
              </p>
              <Button
                onClick={() => navigate('/restaurants')}
                className="bg-red-600 hover:bg-red-700"
              >
                Browse Restaurants
              </Button>
            </motion.div>
          )
        ) : (
          favorites.foods.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {favorites.foods.map((food, index) => (
                <motion.div
                  key={food.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <FoodCard
                    {...food}
                    description=""
                    category=""
                    isVegetarian={false}
                    onAddToCart={(quantity) => handleAddFoodToCart(food, quantity)}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16 bg-white rounded-lg shadow-sm"
            >
              <UtensilsCrossed className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No favorite dishes yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start adding dishes to your favorites by clicking the heart icon
              </p>
              <Button
                onClick={() => navigate('/restaurants')}
                className="bg-red-600 hover:bg-red-700"
              >
                Browse Restaurants
              </Button>
            </motion.div>
          )
        )}
      </div>
    </div>
  )
}

export default Favorites

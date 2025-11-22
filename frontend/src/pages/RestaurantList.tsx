import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { RESTAURANTS, CUISINES, searchRestaurants, searchFoods, FOOD_ITEMS } from '../data/data'
import RestaurantCard from '../components/RestaurantCard'
import FoodCard from '../components/FoodCard'
import { useCart } from '../lib/cart'
import toast from 'react-hot-toast'

const RestaurantList = () => {
  const [searchParams] = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(
    searchParams.get('cuisine') ? [searchParams.get('cuisine')!] : []
  )
  const [minRating, setMinRating] = useState<number>(0)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000])
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([])
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [filteredRestaurants, setFilteredRestaurants] = useState(RESTAURANTS)
  const [filteredFoods, setFilteredFoods] = useState<typeof FOOD_ITEMS>([])
  const [showFoodResults, setShowFoodResults] = useState(false)
  const { addItem, isItemFromDifferentRestaurant } = useCart()

  useEffect(() => {
    let restaurants = RESTAURANTS
    let foods: typeof FOOD_ITEMS = []

    // Search filter
    if (searchTerm.trim()) {
      restaurants = searchRestaurants(searchTerm.toLowerCase())
      foods = searchFoods(searchTerm.toLowerCase())
      setShowFoodResults(true)
    } else {
      setShowFoodResults(false)
    }

    // Cuisine filter
    if (selectedCuisines.length > 0) {
      restaurants = restaurants.filter(r =>
        selectedCuisines.some(c => r.cuisine.includes(c))
      )
      foods = foods.filter(f => selectedCuisines.includes(f.category))
    }

    // Rating filter
    if (minRating > 0) {
      restaurants = restaurants.filter(r => r.rating >= minRating)
    }

    // Price filter (based on costForTwo)
    restaurants = restaurants.filter(r => {
      const cost = parseInt(r.costForTwo.replace(/[^0-9]/g, '')) || 0
      return cost >= priceRange[0] && cost <= priceRange[1]
    })

    // Dietary filter
    if (dietaryFilters.includes('vegetarian')) {
      foods = foods.filter(f => f.isVegetarian === true)
    }
    if (dietaryFilters.includes('non-vegetarian')) {
      foods = foods.filter(f => f.isVegetarian === false)
    }

    setFilteredRestaurants(restaurants)
    setFilteredFoods(foods)
  }, [searchTerm, selectedCuisines, minRating, priceRange, dietaryFilters])

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev =>
      prev.includes(cuisine) ? prev.filter(c => c !== cuisine) : [...prev, cuisine]
    )
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCuisines([])
    setMinRating(0)
    setPriceRange([0, 2000])
    setDietaryFilters([])
    setShowFoodResults(false)
  }

  const toggleDietaryFilter = (filter: string) => {
    setDietaryFilters(prev =>
      prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]
    )
  }

  const hasActiveFilters = selectedCuisines.length > 0 || minRating > 0 || priceRange[0] > 0 || priceRange[1] < 2000 || dietaryFilters.length > 0

  const handleAddFoodToCart = (food: typeof FOOD_ITEMS[0], quantity: number) => {
    const restaurant = RESTAURANTS.find(r => r.id === food.restaurantId)
    if (!restaurant) return

    if (isItemFromDifferentRestaurant(food.restaurantId)) {
      toast.error('You can only order from one restaurant at a time. Please clear your cart first.')
      return
    }

    // Add items based on quantity
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: food.id,
        name: food.name,
        description: food.description,
        price: food.price,
        image: food.image,
        restaurantId: food.restaurantId,
        restaurantName: restaurant.name,
        isVeg: food.isVegetarian || false
      })
    }

    toast.success(`${quantity}x ${food.name} added to cart!`)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">All Restaurants</h1>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search restaurants, cuisines, or dishes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent shadow-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {/* Cuisine Filters */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Cuisines</p>
            <div className="flex flex-wrap gap-2">
              {CUISINES.map((cuisine) => (
                <button
                  key={cuisine}
                  onClick={() => toggleCuisine(cuisine)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCuisines.includes(cuisine)
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-red-500'
                  }`}
                >
                  {cuisine}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-2">Minimum Rating</p>
            <div className="flex gap-2">
              {[0, 3.5, 4.0, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    minRating === rating
                      ? 'bg-red-600 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-red-500'
                  }`}
                >
                  {rating === 0 ? 'All' : `${rating}★ & above`}
                </button>
              ))}
            </div>
          </div>

          {/* Advanced Filters Toggle */}
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
          >
            {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
            <span className="text-xs">▼</span>
          </button>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-4 space-y-4 pt-4 border-t border-gray-200"
            >
              {/* Price Range */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
                </p>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="100"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="flex-1"
                  />
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1"
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹0</span>
                  <span>₹2000+</span>
                </div>
              </div>

              {/* Dietary Preferences */}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Dietary Preferences</p>
                <div className="flex flex-wrap gap-2">
                  {['vegetarian', 'non-vegetarian', 'vegan', 'gluten-free'].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => toggleDietaryFilter(filter)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${
                        dietaryFilters.includes(filter)
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:border-green-500'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Food Results (if searching) */}
        {showFoodResults && filteredFoods.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Dishes ({filteredFoods.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFoods.map((food) => {
                const restaurant = RESTAURANTS.find(r => r.id === food.restaurantId)
                return (
                  <FoodCard
                    key={food.id}
                    {...food}
                    restaurantName={restaurant?.name}
                    onAddToCart={(quantity) => handleAddFoodToCart(food, quantity)}
                  />
                )
              })}
            </div>
          </motion.section>
        )}

        {/* Restaurant Results */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Restaurants ({filteredRestaurants.length})
          </h2>
          {filteredRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} {...restaurant} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                No restaurants found
              </h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your filters or search terms
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </motion.div>
          )}
        </section>

        {/* No Food Results Message */}
        {showFoodResults && filteredFoods.length === 0 && filteredRestaurants.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No results found
            </h3>
            <p className="text-gray-500 mb-6">
              We couldn't find any restaurants or dishes matching "{searchTerm}"
            </p>
            <button
              onClick={clearFilters}
              className="bg-red-600 text-white px-6 py-3 rounded-full font-medium hover:bg-red-700 transition-colors"
            >
              Clear Search
            </button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default RestaurantList

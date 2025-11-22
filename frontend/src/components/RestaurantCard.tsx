import { Link } from 'react-router-dom'
import { Star, Clock, IndianRupee, Leaf, Circle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useFavorites } from '../lib/favorites'
import HeartButton from './HeartButton'
import { LazyImage } from './LazyImage'
import { card3D } from '../lib/animations'

export interface RestaurantCardProps {
  id: number
  name: string
  cuisine: string
  image: string
  rating: number
  deliveryTime: string
  costForTwo: string
  offer?: string
  isEcoFriendly?: boolean
  location?: string
  isOpen?: boolean
  className?: string
}

const RestaurantCard = ({
  id,
  name,
  cuisine,
  image,
  rating,
  deliveryTime,
  costForTwo,
  offer,
  isEcoFriendly,
  isOpen = true,
  className = ''
}: RestaurantCardProps) => {
  const { isRestaurantFavorite, addRestaurant, removeRestaurant } = useFavorites()
  const isFavorite = isRestaurantFavorite(id)

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeRestaurant(id)
    } else {
      addRestaurant({ id, name, cuisine, image, rating, deliveryTime, costForTwo })
    }
  }

  return (
    <Link to={`/restaurant/${id}`} className={className}>
      <motion.div
        variants={card3D}
        initial="initial"
        whileHover="hover"
        whileTap={{ scale: 0.98 }}
        className="relative group"
        style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      >
        {/* Animated gradient border glow */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-red-500 via-orange-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-75 blur transition duration-500" />
        
        <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
        <div className="relative">
          <LazyImage 
            src={image} 
            alt={name} 
            className="w-full h-44 object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          {offer && (
            <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
              {offer}
            </div>
          )}
          {isEcoFriendly && (
            <div className="absolute top-3 right-12 bg-green-600/90 text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1">
              <Leaf className="h-3.5 w-3.5" /> Eco
            </div>
          )}
          {/* Favorite Button */}
          <div className="absolute top-3 right-3 z-10">
            <HeartButton
              isLiked={isFavorite}
              onToggle={handleFavoriteClick}
              size="md"
            />
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100">{name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`flex items-center text-xs px-2 py-0.5 rounded-full font-semibold ${
                  isOpen 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-400'
                }`}>
                  <Circle className={`h-2 w-2 mr-1 ${isOpen ? 'fill-current' : ''}`} />
                  {isOpen ? 'Open Now' : 'Closed'}
                </span>
              </div>
            </div>
            <span className="flex items-center text-sm text-green-700 dark:text-green-400 bg-green-100 dark:bg-green-900/50 px-2.5 py-1 rounded-full font-medium">
              <Star className="h-4 w-4 mr-1.5 fill-current" />
              {rating}
            </span>
          </div>
          <p className="text-sm text-gray-800 dark:text-gray-300 mb-3 font-medium">{cuisine}</p>
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300 gap-4">
            <span className="flex items-center font-medium">
              <Clock className="h-4 w-4 mr-1.5" />
              {deliveryTime}
            </span>
            <span className="flex items-center font-medium">
              <IndianRupee className="h-4 w-4 mr-1.5" />
              {costForTwo}
            </span>
          </div>
        </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default RestaurantCard

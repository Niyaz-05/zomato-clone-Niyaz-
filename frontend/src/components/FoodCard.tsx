import { motion } from 'framer-motion'
import { ShoppingCart, Plus, Minus } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import { card3D, buttonBounce } from '../lib/animations'
import { playAddToCart } from '../lib/sounds'
import { LazyImage } from './LazyImage'
import toast from 'react-hot-toast'

export interface FoodCardProps {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  isVegetarian?: boolean
  restaurantId: number
  restaurantName?: string
  onAddToCart?: (quantity: number) => void
  className?: string
}

const FoodCard = ({ 
  name,
  description,
  price,
  image,
  isVegetarian,
  restaurantName,
  onAddToCart,
  className = ''
}: FoodCardProps) => {
  const [quantity, setQuantity] = useState(0)

  const handleIncrement = () => setQuantity(prev => prev + 1)
  const handleDecrement = () => setQuantity(prev => Math.max(0, prev - 1))
  
  const handleAddToCart = () => {
    if (quantity > 0 && onAddToCart) {
      playAddToCart()
      onAddToCart(quantity)
      toast.success(`Added ${quantity} ${name} to cart!`, {
        icon: '🛒',
        duration: 2000,
      })
      setQuantity(0)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      variants={card3D}
      whileHover="hover"
      transition={{ duration: 0.3 }}
      className={`relative group ${className}`}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
    >
      {/* Animated gradient border glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-2xl opacity-0 group-hover:opacity-75 blur transition duration-500" />
      
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
      <div className="relative group">
        <div className="w-full h-48 overflow-hidden">
          <LazyImage 
            src={image} 
            alt={name} 
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Veg/Non-Veg Badge */}
        {isVegetarian !== undefined && (
          <div className="absolute top-3 left-3">
            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
              isVegetarian 
                ? 'bg-white border-green-600' 
                : 'bg-white border-red-600'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                isVegetarian ? 'bg-green-600' : 'bg-red-600'
              }`} />
            </div>
          </div>
        )}

        {/* Price Badge */}
        <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg">
          <span className="font-bold text-lg text-red-600">₹{price}</span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-3">
          <h4 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1">{name}</h4>
          {restaurantName && (
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-gray-400"></span>
              {restaurantName}
            </p>
          )}
        </div>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 leading-relaxed">{description}</p>
        
        {onAddToCart && (
          <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100 dark:border-gray-800">
            {quantity === 0 ? (
              <motion.div className="w-full" variants={buttonBounce} whileTap="tap">
                <Button
                  onClick={handleIncrement}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                >
                  <Plus className="h-4 w-4 mr-2" strokeWidth={2.5} />
                  Add to Cart
                </Button>
              </motion.div>
            ) : (
              <>
                <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDecrement}
                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 rounded-md"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" strokeWidth={2.5} />
                  </Button>
                  <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleIncrement}
                    className="h-8 w-8 p-0 hover:bg-green-100 hover:text-green-600 rounded-md"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" strokeWidth={2.5} />
                  </Button>
                </div>
                <motion.div className="flex-1" variants={buttonBounce} whileTap="tap">
                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" strokeWidth={2} />
                    Add {quantity}
                  </Button>
                </motion.div>
              </>
            )}
          </div>
        )}
      </div>
      </div>
    </motion.div>
  )
}

export default FoodCard

import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '../lib/cart'

export const FloatingCartButton = () => {
  const { state } = useCart()

  if (state.totalItems === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 100 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Link to="/cart">
          <Button
            size="lg"
            className="relative bg-red-500 hover:bg-red-600 text-white rounded-full h-16 w-16 shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <ShoppingCart className="h-6 w-6" />
            {state.totalItems > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-white text-red-500 border-2 border-red-500 min-w-[1.5rem] h-6 flex items-center justify-center p-0 text-xs font-bold">
                {state.totalItems > 99 ? '99+' : state.totalItems}
              </Badge>
            )}
          </Button>
        </Link>
      </motion.div>
    </AnimatePresence>
  )
}

export default FloatingCartButton

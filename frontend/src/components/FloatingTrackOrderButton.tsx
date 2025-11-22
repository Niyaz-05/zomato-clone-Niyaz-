import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Package } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './ui/button'

export const FloatingTrackOrderButton = () => {
  const [activeOrderId, setActiveOrderId] = useState<string | null>(null)
  const location = useLocation()

  useEffect(() => {
    const checkActiveOrder = () => {
      const orderId = localStorage.getItem('zomato-active-order')
      if (orderId) {
        // Check if order is still active (not delivered)
        const ordersStr = localStorage.getItem('zomato-orders')
        if (ordersStr) {
          const orders = JSON.parse(ordersStr)
          const order = orders.find((o: any) => o.id === orderId)
          if (order && order.status !== 'delivered') {
            setActiveOrderId(orderId)
          } else {
            localStorage.removeItem('zomato-active-order')
            setActiveOrderId(null)
          }
        }
      }
    }

    checkActiveOrder()

    // Check periodically
    const interval = setInterval(checkActiveOrder, 5000)
    return () => clearInterval(interval)
  }, [])

  // Don't show on tracking page
  if (location.pathname.includes('/track-order') || !activeOrderId) {
    return null
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        exit={{ opacity: 0, scale: 0.8, x: 100 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="fixed bottom-24 right-6 z-40"
      >
        <Link to={`/track-order/${activeOrderId}`}>
          <Button
            size="lg"
            className="bg-green-600 hover:bg-green-700 text-white rounded-full px-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
          >
            <Package className="h-5 w-5" />
            <span className="font-semibold">Track Order</span>
          </Button>
        </Link>
      </motion.div>
    </AnimatePresence>
  )
}

export default FloatingTrackOrderButton

import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, Clock, CheckCircle, XCircle, ChevronRight, RotateCcw } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { useCart } from '../lib/cart'
import toast from 'react-hot-toast'

interface OrderItem {
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  restaurantId: number
  restaurantName: string
  items: OrderItem[]
  totalAmount: number
  status: string
  placedAt: string
  estimatedDelivery: string
  deliveryAddress: string
}

const OrderHistory = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const { addItem, clearCart } = useCart()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    // Load orders from localStorage
    const ordersStr = localStorage.getItem('zomato-orders')
    if (ordersStr) {
      const allOrders: Order[] = JSON.parse(ordersStr)
      setOrders(allOrders.sort((a, b) => new Date(b.placedAt).getTime() - new Date(a.placedAt).getTime()))
    }
  }, [isAuthenticated, navigate])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-orange-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200'
      default:
        return 'bg-orange-50 text-orange-700 border-orange-200'
    }
  }

  const handleReorder = (order: Order) => {
    clearCart()
    
    // Add all items from the order to cart
    order.items.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        addItem({
          id: Math.random(), // Generate random ID for reorder
          name: item.name,
          description: '',
          price: item.price,
          image: '',
          restaurantId: order.restaurantId,
          restaurantName: order.restaurantName,
          isVeg: false
        })
      }
    })

    toast.success('Items added to cart!')
    navigate('/cart')
  }

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true
    if (filter === 'active') return order.status !== 'delivered' && order.status !== 'cancelled'
    if (filter === 'completed') return order.status === 'delivered' || order.status === 'cancelled'
    return true
  })

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
            <Package className="h-8 w-8 mr-3 text-red-600" />
            Order History
          </h1>
          <p className="text-gray-600">View and track all your orders</p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6 bg-white rounded-lg p-1 shadow-sm">
          {(['all', 'active', 'completed'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all ${
                filter === tab
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {order.restaurantName}
                          </h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="ml-1 capitalize">{order.status.replace('_', ' ')}</span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          Order #{order.id.slice(0, 8)} • {new Date(order.placedAt).toLocaleDateString()} at {new Date(order.placedAt).toLocaleTimeString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-red-600">₹{order.totalAmount}</p>
                        <p className="text-xs text-gray-500">{order.items.length} items</p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-gray-700">
                              {item.quantity}x {item.name}
                            </span>
                            <span className="font-medium text-gray-900">
                              ₹{item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delivery Address */}
                    <p className="text-sm text-gray-600 mb-4">
                      <span className="font-medium">Delivered to:</span> {order.deliveryAddress}
                    </p>

                    {/* Actions */}
                    <div className="flex space-x-3">
                      <Button
                        variant="outline"
                        onClick={() => navigate(`/track-order/${order.id}`)}
                        className="flex-1"
                      >
                        View Details
                        <ChevronRight className="h-4 w-4 ml-2" />
                      </Button>
                      <Button
                        onClick={() => handleReorder(order)}
                        className="flex-1 bg-red-600 hover:bg-red-700"
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Reorder
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-lg shadow-sm"
          >
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No orders yet
            </h3>
            <p className="text-gray-500 mb-6">
              {filter === 'all' 
                ? "You haven't placed any orders yet. Start exploring restaurants!"
                : `No ${filter} orders found`}
            </p>
            <Button
              onClick={() => navigate('/restaurants')}
              className="bg-red-600 hover:bg-red-700"
            >
              Browse Restaurants
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default OrderHistory

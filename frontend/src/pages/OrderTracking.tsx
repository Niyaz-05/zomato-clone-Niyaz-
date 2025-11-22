import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { CheckCircle, Clock, Package, Bike, MapPin, Phone, ArrowLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { DELIVERY_AGENTS, RESTAURANTS } from '../data/data'

type OrderStatus = 'placed' | 'preparing' | 'out_for_delivery' | 'arriving' | 'delivered'

interface Order {
  id: string
  restaurantId: number
  restaurantName: string
  items: Array<{ name: string; quantity: number; price: number }>
  totalAmount: number
  status: OrderStatus
  placedAt: string
  estimatedDelivery: string
  deliveryAgentId: number
  deliveryAddress: string
}

const OrderTracking = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [order, setOrder] = useState<Order | null>(null)
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>('placed')

  useEffect(() => {
    // Load order from localStorage
    const ordersStr = localStorage.getItem('zomato-orders')
    if (ordersStr) {
      const orders: Order[] = JSON.parse(ordersStr)
      const foundOrder = orders.find(o => o.id === id)
      if (foundOrder) {
        setOrder(foundOrder)
        setCurrentStatus(foundOrder.status)
      }
    }
  }, [id])

  useEffect(() => {
    if (!order) return

    // Simulate order status progression
    const statusFlow: OrderStatus[] = ['placed', 'preparing', 'out_for_delivery', 'arriving', 'delivered']
    const currentIndex = statusFlow.indexOf(currentStatus)

    if (currentIndex < statusFlow.length - 1) {
      const timer = setTimeout(() => {
        const nextStatus = statusFlow[currentIndex + 1]
        setCurrentStatus(nextStatus)

        // Update order in localStorage
        const ordersStr = localStorage.getItem('zomato-orders')
        if (ordersStr) {
          const orders: Order[] = JSON.parse(ordersStr)
          const updatedOrders = orders.map(o =>
            o.id === id ? { ...o, status: nextStatus } : o
          )
          localStorage.setItem('zomato-orders', JSON.stringify(updatedOrders))
        }
      }, 8000) // Change status every 8 seconds

      return () => clearTimeout(timer)
    }
  }, [currentStatus, order, id])

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Order not found</h2>
          <p className="text-gray-500 mb-6">We couldn't find the order you're looking for</p>
          <Button onClick={() => navigate('/')}>Go to Home</Button>
        </div>
      </div>
    )
  }

  const deliveryAgent = DELIVERY_AGENTS.find(a => a.id === order.deliveryAgentId) || DELIVERY_AGENTS[0]
  const restaurant = RESTAURANTS.find(r => r.id === order.restaurantId)

  const statusSteps = [
    { key: 'placed', label: 'Order Placed', icon: CheckCircle },
    { key: 'preparing', label: 'Preparing', icon: Clock },
    { key: 'out_for_delivery', label: 'Out for Delivery', icon: Bike },
    { key: 'arriving', label: 'Arriving Soon', icon: MapPin },
    { key: 'delivered', label: 'Delivered', icon: CheckCircle }
  ]

  const currentStepIndex = statusSteps.findIndex(s => s.key === currentStatus)
  const progress = ((currentStepIndex + 1) / statusSteps.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        {/* Order Status Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-6 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-lg">
              <CardTitle className="text-2xl">Order #{order.id.slice(0, 8)}</CardTitle>
              <p className="text-sm opacity-90">
                Placed at {new Date(order.placedAt).toLocaleTimeString()}
              </p>
            </CardHeader>
            <CardContent className="pt-8">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="relative">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-green-600"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                </div>

                {/* Status Steps */}
                <div className="flex justify-between mt-6">
                  {statusSteps.map((step, index) => {
                    const Icon = step.icon
                    const isActive = index <= currentStepIndex
                    const isCurrent = index === currentStepIndex

                    return (
                      <motion.div
                        key={step.key}
                        className="flex flex-col items-center"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div
                          className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                            isActive
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}
                          animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                          transition={{ repeat: Infinity, duration: 2 }}
                        >
                          <Icon className="h-6 w-6" />
                        </motion.div>
                        <p className={`text-xs text-center font-medium ${
                          isActive ? 'text-gray-900' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Current Status Message */}
              <motion.div
                key={currentStatus}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6"
              >
                <p className="text-green-800 font-semibold text-center">
                  {currentStatus === 'placed' && '✓ Your order has been placed successfully!'}
                  {currentStatus === 'preparing' && '👨‍🍳 Your food is being prepared with love'}
                  {currentStatus === 'out_for_delivery' && '🚴 Your order is on the way!'}
                  {currentStatus === 'arriving' && '📍 Your delivery partner is nearby'}
                  {currentStatus === 'delivered' && '🎉 Your order has been delivered! Enjoy your meal!'}
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Delivery Agent Info */}
          {currentStatus !== 'placed' && currentStatus !== 'preparing' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Delivery Partner</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={deliveryAgent.avatar} alt={deliveryAgent.name} />
                      <AvatarFallback>{deliveryAgent.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{deliveryAgent.name}</h3>
                      <p className="text-sm text-gray-500">Delivery Partner</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">ETA</span>
                      <span className="font-semibold text-green-600">{order.estimatedDelivery}</span>
                    </div>
                    <Button variant="outline" className="w-full">
                      <Phone className="h-4 w-4 mr-2" />
                      Call Delivery Partner
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">{order.restaurantName}</h4>
                  {restaurant && (
                    <p className="text-sm text-gray-500">{restaurant.location}</p>
                  )}
                </div>
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.quantity}x {item.name}
                      </span>
                      <span className="font-medium">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-red-600">₹{order.totalAmount}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Delivery Address</p>
                      <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default OrderTracking

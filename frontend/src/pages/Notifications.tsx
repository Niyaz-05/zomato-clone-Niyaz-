import { motion } from 'framer-motion'
import { Bell, Package, Tag, Heart, Info, Trash2, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

interface Notification {
  id: number
  type: 'order' | 'offer' | 'favorite' | 'info'
  title: string
  message: string
  time: string
  read: boolean
}

const Notifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: 'order',
      title: 'Order Delivered',
      message: 'Your order from Pizza Palace has been delivered successfully!',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'offer',
      title: 'Special Offer',
      message: 'Get 50% off on your next order. Use code: ZOMATO50',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order from Burger King has been confirmed and is being prepared.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 4,
      type: 'favorite',
      title: 'New Menu Items',
      message: 'Your favorite restaurant "Sushi Express" has added new items to their menu!',
      time: '5 hours ago',
      read: true
    },
    {
      id: 5,
      type: 'info',
      title: 'Account Update',
      message: 'Your profile information has been updated successfully.',
      time: '1 day ago',
      read: true
    },
    {
      id: 6,
      type: 'offer',
      title: 'Weekend Special',
      message: 'Enjoy free delivery on all orders this weekend!',
      time: '2 days ago',
      read: true
    }
  ])

  const getIcon = (type: string) => {
    switch (type) {
      case 'order':
        return Package
      case 'offer':
        return Tag
      case 'favorite':
        return Heart
      default:
        return Info
    }
  }

  const getIconColor = (type: string) => {
    switch (type) {
      case 'order':
        return 'from-blue-500 to-blue-600'
      case 'offer':
        return 'from-green-500 to-green-600'
      case 'favorite':
        return 'from-pink-500 to-pink-600'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const deleteNotification = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id))
    toast.success('Notification deleted')
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
    toast.success('All notifications marked as read')
  }

  const clearAll = () => {
    if (notifications.length === 0) {
      toast.error('No notifications to clear')
      return
    }
    setNotifications([])
    toast.success('All notifications cleared')
  }

  const unreadCount = notifications.filter(n => !n.read).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="bg-gradient-to-br from-red-500 to-orange-500 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center relative">
            <Bell className="w-10 h-10 text-white" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-red-600 text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text text-transparent mb-4">
            Notifications
          </h1>
          <p className="text-xl text-gray-600">
            Stay updated with your orders and offers
          </p>
        </motion.div>

        {/* Action Buttons */}
        {notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center mb-8"
          >
            {unreadCount > 0 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={markAllAsRead}
                className="px-6 py-2 bg-white text-red-600 border-2 border-red-600 rounded-lg font-medium hover:bg-red-600 hover:text-white transition-all flex items-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Mark All as Read
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearAll}
              className="px-6 py-2 bg-white text-gray-600 border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-100 transition-all flex items-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              Clear All
            </motion.button>
          </motion.div>
        )}

        {/* Notifications List */}
        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-xl p-12 text-center"
          >
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">No Notifications</h2>
            <p className="text-gray-600">You're all caught up! Check back later for updates.</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {notifications.map((notification, index) => {
              const Icon = getIcon(notification.type)
              const iconColor = getIconColor(notification.type)

              return (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all ${
                    !notification.read ? 'border-l-4 border-red-500' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`bg-gradient-to-br ${iconColor} rounded-full p-3 flex-shrink-0`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-800 mb-1">
                            {notification.title}
                            {!notification.read && (
                              <span className="ml-2 inline-block w-2 h-2 bg-red-500 rounded-full" />
                            )}
                          </h3>
                          <p className="text-gray-600 mb-2">{notification.message}</p>
                          <span className="text-sm text-gray-400">{notification.time}</span>
                        </div>
                        <div className="flex gap-2">
                          {!notification.read && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => markAsRead(notification.id)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Mark as read"
                            >
                              <CheckCircle className="w-5 h-5" />
                            </motion.button>
                          )}
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => deleteNotification(notification.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Notifications

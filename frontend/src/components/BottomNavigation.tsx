// Mobile bottom navigation bar

import { motion } from 'framer-motion'
import { Home, Search, ShoppingCart, User } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../lib/cart'
import { cn } from '../lib/utils'

export default function BottomNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const { state } = useCart()

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/restaurants' },
    { icon: ShoppingCart, label: 'Cart', path: '/cart', badge: state.totalItems },
    { icon: User, label: 'Profile', path: '/profile' },
  ]

  const isActive = (path: string) => location.pathname === path

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
    >
      <div className="relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-around px-4 py-2 safe-area-inset-bottom">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.path)

            return (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="relative flex flex-col items-center justify-center py-2 px-4 min-w-[60px]"
                whileTap={{ scale: 0.9 }}
              >
                {/* Active indicator */}
                {active && (
                  <motion.div
                    layoutId="bottomNavIndicator"
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                {/* Icon with badge */}
                <div className="relative">
                  <Icon
                    size={24}
                    className={cn(
                      'transition-colors',
                      active
                        ? 'text-red-500'
                        : 'text-gray-600 dark:text-gray-400'
                    )}
                  />
                  {item.badge && item.badge > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                    >
                      {item.badge > 9 ? '9+' : item.badge}
                    </motion.div>
                  )}
                </div>

                {/* Label */}
                <span
                  className={cn(
                    'text-xs mt-1 transition-colors',
                    active
                      ? 'text-red-500 font-semibold'
                      : 'text-gray-600 dark:text-gray-400'
                  )}
                >
                  {item.label}
                </span>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.nav>
  )
}

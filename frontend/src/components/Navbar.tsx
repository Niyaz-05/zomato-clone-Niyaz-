import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, ShoppingCart, User, Menu, X, Bell } from 'lucide-react'
import { Button } from './ui/button'
import { useAuth } from '../lib/auth'
import { useCart } from '../lib/cart'
import { ThemeToggle } from './ThemeToggle'
import SoundToggle from './SoundToggle'
import LocationSelector from './LocationSelector'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentLocation, setCurrentLocation] = useState('Nagpur')
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuth()
  const { state } = useCart()
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/restaurants?search=${encodeURIComponent(searchQuery)}`)
    }
  }


  return (
    <motion.nav
      className="sticky top-0 z-50 transition-all duration-300"
      initial={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}
      animate={{
        backgroundColor: isScrolled
          ? 'rgba(255, 255, 255, 0.8)'
          : 'rgba(255, 255, 255, 1)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
        boxShadow: isScrolled
          ? '0 4px 6px rgba(0, 0, 0, 0.1)'
          : '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo with animation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <motion.span
                className="text-2xl font-bold bg-gradient-to-r from-red-600 via-orange-500 to-red-600 bg-clip-text text-transparent"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                Zomato
              </motion.span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Home
            </Link>
            <Link to="/restaurants" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Restaurants
            </Link>
            <Link to="/offers" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Offers
            </Link>
            <Link to="/favorites" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
              Favorites
            </Link>
            {isAuthenticated && (
              <Link to="/loyalty" className="text-gray-700 hover:text-red-600 transition-colors font-medium">
                Rewards
              </Link>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400 h-5 w-5 group-focus-within:text-red-600 transition-colors" />
              <input
                type="text"
                placeholder="Search for restaurants, food..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl placeholder-gray-500 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-all duration-300 hover:border-red-300 hover:shadow-md"
              />
            </form>
          </div>

          {/* Right side icons */}
          <div className="hidden md:flex items-center space-x-4">
            <LocationSelector 
              currentLocation={currentLocation}
              onLocationChange={setCurrentLocation}
            />
            
            <SoundToggle showLabel={false} />
            
            {/* Notifications */}
            <Link to="/notifications" className="relative">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-700 hover:text-red-600 transition-colors relative"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center animate-pulse">
                  3
                </span>
              </motion.button>
            </Link>
            
            <Link to="/cart" className="text-gray-700 hover:text-red-600 transition-colors relative group">
              <ShoppingCart className="h-6 w-6" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {state.totalItems > 99 ? '99+' : state.totalItems}
              </span>
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="text-gray-700 hover:text-red-600 transition-colors">
                  <User className="h-6 w-6" />
                </Link>
                <div className="text-sm">
                  <span className="text-gray-700">Welcome, </span>
                  <span className="font-medium text-red-600">
                    {user?.name ? `${user.name.charAt(0)}${user.name.charAt(user.name.length - 1)}` : ''}
                  </span>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                className="bg-red-600 hover:bg-red-700"
              >
                Sign In
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-red-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-400 h-5 w-5 group-focus-within:text-red-600 transition-colors" />
                  <input
                    type="text"
                    placeholder="Search restaurants..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-2.5 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl placeholder-gray-500 text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:bg-white transition-all duration-300 hover:border-red-300 hover:shadow-md"
                  />
                </div>
              </form>

              {/* Mobile Navigation Links */}
              <Link
                to="/"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/restaurants"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Restaurants
              </Link>
              <Link
                to="/offers"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Offers
              </Link>
              <Link
                to="/favorites"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Favorites
              </Link>
              {isAuthenticated && (
                <Link
                  to="/loyalty"
                  className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Rewards
                </Link>
              )}
              <Link
                to="/order-history"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Order History
              </Link>
              <Link
                to="/addresses"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Addresses
              </Link>

              {/* Mobile Right Side Items */}
              <div className="flex items-center justify-between px-3 py-2">
                <LocationSelector 
                  currentLocation={currentLocation}
                  onLocationChange={setCurrentLocation}
                />
                <ThemeToggle />
              </div>

              <Link
                to="/profile"
                className="block px-3 py-2 text-gray-700 hover:text-red-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>

              {isAuthenticated ? (
                <div className="border-t pt-2 mt-2">
                  <div className="px-3 py-2 text-sm text-gray-700">
                    Welcome, <span className="font-medium text-red-600">
                      {user?.name ? `${user.name.charAt(0)}${user.name.charAt(user.name.length - 1)}` : ''}
                    </span>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 bg-red-600 text-white rounded-md text-center mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar

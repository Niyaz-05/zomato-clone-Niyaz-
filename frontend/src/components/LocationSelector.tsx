import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, X, Search, Navigation } from 'lucide-react'
import toast from 'react-hot-toast'

interface LocationSelectorProps {
  currentLocation: string
  onLocationChange: (location: string) => void
}

const LocationSelector = ({ currentLocation, onLocationChange }: LocationSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const popularCities = [
    'Nagpur',
    'Delhi',
    'Mumbai',
    'Bangalore',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Pune',
    'Ahmedabad',
    'Jaipur',
    'Lucknow',
    'Chandigarh',
    'Goa'
  ]

  const filteredCities = popularCities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleLocationSelect = (city: string) => {
    onLocationChange(city)
    setIsOpen(false)
    toast.success(`Location changed to ${city}`)
  }

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => {
          // In a real app, you would reverse geocode the coordinates
          toast.success('Location detected successfully')
          onLocationChange('Current Location')
          setIsOpen(false)
        },
        () => {
          toast.error('Unable to detect location. Please select manually.')
        }
      )
    } else {
      toast.error('Geolocation is not supported by your browser')
    }
  }

  return (
    <>
      {/* Location Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 text-gray-700 hover:text-red-600 transition-colors"
      >
        <MapPin className="h-5 w-5" />
        <span className="text-sm font-medium">{currentLocation}</span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl z-50 p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Select Location</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {/* Detect Location Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDetectLocation}
                className="w-full mb-6 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                Detect Current Location
              </motion.button>

              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search for your city..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              {/* Popular Cities */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-3 uppercase">
                  Popular Cities
                </h3>
                <div className="max-h-64 overflow-y-auto">
                  <div className="space-y-2">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <motion.button
                          key={city}
                          whileHover={{ x: 5 }}
                          onClick={() => handleLocationSelect(city)}
                          className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                            city === currentLocation
                              ? 'bg-red-50 text-red-600 font-medium'
                              : 'hover:bg-gray-100 text-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <MapPin className="w-4 h-4" />
                            {city}
                          </div>
                        </motion.button>
                      ))
                    ) : (
                      <p className="text-center text-gray-500 py-4">
                        No cities found matching "{searchQuery}"
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default LocationSelector

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Gift, Percent, ArrowRight, Tag, TrendingUp, Sparkles } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { OFFERS, RESTAURANTS } from '../data/data'
import RestaurantCard from '../components/RestaurantCard'
import toast from 'react-hot-toast'

const Offers = () => {
  const [copiedOfferId, setCopiedOfferId] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  
  const restaurantsWithOffers = RESTAURANTS.filter(r => r.offer)

  // Calculate offer statistics
  const offerStats = {
    totalOffers: OFFERS.length,
    avgDiscount: Math.round(OFFERS.reduce((acc, offer) => {
      const discountMatch = offer.discount.match(/(\d+)/)
      return acc + (discountMatch ? parseInt(discountMatch[1]) : 0)
    }, 0) / OFFERS.length),
    restaurantsWithOffers: restaurantsWithOffers.length,
    activeUsers: '50K+'
  }

  const offerCategories = [
    { id: 'all', name: 'All Offers', icon: Tag },
    { id: 'food', name: 'Food Deals', icon: Gift },
    { id: 'new', name: 'New User', icon: Sparkles },
    { id: 'trending', name: 'Trending', icon: TrendingUp }
  ]

  const handleClaimOffer = (offer: typeof OFFERS[0]) => {
    setCopiedOfferId(offer.id)
    // Copy offer code to clipboard
    navigator.clipboard.writeText(offer.code || offer.discount)
    toast.success(`Offer code "${offer.code || offer.discount}" copied! Apply at checkout.`)
    setTimeout(() => setCopiedOfferId(null), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Amazing Offers & Deals 🎉
            </h1>
            <p className="text-xl opacity-90 mb-8">
              Save big on your favorite food with exclusive offers and discounts
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">{offerStats.totalOffers}+</div>
              <div className="text-sm opacity-90">Active Offers</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">{offerStats.avgDiscount}%</div>
              <div className="text-sm opacity-90">Avg. Discount</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">{offerStats.restaurantsWithOffers}</div>
              <div className="text-sm opacity-90">Restaurants</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
              <div className="text-3xl font-bold mb-1">{offerStats.activeUsers}</div>
              <div className="text-sm opacity-90">Happy Users</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3 overflow-x-auto">
            {offerCategories.map((category) => {
              const Icon = category.icon
              return (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="flex items-center gap-2 whitespace-nowrap"
                >
                  <Icon className="h-4 w-4" />
                  {category.name}
                </Button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-3xl font-bold text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Featured Offers
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {OFFERS.map((offer, index) => (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer rounded-3xl h-full flex flex-col">
                  <div className="relative">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white text-base px-3 py-1">
                      <Percent className="h-4 w-4 mr-1" />
                      {offer.discount}
                    </Badge>
                    {offer.isNew && (
                      <Badge className="absolute top-4 right-4 bg-green-500 text-white">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{offer.title}</h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">{offer.description}</p>
                      
                      {/* Offer Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded-lg">
                          <span className="text-gray-600 font-medium">Min. Order:</span>
                          <span className="font-semibold text-gray-900">{offer.minOrder}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded-lg">
                          <span className="text-gray-600 font-medium flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Valid till:
                          </span>
                          <span className="font-semibold text-gray-900">{offer.validUntil}</span>
                        </div>
                        {offer.maxDiscount && (
                          <div className="flex items-center justify-between text-sm bg-gray-50 p-2 rounded-lg">
                            <span className="text-gray-600 font-medium">Max Discount:</span>
                            <span className="font-semibold text-gray-900">{offer.maxDiscount}</span>
                          </div>
                        )}
                      </div>

                      {/* Offer Code */}
                      {offer.code && (
                        <div className="mb-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                          <div className="text-xs text-gray-600 mb-1">Use Code:</div>
                          <div className="font-mono font-bold text-orange-600 text-lg">{offer.code}</div>
                        </div>
                      )}

                      {/* Terms */}
                      {offer.terms && (
                        <div className="text-xs text-gray-500 mb-4">
                          <span className="font-medium">T&C:</span> {offer.terms}
                        </div>
                      )}
                    </div>

                    <Button 
                      className="w-full bg-red-500 hover:bg-red-600 mt-auto"
                      onClick={() => handleClaimOffer(offer)}
                    >
                      <Gift className="h-4 w-4 mr-2" />
                      {copiedOfferId === offer.id ? '✓ Copied!' : 'Copy Code & Claim'}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">How to Use Offers</h2>
            <p className="text-gray-600">Follow these simple steps to save on your orders</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Browse Offers',
                description: 'Explore our wide range of exclusive deals and discounts from top restaurants',
                icon: '🔍'
              },
              {
                step: '2',
                title: 'Copy Code',
                description: 'Click on any offer to copy the promo code to your clipboard instantly',
                icon: '📋'
              },
              {
                step: '3',
                title: 'Apply & Save',
                description: 'Paste the code at checkout and enjoy amazing discounts on your order',
                icon: '💰'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-red-100 text-red-600 font-bold mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Restaurants with Offers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="text-3xl font-bold mb-2">Restaurants with Special Offers</h2>
              <p className="text-gray-600">Discover amazing deals from your favorite restaurants</p>
            </div>
            <Link to="/restaurants" className="text-red-600 hover:text-red-700 font-medium flex items-center gap-2 group">
              View all restaurants 
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {restaurantsWithOffers.slice(0, 6).map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <RestaurantCard {...restaurant} />
              </motion.div>
            ))}
          </motion.div>

          {restaurantsWithOffers.length > 6 && (
            <div className="text-center mt-8">
              <Link to="/restaurants">
                <Button size="lg" variant="outline" className="group">
                  View All {restaurantsWithOffers.length} Restaurants
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">Never Miss an Offer</h2>
            <p className="text-xl mb-8 opacity-90">
              Subscribe to get notified about new offers and exclusive deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 font-semibold">
                Subscribe
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Offers

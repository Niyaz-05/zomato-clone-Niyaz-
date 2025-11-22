import { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Star, Clock, Heart, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useCart } from '../lib/cart'
import { useFavorites } from '../lib/favorites'
import { RESTAURANTS, getMenuByRestaurantId, FOOD_ITEMS } from '../data/data'
import FoodCard from '../components/FoodCard'
import ReviewSection from '../components/ReviewSection'
import toast from 'react-hot-toast'

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [selectedTab, setSelectedTab] = useState('menu')
  const { addItem, isItemFromDifferentRestaurant } = useCart()
  const { isRestaurantFavorite, addRestaurant, removeRestaurant } = useFavorites()

  const restaurant = RESTAURANTS.find(r => r.id === parseInt(id || '0'))
  const menuItems = useMemo(() => getMenuByRestaurantId(parseInt(id || '0')), [id])
  const isFavorite = restaurant ? isRestaurantFavorite(restaurant.id) : false

  const handleFavoriteClick = () => {
    if (!restaurant) return
    
    if (isFavorite) {
      removeRestaurant(restaurant.id)
    } else {
      addRestaurant({
        id: restaurant.id,
        name: restaurant.name,
        cuisine: restaurant.cuisine,
        image: restaurant.image,
        rating: restaurant.rating,
        deliveryTime: restaurant.deliveryTime,
        costForTwo: restaurant.costForTwo
      })
    }
  }

  // Group menu items by category
  const menuByCategory = useMemo(() => {
    const grouped: { [key: string]: typeof FOOD_ITEMS } = {}
    menuItems.forEach(item => {
      if (!grouped[item.category]) {
        grouped[item.category] = []
      }
      grouped[item.category].push(item)
    })
    return grouped
  }, [menuItems])

  // Get similar items for "You may also like"
  const similarItems = useMemo(() => {
    if (!menuItems.length) return []
    const category = menuItems[0].category
    return FOOD_ITEMS.filter(
      item => item.category === category && item.restaurantId !== parseInt(id || '0')
    ).slice(0, 6)
  }, [menuItems, id])

  const handleAddToCart = (food: typeof FOOD_ITEMS[0], quantity: number) => {
    if (!restaurant) return

    if (isItemFromDifferentRestaurant(restaurant.id)) {
      toast.error('You can only order from one restaurant at a time. Please clear your cart first.')
      return
    }

    for (let i = 0; i < quantity; i++) {
      addItem({
        id: food.id,
        name: food.name,
        description: food.description,
        price: food.price,
        image: food.image,
        restaurantId: restaurant.id,
        restaurantName: restaurant.name,
        isVeg: food.isVegetarian || false
      })
    }

    toast.success(`${food.name} added to cart!`)
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Restaurant not found</h2>
          <Link to="/restaurants">
            <Button>Browse Restaurants</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Banner */}
      <div className="relative h-64 md:h-80">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
              <span className="font-medium">{restaurant.rating}</span>
            </div>
            <span>•</span>
            <span>{restaurant.cuisine}</span>
            <span>•</span>
            <span>{restaurant.location}</span>
          </div>
        </div>
      </div>

      {/* Restaurant Info Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-green-600">
                <Clock className="h-5 w-5 mr-2" />
                <span className="font-medium">{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium">{restaurant.costForTwo}</span>
              </div>
              <Badge>Open Now</Badge>
            </div>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleFavoriteClick}
                className={isFavorite ? 'border-red-600 text-red-600' : ''}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-600' : ''}`} />
                {isFavorite ? 'Saved' : 'Save'}
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="mt-6">
            {menuItems.length > 0 ? (
              <div className="space-y-8">
                {Object.entries(menuByCategory).map(([category, items]) => (
                  <div key={category}>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">{category}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {items.map((item) => (
                        <FoodCard
                          key={item.id}
                          {...item}
                          onAddToCart={(quantity) => handleAddToCart(item, quantity)}
                        />
                      ))}
                    </div>
                  </div>
                ))}

                {/* You May Also Like Section */}
                {similarItems.length > 0 && (
                  <div className="mt-12 pt-8 border-t">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
                    <div className="overflow-x-auto">
                      <div className="flex gap-4 pb-4">
                        {similarItems.map((item) => {
                          const itemRestaurant = RESTAURANTS.find(r => r.id === item.restaurantId)
                          return (
                            <Link key={item.id} to={`/restaurant/${item.restaurantId}`} className="flex-shrink-0 w-64">
                              <div className="bg-white rounded-3xl shadow-md hover:shadow-xl transition-all overflow-hidden">
                                <img src={item.image} alt={item.name} className="w-full h-36 object-cover" />
                                <div className="p-4">
                                  <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                                  <p className="text-xs text-gray-500 mb-2">{itemRestaurant?.name}</p>
                                  <span className="font-bold text-red-600">₹{item.price}</span>
                                </div>
                              </div>
                            </Link>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500">No menu items available</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ReviewSection 
              restaurantId={restaurant.id} 
              restaurantName={restaurant.name}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default RestaurantDetail

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import toast from 'react-hot-toast'

export interface FavoriteRestaurant {
  id: number
  name: string
  image: string
  cuisine: string
  rating: number
  deliveryTime: string
  costForTwo: string
}

export interface FavoriteFood {
  id: number
  name: string
  image: string
  price: number
  restaurantId: number
  restaurantName: string
}

interface FavoritesState {
  restaurants: FavoriteRestaurant[]
  foods: FavoriteFood[]
}

interface FavoritesContextType {
  favorites: FavoritesState
  addRestaurant: (restaurant: FavoriteRestaurant) => void
  removeRestaurant: (id: number) => void
  isRestaurantFavorite: (id: number) => boolean
  addFood: (food: FavoriteFood) => void
  removeFood: (id: number) => void
  isFoodFavorite: (id: number) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

interface FavoritesProviderProps {
  children: ReactNode
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favorites, setFavorites] = useState<FavoritesState>({
    restaurants: [],
    foods: []
  })

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('zomato-favorites')
    if (savedFavorites) {
      try {
        const parsed = JSON.parse(savedFavorites)
        setFavorites(parsed)
      } catch (error) {
        console.error('Error loading favorites:', error)
      }
    }
  }, [])

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('zomato-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addRestaurant = (restaurant: FavoriteRestaurant) => {
    setFavorites(prev => ({
      ...prev,
      restaurants: [...prev.restaurants, restaurant]
    }))
    toast.success(`${restaurant.name} added to favorites!`)
  }

  const removeRestaurant = (id: number) => {
    setFavorites(prev => ({
      ...prev,
      restaurants: prev.restaurants.filter(r => r.id !== id)
    }))
    toast.success('Removed from favorites')
  }

  const isRestaurantFavorite = (id: number): boolean => {
    return favorites.restaurants.some(r => r.id === id)
  }

  const addFood = (food: FavoriteFood) => {
    setFavorites(prev => ({
      ...prev,
      foods: [...prev.foods, food]
    }))
    toast.success(`${food.name} added to favorites!`)
  }

  const removeFood = (id: number) => {
    setFavorites(prev => ({
      ...prev,
      foods: prev.foods.filter(f => f.id !== id)
    }))
    toast.success('Removed from favorites')
  }

  const isFoodFavorite = (id: number): boolean => {
    return favorites.foods.some(f => f.id === id)
  }

  const value = {
    favorites,
    addRestaurant,
    removeRestaurant,
    isRestaurantFavorite,
    addFood,
    removeFood,
    isFoodFavorite
  }

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

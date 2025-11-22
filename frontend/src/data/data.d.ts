// Type definitions for data.js

export interface RestaurantHours {
  open: string
  close: string
  isOpen: boolean
}

export interface Restaurant {
  id: number
  name: string
  cuisine: string
  location: string
  image: string
  rating: number
  deliveryTime: string
  costForTwo: string
  isEcoFriendly?: boolean
  offer?: string
  hours?: RestaurantHours
  isOpen?: boolean
}

export interface FoodItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  restaurantId: number
  isVegetarian?: boolean
}

export interface Offer {
  id: number
  title: string
  description: string
  image: string
  discount: string
  validUntil: string
  minOrder: string
  code?: string
  maxDiscount?: string
  terms?: string
  isNew?: boolean
}

export interface DeliveryAgent {
  id: number
  name: string
  avatar: string
}

export const CUISINES: string[]
export const RESTAURANTS: Restaurant[]
export const FOOD_ITEMS: FoodItem[]
export const OFFERS: Offer[]
export const DELIVERY_AGENTS: DeliveryAgent[]

export function getMenuByRestaurantId(restaurantId: number): FoodItem[]
export function searchRestaurants(query: string): Restaurant[]
export function searchFoods(query: string): FoodItem[]

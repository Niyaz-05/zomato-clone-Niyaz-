// Smart recommendation engine for food items

import { FoodItem, Restaurant } from '../data/data.d'

export interface RecommendationContext {
  currentItem?: FoodItem
  cartItems?: FoodItem[]
  currentRestaurant?: Restaurant
  userPreferences?: string[]
}

export class RecommendationEngine {
  // Get similar items based on category and price range
  getSimilarItems(
    currentItem: FoodItem,
    allItems: FoodItem[],
    limit: number = 3
  ): FoodItem[] {
    const priceRange = currentItem.price * 0.3 // 30% price variance
    
    return allItems
      .filter(item => {
        // Exclude the current item
        if (item.id === currentItem.id) return false
        
        // Same category
        const sameCategory = item.category === currentItem.category
        
        // Similar price range
        const similarPrice = Math.abs(item.price - currentItem.price) <= priceRange
        
        // Same vegetarian preference
        const sameVegPreference = item.isVegetarian === currentItem.isVegetarian
        
        return sameCategory || similarPrice || sameVegPreference
      })
      .sort((a, b) => {
        // Score based on similarity
        let scoreA = 0
        let scoreB = 0
        
        if (a.category === currentItem.category) scoreA += 3
        if (b.category === currentItem.category) scoreB += 3
        
        if (Math.abs(a.price - currentItem.price) <= priceRange) scoreA += 2
        if (Math.abs(b.price - currentItem.price) <= priceRange) scoreB += 2
        
        if (a.isVegetarian === currentItem.isVegetarian) scoreA += 1
        if (b.isVegetarian === currentItem.isVegetarian) scoreB += 1
        
        return scoreB - scoreA
      })
      .slice(0, limit)
  }

  // Get complementary items (different category but goes well together)
  getComplementaryItems(
    currentItem: FoodItem,
    allItems: FoodItem[],
    limit: number = 3
  ): FoodItem[] {
    const complementaryCategories: Record<string, string[]> = {
      'Main Course': ['Appetizer', 'Beverage', 'Dessert'],
      'Appetizer': ['Main Course', 'Beverage'],
      'Dessert': ['Beverage'],
      'Beverage': ['Main Course', 'Appetizer', 'Dessert'],
      'Pizza': ['Beverage', 'Dessert'],
      'Burger': ['Beverage', 'Dessert'],
      'Biryani': ['Appetizer', 'Beverage'],
    }

    const targetCategories = complementaryCategories[currentItem.category] || []

    return allItems
      .filter(item => {
        if (item.id === currentItem.id) return false
        return targetCategories.includes(item.category)
      })
      .sort((a, b) => b.price - a.price) // Higher rated items first (assuming price correlates)
      .slice(0, limit)
  }

  // Smart search suggestions based on keywords
  getSmartSuggestions(query: string): string[] {
    const suggestions: Record<string, string[]> = {
      cold: ['Ice Cream', 'Cold Coffee', 'Smoothie', 'Milkshake', 'Iced Tea'],
      hot: ['Coffee', 'Tea', 'Soup', 'Hot Chocolate'],
      spicy: ['Biryani', 'Tacos', 'Curry', 'Spicy Chicken', 'Hot Wings'],
      sweet: ['Dessert', 'Ice Cream', 'Cake', 'Pastry', 'Donut'],
      healthy: ['Salad', 'Smoothie', 'Grilled Chicken', 'Fruit Bowl'],
      quick: ['Burger', 'Pizza', 'Sandwich', 'Wrap'],
      veg: ['Vegetarian', 'Salad', 'Veg Pizza', 'Veg Burger'],
      non: ['Chicken', 'Mutton', 'Fish', 'Egg'],
      breakfast: ['Pancakes', 'Omelette', 'Toast', 'Coffee'],
      lunch: ['Biryani', 'Curry', 'Rice', 'Roti'],
      dinner: ['Pizza', 'Pasta', 'Burger', 'Steak'],
      snack: ['Fries', 'Nachos', 'Wings', 'Samosa'],
    }

    const lowerQuery = query.toLowerCase()
    
    for (const [key, values] of Object.entries(suggestions)) {
      if (lowerQuery.includes(key)) {
        return values
      }
    }

    return []
  }

  // Get popular items from a restaurant
  getPopularFromRestaurant(
    restaurantId: number,
    allItems: FoodItem[],
    limit: number = 5
  ): FoodItem[] {
    return allItems
      .filter(item => item.restaurantId === restaurantId)
      .sort((a, b) => b.price - a.price) // Assuming higher price = more popular
      .slice(0, limit)
  }

  // Get trending items based on mock data
  getTrendingItems(allItems: FoodItem[], limit: number = 6): FoodItem[] {
    // Mock trending logic - in real app, this would be based on order frequency
    const trendingCategories = ['Pizza', 'Burger', 'Biryani', 'Dessert']
    
    return allItems
      .filter(item => trendingCategories.includes(item.category))
      .sort(() => Math.random() - 0.5) // Random shuffle
      .slice(0, limit)
  }
}

export const recommendationEngine = new RecommendationEngine()

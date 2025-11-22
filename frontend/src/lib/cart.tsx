import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: number
  name: string
  description: string
  price: number
  image: string
  quantity: number
  restaurantId: number
  restaurantName: string
  isVeg: boolean
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  restaurantId?: number // Track which restaurant items are from for ordering rules
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: { id: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.id === action.payload.id && item.restaurantId === action.payload.restaurantId
      )

      if (existingItemIndex > -1) {
        // Item already exists, update quantity
        const updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return calculateTotals({ ...state, items: updatedItems })
      } else {
        // New item, add to cart
        const newItem: CartItem = { ...action.payload, quantity: 1 }
        return calculateTotals({ ...state, items: [...state.items, newItem] })
      }
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(item => item.id !== action.payload.id)
      return calculateTotals({ ...state, items: updatedItems })
    }

    case 'UPDATE_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: { id: action.payload.id } })
      }

      const updatedItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
      return calculateTotals({ ...state, items: updatedItems })
    }

    case 'CLEAR_CART':
      return initialState

    case 'LOAD_CART':
      return calculateTotals({ ...state, items: action.payload })

    default:
      return state
  }
}

const calculateTotals = (state: CartState): CartState => {
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  // Check if all items are from the same restaurant
  const restaurantIds = [...new Set(state.items.map(item => item.restaurantId))]
  const restaurantId = restaurantIds.length === 1 ? restaurantIds[0] : undefined

  return {
    ...state,
    totalItems,
    totalPrice,
    restaurantId,
  }
}

interface CartContextType {
  state: CartState
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  isItemFromDifferentRestaurant: (restaurantId: number) => boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('zomato-cart')
    if (savedCart) {
      try {
        const cartItems: CartItem[] = JSON.parse(savedCart)
        dispatch({ type: 'LOAD_CART', payload: cartItems })
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('zomato-cart', JSON.stringify(state.items))

    // Dispatch custom event for components that listen to storage changes
    window.dispatchEvent(new CustomEvent('cartUpdated'))

    // Also update the floating cart button
    const floatingCartButton = document.querySelector('[data-cart-button]')
    if (floatingCartButton) {
      floatingCartButton.dispatchEvent(new CustomEvent('cartUpdated'))
    }
  }, [state.items])

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } })
  }

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const isItemFromDifferentRestaurant = (restaurantId: number): boolean => {
    return state.restaurantId !== undefined && state.restaurantId !== restaurantId && state.totalItems > 0
  }

  const value = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isItemFromDifferentRestaurant,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

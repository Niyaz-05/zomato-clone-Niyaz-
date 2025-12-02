export interface Restaurant {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  costForTwo: string;
  isEcoFriendly?: boolean;
  offer?: string;
  description?: string;
}

export interface FoodItem {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  restaurantId: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  spicyLevel?: string;
}

export interface Offer {
  id: number;
  title: string;
  description: string;
  image: string;
  discount: string;
  validTill: string;
  isLimited: boolean;
}

import axios from 'axios';

export interface Restaurant {
  id: number;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  costForTwo: string;
  isEcoFriendly?: boolean;
  offer?: string;
  description?: string;
}

export interface FoodItem {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  category: string;
  restaurantId: number;
  isVegetarian?: boolean;
  isVegan?: boolean;
  spicyLevel?: string;
}

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export interface LoginRequest {
  email: string;
  password: string;
}
export interface AddressRequest {
  label: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  description?: string;
  addresses?: AddressRequest[];
}
export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
  role: string;
  isVegetarian?: boolean;
}
export interface AuthResponse {
  token: string;
  user: User;
}

export const authAPI = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  signup: async (userData: SignupRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/signup', userData);
    return response.data;
  },

  logout: async (): Promise<string> => {
    const response = await api.post<string>('/auth/logout');
    return response.data;
  },

  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },
};

export const restaurantAPI = {
  getAllRestaurants: async (): Promise<Restaurant[]> => {
    const response = await api.get<Restaurant[]>('/restaurants/public/all');
    return response.data;
  },

  searchRestaurants: async (query: string): Promise<Restaurant[]> => {
    const response = await api.get<Restaurant[]>(`/restaurants/public/search?q=${encodeURIComponent(query)}`);
    return response.data;
  },

  getRestaurantById: async (id: number): Promise<Restaurant> => {
    const response = await api.get<Restaurant>(`/restaurants/public/${id}`);
    return response.data;
  },

  getOffers: async (): Promise<Offer[]> => {
    const response = await api.get<Offer[]>('/offers');
    return response.data;
  }
}

export const foodAPI = {
  searchFood: async (query: string): Promise<FoodItem[]> => {
    const response = await api.get<FoodItem[]>(`/food/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }
}

export const cartAPI = {
  addToCart: async (foodItemId: number, quantity: number): Promise<void> => {
    await api.post('/cart/add', { foodItemId, quantity });
  },

  removeFromCart: async (foodItemId: number): Promise<void> => {
    await api.delete(`/cart/remove/${foodItemId}`);
  },

  getCart: async (): Promise<any> => {
    const response = await api.get('/cart');
    return response.data;
  },

  updateQuantity: async (foodItemId: number, quantity: number): Promise<void> => {
    await api.put('/cart/update', { foodItemId, quantity });
  }
}

export interface PlaceOrderRequest {
  restaurantId: number;
  addressId: number;
  items: Array<{
    menuItemId: number;
    quantity: number;
    specialInstructions?: string;
  }>;
  paymentMethod: string;
  specialInstructions?: string;
}

export interface Order {
  id: number;
  orderNumber: string;
  restaurantId: number;
  totalPrice: number;
  deliveryFee: number;
  taxAmount: number;
  finalAmount: number;
  status: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  estimatedDeliveryTime: string;
}

export const orderAPI = {
  placeOrder: async (orderData: PlaceOrderRequest): Promise<Order> => {
    const response = await api.post<Order>('/orders/place', orderData);
    return response.data;
  },

  getOrderHistory: async (): Promise<Order[]> => {
    const response = await api.get<Order[]>('/orders/my-orders');
    return response.data;
  },

  getOrderById: async (orderId: number): Promise<Order> => {
    const response = await api.get<Order>(`/orders/${orderId}`);
    return response.data;
  }
}

export interface ReviewRequest {
  restaurantId: number;
  menuItemId?: number;
  rating: number;
  comment: string;
  images?: string[];
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  restaurantId: number;
  rating: number;
  comment: string;
  images?: string[];
  createdAt: string;
  isVerifiedPurchase?: boolean;
}

export const reviewAPI = {
  createReview: async (reviewData: ReviewRequest): Promise<Review> => {
    const response = await api.post<Review>('/reviews', reviewData);
    return response.data;
  },

  getRestaurantReviews: async (restaurantId: number): Promise<Review[]> => {
    const response = await api.get<Review[]>(`/reviews/restaurant/${restaurantId}`);
    return response.data;
  },

  getUserReviews: async (): Promise<Review[]> => {
    const response = await api.get<Review[]>('/reviews/user');
    return response.data;
  },

  updateReview: async (reviewId: number, reviewData: ReviewRequest): Promise<Review> => {
    const response = await api.put<Review>(`/reviews/${reviewId}`, reviewData);
    return response.data;
  },

  deleteReview: async (reviewId: number): Promise<void> => {
    await api.delete(`/reviews/${reviewId}`);
  }
}

export interface Address {
  id: number;
  label: string;
  address: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  latitude?: number;
  longitude?: number;
  isDefault: boolean;
  createdAt?: string;
}

export const addressAPI = {
  getAddresses: async (): Promise<Address[]> => {
    const response = await api.get<Address[]>('/users/addresses');
    return response.data;
  },

  addAddress: async (addressData: AddressRequest): Promise<Address> => {
    const response = await api.post<Address>('/users/addresses', addressData);
    return response.data;
  },

  updateAddress: async (addressId: number, addressData: AddressRequest): Promise<Address> => {
    const response = await api.put<Address>(`/users/addresses/${addressId}`, addressData);
    return response.data;
  },

  deleteAddress: async (addressId: number): Promise<void> => {
    await api.delete(`/users/addresses/${addressId}`);
  },

  setDefaultAddress: async (addressId: number): Promise<Address> => {
    const response = await api.put<Address>(`/users/addresses/${addressId}/set-default`);
    return response.data;
  }
}
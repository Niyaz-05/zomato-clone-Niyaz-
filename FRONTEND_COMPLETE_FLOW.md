# 🎯 Frontend Complete Flow & Architecture Documentation

## 📁 Folder Structure Overview

```
frontend/
├── src/
│   ├── main.tsx                 # Application Entry Point
│   ├── App.tsx                  # Root Component & Routing
│   ├── index.css                # Global Styles
│   │
│   ├── pages/                   # Page Components (Routes)
│   │   ├── Home.tsx
│   │   ├── RestaurantList.tsx
│   │   ├── RestaurantDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── Payment.tsx
│   │   ├── Login.tsx
│   │   ├── Signup.tsx
│   │   └── ... (30+ pages)
│   │
│   ├── components/              # Reusable UI Components
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── RestaurantCard.tsx
│   │   ├── FoodCard.tsx
│   │   ├── ReviewSection.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── ui/                  # Shadcn UI Components
│   │
│   ├── lib/                     # Core Libraries & Utilities
│   │   ├── api.ts              # API Client & Endpoints
│   │   ├── auth.tsx            # Authentication Context
│   │   ├── cart.tsx            # Cart Context
│   │   ├── favorites.tsx       # Favorites Context
│   │   ├── utils.ts            # Utility Functions
│   │   └── ... (other libs)
│   │
│   └── data/                    # Static Data
│       ├── data.js             # Mock Data (Restaurants, Foods)
│       └── data.d.ts           # TypeScript Definitions
│
├── public/                       # Static Assets
│   ├── manifest.json           # PWA Manifest
│   └── sw.js                    # Service Worker
│
└── package.json                 # Dependencies & Scripts
```

---

## 🚀 Application Flow (Step by Step)

### **1. Application Initialization**

```
main.tsx (Entry Point)
    ↓
1. Registers Service Worker (PWA)
2. Sets up Install Prompt
3. Wraps App with ThemeProvider
4. Renders App component
    ↓
App.tsx (Root Component)
    ↓
1. ErrorBoundary (Catches errors)
2. AuthProvider (Authentication state)
3. CartProvider (Cart state)
4. FavoritesProvider (Favorites state)
5. Router (React Router)
6. Global Components (Navbar, Footer, etc.)
7. Routes (Page components)
```

### **2. User Journey Flow**

#### **A. New User (Not Logged In)**

```
1. User visits → Home.tsx
   ↓
2. Clicks "Browse Restaurants" → RestaurantList.tsx
   ↓
3. Clicks restaurant → RestaurantDetail.tsx
   ↓
4. Adds item to cart → Cart Context updates
   ↓
5. Clicks "View Cart" → Cart.tsx
   ↓
6. Clicks "Place Order" → Redirects to Login.tsx
   ↓
7. User signs up → Signup.tsx
   ↓
8. After signup → Redirects to Home.tsx (logged in)
   ↓
9. Goes to Cart → Cart.tsx
   ↓
10. Clicks "Place Order" → Payment.tsx
   ↓
11. Selects payment method → Calls orderAPI.placeOrder()
   ↓
12. Order placed → Redirects to OrderTracking.tsx
```

#### **B. Returning User (Logged In)**

```
1. User visits → Home.tsx
   ↓
2. Navbar shows user name (from AuthContext)
   ↓
3. Clicks "Restaurants" → RestaurantList.tsx
   ↓
4. Searches/Filters → Updates state, filters restaurants
   ↓
5. Clicks restaurant → RestaurantDetail.tsx
   ↓
6. Views menu → Uses FoodCard components
   ↓
7. Adds to cart → Cart Context updates (localStorage)
   ↓
8. Clicks cart icon → Cart.tsx
   ↓
9. Reviews order → Cart.tsx shows items
   ↓
10. Clicks "Place Order" → Payment.tsx
   ↓
11. Selects address → Payment.tsx loads user addresses
   ↓
12. Selects payment → Calls orderAPI.placeOrder()
   ↓
13. Order saved to database → Redirects to OrderTracking.tsx
```

---

## 🔗 How Files Are Linked Together

### **1. Component Hierarchy**

```
App.tsx (Root)
├── ErrorBoundary
│   └── AuthProvider
│       └── CartProvider
│           └── FavoritesProvider
│               └── Router
│                   ├── KeyboardShortcuts (Global)
│                   ├── AnimatedBackground (Global)
│                   ├── Navbar (Global - All Pages)
│                   ├── AnimatedRoutes
│                   │   ├── Home.tsx
│                   │   ├── RestaurantList.tsx
│                   │   │   └── RestaurantCard.tsx (Multiple)
│                   │   │   └── FoodCard.tsx (Multiple)
│                   │   ├── RestaurantDetail.tsx
│                   │   │   └── FoodCard.tsx (Multiple)
│                   │   │   └── ReviewSection.tsx
│                   │   │       └── Review components
│                   │   ├── Cart.tsx
│                   │   ├── Payment.tsx
│                   │   └── ... (other pages)
│                   ├── Footer (Global - All Pages)
│                   ├── ScrollToTop (Global)
│                   ├── BottomNavigation (Global - Mobile)
│                   ├── FloatingCartButton (Global)
│                   ├── FloatingTrackOrderButton (Global)
│                   └── Toaster (Global - Toast notifications)
```

### **2. State Management Flow**

#### **Authentication State (auth.tsx)**

```
User Action → auth.tsx Context
    ↓
Login/Signup → Calls api.ts → Backend API
    ↓
Response → Stores token & user in localStorage
    ↓
Updates AuthContext state
    ↓
All components can access via useAuth() hook
    ↓
Navbar, ProtectedRoute, Profile, etc. use this state
```

#### **Cart State (cart.tsx)**

```
User Action → cart.tsx Context
    ↓
Add to Cart → Updates cart state
    ↓
Saves to localStorage (persistence)
    ↓
Cart.tsx reads from context
    ↓
FloatingCartButton shows count
    ↓
Payment.tsx uses cart state
```

#### **Favorites State (favorites.tsx)**

```
User Action → favorites.tsx Context
    ↓
Add/Remove Favorite → Updates favorites state
    ↓
Saves to localStorage
    ↓
RestaurantCard uses HeartButton
    ↓
Favorites.tsx page displays favorites
```

### **3. API Integration Flow**

```
Component (e.g., Payment.tsx)
    ↓
Calls function from lib/api.ts
    ↓
api.ts → axios instance
    ↓
Request Interceptor → Adds JWT token from localStorage
    ↓
HTTP Request → Backend API (http://localhost:8080/api/...)
    ↓
Response Interceptor → Handles 401 (logout)
    ↓
Returns data to component
    ↓
Component updates state → UI re-renders
```

### **4. Routing Flow**

```
User clicks link/navigates
    ↓
React Router (in App.tsx)
    ↓
Checks route path
    ↓
If ProtectedRoute → Checks authentication
    ↓
If authenticated → Renders component
    ↓
If not authenticated → Redirects to login
    ↓
AnimatePresence → Page transition animation
    ↓
Component renders
```

---

## 📄 File-by-File Explanation

### **Core Files**

#### **main.tsx** - Application Entry Point
```typescript
Purpose: First file that runs when app loads
Responsibilities:
- Registers Service Worker (PWA)
- Sets up PWA install prompt
- Wraps app with ThemeProvider (dark mode)
- Renders App component to DOM
```

#### **App.tsx** - Root Component
```typescript
Purpose: Main application structure
Responsibilities:
- Sets up all Context Providers (Auth, Cart, Favorites)
- Configures React Router
- Defines all routes
- Renders global components (Navbar, Footer, etc.)
- Handles page transitions with animations
```

### **Pages (Routes)**

#### **Home.tsx** - Landing Page
```typescript
Purpose: First page users see
Features:
- Hero section with CTA
- Browse by Cuisine
- Featured Restaurants
- Top Rated Restaurants
- Popular Dishes
Components Used: RestaurantCard, FoodCard
Data Source: data.js (RESTAURANTS, FOOD_ITEMS)
```

#### **RestaurantList.tsx** - Browse Restaurants
```typescript
Purpose: List/search all restaurants
Features:
- Search bar
- Cuisine filters
- Rating filters
- Price range filters
- Dietary filters
- Shows restaurants and food items
Components Used: RestaurantCard, FoodCard, SmartSearchBar
State: searchTerm, selectedCuisines, minRating, priceRange
```

#### **RestaurantDetail.tsx** - Restaurant Page
```typescript
Purpose: Show restaurant details and menu
Features:
- Restaurant info
- Menu by category
- Add to cart
- Reviews section
Components Used: FoodCard, ReviewSection
API Calls: restaurantAPI.getRestaurantById()
```

#### **Cart.tsx** - Shopping Cart
```typescript
Purpose: Review cart items before checkout
Features:
- List cart items
- Update quantities
- Apply coupons
- Add delivery tip
- Calculate totals
- Place order button
State: Uses CartContext
Navigation: → Payment.tsx
```

#### **Payment.tsx** - Payment Page
```typescript
Purpose: Select payment method and place order
Features:
- Payment method selection (COD, Card, UPI, Wallet, Net Banking)
- Address selection
- Order summary
- Card form (if card selected)
API Calls: orderAPI.placeOrder()
Navigation: → OrderTracking.tsx
```

#### **Login.tsx** - Login Page
```typescript
Purpose: User authentication
Features:
- Email/password form
- Link to signup
- Link to forgot password
- Link to social login
API Calls: authAPI.login()
State: Uses AuthContext
Navigation: → Home.tsx (after login)
```

#### **Signup.tsx** - Registration Page
```typescript
Purpose: New user registration
Features:
- Name, email, password, phone
- Address management (add multiple)
- Form validation
API Calls: authAPI.signup()
Navigation: → Home.tsx (after signup)
```

### **Components**

#### **Navbar.tsx** - Navigation Bar
```typescript
Purpose: Global navigation
Features:
- Logo
- Search bar
- Navigation links
- User menu (if logged in)
- Cart icon with count
- Notifications icon
State: Uses AuthContext, CartContext
```

#### **RestaurantCard.tsx** - Restaurant Card
```typescript
Purpose: Display restaurant in list
Props: id, name, cuisine, image, rating, deliveryTime, costForTwo
Features:
- Restaurant image
- Rating display
- Open/Closed status
- Favorite button
- Hover animations
Navigation: → RestaurantDetail.tsx
```

#### **FoodCard.tsx** - Food Item Card
```typescript
Purpose: Display food item
Props: id, name, price, image, isVegetarian
Features:
- Food image
- Price
- Veg/Non-veg badge
- Quantity selector
- Add to cart button
State: Updates CartContext
```

#### **ReviewSection.tsx** - Reviews Component
```typescript
Purpose: Show and create reviews
Features:
- Display reviews
- Write review form
- Star rating
- Photo upload (up to 5)
- Helpful button
API Calls: reviewAPI.createReview(), reviewAPI.getRestaurantReviews()
```

#### **ProtectedRoute.tsx** - Route Guard
```typescript
Purpose: Protect routes based on authentication
Logic:
- If requireAuth=true and not logged in → Redirect to login
- If requireAuth=false and logged in → Redirect to home
- Otherwise → Render component
```

### **Libraries (lib/)**

#### **api.ts** - API Client
```typescript
Purpose: Centralized API communication
Features:
- Axios instance with base URL
- Request interceptor (adds JWT token)
- Response interceptor (handles 401)
- API functions: authAPI, restaurantAPI, orderAPI, reviewAPI
```

#### **auth.tsx** - Authentication Context
```typescript
Purpose: Manage authentication state
Features:
- Login function
- Signup function
- Logout function
- User state
- isAuthenticated flag
Storage: localStorage (token, user)
```

#### **cart.tsx** - Cart Context
```typescript
Purpose: Manage shopping cart state
Features:
- Add item
- Remove item
- Update quantity
- Clear cart
- Calculate totals
Storage: localStorage (zomato-cart)
```

#### **favorites.tsx** - Favorites Context
```typescript
Purpose: Manage favorites state
Features:
- Add restaurant to favorites
- Remove from favorites
- Check if favorite
Storage: localStorage (zomato-favorites)
```

#### **utils.ts** - Utility Functions
```typescript
Purpose: Helper functions
Features:
- cn() - Class name utility (Tailwind)
- formatCurrency()
- formatDate()
- etc.
```

### **Data**

#### **data.js** - Mock Data
```typescript
Purpose: Static data for development
Contains:
- RESTAURANTS array (21 restaurants)
- FOOD_ITEMS array (40+ items)
- OFFERS array
- DELIVERY_AGENTS array
- CUISINES array
Helper Functions:
- searchRestaurants()
- searchFoods()
- getMenuByRestaurantId()
```

---

## 🔄 Complete Data Flow Examples

### **Example 1: User Places Order**

```
1. User on RestaurantDetail.tsx
   ↓
2. Clicks "Add to Cart" on FoodCard
   ↓
3. FoodCard calls: addItem() from CartContext
   ↓
4. CartContext updates state + localStorage
   ↓
5. FloatingCartButton shows updated count
   ↓
6. User clicks cart icon → Navigates to Cart.tsx
   ↓
7. Cart.tsx reads from CartContext
   ↓
8. User clicks "Place Order" → Navigates to Payment.tsx
   ↓
9. Payment.tsx:
   - Loads user addresses (API call)
   - Shows payment methods
   - User selects address & payment
   ↓
10. User clicks "Pay" → Calls orderAPI.placeOrder()
   ↓
11. api.ts:
   - Adds JWT token to request
   - Sends POST to /api/orders/place
   ↓
12. Backend:
   - Extracts user from JWT
   - Creates order with user_id
   - Saves to database
   ↓
13. Response → Payment.tsx
   ↓
14. Payment.tsx:
   - Clears cart
   - Shows success toast
   - Navigates to OrderTracking.tsx
```

### **Example 2: User Writes Review**

```
1. User on RestaurantDetail.tsx
   ↓
2. Scrolls to ReviewSection
   ↓
3. Clicks "Write Review"
   ↓
4. ReviewSection shows form
   ↓
5. User:
   - Selects rating (1-5 stars)
   - Writes comment
   - Uploads photos (optional)
   ↓
6. User clicks "Submit Review"
   ↓
7. ReviewSection calls: reviewAPI.createReview()
   ↓
8. api.ts:
   - Adds JWT token
   - Sends POST to /api/reviews
   ↓
9. Backend:
   - Extracts user from JWT
   - Creates review with user_id
   - Saves to database
   ↓
10. Response → ReviewSection
   ↓
11. ReviewSection:
   - Updates local state
   - Shows review in list
   - Shows success toast
```

### **Example 3: User Searches Restaurants**

```
1. User on RestaurantList.tsx
   ↓
2. Types in search bar
   ↓
3. searchTerm state updates
   ↓
4. useEffect triggers
   ↓
5. Calls searchRestaurants() from data.js
   ↓
6. Filters RESTAURANTS array
   ↓
7. Updates filteredRestaurants state
   ↓
8. Component re-renders
   ↓
9. Maps filteredRestaurants → RestaurantCard components
   ↓
10. User clicks restaurant → Navigates to RestaurantDetail.tsx
```

---

## 🎨 Component Communication Patterns

### **1. Props (Parent → Child)**
```
RestaurantList.tsx
  └── RestaurantCard (receives: id, name, rating, etc.)
      └── HeartButton (receives: isLiked, onToggle)
```

### **2. Context (Global State)**
```
AuthProvider (provides: user, login, logout)
  └── Navbar (uses: useAuth())
  └── Profile (uses: useAuth())
  └── ProtectedRoute (uses: useAuth())
```

### **3. Callbacks (Child → Parent)**
```
FoodCard
  └── onAddToCart callback
      └── RestaurantDetail handles it
          └── Calls CartContext.addItem()
```

### **4. Navigation (React Router)**
```
Component
  └── useNavigate() hook
      └── navigate('/path')
          └── Router updates URL
              └── Matching route renders
```

---

## 🔐 Authentication Flow

```
1. User visits /login
   ↓
2. Enters credentials
   ↓
3. Login.tsx calls authAPI.login()
   ↓
4. api.ts sends POST to /api/auth/login
   ↓
5. Backend validates → Returns JWT + user data
   ↓
6. auth.tsx:
   - Stores token in localStorage
   - Stores user in localStorage
   - Updates AuthContext state
   ↓
7. ProtectedRoute checks isAuthenticated
   ↓
8. User can access protected pages
   ↓
9. All API calls include JWT token (via interceptor)
   ↓
10. Backend extracts user from JWT
```

---

## 🛒 Cart Flow

```
1. User adds item → CartContext.addItem()
   ↓
2. CartContext:
   - Updates state
   - Saves to localStorage
   - Notifies subscribers
   ↓
3. Components using cart:
   - FloatingCartButton (shows count)
   - Cart.tsx (shows items)
   - Navbar (shows count)
   ↓
4. User removes item → CartContext.removeItem()
   ↓
5. State updates → UI re-renders
   ↓
6. User places order → Cart cleared
```

---

## 📱 Routing Structure

```
/ (Home)
├── /restaurants (RestaurantList)
│   └── /restaurant/:id (RestaurantDetail)
├── /cart (Cart)
├── /payment (Payment) [Protected]
├── /track-order/:id (OrderTracking)
├── /order-history (OrderHistory) [Protected]
├── /favorites (Favorites) [Protected]
├── /addresses (AddressManagement) [Protected]
├── /profile (Profile) [Protected]
├── /loyalty (LoyaltyProgram) [Protected]
├── /login (Login) [Redirects if logged in]
├── /signup (Signup) [Redirects if logged in]
├── /forgot-password (ForgotPassword)
├── /verify-email (EmailVerification)
├── /social-login (SocialLogin)
└── * (NotFound - 404)
```

---

## 🎯 Key Concepts

### **1. Context API (State Management)**
- **AuthContext**: User authentication state
- **CartContext**: Shopping cart state
- **FavoritesContext**: Favorites state
- All use React Context API for global state

### **2. React Router (Navigation)**
- Client-side routing
- URL-based navigation
- Protected routes with authentication
- Animated page transitions

### **3. Axios (HTTP Client)**
- Centralized API client
- Request/Response interceptors
- Automatic JWT token injection
- Error handling

### **4. LocalStorage (Persistence)**
- Token storage
- User data storage
- Cart persistence
- Favorites persistence

### **5. Framer Motion (Animations)**
- Page transitions
- Component animations
- Hover effects
- Loading states

---

## 📊 Component Dependency Graph

```
App.tsx
├── Depends on: All providers, Router, Global components
│
AuthProvider
├── Depends on: api.ts (authAPI)
│
CartProvider
├── Depends on: localStorage
│
FavoritesProvider
├── Depends on: localStorage
│
Navbar
├── Depends on: AuthContext, CartContext, useNavigate
│
RestaurantList
├── Depends on: data.js, RestaurantCard, FoodCard, CartContext
│
RestaurantDetail
├── Depends on: FoodCard, ReviewSection, CartContext
│
Cart
├── Depends on: CartContext, useNavigate
│
Payment
├── Depends on: CartContext, AuthContext, orderAPI, useNavigate
│
ReviewSection
├── Depends on: AuthContext, reviewAPI
```

---

## 🚦 Request Flow Diagram

```
User Action
    ↓
Component Event Handler
    ↓
Context Function OR API Call
    ↓
If API Call:
    api.ts (axios)
        ↓
    Request Interceptor (adds JWT)
        ↓
    HTTP Request → Backend
        ↓
    Response Interceptor (handles errors)
        ↓
    Returns data
        ↓
Component updates state
        ↓
UI re-renders
```

---

## 💡 Best Practices Used

1. **Separation of Concerns**
   - Pages = Routes
   - Components = Reusable UI
   - Lib = Business logic

2. **Context API for Global State**
   - Avoids prop drilling
   - Centralized state management

3. **TypeScript for Type Safety**
   - Interfaces for all data
   - Type checking

4. **Component Composition**
   - Small, reusable components
   - Props for customization

5. **Error Handling**
   - ErrorBoundary for React errors
   - API error handling in interceptors
   - Toast notifications for user feedback

---

## 🔧 Development Workflow

```
1. Start dev server: npm run dev
   ↓
2. Vite compiles TypeScript/React
   ↓
3. Browser loads index.html
   ↓
4. main.tsx executes
   ↓
5. App.tsx renders
   ↓
6. Router matches URL to route
   ↓
7. Page component renders
   ↓
8. Components fetch data (API or data.js)
   ↓
9. UI updates
   ↓
10. User interacts → State updates → Re-render
```

---

## 📝 Summary

**Frontend Architecture:**
- ✅ React 18 with TypeScript
- ✅ React Router for navigation
- ✅ Context API for state management
- ✅ Axios for API calls
- ✅ Framer Motion for animations
- ✅ Tailwind CSS for styling
- ✅ LocalStorage for persistence
- ✅ PWA support

**Data Flow:**
- User Action → Component → Context/API → State Update → UI Re-render

**Key Files:**
- `main.tsx` - Entry point
- `App.tsx` - Root & routing
- `lib/api.ts` - API client
- `lib/auth.tsx` - Authentication
- `lib/cart.tsx` - Cart management
- `pages/` - All routes
- `components/` - Reusable UI

**Everything is connected through:**
1. React Context (state)
2. React Router (navigation)
3. Props (component communication)
4. API calls (backend integration)

---

## 🔍 Import Relationships (How Files Connect)

### **main.tsx Imports**
```typescript
import App from './App.tsx'           // Root component
import ThemeProvider from './lib/theme-provider.tsx'  // Dark mode
import { registerServiceWorker } from './lib/pwa'     // PWA
```

### **App.tsx Imports**
```typescript
// Routing
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Context Providers
import { AuthProvider } from './lib/auth'
import { CartProvider } from './lib/cart'
import { FavoritesProvider } from './lib/favorites'

// Global Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ErrorBoundary from './components/ErrorBoundary'

// Pages (Routes)
import Home from './pages/Home'
import RestaurantList from './pages/RestaurantList'
import RestaurantDetail from './pages/RestaurantDetail'
// ... (all other pages)
```

### **RestaurantList.tsx Imports**
```typescript
// Data
import { RESTAURANTS, CUISINES, FOOD_ITEMS } from '../data/data'

// Components
import RestaurantCard from '../components/RestaurantCard'
import FoodCard from '../components/FoodCard'

// Hooks
import { useCart } from '../lib/cart'
import { useSearchParams } from 'react-router-dom'
```

### **RestaurantDetail.tsx Imports**
```typescript
// Data
import { getMenuByRestaurantId } from '../data/data'

// Components
import FoodCard from '../components/FoodCard'
import ReviewSection from '../components/ReviewSection'

// Hooks
import { useCart } from '../lib/cart'
import { useParams } from 'react-router-dom'
```

### **Payment.tsx Imports**
```typescript
// API
import { orderAPI, PlaceOrderRequest } from '../lib/api'

// Hooks
import { useCart } from '../lib/cart'
import { useAuth } from '../lib/auth'
import { useNavigate, useLocation } from 'react-router-dom'
```

### **Navbar.tsx Imports**
```typescript
// Hooks
import { useAuth } from '../lib/auth'
import { useCart } from '../lib/cart'
import { useNavigate } from 'react-router-dom'

// Components
import { Button } from './ui/button'
import ThemeToggle from './ThemeToggle'
```

---

## 📊 Visual Flow Diagrams

### **Application Initialization Flow**
```
┌─────────────┐
│  Browser    │
│  Loads App  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  index.html │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  main.tsx   │ ◄── Entry Point
└──────┬──────┘
       │
       ├──► Register Service Worker
       ├──► Setup PWA
       └──► Render App
            │
            ▼
┌─────────────┐
│  App.tsx    │ ◄── Root Component
└──────┬──────┘
       │
       ├──► ErrorBoundary
       │     └──► AuthProvider
       │           └──► CartProvider
       │                 └──► FavoritesProvider
       │                       └──► Router
       │                             │
       │                             ├──► Navbar (Global)
       │                             ├──► Routes
       │                             │     ├──► Home
       │                             │     ├──► RestaurantList
       │                             │     └──► ...
       │                             ├──► Footer (Global)
       │                             └──► FloatingButtons
```

### **User Authentication Flow**
```
┌──────────────┐
│  Login.tsx   │
└──────┬───────┘
       │ User enters credentials
       ▼
┌──────────────┐
│  auth.tsx    │
│  login()     │
└──────┬───────┘
       │
       ▼
┌──────────────┐
│  api.ts      │
│  authAPI     │
└──────┬───────┘
       │ POST /api/auth/login
       ▼
┌──────────────┐
│  Backend     │
│  Validates   │
└──────┬───────┘
       │ Returns JWT + User
       ▼
┌──────────────┐
│  auth.tsx    │
│  Stores:     │
│  - token     │
│  - user      │
└──────┬───────┘
       │ Updates Context
       ▼
┌──────────────┐
│  All         │
│  Components  │
│  Can Access  │
│  via useAuth │
└──────────────┘
```

### **Add to Cart Flow**
```
┌─────────────────┐
│ RestaurantDetail│
│  or             │
│  RestaurantList │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   FoodCard      │
│  User clicks    │
│  "Add to Cart"  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  cart.tsx       │
│  addItem()      │
└────────┬────────┘
         │
         ├──► Updates State
         ├──► Saves to localStorage
         └──► Notifies Subscribers
              │
              ▼
┌─────────────────┐
│  Components     │
│  Re-render:     │
│  - Cart.tsx     │
│  - Navbar       │
│  - FloatingCart │
└─────────────────┘
```

### **Order Placement Flow**
```
┌─────────────┐
│   Cart.tsx  │
└──────┬──────┘
       │ User clicks "Place Order"
       ▼
┌─────────────┐
│ Payment.tsx │
└──────┬──────┘
       │
       ├──► Loads user addresses (API)
       ├──► Shows payment methods
       └──► User selects & pays
            │
            ▼
┌─────────────┐
│  api.ts     │
│ orderAPI    │
└──────┬──────┘
       │ POST /api/orders/place
       │ Headers: Authorization: Bearer <token>
       ▼
┌─────────────┐
│  Backend    │
│  - Extracts │
│    user ID  │
│  - Creates  │
│    order    │
└──────┬──────┘
       │ Returns order
       ▼
┌─────────────┐
│ Payment.tsx │
│ - Clears    │
│   cart      │
│ - Shows     │
│   success   │
└──────┬──────┘
       │ Navigate
       ▼
┌─────────────┐
│OrderTracking│
└─────────────┘
```

---

## 🗂️ File Organization Principles

### **Pages Folder** (`src/pages/`)
- **Purpose**: One file = One route
- **Naming**: PascalCase (e.g., `RestaurantList.tsx`)
- **Structure**: Each page is a complete route component
- **Dependencies**: Can import from `components/`, `lib/`, `data/`

### **Components Folder** (`src/components/`)
- **Purpose**: Reusable UI components
- **Naming**: PascalCase (e.g., `RestaurantCard.tsx`)
- **Structure**: Self-contained, reusable components
- **Dependencies**: Can import from `lib/`, other components

### **Lib Folder** (`src/lib/`)
- **Purpose**: Business logic, utilities, contexts
- **Naming**: camelCase (e.g., `auth.tsx`, `api.ts`)
- **Structure**: Pure functions, contexts, utilities
- **Dependencies**: Can import from other `lib/` files

### **Data Folder** (`src/data/`)
- **Purpose**: Static/mock data
- **Naming**: camelCase (e.g., `data.js`, `data.d.ts`)
- **Structure**: Data arrays, helper functions
- **Dependencies**: No dependencies (pure data)

---

## 🔄 State Management Architecture

### **Context Providers Hierarchy**
```
App.tsx
└── ErrorBoundary
    └── AuthProvider (lib/auth.tsx)
        └── CartProvider (lib/cart.tsx)
            └── FavoritesProvider (lib/favorites.tsx)
                └── Router
                    └── All Components
```

### **State Flow**
```
Component
    │
    ├──► Reads State: useAuth(), useCart(), useFavorites()
    │
    ├──► Updates State: login(), addItem(), addFavorite()
    │
    └──► State Change → All Subscribers Re-render
```

### **Persistence Strategy**
```
State Update
    │
    ├──► Update Context State (React)
    │
    └──► Save to localStorage (Persistence)
         │
         └──► On App Reload → Load from localStorage
```

---

## 🌐 API Integration Pattern

### **Request Flow**
```
Component
    │
    ├──► Calls function from lib/api.ts
    │    (e.g., orderAPI.placeOrder())
    │
    ▼
lib/api.ts
    │
    ├──► Request Interceptor
    │    └──► Adds JWT token from localStorage
    │
    ├──► Axios sends HTTP request
    │    └──► POST /api/orders/place
    │
    ▼
Backend API
    │
    ├──► Extracts user from JWT
    │
    ├──► Processes request
    │
    └──► Returns response
         │
         ▼
lib/api.ts
    │
    ├──► Response Interceptor
    │    └──► Handles 401 (logout)
    │
    └──► Returns data to component
         │
         ▼
Component
    │
    └──► Updates state → UI re-renders
```

---

## 🎯 Component Reusability

### **Reusable Components Used Across Pages**

1. **RestaurantCard**
   - Used in: `Home.tsx`, `RestaurantList.tsx`, `Favorites.tsx`
   - Props: Restaurant data
   - Features: Favorite button, navigation

2. **FoodCard**
   - Used in: `Home.tsx`, `RestaurantList.tsx`, `RestaurantDetail.tsx`
   - Props: Food item data
   - Features: Add to cart, quantity selector

3. **Button** (from `ui/button.tsx`)
   - Used in: Almost every page
   - Features: Variants, sizes, animations

4. **LazyImage**
   - Used in: `RestaurantCard.tsx`, `FoodCard.tsx`, `ReviewSection.tsx`
   - Features: Lazy loading, placeholder

---

## 📱 Responsive Design Flow

### **Mobile vs Desktop**

```
Screen Size Detection (Tailwind)
    │
    ├──► Mobile (< 768px)
    │    └──► BottomNavigation shows
    │    └──► Mobile menu in Navbar
    │
    └──► Desktop (≥ 768px)
         └──► Full Navbar shows
         └──► Sidebar layouts
```

---

## 🎨 Styling Architecture

### **Tailwind CSS Classes**
- Utility-first CSS
- Responsive: `md:`, `lg:` prefixes
- Dark mode: `dark:` prefix
- Custom animations via `tailwindcss-animate`

### **Component Styling**
- Inline Tailwind classes
- `cn()` utility for conditional classes
- Variants via `class-variance-authority`

---

## 🔐 Security Flow

### **Protected Routes**
```
User navigates to /payment
    │
    ▼
ProtectedRoute checks:
    │
    ├──► Is authenticated? (useAuth())
    │    │
    │    ├──► Yes → Render Payment.tsx
    │    │
    │    └──► No → Redirect to /login
    │
    └──► requireAuth=false?
         │
         └──► Yes + Authenticated → Redirect to /
```

### **API Security**
```
Component makes API call
    │
    ▼
api.ts interceptor
    │
    ├──► Gets token from localStorage
    │
    ├──► Adds to header: Authorization: Bearer <token>
    │
    └──► Sends request
         │
         ▼
Backend validates token
    │
    ├──► Valid → Processes request
    │
    └──► Invalid → Returns 401
         │
         ▼
api.ts response interceptor
    │
    └──► 401 → Clears localStorage → Redirects to /login
```

---

## 🚀 Performance Optimizations

### **Lazy Loading**
- Images: `LazyImage` component uses Intersection Observer
- Routes: Could use `React.lazy()` for code splitting

### **Memoization**
- Context values memoized to prevent unnecessary re-renders
- Component memoization where needed

### **PWA Features**
- Service Worker caches assets
- Offline support
- Install prompt

---

## 📋 Complete File Dependency Map

```
main.tsx
└── App.tsx
    ├── lib/auth.tsx
    │   └── lib/api.ts
    ├── lib/cart.tsx
    ├── lib/favorites.tsx
    ├── components/Navbar.tsx
    │   ├── lib/auth.tsx
    │   ├── lib/cart.tsx
    │   └── components/ui/button.tsx
    ├── components/Footer.tsx
    ├── pages/Home.tsx
    │   ├── data/data.js
    │   ├── components/RestaurantCard.tsx
    │   │   ├── lib/favorites.tsx
    │   │   └── components/HeartButton.tsx
    │   └── components/FoodCard.tsx
    │       ├── lib/cart.tsx
    │       └── components/LazyImage.tsx
    ├── pages/RestaurantList.tsx
    │   ├── data/data.js
    │   ├── components/RestaurantCard.tsx
    │   └── components/FoodCard.tsx
    ├── pages/RestaurantDetail.tsx
    │   ├── data/data.js
    │   ├── components/FoodCard.tsx
    │   └── components/ReviewSection.tsx
    │       ├── lib/auth.tsx
    │       └── lib/api.ts
    ├── pages/Cart.tsx
    │   ├── lib/cart.tsx
    │   └── lib/api.ts
    └── pages/Payment.tsx
        ├── lib/cart.tsx
        ├── lib/auth.tsx
        └── lib/api.ts
```

---

## 🎓 Learning Path

### **For New Developers**

1. **Start Here:**
   - `main.tsx` - Understand entry point
   - `App.tsx` - Understand routing and providers

2. **Then Learn:**
   - `lib/auth.tsx` - How authentication works
   - `lib/api.ts` - How API calls work
   - `components/ProtectedRoute.tsx` - How route protection works

3. **Then Explore:**
   - `pages/Home.tsx` - Simple page example
   - `pages/RestaurantList.tsx` - Page with state and filters
   - `pages/Payment.tsx` - Page with API integration

4. **Finally:**
   - `components/RestaurantCard.tsx` - Reusable component
   - `lib/cart.tsx` - Context API example

---

## ✅ Summary

**Frontend is organized as:**
- **Pages** = Routes (what user sees)
- **Components** = Reusable UI pieces
- **Lib** = Business logic & utilities
- **Data** = Static/mock data

**Everything connects through:**
- React Context (global state)
- React Router (navigation)
- Props (component communication)
- API calls (backend integration)
- LocalStorage (persistence)

**Flow is:**
- User Action → Component → Context/API → State Update → UI Re-render

**All user data is correlated by:**
- JWT token (authentication)
- User ID from token (database correlation)
- Context state (UI state)

---

*This is the complete frontend architecture and flow documentation!* 🎉


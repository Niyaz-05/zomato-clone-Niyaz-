# ⚡ Frontend Quick Reference Guide

## 📁 Folder Structure (What Each Folder Does)

```
frontend/src/
├── main.tsx              → Entry point, initializes app
├── App.tsx               → Root component, routing, providers
├── index.css             → Global styles
│
├── pages/                → Route components (one file = one route)
│   ├── Home.tsx          → Landing page
│   ├── RestaurantList.tsx → Browse/search restaurants
│   ├── RestaurantDetail.tsx → Restaurant page with menu
│   ├── Cart.tsx          → Shopping cart
│   ├── Payment.tsx       → Payment & order placement
│   ├── Login.tsx         → User login
│   ├── Signup.tsx        → User registration
│   └── ... (30+ pages)
│
├── components/           → Reusable UI components
│   ├── Navbar.tsx       → Top navigation bar
│   ├── Footer.tsx       → Bottom footer
│   ├── RestaurantCard.tsx → Restaurant display card
│   ├── FoodCard.tsx     → Food item display card
│   ├── ReviewSection.tsx → Reviews component
│   ├── ProtectedRoute.tsx → Route guard
│   └── ui/              → Shadcn UI components (buttons, cards, etc.)
│
├── lib/                 → Core libraries & utilities
│   ├── api.ts           → API client (axios), all API calls
│   ├── auth.tsx         → Authentication context
│   ├── cart.tsx         → Shopping cart context
│   ├── favorites.tsx    → Favorites context
│   ├── utils.ts         → Helper functions
│   └── ... (other utilities)
│
└── data/                → Static/mock data
    ├── data.js          → Restaurants, foods, offers data
    └── data.d.ts        → TypeScript type definitions
```

---

## 🔄 How It All Works Together

### **1. App Starts**
```
main.tsx → App.tsx → Providers → Router → Routes → Pages
```

### **2. User Navigates**
```
Click link → Router updates URL → Route matches → Page renders
```

### **3. User Adds to Cart**
```
FoodCard → CartContext.addItem() → State updates → UI re-renders
```

### **4. User Places Order**
```
Payment.tsx → orderAPI.placeOrder() → Backend API → Database
```

### **5. User Writes Review**
```
ReviewSection → reviewAPI.createReview() → Backend API → Database
```

---

## 🔗 File Connections

### **App.tsx connects to:**
- All pages (imports and routes them)
- All providers (AuthProvider, CartProvider, FavoritesProvider)
- Global components (Navbar, Footer, etc.)

### **Pages connect to:**
- Components (RestaurantCard, FoodCard, etc.)
- Contexts (useAuth, useCart, useFavorites)
- API (orderAPI, reviewAPI, etc.)
- Data (data.js for mock data)

### **Components connect to:**
- Other components (composition)
- Contexts (for state)
- Hooks (useNavigate, useParams, etc.)

### **lib/api.ts connects to:**
- All API endpoints
- Backend (http://localhost:8080/api)
- All pages that need API calls

---

## 🎯 Common Patterns

### **Pattern 1: Using Context**
```typescript
// In any component
import { useAuth } from '../lib/auth'
import { useCart } from '../lib/cart'

const MyComponent = () => {
  const { user, isAuthenticated } = useAuth()
  const { items, addItem } = useCart()
  // Use the state/functions
}
```

### **Pattern 2: Making API Calls**
```typescript
// In any component
import { orderAPI } from '../lib/api'

const MyComponent = () => {
  const handleOrder = async () => {
    const order = await orderAPI.placeOrder(orderData)
    // Handle response
  }
}
```

### **Pattern 3: Navigation**
```typescript
// In any component
import { useNavigate } from 'react-router-dom'

const MyComponent = () => {
  const navigate = useNavigate()
  navigate('/restaurants')
}
```

### **Pattern 4: Route Parameters**
```typescript
// In page component
import { useParams } from 'react-router-dom'

const RestaurantDetail = () => {
  const { id } = useParams()
  // Use id to fetch restaurant data
}
```

---

## 📋 File Purpose Summary

| File/Folder | Purpose | Used By |
|------------|---------|---------|
| `main.tsx` | App entry point | Browser |
| `App.tsx` | Root component, routing | main.tsx |
| `pages/` | Route components | App.tsx (routing) |
| `components/` | Reusable UI | Pages, other components |
| `lib/api.ts` | API communication | All pages |
| `lib/auth.tsx` | Authentication | All components |
| `lib/cart.tsx` | Cart state | Cart-related components |
| `lib/favorites.tsx` | Favorites state | Favorite-related components |
| `data/data.js` | Mock data | Pages (for development) |

---

## 🚀 Quick Start Guide

### **To add a new page:**
1. Create file in `pages/` (e.g., `MyPage.tsx`)
2. Add route in `App.tsx`: `<Route path="/my-page" element={<MyPage />} />`
3. Add link in Navbar or other component

### **To add a new component:**
1. Create file in `components/` (e.g., `MyComponent.tsx`)
2. Import and use in pages/components

### **To add a new API call:**
1. Add function in `lib/api.ts` (e.g., `myAPI.getData()`)
2. Use in component: `await myAPI.getData()`

### **To add a new context:**
1. Create file in `lib/` (e.g., `myContext.tsx`)
2. Wrap App.tsx with provider
3. Use hook in components: `useMyContext()`

---

## 🔍 Finding Things

### **Where is authentication handled?**
→ `lib/auth.tsx` (context) + `components/ProtectedRoute.tsx` (route guard)

### **Where are API calls made?**
→ `lib/api.ts` (all API functions)

### **Where is cart state managed?**
→ `lib/cart.tsx` (context)

### **Where are routes defined?**
→ `App.tsx` (Routes component)

### **Where is navigation handled?**
→ React Router (via `useNavigate` hook)

### **Where is data stored?**
→ localStorage (token, user, cart, favorites) + Database (orders, reviews, addresses)

---

## 🎨 Styling

- **Framework**: Tailwind CSS
- **Utility**: `cn()` from `lib/utils.ts` (combines classes)
- **Responsive**: `md:`, `lg:` prefixes
- **Dark mode**: `dark:` prefix
- **Animations**: Framer Motion

---

## 🔐 Security

- **Authentication**: JWT tokens in localStorage
- **Route Protection**: ProtectedRoute component
- **API Security**: JWT token in Authorization header
- **User Data**: Extracted from JWT (cannot be spoofed)

---

## 📊 State Management

- **Global State**: React Context API
- **Local State**: useState hook
- **Persistence**: localStorage
- **No Redux**: Uses Context API instead

---

## 🌐 API Integration

- **Base URL**: `http://localhost:8080/api`
- **Client**: Axios (configured in `lib/api.ts`)
- **Token**: Automatically added to requests
- **Error Handling**: Interceptors handle 401 (logout)

---

*Quick reference for understanding the frontend structure!* ⚡


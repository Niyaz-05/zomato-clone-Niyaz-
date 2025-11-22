# 🍕 Zomato Clone - Modern Food Delivery App

A fully functional, visually stunning Zomato clone built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**.

![Tech Stack](https://img.shields.io/badge/React-18.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-cyan)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.2-purple)

## ✨ Features

### 🏠 Home Page
- **Vibrant gradient hero** with animated CTAs
- **Browse by Cuisine** with emoji icons (9 categories)
- **Featured Restaurants** grid with curved cards
- **Top Rated Carousel** with auto-play
- **Popular Dishes** showcase
- Multiple gradient background sections

### 🔍 Smart Search & Filtering
- **Unified Search**: Search both restaurants AND food items simultaneously
- **Real-time Filtering**: Cuisine filters, rating filters (3.5★+, 4.0★+, 4.5★+)
- **Dynamic Results**: Separate sections for dishes and restaurants
- **Add to Cart**: Directly from search results
- **Beautiful Empty States**: "No results found" UI with clear filters option

### 🍽️ Restaurant Details
- **Dynamic Menu**: Loaded from dataset, grouped by category
- **Interactive Food Cards**: Quantity selector + Add to Cart
- **"You May Also Like"**: Horizontal scroll of similar dishes from other restaurants
- **Customer Reviews**: Star ratings and comments
- **Restaurant Info**: Cuisine, location, delivery time, cost for two

### 🛒 Shopping Cart
- **Item Management**: Add, remove, update quantities
- **Order Summary**: Subtotal, delivery fee, taxes, total
- **Restaurant Validation**: Can only order from one restaurant at a time
- **Checkout Flow**: Creates order → Navigates to tracking

### 📦 Order Tracking (Real-time Simulation)
- **5-Stage Progress**: Placed → Preparing → Out for Delivery → Arriving → Delivered
- **Animated Progress Bar**: Smooth green gradient with transitions
- **Auto-progression**: Status updates every 8 seconds (simulated)
- **Delivery Agent Info**: Avatar, name, ETA, call button
- **Order Details**: Items list, restaurant, address, total amount

### 🎁 Offers & Deals
- **6 Featured Offers**: With expiry dates and minimum order amounts
- **Claim Offer Button**: Copies code with toast notification
- **Restaurants with Offers**: Grid of restaurants having active promotions
- **Newsletter Signup**: Gradient CTA section

### 🎨 UI/UX Excellence
- **Curved Cards**: All cards use `rounded-3xl` for modern aesthetics
- **Vibrant Gradients**: Red, orange, pink, yellow, purple combinations
- **Framer Motion**: Hover effects, fade-ins, scale animations, staggered lists
- **Responsive Design**: Mobile-first, adapts to all screen sizes
- **Dark Mode Ready**: Theme provider integrated
- **Floating Buttons**: Cart button (always) + Track Order button (when active order)

## 📊 Data

- **21 Restaurants** across 9 cuisines
- **40+ Food Items** with images, prices, categories
- **6 Promotional Offers** with validity dates
- **3 Delivery Agents** with avatars

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## 🗂️ Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── RestaurantCard.tsx
│   │   ├── FoodCard.tsx
│   │   ├── FloatingCartButton.tsx
│   │   ├── FloatingTrackOrderButton.tsx
│   │   └── ui/              # shadcn/ui components
│   ├── pages/               # Route pages
│   │   ├── Home.tsx
│   │   ├── RestaurantList.tsx
│   │   ├── RestaurantDetail.tsx
│   │   ├── Cart.tsx
│   │   ├── OrderTracking.tsx
│   │   ├── Offers.tsx
│   │   ├── Profile.tsx
│   │   ├── Login.tsx
│   │   └── Signup.tsx
│   ├── data/                # Mock data
│   │   ├── data.js          # Restaurants, food, offers, agents
│   │   └── data.d.ts        # TypeScript definitions
│   ├── lib/                 # Utilities & contexts
│   │   ├── cart.tsx         # Cart context & state
│   │   ├── auth.tsx         # Auth context
│   │   └── theme-provider.tsx
│   └── App.tsx              # Main app with routing
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 🛣️ Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with featured content |
| `/restaurants` | All restaurants with search & filters |
| `/restaurant/:id` | Restaurant detail with menu |
| `/cart` | Shopping cart |
| `/track-order/:id` | Real-time order tracking |
| `/offers` | Promotional offers |
| `/profile` | User profile & settings |
| `/login` | User login |
| `/signup` | User registration |

## 🎯 Key Technologies

- **React 18.3** - UI library
- **TypeScript 5.4** - Type safety
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion 11.2** - Animations
- **React Router 6.27** - Routing
- **React Hook Form 7.52** - Form handling
- **React Hot Toast 2.5** - Notifications
- **Lucide React** - Icons
- **Radix UI** - Accessible components

## 💾 Local Storage

The app uses localStorage for:
- `zomato-cart` - Cart items persistence
- `zomato-orders` - Order history
- `zomato-active-order` - Current active order ID
- `zomato-ui-theme` - Dark/light mode preference
- `user` - User authentication data

## 🎨 Design Highlights

### Color Palette
- **Primary**: Red (#DC2626) - Zomato brand color
- **Gradients**: Red → Orange → Pink, Yellow → Orange, Purple → Pink
- **Success**: Green (#16A34A) - Order status, ratings
- **Warning**: Orange (#F59E0B) - Offers, highlights

### Typography
- **Headings**: Bold, 2xl-5xl sizes
- **Body**: Regular, sm-base sizes
- **Emphasis**: Semibold for CTAs and important info

### Spacing
- Consistent padding: 4, 6, 8, 12, 16 (Tailwind scale)
- Card spacing: p-4, p-6 for content
- Section spacing: py-8, py-12, py-16

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

### Code Style
- TypeScript strict mode enabled
- ESLint with React plugins
- Prettier for formatting (recommended)

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌟 Highlights

✅ **Fully Functional** - All features work end-to-end  
✅ **Type Safe** - 100% TypeScript coverage  
✅ **Performant** - Optimized with useMemo, lazy loading  
✅ **Accessible** - Radix UI components, semantic HTML  
✅ **Animated** - Smooth Framer Motion transitions  
✅ **Responsive** - Works on all devices  
✅ **Modern UI** - Curved cards, gradients, shadows  

## 📄 License

This is a learning project. Feel free to use and modify.

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Lucide](https://lucide.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)

---

**Built with ❤️ using React + TypeScript + Tailwind CSS**

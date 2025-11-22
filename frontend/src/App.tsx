import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/ErrorBoundary'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import BottomNavigation from './components/BottomNavigation'
import FloatingCartButton from './components/FloatingCartButton'
import FloatingTrackOrderButton from './components/FloatingTrackOrderButton'
import RestaurantList from './pages/RestaurantList'
import RestaurantDetail from './pages/RestaurantDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import Home from './pages/Home'
import OrderTracking from './pages/OrderTracking'
import OrderHistory from './pages/OrderHistory'
import Favorites from './pages/Favorites'
import AddressManagement from './pages/AddressManagement'
import About from './pages/About'
import Careers from './pages/Careers'
import Team from './pages/Team'
import Blog from './pages/Blog'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Security from './pages/Security'
import Sitemap from './pages/Sitemap'
import Help from './pages/Help'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Notifications from './pages/Notifications'
import NotFound from './pages/NotFound'
import ForgotPassword from './pages/ForgotPassword'
import Payment from './pages/Payment'
import EmailVerification from './pages/EmailVerification'
import SocialLogin from './pages/SocialLogin'
import LoyaltyProgram from './pages/LoyaltyProgram'
import { AuthProvider } from './lib/auth'
import { CartProvider } from './lib/cart'
import { FavoritesProvider } from './lib/favorites'
import { KeyboardShortcuts } from './components/KeyboardShortcuts'
import { AnimatedBackground } from './components/AnimatedBackground'

// Animated Routes wrapper component
const AnimatedRoutes = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/restaurants" element={<RestaurantList />} />
        <Route path="/restaurant/:id" element={<RestaurantDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route 
          path="/payment" 
          element={
            <ProtectedRoute requireAuth={true}>
              <Payment />
            </ProtectedRoute>
          } 
        />
        <Route path="/offers" element={<Offers />} />
        <Route 
          path="/loyalty" 
          element={
            <ProtectedRoute requireAuth={true}>
              <LoyaltyProgram />
            </ProtectedRoute>
          } 
        />
        <Route path="/profile" element={<Profile />} />
        <Route path="/track-order/:id" element={<OrderTracking />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/addresses" element={<AddressManagement />} />
        <Route path="/notifications" element={<Notifications />} />

        {/* Company Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/team" element={<Team />} />
        <Route path="/blog" element={<Blog />} />

        {/* Legal Pages */}
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/security" element={<Security />} />
        <Route path="/sitemap" element={<Sitemap />} />

        {/* Support Pages */}
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />

        {/* Public routes - redirect to home if already authenticated */}
        <Route
          path="/login"
          element={
            <ProtectedRoute requireAuth={false}>
              <Login />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <ProtectedRoute requireAuth={false}>
              <Signup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute requireAuth={false}>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <ProtectedRoute requireAuth={false}>
              <EmailVerification />
            </ProtectedRoute>
          }
        />
        <Route
          path="/social-login"
          element={
            <ProtectedRoute requireAuth={false}>
              <SocialLogin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <Router>
              <KeyboardShortcuts />
              <div className="relative min-h-screen overflow-hidden bg-gray-50/60 dark:bg-gray-950/90">
                <AnimatedBackground />
                <Navbar />
                <motion.main
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 pb-20 md:pb-0"
                >
                  <AnimatedRoutes />
                </motion.main>
                <Footer />
                <ScrollToTop />
                <BottomNavigation />
                <FloatingCartButton />
                <FloatingTrackOrderButton />
                <Toaster position="top-right" />
              </div>
            </Router>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default App

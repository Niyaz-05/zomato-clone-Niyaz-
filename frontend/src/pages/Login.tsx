import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { authAPI, LoginRequest } from '../lib/api'
import { Utensils, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'

const Login = () => {
  const [formData, setFormData] = useState<LoginRequest>({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  // Get the redirect path from URL params or state
  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    // Check if user is already authenticated and redirect
    const token = localStorage.getItem('token')
    if (token) {
      navigate(from, { replace: true })
    }
  }, [navigate, from])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await authAPI.login(formData)

      // Store token and user data
      localStorage.setItem('token', response.token)
      localStorage.setItem('user', JSON.stringify({
        id: response.user.id,
        name: response.user.name,
        email: response.user.email,
        phoneNumber: '', // We'll need to get this from user profile or signup
        role: response.user.role,
      }))

      toast.success('Login successful!')
      // Redirect to the intended page or home
      navigate(from, { replace: true })
    } catch (error: any) {
      toast.error(error.response?.data || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6TTEyIDM0YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00ek0yNCAzNGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6bTAtMTBjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse delay-700"></div>
      <div className="absolute top-1/2 right-10 w-16 h-16 bg-white/10 rounded-full blur-lg animate-pulse delay-1000"></div>
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 border border-red-100 relative z-10">
        {/* Zomato Branding */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-red-600 rounded-full p-3">
              <Utensils className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-red-600 mb-2">Zomato</h1>
          <p className="text-gray-600 text-sm">Discover the best food & drinks</p>
        </div>
        
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Welcome Back!</h2>
          <p className="text-sm text-gray-500">Sign in to continue your food adventure</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Mail className="h-4 w-4 text-red-500" />
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-red-400 group-focus-within:text-red-600 transition-colors" />
              </div>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                className="block w-full pl-12 pr-4 py-3.5 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl placeholder-gray-500 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-orange-50 transition-all duration-300 hover:border-orange-300 hover:shadow-md"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Lock className="h-4 w-4 text-red-500" />
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-red-400 group-focus-within:text-red-600 transition-colors" />
              </div>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={handleInputChange}
                className="block w-full pl-12 pr-4 py-3.5 bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200 rounded-xl placeholder-gray-500 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-orange-50 transition-all duration-300 hover:border-orange-300 hover:shadow-md"
                placeholder="••••••••"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 font-semibold text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <>
                <span>Let's Eat!</span>
                <Utensils className="w-5 h-5" />
                <ArrowRight className="w-5 h-5 animate-pulse" />
              </>
            )}
          </button>
        </form>
        <div className="mt-6">
          <div className="text-center mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-red-600 hover:text-red-700 font-semibold"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="mb-4">
            <Link
              to="/social-login"
              className="block w-full text-center text-sm text-blue-600 hover:text-blue-700 font-semibold py-2"
            >
              Or sign in with social account →
            </Link>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">New to Zomato?</span>
            </div>
          </div>
          <p className="mt-4 text-center text-gray-600">
            <Link to="/signup" className="text-red-600 hover:text-red-700 font-semibold inline-flex items-center gap-1 group">
              <span>Create an account</span>
              <Sparkles className="w-4 h-4 group-hover:animate-spin" />
            </Link>
          </p>
        </div>
        
        {/* Trust indicators */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-center text-gray-500 mb-3">Trusted by millions of food lovers</p>
          <div className="flex justify-center items-center gap-4 text-gray-400">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs">Secure</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-xs">Fast</span>
            </div>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-xs">Reliable</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Login

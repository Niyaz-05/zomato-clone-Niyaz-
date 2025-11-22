import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Chrome, Facebook, Mail, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../lib/auth'

const SocialLogin = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState<string | null>(null)

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate('/', { replace: true })
    return null
  }

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    setIsLoading(provider)
    try {
      // TODO: Implement actual OAuth flow
      // For now, simulate the process
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In real implementation, this would:
      // 1. Redirect to OAuth provider
      // 2. Handle callback
      // 3. Exchange code for token
      // 4. Login user
      
      toast.success(`Redirecting to ${provider === 'google' ? 'Google' : 'Facebook'}...`)
      
      // Simulate redirect (in real app, this would be actual OAuth redirect)
      setTimeout(() => {
        toast.info('OAuth integration coming soon! Please use email login for now.')
        setIsLoading(null)
      }, 2000)
    } catch (error) {
      toast.error(`Failed to login with ${provider}`)
      setIsLoading(null)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-pink-500 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8"
      >
        <button
          onClick={() => navigate('/login')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Login
        </button>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Quick Login</h1>
          <p className="text-gray-600">
            Sign in with your social account
          </p>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialLogin('google')}
            disabled={isLoading !== null}
            className="w-full bg-white border-2 border-gray-300 text-gray-700 py-4 px-6 rounded-xl hover:border-red-500 hover:bg-red-50 transition-all font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading === 'google' ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-700"></div>
            ) : (
              <Chrome className="w-6 h-6 text-blue-600" />
            )}
            <span>Continue with Google</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSocialLogin('facebook')}
            disabled={isLoading !== null}
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-xl hover:bg-blue-700 transition-all font-semibold flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {isLoading === 'facebook' ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <Facebook className="w-6 h-6" />
            )}
            <span>Continue with Facebook</span>
          </motion.button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/login')}
            className="w-full border-2 border-red-600 text-red-600 py-4 px-6 rounded-xl hover:bg-red-50 transition-all font-semibold flex items-center justify-center gap-3"
          >
            <Mail className="w-5 h-5" />
            <span>Use Email & Password</span>
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            New to Zomato?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-red-600 hover:text-red-700 font-semibold"
            >
              Create an account
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default SocialLogin


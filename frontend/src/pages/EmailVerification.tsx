import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, CheckCircle, XCircle, RefreshCw, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../lib/auth'

const EmailVerification = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { isAuthenticated, user } = useAuth()
  const [isVerified, setIsVerified] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const token = searchParams.get('token')
  const email = searchParams.get('email') || user?.email

  useEffect(() => {
    if (!isAuthenticated && !token) {
      navigate('/login')
      return
    }

    // If token is present, verify it
    if (token) {
      verifyEmail(token)
    }
  }, [token, isAuthenticated, navigate])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [countdown])

  const verifyEmail = async (verificationToken: string) => {
    try {
      // TODO: Implement actual email verification API call
      // await authAPI.verifyEmail(verificationToken)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setIsVerified(true)
      toast.success('Email verified successfully!')
      
      // Update user verification status
      const userData = localStorage.getItem('user')
      if (userData) {
        const user = JSON.parse(userData)
        user.emailVerified = true
        localStorage.setItem('user', JSON.stringify(user))
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.')
    }
  }

  const resendVerification = async () => {
    if (countdown > 0) {
      toast.error(`Please wait ${countdown} seconds before resending`)
      return
    }

    setIsResending(true)
    try {
      // TODO: Implement actual resend verification API call
      // await authAPI.resendVerification(email)
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setCountdown(60) // 60 second cooldown
      toast.success('Verification email sent! Check your inbox.')
    } catch (error) {
      toast.error('Failed to send verification email')
    } finally {
      setIsResending(false)
    }
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-pink-500 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-6"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </motion.div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Email Verified!</h2>
          <p className="text-gray-600 mb-6">
            Your email has been successfully verified. You can now enjoy all features!
          </p>
          
          <button
            onClick={() => navigate('/')}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-all font-semibold"
          >
            Continue to Home
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-500 via-orange-500 to-pink-500 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
          <p className="text-gray-600">
            We've sent a verification link to
          </p>
          <p className="text-gray-900 font-semibold mt-1">{email}</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-800">
              <div className="font-semibold mb-1">Check your inbox</div>
              <div>Click the verification link in the email to verify your account. The link will expire in 24 hours.</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={resendVerification}
            disabled={isResending || countdown > 0}
            className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center justify-center gap-2"
          >
            {isResending ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Sending...</span>
              </>
            ) : countdown > 0 ? (
              <>
                <RefreshCw className="w-5 h-5" />
                <span>Resend in {countdown}s</span>
              </>
            ) : (
              <>
                <RefreshCw className="w-5 h-5" />
                <span>Resend Verification Email</span>
              </>
            )}
          </button>

          <button
            onClick={() => navigate('/')}
            className="w-full text-gray-600 hover:text-gray-900 font-semibold py-2"
          >
            I'll verify later
          </button>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Didn't receive the email? Check your spam folder or contact support.
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default EmailVerification


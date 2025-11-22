import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Gift, Star, Trophy, Coins, Sparkles, TrendingUp, Award } from 'lucide-react'
import { useAuth } from '../lib/auth'
import toast from 'react-hot-toast'

interface LoyaltyPoints {
  total: number
  available: number
  used: number
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
  nextLevelPoints: number
  pointsToNextLevel: number
}

const LoyaltyProgram = () => {
  const { isAuthenticated, user } = useAuth()
  const [points, setPoints] = useState<LoyaltyPoints>({
    total: 0,
    available: 0,
    used: 0,
    level: 'Bronze',
    nextLevelPoints: 100,
    pointsToNextLevel: 100
  })
  const [recentEarnings, setRecentEarnings] = useState<any[]>([])

  useEffect(() => {
    if (!isAuthenticated) return

    // Load loyalty points from localStorage
    const savedPoints = localStorage.getItem('zomato-loyalty-points')
    if (savedPoints) {
      const data = JSON.parse(savedPoints)
      setPoints(data)
    } else {
      // Initialize with default points
      const defaultPoints: LoyaltyPoints = {
        total: 150,
        available: 150,
        used: 0,
        level: 'Silver',
        nextLevelPoints: 500,
        pointsToNextLevel: 350
      }
      setPoints(defaultPoints)
      localStorage.setItem('zomato-loyalty-points', JSON.stringify(defaultPoints))
    }

    // Load recent earnings
    const earnings = localStorage.getItem('zomato-loyalty-earnings')
    if (earnings) {
      setRecentEarnings(JSON.parse(earnings))
    }
  }, [isAuthenticated])

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bronze': return 'from-amber-600 to-amber-800'
      case 'Silver': return 'from-gray-400 to-gray-600'
      case 'Gold': return 'from-yellow-400 to-yellow-600'
      case 'Platinum': return 'from-purple-500 to-purple-700'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Bronze': return '🥉'
      case 'Silver': return '🥈'
      case 'Gold': return '🥇'
      case 'Platinum': return '💎'
      default: return '⭐'
    }
  }

  const benefits = {
    Bronze: ['5% cashback on orders', 'Early access to offers'],
    Silver: ['10% cashback on orders', 'Free delivery on orders above ₹300', 'Priority customer support'],
    Gold: ['15% cashback on orders', 'Free delivery on all orders', 'Exclusive deals', 'Birthday rewards'],
    Platinum: ['20% cashback on orders', 'Free delivery on all orders', 'VIP customer support', 'Exclusive events', 'Surprise gifts']
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Gift className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-600">Please login to view your loyalty points</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-pink-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Gift className="w-10 h-10 text-red-600" />
            Zomato Rewards
          </h1>
          <p className="text-gray-600">Earn points with every order and unlock amazing rewards!</p>
        </motion.div>

        {/* Points Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`bg-gradient-to-br ${getLevelColor(points.level)} rounded-2xl shadow-2xl p-8 mb-8 text-white`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-sm opacity-90 mb-1">Current Level</div>
              <div className="text-3xl font-bold flex items-center gap-2">
                {getLevelIcon(points.level)} {points.level}
              </div>
            </div>
            <Trophy className="w-16 h-16 opacity-80" />
          </div>

          <div className="grid grid-cols-3 gap-6 mb-6">
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-sm opacity-90 mb-1">Available Points</div>
              <div className="text-2xl font-bold flex items-center gap-2">
                <Coins className="w-6 h-6" />
                {points.available}
              </div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-sm opacity-90 mb-1">Total Earned</div>
              <div className="text-2xl font-bold">{points.total}</div>
            </div>
            <div className="bg-white/20 rounded-xl p-4 backdrop-blur-sm">
              <div className="text-sm opacity-90 mb-1">Points Used</div>
              <div className="text-2xl font-bold">{points.used}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Progress to {points.level === 'Platinum' ? 'Max Level' : 'Next Level'}</span>
              <span>{points.pointsToNextLevel} points needed</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${((points.total - (points.nextLevelPoints - points.pointsToNextLevel)) / points.pointsToNextLevel) * 100}%` }}
                className="bg-white h-full rounded-full"
              />
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-yellow-500" />
              Your Benefits
            </h2>
            <ul className="space-y-3">
              {benefits[points.level as keyof typeof benefits].map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* How to Earn */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-green-600" />
              How to Earn Points
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-gray-900">Place an Order</span>
                </div>
                <span className="text-green-600 font-bold">+10 pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">Write a Review</span>
                </div>
                <span className="text-blue-600 font-bold">+5 pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-gray-900">Refer a Friend</span>
                </div>
                <span className="text-purple-600 font-bold">+50 pts</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-orange-600" />
                  <span className="font-semibold text-gray-900">Complete Profile</span>
                </div>
                <span className="text-orange-600 font-bold">+20 pts</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Earnings */}
        {recentEarnings.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recent Activity</h2>
            <div className="space-y-3">
              {recentEarnings.slice(0, 5).map((earning, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-semibold text-gray-900">{earning.description}</div>
                    <div className="text-sm text-gray-500">{new Date(earning.date).toLocaleDateString()}</div>
                  </div>
                  <div className={`font-bold ${earning.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {earning.points > 0 ? '+' : ''}{earning.points} pts
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default LoyaltyProgram


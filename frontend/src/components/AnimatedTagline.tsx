// Animated rotating taglines for hero section

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const taglines = [
  'Craving Something Delicious? 🍕',
  'Order Happiness in 30 Minutes ⚡',
  'Bringing Flavor to Your Doorstep 🚀',
  'Your Favorite Food, Delivered Fast 🎯',
  'Taste the Best in Town 🌟',
]

export default function AnimatedTagline() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % taglines.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-16 flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.h2
          key={currentIndex}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-2xl md:text-4xl font-bold text-white text-center"
        >
          {taglines[currentIndex]}
        </motion.h2>
      </AnimatePresence>
    </div>
  )
}

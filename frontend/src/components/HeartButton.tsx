// Animated heart button for favorites

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useState } from 'react'
import { cn } from '../lib/utils'
import { playFavorite } from '../lib/sounds'

interface HeartButtonProps {
  isLiked: boolean
  onToggle: () => void
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function HeartButton({
  isLiked,
  onToggle,
  size = 'md',
  className,
}: HeartButtonProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  }

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  }

  const handleClick = () => {
    setIsAnimating(true)
    playFavorite()
    onToggle()
    setTimeout(() => setIsAnimating(false), 600)
  }

  return (
    <motion.button
      onClick={handleClick}
      className={cn(
        'relative flex items-center justify-center rounded-full',
        'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm',
        'border border-gray-200 dark:border-gray-700',
        'hover:scale-110 transition-transform',
        sizes[size],
        className
      )}
      whileTap={{ scale: 0.9 }}
    >
      {/* Particle burst effect */}
      {isAnimating && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-red-500"
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * Math.PI * 2) / 8) * 30,
                y: Math.sin((i * Math.PI * 2) / 8) * 30,
                opacity: [1, 0],
              }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />
          ))}
        </>
      )}

      {/* Heart icon */}
      <motion.div
        animate={
          isAnimating
            ? {
                scale: [1, 1.4, 0.9, 1.2, 1],
                rotate: [0, -10, 10, -5, 0],
              }
            : {}
        }
        transition={{ duration: 0.6 }}
      >
        <Heart
          size={iconSizes[size]}
          className={cn(
            'transition-colors',
            isLiked
              ? 'fill-red-500 text-red-500'
              : 'fill-none text-gray-600 dark:text-gray-400'
          )}
        />
      </motion.div>
    </motion.button>
  )
}

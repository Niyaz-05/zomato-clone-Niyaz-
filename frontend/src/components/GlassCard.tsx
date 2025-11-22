// Glassmorphism card component with animated borders

import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '../lib/utils'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode
  className?: string
  glowColor?: 'red' | 'orange' | 'pink' | 'purple' | 'blue'
  animated?: boolean
}

export default function GlassCard({
  children,
  className,
  glowColor = 'red',
  animated = true,
  ...props
}: GlassCardProps) {
  const glowColors = {
    red: 'from-red-500 via-orange-500 to-pink-500',
    orange: 'from-orange-500 via-yellow-500 to-red-500',
    pink: 'from-pink-500 via-purple-500 to-red-500',
    purple: 'from-purple-500 via-pink-500 to-blue-500',
    blue: 'from-blue-500 via-cyan-500 to-purple-500',
  }

  return (
    <motion.div
      className={cn('relative group', className)}
      whileHover={animated ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
      {...props}
    >
      {/* Animated gradient border */}
      {animated && (
        <div
          className={cn(
            'absolute -inset-0.5 bg-gradient-to-r rounded-3xl opacity-0 group-hover:opacity-75 blur transition duration-500',
            glowColors[glowColor]
          )}
        />
      )}

      {/* Glass card content */}
      <div
        className={cn(
          'relative backdrop-blur-xl bg-white/80 dark:bg-gray-900/80',
          'border border-white/20 dark:border-gray-700/30',
          'rounded-3xl shadow-xl',
          'transition-all duration-300'
        )}
      >
        {children}
      </div>
    </motion.div>
  )
}

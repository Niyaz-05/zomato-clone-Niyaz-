import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

// Color themes for each page
export const pageThemes = {
  home: {
    primary: 'from-red-500 to-orange-400',
    secondary: 'from-orange-400 to-yellow-400',
    accent: 'from-pink-500 to-purple-500',
    background: 'bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50'
  },
  restaurant: {
    primary: 'from-green-500 to-emerald-400',
    secondary: 'from-emerald-400 to-teal-400',
    accent: 'from-cyan-500 to-blue-500',
    background: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50'
  },
  offers: {
    primary: 'from-purple-500 to-pink-400',
    secondary: 'from-pink-400 to-rose-400',
    accent: 'from-violet-500 to-purple-500',
    background: 'bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50'
  },
  cart: {
    primary: 'from-blue-500 to-indigo-400',
    secondary: 'from-indigo-400 to-purple-400',
    accent: 'from-cyan-500 to-blue-500',
    background: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'
  },
  profile: {
    primary: 'from-gray-500 to-slate-400',
    secondary: 'from-slate-400 to-zinc-400',
    accent: 'from-neutral-500 to-gray-500',
    background: 'bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50'
  }
}

// Curved section component
export const CurvedSection = ({
  children,
  className,
  variant = 'default'
}: {
  children: ReactNode
  className?: string
  variant?: 'default' | 'top' | 'bottom' | 'wave'
}) => {
  const baseClasses = 'relative overflow-hidden'

  const variantClasses = {
    default: 'rounded-3xl',
    top: 'rounded-t-[4rem]',
    bottom: 'rounded-b-[4rem]',
    wave: 'rounded-t-[50%] rounded-b-[20%]'
  }

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)}>
      {children}
    </div>
  )
}

// Gradient card component
export const GradientCard = ({
  children,
  className,
  gradient = 'from-white to-gray-50',
  hoverGradient,
  shadow = 'shadow-lg',
  ...props
}: {
  children: ReactNode
  className?: string
  gradient?: string
  hoverGradient?: string
  shadow?: string
  [key: string]: any
}) => {
  return (
    <motion.div
      className={cn(
        'bg-gradient-to-br rounded-2xl p-6 transition-all duration-300 hover:shadow-xl',
        gradient,
        shadow,
        className
      )}
      whileHover={{
        scale: 1.02,
        ...(hoverGradient && { background: `linear-gradient(135deg, ${hoverGradient})` })
      }}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Curved button component
export const CurvedButton = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  ...props
}: {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  [key: string]: any
}) => {
  const baseClasses = 'rounded-full font-semibold transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4'

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-red-500 to-orange-400 text-white hover:from-red-600 hover:to-orange-500 focus:ring-red-200',
    secondary: 'bg-gradient-to-r from-gray-500 to-gray-400 text-white hover:from-gray-600 hover:to-gray-500 focus:ring-gray-200',
    outline: 'border-2 border-gradient-to-r from-red-500 to-orange-400 text-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-orange-400 hover:text-white focus:ring-red-200',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-200'
  }

  return (
    <motion.button
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Animated search bar component
export const AnimatedSearchBar = ({
  value,
  onChange,
  placeholder = 'Search restaurants, food...',
  className,
  ...props
}: {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
  className?: string
  [key: string]: any
}) => {
  return (
    <motion.div
      className={cn(
        'relative max-w-md mx-auto',
        className
      )}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative"
        whileFocus={{ scale: 1.05 }}
      >
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-6 py-4 pr-12 bg-white/90 backdrop-blur-sm rounded-full border-2 border-white/50 shadow-lg focus:outline-none focus:ring-4 focus:ring-red-200 focus:border-transparent transition-all duration-300"
          {...props}
        />
        <motion.div
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
          whileHover={{ scale: 1.1 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

// Floating search dropdown
export const SearchDropdown = ({
  results,
  isVisible,
  onSelect,
  className
}: {
  results: any[]
  isVisible: boolean
  onSelect: (item: any) => void
  className?: string
}) => {
  if (!isVisible || results.length === 0) return null

  return (
    <motion.div
      className={cn(
        'absolute top-full mt-2 w-full bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 overflow-hidden z-50',
        className
      )}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <div className="max-h-80 overflow-y-auto">
        {results.map((result, index) => (
          <motion.div
            key={result.id || index}
            className="p-4 hover:bg-red-50 cursor-pointer border-b border-gray-100 last:border-b-0"
            onClick={() => onSelect(result)}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <img
                src={result.image || '/placeholder-restaurant.jpg'}
                alt={result.name}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{result.name}</p>
                <p className="text-sm text-gray-600">{result.cuisine || result.description}</p>
              </div>
              {result.rating && (
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm font-medium">{result.rating}</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

// Curved divider component
export const CurvedDivider = ({
  className,
  variant = 'wave'
}: {
  className?: string
  variant?: 'wave' | 'curve' | 'zigzag'
}) => {
  const variantClasses = {
    wave: 'rounded-t-[50%]',
    curve: 'rounded-t-full',
    zigzag: ''
  }

  return (
    <div className={cn('relative h-16 bg-gradient-to-r from-transparent via-gray-100 to-transparent', variantClasses[variant], className)}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1200 120" preserveAspectRatio="none">
        <path
          d="M0,60 C300,100 600,20 900,60 C1050,80 1200,40 1200,60 L1200,120 L0,120 Z"
          fill="currentColor"
          className="text-gray-100"
        />
      </svg>
    </div>
  )
}

// Page transition wrapper
export const PageTransition = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Loading skeleton with curved design
export const CurvedSkeleton = ({
  className,
  variant = 'card'
}: {
  className?: string
  variant?: 'card' | 'text' | 'circle'
}) => {
  return (
    <div className={cn('animate-pulse', className)}>
      {variant === 'card' && (
        <div className="bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl p-6">
          <div className="rounded-xl bg-gray-300 h-32 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        </div>
      )}
      {variant === 'text' && (
        <div className="h-4 bg-gray-300 rounded"></div>
      )}
      {variant === 'circle' && (
        <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
      )}
    </div>
  )
}

export default {
  pageThemes,
  CurvedSection,
  GradientCard,
  CurvedButton,
  AnimatedSearchBar,
  SearchDropdown,
  CurvedDivider,
  PageTransition,
  CurvedSkeleton
}

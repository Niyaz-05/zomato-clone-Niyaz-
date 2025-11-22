import { motion } from 'framer-motion'
import { CurvedSkeleton } from '@/lib/design-system'
import { cn } from '@/lib/utils'

// Restaurant Card Skeleton
export const RestaurantCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('bg-white rounded-3xl overflow-hidden shadow-lg', className)}
    >
      <CurvedSkeleton className="w-full h-48" />
      <div className="p-6 space-y-4">
        <CurvedSkeleton className="h-6 w-3/4" />
        <CurvedSkeleton className="h-4 w-1/2" />
        <div className="flex justify-between items-center">
          <CurvedSkeleton className="h-4 w-16" />
          <CurvedSkeleton className="h-4 w-20" />
          <CurvedSkeleton className="h-4 w-24" />
        </div>
      </div>
    </motion.div>
  )
}

// Food Item Skeleton
export const FoodItemSkeleton = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn('flex items-center space-x-4 p-4 bg-white rounded-2xl', className)}
    >
      <CurvedSkeleton variant="circle" className="w-16 h-16 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <CurvedSkeleton className="h-5 w-3/4" />
        <CurvedSkeleton className="h-4 w-1/2" />
        <CurvedSkeleton className="h-4 w-1/4" />
      </div>
      <CurvedSkeleton className="h-8 w-20" />
    </motion.div>
  )
}

// Category Grid Skeleton
export const CategoryGridSkeleton = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="text-center p-8 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl"
        >
          <CurvedSkeleton variant="circle" className="w-20 h-20 mx-auto mb-4" />
          <CurvedSkeleton className="h-6 w-16 mx-auto mb-2" />
          <CurvedSkeleton className="h-4 w-24 mx-auto" />
        </motion.div>
      ))}
    </div>
  )
}

// Offer Card Skeleton
export const OfferCardSkeleton = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('bg-gradient-to-br from-purple-200 to-pink-200 rounded-3xl overflow-hidden', className)}
    >
      <CurvedSkeleton className="w-full h-40" />
      <div className="p-6 space-y-3">
        <CurvedSkeleton className="h-6 w-3/4" />
        <CurvedSkeleton className="h-4 w-full" />
        <CurvedSkeleton className="h-4 w-2/3" />
        <div className="flex justify-between items-center">
          <CurvedSkeleton className="h-6 w-16" />
          <CurvedSkeleton className="h-8 w-20" />
        </div>
      </div>
    </motion.div>
  )
}

// Profile Info Skeleton
export const ProfileSkeleton = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('bg-white rounded-3xl p-8 shadow-lg', className)}
    >
      <div className="flex items-center space-x-6 mb-8">
        <CurvedSkeleton variant="circle" className="w-20 h-20" />
        <div className="space-y-3 flex-1">
          <CurvedSkeleton className="h-6 w-32" />
          <CurvedSkeleton className="h-4 w-48" />
          <CurvedSkeleton className="h-4 w-24" />
        </div>
      </div>
      <div className="space-y-4">
        <CurvedSkeleton className="h-4 w-full" />
        <CurvedSkeleton className="h-4 w-3/4" />
        <CurvedSkeleton className="h-4 w-1/2" />
      </div>
    </motion.div>
  )
}

// Cart Item Skeleton
export const CartItemSkeleton = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn('flex items-center space-x-4 p-6 bg-white rounded-2xl shadow-sm', className)}
    >
      <CurvedSkeleton variant="circle" className="w-16 h-16 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <CurvedSkeleton className="h-5 w-3/4" />
        <CurvedSkeleton className="h-4 w-1/2" />
        <CurvedSkeleton className="h-4 w-1/4" />
      </div>
      <div className="flex items-center space-x-3">
        <CurvedSkeleton className="h-8 w-8" />
        <CurvedSkeleton className="h-4 w-8" />
        <CurvedSkeleton className="h-8 w-8" />
      </div>
      <CurvedSkeleton className="h-6 w-16" />
    </motion.div>
  )
}

// Loading Spinner Component
export const LoadingSpinner = ({
  size = 'md',
  className
}: {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <motion.div
      className={cn('flex items-center justify-center', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className={cn('border-4 border-gray-200 border-t-red-500 rounded-full', sizeClasses[size])}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      />
    </motion.div>
  )
}

// Page Loading Skeleton
export const PageLoadingSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Skeleton */}
        <div className="mb-8">
          <CurvedSkeleton className="h-8 w-48 mb-4" />
          <CurvedSkeleton className="h-4 w-96" />
        </div>

        {/* Content Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <RestaurantCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Search Results Skeleton
export const SearchResultsSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="p-4 border-b border-gray-100 last:border-b-0">
          <div className="flex items-center space-x-3">
            <CurvedSkeleton variant="circle" className="w-12 h-12" />
            <div className="flex-1 space-y-2">
              <CurvedSkeleton className="h-4 w-32" />
              <CurvedSkeleton className="h-3 w-24" />
            </div>
            <CurvedSkeleton className="h-4 w-12" />
          </div>
        </div>
      ))}
    </motion.div>
  )
}

export default {
  RestaurantCardSkeleton,
  FoodItemSkeleton,
  CategoryGridSkeleton,
  OfferCardSkeleton,
  ProfileSkeleton,
  CartItemSkeleton,
  LoadingSpinner,
  PageLoadingSkeleton,
  SearchResultsSkeleton
}

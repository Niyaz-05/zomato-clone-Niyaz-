// Shimmer loading skeleton components

import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

interface ShimmerSkeletonProps {
  className?: string
}

export function ShimmerBox({ className }: ShimmerSkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800',
        className
      )}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

export function RestaurantCardSkeleton() {
  return (
    <div className="rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-lg">
      <ShimmerBox className="h-48 w-full" />
      <div className="p-4 space-y-3">
        <ShimmerBox className="h-6 w-3/4" />
        <ShimmerBox className="h-4 w-1/2" />
        <div className="flex gap-2">
          <ShimmerBox className="h-4 w-16" />
          <ShimmerBox className="h-4 w-20" />
        </div>
      </div>
    </div>
  )
}

export function FoodCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-md">
      <ShimmerBox className="h-40 w-full" />
      <div className="p-3 space-y-2">
        <ShimmerBox className="h-5 w-2/3" />
        <ShimmerBox className="h-3 w-full" />
        <ShimmerBox className="h-3 w-4/5" />
        <div className="flex justify-between items-center pt-2">
          <ShimmerBox className="h-5 w-16" />
          <ShimmerBox className="h-8 w-20 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function MenuSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3].map((section) => (
        <div key={section} className="space-y-4">
          <ShimmerBox className="h-8 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((item) => (
              <FoodCardSkeleton key={item} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function RestaurantListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((item) => (
        <RestaurantCardSkeleton key={item} />
      ))}
    </div>
  )
}

// Sound toggle component for settings

import { motion } from 'framer-motion'
import { Volume2, VolumeX } from 'lucide-react'
import { useState, useEffect } from 'react'
import { soundManager } from '../lib/sounds'
import { cn } from '../lib/utils'

interface SoundToggleProps {
  className?: string
  showLabel?: boolean
}

export default function SoundToggle({ className, showLabel = true }: SoundToggleProps) {
  const [isEnabled, setIsEnabled] = useState(soundManager.isEnabled())

  useEffect(() => {
    setIsEnabled(soundManager.isEnabled())
  }, [])

  const handleToggle = () => {
    const newState = soundManager.toggle()
    setIsEnabled(newState)
  }

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {showLabel && (
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sound Effects
        </span>
      )}
      
      <motion.button
        onClick={handleToggle}
        className={cn(
          'relative w-14 h-7 rounded-full transition-colors',
          isEnabled
            ? 'bg-gradient-to-r from-red-500 to-orange-500'
            : 'bg-gray-300 dark:bg-gray-600'
        )}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center"
          animate={{ x: isEnabled ? 28 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          {isEnabled ? (
            <Volume2 size={14} className="text-red-500" />
          ) : (
            <VolumeX size={14} className="text-gray-400" />
          )}
        </motion.div>
      </motion.button>
    </div>
  )
}

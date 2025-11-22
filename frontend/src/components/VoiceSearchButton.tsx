// Voice search button with animation

import { motion } from 'framer-motion'
import { Mic, MicOff } from 'lucide-react'
import { useState } from 'react'
import { voiceSearch } from '../lib/voiceSearch'
import toast from 'react-hot-toast'
import { cn } from '../lib/utils'

interface VoiceSearchButtonProps {
  onResult: (transcript: string) => void
  className?: string
}

export default function VoiceSearchButton({
  onResult,
  className,
}: VoiceSearchButtonProps) {
  const [isListening, setIsListening] = useState(false)

  const handleVoiceSearch = () => {
    if (!voiceSearch.isSupported()) {
      toast.error('Voice search not supported in your browser')
      return
    }

    if (isListening) {
      voiceSearch.stopListening()
      setIsListening(false)
      return
    }

    setIsListening(true)
    toast.success('Listening... Speak now!')

    voiceSearch.startListening(
      (transcript) => {
        setIsListening(false)
        onResult(transcript)
        toast.success(`Searching for: ${transcript}`)
      },
      (error) => {
        setIsListening(false)
        toast.error(`Voice search error: ${error}`)
      }
    )
  }

  return (
    <motion.button
      onClick={handleVoiceSearch}
      className={cn(
        'relative flex items-center justify-center w-10 h-10 rounded-full',
        'bg-gradient-to-r from-red-500 to-orange-500',
        'text-white shadow-lg',
        'hover:shadow-xl transition-shadow',
        className
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Pulse animation when listening */}
      {isListening && (
        <>
          <motion.div
            className="absolute inset-0 rounded-full bg-red-500"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.7, 0, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-orange-500"
            animate={{
              scale: [1, 1.8, 1.8],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.3,
            }}
          />
        </>
      )}

      {/* Icon */}
      <motion.div
        animate={isListening ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, repeat: isListening ? Infinity : 0 }}
      >
        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
      </motion.div>
    </motion.button>
  )
}

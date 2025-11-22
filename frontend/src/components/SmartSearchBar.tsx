// Enhanced search bar with voice search and smart suggestions

import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import VoiceSearchButton from './VoiceSearchButton'
import { recommendationEngine } from '../lib/smartRecommendations'
import { cn } from '../lib/utils'

interface SmartSearchBarProps {
  value: string
  onChange: (value: string) => void
  onSearch?: (query: string) => void
  placeholder?: string
  className?: string
}

export default function SmartSearchBar({
  value,
  onChange,
  onSearch,
  placeholder = 'Search for restaurants or dishes...',
  className,
}: SmartSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Load recent searches from localStorage
    const saved = localStorage.getItem('zomato-recent-searches')
    if (saved) {
      setRecentSearches(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    // Get smart suggestions based on query
    if (value.length > 2) {
      const smartSuggestions = recommendationEngine.getSmartSuggestions(value)
      setSuggestions(smartSuggestions)
    } else {
      setSuggestions([])
    }
  }, [value])

  const handleSearch = (query: string) => {
    if (query.trim()) {
      // Add to recent searches
      const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(0, 5)
      setRecentSearches(updated)
      localStorage.setItem('zomato-recent-searches', JSON.stringify(updated))

      onChange(query)
      onSearch?.(query)
      setIsFocused(false)
    }
  }

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  const handleVoiceResult = (transcript: string) => {
    onChange(transcript)
    handleSearch(transcript)
  }

  const clearRecentSearches = () => {
    setRecentSearches([])
    localStorage.removeItem('zomato-recent-searches')
  }

  return (
    <div className={cn('relative', className)}>
      {/* Search Input */}
      <motion.div
        className={cn(
          'relative flex items-center gap-2 px-4 py-3 rounded-2xl',
          'bg-white dark:bg-gray-800',
          'border-2 transition-all duration-300',
          isFocused
            ? 'border-red-500 shadow-lg shadow-red-500/20'
            : 'border-gray-200 dark:border-gray-700'
        )}
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
      >
        <Search className="text-gray-400" size={20} />

        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(value)}
          placeholder={placeholder}
          className="flex-1 bg-transparent outline-none text-gray-900 dark:text-white placeholder-gray-400"
        />

        {value && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={20} />
          </motion.button>
        )}

        <VoiceSearchButton onResult={handleVoiceResult} />
      </motion.div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isFocused && (recentSearches.length > 0 || suggestions.length > 0) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700 z-50"
          >
            {/* Recent Searches */}
            {recentSearches.length > 0 && !value && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Recent Searches
                  </h3>
                  <button
                    onClick={clearRecentSearches}
                    className="text-xs text-red-500 hover:text-red-600"
                  >
                    Clear All
                  </button>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors"
                    >
                      <Clock size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {search}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Smart Suggestions */}
            {suggestions.length > 0 && value && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Suggestions
                </h3>
                <div className="space-y-1">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(suggestion)}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-left transition-colors"
                    >
                      <Search size={16} className="text-gray-400" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {suggestion}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

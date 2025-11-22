// Video background component for hero sections

import { useEffect, useRef, useState } from 'react'
import { cn } from '../lib/utils'

interface VideoBackgroundProps {
  videoUrl?: string
  fallbackImage?: string
  overlay?: boolean
  overlayOpacity?: number
  className?: string
  children?: React.ReactNode
}

export default function VideoBackground({
  videoUrl,
  fallbackImage = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80',
  overlay = true,
  overlayOpacity = 0.6,
  className,
  children,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [useVideo, setUseVideo] = useState(!!videoUrl)

  useEffect(() => {
    if (videoRef.current && videoUrl) {
      videoRef.current.play().catch(() => {
        // If video fails to play, use fallback image
        setUseVideo(false)
      })
    }
  }, [videoUrl])

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Video or Image Background */}
      {useVideo && videoUrl ? (
        <video
          ref={videoRef}
          className={cn(
            'absolute inset-0 w-full h-full object-cover',
            isVideoLoaded ? 'opacity-100' : 'opacity-0',
            'transition-opacity duration-1000'
          )}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${fallbackImage})` }}
        />
      )}

      {/* Gradient Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

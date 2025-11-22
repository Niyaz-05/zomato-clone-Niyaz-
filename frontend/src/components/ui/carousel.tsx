import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface CarouselProps {
  children: React.ReactNode[]
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
}

export interface CarouselContextValue {
  currentIndex: number
  totalSlides: number
  goToSlide: (index: number) => void
  nextSlide: () => void
  prevSlide: () => void
}

const CarouselContext = React.createContext<CarouselContextValue | null>(null)

export const useCarousel = () => {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a Carousel")
  }
  return context
}

export const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ children, className, autoPlay = false, autoPlayInterval = 5000 }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const totalSlides = children.length

    const goToSlide = React.useCallback((index: number) => {
      setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)))
    }, [totalSlides])

    const nextSlide = React.useCallback(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides)
    }, [totalSlides])

    const prevSlide = React.useCallback(() => {
      setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
    }, [totalSlides])

    React.useEffect(() => {
      if (autoPlay && totalSlides > 1) {
        const interval = setInterval(nextSlide, autoPlayInterval)
        return () => clearInterval(interval)
      }
    }, [autoPlay, autoPlayInterval, nextSlide, totalSlides])

    const contextValue: CarouselContextValue = {
      currentIndex,
      totalSlides,
      goToSlide,
      nextSlide,
      prevSlide,
    }

    return (
      <CarouselContext.Provider value={contextValue}>
        <div ref={ref} className={cn("relative", className)}>
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {children.map((child, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  {child}
                </div>
              ))}
            </div>
          </div>
          {totalSlides > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
                onClick={nextSlide}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "h-2 w-2 rounded-full transition-colors",
                      index === currentIndex ? "bg-white" : "bg-white/50"
                    )}
                    onClick={() => goToSlide(index)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"
